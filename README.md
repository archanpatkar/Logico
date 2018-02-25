# Logico
### A Language based on [Propositional Calculus Ω](https://en.wikipedia.org/wiki/Propositional_calculus)

## Introduction 

### `Propositional Calculus Ω` or `zeroth-order logic`,
Is a branch of logic concerned with the study of propositions (whether they are true or false) that are formed by other propositions with the use of logical connectives.


### Truth Values in Logico
| Truth Value | Logico |
|-------------|--------|
| true        | T      |
| false       | F      |


### Logical Connectives in Logico
| Logical Connectives  	  | Operator 	| Equivalent in English       |
|------------------------	|----------	|---------------------------	|
| Negation               	| -A       	| not A                       |
| Conjunction            	| A ^ B    	| A and B                    	|
| Disjunction            	| A v B    	| A or B                    	|
| Implication            	| A > B    	| if A then B                 |
| Biconditional          	| A = B    	| A if and only if B          |


### In Logico you can write Propsitional Expressions and Evaluate them
``` 
( ( -(T ^ F) v (-F) ) ^ F ) 
``` 
#### This Expression will evaluate to `F`


## Examples

### if ( (if A then B) and A ) then B 
### ( ( ( A > B ) ^ A ) > B )
#### Prove that for Every value of A and B it Evaluates to T

#### Case 1 A:T and B:T
#### `( ( ( T > T ) ^ T ) > T )` evaluates to `T`

#### Case 2 A:T and B:F
#### `( ( ( T > F ) ^ T ) > F )` evaluates to `T`

#### Case 3 A:F and B:T
#### `( ( ( F > T ) ^ F ) > T )` evaluates to `T`

#### Case 4 A:F and B:F
#### `( ( ( F > F ) ^ F ) > F )` evaluates to `T`

### This is an Example of [Tautology](https://en.wikipedia.org/wiki/Tautology_(logic))


## Resources
[Wiki](https://en.wikipedia.org/wiki/Propositional_calculus)<br>
[Introduction](https://www.tutorialspoint.com/discrete_mathematics/discrete_mathematics_propositional_logic.htm)<br>
[Implication and Biconditional](http://www.math.niu.edu/~richard/Math101/implies.pdf)<br>
