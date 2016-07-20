var FeedParser = require('feedparser');
var request = require('request');
var feed = 'https://www.google.co.jp/alerts/feeds/11616571285475643084/11661372466047994309';

var req = request(feed);
var feedparser = new FeedParser({});

var items = [];

req.on('response', function(res){
    this.pipe(feedparser);
    });

feedparser.on('meta',function(meta){
    console.log('======== %s ========',meta.title);
    });

feedparser.on('readable', function(){
    while(item = this.read()){
      items.push(item);
    }
    });

feedparser.on('end',function(){
    items.forEach(function(item){
        console.log('- ['+item.title+']'+'('+item.link+')');
        });
    });
