// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract ekzamen {
    struct Statements {
        uint id_statements;
        address who;
        string car_number;
        string description_violation;
        uint status;
    }

    Statements[] private statements;

    address admin = 0xb8840F78e62F4e87092BEd970F16abdD2f53731E;

    constructor() {
        statements.push(
            Statements(
                statements.length,
                0x4EE178c1Ffc6Bb34FA85b6619E2a1E64660429d2,
                "U576BB",
                "Ran a red light",
                0
            )
        );
        statements.push(
            Statements(
                statements.length,
                0x4EE178c1Ffc6Bb34FA85b6619E2a1E64660429d2,
                "I567YT",
                "Speeded",
                0
            )
        );
        statements.push(
            Statements(
                statements.length,
                0x665a55d0E4CE6bee394492707A53c272175d3925,
                "K456YY",
                "Overtaken in the wrong place",
                0
            )
        );
        statements.push(
            Statements(
                statements.length,
                0x665a55d0E4CE6bee394492707A53c272175d3925,
                "L888LL",
                "Parked in the wrong place",
                0
            )
        );
        statements.push(
            Statements(
                statements.length,
                0xc9eaBc9528c42E373823eC14AE0c6d298530e829,
                "V243NM",
                "Scratched a parked car",
                0
            )
        );
        statements.push(
            Statements(
                statements.length,
                0xc9eaBc9528c42E373823eC14AE0c6d298530e829,
                "M876NM",
                "Hit a pedestrian",
                0
            )
        );
    }

    function NewStatement(
        string memory _carNumber,
        string memory _violation
    ) public {
        require(bytes(_carNumber).length > 0, "Car number cannot be empty");
        require(bytes(_violation).length > 0, "Description cannot be empty");

        statements.push(
            Statements(statements.length, msg.sender, _carNumber, _violation, 0)
        );
    }

    function confirmViolationReport(uint _index, uint _answer) public {
        require(msg.sender == admin, "Only admin can confirm violations");
        require(_index < statements.length, "Violation index does not exist");

        if (_answer == 0) {
            statements[_index].status = 1;
        } else if (_answer == 1) {
            statements[_index].status = 2;
        } else {
            revert("No such answer");
        }
    }

    function CheckStatements() public view returns (Statements[] memory) {
        return statements;
    }
}
