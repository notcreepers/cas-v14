const chalk = require("chalk");

module.exports = {
    name: "connected",
    execute(err) {
        console.log(chalk.red(`An error occurred connecting to the database:\n${err}`));
    },
};