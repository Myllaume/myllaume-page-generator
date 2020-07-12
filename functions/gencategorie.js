const fs = require('fs');
const pckYaml = require('js-yaml');

var categories = pckYaml.safeLoad(fs.readFileSync('./' + 'config.yml', 'utf8')).categorie;

function list() {

    var html = '';

    categories.forEach(cat => {
        html += `<li><a href="./categories/${cat}.html">${cat}</a></li>`;
    });

    return `<ul class="categories">
        ${html}
    </ul>`;
}

exports.list = list;