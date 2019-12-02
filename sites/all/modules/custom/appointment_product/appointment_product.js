Drupal.settings.ap = {};
var timezoneOffset = (new Date()).getTimezoneOffset();
(function($) {  
  var ap_check_is_weeks = function() {
    if($('#edit-weeks-or-months').val()==0) {
      $('.form-item-weeks').show();
      $('.form-item-months').hide();
    } else {
      $('.form-item-weeks').hide();
      $('.form-item-months').show();
    }
  }
  var ap_check_is_bulk = function() {
    if($('#edit-is-bulk').is(':checked')) {
      $('#edit-options').show();
    } else {
      $('#edit-options').hide();
    }
  }
  $(document).ready(function() {
		
		timezoneOffset = (new Date()).getTimezoneOffset();
		Drupal.settings.ap.endofstartweektime = Drupal.settings.ap.startweektime;
    
		if ($('.hidden_input').length>0) {
      $('.hidden_input').parent().hide();
    }
    Drupal.settings.ap.current_weeks = $('#edit-weeks .form-item').length;
    Drupal.settings.ap.current_months = $('#edit-months .form-item').length;
    if ($('#edit-startdatetime-datepicker-popup-0').length>0) {
      $('#edit-startdatetime-datepicker-popup-0').change(function() {
				var dateString = $('#edit-startdatetime-datepicker-popup-0').val();
				var dateArray = dateString.split("/");
				var date = new Date(dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2]);
				Drupal.settings.ap.startweektime = date.getTime()/1000 - timezoneOffset*60;
				Drupal.settings.ap.endofstartweektime = (Drupal.settings.ap.startweektime+24*3600)+((7-(new Date(Drupal.settings.ap.startweektime * 1000 + timezoneOffset*60000)).getDay()) % 7*24*3600);

  			var newdate = new Date(Drupal.settings.ap.startweektime * 1000 + timezoneOffset*60000);      
	  		var newdate2 = new Date((Drupal.settings.ap.startweektime+((7-newdate.getDay()) % 7*24*3600)) * 1000 + timezoneOffset*60000);      
      	
				$('.edit-weeks-1-text-label').html('Week 1' + '<br>' + newdate.getDate()+'.'+(newdate.getMonth()+1)+'.'+newdate.getFullYear().toString().substr(-2)
      +' - '+newdate2.getDate()+'.'+(newdate2.getMonth()+1)+'.'+newdate2.getFullYear().toString().substr(-2));	
			});
    }
    if ($('#edit-startdatetime-timeEntry-popup-1').length>0) {
      $('#edit-startdatetime-timeEntry-popup-1').change(function() {
        $('.ap_start_time').text($('#edit-startdatetime-timeEntry-popup-1').val());
      });
    }
    if ($('#edit-is-bulk').length>0) {
      ap_check_is_bulk();
      $('#edit-is-bulk').change(function(ev) {
        ap_check_is_bulk();
      });
    }
    if ($('#edit-weeks-or-months').length>0) {
      ap_check_is_weeks();
      $('#edit-weeks-or-months').change(function(ev) {
        ap_check_is_weeks();
      });
    }
    for(var i=1;i<9;i++) {
      if ($('.week_change_'+i).length>0) {
        $('.week_change_'+i).attr('href', 'javascript:;');
        $('.week_change_'+i).attr('onclick', 'ap_weeks_change_weeks('+i+');');
      }
    }
  });
})(jQuery);

var ap_weeks_remove_week = function() {
  if (Drupal.settings.ap.current_weeks>1) {
    jQuery('#edit-weeks .form-item').last().remove();
    Drupal.settings.ap.current_weeks--;
  }
}
var ap_weeks_add_week = function() {
  Drupal.settings.ap.current_weeks++;
  var d1 = new Date();
	

  var newdate = new Date((Drupal.settings.ap.endofstartweektime+((Drupal.settings.ap.current_weeks-2)*7*24*3600)) * 1000+d1.getTimezoneOffset()*60000);      
  var newdate2 = new Date((Drupal.settings.ap.endofstartweektime+6*24*3600+((Drupal.settings.ap.current_weeks-2)*7*24*3600)) * 1000+d1.getTimezoneOffset()*60000);      
  var item = jQuery('.form-item-weeks-1').clone();
  item.find('span').html('Week '+(Drupal.settings.ap.current_weeks)+'<br>'+newdate.getDate()+'.'+(newdate.getMonth()+1)+'.'+newdate.getFullYear().toString().substr(-2)
      +' - '+newdate2.getDate()+'.'+(newdate2.getMonth()+1)+'.'+newdate2.getFullYear().toString().substr(-2));
  item = item.prop('outerHTML').replace(/weeks-1/g,'weeks-'+Drupal.settings.ap.current_weeks).replace(/weeks\[1\]/g,'weeks['+Drupal.settings.ap.current_weeks+']');
  jQuery('.form-item-weeks-1').parent().append(item);
}
var ap_months_remove_month = function() {
  if (Drupal.settings.ap.current_months>1) {
    jQuery('#edit-months .form-item').last().remove();
    Drupal.settings.ap.current_months--;
  }
}
var ap_months_add_month = function() {
  Drupal.settings.ap.current_months++;
  var item = jQuery('.form-item-months-1').clone();
  var year = parseInt(Drupal.settings.ap.startyeartime)+parseInt((Drupal.settings.ap.startmonthtime+Drupal.settings.ap.current_months-1)/12);
  item.find('span').html('Month '+(Drupal.settings.ap.current_months)+'<br>'+Drupal.settings.ap.months_names[((Drupal.settings.ap.startmonthtime+Drupal.settings.ap.current_months)%12)]+' '+year);
  item = item.prop('outerHTML').replace(/months-1/g,'months-'+Drupal.settings.ap.current_months).replace(/months\[1\]/g,'months['+Drupal.settings.ap.current_months+']');
  jQuery('.form-item-months-1').parent().append(item);
}
var ap_weeks_change_weeks = function(param) {
  if (param==5 || param==6 || param==7 || param==8) {
    if (param==5) {
      for(var i=1;i<=5;i++) {
        ap_months_remove_month();
      }
    }
    if (param==6) {
      ap_months_remove_month();
    }
    if (param==7) {
      ap_months_add_month();
    }
    if (param==8) {
      for(var i=1;i<=5;i++) {
        ap_months_add_month();
      }
    }
  }
  if (param==1 || param==2 || param==3 || param==4) {
    if (param==1) {
      for(var i=1;i<=5;i++) {
        ap_weeks_remove_week();
      }
    }
    if (param==2) {
      ap_weeks_remove_week();
    }
    if (param==3) {
      ap_weeks_add_week();
    }
    if (param==4) {
      for(var i=1;i<=5;i++) {
        ap_weeks_add_week();
      }
    }
  }
} 
