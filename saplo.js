
var config = require('./config');
var urlRequests = require("./urlReq");
var sleep = require('sleep');


var createToken = function(callback) {

    urlRequests.urlReq('https://api.saplo.com/rpc/json', {
        method: 'post',
        params: {
            method: "auth.accessToken",
            params: {
                api_key: config.dev.saplo.api_key,
                secret_key: config.dev.saplo.secret_key
            }
        }
    }, function(body, res){
        var myToken = JSON.parse(body).result.access_token;
        callback(myToken);
    });
}


var getUser = function() {
    console.log("hej");

};

var createText = function(currentArticleContent, articleId) {

        createToken(function(data) {
            console.log("data token in createText: " + 'https://api.saplo.com/rpc/json?access_token=' + data);

            var url = 'https://api.saplo.com/rpc/json?access_token=AT4573873923745824060N';
            console.log(url);
            urlRequests.urlReq(url, {
                method: 'post',
                params: {
                    method: "text.create",
                    params: {
                        body: currentArticleContent,
                        collection_id: config.dev.saplo.collection_id,
                        ext_text_id: articleId
                    }
                }
            }, function(body, res){
                console.log(body);
            });
        });



}

exports.pushArticle = function(article_id, article, callback) {
    console.log("id: " + article_id);
    console.log("art: " + article);
    createText(article, article_id);
}