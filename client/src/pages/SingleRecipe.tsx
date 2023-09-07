import axios from "axios"
import { useState , useEffect } from "react";
import { useParams } from 'react-router-dom';

const appId = "f45f5d91";
const appKey = "1390a39571986bf5d0265d38ca9e3ffc";

const apiUrl = process.env.REACT_APP_API_URL;

interface Recipe {
    title: string;
    author: string;
    username: string;
    timeToCook: number;
    ingredients: string[];
    instructions: string[];
}

const apiKey = process.env.REACT_APP_API_KEY;

export function SingleRecipe() {

    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        axios.get<Recipe>(`${apiUrl}/recipes/${recipeId}`)
          .then((response) => {
            setRecipe(response.data);
    
            const query = encodeURIComponent(response.data.title);
            const edamamUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}`;
    
            axios
              .get(edamamUrl)
              .then((edamamResponse) => {
                const firstRecipe = edamamResponse.data.hits[0].recipe;
                const image = firstRecipe.image;
                    setImageUrl(image);
              })
              .catch((edamamError) => {
                console.error('Error getting image from Edamam:', edamamError);
              });
          })
          .catch((error) => {
            console.error('Error getting recipe:', error);
          });
      }, [recipeId]);


    useEffect(() => {
        axios.get<Recipe>(`http://localhost:3001/recipes/${recipeId}`)
          .then((response) => {
            setRecipe(response.data);
          })
          .catch((error) => {
            console.error('Error fetching recipe:', error);
          });
    }, [recipeId]);

    return (
        <div className="single-recipe-page h-full w-screen flex flex-col items-center justify-center font-oswald">
            <div className='single-recipe-header w-full bg-slate-700 flex justify-start text-center'>
                <div className='single-recipe-text-container mt-36 mb-4 ml-32'>
                <h1 className='text-6xl text-white'>
                    {recipe ? recipe.title : "Loading..."}
                </h1>
                </div>
            </div>
            <div className="recipe-detail-container flex flex-col items-center py-16 mx-24">
                {imageUrl ? (
                    <img src={imageUrl} alt="Generated Image" className="object-cover shadow w-2/5 mb-2" />
                ) : (
                    <h1 className="text-6xl text-slate-800 mb-2">
                        LOADING...
                    </h1>
                )}
                <p className="text-xl text-slate-800 mb-12">Auto Generated Image</p>
                {recipe ? (
                    <div>
                    <h2 className='text-5xl mb-6'>Posted By: {recipe.username}</h2>
                    <h2 className='text-5xl mb-6'>Time to Cook: {recipe.timeToCook} minutes</h2>
                    
                    <div>
                        <h3 className='text-5xl mb-6'>Ingredients:</h3>
                        <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li className="list-decimal ml-8 text-3xl mb-2" key={index}>{ingredient}</li>
                        ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className='text-5xl mb-4'>Instructions:</h3>
                        <ol>
                        {recipe.instructions.map((instruction, index) => (
                            <li className="list-decimal ml-8 text-3xl mb-2" key={index}>{instruction}</li>
                        ))}
                        </ol>
                    </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}
