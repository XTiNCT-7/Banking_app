import React,{useState} from 'react';
import { Notification } from './notify';
import { trim } from './utils';
export const CreateCustomerPage = (props) => {
    const createRandomId = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000);
    }
    
    const [notif, setNotif] = useState({message: 'Create a new client account.', style: 'left'});
    
    const [initialId, setInitialId] = useState(createRandomId());

    const createNewCustomer = (user) => {

        const emptyInputs = Object.values(user).filter(input => {
            return input === ''
        });

        const localUsers = props.users;

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
            localStorage.setItem('customers', JSON.stringify(localUsers));
            setNotif({message: 'Successfully saved.', style: 'success'});
            return true;
        }
    }

    const handleCreateCustomer = (event) => {
        event.preventDefault();
        const user = event.target.elements;

        const customer = {
            mail: user.mail.value,
            
            fname: user.fname.value,
            
            
            admin: false,
             
            
            customer:true,
            id:user.userId.value
        }

        const isSaved = createNewCustomer(customer);
        if(isSaved) {
            user.mail.value = '';
            
            user.fname.value = ''; 
            user.userId.value = setInitialId(createRandomId());
            
        }
    }

    

    return (
        <section id="main-content">
            <form id="form" onSubmit={handleCreateCustomer}>
                <h1>Create New Customer</h1>
                <Notification message={notif.message} style={notif.style} />
                <label htmlFor="fullname">Customer name</label>
                <input id="fullname" type="text" autoComplete="off" name="fullname" />
                <hr />
                <label htmlFor="gender">Gender</label>
                <select name="gender">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="other">Other</option>
                </select>


                {/* Date of birth */}
                <hr/>
                <label htmlFor='dob'>Date of birth</label>
                <input type='date'/>

                <label htmlFor='address'>Address</label>
                <input type='textarea'/>

                <label htmlFor='city'>City</label>
                <input type='text'/>

                <label htmlFor='state'>State</label>
                <input type='text'/>

                <label htmlFor='pin'>PIN</label>
                <input type='number'/>

                <label htmlFor='tele'>Telephone/Mobile number</label>
                <input type='number'/>

                <label htmlFor="customer-id">Customer ID</label>
                <input id="customerid" name="customerId" className="right" value={initialId} type="number" disabled />
                <hr />
                <label htmlFor="email">Email Address</label>
                <input id="email" type="email" name="email" />
                
                <input value="create-customer" className="btn" type="submit" />
                <input value="Reset" className="btn" type="reset" />
            </form>
        </section>
    )
}
