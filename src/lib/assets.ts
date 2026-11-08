export type CharacterId = "wawan" | "wowo";

export const assets: {
  heroVideo?: string;
  heroPoster?: string;
  characters: Partial<Record<CharacterId, string>>;
  dollImages: Record<string, string | undefined>;
} = {
  heroVideo: undefined,
  heroPoster: undefined,
  characters: {},
  dollImages: {},
};
