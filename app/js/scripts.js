(function($){
	$(document).ready(function(){
		/**
		 *
		 * Comportamento de seleção dos cards à serem trocados
		 *
		 */
		$(".exchange-col.own-cards").find(".item-collection-overlay").on("click", function(){
			$this_image = $(this).siblings("img");
			$(".card-selected.own").fadeOut(300, function(){
				$(".card-selected.own").find("img").attr("src", $this_image.attr("src"));
				$(".card-selected.own").fadeIn(300);
			});
		});

		$(".exchange-col.system-cards").find(".item-collection-overlay").on("click", function(){
			$this_image = $(this).siblings("img");
			$(".card-selected.system").fadeOut(300, function(){
				$(".card-selected.system").find("img").attr("src", $this_image.attr("src"));
				$(".card-selected.system").fadeIn(330);
			});
		});		
	});
})(jQuery);