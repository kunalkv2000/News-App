import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const allInterests = [
    'Business', 'Sports', 'Technology', 'Health', 'Science', 'General'
  ];

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) {
      setError('No user email found. Please log in.');
      setLoading(false);
      return;
    }
    axios.get(`https://thenewsdaily.vercel.app/user?email=${encodeURIComponent(email)}`)
      .then(res => {
        setUser(res.data.user);
        setSelectedInterests(res.data.user.Interests || []);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch user data.');
        setLoading(false);
      });
  }, []);

  const handleInterestChange = (e) => {
    const { options } = e.target;
    const values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    setSelectedInterests(values);
  };

  const handleUpdate = async () => {
    try {
      const email = user.email;
      const response = await axios.put(`https://thenewsdaily.vercel.app/user`, {
        email,
        Interests: selectedInterests
      }, {
        headers: { 'Content-Type': 'application/json' }
      });
      setUser({ ...user, Interests: response.data.user.Interests });
      setEditMode(false);
      alert('Interests updated!');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert('Failed to update interests: ' + err.response.data.message);
      } else {
        alert('Failed to update interests. ' + (err.message || ''));
      }
      console.error('Update error:', err);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>{error}</div>;
  if (!user) return <div>No user data found.</div>;

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: '2rem', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ marginBottom: '1rem' }}>Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Interests:</strong> {editMode ? (
        <select multiple value={selectedInterests} onChange={handleInterestChange} style={{ width: '100%', minHeight: 80 }}>
          {allInterests.map(interest => (
            <option key={interest} value={interest}>{interest}</option>
          ))}
        </select>
      ) : (
        user.Interests && user.Interests.length > 0 ? user.Interests.join(', ') : 'None'
      )}
      </div>
      {editMode ? (
        <button onClick={handleUpdate} style={{ marginTop: 16 }}>Update</button>
      ) : (
        <button onClick={() => setEditMode(true)} style={{ marginTop: 16 }}>Edit Interests</button>
      )}
    </div>
  );
}
