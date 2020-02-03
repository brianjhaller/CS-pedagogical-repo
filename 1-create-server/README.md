# Creating an Express Server

We're going to start our CRUD app with our server. Why?

When we navigate to localhost:3000, an [HTTP request](https://www.codecademy.com/articles/http-requests) is going to be fired. This is going to set our entire application into motion. We want a server to be able to process this request and serve the appropriate files.

### The initial HTTP request 

Our HTTP request from navigating to `localhost:3000` is always going to be a GET to the endpoint `'/'`. Servers are going to look for a route that matches both the endpoint and request method. 

What do we want to do when we hit the `'/'` endpoint? Serve our homepage to the browser, which will usually be our index.html.

Think of it as the following codeblock:

```
if (HTTP_method === 'GET' && endpoint === '/') { CODE_TO_SERVE_HOMEPAGE }
```

Because this HTTP request is the first action that happens when we visit a site in our browser, it makes sense to start our app from here. All other actions happen as a DIRECT result of this initial request. For this app, it will be serving the index.html and the index.js so our page will render and be functional.

### Beginning our server file

Let's import our required packages into our server: `npm i express`

Our basic setup at the top of the server will always look fairly similar:
```
const express = require('express');
const app = express();
const path = require('path');
```

This requires in the Express for Node and invokes it to create the instance of our app. We're also including path because we will use this to help serve our index.html and js/css (static assets).

### Catching our initial HTTP request and serving up our index.html

The Express way of writing our double conditional checking our HTTP method and endpoint is: `app.HTTP_method(endpoint, MIDDLEWARE)`.

We will get more into middleware later, but right now we are going to make what is referred to as an anonymous [middleware function](https://expressjs.com/en/guide/using-middleware.html). Middleware are the ordered blocks of code that will be run when triggered by the HTTP method and endpoint. There can be one piece, ten pieces, or more. 

Anonymous ones are very similar to regular anonymous JS functions. These use ES6 fat arrow notation and take the request and response objects as parameters: `(req, res) => { YOUR_MIDDLEWARE_FUNCTIONALITY_HERE }`.

We want our middleware functionality for this to be serving our home page. So we can use `res.sendFile` and `path.resolve` to send it.

```
app.get('/', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'index.html'));
})
```

So what's happening with this block? We are matching our GET HTTP method and our '/' with our initial GET request from localhost:3000/ and sending back the index.html file. 

We need to tell the application where the file is loaded, so we use __dirname (which resolves to the current working directory), and tell it to look in that directory for index.html. 

As you can see in the file tree, we do indeed have an index.html at our root directory. We can return this file in our response object. We always make sure to return our final response in the middleware chain to stop our thread of execution.

### Request and Response Objects

We've mentioned the [request](https://expressjs.com/en/4x/api.html#req) and [response](https://expressjs.com/en/4x/api.html#res) objects a couple times now. Before we go much further, lets get a handle on them. 

Every HTTP request from our browser will contain a lot of information, but right now, we are concerned with only two objects on this request. The request object, usually seen as `req` and the response object, or `res`. Each chain of middleware will usually take data from the request object, use that data in the processes set up in the middleware chain, and return a response object that is a result of the operations done in the middleware. 

For instance, a request object could have a person's name in the body which would be used by the middleware to find an email address in a database attached to that name. The email address would be added to the response body and returned to the browser.

Common places of storing data from the client to server (request):
`req.body, req.params, req.query, req.cookies`

Common places of storing data from the server to client (response):
`res.locals, res.cookie`

Just like how JS objects have dot notation, it is the same here. We are simply nesting objects within the request and response object to store data on different keys. Req is an object, which has a key called body, which is an object, which will have keys and values assigned by the programmer. Everything in JS are objects, and our req and res are no exceptions!

### Starting our server

We just have to spin up our server to have it listening for our HTTP request.

This is done with Express' listen method: `app.listen()`.

Let's listen on port 3000 (for localhost:3000) and add an anonymous function as a callback that will let us know the server is up and running.

```
app.listen(3000, () => console.log("Server listening on port 3000"));
```

If we now run `npm start` in our terminal, we should the server listening log into our terminal, and if we go to http://localhost:3000/, we should see our html loaded and saying `SERVER SERVING`.

However, if we open our inspector and reload the page, we will see that we get some error messages. We need to serve up some static files - our index.js and styles.css