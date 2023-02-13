import React from 'react'

export const CustStatement = () => {
  return (
    <section id='main-content'>
      <form id='form'>
        <h1>Custom Statement</h1>
          
              <label>Account Number</label>
            
                <input className="form-control" placeholder="XXXXXXXXXX" type="number" />
                <label>From Date</label>
                <input type="date"  />
                <label>To Date</label>
                <input type="date"  />
                <label>Amount Lower Limit</label>
                <input  className='right' type="number" placeholder='1000'  />
                <label>Number of Transaction</label>
                <input type="date"  />
                <button id="submit-btn" className="btn2"type="submit">
                    Submit
                </button>
                <button className="btn2" type="reset">
                    Reset
                </button>
                    
                
        
        </form>
    </section>
  )
}
