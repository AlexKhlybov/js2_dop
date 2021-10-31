let phone = "+7(495)000-0000"

let pattern = /\+\d{1}\(\d{3}\)\d{3}\-\d{4}/

console.log(pattern.test(phone))