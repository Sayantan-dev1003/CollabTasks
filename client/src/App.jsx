import React from 'react'
import { Route, Routes } from "react-router-dom";
import Signup from './Pages/Signup'
import Signin from './Pages/Signin';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    )
}

export default App