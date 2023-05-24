
# Recipes Backend

Api backend for food recipe apps that can be integrated into web and mobile frontend developers


## Tech Stack

**Server:** NodeJS, ExpressJS, PostgreSQL


## Packages used

- "argon2": "^0.30.3"
- "body-parser": "^1.20.1"
- "cloudinary": "^1.34.0"
- "cors": "^2.8.5"
- "dotenv": "^16.0.3"
- "express": "^4.18.2"
- "jsonwebtoken": "^9.0.0"
- "morgan": "^1.10.0"
- "multer": "^1.4.5-lts.1"
- "nodemailer": "^6.9.1"
- "nodemon": "^2.0.22"
- "pg": "^8.9.0"
- "uuid": "^9.0.0"
- "xss-clean": "^0.1.1"

## Features

- CRUD
- Error Handling
- Upload and update file/photo
- User registration with email verification
- Private routes
- Json Web Token
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER=`

`DB_NAME=`

`DB_PASS=`

`DB_PORT=`

`DB_HOST=`

`JWT_KEY=`

`EMAIL_NAME=`

`EMAIL_PASSWORD=`

`BASE_URL=`

`PORT=`

`PHOTO_NAME=`

`PHOTO_KEY=`

`PHOTO_SECREAT=`


## API Reference

#### Register User

```
POST /auth/register/user
```

| Key | Value   |
| :-------- | :------- | 
| `Email` | `Required. email` |
| `Name` | `Required. email` |
| `Passord` | `Required. Password` |  

#### Login User

```
POST /auth/login
```

| Key | Value   |
| :-------- | :------- | 
| `Email` | `Required. email` |
| `Passord` | `Required. Password` | 

#### Verify Users OTP

```
POST /auth/otp/:id/:code
```
#### Get All Recipes

```
GET /recipes/
```
Auth: 
| Key | Value   |
| :-------- | :------- | 
| `bearer token` | `Required. Login Token` |

#### Get Users Recipes

```
GET /recipes/my-recipe
```
Auth: 
| Key | Value   |
| :-------- | :------- | 
| `bearer token` | `Required. Login Token` |

#### Get Recipes By Id

```
GET/recipes/:id
```
Auth: 
| Key | Value   |
| :-------- | :------- | 
| `bearer token` | `Required. Login Token` |


#### Insert Recipes

```
POST/recipes
```
Auth: 
| Key | Value   |
| :-------- | :------- | 
| `bearer token` | `Required. Login Token` |

Req Body Form:
| Key | Value   |
| :-------- | :------- | 
| `title` | `Required.Jus Buah Naga` |
| `ingredients` | `Required.Buah Naga, Susu, Gula Pasir` |
| `photo` | `Required.image png / jpg` |
| `category_id` | `Required.integer` |


#### Update Recipes

```
PUT/recipes
```
Auth: 
| Key | Value   |
| :-------- | :------- | 
| `bearer token` | `Required. Login Token` |

Req Body Form:
| Key | Value   |
| :-------- | :------- | 
| `title` | `Required.Jus Buah Naga` |
| `ingredients` | `Required.Buah Naga, Susu, Gula Pasir` |
| `photo` | `Required.image png / jpg` |
| `category_id` | `Required.integer` |

#### Delete Recipes

```
DELETE/recipes/:id
```
Auth: 
| Key | Value   |
| :-------- | :------- | 
| `bearer token` | `Required. Login Token` |



## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dynnoottu/)
