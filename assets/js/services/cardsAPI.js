import axios from 'axios'
import Cache from './cache'
import { CARDS_API, BOXES_API } from '../config'

async function findAll(id) {
    const cachedCards = await Cache.get(`box.${id}.cards`)

    if (cachedCards) return cachedCards

    return axios
        .get(BOXES_API + "/" + id + "/cards")
        .then(response => {
            const cards = response.data["hydra:member"]
            Cache.set(`box.${id}.cards`, cards)
            return cards
        })
}

async function find(id) {
    const cachedCard = await Cache.get("cards." + id)

    if (cachedCard) return cachedCard

    return axios
        .get(CARDS_API + "/" + id)
        .then(response => {
            const card = response.data
            Cache.set("cards." + id, card)
            return card
        })
}

function deleteCard(id, boxId) {
    return axios
        .delete(CARDS_API + "/" + id)
        .then(async response => {
            const cachedCards = await Cache.get(`box.${boxId}.cards`)

            if (cachedCards) {
                Cache.set(`box.${boxId}.cards`, cachedCards.filter(c => c.id !== id))
            }
            
            return response
        })
} 

function create(card) {
    return axios
        .post(CARDS_API, { 
            ...card,
            box: `/api/boxes/${card.box}`
        })
        .then(async response => {
            const cachedCards = await Cache.get(`box.${card.box}.cards`)

            if (cachedCards) {
                Cache.set(`box.${card.box}.cards`, [...cachedCards, response.data])
            }
            
            return response
        })
}

function update(id, card) {
    return axios
        .put(CARDS_API + "/" + id, { 
            ...card,
            box: `/api/boxes/${card.box}`
        })
        .then(async response => {
            const cachedCards = await Cache.get(`box.${card.box}.cards`)
            const cachedCard = await Cache.get("cards." + id)
            
            if (cachedCards) {
                const index = cachedCards.findIndex(c => c.id === +id)
                cachedCards[index] = response.data
                Cache.set(`box.${card.box}.cards`, cachedCards)
            }

            if (cachedCard) {
                Cache.set("cards." + id, cachedCard)
            }
            
            return response
        })
}


export default {
    findAll,
    find,
    delete: deleteCard,
    create,
    update
}