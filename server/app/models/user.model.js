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
      defaultValue: "",
      set(value) {
          return __uploadsdir + value;
      }
    },
    bio: {
      type: DataTypes.STRING,
      defaultValue: ""
    },
    interests: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    likes: {
      type: DataTypes.JSON,
      defaultValue: []
    },
    matches: {
      type: DataTypes.JSON,
      defaultValue: []
    }
  });

  return User;
};
