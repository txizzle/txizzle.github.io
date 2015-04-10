//Image switching
var imageNum = 0;
var imageDir = 'gameimg/';
var answerLat = 0.0;
var answerLong = 0.0;
var score = 0;
var total = 0;


//adding all locations.csv data onto invisible <p> 
d3.csv("locations.csv", function(data) {
    var loc = d3.select(".datas")
        .selectAll("p")
        .data(data)
        .enter()
        .append("p");
});

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
    //Switch image to new one
    var new_image = getNextImage();
    document[place].src = new_image;
    //testing to output new_image into text form
    d3.select("#test").text(new_image);
    
    //Find the current file in ###.JPG form. Save to var currImage
    var captureImageRE = /\d\d\d\.JPG/;
    var currImage = captureImageRE.exec(new_image);
    var answer = d3.selectAll(".datas p")
        .each( function(d) {
            //debugger;
            if (d['c'] == currImage[0]) {
                //alert("found currImage lat and long!");
                answerLat = d['lat'];
                answerLong = d['long'];
                //outputting
                d3.select("#answers").text("Latitude: " + answerLat + " Longitude: " + answerLong);
            }
            //console.log(d);
            });
}

function receiveGuess(inputLat, inputLong) {
    //we calculate the distance between guess and actual with the formula
    //degrees to feet: ft = deg*(10,000km/90deg*3280.4ft/km)
    // distance = (answerLat-guessLat)^0.5 + (answerLong-guessLong)^0.5
    //debugger;
    total += 1;
    var delta = Math.pow((answerLat-inputLat)* 10000 * 3280.4 / 90, 2) + Math.pow((answerLong-inputLong)* 10000 * 3280.4 / 90, 2);
    delta = Math.pow(delta, 0.5);
    score += Math.max(0, Math.round((16000000 - Math.pow(delta, 2))/4000));
    d3.select("#score").text("Score: " + score);
    d3.select("#avgscore").text("Average Score: " + Math.round(score/total));
    d3.select("#lastguess").text("Your last guess was " + Math.round(delta) + "ft off");
    
}


//
// d3.csv("locations.csv", function(d) {
//        d['lat'] = +d["lat"];
//        d['long'] = +d['long'];
//        return d;
//    }, draw);