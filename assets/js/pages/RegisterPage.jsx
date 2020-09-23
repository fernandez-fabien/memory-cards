import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Field from '../components/forms/Field'
import usersAPI from '../services/usersAPI'
import { toast } from 'react-toastify'

const RegisterPage = ({ history }) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const apiErros = {}
        if (user.password !== user.passwordConfirm) {
            apiErros.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original"
            setErrors(apiErros)
            toast.error("Des erreurs dans votre formulaire")
            return
        }

        try {
            await usersAPI.register(user)
            // TODO flash message
            setErrors({})
            toast.success("Vous êtes désomrais inscrit, vous pouvez vous connecter")
            history.replace("/login")
        } catch (error) {
            const {violations} = error.response.data

            if (violations) {
                violations.forEach(({propertyPath, message}) => {
                    apiErros[propertyPath] = message
                })
                setErrors(apiErros)
            }
            toast.error("Des erreurs dans votre formulaire")
        }
    }

    return (
        <>
            <h1>Inscription</h1>

            <form onSubmit={handleSubmit}>
                <Field 
                    name="firstName"
                    label="Prénom"
                    error={errors.firstName}
                    value={user.firstName}
                    onChange={handleChange}
                />
                <Field 
                    name="lastName"
                    label="Nom de famille"
                    error={errors.lastName}
                    value={user.lastName}
                    onChange={handleChange}
                />
                <Field 
                    name="email"
                    label="Adresse email"
                    type="email"
                    error={errors.email}
                    value={user.email}
                    onChange={handleChange}
                />
                <Field 
                    name="password"
                    label="Mot de passe"
                    type="password"
                    error={errors.password}
                    value={user.password}
                    onChange={handleChange}
                />
                <Field 
                    name="passwordConfirm"
                    label="Confirmation de mot de passe"
                    type="password"
                    error={errors.passwordConfirm}
                    value={user.passwordConfirm}
                    onChange={handleChange}
                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Confirmation</button>
                    <Link to="/login" className="btn btn-link">J'ai déjà un compte</Link>
                </div>
            </form>
        </>
    )
}

export default RegisterPage
