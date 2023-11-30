const login = document.getElementById("Login");
const profile = document.getElementById("Profile")
const numbershop = document.getElementById("numbershop")
const city = document.getElementById("city")
const shopworkers = document.getElementById("shopworkers")
const improve = document.getElementById("Improve")
const lover = document.getElementById("Lower")
const requestes = document.getElementById("Requestes")
const newadminiatrators = document.getElementById("NewAdminiatrators")
const checkshops = document.getElementById("CheckShops")
const newshop = document.getElementById("NewShop")
const deleteshop = document.getElementById("DeleteShop")
const createrequest = document.getElementById("CreateRequest")
const workshop = document.getElementById("WorkShop")
const createreview = document.getElementById("CreateReview")
const leavecomment = document.getElementById("LeaveComment")
const workersinshop = document.getElementById("workersinshop")
const forms = document.getElementById("Forms")

// Функция выхода из аккаунта
async function GoToLogin() {
    forms.style.display = "none"
    profile.style.display = "none"
    numbershop.style.display = "none"
    city.style.display = "none"
    shopworkers.style.display = "none"
    improve.style.display = "none";
    lover.style.display = "none"
    requestes.style.display = "none"
    newadminiatrators.style.display = "none"
    checkshops.style.display = "none"
    newshop.style.display = "none"
    deleteshop.style.display = "none"
    createrequest.style.display = "none"
    workshop.style.display = "none"
    createreview.style.display = "none"
    leavecomment.style.display = "none"
    login.style.display = "block"

    let tbodyList = workersinshop.querySelectorAll('tbody');
    tbodyList.forEach(tbody => {
      tbody.remove();
    });
}

export default GoToLogin