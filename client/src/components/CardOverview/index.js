


import React from 'react';

import './style.css';

function CardOverview(props) {


    const [editMode, setEditMode] = React.useState(false);

    const nameRef = React.useRef(null);

    function saveCard() {

        props.save({
            name: nameRef.current.value,
            id: props.data.id
        });
    }

    return (
        <div className="card-overview-container">

            {!editMode &&
            <>
                <h1>{props.data.name}<span>#{props.data.id}</span></h1>

                <button onClick={() => setEditMode(true)}>edit</button>
                <button onClick={props.close}>close</button>
            </>
            }
            {editMode &&
            <>
                <h1><input className="name-edit-field" ref={nameRef} defaultValue={props.data.name}/></h1>

                <button onClick={saveCard}>save</button>
                <button onClick={() => setEditMode(false)}>cancel</button>
            </>
            }

        </div>
    );
}

export default CardOverview;
