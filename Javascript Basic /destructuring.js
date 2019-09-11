const person = {
    name: 'Atuli',
    age: 24,
    greet() {
        console.log('Hi, I am ' + this.name);
    }
};

const printName = ({ name }) => { //destructuring
    console.log(name);
}

printName(person);

const { name, age } = person;
console.log(name, age);

// const copiedPerson = {...person}; //copy the object "spread operator"
// console.log(copiedPerson);  

 const hobbies = ['Sport', 'Cooking'];
 const [hobby1, hobby2] = hobbies;
 console.log(hobby1,hobby2);
 