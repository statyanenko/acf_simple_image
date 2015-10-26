(function($){


	function initialize_field( $el ) {
		var previewImg = $('img', $el),
				fieldValue = $('input[type="hidden"]', $el),
				addImgBtn = $('.add-simple-image', $el),
				deleteImgBtn = $('.delete-simple-image', $el);

		deleteImgBtn.click(function() {
			fieldValue.val('');
			deleteImgBtn.hide();
			previewImg.attr('src', '').hide();
			addImgBtnCaption(addImgBtn, 'Add Image');
		});

		$('input[type="file"]', $el).live('change', function() {
			var data = new FormData(),
					self = $(this);

			jQuery.each(self[0].files, function(i, file) {
				data.append('file-'+i, file);
			});

			data.append('action', 'acf-simple_image_upload');

			jQuery.ajax({
				url: acf.ajaxurl,
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				dataType: 'json',
				success: function(data){
					if ( data.success ) {
						previewImg.attr( 'src', data.data.url).show();
						fieldValue.val( data.data.url );
						deleteImgBtn.show();
						addImgBtnCaption(addImgBtn, 'Change Image');
					} else {
						alert('Error! Please try again.');
					}
				}
			});
		});
	}

	function addImgBtnCaption( el, text ) {
		el.html([text, '<input type="file" style="opacity: 0; font-size: 100px; position: absolute; left:0; top: 0;" />']);
	}


	if( typeof acf.add_action !== 'undefined' ) {

		/*
		*  ready append (ACF5)
		*
		*  These are 2 events which are fired during the page load
		*  ready = on page load similar to $(document).ready()
		*  append = on new DOM elements appended via repeater field
		*
		*  @type	event
		*  @date	20/07/13
		*
		*  @param	$el (jQuery selection) the jQuery element which contains the ACF fields
		*  @return	n/a
		*/

		acf.add_action('ready append', function( $el ){

			// search $el for fields of type 'simple_image'
			acf.get_fields({ type : 'simple_image'}, $el).each(function(){

				initialize_field( $(this) );

			});

		});


	} else {


		/*
		*  acf/setup_fields (ACF4)
		*
		*  This event is triggered when ACF adds any new elements to the DOM.
		*
		*  @type	function
		*  @since	1.0.0
		*  @date	01/01/12
		*
		*  @param	event		e: an event object. This can be ignored
		*  @param	Element		postbox: An element which contains the new HTML
		*
		*  @return	n/a
		*/

		$(document).on('acf/setup_fields', function(e, postbox){

			$(postbox).find('.field_type-simple_image').each(function(){

				initialize_field( $(this) );

			});

		});


	}


})(jQuery);
