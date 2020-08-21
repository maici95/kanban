


import React from 'react';

import './style.css';

function Card(props) {

    return (
        <div className="card-container"
            onClick={() => props.onClick(props.data.id)}
        >
            <h1>
                {props.data.name || 'card title'}
                <span>
                    {'#' + props.data.id || '#'}
                </span>
            </h1>
            <p>
                {props.data.text || 'card text'}
            </p>
        </div>
    );
}

export default Card;
