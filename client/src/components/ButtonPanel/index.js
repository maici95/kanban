


import React from 'react';

import './style.css';

function ButtonPanel(props) {

    return (
        <div className="button-panel">
            {props.children}
        </div>
    );
}

export default ButtonPanel;
