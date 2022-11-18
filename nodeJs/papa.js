import moment from "moment";

let today = moment();
let birthday = moment('1996-07-13');

console.log(`hoy es ${today.format('DD,MM,YYYY')}`);
console.log(`hoy es ${birthday.format('DD,MM,YYYY')}`);
console.log(`desde que naci a pasado ${today.diff(birthday,'years')}`)
console.log(`desde que naci a pasado ${today.diff(birthday,'days')}`)