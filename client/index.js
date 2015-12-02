require('es6-promise').polyfill()

const React = require('react')
const { render } = require('react-dom')

const { Router, Route } = require('react-router')

const App = require('./components/app')
const Item = require('./components/item')

render((
  <Router history={ require('history/lib/createBrowserHistory')() }>
    <Route path='/' component={ App } />
    <Route path='/:id' component={ Item } />
  </Router>
), document.getElementById('app'))
