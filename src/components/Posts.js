import React from 'react'
import PropTypes from 'prop-types'

const Posts = (props) => (
  <ul>
    {props.posts.map ((post, i) => 
      <li key={i}>{i+1} - <a href={post.url}>{post.title}</a></li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
