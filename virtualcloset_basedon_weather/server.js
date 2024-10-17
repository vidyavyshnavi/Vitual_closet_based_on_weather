const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'your-secret-key',  // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
}));

const userFile = path.join(__dirname, 'users.json');

// Ensure users.json exists
if (!fs.existsSync(userFile)) {
    fs.writeFileSync(userFile, '[]', 'utf8');  // Initialize with an empty array
}

// Load data from JSON file
const loadData = () => {
    try {
        const data = fs.readFileSync(userFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
};

// Save data to JSON file
const saveData = (data) => {
    try {
        fs.writeFileSync(userFile, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to JSON file:', error);
    }
};

// Routes

// Serve home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// Serve registration page
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle user registration
app.post('/register', async (req, res) => {
    const { name, email, password, mobile } = req.body;

    // Load existing users
    const users = loadData();

    // Check if user already exists by email
    if (users.some(user => user.email === email)) {
        return res.status(400).send('User already exists.');
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
        name,
        email,
        password: hashedPassword,
        mobile,
    };

    // Add new user to the list and save to JSON file
    users.push(newUser);
    saveData(users);

    console.log('User registered successfully:', newUser);

    // Redirect to login page after successful registration
    res.redirect('/login');
});

// Handle user login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Load users from the JSON file
    const users = loadData();

    // Find user by email
    const user = users.find(user => user.email === email);

    // If user not found or password mismatch
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).send('Invalid email or password.');
    }

    // Successful login, store user in session
    req.session.user = user;

    console.log('User logged in successfully:', user);

    // Redirect to index.html after login
    res.redirect('/index');
});

// Handle logout
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Error logging out.');
        }
        res.redirect('/login');
    });
});

// Handle 404 for any undefined routes
app.use((req, res) => {
    res.status(404).send('Page not found.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
