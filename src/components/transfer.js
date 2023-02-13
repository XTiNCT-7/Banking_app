import React,{useState} from 'react'
import { Notification } from './notify';
import { formatNumber,getDateToday } from './utils';

export const TransferPage = (props) => {
    const {isClient, client, setClient} = props;
    const [users, setUsers] = useState(props.users); 
    const [receivers, setReceivers] = useState(users);
    const [sender, setSender] = useState( isClient ? client : {balance: 0});
    let [receiver, setReceiver] = useState({accountNumber: 0, balance: 0});
    const [notif, setNotif] = useState({message: 'Transfer money from one account to another.', style: 'left'});
    const [transferAmount, setTransferAmount] = useState(0);

    const senderSelected = (event) => {
        const accountNumber = parseInt(event.target.value);
       // console.log(accountNumber);
        const sender = null; 

        users.forEach(user => {
            console.log(accountNumber);
            console.log(user.accountNumber);
            if(user.accountNumber === accountNumber) {
                setSender = user;        
            }
        })
        
        const newUsers = users.filter((user, index) => {
            return user.accountNumber !== accountNumber;
        });

        setSender(sender);
        

        setReceivers(newUsers);
        setReceiver({accountNumber: 0, balance: 0});
    }

    const receiverSelected = event => {
        const accountNumber = parseInt(event.target.value);
        console.log(typeof(accountNumber));
        // let receiver = null;

        users.forEach(user => {
            console.log(typeof(user.accountNumber));
            if(user.accountNumber === accountNumber) {
                console.log(typeof(user));
                receiver = {
                    accountNumber:user.accountNumber,
                    balance:user.balance
                }
            }
        })
       
        setReceiver(receiver);
        console.log(receiver);
    }

    const senders = null;
    if(!isClient) {
        senders = users.map((user,i) => {
            return (
                <option value={user.accountNumber} key={i}>{user.fname} #{user.accountNumber}</option>
            )
        });
       
    }
   // console.log(senders);
    const newReceivers = receivers.map((receiver,i) => {
        
        if(sender.accountNumber !== receiver.accountNumber) {
           // console.log(receiver);
            return (
                <option value={receiver.accountNumber} key={i}>{receiver.fname} #{receiver.accountNumber}</option>
            )
        }
        
    })
    
    const transferFund = async(event) => {
        event.preventDefault();
        console.log(users);
        console.log(client);
        console.log(sender);
        console.log(receiver);
        const amount = parseFloat(event.target.elements.amount.value.replace(/,/g, ''));
        // console.log(amount);
        if(amount <= 0) return false;

        // get localstorage users
       // const users = users;
        
        if(sender.accountNumber !== 0 && receiver.accountNumber !== 0 ) {
            // deduct from sender
            let senderSuccess = false;
            users.forEach(async user => {
                if(user.accountNumber === sender.accountNumber) {
                    if(user.balance - amount >= 0) {
                        user.balance -= amount;

                        const transDate = new Date();
                        console.log(user.transaction);
                        user.transaction.unshift({
                            title: `Fund transfer to ${receiver.fullname} #${receiver.number}`, 
                            transactionAmount: amount, 
                            type: "debit", 
                            date: getDateToday(),
                            user :  {
                                userId: user.userId
                            }
                        });

                        setSender(user);
                        senderSuccess = true;
                        await fetch("http://localhost:8084/api/v1/transactions/",
                    {
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(user.transaction[0])
                    }
                    )
                        
                    }
                }
            });

            // add to receiver 
            if(senderSuccess) {
                users.forEach(user => {
                    if(user.accountNumber === receiver.accountNumber) {
                        user.balance += amount;
                        
                        user.transaction.unshift({
                            title: `Fund transfer from ${sender.fname} #${receiver.accountNumber}`, 
                            transactionAmount: amount, 
                            type: "credit", 
                            date: getDateToday(),
                            user :  {
                                userId: user.userId
                            }
                        });

                        setReceiver(user);
                        
                    }
                });

                setNotif({ message: 'Successful transfer.', style: 'success' });
                setUsers(users);
                props.setUsers(users);
                localStorage.setItem('users', JSON.stringify(users));
            
                setTransferAmount(0);
            } 
            else {
                setNotif({message: 'Transfer failed.', style: 'danger'});
            }
        }
        else {
            setNotif({message: 'Incomplete information. Missing sender or receiver.', style: 'danger' });
        }
    }

    const onTransfer = (e) => {
        const transfer = parseFloat(e.target.value.replace(/,/g, '')) || 0;
        setTransferAmount(transfer);
    }

    let senderField = 
        <select onChange={senderSelected} name="sender">
            <option>Select Sender</option>
            {senders}
        </select>;
    
    if(isClient) {
        senderField = <input type="text" name="sender" value={`${client.fname} #${client.accountNumber}`} disabled />
    }

  return (
    <section id="main-content">
            <form id="form" onSubmit={transferFund}>
                <h1>Fund Transfer</h1>
                
                <Notification message={notif.message} style={notif.style} />
                <h2>Sender</h2>
                <label>From (Sender)</label>
                {senderField}

                <label>Current balance</label>
                <input type="text" className="right" value={formatNumber(sender.balance)} disabled />

                <label>Amount to Transfer</label>
                <input type="text" name="amount" value={formatNumber(transferAmount)} onChange={onTransfer} autoComplete="off" className="right big-input" />

                <div className="transfer-icon"><i className='bx bx-down-arrow-alt'></i></div>
                <h2>Receiver</h2>
                <label>To (Receiver)</label>
                <select value={receiver?.accountNumber || 0} onChange={receiverSelected} name="receiver">
                    <option>Select Receiver</option>
                    {newReceivers}
                </select>
                <label>Current balance</label>
                <input type="text" className="right" value={formatNumber(receiver.balance)} disabled />
                <input type="submit" className="btn" value="Transfer Fund" />
            </form>
        </section>
  )
}
