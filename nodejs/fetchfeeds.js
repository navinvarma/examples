//TODO: Make this configurable through a seperate jquery dialog, persist to mongodb
var feeds = [
"http://rss.cnn.com/rss/cnn_us.rss",
"http://feeds.bbci.co.uk/news/world/rss.xml",
"http://feeds.feedburner.com/NdtvNews-TopStories",
"http://ibnlive.in.com/ibnrss/top.xml",
"http://www.espncricinfo.com/rss/content/story/feeds/0.xml",
"http://feeds.guardian.co.uk/theguardian/rss",
"http://feeds.huffingtonpost.com/huffingtonpost/raw_feed",
"http://rss.nytimes.com/services/xml/rss/nyt/GlobalHome.xml",
"http://www.thehindu.com/?service=rss"
];

$(document).ready(function(){
	getRandomFeed();
	$('#randomfeed').click(function(){
		getRandomFeed();
	});

});


function getRandomFeed(){
	var url = feeds[Math.floor(Math.random()*feeds.length)];
	$.ajax({
	    url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url),
	    dataType: 'json',
	    success: function(data) {
	      renderFeed(data.responseData.feed);
	    }
	});
}
function renderFeed(feed){
	$("#feedcontent").html("");
	$("#feedcontent").append('<h3>'+feed.title+'</h3>');
	var html='';
	var curEntry=0;
	for(var i=0;i<3;i++){
		html +='<div class="row-fluid">';
		for(var j=0;j<3;j++){
			html +='<div class="span4">';
			html +='<a target="_blank" href="'+feed.entries[curEntry].link+'">'+feed.entries[curEntry].title+'</a>';
			html +='<h6>'+feed.entries[curEntry].publishedDate+'</h6>';
			html +='<p>'+feed.entries[curEntry].contentSnippet+'</p>';
			html +='</div>';
			curEntry++;
		}
		html +='</div>';
	}
	$("#feedcontent").append(html);
	
	//console.log(feed);
}