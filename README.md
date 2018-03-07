# Logico
![node](https://img.shields.io/node/v/passport.svg?style=for-the-badge) ![apm](https://img.shields.io/apm/l/vim-mode.svg?style=for-the-badge)
### A Language based on [Propositional Calculus Ω](https://en.wikipedia.org/wiki/Propositional_calculus)
### It supports [Expression Oriented Programming](https://en.wikipedia.org/wiki/Expression-oriented_programming_language)

## Installation 
### `npm install -g logico`

## Introduction 

### `Propositional Calculus` or `zeroth-order logic`,
Is a branch of logic concerned with the study of propositions (whether they are true or false) that are formed by other propositions with the use of logical connectives.


### Truth Values in Logico
| Truth Value | Logico |
|-------------|--------|
| true        | T      |
| false       | F      |


### Logical Connectives in Logico
| Logical Connectives  	  | Operator 	| Equivalent in English       |
|------------------------	|----------	|---------------------------	 |
| Negation               	| -A       	| not A                       |
| Conjunction            	| A ^ B    	| A and B                    	|
| Disjunction            	| A v B    	| A or B                    	 |
| Implication            	| A > B    	| if A then B                 |
| Biconditional          	| A = B    	| A if and only if B          |


In Logico you can write Propsitional Expressions and Evaluate them
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

In Logico Variables can Store Expressions and Variables are Expressions

Variables are Lazily Evaluated

```
(A: T)
(B: (T ^ F = F ^ T))
(A v B)
```

## Examples
> You can try this in the REPL

#### if ( (if A then B) and A ) then B 
#### Prove that for Every value of A and B it Evaluates to T

```
( e: ( ( ( A > B ) ^ A ) > B ) )

( ( A : T ) ( B : T ) )

(e)

( ( A : F ) ( B : T ) )

(e)

( ( A : T ) ( B : F ) )

(e)

( ( A : F ) ( B : F ) )

(e)
```

### This is an illustration of [Tautology](https://en.wikipedia.org/wiki/Tautology_(logic))


## Resources
For Learning Propostional Calculus

[Wiki](https://en.wikipedia.org/wiki/Propositional_calculus)<br>
[Introduction](https://www.tutorialspoint.com/discrete_mathematics/discrete_mathematics_propositional_logic.htm)<br>
[Implication and Biconditional](http://www.math.niu.edu/~richard/Math101/implies.pdf)<br>
