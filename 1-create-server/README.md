# Creating an Express Server

We're going to start our CRUD app with our server. Why?

When we navigate to localhost:3000, an [HTTP request](https://www.codecademy.com/articles/http-requests) is going to be fired. This is going to set our entire application into motion. We want a server to be able to process this request and serve the appropriate files.

Our HTTP request from navigating to `localhost:3000` is always going to be a GET to the endpoint `'/'`. Servers are going to look for a route that matches both the endpoint and request method. What do we want to do when we hit the `'/'` endpoint? Serve our homepage to the browser, which will usually be our index.html.

Think of it as the following codeblock:

```
if (HTTP_method === 'GET' && endpoint === '/') { CODE_TO_SERVE_HOMEPAGE }
```