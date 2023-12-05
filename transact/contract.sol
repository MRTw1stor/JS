// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

contract Mobile_Transfers {
    // Структура пользователей
    struct Users {
        string name_user;
        address login_user;
        bool status_user;
    }

    Users[] private users;

    // Структура переводов
    struct Transfers {
        uint id_transfer;
        address to;
        address who;
        uint money;
        bytes32 pasword;
        bool status_execution;
        bool status_reception;
    }

    Transfers[] private transfers;

    // Структура заявок на повышение должности
    struct StatusUp {
        uint id_up;
        address promoted;
        uint needGolos;
        uint howVoited;
        bool statusUp;
        bool statusCansel;
    }

    StatusUp[] private statusUp;

    // Структура проголосовавших администраторов
    struct Voted {
        uint id_up;
        address voted;
    }

    Voted[] private voteds;

    constructor() {
        users.push(
            Users("Tom", 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, true)
        );
        users.push(
            Users("Fred", 0x9d3B290225211DefB78302010AEE31C08739916A, true)
        );
        users.push(
            Users("Semen", 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, false)
        );
        users.push(
            Users("Alex", 0x87C18cC77607976BF619639e93B28EFDDb3F471c, false)
        );
        users.push(
            Users("Viktoria", 0x4d184A3612cd48ec548b6c77fBdB7d901B29bb4F, false)
        );
        users.push(
            Users("Ivan", 0xe6fd0921456E3F722c11bDd4775a1D6d0387c507, false)
        );
    }

    // Простмотр всех пользователей
    function Check_Users() public view returns (Users[] memory) {
        return users;
    }

    // Простмотр всех переводов
    function Check_Transfers() public view returns (Transfers[] memory) {
        return transfers;
    }

    // Простмотр всех ролей
    function Check_Role() public view returns (StatusUp[] memory) {
        return statusUp;
    }

    // Простмотр проголосовавших администраторов
    function Check_Voted() public view returns (Voted[] memory) {
        return voteds;
    }

    // Функция добавления новых пользователей
    function NewUsers(string memory _name, address _userAdres) public {
        uint flag = 0;

        // Проверка администратора
        for (uint i = 0; i < users.length; i++) {
            if (
                msg.sender == users[i].login_user &&
                users[i].status_user == true
            ) {
                flag = 1;
            }
            if (
                msg.sender == users[i].login_user &&
                users[i].status_user != true
            ) {
                revert("You are not admin");
            }
            require(
                users[i].login_user != _userAdres,
                "Such a user already exists"
            );
        }
        require(flag == 1);
        users.push(Users(_name, _userAdres, false));
    }

    // Функция создания перевода
    function Transfer(
        address _to,
        uint _money,
        bytes32 _pasword
    ) public payable {
        require(msg.value <= _money, "You don't have that much money");
        require(msg.sender != _to, "You can't transfer money to yourself");

        transfers.push(
            Transfers(
                transfers.length,
                _to,
                msg.sender,
                _money * 10 ** 18,
                _pasword,
                true,
                false
            )
        );
    }

    // Функция подтверждения перевода
    function CompliteTransfer(
        uint _idTransfer,
        bytes32 _pasword
    ) public payable {
        require(
            _idTransfer == transfers[_idTransfer].id_transfer,
            "There is no such translation"
        );
        require(
            msg.sender == transfers[_idTransfer].to,
            "You are not the recipient of the transfer"
        );
        require(
            transfers[_idTransfer].status_execution == true,
            "The transaction is no relevant"
        );
        require(
            transfers[_idTransfer].status_reception == false,
            "The transfer has already been delivered"
        );

        // Проверка кодового слова
        if (_pasword == transfers[_idTransfer].pasword) {
            // payable(msg.sender).transfer(transfers[_idTransfer].money);
            transfers[_idTransfer].status_execution = false;
            transfers[_idTransfer].status_reception = true;
        } else {
            // payable(transfers[_idTransfer].who).transfer(transfers[_idTransfer].money);
            transfers[_idTransfer].status_execution = false;
        }
    }

    // Функция отмены перевода получателем
    function CanselTransfer(uint _idTransfer) public payable {
        require(
            _idTransfer == transfers[_idTransfer].id_transfer,
            "There is no such translation"
        );
        require(
            msg.sender == transfers[_idTransfer].to,
            "You are not the recipient of the transfer"
        );
        require(
            transfers[_idTransfer].status_execution == true,
            "The transaction is no relevant"
        );
        require(
            transfers[_idTransfer].status_reception == false,
            "The transfer has already been delivered"
        );

        // payable(transfers[_idTransfer].who).transfer(transfers[_idTransfer].money);
        transfers[_idTransfer].status_execution = false;
    }

    // Функция отмены перевода отправителем
    function CanselTransferSender(uint _idTransfer) public payable {
        require(
            _idTransfer == transfers[_idTransfer].id_transfer,
            "There is no such translation"
        );
        require(
            msg.sender == transfers[_idTransfer].who,
            "You are not the recipient of the transfer"
        );
        require(
            transfers[_idTransfer].status_execution == true,
            "The transaction is no relevant"
        );
        require(
            transfers[_idTransfer].status_reception == false,
            "The transfer has already been delivered"
        );

        // payable(transfers[_idTransfer].who).transfer(transfers[_idTransfer].money);
        transfers[_idTransfer].status_execution = false;
    }

    // Функция подачи заявки на повышение роли
    function NewStatus() public {
        uint flag = 0;
        uint kolvo_admin = 0;

        // Проверка пользователя
        for (uint i = 0; i < users.length; i++) {
            if (
                msg.sender == users[i].login_user &&
                users[i].status_user != true
            ) {
                flag = 1;
            }
            if (
                msg.sender == users[i].login_user &&
                users[i].status_user == true
            ) {
                revert("You are not user");
            }

            // Считаем количество администраторов
            if (users[i].status_user == true) {
                kolvo_admin += 1;
            }
        }
        require(flag == 1);
        statusUp.push(
            StatusUp(statusUp.length, msg.sender, kolvo_admin, 0, false, false)
        );
    }

    // Функция голосования администраторов
    function ConfirmStatus(uint _anketId, uint _golos) public {
        require(
            statusUp[_anketId].statusUp == false,
            "The questionnaire is no longer relevant"
        );
        require(
            statusUp[_anketId].statusCansel == false,
            "The application for promotion was rejected"
        );
        uint flag = 0;

        // Проверка администратора
        for (uint i = 0; i < users.length; i++) {
            if (
                msg.sender == users[i].login_user &&
                users[i].status_user == true
            ) {
                flag = 1;
            }
            if (
                msg.sender == users[i].login_user &&
                users[i].status_user != true
            ) {
                revert("You are not admin");
            }
        }
        require(flag == 1);

        uint flagg = 0;

        // Проверка на то что администратор уже проголосовал
        for (uint i = 0; i < voteds.length; i++) {
            if (_anketId == voteds[i].id_up && msg.sender == voteds[i].voted) {
                flagg = 1;
            }
        }

        if (flagg == 1) {
            revert("You have already voted for this profile");
        }

        // Процесс голосования
        if (_golos == 0) {
            statusUp[_anketId].howVoited += 1;
            voteds.push(Voted(_anketId, msg.sender));

            // Повышаем пользователя до администратора
            if (statusUp[_anketId].needGolos == statusUp[_anketId].howVoited) {
                for (uint i = 0; i < users.length; i++) {
                    if (statusUp[_anketId].promoted == users[i].login_user) {
                        users[i].status_user = true;
                    }
                }
                statusUp[_anketId].statusUp = true;
            }
        } else if (_golos == 1) {
            statusUp[_anketId].statusCansel = true;
        }
    }
}
