require('es6-promise').polyfill()

const React = require('react')
const ReactDOM = require('react-dom')

const App = require('./components/app')

ReactDOM.render(<App/>, document.querySelector('#app'))
