// // jshint esversion:6

const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const urlencoded = require('body-parser/lib/types/urlencoded');
const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = new mongoose.Schema({
    title : String,
    content : String
});

const Article = mongoose.model('article', articleSchema);



app.route('/api/articles')

   .get((req,res) => {
    Article.find({}, (err, foundArticles) => {
        if(!err){
            res.status(201).send(foundArticles);
        }else{
            res.send(err);
        }
    })
})

   .post((req,res) => {
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

    .delete((req,res) => {
    Article.deleteMany({}, (err) => {
        if(!err){
            res.sendStatus(204);
        }else{
            res.send(err);
        }
    })
});


app.route('/api/articles/:title')

    .get((req,res) => {

    let requestedArticle = req.params.title;
    Article.findOne({title: requestedArticle}, (err,article) => {
        if(!err){
            if(article){
                res.send(article);
            }else{
                res.send('The requested resource is not available');
            }
        }else{
            res.send(err);
        }
    })
})

    .delete((req,res) => {

    let title = req.params.title;
    Article.findOneAndDelete({title : title},(err, deletedArticle) => {
        if(!err){
            res.send('Succesful');
        }else{
            res.send(err);
        }
    })
})

    .put((req,res) => {
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

    .patch((req,res) => {
        let title = req.params.title;

        Article.findOneAndUpdate({title: title},{$set: req.body},(err,foundDoc) => {
            if(!err){
                res.status(200).send('Seccessful');
            }else{
                res.status(404).send({error:err});
            }
        })
    })



app.listen(port, () => console.log('Web server running at port ' + port));

