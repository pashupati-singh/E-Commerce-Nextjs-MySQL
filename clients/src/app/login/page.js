"use client"
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthContext/page.js';

export default function Login() {
  const { login, logout, isAuth, name , token} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
  const [favoriteCategories, setFavoriteCategories] = useState([]);

  useEffect(() => {
    if (isAuth) {
      fetchFavoriteCategories();
    }
  }, [isAuth]);

  const fetchFavoriteCategories = async () => {
    try {
      const response = await fetch('http://localhost:8080/category/fav', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        const newCategories = data.favoriteCategories.map(entry =>
          entry.favCategory.map(category => category.category).join(', ')
        );
        
        // Convert the newCategories array to a Set to remove duplicates
        const uniqueCategoriesSet = new Set([...favoriteCategories, ...newCategories]);
        // Convert the Set back to an array
        const uniqueCategoriesArray = [...uniqueCategoriesSet];
        
        setFavoriteCategories(uniqueCategoriesArray);
      } else {
        console.error('Failed to fetch favorite categories');
      }
    } catch (error) {
      console.error('Error fetching favorite categories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      email,
      password
    };
    
    fetch('http://localhost:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    })
    .then((res) => res.json())
    .then((data) => {
      setNotification('Login successful');
      login(data.token, data.name);
    })
    .catch((err) => {
      console.error('Error logging in:', err);
      setNotification('Error logging in');
    });
  };

  const handleLogout = () => {
    logout();
    setNotification('Logged out successfully');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[500px] h-[400px] space-y-8 rounded-lg border-2 border-gray-500 p-[10px]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        {notification && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{notification}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="m-[10px]">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="m-[10px]">
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="checkbox"
                id="showPassword"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor="showPassword">Show password</label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isAuth ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'}`}
              disabled={isAuth}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
      <div className="flex mt-4 ">
        {isAuth && (
          <div className="text-gray-600 text-lg">
            Welcome, {name}! <button onClick={handleLogout} className="text-blue-500 underline ml-2">Logout</button>
          </div>
        )}
        {isAuth && (
          <div className=" ml-4 text-gray-600">
            <h2 className="text-xl font-bold mb-2">Favorite Categories:</h2>
            <ul className="list-disc pl-4">
              {favoriteCategories.map((category, index) => (
                <li key={index} className="text-gray-800">{category}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
