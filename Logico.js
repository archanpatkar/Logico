// ############################################################################
//                            SYNTAX AND FLAGS                                #
// ############################################################################

// DEBUG ************************************************************
// For Debugging the code and Print the logs
const debug = false; // true for logs
// ******************************************************************

// TEST ************************************************************
// For Testing the code after updates and fixes
// Also Test when rolling out even the most minor changes
// (Event if you add an Semicolon!) -> TEST TEST TEST
const test = false; // true for testing
// *****************************************************************

// SYNTAX ************************************************************
// A Set of all the Operators and Symbols in the Language
// For adding new Operators just add the new symbol to the array
// Implement the Behavior in EVAL and test the code using test flag
// VERY VERY IMPORTANT! AND SENSITIVE!
const syntax = ["-","v","^","(",")",":","T","F",">","="];
// *******************************************************************


// ############################################################################
//                          TOKENIZER AND PARSER                              #
// ############################################################################

// TOKENIZER ************************************************************
function tokenize(string)
{
    return string.split(""); // Converts the Program to an Array of Chars
    // After this parser will analyze using this Array of Chars
}
// **********************************************************************

// WRAPPER ************************************************************
function parse(string)
{
    return _parse(tokenize(string)); // This is a simple wrapper function
    // parse function acts as functional composer
    // which pipes tokenize |> _parse
}
// ********************************************************************

// PARSER *************************************************************
// Main Parser Code which Creates a List <-> AST ( LISP STYLE )
// NOTE: THIS IS A RECURSIVE PARSER
function _parse(tokens)
{
    // ERROR CASES ************************************************************
    // Not All Cases are Covered
    // More Scenarios to be Added
    if(tokens === undefined ||  tokens.length === undefined)
    {
      // Throwing an Error if tokens undefined
      throw Error("No Code!");
    }
    else if(tokens.length == 0)
    {
        if(debug)
        {
            console.log(tokens);
        }
        // Throwing an Error if tokens has no chars
        throw Error("Unexpected EOF");
    }
    // ************************************************************************
    //
    // CHAR EXTRACTION ********************************************************
    let token = tokens.shift(); // Poping the first token
    // ************************************************************************
    //
    // IGNORE CASE ************************************************************
    // Ignoring Whitespace
    if(token == "" || token == " " || token == "\n") return;
    // ************************************************************************
    //
    // EXPRESSION CASE ********************************************************
    // Parsing Expression using this case
    else if(token == "(")
    {
        // Creating a Parent List
        const context = [];
        // Identifying and Replacing Multi Char Variables
        tokens = detect_variables(tokens);
        if(debug)
        {
            console.log(tokens);
        }
        // LOOP + RECURSION
        // Looping until top is not ")" and parsing the tokens everytime
        while(tokens[0] != ")")
        {
            context.push(_parse(tokens)); // Recursive Call
        }
        // Popping ")" from the tokens
        tokens.shift();
        // Returning the List or Parent Expression Node
        return context;
    }
    // ************************************************************************
    //
    // ERROR CASE *************************************************************
    // For Stray ")" Brackets
    else if(token == ")")
    {
        if(debug)
        {
            console.log(tokens);
        }
        // Throwing an Error if found that there is a extra or stray ")"
        throw Error("Unexpected ')'");
    }
    // ************************************************************************
    //
    // SYNTAX LIST CASE *******************************************************
    else if (syntax.indexOf(token) >= 0)
    {
        return value(token);
        // Converts Logico Value to Boolean Value
        // Or it returns the symbol if it is a Valid Operator
    }
    // ************************************************************************
    //
    // VARIABLE CASE **********************************************************
    // Detecting Variable
    // Checking if the Variable does not contain reserved Charactes
    else if (!(syntax.indexOf(token) >= 0))
    {
        // Single Char Var
        if(token.length == 1)
        {
            if(debug) console.log("Single Character => " + token);
            return token;
        }
        // Multichar Var
        else
        {
            if(debug)
            {
                console.log(tokens);
            }
            // Looping Until Found a Reserved Char or Whitespace
            const var_name = [];
            while( !(syntax.indexOf(token) >= 0) && token != " " )
            {
                var_name.push(token);
                token = tokens.shift();
            }
            tokens.unshift(token);
            if(debug)
            {
                console.log(var_name);
            }
            // Joining the individual chars into one string and returning it
            // This is the Multichar Variable Name
            return var_name.join("");
        }
    }
    // ************************************************************************
}
//*********************************************************************

// DETECTING MULTI CHAR VAR IN EXPRESSIONS ************************************
function detect_variables(tokens)
{
    const new_tokens = [];
    let top = '';
    while(top != ")")
    {
        let token = tokens.shift();
        const var_name = [];
        if(token == "(")
        {
            const output = detect_variables(tokens);
            if(output.length > 0)
            {
                new_tokens.push(token,...output);
            }
            if(debug) console.log(output);
        }
        else
        {
            if(debug)
            {
                console.log("Before Name Loop!");
            }
            while( !(syntax.indexOf(token) >= 0) && token != " ")
            {
                var_name.push(token);
                token = tokens.shift();
            }
            if(var_name.length > 0)
            {
                new_tokens.push(var_name.join(""));
            }
            if(token != " ")
            {
                new_tokens.push(token);
            }
            top = token;
            if(debug)
            {
                console.log("Iteration!")
                console.log("Token => " + token);
                console.log("Each => " + var_name);
                console.log("New Tokens => " + new_tokens);
                console.log("Top => " + top);
            }
        }
    }
    if(debug) console.log(new_tokens);
    return new_tokens;
}
// ****************************************************************************

// OPERATOR AND VALUE PARSER ************************************************************
//  Logico Values -> Boolean (Javascript)
function value(token)
{
    if(token == "T")
    {
        return true; // T -> true
    }
    else if(token == "F")
    {
        return false; // F -> true
    }
    else
    {
        return token; // v -> v or ^ -> ^
    }
}
// **************************************************************************************


// ############################################################################
//                             INTERPRETER                                    #
// ############################################################################

function eval(ast,env)
{
    // IGNORE CASES ************************************************************
    if(ast == undefined) return; // Ignoring undefined
    if(ast == " ") return;       // Ignoring Whitespace
    // *************************************************************************
    //
    // VALUES ************************************************************
    else if(ast == true || ast == false)
    {
        // true will evaluate to true
        // false will evaluate to false
        return ast;
    }
    // *******************************************************************
    //
    // NEGATION OPERATOR ************************************************************
    else if(ast[0] == "-")
    {
        // Negation in Propositional Calculus is Equivalent to ! in programming
        // This is a Unary Operator
        //   -----------
        // | TRUTH TABLE |
        //   -----------
        //   ----
        // | true | => false
        //   ----
        //   ----
        // | false | => true
        //   ----
        // It is also known as NOT A
        return !(eval(ast[1],env)); // Evaluating the Condition
        // Negating the Condition and returning it
    }
    // *******************************************************************************
    //
    // CONJUNCTION OPERATOR ************************************************************
    else if(ast[1] == "^")
    {
        // Conjunction in Propositional Calculus is Equivalent to && in programming
        // It checks that does both conditions evaluate to true
        // then only it will return true
        //   -----------
        // | TRUTH TABLE |
        //   -----------
        //   -----------
        // | true | true | => true
        //   -----------
        //   -----------
        // | true | false | => false
        //   -----------
        //   -----------
        // | false | true | => false
        //   -----------
        //   -----------
        // | false | false | => false
        //   -----------
        // It is also known as A AND B
        const cond1 = eval(ast[0],env); // Evaluating the FIRST Condition
        const cond2 = eval(ast[2],env); // Evaluating the SECOND Condition
        if(debug)
        {
            console.log("And");
            console.log("Condition 1 => " + ast[0]);
            console.log("Condition 2 => " + ast[2]);
            console.log("Condition 1 && Condition 2 | " + cond1 && cond2);
        }
        return cond1 && cond2; // Checking the conjunction
    }
    // **********************************************************************************
    //
    // DISJUNCTION OPERATOR ************************************************************
    else if(ast[1] == "v")
    {
        // Disjunction in Propositional Calculus is Equivalent to || in programming
        // If any one condition of the expression is true then the expression will be evaluated to true
        //   -----------
        // | TRUTH TABLE |
        //   -----------
        //   -----------
        // | true | true | => true
        //   -----------
        //   -----------
        // | true | false | => true
        //   -----------
        //   -----------
        // | false | true | => true
        //   -----------
        //   -----------
        // | false | false | => false
        //   -----------
        // It is also known as A OR B
        const cond1 = eval(ast[0],env); // Evaluating the FIRST Condition
        const cond2 = eval(ast[2],env); // Evaluating the SECOND Condition
        return cond1 || cond2; // Checking the disjunction
    }
    // **********************************************************************************
    //
    // IMPLIES OPERATOR ************************************************************
    else if(ast[1] == ">")
    {
        // Implication in Propositional Calculus is Equivalent to !C1 || C2 in programming
        // If any one condition of the expression is true then the expression will be evaluated to true
        //   -----------
        // | TRUTH TABLE |
        //   -----------
        //   -----------
        // | true | true | => true
        //   -----------
        //   -----------
        // | true | false | => false
        //   -----------
        //   -----------
        // | false | true | => true
        //   -----------
        //   -----------
        // | false | false | => true
        //   -----------
        // It is also known as IF A THEN B
        const cond1 = eval(ast[0],env); // Evaluating the FIRST Condition
        const cond2 = eval(ast[2],env); // Evaluating the SECOND Condition
        if(debug)
        {
            console.log("Implies");
            console.log("Condition 1 => " + cond1);
            console.log("Condition 2 => " + cond2);
            console.log("Condition 1 => Condition2 | " + ( (!cond1) || cond2 ) );
        }
        return ( (!cond1) || cond2 ); // Checking the implication
    }
    // **********************************************************************************
    //
    // BICONDITIONAL OPERATOR ************************************************************
    else if(ast[1] == "=")
    {
        // Biconditional in Propositional Calculus is Equivalent to == in programming
        // It checks that do the two conditions evaluate to the same answer
        // It is also known as A IF AND ONLY IF B
        const cond1 = eval(ast[0],env); // Evaluating the FIRST Condition
        const cond2 = eval(ast[2],env); // Evaluating the SECOND Condition
        return cond1 == cond2; // Checking if the Conditions Match
    }
    // ***********************************************************************************
    //
    // VARIBALE CREATION ************************************************************
    else if(ast[1] == ":")
    {
        const exp = expand(ast[2],env); // Expanding if contains other variable definations
        if(debug)
        {
            console.log("Expanded! => " + exp);
            console.log("AST => " + ast);
        }
        env[ast[0]] = exp; // Directly Storing the Expression in the Variable in the Enviroment Object
        if(debug)
        {
            console.log("Name => " + ast[0]);
        }
        return eval(env[ast[0]],env);
        // Lastly Variable Creation is also an Expression so it will evaluated the variable and return its output
        // NOTE: VARIABLES ARE LAZILY EVALUATED SO THE EVALUATION WILL NOT BE STORED IT WILL BE RETURNED
    }
    // *******************************************************************************
    //
    // DEPRECATED ************************************************************
    // else if(Array.isArray(ast[0])) // Limited Scope Checking
    // {
    //     const out = [];
    //     for(let exp of ast)
    //     {
    //         const e = eval(exp,env);
    //         out.push(e)
    //     }
    //     return out[out.length-1];
    // }
    // ************************************************************************
    //
    // COMPOSITE EXPRESSIONS ************************************************************
    else if(Array.isArray(ast)) // Traversing and Evaluating N nested expressions
    {                           // This is a part of the core logic of the language
        const out = [];         // This is Recurse Descent!
        for(let exp of ast)
        {
            const e = eval(exp,env);
            out.push(e);
        }
        return out[out.length-1];
        // Returning the Last Evaluation as the Evaluation of the whole expression
    }
    // ***********************************************************************************
    //
    // VARIBALE ACCESS ************************************************************
    else
    {
        if(debug) console.log("Variable Name " +  ast);
        return eval(env[ast],env); // LAZY EVALUATION!
    }
    // ****************************************************************************
}

function convert(out)
{
    if(debug) console.log("Converting => " + out);
    // DEPRECATED ************************************************************
    // if(Array.isArray(out)) // Composite Expressions will Yield
    // {                      // A List of Outputs of all the Expression
    //     const list = [];
    //     for(let TV of out)
    //     {
    //         list.push(convert(TV));
    //     }
    //     return list.join(" ");
    // }
    // This has been replaced with Composite Expression which will be Evaluated to the last
    // Expression Evaluated in the Composite Expression
    // ************************************************************************


    // VALUES TYPES ************************************************************
    // Boolean (Javascript) -> Logico Values
    if(out)
    {
        return "T"; // true -> T
    }
    else
    {
        return "F"; // false -> F
    }
    // **************************************************************************
}


function expand(exp,env)
{
    // VARIABLE EXPANDING ************************************************************
    // This Optimizes the Expressions which are Stored in Variables
    // Variable Creation while storing the expression in a Variable will be effectively be converted as follows
    // ( AB : ( A : T ) v ( B : T ) ) =>  ( ( A : T ) ( B : T ) ) ( AB : ( A v B ) )
    if(debug) console.log(exp);
    if(Array.isArray(exp[0]))
    {
        for(let e in exp)
        {
            // DEPRECATED ************************************************************
            //     if(Array.isArray(exp[e][0]))
            //     {
            //         exp = expand(e,env);     // ONLY went 1 Level Deep
            //     }
            //     else if(exp[e][1] == ":")
            //     {
            //         eval(exp[e],env);
            //         exp[e] = exp[e][0];
            //     }
            // This Logic did not Expand N Nested Variable Expressions
            // ************************************************************************

            // RECURSIVE DECENT ************************************************************
            exp[e] = expand(exp[e],env);
            // This Updated Version can Expand N Nested Variable Expressions
            // This is a Recursive Solution for the PROBLEM but very TIME INTENSIVE!
            // *****************************************************************************
        }
    }
    else
    {
        // EXPRESSION EXPANSION ************************************************************
        exp = atom_expand(exp,env);
        // This is Done when a Variable Defination found in Another Variable Defination while Recursion
        // *********************************************************************************
    }
    return exp;
    // **********************************************************************************
}

function atom_expand(exp,env)
{
    // ATOM EXPAND ************************************************************
    // This Expands A Single Variable Evaluates the Variable and
    // Returns the Symbol or Variable Name
    // ( A : T ) => atom_expand => A
    if(exp[1] == ":")
    {
        eval(exp,env);
        exp = exp[0];
    }
    return exp;
    // ************************************************************************
}


// ############################################################################
//                             TESTS                                          #
// ############################################################################

// IF TEST FLAG IS TRUE ************************************************************
if(test)
{
    const env = {}
    console.log( eval(parse("(  family: ( ( (papa:T) ^ (mummy:T) ) ^ ( (archan:T) ^ (jagrat:T) ) ) )"),env) )
    console.log( eval(parse("(  family )"),env) )
    console.log(env)
    console.log(env["family"]);
    console.log( eval(parse("( archan  jagrat )"),env) )

    console.log(parse("( archan:T jagrat:T)"));
    console.log(parse("( archan ^ jagrat )"));

    console.log(parse("(T ^ T)"))
    console.log(!(syntax.indexOf("(") >= 0))
    console.log( convert(eval(parse("( hello : ( (e:T) ^ (f:F) ) )") ,env) ));
    console.log( eval(tokenize("( hello )"),env)) ;
    console.log(env);

    eval( parse("( (A : T) (B : T) )") , env);
    eval( parse("( E : ( ( ( A > B ) ^ B ) > B  ) )") , env );
    console.log(eval( parse("( E )") , env));
    eval( parse("( (A : F) (B : T) )") , env);
    console.log(eval( parse("( E )") , env));
    eval( parse("( (A : T) (B : F) )") , env);
    console.log(eval( parse("( E )") , env));
    eval( parse("( (A : F) (B : F) )") , env);
    console.log(eval( parse("( E )") , env));

    console.log( convert( eval( parse("( ( (A : T) (B : F) (A) ) ^ -F )") , env) ));
    console.log(convert( eval( parse("( Z: (A v B) ^ A )") , env) ));
    console.log(convert( eval( parse("(Z)") , env) ));
    console.log( convert( eval( parse("( (A : F) (B : F) )") , env) ));
    console.log(convert( eval( parse("( Z: ( ( ( A > B ) ^ B ) > B ) )") , env) ));
    console.log(convert( eval( parse("(Z)") , env) ));

    console.log( convert(eval( parse("( (A : T) (B : T) )") , env) ));
    console.log( eval( parse ("( E :  ( ( A > B ) ^ B ) > B  )") ,env ))
    console.log( convert (eval( parse("( E : A ^ B )") , env) ));
    console.log( convert (eval( parse("( E )") , env) ));

    console.log(env);
    console.log(eval( parse("( ( ( T > F ) ^ T ) > F )") , env));
    console.log(eval( parse("( ( ( F > F ) ^ F ) > F )") , env));
    console.log( convert( eval( parse("( (A : T) (B : T) )") , env) ));
    console.log( convert( eval( parse("( E : ( ( A > B ) ^ B ) > B ) )") , env ) ));
    console.log( convert( eval( parse("( (A : F) (B : T) )") , env) ));
    console.log( convert (eval( parse("( (E) )") , env) ));
    console.log( convert( eval( parse("( (A : T) (B : F) )") , env) ));
    console.log( convert (eval( parse("( (E) )") , env) ));
    console.log( convert( eval( parse("( (A : F) (B : F) )") , env) ));
    console.log( convert (eval( parse("( (E) )") , env) ));
    console.log( convert( eval( parse("( ( -(T ^ F) v (-F) ) ^ F )") ) ));

    // Implies
    console.log( convert( eval( parse("( (A : T) (B : T) )") , env) ));
    console.log( convert( eval( parse("( A > B )")  , env) ));
    console.log( convert( eval( parse("( (A : F) (B : T) )") , env) ));
    console.log( convert( eval( parse("( A > B )")  , env) ));
    console.log( convert( eval( parse("( (A : T) (B : F) )") , env) ));
    console.log( convert( eval( parse("( A > B )")  , env) ));
    console.log( convert( eval( parse("( (A : F) (B : F) )") , env) ));
    console.log( convert( eval( parse("( A > B )")  , env) ));

    // bi-conditional
    console.log( convert( eval( parse("( T = T )") ) ));
    console.log( convert( eval( parse("( T = F )") ) ));
    console.log( convert( eval( parse("( F = T )") ) ));
    console.log( convert( eval( parse("( F = F )") ) ));
}
// *********************************************************************************


// EXPORTS **************************************************
         module.exports.eval = eval;                     // *
         module.exports.convert = convert;               // *
         module.exports.parse = parse;                   // *
// **********************************************************
