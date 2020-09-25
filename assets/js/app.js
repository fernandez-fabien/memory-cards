import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { HashRouter, Route, Switch, withRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/app.scss';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './contexts/AuthContext';
import ManageBoxPage from './pages/ManageBoxPage';
import ManageCardPage from './pages/ManageCardPage';
import ManageBoxesPage from './pages/ManageBoxesPage';
import HomePage from './pages/HomePage';
import ManageCardsPage from './pages/ManageCardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import authAPI from './services/authAPI';
import CardsCheckerPage from './pages/CardsCheckerPage';
import BoxesChoicePage from './pages/BoxesChoicePage';


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
                        <PrivateRoute path="/box/selector" component={BoxesChoicePage} />
                        <PrivateRoute path="/box/:id/checker" component={CardsCheckerPage} />
                        <PrivateRoute path="/boxes/:id" component={ManageBoxPage} />
                        <PrivateRoute path="/cards/:id" component={ManageCardPage} />
                        <PrivateRoute path="/boxes" component={ManageBoxesPage} />
                        <PrivateRoute path="/box/:id/cards" component={ManageCardsPage} />
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