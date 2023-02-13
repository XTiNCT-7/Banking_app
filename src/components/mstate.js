import React from 'react'

export const Mstatement = () => {
  return (
    <section id='main-content'>
      <form id='form'>
        <h1>MiniStatement</h1>
          <label htmlFor="account">Enter Account Number:</label>
            <input id="account"  type="number" />
            
            <button type="submit" className="btn2">Submit</button>
            <button type='reset' className='btn2'>Reset</button>
        
        </form>
    </section>
  )
}
