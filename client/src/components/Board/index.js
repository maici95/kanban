


// Board component

import React from 'react';
import './style.css';
import ajax from '../../ajax';
import Card from './Card';

Board.Col = Col;
Board.Header = Header;

const cols = [
    { name: 'To Do', status: 0 },
    { name: 'In Progress', status: 1 },
    { name: 'Testing', status: 2 },
    { name: 'Completed', status: 3 }
];

export default function Board(props) {

    const [card, setCard] = React.useState(null);

    function openCard(index) {
        setCard(index);
    }

    return (
        <div className="board-container">
            {card &&
                <div>test</div>
            }
            {cols.map((col, index) => {
                return (
                    <Board.Col key={index} status={col.status}
                        openCard={openCard}
                    >
                        <Board.Header>{col.name}</Board.Header>
                    </Board.Col>
                );
            })}
        </div>
    );
}

// Column for board
function Col(props) {

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        new ajax().get('cards', { status: props.status }).then(res => {
            setCards(res);
        });
    }, [props.status]);

    return (
        <div className="col-container container">
            {props.children}
            {cards.map((card, index) => {
                return (
                    <Card key={index}
                        onClick={props.openCard}
                        id={card.id}
                    >
                        <Card.Header><b>#{card.id}</b> {card.name}</Card.Header>
                        <Card.Text>{card.text}</Card.Text>
                        <Card.Info
                            card={{
                                id: card.id,
                                userId: card.userId,
                                deadline: card.deadline,
                                status: card.status
                            }}
                        ></Card.Info>
                    </Card>
                );
            })}
        </div>
    );
}

// Header for column
function Header(props) {

    return (
        <h1 className="col-header">
            {props.children}
        </h1>
    );
}
