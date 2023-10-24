export const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idTransfer",
        type: "uint256",
      },
    ],
    name: "CanselTransfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_idTransfer",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_pasword",
        type: "bytes32",
      },
    ],
    name: "CompliteTransfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_anketId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_golos",
        type: "uint256",
      },
    ],
    name: "ConfirmStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "NewStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_userAdres",
        type: "address",
      },
    ],
    name: "NewUsers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_money",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "_pasword",
        type: "bytes32",
      },
    ],
    name: "Transfeeer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Check_Role",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id_up",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "promoted",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "needGolos",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "howVoited",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "statusUp",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "statusCansel",
            type: "bool",
          },
        ],
        internalType: "struct Transfer.StatusUp[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Check_Transfers",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id_transfer",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "who",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "money",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "pasword",
            type: "bytes32",
          },
          {
            internalType: "bool",
            name: "status_execution",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "status_reception",
            type: "bool",
          },
        ],
        internalType: "struct Transfer.Transfers[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "Check_Users",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name_user",
            type: "string",
          },
          {
            internalType: "address",
            name: "login_user",
            type: "address",
          },
          {
            internalType: "bool",
            name: "status_user",
            type: "bool",
          },
        ],
        internalType: "struct Transfer.Users[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "statusUp",
    outputs: [
      {
        internalType: "uint256",
        name: "id_up",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "promoted",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "needGolos",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "howVoited",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "statusUp",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "statusCansel",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
