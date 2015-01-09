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
  "What should Consumerism be?",
  "The Battle for Plastic is On!",
  "We Define the Future of Plastic",
  "It’s an Industry in the Making",
  "We can Turn Potentials into Realities"
];

var $part1 = $('#sloganPart1'), $part2 = $('#sloganPart2');
var curSlogan = 0;

var colors = ['#FF0000', '#00C34B', '#005FFF'];

var colorsIndex = localStorage.getItem('colorsIndex') || Math.floor(Math.random() * 2.99);
var color = colors[colorsIndex];

$('h1, h2, #barSlogan1, #barSlogan2').css('background', color);

colorsIndex++;
if (colorsIndex == 3) colorsIndex = 0;

localStorage.setItem('colorsIndex', colorsIndex);

function getBreakPoint(text) {
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

window.setInterval(function () {
  if (curSlogan == slogans.length) {
    curSlogan = 0;
  }

  var text = slogans[curSlogan];
  var parts = getParts(text);
  
  $part1.text(parts[0]);
  $part2.text(parts[1]);
  
  
  curSlogan++;
}, 2000);
