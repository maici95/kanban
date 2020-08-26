


// Comment panel component

import React from 'react';
import './style.css';


export default function CommentPanel(props) {

    const textRef = React.useRef(null);

    function handlePost() {
        props.post(textRef.current.value);
        textRef.current.value = '';
    }

    return (
        <div className="comment-panel">
            {props.children}

            <textarea ref={textRef} placeholder="your message..."></textarea>
            <br/>
            <button onClick={handlePost}>post</button>
        </div>
    );
}


