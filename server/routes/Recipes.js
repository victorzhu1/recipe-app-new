const express = require("express");
const router = express.Router();
const Recipes = require("../models/RecipeModel");
const Users = require("../models/UserModel");


router.get("/", async (req, res) => {
    try {
        const recipes = await Recipes.find({});
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

router.get("/:recipeId", async (req, res) => {
    try {
      const recipeId = req.params.recipeId;
      const recipe = await Recipes.findById(recipeId);
      
      if (!recipe) {
        return res.status(404).json({ message: "This recipe not found" });
      }
  
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router.post("/", async (req, res) => {
    try {
        const recipe = await Recipes.create(req.body);
        const userId = recipe.author;
        const user = await Users.findById(userId);
        if (user) {
            user.recipes.push(recipe._id);
            await user.save();
        }
        res.status(200).json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

router.delete('/', async (req, res) => {
    try {
        await Recipes.deleteMany({});
        res.status(200).json({ message: 'All recipes deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;