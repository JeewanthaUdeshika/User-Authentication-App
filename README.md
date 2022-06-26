# User-Authentication-App
This web application is designed to get idea about user authentication in node JS by using JSON Web Token (JWT)

## Packages used
- `mongoose`          - to connect mongoDB database
- `express`           - framework to the server
- `nodemon`           - to make a live server
- `bycript`           - to  encrypt the passwords
- `jsonwebtoken`(JWS) - JSON Web Token helps shield a route from an unauthenticated user. Using JWT in your application will prevent unauthenticated users from accessing your users' home page and prevent unauthorized users from accessing your admin page.
- `cookie-parser`     - To make custom middlewares

## How user authentication works?
### When registering
When user registers, a token is sent to the client using JWT as cookie.
To create this token, a secret string is required. For that crypto package is used as follows, in command shell,  
```node reqiure("crypto").randomBytes(35).toString("hex")```

jwt.sign() is used to make the token that send to the client as a cookie.
- First parameter is the payload that sends to the user. this includes dat concerning the user (this should not contains sensitive information like passwords)
- Second parameter is the ``jwtSecret``
- Third parameter is how long the token will last

### Protect the routes
To prevent unauthenticated users from accessing the private route, take the token from the cookie, verify the token, and redirect users based on role.
For that ``cookie-parser`` package used.

### LogOut  functionality
To log out users, you need to remove the token from the client and redirect the client to the home page.

You'll create a GET request to /logout in the server.js file:
```
app.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" })
  res.redirect("/")
})
```

