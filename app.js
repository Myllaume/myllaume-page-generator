const fs = require('fs')
var createFile = require('create-file');
var yamlFrontmatter = require('yaml-front-matter');
var minify = require('html-minifier').minify;

// fs.watch('./docs', 'utf8', function(ev, trigger) {
//     console.log(ev);
//     console.log(trigger);

//     var fileName = trigger.split('.')
//     convertMdTOHTML(fileName[0]);
    
// })

fs.readdir('./docs', (err, files) => {
    files.forEach(file => {
        var fileName = file.split('.')
        convertMdTOHTML(fileName[0])
        console.log(file);
    });
});

function convertMdTOHTML(fileName) {
    fs.readFile('./docs/' + fileName + '.md', 'utf8', function (err, data) {
        if (err) { return console.error(err) }
        // console.log(data);
        
        const MarkdownIt = require('markdown-it');
        md = new MarkdownIt();

        var metadonnees = yamlFrontmatter.loadFront(data);
        var donnees = yamlFrontmatter.loadFront(data).__content;
    
        var html = md.render(donnees);
        html = minify(genPage(metadonnees, html), {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        });

        createFile('./build/' + fileName + '.html', html, function (err) {
            console.log(err);
        });
    
    });
}

function genPage(metadonnees, html) {

    var head = `
    <!DOCTYPE html>
    <html lang="en">
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