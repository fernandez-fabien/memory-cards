import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import boxesAPI from '../services/boxesAPI'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'
import Box from '../components/Box'


const BoxesChoicePage = (props) => {

    const [boxes, setBoxes] = useState([])
    const [search, setSearch] = useState("")

    // Recupère les boxes
    const fetchBoxes = async () => {
        try {
            const data = await boxesAPI.findAll()
            setBoxes(data)
        } catch (error) {
            toast.error("Impossible de charger les boîtes")
        }
    }

    // Au chargement du composant on va chercher les boxes
    useEffect(() => {
        fetchBoxes()
    }, [])

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
    }

    // Filtrage des boxes en fonction de la recherche
    const filteredBoxes = boxes.filter(
        c => 
            c.title.toLowerCase().includes(search.toLowerCase())
    )

    return <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Mes boîtes</h1>
        </div>

        <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
        </div>

        <div className="container">
            <div className="row justify-content-md-center">
                {filteredBoxes.map(box => (
                    <div key={box.id} className="col col-lg-4">
                        <Box box={box} />
                    </div>
                ))}                
            </div>
        </div>
    </>
}

export default BoxesChoicePage