// -- Third party imports -- //
import React from 'react';

// -- Our imports -- //
import DefaultText from './default/DefaultText';
import '../styles/components/RatingOptions.css';

type RatingOptionsProps = {
    className?: string;
    value: number;
    ratings: Array<number>;
    onValueChange: (newValue: number) => void;
};

const RatingsOptions = ({ className, value, ratings, onValueChange }: RatingOptionsProps): JSX.Element => (
    <div className={`ratingsContainer ${className}`}>
        {
            ratings.map((r, idx) => {
                return (
                    <div 
                        key={`ratingCircle-${idx}`}
                        className={`ratingCircle ${r <= value ? 'ratingCircleSelected' : ''}`} 
                        onMouseDown={() => { onValueChange(r); }}
                    >
                        <DefaultText className={`ratingText ${r <= value ? 'ratingTextSelected' : ''}`} text={`${r}`} />
                    </div>
                )
            })
        }
    </div>
);
  
export default RatingsOptions;
  