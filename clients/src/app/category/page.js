"use client"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../AuthContext/page.js";
import { useRouter } from "next/navigation.js";

export default function Category() {
  const {token,isAuth} = useContext(AuthContext)
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [notification, setNotification] = useState('');
  const router = useRouter();


  if(!isAuth){
    router.push('/login');
    return null;
  }

  useEffect(() => {
    fetchData(page);
  }, [page]);

  

  const fetchData = async (page) => {
    fetch(`http://localhost:8080/category?_page=${page}&_limit=6`,{
      method:"GET",
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      }
    }).then((res)=>res.json())
    .then((data)=>{
      setCategories(data)
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  };

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSubmit = (value) =>{
    fetch(`http://localhost:8080/category/addfavourite`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({favCategory:value})
    }).then((res)=>res.json())
    .then((data)=>{
      setNotification('Selected items saved successfully.'); // Set notification
      setSelectedCategories([]);
      setTimeout(() => {
        setNotification(''); // Clear notification after a few seconds
      }, 3000); 
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
  }

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      {notification && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{notification}</span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="mr-2"
            />
            <label className="cursor-pointer">{category.category}</label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={prevPage} disabled={page === 1}>Previous</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{page}</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={nextPage}>Next</button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleSubmit(selectedCategories)}>Submit</button>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Selected Categories:</h2>
        <ul className="list-disc pl-4">
          {selectedCategories.map((category) => (
            <li key={category.id} className="text-gray-800">{category.category}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
