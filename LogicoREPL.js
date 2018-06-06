#!/usr/bin/env node
const logico_cli = {};
logico_cli.rl = require('readline');
const eval = require("./Logico").eval;
const convert = require("./Logico").convert;
const parse = require("./Logico").parse;
const env = {};

logico_cli.console = logico_cli.rl.createInterface(process.stdin, process.stdout,
    function(sub) {
        return [['T', 'F', '-', '^', 'v', '>', '=', ':','type exit to exit the REPL'], sub];
    }
);

logico_cli.controller = function(input)
{

    if(input != "exit")
    {
        if(input != "")
        {
            // console.log(input);
            // console.log(parse(input));
            // console.log(eval(parse(input),env));
            console.log(convert(eval(parse(input),env)));
        //    console.log(convert(eval(parse(),env)));
        }
    }
    else
    {
        process.exit()
    }
    logico_cli.mainPrompt();
}

logico_cli.mainPrompt = function()
{
    logico_cli.console.removeAllListeners("line");
    logico_cli.console.on("line", logico_cli.controller);
    logico_cli.console.setPrompt("> ", 2);
    logico_cli.console.prompt();
}


logico_cli.boot = function() {
    console.log("Logico 0.0.1 [press tab for help]\n");
    logico_cli.mainPrompt();
}
logico_cli.boot();
