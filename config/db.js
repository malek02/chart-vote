const mongoose= require('mongoose');


mongoose.connect("mongodb://127.0.0.1:27017/test-app", {useFindAndModify:false,useCreateIndex:true,useNewUrlParser: true,useUnifiedTopology: true })
.then(()=>console.log('MongooDB work in local...'))