const numbershop = document.getElementById("numbershop")
const city = document.getElementById("city")
const shopworkers = document.getElementById("shopworkers")
const workersinshop = document.getElementById("workersinshop")
const improve = document.getElementById("Improve")
const lover = document.getElementById("Lower")
const requestes = document.getElementById("Requestes")
const newadminiatrators = document.getElementById("NewAdminiatrators")
const checkshops = document.getElementById("CheckShops")
const newshop = document.getElementById("NewShop")
const deleteshop = document.getElementById("DeleteShop")
const createrequest = document.getElementById("CreateRequest")
const workshop = document.getElementById("WorkShop")
const checkreviews = document.getElementById("CheckReviews")
const createreview = document.getElementById("CreateReview")
const leavecomment = document.getElementById("LeaveComment")
const newshops = document.getElementById("NewShops")
const createreviews = document.getElementById("CreateReviews")
const createcomment = document.getElementById("CreateComment")

// Функция которая скрывает все элементы при перезагрузке страницы
async function ReloadWindow() {
    window.addEventListener('beforeunload', function () {
        numbershop.style.display = "none"
        city.style.display = "none"
        shopworkers.style.display = "none"
        workersinshop.style.display = "none"
        improve.style.display = "none";
        lover.style.display = "none"
        requestes.style.display = "none"
        newadminiatrators.style.display = "none"
        checkshops.style.display = "none"
        newshop.style.display = "none"
        deleteshop.style.display = "none"
        createrequest.style.display = "none"
        workshop.style.display = "none"
        checkreviews.style.display = "none"
        createreview.style.display = "none"
        leavecomment.style.display = "none"
        newshops.style.display = "none"
        createreviews.style.display = "none"
        createcomment.style.display = "none"
    });
}

export default ReloadWindow