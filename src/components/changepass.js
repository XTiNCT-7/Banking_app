import React,{useState} from 'react';

import { Logo } from './logo';
import { Notification } from './notify';

export const ChangePass = (props) => {
    const [users,setUsers] = useState(props.users);
    const client = props.client;
   //const [client,setClient] = useState(props)
    //const clients = JSON.parse(localStorage.getItem('users'));
    //console.log(props.client);
    //const clients = JSON.parse(props.posts)
    
    const [notif, setNotif] = useState({message: '', style: ''});
    let [oldpass,setOldPass] = useState('');
    
    const [newpass,setNewPass] = useState('');
    const[repass,setRePass] = useState('');
    
    const onFormSubmit =(event)=>{
      event.preventDefault();

      console.log(client);
      



      if(oldpass===client.password){
        if(oldpass !== newpass){
        if(newpass===repass){
          users.forEach(user => {
            if(client.accountNumber === user.accountNumber){
              user.password = repass;
            }
            setNotif({message:'Password Changed',style:'success'});
            setUsers(users);
            props.setUsers(users);
            localStorage.setItem('users', JSON.stringify(users));
            fetch("http://localhost:8084/api/v1/users/",
              {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(client)
               // body:JSON.stringify(user)
              }
            )

          });
          
        }else{
          setNotif({message:'Re-entered Password does not match',style:'danger'});
        }}else{
          setNotif({message:'Old Password and Neq password match',style:'danger'});
        }
      }else{
        setNotif({message:'Old Password does not match',style:'danger'});
      }
    }
  return (
    <section id="main-content">
      <Logo/>
      <Notification message={notif.message} style={notif.style}/>
        <form id='form'>
          <h1>Change Password</h1>
          <label htmlFor='oldpass' id="oldpass" >Old password:</label>
        <input type="password" autoComplete="off" value={oldpass} onChange={e=> setOldPass(e.target.value)}/>

        <label htmlFor='newpass' id="newpass">New password:</label>
        <input type="password" autoComplete="off" value={newpass} onChange={e=> setNewPass(e.target.value)}/>

        <label htmlFor='repass' id="repass">Re-enter password:</label>
        <input type="password" autoComplete="off" value={repass}
        onChange={e=> setRePass(e.target.value)}/>

        <button type="submit" onClick={onFormSubmit} className="btn">Submit</button>
        <button type="reset" className="btn" >Reset</button>
        </form>
    </section>
  )
}
