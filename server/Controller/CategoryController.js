

import { faker } from '@faker-js/faker';
import { category } from '../Models/Category.model.js';


export const CategoryAdd = async (req,res)=>{
   try {
    const categories = [];
    for (let i = 0; i < 100; i++) {
        categories.push({ category: faker.commerce.department() });
    }
    await category.bulkCreate(categories);
    res.status(201).json({ message: 'Categories added successfully'});

   } catch (error) {
    console.error('Error adding categories:', error);
    res.status(500).json({ error: 'Internal server error' });
   }
}


export const CategoryGet = async (req,res)=>{
    try {
        const page = parseInt(req.query._page) || 1; 
        const limit = parseInt(req.query._limit) || 6; 
        const offset = (page - 1) * limit;
    
        const categories = await category.findAll({
          offset,
          limit
        });
    
        res.status(200).json(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}