const fs = require('fs');
const pckYaml = require('js-yaml');
const pckMinifier = require('html-minifier').minify;
const pckMoment = require('moment');
var minifierOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true
}

const metasGenerator = require('./genmetas');
const categorieGenerator = require('./gencategorie');

var footer = fs.readFileSync('./dist/html/' + 'footer.html', 'utf8');
var identiteSite = fs.readFileSync('./dist/html/' + 'identite-site.html', 'utf8');

var homeMetas = pckYaml.safeLoad(fs.readFileSync('./dist/' + 'home-metas.yml', 'utf8'));
var categorieList = pckYaml.safeLoad(fs.readFileSync('./' + 'categories.yml', 'utf8'));

function post(metadonnees, html) {
    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            ${metasGenerator.fullHead(metadonnees)}

            <link rel="stylesheet" href="/assets/main.css">
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

                <a class="retour" href="/index.html">retour accueil</a>

                <h1>${metadonnees.title}</h1>

                ${html}

                <ul class="metadonnees">
                    <li><span class="metadonnees__key">Mots-clés</span> : ${metadonnees.keyword.join(', ')}</li>
                    <li><span class="metadonnees__key">Mise en ligne</span> : ${pckMoment(metadonnees.date.update).format('DD-MM-YYYY')}</li>
                    <li><span class="metadonnees__key">Dernière édition</span> : ${pckMoment(metadonnees.date.update).format('DD-MM-YYYY')}</li>
                </ul>

            </main>

            ${footer}

            </div>
        </body>

    </html>
    `, minifierOptions);

    fs.writeFile('./build/posts/' + metadonnees.path, htmlContent, (err) => {
        if (err) { return console.error( 'Err. write html file'.red + err) }
        console.log('Write html file '.green + metadonnees.id + '.html');
    });
}

function genEntries(metas) {
    return `
    <article class="article">
        <h3 class="article__titre"><a href="/posts/${metas.path}">${metas.title}</a></h3>
        <span class="article__categorie">${metas.categorie}</span>
    </article>`;
}

function main(postList) {
    var refList = '';

    postList.forEach(function(metas) { refList += genEntries(metas); },
        {order: 'date'})

    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            ${metasGenerator.fullHead(homeMetas, 'main')}

            <link rel="stylesheet" href="/assets/main.css">
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
            
                ${refList}

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

function page(metas, html) {

    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            ${metasGenerator.fullHead(homeMetas, 'page')}

            <link rel="stylesheet" href="/assets/main.css">
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

                <a class="retour" href="/index.html">retour accueil</a>

                <h1>${metas.title}</h1>
            
                ${html}

            </main>

            ${footer}

            </div>
        </body>

    </html>
    `, minifierOptions);

    fs.writeFile('./build/' + metas.id + '.html', htmlContent, (err) => {
        if (err) { return console.error( 'Err. write html file'.red + err) }
        console.log('Write html file '.green + metas.id + '.html');
    });
}

function categories(postList) {
    
    categorieList.forEach(catMetas => {

        var refList = '';

        postList.forEach(function(metas) { refList += genEntries(metas); }, {
            filter: function (item) {
                return (item.categorie == catMetas.id);
            }
        })

        var htmlContent = pckMinifier(`
        <!DOCTYPE html>
        <html lang="fr">
            <head>
                ${metasGenerator.fullHead(catMetas, 'categorie')}
    
                <link rel="stylesheet" href="/assets/main.css">
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

                    <a class="retour" href="/index.html">retour accueil</a>

                    <h2 class="cat-title">${catMetas.title}</h2>
                
                    ${refList}
    
                </main>
    
                ${footer}
    
                </div>
            </body>
    
        </html>
        `, minifierOptions);
    
        fs.writeFile('./build/categories/' + catMetas.id + '.html', htmlContent, (err) => {
            if (err) { return console.error( 'Err. write html file'.red + err) }
            console.log('Write html file '.green + catMetas.id + '.html');
        });

    });
}

exports.post = post;
exports.main = main;
exports.page = page;
exports.categories = categories;