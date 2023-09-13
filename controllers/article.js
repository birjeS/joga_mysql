const con = require('../utils/db')

// show all articles index page
const getAllArticles = (req, res) => {
    let query = "SELECT * FROM article";
    let articles = []
    con.query(query, (err, result) => {
        if (err) throw err;
        articles = result
        res.render('index', {
            articles: articles
        })
    })
};
//show article by this slug
const getArticleSlug = (req, res) => {
    let query = `SELECT *,
                article.name as article_name,
                author.name as author_name
                FROM article
                INNER JOIN author
                ON author.id = article.author_id WHERE slug="${req.params.slug}"`
    let article
    con.query(query, (err, result) => {
        if (err) throw err;
        article = result
        console.log(article)
        res.render('article', {
            article: article
        })
    })
}

module.exports = {
    getAllArticles,
    getArticleSlug
}