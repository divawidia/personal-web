import "jquery-validation";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

(function ($) {
    "use strict";

    /**
     Preloader
     **/
    $(window).on("load", function () {
        $("body").imagesLoaded({}, function () {
            var preload = $(".preloader");
            preload.addClass("loaded");
            preload.find(".centrize").fadeOut();

            /**
             init Cursor
             **/
            // initCursor();

            /**
             init Scrolla
             **/
            $(".elementor-widget-text-editor").attr("data-animate", "active");
            $(".scroll-animate").scrolla({
                once: true,
                mobile: true,
            });
        });
    });

    $(function () {
        "use strict";

        /**
         Sections full height
         **/
        setHeightFullSection();
        $(window).resize(function () {
            setHeightFullSection();
        });

        /**
         Parallax
         **/
        $(".js-parallax").jarallax({
            speed: 0.65,
            type: "scroll",
        });

        /**
         Block Line
         **/
        if ($(".v-line").length) {
            $(".v-line .container").append(
                '<div class="v-line-block"><span></span></div>'
            );
            $(".v-line .hero-started").append(
                '<div class="v-line-block"><span></span></div>'
            );
        }

        /**
         Splitting
         **/
        Splitting();

        /**
         Skrollr
         **/
        if ($(window).width() > 1200) {
            var s = skrollr.init();
        }

        /*
            Typed
        */
        $(".subtitle.subtitle-typed").each(function () {
            var subtitleContainer = $(this);

            subtitleContainer.typed({
                stringsElement: subtitleContainer.find(".typing-title"),
                backDelay: 3500 /* Delay in text change */,
                typeSpeed: 0 /* Typing speed */,
                loop: true,
            });
        });

        /**
         Header Sticky
         **/
        if ($(".header").length) {
            $(window).on("scroll", function (event) {
                if ($(window).scrollTop() > 100) {
                    $(".header").addClass("sticky");
                    if (this.oldScroll < this.scrollY) {
                        $(".header").addClass("animate-in");
                    } else {
                        if ($(window).scrollTop() < 200) {
                            $(".header").addClass("animate-out");
                        }
                    }
                } else {
                    $(".header").removeClass("sticky");
                    $(".header").removeClass("animate-in");
                    $(".header").removeClass("animate-out");
                }

                this.oldScroll = this.scrollY;
            });
        }

        function checkScrollDirectionIsUp(event) {
            if (event.wheelDelta) {
                return event.wheelDelta > 0;
            }
            return event.deltaY < 0;
        }

        /**
         Header Switcher Button
         **/
        var skin = "dark";
        if (skin == "light") {
            $("body").removeClass("dark-skin");
            $("body").addClass("light-skin");
        }
        if (skin == "dark") {
            $("body").removeClass("light-skin");
            $("body").addClass("dark-skin");
        }

        if ($("body").hasClass("dark-skin")) {
            $(".header .switcher-btn").addClass("active");
        }
        $(".header").on("click", ".switcher-btn", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $("body").removeClass("dark-skin");
                $("body").addClass("light-skin");
                $.cookie("skin", "light", { expires: 7, path: "/" });
            } else {
                $(this).addClass("active");
                $("body").removeClass("light-skin");
                $("body").addClass("dark-skin");
                $.cookie("skin", "dark", { expires: 7, path: "/" });
            }
            return false;
        });

        /**
         Header Menu Button
         **/
        $(".header").on("click", ".menu-btn", function () {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $(this).addClass("no-touch");
                $(".menu-overlay").addClass("no-touch");
                $("body").removeClass("no-scroll");
                $(".menu-full-overlay").removeClass("is-open");
                $(".menu-full-overlay").removeClass("has-scroll");
                $(".menu-full-overlay").removeClass("animate-active");
                setTimeout(function () {
                    $(".menu-full-overlay").removeClass("visible");
                    $(".menu-btn").removeClass("no-touch");
                    $(".menu-overlay").removeClass("no-touch");
                }, 1000);
            } else {
                $(this).addClass("active no-touch");
                $(".menu-overlay").addClass("no-touch");
                var height = $(window).height();
                $(".menu-full-overlay").css({ height: height });
                $("body").addClass("no-scroll");
                $(".menu-full-overlay").addClass("is-open visible");
                setTimeout(function () {
                    $(".menu-full-overlay").addClass("has-scroll animate-active");
                    $(".menu-btn").removeClass("no-touch");
                    $(".menu-overlay").removeClass("no-touch");
                }, 1000);
            }
            return false;
        });
        $(".menu-full-overlay").on("click", ".menu-overlay", function () {
            $(".menu-btn").removeClass("active");
            $(".menu-btn").addClass("no-touch");
            $(".menu-overlay").addClass("no-touch");
            $("body").removeClass("no-scroll");
            $(".menu-full-overlay").removeClass("is-open");
            $(".menu-full-overlay").removeClass("has-scroll");
            $(".menu-full-overlay").removeClass("animate-active");
            setTimeout(function () {
                $(".menu-full-overlay").removeClass("visible");
                $(".menu-btn").removeClass("no-touch");
                $(".menu-overlay").removeClass("no-touch");
            }, 1000);
            return false;
        });

        /*
            Top Menu
        */
        $(".menu-full").on("click", "a", function () {
            if (!$(this).parent().hasClass("has-children")) {
                $(".header .menu-btn.active").trigger("click");
            }
        });

        /*
            Header Menu Dropdown
        */
        $(".menu-full .has-children > a").append(
            '<i class="fas fa-chevron-down"></i>'
        );
        $(".menu-full").on("click", ".has-children > a", function () {
            if ($(this).closest("li").hasClass("opened")) {
                $(this).closest("li").removeClass("opened");
                $(this).closest("li").addClass("closed");
                $(this).closest("li").find("> ul").slideUp();
            } else {
                $(this)
                    .closest("ul")
                    .find("> li")
                    .removeClass("closed")
                    .removeClass("opened");
                $(this).closest("ul").find("> li").find("> ul").slideUp();
                $(this).closest("li").addClass("opened");
                $(this).closest("li").find("> ul").slideDown();
            }
            return false;
        });

        var $gal_container = $(".m-gallery");
        $gal_container.imagesLoaded(function () {
            $gal_container.isotope({
                itemSelector: ".col-lg-6",
                percentPosition: true,
            });
        });


        function filterItems(itemsClass, itemsCol, filterClass) {
            /*
                Initialize items
            */
            var $container = $(itemsClass);
            $container.imagesLoaded(function () {
                $container.isotope({
                    itemSelector: itemsCol,
                    percentPosition: true,
                });
            });

            /*
                Filter items on button click
            */
            $(filterClass).on("click", "a", function () {
                var filterValue = $(this).attr("data-href");
                $container.isotope({ filter: filterValue });

                $(filterClass+" a").removeClass("active");
                $(this).addClass("active");

                if (!$(filterValue).find(".scroll-animate").hasClass("animate__active")) {
                    $(filterValue).find(".scroll-animate").addClass("animate__active");
                }

                return false;
            });
        }

        /*
            Filter portfolios items
        */
        filterItems(".works-items", ".works-col", ".works-box .filter-links");
        /*
            Filter skills items
        */
        filterItems(".skills-items", ".skills-col", ".skills-box .filter-links");
        /*
            Filter certificates items
        */
        filterItems(".certificates-items", ".certificates-col", ".certificates-box .filter-links");


        $(".has-popup-image").magnificPopup({
            type: "image",
            closeOnContentClick: true,
            mainClass: "mfp-img-mobile",
            image: {
                verticalFit: true,
            },
        });

        /*
            Video popup
        */
        $(".has-popup-video").magnificPopup({
            disableOn: 700,
            type: "iframe",
            iframe: {
                patterns: {
                    youtube_short: {
                        index: "youtu.be/",
                        id: "youtu.be/",
                        src: "https://www.youtube.com/embed/%id%?autoplay=1",
                    },
                },
            },
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            mainClass: "mfp-fade",
            callbacks: {
                markupParse: function (template, values, item) {
                    template.find("iframe").attr("allow", "autoplay");
                },
            },
        });

        /*
            Music popup
        */
        $(".has-popup-audio").magnificPopup({
            disableOn: 700,
            type: "iframe",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            mainClass: "mfp-fade",
        });

        /**
         Tabs
         **/
        $(".tab-menu").on("click", ".tab-btn", function () {
            var tab_bl = $(this).attr("href");

            $(this).closest(".tab-menu").find("li").removeClass("active");
            $(this).closest("li").addClass("active");

            $(this).closest(".tabs").find("> .tab-item").hide();
            $(tab_bl).fadeIn();

            return false;
        });

        /**
         Collapse
         **/
        $(".lui-collapse-item").on("click", ".lui-collapse-btn", function () {
            if ($(this).closest(".lui-collapse-item").hasClass("opened")) {
                $(this).closest(".lui-collapse-item").removeClass("opened");
                $(this).removeClass("active");
            } else {
                $(this).closest(".lui-collapse-item").addClass("opened");
                $(this).addClass("active");
            }
        });

        /**
         Video
         **/
        $(".m-video-large .video").on("click", ".play, .img", function () {
            $(this).closest(".video").addClass("active");
            var iframe = $(this).closest(".video").find(".js-video-iframe");
            largeVideoPlay(iframe);
            return false;
        });
        function largeVideoPlay(iframe) {
            var src = iframe.data("src");
            iframe.attr("src", src);
        }

        /**
         Cart Popup
         **/
        $(".header .cart-btn .cart-icon").on("click", function () {
            if ($(this).closest(".cart-btn").hasClass("opened")) {
                $(this).closest(".cart-btn").removeClass("opened");
                $(this).closest(".cart-btn").find(".cart-widget").hide();
            } else {
                $(this).closest(".cart-btn").addClass("opened");
                $(this).closest(".cart-btn").find(".cart-widget").fadeIn();
            }
            return false;
        });

        /*
            Search
        */
        if ($("#search-input").length) {
            var sjs = SimpleJekyllSearch({
                searchInput: document.getElementById("search-input"),
                resultsContainer: document.getElementById("results-container"),
                json: "/search.json",
            });
        }
    });

    // function initCursor() {
    // 	var mouseX=window.innerWidth/2, mouseY=window.innerHeight/2;

    // 	var cursor = {
    // 		el: $('.cursor'),
    // 		x: window.innerWidth/2,
    // 		y: window.innerHeight/2,
    // 		w: 30,
    // 		h: 30,
    // 		update:function() {
    // 			var l = this.x-this.w/2;
    // 			var t = this.y-this.h/2;
    // 			this.el.css({ 'transform':'translate3d('+l+'px,'+t+'px, 0)' });
    // 		}
    // 	}

    // 	$(window).mousemove (function(e) {
    // 		mouseX = e.clientX;
    // 		mouseY = e.clientY;
    // 	});

    	// $('a, .swiper-pagination, .swiper-button-prev, .swiper-button-next, button, .button, .btn, .lnk').hover(function() {
    	// 	$('.cursor').addClass("cursor-zoom");
    	// }, function(){
    	// 	$('.cursor').removeClass("cursor-zoom");
    	// });

    // 	setInterval(move,1000/60);

    // 	function move() {
    // 		cursor.x = lerp (cursor.x, mouseX, 0.1);
    // 		cursor.y = lerp (cursor.y, mouseY, 0.1);
    // 		cursor.update()
    // 	}

    // 	function lerp (start, end, amt) {
    // 		return (1-amt)*start+amt*end
    // 	}

    // 	/*
    // 		Validate Contact Form
    // 	*/
    // 	if($('.contacts-form').length) {
    // 	$('#cform').validate({
    // 		rules: {
    // 			name: {
    // 				required: true
    // 			},
    // 			message: {
    // 				required: true
    // 			},
    // 			email: {
    // 				required: true,
    // 				email: true
    // 			}
    // 		},
    // 		success: 'valid',
    // 		submitHandler: function() {
    // 			return 1;
    // 		}
    // 	});
    // 	}
    // }

    function setHeightFullSection() {
        var width = $(window).width();
        var height = $(window).height();

        /* Set full height in started blocks */
        $(".error-page, .menu-full-overlay, .preloader .centrize").css({
            height: height,
        });
    }
})(jQuery);
