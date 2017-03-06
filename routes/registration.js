const User = require('../models/user');

exports.get = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.body = ctx.render('welcome');
  } else {
    ctx.body = ctx.render('registration');
  }
};

exports.post = async (ctx, next) => {
  let user = {
      email: ctx.request.body.email,
      password: ctx.request.body.password
  };

  await User.create(user)
    .then(
        (response) => {
            ctx.body = 'Для завершения регистрации перейдите по ссылке в email';
        }
    )
    .catch(e => {
        let errors = [];
        
        for (field in e.errors) {
            errors.push(e.errors[field].message);
        }

        ctx.session.messages = {
            error: errors
        };

        ctx.response.redirect('/registration');
        
    });
};