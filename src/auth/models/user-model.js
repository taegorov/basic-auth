'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');
const bcrypt = require('bcrypt');


const Users = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Users.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 10);
});


const auth = async (username, password, next, req) => {
  try {
    const user = await Users.findOne({ where: { username: username } });
    console.log(password, user.password);
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    }
    else {
      throw new Error('Invalid User')
    }
  } catch (error) {
    console.log(error);
  }
}

sequelize.sync()
  .catch(e => {
    console.error('Could not start server', e.message);
  });



module.exports = { Users, auth };
