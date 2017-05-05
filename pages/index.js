import React, {Component} from 'react'
import PropTypes from 'prop-types'
import get from 'lodash/get'
import marked from 'marked'
import fetch from 'isomorphic-fetch'
import Link from 'next/link'

import Author from '../components/Author'

class Home extends Component {
  static async getInitialProps () {
    const response = await fetch('http://localhost:3000/api/contentful/entry/A96usFSlY4G0W4kwAqswk')
    const payload = await response.json()

    const authorResponse = await fetch(`http://localhost:3000/api/contentful/entry/${get(payload, 'fields.author.0.sys.id')}`)
    const author = await authorResponse.json()

    return {
      title: get(payload, 'fields.title'),
      body: marked(get(payload, 'fields.body')),
      author: author.fields,
      authorId: get(payload, 'fields.author.0.sys.id')
    }
  }

  render () {
    return (
      <section>
        <h2>{this.props.title}</h2>
        <Author author={this.props.author} />
        <Link
          href={`/author?id=${this.props.authorId}`}
          as={`/author/${this.props.authorId}`}
          prefetch
        >
          <a>More about ther author</a>
        </Link>
        <article dangerouslySetInnerHTML={{ __html: this.props.body }} />
      </section>
    )
  }
}

Home.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  author: PropTypes.object,
  authorId: PropTypes.string.isRequired
}

export default Home
