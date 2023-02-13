import React, { useState,useEffect } from 'react';


import {Login} from './login1';
import {Dashboard} from './dashboard'
import { ClientDashboard } from './clientdash';
const Authenticate = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [notif, setNotif] = useState({message: '', style: ''});
    const [admin, setIsAdmin] = useState(false);
   
    const [client, setClient] = useState(null);
    const [posts, setPosts] = useState([]);
    //fetch
    const fetchPost = () => {
      console.log("here")
      fetch(
          "http://localhost:8084/api/v1/users/",{
          method:"GET"
      }).then((res)=>{
          return res.json();
        }).then((data)=>{
          console.log(data);
          setPosts(data)
        })
      // const data = await response.json();
      //   setPosts(data);
      };

    useEffect(() => {
      fetchPost();
    }, []);

    
    
    const localUsers = localStorage.getItem('users');
    //posts.forEach(user=>{console.log(user.admin)})
    if(!localUsers) {
        localStorage.setItem('users', posts); //JSON.stringify(posts)
      }

      //const clients = JSON.parse(localStorage.getItem('users'));
      console.log(posts)
      const clients = JSON.parse(JSON.stringify(posts))
      const isLoginSuccess = (email, password) => {
        let isFound = false;
  
        clients.forEach(user => { 
          console.log(user.customer);         
          if(user.mail === email && user.password === password) {
            if(user.admin ) {
              setIsAdmin(true);
              setClient(user);
              isFound = true;
              console.log([user.mail,user.password]);
            }
            else  {
              setIsAdmin(false);
              setClient(user)
              isFound = true;

              console.log([user.mail,user.password]);
            }
            setNotif('');
            console.log([user.mail,user.password]);
          }
        });
    
        if(!isFound) setNotif({message: 'Wrong username and password.', style: 'danger'});
        return isFound;
      }
    
      const login = (username, password) => {
        
          if(isLoginSuccess(username, password)) {
              setIsLoggedIn(true);
          }
      }
    
      const logout = () => {
          setIsLoggedIn(false);
          setIsAdmin(false);
          localStorage.removeItem('client')
          setNotif({message: 'You have logged out.', style: 'success'});
      }
      //console.log(client);
      
      
      if(isLoggedIn) {
        localStorage.setItem('currentUser', client);
        if(admin) {
          return <Dashboard users={clients} client={client} setClient={setClient} logoutHandler={logout} />
        } else {
          
          return <ClientDashboard client={client} users={clients} setClient={setClient} logout={logout} />
        }
      } else {
        return (<Login loginHandler={login}   notif={notif} isLoggedIn={isLoggedIn} /> )
      }
      // return(<><button onClick={fetchPost}></button></>);
  }

export default Authenticate