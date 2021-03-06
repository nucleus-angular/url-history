/**
 * URL History Service
 *
 * @module nag.urlHistory
 * @ngservice nagUrlHistory
 */
angular.module('nag.urlHistory')
.factory('nagUrlHistory', [
  '$location',
  '$window',
  function($location, $window) {
    /**
     * List of the last urls being stored
     *
     * @property lastUrls
     * @type {string[]}
     */
    var lastUrls = [];

    return {
      /**
       * Adds the current url the the list of previously stored urls
       *
       * @method addCurrent
       * @chainable
       *
       * @returns {urlHistory} Instance of self
       */
      addCurrent: function() {
        lastUrls.push($location.url());

        while(lastUrls.length > 2) {
          lastUrls.shift();
        }

        return this;
      },

      /**
       * Replace the current history item with the last url that was recorded
       *
       * @method replace
       * @chainable
       *
       * @param {boolean} moveBackwards Whether or not to move back to the previous page when the replace it set
       *
       * @returns {urlHistory} Instance of self
       */
      replace: function(moveBackwards) {
        $location.path(lastUrls[0]);
        $location.replace();

        if(moveBackwards === true) {
          return this.goBack();
        }

        return this;
      },

      /**
       * Move the browser to the previous page
       *
       * @method goBack
       * @chainable
       *
       * @returns {urlHistory} Instance of self
       */
      goBack: function() {
        $window.history.back();

        return this;
      },

      /**
       * Move the browser to a specific page while ensuring all history cleanup is properly performed by angular
       *
       * @method goTo
       *
       * @param {string} url Url to move browser to
       *
       * @returns {urlHistory} Instance of self
       */
      goTo: function(url) {
        $window.location.href = url;
      }
    };
  }
]);
