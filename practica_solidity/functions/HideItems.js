const createPassword = document.getElementById("CreatePassword");
const profile = document.getElementById("Profile")
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

// Функция скрытия ненужных элементов
async function HideItems() {
    createPassword.style.display = "none"
    profile.style.display = "none"
    improve.style.display = "none"
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
}

export default HideItems