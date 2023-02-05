import {
  DiscordPresence as IDiscordPresence,
  SchemaDiscordPresence,
} from 'schema-lanyard-discord-presence';

export const createLanyardApiData = (): IDiscordPresence =>
  SchemaDiscordPresence.validateSync({
    spotify: null,
    listening_to_spotify: false,
    kv: {},
    discord_user: {
      username: 'nate-wilkins',
      public_flags: 64,
      id: '194976024457510912',
      display_name: null,
      discriminator: '5455',
      bot: false,
      avatar_decoration: null,
      avatar: 'abe8b7a14d105e50135dc08c9611d380',
    },
    discord_status: 'online',
    activities: [
      {
        type: 4,
        state: '😼',
        name: 'Custom Status',
        id: 'custom',
        emoji: {
          name: 'eyesshaking',
          id: '662645652668547083',
          animated: true,
        },
        created_at: 1675542370754,
      },
      {
        type: 0,
        timestamps: {
          start: 1675547220000,
        },
        state: 'Editing DiscordPresence.test.tsx',
        name: 'Neovim',
        id: 'adcc4377e4f48e4d',
        details: 'Working on react-discord-presence',
        created_at: 1675547708661,
        assets: {
          small_text: 'React',
          small_image: '794715645786587137',
          large_text: 'Neovide',
          large_image: '794715651365273600',
        },
        application_id: '793271441293967371',
      },
    ],
    active_on_discord_web: false,
    active_on_discord_mobile: false,
    active_on_discord_desktop: true,
  });
