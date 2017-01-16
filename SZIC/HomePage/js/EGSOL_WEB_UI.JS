
var egsolUI = {
	version: "1.0"
};

(function($){
	//init hover function
	/* UI Style: ui_hover */
	/* UI Attribute: hoverCls */
	egsolUI.initHover = function() {
		$(".ui_hover").each(function(){
			var $dom = $(this);
			if($dom.data("hasInitedHover"))
				return true;
			var hoverCls = $dom.attr("hoverCls");
			if (hoverCls) {
				$dom.mouseenter(function(){
					$dom.addClass(hoverCls);
				}).mouseout(function(event){
					var rt = event.relatedTarget;
					if(rt && rt != $dom.get(0) && !$.contains($dom.get(0), rt)) {
						$dom.removeClass(hoverCls);
					}
				});
			}
			$dom.data("hasInitedHover",true);
		});
	};

	//init input tip function
	/* UI Style: ui_input_tip */
	/* UI Attribute: tip, tipCls */
	egsolUI.initInputTip = function() {
		$(".ui_input_tip").each(function(){
			var $input = $(this);
			if($input.data("hasInitedInputTip"))
				return true;
			var tip = $input.attr("tip");
			var tipCls = $input.attr("tipCls");
			if (tip) {
				$input.attr("value",tip);
				if(tipCls) $input.addClass(tipCls);
				$input.bind("focus",function(){
					if($input.attr("value") == tip) {
						$input.attr("value","");
						if(tipCls) $input.removeClass(tipCls);
					}
				}).bind("blur",function(){
					if($input.attr("value") == "") {
						$input.attr("value",tip);
						if(tipCls) $input.addClass(tipCls);
					}
				});
			}
			$input.data("hasInitedInputTip",true);
		});
	};
	
	//multi input tip function
	egsolUI.multiInputTips = function(param){
		var $select=param.select,tips=param.tips,$input=param.input,tipCls=param.tipCls;
		var cur = $select.get(0) ? $select.get(0).selectedIndex : 0;
		$select.change(function(){
			if($input.val() == tips[cur]) {
				cur = $select.get(0).selectedIndex;
				$input.val(tips[cur]);
			}
			cur = $select.get(0).selectedIndex;
		});
		$input.mouseenter(function(){
			if($input.val() == tips[cur]) {
				$input.val('').focus();
				if(tipCls) $input.removeClass(tipCls);
			}
		}).bind('mouseleave blur',function(){
			if($input.val() == '') {
				if(tipCls) $input.addClass(tipCls);
				$input.val(tips[cur]).blur();
			}
		}).trigger('mouseleave');
	}

	//private show & hide function for inner call
	function _showAndHide(param) {
		var triggerType=param.triggerType,triggerId=param.triggerId,triggerStyle=param.triggerStyle,targetId=param.targetId;
		var posType=param.posType,left=param.left,top=param.top,disBodyClick=param.disBodyClick,isShowed=param.isShowed;
		var triggerHtml = param.triggerHtml;
		var $trigger = $("#"+triggerId);
		var $target = $("#"+targetId);
		if(triggerHtml){
			if(isShowed){
				$trigger.data("showHtml",$trigger.html());
				$trigger.data("hideHtml",triggerHtml);
			}else{
				$trigger.data("showHtml",triggerHtml);
				$trigger.data("hideHtml",$trigger.html());
			}		
		}
		//move to be body's child
		if (posType) { $("body").append($target); }
		if (!left) { left = 0; }
		if (!top) { top = 0; }
		if (triggerType == "click"){
			$trigger.click(function(event){
				setPos();
				if(triggerStyle){$trigger.toggleClass(triggerStyle);}
				if($target.is(":hidden")){
					beforeFunc("show");
					if(triggerHtml){$trigger.html($trigger.data("showHtml"));}
				}else{
					beforeFunc("hide");
				}
				$target.toggle();
				if($target.is(":hidden")){
					if(triggerHtml){$trigger.html($trigger.data("hideHtml"));}
					afterFunc("hide");
				}else{
					afterFunc("show");
				}
			});
			if(!disBodyClick){
				$("body").bind("click",function(event){
					var tar = event.target;
					if (tar && tar.id!=targetId && tar.id!=triggerId
							&& $(tar).parents("#"+targetId+",#"+triggerId).length == 0) {
						beforeFunc("hide");
						$target.hide();
						if(triggerStyle){$trigger.removeClass(triggerStyle);}
						if(triggerHtml){$trigger.html($trigger.data("hideHtml"));}
						afterFunc("hide");
					}
				});
			}
		}else if(triggerType == "mouseover") {
			$trigger.mouseenter(function(event){
				setPos();
				beforeFunc("show");
				if(triggerStyle){$trigger.addClass(triggerStyle);}
				if(triggerHtml){$trigger.html($trigger.data("showHtml"));}
				$target.show();
				afterFunc("show");
			});
			$("#"+triggerId+",#"+targetId).mouseleave(function(event){
				var rt = event.relatedTarget;
				if(rt && rt.id != targetId && rt.id != triggerId && 
					$(rt).parents("#"+triggerId+",#"+targetId).length==0) {
					beforeFunc("hide");
					if(triggerStyle){$trigger.removeClass(triggerStyle);}
					$target.hide();
					if(triggerHtml){$trigger.html($trigger.data("hideHtml"));}
					afterFunc("hide");
				}
			});
		}
		
		function setPos(){
			var triggerH = $trigger.outerHeight();
			var targetH = $target.outerHeight();
			var triggerW = $trigger.outerWidth();
			var targetW = $target.outerWidth();
			var triggerT = $trigger.offset().top;
			var triggerL = $trigger.offset().left;
			
			if(posType == "manual") {
				$target.css({left:left+"px",top:top+"px"});
			}else if(posType == "bottom") {
				$target.css({left:(triggerL+left)+"px",top:(triggerT+triggerH+top)+"px"});
			}else if(posType == "top") {
				$target.css({left:(triggerL+left)+"px",top:(triggerT-targetH+top)+"px"});
			}else if(posType == "left") {
				$target.css({left:(triggerL-targetW+left)+"px",top:(triggerT+top)+"px"});
			}else if(posType == "right") {
				$target.css({left:(triggerL+triggerW+left)+"px",top:(triggerT+top)+"px"});
			}else if(posType == "bottom_right") {
				$target.css({left:(triggerL+triggerW-targetW+left)+"px",top:(triggerT+triggerH+top)+"px"});
			}else if(posType == "cover") {
				$target.css({left:(triggerL+left)+"px",top:(triggerT+top)+"px"});
			}
		}
		function beforeFunc(action) {
			if(param.beforeHide && action=="hide") param.beforeHide($trigger,$target);
			if(param.beforeShow && action=="show") param.beforeShow($trigger,$target);
		}
		function afterFunc(action) {
			if(param.afterHide && action=="hide") param.afterHide($trigger,$target);
			if(param.afterShow && action=="show") param.afterShow($trigger,$target);
		}
	}

	//init click show function
	egsolUI.clickShow = function(param) {
		param.triggerType = "click";
		_showAndHide(param);
	};

	//init mouseover show function
	egsolUI.moShow = function(param) {
		param.triggerType = "mouseover";
		_showAndHide(param);
	};	

	//init multi-trigger mouseover show function
	egsolUI.mulMoShow =function(param) {
		var $triggers = param.triggers;
		param.triggerType = "mouseover";
		$triggers.each(function(index){
			if (!this.id || this.id == "") {
				this.id = "___UI_trigger"+index+"_"+param.targetId;
			}
			param.triggerId = this.id;
			_showAndHide(param);
		});
	}
	
	//init custom select function
	/* UI Attribute: optionVal */
	egsolUI.customSelect = function(param) {
		var $trigger = $("#"+param.triggerId);
		var $target = $("#"+param.targetId);
		var $optText = $("#"+param.optTextShowId);
		var $optValue = $("#"+param.valueInputId);
		var curOptStyle = param.optionStyle;
		var $opts = $target.children();
		var curIndex = 0;
		
		$opts.each(function(index,elem){
			$(elem).data("index",index);
		});
		if(curOptStyle){
			$opts.mouseenter(function(){
				$opts.removeClass(curOptStyle);
				$(this).addClass(curOptStyle);
			});
		}
		$opts.click(function(event){
			var $this = $(this);
			if(curOptStyle){
				$opts.removeClass(curOptStyle);
				$this.addClass(curOptStyle);
			}
			$optValue.attr("value",$this.attr("optionVal"));
			$optText.html($this.html());
			curIndex = $this.data("index");
			if(param.triggerStyle){$trigger.removeClass(param.triggerStyle);}
			$target.hide();
			event.stopPropagation();
			if(param.onchange){param.onchange($this.attr("optionVal"));}
		});
		param.triggerType = "click";
		param.afterHide = function () {
			if(curOptStyle){
				$opts.removeClass(curOptStyle);
				$($opts.get(curIndex)).addClass(curOptStyle);
			}
		};
		_showAndHide(param);
	};
	
	//show all function, an ajax call when has "dataUrl" param
	/* UI Attribute: dataUrl */
	egsolUI.showAll = function(param) {
		var dataUrl = param.dataUrl;
		var $trigger = param.trigger;
		var triggerStyle = param.triggerStyle;
		var triggerHtml = param.triggerHtml;
		if(triggerHtml){
			$trigger.data("oldHtml",$trigger.html());		
		}
		var $target = param.listContainer;
		var $hideElems;
		if($target.children().length>0 && $target.is(":hidden")) {
			$target.show();
			$hideElems = $target.children(":hidden");
			$target.hide();
		} else {
			$hideElems = $target.children(":hidden");
		}
		
		var $lastCont = $target.children(":last");
		var $newConts = null;
		$trigger.click(function() {
			var $this = $(this);
			if ($this.data("isShowing")) return false;

			if ($this.data("isShow"))
			{
				$this.data("isShow",false);
				if(param.beforeHide) param.beforeHide($trigger,$target);
				if(dataUrl){
					$newConts.hide();
				}else{
					$hideElems.hide();
				}
				if(triggerStyle){$trigger.toggleClass(triggerStyle);}
				if(triggerHtml){$this.html($this.data("oldHtml"));}
				if(param.afterHide) param.afterHide($trigger,$target);
				return;
			} else {
				if (!dataUrl || $newConts){
					if(param.beforeShow) param.beforeShow($trigger,$target);
					if(triggerStyle){$trigger.toggleClass(triggerStyle);}
					if(triggerHtml){$this.html(triggerHtml);}
					if(dataUrl){
						$newConts.show();
					}else{
						$hideElems.show();
					}
					if(param.afterShow) param.afterShow($trigger,$target);
					$this.data("isShow",true);
				} else {
					if(param.beforeShow) param.beforeShow($trigger,$target);
					if(triggerStyle){$trigger.toggleClass(triggerStyle);}
					if(triggerHtml){$this.html(triggerHtml);}
					$this.data("isShowing",true);
					$.get(dataUrl, function(data){
						$newConts = $(data).hide();
						if($lastCont.length<=0){
							$target.append($newConts);
						} else if($lastCont==$trigger || $lastCont.find($trigger).length>0) {
							$lastCont.before($newConts);
						} else {
							$lastCont.after($newConts);
						}
						$newConts.show();
						if(param.afterShow) param.afterShow($trigger,$target);
						$this.data("isShow",true);
						$this.data("isShowing",false);
					},"text");
				}
			}
			
		});
	};
	
	//init tab function
	/* UI Style: ui_tab_section|ui_tab_tit|ui_tab_con */
	/* UI Attribute: --|curStyle trigger|-- */
	egsolUI.initTab = function() {
		$(".ui_tab_section").each(function(){
			var $section = $(this);
			if($section.data("hasInitedTab"))
				return true;
			var $tit = $(".ui_tab_tit",$section);
			var titCurCls = $tit.attr("curStyle");
			var eventName = "mouseover";
			if($tit.attr('trigger') == 'click') {
				eventName = "click";
			}
			var $tits = $tit.children();
			var $con = $(".ui_tab_con",$section);
			var $cons = $con.children();
			$tits.each(function(index,elem){
				$(elem).data("index",index);
			});
			$tits.bind(eventName, function() {
				var $this = $(this);
				if(titCurCls){
					$tits.removeClass(titCurCls);
					$this.addClass(titCurCls);
				}
				
				var $curCon = $cons.eq($this.data("index"));
				if($curCon.data("isLoading")) {
					return true;
				}
				if($curCon.attr("data-url") && !$curCon.data("loaded")) {
					$curCon.data("isLoading", true);
					$.get($curCon.attr("data-url"), function(data){
						$curCon.html(data);
						$cons.hide();
						$curCon.show();
						$curCon.data("isLoading", false);
						$curCon.data("loaded", true);
						$curCon.trigger("UIEvent_Tab_ConLoaded");
					},"text");
				} else {
					$cons.hide();
					$curCon.show();
				}
				
			});
			$section.data("hasInitedTab",true);
		});
	};
	
	//init scroll function
	/* UI Style: ui_scroll_section|ui_scroll_win|ui_scroll_con|ui_scroll_page|ui_scroll_pre|ui_scroll_next|ui_scroll_extInfo */
	/* UI Attribute: speed autoInterval|--|scrollType(X/Y)|curStyle trigger|disableStyle|disableStyle|-- */
	egsolUI.initScroll = function(){
		$(".ui_scroll_section").each(function(){
			var $section = $(this);
			if($section.data("hasInitedScroll"))
				return true;
			var speed = 1000;
			if ($section.attr("speed")) {
				speed = parseInt($section.attr("speed"));
			}

			var $win = $(".ui_scroll_win",$section);
			var pHeight = $win.height();
			var pWidth = $win.width();

			var $page = $(".ui_scroll_page",$section);
			var pageCurCls = $page.attr("curStyle");
			var $pages = $page.children();

			var $nextBtn = $(".ui_scroll_next",$section);
			var nextCls = $nextBtn.attr("disableStyle");
			var $preBtn = $(".ui_scroll_pre",$section);
			var preCls = $preBtn.attr("disableStyle");

			var $extInfo = $(".ui_scroll_extInfo",$section);
			var $extInfos = $extInfo.children();

			var $con = $(".ui_scroll_con",$section);
			$con.css("position","absolute");
			var scrollType = "Y";
			if ($con.attr("scrollType")) {
				scrollType = $con.attr("scrollType");
			}

			var pageCount = 1;
			var curPageNo = 0;
			if (scrollType == "X") {
				var conW = 0;
				$con.children().each(function(){
					$(this).css({"display":"block", "float":"left"});
					conW = conW + $(this).outerWidth(true);
				});
				pageCount = Math.ceil(conW / pWidth);
				//for ie6 need more width 
				$con.width(conW + 3);
			} else {
				var conH = 0;
				$con.children().each(function(){
					$(this).css({"display":"block"});
					conH = conH + $(this).outerHeight(true);
				});
				pageCount = Math.ceil(conH / pHeight);
			}
			
			function gotoPage(pageNo) {
				if (pageNo<1 || pageNo>pageCount || pageNo==curPageNo) {
					return;
				}
				var scrollTo = -(pageNo-1) * (scrollType == "X" ? pWidth:pHeight);
				curPageNo = pageNo;
				updateStyle(pageNo);
				$con.stop(true,false);
				if (scrollType == "X") {
					$con.animate({left:scrollTo}, speed);
				} else {
					$con.animate({top:scrollTo}, speed);
				}
			}
			
			function updateStyle(pageNo){
				if (pageCurCls) {
					$pages.removeClass(pageCurCls);
					$($pages.get(pageNo-1)).addClass(pageCurCls);
				}
				if (nextCls) {
					if (pageNo == pageCount) {
						$nextBtn.addClass(nextCls);
					} else {
						$nextBtn.removeClass(nextCls);
					}
				}
				if (preCls) {
					if (pageNo == 1) {
						$preBtn.addClass(preCls);
					} else {
						$preBtn.removeClass(preCls);
					}
				}
				if ($extInfos.length > 0) {
					$extInfos.hide();
					$($extInfos.get(pageNo-1)).show();
				}
			}

			var eventName = "mouseover";
			if($page.attr('trigger') == 'click') {
				eventName = "click";
			}
			$pages.each(function(index,elem){
				$(elem).data("index",index);
				$(elem).bind(eventName, function(){
					gotoPage($(this).data("index") + 1);
				});
			});
			$nextBtn.click(function(){
				gotoPage(curPageNo + 1);
			});
			$preBtn.click(function(){
				gotoPage(curPageNo - 1);
			});

			gotoPage(1);

			var autoScrollInterval = $section.attr("autoInterval");
			if (autoScrollInterval) {
				function auto(){
					clearInterval($section.data("autoScroller"));
					$section.data("autoScroller",
						setInterval(function(){
							gotoPage((curPageNo+1>pageCount) ? 1 : curPageNo+1);
						}, autoScrollInterval)
					);
				}
				function pause(){
					clearInterval($section.data("autoScroller"));
				}
				$con.mouseenter(pause);
				$con.mouseleave(auto);
				$page.mouseenter(pause);
				$page.mouseleave(auto);
				$extInfo.mouseenter(pause);
				$extInfo.mouseleave(auto);
				auto();
			}
			$section.data("hasInitedScroll",true);
		});
	};
	
	//show overlay function
	egsolUI.showOverlay = function(param) {
		var $trigger = param.trigger;
		var $target = param.target;
		var showAtOnce = param.showAtOnce;
		if($target.length != 1) return;

		var isShowing = false;
		$("body").append($target);

		var $iframe = $("#ui_overlay_iframe");
		if ( $.browser.msie && $.browser.version.slice(0,3) == "6.0" ) {
			$target.css("position","absolute");
			if($iframe.length<=0){
				$iframe = $('<iframe id="ui_overlay_iframe"></iframe>');
				$iframe.css({opacity:"0","z-index":"888",position:"absolute",top:"0px",left:"0px",overflow:"hidden"});
				$("body").append($iframe);
				$iframe.hide();
			}
		} else {
			$target.css("position","fixed");
		}

		var $baselay = $("#ui_overlay_baselay");
		if($baselay.length<=0){
			$baselay = $('<div id="ui_overlay_baselay"></div>');
			$baselay.css({"background-color":"#ccc",opacity:"0.5","z-index":"999",position:"absolute",top:"0px",left:"0px"});
			$("body").append($baselay);
		}
		
		var setPos = function(){
			$iframe.width($(document).width()).height($(document).height());
			$baselay.width($(document).width()).height($(document).height());
			var h = $target.height();
			var w = $target.width();
			var top = parseInt(($(window).height()-h)/2) + "px";
			var left = parseInt(($(window).width()-w)/2) + "px";
			$target.css({top:top,left:left,bottom:"",right:""});
			$target.fixed(true);
		};
		var show = function(){
			if(param.beforeShow) param.beforeShow($trigger,$target);
			$iframe.show();
			$baselay.show();
			$target.css({"z-index":"9999"}).show();
			if(param.afterShow) param.afterShow($trigger,$target);
		};
		var hide = function(){
			if(isShowing){
				if(param.beforeHide) param.beforeHide($trigger,$target);
				$target.css({"z-index":""}).hide();
				$baselay.hide();
				$iframe.hide();
				isShowing = false;
				if(param.afterHide) param.afterHide($trigger,$target);
			}
		};

		if($trigger) {
			$trigger.click(function(){
				if(isShowing)return;
				isShowing = true;
				setPos();
				show();
			});
		}
		
		if(!param.disBodyClick) $baselay.click(hide);
		$target.find(".ui_overlay_close").click(hide);
		$(window).resize(function(){
			if(isShowing){
				setPos();
			}
		});
		if(showAtOnce) {
			isShowing = true;
			setPos();
			show();
		}
	};
	
	egsolUI.LoadBlock = (function(){
		var $trigger = $('<div>Elem as a trigger that will not be appended to body.</div>');
		var $target = $('<div class="loadBlockContent" style="display:none;">Loading...<input type="hidden" class="ui_overlay_close"/></div>');
		egsolUI.showOverlay({trigger:$trigger, target:$target, disBodyClick:true});
		return {
			show : function(){
				$trigger.click();
			},
			hide : function(){
				$target.find(".ui_overlay_close").click();
			}
		};
	})();
	
	//init open popup window function
	/* UI Style: ui_popup_window */
	/* UI Attribute: windowOptions */
	egsolUI.initPopupWindow = function() {
		var defaultParams = "toolbar=no,menubar=no,status=no,scrollbars=yes,resizable=yes,location=yes";//可以设置默认的参数
		$("a.ui_popup_window").each(function(index){
			var $dom = $(this);
			if($dom.data("hasInitedPopupWindow"))
				return true;
			var url = $dom.attr("href");
			if(!url) return;
			$dom.attr("href","javascript:void(0);");
			var name = "popup_window_"+index;
			var parameters = $dom.attr("windowOptions");
			if (!parameters) parameters = defaultParams;
			else parameters = defaultParams + "," + parameters;
			
			$dom.click(function(){
				window.open(url, name, parameters);
			});
			$dom.data("hasInitedPopupWindow",true);
		});
	};
	
	//onload
	$(function(){
		egsolUI.initTab();
		egsolUI.initHover();
		egsolUI.initInputTip();
		egsolUI.initScroll();
		egsolUI.initPopupWindow();
	});
	
})(jQuery);

//jquery extend
(function($){
	var $window = $(window);
	function _fixed($dom){
		var t = $dom.data("t");
		var l = $dom.data("l");
		var b = $dom.data("b");
		var r = $dom.data("r");

		var top,left;
		if(t != undefined) top = $window.scrollTop() + t + "px";
		else if(b != undefined) top = $window.height()+$window.scrollTop()-$dom.height()-b+"px";

		if(l != undefined) left = $window.scrollLeft() + l + "px";
		else if(r != undefined) left = $window.width()+$window.scrollLeft()-$dom.width()-r+"px";

		var p;
		if(top && left) p = {"top":top,"left":left};
		else if(top) p = {"top":top};
		else if(left) p = {"left":left};
		
		if (p) $dom.stop().animate(p,200);
	};
	
	$.fn.extend({
		fixed:function(reset){
			//only for IE6
			if ( $.browser.msie && $.browser.version.slice(0,3) == "6.0" ) {
				this.each(function(){
					var $this = $(this);
					if (reset) {
						var t = $this.css("top");
						var l = $this.css("left");
						var b = $this.css("bottom");
						var r = $this.css("right");
						if(!isNaN(parseInt(t))) $this.data("t",parseInt(t));
						if(!isNaN(parseInt(l))) $this.data("l",parseInt(l));
						if(!isNaN(parseInt(b))) $this.data("b",parseInt(b));
						if(!isNaN(parseInt(r))) $this.data("r",parseInt(r));
						_fixed($this);
					} else {
						_fixed($this);
					}
					if (!$this.data("winBind")) {
						$this.data("winBind",true);
						$window.scroll(function(){ _fixed($this); }).resize(function(){ _fixed($this); });
					}
				});
			}
		}
	});
	
})(jQuery);
