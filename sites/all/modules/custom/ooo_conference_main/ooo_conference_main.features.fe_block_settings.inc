<?php
/**
 * @file
 * ooo_conference_main.features.fe_block_settings.inc
 */

/**
 * Implements hook_default_fe_block_settings().
 */
function ooo_conference_main_default_fe_block_settings() {
  $export = array();

  $export['version'] = '2.0';

  $export['views-0c357789727886b74ecf509e2d85617a'] = array(
    'cache' => -1,
    'custom' => 0,
    'delta' => '0c357789727886b74ecf509e2d85617a',
    'module' => 'views',
    'node_types' => array(),
    'pages' => 'appointments
appointments/*',
    'roles' => array(),
    'themes' => array(
      'bootstrap' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'bootstrap',
        'weight' => 0,
      ),
      'garland' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'garland',
        'weight' => 0,
      ),
      'seven' => array(
        'region' => '',
        'status' => 0,
        'theme' => 'seven',
        'weight' => 0,
      ),
      'simplicity' => array(
        'region' => 'second_content',
        'status' => 1,
        'theme' => 'simplicity',
        'weight' => -27,
      ),
    ),
    'title' => '',
    'visibility' => 1,
  );

  return $export;
}
