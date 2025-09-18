# API Ceklis Monitoring

## 1. Login

- Endpoint : /api/auth/login
- Method : POST
- Request Body (raw-JSON) :

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
    "message": "Login berhasil", //200
    "data": ""
}

Error:
{
    "success": false,
    "message": "Username atau Password salah", // 401
    "message": "User tidak ditemukan", //404
    "message": "Login gagal", //500
    "error": ""
}
```

## 2. Register

- Endpoint : /api/auth/register
- Method : POST
- Request Body (raw-JSON) :

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
    "message": "Registrasi Berhasil!", //200
    "data": ""
}
Error:
{
    "success": false,
    "message": "Email sudah dipakai", //400
    "message": "Registrasi user gagal", //500
    "error": ""
}
```
