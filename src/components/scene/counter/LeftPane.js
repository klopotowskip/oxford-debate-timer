import React from 'react';

import UsersLeft from './UsersLeft';

export default class LeftPane extends React.Component {
  constructor(props){
    super(props);

  }

  render(){

    return (
      <div>
        <UsersLeft
          currentUser = {this.props.currentUser}
          isLeft = {this.props.isLeft}
        />
      </div>
    );
  }
}
