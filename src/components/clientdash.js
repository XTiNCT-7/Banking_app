import React,{useState} from 'react'
import { Sidebar } from './sidebar';
import { findAccount } from './utils';
import { MainClientContent } from './mainCC';
import { ChangePass } from './changepass';
import { TransferPage } from './transfer';
import Footer from './footer';
import { Mstatement } from './mstate';
import { CustStatement } from './cstate';

export const ClientDashboard = (props) => {
  const{logout, client,setClient} = props;
  const [users, setUsers] = useState(props.users);
  const [page, setPage] = useState('home');
  console.log(users);
  const changePageHandler =(pageName)=>{
    setPage(pageName);
    //console.log(client.accountNumber);
    const currentUser = findAccount(client.accountNumber,users);
    
    setClient(currentUser)
  }
  if(page === 'home') {
      
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
        <MainClientContent user={client} />
      </main>
      <Footer/>
      </div>
    )
  }

  if(page === 'account') {
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
        <ChangePass isClient="true" client={client} setClient={setClient} users={users} setUsers={setUsers} />
        
      </main>
      <Footer/>
      </div>
    )
  } 

  if(page === 'mstate') {
      
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
        <Mstatement client={client}/>
      </main>
      <Footer/>
      </div>
    )
  }
  if(page === 'custstate') {
      
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
        <CustStatement client={client}/>
        
      </main>
      <Footer/>
      </div>
    )
  }

   if(page === 'transfer') {
    return (
      <div>
      <main>
        <Sidebar changePage={changePageHandler} page={page} user={client} logoutHandler={props.logout} />
        <TransferPage isClient="true" client={client} setClient={setClient} users={users} setUsers={setUsers}  />
      </main>
      <Footer/>
      </div>
    )
  } 
}
  
