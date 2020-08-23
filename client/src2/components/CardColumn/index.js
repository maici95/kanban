


import React from 'react';

import './style.css';

function CardColumn(props) {

    return (
        <div className="card-column-container">
            {props.children}
        </div>
    );
}

export default CardColumn;
