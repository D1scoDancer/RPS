// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract DelegateCallRPS {
    /* Need to copy State Vars in the same order*/
    address public gameMaster;
    address public playerLeft;
    address public playerRight;

    function registerNewPlayer(address _contract) public {
        (bool success, ) = _contract.delegatecall(
            abi.encodeWithSignature("registerNewPlayer()")
        );
        require(success, "Delegate Call failed");
    }
}
