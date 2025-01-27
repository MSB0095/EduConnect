# EduConnect

A student-focused social platform for knowledge sharing and connecting. Built with MERN stack.

## Features

### Core Functionality
- User registration and authentication
- Create, edit, and delete posts
- Like and comment on posts
- Profile management with customizable fields
- Image upload for posts and profiles

### User Profiles Include
- Academic information (Institution, Major, Year)
- Skills and Interests
- Languages
- Location
- Profile picture

### Posts Support
- Text content
- Image attachments
- Likes/Unlike functionality
- Comments
- Edit/Delete options

## Tech Stack
- MongoDB (Database)
- Express.js (Backend)
- React.js (Frontend)
- Node.js (Runtime)

## Quick Start

1. Clone and Install
```bash
git clone https://github.com/MSB0095/educonnect.git
cd educonnect
npm install
cd frontend && npm install
cd ..
```

2. Configure Environment
Create `.env` file:
```
MONGO_URI=mongodb://127.0.0.1:27017/educonnect
PORT=5000
JWT_SECRET=your_secret_key
```

3. Run Application
```bash
# Run full stack
npm run dev

# Run backend only
npm run server

# Run frontend only
npm run client
```

Server runs on http://localhost:5000
Client runs on http://localhost:3000

## Detailed Setup Guide (Ubuntu)

### 1. Install Node.js
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Install MongoDB
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu $(lsb_release -cs)/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB on system startup
sudo systemctl enable mongod

# Verify MongoDB is running
sudo systemctl status mongod
```

### 3. Create MongoDB Database
```bash
# Start MongoDB shell
mongosh

# Create and use educonnect database
use educonnect

# Create initial collections
db.createCollection('users')
db.createCollection('posts')
db.createCollection('profiles')

# Exit MongoDB shell
exit
```

### 4. Generate JWT Secret
```bash
# Generate a secure random string
openssl rand -base64 64

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'));"
```

### 5. Setup Environment Variables
Create `.env` file in project root:
```bash
# Create and open .env file
nano .env
```

Add the following content (replace JWT_SECRET with your generated string):
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/educonnect
JWT_SECRET=your_generated_secret_here
```

### 6. Create Upload Directories
```bash
# Create directories for uploads
mkdir -p uploads/profile uploads/posts
```

### 7. Install Project Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 8. Run the Application
```bash
# Development mode (runs both frontend & backend)
npm run dev
```

### Common Issues

1. MongoDB Connection Issues
```bash
# Check MongoDB status
sudo systemctl status mongod

# Restart MongoDB
sudo systemctl restart mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

2. Port Already in Use
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill the process
sudo kill -9 <PID>
```

3. Permission Issues
```bash
# Set proper permissions for upload directories
sudo chmod 755 uploads
sudo chown -R $USER:$USER uploads
```

Now your development environment is fully set up and ready to go!

## Author

Mohamed Salah Belbsir
- Software Engineering Student at ALX
- GitHub: [@MSB0095](https://github.com/MSB0095)

## License

MIT License - see [LICENSE](LICENSE)
