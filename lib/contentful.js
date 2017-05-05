const createClient = require('contentful').createClient
const contentfulConfig = require('../contentful.json')

module.exports = createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: contentfulConfig.space,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: contentfulConfig.accessToken
})
