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

type StallStoriesListState = {
    expanded: Array<boolean>;
}

class StallStoriesList extends Component<StallStoriesListProps, StallStoriesListState> {
    constructor(props: StallStoriesListProps) {
        super(props);
        this.state = {
            expanded: new Array(this.props.stories.length).fill(false),
        }

        this.onToggleExpand = this.onToggleExpand.bind(this);
    }

    onToggleExpand(idx: number): void {
        let newExpanded = this.state.expanded;
        newExpanded[idx] = !newExpanded[idx];
        this.setState({ expanded: newExpanded });
    }

    render() {
        return (
            <div className={`stallStoriesListContainer ${this.props.className}`}>
                {
                    this.props.stories.map((s, idx) => {
                        return (
                            <StallStory 
                                key={`stallStory-${idx}`}
                                expanded={this.state.expanded[idx]}
                                onToggleExpand={() => { this.onToggleExpand(idx) }} 
                                story={s} 
                            />
                        )
                    })
                }
            </div>
        )
    }
}
  
export default StallStoriesList;
  