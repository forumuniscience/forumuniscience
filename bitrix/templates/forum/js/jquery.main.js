// page init
jQuery(window).on('load', function() {
	initLayout();
	//initInView();
});

// page layout init
function initLayout() {
 	$('.print,.print-en').click(function(e){
		e.preventDefault();
		window.print();
	})

	$('.fancybox').fancybox({
		padding: 0
	});

	jQuery.validator.addMethod("leteronly", function(value, element, param) {
	  return value.match(new RegExp("^" + param + "$"));
	});
	var options =  {
	  maxlength: false
	}
	$("input[name='date_of_birth']").mask('00.00.0000', options);
	//$("input[name='work_phone'],input[name='mobile_phone'],input[name='REGISTER[PERSONAL_PHONE]']").mask('+7(000) 000-00-00', options);

	$("input[name='name'],input[name='post'],input[name='degree'],input[name='academic_title'],input[name='city'],input[name='organization'],textarea[name='interest'],input[name='whence'],input[name='REGISTER[NAME]'],input[name='REGISTER[PERSONAL_CITY]'],input[name='REGISTER[UF_RESEARCH_INTERESTS]'],input[name='REGISTER[UF_ACADEMIC_DEGREE]'],input[name='REGISTER[PERSONAL_PROFESSION]']").bind("change keyup input click", function() {
		if (this.value.match(/[^a-zA-Zа-яА-Я ]/g)) {
			this.value = this.value.replace(/[^a-zA-Zа-яА-Я ]/g, '');
		}
	});
	$("input[name='work_phone'],input[name='business_telephone'],input[name='personal_phone'],[name='mobile_phone'],input[name='REGISTER[PERSONAL_PHONE]']").bind("change keyup input click", function() {
			if (this.value.match(/[a-zA-Zа-яА-Я]/g)) {
			this.value = this.value.replace(/[a-zA-Zа-яА-Я]/g, '');
		}
	});
	$("#accreditation").validate({
 	  rules: {
		name: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		date_of_birth: {
			required: true,
			minlength: 10
		},
		pasport: {
			required: true,
		},
		registered_address: {
			required: true,
		},
		personal_phone: {
			required: true
		},
		post: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		work_at_forum: {
			required: true,
		},
		name_mmi: {
			required: true,
		},
		profile_media: {
			required: true,
		},
		editorial_address: {
			required: true,
		},
		business_telephone: {
			required: true,
		},
		subject_publication: {
			required: true,
		}
	},
		submitHandler:function(){
			$form = $("#accreditation");
			var url = $form.attr('action');
			var datos = $form.serialize();
			$.post(url, datos, function (result) {
				resetForm("#accreditation");
				$.fancybox($('#popup2'),{padding:0});
			});
		}
	});
	$("#participation").validate({
 	  rules: {
		name: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		date_of_birth: {
			required: true,
			minlength: 10
		},
		degree: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		academic_title: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		city: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		organization: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		post: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		work_length: {
			required: true,
		},
		email: {
			required: true,
			email: true
		},
		work_phone: {
			required: true
		},
		mobile_phone: {
			required: true
		},
		interest: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		whence: {
			required: true,
			leteronly: "[a-zA-Zа-яА-Я ]+",
		},
		captcha_word: {
			required: true,
		}

	},
		submitHandler:function(){
			$form = $("#participation");
			var url = $form.attr('action');
			var datos = $form.serialize();
			$.post(url, datos, function (result) {
				console.log(result);
				if (result == "error"){
					alert("Не верная капча");
				}
				else{
					resetForm("#participation");
					$.fancybox($('#popup2'),{padding:0});
				}
			});
		}
	});
	if(window.location.pathname == "/registration/" || window.location.pathname == "/en/registration/"){
 		$('input#send').click(function(e){
			e.preventDefault();
			$.post('/ajax/check_login.php', {login:$('input[name="REGISTER[LOGIN]"]').val()}, function (data) {
				if(data.result != true){
					$('label.error').remove();
					$('input[name="REGISTER[LOGIN]"]').after('<label class="error" for="REGISTER[LOGIN]">' + data.result + '</label>');
				}else{
					$('input[name="register_submit_button"]').click();
				}
			});
		});
		$("form[name='regform']").validate({
			rules: {
			},
			errorPlacement : function(error, element) {
				if($(element).prop("name") == "REGISTER[CONFIRM_PASSWORD]") {
					//$('.pass_err').show();
					$('#note').html(error);
				}
				else {
					error.insertAfter(element); // default error placement.
				}
			}

		});
		$('input[name="REGISTER[LOGIN]"]').focusout(function(){
			$.post('/ajax/check_login.php', {login:$('input[name="REGISTER[LOGIN]"]').val()}, function (data) {
				if(data.result != true){
					$('label.error').remove();
					$('input[name="REGISTER[LOGIN]"]').after('<label class="error" for="REGISTER[LOGIN]">' + data.result + '</label>');
					$('input[name="REGISTER[LOGIN]"]').addClass('error');
				}
			});
		});
		$('input[name="REGISTER[NAME]"]').rules('add',
			{
				leteronly: "[a-zA-Zа-яА-Я ]+",
			}
		);
		$('input[name="REGISTER[LOGIN]"]').rules('add',
			{
				minlength:3
			}
		);
		$('input[name="REGISTER[EMAIL]"]').rules('add',
			{
				email:true
			}
		);
		$('input[name="REGISTER[PASSWORD]"]').rules('add',
			{
				minlength:6
			}
		);

		$('input[name="REGISTER[CONFIRM_PASSWORD]"]').rules('add',
			{
				equalTo: "input[name='REGISTER[PASSWORD]']",
			}
		);
		$('input[name="REGISTER[PERSONAL_PHONE]"]').rules('add',
			{
				minlength:17,
			}
		);
		$('input[name="REGISTER[PERSONAL_CITY]"]').rules('add',
			{
				leteronly: "[a-zA-Zа-яА-Я ]*",
			}
		);
		$('input[name="REGISTER[PERSONAL_PROFESSION]"]').rules('add',
			{
				leteronly: "[a-zA-Zа-яА-Я ]*",
			}
		);
		$('input[name="REGISTER[UF_ACADEMIC_DEGREE]"]').rules('add',
			{
				leteronly: "[a-zA-Zа-яА-Я ]*",
			}
		);
		$('input[name="REGISTER[UF_RESEARCH_INTERESTS]"]').rules('add',
			{
				leteronly: "[a-zA-Zа-яА-Я ]*",
			}
		);
	}

	//$('.rc-anchor-normal').width(317);

	$('#feedback').submit(function (event) {
		event.preventDefault();

		var nameField = $('#feedback input[name="name"]');
		var nameFieldVal = nameField.val();

		if(nameFieldVal == '')
		{
			nameField.addClass('error');
		}
		else
		{
			nameField.removeClass('error');

			// Работа с виджетом recaptcha
			// 1. Получить ответ гугл капчи
			var captcha = grecaptcha.getResponse();


			// 2. Если ответ пустой, то выводим сообщение о том, что пользователь не прошёл тест.
			// Такую форму не будем отправлять на сервер.
			if (!captcha.length) {
			  // Выводим сообщение об ошибке
				$('#recaptchaError').text('* Вы не прошли проверку "Я не робот"');
			} else {
			  // получаем элемент, содержащий капчу
				$('#recaptchaError').text('');

				//submitHandler:function(){
					$form = $("#feedback");
					var url = $form.attr('action');
					var datos = $form.serialize();
					$.post(url, datos, function (result) {
						$.fancybox.close();
						$.fancybox($('#popup2'),{padding:0});
						resetForm("#feedback");
					});
				//}
			}


			// 3. Если форма валидна и длина капчи не равно пустой строке, то отправляем форму на сервер (AJAX)
			//if ((captcha.length)) {



				/*$("#feedback").validate({
					rules: {
						name: {
							required: true,
							leteronly: "[a-zA-Zа-яА-Я ]+",
						},
						email: {
							email: true
						}
					},

				});*/

			//}

			// 4. Если сервер вернул ответ error, то делаем следующее...
			// Сбрасываем виджет reCaptcha
			grecaptcha.reset();
			// Если существует свойство msg у объекта $data, то...
			/*if ($data.msg) {
				// вывести её в элемент у которого id=recaptchaError
				$('#recaptchaError').text($data.msg);
			}*/
		}
	});






	$('#login-sent').click(function(e){
		e.preventDefault();
		$form = $('form#login-form');
		var url = $form.attr('action');
		var datos = $form.serialize();
 		$.post(url, datos, function(data){
 			if(data.result){
				window.location.reload();
			}else{
				if(data.errors.login){
					$('#errors').html(data.errors.login);
					$('form#login-form').find('input[name="login"]').addClass('error');
				}else if(data.errors.password){
					$('#errors').html(data.errors.password);
					$('form#login-form').find('input[name="login"]').removeClass('error');
					$('form#login-form').find('input[name="password"]').addClass('error');
				}else{
					$('#errors').html(data.errors.unknown);
				}
			}
		});
    });

	$('.video-holder').on('click','#link-video',function(e){
		e.preventDefault();
		$(this).hide();
		$(this).parents('.video-holder').find('a.nolink').show();
		$('div[id$="div_jwplayer_display"]')[0].click();
	});
	$('.video-holder').on('click','a.nolink',function(e){
		e.preventDefault();
		$(this).parents('.video-holder').find('div[id$="div_jwplayer_display"]').click();
		$(this).parents('.video-holder').find('#link-video').show();
	});

	$('body').on('click','#video-list a.link',function(e){
		e.preventDefault();
		$(this).hide();
		$(this).parents('li').find('a.nolink').show();
 		$temp1 = $(this);
		$video = $(this).closest('li');
		$video.find('div[id$="div_jwplayer_display"]').click();
	});
 	$('body').on('click','#video-list a.nolink',function(e){
		e.preventDefault();
		$(this).parents('li').find('div[id$="div_jwplayer_display"]').click();
		$(this).parents('li').find('a.link').show();
	});
	$('.main .box-wrap-all').each(function(k,v){
		jQuery('.main').fixedSlideBlock({
			slideBlock: '.box-wrap'+ (k+1),
			extraHeight: 40*k
		});
		$('body').on('click', '.box-wrap'+ (k+1) +' a[href^=#]', function () {
			var target = $(this).attr('href');
			$('html, body').animate({scrollTop: $(target).offset().top-k*40}, 300);
			return false;
		});
	});

	$('body').find('a').each(function(i,elem){
		var href = $(elem).attr('href');
		if (href) {
			var tmp = $(elem).attr('href').substr(0,4);
			if (tmp == 'http' || tmp == 'www.') $(elem).attr('target',"_blank");
		}
	});
}
function resetForm(el) {
    $(el).each(function () {
        this.reset();
    });
}
// Fixed Slide Block plugin
;(function(){
	jQuery.fn.fixedSlideBlock = function(options) {
		var options = jQuery.extend({
			slideBlock: '#sidebar',
			alwaysStick: true,
			animDelay: 100,
			animSpeed: 250,
			extraHeight: 0,
			positionType: 'auto' // 'fixed', 'absolute'
		}, options);

		return this.each(function(){
			var win = jQuery(window);
			var holder = jQuery(this);
			var fixedBlock = holder.find(options.slideBlock);
			var positionType = options.positionType, timer, d, stayStatic, prevHeight;

			// skip if block does not exists
			if(!fixedBlock.length) {
				return;
			}

			// detect positioning type
			if(positionType === 'auto') {
				positionType = !isFixedPositionSupported || isTouchDevice ? 'absolute' : 'fixed';
			}

			// recalculate all values
			function recalculateDimensions() {
				var origStyle = fixedBlock.attr('style');
				fixedBlock.css({position:'',left:'',top:''});
				d = {
					winHeight: win.height(),
					scrollTop: win.scrollTop(),
					scrollLeft: win.scrollLeft(),
					holderOffset: holder.offset(),
					holderHeight: holder.height(),
					blockPosition: fixedBlock.position(),
					blockOffset: fixedBlock.offset(),
					blockHeight: fixedBlock.outerHeight(true)
				};
				fixedBlock.attr('style',origStyle);

				// check for static position
				if(prevHeight !== d.holderHeight) {
					prevHeight = d.holderHeight;
					stayStatic = checkStaticPosition();
				}
			}

			// dont fix block if content too small
			function checkStaticPosition() {
				var origStyle = fixedBlock.attr('style');
				var origHeight = d.holderHeight;
				fixedBlock.css({position:'absolute'});
				var newHeight = holder.height();
				if(newHeight < origHeight) {
					fixedBlock.css({position:'', top:'', left:''});
					return true;
				} else {
					fixedBlock.attr('style',origStyle);
				}
			}

			function positionFixed() {
				if(d.scrollTop > d.blockOffset.top - options.extraHeight) {
					// check that block fits in holder
					if(d.scrollTop + options.extraHeight - d.holderOffset.top + d.blockHeight > d.holderHeight) {
						fixedBlock.css({position:'absolute', left: d.blockPosition.left, top: d.blockPosition.top + d.holderHeight - d.blockHeight - (d.blockOffset.top - d.holderOffset.top)});
					}
					// set default fixed position
					else {
						fixedBlock.css({position:'fixed', left: d.blockOffset.left - d.scrollLeft, top: options.extraHeight});
					}
				} else {
					// disable sticking
					fixedBlock.css({position:'', top:'', left:''});
				}
			}

			function positionAbsolute(noAnimation) {
				// default top position
				var top = d.blockPosition.top;
				if(d.scrollTop > d.blockOffset.top - options.extraHeight) {
					// check that block fits in holder
					if(d.scrollTop + options.extraHeight - d.holderOffset.top + d.blockHeight > d.holderHeight) {
						top = d.blockPosition.top + d.holderHeight - d.blockHeight - (d.blockOffset.top - d.holderOffset.top);
					}
					// set fixed position
					else {
						top = d.blockPosition.top + d.scrollTop - d.blockOffset.top + options.extraHeight;
					}
				}
				fixedBlock.stop().css({position:'absolute', left: d.blockPosition.left});

				// change block position animation
				if(noAnimation === true) {
					fixedBlock.css({top: top});
				} else {
					fixedBlock.animate({top: top},{duration: options.animSpeed});
				}
			}

			// reposition function
			function reposition(e) {
				// detect behavior
				var noAnimation = (e === true);

				// recalculate size and offsets
				recalculateDimensions();
				if(stayStatic) {
					return;
				}

				// disable when window is smaller then fixed block
				if(!options.alwaysStick && d.winHeight < d.blockHeight) {
					fixedBlock.css({position:'', top:'', left:''});
					return;
				}

				// call position handler
				if(positionType === 'fixed') {
					positionFixed();
				} else {
					if(noAnimation) {
						positionAbsolute(noAnimation);
					}
					clearTimeout(timer);
					timer = setTimeout(positionAbsolute, options.animDelay);
				}
			}

			// add event handlers
			setTimeout(function() {
				reposition(true);
				win.bind('scroll', reposition);
				win.bind('resize orientationchange', function(){
					reposition(true);
				});
			},10);
		});
	};

	// detect device type
	var isTouchDevice = (function() {
		try {
			return ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
		} catch (e) {
			return false;
		}
	}());

	// detect position fixed support
	var isFixedPositionSupported = (function(){
		var supported = false, container = document.createElement('div'), fixedBlock = document.createElement('div');
		container.style.cssText = 'position:absolute;top:9px;left:9px;width:100px;height:100px;background:red;';
		fixedBlock.style.cssText = 'position:fixed;top:7px;width:1px;height:1px;';
		container.appendChild(fixedBlock);
		document.documentElement.insertBefore(container, document.documentElement.childNodes[0]);
		supported = (fixedBlock.offsetTop == 7 || fixedBlock.offsetTop == -2 || (!fixedBlock.offsetWidth && typeof document.documentElement.style.maxHeight !== 'undefined'));
		document.documentElement.removeChild(container);
		fixedBlock = container = null;
		return supported;
	}());
}());

// in view jQuery plugin. fires callbacks when target is visible (in view area)
;(function($) {
	function InView(options) {
		this.options = $.extend({
			once: false,
			viewOn: null,
			viewOff: null
		}, options);
		this.init();
	}
	InView.prototype = {
		init: function() {
			if(this.options.holder) {
				this.findElements();
				this.initPlugins();
			}
		},
		findElements: function() {
			this.holder = $(this.options.holder);
		},
		initPlugins: function() {
			this.viewManagerAPI = window.ViewManager;
			this.viewManagerAPI.addView(this);
		},
		innerScroll: function(scrollTop, winH) {
			this.scrollTop = scrollTop;
			this.windowH = winH;

			if(this.isVisible()) {
				if(!this.showed) {
					this.showed = true;
					this.viewOn();
				}
			} else {
				if(typeof this.showed === 'undefined' || this.showed) {
					this.showed = false;
					this.viewOff();
				}
			}
		},
		isVisible: function() {
			return this.scrollTop + this.windowH >= this.offsetTop && this.scrollTop <= this.offsetTop + this.holderHeight
		},
		viewOn: function() {
			if(this.options.once) {
				this.viewManagerAPI.removeView(this);
				setTimeout($.proxy(function() {
					this.viewManagerAPI.onWinResize();
					this.viewManagerAPI.onWinScroll();
				}, this), 300);
			}
			if($.isFunction(this.options.viewOn)) {
				this.options.viewOn(this);
			}
		},
		viewOff: function() {
			if($.isFunction(this.options.viewOff)) {
				this.options.viewOff(this);
			}
		}
	}
	$.fn.inView = function(options) {
		return this.each(function() {
			$(this).data('InView', new InView($.extend(options, {holder: this})));
		})
	}

	function ViewManager(options) {
		this.init();
	}
	ViewManager.prototype = {
		init: function() {
			this.findElements();
			this.attachEvents();
		},
		findElements: function() {
			this.win = $(window);
			this.views = [];
			this.scrollTop = this.win.scrollTop();
		},
		attachEvents: function() {
			this.win.bind('scroll', $.proxy(this.onWinScroll, this));
			this.win.bind('resize orientationchange', $.proxy(this.onWinResize, this));
			this.win.bind('load', $.proxy(function() {
				setTimeout($.proxy(function() {
					this.onWinResize();
					this.onWinScroll();
				}, this), 800);
			}, this));
		},
		addView: function(obj) {
			obj.keyVal = this.isIElt9 ? new Date().valueOf() : Date.now();
			obj.offsetTop = obj.holder.offset().top;
			obj.holderHeight = obj.holder.outerHeight();
			this.views.push(obj);
		},
		removeView: function(obj) {
			for(var i = 0; i < this.views.length; i++) {
				if(this.views[i] && this.views[i].keyVal === obj.keyVal) {
					delete this.views[i];
					break;
				}
			}
		},
		updateInfo: function() {
			for(var i = 0; i < this.views.length; i++) {
				if(this.views[i]) {
					this.views[i].innerScroll(this.scrollTop, this.winH);
				}
			}
		},
		onWinResize: function() {
			this.winW = this.win.width();
			this.winH = this.win.innerHeight();
			for(var i = 0; i < this.views.length; i++) {
				if(this.views[i]) {
					this.views[i].offsetTop = this.views[i].holder.offset().top;
					this.views[i].holderHeight = this.views[i].holder.outerHeight();
				}
			}
			this.updateInfo();
		},
		onWinScroll: function() {
			this.scrollTop = this.win.scrollTop();
			this.updateInfo();
		},
		isIElt9: function() {
			return $.browser.msie && $.browser.version < 9;
		}
	}
	window.ViewManager = new ViewManager();

}(jQuery));

