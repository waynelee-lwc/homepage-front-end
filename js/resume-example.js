$(window).load(function(){
    // Page Load Anim
    $('.contOut').animate({
      'opacity':'1'
    },1200);
    // Jobs Accordion
    $('.fa-plus').closest('.job').find('p').slideUp();
    $('.openBtn').on('click', function() {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open').removeClass('fa-minus').addClass('fa-plus');
        $(this).closest('.job').find('p').animate({
          'opacity':'0'
        },200).slideUp();
      } else {
        $(this).addClass('open').removeClass('fa-plus').addClass('fa-minus');
        $(this).closest('.job').find('p').slideDown().animate({
          'opacity':'1'
        },400);
      }
    });
    
  });