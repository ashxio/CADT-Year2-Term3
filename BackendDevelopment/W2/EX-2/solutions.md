## Exercise 1 — Analyze

Q1 — Error message and line causing it:
- You see: `TypeError: res.endd is not a function`.
- Caused by the typo `res.endd()` in `server.js`.

Q2 — Purpose of `res.write()` vs `res.end()`:
- `res.write()` sends a chunk of the response body to the client but does not finish the response.
- `res.end()` signals that no more data will be sent and closes the response; it can also send a final chunk.

Q3 — If `res.end()` is not called:
- The client will wait and the request may hang (connection stays open) until timeout.

Q4 — Why use `http.createServer()`:
- `createServer()` returns a server instance that listens for incoming connections and calls the provided callback for each request; it's the built-in way to run an HTTP server that handles many requests over time.

Q5 — Making server more resilient during development:
- Add try/catch around route handling, log errors, and return 500 responses when unexpected errors occur.
- Use tools like `nodemon` to restart on changes and linters to catch typos.

## Exercise 2 — Manipulate (routing)

Reflective Questions:
1. Visiting an unknown URL returns `404 Not Found` (see default case).
2. We check both `req.url` and `req.method` because same path can be handled differently for GET vs POST.
3. For HTML responses set `Content-Type: text/html` (we do so for `/contact` and success page).
4. As routes grow, manual switch statements become long, harder to maintain, and repetitive.
5. Frameworks provide routing helpers, middleware, parsing, and better organisation.

## Exercise 3 — Create (POST handling)

Discussion Answers:
1. We listen for `data` and `end` because POST bodies may arrive in multiple chunks; buffering ensures we reconstruct the full body.
2. If we didn't buffer correctly we'd get partial or corrupted data.
3. Default browser form POST uses `application/x-www-form-urlencoded` format (key=value&...).
4. We use `fs.appendFile` to add a new submission to the end without overwriting existing data.
5. Improvements: validate and sanitize inputs, rate-limit, store structured JSON or use a database, and avoid writing arbitrary user input directly to disk.

Bonus:
- The server validates the `name` isn't empty and returns a small HTML confirmation.
