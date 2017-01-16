$(function(){
	// fashion slide width & height

	var winWidth = $(window).width();
	var navHeight = $('.fashionNav').height();
	$('.fashion_news_List li').width(winWidth);
	var fashionHigh = $('.fashion_news_List').height();
	$('.fashion_news_con').height(fashionHigh);
	if(winWidth<=950){
		$('.fashionNavCon').addClass('mobile_nav_fixed');
		$('body').css({'padding-top':navHeight});
	}
		if(winWidth<=540){
		var fashionBrandHigh = $('.fashion_brand_slide li').height();
		$('.fashion_brand_slide').height(fashionBrandHigh);
	}


	/* Repeat the page content function*/
			var UITemplate = function(param){
				var tmpl = param.tmpl.addClass(param.tmplCls).eq(0).clone();
				var tmplStr = tmpl.get(0).outerHTML;
				param.trigger.click(function(e){
					var newTmpl = $(tmplStr);
					newTmpl.find(':input').val('').removeAttr('checked').removeAttr('selected');
					$("."+param.tmplCls).last().after(newTmpl);
					if(param.afterShow) param.afterShow(newTmpl);
				});
			}

			if($(".ui_addBuer").length){

				UITemplate({ trigger: $(".ui_addBuer"), tmpl: $(".ui_buyerForm"), tmplCls: 'buyerFormTmpl', afterShow: function(newObj){
					var buyers = $(".buyerFormTmpl");
					var index = buyers.index(newObj);
					newObj.find('.buyerIndex').html(index+1).end().find(".form_secTit2,.form_secTit2More").show();
					newObj.find(":input[name]").each(function(){
						$(this).attr("name", $(this).attr("name").replace(/(\d+)/g, index) );
					});
					if(buyers.length >= 9 ){
						$(".form_addMore").hide();
					}
				}});

				$(".form_box").delegate('.ui_delBuyer','click',function(){
					var buyers = $(".buyerFormTmpl");
					var buyer = $(this).parents(".ui_buyerForm");
					var index = buyers.index(buyer);
					buyer.slideUp(function(){
						buyer.remove();
						if(index != (buyers.length-1)){
							$(".buyerIndex").each(function(index, el){
								$(el).text( index + 1 );
							});
							$(".ui_buyerForm").each(function(index, el){
								$(el).find(":input[name]").each(function(inputNo,inputEl){
									$(inputEl).attr("name", $(inputEl).attr("name").replace(/(\d+)/g, index ) );
								});
							});
						}
						if(buyers.length == 9){
							$(".form_addMore").show();
						}
					});
				});
			}



			egsolUI.moShow({
			triggerId:"nav_QRcode",
			targetId:"pop_QRcode",
			});
            


            egsolUI.clickShow({
            triggerId:"mobile_nav_con",
            targetId:"mobile_nav_list",
            });

            $(".mobile_nav_tag").click(function(){
            	$('#mobile_nav_list dd').hide();
                $(this).nextUntil('dt').slideToggle("slow");
              });



            $('.fashionNav .nav li').on('mouseover',function(){
           	$(this).children('.dropDownList_Nav').show();
           });
            $('.fashionNav .nav li').on('mouseout',function(){
           	$(this).children('.dropDownList_Nav').hide();
           });
            $('.dropDownList_Nav').on('mouseover',function(){
           	$(this).show();
           });


   // =S show photoview
   		
   	    var isDevice = ""; 		
   		/* show review gallery */
   		if($(".imgGallery").length){
   	    	var createReviewGallery = function(numPerView){
   	    		var reviewSwiper = new Swiper('.imgGallery_bimgCon',{
   	    			wrapperClass: "imgGallery_bimgs",
   	    			slideClass: "imgGallery_bimg",
   				    pagination: 'imgGallery_simgs',
   				    paginationElementClass: 'imgGallery_simg',
   				    paginationElement: "li",
   				    paginationClickable: true,
   				    resistance : '100%',
   				    cssWidthAndHeight: "height",
   				    createPagination: false,
   				    onSwiperCreated:function(){
   				    	$(".imgGallery_simg>a").click(function(e){$(this).parent().click();e.preventDefault();e.stopPropagation();});
   				    }
   				});

   	    		$('.imgGallery_bimgPrev').click(function(){
   	    			reviewSwiper.swipePrev();
   	    			$('.imgGallery_bimgPrev,.imgGallery_bimgNext').removeClass("imgGallery_bimgPrev_dis imgGallery_bimgNext_dis");
   				    if(reviewSwiper.activeIndex == 0 ){
   				    	$(this).addClass("imgGallery_bimgPrev_dis");
   				    }
   				    return false;
   	    		});
   	    		$('.imgGallery_bimgNext').click(function(){
   	    			reviewSwiper.swipeNext();
   	    			$('.imgGallery_bimgPrev,.imgGallery_bimgNext').removeClass("imgGallery_bimgPrev_dis imgGallery_bimgNext_dis");
   				    if(reviewSwiper.activeIndex>=(reviewSwiper.slides.length-reviewSwiper.params.slidesPerView)){
   				    	$(this).addClass("imgGallery_bimgNext_dis");
   				    }
   				    return false;
   	    		});

   				var reviewPgSwiper = new Swiper('.imgGallery_simgCon',{
   					wrapperClass: "imgGallery_simgs",
   	    			slideClass: "imgGallery_simg",
   				    createPagination :false,
   				    slidesPerView : numPerView,
   					slidesPerGroup : numPerView
   				});

   				$('.imgGallery_prev').on('click', function(e){
   				    e.preventDefault();
   				    reviewPgSwiper.swipePrev();
   				    $('.imgGallery_prev,.imgGallery_next').removeClass("imgGallery_prev_dis imgGallery_next_dis");
   				    if(reviewPgSwiper.activeIndex == 0 ){
   				    	$(this).addClass("imgGallery_prev_dis");
   				    }
   				    return false;
   				})
   				$('.imgGallery_next').on('click', function(e){
   				    e.preventDefault();
   				    reviewPgSwiper.swipeNext();
   				    $('.imgGallery_prev,.imgGallery_next').removeClass("imgGallery_prev_dis imgGallery_next_dis");
   				    if(reviewPgSwiper.activeIndex>=(reviewPgSwiper.slides.length-reviewPgSwiper.params.slidesPerView)){
   				    	$(this).addClass("imgGallery_next_dis");
   				    }
   				    return false;
   				})
   			};


   			if(isDevice){
   				$(".imgGallery_bimg .img,.imgGallery,.imgGallery_bimgCon").width(winWidth);
   				$(".imgGallery_simgCon").width(winWidth*0.96);
   			    $(".imgGallery_bimg .img").height( winW*566/847 );
   			    createReviewGallery('auto');
   			}else{
   				createReviewGallery(8);
   			}
   		} 	

   // =E show photoview
   
   /* switch news function */
   		var newsAutoIndex = 0;
   		$(".newsSlide_s").on("mouseenter","li",function(){
   			var num = $(this).index();
   			$(this).addClass("cur").siblings().removeClass("cur");
   			$(".newsSlide_b>li").stop().hide().eq(num).fadeIn(700,function(){
   				$(this).css("display","block");
   			});
   		});

   		if (isDevice) {
   			var newsSlideTimer = setInterval(function(){
   				var items = $(".newsSlide_s>li");
   				items.eq(newsAutoIndex++).trigger("mouseenter");
   				if(newsAutoIndex > items.length-1){newsAutoIndex=0;}
   			},3000);
   		}
   // =S news list banner effect 
   	    if($(".newsBanner").length){
   	    	var createNewsBanner = function(){
   	    		var hpBannerSwiper = new Swiper('.newsBanner',{
   				    pagination: '.circle_pg',
   				    paginationClickable: true,
   				    autoplay:6000,
   				    loop: true,
   				    onSwiperCreated: function(swiper){
   				      $(".newsBanner>.circle_pg>span").mouseover(function(){$(this).click();});
   				    }
   				});
   			};

   				createNewsBanner();
   		}

   		var newsBannerImg = $('.newsBanner .img').height();
   		$('.newsBanner').height(newsBannerImg);

    // =E news list banner effect 

    // =S lightBox function
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true
    })

    // =E lightBox function

});