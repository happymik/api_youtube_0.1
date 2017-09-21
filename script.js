

// Searchbar handler
$(function() {
	
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
})


function search() {
	// Clear results
	$('#results').html('');
	$('#buttons').html('');

	//Get Form Input
	q = $('#query').val();

	// Run Get Request on API
	$.get(

		"https://www.googleapis.com/youtube/v3/search", {
			part: 'snippet, id',
			q: q,
			type: 'video',
			key: 'AIzaSyBF6qXL2zUnSDG_C9kFxyvnkXBLeFZjd4E'},
			function(data) {
				let nextPageToken = data.nextPageToken;
				let prevPageToken = data.prevPageToken;
				//Log Data
				console.log(data);

			$.each(data.items, function(i, item){
				//Get Output
				let output = getOutput(item);

				// Display results
				$('#results').append(output);
			});

			}

	);
}

// Build Output

function getOutput(item) {
	let videoId = item.id.videoId;
	let title = item.snippet.title;
	let description = item.snippet.description;
	let thumb = item.snippet.thumbnails.high.url;
	let channelTitle = item.snippet.channelTitle;
	let videoDate = item.snippet.publishedAt;

// Output string
	let output = '<li>' +
	'<div class="list-left">' + 
	'<img src="'+thumb+'">' + 
	'</div>' +
	'<div class="list-right">' +
	'<h3>'+title+'</h3>' +
	'<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
	'<p>'+description+'</p>' +
	'</div>' +
	'</li>' +
	'<div class="clearfix"></div>' +
	'';
	return output;
}	


