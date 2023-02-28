const emails = ["serega@email.com","323@email.com","age@email.com","putin@email.com","petro@email.com","wqe@email.com","batka@email.com"]
const blackEmails = ["petro@email.com", "wqe@email.com", "batka@email.com"]
const whiteEmails = []

function filter(emails, blackEmails) {
  for (let ind = 0; ind < emails.length; ind++) {
    for (let index = 0; index < blackEmails.length; index++) {
        if (emails[ind] === blackEmails[index]) {
            break} 
        else if (index === blackEmails.length - 1) {
        whiteEmails.push(emails[ind])}}}}
filter(emails, blackEmails)
console.log(whiteEmails)
