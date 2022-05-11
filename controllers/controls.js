const Article = require("../custom_modules/db.js");

const getArticles = ((req,res) => {
    Article.find({}, (err, foundArticles) => {
        if(!err){
            res.status(201).send(foundArticles);
        }else{
            res.send(err);
        }
    })
});

const postArticles = ((req,res) => {
    let title = req.body.title;
    let content = req.body.content;

    let newArticle = new Article({
        title : title,
        content : content
    })

    Article.create(newArticle, (err) => {
        if(!err){
            res.sendStatus(201);
        }else{
            res.send(err);
        }
    })
    
})

const deleteArticles = ((req,res) => {
    Article.deleteMany({}, (err) => {
        if(!err){
            res.sendStatus(204);
        }else{
            res.send(err);
        }
    })
});

const getSingleArticle = ((req,res) => {

    let requestedArticle = req.params.title;
    Article.findOne({title: requestedArticle}, (err,article) => {
        if(err) res.send(`Error: ${err.message}`);
        
        if(article){
            res.send(article)
        }else{
            res.send(`The requested resource is not on file`);
        }
    })
})


const deleteSingleArticle = ((req,res) => {

    let title = req.params.title;
    Article.findOneAndDelete({title : title},(err, deletedArticle) => {
        if(!err){
            res.send('Succesful');
        }else{
            res.send(err);
        }
    })
})



const updateSingleArticle = ((req,res) => {
    let title = req.params.title;
    let replacementTitle = req.body.title;
    let replacementContent = req.body.content;

    Article.findOneAndUpdate({title : title}, {title: replacementTitle, content: replacementContent}, {upsert: true}, (err, replacedArticle) => {
        if(!err){
            res.send('Successfully updated the article');
        }else{
            res.send(404,{error: err});
        }
    })
})

const patchSingleArticle = ((req,res) => {
    let title = req.params.title;

    Article.findOneAndUpdate({title: title},{$set: req.body},(err,foundDoc) => {
        if(!err){
            res.status(200).send('Seccessful');
        }else{
            res.status(404).send({error:err});
        }
    })
})



module.exports = {
    getArticles,
    postArticles,
    deleteArticles,
    getSingleArticle,
    deleteSingleArticle,
    updateSingleArticle,
    patchSingleArticle
}