import React, { Component } from 'react';
import {connect} from 'react-redux';

class UserDetails extends Component {

  render() {
    console.log(this.props);
    return (
      <div>
        User Details
        <p>{this.props.user.email}</p>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  return{
    user: state.user
  }
}

export default connect(mapStateToProps)(UserDetails);
