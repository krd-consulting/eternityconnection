(function($) {
  Drupal.behaviors.exampleModule = {
    attach: function (context, settings) {
      if ($('body').hasClass('page-appointments-week')) {
        var date = $(this).data("date");
      }
      else if ($('body').hasClass('page-appointments-week')) {

      }



      // Month view
      $(".single-day").each(function() {
        var date = $(this).data("date");
        if (typeof date != 'undefined') {
          var link = '<a href="/node/add/event-calendar?date=' + date
            + '&destination=appointments/month" title="Add new event">+</a>';
          $(this).append(link);
        }
        else {
          var date = $('.date-views-pager h3').html();
          // Week of June 18, 2017
          var link = '<a href="/node/add/event-calendar?date=' + date
            + '&destination=appointments/month" title="Add new event">+</a>';
          $(this).append('+++');
        }


      });
    }
  };
})(jQuery)
