import { HashRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "../../pages/MainPage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/404";
import AppHeader from "../appHeader/AppHeader";
import DrinksPage from "../../pages/DrinksPage";
import SaladsPage from "../../pages/SaladsPage";


const App = () => {
    return (
        <Router>
            <main>
                <div className="container">
                    <AppHeader />
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/drinks' element={<DrinksPage />} />
                        <Route path='/salads' element={<SaladsPage />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </main>
        </Router>
    )
}

export default App;