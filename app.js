const fs = require('fs')
const pckColors = require('colors');
const pckYamlFrontmatter = require('yaml-front-matter');
const pckVisData = require('vis-data').DataSet;
var data = new pckVisData;
const pckMarkdownIt = require('markdown-it');
var mdRender = new pckMarkdownIt();

const generator = require('./functions/genpage');

// Browse for mardown files
fs.readdirSync('./dist/posts/', 'utf8').forEach(file => {
    var fileMetas = file.split('.');
    var fileName = fileMetas[0];
    var fileExtension = fileMetas[1];

    if (fileExtension == 'md') {
        var post = loadMarkdown('./dist/posts/' + fileName + '.md');
        data.add(post.metas);
        generator.post(post.metas, post.html);
    }
});

fs.readdirSync('./dist/pages/', 'utf8').forEach(file => {
    var fileMetas = file.split('.');
    var fileName = fileMetas[0];
    var fileExtension = fileMetas[1];

    if (fileExtension == 'md') {
        var page = loadMarkdown('./dist/pages/' + fileName + '.md');
        generator.page(page.metas, page.html);
    }
});

function loadMarkdown(filePath) {
    var mdFile = fs.readFileSync(filePath, 'utf8');

    var mdMetadonnees = pckYamlFrontmatter.loadFront(mdFile);
    var mdContent = pckYamlFrontmatter.loadFront(mdFile).__content;
    delete mdMetadonnees.__content;
    mdMetadonnees.path = mdMetadonnees.id + '.html';

    if (mdMetadonnees.date.update == null) {
        mdMetadonnees.date.update = mdMetadonnees.date.publish; }

    return {
        html: mdRender.render(mdContent),
        metas: mdMetadonnees
    }
}

generator.main(data);
generator.categories(data);