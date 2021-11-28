module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!")
      }
    },
    profPic: {
      type: Sequelize.STRING
    },
    bio: {
      type: Sequelize.STRING
    },
    interests: {
      type: Sequelize.JSON
    },
    likes: {
      type: Sequelize.JSON
    },
    matches: {
      type: Sequelize.JSON
    }
  });

  return User;
};
