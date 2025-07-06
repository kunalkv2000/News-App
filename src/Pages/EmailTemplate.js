import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function EmailTemplate() {
  const [user, setUser] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      setError('No user email found. Please log in.');
      setLoading(false);
      return;
    }
    axios.get(`http://the-news-daily.onrender.com/user?email=${encodeURIComponent(email)}`)
      .then(res => {
        setUser(res.data.user);
        return res.data.user.Interests || [];
      })
      .then(async (interests) => {
        if (interests.length === 0) {
          setNews([]);
          setLoading(false);
          return;
        }
        // Fetch news for each interest
        let allNews = [];
        for (let interest of interests) {
          const resp = await axios.get(`https://newsapi.org/v2/top-headlines?category=${interest.toLowerCase()}&language=en&pageSize=2&apiKey=01ab4ae4f6e140b09bc457e57e2f5b0a`);
          if (resp.data && resp.data.articles) {
            allNews = allNews.concat(resp.data.articles.map(article => ({ ...article, category: interest })));
          }
        }
        setNews(allNews);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch user/news data.');
        setLoading(false);
      });
  }, []);

  // Helper to build HTML for email
  const buildEmailHtml = () => {
    return `
      <h2>Top News Based on Your Interests</h2>
      ${news.length === 0 ? '<div>No news found for your interests.</div>' :
        news.map(article => `
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
  };

  const handleSendEmail = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/send-news-email', {
        to: user.email,
        subject: 'Your Personalized News Digest',
        html: buildEmailHtml()
      });
      alert('News email sent!');
    } catch (err) {
      alert('Failed to send email.');
    }
  };

  if (loading) return <div>Loading news for email template...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ marginBottom: '1rem' }}>Email Template Preview</h2>
      <div><strong>To:</strong> {user.email}</div>
      <div><strong>Interests:</strong> {user.Interests && user.Interests.length > 0 ? user.Interests.join(', ') : 'None'}</div>
      <hr style={{ margin: '1rem 0' }} />
      <h3>Top News Based on Your Interests</h3>
      {news.length === 0 ? <div>No news found for your interests.</div> : (
        news.map((article, idx) => (
          <div key={idx} style={{ marginBottom: 24, paddingBottom: 12, borderBottom: '1px solid #eee' }}>
            <div style={{ fontWeight: 'bold', color: '#555' }}>{article.category}</div>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{article.title}</div>
            <div style={{ fontSize: 14, color: '#888' }}>{article.source && article.source.name}</div>
            <div style={{ margin: '8px 0' }}>{article.description}</div>
            {article.urlToImage && <img src={article.urlToImage} alt="news" style={{ maxWidth: '100%', borderRadius: 8 }} />}
            <div><a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a></div>
          </div>
        ))
      )}
      <button onClick={handleSendEmail} style={{ marginTop: 24, padding: '10px 24px', background: '#222', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Send News Email</button>
    </div>
  );
}
