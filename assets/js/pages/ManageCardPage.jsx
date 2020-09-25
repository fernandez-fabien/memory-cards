import moment from 'moment'
import React, { useState, useEffect } from 'react'
import Field from '../components/forms/Field'
import { Link } from 'react-router-dom'
import Select from '../components/forms/Select'
import boxesAPI from '../services/boxesAPI'
import cardsAPI from '../services/cardsAPI'
import { toast } from 'react-toastify'
import FormLoader from '../components/loaders/FormLoader'

const ManageCardPage = ({ match, history }) => {

    const { id = "new" } = match.params
    
    const [card, setCard] = useState({
        recto: "",
        verso: "",
        compartment: 1,
        face: "recto",
        nextAt: moment().add(1, 'days').format('YYYY-MM-DD'),
        box: ""
    })
    
    const [boxes, setBoxes] = useState([])
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(true)

    const [errors, setErrors] = useState({
        recto: "",
        verso: "",
        compartment: "",
        face: "",
        nextAt: "",
        box: ""
    })

    const fetchBoxes = async () => {
        try {
            const data =  await boxesAPI.findAll()
            setBoxes(data)
            setLoading(false)
            
            if (!card.box) {
                let boxId = history.location.hash ? history.location.hash.substring(1) : data[0].id
                let index = data.filter(box => box.id == boxId)
                let boxRecto = index ? index[0].recto : data[0].recto
                let boxVerso = index ? index[0].verso : data[0].verso
                setCard(card => ({...card, box: boxId, boxRecto: boxRecto, boxVerso: boxVerso}))
            }
        } catch (error) {
            toast.error("Impossible de charger les boîtes")
            history.goBack() 
        }
    }

    const fetchCard = async id => {
        try {
            const { recto, verso, face, compartment, nextAt, box } = await cardsAPI.find(id)
            setCard({ recto, verso, face, compartment, nextAt, box: box.id, boxRecto: box.recto, boxVerso: box.verso })
            setLoading(false)
        } catch (error) {
            toast.error("Impossible de charger la carte demandée")
            history.goBack()     
        }
    }

    useEffect(() => {
        fetchBoxes()
    }, [])

    useEffect(() => {
        if (id !== "new") {
            setEditing(true)
            fetchCard(id)
        }
    }, [id])

    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setCard({ ...card, [name]: value })
    }

    const handleSubmit = async event => {
        event.preventDefault()

        try {
            setErrors({}) 
            if(editing) {
                await cardsAPI.update(id, card)
                toast.success("La carte a bien été modifiée")
            } else {
                await cardsAPI.create(card) 
                toast.success("La carte a bien été créée")
                history.goBack() 
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
            {editing && <h1>Modification d'une carte</h1> || <h1>Création d'une carte</h1>}
            {loading && <FormLoader />}

            {!loading && (
                <form onSubmit={handleSubmit}>
                    <Field 
                        name="recto" 
                        label={card.boxRecto}
                        placeholder="Valeur recto de la carte"
                        value={card.recto} 
                        onChange={handleChange}
                        error={errors.recto}
                    />

                    <Field 
                        name="verso" 
                        label={card.boxVerso}
                        placeholder="Valeur verso de la carte"
                        value={card.verso} 
                        onChange={handleChange}
                        error={errors.verso}
                    />

                    <Field 
                        name="compartment" 
                        type="hidden"
                        label={card.compartment}
                        value={card.compartment} 
                        onChange={handleChange}
                        error={errors.compartment}
                    />

                    <Field 
                        name="face" 
                        type="hidden"
                        label={card.face}
                        value={card.face} 
                        onChange={handleChange}
                        error={errors.face}
                    />

                    <Field 
                        name="nextAt" 
                        type="hidden"
                        label={card.nextAt}
                        value={formatDate(card.nextAt)} 
                        onChange={handleChange}
                        error={errors.nextAt}
                    />

                    <Select 
                        name="box" 
                        label="Boîte" 
                        value={card.box} 
                        onChange={handleChange}
                        error={errors.box}
                    >
                        {boxes.map(box => (
                            <option key={box.id} value={box.id}>
                                {box.title}
                            </option>
                        ))}
                    </Select>

                    <div className="form-group">
                        <button type="submit" className="btn btn-success">Enregister</button>
                        <Link to={"/box/"+ card.box +"/cards"} className="btn btn-link">Retour à la liste de boîtes</Link>
                    </div>
                </form>
            )}
        </>
    )
}

export default ManageCardPage
