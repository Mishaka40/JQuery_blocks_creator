const REG_EXPR = /^([а-яА-ЯёЁ\sі]*)$/;
$(document).ready(function() {
	var quan_max = 9; //количество блоков
	var ttl_max_len = 20; //максимальное кол-во символов для title
	var txt_max_len = 250; //максимальное кол-во символов для text
	var ttl_ok=false;
	var txt_ok=false;
	var cimg=false;
	var quan = 0;
	var btn_click=0;
	var con_image = $('.con_image');
	var con_title = $('.con_title');
	var con_link = $('.con_link');
	var con_text = $('.con_text');
	var preloader = $('#preloader');
	
	function valid(e, type){
		if(type=='ttl'){
			var err=$('.ttl_err');
			var max_len=ttl_max_len;
		} else {
			var err=$('.txt_err');
			var max_len=txt_max_len;
		}
		var str = e.value;
		var ok=false;
		if (REG_EXPR.test(str)) {
			err.html("");
			if (str.length <= max_len){
				ok = true;
			} else {
				err.html("Длина не должна превышать "+max_len+" символов");
				ok = false;
			}
			return ok;
		} else {
			err.html("Введите кирилические символы");
			return false;
		}
	}
	
	function new_block(lnk,img,ttl,txt,hdn){
		var nb = '<div class="blc '+hdn+'"><a href="'+lnk+'" target="_blank"><div class="blс_content"><div class="nb_img"><img src="'+img+'"></div><p class="nb_ttl">'+ttl+'</p><p class="nb_text">'+txt+'</p></div></a></div>';
		$('.blcs').append(nb);
	}
	
	function clear(){
		con_image.attr('src', 'img/camera-icon.jpg');
		con_title.val('');
		con_link.val('');
		con_text.val('');
		ttl_ok=false;
		txt_ok=false;
		cimg=false;
	}
	
	function required(){
		if (ttl_ok==false){
			con_title.addClass('required');
		} else {
			con_title.removeClass('required');
		}
		if (txt_ok==false){
			con_text.addClass('required');
		} else {
			con_text.removeClass('required');
		}
		if (cimg==false){
			con_image.addClass('required');
		} else {
			con_image.removeClass('required');
		}
		if (ttl_ok && txt_ok && cimg)
			return true;
	}
	
	$('#upload_img').on('change', function(){
		if (this.files[0]) {
			var fr = new FileReader();
			fr.addEventListener("load", function () {
				con_image.attr("src", fr.result);
			}, false);
			fr.readAsDataURL(this.files[0]);
			cimg=true;
			console.log(cimg);
	    }
	});
	
	con_title.on('input', function(e) {
		var err = $('.ttl_err');
		ttl_ok=valid(this, 'ttl');
	});
	
	con_text.on('input', function(e) {
		var err = $('.txt_err');
		txt_ok = valid(this, 'txt');
	});
	
	$('#con_create').on('click', function(){
		var img = con_image.attr("src");
		var title = con_title.val();
		var lnk = con_link.val();
		var txt = con_text.val();
		if(required()){
			preloader.removeClass('fade');
			quan++;
			if (quan<quan_max || ($('.blc').length+1)<=(btn_click+1)*quan_max){
				new_block(lnk,img,title,txt,'');
			} else {
				new_block(lnk,img,title,txt,'hidden');
				$('.show_more').removeClass('hidden');
			}
			clear();
			requestAnimationFrame(function(){
				preloader.addClass('fade');
			});
		}
	});
	
	$('.show_more').on('click', function(){
		preloader.removeClass('fade');
		btn_click++;
		var block = $('.blc');
		for(var x=0;x<(btn_click+1)*quan_max;x++){
			if (block.eq(x))
				block.eq(x).removeClass('hidden');
		}
		if (x>block.length)
			$('.show_more').addClass('hidden');
		
		preloader.addClass('fade');		
	});
	preloader.addClass('fade');
});