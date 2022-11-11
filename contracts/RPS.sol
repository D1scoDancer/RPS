// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

enum Choice {
    None,       // 0
    Rock,       // 1
    Paper,      // 2
    Scissors    // 3
}

enum Result {
    None,       // 0
    Tie,        // 1
    WinLeft,    // 2
    WinRight    // 3
}

contract RPS {
    address public gameMaster;

    address public playerLeft;
    address public playerRight;

    mapping(address => Choice) private choices;

    event GameOver(Result result, Choice playerLeft, Choice playerRight);
    event GameReset(string message);

    modifier onlyMaster() {
        require(gameMaster == msg.sender, "Msg.Sender must be GameMaster");
        _;
    }

    modifier onlyPlayers() {
        require(msg.sender == playerLeft || msg.sender == playerRight, "Msg.Sender must be one of players");
        _;
    }

    constructor() {
        gameMaster = msg.sender;
    }

    function registerNewPlayer() public {
        require(playerLeft == address(0) || playerRight == address(0), "Enough players already");
        if (playerLeft == address(0)) {
            playerLeft = msg.sender;
        } else if (playerLeft != msg.sender) {
            playerRight = msg.sender;
        }
    }

    function resetGameByMaster() public onlyMaster {
        resetGame();
    }

    function resetGame() internal {
        emit GameReset("Game state was reset to default");
        delete choices[playerLeft];
        delete choices[playerRight];
        playerLeft = address(0);
        playerRight = address(0);
    }

    function makeChoice(Choice ch) public onlyPlayers {
        choices[msg.sender] = ch;

        if (
            choices[playerLeft] != Choice.None &&
            choices[playerRight] != Choice.None
        ) {
            play();
        }
    }

    function play() internal {
        Choice lc = choices[playerLeft];
        Choice rc = choices[playerRight];
        if (lc == rc) {
            emit GameOver(Result.Tie, lc, rc);
        } else if (lc == Choice.Rock) {
            if (rc == Choice.Paper) {
                emit GameOver(Result.WinRight, lc, rc);
            } else {
                emit GameOver(Result.WinLeft, lc, rc);
            }
        } else if (lc == Choice.Paper) {
             if (rc == Choice.Scissors) {
                emit GameOver(Result.WinRight, lc, rc);
            } else {
                emit GameOver(Result.WinLeft, lc, rc);
            }
        } else if (lc == Choice.Scissors) {
             if (rc == Choice.Rock) {
                emit GameOver(Result.WinRight, lc, rc);
            } else {
                emit GameOver(Result.WinLeft, lc, rc);
            }
        }

        resetGame();
    }
}