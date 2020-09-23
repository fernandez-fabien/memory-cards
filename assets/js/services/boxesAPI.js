import axios from 'axios'
import Cache from './cache'
import { BOXES_API } from '../config'

async function findAll() {
    const cachedBoxes = await Cache.get("boxes")

    if (cachedBoxes) return cachedBoxes

    return axios
        .get(BOXES_API)
        .then(response => {
            const boxes = response.data["hydra:member"]
            Cache.set("boxes", boxes)
            return boxes
        })
}

async function find(id) {
    const cachedBox = await Cache.get("boxes." + id)

    if (cachedBox) return cachedBox

    return axios
        .get(BOXES_API + "/" + id)
        .then(response => {
            const box = response.data
            Cache.set("boxes." + id, box)
            return box
        })
}

function deleteBox(id) {
    return axios
        .delete(BOXES_API + "/" + id)
        .then(async response => {
            const cachedBoxes = await Cache.get("boxes")

            if (cachedBoxes) {
                Cache.set("boxes", cachedBoxes.filter(c => c.id !== id))
            }
            
            return response
        })
} 

function create(box) {
    return axios
        .post(BOXES_API, box)
        .then(async response => {
            const cachedBoxes = await Cache.get("boxes")

            if (cachedBoxes) {
                Cache.set("boxes", [...cachedBoxes, response.data])
            }
            
            return response
        })
}

function update(id, box) {
    return axios
        .put(BOXES_API + "/" + id, box)
        .then(async response => {
            const cachedBoxes = await Cache.get("boxes")
            const cachedBox = await Cache.get("boxes." + id)
            
            if (cachedBoxes) {
                const index = cachedBoxes.findIndex(c => c.id === +id)
                cachedBoxes[index] = response.data
                Cache.set("boxes", cachedBoxes)
            }

            if (cachedBox) {
                Cache.set("boxes." + id, cachedBox)
            }
            
            return response
        })
}


export default {
    findAll,
    find,
    delete: deleteBox,
    create,
    update
}