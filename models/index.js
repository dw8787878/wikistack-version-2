'use strict';

const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack_version2', {
  logging: false
});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle : {
    type: Sequelize.STRING,
    allowNull: false,
    },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
  // date: {
  //   type: Sequelize.DATE,
  //   defaultValue: Sequelize.NOW
  // }
}, {
    getterMethods : {
      route : function(){ return '/wiki/' + this.urlTitle.toString(); }
    }
  }, {
    // hooks: {
    //   beforeValidate: function(page){
    //         if (page.title){
    //           let regEx = /\s+/g;
    //           page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
    //         } else {
    //           page.urlTitle = Math.random().toString(36).substring(2,7);
    //         }
    //   }
    // }
  });
Page.hook('beforeValidate', function(page){
            if (page.title){
              page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
            } else {
              page.urlTitle = Math.random().toString(36).substring(2,7);
            }
});

var User = db.define('user', {
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    },
    allowNull: false
  }
});


module.exports = {
  db: db,
  Page : Page,
  User : User
};
