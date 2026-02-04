// Seed data for Family Rating Engine

export const initialVoters = [
  { name: 'Karen', isAdmin: true },
  { name: 'Charlie', isAdmin: false },
  { name: 'Meredith', isAdmin: false },
  { name: 'Morgan', isAdmin: false },
];

export const wdwRidesGroup = {
  name: 'WDW Rides (All Parks)',
  slug: 'wdw-rides',
  description: 'Rate all Walt Disney World rides across Magic Kingdom, EPCOT, Hollywood Studios, and Animal Kingdom',
};

export const wdwRidesAttributes = [
  { name: 'park', attributeType: 'select', options: ['Magic Kingdom', 'EPCOT', 'Hollywood Studios', 'Animal Kingdom'], sortOrder: 1 },
  { name: 'land', attributeType: 'text', sortOrder: 2 },
  { name: 'type', attributeType: 'select', options: ['Dark Ride', 'Coaster', 'Simulator', 'Flat Ride', 'Water Ride', 'Boat Ride', 'Show', 'Walk-Through', 'Other'], sortOrder: 3 },
];

// Complete list of WDW rides (as of 2024)
// Sources: Official Disney World website, Touring Plans
export const wdwRides = [
  // === MAGIC KINGDOM ===
  // Main Street U.S.A.
  { name: 'Walt Disney World Railroad', attributes: { park: 'Magic Kingdom', land: 'Main Street U.S.A.', type: 'Other' } },

  // Adventureland
  { name: 'Jungle Cruise', attributes: { park: 'Magic Kingdom', land: 'Adventureland', type: 'Boat Ride' } },
  { name: 'Pirates of the Caribbean', attributes: { park: 'Magic Kingdom', land: 'Adventureland', type: 'Dark Ride' } },
  { name: 'The Magic Carpets of Aladdin', attributes: { park: 'Magic Kingdom', land: 'Adventureland', type: 'Flat Ride' } },
  { name: 'Swiss Family Treehouse', attributes: { park: 'Magic Kingdom', land: 'Adventureland', type: 'Walk-Through' } },
  { name: 'A Pirate\'s Adventure: Treasures of the Seven Seas', attributes: { park: 'Magic Kingdom', land: 'Adventureland', type: 'Walk-Through' } },

  // Frontierland
  { name: 'Big Thunder Mountain Railroad', attributes: { park: 'Magic Kingdom', land: 'Frontierland', type: 'Coaster' } },
  { name: 'Splash Mountain', attributes: { park: 'Magic Kingdom', land: 'Frontierland', type: 'Water Ride' } }, // Now Tiana's Bayou Adventure
  { name: 'Tiana\'s Bayou Adventure', attributes: { park: 'Magic Kingdom', land: 'Frontierland', type: 'Water Ride' } },
  { name: 'Tom Sawyer Island', attributes: { park: 'Magic Kingdom', land: 'Frontierland', type: 'Walk-Through' } },
  { name: 'Country Bear Jamboree', attributes: { park: 'Magic Kingdom', land: 'Frontierland', type: 'Show' } },

  // Liberty Square
  { name: 'Haunted Mansion', attributes: { park: 'Magic Kingdom', land: 'Liberty Square', type: 'Dark Ride' } },
  { name: 'Liberty Square Riverboat', attributes: { park: 'Magic Kingdom', land: 'Liberty Square', type: 'Boat Ride' } },
  { name: 'Hall of Presidents', attributes: { park: 'Magic Kingdom', land: 'Liberty Square', type: 'Show' } },

  // Fantasyland
  { name: 'Seven Dwarfs Mine Train', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Coaster' } },
  { name: 'Space Mountain', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Coaster' } },
  { name: 'Peter Pan\'s Flight', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Dark Ride' } },
  { name: 'it\'s a small world', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Dark Ride' } },
  { name: 'The Many Adventures of Winnie the Pooh', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Dark Ride' } },
  { name: 'Under the Sea: Journey of the Little Mermaid', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Dark Ride' } },
  { name: 'Prince Charming Regal Carrousel', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Flat Ride' } },
  { name: 'Dumbo the Flying Elephant', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Flat Ride' } },
  { name: 'The Barnstormer', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Coaster' } },
  { name: 'Mad Tea Party', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Flat Ride' } },
  { name: 'Mickey\'s PhilharMagic', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Show' } },
  { name: 'Enchanted Tales with Belle', attributes: { park: 'Magic Kingdom', land: 'Fantasyland', type: 'Show' } },

  // Tomorrowland
  { name: 'TRON Lightcycle / Run', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Coaster' } },
  { name: 'Buzz Lightyear\'s Space Ranger Spin', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Dark Ride' } },
  { name: 'Astro Orbiter', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Flat Ride' } },
  { name: 'Tomorrowland Transit Authority PeopleMover', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Other' } },
  { name: 'Carousel of Progress', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Show' } },
  { name: 'Monsters, Inc. Laugh Floor', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Show' } },
  { name: 'Tomorrowland Speedway', attributes: { park: 'Magic Kingdom', land: 'Tomorrowland', type: 'Other' } },

  // === EPCOT ===
  // World Celebration
  { name: 'Spaceship Earth', attributes: { park: 'EPCOT', land: 'World Celebration', type: 'Dark Ride' } },
  { name: 'Journey Into Imagination with Figment', attributes: { park: 'EPCOT', land: 'World Celebration', type: 'Dark Ride' } },

  // World Nature
  { name: 'Soarin\' Around the World', attributes: { park: 'EPCOT', land: 'World Nature', type: 'Simulator' } },
  { name: 'Living with the Land', attributes: { park: 'EPCOT', land: 'World Nature', type: 'Boat Ride' } },
  { name: 'The Seas with Nemo & Friends', attributes: { park: 'EPCOT', land: 'World Nature', type: 'Dark Ride' } },
  { name: 'Turtle Talk with Crush', attributes: { park: 'EPCOT', land: 'World Nature', type: 'Show' } },
  { name: 'Awesome Planet', attributes: { park: 'EPCOT', land: 'World Nature', type: 'Show' } },

  // World Discovery
  { name: 'Guardians of the Galaxy: Cosmic Rewind', attributes: { park: 'EPCOT', land: 'World Discovery', type: 'Coaster' } },
  { name: 'Test Track', attributes: { park: 'EPCOT', land: 'World Discovery', type: 'Simulator' } },
  { name: 'Mission: SPACE', attributes: { park: 'EPCOT', land: 'World Discovery', type: 'Simulator' } },

  // World Showcase
  { name: 'Frozen Ever After', attributes: { park: 'EPCOT', land: 'World Showcase - Norway', type: 'Dark Ride' } },
  { name: 'Gran Fiesta Tour Starring The Three Caballeros', attributes: { park: 'EPCOT', land: 'World Showcase - Mexico', type: 'Dark Ride' } },
  { name: 'Remy\'s Ratatouille Adventure', attributes: { park: 'EPCOT', land: 'World Showcase - France', type: 'Dark Ride' } },
  { name: 'Reflections of China', attributes: { park: 'EPCOT', land: 'World Showcase - China', type: 'Show' } },
  { name: 'Impressions de France', attributes: { park: 'EPCOT', land: 'World Showcase - France', type: 'Show' } },
  { name: 'O Canada!', attributes: { park: 'EPCOT', land: 'World Showcase - Canada', type: 'Show' } },
  { name: 'American Adventure', attributes: { park: 'EPCOT', land: 'World Showcase - USA', type: 'Show' } },

  // === HOLLYWOOD STUDIOS ===
  // Hollywood Boulevard
  { name: 'The Great Movie Ride', attributes: { park: 'Hollywood Studios', land: 'Hollywood Boulevard', type: 'Dark Ride' } }, // Closed, now Mickey & Minnie's
  { name: 'Mickey & Minnie\'s Runaway Railway', attributes: { park: 'Hollywood Studios', land: 'Hollywood Boulevard', type: 'Dark Ride' } },

  // Sunset Boulevard
  { name: 'Tower of Terror', attributes: { park: 'Hollywood Studios', land: 'Sunset Boulevard', type: 'Dark Ride' } },
  { name: 'Rock \'n\' Roller Coaster Starring Aerosmith', attributes: { park: 'Hollywood Studios', land: 'Sunset Boulevard', type: 'Coaster' } },
  { name: 'Lightning McQueen\'s Racing Academy', attributes: { park: 'Hollywood Studios', land: 'Sunset Boulevard', type: 'Show' } },

  // Toy Story Land
  { name: 'Slinky Dog Dash', attributes: { park: 'Hollywood Studios', land: 'Toy Story Land', type: 'Coaster' } },
  { name: 'Toy Story Mania!', attributes: { park: 'Hollywood Studios', land: 'Toy Story Land', type: 'Dark Ride' } },
  { name: 'Alien Swirling Saucers', attributes: { park: 'Hollywood Studios', land: 'Toy Story Land', type: 'Flat Ride' } },

  // Star Wars: Galaxy's Edge
  { name: 'Star Wars: Rise of the Resistance', attributes: { park: 'Hollywood Studios', land: 'Star Wars: Galaxy\'s Edge', type: 'Dark Ride' } },
  { name: 'Millennium Falcon: Smugglers Run', attributes: { park: 'Hollywood Studios', land: 'Star Wars: Galaxy\'s Edge', type: 'Simulator' } },

  // Animation Courtyard & Echo Lake
  { name: 'Star Tours - The Adventures Continue', attributes: { park: 'Hollywood Studios', land: 'Echo Lake', type: 'Simulator' } },
  { name: 'Indiana Jones Epic Stunt Spectacular!', attributes: { park: 'Hollywood Studios', land: 'Echo Lake', type: 'Show' } },
  { name: 'Voyage of the Little Mermaid', attributes: { park: 'Hollywood Studios', land: 'Animation Courtyard', type: 'Show' } },
  { name: 'Disney Junior Play and Dance!', attributes: { park: 'Hollywood Studios', land: 'Animation Courtyard', type: 'Show' } },
  { name: 'MuppetVision 3D', attributes: { park: 'Hollywood Studios', land: 'Grand Avenue', type: 'Show' } },

  // === ANIMAL KINGDOM ===
  // Oasis
  { name: 'The Oasis Exhibits', attributes: { park: 'Animal Kingdom', land: 'Oasis', type: 'Walk-Through' } },

  // Discovery Island
  { name: 'It\'s Tough to be a Bug!', attributes: { park: 'Animal Kingdom', land: 'Discovery Island', type: 'Show' } },

  // Africa
  { name: 'Kilimanjaro Safaris', attributes: { park: 'Animal Kingdom', land: 'Africa', type: 'Other' } },
  { name: 'Gorilla Falls Exploration Trail', attributes: { park: 'Animal Kingdom', land: 'Africa', type: 'Walk-Through' } },
  { name: 'Wildlife Express Train', attributes: { park: 'Animal Kingdom', land: 'Africa', type: 'Other' } },

  // Rafiki's Planet Watch
  { name: 'Affection Section', attributes: { park: 'Animal Kingdom', land: 'Rafiki\'s Planet Watch', type: 'Walk-Through' } },
  { name: 'Conservation Station', attributes: { park: 'Animal Kingdom', land: 'Rafiki\'s Planet Watch', type: 'Walk-Through' } },

  // Asia
  { name: 'Expedition Everest', attributes: { park: 'Animal Kingdom', land: 'Asia', type: 'Coaster' } },
  { name: 'Kali River Rapids', attributes: { park: 'Animal Kingdom', land: 'Asia', type: 'Water Ride' } },
  { name: 'Maharajah Jungle Trek', attributes: { park: 'Animal Kingdom', land: 'Asia', type: 'Walk-Through' } },
  { name: 'Feathered Friends in Flight!', attributes: { park: 'Animal Kingdom', land: 'Asia', type: 'Show' } },

  // DinoLand U.S.A.
  { name: 'DINOSAUR', attributes: { park: 'Animal Kingdom', land: 'DinoLand U.S.A.', type: 'Dark Ride' } },
  { name: 'TriceraTop Spin', attributes: { park: 'Animal Kingdom', land: 'DinoLand U.S.A.', type: 'Flat Ride' } },
  { name: 'The Boneyard', attributes: { park: 'Animal Kingdom', land: 'DinoLand U.S.A.', type: 'Walk-Through' } },

  // Pandora - The World of Avatar
  { name: 'Avatar Flight of Passage', attributes: { park: 'Animal Kingdom', land: 'Pandora - World of Avatar', type: 'Simulator' } },
  { name: 'Na\'vi River Journey', attributes: { park: 'Animal Kingdom', land: 'Pandora - World of Avatar', type: 'Boat Ride' } },
];
