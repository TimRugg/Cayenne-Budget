var img;
var fileName;

function setup() {
  // put setup code here
  cnv = createCanvas(200, 300);
  cnv.parent('drop');
  background(0);

  	cnv.drop(gotFile);
}

function gotFile(file) {
	filename = file.name;
	img = createImg(file.data);
	// img.size(100, 100);
		img.hide();
	image(img, 0, 0, width, height);
}

// function saveToDrive() {
//  $('.g-savetodrive').attr('data-src=', img);
// }
// function draw() {
//   // put drawing code here
// }

$('.g-savetodrive').on('click', function() {
		$('.g-savetodrive').attr('data-src=', img);
		$('.g-savetodrive').data('filename', fileName);

});