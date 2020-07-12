const fs = require('fs');
const pckYaml = require('js-yaml');

var categories = pckYaml.safeLoad(fs.readFileSync('./' + 'categories.yml', 'utf8'));

function list() {

    var html = '';

    categories.forEach(cat => {
        html += `<li><a href="/categories/${cat.id}.html">${cat.title}</a></li>`;
    });

    return `
    <ul class="categories">
        ${html}
    </ul>`;
}

exports.list = list;