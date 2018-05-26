<?php
/*
	Plugin Name: Babaritskiy Pavel Plugin
*/
add_action('wp_footer', function($content) {
  $data = json_decode(file_get_contents('https://kodaktor.ru/j/wplink'));
  echo $content . '<a href="' . $data -> {'alink'} -> {'href'} . '" target="' . ($data -> {'alink'} -> {'target'}) . '">' . $data -> {'alink'} -> {'textContent'} . '</a>';
});
?>
