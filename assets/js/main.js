!(function ($) {
  "use strict";



  // Smooth scroll for the navigation menu and links with .scrollto classes
  var scrolltoOffset = $('#header').outerHeight() - 21;
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();

        var scrollto = target.offset().top - scrolltoOffset;

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 100, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('#header').hasClass('mobile-nav-active')) {
          $('#header').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fal fa-bars far fal fa-times');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });



  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top - scrolltoOffset;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('#header').append($mobile_nav);
    $('#header').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="fal fa-bars"></i></button>');
    $('#header').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function (e) {
      $('#header').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('fal fa-bars far fal fa-times');
      $('.mobile-nav-overly').toggle();
    });

    $(document).on('click', '.mobile-nav .dropdown > a', function (e) {
      e.preventDefault();
      $(this).next().slideToggle(300);
      $(this).parent().toggleClass('active');
    });

    $(document).click(function (e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('fal fa-bars far fal fa-times');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }


  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first, .mobile-menu ul:first li:first").addClass('active');
      }
    });
  });


  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('header').addClass('header-wider');
    } else {
      $('header').removeClass('header-wider');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('header').addClass('header-wider');
  }

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 100, 'easeInOutExpo');
    return false;
  });



  // let movingBoxs = document.querySelectorAll(".ft-box");
  // window.addEventListener('scroll', showText);
  // showText();

  // function showText() {
  //   movingBoxs.forEach(function (e) {
  //     const triggerBottom = window.innerHeight / 5 * 4;
  //     const textTop = e.getBoundingClientRect().top;
  //     if (textTop < triggerBottom) {
  //       e.classList.add("show");
  //     }
  //     else {
  //       e.classList.remove("show");
  //     }
  //   })
  // }


  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false
    });
  }
  $(window).on('load', function () {
    aos_init();
  });

  AOS.init({
    disable: function () {
      var maxWidth = 768;
      return window.innerWidth < maxWidth;
    }
  });


  var swiper = new Swiper(".cover-swiper", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar",
    },
    autoplay: true,
  });


})(jQuery);



function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('.image-upload-wrap').hide();
      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').css("display", "flex");
      $('.image-title').html(input.files[0].name);
    };
    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function removeUpload() {
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
  $('.image-upload-wrap').addClass('image-dropping');
});
$('.image-upload-wrap').bind('dragleave', function () {
  $('.image-upload-wrap').removeClass('image-dropping');
});




