<?php
/**
 * @file
 * ooo_conference_main.features.inc
 */

/**
 * Implements hook_commerce_product_default_types().
 */
function ooo_conference_main_commerce_product_default_types() {
  $items = array(
    'commerce_node_checkout' => array(
      'type' => 'commerce_node_checkout',
      'name' => 'Pay to publish',
      'description' => 'A product associated with publishing a node.',
      'help' => '',
      'revision' => 1,
    ),
  );
  return $items;
}

/**
 * Implements hook_ctools_plugin_api().
 */
function ooo_conference_main_ctools_plugin_api($module = NULL, $api = NULL) {
  if ($module == "strongarm" && $api == "strongarm") {
    return array("version" => "1");
  }
}

/**
 * Implements hook_views_api().
 */
function ooo_conference_main_views_api($module = NULL, $api = NULL) {
  return array("api" => "3.0");
}

/**
 * Implements hook_node_info().
 */
function ooo_conference_main_node_info() {
  $items = array(
    'appointment' => array(
      'name' => t('Appointment'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
    'meeting_type' => array(
      'name' => t('Meeting type'),
      'base' => 'node_content',
      'description' => t('Used to create meeting(appointment) types'),
      'has_title' => '1',
      'title_label' => t('Name'),
      'help' => '',
    ),
    'videomeeting' => array(
      'name' => t('Video Meeting'),
      'base' => 'node_content',
      'description' => '',
      'has_title' => '1',
      'title_label' => t('Title'),
      'help' => '',
    ),
  );
  drupal_alter('node_info', $items);
  return $items;
}
