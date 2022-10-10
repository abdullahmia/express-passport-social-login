const authGoogleRoutes = require('../routes/authGooleRoutes');

module.exports = (app) => {
    app.use('/auth/google', authGoogleRoutes);
}