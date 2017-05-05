import React, {PureComponent} from 'react'
import fetch from 'isomorphic-fetch'
import PropTypes from 'prop-types'

import Author from '../components/Author'

class AuthorDetails extends PureComponent {
  static async getInitialProps ({query}) {
    const response = await fetch(`http://localhost:3000/api/contentful/entry/${query.id}`)
    const author = await response.json()

    return {
      author: author.fields
    }
  }

  render () {
    return (
      <Author author={this.props.author} />
    )
  }
}

AuthorDetails.propTypes = {
  author: PropTypes.object
}

export default AuthorDetails
