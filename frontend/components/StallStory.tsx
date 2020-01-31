// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //
import DefaultText from './default/DefaultText';
import { StallTale } from '../utils/Types';
import '../styles/components/StallStory.css';

type StallStoryProps = {
    story: StallTale
    expanded: boolean;
    onToggleExpand: () => void;
};

const MAX_CHAR_PREVIEW = 60;

const StallStory = ({ story, expanded, onToggleExpand }: StallStoryProps): JSX.Element => (
    <div className="stallStoryContainer" onClick={onToggleExpand}>
        <DefaultText className="stallStoryUsername" text={story.username} />
        {
            story.taleText.length > MAX_CHAR_PREVIEW  ? (
                <div>
                    {
                        expanded ? (
                            <div>
                                <DefaultText className="stallStoryText" text={story.taleText} />
                                <DefaultText className="stallStoryReadMore" text="Read less..." />
                            </div>
                        ) : (
                            <div>
                                <DefaultText className="stallStoryText" text={`${story.taleText.slice(0, MAX_CHAR_PREVIEW)} ...`} />
                                <DefaultText className="stallStoryReadMore" text="Read more..." />
                            </div>
                        )
                    }
                </div>
            ) : (
                <DefaultText className="stallStoryText" text={story.taleText} />
            )
        }
    </div>
);
  
export default StallStory;
  