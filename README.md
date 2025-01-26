# EduConnect

A robust social learning platform that connects students, enabling knowledge sharing and collaborative learning.

![EduConnect Logo](./frontend/public/logo.png)

## Overview

EduConnect is a MERN stack application designed to create an educational social network where students can connect, share knowledge, and grow together. The platform facilitates meaningful discussions, resource sharing, and community building among students.

## Key Features

### User Management
- Secure authentication using JWT
- User registration and login
- Profile customization
- Avatar upload support
- Educational background details

### Social Interaction
- Create and share posts
- Like and comment on posts
- Search functionality
- Real-time notifications
- Educational discussion threads

### Profile Features
- Institution details
- Academic status
- Field of study
- Educational history
- Professional interests
- Social media integration

## Technology Stack

### Backend
- **Node.js & Express.js**: Server framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication
- **bcrypt.js**: Password hashing

### Frontend
- **React**: UI library
- **React Router**: Navigation
- **Axios**: HTTP client
- **CSS3**: Custom styling

## Getting Started

### Prerequisites
```bash
node >= 14.0.0
npm >= 6.0.0
MongoDB >= 4.0.0
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/educonnect.git
cd educonnect
```

2. Install dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd frontend
npm install
```

3. Configure environment variables
Create a `.env` file in the root directory:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Run the application
```bash
# Run backend only (port 5000)
npm run server

# Run frontend only (port 3000)
npm run client

# Run both frontend and backend
npm run dev
```

## API Documentation

### Authentication Endpoints
```
POST /api/auth/login
POST /api/users/register
GET  /api/auth/me
```

### Posts Endpoints
```
GET    /api/posts
POST   /api/posts
PUT    /api/posts/like/:id
POST   /api/posts/comment/:id
DELETE /api/posts/:id
GET    /api/posts/search
```

### Profile Endpoints
```
GET  /api/profile/me
POST /api/profile
GET  /api/profile/user/:user_id
```

## Project Structure
```
educonnect/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── styles/
│       └── App.js
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Code Style

- Follow ESLint configuration
- Use meaningful variable names
- Write concise comments
- Maintain consistent spacing

## Testing

```bash
# Run backend tests
npm run test

# Run frontend tests
cd frontend
npm test
```

## Deployment

The application can be deployed using:
- Heroku
- DigitalOcean
- AWS
- Any other cloud platform supporting Node.js

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- **Your Name** - *Initial work* - [YourGithub](https://github.com/yourusername)

## Acknowledgments

- ALX Software Engineering Program
- MongoDB Documentation
- React Documentation
- Express.js Community

## Support

For support, email support@educonnect.com or join our Discord channel.

---
Made with ❤️ by [Your Name]
