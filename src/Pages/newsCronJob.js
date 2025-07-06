require('dotenv').config();
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');

// Connect to MongoDB (reuse your connection string)
mongoose.connect('mongodb+srv://kunalkv:VBdIUtSHekKyiXti@user.vkwloy2.mongodb.net/?retryWrites=true&w=majority&appName=user');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  Interests: [String]
});
const User = mongoose.model('User', userSchema);

const sendNewsEmail = async (user, news) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  const html = `
    <h2>Hello, ${user.name || 'User'}!</h2>
    <p>Here are your top news updates based on your interests:</p>
    ${news.map(article => `
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
    to: user.email,
    subject: 'Your News Digest',
    html
  });
};

// Run every day at 7 AM
cron.schedule('0 7 * * *', async () => {
  const users = await User.find({});
  for (const user of users) {
    if (!user.Interests || user.Interests.length === 0) continue;
    let allNews = [];
    for (let interest of user.Interests) {
      const resp = await axios.get(`https://newsapi.org/v2/top-headlines?category=${interest.toLowerCase()}&language=en&pageSize=1&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a`);
      if (resp.data && resp.data.articles) {
        allNews = allNews.concat(resp.data.articles.map(article => ({ ...article, category: interest })));
      }
      if (allNews.length >= 3) break;
    }
    allNews = allNews.slice(0, 3);
    if (allNews.length > 0) {
      await sendNewsEmail(user, allNews);
    }
  }
  console.log('News emails sent to all users at 7 AM.');
});
