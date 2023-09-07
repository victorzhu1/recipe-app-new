import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import { Home } from './pages/Home';
import { Recipes } from './pages/Recipes';
import { SingleRecipe } from './pages/SingleRecipe';
import { Create } from './pages/Create';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './pages/ProtectedRoute';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/recipe/:recipeId" element={<SingleRecipe />} />
        <Route path='/recipes' element={<Recipes />} />
        <Route path="/create" element={<ProtectedRoute component={Create} />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
