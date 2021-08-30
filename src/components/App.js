import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Reservation from '../abis/Reservation.json'
import Navbar from './Navbar';
import Main from './Main';

class App extends Component {
   
  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
    
  }
  
async loadWeb3(){
  if (window.ethereum){
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }else if (window.web3){
    window.web3 = new Web3(window.web3.currentProvider)
  }else{
    window.alert('Non-Ethereum browser detected. You should install MetaMask')
  }
}

async loadBlockchainData(){
  
  const web3 = window.web3
  const accounts = await web3.eth.getAccounts()
  this.setState({ account: accounts[0] })

  const networkId = await web3.eth.net.getId()
  const networkData = Reservation.networks[networkId]
  if(networkData){
  const abi = Reservation.abi
  const address = networkData.address
  const contract = new web3.eth.Contract(abi, address)
 this.setState({ contract })
 const totalSupply = await contract.methods.the_total_Supply().call()
 this.setState({ totalSupply })

 // load reservations
 for (var i = 1; i <= totalSupply; i ++){
  const reservation = await contract.methods.reservations(i - 1).call(); 
  const validity = await contract.methods.checkValidity(i - 1).call()
  this.setState({
    reservations: [...this.state.reservations, reservation],
    date: new Date( reservation.dateEpoch.toNumber() * 1000 ),
    valida: validity
  })
} 
 

this.setState({ loading: false })
  }else{
    window.alert('Smart contract not deployed to detected network')
  }
}

mint(customerName, customerGests,dinerDate,customerAddress){
  this.setState({ loading:true })
  const uriString = "The URI string"; // this can be set to a ipfs Json file
  this.state.contract.methods.mint(customerAddress, customerName,customerGests, dinerDate, uriString).send({ from: this.state.account })
  .once('receipt', (receipt) => {
    this.setState({ loading: false })
  })
  
}
 
constructor(props){
  super(props)
   
  this.state = { 
    account: '',
    contract: null,
    totalSupply: 0,
    reservations: [],
    date: new Date(),
    loading: true
  }

this.mint = this.mint.bind(this)

  
}

  render() {
    return (
      <div> 
        <Navbar account={this.state.account} />
        { this.state.loading    
        ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
        : <Main reservations={this.state.reservations} mint={ this.mint } valida={this.state.valida}  date={this.state.date} />
        }

       </div>
            
    );
  }
}

export default App;
