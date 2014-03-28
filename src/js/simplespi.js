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

(function($, window, document, undefined) {
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
      self.parsePage(urlmodule.currentUrl());
    },

    /**
     * Search for links with the data-nav tag
     */
    parsePage: function(url) {
      var self = SimpleSPI;

      $('a[data-' + self.NAV_TAG + ']').each(function(index, elem) {
        var jelem = $(elem);
        if(jelem.attr('href')) {
          var new_url = urlmodule.str_2_url(jelem.attr('href'));

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
      if(!url.equals(urlmodule.currentUrl())) {
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
        if(url.ref) { // TODO move to client
          $('html, body').animate({ scrollTop: $('#' + url.ref).offset().top }, 500);
        }
        $(document).trigger(self.AFTER_NAVIGATE_EVENT, [url]);
        self.parsePage(url);

        // updates browser url
        var url_str = url.toString();
        history.pushState(url_str, "", url_str);
      });
    }
  };

  /**
   * Attaches the function 'sspiNavigagle' to jQuery
   */
  $.fn.sspiNavigable = function(options) {
    options.container = this;
    SimpleSPI.init(options);
    return this;
  }

})( jQuery, window, document );


/**
 * Represents part of URL http://host/page[#href][?params]
 */
var urlmodule = (function() {
  function Url(page, ref, params) {
    this.page = page;
    this.ref = ref;
    this.params = params;

    this.toString = function() {
      var str = this.page;
      var self = this;
      if(this.ref) {
        str += "#" + this.ref;
      }
      if(this.params && !$.isEmptyObject(this.params)) {
        str += Object.keys(this.params).reduce(function(previous, current, index, value) {
          return previous + (index > 0 ? '&' : '') + current + '=' + self.params[current];
        }, '?');
      }
      return str;
    };

    /** Compares this Url to another ignoring the ref */
    this.equals = function(other) {
      // compare page
      if(this.page !== other.page) {
        return false;
      }
      // Compare params
      if(this.params.length !== other.params.length) {
        return false;
      }
      for(param in this.params) {
        if(!other.params[param] || this.params[param] !== other.params[param]) {
          return false;
        }
      }
      // equals
      return true;
    };
  }

  function str_2_url2(path, search) {
    var parts = path.split('#');
    return str_2_url3(parts[0], parts[1], search);
  }
  function str_2_url3(page, ref, params) {
    var params_map = {};
    var params_a = params ? params.split('&') : [];
    for(var i = 0; i < params_a.length; ++i) {
      var p = params_a[i].split('=');
      if (p.length == 2) {
        params_map[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
    }
    return new Url(page, ref, params_map);
  }

  return {
    /** Returns the current url */
    currentUrl: function() {
      return str_2_url2(window.location.pathname, window.location.search);
    },
    /** Converts a string to url */
    str_2_url: function(str) {
      var parts = str.split('?');
      return str_2_url2(parts[0], parts[1]);
    }
  };
})();
