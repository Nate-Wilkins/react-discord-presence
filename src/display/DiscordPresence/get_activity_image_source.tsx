const RegexMpExternal = new RegExp('mp:external/[^/]+/(https?)/(.*$)');

/*
 * Get the activity image source by type.
 *
 * Some presence data is internal and some reference external images.
 *
 * Example:
 *   - 794715651365273600
 *   - mp:external/aMfYN8fu5BRlIE4qbxnOZLsp-nNQ7SfJA8-3qM8Zneo/https/i.imgur.com/o5injgg.png
 */
export const getActivityImageSource = ({
  type,
  activity,
}: {
  type: 'small' | 'large';
  activity: {
    application_id: null | string;
    assets: {
      small_image: null | string;
      large_image: string;
    };
  };
}) => {
  let imgId: string;
  if (type === 'small') {
    imgId = activity.assets.small_image || '';
  } else {
    imgId = activity.assets.large_image;
  }

  // Is this an MP external image?
  const match = RegexMpExternal.exec(imgId);
  if (!match) {
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${imgId}.png`;
  } else {
    return `${match[1]}://${match[2]}`;
  }
};
