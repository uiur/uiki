const React = require('react')
const request = require('axios')

class Item extends React.Component {
  constructor () {
    super()

    this.state = {
      item: {},
      value: ''
    }
  }

  componentDidMount () {
    this.fetch(this.props.params.id)
  }

  fetch (id) {
    return request.get(`/api/items/${id}`)
      .then(({ data }) => {
        this.setState({ item: data, value: data.body })
      })
  }

  patch (id, data) {
    return request.patch(`/api/items/${id}`, data)
      .then(({ data }) => {
        this.setState({ item: data, value: data.body })
      })
  }

  onKeyDown (e) {
    if (e.key === 'Enter') {
      this.patch(this.state.item._id, { body: e.target.value })
      return
    }
  }

  render () {
    return (
      <article>
        <p>{ this.props.params.id }</p>
        <p>{ this.state.item.body }</p>
        <input type='text'
               value={ this.state.value }
               onChange={ (e) => this.setState({ value: e.target.value }) }
               onKeyDown={ this.onKeyDown.bind(this) } />
      </article>
    )
  }
}

Item.propTypes = {
  params: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired
  }).isRequired
}

module.exports = Item
