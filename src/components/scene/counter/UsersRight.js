import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as userInactive } from '@fortawesome/free-regular-svg-icons';
import { faUser as userActive } from '@fortawesome/free-solid-svg-icons';

export default class UsersRight extends React.Component {
  constructor(props){
    super(props);

  }

/*  render(){
    return(
      <div>
        <FontAwesomeIcon id={1} key={1} icon={userActive} className="user-icon user-icon--active" />
        <FontAwesomeIcon id={2} key={2} icon={userInactive} className="user-icon user-icon--inactive" />
      </div>
    );

  }*/

  render(){
    let users = [];

    let currentUser = this.props.currentUser;
    let isLeft = this.props.isLeft;

    for(let i = 1; i < 5; i++){
      let id = "user-right-" + i;
      if(i>currentUser){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
      } else if(i<currentUser){
        users.push(<FontAwesomeIcon key={id} id={id} icon={userInactive} className="user-icon user-icon--inactive" />);
      } else {
        if(!isLeft){
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--current" />);
        } else {
          users.push(<FontAwesomeIcon key={id} id={id} icon={userActive} className="user-icon user-icon--active" />);
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
