const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const { User } = require('../models/user');
const _ = require('lodash')


const strategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/redirect"
}, async (accessToken, refreshToken, profile, cb) => {
    const { id } = profile;
    const { name, email } = profile._json;

    let user = await User.findOne({googleId: id, email: email});
    if (user) {
        // console.log('User Exist!', user);
        const token = user.genarateJWT();
        const response = {
            user: _.pick(user, ['email', 'name', "_id"]),
            token: token
        }
        cb(null, response);
    } else {
        user = new User({name, googleId: id, email: email })
        await user.save();
        const token = user.genarateJWT();
        // console.log("NEW user: ", user);
        const response = {
            user: _.pick(user, ['email', 'name', "_id"]),
            token: token
        }
        cb(null, response);
    }

});


passport.use(strategy);