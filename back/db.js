const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(
    "mongodb://localhost:27017/loginapp",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("DB connected");
        }
    }
);

const Schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const visitors = mongoose.model("visitors", Schema);

async function saveVisitorDB(e, p) {
    await new visitors({
        email: `${e}`,
        password: `${p}`,
    }).save()
}
async function deleteVisitorDB(e) {
    await visitors.deleteOne({ email: `${e}` });
}
async function findVisitorBD(e) {
    return await visitors.findOne({ email: `${e}` }).exec();
}

module.exports = { saveVisitorDB, deleteVisitorDB, findVisitorBD };
