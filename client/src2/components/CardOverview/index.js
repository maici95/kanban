


import React from 'react';

import './style.css';
import ButtonPanel from '../ButtonPanel';
import CommentPanel from '../CommentPanel';
import ajax from '../../ajax';

function CardOverview(props) {

    const nameRef = React.useRef(null);
    const textRef = React.useRef(null);
    const pointRef = React.useRef(null);
    const statusRef = React.useRef(null);
    const userRef = React.useRef(null);
    const deadlineRef = React.useRef(null);

    const [rel, setRel] = React.useState(false);
    const [deleteBtn, setDeleteBtn] = React.useState(true);
    const [comments, setComments] = React.useState([]);

    function reload() {
        setRel(!rel);
    }

    function saveCard() {
        props.save({
            name: nameRef.current.value,
            text: textRef.current.value,
            points: pointRef.current.value,
            status: statusRef.current.value,
            deadline: deadlineRef.current.value,
            userId: userRef.current.value,
            id: props.data.id
        });
    }

    function handleDelete(event) {
        if (event.target.value === 'DELETE') {
            setDeleteBtn(false);
        } else {
            setDeleteBtn(true);
        }
    }

    React.useEffect(() => {
        const data = new ajax().get('comments', { cardId: props.data.id });
        data.then(res => {
            setComments(res);
        });
    }, [props.data.id, rel]);

    return (
        <div className="card-overview-container" id="card-overview">

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
                    <h2>deadline:</h2>
                        <input ref={deadlineRef} defaultValue={props.data.deadline} />
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
                    <ButtonPanel.Right>
                        <input placeholder="DELETE" onChange={handleDelete} />
                        <button onClick={() => props.delete(props.data.id)} disabled={deleteBtn}>delete</button>
                    </ButtonPanel.Right>
                </ButtonPanel>

                <CommentPanel
                    cardId={props.data.id}
                    commentPosted={reload}
                >
                    {comments.map((comment, index) => {
                        return (
                            <CommentPanel.Comment
                                key={index}
                                userId={comment.userId}
                                updated={comment.updated}
                            >
                                <p>{comment.text}</p>
                            </CommentPanel.Comment>
                        );
                    })}
                </CommentPanel>

        </div>
    );
}

export default CardOverview;
