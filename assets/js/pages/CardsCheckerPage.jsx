import React, { useState, useEffect, useRef } from 'react'
import cardsAPI from '../services/cardsAPI'
import { toast } from 'react-toastify'
import Field from '../components/forms/Field'

const CardsChecker = ({history, match}) => {
    const { id = "" } = match.params

    const [cards, setCards] = useState([])

    const [card, setCard] = useState({
        recto: "",
        verso: "",
        compartment: "",
        face: "",
        nextAt: "",
        box: ""
    })
    
    const fetchCards = async () => {
        try {
            const data = await cardsAPI.findAll(id)
            console.log(data)
            setCards(data)
            setCard(data[0])
        } catch (error) {
            //if (error.response.status == 401) console.log('plus co')
            toast.error("Erreur lors du chargement des cartes")
        }
    }
    
    useEffect(() => {
        fetchCards(id)
    }, [id])
    
    const handleSubmit = (event) => {
        event.preventDefault()
        const valueToCompare = card.face == "recto" ? "verso": "recto"
        if (card.response.toLowerCase() == card[valueToCompare].toLowerCase()) {
            console.log('oui')
        } else {
            console.log('non')
        }
    }
    
    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget
        setCard({ ...card, [name]: value })
    }
    

    return (
        <div className="row justify-content-md-center mt-5">
            {cards.map(c => (
                <div key={c.id} className="card w-50 p-4 text-center">
                        <div className="card-header">
                            <h5>{c[c.face]}</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Valeur associée :</label>
                                    <input name="response" className="form-control" type="text" onChange={handleChange} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-info btn-sm">Vérifier</button>
                                </div>
                            </form>
                        </div>
                    </div>
            ))}
        </div>
    )
}

export default CardsChecker
