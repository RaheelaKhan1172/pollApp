var passport = require('passport'),
  url = require('url'),
  FacebookStrategy = require('passport-facebook').Strategy,
  users = require('../../app/controllers/users.server.controller');

module.exports = function() {
  passport.use(new FacebookStrategy({
    clientID: '1560368560952345',
    clientSecret: 'decccd92b650877a8117c6f4457f453c',
    callbackURL: 'http://localhost:3030/oauth/facebook/callback',
    passReqToCallback: true
  }, 
  function(req, accessToken, refreshToken, profile, done) {
    var providerData = profile._json;
    providerData.accessToken = accessToken;
    providerData.refreshToken = refreshToken;
    console.log('profile inside facebook strategy', profile);
    var providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      fullName: profile.displayName,
      username: profile.username,
      provider: 'facebook',
      providerId: profile.id,
      providerData: providerData
    }; 
    users.saveOAuthUserProfile(req, providerUserProfile,done);
  })); 
};
