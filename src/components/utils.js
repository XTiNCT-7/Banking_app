import { useState ,useEffect} from "react";

export const Fetch = ()=>{
    const [posts, setPosts] = useState([]);
    //fetch
    const fetchPost = async () => {
    const response = await fetch(
        "http://localhost:8084/api/v1/users/"
      );
    const data = await response.json();
      setPosts(data);
    };

  useEffect(() => {
    fetchPost();
  }, []);
  return posts;
}

export function formatNumber(number) 
{   
    console.log(number);
    return number.toLocaleString(undefined,{maximumFractionDigits: 2}); //edited here number.toLocaleString(undefined,{maximumFractionDigits: 2})
}

export function trim(number) {
    return parseFloat(number.replace(/,/g, '')) || 0;
}

export function findAccount(number,users) {
    //const users = users
    console.log(users);
    //const users = JSON.parse(JSON.stringify(post));

    for(const user of users) {
        if(user.accountNumber === number) {
            return user;
        }
    }

    return false;
}

export function transact(number, amount, type, setUsers=null,users,transaction)
{
    let multiplier = 1;
    if(type === 'add' || type === 'credit') multiplier = 1;
    if(type === 'subtract' || type === 'debit') multiplier = -1;

   // const users = JSON.parse(localStorage.getItem('users'));
    
    for(const user of users) {
        if(user.accountNumber === number) {
            user.balance += amount * multiplier;
            console.log(user.balance);
            if(type === 'add' || type === 'credit') {
                user.transaction.unshift({
                    title: `Deposit`, 
                    transactionAmount: amount, 
                    type: "credit", 
                    date: getDateToday(),
                    user : {
                        userId: user.userId
                    }
                })
            }

            if(type === 'subtract' || type === 'debit') {
                user.transaction.unshift({
                    title: `Withdraw`, 
                    transactionAmount: amount, 
                    type: "debit", 
                    date: getDateToday(),
                    user :  {
                        userId: user.userId
                    }
                })
            }
            
            return{

            }
        }
    }
    setUsers(users);
    localStorage.setItem('users', JSON.stringify(users));
    
}

export function capitalize(str) 
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function saveBudgetToDB(accountNumber, newBudget) 
{
    const user = findAccount(accountNumber);
    user.budget = newBudget;
    const filteredUsers = addUserToUsers(user);
    localStorage.setItem('users', JSON.stringify(filteredUsers));
}



function addUserToUsers(user) {
    const users = JSON.parse(localStorage.getItem('users'));

    const filteredUsers = users.filter(dbUser => {
        return dbUser.accountNumber !== user.accountNumber;
    });

    filteredUsers.push(user);
    return filteredUsers;
}

export function getDateToday() {
    const transDate = new Date();
    return `${transDate.toLocaleString("en-us", { month: "long" })} ${transDate.getDay()}, ${transDate.getFullYear()}`;
    // console.log(transDate);
    // return transDate;
}
