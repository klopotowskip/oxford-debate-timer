import React from 'react';

import UsersRight from './UsersRight';

export default class RightPane extends React.Component {
  constructor(props){
    super(props);

  }

  render(){

    return (
      <div>
        <UsersRight
          currentUser = {this.props.currentUser}
          isLeft = {this.props.isLeft}
        />
      </div>
    );
  }
}
