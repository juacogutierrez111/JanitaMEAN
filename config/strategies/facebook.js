'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
    url = require('url'),
    FacebookStrategy = require('passport-facebook').Strategy,
    config = require('../config'),
    users = require('../../app/controllers/users');

module.exports = function () {
    // Use facebook strategy
    passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callbackURL,
        passReqToCallback: true,
        profileFields: ['id', 'displayName', 'emails', 'name', 'gender', 'picture', 'age_range', 'locale', 'verified']

    },
		function (req, accessToken, refreshToken, profile, done) {
        // Set the provider data and include tokens
        var providerData = profile._json;
        providerData.accessToken = accessToken;
        providerData.refreshToken = refreshToken;
        
        
        if (typeof profile.name === 'undefined') {
            profile.name.givenName = 'undefined';
            profile.name.familyName = 'undefined';
        }        ;
        
        if (typeof profile.displayName === 'undefined') {
            profile.displayName = 'undefined';
        }
        
        if (typeof profile.emails === 'undefined') {
                profile.emails = 'undefined';
            }
        
        if (typeof profile.username === 'undefined') {
            profile.username = 'undefined';
        }
        
        // Create the user OAuth profile
        var providerUserProfile = {
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            providerIdentifierField: 'id',
            providerData: providerData
        };
        
        // Save the user OAuth profile
        users.saveOAuthUserProfile(req, providerUserProfile, done);
    }
    ));
};