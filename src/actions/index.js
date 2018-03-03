import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const selectSubreddit = subreddit => ({
  type: SELECT_SUBREDDIT,
  subreddit
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

const receivePosts = (subreddit, json, state) => {
  const posts = state.postsBySubreddit[subreddit].items

  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: posts ? posts.concat(json.data.children.map(child => child.data))
                 : json.data.children.map(child => child.data),
    receivedAt: Date.now(),
    nextPage: json.data.after
  }
}

const fetchPosts = subreddit => (
  (dispatch, getState) => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then (req => req.json())
      .then (json => dispatch(receivePosts(subreddit, json, getState())))
  }
)

export const fetchNextPagePosts = (subreddit, after) => (
  (dispatch, getState) => {
    dispatch(requestPosts(subreddit))
    return fetch(`https://www.reddit.com/r/${subreddit}.json?after=${after}`)
      .then (req => req.json())
      .then (json => dispatch(receivePosts(subreddit, json, getState())))
  }
)

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts)
    return true
  else if (posts.isFetching)
    return false
  else
    return posts.didInvalidate
}

export const fetchPostsIfNeeded = (subreddit) => (
  (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit))
      return dispatch(fetchPosts(subreddit))
  }
)
