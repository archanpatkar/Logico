# Logico
### A Language based on [Propositional Calculus Ω](https://en.wikipedia.org/wiki/Propositional_calculus)

## Introduction 

### `Propositional Calculus Ω` or `zeroth-order logic`,
#### Is the branch of logic concerned with the study of propositions (whether they are true or false) that are formed by other propositions with the use of logical connectives.


### Truth Values in Logico
| Truth Value | Logico |
|-------------|--------|
| true        | T      |
| false       | F      |


### Logical Connectivites in Logico
| Logical Connectives  	  | Operator 	| Equivalent in Programming 	|
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
This Expression will evaluate to `F`

