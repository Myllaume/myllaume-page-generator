const fs = require('fs');
const pckYaml = require('js-yaml');
const pckMinifier = require('html-minifier').minify;
var minifierOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true
}

const metasGenerator = require('./genmetas');
const categorieGenerator = require('./gencategorie');

var footer = fs.readFileSync('./dist/html/' + 'footer.html', 'utf8');
var identiteSite = fs.readFileSync('./dist/html/' + 'identite-site.html', 'utf8');

var homeMetas = pckYaml.safeLoad(fs.readFileSync('./dist/' + 'home-metas.yml', 'utf8'));

function post(fileName, metadonnees, html) {
    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            ${metasGenerator.fullHead(metadonnees)}

            <link rel="stylesheet" href="../assets/main.css">
        </head>

        <body>
            <div class="wrapper">

            <header class="header">

                ${identiteSite}

                <div class="raison-editoriale">
                    <h2 class="ss-titre-site">Base de connaissance<br/>Guillaume Brioudes</h2>
                    
                    ${categorieGenerator.list()}
                </div>
            </header>

            <main class="main">

                <a class="retour" href="../index.html">retour accueil</a>

                ${html}

            </main>

            ${footer}

            </div>
        </body>

    </html>
    `, minifierOptions);

    fs.writeFile('./build/post/' + fileName + '.html', htmlContent, (err) => {
        if (err) { return console.error( 'Err. write html file'.red + err) }
        console.log('Write html file '.green + fileName + '.html');
    });
}

function main(postList) {
    var pageList = '';

    postList.forEach(function(metas) {
        pageList += `
        <article class="article">
            <h3 class="article__titre"><a href="./post/${metas.path}">${metas.title}</a></h3>
            <span class="article__categorie">Projets</span>
        </article>`;
    }, {order: 'date'})

    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            ${metasGenerator.fullHead(homeMetas, 'page')}

            <link rel="stylesheet" href="./assets/main.css">
        </head>

        <body>
        <div class="wrapper">

            <header class="header">
                
                ${identiteSite}

                <div class="raison-editoriale">
                    <h2 class="ss-titre-site">Base de connaissance<br/>Guillaume Brioudes</h2>
                    
                    ${categorieGenerator.list()}
                </div>
            </header>

            <main class="main">
            
                ${pageList}

            </main>

            ${footer}

            </div>
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