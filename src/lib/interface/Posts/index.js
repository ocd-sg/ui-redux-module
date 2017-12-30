// @flow
import React from 'react'
import { connect } from 'react-redux'
import { selectors } from 'app/store'
import type { Post as _Post, Posts as _Posts } from 'app/types'

const Post = ({ post }: {post: _Post}) => (
  <li className='pb2'>
    <div className='f7 ttu fw6 text-normal-80'>{post.author}</div>
    <div className='f4 fw4'>{post.title}</div>
  </li>
)

const Posts = ({ posts }: {posts: _Posts}) => (
  <ul>
    {
      posts.map((post) => (
        <Post key={post.id} post={post} />
      ))
    }
  </ul>
)

const mapStateToProps = (store) => ({
  posts: selectors.posts.getPosts(store)
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)
