const React = require('react')
const request = require('axios')

class Item extends React.Component {
  constructor () {
    super()

    this.state = {
      item: {}
    }
  }

  componentDidMount () {
    this.fetch(this.props.params.id)
  }

  fetch (id) {
    return request.get(`/api/items/${id}`)
      .then(({ data }) => {
        this.setState({ item: data })
      })
  }

  render () {
    return (
      <article>
        <p>{ this.props.params.id }</p>
        <p>{ this.state.item.body }</p>
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
