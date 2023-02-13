"use strict";
const email = "tolkacevnik@gmail.com"
 
const mail = Math.round((email.slice(0,email.indexOf("@"))).length/2);
console.log("Открытый email адрес - ", email);
const zachita = email.slice(0,mail) + "..." + email.slice(email.indexOf("@"))
console.log("Закрытый email адрес - ", zachita);