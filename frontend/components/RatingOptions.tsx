// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //
import DefaultText from './default/DefaultText';
import '../styles/components/RatingOptions.css';

type RatingOptionsProps = {
    className?: string;
    value: string;
    ratings: Array<string>;
    onValueChange: (newValue: string) => void;
};

const RatingsOptions = ({ className, value, ratings, onValueChange }: RatingOptionsProps): JSX.Element => (
    <div className={`ratingsContainer ${className}`}>
        {
            ratings.map((r, idx) => {
                return (
                    <div 
                        key={`ratingCircle-${idx}`}
                        className={`ratingCircle ${parseInt(r) <= parseInt(value) ? 'ratingCircleSelected' : ''}`} 
                        onMouseDown={() => { onValueChange(r); }}
                    >
                        <DefaultText className={`ratingText ${parseInt(r) <= parseInt(value) ? 'ratingTextSelected' : ''}`} text={r} />
                    </div>
                )
            })
        }
    </div>
);
  
export default RatingsOptions;
  