


// Card overview component

import React from 'react';
import './style.css';
import ajax from '../../../../ajax';
import ButtonPanel from '../../../ButtonPanel';
import CommentPanel from './CommentPanel';
import Comment from './CommentPanel/Comment';
import DatePicker from '../../../DatePicker';

const USERID = 2;

export default function Overview(props) {

    const formRef = React.useRef();
    const [card, setCard] = React.useState({});
    const delRef = React.useRef(null);
    const [delBtn, setDelBtn] = React.useState(true);
    const [users, setUsers] = React.useState([]);
    const [comments, setComments] = React.useState([]);
    const [rel, setRel] = React.useState(false);

    const [deadline, setDeadline] = React.useState(null);

    React.useEffect(() => {
        new ajax().get('cards', { id: props.id }).then(res => {
            setCard(res[0]);
        });
        new ajax().get('users').then(res => {
            setUsers(res);
        });
        new ajax().get('comments', { cardId: props.id }).then(res => {
            setComments(res);
        });
    }, [props.id, rel]);

    React.useEffect(() => {
        document.getElementById('cardStatus').value = card.status;
        document.getElementById('cardAssignTo').value = card.userId;
        document.getElementById('cardPriority').value = card.priority;
    }, [card, users]);

    function postForm() {
        const object = {
            id: props.id,
            deadline: deadline
        };
        ([...formRef.current.children]).forEach((input, key) => {
            if (input.type && (input.type).match(/text|textarea|select-one/)) {
                object[input.name] = input.value;
            }
        });
        new ajax().patch('cards', object);
        props.close();
    }

    function deleteChange() {
        if ((delRef.current.value).match(/DELETE/)) {
            setDelBtn(false);
        } else {
            setDelBtn(true);
        }
    }
    function handleDelete() {
        new ajax().delete('cards', { id: props.id });
        props.close();
    }

    function postComment(comment) {
        const body = {
            cardId: props.id,
            text: comment,
            userId: USERID
        }
        new ajax().post('comments', body).then(res => {
            setRel(!rel);
        });
    }

    return (
        <div className="container overview-container">
            <form ref={formRef}>
                <h2>Card name:</h2>
                    <input name="name" defaultValue={card.name} placeholder="Card name..." className="big-text" />
                <h2>Story points:</h2>
                    <input name="points" defaultValue={card.points} placeholder="Story points..." />
                <h2>Card description:</h2>
                    <textarea name="text" defaultValue={card.text} rows="4" placeholder="Card text..."></textarea>
                <h2>Card priority:</h2>
                    {/* <input name="priority" defaultValue={card.priority} placeholder="Card priority..." /> */}
                    <select id="cardPriority" name="priority" defaultValue={card.priority}>
                        {[/* 1, 2, 3, 4, 5 */'Critical', 'High', 'Normal', 'Low', 'None'].map((p, index) => {
                            return (
                                <option key={index} value={index + 1}>{p}</option>
                            );
                        })}
                    </select>
                <h2>Card status:</h2>
                    <select id="cardStatus" name="status" defaultValue={card.status}>
                        {props.cols.map((col, index) => {
                            return (
                                <option key={index} value={col.status}>{col.name}</option>
                            );
                        })}
                    </select>
                    <h2>Deadline:</h2>
                    <DatePicker
                        date={card.deadline}
                        onChange={(date) => setDeadline(date)}
                    />
{/*                 <h2>Deadline:</h2>
                    <input defaultValue={card.deadline} name="deadline" placeholder="yyyy/mm/dd" /> */}
                <h2>Assign to:</h2>
                    <select id="cardAssignTo" defaultValue={card.userId} name="userId">
                        {users.map((user, index) => {
                            return (
                                <option key={index} value={user.id}>#{user.id} {user.name}</option>
                            );
                        })}
                    </select>
            </form>

            <ButtonPanel>
                <button onClick={postForm}>save</button>
                <button onClick={props.close}>cancel</button>

                <ButtonPanel.Right>
                    <input placeholder="DELETE" ref={delRef} onChange={deleteChange} />
                    <button disabled={delBtn} onClick={handleDelete}>delete</button>
                </ButtonPanel.Right>
            </ButtonPanel>

            <hr/>
            
            <h2>Comments:</h2>
            <CommentPanel
                post={postComment}
            >
                {comments.map((comment, index) => {
                    return (
                        <Comment
                            updated={comment.updated}
                            userId={comment.userId}
                            key={index}>
                            <Comment.Content>{comment.text}</Comment.Content>
                        </Comment>
                    );
                })}
            </CommentPanel>
        </div>
    );
}


