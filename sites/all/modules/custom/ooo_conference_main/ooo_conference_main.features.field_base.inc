<?php
/**
 * @file
 * ooo_conference_main.features.field_base.inc
 */

/**
 * Implements hook_field_default_field_bases().
 */
function ooo_conference_main_field_default_field_bases() {
  $field_bases = array();

  // Exported field_base: 'field_price'.
  $field_bases['field_price'] = array(
    'active' => 1,
    'cardinality' => 1,
    'deleted' => 0,
    'entity_types' => array(),
    'field_name' => 'field_price',
    'indexes' => array(
      'value' => array(
        0 => 'value',
      ),
    ),
    'locked' => 0,
    'module' => 'list',
    'settings' => array(
      'allowed_values' => array(
        0 => 'Free',
        10 => '$10',
        20 => '$20',
        30 => '$30',
      ),
      'allowed_values_function' => '',
    ),
    'translatable' => 0,
    'type' => 'list_text',
  );

  return $field_bases;
}
