/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function ($) {
    // customize the overlay property according to the different requested page.
    Drupal.behaviors.change_theme = {
        attach: function (context) {

            $(window).load(function() {

                function getParameterByName(name) {
                    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(location.search);
                    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
                }

                var value = getParameterByName("color");

                if(value != ""){

                    $('style').each(function () {

                        if($(this).html().indexOf("colors.css") >= 0){

                            $(this).html($(this).html().replace("colors.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_blue.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_red.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_salmon.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_yellow.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_salmon.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_bordeaux.css",value + ".css"));
                        }

                    });

                }


                $("ul.header li a").click(function(){

                    var value = $(this).attr("class");

                    $('style').each(function () {

                        $(this).html($(this).html().replace("colors.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_blue.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_red.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_salmon.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_yellow.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_salmon.css",value + ".css"));
                            $(this).html($(this).html().replace("colors_bordeaux.css",value + ".css"));


                        window.location.hash = '#' + value;

                    });

                    return false;
                });

                $("#show_colors").click(function(){

                    $("#switch").show();
                    $("#show_colors").hide();

                });

                $("#switch .close").click(function(){
                    $("#switch").hide();
                    $("#show_colors").show();
                });

                $(".select_layout_type").change(function(){

                    $("#wrapper_overall").attr("class",$( this ).val());

                    if($( this ).val() == "boxed"){
                        $("body").css("background","#e5e5e5");
                    }
                    else{
                        $("body").css("background","#ffffff");
                    }
                });


                $(".select_slideshow_type").change(function(){

                    if($( this ).val() == "partial"){

                        $("#navbar").attr("class","navbar navbar-default");

                        var header = $("#navbar").clone().wrapAll("<div/>").parent().html();

                        $( "#wrapper_overall" ).prepend(header);

                    }
                    else{

                        $("#navbar").attr("class","navbar navbar-default sticky-wrapper");

                        var header = $("#navbar").clone().wrapAll("<div/>").parent().html();

                        $( "#hero" ).after(header);

                    }

                    $("#navbar").remove();

                    $('header#navbar.sticky-wrapper').sticky({topSpacing:0});
                });

            });

        }
    };
})(jQuery);



;
