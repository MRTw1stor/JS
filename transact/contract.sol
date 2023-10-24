// SPDX-License-Identifier: GPL-3.0

pragma solidity >0.8.0 <0.9.0;

contract Transfer{

    // Структура пользователей
    struct Users{
        string name_user;
        address login_user;
        bool status_user;
    }
    
    Users[] private users;

    // Структура переводов
    struct Transfers{
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
    struct StatusUp{
        uint id_up;
        address promoted;
        uint needGolos;
        uint howVoited;
        bool statusUp;
        bool statusCansel;
    }

    StatusUp[] public statusUp;

    constructor() {
        users.push(Users( "Tom", 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4, true));
        users.push(Users( "Fred", 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2, true));
        users.push(Users( "Semen", 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db, false));
        users.push(Users( "Alex", 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB, false));
        users.push(Users( "Viktoria", 0x617F2E2fD72FD9D5503197092aC168c91465E7f2, false));
        users.push(Users( "Ivan", 0x17F6AD8Ef982297579C203069C1DbfFE4348c372, false));
    }

    // Простмотр всех пользователей
    function Check_Users() public view returns (Users[] memory){
        return users;
    }

    // Простмотр всех переводов
    function Check_Transfers() public view returns (Transfers[] memory){
        return transfers;
    }

    // Простмотр всех ролей
    function Check_Role() public view returns (StatusUp[] memory){
        return statusUp;
    }

    // Функция добавления новых пользователей
    function NewUsers(string memory _name, address _userAdres) public {
        uint flag = 0;

        // Проверка администратора
        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].login_user && users[i].status_user == true) {
                flag = 1;
            }
            if (msg.sender == users[i].login_user && users[i].status_user != true) {
                revert("You are not admin");
            }
            require(users[i].login_user != _userAdres, "Such a user already exists");
        }
        require(flag == 1);
        users.push(Users(_name, _userAdres, false));
    }

    // Функция создания перевода
    function Transfeeer(address _to, uint _money, bytes32 _pasword) public payable {
        require(msg.value == _money,"You don't have that much money");
        require(msg.sender != _to,"You can't transfer money to yourself");
        
        transfers.push(Transfers(transfers.length, _to, msg.sender, _money*10**18, _pasword, true, false));
    }

    // Функция подтверждения перевода
    function CompliteTransfer(uint _idTransfer, bytes32 _pasword) public payable {
        require(_idTransfer == transfers[_idTransfer].id_transfer,"There is no such translation");
        require(msg.sender == transfers[_idTransfer].to,"You are not the recipient of the transfer");
        require(transfers[_idTransfer].status_execution == true,"The transaction is no relevant");
        require(transfers[_idTransfer].status_reception == false,"The transfer has already been delivered");

        // Проверка кодового слова
        if(_pasword == transfers[_idTransfer].pasword){
            payable(transfers[_idTransfer].to).transfer(transfers[_idTransfer].money);
            transfers[_idTransfer].status_execution = false;
            transfers[_idTransfer].status_reception = true;
        }
        else{
            payable(transfers[_idTransfer].who).transfer(transfers[_idTransfer].money);
            transfers[_idTransfer].status_execution = false;
        }
    }

    // Функция отмены перевода отправителем
    function CanselTransfer(uint _idTransfer) public payable {
        require(_idTransfer == transfers[_idTransfer].id_transfer,"There is no such translation");
        require(msg.sender == transfers[_idTransfer].who,"You are not the recipient of the transfer");
        require(transfers[_idTransfer].status_execution == true,"The transaction is no relevant");
        require(transfers[_idTransfer].status_reception == false,"The transfer has already been delivered");

        payable(transfers[_idTransfer].who).transfer(transfers[_idTransfer].money);
        transfers[_idTransfer].status_execution = false;
    }

    // Функция подачи заявки на повышение роли
    function NewStatus() public{
        uint flag = 0;
        uint kolvo_admin = 0;

        // Проверка пользователя
        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].login_user && users[i].status_user != true) {
                flag = 1;
            }
            if (msg.sender == users[i].login_user && users[i].status_user == true) {
                revert("You are not user");
            }

            // Считаем количество администраторов
            if (users[i].status_user == true){
                kolvo_admin += 1;
            }
        }
        require(flag == 1);
        statusUp.push(StatusUp(statusUp.length, msg.sender,kolvo_admin, 0, false, false));
    }

    // Функция голосования администраторов
    function ConfirmStatus(uint _anketId, uint _golos) public {
        require(statusUp[_anketId].statusUp == false,"The questionnaire is no longer relevant");
        require(statusUp[_anketId].statusCansel == false,"The application for promotion was rejected");
        uint flag = 0;

        // Проверка администратора
        for (uint i = 0; i < users.length; i++) {
            if (msg.sender == users[i].login_user && users[i].status_user == true) {
                flag = 1;
            }
            if (msg.sender == users[i].login_user && users[i].status_user != true) {
                revert("You are not admin");
            }
        }
        require(flag == 1);

        // Процесс голосования

        // Проверяем ответ администратора
        if(_golos == 0){
            statusUp[_anketId].howVoited +=1;

            // Повышаем пользователя до администратора
            if(statusUp[_anketId].needGolos == statusUp[_anketId].howVoited){
                for(uint i = 0; i < users.length; i++){
                    if(statusUp[_anketId].promoted == users[i].login_user){
                        users[i].status_user = true;
                    }
                }
                statusUp[_anketId].statusUp = true;
            }
        }

        // Отклоняем заявку на повышение
        if(_golos == 1){
            statusUp[_anketId].statusCansel = true;
        }
    }
}