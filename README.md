<h1 align="center">User API Login, Sign Up, Update profile</h1>

# Start
To start the server run:
```
npm start
```

## Sign Up 
Post Request
Url :  ``` /api/user/signup ```

Request Body:
```
{
    "name": "NS(Optional)", 
    "email": "demo@mail.com"(Unique),
    "password": "12345678",
    "password2": "12345678"
}
```