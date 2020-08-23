


import React from 'react';

import './style.css';
import ajax from '../../ajax';

CommentPanel.Comment = Comment;

function CommentPanel(props) {

    const textRef = React.useRef(null)

    function postComment() {
        const body = {
            cardId: props.cardId,
            text: textRef.current.value,
            userId: "2"
        }
        const data = new ajax().post('comments', body);
        data.then(res => {
            props.commentPosted();
        });
    }

    return (
        <div className="comment-panel-container">
            <h1>Comments:</h1>
             {props.children}

            <br/>
             <textarea
                ref={textRef}
                placeholder="your message..."
            ></textarea>
             <br/>
             <button onClick={postComment}>post</button>
        </div>
    );
}

function Comment(props) {

    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const data = new ajax().get('users', { id: props.userId });
        data.then(res => {
            setUser(res[0]);
        });
    }, [props.userId]);

    return (
        <div className="comment-container">
            {props.children}
            {user &&
                <div>
                    <b>posted by:</b> {user.name} - <small>{props.updated}</small>
                </div>
            }
        </div>
    );
}

export default CommentPanel;
