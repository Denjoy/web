// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 800, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  }); 

jQuery(document).ready(function() {
  var offset = 200;
  var duration = 300;
  jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() > offset) {
      jQuery('.back-to-top').fadeIn(duration);
    } else {
      jQuery('.back-to-top').fadeOut(duration);
    }
  });
 
 jQuery('.back-to-top').click(function(event) {
  event.preventDefault();
  jQuery('html, body').animate({scrollTop: 0}, duration);
  return false;
 })
});

var sections = ["fjSlides", "dcSlides", "apSlides", "rlSlides"];
var intervals = new Array();
var randoms = new Array();

function restart(hsn, i) { 
    intervals[i] = setInterval(function () {
        var total = $(hsn + ' > div').length
        var previous = randoms[i]
        var random = Math.floor(Math.random() * total);
        if (random == randoms[i]) {
            random = (random + 1) % total 
        }
        randoms[i] = random
        $(hsn + ' > div').eq(random)
            .fadeIn(300);
        $(hsn + ' > div').eq(previous)
            .hide();
    }, 2000);
}

function stop(i) {
    clearInterval(intervals[i]);
}

$(function () {
    for (var i = 0; i < sections.length; i++) {
        var hash_section_name = '#' + sections[i];
        $(hash_section_name + ' > div').hide();
        restart(hash_section_name, i);
    }
});

