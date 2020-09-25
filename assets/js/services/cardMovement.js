import moment from 'moment'

function updateCard(card, answer) {
    card.compartment = getNextCompartment(card.compartment, answer)
    card.nextAt = getNextDate(card.compartment, answer)
    card.face = getNextFace(card.face)
    return card
}

function upCompartment(compartment) {
    if (compartment < 7) {
        compartment++
    }
    return compartment
}

function downCompartment(compartment) {
    if (compartment > 1) {
        compartment--
    }
    return compartment
}

function getNextCompartment(compartment, answer) {
    if (answer) {
        return upCompartment(compartment)
    } else {
        return downCompartment(compartment)
    }
}

function getNextDate(compartment, answer) {
    switch (compartment) {
        case 1: 
            // Tous les jours 
            return moment().add(1, 'days').format('YYYY-MM-DD')
            break;
        case 2: 
            // Tous les jours pairs
            return moment().add(2, 'days').format('YYYY-MM-DD')
            break;
        case 3: 
            // Tous les semaines
            return moment().add(1, 'weeks').format('YYYY-MM-DD')
            break;
        case 4: 
            // Tous les mois
            return moment().add(1, 'months').format('YYYY-MM-DD')
            break;
        case 5: 
            // Tous les 3 mois
            return moment().add(3, 'months').format('YYYY-MM-DD')
            break;
        case 6: 
            // Tous les 6 mois
            return moment().add(6, 'months').format('YYYY-MM-DD')
            break;
        case 7: 
            // Tous les ans
            return moment().add(1, 'years').format('YYYY-MM-DD')
            break;
        default: 
            console.log('Le compartiment est :' + compartment)
    }
}

function getNextFace(face) {
    return face == "recto" ? "verso" : "recto"
}

export default {
    updateCard
}
