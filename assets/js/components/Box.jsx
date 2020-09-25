import React from 'react'
import { Link } from 'react-router-dom'

const Box = ({box}) => {

    return (
        <div className="card text-white bg-warning mb-3 text-center">
            <div className="card-header">{box.title}</div>
            <div className="card-body">
                <Link className="btn btn-primary" to={"/box/" + box.id + "/checker"} >Ouvrir</Link>
            </div>
        </div>
    )
}

export default Box
