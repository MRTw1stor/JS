// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.8.0 <0.9.0;

contract Seatransfer {
    // Структура для покупателей, продпвцов и администраторов
    struct Users {
        address user;
        bool status_admin;
        bool status_seller;
        bool status_buyer;
    }

    Users[] private users;

    // Структура для магазинов
    struct Shops {
        uint id_shop;
        address shop;
        string sity;
    }

    Shops[] private shops;

    // Структура для работников магазина
    struct Workers {
        uint id_shop;
        address worker;
    }

    Workers[] private workers;

    // Структура для отсвлеживания все повышений и понижений в роли
    struct UpAndDown {
        address who;
        address whom;
        uint action;
    }

    // 0 - повышение в роли
    // 1 - понижение в роли

    UpAndDown[] private upsanddowns;

    // Структура заявок на понижение роли
    struct RequestToDown {
        uint id_down;
        address down_worker;
        bool status_request;
    }

    RequestToDown[] private requestes;

    // Структура отзывов
    struct Reviews {
        uint id_review;
        uint id_shop;
        address who;
        string review;
        uint stars;
        uint likes;
        uint dislikes;
    }

    Reviews[] private reviews;

    // Структура тех кто отавили оценки
    struct WhoRated {
        address who;
        uint like;
        uint dislike;
        uint id_review;
    }

    WhoRated[] private whorated;

    constructor() {
        users.push(
            Users(0xb40b44b2f5fcf479c8d7dab8a9eef6f9e34ca16b, true, false, true)
        );
        users.push(
            Users(0x56b26a8141819ba85daa9a0dfb5b7d48fd1b690b, true, false, true)
        );
        users.push(
            Users(0xef48dee005f29b2604cc63ce6ac56368d42c81cf, false, true, true)
        );
        users.push(
            Users(0xd086014896b65a59a89e6734b8859fd49ac40407, false, true, true)
        );
        users.push(
            Users(
                0xA5c547D4843FA097a22887956519adf6917A5fC6,
                false,
                false,
                true
            )
        );
        users.push(
            Users(
                0x03a8cCf9ecC9D9910DD66B972375Ba055099AdE0,
                false,
                false,
                true
            )
        );
        shops.push(
            Shops(
                shops.length,
                0x8d819a9280D207C1f41824ed9A8d04B2c3844a2b,
                "Moskva"
            )
        );
        shops.push(
            Shops(
                shops.length,
                0x8570521330deDa25a4DFa58a64F6A4043a6E6e30,
                "Tula"
            )
        );
        workers.push(Workers(0, 0xef48dee005f29b2604cc63ce6ac56368d42c81cf));
        workers.push(Workers(1, 0xd086014896b65a59a89e6734b8859fd49ac40407));
    }

    // Функция создания новых пользователей
    function NewUsers() public {
        for (uint i = 0; i < users.length; i++) {
            require(users[i].user != msg.sender, "Such a buyer already exists");
        }

        users.push(Users(msg.sender, false, false, true));
    }

    // Функция добавления новых администраторов в систему
    function NewAdministrators(address _user) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_admin == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_admin != true) {
                revert("You are not admin");
            }
            require(
                users[i].user != _user,
                "Such a administrator already exists"
            );
        }

        for (uint i = 0; i < shops.length; i++) {
            require(_user != shops[i].shop, "This is the owner of the shop");
        }

        require(flag == 1);

        users.push(Users(_user, true, false, true));
    }

    // Функция устраивания на работу в магазин
    function GoSettledToShop(uint _Idshop) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (
                msg.sender == users[i].user &&
                users[i].status_seller == false &&
                users[i].status_admin == false
            ) {
                flag = 1;
            }
            if (
                msg.sender == users[i].user && users[i].status_seller != false
            ) {
                revert("You are not a buyer");
            }
            if (msg.sender == users[i].user && users[i].status_admin != false) {
                revert("You are not a buyer");
            }
        }

        for (uint i = 0; i < shops.length; i++) {
            require(
                msg.sender != shops[i].shop,
                "A shop owner cannot become a salesperson in his store"
            );
            if (shops[i].id_shop == _Idshop) {
                flag = 2;
            }
        }

        for (uint i = 0; i < workers.length; i++) {
            require(
                msg.sender != workers[i].worker,
                "Are you already working at the shop"
            );
        }

        require(flag == 2);

        workers.push(Workers(_Idshop, msg.sender));
    }

    // Функция повышения покупателя до роли продавца
    function UpBuyer(address _user) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_admin == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_admin != true) {
                revert("You are not admin");
            }
            if (users[i].user == _user && users[i].status_seller == false) {
                flag = 2;
            }
            if (users[i].user == _user && users[i].status_seller != false) {
                revert("This is not a buyer");
            }
        }

        for (uint i = 0; i < workers.length; i++) {
            if (_user == workers[i].worker) {
                flag = 3;
            }
        }

        require(flag == 3);

        for (uint i = 0; i < users.length; i++) {
            if (_user == users[i].user) {
                users[i].status_seller = true;
            }
        }

        upsanddowns.push(UpAndDown(msg.sender, _user, 0));
    }

    // Функция понижения продавца до роли покупатель
    function DownSeller(address _user) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_admin == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_admin != true) {
                revert("You are not admin");
            }
            if (users[i].user == _user && users[i].status_seller == true) {
                flag = 2;
            }
            if (users[i].user == _user && users[i].status_seller != true) {
                revert("This is not a seller");
            }
        }

        require(flag == 2);

        for (uint i = 0; i < users.length; i++) {
            if (_user == users[i].user) {
                users[i].status_seller = false;
            }
        }

        upsanddowns.push(UpAndDown(msg.sender, _user, 1));

        for (uint i = 0; i < workers.length; i++) {
            if (_user == workers[i].worker) {
                delete workers[i];
            }
        }
    }

    // Функция подачи заявки на понижение
    function RequestDownSeller() public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_seller == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_seller != true) {
                revert("You are not a seller");
            }
        }

        for (uint i = 0; i < requestes.length; i++) {
            require(
                msg.sender != requestes[i].down_worker,
                "You have already applied for a role reduction"
            );
        }

        require(flag == 1);

        requestes.push(RequestToDown(requestes.length, msg.sender, false));
    }

    // Функция принятия заявок на понижение роли
    function AcceptRequest(uint id_request) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_admin == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_admin != true) {
                revert("You are not admin");
            }
        }

        for (uint i = 0; i < requestes.length; i++) {
            require(
                id_request == requestes[i].id_down,
                "There is no such request"
            );
            require(
                requestes[i].status_request == false,
                "This seller has already been demoted"
            );
            for (uint j = 0; j < workers.length; j++) {
                if (requestes[i].down_worker == workers[j].worker) {
                    for (uint u = 0; u < users.length; u++) {
                        if (workers[j].worker == users[u].user) {
                            users[u].status_seller = false;
                        }
                    }
                    delete workers[i];
                }
            }
            upsanddowns.push(
                UpAndDown(msg.sender, requestes[i].down_worker, 1)
            );
            requestes[i].status_request = true;
        }

        require(flag == 1);
    }

    // Функция добавления нового магазина
    function NewShop(address _shop, string memory _city) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_admin == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_admin != true) {
                revert("You are not admin");
            }
            require(users[i].user != _shop, "Such a user is already someone");
        }

        for (uint i = 0; i < shops.length; i++) {
            require(
                _shop != shops[i].shop,
                "A store with the same owner already exists"
            );
        }

        require(flag == 1);

        shops.push(Shops(shops.length, _shop, _city));
    }

    // Функция удаления магазина
    function DeleteShop(uint _Idshop) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_admin == true) {
                flag = 1;
            }
            if (msg.sender == users[i].user && users[i].status_admin != true) {
                revert("You are not admin");
            }
        }

        for (uint i = 0; i < shops.length; i++) {
            if (_Idshop == shops[i].id_shop) {
                flag = 2;
            }
        }

        require(flag == 2);

        for (uint i = 0; i < shops.length; i++) {
            if (_Idshop == shops[i].id_shop) {
                delete shops[i];
            }
        }

        for (uint i = 0; i < workers.length; i++) {
            if (_Idshop == workers[i].id_shop) {
                for (uint j = 0; j < users.length; j++) {
                    if (workers[i].worker == users[j].user) {
                        users[j].status_seller = false;
                    }
                }
                delete workers[i];
            }
        }
    }

    // Функция создания нового отзыва магазину
    function NewReview(uint _Idshop, string memory _review, uint _star) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user && users[i].status_buyer == true) {
                flag = 1;
            }
        }

        uint flagg = 0;

        for (uint i = 0; i < reviews.length; i++) {
            if (msg.sender == reviews[i].who && _Idshop == reviews[i].id_shop) {
                flagg = 1;
            }
        }

        if (flagg != 0) {
            revert("You cannot write 2 reviews for 1 shop");
        }

        for (uint i = 0; i < shops.length; i++) {
            if (_Idshop == shops[i].id_shop) {
                flag = 2;
            }
            for (uint j = 0; j < workers.length; j++) {
                if (
                    msg.sender == workers[j].worker &&
                    workers[j].id_shop == _Idshop
                ) {
                    revert("You can't write a review for your store");
                }
            }
        }

        if (_star > 11) {
            revert("It is impossible to give such an assessment");
        } else {
            flag = 3;
        }

        require(flag == 3);

        reviews.push(
            Reviews(reviews.length, _Idshop, msg.sender, _review, _star, 0, 0)
        );
    }

    // Функция оценки отзывов
    function RatingReview(uint _Idreview, uint _rating) public {
        uint flag = 0;

        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].user) {
                flag = 1;
            }
        }

        for (uint i = 0; i < reviews.length; i++) {
            if (_Idreview == reviews[i].id_review) {
                flag = 2;
            }
        }

        uint flagg = 0;

        for (uint i = 0; i < whorated.length; i++) {
            if (
                msg.sender == whorated[i].who &&
                _Idreview == whorated[i].id_review
            ) {
                flagg = 1;
            }
        }

        if (flagg != 0) {
            revert("You cannot give 2 reviews to one comment");
        }

        require(flag == 2);

        for (uint i = 0; i < reviews.length; i++) {
            if (_rating == 0) {
                reviews[i].likes++;
                whorated.push(WhoRated(msg.sender, 1, 0, _Idreview));
            }
            if (_rating == 1) {
                reviews[i].dislikes++;
                whorated.push(WhoRated(msg.sender, 0, 1, _Idreview));
            }
        }
    }

    function checkUsers() public view returns (Users[] memory) {
        return users;
    }

    function checkShops() public view returns (Shops[] memory) {
        return shops;
    }

    function checkWorkers() public view returns (Workers[] memory) {
        return workers;
    }

    function checkUps() public view returns (UpAndDown[] memory) {
        return upsanddowns;
    }

    function checkRequest() public view returns (RequestToDown[] memory) {
        return requestes;
    }

    function checkReviews() public view returns (Reviews[] memory) {
        return reviews;
    }

    function checkRated() public view returns (WhoRated[] memory) {
        return whorated;
    }
}
