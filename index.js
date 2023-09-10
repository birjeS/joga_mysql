// application packages
const express = require ('express')
const app = express()

const path = require('path')
//add template engine
const hbs = require("express-handlebars");
//setup template engine directory and files extension
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout:'main',
    layoutsDir:__dirname+'/views/layouts',
}))
//setup static public directory
app.use(express.static('public'));

const mysql = require ('mysql')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

// create database connection
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"qwerty",
    database: "joga_mysql"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("connected to joga_mysql db");
})

//show all articles - index page
app.get('/',(req,res)=> {
    let query = "SELECT*FROM article";
    let articles = []
    con.query(query,(err, result) => {
        if (err) throw err;
        articles = result
        res.render('index',{
            articles:articles
        })
    })
});

//show article by this slug
app.get('/article/:slug', (req, res) => {
    let query = `SELECT * FROM article, author WHERE article.slug='${req.params.slug}' AND article.author_id=author.author_id`
    let article
    con.query(query, (err, result) => {
        if(err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    });
});


// show articles by author
app.get('/author/:author_id', (req, res) => {
    let article_query = `SELECT * FROM article, author WHERE author.author_id='${req.params.author_id}' AND article.author_id=author.author_id;`
    let author_query = `SELECT author_name FROM author WHERE author.author_id=\'${req.params.author_id}';`
    let author
    let articles = []

    con.query(article_query, (err, result) => {
        if (err) throw err
        articles = result
        console.log(articles)

        con.query(author_query, (err, result) => {
            if (err) throw err
            author = result
            console.log(author)
            res.render('author', {
                articles: articles,
                author: author
            })
        })
    })
})

//app start point
app.listen(3000, () => {
    console.log('App is started at http://localhost:3000');
})