let whoTransact = document.getElementById("who");
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
const forms = document.getElementById("Forms")
const reviews = document.getElementById("CheckReview")
const requesteslover = document.getElementById("RequestesLover")
const allshops = document.getElementById("CheckAllShops")
const newshops = document.getElementById("NewShops")
const createreviews = document.getElementById("CreateReviews")
const createcomment = document.getElementById("CreateComment")

// Функция которая в зависимоти от роли отображает нужный элементы
async function RoleItems(users, shops) {
    for (let i = 0; i < users.length; i++) {
        if (whoTransact.value == users[i].user) {
            if (users[i].status_admin == true && users[i].status_buyer == true) {
                improve.style.display = "block";
                lover.style.display = "block"
                requestes.style.display = "block"
                newadminiatrators.style.display = "block"
                checkshops.style.display = "block"
                newshop.style.display = "block"
                deleteshop.style.display = "block"
                createrequest.style.display = "none"
                workshop.style.display = "none"
                checkreviews.style.display = "block"
                createreview.style.display = "block"
                leavecomment.style.display = "block"
                forms.style.display = "block"
                reviews.style.display = "none"
                requesteslover.style.display = "none"
                allshops.style.display = "none"
                newshops.style.display = "none"
                createreviews.style.display = "none"
                createcomment.style.display = "none"

                for (let i = 0; i < users.length; i++) {
                    if (users[i].status_admin !== true && users[i].status_seller !== true) {
                        let address = document.createElement("option");
                        address.text = users[i].user;
                        document.getElementById('whoimprove').add(address);
                    }
                }

                for (let i = 0; i < users.length; i++) {
                    if (users[i].status_seller == true && users[i].status_buyer == true) {
                        let address = document.createElement("option");
                        address.text = users[i].user;
                        document.getElementById('wholover').add(address);
                    }
                }
            }
            if (users[i].status_seller == true && users[i].status_buyer == true) {
                improve.style.display = "none";
                lover.style.display = "none"
                requestes.style.display = "none"
                newadminiatrators.style.display = "none"
                checkshops.style.display = "none"
                newshop.style.display = "none"
                deleteshop.style.display = "none"
                createrequest.style.display = "block"
                workshop.style.display = "none"
                checkreviews.style.display = "block"
                createreview.style.display = "block"
                leavecomment.style.display = "block"
                forms.style.display = "block"
                reviews.style.display = "none"
                requesteslover.style.display = "none"
                allshops.style.display = "none"
                newshops.style.display = "none"
                createreviews.style.display = "none"
                createcomment.style.display = "none"
            }
            if (users[i].status_admin != true && users[i].status_seller != true) {
                improve.style.display = "none";
                lover.style.display = "none"
                requestes.style.display = "none"
                newadminiatrators.style.display = "none"
                checkshops.style.display = "none"
                newshop.style.display = "none"
                deleteshop.style.display = "none"
                createrequest.style.display = "none"
                workshop.style.display = "block"
                checkreviews.style.display = "block"
                createreview.style.display = "block"
                leavecomment.style.display = "block"
                forms.style.display = "block"
                reviews.style.display = "none"
                requesteslover.style.display = "none"
                allshops.style.display = "none"
                newshops.style.display = "none"
                createreviews.style.display = "none"
                createcomment.style.display = "none"
            }
        }
    }

    for (let i = 0; i < shops.length; i++) {
        if (whoTransact.value == shops[i].shop) {
            improve.style.display = "none";
            lover.style.display = "none"
            requestes.style.display = "none"
            newadminiatrators.style.display = "none"
            checkshops.style.display = "none"
            newshop.style.display = "none"
            deleteshop.style.display = "none"
            createrequest.style.display = "none"
            workshop.style.display = "none"
            checkreviews.style.display = "block"
            createreview.style.display = "none"
            leavecomment.style.display = "none"
            forms.style.display = "block"
            reviews.style.display = "none"
            requesteslover.style.display = "none"
            allshops.style.display = "none"
            newshops.style.display = "none"
            createreviews.style.display = "none"
            createcomment.style.display = "none"
        }
    }
}
export default RoleItems