# API Ceklis Monitoring

## 1. Login

- Endpoint : /api/auth/login
- Method : POST
- Request Body :

```
{
    "email": "abcd@example.com",
    "password": "12345678"
}
```

- Response Body :

```
Success:
{
    "success": true,
    "message": "Login berhasil",
    "data": ""
}

Error:
{
    "success": false,
    "message": "Username atau Password salah",
    "error": ""
}
```

## 2. Register

- Endpoint : /api/auth/register
- Method : POST
- Request Body :

```
{
    "name": "JohnDoe",
    "email": "JohnDoe@example.com",
    "password": "johndoe123"
}
```

- Response Body :

```
Success:
{
    "success": true,
    "message": "Registrasi Berhasil!",
    "data": ""
}
Error:
{
    "success": false,
    "message": "Email sudah dipakai",
    "error": ""
}
```
