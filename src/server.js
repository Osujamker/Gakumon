const express = require('express');
const app = express();
const japanese = require('./generateScript.js')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = require('url');
const passport = require('passport');
const session = require('express-session')
const path = require('path');
const User = require('./user.js');
const multer = require('multer');
const Promise = require("bluebird");
const isEmpty = require('is-empty');
const storage = multer.diskStorage({
  destination: (req,file,cb) => {
    console.log(req.body);
    if (req.session.userId) {
      if (file.fieldname == 'background') {
        console.log('background');
        cb(null, 'src/images/backgrounds/')
      }
      else if (file.fieldname == 'avatar') {
        console.log('avatar');
        cb(null, 'src/images/avatars/')
      }
    }
  },
  filename: (req,file,cb) => {
    console.log(req.body);
    if (req.session.userId) {
      let image = req.session.userId + path.extname(file.originalname);
      if (file.fieldname == 'background') {
        console.log('background');
        User.findByIdAndUpdate(req.session.userId, {
          $set: {
            background: image
          }
        }, (err, user) => {
          if (!err) {
            cb(null, image);
          }
          else {
            cb('Can`t find user or can`t change background property of user');
          }
        });
      }
      else if (file.fieldname == 'avatar') {
        console.log('avatar');
        User.findByIdAndUpdate(req.session.userId, {
          $set: {
            avatar: image
          }
        }, (err, user) => {
          if (!err) {
            cb(null, image);
          }
          else {
            cb('Can`t find user or can`t change avatar property of user');
          }
        });
      }
    }
    else {
      cb('User is not logged in.');
    }
  }
})
const upload = multer({storage: storage});
mongoose.connect('mongodb+srv://admin:admin@cluster0-7ipuv.mongodb.net/gakumon?retryWrites=true');
const db = mongoose.connection;

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    required: true
  }
});
const Message = mongoose.model('Message', messageSchema, 'messages');
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
let news = [
  {title: 'This is a title', text: "There's text here!<br>test</br>", background: '/images/test.png'},
  {title: 'This is another title', text: "Custom <h1 style='color: red'>H</h1><h2 style='color: blue'>T<h2><h3 style='color: orange'>M</h3><h4 style='color: yellow'>L</h4>"},
  {title: 'Lorem Ipsum', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vel sapien sed orci laoreet laoreet. In diam leo, viverra et lectus sit amet, varius interdum purus. Phasellus viverra ex magna, eget elementum magna viverra eget. Praesent nec libero consequat, pharetra ante ac, semper nibh. Aliquam blandit dolor in eros sagittis venenatis. Duis at eros auctor, sodales nulla sit amet, semper nulla. Nulla quis ultrices risus, non tincidunt dui. Pellentesque nisi ex, volutpat eu libero vitae, elementum fermentum justo. Nunc facilisis orci convallis enim feugiat congue. Ut viverra tempus risus sit amet sodales. Nulla sollicitudin, tellus ac aliquet porttitor, ex eros accumsan mi, in maximus sem nibh sed dolor. Maecenas fermentum magna vel lacus malesuada, et vulputate justo facilisis.<br><br>Maecenas consequat nibh vitae nulla sodales luctus. Praesent rutrum erat sit amet sapien bibendum, quis dignissim justo faucibus. Pellentesque blandit blandit augue sed fermentum. Duis at orci et diam egestas pulvinar faucibus sed felis. Vestibulum maximus dictum lacus id lacinia. Proin vehicula posuere quam, in lacinia est finibus nec. Maecenas eu pretium ipsum, sed varius quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.<br><br>Mauris venenatis aliquam ante et viverra. Curabitur vulputate nec enim at euismod. Nullam porta mi ut sem ultricies rhoncus. Vivamus eget tortor leo. Duis vestibulum id ipsum ut hendrerit. Nulla ultricies ligula at orci vestibulum ultricies. Nam euismod erat sit amet tempus molestie. Pellentesque condimentum, ligula at venenatis iaculis, turpis orci fringilla urna, at condimentum diam magna eu sapien. Ut vestibulum lorem ligula, a gravida urna consequat eu. Nulla aliquam dui non consequat consectetur. Maecenas consequat sed metus eu interdum. Ut libero magna, porta nec erat in, dignissim dignissim risus. Sed rutrum euismod tristique. Donec ligula mi, sollicitudin at justo vel, ornare bibendum diam. Donec vulputate dolor mauris, sed volutpat orci vehicula nec. Praesent sit amet quam at lorem scelerisque vehicula.<br><br>Pellentesque suscipit nisi ut posuere dapibus. Vestibulum laoreet libero quis nisl dignissim, eget tincidunt est tincidunt. Praesent in pulvinar justo, vitae bibendum felis. Vestibulum id elit et erat placerat ultrices sit amet vel lectus. Donec at porta ligula, ut semper neque. Morbi imperdiet nunc vitae ante pulvinar, vitae auctor dolor bibendum. Nulla tellus quam, mattis a lacus nec, viverra semper augue. Sed et finibus erat. Sed maximus sapien ligula. Aliquam fermentum, est ut pellentesque porttitor, dui eros finibus neque, sollicitudin fringilla elit erat vitae tellus. Aliquam vehicula, dolor ut placerat semper, leo mauris auctor neque, a tristique lacus turpis id nunc. Fusce ac neque non nisi posuere suscipit. Aliquam egestas enim risus, sed semper magna iaculis ac.<br><br>Suspendisse ac ligula finibus, commodo dui at, commodo velit. Vivamus eu massa luctus, ullamcorper ex vitae, aliquet justo. In lacinia neque eget commodo condimentum. Fusce eget felis facilisis, semper turpis quis, commodo lacus. Sed fermentum aliquam erat, eu hendrerit est euismod in. Etiam fermentum ipsum tempus ex ullamcorper, ac tincidunt justo vestibulum. Suspendisse nisi mauris, dictum vel lacinia a, bibendum sit amet tellus. Nunc egestas mollis dolor, eu dictum nibh sollicitudin sit amet. Aliquam aliquet sollicitudin lobortis. Phasellus dignissim dapibus nisi."},
  {title: 'Ipsum', text: ""}
];
news.map((article, index) => {
  article.id = index;
})
app.get('/api/news', (req, res) => {
  res.send(news);
});
app.get('/api/game', (req, res) => {
  let query = url.parse(req.url, true).query;
  let amount = query.amount;
  let difficulty = query.difficulty;
  res.send(japanese.Generate(query.system, amount, difficulty));
});
app.get('/api/isloggedin', (req, res, next) => {
  User.findById(req.session.userId)
  .exec( (error, user) => {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.send({isLoggedIn: false});
      } else {
        user.password = undefined;
        return res.send(user);
      }
    }
  });
})
app.get('/api/getUser', (req, res, next) => {
  User.findById(req.session.userId)
  .exec( (error, user) => {
    if (error) {
      return next(error);
    } else {
      if (user === null) {
        return res.send({isLoggedIn: false});
      } else {
        user.password = undefined;
        return res.send(user);
      }
    }
  });
})
app.get('/api/logout', (req, res, next) => {
  req.session.destroy((err) => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  })
})
app.get('/api/users', (req, res, next) => {
  User.find({}, (err, users) => {
    let userMap = [];
    users.forEach((user) => {
      user.password = undefined;
      if (user._id == req.session.userId) {
        userMap.push({user: user, isYou: true});
      }
      else {
        userMap.push({user: user, isYou: false});
      }
    })
    res.send(userMap);
  });
});
app.post('/api/user/practice', (req, res) => {
  console.log(req.session.userId);
  console.log(req.body);
  if (req.session.userId) {
    let difficultyMul = 1;
    switch(req.body.difficulty) {
      default:
      case 'easy':
        difficultyMul = 0.5
        break;
      case 'normal':
        difficultyMul = 1
        break;
      case 'hard':
        difficultyMul = 2
        break;
    }
    let exp = ((req.body.correct * difficultyMul) / Math.max(1, req.body.incorrect)) * 10;
    console.log(exp);
    let user = User.findById(req.session.userId);
    User.findById(req.session.userId, (err, user) => {
      let expToLevel = user.level * 100;
      if (expToLevel <= user.exp + exp) {
        user.exp -= expToLevel;
        user.level++;
      }
      if (err) res.sendStatus(500);
      else {
        User.update({_id: user._id}, {level: user.level, exp: user.exp + exp, completed: ++user.completed}, (err) => {
          if (err) console.log(err);
        });
        res.sendStatus(200);
      }
    });
  }
});
app.post('/api/user/getMessages', (req, res) => {
  let messages = [];
  User.findById(req.body.user)
  .then((user) => {
    return Promise.map(user.messages, (message) => {
      return Message.findById(message)
      .populate('user', 'username')
      .exec()
      .then((message) => {
        messages.push(message);
      })
    })
  })
  .then(() => {
    res.send(messages);
  });
});
app.post('/api/user/getFriends', (req, res) => {
  let friends = [];
  return Promise.map(req.body.user, (userId) => {
    return User.findById(userId)
    .populate('friends', 'username avatar')
    .exec()
    .then((friend) => {
      friends.push(friend);
    })
  })
  .then(() => {
    res.send(friends);
  })
});
app.post('/api/user/messages', (req, res) => {
  console.log(req.body);
  if (req.session.userId && req.body.message && req.body.user) {
    let message = new Message({
      user: req.session.userId,
      message: req.body.message
    });
    message.save((err) => {
      if (err) console.log(err);
    });
    User.findByIdAndUpdate(req.body.user, {
      $push: {
        messages: message._id
      }
    }, (err, success) => {
      if(err) console.log(err);
      if(success) console.log('Success!');
    });
  }
});;
app.post('/api/user/friends', (req, res) => {
  if (req.session.userId && req.body.userId) {
    User.findByIdAndUpdate(req.session.userId, ({
      $push: {
        friends: {
          _id: req.body.userId
        }
      }
    }), (err, success) => {
      if(err) {
        console.log(err);
      }
      if (success) {
        console.log('Friend added');
      }
    });
  }
});
isUsernameAvailable = (username) => {
  console.log(username);
  if (User.findOne({username}, (err, user) => {
    if (user) {
      return false;
    }
  }));
  return true;
}
app.post('/api/upload', upload.any(), (req,res) => {

});
app.post('/api/settings', (req, res) => {
  let credentials = req.body;
  if (req.session.userId && !isEmpty(req.body)) {
    if (isUsernameAvailable(credentials.username)) {
      User.findByIdAndUpdate(req.session.userId, {
        username: credentials.username,
        password: credentials.password
      }, {new: true}, (err, user) => {
        user.save();
      });
    }
    else {

    }
  }
});
app.post('/api/user/delete_account', (req, res) => {
  if (req.session.userId) {
    let confirmation = req.body.confirmation.toUpperCase();
    if (confirmation == 'I REALLY WANT TO DELETE MY ACCOUNT') {
      User.remove({_id: req.session.userId}, (err) => {
        if (err) console.log(err);
        res.end();
      });
    }
  }
});
app.post('/api/article', (req, res) => {
  res.send(news.find((article) => {
    return article.id == req.body.articleId;
  }));
});
app.post('/api/registration', (req, res, next) => {
  if (req.body.username &&
    req.body.password) {
    var userData = {
      username: req.body.username,
      password: req.body.password,
    }
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        return res.send({success: true});
      }
    });
  }
});
app.post('/api/login', (req, res, next) => {
  User.authenticate(req.body.username, req.body.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong username or password.');
      err.status = 401;
      return next(err);
    } else {
      req.session.userId = user._id;
      return res.send({success: true});
    }
})});
app.post('/api/user', (req, res, next) => {
  if (req.body.username) {
    User.findOne({username: req.body.username})
    .exec( (error, user) => {
      if (error) {
        return next(error);
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!');
          err.status = 400;
          return next(err);
        } else {
          user.password = undefined;
          if (req.session.userId == user._id) {
            return res.send({user: user, isYou: true});
          }
          else {
            return res.send({user: user, isYou: false});
          }
        }
      }
    });
  }
  else if (req.body._id) {
    User.findById(req.body._id, (err, user) => {
      if (!err) {
        if (req.session.userId == user._id) {
          return res.send({user: user, isYou: true});
        }
        else {
          return res.send({user: user, isYou: false})
        }
      }
    });
  }
});
app.listen(5000);

