## Deno database server

This is a simple database server created with Deno and TypeScript.  
To try it out, please run the following steps from the project root.

Install Deno:  
https://deno.land/#installation

Run the server tests in watch mode:
```deno test --allow-net --watch server_test.ts```

Run the server in watch mode:  
```deno run --allow-net --watch server.ts```

Set a value:  
```curl -X POST "http://localhost:4000/set?hello=world"```

Retrieve a value:  
```curl -X GET "http://localhost:4000/get?key=hello"```