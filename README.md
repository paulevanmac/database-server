## Deno database server

This is a simple database server created with Deno and TypeScript.  
To try it out, please follow the steps below.

Install Deno:  
https://deno.land/#installation

Run the tests:  
```deno test server_tests.ts```

Run the server:  
```deno run --allow-net server.ts```

Set a value:  
```curl -X POST "http://localhost:4000/set?hello=world"```

Retrieve a value:  
```curl -X GET "http://localhost:4000/get?key=hello"```