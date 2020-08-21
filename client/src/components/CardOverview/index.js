


import React from 'react';

import './style.css';
import ButtonPanel from '../ButtonPanel';

function CardOverview(props) {

    const [editMode, setEditMode] = React.useState(false);

    const nameRef = React.useRef(null);
    const textRef = React.useRef(null);
    const pointRef = React.useRef(null);
    const statusRef = React.useRef(null);
    const userRef = React.useRef(null);

    function saveCard() {
        props.save({
            name: nameRef.current.value,
            text: textRef.current.value,
            points: pointRef.current.value,
            status: statusRef.current.value,
            userId: userRef.current.value,
            id: props.data.id
        });
    }

    return (
        <div className="card-overview-container">
            {editMode &&
            <>
                <h1>{props.data.name}<span>#{props.data.id}</span></h1>

                <div className="card-content-panel">

                </div>

                <ButtonPanel>
                    <button onClick={() => setEditMode(true)}>edit</button>
                    <button onClick={props.close}>close</button>
                </ButtonPanel>
            </>
            }
            {!editMode &&
            <>
                <h1>
                    <input className="name-edit-field" ref={nameRef} defaultValue={props.data.name}/>
                    <span>#{props.data.id}</span>
                </h1>

                <div className="card-content-panel">
                    <h2>card's text:</h2>
                    <textarea ref={textRef} defaultValue={props.data.text}>
                    </textarea>

                    <h2>story points:</h2>
                        <input ref={pointRef} defaultValue={props.data.points} />
                    <h2>status:</h2>
                        <select ref={statusRef} defaultValue={props.data.status}>
                            <option value="0">To Do</option>
                            <option value="1">In Progress</option>
                            <option value="2">Completed</option>
                        </select>
                    <h2>user:</h2>
                        <select ref={userRef} defaultValue={props.data.userId}>
                            {props.users.map((user, index) => {
                                return (
                                    <option key={index} value={user.id}>{user.name}</option>
                                );
                            })}
                        </select>

                </div>

                <ButtonPanel>
                    <button onClick={saveCard}>save</button>
                    <button onClick={props.close}>close</button>
                </ButtonPanel>
            </>
            }

        </div>
    );
}

export default CardOverview;
