const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const config = require('./development_config')
const googleLoginCheck = require('../models/member/googlelogincheck');
const googlelogincreate = require("../models/member/googlelogincreate");
//const checkID = require('../models/member/checkid');
const jwt = require('jsonwebtoken');

// passport.serializeUser((user, done) => {
//     console.log("Serializing user now");
//     //console.log(user);
//     done(null, user[0].id);
// });

// passport.deserializeUser((id, done) => {
//     console.log("Deserializing user now");
//     checkID(id).then((user) => {
//       console.log("Found user.");
//       //console.log(id);
//       done(null, user);
//     });
//   });
  
  passport.serializeUser((user, done) => {
    console.log("Serializing user now");
    done(null, user);
});

passport.deserializeUser((user, done) => {
    console.log("Deserializing user now");
      done(null, user);
  });


passport.use(
    new GoogleStrategy(
      {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: "/member/google/redirect",
      },
      (accessToken, refreshToken, profile, done)=>{

        const memberData = {
            name: profile.displayName,
            email: profile.emails[0].value,
            googleID: profile.id,
            create_date: onTime()
        }

      googleLoginCheck(memberData).then((foundUser) => {
             
        if (foundUser.length !== 0) {
            console.log("User already exist");
            // 產生token
            const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
                data: foundUser[0].id
            }, config.secret);
            foundUser[0].token = token;
          done(null, foundUser);
        } else {
          googlelogincreate(memberData)
            .then((newUser) => {
              console.log("New user created.");
              // 產生token
              const token = jwt.sign({
                algorithm: 'HS256',
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
                data: newUser[0].id
            }, config.secret);
            newUser[0].token = token;

              done(null, newUser);
            });
        }
      }).catch((e)=>{console.log(e)});
      }));



      //取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}
      