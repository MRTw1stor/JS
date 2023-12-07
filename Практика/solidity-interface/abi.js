export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id_request",
				"type": "uint256"
			}
		],
		"name": "AcceptRequest",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Idshop",
				"type": "uint256"
			}
		],
		"name": "DeleteShop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "DownSeller",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Idshop",
				"type": "uint256"
			}
		],
		"name": "GoSettledToShop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "NewAdministrators",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Idshop",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_review",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_star",
				"type": "uint256"
			}
		],
		"name": "NewReview",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_shop",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			}
		],
		"name": "NewShop",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "NewUsers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_Idreview",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_rating",
				"type": "uint256"
			}
		],
		"name": "RatingReview",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "RequestDownSeller",
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
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "UpBuyer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkRated",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "who",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "like",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dislike",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id_review",
						"type": "uint256"
					}
				],
				"internalType": "struct Seatransfer.WhoRated[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkRequest",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id_down",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "down_worker",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "status_request",
						"type": "bool"
					}
				],
				"internalType": "struct Seatransfer.RequestToDown[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkReviews",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id_review",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id_shop",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "who",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "review",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "stars",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "likes",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "dislikes",
						"type": "uint256"
					}
				],
				"internalType": "struct Seatransfer.Reviews[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkShops",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id_shop",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "shop",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "sity",
						"type": "string"
					}
				],
				"internalType": "struct Seatransfer.Shops[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkUps",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "who",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "whom",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "action",
						"type": "uint256"
					}
				],
				"internalType": "struct Seatransfer.UpAndDown[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "user",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "status_admin",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "status_seller",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "status_buyer",
						"type": "bool"
					}
				],
				"internalType": "struct Seatransfer.Users[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkWorkers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id_shop",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "worker",
						"type": "address"
					}
				],
				"internalType": "struct Seatransfer.Workers[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]