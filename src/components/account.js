import React from 'react';
import { ActionButtons } from './actionbuttons';
import { formatNumber } from './utils';

export const Account = (props) => {
    const {type, accountNumber, balance, fname, editingUser, setEditingUser, setDeleteUser, index, admin, setEditModal} = props;
    console.log([accountNumber,balance,fname]);
    const action = admin ? <ActionButtons index={index} 
      editingUser={editingUser} 
      setEditingUser={setEditingUser} 
      setEditModal={setEditModal} setDeleteUser={setDeleteUser} /> : '';

  return (
    <div className="account">
          <div className="details">
              <AccountHolder fname={fname} />
              <AccountType type={type} />
              <AccountNumber accountNumber={accountNumber} />
              {action}
          </div>
          <AccountBalance balance={formatNumber(balance)} />
      </div>
  )
}

export const AccountHolder = (props) => {
    return (
      <h1>{props.fname}</h1>
    )
  }
  
  
export const AccountType = (props) => {
    return (
      <h3>{props.type}</h3>
    )
  }
  
  
export const AccountNumber = (props) => {
    return (
      <div>Acc.no.{props.accountNumber}</div>
    )
  }
  
  
export const AccountBalance = (props) => {
    const balance = props.balance;
    return (
      <div className="balance">{balance} Rs</div>
    )
  }
