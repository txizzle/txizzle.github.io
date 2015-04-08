//Image switching
var imageNum = 0;
var imageDir = 'gameimg/';

//Hardcoding how many images we have added to imageDir
//Each image needs to have a row in locations table w/ corresponding GPS data
//TODO: detect how many images in imageDir photo and filter how many images for lat/long data in table

var totalImages = 14;
imageArray = [];
for (i = 1; i < totalImages; i++) {
    if (i < 10) {
        imageArray[imageNum++] = new imageItem(imageDir + "00" + i.toString() + ".JPG");
    }
    else if (i < 100) {
        imageArray[imageNum++] = new imageItem(imageDir + "0" + i.toString() + ".JPG");
    }
    else {
        imageArray[imageNum++] = new imageItem(imageDir + i.toString() + ".JPG");
    }
}

//var totalImages = imageArray.length;

function imageItem(image_location) {
    this.image_item = new Image();
    this.image_item.src = image_location;
}

function get_ImageItemLocation(imageObj) {
    return(imageObj.image_item.src);
}

function randNum(x, y) {
    var range = y - x + 1;
    return Math.floor(Math.random() * range) + x;
}

function getNextImage() {
    imageNum = randNum(0, totalImages - 1);

    var new_image = get_ImageItemLocation(imageArray[imageNum]);
    return(new_image);
}

function switchImage(place) {
    var new_image = getNextImage();
    document[place].src = new_image;
}