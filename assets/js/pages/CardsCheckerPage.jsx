import React, { useState, useEffect, useRef } from 'react'
import cardsAPI from '../services/cardsAPI'
import { toast } from 'react-toastify'
import FlipCard from '../components/FlipCard'
import cardMovement from '../services/cardMovement'
import { Link } from 'react-router-dom'

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
            const data = await cardsAPI.findCardsToTreat(id)
            console.log(data)
            setCards(data)

        } catch (error) {
            //if (error.response.status == 401) console.log('plus co')
            toast.error("Erreur lors du chargement des cartes")
        }
    }

    const getCurrentCard = () => {
        if (cards) {
            setCard({...cards[0], box: +id})
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
    
    const storeCard = (answer) => {
        let updateCard = cardMovement.updateCard(card, answer)
        cardsAPI.update(updateCard.id, updateCard)
        unstackCard()
    }

    const unstackCard = () => {
        const updatedCards = cards.slice()
        updatedCards.shift()
        setCards(updatedCards)
    }

    const displayCards = () => {
        if (cards.length > 0) {
            return cards.map(c => (
                <FlipCard key={c.id} card={c} submit={storeCard} />
            ))
        } else {
            return <p>Il n'y a pas de cartes à traiter</p>
        }
    }
    

    return (
        <>
            <div className="row justify-content-md-center mt-5 position-relative">
                {displayCards()}
            </div>
            <p className="mt-5 text-center">
                <Link to="/box/selector">Retour aux boîtes</Link>
            </p>
        </>
    )
}

export default CardsChecker
