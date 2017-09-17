var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    handlebars = require('handlebars'),
    readJSON   = require('./lib/metalsmith-readJSON');

Metalsmith(__dirname)
    .use(markdown())
    .use(readJSON())
    .use(templates({
        engine: 'handlebars',
        directory: 'templates',
        default: 'page.hbt'
    }))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })