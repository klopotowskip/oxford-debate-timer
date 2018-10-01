import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userInactive } from '@fortawesome/free-regular-svg-icons';
import { faUser as userActive } from '@fortawesome/free-solid-svg-icons';

export default class UsersLeft extends React.Component {
  constructor(props){
    super(props);

  }

  render(){
    let users = [];

    let currentUser = this.props.currentUser;
    let isLeft = this.props.isLeft;

    for(let i = 1; i < 5; i++){
      let id = "user-left-" + i;
      if(i>currentUser){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
      } else if(i<currentUser){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
      } else {
        if(isLeft){
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--current" />);
        } else {
          users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
        }

      }

    }
    return (
      <div>
        {users.map((user) => {
          return user;
        })}
      </div>
    );
  }
}