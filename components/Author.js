import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'

class Author extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      author: props.author
    }
  }

  render () {
    const {author} = this.state
    return (
      <div>
        <p>{author.name}</p>
        <p><small>{author.biography}</small></p>
        <a target='_blank' href={author.website}>{author.website}</a>
      </div>
    )
  }
}

Author.propTypes = {
  author: PropTypes.object.isRequired
}

export default Author
