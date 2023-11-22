let whoTransact = document.getElementById("who");
const profilestatus = document.getElementById("roletext2")
const numbershop = document.getElementById("numbershop")
const city = document.getElementById("city")
const shopworkers = document.getElementById("shopworkers")
const workersinshop = document.getElementById("workersinshop")

// Функция которая в зависимости от статуса отображает роль в профиле
async function CheckRole(users, shops, workers) {
    for (let i = 0; i < users.length; i++) {
        if (whoTransact.value == users[i].user) {
            if (users[i].status_admin == true && users[i].status_buyer == true) {
                profilestatus.textContent = "Администратор, покупатель"
                numbershop.style.display = "none"
                city.style.display = "none"
                shopworkers.style.display = "none"
            }
            if (users[i].status_seller == true && users[i].status_buyer == true) {
                profilestatus.textContent = "Продавец, покупатель"
                numbershop.style.display = "none"
                city.style.display = "none"
                shopworkers.style.display = "none"
            }
            if (users[i].status_admin != true && users[i].status_seller != true) {
                profilestatus.textContent = "Покупатель"
                numbershop.style.display = "none"
                city.style.display = "none"
                shopworkers.style.display = "none"
            }
        }
    }

    for (let i = 0; i < shops.length; i++) {
        if (whoTransact.value == shops[i].shop) {
            profilestatus.textContent = "Магазин"
            numbershop.style.display = "block"
            const profilenumbershop = document.getElementById("numbershoptext2")
            profilenumbershop.textContent = shops[i].id_shop
            city.style.display = "block"
            const profilecity = document.getElementById("citytext2")
            profilecity.textContent = shops[i].sity
            shopworkers.style.display = "block"
            for (let j = 0; j < workers.length; j++) {
                if (shops[i].id_shop == workers[j].id_shop) {
                    let body = document.createElement("tbody");
                    let Id = document.createElement("td");
                    let Name = document.createElement("td");

                    Id.textContent = j
                    Name.textContent = workers[j].worker
                    body.append(Id, Name)
                    workersinshop.append(body)
                }
            }
        }
    }
}

export default CheckRole