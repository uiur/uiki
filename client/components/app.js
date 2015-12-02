const React = require('react')
const request = require('axios')

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      items: []
    }
  }

  componentDidMount () {
    request.get('/api/items')
      .then((res) => {
        this.setState({ items: res.data })
      }).catch(console.error.bind(console))
  }

  render () {
    return (
      <ul>
        {
          this.state.items.map((item) => {
            return <li>{ item.body }</li>
          })
        }
      </ul>
    )
  }
}

module.exports = App
