var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    handlebars = require('handlebars'),
    readJSON   = require('./lib/metalsmith-readJSON');

Metalsmith(__dirname)
    .use(markdown())
    .use(readJSON())
    .use(templates('handlebars'))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })