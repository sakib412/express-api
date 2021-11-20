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

Return data(demo):
```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOThlZWI2OGY1ZWFmZTYyNDQ4NGQ1YSIsImlhdCI6MTYzNzQxMjUzNCwiZXhwIjoxNjM3NDE2MTM0fQ.D8faMJJGYm6OEWxs84YrRTHpusFyQFWpK2f2KrPTt7M",
    "data": {
        "user": {
            "name": "Name",
            "email": "demo@mail.com",
            "password": "hashed value",
            "_id": "6198eeb68f5eafe624484d5a",
            "__v": 0
        }
    }
}

```

## Sign in
Post Request
Url: ```/api/user/signin ```

Request Body:
```
{
    "email": "demo@mail.com",
    "password": "12345678"
}
```

Return data(demo):
```
{
    "status": "success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOThkODQyZGNlYjk5ZTU2ODI0MjcwZSIsImlhdCI6MTYzNzQxMjU0MCwiZXhwIjoxNjM3NDE2MTQwfQ.r_isqJZKqqXSdmHJjVPGYEFTfM2FJ_EVg3NOP1RVjRw",
    "data": {
        "user": {
            "_id": "6198d842dceb99e56824270e",
            "name": "NS",
            "email": "demo@mail.com",
            "password": "hided",
            "__v": 0
        }
    }
}
```
