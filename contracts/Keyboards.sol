// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Keyboards {
    string[] public createdKeyboards;

    function getKeyboards() public view returns (string[] memory) {
        return createdKeyboards;
    }
}
