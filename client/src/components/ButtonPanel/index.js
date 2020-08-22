


import React from 'react';

import './style.css';

ButtonPanel.Left = Left;
ButtonPanel.Right = Right;

function ButtonPanel(props) {

    return (
        <div className="button-panel">
            {props.children}
        </div>
    );
}

function Left(props) {
    return (
        <div style={{float: 'left'}}>
            {props.children}
        </div>
    );
}

function Right(props) {
    return (
        <div style={{float: 'right'}}>
            {props.children}
        </div>
    );
}

export default ButtonPanel;
