const fs = require('fs');
const pckMinifier = require('html-minifier').minify;
var minifierOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true
}

function post(fileName, metadonnees, html) {
    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="author" content="${metadonnees.author}" />

            <title>${metadonnees.title}</title>
        </head>

        <body>
            ${html}
        </body>

    </html>
    `, minifierOptions);

    fs.writeFile('./build/' + fileName + '.html', htmlContent, (err) => {
        if (err) { return console.error( 'Err. write html file'.red + err) }
        console.log('Write html file '.green + fileName + '.html');
    });
}

function main(postList) {
    var pageList = '';

    postList.forEach(function(metas) {
        pageList += `
        <div><h2>${metas.title}</h2></div>
        `;
    }, {order: 'date'})

    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>main</title>
        </head>

        <body>
            <h1>GRAND TITRE</h1>

            ${pageList}
        </body>

    </html>
    `, minifierOptions);

    fs.writeFile('./build/index.html', htmlContent, (err) => {
        if (err) { return console.error( 'Err. write html file'.red + err) }
        console.log('Write html file '.green + 'index.html');
    });
}

exports.post = post;
exports.main = main;