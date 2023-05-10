const db = require('../models');

exports.UserCreate = async (req, res) => {
    //console.log("POST IS GOING");
    const job = {
    title: req.body.title,
    description: req.body.description,
    priority: req.body.priority,
    status: req.body.status,
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: req.body.creatorId,
    performerId: req.body.performerId,
    expiresAt: req.body.expiresAt,
   }

   db.Job.create(job).then(data => {res.send(data);}).catch(err => { res.status(500).send({message: err.message || "Ошибка при создании записи"}); });

};