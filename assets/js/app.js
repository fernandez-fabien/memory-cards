import React from 'react'
import ReactDOM from 'react-dom'

// any CSS you import will output into a single css file (app.css in this case)
import '../css/app.css';

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

const App = () => {
    return <h1>Memory cards</h1>
}

const rootElement = document.querySelector('#app')
ReactDOM.render(<App />, rootElement)
