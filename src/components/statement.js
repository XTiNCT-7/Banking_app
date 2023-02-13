import React ,{useState}from 'react'
import { CustStatement } from './cstate'
import { Mstatement } from './mstate'
import { findAccount } from './utils'
import { Sidebar } from './sidebar'
import Footer from './footer'


export const Statement = (props) => {
  const{ client,setClient} = props;
  /* const [users, setUsers] = useState(props.users); */
  const [page, setPage] = useState('home');

  const changePageHandler =(pageName)=>{
    setPage(pageName);
    const currentUser = findAccount(client.accountNumber);
    setClient(currentUser)
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
}
