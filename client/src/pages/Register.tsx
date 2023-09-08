import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react";

interface User {
    username: string;
    password: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

export function Register() {

    let navigate = useNavigate()

    const initialValues : User = {
        username: "",
        password: "",
    }

    const [registerError, setRegisterError] = useState("");

    const onSubmitA = (data: User) => {
        axios.post(`${apiUrl}/auth/`, data)
            .then((response) => {
                navigate("/");
            })
            .catch((error) => {

                if (error.response) {
                    setRegisterError("An error just occurred during registration.");
                }
            });
    };

    const validationSchemaA = Yup.object().shape({
        username: Yup.string().required("Username is required"),
        password: Yup.string().required("Password is required"),
        
    })

    return (
        <div className="register-page h-full w-screen flex flex-col items-center justify-center font-oswald">
            <div className='register-header w-full bg-slate-700 flex justify-start text-center'>
                <div className='register-text-container mt-36 mb-4 ml-32'>
                    <h1 className='text-6xl text-white'>
                        REGISTER
                    </h1>
                </div>
            </div>
            <div className="register-container w-1/3 my-16 p-8 text-center border-4 border-slate-800">
                <Formik initialValues = {initialValues} onSubmit = {onSubmitA} validationSchema = {validationSchemaA}>
                    <Form className="formContainer flex flex-col">
                        <label className="text-3xl mb-2"> Username: </label>
                        <ErrorMessage name = "username" component="span"/>
                        <Field id="inputRegister" name="username" className="border-2 p-2 mb-4"/>

                        <label className="text-3xl mb-2"> Password: </label>
                        <ErrorMessage name = "password" component="span"/>
                        <Field id="inputRegister" name="password" type="password" className="border-2 p-2 mb-4"/>

                        <button type = "submit" className="mt-4 px-4 py-2 text-white bg-slate-800 font-semibold hover:bg-opacity-75 transition duration-200"> Register! </button>
                    </Form>
                </Formik>
                {registerError && <p className="text-red-500 mt-2">{registerError}</p>}
            </div>
        </div>
    )
}
