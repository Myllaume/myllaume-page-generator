const fs = require('fs')
const pckColors = require('colors');
const pckCreateFile = require('create-file');
const pckYamlFrontmatter = require('yaml-front-matter');
const pckMinifier = require('html-minifier').minify;
const pckVisData = require('vis-data').DataSet;
var data = new pckVisData;
const pckMarkdownIt = require('markdown-it');
var md = new pckMarkdownIt();

// fs.watch('./docs', 'utf8', function(ev, trigger) {
//     console.log(ev);
//     console.log(trigger);

//     var fileName = trigger.split('.')
//     convertMdTOHTML(fileName[0]);
    
// })

fs.readdir('./dist/markdown/', (err, files) => {
    files.forEach(file => {
        var fileName = file.split('.')
        convertMdTOHTML(fileName[0])
        console.log('Conv. file '.green + file);
    });
});

function convertMdTOHTML(fileName) {
    fs.readFile('./dist/markdown/' + fileName + '.md', 'utf8', function (err, fileContent) {
        if (err) { return console.error(err.red) }

        var metadonnees = pckYamlFrontmatter.loadFront(fileContent);
        var donnees = pckYamlFrontmatter.loadFront(fileContent).__content;
        delete metadonnees.__content;

        data.add(metadonnees);
    
        var html = md.render(donnees);
        html = pckMinifier(genPage(metadonnees, html), {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        });

        pckCreateFile('./build/' + fileName + '.html', html, function (err) {
            if (err) { return console.error(err.red) }
        });
    
    });
}

function genPage(metadonnees, html) {

    var head = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="` + metadonnees.author + `" />

        <title>` + metadonnees.title + `</title>
    </head>
    <body>
    `;

    return head + html + '</body></html>';
}