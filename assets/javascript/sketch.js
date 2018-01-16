var img;
var fileName;

function setup() {
  // put setup code here
  cnv = createCanvas(350, 400);
  cnv.parent('drop');
  background(0,0,0,0);

  	cnv.drop(gotFile);
}

function gotFile(file) {
	filename = file.name;
	img = createImg(file.data);
	// img.size(100, 100);
		img.hide();
	image(img, 0, 0, width, height);
}

