// @flow
import React from 'react'
import { connect } from 'react-redux'
import { actions, selectors } from 'app/store'
import type { Subreddit as _Subreddit } from 'app/types'

const handleClick = (callback) => (subreddit) => () => callback(subreddit)

const Subreddit = ({
  subreddit,
  highlight,
  onSelect
}: {
  subreddit: _Subreddit,
  highlight: boolean,
  onSelect: Function
}) => (
  <a
    className={[
      'db pa1',
      highlight ? 'primary-100' : ''
    ].join(' ')}
    onClick={handleClick(onSelect)(subreddit)}
  >
    {subreddit}
  </a>
)

const Subreddits = ({
  current,
  subreddits,
  onSelect
}: {
  current: _Subreddit,
  subreddits: Array<_Subreddit>,
  onSelect: Function
}) => (
  <div className='pa3'>
    {
      subreddits.map((subreddit) => (
        <Subreddit
          key={subreddit}
          subreddit={subreddit}
          highlight={current === subreddit}
          onSelect={onSelect}
        />
      ))
    }
  </div>
)

const getSubreddits = () => ['singapore', 'pcmasterrace', 'reactjs']

const mapStateToProps = (store) => ({
  current: selectors.posts.getSubreddit(store),
  subreddits: getSubreddits()
})

const mapDispatchToProps = (dispatch) => ({
  onSelect: (subreddit) => dispatch(actions.posts.setSubreddit(subreddit))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Subreddits)
