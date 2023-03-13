const express = require("express");
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("./passport.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { saveVisitorDB, deleteVisitorDB, findVisitorBD } = require("./db");
const app = express();
initializePassport(passport);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: "http://localhost:8080",
        credentials: true,
        methods: ["GET", "PUT", "POST"],
        allowedHeaders:
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    })
);

app.use(
    session({
        secret: "secret-key",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/login", (req, res) => {
    res.json({
        login: req.isAuthenticated(),
        user: req.user,
    });
});
app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ login: req.isAuthenticated() });
});
app.post("/register", async (req, res) => {
    const newVisitor = await findVisitorBD(req.body.username);
    if (newVisitor) {
        res.status(200).json({ message: "already exist ×" });
    } else {
        saveVisitorDB(req.body.username, req.body.password);
        res.status(200).json({
            message: "registered ✓",
            success: true,
        });
    }
});

app.post("/logout", (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
    });
});

const port = process.env.PORT || 3000;

const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "http://localhost:8080",
        credentials: true,
        methods: ["GET", "PUT", "POST"],
        allowedHeaders:
            "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    },
});
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const onlinePlayers = [];
io.on("connection", function (socket) {
    //send list to ALL users
    const sendList = () => {
        io.emit(
            "send-list",
            onlinePlayers.map((a) => {
                return a.name;
            })
        );
    };
    //once connected get user
    socket.emit("get-user");

    socket.on("send-user", (data) => {
        //if already have this user renew socket
        onlinePlayers.find((o, i) => {
            if (o) {
                if (o.name === data.name) {
                    onlinePlayers.splice(i, 1);
                }
            }
        });
        onlinePlayers.push({
            name: data.name,
            socket: socket.id,
        });
        sendList()
    });
    socket.on("disconnect", () => {
        //delete socket by id
        onlinePlayers.find((o, i) => {
            if (o) {
                if (o.socket === socket.id) {
                    onlinePlayers.splice(i, 1);
                }
            }
        });
        sendList();
    });
});
