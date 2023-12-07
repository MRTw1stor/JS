start geth --datadir "C:\Users\Blockchain\Desktop\transact\batnik" --http --http.port 8545 --http.api "web3,eth,net,personal,miner" --http.corsdomain "*" --allow-insecure-unlock --networkid 7133
timeout /t 10
start cmd /k geth attach http://localhost:8545