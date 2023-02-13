import React,{useState,useEffect} from 'react';
import { Sidebar } from './sidebar';
import { MainContent } from './mainC';
import { TransactPage } from './transact';
import { TransferPage } from './transfer';
import { CreateAccountPage } from './createAcc';
import Footer from './footer';
import { ChangePass } from './changepass';
import { Mstatement } from './mstate';
import { CustStatement } from './cstate';
import { CreateCustomerPage } from './createCust';

export const Dashboard = (props) => {
  const [page, setPage] = useState('home');
  const [users, setUsers] = useState(props.users);
  const [notif, setNotif] = useState({message: '', style: ''});
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); 
  const [newAccount, setNewAccount] = useState(null); 
  const [client, setClient] = useState(props.client)
  // console.log(users);
  // console.log(client);
  const changePageHandler = (pageName) => {
      setPage(pageName);

      if(pageName === 'withdraw') {
          setNotif({message: 'Select an account to withdraw money from.', style: 'left'});
      } 

      if(pageName === 'deposit') {
          setNotif({message: 'Select an account to deposit money.', style: 'left'});
      }
  }

  useEffect(() => {
      if(deleteUser !== null) {

          const filteredUsers = users.filter((user, index) => {
              return index !== deleteUser
          });

          setUsers(filteredUsers);
          setDeleteUser(null);
          // save
          localStorage.setItem('users', JSON.stringify(filteredUsers));
      }
  }, [deleteUser]);

  useEffect(() => {
      if(isUpdate) {
          const filteredUsers = users.map((user, index) => {
              if(user.accountNumber === newAccount.accountNumber) {
                  user = {...user, ...newAccount};
              }
              return user;
          });

          setUsers(filteredUsers);
          setIsUpdate(false);
          // save
          localStorage.setItem('users', JSON.stringify(filteredUsers));
      }
  }, [isUpdate]);

  let modal = null;
  if(editingUser !== null && editModal) {
      const user = users[editingUser];
      // accountName={} accountNumber={} balance={}
      modal = <AccountEditModal 
          accountName={user.fname} 
          accountNumber={user.accountNumber} 
          balance={user.balance} setEditModal={setEditModal} 
          setIsUpdate={setIsUpdate} setNewAccount={setNewAccount}  client={client} />
  }

  if(page === 'home') {
      return (
        <div>
          <main>
            <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
            <MainContent users={users} editingUser={editingUser} 
              setEditModal={setEditModal} 
              setEditingUser={setEditingUser} setDeleteUser={setDeleteUser} client={client}/>
            {modal}
          </main>
          <Footer/>
          </div>
      )
  }

  if(page === 'create-account') {
      return (
        <div>
          <main>
            <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
            <CreateAccountPage users={users} setUsers={setUsers} client={client}/>
          </main>
          <Footer/>
          </div>
      )
  }
  if(page === 'create-customer') {
    return (
      <div>
        <main>
          <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
          <CreateCustomerPage users={users} setUsers={setUsers} client={client}/>
        </main>
        <Footer/>
        </div>
    )
}

  if(page === 'account') {
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page}  logoutHandler={props.logout} />
        <ChangePass isClient="true"   users={users} setUsers={setUsers} client={client}/>
        
      </main>
      <Footer/>
      </div>
    )
  } 

  if(page === 'transfer') {
      return (
        <div>
          <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <TransferPage users={users} setUsers={setUsers} client={client} isClient="false" setClient={setClient}/>
          </main>
          <Footer/>
          </div>
      )
  }

  if(page === 'deposit') {
      return (
        <div>
          <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="add" page={page} client={client}/>
          </main>
          <Footer/>
          </div>
      )
  }

  if(page === 'withdraw') {
      return (
        <div>
          <main>
              <Sidebar changePage={changePageHandler} page={page} logoutHandler={props.logoutHandler} />
              <TransactPage users={users} setUsers={setUsers} notif={notif} setNotif={setNotif} type="subtract" page={page} client={client}/>
          </main>
          <Footer/>
          </div>
      )
  }
  if(page === 'mstate') {
      
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page}  logoutHandler={props.logout} client={client}/>
        <Mstatement users={users}/>
      </main>
      <Footer/>
      </div>
    )
  }
  if(page === 'custstate') {
      
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page}  logoutHandler={props.logout} />
        <CustStatement users={users} client={client}/>
        
      </main>
      <Footer/>
      </div>
    )
  }
}

const AccountEditModal = (props) => {
  const { accountName, accountNumber, balance, setEditModal, setNewAccount, setIsUpdate } = props;
  const [account, setAccount] = useState({fname: accountName, accountNumber: accountNumber, balance: balance});

  const closeModal = () => {
      setEditModal(false);
  }

  const updateAccount = (e) => {
      e.preventDefault();
      console.log("Update");
      setNewAccount(account);
      setIsUpdate(true);
      // close modal
      setEditModal(false);
  }

  const editAccountName = (e) => {
      const name = e.target.value;
      setAccount({...account, ...{fname: name}});
  }

  const editAccountNumber = (e) => {
      const number = e.target.value;
      setAccount({...account, ...{accountNumber: number}});
  }

  const editAccountBalance = (e) => {
      const balance = e.target.value;
      setAccount({...account, ...{balance: parseFloat(balance) || 0}});
  }

  return (
      <div className='overlay' >
        <div className='modal'>
      
          <form onSubmit={updateAccount} id='form'>
              <h2 className="title">Edit Account</h2>
              <label>Account name</label>
              <input name="account-name" onChange={editAccountName} value={account.fullname} autoComplete="off" />
              
              <label>Account number</label>
              <input type="text" name="amount" onChange={editAccountNumber} disabled value={account.number} autoComplete="off" />

              <label>Balance</label>
              <input type="text" name="balance" onChange={editAccountBalance} value={account.balance} autoComplete="off" />

              <button type="button" onClick={() => closeModal()} className="btn2 btn-muted">Cancel</button>
              <button type="submit" className="btn2">Update Account</button>
          </form>
          </div>
  </div>
  )
}
