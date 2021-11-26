export type ShowImage = {
  medium: string;
  original: string;
};

export type Show = {
  id: number;
  name: string;
  image: ShowImage;
  summary: string;
  premiered: string;
  genres: string[];
};

export type ShowEpisode = {
  id: number;
  name: string;
  number: number;
  image: ShowImage;
  season: number;
  summary: string;
  type: string;
  airdate: string;
  url: string;
  runtime: number;
};
