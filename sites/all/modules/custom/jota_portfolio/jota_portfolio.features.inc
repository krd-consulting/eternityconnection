<?php
/**
 * @file
 * jota_portfolio.features.inc
 */

/**
 * Implements hook_ctools_plugin_api().
 */
function jota_portfolio_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function jota_portfolio_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_image_default_styles().
 */
function jota_portfolio_image_default_styles() {
  $styles = array();

  // Exported image style: portfolio.
  $styles['portfolio'] = array(
    'label' => 'portfolio',
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 440,
          'height' => 360,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: portfolio_detail.
  $styles['portfolio_detail'] = array(
    'label' => 'portfolio_detail',
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 980,
          'height' => 474,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: portfolio_large.
  $styles['portfolio_large'] = array(
    'label' => 'portfolio_large',
    'effects' => array(
      1 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 880,
          'height' => 360,
        ),
        'weight' => 1,
      ),
    ),
  );

  // Exported image style: portfolio_masonry.
  $styles['portfolio_masonry'] = array(
    'label' => 'portfolio_masonry',
    'effects' => array(
      2 => array(
        'name' => 'image_scale_and_crop',
        'data' => array(
          'width' => 800,
          'height' => 500,
        ),
        'weight' => 1,
      ),
    ),
  );

  return $styles;
}

/**
 * Implements hook_node_info().
 */
function jota_portfolio_node_info() {
  $items = array(
    'project' => array(
      'name' => t('Project'),
      'base' => 'node_content',
      'description' => t('Portfolio Projects'),
      'has_title' => '1',
      'title_label' => t('Project name'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
