const fs = require('fs')
const pckColors = require('colors');
const pckCreateFile = require('create-file');
const pckYamlFrontmatter = require('yaml-front-matter');
const pckMinifier = require('html-minifier').minify;
var minifierOptions = {
    removeAttributeQuotes: true,
    collapseWhitespace: true
}
const pckVisData = require('vis-data').DataSet;
var data = new pckVisData;
const pckMarkdownIt = require('markdown-it');
var mdRender = new pckMarkdownIt();

// fs.watch('./docs', 'utf8', function(ev, trigger) {
//     console.log(ev);
//     console.log(trigger);

//     var fileName = trigger.split('.')
//     convertMdTOHTML(fileName[0]);
    
// })

var markdownFiles = fs.readdirSync('./dist/markdown/', 'utf8');
markdownFiles.forEach(file => {
    var fileMetas = file.split('.');
    var fileName = fileMetas[0];
    var fileExtension = fileMetas[1];

    convertMdToHtml(fileName);
});

genMainPage();

function convertMdToHtml(fileName) {
    var mdFile = fs.readFileSync('./dist/markdown/' + fileName + '.md', 'utf8');

    var mdMetadonnees = pckYamlFrontmatter.loadFront(mdFile);
    var mdContent = pckYamlFrontmatter.loadFront(mdFile).__content;
    delete mdMetadonnees.__content;

    data.add(mdMetadonnees)
    
    var htmlContent = mdRender.render(mdContent);
    htmlContent = genPage(mdMetadonnees, htmlContent);

    fs.writeFile('./build/' + fileName + '.html', htmlContent, (err) => {
        if (err) { return console.error( 'Err. write html file'.red + err) }
        console.log('Write html file '.green + fileName + '.html');
    });
}

function genPage(metadonnees, html) {
    return pckMinifier(`
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
}

function genMainPage() {
    var pageList = '';

    data.forEach(function(metas) {
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