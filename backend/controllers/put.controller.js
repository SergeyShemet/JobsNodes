const db = require('../models');

exports.UserUpdate = async (req, res) => {
    //console.log("PUT IS GOING");
    const id = req.params.id;
    
    db.Job.update(req.body,  { where: { id: id }})
    .then(data => {if (data == 1) {res.send({message: "Запись успешно обновлена"});
} else {
    res.send({message: "Ошибка при обновлении записи"})}});
    
    
};