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
  
 // set association
  User.associate = function ({ authToken })
  {
    User.hasMany(authToken)
  }

  
  User.auth = async function(username, password) {
    const user = await User.findOne({where: { username }});

    if (bcrypt.compareSync(password, user.password)) {
      return user.authorize();
    }
    else {
      return res.status(400).json({
        error: new Error("Wrong password!")
      })
    }
  } 
    User.prototype.authorize = async function ()
    {
      const { authToken } = sequelize.models;
      const user = this
      const token = await authToken.generate(this.id);
      await user.addAuthToken(token);
      return {user, token}
    };

  

  return User;
};
