// create the about section
const generateAbout = aboutText => {
    if (!aboutText) {
      return '';
    }
  
    return `
      <section class="my-3" id="about">
        <h2 class="text-dark bg-primary p-2 display-inline-block">About Me</h2>
        <p>${aboutText}</p>
      </section>
    `;
  };

    // the .map() method uses an array of data to create a whole new set of data based on it
                // const animalArr = ['Dogs', 'Cats', 'Horses', 'Birds'];

                // const coolAnimalArr = animalArr.map(animal => {
                // console.log(animal);
                // return `${animal} are really cool animals.`;
                // });

    // the .join() method is used to turn an array into a combined string 

    // the .filter() method allows for the execution of a function on each element of the array to test whether or not it should be in the new array created from it; we use filter to test any type of data as long as we're checking for a true or false condition

                // const ageArr = [21, 58, 8, 16, 106, 83, 42, 2, 0];

                // const over21Arr = ageArr.filter(age => {
                // if (age >= 21) {
                //     return true;
                // } else {
                //     return false;
                // }
                // });
                // => [21, 58, 106, 83, 42];

const generateProjects = projectsArr => {
    return `
        <section class="my-3" id="portfolio">
        <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
        <div class="flex-row justify-space-between">
        ${projectsArr
            .filter(({ feature }) => feature)
            .map(({ name, description, languages, link }) => {
            return `
            <div class="col-12 mb-2 bg-dark text-light p-3">
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h5 class="portfolio-languages">
                Built With:
                ${languages.join(', ')}
                </h5>
                <p>${description}</p>
                <a href="${link}" class="btn"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
            </div>
            `;
            })
            .join('')}
    
        ${projectsArr
            .filter(({ feature }) => !feature)
            .map(({ name, description, languages, link }) => {
            return `
            <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                <h3 class="portfolio-item-title text-light">${name}</h3>
                <h5 class="portfolio-languages">
                Built With:
                ${languages.join(', ')}
                </h5>
                <p>${description}</p>
                <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
            </div>
            `;
            })
            .join('')}
        </div>
        </section>
    `;
    };

// when a function only has a single statement, the curly braces {} are unnecessary and the return statement is implied
// ${<variable>} -> template literals; used to embed JavaScript expressions into a string
module.exports = templateData => {
    // destructure projects and about data from templateData based on their property key names
    // this will create three variables based on data in templateData
    // now when we destructure the data from templateData, we create the projects and about variables, but we're taking the rest of the data that hasn't been destructured from templateData and storing it in a new object, called header
    // the ... is the rest operator; condenses leftover array or object values into one new value; not to be confused with the spread operator which spreads values across a new array or object
    const { projects, about, ...header } = templateData;

    return `
    <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
        <nav class="flex-row">
          <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href="https://github.com/${
            header.github
          }">GitHub</a>
        </nav>
      </div>
    </header>
    <main class="container my-5">
        ${generateAbout(about)}
        ${generateProjects(projects)}
    </main>
    <footer class="container text-center py-3">
      <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3>
    </footer>
  </body>
  </html>
    `;
};

// in order to use functions from one module inside another, we use the relate statements module.exports and require
// in the source file that has the functions we want to make available to other files, we use module.exports at its bottom
// in the destination file(s) that we want to receive those exported functions, we put require at the top
                    // module.exports = generatePage;