Reddit API Access
=================

Using Reddit API with React, Redux, and middleware (redux-thunk). The app will
be fetching list of submission for the following subreddit: JavaScript, ReactJS,
Python, Frontend.  This example is taken from
[here](https://redux.js.org/advanced/example-reddit-api)

Asynchronous redux is hard! I had to rewrite this app a few times to understand
how different parts gel together.

TODO:
- Understand how the heck did dispatch manage to get from store to
  AsyncApp component with only this: ```connect(mapStateToProps)(AsyncApp)```
- Still not sure how dispatching a function (instead of an action) travel from
  action creator to middleware works. 

## Demo
to build the example locally, run:

```
git clone https://github.com/geneordanza/reddit-api.git
cd reddit-api
npm install
npm start
```

In your browser, go to [`localhost:3000`]
