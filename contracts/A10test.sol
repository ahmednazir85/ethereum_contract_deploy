pragma solidity ^0.4.17;

contract A10test{
 mapping(uint=>string) public data;
 uint public revisionNo=0;


 function setdata(string _data) public {
     data[revisionNo] = _data;
     revisionNo =revisionNo+1;
 }
}
