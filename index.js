
// for the cli programm 
import {Command} from 'commander';
// for the questioning things
import inquirer from 'inquirer';
// for handling files
import fs from "fs";
import { error } from 'console';

// make the program instance
const program = new Command();

// The variable of questions for "inquiries" object
const questions = [{
    type: "input",
    name: "task title",
    message: "please type the task title here: "},
    {
    type: "input",
    name: "task date",
    message: "please type the date of the task you've done here: "}];

    const theFilePath = "./tasks.json";



// cli simple programm to add a done task and it's date, and outputs what u entered in the console as a list later
program
.name('tasks-cli')
.version('1.0.0')
.description('A simple course management system');


program
  .command("add")
  .alias("a")
  .description("Add a new course test1")
  .action(() => {

    // using the inquirer package
        // the questions variable is to help you what to type after you write the command add ^^
    inquirer.prompt(questions).then((answers) => {
      console.log('answers:', answers);
      if (fs.existsSync(theFilePath)) {
        fs.readFile(theFilePath, "utf8", (error, content) => {
          if (error) {
            console.log("error due to: ", error);
            process.exit();
          }
          console.log("the content is:", content);
          const contentAsJson = JSON.parse(content);
          contentAsJson.push(answers);
          fs.writeFile(theFilePath, JSON.stringify(contentAsJson), 'utf8', ()=>{
            console.log("task addedd sucessfully!")
          })
        });
      } else {
        fs.writeFile(theFilePath, JSON.stringify([answers]), "utf8", () => {
          console.log("task added successfully");
        });
      }
    });
  });


  program.command("list").alias('l').description('A list of all tasks you have been addad and their date')
  .action(()=>{
    fs.readFile(theFilePath, 'utf8', (err, content)=>{
        if(err){
            throw err;
            process.exit();
        }
        console.table (JSON.parse(content));
    })
  })




program.parse(); 
// program.parse(); >>>>>>> by deafault = program.parse(process.argv); 00:13:20




// NOTES:

// If you guys wanna try the project be on the location of CLIAPP and type:
// >>npm install
// >>node index.js add        <to add a task in the file>
// >>node index.js list       <to show the list of all added tasks>


  /*

  IF you wanna edit some functionalities remember: 
1- when you write into a file, u write in a string way so, you should stringify the content
2- when you bring info, make them JSON.parse.. to be able to manipulate them

*/