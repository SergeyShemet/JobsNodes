const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');
const postController = require('../controllers/post.controller');
const putController = require('../controllers/put.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept");            //var cookie = req.headers.cookie;
        next();
    });

    app.get('/api/user', [authJwt.verifyToken], controller.userAccess);

    app.post('/api/post', [authJwt.verifyToken], postController.UserCreate);

    app.put('/api/post/:id', [authJwt.verifyToken], putController.UserUpdate);
}