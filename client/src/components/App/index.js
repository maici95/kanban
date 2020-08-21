


import React from 'react';

import Card from '../Card';

import ajax from '../../ajax';
import CardColumn from '../CardColumn';

function App() {

    const [cards, setCards] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    const [card, setCard] = React.useState(null);

    React.useEffect(() => {
        if (!loaded) {
            getform();
            setLoaded(true);
        }

    }, [loaded]);

    function postform() {
        const body = {
            name: 'Kanban board',
            points: '2',
            status: '0'
        }
        const data = new ajax().post('cards', body);
        data.then(res => {
        });
    }
    function getform() {
        const data = new ajax().get('cards', {});
        data.then(res => {
            setCards(res);
        });
    }


    function openCard(cardId) {
        const card = new ajax().get('cards', { id: cardId });
        card.then(res => {
            setCard(res[0]);
        });

    }

    function getCards(status) {
        return cards.map((card, index) => {
            if (parseInt(card.status) === status) {
                return <Card
                    onClick={openCard}
                    key={index}
                    data={card}
                />
            }
        })
    }

    return (
        <div>
            {card && console.log(card)}
            <div className="navbar" style={{width:'100%', height: '60px', background: '#333'}}></div>

            <div style={{display: 'flex'}}>
                <CardColumn>
                    <h1>To Do</h1>
                    {getCards(0)}
                </CardColumn>
                <CardColumn>
                    <h1>In Progress</h1>
                    {getCards(1)}
                </CardColumn>
                <CardColumn>
                    <h1>Completed</h1>
                    {getCards(2)}
                </CardColumn>
            </div>



        </div>
    );
}

export default App;
