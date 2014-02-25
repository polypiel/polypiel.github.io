/**
 * Simple library to load pages in a SPI way.
 * It requires jQuery.
 *
 * Options:
 *     toload       The css expresion of the element to load, default: #content
 *     container    The container element, default: body
 *
 * Callbacks:
 *     beforeNavigate    It's called just before loading the content
 *     afterNavigate     It's called just after the content is loaded
 */

(function( $, window, document, undefined ) {
  var SimpleSPI = {
    // consts
    NAV_TAG: "nav",
    BEFORE_NAVIGATE_EVENT: "simplespi.beforeNavigate",
    AFTER_NAVIGATE_EVENT: "simplespi.afterNavigate",

    defaults: {
      toLoad: "#content",
      container: $('body')
    },

    /**
     * Init method
     */
    init: function(config) {
      var self = SimpleSPI;
      self.config = $.extend({}, self.defaults, config);

      // events
      if(self.config.beforeNavigate) {
        $(document).on(self.BEFORE_NAVIGATE_EVENT, self.config.beforeNavigate);
      }
      if(self.config.afterNavigate) {
        $(document).on(self.AFTER_NAVIGATE_EVENT, self.config.afterNavigate);
      }

      // parse page
      var url = self.str_2_url2(window.location.pathname, window.location.search);
      self.parsePage(url);
    },

    /**
     * Search for links with the data-nav tag
     */
    parsePage: function(url) {
      var self = SimpleSPI;

      $('a[data-' + self.NAV_TAG + ']').each(function(index, elem) {
        var jelem = $(elem);
        if(jelem.attr('href')) {
          var new_url = self.str_2_url(jelem.attr('href'));

          // Checks the event is not registered
          jelem.off('click');
          // Binds click event
          jelem.on('click', null, {"url": new_url}, self.navigateEvent);
        }
      });
    },

    /**
     * Link clicked
     * @param e event
     */
    navigateEvent: function(e) {
      var self = SimpleSPI;

      e.preventDefault();

      var url = e.data['url'];
      if(!self.isCurrent(url)) {
        self.navigate(url);
      } else {
        if(url.ref) {
          $('html, body').animate({ scrollTop: $('#' + url.ref).offset().top }, 500);
        }
      }
    },

    /**
     * Navigates to the new content
     * @param new_url page to load
     * @param params a map with the parameters
     */
    navigate: function(url) {
      var self = SimpleSPI;

      $(document).trigger(self.BEFORE_NAVIGATE_EVENT, [url]);

      self.config.container.load(url.page + ' ' + self.config.toLoad, function() {
        if(url.ref) {
          $('html, body').animate({ scrollTop: $('#' + url.ref).offset().top }, 500);
        }
        $(document).trigger(self.AFTER_NAVIGATE_EVENT, [url]);
        self.parsePage(url);
      });

      // updates browser url
      var url_str = self.url_2_str(url);
      history.pushState(url_str, "", url_str);
    },

    isCurrent: function(url) {
      if(url.page === window.location.pathname) {
        // TODO comparar parameters
        /*
        if(!url.page_params || url.page_params === window.location.search.substr() {
          return true;
        }
        */
        return true;
      }
      return false
    },

    str_2_url: function(str) {
      var self = SimpleSPI;
      var parts = str.split('?');
      return self.str_2_url2(parts[0], parts[1]);
    },
    str_2_url2: function(path, search) {
      var self = SimpleSPI;
      var parts = path.split('#');
      return self.str_2_url3(parts[0], parts[1], search);
    },
    str_2_url3: function(page, ref, params) {
      var url = {"page": page};
      if(ref) { url.ref = ref; }
      if(params) {
        url.params = {};
        var params_a = params.split('&');
        for(var i = 0; i < params_a.length; ++i) {
          var p = params_a[i].split('=');
          if (p.length == 2) {
            url.params[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
          }
        }
      }
      return url;
    },
    url_2_str: function(obj) {
      var str = obj.page;
      if(obj.ref) {
        str += "#" + obj.ref;
      }
      if(obj.params) {
        str += Object.keys(obj.params).reduce(function(previous, current, index, value) {
          return previous + (index > 0 ? '&' : '') + current + '=' + obj.params[current];
        }, '?');
      }
      return str;
    }
  };


  /**
   * Attaches the function 'sspiNavigagle' to jQuery
   */
  $.fn.sspiNavigable = function(options) {
    options.container = this;
    SimpleSPI.init(options);
  };

})( jQuery, window, document );
