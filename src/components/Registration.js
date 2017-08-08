import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      full_name: "",
      message: "",
      registerSuccess: false,
      errors: []
    }
    this.handleEmailInput = this.handleEmailInput.bind(this)
    this.handlePasswordInput = this.handlePasswordInput.bind(this)
    this.handleNameInput = this.handleNameInput.bind(this)
    this.handleMessageInput = this.handleMessageInput.bind(this)
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

  handleNameInput(e){
    this.setState({
      full_name: e.target.value
    })
  }

  handleMessageInput(e){
    this.setState({
      message: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
    console.log(this.state);
    fetch('https://user-auth-test.herokuapp.com/register',{
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        full_name: this.state.full_name,
        message: this.state.message
      }),
      headers: {
        'content-type': "application/json"
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
      if (json.success === "true"){
        this.setState({
          email: "",
          password: "",
          full_name: "",
          message: "",
          registerSucess: true
        })
      }
      this.setState({
        errors: json.errors
    })
  })
}


  render() {
    if(this.state.registerSucess === true){
      return <Redirect to='/registration/good' />
    }
    return (
      <div className="container">
        {this.state.errors.map(e =>{
          return (
            <div>{e}</div>


          )
        })}
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="InputEmail">Email address</label>
            <input type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleEmailInput} value={this.state.email}/>
          </div>
            <div className="form-group">
              <label htmlFor="InputPassword">Password</label>
              <input type="password" className="form-control" id="InputPassword" placeholder="Password" onChange={this.handlePasswordInput} value={this.state.password}/>
            </div>
            <div className="form-group">
              <label htmlFor="InputName">First and Last Name</label>
              <input type="text" className="form-control" id="InputName"  placeholder="Full Name" onChange={this.handleNameInput} value={this.state.full_name}/>
            </div>
            <div className="form-group">
              <label htmlFor="SecretTextArea">What Secret do you need kept safe?</label>
              <textarea className="form-control" id="SecretTextArea" rows="5" onChange={this.handleMessageInput} value={this.state.message}></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Register!</button>
        </form>
      </div>
    );
  }

}

export default Registration;
