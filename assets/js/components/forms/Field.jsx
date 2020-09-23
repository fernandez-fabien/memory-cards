import React from 'react'

const Field = ({ 
    name, 
    label, 
    value, 
    onChange, 
    placeholder = label, 
    type = "text", 
    error = "" 
}) => ( 
    <div className="form-group">
        {type !== "hidden" && <label htmlFor={name}>{label}</label>}
        <input 
            value={value} 
            onChange={onChange}
            type={type} 
            placeholder={placeholder} 
            id={name} 
            name={name} 
            className={"form-control" + (error && " is-invalid") }
        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
)

export default Field
