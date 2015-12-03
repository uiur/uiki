const React = require('react')
const request = require('axios')
const Textarea = require('react-textarea-autosize')
const md = require('markdown-it')({
  linkify: true,
  typographer: true
})

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

  save () {
    this.patch(this.state.item._id, { body: this.state.value })
  }

  render () {
    return (
      <article>
        <p>{ this.props.params.id }</p>
        <div dangerouslySetInnerHTML={ { __html: md.render(this.state.item.body || '') } } />

        <Textarea style={ { width: 400 } }
                  value={ this.state.value }
                  onChange={ (e) => this.setState({ value: e.target.value }) } />
        <button onClick={ this.save.bind(this) }>Save</button>
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
