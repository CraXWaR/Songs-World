const { validateToken } = require("../services/user");

const authMiddleware = (req, res, next) => {
    const cookie = req.cookies?.auth;
    if(cookie != 'none' && cookie != undefined){
        try {
            const user = validateToken(cookie);
            req.user = {
                '_id': user._id,
                'username': user.username,
                'email': user.email,
                cookie
            }
        } catch (error) {
            res.json(error);
            console.log(error);
        }
    }else {
        req.user = {
            cookie: 'none'
        }
    }
    next();
}

module.exports = {
    authMiddleware,
}