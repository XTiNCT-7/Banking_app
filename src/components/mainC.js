import React,{useEffect,useState} from 'react';
import { Account } from './account';

export const MainContent = (props) => {
    const users = props.users;
    const client = props.client;
    const {editingUser, setEditingUser, setEditModal, setDeleteUser} = props;
    const [isCurrentUserAdmin, setIsCurrentUserAdmin] = useState(false);

    useEffect(() => {
      //const localUser = JSON.parse(localStorage.getItem('currentUser'));
      //console.log(client);
      const localUser = client;
      setIsCurrentUserAdmin(localUser.isAdmin);
    }, [isCurrentUserAdmin]);
    
    const bankAccounts = users.map((user, index) => {
      return <Account key={index} index={index} fname={user.fname} 
        type={user.type} 
        admin={isCurrentUserAdmin} 
        accountNumber={user.accountNumber} 
        balance={user.balance} 
        editingUser={editingUser} 
        setEditingUser={setEditingUser} setEditModal={setEditModal} 
        setDeleteUser={setDeleteUser} />
    });
      
    return (
      <section id="main-content">
        {bankAccounts}
      </section>
    )
}
