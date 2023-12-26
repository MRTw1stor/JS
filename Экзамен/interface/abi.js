export const abi = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_index",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_answer",
                "type": "uint256"
            }
        ],
        "name": "confirmViolationReport",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_carNumber",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_violation",
                "type": "string"
            }
        ],
        "name": "NewStatement",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "CheckStatements",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint256",
                        "name": "id_statements",
                        "type": "uint256"
                    },
                    {
                        "internalType": "address",
                        "name": "who",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "car_number",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "description_violation",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "status",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct ekzamen.Statements[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]