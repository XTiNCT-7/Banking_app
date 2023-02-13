import React,{useState} from 'react';
import { Notification } from './notify';
import { formatNumber,trim } from './utils';
export const CreateAccountPage = (props) => {
    const createRandomAccount = () => {
        return Math.floor(1000000 + Math.random() * 90000);
    }
    
    const [notif, setNotif] = useState({message: 'Create a new client account.', style: 'left'});
    const [initialBalance, setInitialBalance] = useState(0);
    const [initialAccountNumber, setInitialAccountNumber] = useState(createRandomAccount());

    const createNewAccount = (user) => {

        const emptyInputs = Object.values(user).filter(input => {
            return input === ''
        });

        const localUsers = props.users;
        console.log(localUsers);
        let alreadyExists = false;
        localUsers.forEach(row => {
            if(row.mail === user.mail) {
                alreadyExists = true;
            }
        });

        if(alreadyExists) {
            setNotif({message: 'This email already exists. Try again.', style: 'danger'});
            return false;
        } else if(emptyInputs.length > 0) {
            setNotif({message: 'All fields are required.', style: 'danger'});
            return false;
        } else {
            setNotif('');
            localUsers.unshift(user);
            props.setUsers(localUsers); 
            localStorage.setItem('users', JSON.stringify(localUsers));
            fetch("http://localhost:8084/api/v1/users/",
              {
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify(user)
              }
            )
            setNotif({message: 'Successfully saved.', style: 'success'});
            
            return true;
        }
    }

    const handleCreateAccount = (event) => {
        event.preventDefault();
        const user = event.target.elements;
        console.log(user.mail?.value);
        const account = {
            mail: user.mail?.value,
            password: user.password?.value,
            fname: user.fname?.value,
            type: user.type?.value,
            accountNumber: user.accountNumber?.value,
            admin: false,
            balance: trim(user.initialBalance?.value), 
            transaction: [],
            customer:true
        }

        const isSaved = createNewAccount(account);
        if(isSaved) {
            user.mail.value = '';
            user.password.value = '';
            user.fname.value = ''; 
            user.accountNumber.value = setInitialAccountNumber(createRandomAccount());
            user.initialBalance.value = setInitialBalance(0);
        }
    }

    const onInitialBalance = event => {
        const amount = trim(event.target.value) || 0;
        console.log(amount);
        setInitialBalance(amount);
    }

    return (
        <section id="main-content">
            <form id="form" onSubmit={handleCreateAccount}>
                <h1>Create Account</h1>
                <Notification message={notif.message} style={notif.style} />
                <label htmlFor="fname">Full name</label>
                <input id="fname" type="text" autoComplete="off" name="fname" />
                <hr />
                <label htmlFor="accountNumber">Account number</label>
                <input id="accountNumber" name="accountNumber" className="right" value={initialAccountNumber} type="number" disabled />

                <label htmlFor="balance">Initial balance</label>
                <input id="balance" type="text" value={formatNumber(initialBalance)} onChange={onInitialBalance} name="initialBalance" className="right" />

                <label htmlFor="type">Account Type</label>
                <select name="type">
                    <option value="CURRENT">Current Account</option>
                    <option value="SAVINGS">Savings Account</option>
                </select>
                <hr />
                <label htmlFor="mail">Email Address</label>
                <input id="mail" type="email" name="mail" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" />
                <input value="Create Account" className="btn" type="submit" />
            </form>
        </section>
    )
}
