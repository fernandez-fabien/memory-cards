import React, { useState, useEffect, useRef } from 'react'
import cardsAPI from '../services/cardsAPI'
import { toast } from 'react-toastify'
import FlipCard from '../components/FlipCard'

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

        } catch (error) {
            //if (error.response.status == 401) console.log('plus co')
            toast.error("Erreur lors du chargement des cartes")
        }
    }

    const getCurrentCard = () => {
        if (cards) {
            setCard(cards[0])
        } else {
            setCard({})
        }
    }
    
    useEffect(() => {
        fetchCards(id)
    }, [id])

    useEffect(() => {
        getCurrentCard()
    }, [cards])
    
    const verifyValue = (answer) => {
        
        unstackCard()
    }

    const unstackCard = () => {
        const updatedCards = cards.slice()
        updatedCards.shift()
        setCards(updatedCards)
    }
    

    return (
        <div className="row justify-content-md-center mt-5 position-relative">
            {cards.map(c => (
                <FlipCard key={c.id} card={c} submit={verifyValue} />
            ))}
        </div>
    )
}

export default CardsChecker
