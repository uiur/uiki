require('es6-promise').polyfill()

const React = require('react')
const { render } = require('react-dom')

const { Router, Route } = require('react-router')
const { createHistory } = require('history')

const App = require('./components/app')

render((
  <Router history={ createHistory({ queryKey: false }) }>
    <Route path='/' component={ App } />
  </Router>
), document.querySelector('#app'))
