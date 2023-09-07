import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { SetStateAction, useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Recipe {
    title: string;
    author: string;
    username: string;
    timeToCook: number;
    ingredients: string[];
    instructions: string[];
}

export function Create() {

    let navigate = useNavigate();
    const [createError, setCreateError] = useState("");

    interface Recipe {
        title: string;
        author: string;
        username: string;
        timeToCook: number;
        ingredients: string[];
        instructions: string[];
    }

    const initialValues : Recipe = {
        title: "",
        author: "",
        username: "",
        timeToCook: 0,
        ingredients: [],
        instructions: [],
    }

    const [recipeData, setRecipeData] = useState<Recipe>({
        title: "",
        author: "",
        username: "",
        timeToCook: 0,
        ingredients: [],
        instructions: [],
    });

    const [ingredient, setIngredient] = useState<string>("");
    const [instruction, setInstruction] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setRecipeData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
    };

    const handleAddIngredient = () => {
        const newItem = ingredient;
        if (newItem.trim()) {
          setRecipeData((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, newItem],
          }));
          setIngredient("");
        }
    };
      
    const handleAddInstruction = () => {
        const newItem = instruction;
        if (newItem.trim()) {
          setRecipeData((prevState) => ({
            ...prevState,
            instructions: [...prevState.instructions, newItem],
          }));
          setInstruction("");
        }
    };

    const onSubmitA = (data: Recipe) => {
        const username = sessionStorage.getItem('username');
        const userId = sessionStorage.getItem('userId');

        if (username && userId) {
            data.author = userId;
            data.username = username;
            data.timeToCook = recipeData.timeToCook;
            data.ingredients = recipeData.ingredients;
            data.instructions = recipeData.instructions;
            axios.post(`${apiUrl}/recipes`, data).then((response) => {
                navigate("/recipes");
            })
            .catch((error) => {
                if (error.response) {
                    setCreateError(error.response.data.error);
                } else {
                    setCreateError("An error occurred while posting.");
                }
            });       
        }
      };

    const validationSchemaA = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    timeToCook: Yup.number().required("Time to cook is required").integer(),
    ingredients: Yup.array().of(
        Yup.object().shape({
        name: Yup.string().required("Ingredient name is required"),
        quantity: Yup.string().required("Quantity is required"),
        })
    ),
    instructions: Yup.array().of(Yup.string().required("Instruction is required")),
    });

    return (
        <div className="create-post-page h-full w-screen flex flex-col items-center justify-center font-oswald">
            <div className='create-header w-full bg-slate-700 flex justify-center md:justify-start text-center'>
                <div className='create-text-container mt-36 mb-4 md:ml-32'>
                    <h1 className='text-6xl text-white'>
                        CREATE A RECIPE
                    </h1>
                </div>
            </div>
            <div className="create-container w-3/4 md:w-1/3 my-16 p-8 text-center border-4 border-slate-800">
                <Formik initialValues = {initialValues} onSubmit = {onSubmitA} validationSchema = {validationSchemaA}>
                    <Form className="formContainer flex flex-col">
                        <label className="text-3xl mb-2"> Title: </label>
                        <ErrorMessage name = "title" component="span"/>
                        <Field id="inputCreatePost" name="title" placeholder="ex. Cookies" className="border-2 p-2 mb-4"/>

                        <label className="text-3xl mb-2"> Time to Cook (minutes): </label>
                        <ErrorMessage name="timeToCook" component="span" />
                        <Field
                        id="inputCreatePost"
                        type="number"
                        name="timeToCook"
                        placeholder="ex: 30"
                        value={recipeData.timeToCook}
                        onChange={handleChange}
                        className="border-2 p-2 mb-4"
                        />

                        <div className="ingredients-container mb-4">
                            <label className="text-3xl"> Ingredients: </label>
                            <div className="flex items-center justify-center mt-2">
                                <Field
                                type="text"
                                name="ingredients"
                                value={ingredient}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setIngredient(e.target.value)}
                                placeholder="ex: Butter (2 tbsp)"
                                className="border-2 p-2 mb-2 w-full"
                                />
                                <button
                                type="button"
                                onClick={handleAddIngredient}
                                className="ml-2 bg-slate-800 text-white px-2 py-1"
                                >
                                +
                                </button>
                            </div>
                            <ul>
                                {recipeData.ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    {index + 1}. {ingredient}
                                </li>
                                ))}
                            </ul>
                            <ErrorMessage name="ingredients" component="span" />
                        </div>

                        <div className="instructions-container mb-4">
                            <label className="text-3xl"> Instructions: </label>
                            <div className="flex items-center justify-center mt-2">
                                <Field
                                type="text"
                                name="instructions"
                                value={instruction}
                                onChange={(e: { target: { value: SetStateAction<string>; }; }) => setInstruction(e.target.value)}
                                placeholder="ex: Whisk for 5 min"
                                className="border-2 p-2 mb-2 w-full"
                                />
                                <button
                                type="button"
                                onClick={handleAddInstruction}
                                className="ml-2 bg-slate-800 text-white px-2 py-1"
                                >
                                +
                                </button>
                            </div>
                            <ul>
                                {recipeData.instructions.map((instruction, index) => (
                                <li key={index}>
                                    {index + 1}. {instruction}
                                </li>
                                ))}
                            </ul>
                            <ErrorMessage name="instructions" component="span" />
                        </div>
                        <button type = "submit" className="mt-4 px-4 py-2 text-white bg-slate-800 font-semibold hover:bg-opacity-75 transition duration-200"> Submit Recipe! </button>
                    </Form>
                </Formik>
                {createError && <p className="text-red-500 mt-2">{createError}</p>}
            </div>
        </div>
    )
}
