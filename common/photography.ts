export const PHOTOGRAPHY_IMAGES = [
  {
    path: "/photography/disneyland-firework-show.jpg",
    caption: "Fireworks over the castle at Hong Kong Disneyland",
    location: "Hong Kong",
  },
  {
    path: "/photography/disneyland-ironman-show.jpg",
    caption: "At the Iron Man show at Hong Kong Disneyland",
    location: "Hong Kong",
  },
  {
    path: "/photography/disneyland-junglebook-show.jpg",
    caption: "Mickey and Goofy on stage at Hong Kong Disneyland",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-bakery.jpg",
    caption: "Pastries at a bakery",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-basketball-court.jpg",
    caption: "Evening at a basketball court",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-coin-rings.jpg",
    caption: "Rings made from coins",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-diptyque-store.jpg",
    caption: "Record player at the Diptyque store",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-flowershop.jpg",
    caption: "Bouquets at a flower shop",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-foodmart.jpg",
    caption: "KitKat aisle at a food mart",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-halfway-coffee.jpg",
    caption: "Halfway Coffee",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-hotel-peninsula.jpg",
    caption: "The Peninsula Hotel at night",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-jail-lobby.jpg",
    caption: "Hallway at the old jail",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-madame-tussads.jpg",
    caption: "Jackie Chan at Madame Tussauds",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-nice-car.jpg",
    caption: "Classic Mercedes on the street",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-porsche.jpg",
    caption: "Porsche in Hong Kong",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-road-board.jpg",
    caption: "Road signs to Kowloon and Central",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-road.jpg",
    caption: "Night drive through the city",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-skyline.jpg",
    caption: "Skyline view",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-strawberries.jpg",
    caption: "A box of strawberries",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-sunflowers.jpg",
    caption: "Sunflowers at the market",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-workshop-items.jpg",
    caption: "Patches at a workshop",
    location: "Hong Kong",
  },
  {
    path: "/photography/hk-workshop.jpg",
    caption: "Making keychains at a workshop",
    location: "Hong Kong",
  },
  {
    path: "/photography/kl-patronas-towers.jpg",
    caption: "Looking up at the Petronas Towers",
    location: "Kuala Lumpur, Malaysia",
  },
  {
    path: "/photography/kl-skyline-from-hotel.jpg",
    caption: "Skyline view from the hotel",
    location: "Kuala Lumpur, Malaysia",
  },
  {
    path: "/photography/sf-art-museum.jpg",
    caption: "Palace of Fine Arts",
    location: "San Francisco, CA",
  },
  {
    path: "/photography/sf-goldengate-bridge.jpg",
    caption: "Golden Gate Bridge at sunset",
    location: "San Francisco, CA",
  },
  {
    path: "/photography/sf-people-at-art-museum.jpg",
    caption: "People at the Palace of Fine Arts",
    location: "San Francisco, CA",
  },
  {
    path: "/photography/sf-town.jpg",
    caption: "Houses across the lake",
    location: "San Francisco, CA",
  },
] as const;

export type PhotographyImage = (typeof PHOTOGRAPHY_IMAGES)[number];
