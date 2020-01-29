// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //
import DefaultText from './default/DefaultText';
import { StallTale } from '../utils/Types';
import '../styles/components/StallStory.css';

type StallStoryProps = {
    story: StallTale
};

const StallStory = ({ story }: StallStoryProps): JSX.Element => (
    <div className="stallStoryContainer">
        <DefaultText className="stallStoryUsername" text={story.username} />
        <DefaultText className="stallStoryText" text={story.taleText} />
        <DefaultText className="stallStoryReadMore" text="Read more..." />
    </div>
);
  
export default StallStory;
  