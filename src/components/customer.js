import React from 'react';
import { ActionButtons1 } from './actionbuttons';


export const Customer = (props) => {
    const { userId,mail, fname, editingCustomer, setEditingCustomer, setDeleteCustomer, index, admin, setEditModal,customer} = props;

    const action = customer ? <ActionButtons1 index={index} 
      editingCustomer={editingCustomer} 
      setEditingCustomer={setEditingCustomer} 
      setEditModal={setEditModal} setDeleteCustomer={setDeleteCustomer} /> : '';

  return (
    <div className="account customer">
          <div className="details">
              <AccountHolder fname={fname} />
              <CustomerId userId={userId} />
              <CustomerEmail mail={mail} />
              {action}
          </div>
          
      </div>
  )
}

export const AccountHolder = (props) => {
    return (
      <h1>{props.fname}</h1>
    )
  }
  
  
export const CustomerId = (props) => {
    return (
      <h3>{props.userId}</h3>
    )
  }
  
  
export const CustomerEmail = (props) => {
    return (
      <div>{props.mail}</div>
    )
  }
  
  

