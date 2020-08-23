


// Card component

import React from 'react';
import './style.css';
import ajax from '../../../ajax';

Card.Header = Header;
Card.Text = Text;
Card.Info = Info;

export default function Card(props) {

    return (
        <div className="card-container container"
            onClick={() => props.onClick(props.id)}
        >
            {props.children}
        </div>
    );
}

function Header(props) {

    return (
        <div>
            {props.children}
        </div>
    );
}

function Text(props) {

    return (
        <p className="small-text">
            {props.children}
        </p>
    );
}

function Info(props) {

    const [user, setUser] = React.useState({});
    const [comCount, setComCount] = React.useState(0);

    React.useEffect(() => {
        new ajax().get('users', { id: props.card.userId }).then(res => {
            setUser(res[0]);
        });
        new ajax().get('comments', { cardId: props.card.id }).then(res => {
            setComCount(res.length);
        })
    }, [props.card.userId, props.card.id]);

    const days = Math.floor((new Date(props.card.deadline) - new Date().getTime()) / 1000 / 60 / 60 / 24) + 1;
    const deadline = (
        props.card.status === "0" ? ''
        : days < 0 ? 'EXPIRED'
        : days === 0 ? 'TODAY'
        : days === 1 ? '1 dat'
        : days + ' days'
    );

    return (
        <div className="inline-container small-text card-info">
            <div>{user.name}</div>
            <div>
                {comCount > 0 &&
                    <span className="content-center">
                        <span role="img" aria-label="balloon">{comCount} &#128172;</span>
                    </span>
                }
            </div>
            <div className="text-right">{deadline}</div>
        </div>
    );
}
