function tokenize(string)
{
    return string.split("").filter(e => e != " ");
}

function parse(string)
{
    return _parse(tokenize(string));
}

function _parse(tokens)
{
    if(tokens.length == 0)
    {
        throw Error("Unexpected EOF");
    }
    let token = tokens.shift();
    if(token == "" || token == " " || token == "\n") return;
    if(token == "(")
    {
        const context = [];
        while(tokens[0] != ")")
        {
            context.push(_parse(tokens));
        }
        tokens.shift();
        return context;
    }
    else if(token == ")")
    {
        throw Error("Unexpected ')'");
    }
    else 
    {
        return value(token);
    }
}

function value(token)
{
    if(token == "T")
    {
        return true;
    }
    else if(token == "F")
    {
        return false;
    }
    else
    {
        return token;
    }
}

function eval(ast)
{
    if(ast == true || ast == false)
    {
        return ast;
    }
    else if(ast[0] == "-")
    {
        return !(eval(ast[1]));
    }
    else if(ast[1] == "^")
    {
        const cond1 = eval(ast[0]);
        const cond2 = eval(ast[2]);
        return cond1 && cond2;
    }
    else if(ast[1] == "v")
    {
        const cond1 = eval(ast[0]);
        const cond2 = eval(ast[2]);
        return cond1 || cond2;
    }
}

function convert(out)
{
    if(out)
    {
        return "T";
    }
    else 
    {
        return "F";
    }
}
