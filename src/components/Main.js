import React, { Component } from 'react';

class Main extends Component {
    render() {
        return (
            <div className="container-fluid mt-5">
            <div className="row">
         <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
           <div className="content mr-auto ml-auto">
           <form onSubmit={(event) => {
event.preventDefault()
const _customerName = this.customerName.value
const _customerGests = this.customerGests.value
const _dinerDate = this.dinerDate.value
const _customerAddress = this.customerAddress.value
this.props.mint(_customerName, _customerGests,_dinerDate,_customerAddress)
 
           }}>
               <div className="form-group mr-sm-2">
                   <input ref={(input) => { this.customerName = input }} id="customerName" type="text" className="form-control" placeholder="Customer name" requierd="true" />
                   <input ref={(input) => { this.customerAddress = input }} id="customerAddress" type="text" className="form-control" placeholder="Customer 0x address" requierd="true" />
                   <input ref={(input) => { this.customerGests = input }}  id="customerGests" type="text" className="form-control" placeholder="People expected (Number)"  requierd="true"/>
                   <input ref={(input) => { this.dinerDate = input }}  id="dinerDate" type="text" className="form-control" placeholder="Diner Date (Unix ex : 1630335601000)"  requierd="true"/>
                   </div>
                   <button type="submit" className="btn btn-primary btn-block">Submit</button>
            </form>
           <hr/>
           { this.props.reservations.map((reservation, key) => {
          return(
           <div className="card mb-4" key={key} >
           <div className="card-header">
             <small className="text-muted"> ID: { reservation.id.toNumber() } / Event Date : { this.props.date.toLocaleDateString() } </small>
             </div>
             <ul id="postList" className="list-group list-group-flush">
               <li className="list-group-item"> 
                 <p> Reservation under the name of : <b>{ reservation.name } </b></p> 
                 <p>People expected : <b>{ reservation.people.toNumber() } </b></p> 
                 <p>Original Owner Address : { reservation.customer_addr }</p>
                 
               </li>
               <li key={key} className="list-group-item py-2">
               <p>Reservation validity is : <b>{ String(this.props.valida) }</b></p>
               </li>
               </ul>
               </div>
           )
         })}
           </div>
            </main>
            </div>
            </div>
            
        );
    }
}

export default Main;