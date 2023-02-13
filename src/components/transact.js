import React,{useState} from "react";
import { Notification } from "./notify";
import{formatNumber,findAccount,transact,trim,capitalize} from "./utils";
export const TransactPage = (props) => {
    //const users = JSON.parse(localStorage.getItem('users'));
    const users = props.users;
    const setNotif = props.setNotif;
    const notif = props.notif;
    const [accounts, setAccounts] = useState(users);
    let [selectedAccount, setSelectedAccount] = useState({"balance":0});//useState({balance: 0});
    const [depositAmount, setDepositAmount] = useState(0);
    const[transaction,setTransaction] = useState([]);
    const options = accounts.map((user,i )=> {
        return <option value={user.accountNumber} key={i}>{user.fname} #{user.accountNumber}</option>
    });

    const displayBalance = (e) => {
        setNotif(notif);
        const selectedNumber = parseInt(e.target.value);
        console.log(selectedNumber);
        for(const user of accounts) {
            console.log(typeof(user.accountNumber));
            console.log(typeof(selectedNumber));

            if(user.accountNumber === selectedNumber) {
                // console.log(user);
                setSelectedAccount(user);
                
                console.log(selectedAccount);
                break;
            }
        }
    }

    const onDeposit = (e) => {
        const amount = formatNumber(trim(e.target.value));
        console.log(amount);
        setDepositAmount(amount);
    }

    const processTransfer = async(e) => {
        e.preventDefault();
        const amount = trim(e.target.elements.amount.value);
        const accountNumber = parseInt(e.target.elements.account.value);
        console.log([amount,accountNumber]);
        if(amount > 0 && accountNumber !== "0") {
            for(const user of accounts) {
                if(user.accountNumber === accountNumber) {
                    transact(user.accountNumber, amount, props.type, props.setUsers,users,transaction);
                    setSelectedAccount(findAccount(user.accountNumber,users));
                    // setAccounts(JSON.parse(localStorage.getItem('users')));
                    setAccounts(users);
                    console.log(selectedAccount);
                    setDepositAmount(0);
                    setNotif({message: `${capitalize(props.page)} successful.`, style: 'success'});
                    console.log(user.balance);
                    await fetch("http://localhost:8084/api/v1/transactions/",
                    {
                        method:"POST",
                        headers:{"Content-Type":"application/json"},
                        body:JSON.stringify(user.transaction[0])
                    }
                    )
                    
                    break;
                }
            }
        } 
        else {
            setNotif({message: `${capitalize(props.page)} failed.`, style: 'danger'});
        }
    }
    // 'bx bx-up-arrow-alt'
    const icon = props.page === 'withdraw' ? 'bx bx-down-arrow-alt' : 'bx bx-up-arrow-alt';

    return (
        <section id="main-content">
            <form id="form" onSubmit={processTransfer}>
                <h1>{props.page}</h1>
                <Notification message={notif.message} style={notif.style} />
                <label>Account</label>
                <select name="account" onChange={displayBalance}>
                    <option value="0">Select Account</option>
                    {options}
                </select>

                <label>Current balance</label>
                <input type="text" className="right" value={formatNumber(selectedAccount.balance)} disabled />
                
                <div className="transfer-icon"><i className={icon}></i></div>
                <label>Amount to {props.page}</label>
                <input type="text" name="amount" value={depositAmount} onChange={onDeposit} autoComplete="off" className="right big-input" />
                <button type="submit" className="btn">{props.page}</button>
            </form>
        </section>
    )
}