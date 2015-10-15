'use strict';

module.exports = {
      db: 'mongodb://localhost/janita',
	//db: 'mongodb://localhost/mean-dev',
	app: {
		title: 'JANITA - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '457476291098798',
		clientSecret: process.env.FACEBOOK_SECRET || 'a273fed4307fe575e17e155a725ffcea',
		callbackURL: 'http://local.janita.com:1485/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: 'http://localhost:3000/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: 'http://localhost:3000/auth/linkedin/callback'
	}
};
