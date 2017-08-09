import React, { Component } from 'react';
import {connect} from 'react-redux'
import {login} from '../actions/actions.js'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    }
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleEmailInput(e){
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordInput(e){
    this.setState({
      password: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault();
    console.log("handleSubmit")
    this.props.login(this.state.email, this.state.password, () => {
      this.setState({
        email: "",
        password: ""
      })

    })
  }

  render() {
    let info = null
    if(this.props.user.user){
      info = (
        <p>{this.props.user.user.full_name}</p>
      )
    }
    return (
      <div>
        {info}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="InputEmail">Email address</label>
            <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailInput} value={this.state.email}/>
          </div>
            <div className="form-group">
              <label htmlFor="InputPassword">Password</label>
              <input type="password" className="form-control" id="InputPassword" placeholder="Password" onChange={this.handlePasswordInput} value={this.state.password}/>
            </div>

            <input type="submit" value="Submit" className="btn btn-primary"/>
          </form>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  console.log('login state', state)
  return ({
    user: state.user
  })
}

const mapDispatchToProps = (dispatch) =>{
  return{
    login: (email, password, callback) => {
      dispatch(login(email, password, callback))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
