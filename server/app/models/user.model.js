module.exports = (sequelize, Datatypes) => {
  const User = sequelize.define("user", {
    id: {
      primaryKey: true,
      type: Datatypes.UUID,
      defaultValue: Datatypes.UUIDV4
    },
    username: {
      type: Datatypes.STRING,
      allowNull: false
    },
    password: {
      type: Datatypes.STRING,
      allowNull: false
    },
    firstName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    lastName: {
      type: Datatypes.STRING,
      allowNull: false
    },
    fullName: {
      type: Datatypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error("Do not try to set the `fullName` value!")
      }
    },
    avatar: {
      type: Datatypes.STRING
    },
    bio: {
      type: Datatypes.STRING
    },
    interests: {
      type: Datatypes.JSON
    },
    likes: {
      type: Datatypes.JSON
    },
    matches: {
      type: Datatypes.JSON
    }
  });

  return User;
};
