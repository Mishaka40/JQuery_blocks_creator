const REG_EXPR = /^([а-яА-ЯёЁ\sі]*)$/;
$(document).ready(function() {
	var ttl_ok=false;
	var txt_ok=false;
	var quan_max = 9; //количество блоков
	var quan = 0;
	var bc=0;
	$('#upload_img').on('change', function(){
		if (this.files[0]) {
		var fr = new FileReader();

		fr.addEventListener("load", function () {
			$('.con_image').attr("src", fr.result);
		}, false);

		fr.readAsDataURL(this.files[0]);
	  }
	});
	
	$(".con_title").on('input', function(e) {
		const str = this.value
		if (REG_EXPR.test(str)) {
			$('.ttl_err').html("");
			if (str.length <= 20){
				ttl_ok=true;
			} else {
				ttl_ok=false;
				$('.ttl_err').html("Длина не должна превышать 20 символов");
			}
		} else {
			$('.ttl_err').html("Введите кирилические символы");
			ttl_ok=false;
		}
	});
	
	$(".con_text").on('input', function(e) {
		const str = this.value
		if (REG_EXPR.test(str)) {
			$('.txt_err').html("");
			if (str.length <= 250){
				txt_ok=true;
			} else {
				txt_ok=false;
				$('.txt_err').html("Длина не должна превышать 250 символов");
			}			
		} else {			
			$('.txt_err').html("Введите кирилические символы");
			txt_ok=false;
		}
	});
	
	$('#con_create').on('click', function(){
		$('#preloader').removeClass('fade');
		var con_img = $('.con_image').attr("src");
		var con_title = $('.con_title').val();
		var con_link = $('.con_link').val();
		var con_text = $('.con_text').val();
		var blocks = $('.blocks');
		var block = $('.block');
		if(ttl_ok && txt_ok){
			var new_block;
			quan++;
			if (quan<quan_max || ($('.blc').length+1)<=(bc+1)*quan_max){
				new_block = '<div class="blc"><a href="'+con_link+'" target="_blank"><div class="block"><div class="nb_img"><img src="'+con_img+'"></div><p class="nb_ttl">'+con_title+'</p><p class="nb_text">'+con_text+'</p></div></a></div>';
			} else {
				new_block = '<div class="blc hidden"><a href="'+con_link+'" target="_blank"><div class="block"><div class="nb_img"><img src="'+con_img+'"></div><p class="nb_ttl">'+con_title+'</p><p class="nb_text">'+con_text+'</p></div></a></div>';
				$('.show_more').removeClass('hidden');
			}
			blocks.append(new_block);
		}
		requestAnimationFrame(function () {
			$('#preloader').addClass('fade');
		});
	});
	
	$('.show_more').on('click', function(){
		$('#preloader').removeClass('fade');
		bc++;
		var blc = $('.blc');
		for(var x=0;x<(bc+1)*quan_max;x++){
			if (blc.eq(x))
				blc.eq(x).removeClass('hidden');
		}
		if (x>$('.blc').length)
			$('.show_more').addClass('hidden');
		
		$('#preloader').addClass('fade');		
	});
	$('#preloader').addClass('fade');
});