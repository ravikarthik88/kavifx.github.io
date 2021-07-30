/**
* Template Name: Moderna - v2.1.0
* Template URL: https://bootstrapmade.com/free-bootstrap-template-corporate-moderna/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function ($) {
    "use strict";

    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    //Handle resize
    $(window).on('resize', function () {
        resizeFrameVideoBox();
    });

    if ($(window).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
    }

    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function (e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            e.preventDefault();
            var target = $(this.hash);
            if (target.length) {

                var scrollto = target.offset().top;
                var scrolled = 20;

                if ($('#header').length) {
                    scrollto -= $('#header').outerHeight()

                    if (!$('#header').hasClass('header-scrolled')) {
                        scrollto += scrolled;
                    }
                }

                if ($(this).attr("href") == '#header') {
                    scrollto = 0;
                }

                $('html, body').animate({
                    scrollTop: scrollto
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x');
                    $('.mobile-nav-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Mobile Navigation
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="bx bx-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $.each($('.mobile-nav .drop-down > a'), function (key, ele) {
            var $ele = $(ele);
            $ele.append('<span class="nav-drop-down-arrow"></span>');
        });

        $(document).on('click', '.mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x');
            $('.mobile-nav-overly').toggle();
        });

        $(document).on('click', '.mobile-nav .drop-down > a', function (e) {
            if (e.target.nodeName == 'SPAN' || e.currentTarget.href == 'javascript:void(0);' || e.currentTarget.href == '#') {
                e.preventDefault();
                $(this).next().slideToggle(300);
                $(this).parent().toggleClass('active');
            }
        });

        $(document).click(function (e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Intro carousel
    var heroCarousel = $("#heroCarousel");

    heroCarousel.on('slid.bs.carousel', function (e) {
        $(this).find('h2').addClass('animate__animated animate__fadeInDown');
        $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
    });
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
            //$('.free-trial-bottom').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
            //$('.free-trial-bottom').fadeOut('slow');
        }
    });

    $('.back-to-top').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeInOutExpo');
        return false;
    });

    // Initiate the venobox plugin
    $(window).on('load', function () {
        $('.venobox').venobox();
    });

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Skills section
    $('.skills-content').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '80%'
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // Porfolio isotope and filter
    $(window).on('load', function () {
        var portfolioIsotope = $('.portfolio-container').isotope({
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
            aos_init();
        });

    });

    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

    // Initi AOS
    function aos_init() {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Bind active nav item
    function setActiveNavItem() {
        $('.nav-menu li.active').removeClass('active');
        if ($('#navSelectedItem').length > 0) {
            var $navTarget = $($('#navSelectedItem').data('target'));
            if ($navTarget.length > 0) {
                $navTarget.addClass('active');
                if ($navTarget.closest('li.drop-down').length > 0) {
                    $navTarget.closest('li.drop-down').addClass('active');
                    if ($navTarget.closest('li.drop-down').closest('li.drop-down').length > 0) {
                        $navTarget.closest('li.drop-down').closest('li.drop-down').addClass('active');
                    }
                }
            }

            var $mobileNavTarget = $('.mobile-nav ' + $('#navSelectedItem').data('target'));
            if ($mobileNavTarget.length > 0) {
                $mobileNavTarget.addClass($mobileNavTarget.hasClass('drop-down') ? 'activeMob' : 'active');
                if ($mobileNavTarget.closest('li.drop-down').length > 0) {
                    $mobileNavTarget.closest('li.drop-down').addClass('activeMob');
                    if ($mobileNavTarget.closest('li.drop-down').closest('li.drop-down').length > 0) {
                        $mobileNavTarget.closest('li.drop-down').closest('li.drop-down').addClass('activeMob');
                    }
                }
            }
        }
    }
    $(window).on('load', function () {
        aos_init();
        setActiveNavItem();
        resizeFrameVideoBox();
    });

    function resizeFrameVideoBox() {
        //for iframe video
        var videoFrame = $('.frameVideoBox');
        if (videoFrame.length > 0) {
            $.each(videoFrame, function (key, ele) {
                var $ele = $(ele);
                var eleHeight = $ele.width() * 0.5625;
                $ele.height(eleHeight);
            });
        }
    }

    // Added phone number input mask
    var PhoneNumberInputs = document.getElementsByClassName('PhoneNumber-Mask');
    for (var i = 0; i < PhoneNumberInputs.length; i++) {
        PhoneNumberInputs[i].addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            e.target.nextElementSibling.value = x[1] + (!x[2] ? '' : x[2]) + (!x[3] ? '' : x[3]);
        });
        if (PhoneNumberInputs[i].value != '') {
            var x = PhoneNumberInputs[i].value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
            PhoneNumberInputs[i].value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
            PhoneNumberInputs[i].nextElementSibling.value = x[1] + (!x[2] ? '' : x[2]) + (!x[3] ? '' : x[3]);
        }
    }

    // Added US ZIP input mask
    var ZipInputs = document.getElementsByClassName('US-Zip-Mask');
    for (var i = 0; i < ZipInputs.length; i++) {
        ZipInputs[i].addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,5})/);
            e.target.value = x[1];
        });
        if (ZipInputs[i].value != '') {
            var x = ZipInputs[i].value.replace(/\D/g, '').match(/(\d{0,5})/);
            ZipInputs[i].value = x[1];
        }
    }

    // Added Credit Card input mask
    var CreditCardInputs = document.getElementsByClassName('CreditCard-Mask');
    for (var i = 0; i < CreditCardInputs.length; i++) {
        CreditCardInputs[i].addEventListener('input', function (e) {
            //var x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
            //e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,16})/);
            e.target.value = x[1];
        });
    }

    // Added CVV input mask
    var ExpDateInputs = document.getElementsByClassName('ExpDate-Mask');
    for (var i = 0; i < ExpDateInputs.length; i++) {
        ExpDateInputs[i].addEventListener('input', function (e) {
            var x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})/);
            e.target.value = x[1];
        });
    }


    // Added ExpDate input mask
    var ExpDateInputs1 = document.getElementsByClassName('ExpDate-Mask1');
    for (var i = 0; i < ExpDateInputs1.length; i++) {
        ExpDateInputs1[i].addEventListener('input', function (e) {
            event.target.value = event.target.value.replace(
                /^([1-9]\/|[2-9])$/g, '0$1/' // 3 > 03/
            ).replace(
                /^(0[1-9]|1[0-2])$/g, '$1/' // 11 > 11/
            ).replace(
                /^([0-1])([3-9])$/g, '0$1/$2' // 13 > 01/3
            ).replace(
                /^(0?[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2' // 141 > 01/41
            ).replace(
                /^([0]+)\/|[0]+$/g, '0' // 0/ > 0 and 00 > 0
            ).replace(
                /[^\d\/]|^[\/]*$/g, '' // To allow only digits and `/`
            ).replace(
                /\/\//g, '/' // Prevent entering more than 1 `/`
            );
        });
    }


    // Added dollar curreny split span mask
    var currencySplit = document.getElementsByClassName('Currency-Split');
    for (var i = 0; i < currencySplit.length; i++) {
        if (currencySplit[i].textContent != '') {
            var parts = currencySplit[i].textContent.split(".");
            parts[0] = '$' + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            currencySplit[i].textContent = parts.join(".");
        }
    }

    if (typeof jQuery.validator !== 'undefined' && $.isFunction(jQuery.validator)) {
        jQuery.validator.setDefaults({
            errorElement: 'span',
            errorPlacement: function (error, element) {
                error.addClass('invalid-feedback');
                element.closest('.form-group').append(error);
            },
            highlight: function (element, errorClass, validClass) {
                $(element).addClass('is-invalid');
            },
            unhighlight: function (element, errorClass, validClass) {
                $(element).removeClass('is-invalid');
            }
        });

        $.validator.messages.required = function (param, input) {
            return 'The ' + input.name + ' is required';
        }
    }
})(jQuery);

function scrollToElementTop(scrollItem, paddingTop) {
    setTimeout(function () {
        $('body,html').animate({
            scrollTop: $(scrollItem).offset().top - (paddingTop == undefined || paddingTop == null ? 0 : paddingTop)
        }, 400);
    }, 300);
}