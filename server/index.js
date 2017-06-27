const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')

require('dotenv').config()

const TwitterStrategy = require('passport-twitter').Strategy
const app = express()

app.use(
  session({
    secret: process.env.APPLICATION_SECRET,
    resave: true,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'uiIsIinSjOU6PS4IbChcGGImX',
      consumerSecret: 'lClB24MZPsDPKqePjXdCgFRHfaCrh7xLguDV6NBHe3lNjfgsey',
      callbackURL: 'http://localhost:8080/auth/twitter/callback'
    },
    (token, tokenSecret, profile, done) => {
      done(null, {
        username: profile.username,
        displayName: profile.displayName,
        photos: profile.photos
      })
    }
  )
)

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    status: 'My API is alive!'
  })
})

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

app.listen(8080, () => {
  console.log('API is running...')
})

module.exports = app
