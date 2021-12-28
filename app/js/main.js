$(document).ready(function () {
    /*scroll to top*/
    $("body").append("<a href='#' id='to_top'><i class='fa fa-angle-right'></i> <span>back to top</span></a>");
    $("body").on("click", "a#to_top", function () {
        $("#to_top").stop().removeClass("is_visible").addClass("is_hidden").fadeOut(400);
        $("html, body").animate({
            scrollTop: (0)
        }, 600);
    });
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > $(window).height() / 2) {
            if (!$("#to_top").hasClass("is_visible"))
                $("#to_top").stop().removeClass("is_hidden").addClass("is_visible").fadeIn(400);
        } else {
            if (!$("#to_top").hasClass("is_hidden"))
                $("#to_top").stop().removeClass("is_visible").addClass("is_hidden").fadeOut(400);
        }
    });
    
    /*show top-section*/
    if ($(".top-section.d-hidden").length > 0 && $(".content .product").length > 0) {
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            var customize_product = $(".product").offset().top;
            if (scroll > customize_product + 150) {
                if ($(".top-section.d-hidden").css("display") == "none")
                    $(".top-section.d-hidden").stop().slideDown(300);
            } else if ($(".top-section.d-hidden").css("display") == "flex") {
                $(".top-section.d-hidden").stop().slideUp(200);
            } else {
                $(".top-section.d-hidden").stop().slideUp(200);
            }
        });
    }
    
    //Product image modal
    function product_modal_img(current_item) {
        var img_count = $(".product-photo-carousel ul .item").length;
        
        // if (!$(current_item).index())
        //     $("#mainimage_popup .mainimage-content-wrap .mainimage-content .title a.prev_img").addClass("inactive");
        // else $("#mainimage_popup .mainimage-content-wrap .mainimage-content .title a.prev_img").removeClass("inactive");
        if (!$(current_item).index())
            $("#mainimage_popup .modal-body a.prev_img").addClass("inactive");
        else $("#mainimage_popup .modal-body a.prev_img").removeClass("inactive");
        
        // if ($(current_item).index() >= img_count - 1)
        //     $("#mainimage_popup .mainimage-content-wrap .mainimage-content .title a.next_img").addClass("inactive");
        // else $("#mainimage_popup .mainimage-content-wrap .mainimage-content .title a.next_img").removeClass("inactive");
        if ($(current_item).index() >= img_count - 1)
            $("#mainimage_popup .modal-body a.next_img").addClass("inactive");
        else $("#mainimage_popup .modal-body a.next_img").removeClass("inactive");
        
        // $("#mainimage_popup .mainimage-content-wrap .mainimage-img img").attr("src", $(current_item).attr("data-big-img"));
        // $("#mainimage_popup .mainimage-content-wrap .mainimage-content .title").show(0);
        // $("#mainimage_popup .mainimage-content-wrap .mainimage-content .title span").text("Image " + ($(current_item).index() + 1) + " of " + img_count);
        // $("#mainimage_popup .mainimage-content-wrap .mainimage-content .text").text($(current_item).attr("data-title"));
        
        $("#mainimage_popup .mainimage-img img").attr("src", $(current_item).attr("data-big-img"));
        $("#mainimage_popup .text").text($(current_item).attr("data-title"));
        $("#mainimage_popup .description").text($(current_item).attr("data-descr"));
    }
    
    $("#mainimage_popup").on("show.bs.modal", function (e) {
        var current_item = $(".product-photo-carousel .item.selected");
        product_modal_img(current_item);
    });
    $("#mainimage_popup .modal-body").on("click", "a.prev_img:not(.inactive), a.next_img:not(.inactive)", function (e) {
        e.preventDefault();
        var current_item;
        if ($(this).hasClass("prev_img"))
            current_item = $(".product-photo-carousel .item.selected").removeClass("selected").prev(".item").addClass("selected");
        else current_item = $(".product-photo-carousel .item.selected").removeClass("selected").next(".item").addClass("selected");
        product_modal_img(current_item);
    });
    
    //Assembly quote modal - hide and show parent .assembly_quote if it opened
    $(".modal.assembly_quote").on("show.bs.modal", function (e) {
        if ($(".modal.modal--shipping-opns:not(.assembly_quote)").hasClass("show")) $(".modal.modal--shipping-opns:not(.assembly_quote)").removeClass("show").addClass("show_removed");
    });
    $(".modal.assembly_quote").on("hide.bs.modal", function (e) {
        if ($(".modal.modal--shipping-opns:not(.assembly_quote)").hasClass("show_removed")) {
            $(".modal.modal--shipping-opns:not(.assembly_quote)").removeClass("show_removed").addClass("show");
            $(".modal.modal--shipping-opns.assembly_quote").removeClass("request_sent");
            $(".modal.modal--shipping-opns.assembly_quote").find(".content.success_message").fadeOut(0)
            $(".modal.modal--shipping-opns.assembly_quote").find(".content.main_content").fadeIn(300);
        }
    });
    //Display success message by click on Send Request button
    $(".modal.assembly_quote").on("click", ".send_request", function (e) {
        e.preventDefault();
        
        $(this).parents(".assembly_quote").addClass("request_sent");
        $(this).parents(".assembly_quote").find(".content.success_message").fadeIn(300);
        $(this).parents(".assembly_quote").find(".content.main_content").fadeOut(0);
    });
    //buy_gift_certificate click event
    $(".gift-certificate .buy_gift_certificate").on("click", function (e) {
        e.preventDefault();
        
        $("body").addClass("overflow_step_show");
        $(this).parents(".gift-certificate").find(".overflow_step.step1").fadeIn(400);
    });
    $(".gift-certificate .button_section").on("click", ".back", function (e) {
        e.preventDefault();
        
        if ($(this).parents(".overflow_step").hasClass("step1")) {
            $("body").removeClass("overflow_step_show");
            $(this).parents(".overflow_step").fadeOut(400);
        } else if ($(this).parents(".overflow_step").hasClass("step2")) {
            $(this).parents(".overflow_step").fadeOut(400);
            $(this).parents(".gift-certificate").find(".overflow_step.step1").fadeIn(100);
        }
    });
    $(".gift-certificate").on("click", ".next", function (e) {
        e.preventDefault();
        
        // to Checkout
        if ($(this).parents(".overflow_step").hasClass("step1")) {
            $(this).parents(".overflow_step").fadeOut(400);
            $(this).parents(".gift-certificate").find(".overflow_step.step2").fadeIn(100);
        }
        // to Thank you
        else if ($(this).parents(".overflow_step").hasClass("step2")) {
            $(this).parents(".overflow_step").fadeOut(400);
            $(this).parents(".gift-certificate").find(".overflow_step.step3").fadeIn(100);
            
            //---------------
            //Send some data
        }
        // close Thank you
        else if ($(this).parents(".overflow_step").hasClass("step3")) {
            $("body").removeClass("overflow_step_show");
            $(this).parents(".overflow_step").fadeOut(400);
        }
    });
    $(".gift-certificate .amount_section ul.select").on("click", ".custom", function (e) {
        e.preventDefault();
        
        $(this).parents(".custom_select").fadeOut(0).next(".custom_amount").fadeIn(300);
    });
    
    //Product shipping options text overflow
    $(".modal.customize_popup.modal--shipping-opns").on("click", ".combined_shipping,.how_long_shipping", function (e) {
        e.stopPropagation();
        e.preventDefault();
        
        cg_current_modal = $(this).parents(".modal.customize_popup.modal--shipping-opns");
        
        if ($(this).hasClass("combined_shipping")) $(cg_current_modal).find(".combined_shipping_overflow").fadeIn(300);
        else $(cg_current_modal).find(".how_long_shipping_overflow").fadeIn(300);
        // $(cg_current_modal).find(".overflow_fade").fadeIn(300);
        $(cg_current_modal).find(".img_overflow_fade").fadeIn(300);
        
    });
    //back
    $(".modal.customize_popup.modal--shipping-opns").on("click", "a.back", function (e) {
        e.preventDefault();
        
        // $(cg_current_modal).find(".combined_shipping_overflow, .how_long_shipping_overflow, .overflow_fade").fadeOut(300);
        $(cg_current_modal).find(".combined_shipping_overflow, .how_long_shipping_overflow, .img_overflow_fade").fadeOut(300);
    });
    
    //on close modal
    $(".modal.customize_popup.gallery").on("hide.bs.modal", function (e) {
        $(this).find(".hershbergers_hardware_overflow, .img_overflow, .img_overflow_fade").fadeOut(300);
    });
    
    //Enlarge image on customize_product
    $(".product-customize .product-option label .enlarge").on("click", function (e) {
        e.stopPropagation();
        var option_item = $(this).parent("label"),
          option_img = option_item.find("img").attr("src"),
          option_name = option_item.find(".name").clone(),
          option_descr = option_item.find(".descr").clone();
        console.log(option_name);
        $("#pdpzoom_popup").modal("show");
        $("#pdpzoom_popup .mainimage-img img").attr("src", option_img);
        $("#pdpzoom_popup .title").hide(0);
        $("#pdpzoom_popup .text").text("").prepend(option_name);
        if (option_descr != 0) {
            $("#pdpzoom_popup .text").append(option_descr);
        }
    });
    
    //Product customization gallery modal image enlarge
    var cg_current_modal,
      cg_current_item;
    $(".modal.customize_popup.gallery .product-option label .enlarge").on("click", function (e) {
        e.stopPropagation();
        
        cg_current_modal = $(this).parents(".modal.customize_popup.gallery"),
          cg_current_item = $(this).parent("label");
        console.log(cg_current_modal);
        console.log(cg_current_item.find(".name").text());
        var text = cg_current_item.find(".name").text();
        $(cg_current_modal).find('.modal-wrapper .img_overflow .title_wrapper .title').text(text);
        $(cg_current_modal).find('.modal-wrapper .img_overflow .main_img').attr('src', $(cg_current_item).attr('data-big-img'));
        
        $(cg_current_modal).find('.img_overflow, .img_overflow_fade').fadeIn(300);
        
        enlarged_img_pos();
        
    });
    
    //Enlarged image position
    function enlarged_img_pos() {
        var obj = $('.modal.customize_popup.gallery.show .img_overflow, .modal.customize_popup.gallery.show .hershbergers_hardware_overflow'),
          top_offset = $('.modal.customize_popup.gallery.show').scrollTop();
        
        if (top_offset + obj.find('.inner_wrapper').height() > obj.parents('.modal-body').height() - 20)
            top_offset = obj.parents('.modal-body').height() - obj.find('.inner_wrapper').height() - 60;
        
        obj.css('top', top_offset);
    }
    
    if ($('.modal.customize_popup.gallery').length > 0) {
        $('.modal.customize_popup.gallery').scroll(function () {
            enlarged_img_pos();
        });
        $(window).resize(function () {
            enlarged_img_pos();
        });
    }
    
    //back
    $('.modal.customize_popup.gallery .img_overflow').on('click', 'a.back', function (e) {
        e.preventDefault();
        $(cg_current_modal).find('.img_overflow, .img_overflow_fade').fadeOut(300);
    });
    
    //Product customization gallery modal select from the Hershberger’s Hardware Retail Catalog
    $('.modal.customize_popup.gallery').on('click', '.choose_hershbergers_hardware', function (e) {
        e.stopPropagation();
        
        cg_current_modal = $(this).parents('.modal.customize_popup.gallery');
        $(cg_current_modal).find('.hershbergers_hardware_overflow, .img_overflow_fade').fadeIn(300);
        enlarged_img_pos();
    });
    //back
    $('.modal.customize_popup.gallery .hershbergers_hardware_overflow').on('click', 'a.back', function (e) {
        e.preventDefault();
        
        $(cg_current_modal).find('.hershbergers_hardware_overflow, .img_overflow_fade').fadeOut(300);
    });
    
    //on close modal
    $('.modal.customize_popup.gallery').on('hide.bs.modal', function (e) {
        $(this).find('.hershbergers_hardware_overflow, .img_overflow, .img_overflow_fade').fadeOut(300);
    });
    
    /* custom input number */
    $(".ctrl .ctrl-btn").on("click", function () {
        var button = $(this);
        var oldValue = button.parent().find(".ctrl-counter > input").val();
        if (button.text() == "+") {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            // Don't allow decrementing below zero
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().find(".ctrl-counter > input").val(newVal);
    });
    
    // /*review carousel*/
    // $('.review_section .review_carousel').slick({
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 3,
    //     slidesToScroll: 3,
    //     arrows: false,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 slidesToShow: 2,
    //                 slidesToScroll: 2
    //             }
    //         },
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         },
    //         {
    //             breakpoint: 320,
    //             settings: {
    //                 slidesToShow: 1,
    //                 slidesToScroll: 1
    //             }
    //         }
    //     ]
    // });
    //
    // $('.review_section').on('click', '.slick-arrow', function () {
    //     var action = ($(this).hasClass('slick-next')) ? 'slickNext' : 'slickPrev'
    //     $(this).parents('.review_section').find('.review_carousel').slick(action);
    // });
    
    
    $(".btn.dropdown-toggle").removeAttr('title');
    
    /*Testimonials product hover*/
    $(".testimonials .testimonials-product a").on({
        mouseenter: function () {
            $(this).parents(".testimonials-product").find("a[data-id='" + $(this).attr('data-id') + "']").addClass('active');
        },
        mouseleave: function () {
            $(this).parents(".testimonials-product").find("a[data-id='" + $(this).attr('data-id') + "']").removeClass('active');
        }
    });
    /*Testimonials product img special class*/
    $(".testimonials .testimonials-product").each(function () {
        var img_count = $(this).find('.testimonials-img-list a').length;
        
        if (img_count == 1) $(this).find('.testimonials-img-list a').addClass('w-100');
        else if (img_count == 2 || img_count == 4) $(this).find('.testimonials-img-list a').addClass('w-50');
        else if (img_count == 3) $(this).find('.testimonials-img-list a:first-child').addClass('w-75');
        else if (img_count >= 5) $(this).find('.testimonials-img-list a:nth-child(1), .testimonials-img-list a:nth-child(2)').addClass('w-50');
    });
    
    /*scroll to anchor*/
    $('.scroll_anchor').on('click', 'a', function () {
        $('html, body').animate({
            scrollTop: ($($.attr(this, 'href')).offset().top + 2)
        }, 600);
    });
    
    /*Billing address - Same as shipping address*/
    $("#billing_same_as_shipping").change(function () {
        let form = $(this).parents('.d-flex').find('.form-address-billing');
        $(this).next('label').text(function (i, text) {
            return text === "Same as shipping address" ? "Different from Shipping" : "Same as shipping address";
        })
        form.toggle();
    });
    
    $('#same_as_ship_adr').on("click", function (e) {
        e.preventDefault();
        let form = $(this).parents('.d-flex').next('.form-address-billing');
        $(this).text(function (i, text) {
            return text === "Same as shipping address" ? "Different from Shipping" : "Same as shipping address";
        })
        form.toggle();
    });
    
    /* product customization loader*/
    $('#options-form .loading').removeClass('fixed');
    var optionsForm = $('#options-form');
    var optionsFormHeight = optionsForm.height() - 200;
    var optionsFormHeightMobile = optionsForm.height() - 125;
    $(window).scroll(function () {
        if ($(window).scrollTop() < optionsFormHeight) {
            $('#options-form .loading').addClass('fixed');
        } else if (($(window).width() < 768) && $(window).scrollTop() < optionsFormHeightMobile) {
            $('#options-form .loading').addClass('fixed');
        } else {
            $('#options-form .loading').removeClass('fixed');
        }
    });
    
    function initLoaderAnimation() {
        $("#options-form .loading").removeClass("fixed");
        $(window).scroll(function () {
            console.log(optionsFormHeight);
            if ($(window).scrollTop() < optionsFormHeight) {
                $("#options-form .loading").addClass("fixed")
            } else if ($(window).width() < 768 && $(window).scrollTop() < optionsFormHeightMobile) {
                $("#options-form .loading").addClass("fixed")
            } else {
                $("#options-form .loading").removeClass("fixed")
            }
        })
    }
    
    // hide filter option on mobile
    function hideFilterMobile() {
        let desktopView = $(document).width();
        if (desktopView <= "768") {
            // $(".product-filters-list").collapse('hide');
        }
    }
    
    $(function () {
        hideFilterMobile();
        $(window).on("resize", function () {
            // hideFilterMobile();
        });
    });
    
    // product customization option yes/no
    $(".product-option-radio").on('click', function () {
        $(this).toggleClass('selected');
        let inputYes = $(this).find(".custom-control-input.yes");
        let inputNo = $(this).find(".custom-control-input.no");
        if ($(this).hasClass("selected")) {
            inputYes.prop("checked", true);
            inputNo.prop("checked", false);
        } else {
            inputYes.prop("checked", false);
            inputNo.prop("checked", true);
        }
    })
    
    
    //Quantity input type number
    $('.quantity').each(function () {
        let spinner = $(this),
          input = spinner.find('input[type="number"]'),
          btnUp = spinner.find('.quantity__btn--up'),
          btnDown = spinner.find('.quantity__btn--down'),
          min = input.attr('min'),
          max = input.attr('max');
        
        btnUp.click(function () {
            let oldValue = parseFloat(input.val());
            let newVal;
            if (oldValue >= max) {
                newVal = oldValue;
            } else {
                newVal = oldValue + 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
        
        btnDown.click(function () {
            let oldValue = parseFloat(input.val());
            let newVal;
            if (oldValue <= min) {
                newVal = oldValue;
            } else {
                newVal = oldValue - 1;
            }
            spinner.find("input").val(newVal);
            spinner.find("input").trigger("change");
        });
    });
    
    //
    // $('.mobile-close').on("click", function () {
    //     api.close();
    // });
    
    function productModalTabControl() {
        let i,
          items = $('#productSelectTabs > li > .nav-link'),
          pane = $('#productSelectTabsContent > .tab-pane, #productSelectTabsContent > form > .tab-pane ');
        
        // next
        $(".btn-nexttab").on("click", function () {
            for (i = 0; i < items.length; i++) {
                if ($(items[i]).hasClass("active") == true) {
                    break;
                }
            }
            
            if (i < items.length - 1) {
                // for tab
                $(items[i]).removeClass('active');
                $(items[i + 1]).addClass('active');
                // for pane
                $(pane[i]).removeClass('show active');
                $(pane[i + 1]).addClass('show active');
            }
            
        });
        
        // Prev
        $(".btn-prevtab").on('click', function () {
            for (i = 0; i < items.length; i++) {
                if ($(items[i]).hasClass("active") == true) {
                    break;
                }
            }
            if (i != 0) {
                // for tab
                $(items[i]).removeClass('active');
                $(items[i - 1]).addClass('active');
                // for pane
                $(pane[i]).removeClass('show active');
                $(pane[i - 1]).addClass('show active');
            }
        });
    }
    
    $("#select_options").on('shown.bs.modal', function () {
        $('.top-section').show();
        productModalTabControl();
    });
    
    $("#select_options").on('hidden.bs.modal', function () {
        $('.top-section').hide();
    });
    
    
    $("#choose-filter").on("click", function (e) {
        e.preventDefault();
        $("#product-filters-wrap").toggle();
    });
    
    // var sliderOptions = {
    //     dots: false,
    //     infinite: false,
    //     autoplay: false,
    //     autoplaySpeed: 7000,
    //     speed: 800,
    //     slidesToShow: 1,
    // };
    
    
    // Open Fullsize Option
    
    //Product Fabric options show fullscreen function
    function fabricFullSize(current_item) {
        let img_count = $(".fabric-gallery-list .item").length;
        if (!$(current_item).index()) {
            $("#fabric-fullsize  a.prev_img").addClass("inactive");
        } else {
            $("#fabric-fullsize  a.prev_img").removeClass("inactive");
        }
        
        if ($(current_item).index() >= img_count - 1) {
            $("#fabric-fullsize a.next_img").addClass("inactive");
        } else {
            $("#fabric-fullsize a.next_img").removeClass("inactive");
        }
        
        $("#fabric-fullsize .lightgallery-img img").attr("src", $(current_item).find('img').attr('src'));
        $("#fabric-fullsize .lightgallery-content .description").html($(current_item).find(".description").html());
    }
    
    // //Product Fabric options show fullscreen on click to .enlarge
    $(".fabric-gallery-list .enlarge").on("click", function () {
        $(".fabric-gallery-list").addClass("inactive");
        $(".fabric-gallery-list .selected").removeClass("selected");
        $("#fabric-fullsize").addClass('active');
        let pagination = $(this).closest('.product-customize-form').find('.pagination');
        let showAllBtn = $(this).closest('.product-customize-form').find('.show-all--btn');
        pagination.hide();
        showAllBtn.hide();
        let current_item = $(this).closest('.item').addClass("selected");
        fabricFullSize(current_item);
    });
    
    
    //Product Fabric options prev and next arrows
    $("#fabric-fullsize").on("click", "a.prev_img:not(.inactive), a.next_img:not(.inactive)", function (e) {
        e.preventDefault();
        let current_item;
        if ($(this).hasClass("prev_img")) {
            current_item = $(".fabric-gallery-list  .item.selected").removeClass("selected").prev(".item").addClass("selected");
        } else {
            current_item = $(".fabric-gallery-list  .item.selected").removeClass("selected").next(".item").addClass("selected");
        }
        fabricFullSize(current_item);
    });
    
    $(".closeFabricFullsize").on('click', function (e) {
        e.preventDefault();
        let pagination = $(this).closest('.product-customize-form').find('.pagination');
        let showAllBtn = $(this).closest('.product-customize-form').find('.show-all--btn');
        pagination.show();
        showAllBtn.show();
        $(".fabric-gallery-list.inactive").removeClass("inactive");
        $("#fabric-fullsize").removeClass('active');
    });
    $(".fabric-gallery-list .item img").on("click", function () {
        $(".fabric-gallery-list .selected").removeClass("selected");
        let current_item = $(this).closest('.item').addClass("selected");
        fabricFullSize(current_item);
    });
    
    
    $('.toggle-details').on('click', function (e) {
        e.preventDefault();
        const thisParent = $(this).closest('.more-wrapper');
        thisParent.toggleClass("active");
        $(this).find("span").toggleClass("d-none");
        
    });
    
    // mobile mmenu plugin navigation
    let mobBanners = $('.nav-pictures').html(); // get banners from desctop menu and put to mmenu
    let mobileMenu = document.querySelector('#mobile-menu');
    if (mobileMenu) {
        new Mmenu(
          mobileMenu, {
              extensions: [
                  "fx-panels-slide-100",
                  "theme-white",
                  "fullscreen",
              ],
              navbars: [
                  {
                      position: "top",
                      content: [
                          "prev",
                          "title",
                          "close"
                      ]
                  }, {
                      position: "bottom",
                      content: mobBanners,
                  }
              ],
              
              setSelected: true,
              panelNodetype: ["ul", "ol"],
          },
          {});
    }
    
    let zoom = 1;
    
    $('.zoom-in').on('click', function (e) {
        e.preventDefault();
        zoom += 0.1;
        let getTarget = $(this).attr("data-zoom");
        $(getTarget).css({
            '-webkit-transform': 'scale(' + zoom + ')',
            '-moz-transform': 'scale(' + zoom + ')',
            '-ms-transform': 'scale(' + zoom + ')',
            '-o-transform': 'scale(' + zoom + ')',
            'transform': 'scale(' + zoom + ')'
        });
    });
    
    $('.zoom-out').on('click', function (e) {
        e.preventDefault();
        zoom -= 0.1;
        let getTarget = $(this).attr("data-zoom");
        $(getTarget).css({
            '-webkit-transform': 'scale(' + zoom + ')',
            '-moz-transform': 'scale(' + zoom + ')',
            '-ms-transform': 'scale(' + zoom + ')',
            '-o-transform': 'scale(' + zoom + ')',
            'transform': 'scale(' + zoom + ')'
        });
    });
    
    $('.option-selected-list__viewAll').each(function () {
        const max = 2;
        let $this = $(this);
        if ($this.find('li').length > max) {
            $this.find('li:gt(' + max + ')').hide().end().append('<li class="viewAll"><a href="#" class="show_more">Show All</a></li>');
            $this.find('.viewAll').on("click", function (e) {
                e.preventDefault();
                $(this).siblings(':gt(' + max + ')').toggle();
                if ($('.show_more').length) {
                    $(this).html('<a href="#" class="show_less">Show Less</a>');
                } else {
                    $(this).html('<a href="#" class="show_more">Show All</a>');
                }
            });
        }
    });
    
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = this.href.split('#');
        $('.nav a').filter('a[href="#' + target[1] + '"]').tab('show');
    })
    $('#choose-optns').on("click", function () {
        $("html, body").animate({
            scrollTop: $("#nav-tab").offset().top -= 100
        }, 100);
        let target = this.href.split('#');
        console.log(target)
    })
    
    
    $(".selectpicker").selectpicker({
        container: 'body'
    });
    $(function () {
        $('select').selectpicker();
    });
    const homeHeroSliderCfg = {
        // Optional parameters
        loop: false,
        autoplay: true,
        // If we need pagination
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + ' ' + (index + 1) + '">' + "</span>";
            },
        },
        
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    }
    if ($('.home-slider .swiper').length != 0) {
        new Swiper(".home-slider .swiper", homeHeroSliderCfg);
    }
    const relatedSwiperCfg = {
        loop: false,
        autoplay: true,
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    }
    
    
    $(".related-wrap").each(function (index, element) {
        let $this = $(this);
        new Swiper(this, {
            loop: true,
            autoplay: true,
            slidesPerView: 5,
            spaceBetween: 30,
            navigation: {
                nextEl: $this.find(".swiper-button-next")[0],
                prevEl: $this.find(".swiper-button-prev")[0],
            },
            breakpoints: {
                318: {
                    slidesPerView: 1,
                },
                525: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 4,
                },
                1200: {
                    slidesPerView: 5,
                },
            },
        });
    });
    
    
    /*PDP options list slider*/
    let prodCustomSlider = $(".product-customize--slider");
    
    prodCustomSlider.each(function (index, element) {
        let $this = $(this);
        new Swiper(this, {
            loop: false,
            autoplay: false,
            slidesPerView: 5,
            spaceBetween: 30,
            lazyLoading: true,
            noSwiping: true,
            pagination: {
                el: ".swiper-pagination",
                type: "progressbar",
            },
            navigation: {
                nextEl: $this.find(".swiper-button-next")[0],
                prevEl: $this.find(".swiper-button-prev")[0],
            },
            breakpoints: {
                318: {
                    slidesPerView: 2,
                },
                525: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 6,
                },
                1200: {
                    slidesPerView: 7,
                },
            },
            on: {
                init: function () {
                    if (this.slides.length < 7) {
                        // Second way:
                        this.el.classList.add('swiper-no-swiping');
                        this.destroy(false, true);
                    }
                    
                }
            }
        });
    });
    
    /*PDP main slider carousel*/
    let galleryThumbs = new Swiper('.pdpGallery-thumbs', {
        direction: 'horizontal',
        slidesPerView: 3, // показывать по 3 превью
        spaceBetween: 20, // расстояние между слайдами
        freeMode: true, // при перетаскивании превью ведет себя как при скролле
        watchSlidesProgress: true,
        breakpoints: {
            640: {
                direction: 'horizontal',
                slidesPerView: 3,
                spaceBetween: 20,
            },
            768: {
                direction: 'vertical',
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1024: {
                direction: 'vertical',
                slidesPerView: 5,
                spaceBetween: 10,
            },
        },
    });
    
    let galleryTop = new Swiper('.pdpGallery-top', {
        // slidesPerView: 1, // показывать по 1 изображению
        mousewheel: true, // можно прокручивать изображения колёсиком мыши
        grabCursor: true, // менять иконку курсора
        navigation: {
            nextEl: '.pdpGallery-top .swiper-button-next',
            prevEl: '.pdpGallery-top .swiper-button-prev',
        },
        thumbs: { // указываем на превью слайдер
            swiper: galleryThumbs // указываем имя превью слайдера
        }
    });
    
    
    /*PDP options list Main Product LightGallery*/
    let productGallery = document.getElementById('product-gallery');
    let realIndexSlider;
    let productGalleryDynamic = [];
    if (productGallery) {
        let productGalleryItems = productGallery.getElementsByClassName('pdpGallery-item');
        for (let i = 0; i < productGalleryItems.length; i++) {
            const item = productGalleryItems[i];
            productGalleryDynamic[i] = {
                src: item.getAttribute('data-src'),
                thumb: item.getAttribute('data-src'),
                subHtml: item.getAttribute('data-sub-html'),
                
            };
        }
        
        let productGalleryLight = lightGallery(productGallery, {
            dynamic: true,
            selector: '.pdpGallery-item',
            autoplayFirstVideo: false,
            pager: false,
            galleryId: "nature",
            subHtmlSelectorRelative: true,
            appendSubHtmlTo: '.lg-item',
            // plugins: [lgZoom, lgThumbnail, lgAutoplay, lgVideo, lgFullscreen, lgHash],
            plugins: [lgZoom, lgThumbnail],
            mobileSettings: {
                controls: true,
                showCloseIcon: true,
                download: true,
                rotate: false
            },
            dynamicEl: productGalleryDynamic,
        });
        
        let viewGalleryBtn = document.getElementById('view-gallery');
        let viewGalleryZoom = document.getElementById('product-gallery-zoom');
        let openGalleryPopup = function (e) {
            realIndexSlider = productGallery.getElementsByClassName('swiper-slide-active');
            realIndexSlider = Number(realIndexSlider[0].getAttribute('data-swiper-slide-index'));
            productGalleryLight.openGallery(realIndexSlider);
        };
        viewGalleryBtn.addEventListener('click', function (e) {
            openGalleryPopup();
        });
        viewGalleryZoom.addEventListener('click', function (e) {
            openGalleryPopup();
        });
        
    }
    
    /*PDP options list Fabric modal slider*/
    let fabricGallery = document.getElementById('fabric-full-size');
    let realIndexFabric;
    let fabricGalleryDynamic = [];
    let fabricGalleryItems = fabricGallery.getElementsByClassName('fabric-gallery__item');
    const $lgContainer = document.getElementById("fabric-full-size-container");
    
    for (let i = 0; i < fabricGalleryItems.length; i++) {
        const item = fabricGalleryItems[i];
        
        fabricGalleryDynamic[i] = {
            src: item.getAttribute('data-src'),
            // subHtml: item.getAttribute('data-sub-html'),
            subHtml: '<h4 class="name">' + item.getAttribute('data-title') + '</h4>',
        };
    }
    const inlineGallery = lightGallery($lgContainer, {
        container: $lgContainer,
        dynamic: true,
        // Turn off hash plugin in case if you are using it
        // as we don't want to change the url on slide change
        hash: false,
        // Do not allow users to close the gallery
        closable: true,
        // Add maximize icon to enlarge the gallery
        showMaximizeIcon: true,
        // Append caption inside the slide item
        subHtmlSelectorRelative: true,
        // to apply some animation for the captions (Optional)
        appendSubHtmlTo: ".lg-item",
        // Delay slide transition to complete captions animations
        // before navigating to different slides (Optional)
        // You can find caption animation demo on the captions demo page
        counter: false,
        // defaultCaptionHeight: 80,
        download: false,
        enableDrag: false,
        height: "100%",
        hideControlOnEnd: true,
        showCloseIcon: true,
        fullScreen: false,
        loop: false,
        dynamicEl: fabricGalleryDynamic,
    });
    
    function openFabricLightGallery(count) {
        console.log(count);
        inlineGallery.openGallery(count);
    }
    
    let fabricModalList = $('#fabric-full-size');
    $('.openFullSize').on('click', function (e) {
        let thisModal = $(this).closest('.modal');
        let findIndexCheckedFabric = fabricModalList.find("input:checked").parent().parent().index();
        
        realIndexFabric = findIndexCheckedFabric;
        openFabricLightGallery(realIndexFabric);
        console.log(thisModal);
        thisModal.find('.modal-header').addClass('d-none');
        thisModal.find('.modal-body').addClass('d-none');
        thisModal.find('.modal-footer').addClass('d-none');
        
        $("#fabric-full-size-container").addClass('d-block');
    })
    $('.closeFullSize').on('click', function (e) {
        $(this).parent().removeClass('d-block');
        let thisModal = $(this).closest('.modal');
        thisModal.find('.modal-header').removeClass('d-none');
        thisModal.find('.modal-body').removeClass('d-none');
        thisModal.find('.modal-footer').removeClass('d-none');
        // inlineGallery.destroy();
        // let findIndexCheckedFabric = $('#fabric-full-size').find("input:checked").parent().parent().index();
        // realIndexFabric = findIndexCheckedFabric + 1;
    })
    
    
    $('.modal').on('show.bs.modal', function (e) {
        var button = e.relatedTarget;
        if ($(button).hasClass('no-modal')) {
            e.stopPropagation();
        }
    });
    
    
});

