const moment = require('moment');
const db = require('../models');
const { Op } = require("sequelize");

let UTC = moment.utc()
const TODAY_START = moment().format('YYYY-MM-DD 00:00');
const TODAY_END = moment().format('YYYY-MM-DD 23:59:59');
const WEEK_END = moment().add(6, 'd').local().format('YYYY-MM-DD 23:59:59');

console.log(TODAY_START,' ', TODAY_END);

exports.userAccess = async (req, res) => {
    
    if (req.query.jobsForUser) { 
  
        try {
            const today = await db.Job.findAll({
                where: {
                    performerid: req.query.id,
                    expiresAt: {
                        [Op.between]: [TODAY_START, TODAY_END]
                    }
                },
                include: [{
                    model: db.User, as: "manager",
                    where: { id: {[Op.col]: 'job.creatorId'} },
                    attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                    },
                {
                    model: db.User, as: "performer",
                    where: { id: {[Op.col]: 'job.performerId'} },
                    attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                    }]
            });
            const week = await db.Job.findAll({
                where: {
                    performerid: req.query.id,
                    expiresAt: {
                        [Op.between]: [TODAY_END, WEEK_END]
                },


                },
                include: [{
                    model: db.User, as: "manager",
                    where: { id: {[Op.col]: 'job.creatorId'} },
                    attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                    },
                {
                    model: db.User, as: "performer",
                    where: { id: {[Op.col]: 'job.performerId'} },
                    attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                    }]
            });
            const greaterWeek = await db.Job.findAll({
                where: {
                    performerid: req.query.id,
                    expiresAt: {
                        [Op.gt]: WEEK_END
                    }
                },
                include: [{
                    model: db.User, as: "manager",
                    where: { id: {[Op.col]: 'job.creatorId'} },
                    attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                    },
                {
                    model: db.User, as: "performer",
                    where: { id: {[Op.col]: 'job.performerId'} },
                    attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                    }]
            });

            var output= [];
            output.push(today);
            output.push(week);
            output.push(greaterWeek);

           res.status(200).send(output);
           return true; 
        } catch (err) { res.send(err);  }
        
    } else if (req.query.jobsForEmpl) {
            try {
                const jobs = await db.Job.findAll({
                    where: {
                        [Op.and]: {creatorId: req.query.id, performerId: {[Op.ne]: req.query.id}}
                    },
                    
                    order: ['performerId','updatedAt'],

                    include: [{
                        model: db.User, as: "manager",
                        where: { id: {[Op.col]: 'job.creatorId'} },
                        attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                        },
                    {
                        model: db.User, as: "performer",
                        where: { id: {[Op.col]: 'job.performerId'} },
                        attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                        }]                       
                });
            res.status(200).send(jobs); 
            } catch (err) { res.send(err);  }
            return true;
    } else if (req.query.usersall) {
            try {
                const user = await db.User.findOne({
                    where: {id: req.query.id}, include: [{ model: db.User, attributes: ['id', 'login', 'firstName', 'middleName', 'lastName','managerId'] }]
                });
                
            res.status(200).send(user.Users); 
            return true;
            } catch (err) { res.send(err);  }

    } else if (req.query.alljobs) {
        try {
            const user = await db.Job.findAll({
                    order: [['updatedAt', 'DESC']],
                    include: [{
                        model: db.User, as: "manager",
                        where: { id: {[Op.col]: 'job.creatorId'} },
                        attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                        },
                    {
                        model: db.User, as: "performer",
                        where: { id: {[Op.col]: 'job.performerId'} },
                        attributes: ['id', 'login', 'firstName','middleName', 'lastName','managerId']
                        }]   
            });
        res.status(200).send(user); 
        return true;        
        } catch (err) { res.send(err);  }

            
    } else if (req.query.userslist) {
        try {
            const user = await db.User.findAll({
                 attributes: {
                    include: ['id', 'login', 'firstName', 'middleName', 'lastName',"managerId"],
                    exclude: ['password','createdAt', 'updatedAt']
                }, 
            });
        res.status(200).send(user); 
        return true;        
        } catch (err) { res.send(err);  }

        } else { 

            try {
            const user = await db.User.findOne({
                where: {id: req.query.id}
            });
        res.status(200).send([user]); 
        } catch (err) {
            res.send(err); 
        }
    }
        
    
};



