import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import Card from './Card';


function Login({setIsAdmin}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const usersData = await response.json();

      // Check if the provided username and password match any user in the database
      const user = usersData.find(
        (user) => user.name === username && user.password === password
      );
      
if (user) {
  // Update local storage with user data
  localStorage.setItem('user', JSON.stringify(user));

  setUsername(username);
  setPassword(password);
  setIsAdmin(user.isManager === 1);

  if (user.isManager === 1) {
    setIsAdmin(true); // Set isAdmin to true for managers
    navigate('/ManagerApp'); // Navigate to the admin page
  } else {
    setIsAdmin(false); // Set isAdmin to false for regular users
    navigate('/application'); // Navigate to the regular user page
  }
} else {
  throw new Error('User not found');
}

      
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h1 className="title1">🎞️ MyCinema 🍿</h1>
      <h1 className="title">Sign In</h1>
      <p className="subtitle">
        Please log in using your username and password!
      </p>
      <form onSubmit={handleSubmit}>
        <div className="inputs_container">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Log In" className="login_button" />
      </form>
      
    </Card>
  );

}

export default Login;
