<?php
/**
 * @file
 * homepage_slider.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function homepage_slider_ctools_plugin_api() {
  list($module, $api) = func_get_args();
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function homepage_slider_views_api() {
  list($module, $api) = func_get_args();
  if ($module == "views" && $api == "views_default") {
    return array("version" => "3.0");
  }
}

/**
 * Implements hook_node_info().
 */
function homepage_slider_node_info() {
  $items = array(
    'hp_slide' => array(
      'name' => t('HP Slide'),
      'base' => 'node_content',
      'description' => t('Um slide para ser introduzido no Slideshow da Homepage.'),
      'has_title' => '1',
      'title_label' => t('Título do slide'),
      'help' => '',
    ),
  );
  return $items;
}
