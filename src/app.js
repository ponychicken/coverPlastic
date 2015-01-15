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
var globalIndex = 0;

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

  var newSlogans = $sloganAll.clone();
  
  var $part1 = newSlogans.find('.sloganPart1'), 
      $part2 = newSlogans.find('.sloganPart2'),
      $combined = newSlogans.find('.sloganPart1, .sloganPart2');

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
  var rotate = randomBetween(2, 5);
  var inverted = randomBoolean();
  
  if (inverted) rotate *= -1;
  
  var offsetFirst = (inverted) ? randomBetween(6, 13) : randomBetween(0, 4);
  
  $part1.css({
    transform: 'rotate(' + rotate + 'deg) translate(-20vw, ' + offsetFirst + '%)',
  });
  
  $part2.css({
    transform: 'rotate(' + -1 * rotate + 'deg) translate(-20vw, -2%)',
  });
  
  $combined.css({
    background: color,
    width: '140vw'
  });


  
  // Now also rotate and displace the whole group
  if (globalIndex > 1) {
    var rotate = randomBetween(-30, 30);
    var top = randomBetween(0, 15);
    
    newSlogans.css({
      transform: "rotate("+  rotate + "deg) translateY(" + top + "%)",
    });
  }

  curSlogan++;
  globalIndex++;
  switchColors();
  
  while ($('.slogans').length > 20) {
    $('.slogans').first().remove();
  }
}

setup();

window.setInterval(newSlogan, 4000);

newSlogan();

window.onresize = function () {
  windowHeight = $(window).height();
};
