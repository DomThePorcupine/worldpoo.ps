export type TopNavButton = {
    className?: string;
    text: string;
    onClick: () => void;
  }

export type StallTale = {
    id: number;
    currentScore: number;
    taleText: string;
    username: string;
    myVote: boolean;
    averageScore: number;
}

export type StallRating = {
    score: number;
}

export type TempStallInfo = {
    id: number;
    name: string;
}

export type StallInfo = {
    id: number;
    address: string;
    name: string;
    myRating: number | undefined;
    tales: Array<StallTale>;
    ratings: Array<StallRating>;
}

export type User = {
    username: string;
}