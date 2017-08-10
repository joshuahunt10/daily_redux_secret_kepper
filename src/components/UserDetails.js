import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {logout} from '../actions/actions.js'

class UserDetails extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(e){
    e.preventDefault();
    this.props.logout()

  }

  render() {
    console.log('this.props on the UserDetails', this.props);
    if(!this.props.user){
      return <Redirect to='/login' />
    }
    return (
      <div className="container">
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">Welcome {this.props.user.full_name}!</h4>
            <h6 className="card-subtitle mb-2 text-muted">{this.props.user.email}</h6>
            <p className="card-text">Secret Message:</p>
            <p className="card-text">{this.props.user.message}</p>
          </div>
        </div>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleLogout}>
  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Logout</button>
</form>
      </div>
    )
  }

}

const mapStateToProps = (state) =>{
  console.log('state.user.user in userDetails',state.user.user);
  return{
    user: state.user.user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    logout: () => {
      dispatch(logout())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
