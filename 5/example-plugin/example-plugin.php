<?php
/*
Plugin Name: Example Elias Goss Plugin
*/
add_action('the_content', function($content) {
  return $content . '<hr><h5>&copy;Elias Goss!</h5>';
});
