// handles if user is sign in

const passUserToView = (req, res, next) => {
    
   res.local.user = req.session.user ? req.session.user : null;
   next()

};

module.exports = passUserToView