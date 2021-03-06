// npm is an online repository of packages/registry for publishing and maintaining open-source node.js projects; npm is also a command line utility for interacting with those packages -> to get to the npm command line utility you must type npm init in the terminal; you must initialize npm like this every time you want to access the npm package repository

// order of require statements are not important for functionality purposes, however, it is best practice to group by source: npm packages, personal modules, and core library modules often get grouped together

const inquirer = require('inquirer');

// the require statement is a built-in function that's globally available in Node.js; allos the file to access the fs module's fucntions through the fs assignment; a module is a simple or complex js code organized in a single or in multiple js files that are reusable throughout your application
// standard practice -> variable name = module name
// 3 types of modules in node.js -> 1st = core modules (built-in to the node.js framework - file system module that allows you to manipulate, create and delete files on the server); 2nd = local modules (modules that YOU write); 3rd = 3rd party modules (the ones you get from the web)

// because we exported an object from generate-site.js, we can use object destructuring to create variables out of those properties instead of having to use dot notation
const { writeFile, copyFile } = require('./utils/generate-site.js');
// the variable name is arbitrary (random), but the relative path to include the file must be exact

const generatePage = require('./src/page-template');

// inquirer's prompt method can receive an array of objects in its argument, known as the question object; properties of the question object identify the type, nmae, and question message of this particular question

const promptUser = () => {
    return inquirer.prompt([
        {
            // input was chosen because the answer will be a text reply
            type: 'input',
            name: 'name',
            message: 'What is your name? (Required)',
            // validate method receives an argument; in this case, nameInput
            validate: nameInput => {
                if (nameInput) {
                    // if condition evaluates to true, the validation has passed successfully
                    return true;
                } else {
                    console.log('Please enter your name!');
                    // if condition evaluates to false, the validation fails and the user receives a message, prompting them with the same question until an answer is received
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your GitHub Username. (Required)',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself: (Required)',
            // similar to validate method, but instead of passing the value entered for that specific question in as the parameter, it passes an object of all of the answers given so far as an object
            // the inquirer method automatically passes an object containing the user's answers to the when function ({"name": "denysha", "github": "denysha-abigail", "confirmAbout": true}); this allows us to write conditional code based on the answers the user has supplied thus far; when the when function gets this object
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
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
            message: 'What is the name of your project? (Required)',
            validate: projectNameInput => {
                if (projectNameInput) {
                    return true;
                } else {
                    console.log('Please enter the name of your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please provide a description of your project!');
                    return false;
                }
            }
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
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please provide a link to your GitHub project repo!');
                    return false;
                }
            }
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

            // promptUser()
            //     .then(promptProject)
            //     .then(portfolioData => {
            //         const pageHTML = generatePage(portfolioData);

            //         fs.writeFile('./dist/index.html', pageHTML, err => {
            //         if (err) {
            //             console.log(err);
            //             return;
            //         };
            //         console.log('Page created! Check out index.html in this directory to see it!');

            //         fs.copyFile('./src/style.css', './dist/style.css', err => {
            //             if (err) {
            //                 console.log(err);
            //                 return;
            //             }
            //             console.log('Style sheet copied successfully!');
            //         })
            //     });
            // });

// a Promise chain is a series of Promise-based functinos that run in order; instead of having each Promise return to its own .then() method, we can return the function within a .then()'s function and chain another .then() method onto it

// start by asking user for their information with inquirer prompts; this returns all of the data as an object in a promise
promptUser()
// the promptProject() function captures the returning data from promptUser() and we recursively call promptProject() for as many projects as the user wants to add; each project is pushed into a projects array and when we're done, the final set of data is returned to the next .then()
.then(promptProject)
// the finished portfolio data object is returned as portfolioData and sent into the generatePage() function, which will return the finished HTML template code into pageHTML
.then(portfolioData => {
    return generatePage(portfolioData);
})
// we pass pageHTML into the newly created writeFile() function, which returns a Promise; we use return here so the Promise is returned into the next .then() method
.then(pageHTML => {
    return writeFile(pageHTML);
})
// upon successful file creation, we take the writeFileResponse object provided by the writeFile() function's resolve execution to log it, and then we return copyFile()
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
})
// the Promise returned by copyFile() then let's us know if the CSS file was copied correctly, and if so, we're all done!
.then(copyFileResponse => {
    console.log(copyFileResponse);
})
.catch(err => {
    console.log(err);
});

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