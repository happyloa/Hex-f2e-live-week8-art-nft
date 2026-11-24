export const artists = [
  {
    id: "antony-wu",
    name: "Antony Wu",
    image: "artist02",
    bio: "喜愛大自然，創作題材常見大山、大水、花草與樹木。",
    address: "0x8da314…37ce",
    stats: ["124", "0.9", "7.4", "19.6"],
  },
  {
    id: "joanne",
    name: "Joanne",
    image: "artist04",
    bio: "從海洋與日常的色彩出發，用流動的線條記錄不斷變化的風景。",
    address: "0x7a3166…6bcd",
    stats: ["82", "0.5", "4.1", "12.3"],
  },
  {
    id: "michael",
    name: "Michael",
    image: "artist01",
    bio: "Michael 自小在山林長大，創作題材常見大山、大水、花草與樹木。他從日常生活出發，透過與大自然的溝通，探討著存在的本質。",
    address: "0x3ya666…88ef",
    stats: ["168", "0.6", "8.8", "23.1"],
  },
  {
    id: "kemus-wu",
    name: "Kemus Wu",
    image: "artist03",
    bio: "以人像與色彩探索觀看的關係，描繪眼睛裡反映出來的世界。",
    address: "0x628ac5…a439",
    stats: ["96", "0.8", "6.1", "15.4"],
  },
  {
    id: "zoe-jiong",
    name: "Zoe Jiang",
    image: "artist05",
    bio: "將日常街景與人物的姿態畫進作品，蒐集散步時遇見的片刻。",
    address: "0x9c83d1…67ab",
    stats: ["76", "0.7", "5.2", "18.2"],
  },
  {
    id: "yui",
    name: "Yui",
    image: "art05",
    bio: "",
    address: "",
    stats: null,
  },
  {
    id: "bug-lin",
    name: "Bug Lin",
    image: "art06",
    bio: "",
    address: "",
    stats: null,
  },
  {
    id: "wei-jj",
    name: "Wei JJ",
    image: "art07",
    bio: "",
    address: "",
    stats: null,
  },
  {
    id: "even-lai",
    name: "Even Lai",
    image: "art08",
    bio: "",
    address: "",
    stats: null,
  },
] as const;

export type Artist = (typeof artists)[number];
type ArtistId = Artist["id"];

interface Collection {
  id: string;
  name: string;
  artist: ArtistId;
  description: string;
  stats: [string, string, string, string];
}

export const collections: Collection[] = [
  {
    id: "birds",
    name: "我家外面的鳥",
    artist: "michael",
    description:
      "家門前每天都有不同的小鳥，大多數的小鳥都有特殊能力，特殊能力是什麼我就不說了，希望大家能從作品感受到小鳥的快樂。",
    stats: ["6.4 k", "2.5 k", "2.8 k", "1.38 k"],
  },
  {
    id: "flowers",
    name: "追求者送我的花",
    artist: "michael",
    description: "把收到的花畫下來，留下花朵原本的姿態以及逐漸改變的色彩。",
    stats: ["1.2 k", "716", "800", "0.6"],
  },
  {
    id: "ocean",
    name: "海洋波度",
    artist: "joanne",
    description:
      "海洋的奧秘向我們揭示了深不可測的一面，它的深度一直吸引著我們。",
    stats: ["2.1 k", "1.2 k", "1.5 k", "0.5"],
  },
  {
    id: "gaze",
    name: "瞳孔:流動的脈絡",
    artist: "kemus-wu",
    description: "眼睛吸引著我們的注意力，眼睛裡有著從另一個世界看我們的世界。",
    stats: ["1.6 k", "866", "1.3 k", "0.8"],
  },
  {
    id: "nature",
    name: "夏日風景",
    artist: "antony-wu",
    description: "季節的光線掠過山水與林間，將逐漸改變的自然留在畫布上。",
    stats: ["920", "610", "780", "0.9"],
  },
  {
    id: "walk",
    name: "散步遇到的女人",
    artist: "zoe-jiong",
    description: "以色彩與人物姿態記錄散步時遇見的街景。",
    stats: ["830", "422", "718", "0.7"],
  },
];

export const networks = ["以太坊", "BNB 智能鏈"] as const;
export const statuses = ["拍賣中", "僅展示"] as const;
export const birdTypes = [
  "虎皮鸚鵡",
  "八哥",
  "太平鳥",
  "畫眉鳥",
  "青藍金剛鸚鵡",
] as const;
export const birdColors = ["藍色", "棕色", "綠色", "白色"] as const;

interface Artwork {
  id: string;
  title: string;
  image: string;
  collection: string | null;
  artist: ArtistId;
  description: string;
  price: number;
  network: (typeof networks)[number];
  status: (typeof statuses)[number];
  species: (typeof birdTypes)[number];
  birds: number;
  flowers: boolean;
  color: (typeof birdColors)[number];
}

type ArtworkSeed = [
  id: string,
  title: string,
  image: string,
  collection: string,
  description?: string,
  creator?: ArtistId,
];
const artworkSeeds: ArtworkSeed[] = [
  [
    "flowing-gaze",
    "瞳孔:流動的脈絡",
    "art01",
    "gaze",
    "眼睛，總是吸引著我們的注意力。看、被看，也許眼睛裡有著從另一個世界看我們的世界。",
  ],
  [
    "ocean-wave",
    "海洋波度",
    "art02",
    "ocean",
    "海洋的奧秘向我們揭示了深不可測的一面，它的深度一直反映了我們的恐懼，同時也吸引著我們。",
  ],
  [
    "window-birds",
    "我家窗前的鳥",
    "art21",
    "birds",
    "家門前每天都有不同的小鳥，大多數的小鳥都有特殊能力，特殊能力是什麼我就不說了，希望大家能從作品感受到小鳥的快樂。",
  ],
  ["woman-on-a-walk", "散步遇到的女人", "art04", "walk"],
  [
    "sculpted-mother",
    "爆炸頭的母親",
    "art05",
    "gaze",
    "灰階光影中的人物雕像。",
    "yui",
  ],
  [
    "summer-days",
    "夏天的時候",
    "art06",
    "nature",
    "一幅以樹葉與夏日色彩為主題的插畫。",
    "bug-lin",
  ],
  ["flowers-from-a-suitor", "追求者送我的花", "art29", "flowers"],
  [
    "fish-today",
    "今天釣到的魚",
    "art07",
    "nature",
    "一張描繪不同魚種的圖畫。",
    "wei-jj",
  ],
  [
    "cats-in-life",
    "人生中的貓咪們",
    "art08",
    "walk",
    "以鮮明水彩描繪貓咪的神情。",
    "even-lai",
  ],
  ["private-life", "區塊戀-他的私生活", "art09", "gaze"],
  ["tears-like-pearls", "不哭不哭眼淚是珍珠", "art12", "gaze"],
  [
    "eves-scandal",
    "夏娃的醜聞",
    "art10",
    "gaze",
    "唯一想擁有的人，唯一不可以擁有的。",
  ],
  ["ten-more-minutes", "十分鐘就到", "art03", "walk"],
  ["blue-beer-sea", "藍色啤酒海", "art02", "ocean"],
  ["do-i-look-good", "我這樣有美嗎", "art04", "walk"],
  ["nobody-loves-me", "沒有人愛我", "art11", "gaze"],
  ["hurt-bird", "我真的受傷了", "art27", "birds"],
  [
    "two-birds",
    "兩情相悅",
    "art21",
    "birds",
    "3/14 情人節外面剛好有兩隻鳥，也在過情人節。",
  ],
  ["penguin-like", "這兩隻也太像企鵝了吧", "art20", "birds"],
  ["joy-of-sharing", "與你分享的快樂勝過獨自擁有", "art23", "birds"],
  ["metal-bird", "會唱 metal 的鳥", "art24", "birds"],
  ["big-and-small", "一大一小兩個恰恰好", "art25", "birds"],
  ["bird-gathering", "群聚的小鳥們", "art22", "birds"],
  ["little-birds", "群聚囉～小鳥", "art22", "birds"],
  ["soft-cells", "柔美的細胞小將", "art16", "ocean"],
  ["wild-child", "野小孩——叫你不要玩那個", "art19", "nature"],
  ["warm-wind", "每當夏天我吹著溫暖的風", "art06", "nature"],
  ["eat-vegetables", "心如止水——今天吃素", "art15", "flowers"],
  ["sleeping-in", "賴床真的很不好", "art03", "walk"],
  [
    "flower-letter",
    "收到的信",
    "the-new-york-public-library-vBejyCBXZBY-unsplash",
    "flowers",
  ],
  ["dried-petals", "乾燥的花瓣", "art30", "flowers"],
  ["broken-pineapple-bread", "破碎的菠蘿麵包", "art14", "flowers"],
  ["garden-bedroom", "髒兮兮的家", "artist03", "walk"],
  ["while-crying", "哭泣的時候", "art12", "gaze"],
  ["cell-trooper", "細胞小將", "art16", "ocean"],
  ["branches", "枝椏上的小鳥", "art26", "birds"],
];

export const artworks: Artwork[] = artworkSeeds.map(
  ([id, title, image, collectionId, description, creator], index) => {
    const collection = collections.find((item) => item.id === collectionId)!;
    return {
      id,
      title,
      image,
      collection: creator ? null : collectionId,
      artist: creator ?? collection.artist,
      description: description ?? collection.description,
      price:
        index < 15 ? 300 : Number((0.044 + (index - 15) * 0.01).toFixed(3)),
      network: index % 3 === 0 ? networks[1] : networks[0],
      status: index % 4 === 0 ? statuses[1] : statuses[0],
      species:
        id === "two-birds"
          ? "青藍金剛鸚鵡"
          : birdTypes[index % birdTypes.length]!,
      birds: id === "two-birds" ? 2 : (index % 4) + 1,
      flowers: index % 3 !== 0,
      color:
        id === "two-birds" ? "藍色" : birdColors[index % birdColors.length]!,
    };
  },
);

export function getArtist(id: string) {
  return artists.find((item) => item.id === id);
}

export function getArtwork(id: string) {
  return artworks.find((item) => item.id === id);
}

export function getCollection(id: string) {
  return collections.find((item) => item.id === id);
}

export const artPath = (id: string) => `/artwork/${id}`;
export const collectionPath = (id: string) => `/collection/${id}`;
export const artistPath = (id: string) => `/artist/${id}`;

export const latestIds = [
  "private-life",
  "eves-scandal",
  "blue-beer-sea",
  "nobody-loves-me",
  "tears-like-pearls",
  "ten-more-minutes",
  "do-i-look-good",
  "hurt-bird",
];
export const exploreIds = [
  ...latestIds,
  "soft-cells",
  "wild-child",
  "warm-wind",
  "eat-vegetables",
];

export const ranking = [
  {
    id: "woman-on-a-walk",
    price: 1774.19,
    day: 220.49,
    week: -2.43,
    floor: 2.9,
    owners: "32.1K",
    items: "1000",
  },
  {
    id: "sculpted-mother",
    price: 1698.42,
    day: -4.11,
    week: 14.2,
    floor: 2.12,
    owners: "28.3K",
    items: "937",
  },
  {
    id: "summer-days",
    price: 1524.89,
    day: 80.49,
    week: 90.23,
    floor: 1.92,
    owners: "25.6K",
    items: "800",
  },
  {
    id: "flowers-from-a-suitor",
    price: 1418.4,
    day: 6.29,
    week: -4.2,
    floor: 1.84,
    owners: "20.5K",
    items: "726",
  },
  {
    id: "fish-today",
    price: 1395.55,
    day: 8.01,
    week: 18.58,
    floor: 1.72,
    owners: "16.3K",
    items: "568",
  },
  {
    id: "cats-in-life",
    price: 1328.7,
    day: -2.84,
    week: 12.21,
    floor: 1.51,
    owners: "13.0K",
    items: "502",
  },
  {
    id: "ocean-wave",
    price: 1400.59,
    day: -3.92,
    week: -13.43,
    floor: 1.44,
    owners: "12.6K",
    items: "476",
  },
  {
    id: "sleeping-in",
    price: 1224.88,
    day: -9.23,
    week: -20.43,
    floor: 1.05,
    owners: "10.3K",
    items: "379",
  },
  {
    id: "flowing-gaze",
    price: 1155,
    day: 0.43,
    week: 20.02,
    floor: 0.96,
    owners: "9.7K",
    items: "365",
  },
  {
    id: "two-birds",
    price: 1005.32,
    day: 16.3,
    week: 9.18,
    floor: 0.83,
    owners: "8.2K",
    items: "313",
  },
];

export const marketRanking = [
  { ...ranking[0]!, id: "flowers-from-a-suitor" },
  ranking[2]!,
  ranking[6]!,
  ranking[7]!,
  ranking[8]!,
  { ...ranking[5]!, price: 1093.24 },
  { ...ranking[9]!, id: "while-crying" },
  { ...ranking[4]!, id: "broken-pineapple-bread", price: 967.5 },
  { ...ranking[5]!, id: "garden-bedroom", price: 952.13 },
  { ...ranking[1]!, id: "cell-trooper", price: 910.07 },
];

export const walletProviders = [
  "MetaMask",
  "Coinbase Wallet",
  "WalletConnect",
  "Phantom",
  "Glow",
  "Fortmatic",
];

export function queryText(value: unknown) {
  return typeof value === "string" ? value : "";
}

export function matchesSearch(text: string, search: string) {
  return text.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase());
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 3 }).format(value);
export const formatPercent = (value: number) =>
  `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
export type { Artwork, Collection };
