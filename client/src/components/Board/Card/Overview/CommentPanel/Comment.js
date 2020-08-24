


import React from 'react';
import ajax from '../../../../../ajax';

Comment.Header = Header;
Comment.Content = Content;

export default function Comment(props) {

    const [user, setUser] = React.useState({});

    React.useEffect(() => {
        new ajax().get('users', { id: props.userId }).then(res => {
            setUser(res[0]);
        });
    }, [props.userId]);

    return (
        <div className="container comment-container">
            <Header>Posted by: {user && user.name} - <span className="small-text">{props.updated}</span></Header>
            {props.children}
        </div>
    );
}

function Header(props) {
    return (
        <div>
            {props.children}
        </div>
    );
}

function Content(props) {
    return (
        <div className="small-text">
            {props.children}
        </div>
    );
}
