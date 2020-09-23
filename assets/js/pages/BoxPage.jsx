import React, { useState, useEffect } from 'react'
import Field from '../components/forms/Field'
import { Link } from 'react-router-dom'
import boxesAPI from '../services/boxesAPI'
import { toast } from 'react-toastify'
import FormLoader from '../components/loaders/FormLoader'

const BoxPage = ({ match, history }) => {

    const { id = "new" } = match.params

    const [box, setBox] = useState({
        title: "",
        recto: "",
        verso: ""
    })

    const [errors, setErrors] = useState({
        title: "",
        recto: "",
        verso: ""
    })

    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)

    const fetchBox = async id => {
        try {
            const { title, recto, verso } = await boxesAPI.find(id)
            setBox({ title, recto, verso })
            setLoading(false)
        } catch (error) {
            toast.error("Impossible de charger la bôite demandée") 
            history.replace("/boxes")      
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setLoading(true)
            setEditing(true)
            fetchBox(id)
        }
    }, [id])

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setBox({ ...box, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            setErrors({}) 
            if(editing) {
                await boxesAPI.update(id, box)
                toast.success("La boîte a bien été modifiée")
            } else {
                await boxesAPI.create(box) 
                toast.success("La boîte a bien été créée")
                history.replace("/boxes")
            }
        } catch ({ response }) {
            const { violations } = response.data

            if (violations) {
                const apiErrors = {}
                violations.forEach(({ propertyPath, message}) => {
                    apiErrors[propertyPath] = message
                })
                setErrors(apiErrors)  
            }
            toast.error("Des erreurs dans votre formulaire") 
        }
    }

    return (
        <>
            {!editing && <h1>Création d'une boîte</h1> || <h1>Modification de la boîte</h1>}
            {loading && <FormLoader />}

            {!loading && (
                <form onSubmit={handleSubmit}>
                    <Field 
                        name="title" 
                        label="Titre" 
                        placeholder="Titre de la boîte" 
                        value={box.title} 
                        onChange={handleChange}
                        error={errors.title}
                        />
                    <Field 
                        name="recto" 
                        label="Recto" 
                        placeholder="Sujet des rectos" 
                        value={box.recto} 
                        onChange={handleChange}
                        error={errors.recto}
                        />
                    <Field 
                        name="verso" 
                        label="Verso" 
                        placeholder="Sujet des versos" 
                        value={box.verso}  
                        onChange={handleChange}
                        error={errors.verso}
                        />

                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Enregister</button>
                        <Link to="/boxes" className="btn btn-link">Retour à la liste</Link>
                    </div>
                </form>
            )}
        </>
    )
}

export default BoxPage
