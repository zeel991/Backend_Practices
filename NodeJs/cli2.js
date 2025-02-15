const fs = require('fs');
const { Command } = require('commander');
const program = new Command();

program
    .name('todo')
    .description('CLI Todo list')
    .version("0.8.0")

program.command('add')
    .description('Add task to the todo list')
    .argument('<task>','Name the task')
    .action((task) => {
        
    })