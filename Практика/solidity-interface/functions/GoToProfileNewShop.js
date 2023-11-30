const profile = document.getElementById("Profile")

// Функция выхода в профиль из окна создания нового магазина
async function GoToProfileNewShop() {
    const newshops = document.getElementById("NewShops")
    newshops.style.display = "none"
    const newshopsaddress = document.getElementById("newshopsaddress")
    newshopsaddress.value = ""
    const newshopscity = document.getElementById("newshopscity")
    newshopscity.value = ""
    profile.style.display = "block"
}

export default GoToProfileNewShop