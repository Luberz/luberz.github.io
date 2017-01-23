(function(){
	$(function($){
		
		/* Drake Added */
		// $(".GS_searchOpt").hide(); $(".GS_quotBox").hide(); $("#include_searchbox").show();
		/* Drake End */
		
		/* fix top effect for 'Source from GS' marketing page */
		if($(".SEO_MT_topFix").length>0){
			var el = $(".SEO_MT_topFix"), srh_el = $(".SEO_MT_searchFixWrap"), kw_el = $("[id^='Autocomplete_']:eq(0)");
			var rePos = true;
			var originT =$(".SEO_MT_fixPos").offset().top, elH = el.outerHeight();
			el.parent().height(elH);
			$(window).scroll(function(){
				var scrollH = $(this).scrollTop();
				if(scrollH >= originT){
					el.addClass("SEO_MT_topFixed");
					srh_el.addClass("SEO_MT_searchFixed");
					rePos= true;
					if(! kw_el.is(":hidden")){
						$(window).resize();
					}
				}
				else{
					el.removeClass("SEO_MT_topFixed");
					srh_el.removeClass("SEO_MT_searchFixed");
					if(rePos){
						$(window).resize();
						rePos = false;
					}
				}
			});
		}
        



        egsolUI.moShow({
        triggerId:"tailer_category",
        targetId:"tailer_nav",
        });


        $(window).scroll(function(){
        	if($(window).scrollTop()>0){
        	    $('.tailer_top_con').addClass('tailer_top_fixed');
        	    $('.cmHeader').addClass('tailer_top_fixed');
            }else{
        	    $('.tailer_top_con').removeClass('tailer_top_fixed');
        	    $('.cmHeader').removeClass('tailer_top_fixed');

            }
        })

        if($(window).width()<=1024){
        	var PPslideW = $('.tailer_pp_slide').width(),
        	    PPslideChild = $('.tailer_pp_list li'),
        	    PPslideChildW = parseInt((PPslideW-50)/3);
        	PPslideChild.css({'width':PPslideChildW});
        	$('.tailer_pp_list').width((PPslideChild.width()*PPslideChild.length)+(PPslideChild.length-1)*20);
        	$('.tailer_pp_slide').height(PPslideChild.height()+20);


        	// fix desktop slide Dot

        	// var slideMobileDot = Math.ceil(PPslideChild.length/3),
        	//     slideDotLth = $('.pp_slide_page span').length,
        	//     curNum = slideMobileDot - slideDotLth;
        	//     if(curNum > 0){
        	//     	for(var i = 0; i<curNum;i++){
        	//     		$('.pp_slide_page').append('<span class=""></span>');
        	//     	}
        	//     }else{
        	//     	return false;
        	//     }

        }	

        $('.tailer_verticalTab li').on('mouseover',function(){
        	$('.tailer_verticalTab li').removeClass('curList');
        	$(this).addClass('curList');
        })

        $('.tailer_verticalTab li').on('mouseout',function(){
        	$(this).removeClass('curList');
        })

		$('.HP_cateList>li').on('mouseover',function(){
			$(this).addClass('HP_cateList_cur');

		});
		$('.HP_cateList>li').on('mouseout',function(){
			$(this).removeClass('HP_cateList_cur');

		});

		  $(".tailer_pp_list").on("swipeleft",function(){
		      alert("您向左滑动！");
		   });  



		  egsolUI.clickShow({
		  triggerId:"mobile_nav",
		  targetId:"catBox",
		  });

	})
})(jQuery)

if($(window).width()<=1024){



         window.onload = function() {
             var slideUl = document.getElementById('tailer_pp_list');
             var slideLi = slideUl.getElementsByTagName('li');
             
             var sX = 0; 
             var sLeft = 0;
             var index = 0; 
             var curLeft = 0;
             var disX = 0; 

             slideUl.addEventListener('touchstart', touchstart, false);
             function touchstart(e) {
                 e.preventDefault();
                 sX = e.changedTouches[0].pageX;

                 sLeft = slideUl.style.transform ? -parseInt(/\d+/.exec(slideUl.style.transform)[0]) : 0;
                 slideUl.style.transition = 'none';

                 document.addEventListener('touchmove', touchmove, false);
                 document.addEventListener('touchend', touchend, false);
             }

             function touchmove(e) {
                 disX = e.changedTouches[0].pageX - sX;
                 curLeft = sLeft + disX;
                 slideUl.style.transform = 'translateX(' + curLeft + 'px)';
             }

             function touchend(e) {
                 if (disX > 50) {
                 	document.getElementById('tailer_pp_pre').click();
                 } 
                 if (disX < -50) {
                 	document.getElementById('tailer_pp_next').click();
                 };
                 slideUl.style.transition = "none";
                 slideUl.style.transform = 'translateX(' + -index*slideLi[0].offsetWidth + 'px)';
             }
         }      

}



