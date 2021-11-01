const reg = new RegExp('abc\?', 'gi');

const str1 = 'asdfasdf'
const str2 = 'abc? asdf abc? abc? Abc?'

console.log(reg.test(str1))
console.log(reg.test(str2))

console.log(str2.match(reg))
