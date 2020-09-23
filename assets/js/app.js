import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/app.scss';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import BoxPage from './pages/BoxPage';
import CardPage from './pages/CardPage';
import BoxesPage from './pages/BoxesPage';
import HomePage from './pages/HomePage';
import CardsPage from './pages/CardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import authAPI from './services/authAPI';
import CardsChecker from './pages/CardsCheckerPage';


let defaultAuthentificationState = authAPI.setup();

const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthentificationState)

    const NavbarWithRouter = withRouter(Navbar)

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            <HashRouter>
                <NavbarWithRouter />

                <main className="container pt-5">
                    <Switch>
                        <Route path="/login" component={LoginPage} />
                        <Route path="/register" component={RegisterPage} />
                        <PrivateRoute path="/box/:id" component={CardsChecker} />
                        <PrivateRoute path="/boxes/:id" component={BoxPage} />
                        <PrivateRoute path="/cards/:id" component={CardPage} />
                        <PrivateRoute path="/boxes" component={BoxesPage} />
                        <PrivateRoute path="/box/:id/cards" component={CardsPage} />
                        <Route path="/" component={HomePage} />
                    </Switch>
                </main>
            </HashRouter>
            <ToastContainer  position={toast.POSITION.BOTTOM_LEFT} />
        </AuthContext.Provider>
    )
}

const rootElement = document.querySelector('#app')
ReactDom.render(<App />, rootElement)