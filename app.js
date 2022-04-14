// process is a global object (much like document or window in the browser)
                    // var commandLineArgs = process.argv;
                    // console.log(commandLineArgs);

// prints out the following:
// file path to where node.js is installed on your computer
                    // '/usr/local/bin/node',

// path file for the file you just executed
                    // '/Users/irmaarmaizroldan/Desktop/Developer/Projects/portfolio-generator/app.js'


// .slice() returns a brand-new array based on process.argv starting at the third index (i.e., index 2 in the zero-based array) and ending with the final index (process.argv.length - to return through the last index in the array, we provide the length of the array as the second argument)

// const keyword, short for "constant" allows us to create variables that can't be reassigned a value

const profileDataArgs = process.argv.slice(2, process.argv.length);
console.log(profileDataArgs);

const printProfileData = profileDataArr => {
    // prints array of command-line arguments one by one
    // let is used for variables that need to change over time; const are for variables that should NEVER be reassigned; let and const are block-scoped variables
    // using let and const within any block of code {} will not exist outside the block of code and will not overried a variable created outside of the braces either; this applies to anything using curly braces {}, such as conditional statements, loops, and functions
    // the var keyword has function scoping and only follows that rule if it is created in a function; if a variable with name of var is created globally and then created again inside and if statement or for loop, it will overried that globally created 
                    // for (let i = 0; i < profileDataArr.length; i++) {
                    //     console.log(profileDataArr[i]);
                    // }

    // .forEach() accepts a function as an argument and executes that function on each element of the array, using the value of the element at that iteration as its argument; same thing as using a for loop to iterate through an array and using arrayName[i] syntax to access the array at that iteration
    profileDataArr.forEach((profileItem) => console.log(profileItem));
  };
  
  printProfileData(profileDataArgs);

