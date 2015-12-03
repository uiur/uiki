const React = require('react')
const request = require('axios')
const Textarea = require('react-textarea-autosize')
const md = require('markdown-it')({
  linkify: true,
  typographer: true,
  breaks: true
})
md.use(require('markdown-it-emoji'))

class Item extends React.Component {
  constructor () {
    super()

    this.state = {
      item: {},
      value: '',
      name: null
    }
  }

  componentDidMount () {
    this.fetch(this.props.params.id)
  }

  fetch (id) {
    return request.get(`/api/items/${id}`)
      .then(({ data }) => {
        this.setState({ item: data, value: data.body, name: data.name })
      })
  }

  patch (id, data) {
    return request.patch(`/api/items/${id}`, data)
      .then(({ data }) => {
        this.setState({ item: data, value: data.body, name: data.name })
      })
  }

  save () {
    this.patch(this.state.item._id, {
      name: this.state.name || undefined,
      body: this.state.value
    })
  }

  render () {
    const { item } = this.state

    return (
      <article>
        {
          item.name &&
            <a href={ `/${item.name}` }>{ item.name }</a>
        }

        <div dangerouslySetInnerHTML={ { __html: md.render(this.state.item.body || '') } } />

        <input type='text'
               value={ this.state.name }
               onChange={ (e) => this.setState({ name: e.target.value }) }/>

        <div>
          <Textarea style={ { width: 400 } }
                    value={ this.state.value }
                    onChange={ (e) => this.setState({ value: e.target.value }) } />
          <button onClick={ this.save.bind(this) }>Save</button>

        </div>
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
