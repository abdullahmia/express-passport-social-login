const router = require('express').Router();
const passport = require('passport');
require('../config/authGoogleConfig');

// localhost:8000/auth/google
router.route('/')
    .get(passport.authenticate("google", { scope: ['profile', 'email'] }));


// localhost:8000/auth/google/redirect
router.route('/redirect')
    .get(passport.authenticate("google", { session: false }), (req, res) => {
        return res.send(req.user);
    })

module.exports = router;