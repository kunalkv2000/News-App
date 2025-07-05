require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connectDB = async (uri) => {
    await mongoose.connect(uri)
        .then(() => console.log('Database Connected!'))
        .catch((err) => console.log(err))
}
connectDB('mongodb+srv://kunalkv:VBdIUtSHekKyiXti@user.vkwloy2.mongodb.net/?retryWrites=true&w=majority&appName=user');

// Define user schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    Interests: [String]
});
const User = mongoose.model('User', userSchema);

// API endpoint for user registration
app.post('/register', async (req, res) => {
    try {
        const userData = req.body;
        const newUser = new User(userData);
        let result = await newUser.save();
        result = result.toObject();

        // Send registration success email
        const nodemailer = require('nodemailer');
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: 'Registration Successful!',
            html: `<h2>Welcome, ${userData.name || 'User'}!</h2>
                   <p>Your registration to News App was successful. Enjoy personalized news updates based on your interests.</p>`
        });

        // Send news email immediately after registration
        const axios = require('axios');
        let allNews = [];
        if (userData.Interests && userData.Interests.length > 0) {
            for (let interest of userData.Interests) {
                const resp = await axios.get(`https://newsapi.org/v2/top-headlines?category=${interest.toLowerCase()}&language=en&pageSize=1&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a`);
                if (resp.data && resp.data.articles) {
                    allNews = allNews.concat(resp.data.articles.map(article => ({ ...article, category: interest })));
                }
                if (allNews.length >= 3) break;
            }
            allNews = allNews.slice(0, 3);
            // After fetching news
            console.log("Fetched news articles:", allNews);
            if (allNews.length > 0) {
                // Before sending news email
                console.log("Sending news email to:", userData.email);
                const newsHtml = `
                    <h2>Hello, ${userData.name || 'User'}!</h2>
                    <p>Here are your top news updates based on your interests:</p>
                    ${allNews.map(article => `
                      <div style="margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid #eee;">
                        <div style="font-weight:bold;color:#555;">${article.category}</div>
                        <div style="font-size:18px;font-weight:600;">${article.title}</div>
                        <div style="font-size:14px;color:#888;">${article.source && article.source.name}</div>
                        <div style="margin:8px 0;">${article.description || ''}</div>
                        ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news" style="max-width:100%;border-radius:8px;" />` : ''}
                        <div><a href="${article.url}" target="_blank">Read more</a></div>
                      </div>
                    `).join('')}
                `;
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: userData.email,
                    subject: 'Your Personalized News Digest',
                    html: newsHtml
                });
            }
        }

        res.status(200).send("User registered successfully!");
    } catch (error) {
        console.error(error);
        res.send("Error");
    }
});

// API endpoint for user login
app.post('/login', async (req, res) => {
    try {
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_PASS:', process.env.EMAIL_PASS);
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            // Send welcome email
            const nodemailer = require('nodemailer');
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Welcome to The News Daily!',
                html: `<h2>Welcome, ${user.name || 'User'}!</h2><p>Thank you for logging in to The News Daily. Enjoy personalized news updates based on your interests.</p>`
            });

            // Send 3 news articles based on user interests after login
            const axios = require('axios');
            let allNews = [];
            if (user.Interests && user.Interests.length > 0) {
                for (let interest of user.Interests) {
                    const resp = await axios.get(`https://newsapi.org/v2/top-headlines?category=${interest.toLowerCase()}&language=en&pageSize=1&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a`);
                    if (resp.data && resp.data.articles) {
                        allNews = allNews.concat(resp.data.articles.map(article => ({ ...article, category: interest })));
                    }
                    if (allNews.length >= 3) break;
                }
                allNews = allNews.slice(0, 3);
                // After fetching news
                console.log("Fetched news articles:", allNews);
                if (allNews.length > 0) {
                    // Before sending news email
                    console.log("Sending news email to:", email);
                    const newsHtml = `
                        <h2>Hello, ${user.name || 'User'}!</h2>
                        <p>Here are your top news updates based on your interests:</p>
                        ${allNews.map(article => `
                          <div style="margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid #eee;">
                            <div style="font-weight:bold;color:#555;">${article.category}</div>
                            <div style="font-size:18px;font-weight:600;">${article.title}</div>
                            <div style="font-size:14px;color:#888;">${article.source && article.source.name}</div>
                            <div style="margin:8px 0;">${article.description || ''}</div>
                            ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news" style="max-width:100%;border-radius:8px;" />` : ''}
                            <div><a href="${article.url}" target="_blank">Read more</a></div>
                          </div>
                        `).join('')}
                    `;
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: 'Your News Digest',
                        html: newsHtml
                    });
                }
            }
            res.status(200).json({ message: "Login successful!" });
        } else {
            res.status(400).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error during login");
    }
});

// API endpoint to get user info by email (for demo, email is sent as query param)
app.get('/user', async (req, res) => {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user info' });
    }
});

// API endpoint to update user interests by email
app.put('/user', async (req, res) => {
    try {
        const { email, Interests } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        // Ensure Interests is always an array
        const interestsArray = Array.isArray(Interests) ? Interests : (typeof Interests === 'string' ? [Interests] : []);
        const user = await User.findOneAndUpdate(
            { email },
            { $set: { Interests: interestsArray } },
            { new: true }
        );
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user interests' });
    }
});

// Email sender route (should only be loaded in main entry file)
if (require.main === module) {
  const emailSender = require('./emailSender');
  app.use(emailSender);
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
