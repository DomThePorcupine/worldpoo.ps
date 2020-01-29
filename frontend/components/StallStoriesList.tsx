// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //
import StallStory from './StallStory';
import { StallTale } from '../utils/Types';
import '../styles/components/StallStoriesList.css';

type StallStoriesListProps = {
    className?: string;
    stories: Array<StallTale>
};

const StallStoriesList = ({ className, stories }: StallStoriesListProps): JSX.Element => (
    <div className={`stallStoriesListContainer ${className}`}>
        {
            stories.map((s, idx) => {
                return (
                    <StallStory key={`stallStory-${idx}`} story={s} />
                )
            })
        }
    </div>
);
  
export default StallStoriesList;
  