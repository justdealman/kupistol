function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
function setRatio() {
	$('[data-ratio]').each(function() {
		var t = $(this).find('.scale');
		t.outerHeight(t.outerWidth()*$(this).attr('data-ratio'));
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	/*var isMobile = false;
	var justSwitched = false;
	function detectDevice() {
		var temp = isMobile;
		if ( Modernizr.mq('(max-width:999px)') ) {
			isMobile = true;
		} else {
			isMobile = false;
		}
		if ( temp == isMobile ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}*/
	$('.intro__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		infinite: true,
		cssEase: 'ease',
		speed: 500,
		autoplay: true,
		autoplaySpeed: 2000
	});
	function setBgHeight() {
		$('.bg__row').height($(window).height());
	}
	function startApp() {
		setBgHeight();
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
	}, 100));
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 45;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.breadcrumbs .dropable').length && !$(e.target).closest('.breadcrumbs .drop').length ) {
			$('.breadcrumbs .dropable').removeClass('is-active');
		}
	});
	$('input[type="checkbox"]').uniform();
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$(document).on('scroll', function() {
		if ( $(document).scrollTop() >= $('.program__image').offset().top-$(window).height() ) {
			if ( !$('.program__image').hasClass('is-active') ) {
				$('.program__image').addClass('is-active');
			}
		} else {
			if ( $('.program__image').hasClass('is-active') ) {
				$('.program__image').removeClass('is-active');
			}
		}
		if ( $('.bg').length ) {
			var bgProgress = 0;
			if ( $(document).scrollTop() > $('.offer').offset().top-$(window).height() && $(document).scrollTop() < $('.offer').offset().top ) {
				bgProgress = 1-($('.offer').offset().top-$(document).scrollTop())/$(window).height();
			} else if ( $(document).scrollTop() <= $('.offer').offset().top-$(window).height() ) {
				bgProgress = 0;
			} else if ( $(document).scrollTop() >= $('.offer').offset().top) {
				bgProgress = 1;
			}
			$('.bg_1').height($(window).height()*(1-bgProgress));
			$('.bg_2').height($(window).height()*bgProgress);
		}
	});
});