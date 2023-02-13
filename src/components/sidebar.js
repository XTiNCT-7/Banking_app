import React from "react";
import { Logo } from "./logo";
export const Sidebar = (props) => {
    const { user, logoutHandler, changePage, page } = props;
    let menu = null;

    // not regular user but an admin
    if(!user) {
        menu = <SideMenu changePage={changePage} page={page} logoutHandler={logoutHandler} />;
    }

    // regular user
    if(user) {
        menu = <ClientMenu changePage={changePage} page={page} logoutHandler={logoutHandler} />
    }

    return(
        <section id="side-menu">
            <Logo />
            {menu}
        </section>
    )
}

export const ClientMenu = (props) => {
    const {changePage, logoutHandler, page,user} = props;

    return (
        <ul>
            <SideLink onClickHandler={changePage} active={page} page="home" icon="bi bi-house-door" text="Home" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="account" icon="bi bi-person-plus" text="Edit Account" user={user}/>
            
            
            <SideLink onClickHandler={changePage} active={page} page="mstate" icon="bi bi-file-earmark" text="Mini-Statement" drop='true' user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="custstate" icon="bi bi-file-earmark-check" text="Custom-Statement" drop="true" user={user}/>
            
            <SideLink onClickHandler={changePage} active={page} page="transfer" icon="bi bi-send-plus" text="Fund Transfer" user={user}/>
            <SideLink onClickHandler={logoutHandler} active={page} icon="bi bi-box-arrow-left" text="Logout" user={user}/>
        </ul>
    )
}

export const SideMenu = (props) => {
    const {changePage, logoutHandler, page,user} = props;
    return (
        <ul>
            <SideLink onClickHandler={changePage} active={page} page="home" icon="bi bi-house-door" text="Home" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="create-account" icon="bi bi-person-plus" text="Create Account" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="create-customer" icon="bi bi-people" text="Create Customer" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="account" icon="bi bi-pass" text="Change Password" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="transfer" icon="bi bi-send-plus" text="Fund Transfer" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="deposit" icon="bi bi-box-arrow-in-down" text="Deposit" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="withdraw" icon="bi bi-box-arrow-in-up" text="Withdraw" user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="mstate" icon="bi bi-file-earmark" text="Mini-Statement" drop='true'user={user}/>
            <SideLink onClickHandler={changePage} active={page} page="custstate" icon="bi bi-file-earmark-check" text="Custom-Statement" drop="true" user={user}/>
            <SideLink onClickHandler={logoutHandler} active={page} icon="bi bi-box-arrow-left" text="Logout" user={user}/>
        </ul>
    )
}

export const SideLink = (props) => {
    const {icon, text, page, active,drop} = props;
    
    function clickLink(event) {
        if(page) {
            event.preventDefault();
            props.onClickHandler(page);
        } else {
            event.preventDefault();
            props.onClickHandler();
        }
    }
    
    return (
        <li><a onClick={clickLink} className={ active === page ? 'active' : '' } href="#"><i className={icon} ></i> {text}</a></li>
    )
    }
