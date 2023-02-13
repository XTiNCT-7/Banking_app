import React from 'react'
import { formatNumber } from './utils';
import { Account } from './account';
export const MainClientContent = (props) => {
    const {user} = props;
    console.log(user);

    const transactions = user.transaction?.map((transaction, index) => { /*?=> checks whether transaction is null or not dont forget*/
      const className = index % 2 === 0 ? 'even' : 'odd'
      return <div className={`transaction-item ${className}`}>
        <div>{transaction.date}</div>
        <div>{transaction.title}</div>
        <div>{transaction.type === 'debit' ? formatNumber(transaction.amount * -1) : formatNumber(transaction.amount)}</div>
      </div>
    });
  return (
    <section id="main-content">
        <h1 className="main">My Account</h1>
        <Account type={user.type} accountNumber={user.accountNumber} balance={user.balance} fname={user.fname} />
        <div id="transactions">
          <h2>Transactions</h2>
          <div id="transaction-div">
          {transactions}
          </div>
        </div>
      </section>
  )
}
