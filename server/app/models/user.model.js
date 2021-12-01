module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!")
      }
    },
    avatar: {
      type: DataTypes.STRING,
      get() {
          avatarFile = this.getDataValue("avatar");
          return __uploadsdir + avatarFile;
      }
    },
    bio: {
      type: DataTypes.STRING
    },
    interests: {
      type: DataTypes.JSON
    },
    likes: {
      type: DataTypes.JSON
    },
    matches: {
      type: DataTypes.JSON
    }
  });

  return User;
};
