const db = require('../db').connection;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const existingUser = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            // User already exists, send a message
            return res.render('register', { message: 'User with this email already exists.' });
        }

        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the user into the database with the hashed password
        await db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);

        console.log('User registered:', results);

        // Redirect to the home page after successful registration
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            // User does not exist, send a message
            return res.render('login', { message: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user[0].password);

        if (isPasswordValid) {
            // Passwords match, create a JWT token for authentication
            const token = jwt.sign({ userId: user[0].id }, 'your-secret-key', { expiresIn: '1h' });

            // Send the token as a response
            // res.json({ token });

            // Redirect to the home page after successful login
            res.redirect('/');
        } else {
            // Passwords do not match, send a message
            res.render('login', { message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
