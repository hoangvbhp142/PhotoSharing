const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hoangvbhp142:hoangviettran1402@cluster0.3o3anuc.mongodb.net/project5')
    .then(() => console.log('DB connected'));
}
module.exports = connectDB;