import { createRoot } from 'react-dom/client';
import React from 'react';
import { DiscordPresence } from './DiscordPresence';

const main = () => {
  // Setup React.
  const root = document.getElementById('root') as void | HTMLDivElement;
  if (!root) {
    throw new Error(`Unable to find 'root'.`);
  }

  // Parse Input.
  const developerId = root.dataset.developerId;
  if (typeof developerId !== 'string') {
    throw new Error(
      `Provided dataset 'developerId' is invalid.\nExpected a string.`,
    );
  }

  // React Render.
  const reactRoot = createRoot(root);
  reactRoot.render(<DiscordPresence args={{ developerId }} />);
};

document.addEventListener('DOMContentLoaded', main);