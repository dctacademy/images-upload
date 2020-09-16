const mongoose = require("mongoose")

mongoose.Promise = global.Promise
const CONNECTION_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/image-upload` 
// console.log(process.env)
mongoose.connect(CONNECTION_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        .then(function(){
            console.log("DB is connected")
        })
        .catch(function(err){
            console.log("DB is not connected", err)
        })
        
module.exports = {
    mongoose
}