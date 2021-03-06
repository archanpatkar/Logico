## <img src="logico.png"/> 

### A Language based on [Propositional Calculus](https://en.wikipedia.org/wiki/Propositional_calculus)
### It supports [Expression Oriented Programming](https://en.wikipedia.org/wiki/Expression-oriented_programming_language)
### It has non-strict semantics or `"Lazy"` Evaluation

## Installation 
> This is an Educational Project and currently in Beta
#### 1. `git clone https://github.com/archanpatkar/Logico.git`
#### 2. `cd Logico`
#### 3. `npm install -g` 
After installation
type `logico` and press enter in the terminal and the REPL will Start

## Introduction 

### `Propositional Calculus` or `zeroth-order logic`,
Is a branch of logic concerned with the study of propositions (whether they are true or false) that are formed by other propositions with the use of logical connectives.

## Fundamental Building Blocks (Values and Operators)

### Truth Values in Logico
| Truth Value | Logico |
|-------------|--------|
| true        | T      |
| false       | F      |

### Logical Connectives (Operators) in Logico
> Both Unary and Dyadic Connectives are Available

| Logical Connectives  	  | Operator 	| Natural Language            |
|------------------------	|----------	|---------------------------	|
| Negation               	| -A       	| not A                       |
| Conjunction            	| A ^ B    	| A and B                    	|
| Disjunction            	| A v B    	| A or B                    	|
| Implication            	| A > B    	| if A then B                 |
| Biconditional          	| A = B    	| A if and only if B          |

## Propositional Formulas / Expressions or Propositions

In Logico you can write Propositional Expressions of both **Simple** and **Compound** types and Evaluate them. Logico syntax is compatible with Well-formed formula(WFF) Formal Grammer of **Propositional Calculus**
``` 
( ( -(T ^ F) v (-F) ) ^ F ) 
``` 
This Expression will evaluate to `F`

## Composite Expressions

In Logico Everything is an Expression therefore Everything has to be inside `(...)` brackets

You can also write multiple expressions inside an expression and the last expression will be the final evaluation of the enclosing expression
```
( (-T) (F ^ T) (F) (T) )
``` 
Enclosing Expression will evaluate to `T`

## Variables 
> Variables in Logico can be used as Propositional Variables but are not limited to the atomic formulas of propositional logic

In Logico Variables can **store** Expressions and *Variables are Expressions*

Variables are Lazily Evaluated

```
(A: T)
(B: ( (T ^ F) = (F ^ T) ) )
(A v B)
```
## Parsing Optimization ( Memoization of Variables )
Variable Definition inside of another variable definition is memoized and expression is partially evaluated as shown below
```
(B: -(A: T)) -> (B: -A) [A is defined and will be lazily evaluated]
```
**`Note:`** In cases where the variable is already defined it will override the existing value

## Examples
> You can try this in the REPL

#### if ( (if A then B) and A ) then B 
Prove that for Every value of A and B it Evaluates to T

```
> ( e: ( ( ( A > B ) ^ A ) > B ) )
> ( ( A : T ) ( B : T ) )
> (e)
> ( ( A : F ) ( B : T ) )
> (e)
> ( ( A : T ) ( B : F ) )
> (e)
> ( ( A : F ) ( B : F ) )
> (e)
```

### This is an illustration of [Tautology](https://en.wikipedia.org/wiki/Tautology_(logic))


## Sources

[Wiki](https://en.wikipedia.org/wiki/Propositional_calculus)<br>
[Introduction](https://www.tutorialspoint.com/discrete_mathematics/discrete_mathematics_propositional_logic.htm)<br>
[Implication and Biconditional](http://www.math.niu.edu/~richard/Math101/implies.pdf)<br>
