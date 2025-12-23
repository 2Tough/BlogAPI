# 📝 BlogAPI - REST API with Spring Boot and React

> A full-stack web application for creating, editing, and managing blog posts with user authentication. 

![Java](https://img.shields.io/badge/Java-17-orange? style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-blue? style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)

---

## 📸 Screenshots

### Home Page
<img width="833" height="977" alt="image" src="https://github.com/user-attachments/assets/3964b830-a93d-4af8-ae58-4dafbcf62066" />


### Create Post
<img width="820" height="1265" alt="image" src="https://github.com/user-attachments/assets/6b2a144b-a033-40da-a23e-cda2272a7ad4" />


### Login
<img width="831" height="886" alt="image" src="https://github.com/user-attachments/assets/fb3fb11c-df7a-4250-ae5f-14bd9555050d" />


---

## ✨ Features

- ✅ User registration and login
- ✅ Create, edit, and delete posts (only your own)
- ✅ Anonymous posts allowed
- ✅ Ownership validation (only edit/delete your posts)
- ✅ Modern and responsive UI
- ✅ Confirmation modal before deletion
- ✅ Real-time post updates

---

## 🛠️ Technologies

### Backend
- **Java 17**
- **Spring Boot 3.x**
- **Spring Data JPA**
- **MySQL 8.0**
- **Lombok**
- **Maven**

### Frontend
- **React 18**
- **JavaScript (ES6+)**
- **CSS3**
- **Fetch API**
- **LocalStorage for session management**

---

## 🚀 Installation

### Prerequisites

- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Backend Setup

1. Clone the repository
```bash
git clone https://github.com/2Tough/blogapi.git
cd blogapi
```

2. Configure the database in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blog_db
spring.datasource.username=YOUR_USERNAME
spring.datasource. password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

3. Create the database: 
```sql
CREATE DATABASE blog_db;
```

4. Run the backend:
```bash
mvn spring-boot:run
```

The backend will be running at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd blog-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be running at `http://localhost:3000`

---

## 📡 API Endpoints

### Posts

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/posts` | Get all posts |
| `GET` | `/api/posts/{id}` | Get a post by ID |
| `POST` | `/api/posts` | Create a new post |
| `PUT` | `/api/posts/{id}` | Update a post |
| `DELETE` | `/api/posts/{id}` | Delete a post |

#### Request Examples

**Create Post:**
```json
POST /api/posts
{
  "title": "My First Post",
  "content": "This is the content of my post",
  "category": "Technology",
  "authorUsername": "2Tough"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "My First Post",
  "content": "This is the content of my post",
  "category": "Technology",
  "authorUsername": "2Tough",
  "createdAt":  "2025-12-23T10:30:00",
  "updatedAt": null,
  "likesCount": 0,
  "commentsCount": 0
}
```

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/users/register` | Register a new user |
| `POST` | `/api/users/login` | User login |

#### Request Examples

**Register:**
```json
POST /api/users/register
{
  "username": "2Tough",
  "email":  "2tough@example.com",
  "password":  "securePassword123"
}
```

**Login:**
```json
POST /api/users/login
{
  "username": "2Tough",
  "password": "securePassword123"
}
```

---

## 📁 Project Structure

```
blogapi/
├── src/
│   ├── main/
│   │   ├── java/dev/twotough/springlab/blogapi/
│   │   │   ├── controller/       # REST Controllers
│   │   │   │   ├── PostController.java
│   │   │   │   └── UserController.java
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── CreatePostRequestDTO.java
│   │   │   │   ├── PostResponseDTO.java
│   │   │   │   └── UpdatePostRequestDTO.java
│   │   │   ├── model/            # JPA Entities
│   │   │   │   ├── Post.java
│   │   │   │   ├── User.java
│   │   │   │   └── Comment.java
│   │   │   ├── repository/       # Spring Data Repositories
│   │   │   │   ├── PostRepository. java
│   │   │   │   └── UserRepository.java
│   │   │   └── service/          # Business Logic
│   │   │       ├── PostService.java
│   │   │       └── UserService.java
│   │   └── resources/
│   │       └── application. properties
│   └── test/
└── blog-frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── CreatePost.jsx
    │   │   ├── PostList.jsx
    │   │   ├── Login.jsx
    │   │   └── Register.jsx
    │   ├── services/
    │   │   └── authService.js
    │   ├── App.js
    │   ├── App.css
    │   └── index.js
    └── package.json
```

---

## 🔑 Key Features Explained

### Authentication System
- Simple session-based authentication using LocalStorage
- Users can register with username, email, and password
- Login persists across page refreshes
- Automatic author assignment for logged-in users

### Post Management
- **Create:** Logged-in users create posts under their username; anonymous users are assigned "Anónimo"
- **Edit:** Only the post author can edit their posts
- **Delete:** Only the post author can delete their posts with confirmation modal
- **View:** All posts are publicly visible

### Security Features
- Backend validates that usernames exist before assigning authorship
- Frontend hides edit/delete buttons for posts you don't own
- Username spoofing prevention

---

## 🎨 UI Features

- **Responsive Design:** Works on desktop and mobile devices
- **Modal Confirmations:** Delete and edit actions use clean modal dialogs
- **Real-time Feedback:** Success/error messages for all actions
- **Loading States:** Buttons disabled during API calls
- **Clean Layout:** Modern card-based design for posts

---

## 🔮 Future Improvements

- [ ] Comment system
- [ ] Like/reaction system
- [ ] Categories and tags with filtering
- [ ] Search functionality
- [ ] Pagination for posts
- [ ] User profiles
- [ ] JWT authentication
- [ ] Image uploads for posts
- [ ] Rich text editor
- [ ] Dockerization
- [ ] Kubernetes deployment

---

## 🐛 Known Issues

- Sessions use LocalStorage (not secure for production)
- No password encryption (plain text storage)
- No email verification
- No password reset functionality

---

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

### Frontend Tests
```bash
npm test
```

---

## 📚 Learning Resources

This project was built to learn:
- REST API design with Spring Boot
- React component architecture
- Database relationships with JPA
- Frontend-Backend integration
- CRUD operations
- User authentication basics

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👤 Author

**2Tough**

- GitHub: [@2Tough](https://github.com/2Tough)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Spring Boot documentation
- React documentation
- Stack Overflow community

---

**⭐ If you found this project helpful, please give it a star! **
