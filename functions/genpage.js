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

            <link rel="stylesheet" href="../assets/main.css">

            <title>${metadonnees.title}</title>
        </head>

        <body>
            <div class="wrapper">

            <header class="header">
                <div class="identite-site">
                    <h1 class="titre-site">M<span class="fonti">y</span>llaume</h1>
                    <span class="legal">
                        <a href="https://creativecommons.org/licenses/by-nc/2.0/fr/" target="_blank">CC BY-NC</a>
                        <a href="#">mentions légales</a>
                        <a href="#">contact</a>
                    </span>
                </div>

                <div class="raison-editoriale">
                    <h2 class="ss-titre-site">Base de connaissance<br/>Guillaume Brioudes</h2>
                    
                    <ul class="categories">
                        <li><a href="#">Développement</a></li>
                        <li><a href="#">Documentation</a></li>
                    </ul>
                </div>
            </header>

            <main class="main">
            ${html}
            </main>

            <footer class="footer">
                <img class="img-pied-page" src="../assets/footer-img.jpg" alt="">
                <div class="devise">co<span class="fonti">d</span>e, phi<span class="fonti">l</span>o, t<span class="fonti">y</span>po</div>
            </footer>

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
        <div><h2><a href="./post/${metas.path}">${metas.title}</a></h2></div>
        `;
    }, {order: 'date'})

    var htmlContent = pckMinifier(`
    <!DOCTYPE html>
    <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <link rel="stylesheet" href="./assets/main.css">

            <title>main</title>
        </head>

        <body>
        <div class="wrapper">

            <header class="header">
                <div class="identite-site">
                    <h1 class="titre-site">M<span class="fonti">y</span>llaume</h1>
                    <span class="legal">
                        <a href="https://creativecommons.org/licenses/by-nc/2.0/fr/" target="_blank">CC BY-NC</a>
                        <a href="#">mentions légales</a>
                        <a href="#">contact</a>
                    </span>
                </div>

                <div class="raison-editoriale">
                    <h2 class="ss-titre-site">Base de connaissance<br/>Guillaume Brioudes</h2>
                    
                    <ul class="categories">
                        <li><a href="#">Développement</a></li>
                        <li><a href="#">Documentation</a></li>
                    </ul>
                </div>
            </header>

            <main class="main">
            
                ${pageList}

            </main>

            <footer class="footer">
                <img class="img-pied-page" src="./assets/footer-img.jpg" alt="">
                <div class="devise">co<span class="fonti">d</span>e, phi<span class="fonti">l</span>o, t<span class="fonti">y</span>po</div>
            </footer>

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