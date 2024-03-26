

import { faker } from '@faker-js/faker';
import { category } from '../Models/Category.model.js';
import UserFavouriteCategory from '../Models/UsersCatergory.model.js';


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

export const favCategory = async (req,res) =>{
  const { favCategory } = req.body;
  try {
    const newUserFavouriteCategory = await UserFavouriteCategory.create({
      userId: req.user.id,
      favCategory
    });
    res.status(201).json({
      message: 'User favourite category saved successfully',
      userFavouriteCategory: newUserFavouriteCategory
    });
  } catch (error) {
    console.error('Error saving user favourite category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export const favCategoryGet = async (req,res) =>{
  const userId = req.user.id;

  try {
    const favoriteCategories = await UserFavouriteCategory.findAll({
      where: { userId }
    });



    if (!favoriteCategories || favoriteCategories.length === 0) {
      return res.status(404).json({ message: 'Categories not selected yet' });
    }

    return res.json({ favoriteCategories });
  } catch (error) {
    console.error('Error fetching favorite categories:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}