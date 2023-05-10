const db = require('../models');
const config = require('../config/auth.config');
const User = db.User;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.signin = (req, res) => {
    User.findOne({
            where: {
                login: req.body.username,
            }
        }).then(user => {
            if (!user) {
                return res.status(401).send({
                    message: 'Пользователь не найден!'
                });
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: 'Неверный пароль!'
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 }); //Токен на 24 часа в секундах

            res.status(200).send({
                id: user.id,
                login: user.login,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: token
            })
            
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || 'Произошла ошибка при получении токена!'
            });
        });
    }