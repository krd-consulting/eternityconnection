<?php
/**
 * @file
 * homepage_slider.strongarm.inc
 */

/**
 * Implements hook_strongarm().
 */
function homepage_slider_strongarm() {
  $export = array();

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_anonymous_hp_slide';
  $strongarm->value = 0;
  $export['comment_anonymous_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_mode_hp_slide';
  $strongarm->value = 1;
  $export['comment_default_mode_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_default_per_page_hp_slide';
  $strongarm->value = '50';
  $export['comment_default_per_page_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_form_location_hp_slide';
  $strongarm->value = 1;
  $export['comment_form_location_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_hp_slide';
  $strongarm->value = '1';
  $export['comment_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_preview_hp_slide';
  $strongarm->value = '1';
  $export['comment_preview_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'comment_subject_field_hp_slide';
  $strongarm->value = 1;
  $export['comment_subject_field_hp_slide'] = $strongarm;

  $strongarm = new stdClass;
  $strongarm->disabled = FALSE; /* Edit this to true to make a default strongarm disabled initially */
  $strongarm->api_version = 1;
  $strongarm->name = 'node_options_hp_slide';
  $strongarm->value = array(
    0 => 'status',
  );
  $export['node_options_hp_slide'] = $strongarm;

  return $export;
}
