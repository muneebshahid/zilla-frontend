(function($) {
  "use strict";

  var map, markers, CustomHtmlIcon;

  $.extend($.apusThemeCore, {
    /**
     *  Initialize scripts
     */
    listing_init: function() {
      var self = this;
      this.findgo_listing_opts = {
        ajaxurl: "",
        login_url: "",
        strings: {
          "wp-job-manager-file-upload": "Add Photo",
          no_job_listings_found: "No results",
          "results-no": "Results Found"
        },
        mapbox_token: "",
        mapbox_style: "",
        custom_style: "",
        default_icon: "",
        timeFormat: "g:i a",
        none_option_label: "Closed",
        none_option_value: "Closed"
      };

      if ($("#apus-listing-map").length) {
        L.Icon.Default.imagePath = "wp-content/themes/findgo/images/";
      }

      if ($(".detail-haft-map").length > 0) {
        $("body").addClass("no-breadscrumb no-footer fix-header");
      }
      if ($(".detail-full-gallery").length > 0 || $(".detail-full-map").length > 0) {
        $("body").addClass("no-breadscrumb");
      }

      $(".write-a-review").on("click", function(e) {
        e.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $("#review_form_wrapper").offset().top
          },
          1000
        );
      });

      self.listingBtnFilter();

      self.listingFilter();

      self.bookmarkInit();

      self.searchInit();

      self.mapInit();

      self.previewInit();

      // listing detail
      self.listingDetail();
      self.listingComment();
      self.listingReview();

      self.submitForm();

      self.editProfile();
    },
    listingChangeMarginTopAffix: function() {
      var affix_height = 0,
        affix_height_top = 0;
      if ($(window).width() > 991) {
        if ($(".panel-affix").length > 0) {
          affix_height_top = affix_height = $(".panel-affix").outerHeight();
          $(".panel-affix-wrapper").css({ height: affix_height });
        }
      }
    },
    listingDetail: function() {
      var self = this;
      // sticky tabs
      var affix_height = 0;
      var affix_height_top = 0;
      setTimeout(function() {
        self.listingChangeMarginTopAffix();
      }, 50);
      $(window).resize(function() {
        self.listingChangeMarginTopAffix();
      });

      //Function from Bluthemes, lets you add li elemants to affix object without having to alter and data attributes set out by bootstrap
      setTimeout(function() {
        // name your elements here
        var stickyElement = ".panel-affix", // the element you want to make sticky
          bottomElement = "#apus-footer"; // the bottom element where you want the sticky element to stop (usually the footer)

        // make sure the element exists on the page before trying to initalize
        if ($(stickyElement).length) {
          $(stickyElement).each(function() {
            var header_height = 0;
            if ($(".main-sticky-header").length > 0) {
              header_height = $(".main-sticky-header").outerHeight();
              affix_height_top = affix_height + header_height;
            }
            // let's save some messy code in clean variables
            // when should we start affixing? (the amount of pixels to the top from the element)
            var fromTop = $(this).offset().top,
              // where is the bottom of the element?
              fromBottom = $(document).height() - ($(this).offset().top + $(this).outerHeight()),
              // where should we stop? (the amount of pixels from the top where the bottom element is)
              // also add the outer height mismatch to the height of the element to account for padding and borders
              stopOn =
                $(document).height() -
                $(bottomElement).offset().top +
                ($(this).outerHeight() - $(this).height());

            // if the element doesn't need to get sticky, then skip it so it won't mess up your layout
            if (fromBottom - stopOn > 200) {
              // let's put a sticky width on the element and assign it to the top
              $(this)
                .css("width", $(this).width())
                .css("top", 0)
                .css("position", "");
              // assign the affix to the element
              $(this)
                .affix({
                  offset: {
                    // make it stick where the top pixel of the element is
                    top: fromTop - header_height,
                    // make it stop where the top pixel of the bottom element is
                    bottom: stopOn
                  }
                  // when the affix get's called then make sure the position is the default (fixed) and it's at the top
                })
                .on("affix.bs.affix", function() {
                  var header_height = 0;
                  if ($(".main-sticky-header").length > 0) {
                    header_height = $(".main-sticky-header").outerHeight();
                  }
                  affix_height_top = affix_height + header_height;
                  $(this)
                    .css("top", header_height)
                    .css("position", "");
                });
            }
            // trigger the scroll event so it always activates
            $(window).trigger("scroll");
          });
        }
      }, 50);

      //Offset scrollspy height to highlight li elements at good window height
      $("body").scrollspy({
        offset: 80
      });

      //Smooth Scrolling For Internal Page Links
      $(".panel-affix a[href*=#]:not([href=#])").on("click", function() {
        if (
          location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var target = $(this.hash);
          target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            $("html,body").animate(
              {
                scrollTop: target.offset().top - affix_height_top
              },
              1000
            );
            return false;
          }
        }
      });
      // smooth scrolling when click a link
      $(document).on("click", ".panel-affix a[href*=#]:not([href=#])", function(event) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: $($.attr(this, "href")).offset().top
          },
          500
        );
      });

      var APUS_Tab_Scroll = function() {
        "use strict";
        // perfect scroll
        $(".header-tabs-wrapper").each(function() {
          var total_wd = 0;
          $(".nav li", $(this)).each(function() {
            total_wd = total_wd + $(this).outerWidth();
          });
          $(".nav", $(this)).width(total_wd + 30);
          $(".header-tabs-nav", $(this)).width("100%");
        });
      };
      APUS_Tab_Scroll();

      $(".header-tabs-wrapper .header-tabs-nav").perfectScrollbar();
      $(window).resize(function(event) {
        APUS_Tab_Scroll();
        $(".header-tabs-wrapper .header-tabs-nav").perfectScrollbar("update");
      });
    },
    imagesPreview: function(input, placeToInsertImagePreview) {
      if (input.files) {
        var filesAmount = input.files.length;

        for (var i = 0; i < filesAmount; i++) {
          var reader = new FileReader();
          reader.onload = function(event) {
            $($.parseHTML("<img>"))
              .attr("src", event.target.result)
              .appendTo(placeToInsertImagePreview);
          };
          reader.readAsDataURL(input.files[i]);
        }
      }
    },
    listingComment: function() {
      var self = this;
      // file attachments
      $("#field_attachments_cover").on("click", function() {
        $("#field_attachments").trigger("click");
      });
      $("#field_attachments").on("change", function() {
        $(".group-upload-preview").html("");
        self.imagesPreview(this, "div.group-upload-preview");
        $(".group-upload-preview").css("display", "block");
      });

      $(".comment-attactments").each(function() {
        var self = $(this);
        $(".show-more-images", self).on("click", function() {
          $(".attachment", self).removeClass("hidden");
          $(this).addClass("hidden");
          initProductImageLoad();
        });
      });

      // like
      $(".comment-actions .comment-like").on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        self.addClass("loading");

        $.ajax({
          url: this.findgo_listing_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: "action=findgo_comment_like&comment_id=" + self.data("id")
        }).done(function(data) {
          self.removeClass("loading");
          self.html(data.icon);
          self.attr("title", data.dtitle);
          self.attr("data-original-title", data.dtitle);
          self.toggleClass("active");
        });
      });
      // dislike
      $(".comment-actions .comment-dislike").on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        self.addClass("loading");

        $.ajax({
          url: this.findgo_listing_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: "action=findgo_comment_dislike&comment_id=" + self.data("id")
        }).done(function(data) {
          self.removeClass("loading");
          self.html(data.icon);
          self.attr("title", data.dtitle);
          self.attr("data-original-title", data.dtitle);
          self.toggleClass("active");
        });
      });
      // love
      $(".comment-actions .comment-love").on("click", function(e) {
        e.preventDefault();
        var self = $(this);
        self.addClass("loading");

        $.ajax({
          url: this.findgo_listing_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: "action=findgo_comment_love&comment_id=" + self.data("id")
        }).done(function(data) {
          self.removeClass("loading");
          self.html(data.icon);
          self.attr("title", data.dtitle);
          self.attr("data-original-title", data.dtitle);
          self.toggleClass("active");
        });
      });
      //
      $(".comment-box").each(function() {
        var self = $(this);
        $(".comment-see-more", self).on("click", function() {
          $(".comment-text", self).slideToggle();
          $(".title-job", self).toggleClass("active");
          initProductImageLoad();
        });
      });

      // follow/following
      $("body").on("click", ".btn-follow-following", function(e) {
        e.preventDefault();

        var user_id = $(this).data("id");
        var self = $(this);
        if (self.hasClass("loading")) {
          return false;
        }
        self.addClass("loading");
        $.ajax({
          url: this.findgo_listing_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: {
            action: "findgo_follow_user",
            user_id: user_id
          }
        }).done(function(response) {
          if (response.status === "error") {
            alert(response.msg);
          } else {
            self
              .removeClass("btn-follow-user")
              .removeClass("btn-following-user")
              .addClass(response.class);
            if (self.hasClass("btn-outline")) {
              self.removeClass("btn-outline");
            } else {
              self.addClass("btn-outline");
            }
            self.html(response.msg);
          }
          self.removeClass("loading");
        });
      });
    },
    listingBtnFilter: function() {
      $(".btn-show-filter").on("click", function(e) {
        e.preventDefault();
        if ($(".job_filters .search_jobs").hasClass("active")) {
          $(".job_filters .search_jobs").removeClass("active");
        } else {
          $(".job_filters .search_jobs").addClass("active");
        }
      });
      $(".btn-view-map").on("click", function(e) {
        e.preventDefault();
        $(".apus-listing-map")
          .removeClass("hidden-sm")
          .removeClass("hidden-xs");
        $(".apus-listing-warpper .job_listings")
          .addClass("hidden-sm")
          .addClass("hidden-xs");
        $(".btn-view-listing")
          .removeClass("hidden-sm")
          .removeClass("hidden-xs");
        $(this)
          .addClass("hidden-sm")
          .addClass("hidden-xs");
        $(".showing_jobs")
          .addClass("hidden-sm")
          .addClass("hidden-xs");
        $(".listing-action")
          .addClass("hidden-sm")
          .addClass("hidden-xs");
        setTimeout(function() {
          $(window).trigger("pxg:refreshmap");
        });
      });
      $(".btn-view-products").on("click", function(e) {
        e.preventDefault();
        $(".app-explore-products, .app-explore-business").toggle();
      });
      $(".btn-view-listing").on("click", function(e) {
        e.preventDefault();
        $(".apus-listing-map")
          .addClass("hidden-sm")
          .addClass("hidden-xs");
        $(".apus-listing-warpper .job_listings")
          .removeClass("hidden-sm")
          .removeClass("hidden-xs");
        $(".btn-view-map")
          .removeClass("hidden-sm")
          .removeClass("hidden-xs");
        $(this)
          .addClass("hidden-sm")
          .addClass("hidden-xs");
        $(".showing_jobs")
          .removeClass("hidden-sm")
          .removeClass("hidden-xs");
        $(".listing-action")
          .removeClass("hidden-sm")
          .removeClass("hidden-xs");
      });
      $(".sharing-popup .share-popup").on("click", function(e) {
        e.preventDefault();
        $(this)
          .parent()
          .toggleClass("active");
      });

      $(".timepicker").timepicker({
        timeFormat: this.findgo_listing_opts.timeFormat,
        noneOption: {
          label: this.findgo_listing_opts.none_option_label,
          value: this.findgo_listing_opts.none_option_value
        }
      });

      $(".listings-filter-header, .mobile-groups-button .btn-filter").on("click", function(e) {
        e.stopPropagation();
        $(".listings-filter-wrapper").toggleClass("active");
      });
      $(".listings-detail-header, .mobile-groups-button .btn-filter").on("click", function(e) {
        e.stopPropagation();
        $(".listings-detail-wrapper").toggleClass("active");
      });
      $(".close-filter").on("click", function(e) {
        $(".listings-filter-wrapper,.listings-detail-wrapper").removeClass("active");
      });
      $("body").on("click", function() {
        if ($(".listings-filter-wrapper,.listings-detail-wrapper").hasClass("active")) {
          $(".listings-filter-wrapper,.listings-detail-wrapper").removeClass("active");
        }
      });
      $(".listings-filter-wrapper, .listings-detail-wrapper").on("click", function(e) {
        e.stopPropagation();
      });
    },
    listingFilter: function() {
      var self = this;
      // chosen
      var $supports_html5_history = false;
      if (window.history && window.history.pushState) {
        $supports_html5_history = true;
      }

      if ($.isFunction($.fn.select2)) {
        //$( 'select[name^="search_categories"]' ).select2({ minimumResultsForSearch: 10 });
        $('select[name^="job_region_select"]').select2({ minimumResultsForSearch: 10 });
        $('select[name^="job_regions"]').select2({ minimumResultsForSearch: 10 });
      }
      $(".job_filters select[name=job_region_select]").change(function() {
        $(".job_listings").triggerHandler("update_results", [1, false]);
        var target = $(".job_listings");
        if ($supports_html5_history) {
          var form = target.find(".job_filters");
          var data = $(form).serialize();
          var index = $("div.job_listings").index(target);
          window.history.replaceState(
            { id: "job_manager_state", page: 1, data: data, index: index },
            "",
            location + "#s=1"
          );
        }
      });
      $(".job_filters select[name=filter_order]").change(function() {
        self.setCookie("findgo_order", $(this).val(), 30);
        $(".job_listings").triggerHandler("update_results", [1, false]);
      });
      // anienties
      var updateTags = function() {
        $(".job_tags :input").change(function() {
          $(this)
            .parent()
            .toggleClass("active");
          var target = $(this).closest("div.job_listings");
          target.triggerHandler("update_results", [1, false]);
        });
      };
      updateTags();
      $(".job_tags :input").each(function() {
        if ($(this).is(":checked")) {
          $(this)
            .parent()
            .addClass("active");
        } else {
          $(this)
            .parent()
            .removeClass("active");
        }
      });
      var $displayMode = $(".listing-display-mode .display-mode .change-view"),
        updateDisplayMode = function() {
          $displayMode.on("click", function(e) {
            e.preventDefault();
            var value = $(this).data("mode");
            self.setCookie("findgo_display_mode", value, 30);
            $(".input_display_mode").val(value);
            $displayMode.removeClass("active");
            $(this).addClass("active");
            $(".job_listings").triggerHandler("update_results", [1, false]);
          });
        };
      updateDisplayMode();

      $("#search-distance-slider").slider({
        range: "min",
        value: $("#search_distance").val(),
        min: 0,
        max: 100,
        slide: function(event, ui) {
          $("#search_distance").val(ui.value);
          $(".text-distance").text(ui.value);
          $("#distance-custom-handle").attr("data-value", ui.value);
          $(".job_listings").triggerHandler("update_results", [1, false]);
        },
        create: function() {
          $("#distance-custom-handle").attr("data-value", $(this).slider("value"));
        }
      });

      $.fn.bindFirst = function(name, selector, fn) {
        // bind as you normally would
        // don't want to miss out on any jQuery magic
        this.on(name, selector, fn);

        // Thanks to a comment by @Martin, adding support for
        // namespaced events too.
        this.each(function() {
          var handlers = $._data(this, "events")[name.split(".")[0]];
          // take out the handler we just inserted from the end
          var handler = handlers.pop();
          // move it at the beginning
          handlers.splice(0, 0, handler);
        });
      };

      $(".job_filters").bindFirst("click", ".reset", function() {
        $(".job_tags")
          .find(":checked")
          .each(function(i, obj) {
            $(obj).attr("checked", false);
            $(obj)
              .parent()
              .removeClass("active");
          });
        $(".search_price_range")
          .find(":checked")
          .each(function(i, obj) {
            $(obj).attr("checked", false);
            $(obj)
              .parent()
              .removeClass("active");
          });

        $(".regions-select")
          .find(":selected")
          .each(function(i, obj) {
            $(obj).attr("selected", false);
          });
        $(".regions-select").trigger("change.select2");

        $('input[name="search_keywords"]').each(function(i, obj) {
          $(obj).val("");
        });
        $('input[name="search_lat"]').val("");
        $('input[name="search_lng"]').val("");
        $('input[name="search_location"]').val("");
      });
      $(".search_location").on("click", ".clear-location", function() {
        $('input[name="search_lat"]').val("");
        $('input[name="search_lng"]').val("");
        $('input[name="search_location"]').val("");
        $(this)
          .parent()
          .find(".clear-location")
          .removeClass("hidden")
          .addClass("hidden");
      });
      $('input[name="search_location"]').on("keyup", function() {
        var val = $(this).val();
        if ($(this).val() !== "") {
          $(this)
            .parent()
            .find(".clear-location")
            .removeClass("hidden");
        } else {
          $(this)
            .parent()
            .find(".clear-location")
            .removeClass("hidden")
            .addClass("hidden");
        }
      });
      if ($('input[name="search_location"]').length > 0) {
        var this_e = $('input[name="search_location"]');
        var val = this_e.val();
        if (this_e.val() !== "") {
          this_e
            .parent()
            .find(".clear-location")
            .removeClass("hidden");
        } else {
          this_e
            .parent()
            .find(".clear-location")
            .removeClass("hidden")
            .addClass("hidden");
        }
      }

      $(".search_price_range input[type=checkbox]").each(function() {
        if ($(this).is(":checked")) {
          $(this)
            .parent()
            .addClass("active");
        }
      });
      $(".search_price_range label").on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass("active");
        if (
          $(this)
            .find("input[type=checkbox]")
            .is(":checked")
        ) {
          $(this)
            .find("input[type=checkbox]")
            .prop("checked", false);
        } else {
          $(this)
            .find("input[type=checkbox]")
            .attr("checked", "checked");
        }
        jQuery(".job_listings").triggerHandler("update_results", [1, false]);
      });

      $(".search_location .find-me").on("click", function() {
        $(this).addClass("loading");
        navigator.geolocation.getCurrentPosition(self.getLocation, self.getErrorLocation);
      });

      // active layout
      $(".radio-images .radio-images-inner").removeClass("active");
      $("input[name=job_layout_type]").each(function() {
        if ($(this).attr("checked")) {
          $(this)
            .closest(".radio-images-inner")
            .addClass("active");
        }
      });
      $("input[name=job_layout_type]").on("change", function() {
        $(".radio-images .radio-images-inner").removeClass("active");
        $(this)
          .closest(".radio-images-inner")
          .addClass("active");
      });
      $(".wrapper-123-filter .listings-filter-wrapper").perfectScrollbar();
      $(".wrapper-123-filter .listings-detail-wrapper").perfectScrollbar();
    },
    getLocation: function(position) {
      $("#search_lat").val(position.coords.latitude);
      $("#search_lng").val(position.coords.longitude);
      $("#search_location").val("Location");

      var geocoder = new google.maps.Geocoder();
      var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      if (geocoder) {
        geocoder.geocode({ latLng: latLng }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            $("#search_location").val(results[0].formatted_address);
          }
        });
      }
      setTimeout(function() {
        $(".job_listings").triggerHandler("update_results", [1, false]);
      }, 50);
      return $(".find-me").removeClass("loading");
    },
    getErrorLocation: function(position) {
      return $(".find-me").removeClass("loading");
    },
    listingReview: function() {
      if ($(".comment-form-rating").length > 0) {
        var $star = $(".comment-form-rating .filled");
        var $review = $("#apus_input_rating");
        $star.find("li").on("mouseover", function() {
          $(this)
            .nextAll()
            .find("span")
            .removeClass("fa-star")
            .addClass("fa-star-o");
          $(this)
            .prevAll()
            .find("span")
            .removeClass("fa-star-o")
            .addClass("fa-star");
          $(this)
            .find("span")
            .removeClass("fa-star-o")
            .addClass("fa-star");
          $(".comment-form-rating .review-label").html($(this).data("title"));
          $review.val($(this).index() + 1);
        });
      }
    },
    bookmarkInit: function() {
      // bookmark
      $("body").on("click", ".apus-bookmark-add", function(e) {
        e.preventDefault();

        var post_id = $(this).data("id");
        var url =
          this.findgo_listing_opts.ajaxurl + "?action=findgo_add_bookmark&post_id=" + post_id;
        var self = $(this);
        self.addClass("loading");
        $.ajax({
          url: url,
          type: "POST",
          dataType: "json"
        }).done(function(reponse) {
          if (reponse.status === "success") {
            self.addClass("apus-bookmark-added").removeClass("apus-bookmark-add");
          }
          self.removeClass("loading");
        });
      });

      $("body").on("click", ".apus-bookmark-not-login", function(e) {
        e.preventDefault();
        var target = $(".apus-user-login").attr("href");
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
      });
      // bookmark remove
      $("body").on("click", ".apus-bookmark-added", function(e) {
        e.preventDefault();

        var post_id = $(this).data("id");
        var url =
          this.findgo_listing_opts.ajaxurl + "?action=findgo_remove_bookmark&post_id=" + post_id;
        var self = $(this);
        self.addClass("loading");
        $.ajax({
          url: url,
          type: "POST",
          dataType: "json"
        }).done(function(reponse) {
          if (reponse.status === "success") {
            self.removeClass("apus-bookmark-added").addClass("apus-bookmark-add");
          }
          self.removeClass("loading");
        });
      });
      $("body").on("click", ".apus-bookmark-remove", function(e) {
        e.preventDefault();

        var post_id = $(this).data("id");
        var url =
          this.findgo_listing_opts.ajaxurl + "?action=findgo_remove_bookmark&post_id=" + post_id;
        var self = $(this);
        self.addClass("loading");
        $.ajax({
          url: url,
          type: "POST",
          dataType: "json"
        }).done(function(reponse) {
          if (reponse.status === "success") {
            var parent = $("#bookmark-listing-" + post_id).parent();
            if ($(".my-listing-item-wrapper", parent).length <= 1) {
              location.reload();
            } else {
              $("#bookmark-listing-" + post_id).remove();
            }
          }
        });
      });
    },
    searchInit: function() {
      var self = this;
      // widget search jobs
      $(".search_jobs .show-more-filter").on("click", function(e) {
        e.preventDefault();
        $(".search_jobs .tags-wrap").toggle("500");
        if (
          $(this)
            .find("i")
            .hasClass("fa-plus")
        ) {
          $(this)
            .find("i")
            .removeClass("fa-plus");
          $(this)
            .find("i")
            .addClass("fa-minus");
        } else {
          $(this)
            .find("i")
            .removeClass("fa-minus");
          $(this)
            .find("i")
            .addClass("fa-plus");
        }
      });
      $(".job_search_form .has-suggestion").on("click", function(e) {
        e.stopPropagation();
      });
      $(".job_search_form .has-suggestion").on("click", function() {
        $(this).toggleClass("active");
      });
      $("body").on("click", function() {
        if ($(".job_search_form .has-suggestion").hasClass("active")) {
          $(".job_search_form .has-suggestion").removeClass("active");
        }
      });

      $(".navbar-collapse-suggestions").perfectScrollbar();

      // fix map
      if ($("#apus-listing-map").is(".fix-map")) {
        setTimeout(function() {
          self.changePaddingTopContent();
        }, 50);
        $(window).resize(function() {
          self.changePaddingTopContent();
        });
      }
    },
    changePaddingTopContent: function() {
      if ($(window).width() >= 992) {
        var header_h = $("#apus-header").outerHeight();
      } else {
        var header_h = $("#apus-header-mobile").outerHeight();
      }
      $("#apus-listing-map").css({ top: header_h });
      // $("#apus-main-content").css({ "padding-top": header_h });
      $(".listings-filter-wrapper").css({ top: header_h });
      $(".listings-filter-wrapper").css({ height: "calc(100% - " + header_h + "px)" });

      $(".listings-detail-wrapper").css({ top: header_h });
      $(".listings-detail-wrapper").css({ height: "calc(100% - " + header_h + "px)" });
    },
    mapInit: function() {
      var self = this;
      self.initStreetView();

      var $window = $(window);
      if ($(".no_job_listings_found").length) {
        $(
          '<div class="results">' +
            this.findgo_listing_opts.strings["no_job_listings_found"] +
            "</div>"
        ).prependTo(".showing_jobs, .listing-search-result");
      }

      if (!$("#apus-listing-map").length) {
        $(".job_listings").on("updated_results", function(e, result) {
          var target = $(this);
          self.layzyLoadImage();
          self.previewInit();

          if (true === target.data("show_pagination")) {
            target.find(".job-manager-pagination").remove();

            if (result.pagination) {
              target.find(".main-results").append(result.pagination);
            }
          }
          self.updateMakerCards(result.total_found, result);
          $('[data-toggle="tooltip"]').tooltip();
        });
        return;
      }

      map = L.map("apus-listing-map", {
        scrollWheelZoom: false
      });

      markers = new L.MarkerClusterGroup({
        showCoverageOnHover: false
      });

      CustomHtmlIcon = L.HtmlIcon.extend({
        options: {
          html: "<div class='map-popup'></div>",
          iconSize: [48, 59],
          iconAnchor: [24, 59],
          popupAnchor: [0, -59]
        }
      });

      $window.on("pxg:refreshmap", function() {
        map._onResize();
        setTimeout(function() {
          map.fitBounds(markers, {
            padding: [50, 50]
          });
        }, 100);
      });

      $window.on("pxg:simplerefreshmap", function() {
        map._onResize();
      });

      if (this.findgo_listing_opts.mapbox_token != "") {
        var tileLayer = L.tileLayer(
          "https://api.tiles.mapbox.com/v4/" +
            this.findgo_listing_opts.mapbox_style +
            "/{z}/{x}/{y}.png?access_token=" +
            this.findgo_listing_opts.mapbox_token,
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="http://mapbox.com">Mapbox</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
            id: "mapbox.streets"
          }
        );
      } else {
        if (this.findgo_listing_opts.custom_style != "") {
          try {
            var custom_style = $.parseJSON(this.findgo_listing_opts.custom_style);
            var tileLayer = new L.Google("ROADMAP", {}, custom_style);
          } catch (err) {
            var tileLayer = new L.Google("ROADMAP");
          }
        } else {
          var tileLayer = new L.Google("ROADMAP");
        }
        $("#apus-listing-map").addClass("map--google");
      }

      map.addLayer(tileLayer);

      // check home/archive/single page
      if ($("#apus-listing-map").is(".apus-homepage-listing-map")) {
        self.updateMakerCards();
      } else {
        if (!$("#apus-listing-map").is(".apus-single-listing-map")) {
          $(".job_listings").on("updated_results", function(e, result) {
            var target = $(this);
            self.layzyLoadImage();
            self.previewInit();
            if (true === target.data("show_pagination")) {
              target.find(".job-manager-pagination").remove();

              if (result.pagination) {
                target.find(".main-results").append(result.pagination);
              }
            }
            self.updateMakerCards(result.total_found, result);
            $('[data-toggle="tooltip"]').tooltip();
          });
          // FacetWP
          $(document).on("facetwp-loaded", function(e, result) {
            self.updateMakerCards();
          });
        } else {
          var $item = $(".apus-single-listing");
          if (
            typeof $item.data("latitude") !== "undefined" &&
            $item.data("latitude") !== "" &&
            typeof $item.data("longitude") !== "undefined" &&
            $item.data("longitude") !== ""
          ) {
            var zoom = typeof MapWidgetZoom !== "undefined" ? MapWidgetZoom : 15;
            self.addMakerToMap($item);
            map.addLayer(markers);
            map.setActiveArea("active-area");
            map.setView([$item.data("latitude"), $item.data("longitude")], zoom);
            $(window).on("update:map", function() {
              map.setView([$item.data("latitude"), $item.data("longitude")], zoom);
            });
            $(".top-nav-map").on("click", function(e) {
              e.preventDefault();
              $("#apus-listing-map-street-view").hide();
              $("#apus-listing-map").show();
              $(".top-nav-street-view").removeClass("active");
              $(".top-nav-map")
                .removeClass("active")
                .addClass("active");
              map._onResize();
            });
          } else {
            $("#apus-listing-map").hide();
            $(".listing-address").css("marginTop", 0);
          }
        }
      }
    },
    initStreetView: function() {
      var panorama = null;

      $(".top-nav-street-view").on("click", function(e) {
        e.preventDefault();
        $("#apus-listing-map-street-view").show();
        $("#apus-listing-map").hide();
        $(".top-nav-street-view")
          .removeClass("active")
          .addClass("active");
        $(".top-nav-map").removeClass("active");

        var $item = $(".apus-single-listing");

        if (
          typeof $item.data("latitude") !== "undefined" &&
          $item.data("latitude") !== "" &&
          typeof $item.data("longitude") !== "undefined" &&
          ($item.data("longitude") !== "undefined") !== ""
        ) {
          var zoom = typeof MapWidgetZoom !== "undefined" ? MapWidgetZoom : 15;

          if (panorama == null) {
            var fenway = new google.maps.LatLng($item.data("latitude"), $item.data("longitude"));
            var panoramaOptions = {
              position: fenway,
              pov: {
                heading: 34,
                pitch: 10
              }
            };
            panorama = new google.maps.StreetViewPanorama(
              document.getElementById("apus-listing-map-street-view"),
              panoramaOptions
            );
          }
        }
      });
    },
    updateMakerCards: function($total_found, $result) {
      var self = this;
      var $items = $(".job_listings_cards .job_listing");

      $(
        ".showing_jobs .results, .listing-search-result .results, .listing-search-result-filter .results"
      ).remove();

      var result_str = '<div class="results">';
      if (typeof $result !== "undefined") {
        result_str = result_str + '<span class="results-no">' + $result.found + "</span> ";
      }
      result_str = result_str + this.findgo_listing_opts.strings["results-no"];
      if (typeof $result !== "undefined" && typeof $result.str_found !== "undefined") {
        result_str = result_str + $result.str_found;
      }
      result_str = result_str + "</div>";

      $(result_str).prependTo(".showing_jobs, .listing-search-result");

      if (
        typeof $result !== "undefined" &&
        $result.showing !== "" &&
        $result.showing_links !== ""
      ) {
        $(
          '<div class="results">' + $result.showing + " " + $result.showing_links + "</div>"
        ).prependTo(".listing-search-result-filter");
      }
      if (!$items.length) {
        return;
      }

      if ($("#apus-listing-map").length && typeof map !== "undefined") {
        map.removeLayer(markers);
        markers = new L.MarkerClusterGroup({
          showCoverageOnHover: false
        });
        $items.each(function(i, obj) {
          self.addMakerToMap($(obj), true);
        });
        map.fitBounds(markers, {
          padding: [50, 50]
        });

        map.addLayer(markers);
      }
    },
    addMakerToMap: function($item, archive) {
      var category = $item.find(".listing-cat-icon"),
        mapPinClass,
        map;

      if (
        (typeof $item.data("latitude") === "undefined" && $item.data("latitude") === "") ||
        typeof $item.data("longitude") === "undefined" ||
        $item.data("longitude") == ""
      ) {
        return;
      }

      if (!category.length) {
        mapPinClass = "map-popup map-popup-empty";
      } else {
        mapPinClass = "map-popup";
      }
      var $mapPinIcon = $(".map-pin-icon");
      var mapPinHTML =
        "<div class='" +
        mapPinClass +
        "'>" +
        $mapPinIcon.html() +
        "<div class='icon-wrapper'><div class='icon-cat'>!</div></div></div>";

      if (category.length) {
        mapPinHTML =
          "<div class='" +
          mapPinClass +
          "'>" +
          $mapPinIcon.html() +
          "<div class='icon-cat'>" +
          category.html() +
          "</div></div>";
      }

      map = L.marker([$item.data("latitude"), $item.data("longitude")], {
        icon: new CustomHtmlIcon({ html: mapPinHTML })
      });

      if (typeof archive !== "undefined") {
        $item.hover(
          function() {
            $(map._icon)
              .find(".map-popup")
              .addClass("map-popup-selected");
          },
          function() {
            $(map._icon)
              .find(".map-popup")
              .removeClass("map-popup-selected");
          }
        );

        map
          .bindPopup(
            "<div class='job-grid-style job_listing'>" +
              "<div class='listing-image'>" +
              "<div class='image-wrapper image-loaded'>" +
              "<a class='map-popup-url' href='" +
              $item.data("permalink") +
              "'>" +
              "<img src='" +
              $item.data("img") +
              "' alt=''>" +
              "</a>" +
              "</div>" +
              "<div class='listing-time'>" +
              $item.find(".listing-time").html() +
              "</div>" +
              "</div>" +
              "<div class='listing-content clearfix'>" +
              "<div class='listing-title-wrapper'>" +
              "<h3 class='listing-title'>" +
              $item.find(".listing-title").html() +
              "</h3>" +
              "<div class='listing-address'>" +
              $item.find(".listing-address").html() +
              "</div>" +
              "</div>" +
              "<div class='listing-review pull-left'>" +
              $item.find(".listing-review").html() +
              "</div>" +
              "<div class='listing-bookmark pull-right'>" +
              $item.find(".listing-bookmark").html() +
              "</div>" +
              "</div>" +
              "</div>"
          )
          .openPopup();
      }

      markers.addLayer(map);
    },
    previewMap: function() {
      var self = this;
      var $window = $(window);
      map = L.map("apus-preview-listing-map", {
        scrollWheelZoom: false
      });

      markers = new L.MarkerClusterGroup({
        showCoverageOnHover: false
      });

      CustomHtmlIcon = L.HtmlIcon.extend({
        options: {
          html: "<div class='map-popup'></div>",
          iconSize: [48, 59],
          iconAnchor: [24, 59],
          popupAnchor: [0, -59]
        }
      });

      $window.on("pxg:refreshmap", function() {
        map._onResize();
        setTimeout(function() {
          map.fitBounds(markers, {
            padding: [50, 50]
          });
        }, 100);
      });

      $window.on("pxg:simplerefreshmap", function() {
        map._onResize();
      });

      if (this.findgo_listing_opts.mapbox_token != "") {
        var tileLayer = L.tileLayer(
          "https://api.tiles.mapbox.com/v4/" +
            this.findgo_listing_opts.mapbox_style +
            "/{z}/{x}/{y}.png?access_token=" +
            this.findgo_listing_opts.mapbox_token,
          {
            maxZoom: 18,
            attribution:
              '&copy; <a href="http://mapbox.com">Mapbox</a> | &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
            id: "mapbox.streets"
          }
        );
      } else {
        if (this.findgo_listing_opts.custom_style != "") {
          try {
            var custom_style = $.parseJSON(this.findgo_listing_opts.custom_style);
            var tileLayer = new L.Google("ROADMAP", {}, custom_style);
          } catch (err) {
            var tileLayer = new L.Google("ROADMAP");
          }
        } else {
          var tileLayer = new L.Google("ROADMAP");
        }
        $("#apus-preview-listing-map").addClass("map--google");
      }

      map.addLayer(tileLayer);

      // check home/archive/single page

      var $item = $(".quickview-wrapper");
      if (
        typeof $item.data("latitude") !== "undefined" &&
        typeof $item.data("longitude") !== "undefined"
      ) {
        var zoom = typeof MapWidgetZoom !== "undefined" ? MapWidgetZoom : 15;
        self.addMakerToMap($item);
        map.addLayer(markers);
        map.setActiveArea("active-area");
        map.setView([$item.data("latitude"), $item.data("longitude")], zoom);
        $(window).on("update:map", function() {
          map.setView([$item.data("latitude"), $item.data("longitude")], zoom);
        });
      } else {
        $("#apus-preview-listing-map").hide();
        $(".listing-address").css("marginTop", 0);
      }
    },
    previewInit: function() {
      var self = this;
      $("a.listing-preview").on("click", function(e) {
        e.preventDefault();
        var $self = $(this);
        $self.addClass("loading");
        var listing_id = $(this).data("id");
        var url =
          this.findgo_listing_opts.ajaxurl +
          "?action=findgo_preview_listing&listing_id=" +
          listing_id;

        $.get(url, function(data, status) {
          $.magnificPopup.open({
            mainClass: "apus-mfp-zoom-in apus-preview-listing",
            items: {
              src: data,
              type: "inline"
            }
          });

          $(".preview-content-inner").perfectScrollbar();
          self.layzyLoadImage();
          self.previewMap();
          self.bookmarkInit();

          self.initSlick($(".quickview-slick"));

          $self.removeClass("loading");
        });
      });
    },
    submitForm: function() {
      var self = this;
      // section
      $("body").on("click", ".add-new-section-menu-price", function(e) {
        e.preventDefault();
        var length = $(".menu-prices-field-wrapper .menu-prices-section-item").length;
        var html = $(".menu-prices-field-wrapper .menu-prices-section-item")
          .eq(0)
          .clone(true);
        html
          .find(".input-section-title")
          .attr("name", "_job_menu_prices[" + length + "][section_title]");
        html
          .find(".input-section-item-title")
          .attr("name", "_job_menu_prices[" + length + "][title][]");
        html
          .find(".input-section-item-price")
          .attr("name", "_job_menu_prices[" + length + "][price][]");
        html
          .find(".input-section-item-description")
          .attr("name", "_job_menu_prices[" + length + "][description][]");

        $(".menu-prices-field-wrapper").append(html);
      });

      $("body").on("click", ".remove-section-menu-price", function(e) {
        e.preventDefault();
        var index = $(".menu-prices-field-wrapper .menu-prices-section-item")
          .last()
          .index();
        if (index > 0) {
          $(".menu-prices-field-wrapper .menu-prices-section-item")
            .eq(index)
            .remove();
        }
      });

      // section item
      $("body").on("click", ".add-new-menu-price", function(e) {
        e.preventDefault();
        var parent = $(this).parent();

        parent.find(".menu-prices-section-item-wrapper").append(
          $(".menu-prices-item", parent)
            .eq(0)
            .clone(true)
        );
      });
      $("body").on("click", ".remove-menu-price", function(e) {
        e.preventDefault();
        var parent = $(this).parent();

        var index = $(".menu-prices-item", parent)
          .last()
          .index();
        if (index > 0) {
          $(".menu-prices-item", parent)
            .eq(index)
            .remove();
        }
      });

      // hours
      if (typeof timepicker !== "undefined" && $(".timepicker").length > 0) {
        $(".timepicker").timepicker({
          timeFormat: this.findgo_listing_opts.timeFormat,
          noneOption: {
            label: this.findgo_listing_opts.none_option_label,
            value: this.findgo_listing_opts.none_option_value
          }
        });
      }
    },
    editProfile: function() {
      // user profile edit
      if ($("#change-profile-form-birthday").length > 0) {
        $("#change-profile-form-birthday").datepicker({
          defaultDate: "",
          dateFormat: "dd/mm/yy",
          numberOfMonths: 1,
          showButtonPanel: true
        });
      }
      $("form.change-profile-form").submit(function(e) {
        e.preventDefault();
        var self_form = $(this);
        self_form.addClass("loading");
        $.ajax({
          url: this.findgo_listing_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: self_form.serialize() + "&action=findgo_process_change_profile_form"
        }).done(function(data) {
          self_form.removeClass("loading");
          self_form.find(".msg").html(data.msg);
        });
      });
      // user change pass
      $("form.change-password-form").submit(function(e) {
        e.preventDefault();
        var self_form = $(this);
        self_form.addClass("loading");
        $.ajax({
          url: this.findgo_listing_opts.ajaxurl,
          type: "POST",
          dataType: "json",
          data: self_form.serialize() + "&action=findgo_process_change_password"
        }).done(function(data) {
          self_form.removeClass("loading");
          self_form.find(".msg").html(data.msg);
        });
      });

      var isAdvancedUpload = (function() {
        var div = document.createElement("div");
        return (
          ("draggable" in div || ("ondragstart" in div && "ondrop" in div)) &&
          "FormData" in window &&
          "FileReader" in window
        );
      })();

      if (isAdvancedUpload) {
        var droppedFiles = false;
        $(".label-can-drag").each(function() {
          var label_self = $(this);
          label_self
            .on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
              e.preventDefault();
              e.stopPropagation();
            })
            .on("dragover dragenter", function() {
              label_self.addClass("is-dragover");
            })
            .on("dragleave dragend drop", function() {
              label_self.removeClass("is-dragover");
            })
            .on("drop", function(e) {
              droppedFiles = e.originalEvent.dataTransfer.files;
              label_self
                .parent()
                .find('input[type="file"]')
                .prop("files", droppedFiles)
                .trigger("change");
            });
        });
      }

      $(document.body).on("click", ".job-manager-remove-uploaded-file", function() {
        $(this)
          .closest(".job-manager-uploaded-file")
          .remove();
        return false;
      });
    }
  });

  $.apusThemeExtensions.listing = $.apusThemeCore.listing_init;
})(jQuery);

if (typeof google === "object" && typeof google.maps === "object") {
  function search_location_initialize() {
    var input = document.getElementById("search_location");
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.setTypes([]);

    autocomplete.addListener("place_changed", function() {
      var place = autocomplete.getPlace();
      place.toString();
      if (!place.geometry) {
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }
      document.getElementById("search_lat").value = place.geometry.location.lat();
      document.getElementById("search_lng").value = place.geometry.location.lng();
      jQuery(".job_listings").triggerHandler("update_results", [1, false]);
    });
  }
  google.maps.event.addDomListener(window, "load", search_location_initialize);
}
