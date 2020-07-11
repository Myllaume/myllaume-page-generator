const fs = require('fs');
const pckYaml = require('js-yaml');

function list() {
    var categories = pckYaml.safeLoad(fs.readFileSync('./' + 'config.yml', 'utf8')).categorie;

    var html = '';

    categories.forEach(cat => {
        html += `<li><a href="./categories/${cat}.html">${cat}</a></li>`;
    });

    return `<ul class="categories">
        ${html}
    </ul>`;
}

exports.list = list;