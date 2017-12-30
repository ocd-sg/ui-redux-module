// @flow
import React from 'react'

import Subreddits from '../Subreddits'
import Posts from '../Posts'

const styles = {
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr',
    gridTemplateColumns: '1fr 3fr',
    alignItem: 'stretch',
    justifyItems: 'stretch'
  },
  subreddits: {
    gridColumn: '1 / 2'
  },
  posts: {
    gridColumn: '2 / 3'
  }
}

const Module = () => (
  <div className='w-100 h-100' style={styles.wrapper}>
    <div className='br b--background-80 flex flex-column flex-auto' style={styles.subreddits}>
      <Subreddits />
    </div>
    <div className='flex flex-column flex-auto' style={styles.posts}>
      <Posts />
    </div>
  </div>
)

export default Module
