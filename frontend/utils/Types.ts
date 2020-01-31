export type TopNavButton = {
    className?: string;
    text: string;
    onClick: () => void;
  }

export type StallTale = {
    taleText: string;
    username: string;
}

export type StallRating = {
    score: number;
}

export type StallInfo = {
    address: string;
    name: string;
    tales: Array<StallTale>;
    ratings: Array<StallRating>;
}

export type User = {
    username: string;
}