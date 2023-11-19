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
const createreview = document.getElementById("CreateReview")
const leavecomment = document.getElementById("LeaveComment")

// Функция которая в зависимоти от роли отображает нужный элементы
async function RoleItems (users) {
    for (let i = 0; i < users.length; i++){
        if (whoTransact.value == users[i].user) {
            if (users[i].status_admin == true && users[i].status_buyer == true) {
                improve.style.display = "block";
                lover.style.display = "block"
                requestes.style.display = "block"
                newadminiatrators.style.display = "block"
                checkshops.style.display = "block"
                newshop.style.display = "block"
                deleteshop.style.display = "block"
                createreview.style.display = "block"
                leavecomment.style.display = "block"

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
                createrequest.style.display = "block"
                leavecomment.style.display = "block"
            }
            if (users[i].status_admin != true && users[i].status_seller != true) {
                workshop.style.display = "block"
                createreview.style.display = "block"
                leavecomment.style.display = "block"
            }
        }
    }
}
export default RoleItems