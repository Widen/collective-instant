'use strict';

var $ = function $(selector) {
    // thx @rnicholus!
    var selectorType = 'querySelectorAll';

    if (selector.indexOf('#') === 0) {
        selectorType = 'getElementById';
        selector = selector.substr(1, selector.length);
    }

    return document[selectorType](selector);
};

var dom_ready = require('detect-dom-ready'),
    cookie = require('cookie-cutter'),
    console_stream = require('console-stream'),
    bole = require('bole'),
    pretty = require('bistre')(),
    log = bole('collective-instant'),
    collective = require('media-collective');

bole.output({ level: 'debug', stream: pretty });
pretty.pipe(console_stream());

dom_ready(function domready() {

    var access_token = cookie.get('access_token');
    var collective_options = {
        protocol: 'http',
        port: 8080,
        host: 'localhost',
        auth: {
            type: 'bearer',
            bearer: access_token
        }
    };

    var search_input = $('#search_input'),
        app = $('#app');

    search_input.addEventListener('keypress', function(e){
        if (search_input.value && search_input.value.length > 3) {
            collective.json('GET', '/asset/search/:query', {
                query: search_input.value
            }, collective_options)
            .then(function(res){

                var previewUrls = [];
                if (res.body) {
                    var assets = res.body.assets || [];
                    previewUrls = assets.map(function(asset){
                        var previews = asset.previews || [];
                        if (previews && previews.preview300) {
                            return asset.previews.preview600;
                        }
                        return null;
                    }).filter(function(previewUrl){
                        return previewUrl && previewUrl.length > 0;
                    });
                }
                return previewUrls;
            }, function(err){
                log.info('Rejected', err);
            }).then(function(previewUrls){

                var imgTags = previewUrls.map(function(previewUrl){
                    var imgTag = document.createElement('img');
                    imgTag.src = previewUrl.replace(/^https/, 'http');
                    return imgTag;
                });


                var imgsContainer = document.createElement('div');

                imgTags.forEach(function(imgTag){
                    imgsContainer.appendChild(imgTag);
                });

                app.innerHTML = '';
                app.appendChild(imgsContainer);
            });
        }
    });


});


