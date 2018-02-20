open System 
open System.Collections.Generic

type Tokens = Y
            | N
            | A
            | O
            | Nt
            | LParen
            | RParen
            | Whitespace

type Logico = TRUE of bool
            | FALSE of bool
            | AND of Logico * Logico
            | OR of Logico * Logico
            | NOT of Logico

let display token =
    match token with
    | (ttype , value) -> printfn "Token [ type: %A value: %A ]" ttype value

let tokenizer c =
        match c with 
        | 'Y' -> (Y ,c)
        | 'N' -> (N,c)
        | '^' -> (A, c)
        | 'v' -> (O, c)
        | '-' -> (Nt ,c)
        | '(' -> (LParen,c)
        | ')' -> (RParen,c)
        | _ -> (Whitespace,' ')

let tokens string =
    let mutable tokens =  new List<Tokens * char>()
    for c in string do 
        tokens.Add(c |> tokenizer)
    tokens


"-(Y ^ Y) v -N" |> tokens |> Seq.iter (fun x -> display x)
