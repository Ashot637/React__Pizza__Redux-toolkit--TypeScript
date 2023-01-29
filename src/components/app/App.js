import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "../../pages/MainPage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/404";


const App = () => {

    return (
        <Router>
            <main>
                <div className="container">
                    <Routes>
                        <Route path='/' element={<MainPage />} />
                        <Route path='/cart' element={<CartPage />} />
                        <Route path='*' element={<NotFound />} />
                    </Routes>
                </div>
            </main>
        </Router>
    )
}

export default App;