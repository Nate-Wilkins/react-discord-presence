import { Buffer } from 'buffer';
import { exec as childProcessExec } from 'child_process';
import { createHash } from 'node:crypto';
import fs from 'fs';
import Mustache from 'mustache';
import fetch from 'node-fetch';
import path from 'path';
import util from 'util';

const exec = util.promisify(childProcessExec);

// Configuration.
const distributableDirectory = '../dist/';
const distributableIframeSourceFileName = './iframe.js';
const documentContentEncoding = 'utf-8';
const documentsDirectory = `../docs/`;
const documentTemplateCustomTags: [string, string] = ['<%', '%>'];
const documentTemplateFileNames = [
  'Customization.template.md',
  'README.template.md',
];
const documentOutputHeaderAutogenerated = `
[//]: # "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
[//]: # "!!!!!!                                     !!!!!!"
[//]: # "!!!!!!      >>>>> WARNING <<<<<            !!!!!!"
[//]: # "!!!!!!                                     !!!!!!"
[//]: # "!!!!!! This file is autogenerated.         !!!!!!"
[//]: # "!!!!!!                                     !!!!!!"
[//]: # "!!!!!!      >>>>> WARNING <<<<<            !!!!!!"
[//]: # "!!!!!!                                     !!!!!!"
[//]: # "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

`;
const documentPackagePeerDependencyHash = 'sha256';
const documentPackagePeerDependencyUnpkgCdnFile = {
  react: 'umd/react.production.min.js',
  'react-dom': 'umd/react-dom.production.min.js',
};
const documentTemplateIframeSource = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Security-Policy" content="script-src 'sha256-{{{peerDependencies.react.unpkg.hash}}}' 'sha256-{{{peerDependencies.react-dom.unpkg.hash}}}' 'sha256-{{{iframe.entry.hash}}}'" />
    <script type="text/javascript" src="{{{peerDependencies.react.unpkg.cdn}}}" />
    <script type="text/javascript" src="{{{peerDependencies.react-dom.unpkg.cdn}}}" />
    <script type="text/javascript">{{{iframe.entry.source}}}</script>
  </head>
  <body><div id="root" data-developer-id="194976024457510912"/></body>
</html>`;

/*
 * Load JSON file.
 */
const loadJsonFileSync = (filePath: string, encoding: BufferEncoding) => {
  return JSON.parse(fs.readFileSync(filePath, encoding));
};

/*
 * Get Unpkg package information for provided packages.
 *
 * Includes:
 * - Unpkg URL.
 * - Unpkg hash.
 */
const getUnpkgPackages = async ({
  packages,
  cdnFileLookup,
  hashType,
}: {
  packages: Record<string, string>;
  cdnFileLookup: Record<string, null | string>;
  hashType: string;
}): Promise<{
  [key: string]: {
    versionRange: string;
    unpkg: { name: string; cdn: string; hash: string };
  };
}> => {
  const packageKeys = Object.keys(packages);

  // Get installed local packages.
  const {
    stdout: commandNpmListStdout,
    stderr: commandNpmListStderr,
  } = await exec('npm list --depth=0');
  if (commandNpmListStderr) {
    throw new Error(commandNpmListStderr);
  }
  console.log(commandNpmListStderr);

  return (
    await Promise.all(
      packageKeys.map(key =>
        (async () => {
          // Get used local dependency info for a particular package.
          const regexDependency = new RegExp(`\\s+(${key}@.*)$`, 'm');
          const match = regexDependency.exec(commandNpmListStdout);
          if (!match) {
            throw new Error(
              `Unable to find dependency '${key}' in local packages.`,
            );
          }
          const pkgVersion = match[1];
          console.info(
            `[build:generate_docs:getLocalDependency]: Found '${pkgVersion}'.`,
          );

          // Create Unpkg dependency info.
          const unpkgDistFile = cdnFileLookup[key];
          if (!unpkgDistFile) {
            throw new Error(`No Unpkg distributable file found for '${key}'.`);
          }
          const unpkgCdnDistFile = `https://unpkg.com/${pkgVersion}/${unpkgDistFile}`;
          const unpkgCdnDistFileResponse = await fetch(unpkgCdnDistFile, {});
          const unpkgCdnDistFileContent = await unpkgCdnDistFileResponse.text();

          return {
            versionRange: packages[key],
            unpkg: {
              name: key,
              cdn: unpkgCdnDistFile,
              hash: createHash(hashType)
                .update(unpkgCdnDistFileContent)
                .digest('hex'),
            },
          };
        })(),
      ),
    )
  ).reduce((aggregate, dependency) => {
    return { ...aggregate, [dependency.unpkg.name]: dependency };
  }, {});
};

// Main.
const main = async () => {
  try {
    console.info('[build:generate_docs] Build documents.');

    // Get package information.
    console.info('[build:generate_docs] Get package information.');
    const pkg = loadJsonFileSync('package.json', documentContentEncoding);
    console.info('[build:generate_docs] Package Information:');
    console.info({
      name: pkg.name,
      version: pkg.version,
      author: pkg.author,
      description: pkg.description,
      dependencies: pkg.dependencies,
      peerDependencies: pkg.peerDependencies,
    });

    // Create template rendering context.
    const iframeSourceContent = fs.readFileSync(
      path.join(
        __dirname,
        distributableDirectory,
        distributableIframeSourceFileName,
      ),
      documentContentEncoding,
    );
    const context = {
      name: pkg.name,
      peerDependencies: await getUnpkgPackages({
        packages: pkg.peerDependencies,
        hashType: documentPackagePeerDependencyHash,
        cdnFileLookup: documentPackagePeerDependencyUnpkgCdnFile,
      }),
      iframe: {
        source: '',
        dataUri: '',
        entry: {
          source: iframeSourceContent,
          hash: createHash(documentPackagePeerDependencyHash)
            .update(iframeSourceContent)
            .digest('hex'),
        },
      },
    };
    // Create iframe source and data URI.
    context.iframe.source = Mustache.render(
      documentTemplateIframeSource,
      context,
      {},
      documentTemplateCustomTags,
    );
    context.iframe.dataUri = `data:text/html;charset=utf-8;base64,${Buffer.from(
      context.iframe.source,
    ).toString('base64')}`;

    // Generate documents.
    for (const documentTemplateFileName of documentTemplateFileNames) {
      // Load document template.
      console.info(
        `[build:generate_docs:${documentTemplateFileName}] Load template.`,
      );
      const documentTemplate = fs.readFileSync(
        path.join(__dirname, documentsDirectory, documentTemplateFileName),
        documentContentEncoding,
      );

      // Render document.
      const documentOutput = Mustache.render(
        documentTemplate,
        context,
        {},
        documentTemplateCustomTags,
      );

      // Write document output.
      fs.writeFileSync(
        path.join(
          __dirname,
          documentsDirectory,
          documentTemplateFileName.replace('.template', ''),
        ),
        `${documentOutputHeaderAutogenerated}${documentOutput}`,
        documentContentEncoding,
      );
    }

    process.exit(0);
  } catch (e) {
    const error = e as Error;
    console.error(error ? error.message : error);
    process.exit(2);
  }
};
main();