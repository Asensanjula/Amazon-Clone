import React , {forwardRef}from 'react';
import FlipMove from "react-flip-move";

function Test(props) {
    return (
        <div ref={forwardRef}>
            <FlipMove>
                <div key="a">Hello</div>
                <div key="b">World</div>
            </FlipMove>
        </div>
    );
}

export default Test;