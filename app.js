// npm is an online repository of packages/registry for publishing and maintaining open-source node.js projects; npm is also a command line utility for interacting with those packages -> to get to the npm command line utility you must type npm init in the terminal; you must initialize npm like this every time you want to access the npm package repository

// order of require statements are not important for functionality purposes, however, it is best practice to group by source: npm packages, personal modules, and core library modules often get grouped together

const inquirer = require('inquirer');

// the require statement is a built-in function that's globally available in Node.js; allos the file to access the fs module's fucntions through the fs assignment; a module is a simple or complex js code organized in a single or in multiple js files that are reusable throughout your application
// standard practice -> variable name = module name
// 3 types of modules in node.js -> 1st = core modules (built-in to the node.js framework - file system module that allows you to manipulate, create and delete files on the server); 2nd = local modules (modules that YOU write); 3rd = 3rd party modules (the ones you get from the web)

            // const fs = require('fs');

// the variable name is arbitrary (random), but the relative path to include the file must be exact

            // const generatePage = require('./src/page-template');

// inquirer's prompt method can receive an array of objects in its argument, known as the question object; properties of the question object identify the type, nmae, and question message of this particular question

const promptUser = () => {
    return inquirer.prompt([
        {
            // input was chosen because the answer will be a text reply
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:'
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
    =================
    Add a New Project
    =================
        `);
    // if there is no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            // gives the user options a list of answers to choose that allos none or all selections as valid entries; also contains the choices property, which has a list of possible answers in an array
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the Github link to your project. (Required)'
        },
        {
            // Boolean that can receive a yes or no (true or false) answer; 
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            // in case the question gets skipped; inquirer will prompt the user with "y/N" where the capital "N" represents the default answer
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        // use array method push() to place the projectData from inquirer into the new projects array we just created
        .then(projectData => {
            portfolioData.projects.push(projectData);
            // if the user wishes to add more projects, then this condition will evaluate to true and call the promptProject(portfolioData) function
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            // if the user decides not to add more projects, then the condition will evaluate to false and trigger the return of portfolioData
            } else {
                return portfolioData;
            }
        });
}

promptUser()
    .then(promptProject)
    .then(portfolioData => console.log(portfolioData));

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
// profileDataArgs holds the user command-line arguments
// const profileDataArgs = process.argv.slice(2, process.argv.length);
// console.log(profileDataArgs);
// const [name, github] = profileDataArgs;

// const printProfileData = profileDataArr => {
// prints array of command-line arguments one by one
// let is used for variables that need to change over time; const are for variables that should NEVER be reassigned; let and const are block-scoped variables
// using let and const within any block of code {} will not exist outside the block of code and will not overried a variable created outside of the braces either; this applies to anything using curly braces {}, such as conditional statements, loops, and functions
// the var keyword has function scoping and only follows that rule if it is created in a function; if a variable with name of var is created globally and then created again inside and if statement or for loop, it will overried that globally created 
// for (let i = 0; i < profileDataArr.length; i++) {
//     console.log(profileDataArr[i]);
// }

// .forEach() accepts a function as an argument and executes that function on each element of the array, using the value of the element at that iteration as its argument; same thing as using a for loop to iterate through an array and using arrayName[i] syntax to access the array at that iteration
// profileDataArr.forEach((profileItem) => console.log(profileItem));
//   };

//   printProfileData(profileDataArgs);

            // const pageHTML = generatePage(name, github);

// fs.writeFile() function definition has three arguments; the 1st argument, or paramter, is the name of the file that's being created; the 2nd argument is the data that will write onto the file (in this case the HTML template literal); the 3rd argument is a callback function that will be used for error handling

// the 1st argument = the file name that will be created, or the output file
// the 2nd argument = the data that's being written: in this case, the HTML string template
// the 3rd argument = the callback function that will handel any errors as well as the success message

// when an arrow function has one argument, parentheses are optional; when there are NO arguments - or more than one - parentheses are necessary

            // fs.writeFile('./index.html', pageHTML, err => {

    // a conditional statement checks for the err being returned by the callback function; if err exists, an error message is displayed; the statement creates an exception and stops the execution of the code
            //     if (err) throw err;

            //     console.log('Portfolio complete! Check out index.html to see the output!');
            // });