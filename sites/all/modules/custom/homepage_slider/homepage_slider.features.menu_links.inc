<?php
/**
 * @file
 * homepage_slider.features.menu_links.inc
 */

/**
 * Implementation of hook_menu_default_menu_links().
 */
function homepage_slider_menu_default_menu_links() {
  $menu_links = array();

  // Exported menu link: menu-hp-slider:node/add/hp-slide
  $menu_links['menu-hp-slider:node/add/hp-slide'] = array(
    'menu_name' => 'menu-hp-slider',
    'link_path' => 'node/add/hp-slide',
    'router_path' => 'node/add/hp-slide',
    'link_title' => 'Adicionar slide',
    'options' => array(
      'attributes' => array(
        'title' => '',
      ),
    ),
    'module' => 'menu',
    'hidden' => '0',
    'external' => '0',
    'has_children' => '0',
    'expanded' => '0',
    'weight' => '0',
  );
  // Translatables
  // Included for use with string extractors like potx.
  t('Adicionar slide');


  return $menu_links;
}
