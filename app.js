const fs = require('fs')
const pckColors = require('colors');
const pckCreateFile = require('create-file');
const pckYamlFrontmatter = require('yaml-front-matter');
const pckVisData = require('vis-data').DataSet;
var data = new pckVisData;
const pckMarkdownIt = require('markdown-it');
var mdRender = new pckMarkdownIt();

const generator = require('./functions/genpage');

// Browse for mardown files
var markdownFiles = fs.readdirSync('./dist/markdown/', 'utf8');
// For each file : generate html equivalent
markdownFiles.forEach(file => {
    var fileMetas = file.split('.');
    var fileName = fileMetas[0];
    var fileExtension = fileMetas[1];

    if (fileExtension == 'md') {
        convertMdToHtml(fileName); }
});

function convertMdToHtml(fileName) {
    var mdFile = fs.readFileSync('./dist/markdown/' + fileName + '.md', 'utf8');

    var mdMetadonnees = pckYamlFrontmatter.loadFront(mdFile);
    var mdContent = pckYamlFrontmatter.loadFront(mdFile).__content;
    delete mdMetadonnees.__content;
    mdMetadonnees.path = fileName + '.html';

    data.add(mdMetadonnees)
    
    var htmlContent = mdRender.render(mdContent);
    generator.post(fileName, mdMetadonnees, htmlContent);
}

generator.main(data)