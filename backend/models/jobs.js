module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define("Job", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true },
        title: {
            type: DataTypes.STRING,
            allowNull: false},
        description: {
            type: DataTypes.STRING(500),
            allowNull: false},
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1},
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0},
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false},
        creatorId: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        performerId: {
            type: DataTypes.INTEGER,
            allowNull: false
            },
        
        
    });
    Job.associate = (models) => {
        Job.belongsTo(models.User, { as: "manager", foreignKey: 'creatorId' });
        Job.belongsTo(models.User, { as: "performer", foreignKey: 'performerId' });
    }
    return Job;
}