# Logico
### A Language based on [Propositional Calculus Ω](https://en.wikipedia.org/wiki/Propositional_calculus)

## Introduction 

### `Propositional Calculus` or zeroth-order logic,
##### Is the branch of logic concerned with the study of propositions (whether they are true or false) that are formed by other propositions with the use of logical connectives.


### Truth Values in Logico
| Truth Value | Logico |
|-------------|--------|
| true        | T      |
| false       | F      |


### Logical Connectivites in Logico
| Logical Connectives  	  | Operator 	| Equivalent in Programming 	|
|------------------------	|----------	|---------------------------	|
| Negation               	| -A       	| !A                        	|
| Conjunction            	| A ^ B    	| A && B                    	|
| Disjunction            	| A v B    	| A || B                    	|
| Implication            	| A > B    	| !A || B                   	|
| Biconditional          	| A = B    	| A == B                    	|


### In Logico you can write Propsitional Expressions and Evaluate them
``` 
( ( -(T ^ F) v (-F) ) ^ F ) 
``` 
This Expression will evaluate to `F`
