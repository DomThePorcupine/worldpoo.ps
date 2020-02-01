// -- Third party imports -- //
import React, { Component } from 'react';

// -- Our imports -- //
import StallTaleComponent from './StallTaleComponent';
import { StallTale } from '../utils/Types';
import '../styles/components/StallTalesList.css';

type StallTalesListProps = {
    className?: string;
    tales: Array<StallTale>;
    onTaleVote: (taleIndex: number, vote: boolean) => void;
};

type StallTalesListState = {
    expanded: Array<boolean>;
}

class StallStoriesList extends Component<StallTalesListProps, StallTalesListState> {
    constructor(props: StallTalesListProps) {
        super(props);
        this.state = {
            expanded: new Array(this.props.tales.length).fill(false),
        }

        this.onToggleExpand = this.onToggleExpand.bind(this);
    }

    /**
     * Callback when user presses 'Read more' or 'Read less'
     * @param idx - index of tale to expand or decrease
     */
    onToggleExpand(idx: number): void {
        let newExpanded = this.state.expanded;
        newExpanded[idx] = !newExpanded[idx];
        this.setState({ expanded: newExpanded });
    }

    render() {
        return (
            <div className={`stallTalesListContainer ${this.props.className}`}>
                {
                    this.props.tales.map((t, idx) => {
                        return (
                            <StallTaleComponent 
                                key={`stallTale-${idx}`}
                                index={idx}
                                expanded={this.state.expanded[idx]}
                                onToggleExpand={() => { this.onToggleExpand(idx) }} 
                                onTaleVote={this.props.onTaleVote}
                                tale={t} 
                            />
                        )
                    })
                }
            </div>
        )
    }
}
  
export default StallStoriesList;
  