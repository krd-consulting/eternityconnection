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
/*
 *  Create the splitter, set the viewport size, and set the position of the scrollbar to the first item.
 */
(function($){
  Drupal.behaviors.calendarSetScroll = {
  attach: function(context) {
    // Make multi-day resizable - stolen/borrowed from textarea.js
    $('.header-body-divider:not(.header-body-divider-processed)').each(function() {
      var divider = $(this).addClass('header-body-divider-processed');
      var start_y = divider.offset().top;

      // Add the grippie icon
      $(this).prepend('<div class="grippie"></div>').mousedown(startDrag);

      function startDrag(e) {
        start_y = divider.offset().top;
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        var offset = e.pageY - start_y;
        var mwc = $('#multi-day-container');
        var sdc = $('#single-day-container');
        var mwc_height = mwc.height();
        var sdc_height = sdc.height();
        var max_height = mwc_height + sdc_height;
        mwc.height(Math.min(max_height,Math.max(0,mwc_height + offset)));
        sdc.height(Math.min(max_height,Math.max(0,sdc_height - offset)));
        start_y = divider.offset().top;
        return false;
      }

      function endDrag(e) {
        $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
      }
     });

    $('.single-day-footer:not(.single-day-footer-processed)').each(function() {
      var divider = $(this).addClass('single-day-footer-processed');
      var start_y = divider.offset().top;

      // Add the grippie icon
      $(this).prepend('<div class="grippie"></div>').mousedown(startDrag);

      function startDrag(e) {
        start_y = divider.offset().top;
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        var offset = e.pageY - start_y;
        var sdc = $('#single-day-container');
        sdc.height(Math.max(0,sdc.height() + offset));
        start_y = divider.offset().top;
        return false;
      }

      function endDrag(e) {
        $(document).unbind("mousemove", performDrag).unbind("mouseup", endDrag);
      }
     });

     // Size the window
     calendar_resizeViewport($);
  }
};
})(jQuery);

// Scroll the viewport to the first item
function calendar_scrollToFirst($) {
   if ($('div.first_item').size() > 0 ) {
      var y = $('div.first_item').offset().top - $('#single-day-container').offset().top ;
      $('#single-day-container').scrollTop(y);
   }
}

// Size the single day view
function calendar_resizeViewport($) {
  // Size of the browser window
  var viewportHeight = window.innerHeight ? window.innerHeight : $(window).height();
  var top = $('#single-day-container').offset().top;

  // Give it a 20 pixel margin at the bottom
  //$('#single-day-container').height(viewportHeight - top - 20);
}
;
