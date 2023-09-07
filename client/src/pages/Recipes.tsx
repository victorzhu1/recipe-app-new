import axios from "axios"
import { useEffect, useState } from "react"
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

interface Recipe {
    _id: string;
    title: string;
    username: string;
    author: string;
    timeToCook: number;
    ingredients: string[];
    instructions: string[];
    createdAt: Date;
}

export function Recipes() {

    const [listOfRecipes, setListOfRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

    function formatDate(date: Date) {
        return format(new Date(date), 'MM/dd/yyyy');
    }

    useEffect(() => {
        axios.get<Recipe[]>(`${apiUrl}/recipes`)
        .then((response) => {
            setListOfRecipes(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching recipes:", error);
        });
    }, []);

    return (
        <div className='recipes-container h-full w-full flex flex-col items-center justify-center font-oswald'>
            <div className='recipes-header w-full bg-slate-700 flex justify-center md:justify-start text-center'>
                <div className='recipes-text-container mt-36 mb-4 md:ml-32'>
                    <h1 className='text-5xl md:text-6xl text-white'>
                        RECIPES
                    </h1>
                </div>
            </div>
            <div className='recipes-content my-16 w-full flex flex-col justify-normal text-slate-800'>
                
                <div className='recipe-list-container w-2/3 md:w-1/2 mx-auto flex flex-col items-center'>
                    <h1 className='mb-8 text-4xl '>
                        All posted recipes!
                    </h1>

                    {loading ? (
                        <h1 className="mb-4 text-2xl">Loading...</h1>
                    ) : (
                        listOfRecipes.map((recipe) => (
                            <Link
                                to={`/recipe/${recipe._id}`}
                                className={`recipe w-full border-2 border-slate-800 text-center px-4 py-2 mb-2 ${
                                    selectedRecipe === recipe._id ? 'selected-post' : ''
                                }`}
                                key={recipe._id}
                            >
                                <div className="text-3xl mb-2">{recipe.title}</div>
                                <div className="text-lg mb-2">Posted By: {recipe.username}</div>
                                <div className="text-lg mb-2">Posted On: {formatDate(recipe.createdAt)}</div>
                                <div className="text-lg mb-2">Time to Cook: {recipe.timeToCook} minutes</div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}