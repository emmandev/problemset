const { prompt } = require("inquirer")

const prompter = (problems) => {
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
}

module.exports = {
  prompter,
}
