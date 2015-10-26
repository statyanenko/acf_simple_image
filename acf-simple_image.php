<?php

/*
Plugin Name: Advanced Custom Fields: Simple Image
Plugin URI: PLUGIN_URL
Description: Add ACF simple image field, that add ability to upload image without media library
Version: 0.0.1
Author: Sergey Tatyanenko
Author URI: https://github.com/statyanenko/
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/



// 1. set text domain
// Reference: https://codex.wordpress.org/Function_Reference/load_plugin_textdomain
load_plugin_textdomain( 'acf-simple_image', false, dirname( plugin_basename(__FILE__) ) . '/lang/' );



// 2. Include field type for ACF5
// $version = 5 and can be ignored until ACF6 exists
function include_field_types_simple_image( $version ) {

	include_once('acf-simple_image-v5.php');

}

add_action('acf/include_field_types', 'include_field_types_simple_image');




// 3. Include field type for ACF4
function register_fields_simple_image() {

	include_once('acf-simple_image-v4.php');

}

add_action('acf/register_fields', 'register_fields_simple_image');

function ajax_simple_image_upload() {
	if(!function_exists('wp_get_current_user')) {
		include(ABSPATH . "wp-includes/pluggable.php");
	}

  if (!empty($_FILES['file-0'])) {
		$uploadedfile     = $_FILES['file-0'];

		$mimes = array(	'gif' => 'image/gif', 'jpg' => 'image/jpg', 'jpeg' => 'image/jpeg', 'png' => 'image/png');
		$upload_overrides = array( 'test_form' => false, 'mimes' => $mimes );
		$movefile         = wp_handle_upload( $uploadedfile, $upload_overrides );
		if ( $movefile ) {
			unset($movefile['file']);
			echo json_encode( array( 'success' => true, 'data' => $movefile ) );
		}
		else {
			echo json_encode( array( 'success' => false ) );
		}
	}
	die();
}

add_action('wp_ajax_nopriv_acf-simple_image_upload', 'ajax_simple_image_upload' );
add_action('wp_ajax_acf-simple_image_upload', 'ajax_simple_image_upload' );

