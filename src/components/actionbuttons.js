import React from 'react'

export const ActionButtons = (props) => {
    const {editingUser, setEditingUser, index, setEditModal, setDeleteUser} = props;
    
  return (
    <div id="actions">
        <ActionButton
        icon="bi bi-pencil" 
        text="Edit" 
        index={index} 
        actionType="edit"
        editingUser={editingUser} 
       
        setEditingUser={setEditingUser} setEditModal={setEditModal}
        />
        <ActionButton 
          icon="bi bi-eraser"  
          index={index} 
          actionType='delete'
          text="Delete" editingUser={editingUser} 
          setDeleteUser={setDeleteUser} />
    </div>
  )
}



export const ActionButton = (props) => {
    const {icon, text, editingUser, actionType, setEditingUser, index, setEditModal, setDeleteUser} = props;

    const click = (e, index) => {
      e.preventDefault();
      
      if(actionType === 'edit') {
        setEditingUser(index);
        setEditModal(true);
      }

      if(actionType === 'delete') {
        setDeleteUser(index);
      }
    }
  return (
    <button onClick={(e) => click(e, index)}><i className={icon} ></i> {text}</button>
  )
}

export const ActionButtons1 = (props) => {
  const {editingCustomer, setEditingCustomer, index, setEditModal, setDeleteCustomer} = props;
  
return (
  <div id="actions">
      <ActionButton1
      icon="bi bi-pencil" 
      text="Edit" 
      index={index} 
      actionType="edit"
      editingCustomer={editingCustomer} 
     
      setEditingCustomer={setEditingCustomer} setEditModal={setEditModal}
      />
      <ActionButton1
        icon="bi bi-eraser"  
        index={index} 
        actionType='delete'
        text="Delete" editingCustomer={editingCustomer} 
        setDeleteCustomer={setDeleteCustomer} />
  </div>
)
}



export const ActionButton1 = (props) => {
  const {icon, text, editingUser, actionType, setEditingUser, index, setEditModal, setDeleteUser} = props;

  const click = (e, index) => {
    e.preventDefault();
    
    if(actionType === 'edit') {
      setEditingUser(index);
      setEditModal(true);
    }

    if(actionType === 'delete') {
      setDeleteUser(index);
    }
  }
return (
  <button onClick={(e) => click(e, index)}><i className={icon} ></i> {text}</button>
)
}