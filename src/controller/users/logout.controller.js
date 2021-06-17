
module.exports = async function logout(req, res, next) {
    req.session.destroy(error => {
        if (error) {
            return res.redirect('/home');
        }
        res.clearCookie(process.env.SESSION_NAME);
        // return res.redirect('/login');
        res.rawResponse = "You're disconnected";
        return next();
    });
}
