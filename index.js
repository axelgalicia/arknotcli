#!/usr/bin/env node
// Template CLI

// Based on: https://codeburst.io/building-a-node-js-interactive-cli-3cb80ed76c86
// https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');
const shell = require('shelljs');

const run = async () => {
    // show script introduction
    init();
    // ask questions
    const answers = await askQuestions();
    const { FILENAME, EXTENSION } = answers;
    // create the file
    const filePath = createFile(FILENAME, EXTENSION);
    // show success message
    success(filePath);
}

// Script Introduction
const init = () => {
    console.log(
        chalk.green(
            figlet.textSync("Arknot   CLI", {
                font: "small",
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
}

// Questions to prompt
const askQuestions = () => {
    const questions = [
        {
            name: "FILENAME",
            type: "input",
            message: "What is the name of the file without extension?"
        },
        {
            type: "list",
            name: "EXTENSION",
            message: "What is the file extension?",
            choices: [".ts", ".js", ".html", ".css"],
            filter: function (val) {
                return val.split(".")[1];
            }
        }
    ];
    return inquirer.prompt(questions);
};

// Creates the file
const createFile = (filename, extension) => {
    const filePath = `${process.cwd()}/${filename}.${extension}`
    shell.touch(filePath);
    return filePath;
};

const success = (filepath) => {
    console.log(
        chalk.white.bgGreen.bold(`Done! File created at ${filepath}`)
    );
};

run();

