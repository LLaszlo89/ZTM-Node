Programming: Humans write instructions which will be translated so that our CPU underset it.

Js engine (like V8) understand and runs our code.

Node Js makes Js run outside a browser as a "normal" program

1995 Netscape (Js) born ->
1996 first attempt to run Js on a computer == failed
2008 Google introduce the V8 engine == Js was REALLY fast from this
2009 Node Js born (Ryan Dahl) === Js now can run on a server as well

V8 is a JS Runtime: "Js environment"

libuv: (library) add extra features which not exists on V8. Containing many functions as fs ,http ,path , crypto and many more....
Each time the V8 finds somthing in the file that it dose not exists it will check with libuv if it knows anything about it

Node Js = V8 + libuv

[node](nodeJs.png)

**nvm** node version manager == download multiple version and swap between them

run "node" in the terminal without any argument -> **REPL** (read, eval ,print ,loop ) environment will turn on and all Js syntax will be executed until we exit REPL with cont+C or .exit  
Can be used for quick testing

///
Lehel@Lehel-VivoBook MINGW64 /l/ZTM/ZTM-Node (main)
$ node
Welcome to Node.js v16.14.0.
Type ".help" for more information.

> 2+2
> 4  
>  ///

Typing **process** is like typing window in a browser console. Will give back all info about where the V8 (node) is located on, what argument its getting and many more.

node some.js "someText" => Like this we can pass this parameter into the code by garbing it
///
(in the some.js file)
const mis = process.argv[2] mis === "someText"
///
