/**
 * Curated Unsplash photo URLs used as venue / offer imagery in the mock data.
 * Replace with `merchant_photos` table reads once `006_mobile_redesign_fields` lands.
 *
 * Format: source.unsplash.com photo IDs with size + quality params.
 */

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DINING_PHOTOS = {
  bar_bodega: [
    u("photo-1559339352-11d035aa65de"), // dim bar
    u("photo-1551218808-94e220e084d2"), // plated dish
    u("photo-1543007630-9710e4a00a20"), // wine bottles
    u("photo-1414235077428-338989a2e8c0"), // pasta closeup
    u("photo-1559339352-11d035aa65de"),
  ],
  maison_selby: [
    u("photo-1517248135467-4c7edcad34c4"), // hotel-style restaurant
    u("photo-1485921325833-c519f76c4927"),
    u("photo-1550966871-3ed3cdb5ed0c"),
    u("photo-1514933651103-005eec06c04b"),
  ],
  le_select: [
    u("photo-1466978913421-dad2ebd01d17"), // bistro
    u("photo-1414235077428-338989a2e8c0"),
    u("photo-1555396273-367ea4eb4db5"),
    u("photo-1559339352-11d035aa65de"),
  ],
};

export const WELLNESS_PHOTOS = {
  pulse_recovery: [
    u("photo-1540555700478-4be289fbecef"), // recovery / sauna
    u("photo-1571019613454-1cb2f99b2d8b"),
    u("photo-1558611848-73f7eb4001a1"),
    u("photo-1544161515-4ab6ce6db874"),
  ],
  othership: [
    u("photo-1610736570063-30d2bb6df9a3"), // ice bath
    u("photo-1571019613454-1cb2f99b2d8b"),
    u("photo-1540555700478-4be289fbecef"),
    u("photo-1591343395082-e120087004b4"),
  ],
  hammam_spa: [
    u("photo-1540555700478-4be289fbecef"),
    u("photo-1571019613454-1cb2f99b2d8b"),
    u("photo-1620916566398-39f1143ab7be"),
    u("photo-1591343395082-e120087004b4"),
  ],
};

export const PET_CARE_PHOTOS = {
  tailwaggers: [
    u("photo-1587300003388-59208cc962cb"), // happy dog
    u("photo-1601758228041-f3b2795255f1"),
    u("photo-1548199973-03cce0bbc87b"),
    u("photo-1583512603805-3cc6b41f3edb"),
  ],
  bone_biscuit: [
    u("photo-1583337130417-3346a1be7dee"),
    u("photo-1601758228041-f3b2795255f1"),
    u("photo-1548199973-03cce0bbc87b"),
    u("photo-1587300003388-59208cc962cb"),
  ],
};

export const ACTIVITIES_PHOTOS = {
  midtown_social: [
    u("photo-1572116469696-31de0f17cc34"), // social club / lounge
    u("photo-1543007630-9710e4a00a20"),
    u("photo-1549294413-26f195200c16"),
    u("photo-1556909114-f6e7ad7d3136"),
  ],
  rec_room: [
    u("photo-1556909114-f6e7ad7d3136"), // bowling / arcade
    u("photo-1571266028243-d220c6a3a9a1"),
    u("photo-1601758125946-6ec2ef64daf8"),
    u("photo-1572116469696-31de0f17cc34"),
  ],
};

/** Default cover image keyed by category slug. */
export const CATEGORY_COVER: Record<string, string> = {
  dining: u("photo-1414235077428-338989a2e8c0", 800),
  wellness: u("photo-1540555700478-4be289fbecef", 800),
  pet_care: u("photo-1587300003388-59208cc962cb", 800),
  activities: u("photo-1572116469696-31de0f17cc34", 800),
};
