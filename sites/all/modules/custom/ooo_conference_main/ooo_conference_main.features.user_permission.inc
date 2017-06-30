<?php
/**
 * @file
 * ooo_conference_main.features.user_permission.inc
 */

/**
 * Implements hook_user_default_permissions().
 */
function ooo_conference_main_user_default_permissions() {
  $permissions = array();

  // Exported permission: 'administer event status'.
  $permissions['administer event status'] = array(
    'name' => 'administer event status',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'event_calendar',
  );

  return $permissions;
}
