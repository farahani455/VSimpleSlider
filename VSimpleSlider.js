 (function ($) {
        let checkAutoPlay;
        $.fn.extend({
            simpleSlider: function (option, callback) {
                var defaultOption = {
                    elem: this,
                    autoplay: true,
                    slideTime:6000,
                    dots: true
                },
                    settings = $.extend(option, defaultOption);
                init(settings);

            }
        })
        function init(settings) {
            $(settings.elem).find("ul").addClass("main-simple-slider");
            $(settings.elem).find("ul.main-simple-slider > li:eq(0)").addClass("active-slide");
            createDots(settings);
            if( settings.autoplay) {
                checkAutoPlay=  setInterval(function(){
                    nextSlide(settings);
                },settings.slideTime)
            }
            $(settings.elem).on("click",".simple-slider-dots > li",function(){
               
                nextSlide(settings,$(this).index());
            })
        }
        function createDots(settings) {
            if (!settings.dots) return
            var countSlider = calcSlideCount(settings);
            var dotsElement = document.createElement("ul");
            dotsElement.className = "simple-slider-dots";
            $(settings.elem).append(dotsElement);
            for (var i = 0; i < countSlider; i++) {
                var liDots = document.createElement("li");
                if (i == 0) { liDots.className = "slick-active" }
                liDots.innerHTML='<span>'+(i+1)+'</span>'
                $(dotsElement).append(liDots)
            }
        }
        function nextSlide(settings,index){
            var screenWidth =$(window).width(); 
            var slideNumber= (index||$(settings.elem).find(".active-slide").index()+1 );
            if(slideNumber === calcSlideCount(settings)) slideNumber=0
            $(settings.elem).find(" .simple-slider-dots >li").removeClass("slick-active");
            $(settings.elem).find(" .simple-slider-dots >li").eq(slideNumber).addClass("slick-active");
            $(settings.elem).find(".active-slide").removeClass("active-slide");
            $(settings.elem).find("ul.main-simple-slider > li:eq("+slideNumber+")").addClass("active-slide");
            (settings.elem).find("ul.main-simple-slider").css({"transform":"translate3d("+(screenWidth*slideNumber)+"px, 0px, 0px)"});
        }
        function calcSlideCount(settings) {
            return $(settings.elem).find(".main-simple-slider > li").length
        }
    })(jQuery)
 