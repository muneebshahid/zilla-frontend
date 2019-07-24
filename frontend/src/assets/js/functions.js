function apusCore($, option) {
  "use strict";

  if (!$.apusThemeExtensions) $.apusThemeExtensions = {};

  function ApusThemeCore(option) {
    var self = this;
    if (option === 1) {
      self.init();
    } else {
      self.init2();
    }
  }

  ApusThemeCore.prototype = {
    /**
     *  Initialize
     */
    init2: function() {
      var self = this;
      this.findgo_opts = {
        ajaxurl: "",
        time_format: "g:i a",
        closed_text: "Closed",
        next: "Next",
        previous: "Previous"
      };
      self.initSlick($("[data-carousel=slick]"));
      setTimeout(function() {
        self.layzyLoadImage();
      }, 500);
    },

    init: function() {
      var self = this;
      this.findgo_opts = {
        ajaxurl: "",
        time_format: "g:i a",
        closed_text: "Closed",
        next: "Next",
        previous: "Previous"
      };

      // slick init
      // self.initSlick($("[data-carousel=slick]"));

      // Unveil init

      // isoto
      self.initIsotope();
      self.initCounterUp();

      // Sticky Header
      self.intChangeHeaderMarginTop();
      self.initHeaderSticky();

      // back to top
      self.backToTop();

      // popup image
      self.popupImage();

      self.preloadSite();

      self.initGmap3();

      $('[data-toggle="tooltip"]').tooltip();

      self.initMobileMenu();

      self.userLoginRegister();

      self.loadExtension();

      $("#primary-menu li a").on("click", function(e) {
        var href = $(this).attr("href");
        window.location.href = href;
      });

      setTimeout(function() {
        self.changePaddingTopMobileContent();
      }, 50);
      $(window).resize(function() {
        self.changePaddingTopMobileContent();
      });
    },
    changePaddingTopMobileContent: function() {
      if ($(window).width() < 1025) {
        var header_h = $("#apus-header-mobile").outerHeight();
        $("#apus-main-content").css({ "padding-top": header_h - 10 });
        $(".listings-filter-wrapper,.listings-detail-wrapper").css({ top: header_h });
        $(".listings-filter-wrapper,.listings-detail-wrapper").css({
          height: "calc(100% - " + header_h + "px)"
        });
      } else {
        $(".listings-filter-wrapper,.listings-detail-wrapper").css({ top: "96px" });
        $(".listings-filter-wrapper,.listings-detail-wrapper").css({ height: "calc(100% - 96px)" });

        if ($("#apus-listing-map").is(".fix-map")) {
          return false;
        } else {
          $("#apus-main-content").css({ "padding-top": 0 });
        }
      }
    },
    /**
     *  Extensions: Load scripts
     */
    loadExtension: function() {
      var self = this;

      if ($.apusThemeExtensions.shop) {
        $.apusThemeExtensions.shop.call(self);
      }

      if ($.apusThemeExtensions.listing) {
        $.apusThemeExtensions.listing.call(self);
      }
    },
    initSlick: function(element) {
      var self = this;
      element.each(function() {
        var config = {
          infinite: false,
          arrows: $(this).data("nav"),
          dots: $(this).data("pagination"),
          slidesToShow: 4,
          slidesToScroll: 4,
          prevArrow:
            "<button type='button' class='slick-arrow slick-prev pull-left'><i class='fa fa-angle-left' aria-hidden='true'></i></span><span class='textnav'>" +
            self.findgo_opts.previous +
            "</span></button>",
          nextArrow:
            "<button type='button' class='slick-arrow slick-next pull-right'><span class='textnav'>" +
            self.findgo_opts.next +
            "</span><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
        };

        var slick = $(this);
        if ($(this).data("items")) {
          config.slidesToShow = $(this).data("items");
          config.slidesToScroll = $(this).data("items");
        }
        if ($(this).data("loop")) {
          config.infinite = true;
        }
        if ($(this).data("vertical")) {
          config.vertical = true;
        }
        if ($(this).data("rows")) {
          config.rows = $(this).data("rows");
        }
        if ($(this).data("asnavfor")) {
          config.asNavFor = $(this).data("asnavfor");
        }
        if ($(this).data("slidestoscroll")) {
          config.slidesToScroll = $(this).data("slidestoscroll");
        }
        if ($(this).data("focusonselect")) {
          config.focusOnSelect = $(this).data("focusonselect");
        }

        if ($(this).data("large")) {
          var desktop = $(this).data("large");
        } else {
          var desktop = config.items;
        }
        if ($(this).data("smalldesktop")) {
          var smalldesktop = $(this).data("smalldesktop");
        } else {
          if ($(this).data("large")) {
            var smalldesktop = $(this).data("large");
          } else {
            var smalldesktop = config.items;
          }
        }
        if ($(this).data("medium")) {
          var medium = $(this).data("medium");
        } else {
          var medium = config.items;
        }
        if ($(this).data("smallmedium")) {
          var smallmedium = $(this).data("smallmedium");
        } else {
          var smallmedium = 2;
        }
        if ($(this).data("extrasmall")) {
          var extrasmall = $(this).data("extrasmall");
        } else {
          var extrasmall = 1;
        }
        if ($(this).data("smallest")) {
          var smallest = $(this).data("smallest");
        } else {
          var smallest = 1;
        }
        config.responsive = [
          {
            breakpoint: 321,
            settings: {
              slidesToShow: smallest,
              slidesToScroll: smallest
            }
          },
          {
            breakpoint: 481,
            settings: {
              slidesToShow: extrasmall,
              slidesToScroll: extrasmall
            }
          },
          {
            breakpoint: 769,
            settings: {
              slidesToShow: smallmedium,
              slidesToScroll: smallmedium
            }
          },
          {
            breakpoint: 981,
            settings: {
              slidesToShow: medium,
              slidesToScroll: medium
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: smalldesktop,
              slidesToScroll: smalldesktop
            }
          },
          {
            breakpoint: 1501,
            settings: {
              slidesToShow: desktop,
              slidesToScroll: desktop
            }
          }
        ];
        if ($("html").attr("dir") == "rtl") {
          config.rtl = true;
        }

        $(this).slick(config);
      });

      // Fix slick in bootstrap tabs
      $('a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
        var target = $(e.target).attr("href");
        var $slick = $("[data-carousel=slick]", target);

        if ($slick.length > 0 && $slick.hasClass("slick-initialized")) {
          $slick.slick("refresh");
        }
        self.layzyLoadImage();
      });
    },
    layzyLoadImage: function() {
      $(window).off("scroll.unveil resize.unveil lookup.unveil");
      var $images = $(".image-wrapper:not(.image-loaded) .unveil-image"); // Get un-loaded images only

      var $images = $(".product-image:not(.image-loaded) .unveil-image"); // Get un-loaded images only
      if ($images.length) {
        $images.unveil(1, function() {
          $(this).load(function() {
            $(this)
              .parents(".product-image")
              .first()
              .addClass("image-loaded");
          });
        });
      }
    },
    initCounterUp: function() {
      if ($(".counterUp").length > 0) {
        $(".counterUp").counterUp({
          delay: 10,
          time: 800
        });
      }
    },
    initIsotope: function() {
      $(".isotope-items").each(function() {
        var $container = $(this);

        $container.imagesLoaded(function() {
          $container.isotope({
            itemSelector: ".isotope-item",
            transformsEnabled: true, // Important for videos
            masonry: {
              columnWidth: $container.data("columnwidth")
            }
          });
        });
      });

      /*----------------------------------------------
       *    Apply Filter
       *----------------------------------------------*/
      $(".isotope-filter li a").on("click", function() {
        var parentul = $(this)
          .parents("ul.isotope-filter")
          .data("related-grid");
        $(this)
          .parents("ul.isotope-filter")
          .find("li a")
          .removeClass("active");
        $(this).addClass("active");
        var selector = $(this).attr("data-filter");
        $("#" + parentul).isotope({ filter: selector }, function() {});

        return false;
      });
    },
    changeHeaderMarginTop: function() {
      if ($(window).width() > 991) {
        if ($(".main-sticky-header").length > 0) {
          var header_height = $(".main-sticky-header").outerHeight();
          $(".main-sticky-header-wrapper").css({ height: header_height });
        }
      }
    },
    intChangeHeaderMarginTop: function() {
      var self = this;
      setTimeout(function() {
        self.changeHeaderMarginTop();
      }, 50);
      $(window).resize(function() {
        self.changeHeaderMarginTop();
      });
    },
    initHeaderSticky: function() {
      var self = this;
      var main_sticky = $(".main-sticky-header");
      setTimeout(function() {
        if (main_sticky.length > 0) {
          if ($(window).width() > 991) {
            var _menu_action = main_sticky.offset().top;
            $(window).scroll(function(event) {
              self.headerSticky(main_sticky, _menu_action);
            });
            self.headerSticky(main_sticky, _menu_action);
          }
        }
      }, 50);
    },
    headerSticky: function(main_sticky, _menu_action) {
      if ($(document).scrollTop() > _menu_action) {
        main_sticky.addClass("sticky-header");
      } else {
        main_sticky.removeClass("sticky-header");
      }
    },
    backToTop: function() {
      $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
          $("#back-to-top").addClass("active");
        } else {
          $("#back-to-top").removeClass("active");
        }
      });
      $("#back-to-top").on("click", function() {
        $("html, body").animate({ scrollTop: "0px" }, 800);
        return false;
      });
    },
    popupImage: function() {
      // popup
      $(".popup-image").magnificPopup({ type: "image" });
      $(".popup-video").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
      });

      $(".widget-gallery").each(function() {
        var tagID = $(this).attr("id");
        $("#" + tagID).magnificPopup({
          delegate: ".popup-image-gallery",
          type: "image",
          tLoading: "Loading image #%curr%...",
          mainClass: "mfp-img-mobile",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          }
        });
      });

      $(".listing-photos").magnificPopup({
        delegate: ".photo-item",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
      });

      $(".gallery-listing").magnificPopup({
        delegate: ".photo-item",
        type: "image",
        tLoading: "Loading image #%curr%...",
        mainClass: "mfp-img-mobile",
        gallery: {
          enabled: true,
          navigateByImgClick: true,
          preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        }
      });

      $(".comment-attactments").each(function() {
        var tagID = $(this).attr("id");
        $("#" + tagID).magnificPopup({
          delegate: ".photo-item",
          type: "image",
          tLoading: "Loading image #%curr%...",
          mainClass: "mfp-img-mobile",
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
          }
        });
      });
    },
    preloadSite: function() {
      // preload page
      if ($("body").hasClass("apus-body-loading")) {
        $("body").removeClass("apus-body-loading");
        $(".apus-page-loading").fadeOut(100);
      }
    },
    initGmap3: function() {
      // gmap 3
      $(".apus-google-map").each(function() {
        var lat = $(this).data("lat");
        var lng = $(this).data("lng");
        var zoom = $(this).data("zoom");
        var id = $(this).attr("id");
        if ($(this).data("marker_icon")) {
          var marker_icon = $(this).data("marker_icon");
        } else {
          var marker_icon = "";
        }
        $("#" + id).gmap3({
          map: {
            options: {
              draggable: true,
              mapTypeControl: true,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
              scrollwheel: false,
              panControl: true,
              rotateControl: false,
              scaleControl: true,
              streetViewControl: true,
              zoomControl: true,
              center: [lat, lng],
              zoom: zoom,
              styles: $(this).data("style")
            }
          },
          marker: {
            latLng: [lat, lng],
            options: {
              icon: marker_icon
            }
          }
        });
      });
    },
    initMobileMenu: function() {
      // mobile menu
      $(".btn-offcanvas, .btn-toggle-canvas").on("click", function(e) {
        e.stopPropagation();
        $(".apus-offcanvas").toggleClass("active");
        $(".over-dark").toggleClass("active");
      });
      $("body").on("click", function() {
        if ($(".apus-offcanvas").hasClass("active")) {
          $(".apus-offcanvas").toggleClass("active");
          $(".over-dark").toggleClass("active");
        }
      });
      $(".apus-offcanvas").on("click", function(e) {
        e.stopPropagation();
      });

      $("#main-mobile-menu .icon-toggle").on("click", function() {
        $(this)
          .parent()
          .find("> .sub-menu")
          .slideToggle();
        if (
          $(this)
            .find("i")
            .hasClass("fa-plus-theme")
        ) {
          $(this)
            .find("i")
            .removeClass("fa-plus-theme")
            .addClass("fa-minus-theme");
        } else {
          $(this)
            .find("i")
            .removeClass("fa-minus-theme")
            .addClass("fa-plus-theme");
        }
        return false;
      });
      $(".apus-offcanvas-body").perfectScrollbar();

      // sidebar mobile
      if ($(window).width() < 992) {
        $(".sidebar-right, .sidebar-left").perfectScrollbar();
      }
      $(window).resize(function() {
        if ($(window).width() < 992) {
          $(".sidebar-right, .sidebar-left").perfectScrollbar();
        }
      });

      $("body").on("click", ".mobile-sidebar-btn", function() {
        if ($(".sidebar-left").length > 0) {
          $(".sidebar-left").toggleClass("active");
        } else if ($(".sidebar-right").length > 0) {
          $(".sidebar-right").toggleClass("active");
        }
        $(".mobile-sidebar-panel-overlay").toggleClass("active");
      });
      $("body").on("click", ".mobile-sidebar-panel-overlay, .close-sidebar-btn", function() {
        if ($(".sidebar-left").length > 0) {
          $(".sidebar-left").removeClass("active");
        } else if ($(".sidebar-right").length > 0) {
          $(".sidebar-right").removeClass("active");
        }
        $(".mobile-sidebar-panel-overlay").removeClass("active");
      });
    },
    setCookie: function(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      var expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + ";path=/";
    },
    getCookie: function(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(";");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
    },
    userLoginRegister: function() {
      // login/register
      $(".apus-user-login, .apus-user-register").on("click", function() {
        var target = $(this).attr("href");
        $(target).trigger("click");
        $(".apus_login_register_form .nav-tabs li").removeClass("active");
        $(target)
          .parent()
          .addClass("active");
        var id = $(target).attr("href");
        $(".apus_login_register_form .tab-pane").removeClass("active");
        $(id)
          .addClass("active")
          .addClass("in");

        $.magnificPopup.open({
          mainClass: "apus-mfp-zoom-in",
          items: {
            src: $("#apus_login_register_form_wrapper").html(),
            type: "inline"
          }
        });
        return false;
      });
      $(".account-sign-in-login a, .must-log-in a").on("click", function(e) {
        e.preventDefault();
        $("#apus_login_forgot_tab").trigger("click");
        $(".apus_login_register_form .nav-tabs li").removeClass("active");
        $("#apus_login_forgot_tab")
          .parent()
          .addClass("active");
        var id = $("#apus_login_forgot_tab").attr("href");
        $(".apus_login_register_form .tab-pane").removeClass("active");
        $(id)
          .addClass("active")
          .addClass("in");
        $.magnificPopup.open({
          mainClass: "apus-mfp-zoom-in",
          items: {
            src: $("#apus_login_register_form_wrapper").html(),
            type: "inline"
          }
        });
        return false;
      });
      $("body").on("click", ".apus_login_register_form .mfp-close", function() {
        $.magnificPopup.close();
      });

      $("#apus_forgot_password_form").hide();
      $("#apus_login_form form .btn-cancel").on("click", function() {
        $("#apus_login_form").hide();
      });

      // sign in proccess
      $("body").on("submit", "form.apus-login-form", function() {
        var $this = $(this);
        $(".alert", this).remove();
        $.ajax({
          url: this.findgo_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: $(this).serialize() + "&action=apus_ajax_login"
        }).done(function(data) {
          if (data.loggedin) {
            $this.prepend('<div class="alert alert-info">' + data.msg + "</div>");
            location.reload();
          } else {
            $this.prepend('<div class="alert alert-warning">' + data.msg + "</div>");
          }
        });
        return false;
      });
      $("body").on("click", ".back-link", function() {
        $(".form-container").hide();
        $($(this).attr("href")).show();
        return false;
      });

      // lost password in proccess
      $("body").on("submit", "form.forgotpassword-form", function() {
        var $this = $(this);
        $(".alert", this).remove();
        $.ajax({
          url: this.findgo_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: $(this).serialize() + "&action=apus_ajax_forgotpass"
        }).done(function(data) {
          if (data.loggedin) {
            $this.prepend('<div class="alert alert-info">' + data.msg + "</div>");
            location.reload();
          } else {
            $this.prepend('<div class="alert alert-warning">' + data.msg + "</div>");
          }
        });
        return false;
      });
      $("body").on("click", "#apus_forgot_password_form form .btn-cancel", function() {
        $("#apus_forgot_password_form").hide();
        $("#apus_login_form").show();
      });

      // register
      $("body").on("submit", "form.apus-register-form", function() {
        var $this = $(this);
        $(".alert", this).remove();
        $.ajax({
          url: this.findgo_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: $(this).serialize() + "&action=apus_ajax_register"
        }).done(function(data) {
          if (data.loggedin) {
            $this.prepend('<div class="alert alert-info">' + data.msg + "</div>");
            location.reload();
          } else {
            $this.prepend('<div class="alert alert-warning">' + data.msg + "</div>");
          }
        });
        return false;
      });
    }
  };

  $.apusThemeCore = ApusThemeCore.prototype;

  $.fn.wrapStart = function(numWords) {
    return this.each(function() {
      var $this = $(this);
      var node = $this
          .contents()
          .filter(function() {
            return this.nodeType == 3;
          })
          .first(),
        text = node.text().trim(),
        first = text.split(" ", 1).join(" ");
      if (!node.length) return;
      node[0].nodeValue = text.slice(first.length);
      node.before("<b>" + first + "</b>");
    });
  };

  $(document).ready(function() {
    new ApusThemeCore(option);
    $(".mod-heading .widget-title > span").wrapStart(1);
  });
}
apusCore(jQuery, 1);
