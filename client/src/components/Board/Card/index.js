


// Card component

import React from 'react';
import './style.css';
import ajax from '../../../ajax';
import Overview from './Overview';

Card.Header = Header;
Card.Text = Text;
Card.Info = Info;
Card.Overview = Overview;
Card.NewCard = NewCard;

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
        <div className="big-text">
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
        props.card.status === "3" ? 'DONE'
        : props.card.status === "0" ? ''
        : days < 0 ? 'EXPIRED'
        : days === 0 ? 'TODAY'
        : days === 1 ? '1 day'
        : days + ' days'
    );

    const getPrioColor = prio => ({
        '1': '#EB5A46',
        '2': '#FEAB4A',
        '3': '#F2D604',
        '4': '#60BD4F',
        '5': '#0079BF',
        'undefined': '#0079BF'
    }[prio]);

    return (
        <div className="inline-container small-text card-info"
            style={{background: getPrioColor(props.card.priority)}}
        >
            <div>{user && user.name}</div>
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


function NewCard(props) {

    const [status, setStatus] = React.useState(false);
    const nameRef = React.useRef(null);

    function newCard() {
        const body = {
            name: nameRef.current.value,
            points: "0",
            text: '',
            status: props.colId,
            deadline: "0",
            userId: "",
            priority: 0,
            updated: new Date().toISOString().slice(0, 10)
        }
        new ajax().post('cards', body).then(res => {
            props.rel();
            setStatus(false);
        });
    }

    return (
        <div className="">
            {!status &&
                <div
                    onClick={() => setStatus(true)}
                    className="container new-card-btn big-text text-center">+</div>
            }
            {status &&
                <div className="inline-container new-card-container">
                    <input ref={nameRef} placeholder="Card name..." />
                    <button onClick={newCard}>add</button>
                    <button onClick={() => setStatus(false)}>cancel</button>
                </div>
            }
        </div>
    );
}
