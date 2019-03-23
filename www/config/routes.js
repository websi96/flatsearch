var home = require('../app/controllers/home');

//you can include all your controllers

module.exports = function (app, passport) {

    app.get('/signup', home.signup);

    app.get('/', home.home); //home
    app.get('/me', home.loggedIn, home.me); //home
    app.get('/confirm', home.confirm);
    app.get('/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) throw err
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });
    app.get('/delete', home.delete);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/me', // redirect to the secure profile section
        failureRedirect: '/', // redirect back to the login page if there is an error
        failureFlash: true // allow flash messages
    }));

}