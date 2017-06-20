<?php
/**
 * @file
 * homepage_slider.features.menu_custom.inc
 */

/**
 * Implementation of hook_menu_default_menu_custom().
 */
function homepage_slider_menu_default_menu_custom() {
  $menus = array();

  // Exported menu: menu-hp-slider
  $menus['menu-hp-slider'] = array(
    'menu_name' => 'menu-hp-slider',
    'title' => 'HP Slider',
    'description' => 'Slider de conteúdos para a Homepage.',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('HP Slider');
  t('Slider de conteúdos para a Homepage.');


  return $menus;
}
