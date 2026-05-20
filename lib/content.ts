export type Track = {
  n: string;
  title: string;
  dur: string;
  seed: number;
  side: 'A' | 'B';
};

export type Show = {
  date: string;
  time?: string;
  venue: string;
  city: string;
  tix?: string;
};

export type Social = {
  name: string;
  handle: string;
  url: string;
  glyph: string;
};

export const BAND = {
  name: 'INFINITE BITS',
  tagline: 'algorithmic band · san francisco · ',
  origin: 'SAN FRANCISCO, CA',
  lp: {
    title: 'PHASES',
    subtitle: 'LP · 2025',
    cover: '/images/phases-cover.jpg',
    year: '2025',
    runtime: '39:02',
    tracks: [
      { n: '01', title: 'Phase 1: Overture',       dur: '0:56', seed: 1.1, side: 'A' as const },
      { n: '02', title: 'Robbin The Hood',         dur: '5:34', seed: 1.6, side: 'A' as const },
      { n: '03', title: 'Dos Banditos',            dur: '5:15', seed: 2.1, side: 'A' as const },
      { n: '04', title: 'Phase 2: Tune In',        dur: '0:19', seed: 2.4, side: 'A' as const },
      { n: '05', title: 'Cigarette For The Tree',  dur: '5:40', seed: 2.7, side: 'A' as const },
      { n: '06', title: 'Cave Of Forgotten',       dur: '4:09', seed: 3.1, side: 'B' as const },
      { n: '07', title: 'Phase 3: Reflections',    dur: '0:27', seed: 3.3, side: 'B' as const },
      { n: '08', title: 'The Space In Between',    dur: '5:06', seed: 3.6, side: 'B' as const },
      { n: '09', title: 'Phase 4: Reckoning',      dur: '0:26', seed: 3.8, side: 'B' as const },
      { n: '10', title: 'Invariant',               dur: '6:05', seed: 4.1, side: 'B' as const },
      { n: '11', title: 'Night Terror',            dur: '5:05', seed: 4.5, side: 'B' as const },
    ],
  },
  shows: {
    upcoming: [
      { date: 'TBD',         time: '—',   venue: 'ALBUM RELEASE',    city: 'San Francisco, CA', tix: 'soon' },
      { date: 'JUN 20 2026', time: '—',   venue: 'NORTH BEACH FEST', city: 'San Francisco, CA', tix: 'rsvp' },
    ] as Show[],
    past: [
      { date: 'AUG 12 2025', venue: 'BOOM BOOM ROOM',     city: 'San Francisco, CA' },
      { date: 'JUN 14 2025', venue: 'NORTH BEACH FEST',   city: 'San Francisco, CA' },
      { date: 'APR 06 2025', venue: 'BOTTOM OF THE HILL', city: 'San Francisco, CA' },
      { date: 'DEC 06 2024', venue: 'THE DUBLINER',       city: 'San Francisco, CA' },
      { date: 'AUG 02 2024', venue: 'HOTEL UTAH',         city: 'San Francisco, CA' },
      { date: 'JUN 26 2024', venue: 'THE DUBLINER',       city: 'San Francisco, CA' },
      { date: 'MAR 03 2024', venue: 'OCEAN ALE HOUSE',    city: 'San Francisco, CA' },
      { date: 'JUL 15 2023', venue: 'THE BISTRO',         city: 'Hayward, CA' },
    ] as Show[],
  },
  socials: [
    { name: 'instagram',  handle: '@infinite_bits_band', url: 'https://www.instagram.com/infinite_bits_band/', glyph: 'IG' },
    { name: 'spotify',    handle: 'infinite bits',       url: 'https://open.spotify.com/album/5NZS1vqyGWnDUmdujgdP05', glyph: 'SP' },
    { name: 'bandcamp',   handle: 'infinitebits',        url: 'https://infinitebits.bandcamp.com/album/infinite-bits-ep', glyph: 'BC' },
    { name: 'soundcloud', handle: 'infinite-bits',       url: 'https://soundcloud.com/infinite-bits', glyph: 'SC' },
    { name: 'youtube',    handle: 'infinite bits',       url: 'https://www.youtube.com/channel/UCFdMVO3JBoVVtgP9l0r_eVA', glyph: 'YT' },
  ] as Social[],
  booking: 'infinitebitsband@gmail.com',
} as const;

export const PALETTES: Record<string, string[]> = {
  cosmic:   ['#0a2540', '#1d4e89', '#2e8bc0', '#7ec8e3', '#f4a261', '#e76f51', '#c0392b'],
  spectrum: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'],
  cyan:     ['#003a4a', '#005f7a', '#0089b0', '#00b8e0', '#19d4ff', '#7fe8ff', '#c6f4ff'],
  amber:    ['#3a1a00', '#6a2f00', '#a85100', '#d97706', '#f59e0b', '#fcd34d', '#fff1c2'],
  mono:     ['#222', '#444', '#666', '#888', '#aaa', '#ccc', '#fff'],
};
