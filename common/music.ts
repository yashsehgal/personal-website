export const MUSIC_TRACK_ITEMS = [
  {
    id: "MUSIC_TRACK_LET_IT_HAPPEN",
    appleMusicId: "1440838060",
    title: "Let It Happen",
    artist: "Tame Impala",
  },
  {
    id: "MUSIC_TRACK_INSTANT_CRUSH",
    appleMusicId: "617154362",
    title: "Instant Crush",
    artist: "Daft Punk",
  },
  {
    id: "MUSIC_TRACK_DONT_WAIT_UP",
    appleMusicId: "1789425352",
    title: "Don't Wait Up",
    artist: "Midnight Generation",
  },
  {
    id: "MUSIC_TRACK_ONE_MANS_DREAM",
    appleMusicId: "255942465",
    title: "One Man's Dream",
    artist: "Yanni",
  },
  {
    id: "MUSIC_TRACK_THE_LESS_I_KNOW_THE_BETTER",
    appleMusicId: "1440838488",
    title: "The Less I Know the Better",
    artist: "Tame Impala",
  },
  {
    id: "MUSIC_TRACK_DIGITAL_LOVE",
    appleMusicId: "697195633",
    title: "Digital Love",
    artist: "Daft Punk",
  },
  {
    id: "MUSIC_TRACK_TROUBLE",
    appleMusicId: "1508709850",
    title: "Trouble",
    artist: "Midnight Generation",
  },
  {
    id: "MUSIC_TRACK_NIGHTINGALE",
    appleMusicId: "1439509525",
    title: "Nightingale",
    artist: "Yanni",
  },
  {
    id: "MUSIC_TRACK_BORDERLINE",
    appleMusicId: "1497230972",
    title: "Borderline",
    artist: "Tame Impala",
  },
  {
    id: "MUSIC_TRACK_SOMETHING_ABOUT_US",
    appleMusicId: "697195941",
    title: "Something About Us",
    artist: "Daft Punk",
  },
  {
    id: "MUSIC_TRACK_ENERGY",
    appleMusicId: "1797207887",
    title: "Energy",
    artist: "Midnight Generation",
  },
  {
    id: "MUSIC_TRACK_IN_THE_MIRROR",
    appleMusicId: "255942912",
    title: "In the Mirror",
    artist: "Yanni",
  },
] as const;

export type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  artworkUrl: string;
  largeArtworkUrl: string;
  previewUrl: string;
};
