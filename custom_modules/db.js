
const mongoose = require('mongoose');

// connect to db async
const connectToDB = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017/wikiDB');
    }catch(err){
        console.log(`Error: ${err.message}`);
    }    
}

connectToDB();

// establish schema with little validation
const articleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, "Please enter a title"]
    },
    
    content : {
        type : String,
        required : [true, "Please enter content"]
    }
});

const Article = mongoose.model('Article', articleSchema);

// export Model
module.exports = Article;
