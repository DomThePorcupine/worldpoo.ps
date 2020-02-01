export type TopNavButton = {
    className?: string;
    text: string;
    onClick: () => void;
  }

export type StallTale = {
    taleId: number;
    currentScore: number;
    taleText: string;
    username: string;
    voted: boolean;
}

export type StallRating = {
    score: number;
}

export type StallInfo = {
    stallId: number;
    address: string;
    name: string;
    myRating: number | undefined;
    tales: Array<StallTale>;
    ratings: Array<StallRating>;
}

export type User = {
    username: string;
}