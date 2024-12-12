// handles if user is sign in

const isSignedIn = (req, res, next) => {
    if (req.session.user) return next();
   // redirect on frontend?

};

module.exports = isSignedIn