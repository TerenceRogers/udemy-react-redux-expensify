// Object Destructuring
/* const person = {
  name: 'Terence',
  age: 38,
  location: {
    city: 'Seattle',
    temp: 48
  }
};

const {name: firstName = 'anonymous', age} = person;

console.log(`${firstName} is ${age}`);

const {city, temp: temperature} = person.location;
if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`)
} */

// Array Destructuring
const address = [
  '1299 S Juniper St',
  'Philadelphia',
  'Pennsylvania',
  '19147'
];

const [ , city, state,  ] = address;

console.log(`You are in ${city}, ${state}`);