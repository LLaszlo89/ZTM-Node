Programming: Humans write instructions which will be translated so that our CPU underset it.

Js engine (like V8) understand and runs our code.

Node Js makes Js run outside a browser as a "normal" program

1995 Netscape (Js) born ->
1996 first attempt to run Js on a computer == failed
2008 Google introduce the V8 engine == Js was REALLY fast from this
2009 Node Js born (Ryan Dahl) === Js now can run on a server as well

V8 is a JS Runtime: "Js environment"

libuv: (Its a highly optimized library, written in C++)

Containing many functions as fs ,http ,path , crypto and many more.... which are not exists on V8.

Since some other functions are written in JS, To be able to call this functions written in C or C++ a **bindings** layer is used (connection between JS and the C world).

Reason for this multi lang approach:  
Some tasks like **fs** module must be using the lowest level of language so it can interact with all kind of OS (Windows, Linux, MacOS) and read or create files on them.

Each time the V8 finds something in the file that it dose not exists it will check with libuv if it knows anything about it.

libuv is not only used by nodeJs. It can be used by Haskell , Python C ++ and many more.

An example of a Flow: **http API** react on incoming request by passing it through the **bindings** to the **libuv**. Now the libuv will **delegate the task (ask for the requested resource from the) OS** ( and just like the event queue it will "come back" to pick up the **response** )

This is called async I/O. Where Node wont stop while the OS is working ,just come back for the result when the OS is done.

Node Js = V8 + libuv

[node process](nodeJs.png)
[node process #2](Node_processing_JS.png)

**nvm** node version manager == download multiple version and swap between them

run "node" in the terminal without any argument -> **REPL** (read, eval ,print ,loop ) environment will turn on and all Js syntax will be executed until we exit REPL with cont+C or .exit  
Can be used for quick testing

Lehel@Lehel-VivoBook MINGW64 ZTM-Node (main)

> $ node
> Welcome to Node.js v16.14.0.
> Type ".help" for more information.
> 2+2
> 4

Typing **process** is like typing window in a browser console. Will give back all info about where the V8 (node) is located on, what argument its getting and many more.

node some.js "someText" => Like this we can pass this parameter into the code by garbing it
///
(in the some.js file)
const mis = process.argv[2] mis === "someText"
///

non-blocking function === function executing in the background.

** OutOfBox JS is a sync lang (executing line by line) but since it can pass some task to the browser / libuv->OS it can act as its async **

**Multi threaded lang (Java and C++) makes it possible to run functions in parallel.
Each threat is has a SEPARATED event queue and are independent form each other**
This sounds good but makes really buggy code. To many issues can accrue while using this approach.

Js one thread at a time fixes most issues with the multi thread approach

Node Js has a MAIN threaded but since libuv is written in C++ it dose have another 4 extra threads (called Thread pool)
This are used for certain functionalities only like file system operation. Still where it is possible libuv will pass the task to the OS cornel (like networking task). Do to this developing with node is much easier == less thing to worry about

Event loop in Node is just like in JS its responsible to check if any task has been done by anyone.

pseudo ->
function eventLoop( mani | OS | thread_pool){
go and check what has been finished and put it to the **call back (FIFO) queue**
}

There are MANI callback queues actually , each for a different **phase** of the event loop
Each phase is a queue which will be checked and executed before going to the next.

1st Timers ( setTimeout,setInterval )
2nd I/O callbacks ( any action with file )
3rd setImmediate ( runs immediately after any I/O action )
4th Close callbacks ( when closing a file or network connection closed )

and some internal phases witch is not used by JS so not relevant for us.

Node is brilliant for Servers, but not good for CPU / GUI intensive task like Video processing or Machine Learning.

Thanks to NodeJs event driven nature (like the **Event** module), it uses the
**Observer Patterns** :

Subject <------ Observers / any number of observer can **subscribe** to a Subject and them be informed if some event happened /
[EventEmitter under the hood](eventEmitter.jpg)
[Real life example ](Real-case_emmit.jpg)

Modules: Separated internal(OOB node modules) or external (via npm) pre-written programs that can be imported and save into our JS file to be used.

Benefits:
Reuse existing code
Organize code
Export only what will be used

Ways to export

const variable = "string"
func send(){ ... }

1st module.exports = { send , variable } // Recommended

// If only one function is exported
2nd module.exports = function send(){ ... }

// If more things are exported

3rd module.exports.send = function send(){ ... }
module.exports.variable

When we use the "module.exports" and "require" for export/import -> we use the commonJs
the other option is the "ecma" module system where we use "export" and "import" instead.

But to be able ecma script module use .mjs extension OR set in the package.json -> type: "module"

Node modules uses cache, meaning, node makes sure not require from the same file multiple time

require.cache object shows us what is in the cache

Orgies out modules into one by using the index.js file in a common folder.

If all our module files are in the same folder than we can add an index.js file which behaves a default entry point. The index file basically represents the folder so now we can actually import the folder it self if needed and via the index.js give access to all modules in the folder.

index.js -> module.exports ={ ...require('./nameOfFileOne'), ...require('./nameOfFileTwo')}

Now we can import the holder and cherry pick which methods we what to use
const { funcOne, funcTwo} = require('./folderName')
