


import React from 'react';

import './style.css';

ButtonPanel.Right = Right;

function ButtonPanel(props) {

    return (
        <div className="button-panel">
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
