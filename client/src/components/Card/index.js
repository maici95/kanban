


import React from 'react';

import ajax from '../../ajax';

import './style.css';


Card.NewCard = NewCard;

function Card(props) {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        if (props.data.userId) {
            new ajax().get('users', { id: props.data.userId }).then(res => {
                setUser(res[0]);
            });
        }
    }, [props.data.userId]);

    const days = Math.floor((new Date(props.data.deadline) - new Date()) / 1000 / 60 / 60 / 24);

    return (
        <div className="card-container"
            onClick={() => props.onClick(props.data.id)}
        >
            <h2>
                {props.data.name || 'card title'}
                <span>
                    {'#' + props.data.id || '#'}
                </span>
            </h2>
            <p>
                {props.data.text || 'card text'}
            </p>

            <div className="user-panel">
                        {user && <h3 style={{background: user.color}}>{user.name[0]}</h3>}
                        {!user && <h3>u</h3>}
                    <span>
                        {props.data.deadline && props.data.status !== "0" &&
                            <span>
                                {props.data.status === '1' &&
                                    (days > 0 ? days + ' days' : 'TODAY')
                                }
                                {props.data.status === '2' &&
                                    'done'
                                }
                            </span>
                        }
                    </span>
            </div>

        </div>
    );
}

function NewCard(props) {

    return (
        <div className="card-container newcard-btn"
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
}

export default Card;
