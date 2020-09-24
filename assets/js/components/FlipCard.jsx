import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

const FlipCard = ({card, submit}) => {

    const [answer, setAnswer] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    const ref = useRef()

    const handleSubmit = (event) => {
        event.preventDefault()
        let value = ref.current.value.toLowerCase() == card[getOtherSide(card.face)].toLowerCase()
        setAnswer(value)
        showResult(value)
    }

    const showResult = (answer) => {
        setIsFlipped(true)
        if (answer) {
            toast.success("Bien joué")
        } else {
            toast.error("Dommage, tu feras mieux la prochaine fois")
        }
    }

    const next = () => {
        console.log(answer)
        submit(answer)
    }

    const getOtherSide = (face) => {
        return face == "recto" ? "verso" : "recto"
    }

    return (
        <div className={`card-flipper w-50 p-4 text-center ${isFlipped ? "flip-card" : ""}`}>
            <div className="flip-card-front">
                <div className="card-header">
                    <h3>{card[card.face]}</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Valeur associée :</label>
                            <input className="form-control" type="text" ref={ref} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-info btn-sm">Vérifier</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flip-card-back py-5">
                <h3>{card[getOtherSide(card.face)]}</h3>
                <button className="btn btn-info btn-sm mt-5" onClick={next}>Ranger</button>
            </div>
        </div>
    )
}

export default FlipCard
