const LocalStrategy = require("passport-local").Strategy;
const { saveVisitorDB, deleteVisitorDB, findVisitorBD } = require("./db.js");

function initializePassport(passport) {
    passport.use(
        new LocalStrategy({ usernameField: "username" }, async function (
            username,
            password,
            done
        ) {
            const visitor = await findVisitorBD(username);
            if (visitor && visitor.password === password) {
                console.log('user success');
                return done(null, visitor);
            } else {
                console.log('user failure');
                return done(null, false);
            }
        })
    );

    passport.serializeUser(function (user, cb) {
        process.nextTick(function () {
            return cb(null, user);
        });
    });

    passport.deserializeUser(function (user, cb) {
        return cb(null, user);
    });
}

module.exports = initializePassport;
