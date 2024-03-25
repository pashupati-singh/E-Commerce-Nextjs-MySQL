"use client"
import axios from "axios";
import { useEffect, useState } from "react"

export default function Category(){
    const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const[page,setPage] = useState(1)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/category?_page=1&_limit=6`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCheckboxChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(Math.max(page - 1, 1));
  };


console.log(categories);
    return(
        <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCheckboxChange(category)}
              className="mr-2"
            />
            <label>{category.name}</label>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={prevPage} disabled={page === 1}>Previous</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{page}</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={nextPage}>Next</button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => console.log(selectedCategories)}>Submit</button>
      </div>
    </div>
    )
}