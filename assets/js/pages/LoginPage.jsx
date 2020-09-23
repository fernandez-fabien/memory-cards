import React, { useContext, useState } from 'react'
import AuthContext from '../contexts/AuthContext'
import authAPI from '../services/authAPI'
import Field from '../components/forms/Field'
import { toast } from 'react-toastify'

const LoginPage = ({ history }) => {

    const { setIsAuthenticated } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [error, setError] = useState("")

    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget
        setCredentials({...credentials, [name]: value})
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await authAPI.authentificate(credentials) 
            setError("") 
            setIsAuthenticated(true)
            toast.success("Vous êtes désormais connecté !")
            history.replace("/customers")
        } catch (error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas")          
            toast.error("Une erreur est survenue")
        }
    }

    return (<> 
        <h1>Connexion à l'application</h1>

        <form onSubmit={handleSubmit}>
            <Field 
                name="username"
                label="Adresse email"
                type="email"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Adresse email de connexion"
                error={error}
            />
            <Field
                name="password"
                label="Mot de passe"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                error={error}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-success">Connexion</button>
            </div>
        </form>
    </> )
}

export default LoginPage
