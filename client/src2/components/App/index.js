


import React from 'react';

import Card from '../Card';

import ajax from '../../ajax';
import CardColumn from '../CardColumn';
import CardOverview from '../CardOverview';
import ButtonPanel from '../ButtonPanel';

function App() {

    const [cards, setCards] = React.useState([]);
    const [users, setUsers] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [card, setCard] = React.useState(null);
    const [addCardStatus, setAddCardStatus] = React.useState(false);

    const cardNameRef = React.useRef(null);

    React.useEffect(() => {
        if (!loaded) {
            getCards();
            setLoaded(true);

            new ajax().get('users').then(res => {
                setUsers(res);
            });
        }

    }, [loaded]);


    function getCards() {
        const data = new ajax().get('cards', {});
        data.then(res => {
            setCards(res);
        });
    }

    function addCard() {
        const data = new ajax().post('cards', {
            name: cardNameRef.current.value,
            points: 0,
            status: 0,
            text: '',
            userId: null,
            updated: null,
            deadline: new Date().toISOString().slice(0, 10)
        });
        data.then(res => {
            setAddCardStatus(false);
            getCards();
        });
    }

    function openCard(cardId) {
        const card = new ajax().get('cards', { id: cardId });
        card.then(res => {
            setCard(res[0]);

            //document.getElementById('card-overview').scrollIntoView();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function closeCard() {
        setCard(null);
    }

    function saveCard(obj) {
        const data = new ajax().patch('cards', obj);
        data.then(res => {
            closeCard();
            getCards();
        });
    }

    function deleteCard(id) {
        const data = new ajax().delete('cards', { id: id } );
        data.then(res => {
            closeCard();
            getCards();
        });
    }

    function filterCards(status) {
        return cards.map((card, index) => {
            if (parseInt(card.status) === status) {
                return <Card
                    onClick={openCard}
                    key={index}
                    data={card}
                />
            }
            return null;
        });
    }



    return (
        <div>
            {card && <CardOverview
                data={card}
                close={closeCard}
                save={saveCard}
                delete={deleteCard}
                users={users}
            />}
            <div className="navbar" style={{width:'100%', height: '60px', background: '#333'}}></div>

            <div style={{display: 'flex'}}>
                <CardColumn>
                    <h1>To Do</h1>

                    {addCardStatus &&
                        <Card.NewCard>
                            <ButtonPanel>
                                <input ref={cardNameRef} placeholder="name..." />
                                <button onClick={addCard}>add</button>
                                <button onClick={() => setAddCardStatus(false)}>cancel</button>
                            </ButtonPanel>
                        </Card.NewCard>
                    }
                    {!addCardStatus &&
                        <Card.NewCard onClick={() => setAddCardStatus(true)}>
                            <h4>+</h4>
                        </Card.NewCard>
                    }

                    {filterCards(0)}
                </CardColumn>
                <CardColumn>
                    <h1>In Progress</h1>
                    {filterCards(1)}
                </CardColumn>
                <CardColumn>
                    <h1>Completed</h1>
                    {filterCards(2)}
                </CardColumn>
            </div>



        </div>
    );
}

export default App;
