import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import boxesAPI from '../services/boxesAPI'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'


const BoxesPage = (props) => {

    const [boxes, setBoxes] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    // Recupère les boxes
    const fetchBoxes = async () => {
        try {
            const data = await boxesAPI.findAll()
            setBoxes(data)
            setLoading(false)
        } catch (error) {
            toast.error("Impossible de charger les boîtes")
        }
    }

    // Au chargement du composant on va chercher les boxes
    useEffect(() => {
        fetchBoxes()
    }, [])

    // Gestion de la suppression d'un box
    const handleDelete = async id => {

        const originalBoxes = [...boxes]

        setBoxes(boxes.filter(box => box.id !== id))

        try {
            await boxesAPI.delete(id)
            toast.success("La boîte a bien été supprimée")
        } catch(error) {
            setBoxes(originalBoxes)
            toast.error("La suppression de la boîte n'a pas pu fonctionner")
        }           
    }

    // Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page)

    // Gestion de la recherche
    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value)
        setCurrentPage(1)
    }

    const itemsPerPage = 10

    // Filtrage des boxes en fonction de la recherche
    const filteredBoxes = boxes.filter(
        c => 
            c.title.toLowerCase().includes(search.toLowerCase()) || 
            c.recto.toLowerCase().includes(search.toLowerCase()) ||
            c.verso.toLowerCase().includes(search.toLowerCase()) 
    )

    // Pagination des données
    const paginatedBoxes = Pagination.getData(
        filteredBoxes, 
        currentPage, 
        itemsPerPage
    )

    return <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Liste des boîtes</h1>
            <Link className="btn btn-primary" to="/boxes/new">Créer une nouvelle boîte</Link>
        </div>

        <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
        </div>

        {!loading && (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Titre</th>
                        <th>Recto</th>
                        <th>Verso</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedBoxes.map(box => <tr key={box.id}>
                        <td>
                            <Link to={"/box/" + box.id + "/cards"} >{box.title}</Link>
                        </td>
                        <td>{box.recto}</td>
                        <td>{box.verso}</td>
                        <td>
                            <Link 
                                    className="btn btn-sm btn-primary mr-2" 
                                    to={"/boxes/" + box.id}
                                >
                                    Editer
                            </Link>
                            <button 
                                onClick={() => handleDelete(box.id)}
                                disabled={box.cards.length > 0} 
                                className="btn btn-sm btn-danger"
                            >
                                Supprimer
                            </button>
                        </td>
                    </tr>)}                
                </tbody>
            </table>
        )}
        {loading && <TableLoader />}

        {itemsPerPage < filteredBoxes.length && <Pagination 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={filteredBoxes.length} 
            onPageChanged={handlePageChange} 
        />}
    </>
}

export default BoxesPage
