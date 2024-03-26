"use client"; 
// import Link from "next/link";
// import { useState, useEffect } from "react";

// const Notification = ({ message }) => {
//   return (
//     <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white text-center py-2">
//       {message}
//     </div>
//   );
// };

// export default function Signup() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const obj = {
//         name, email, password
//     }
//     try {
//       const response = await fetch(`http://localhost:8080/users/register`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(obj)
//       });

//       if (response.ok) {
//         setSuccessMessage('Registration Successful.');
//       } else {
//         setError('Registration failed! Something went wrong.');
//       }
//     } catch (error) {
//       setError('Registration failed! Something went wrong.');
//     }
//   };

//     return(
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="w-[500px] h-[400px] space-y-8 rounded-lg border-2 border-gray-500 p-[10px]">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
//         </div>
//         {successMessage && <Notification message={successMessage} />}
//         {error && <Notification message={error} />}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md shadow-sm space-y-4">
//               <div className='mt-6'>
//                 <label htmlFor="name" className="sr-only">Name</label>
//                 <input id="name" name="name" type="text" autoComplete="name" required
//                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                        placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//               </div>
//               <div className='mt-6'>
//                 <label htmlFor="email" className="sr-only">Email address</label>
//                 <input id="email" name="email" type="email" autoComplete="email" required
//                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                        placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
//               </div>
//               <div className='mt-6'>
//                 <label htmlFor="password" className="sr-only">Password</label>
//                 <input id="password" name="password" type="password" autoComplete="new-password" required
//                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                        placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//               </div>
              
//             </div>
//             <div>
//               {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
//               <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
//             </div>
//           </form>
//           <p className="mt-2 text-center text-sm text-gray-600">
//           Already registered?{' '}
//           <Link href="/login">
//             <div className="font-medium text-blue-600 hover:text-blue-500">Login</div>
//           </Link>
//         </p>
//         </div>
        
//       </div>
  
//     )
// }

import Link from "next/link";
import { useState } from "react";

const Notification = ({ message }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-green-500 text-white text-center py-2">
      {message}
    </div>
  );
};

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      name,
      email,
      password
    };

    try {
      const response = await fetch(`http://localhost:8080/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      });

      if (response.ok) {
        setSuccessMessage('Registration successful.');
      } else {
        const data = await response.json();
        setError(data.error || 'Registration failed! Something went wrong.');
      }
    } catch (error) {
      setError('Registration failed! Something went wrong.');
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-[500px] h-[456px] space-y-8 rounded-lg border-2 border-gray-500 p-[10px] ">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
        </div>
        {successMessage && <Notification message={successMessage} />}
        {error && <Notification message={error} isError />}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className='mt-6'>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='mt-6'>
                 <label htmlFor="email" className="sr-only">Email address</label>
                 <input id="email" name="email" type="email" autoComplete="email" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                       placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className='mt-6'>
                <label htmlFor="password" className="sr-only">Password</label>
                <input id="password" name="password" type="password" autoComplete="new-password" required
                       className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                       placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
          </div>
          <div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
          </div>
        </form>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already registered?{' '}
          <Link href="/login">
            <div className="font-medium text-blue-600 hover:text-blue-500">Login</div>
          </Link>
        </p>
      </div>
    </div>
  );
}
