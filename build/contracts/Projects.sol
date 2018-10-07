pragma solidity ^0.4.23;

contract Projects {
  struct Project {
    address projectLeader;
    string title;
    string tags;
    uint timestamp;
    uint donation;
    uint countDonations;
    mapping (address => uint) donators;
  }

  string public projectHash;
  address public owner;
  uint public numProjects;
  mapping (bytes32 => Project) projects;
  mapping (uint => bytes32) projectIndex;

  event ResearchAndDonation(address _from, uint _donation);
  event ResearchAndProject(address _to, uint _donation);

  modifier onlyOwner()
  {
    if (msg.sender != owner) revert();
    _;
  }

  constructor() public {

    owner = msg.sender;
    numProjects = 0;

  }

  function newProject(string _projectIdString, string _title, string _tags, uint _donation) returns (bool) {

    bytes32 _projectId = stringToBytes(_projectIdString);
    if (projectExists(_projectIdString)) {
      return false;
      } else {
      Project p = projects[_projectId];
      p.projectLeader = msg.sender;
      p.title = _title;
      p.tags = _tags;
      p.projectId = _projectIdString;
      p.timestamp = block.timestamp;
      p.donation = _donation;
      p.countDonations = 0;
      projectIndex[numProjects] = _projectId;

      numProjects++;
      return true;

    }
  }

  function projectExists(string _projectIdString) returns (bool) {

    bytes32 _projectId = stringToBytes(_projectIdString);

   if (projects[_projectId].timestamp > 0) {
      return true;
    } else {
      return false;
    }
  }

  function getProjectWithId(string _projectIdString) returns (string) {

    bytes32 _projectId = stringToBytes(_projectIdString);

    if (projects[_projectId].donators[msg.sender] == 0) {
      revert();
    }

    return projects[_projectId].projectId;
  }

  function getProjectWithIndex(uint index) returns (string projectId, address projectLeader, string title, string tags, uint timestamp, uint countDonations) {

    projectId = projects[projectIndex[index]].projectId;
    projectLeader = projects[projectIndex[index]].projectLeader;
    title = projects[projectIndex[index]].title;
    tags = projects[projectIndex[index]].tags;
    timestamp = projects[projectIndex[index]].timestamp;
    countDonations = projects[projectIndex[index]].countDonations;

  }

  function donationToProject(string _projectIdString) {

    bytes32 _projectId = stringToBytes(_projectIdString);
    if (msg.value < 0) {
      revert();
      }

    projects[_projectId].countDonations += 1;
    projects[_projectId].donators[msg.sender] = msg.value;

  }

  function destroy() {

    if (msg.sender == owner) {
      selfdestruct(owner);
    }

  }

  function stringToBytes(string s) returns (bytes32) {

    bytes memory b = bytes(s);
    uint r = 0;
    for (uint i = 0; i < 32; i++) {
      if (i < b.length) {
        r = r | uint(b[i]);
      }
      if (i < 31) r = r * 256;
    }
    return bytes32(r);
  }

}
