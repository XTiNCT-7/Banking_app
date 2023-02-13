import React, { useState } from 'react';
import Footer from './footer';
import { Logo } from './logo';
import { Notification } from './notify';
import '../styles/all.css'

export const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = (event) => {
    console.log([username,password]);
    event.preventDefault();
    props.loginHandler(username, password);
    // const [fetch,setFetch] = useState(props.onClick);
    // fetch();
  }

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  }
    return (
      <div>
      <div id="login-page">
       <div id="login">
          <Logo/>
          <Notification message={props.notif.message} style={props.notif.style}/>
          <form onSubmit={onSubmitHandler} >
            <label htmlFor="username">Username</label>
            <input id="username" autoComplete="off" onChange={onChangeUsername}  value={username} type="text" />
            <label htmlFor="password">Password</label>
            <input id="password" autoComplete="off" onChange={onChangePassword} value={password} type="password" />
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      </div>
      <Footer/>
      </div>
    )
}
