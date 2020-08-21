


import React from 'react';

import Card from '../Card';

import ajax from '../../ajax';
import CardColumn from '../CardColumn';

function App() {

    const [cards, setCards] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);


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
        const data = new ajax().get('cards');
        data.then(res => {
            setCards(res);
        });
    }


    return (
        <div>
            <button onClick={postform}>post</button>
            ||||
            <button onClick={getform}>get</button>
            <br/><br/><br/>

            <div style={{display: 'flex'}}>
                <CardColumn>
                    <h1>To Do</h1>
                    {cards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                data={card}
                            />
                        );
                    })}
                </CardColumn>
                <CardColumn>
                    <h1>In Progress</h1>
                    {cards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                data={card}
                            />
                        );
                    })}
                </CardColumn>
                <CardColumn>
                    <h1>Completed</h1>
                    {cards.map((card, index) => {
                        return (
                            <Card
                                key={index}
                                data={card}
                            />
                        );
                    })}
                </CardColumn>
            </div>



        </div>
    );
}

export default App;
