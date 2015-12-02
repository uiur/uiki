const React = require('react')
const request = require('axios')

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      value: '',
      items: []
    }
  }

  componentDidMount () {
    this.fetch()
  }

  fetch () {
    return request.get('/api/items')
      .then((res) => {
        this.setState({ items: res.data })
      }).catch(console.error.bind(console))
  }

  createItem (data) {
    return request.post('/api/items', data)
  }

  onKeyDown (e) {
    if (e.key === 'Enter') {
      this.createItem({ body: e.target.value })
        .then((res) => {
          this.setState({ value: '' })
          return this.fetch()
        })
    }
  }

  render () {
    return (
      <main>
        <input type='text'
               autoFocus
               value={ this.state.value }
               onChange={ (e) => this.setState({ value: e.target.value }) }
               onKeyDown={ this.onKeyDown.bind(this) } />

        <ul>
          {
            this.state.items.map((item) => {
              return <li>{ item.body }</li>
            })
          }
        </ul>
      </main>
    )
  }
}

module.exports = App
