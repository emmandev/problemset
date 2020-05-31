const { program } = require("commander")
const { prompt } = require("inquirer")

const prompter = (problems) => {
  program
    .action(() => {
      prompt([
        {
          choices: problems,
          message: "Select the problem:",
          name: "problem",
          type: "list",
        },
      ]).then((answer) => {
        answer.problem()
      })
    })
    .parse()
}

module.exports = {
  prompter,
}
