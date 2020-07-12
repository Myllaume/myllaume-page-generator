const fs = require('fs');
const pckMoment = require('moment');

function tagMarkup(prefixOntology, tags) {
    var tagsHtml = '';

    tags.forEach(function(tag) {
        tagsHtml += `<meta ${prefixOntology} content="${tag}">`;
    })

    return tagsHtml;
}

function fullHead(metas, genType = 'post') {

    switch (genType) {
        case 'main':
            var schema = `{"@context":"https://schema.org","@type":"WebSite","name":"Myllaume","headline":"Base de connaissance Guillaume Brioudes","url":"https://myllaume.fr/","image":"https://myllaume.fr/assets/image/image-rs.jpg","inLanguage":"fr","keywords":"${metas.keyword.join(',')}","datePublished":"${metas.date.publish}","dateModified":"${metas.date.update}","description":"${metas.description}","identifier":"https://myllaume.fr/","license":"https://creativecommons.org/licenses/by-nc/2.0/fr/","creator":{"@type":"Person","name":"Guillaume Brioudes","identifier":"https://myllaume.fr/","nationality":"France","jobTitle":"Web developper","email":"guillaume.brioudes@myllaume.fr"},"mainEntityOfPage":{"@type":"CreativeWork","name":"Documentation et développement web","abstract":"Rédaction sur la documentation ou le développement web comme deux pratiques d'architecture de l'information."}}`;
            pageTitle = metas.title;
            break;
        case 'categorie':
            var schema = `{"@context":"https://schema.org","@type":"WebSite","name":"Myllaume","headline":"Base de connaissance Guillaume Brioudes","url":"https://myllaume.fr/","image":"https://myllaume.fr/assets/image/image-rs.jpg","inLanguage":"fr","keywords":"${metas.keyword.join(',')}","datePublished":"${metas.date.publish}","dateModified":"${metas.date.update}","description":"${metas.description}","identifier":"https://myllaume.fr/","license":"https://creativecommons.org/licenses/by-nc/2.0/fr/","creator":{"@type":"Person","name":"Guillaume Brioudes","identifier":"https://myllaume.fr/","nationality":"France","jobTitle":"Web developper","email":"guillaume.brioudes@myllaume.fr"},"mainEntityOfPage":{"@type":"CreativeWork","name":"Documentation et développement web","abstract":"Rédaction sur la documentation ou le développement web comme deux pratiques d'architecture de l'information."}}`;
            pageTitle = 'Catégorie' + ' — Myllaume';
            break;
        case 'post':
            var schema = `{"@context":"https://schema.org","@type":"BlogPosting","name":"${metas.title}","headline":"${metas.title}","url":"https://myllaume.fr/post/${metas.path}","articleSection":"${metas.categorie}","image":"https://myllaume.fr/assets/image/image-rs.jpg","inLanguage":"fr","keywords":"${metas.keyword.join(',')}","datePublished":"${metas.date.publish}","dateModified":"${metas.date.update}","description":"${metas.description}","identifier":"https://myllaume.fr/post/${metas.path}","license":"https://creativecommons.org/licenses/by-nc/2.0/fr/","author":{"@type":"Person","name":"Guillaume Brioudes","identifier":"https://myllaume.fr/","nationality":"France","jobTitle":"Web developper","email":"guillaume.brioudes@myllaume.fr"},"mainEntityOfPage":{"@type":"CreativeWork","name":"Documentation et développement web","abstract":"Rédaction sur la documentation ou le développement web comme deux pratiques d'architecture de l'information."},"publisher":{"@type":"Organization","name":"Myllaume","email":"guillaume.brioudes@myllaume.fr","logo":"https://myllaume.fr/assets/image/logo-myllaume.svg","identifier":"https://myllaume.fr/","url":"https://myllaume.fr/","funder":{"@type":"Person","name":"Guillaume Brioudes","identifier":"https://myllaume.fr/"}}}`;
            pageTitle = metas.title + ' — Myllaume';
            break;
    }

    return `
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<title>${pageTitle}</title>
<meta name="description" content="${metas.description}">
<meta name="author" content="${metas.author}">
<meta name="generator" content="https://github.com/Myllaume/myllaume-page-generator 0.1.0">

<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png">
<link rel="manifest" href="/assets/favicon/site.webmanifest">
<link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="/assets/favicon/favicon.ico">
<meta name="apple-mobile-web-app-title" content="Myllaume">
<meta name="application-name" content="Myllaume">
<meta name="msapplication-TileColor" content="#2b5797">
<meta name="msapplication-config" content="/assets/favicon/browserconfig.xml">
<meta name="theme-color" content="#ffffff">
<meta name="theme-color" content="#37542F">

<meta property="og:title" content="${metas.title}">
<meta property="og:description" content="${metas.description}">
<meta property="og:type" content="article">
<meta property="og:url" content="https://myllaume.fr/post/${metas.path}">
<meta property="og:image" content="https://myllaume.fr/assets/image/image-rs.jpg">
<meta property="og:site_name" content="Myllaume">

<meta property="article:published_time" content="${metas.date.publish}">
<meta property="article:modified_time" content="${metas.date.update}">
<meta property="article:author" content="${metas.author}">
<meta property="article:publisher" content="https://myllaume.fr/">
<meta property="article:section" content="${metas.categorie}">

${tagMarkup('property="article:tag"', metas.keyword)}

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://myllaume.fr/assets/image/image-rs.jpg">
<meta name="twitter:title" content="${metas.title}">
<meta name="twitter:description" content="${metas.description}">
<meta name="twitter:creator" content="@guill_brioudes">

<meta itemprop="name" content="${metas.title}">
<meta itemprop="description" content="${metas.description}">
<meta itemprop="datePublished" content="${metas.date.publish}">
<meta itemprop="dateModified" content="${metas.date.update}">
<meta itemprop="image" content="https://myllaume.fr/assets/image/image-rs.jpg">

${tagMarkup('itemprop="keywords"', metas.keyword)}

<script type="application/ld+json">${schema}</script>

<meta name="DC.Title" content="${metas.title}">
<meta name="DC.Creator" content="${metas.author}">
<meta name="DC.Subject" content="${metas.title}">
<meta name="DC.Description" content="${metas.description}">
<meta name="DC.Publisher" content="https://myllaume.fr/">
<meta name="DC.Date" content="${pckMoment(metas.date.publish).format('YYYY-MM-DD')}">
<meta name="DC.Format" content="text/html">
<meta name="DC.Identifier" content="https://myllaume.fr/post/${metas.path}">
<meta name="DC.Source" content="https://myllaume.fr/">
<meta name="DC.Language" content="fr">
<meta name="DC.Coverage" content="${pckMoment(metas.date.publish).format('YYYY')}">
<meta name="DC.Rights" content="CC BY-NC">`;
}

exports.fullHead = fullHead;