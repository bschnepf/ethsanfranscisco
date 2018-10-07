pragma solidity ^0.4.6;

contract Me {
  bytes32 first;
  bytes32 last;
  address owner;
  uint dateJoined;

  constructor() public {

    first = '';
    last = '';
    owner = msg.sender;
    dateJoined = block.timestamp;

  }

  function setMe(bytes32 _first, bytes32 _last) public constant {
    first = _first;
    last = _last;
  }

  function getMe() public constant returns (bytes32, bytes32) {
    return (first, last);
  }

  function destroy() {

    if (msg.sender == owner) {
          selfdestruct(owner);
    }

  }
}
