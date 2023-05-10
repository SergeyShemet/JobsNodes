module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false},
        middleName: {
            type: DataTypes.STRING,
            allowNull: false },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false },
        login: {
            type: DataTypes.STRING,
            allowNull: false },
        password: {
            type: DataTypes.STRING,
            allowNull: false },
        managerId: {
            type: DataTypes.INTEGER }
    });
    User.associate = (models) => {
        User.hasMany(models.Job, { foreignKey: "creatorId"});
        User.hasMany(models.User, { foreignKey: "managerId", sourceKey: "id"});
    };

    


    return User;
}