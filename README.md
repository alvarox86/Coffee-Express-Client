
# Coffee Express

## [See the App!](https://coffee-express-app.netlify.app/)

<img src="https://res.cloudinary.com/dotfm1go0/image/upload/v1750281160/iconlogo_bsqf1c.png" alt="Descripción" width="200" />

## Description

Coffee Express is an e-commerce platform for buy some different kinds of coffees where sellers add products and registered users can buy and leave reviews. It offers a easy shopping experience. Payments are fully simulated for testing purposes. 


#### [Client Repo here](https://github.com/alvarox86/Coffee-Express-Client.git)
#### [Server Repo here](https://github.com/alvarox86/Coffee-Express-Server.git)

## Technologies & Libraries used

- React  
- JavaScript (ES6+)  
- HTML5  
- CSS3  
- MongoDB  
- Node.js  
- Express.js  
- Material UI (MUI)  
- External APIs: Stripe, Cloudinary  
- Git (version control)  
- JSON Web Tokens (JWT) for authentication 
- Axios 
- Bcript

## Backlog Functionalities

- Add a page to view order history and total spending.  
- Create a new superadmin role to manage seller functionalities.  
- Enable multi-product orders with a display of the total amount.  
- Implement password recovery and reset via email.  
- Allow sending coffee recommendations through email.


# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about 
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a user I want to see all the cofees available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
|   |
| Route                         | Page/Component     | Components Used             | Access Level             | Description                                                             |
|------------------------------|--------------------|------------------------------|--------------------------|-------------------------------------------------------------------------|
| `/`                          | Home               |                              | public                   | Home page                                                               |
| `/signup`                    | Signup             |                              | anon only `<IsAnon>`     | Signup form, link to login, redirect to homepage after signup          |
| `/login`                     | Login              |                              | anon only `<IsAnon>`     | Login form, link to signup, redirect to homepage after login           |
| `/profile`                   | Profile            | EditProfile                  | user only `<IsPrivate>`  | View and edit personal user data, logout option                        |
| `/products`                  | ProductList        | ProductCard, FilterBar       | public                   | Show all products, with search and filters by name, type, origin       |
| `/products/:productId`       | ProductDetail      | ReviewList, AddReview        | public                   | Show detailed info of a specific product and its reviews               |
| `/admin/products`            | AdminProductList   | EditProduct, DeleteProduct   | admin only `<IsAdmin>`   | Admin view of all products with edit and delete options                |
| `/admin/products/new`        | CreateProduct      | ProductForm                  | admin only `<IsAdmin>`   | Create a new product                                                   |
| `/admin`                     | AdminDashboard     |                              | admin only `<IsAdmin>`   | Admin-specific functionalities overview                                |
| `/reviews`                  | AllReviews         | ReviewCard                   | public                   | Show all reviews with linked product info                              |
| `/cart`                      | Cart               | CartItem                     | user only `<IsPrivate>`  | Show current user’s cart with added products                           |
| `/orders/new`                | Checkout           | PaymentForm, CartSummary     | user only `<IsPrivate>`  | Proceed to checkout with cart + add payment data (test only)          |
| `/orders/:orderId`           | OrderDetail        | OrderSummary                 | user only `<IsPrivate>`  | Show details of a specific order                                       |

## Components

- Home
- Navbar
- Products
- ProductDetails
- EditProduct
- CreateProduct
- AboutPage
- Login
- Signup
- Payment
- Cart
- CancelPayment
- SuccessPayment
- Footer
  
## Context

- auth.context
- user.context
  
## Links

### Collaborators

[María Jiménez Sánchez](https://github.com/mariajs99)

[Alvaro Ruiz Monfillo](https://github.com/alvarox86)

### Project

[Repository Link Client](https://github.com/alvarox86/Coffee-Express-Client)

[Repository Link Server](https://github.com/alvarox86/Coffee-Express-Server)

