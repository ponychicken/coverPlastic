var slogans = [
  "The Battle for Plastic is On!",
  "Who is Pulling the Strings?",
  "It is Time to Take Charge!",
  "Is it Really a Makers Revolution?",
  "It is Time to Reclaim Plastic",
  "A Battle over Your Heart, Mind and Wallet",
  "We Decide what 3D Printing Means",
  "Plastic is (Again) the Future",
  "Standards are still to be Set",
  "What should  Consumerism be?",
  "The Battle for Plastic is On!",
  "We Define the Future of Plastic",
  "It’s an Industry in the Making",
  "We can Turn Potentials into Realities"
];

var $part1 = $('#sloganPart1'), 
    $part2 = $('#sloganPart2'),
    $combined1 = $('#sloganPart1, #barSlogan1'),
    $combined2 = $('#sloganPart2, #barSlogan2'),
    $bar1 = $('#barSlogan1'),
    $bar2 = $('#barSlogan2');
    $sloganAll = $combined1.add($combined2);
    $barsAll = $bar1.add($bar2);
    
var curSlogan = 0;

var colors = ['#FF0000', '#00C34B', '#005FFF'];

var colorsIndex = localStorage.getItem('colorsIndex') || Math.floor(Math.random() * 2.99);
var color = colors[colorsIndex];

$('h1, h2, #barSlogan1, #barSlogan2').css('background', color);

colorsIndex++;
if (colorsIndex == 3) colorsIndex = 0;

localStorage.setItem('colorsIndex', colorsIndex);

function getBreakPoint(text) {
  if (text.indexOf("  ") != -1) {
    return text.indexOf("  ");
  }
  
  var middle = Math.floor(text.length / 2);
  var found = false;
  var dist = 0;
  var pos;
  
  while (!found) {
    if (text[middle + dist] == " ") {
      pos = middle + dist;
      found = true;
    } else if (text[middle - dist] == " ") {
      pos = middle - dist;
      found = true;
    } else {
      dist++;
    }
  }
  
  return pos;
}

function getParts(text) {
  var breakpoint = getBreakPoint(text);
  return [
    text.substring(0, breakpoint),
    text.substring(breakpoint, text.length)
  ];
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function randomBoolean() {
  return Math.random() < 0.5;
}

function randomNegative() {
  return randomBoolean() ? -1 : 1;
}

window.setInterval(function () {
  $sloganAll.removeAttr('style');
  
  if (curSlogan == slogans.length) {
    curSlogan = 0;
  }

  var text = slogans[curSlogan];
  var parts = getParts(text);
  
  $part1.html(parts[0]);
  $part2.html(parts[1]);
  
  // Get width and reduce fontsize if necessary
  var width1 = $part1.width();
  var width2 = $part2.width();
  var screenWidth = $(window).width();
  
  if (width1 > screenWidth * 0.8 || width2 > screenWidth * 0.8) {
    // Which one is larger
    var largestWidth = Math.max(width1, width2);
    var reduceBy = screenWidth * 0.9 / largestWidth;
    
    // Normally font size is 2em
    $sloganAll.css('font-size', Math.min(1.9, reduceBy * 2) + 'em');
  }
  
  // Modify position and rotation a bit
  var rotate = randomBetween(2, 4);
  var inverted = randomBoolean();
  
  if (inverted) rotate *= -1;
  
  $combined1.css({
    transform: 'rotate(' + rotate + 'deg)',
    top: (inverted) ? randomBetween(6, 13)  + '%': randomBetween(0, 4) + '%'
  });
  
  $combined2.css({
    transform: 'rotate(' + -1 * rotate + 'deg)',
    top: (inverted) ? randomBetween(30, 42)  + '%': randomBetween(35, 44) + '%'
  });
  
  $bar1.css({
    transform: 'rotate(' + rotate + 'deg) translate(-20vw, 0)'
  });
  
  $bar2.css({
    transform: 'rotate(' + -1 * rotate + 'deg) translate(-20vw, 0)'
  });
  
  $barsAll.css('background', color);
  
  curSlogan++;
}, 1500);
