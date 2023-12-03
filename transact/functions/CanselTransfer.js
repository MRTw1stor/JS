const tableCanselTransfers = document.querySelector(".transferCansel");
const whoTransact = document.getElementById("who");

async function CanselTransfer(allTransfers, RemoveItem, CanselMoney){
    RemoveItem()
    tableCanselTransfers.style.display = "block";
    const tableCansel = document.getElementById("tableCansel")

    for(let i = 0; i < allTransfers.length; i++){
        if(whoTransact.value == allTransfers[i].who && 
        allTransfers[i].status_execution == true && 
        allTransfers[i].status_reception == false){
            let body = document.createElement("tbody");
            let tdName = document.createElement("td");
            let tdMoney = document.createElement("td");
            let tdButton = document.createElement("td");
            const Button = document.createElement("button");
            Button.classList.add("buttonRevert");
            Button.id = `${allTransfers[i].id_transfer}`;
            Button.textContent = "Отменить";
            tdButton.append(Button);
            
            tdName.textContent = allTransfers[i].to;
            tdMoney.textContent = allTransfers[i].money / 100 ** 18 + " " + "Eth";
            body.append(tdName, tdMoney, tdButton);
            tableCansel.append(body);
            document.getElementById("quicBtnn").addEventListener("click", () => {
                body.remove();
            });
            CanselMoney()
        }
    }
}

export default CanselTransfer