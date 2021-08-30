pragma solidity 0.8.7;
 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; 
 
contract Reservation is ERC721URIStorage{

mapping( uint => reservation) public reservations; 
    uint public count;
    address public owner;
  struct reservation {
      uint id;
      string name;
      address customer_addr;
      uint people;
      uint dateEpoch;
      bool valid;
  }
constructor() ERC721("Reservation", "RESERVATION") public {
    owner = msg.sender;
     
}
function mint(address _customer_addr, string memory _name, uint _people, uint  _dateEpoch, string memory _tokenURI) public {
    
    require(owner == msg.sender); 
    require(bytes(_name).length > 0);
    require(_dateEpoch > block.timestamp);
        uint _id = count; 
    _safeMint(_customer_addr, _id);
    _setTokenURI(_id, _tokenURI);
    count ++; 
    reservation memory _reservation = reservations[_id];
    _reservation.id = count;
    _reservation.name = _name;
    _reservation.people = _people;
    _reservation.customer_addr = _customer_addr;
    _reservation.dateEpoch = _dateEpoch;
    _reservation.valid = true;
    reservations[_id] = _reservation; 
}


function checkValidity(uint _id) public view returns(bool){
    bool is_valid = reservations[_id].valid;
    if(block.timestamp > reservations[_id].dateEpoch){
    is_valid = false;
    }
    return is_valid;
}

function the_total_Supply() public view returns(uint){
return count;
} 
 
}