


// Board component

import React from 'react';
import './style.css';
import ajax from '../../ajax';
import Card from './Card';

Board.Menu = Menu;
Board.Col = Col;
Board.Header = Header;

const cols = [
    { name: 'To Do', status: "0" },
    { name: 'In Progress', status: "1" },
    { name: 'Testing', status: "2" },
    { name: 'Completed', status: "3" }
];

export default function Board(props) {

    const [cardId, setCardId] = React.useState(null);
    const [rel, setRel] = React.useState(false);
    const [compactView, setCompactView] = React.useState(false);

    function openCard(id) {
        setCardId(id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <div className="board-container">
            <Board.Menu>
                <button onClick={() => setCompactView(!compactView)}>{compactView ? 'compact off' : 'compact on'}</button>
            </Board.Menu>
            {cardId &&
                <Card.Overview
                    id={cardId}
                    cols={cols}
                    close={() => {
                        setCardId(null);
                        setRel(!rel);
                    }}
                >
                </Card.Overview>
            }
            {cols.map((col, index) => {
                return (
                    <Board.Col key={index} status={col.status}
                        openCard={openCard}
                        reload={rel}
                        id={index}
                        compactView={compactView}
                    >
                        <Board.Header>{col.name}</Board.Header>
                    </Board.Col>
                );
            })}
        </div>
    );
}

function Menu(props) {

    //const [miniMenu, setMiniMenu] = React.useState(false);

    return (
        <div className="board-menu container">
            {props.children}
        </div>
    );
}

// Column for board
function Col(props) {

    const [cards, setCards] = React.useState([]);
    const [rel, setRel] = React.useState(false);

    React.useEffect(() => {
        new ajax().get('cards', { status: props.status }).then(res => {
            setCards(res);
        });
    }, [props.status, props.reload, rel]);

    return (
        <div className="col-container container">
            {props.children}
            <Card.NewCard
                colId={props.id}
                rel={() => setRel(!rel)}
            >

            </Card.NewCard>
            {cards.map((card, index) => {
                return (
                    <Card key={index}
                        onClick={props.openCard}
                        id={card.id}
                    >
                        <Card.Header><b>#{card.id}</b> {card.name}</Card.Header>
                        {!props.compactView && <Card.Text>{card.text}</Card.Text>}
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
