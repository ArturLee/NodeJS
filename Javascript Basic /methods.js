const person = {
    name: 'Atuli',
    age: 24,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

const copiedPerson = {...person}; //copy the object "spread operator"
console.log(copiedPerson);  

const hobbies = ['Sport', 'Cooking'];
// for(let hobby of hobbies) {
//     console.log(hobby);
// }

// console.log(hobbies.map(hobby => {return 'Hobby: ' + hobby}));
// console.log(hobbies);

// hobbies.push('Programming');

//const copiedArray = hobbies.slice(); //slice coppies the array

//const copiedArray = [hobbies]; //this is not a copy of the array, is the array it self
const copiedArray = [...hobbies]; //this is a copy of the array. 


console.log(copiedArray);


const toArray = (...args)=>{//const toArray = (arg1, arg2, arg3 ) => {  //"REST"thos murge all the argumenst into an array.
    // return [arg1, arg2, arg3];

    return args;
};

console.log(toArray(1,2,3,4));