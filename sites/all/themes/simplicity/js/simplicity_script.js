/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
(function ($) {
    // customize the overlay property according to the different requested page.
    Drupal.behaviors.simplicity_script = {
        attach: function (context) {


            if ( $().sticky ) {
                $('header#navbar.sticky-wrapper').sticky({topSpacing:0});
            }; // if sticky exists

            $(".la-anim-1").addClass("la-animate");

            $(".loading_text i").addClass("rotating");

            $(window).load(function() {
                $(".loader").fadeOut();

                $('#masonry_container').masonry({
                    columnWidth: '.grid-sizer',
                    itemSelector: '.item',
                    isFitWidth: true
                });

                /*BLOG DIFERENT COLUMNS SIZES FIX*/

                function fitblogembeds() {

                    var height = $(".view-id-blog_custom .view-content .project_images:first,.page-blog .node-blog .project_images:first").find("img");

                    var head_element = $(".view-id-blog_custom .view-content .project_images:first,.page-blog .node-blog .project_images:first").find("img").closest(".blog_head");

                    console.log(head_element.height());

                    var video_embed_iframe = $(".view-id-blog_custom .view-content iframe,.page-blog .node-blog iframe").each(function(){
                        $(this).attr("height",height.parent().height() + "px");
                        $(this).attr("width","100%");

                        $(this).closest(".blog_head").attr("style","height:" + head_element.height() + "px;width:100%;");
                    });

                    var video_uploads = $(".view-id-blog_custom .view-content .mediaelement-video .mejs-container,.page-blog .node-blog .mediaelement-video .mejs-container").each(function(){

                        $(this).attr("style","height:" + height.parent().height() + "px;width:100%;");
                        //$(this).css("width","100%");
                        $(this).closest(".blog_head").attr("style","height:" + head_element.height() + "px;width:100%;");

                    });
                }

                fitblogembeds();

                $( window ).on( 'resize', function() {
                    fitblogembeds();
                });

            });

            $(document).ready(function() {

		$('ul.menu > li.expanded').hover(
			function() {
				$(this).addClass('open');
			},
			function() {
				$(this).removeClass('open');
			}
		);

                $('.flexslider').flexslider();

                //Portfolio
                $('.da-thumbs > li ').each( function() {
                    $(this).hoverdir();
                } );

                $('.da-thumbs li').hover(function(){
                        $(this).find(".social_icons").stop().fadeIn(300);
                },function(){
                    $(this).find(".social_icons").stop().hide();
                });

                $('#Grid').mixitup();

                $('.view-id-work.view-display-id-page_3 .item_inner').hover(function(){
                    $(this).find("div").css({top:$(this).height(),position:'absolute'}).stop().animate({
                        top: 0
                    }, 500,function(){

                        //SAME ON MASONRY
                        $(this).closest(".item_inner").find(".social_icons").stop().fadeIn(300);

                    });
                },function(){

                    $(this).closest(".item_inner").find(".social_icons").stop().hide();

                    $(this).find("div").stop().animate({
                        top:$(this).height()
                    }, 500,function(){

                    });
                });

                $(".top_button a.back_to_top").click(function(){

                    $('html, body').animate({
                        scrollTop: 0
                    }, 750,function(){

                    });

                });


            });

            //Load project details
            var work_list = $("#block-views-work-block");
            var work_detail_anchor = $(".view-id-work.view-display-id-block .work-list .views-row a");
            var button_open = $("a.open_project");
            var project_detail_wrapper = $(".portolio_detail_holder");
            var project_detail = $(".portolio_detail_holder .project_detail");

            var close_project_wrapper = $(".portolio_detail_holder .close_project");
            var close_project = $(".portolio_detail_holder a.close");

            var filter_view = $("#block-views-filter-controls-block");

            button_open.click(function(){

                var url = $(this).attr("href");

                project_detail.load(url + " #container_inner",function(){

                    $('.flexslider').flexslider();

                    $('html, body').animate({
                        scrollTop: work_list.offset().top + work_list.height() + 200
                    }, 750,function(){
                        project_detail_wrapper.slideDown(function(){

                            $('html, body').animate({
                                scrollTop: project_detail_wrapper.offset().top - 90
                            }, 750,function(){
                                project_detail.css('visibility','visible');
                                close_project_wrapper.show();
                            });


                        });
                    });

                });

                return false;



            });

            close_project.click(function(){

                project_detail.css('visibility','hidden');

                project_detail_wrapper.slideUp(function(){
                    project_detail.html("");
                    close_project_wrapper.hide();

                    $('html, body').animate({
                        scrollTop: work_list.offset().top - 70 - filter_view.height() - 70
                    }, 750,function(){

                    });

                });

                return false;

            });

            var support_transitions = Modernizr.csstransitions;

            var mobile_device = is_mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

            if (!support_transitions || mobile_device) {
                $("body").addClass('waypoint-no-effects');
            } else {
                $('.waypoint-effect').waypoint( function(direction) {

                    $(this).addClass($(this).attr('data-waypoint-effect'));

                }, { offset: "90%" });
            }

        }
    };
})(jQuery);



