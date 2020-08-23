


import React from 'react';

import ajax from '../../ajax';

import './style.css';


Card.NewCard = NewCard;

function Card(props) {
    const [user, setUser] = React.useState(null);
    const [commentCount, setCommentCount] = React.useState(0);

    React.useEffect(() => {
        if (props.data.userId) {
            new ajax().get('users', { id: props.data.userId }).then(res => {
                setUser(res[0]);
            });
        }
    }, [props.data.userId]);

    React.useEffect(() => {

        const data = new ajax().get('comments', { cardId: props.data.id });
        data.then(res => {
            setCommentCount(res.length);
        });

    }, [props.data.id]);

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

                    <div className="comments-count">
                        {commentCount > 0 &&
                            <span role="img" aria-label="comments">&#128172; {commentCount}</span>
                        }
                    </div>
                    <span>
                        {props.data.deadline && props.data.status !== "0" &&
                            <span>
                                {props.data.status === '1' &&
                                    (days + 1 > 0 ? days + 1 + (days > 1 ? ' days' : ' day')
                                        : days < -1 ? 'EXPIRED'
                                        : 'TODAY')
                                }
                                {props.data.status === '2' &&
                                    'DONE'
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
