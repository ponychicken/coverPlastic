var slogans = [
  "The Battle for Plastic Is On!",
  "Who Is Pulling the Strings?",
  "It Is Time to Take Charge!",
  "Is it Really a Makers Revolution?",
  "It is Time to Reclaim Plastic",
  "A Battle Over Your Heart, Mind and Wallet",
  "We Decide What 3D Printing Means",
  "Plastic Is (Again) the Future",
  "Standards Are Still to be Set",
  "What Should Consumerism Be?",
  "The Battle for Plastic Is On!",
  "We Define the Future of Plastic",
  "It’s an Industry in the Making",
  "We Can Turn Potentials into Realities"
];

var $sloganAll = $('.slogans');
    
var curSlogan = 0;

var colors = ['#FF0000', '#00C34B', '#005FFF'];
var colorsIndex = 0;
var color = colors[colorsIndex];

$('h1, h2, #barSlogan1, #barSlogan2').css('background', color);



localStorage.setItem('colorsIndex', colorsIndex);

var barHeight = 0;
var windowHeight = $(window).height();

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

function setup() {
  $sloganAll.removeAttr('style');
  barHeight = $sloganAll.find('.barSlogan1').height();
  $sloganAll.remove();
}

function switchColors() {
  colorsIndex++;
  if (colorsIndex == 3) colorsIndex = 0;
  color = colors[colorsIndex];
}

function newSlogan() {
  switchColors();
  
  var newSlogans = $sloganAll.clone();
  
  var $part1 = newSlogans.find('.sloganPart1'), 
  $part2 = newSlogans.find('.sloganPart2'),
  $combined1 = newSlogans.find('.sloganPart1, .barSlogan1'),
  $combined2 = newSlogans.find('.sloganPart2, .barSlogan2'),
  $bar1 = newSlogans.find('.barSlogan1'),
  $bar2 = newSlogans.find('.barSlogan2'),
  $barsAll = newSlogans.find('.barSlogan1, .barSlogan2');

  $('body').append(newSlogans);
  
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
    newSlogans.children().css('font-size', Math.min(1.9, reduceBy * 2) + 'em');
  }
  
  // Modify position and rotation a bit
  var rotate = randomBetween(2, 4);
  var inverted = randomBoolean();
  
  if (inverted) rotate *= -1;
  
  var offsetFirst = (inverted) ? randomBetween(6, 13) : randomBetween(0, 4);
  var offsetSecond = (inverted) ? randomBetween(30, 42) : randomBetween(35, 44);
  
  // Calculate distance and correct if necessary
  var distance = (offsetSecond * windowHeight / 100) - ((offsetFirst * windowHeight / 100) + barHeight);
  
  // Distance as a ratio of the window height
  var distanceRatio = distance / windowHeight;
  
  if (distanceRatio > 0.2) {
    var desiredChange = distanceRatio / 0.2 * 1.3;
    offsetFirst  *= desiredChange;
    offsetSecond /= desiredChange;
    
    offsetFirst  += desiredChange * 3;
    offsetSecond += desiredChange * 3;
  }
  
  $combined1.css({
    transform: 'rotate(' + rotate + 'deg)',
    top: offsetFirst  + '%'
  });
  
  $combined2.css({
    transform: 'rotate(' + -1 * rotate + 'deg)',
    top: offsetSecond  + '%'
  });
  
  $bar1.css({
    transform: 'rotate(' + rotate + 'deg) translate(-20vw, 0)'
  });
  
  $bar2.css({
    transform: 'rotate(' + -1 * rotate + 'deg) translate(-20vw, 0)'
  });
  
  // Force their height to have the same as the other by filling with invisible Text
  $barsAll.text('A').css({
    color: color,
    background: color
  });
  
  curSlogan++;
  
  
}

setup();

//window.setInterval(updateSlogan, 4000);

//updateSlogan();

window.onresize = function () {
  windowHeight = $(window).height();
};
