export type WaterfallTag = 'accessible' | 'easy' | 'mountain' | 'wild' | 'adventure';

export interface Waterfall {
  id: string;
  name: string;
  description: string;
  facts: string[];
  tags: WaterfallTag[];
  image: any;
  location: { lat: number; lng: number };
}

export const WATERFALLS: Waterfall[] = [
  {
    id: '1',
    name: 'Virginia Falls',
    description: 'Located in Nahanni National Park Reserve in Canada, Virginia Falls is twice the height of Niagara Falls. The Nahanni River plunges over a dramatic cliff surrounded by remote wilderness.',
    facts: [
      'Virginia Falls is twice the height of Niagara Falls',
      'Located in Nahanni National Park — a UNESCO World Heritage Site',
      'The falls drop approximately 96 meters',
      'One of the most remote waterfalls in North America',
    ],
    tags: ['wild', 'adventure'],
    image: require('../assets/images/VirginiaFalls.png'),
    location: { lat: 61.6000, lng: -124.8000 },
  },
  {
    id: '2',
    name: 'Pissing Mare Falls',
    description: 'One of the highest waterfalls in Newfoundland, Canada. The name comes from an old Irish expression meaning a strong, fast stream. The falls drop nearly 350 meters into Western Brook Pond.',
    facts: [
      'Drops nearly 350 meters — one of the tallest in Eastern Canada',
      'Located in Gros Morne National Park',
      'Only accessible by boat and hiking trail',
      'Surrounded by ancient fjord-like landscape',
    ],
    tags: ['wild', 'mountain'],
    image: require('../assets/images/PissingMareFalls.png'),
    location: { lat: 49.8500, lng: -57.7500 },
  },
  {
    id: '3',
    name: 'Sunwapta Falls',
    description: 'Sunwapta Falls is located in Jasper National Park, Alberta. The Sunwapta River drops into a narrow canyon, creating a powerful and photogenic waterfall surrounded by mountains.',
    facts: [
      'Located in Jasper National Park, Alberta',
      '"Sunwapta" means turbulent river in the Stoney language',
      'Easily accessible — just steps from the Icefields Parkway',
      'The river splits into upper and lower falls',
    ],
    tags: ['easy', 'accessible'],
    image: require('../assets/images/SunwaptaFalls.png'),
    location: { lat: 52.2000, lng: -117.6500 },
  },
  {
    id: '4',
    name: 'Bridal Veil Falls',
    description: 'Bridal Veil Falls in British Columbia cascades down a sheer granite cliff resembling a delicate bridal veil. The falls are visible from the highway and are one of the most photographed in Canada.',
    facts: [
      'Falls drop approximately 122 meters',
      'Visible directly from Highway 1 in BC',
      'Named for its thin, veil-like appearance',
      'Best visited in spring during snowmelt',
    ],
    tags: ['easy', 'accessible'],
    image: require('../assets/images/BridalVeilFalls.png'),
    location: { lat: 49.1800, lng: -121.7500 },
  },
  {
    id: '5',
    name: 'Shannon Falls',
    description: 'Shannon Falls is the third highest waterfall in British Columbia, dropping 335 meters. Located near Squamish, it is one of the most visited natural attractions on the Sea-to-Sky corridor.',
    facts: [
      'Third highest waterfall in British Columbia at 335 meters',
      'Located just 5 minutes from downtown Squamish',
      'Visible year-round with peak flow in spring',
      'Part of the famous Sea-to-Sky corridor',
    ],
    tags: ['easy', 'accessible'],
    image: require('../assets/images/ShannonFalls.png'),
    location: { lat: 49.7300, lng: -123.1500 },
  },
  {
    id: '6',
    name: 'Athabasca Falls',
    description: 'Though not the tallest, Athabasca Falls is one of the most powerful waterfalls in the Canadian Rockies. The Athabasca River forces its way through a narrow quartzite canyon with tremendous force.',
    facts: [
      'The most powerful waterfall in the Canadian Rockies',
      'Located on the Icefields Parkway in Jasper National Park',
      'The falls are only 23 meters tall but extremely powerful',
      'The canyon was carved entirely by water erosion',
    ],
    tags: ['easy', 'accessible'],
    image: require('../assets/images/AthabascaFalls.png'),
    location: { lat: 52.6600, lng: -117.8800 },
  },
  {
    id: '7',
    name: 'Takakkaw Falls',
    description: 'Takakkaw Falls is one of the highest waterfalls in Canada, fed by the Daly Glacier in Yoho National Park. Its name means "it is magnificent" in Cree — and it truly is.',
    facts: [
      'One of the highest waterfalls in Canada at 384 meters',
      '"Takakkaw" means magnificent in the Cree language',
      'Fed by meltwater from the Daly Glacier',
      'Located in Yoho National Park, British Columbia',
    ],
    tags: ['mountain', 'adventure'],
    image: require('../assets/images/TakakkawFalls.png'),
    location: { lat: 51.5000, lng: -116.4700 },
  },
  {
    id: '8',
    name: 'Helmcken Falls',
    description: 'Helmcken Falls is the fourth highest waterfall in Canada, located in Wells Gray Provincial Park. The Murtle River plunges 141 meters into a volcanic crater, creating a dramatic cone of ice in winter.',
    facts: [
      'Fourth highest waterfall in Canada at 141 meters',
      'Located in Wells Gray Provincial Park, BC',
      'Forms a massive ice cone up to 40 meters tall in winter',
      'Named after Dr. John Sebastian Helmcken',
    ],
    tags: ['mountain', 'wild'],
    image: require('../assets/images/HelmckenFalls.png'),
    location: { lat: 51.9800, lng: -120.0500 },
  },
  {
    id: '9',
    name: 'Montmorency Falls',
    description: 'Montmorency Falls near Quebec City is 30 meters higher than Niagara Falls. The falls drop 83 meters into the St. Lawrence River and are a symbol of Quebec\'s natural and cultural heritage.',
    facts: [
      'Taller than Niagara Falls by 30 meters',
      'Located just 10 minutes from Quebec City',
      'A suspension bridge spans the top of the falls',
      'Visited by over 2 million people each year',
    ],
    tags: ['easy', 'accessible'],
    image: require('../assets/images/MontmorencyFalls.png'),
    location: { lat: 46.8900, lng: -71.1500 },
  },
  {
    id: '10',
    name: 'Niagara Falls',
    description: 'One of the most famous waterfalls in the world, located on the border of Canada and the United States. Niagara Falls is known for its immense power, mist, and spectacular rainbows.',
    facts: [
      'Over 3,000 tons of water flow over the falls every second',
      'Niagara Falls has been a honeymoon destination since the 1800s',
      'The falls move upstream about 1 meter per year due to erosion',
      'Visible from space on clear days',
    ],
    tags: ['easy', 'accessible'],
    image: require('../assets/images/NiagaraFalls.png'),
    location: { lat: 43.0962, lng: -79.0377 },
  },
];

export function getWaterfallsByTags(tagScores: Record<string, number>): Waterfall[] {
  const sorted = Object.entries(tagScores).sort((a, b) => b[1] - a[1]);
  const topTag = sorted[0][0] as WaterfallTag;
  const matched = WATERFALLS.filter((w) => w.tags.includes(topTag));
  return matched.length > 0 ? matched : WATERFALLS.slice(0, 3);
}

