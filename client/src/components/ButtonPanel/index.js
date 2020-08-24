


// Button panel component

import React from 'react';
import './style.css';

ButtonPanel.Right = Right;

export default function ButtonPanel(props) {

    return (
        <div className="container button-panel-container">
            {props.children}
        </div>
    );
}

function Right(props) {

    return (
        <div className="button-panel-right">
            {props.children}
        </div>
    );
}
