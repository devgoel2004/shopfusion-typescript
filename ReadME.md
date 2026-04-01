# 🛒 ShopFusion

ShopFusion is a **full-stack E-commerce platform** built using **TypeScript, Node.js, Express, and MongoDB**. It is designed to provide a scalable, secure, and efficient online shopping experience.

---

## 🚀 Features

* 🔐 **User Authentication**

  * JWT-based login and registration
  * Password hashing using bcrypt
  * Secure protected routes

* 🛍️ **Product Management**

  * Add, update, delete products (Admin)
  * View products with filtering and search

* 🛒 **Cart & Orders**

  * Add items to cart
  * Place and manage orders

* ⚡ **Scalable Backend**

  * RESTful APIs
  * Modular architecture
  * Middleware-based request handling

---

## 🧑‍💻 Tech Stack

**Backend**

* Node.js
* Express.js
* TypeScript
* MongoDB (Mongoose)

**Frontend (if included)**

* React.js
* Redux / Context API
* Tailwind CSS

---

## 📁 Project Structure

```
backend/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── utils/
 ├── config/
 └── server.ts
```

---

## ⚙️ Installation

### 1. Clone the repository

```
git clone https://github.com/your-username/shopfusion.git
cd shopfusion
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

### 4. Run the project

**Development**

```
npm run dev
```

**Production**

```
npm run build
npm start
```

---

## 🔐 Authentication Flow

1. User registers → password hashed using bcrypt
2. User logs in → JWT token generated
3. Token is used to access protected routes

---

## 📡 API Endpoints

### Auth

* `POST /api/v1/register`
* `POST /api/v1/login`
* `GET /api/v1/me`

### Products

* `GET /api/v1/products`
* `POST /api/v1/admin/product`

### Orders

* `POST /api/v1/order`
* `GET /api/v1/orders/me`

---

## 🧪 Testing

Use Postman or any API testing tool to test endpoints.

---

## 📈 Future Improvements

* Redis caching
* Load balancing
* Microservices architecture
* Payment integration improvements
* Real-time notifications

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---

## 📝 License

This project is licensed under the MIT License.

---

## 💡 Author

**Dev Goel**
MERN Stack Developer

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub!
