// -- Third party imports -- //
import React from 'react';

// -- Our imports -- //
import DefaultText from './default/DefaultText';
import { StallTale } from '../utils/Types';
import poopImg from '../assets/crap.png';
import emptyPoopImg from '../assets/empty_crap.png';
import '../styles/components/StallTaleComponent.css';

type StallComponentTaleProps = {
    index: number;
    tale: StallTale
    expanded: boolean;
    onToggleExpand: () => void;
    onTaleVote: (taleIndex: number, vote: boolean) => void;
};

const MAX_CHAR_PREVIEW = 130;

const StallTaleComponent = ({ index, tale, expanded, onToggleExpand, onTaleVote }: StallComponentTaleProps): JSX.Element => (
    <div className="stallTaleContainer">
        <div onClick={onToggleExpand}>
            <DefaultText className="stallTaleUsername" text={tale.username} />
            {
                tale.taleText.length > MAX_CHAR_PREVIEW  ? (
                    <div>
                        {
                            expanded ? (
                                <div>
                                    <DefaultText className="stallTaleText" text={tale.taleText} />
                                    <DefaultText className="stallTaleReadMore" text="Read less" />
                                </div>
                            ) : (
                                <div>
                                    <DefaultText className="stallTaleText" text={`${tale.taleText.slice(0, MAX_CHAR_PREVIEW)} ...`} />
                                    <DefaultText className="stallTaleReadMore" text="Read more" />
                                </div>
                            )
                        }
                    </div>
                ) : (
                    <DefaultText className="stallTaleText" text={tale.taleText} />
                )
            }
        </div>
        <div className="stallTaleVoteContainer" onClick={() => { onTaleVote(index, !tale.voted) }}>
            <img className="stallTaleVoteButton" src={tale.voted ? poopImg : emptyPoopImg} />
            <DefaultText className="stallTaleVoteText" text={`${tale.currentScore}`} />
        </div>
    </div>
);
  
export default StallTaleComponent;
  