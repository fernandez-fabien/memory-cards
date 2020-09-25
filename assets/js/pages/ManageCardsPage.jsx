import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Pagination from '../components/Pagination'
import cardsAPI from '../services/cardsAPI'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TableLoader from '../components/loaders/TableLoader'

const STATUS_CLASSES = {
    PAID: "success",
    SENT: "info",
    CANCELLED: "danger"
}

const STATUS_LABELS = {
    PAID: "Payée",
    SENT: "Envoyée",
    CANCELLED: "Annulée"
}

const ManageCardsPage = ({ match, history }) => {

    const { id = "new" } = match.params

    const [cards, setCards] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    const [loading, setLoading] = useState(true)

    // Recupère les cards
    const fetchCards = async () => {
        try {
            const data = await cardsAPI.findAll(id)
            console.log(data)
            setCards(data)
            setLoading(false)
        } catch (error) {
            if (error.response.status == 401) console.log('plus co')
            toast.error("Erreur lors du chargement des cartes")
        }
    }

    // Au chargement du composant on va chercher les cards
    useEffect(() => {
        fetchCards()
    }, [])

    const formatDate = (str) => moment(str).format('DD/MM/YYYY')

    // Gestion de la suppression d'une cards
    const handleDelete = async cardId => {

        const originalCards = [...cards]

        setCards(cards.filter(card => card.id !== cardId))

        try {
            await cardsAPI.delete(cardId, id)
            toast.success("La carte a bien été supprimée")
        } catch(error) {
            toast.error("Une erreur est survenue")
            setCards(originalCards)
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

    // Filtrage des cards en fonction de la recherche
    const filteredCards = cards.filter(
        c => 
            c.recto.toLowerCase().includes(search.toLowerCase()) || 
            c.verso.toLowerCase().includes(search.toLowerCase())
    )

    // Pagination des données
    const paginatedCards = Pagination.getData(
        filteredCards, 
        currentPage, 
        itemsPerPage
    )

    return <>
        <div className="mb-3 d-flex justify-content-between align-items-center">
            <h1>Liste des cartes</h1>
            <Link className="btn btn-primary" to={{pathname: "/cards/new", hash: id}}>Créer une nouvelle carte</Link>
        </div>

        <div className="form-group">
            <input type="text" onChange={handleSearch} value={search} className="form-control" placeholder="Rechercher..."/>
        </div>

        {!loading &&  (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Recto</th>
                        <th>Verso</th>
                        <th className="text-center">Prochaine interro</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCards.map(card => <tr key={card.id}>
                        <td>{card.recto}</td>
                        <td>{card.verso}</td>
                        <td className="text-center">{formatDate(card.nextAt)}</td>
                        <td>
                            <Link 
                                className="btn btn-sm btn-primary mr-2"
                                to={"/cards/" + card.id}
                            >
                                Editer
                            </Link>
                            <button 
                                onClick={() => handleDelete(card.id)}
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

        {itemsPerPage < filteredCards.length && <Pagination 
            currentPage={currentPage} 
            itemsPerPage={itemsPerPage} 
            length={filteredCards.length} 
            onPageChanged={handlePageChange} 
        />}
    </>
}

export default ManageCardsPage
