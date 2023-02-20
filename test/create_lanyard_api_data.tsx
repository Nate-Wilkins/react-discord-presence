import {
  DiscordPresence as IDiscordPresence,
  SchemaDiscordPresence,
} from 'schema-lanyard-discord-presence';

/*
 * Creates test data for the Lanyard API.
 */
export const createLanyardApiData = ({
  developerId,
}: {
  developerId: string;
}): IDiscordPresence =>
  SchemaDiscordPresence.validateSync({
    spotify: {
      track_id: '77wq6jYIE2g0VcMjRfHdY0',
      timestamps: {
        start: 1676232497145,
        end: 1676232687101,
      },
      song: 'Black Betty',
      artist: 'Caravan Palace',
      album_art_url:
        'https://i.scdn.co/image/ab67616d0000b2733f6f0a8864b04cf0486d92b7',
      album: 'Black Betty - Single',
    },
    listening_to_spotify: false,
    kv: {},
    discord_user: {
      username: 'nate-wilkins',
      public_flags: 64,
      id: developerId,
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
        type: 2,
        timestamps: {
          start: 1676232497145,
          end: 1676232687101,
        },
        sync_id: '77wq6jYIE2g0VcMjRfHdY0',
        state: 'Caravan Palace',
        session_id: '04c61c1e05762235cd7162630e7d7f1a',
        party: {
          id: 'spotify:194976024457510912',
        },
        name: 'Spotify',
        id: 'spotify:1',
        flags: 48,
        details: 'Black Betty',
        created_at: 1676232497723,
        assets: {
          large_text: 'Black Betty - Single',
          large_image: 'spotify:ab67616d0000b2733f6f0a8864b04cf0486d92b7',
        },
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
      {
        type: 0,
        timestamps: {
          start: 1675651894032,
        },
        name: 'Overwatch 2',
        id: 'b5929b2fee89662a',
        created_at: 1675651894051,
        application_id: '356875221078245376',
      },
      {
        type: 0,
        timestamps: {
          start: 1676895782000,
        },
        name: 'YouTube',
        id: 'f7c5f368d72a4f8',
        details: 'Browsing...',
        created_at: 1676827887435,
        assets: {
          large_text: 'PreMiD  v2.2.0 • Ext v2.2.3',
          large_image:
            'mp:external/aMfYN8fu5BRlIE4qbxnOZLsp-nNQ7SfJA8-3qM8Zneo/https/i.imgur.com/o5injgg.png',
        },
        application_id: '463097721130188830',
      },
    ],
    active_on_discord_web: false,
    active_on_discord_mobile: false,
    active_on_discord_desktop: true,
  });
