const profile = document.getElementById("Profile")
const allshops = document.getElementById("CheckAllShops")
const allshopstable = document.getElementById("allshopstable")

// Функция показывающая все магазины
async function CheckAllShops(shops) {
    profile.style.display = "none"
    allshops.style.display = "block"

    for (let i = 0; i < shops.length; i++) {
        let body = document.createElement("tbody");
        let Idshop = document.createElement("td");
        let address = document.createElement("td");
        let city = document.createElement("td");

        Idshop.textContent = shops[i].id_shop
        address.textContent = shops[i].shop
        city.textContent = shops[i].sity
        body.append(Idshop, address, city)
        allshopstable.append(body)
    } 
}

export default CheckAllShops