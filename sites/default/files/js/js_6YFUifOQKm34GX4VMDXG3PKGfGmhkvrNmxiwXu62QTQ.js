(function($, Drupal, undefined){
  /**
   * When set to enable mediaelement for all audio/video files add it to the page.
   */
  Drupal.behaviors.mediaelement = {
    attach: function(context, settings) {
      if (settings.mediaelement !== undefined) {
        // @todo Remove anonymous function.
        $.each(settings.mediaelement, function(selector, options) {
          var opts;
          $(selector, context).once('mediaelement', function() {
            if (options.controls) {
              $(this).mediaelementplayer(options.opts);
            }
            else {
              $(this).mediaelement();
            }
          });
        });
      }
      // The global option is seperate from the other selectors as it should be
      // run after any other selectors.
      if (settings.mediaelementAll !== undefined) {
        $('video,audio', context).once('mediaelement', function() {
          $(this).mediaelementplayer();
        });
      }
    }
  };
})(jQuery, Drupal);;
(function ($) {

/**
 * Attaches double-click behavior to toggle full path of Krumo elements.
 */
Drupal.behaviors.devel = {
  attach: function (context, settings) {

    // Add hint to footnote
    $('.krumo-footnote .krumo-call').once().before('<img style="vertical-align: middle;" title="Click to expand. Double-click to show path." src="' + settings.basePath + 'misc/help.png"/>');

    var krumo_name = [];
    var krumo_type = [];

    function krumo_traverse(el) {
      krumo_name.push($(el).html());
      krumo_type.push($(el).siblings('em').html().match(/\w*/)[0]);

      if ($(el).closest('.krumo-nest').length > 0) {
        krumo_traverse($(el).closest('.krumo-nest').prev().find('.krumo-name'));
      }
    }

    $('.krumo-child > div:first-child', context).dblclick(
      function(e) {
        if ($(this).find('> .krumo-php-path').length > 0) {
          // Remove path if shown.
          $(this).find('> .krumo-php-path').remove();
        }
        else {
          // Get elements.
          krumo_traverse($(this).find('> a.krumo-name'));

          // Create path.
          var krumo_path_string = '';
          for (var i = krumo_name.length - 1; i >= 0; --i) {
            // Start element.
            if ((krumo_name.length - 1) == i)
              krumo_path_string += '$' + krumo_name[i];

            if (typeof krumo_name[(i-1)] !== 'undefined') {
              if (krumo_type[i] == 'Array') {
                krumo_path_string += "[";
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += krumo_name[(i-1)];
                if (!/^\d*$/.test(krumo_name[(i-1)]))
                  krumo_path_string += "'";
                krumo_path_string += "]";
              }
              if (krumo_type[i] == 'Object')
                krumo_path_string += '->' + krumo_name[(i-1)];
            }
          }
          $(this).append('<div class="krumo-php-path" style="font-family: Courier, monospace; font-weight: bold;">' + krumo_path_string + '</div>');

          // Reset arrays.
          krumo_name = [];
          krumo_type = [];
        }
      }
    );
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.dateAdmin = {};

Drupal.behaviors.dateAdmin.attach = function (context, settings) {
  // Remove timezone handling options for fields without hours granularity.
  var $hour = $('#edit-field-settings-granularity-hour').once('date-admin');
  if ($hour.length) {
    new Drupal.dateAdmin.TimezoneHandler($hour);
  }
};


Drupal.dateAdmin = {};

/**
 * Constructor for the TimezoneHandler object.
 *
 * This object is responsible for showing the timezone handling options dropdown
 * when the user has chosen to collect hours as part of the date field, and
 * hiding it otherwise.
 */
Drupal.dateAdmin.TimezoneHandler = function ($checkbox) {
  this.$checkbox = $checkbox;
  this.$dropdown = $('#edit-field-settings-tz-handling');
  this.$timezoneDiv = $('.form-item-field-settings-tz-handling');
  // Store the initial value of the timezone handling dropdown.
  this.storeTimezoneHandling();
  // Toggle the timezone handling section when the user clicks the "Hour"
  // checkbox.
  this.$checkbox.bind('click', $.proxy(this.clickHandler, this));
  // Trigger the click handler so that if the checkbox is unchecked on initial
  // page load, the timezone handling section will be hidden.
  this.clickHandler();
};

/**
 * Event handler triggered when the user clicks the "Hour" checkbox.
 */
Drupal.dateAdmin.TimezoneHandler.prototype.clickHandler = function () {
  if (this.$checkbox.is(':checked')) {
    this.restoreTimezoneHandlingOptions();
  }
  else {
    this.hideTimezoneHandlingOptions();
  }
};

/**
 * Hide the timezone handling options section of the form.
 */
Drupal.dateAdmin.TimezoneHandler.prototype.hideTimezoneHandlingOptions = function () {
  this.storeTimezoneHandling();
  this.$dropdown.val('none');
  this.$timezoneDiv.hide();
};

/**
 * Show the timezone handling options section of the form.
 */
Drupal.dateAdmin.TimezoneHandler.prototype.restoreTimezoneHandlingOptions = function () {
  var val = this.getTimezoneHandling();
  this.$dropdown.val(val);
  this.$timezoneDiv.show();
};

/**
 * Store the current value of the timezone handling dropdown.
 */
Drupal.dateAdmin.TimezoneHandler.prototype.storeTimezoneHandling = function () {
  this._timezoneHandling = this.$dropdown.val();
};

/**
 * Return the stored value of the timezone handling dropdown.
 */
Drupal.dateAdmin.TimezoneHandler.prototype.getTimezoneHandling = function () {
  return this._timezoneHandling;
};

})(jQuery);
;
