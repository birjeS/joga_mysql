const con = require('../utils/db')

//show article by this slug
const getAuthorName = (req, res) => {
    let article_query = `SELECT * FROM article, author WHERE author.id='${req.params.author_id}' AND article.author_id='${req.params.author_id}';`
    let author_query = `SELECT name FROM author WHERE id='${req.params.author_id}';`
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
}

module.exports = {
    getAuthorName
}