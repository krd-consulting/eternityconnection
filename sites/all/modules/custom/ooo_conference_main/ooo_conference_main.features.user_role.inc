<?php
/**
 * @file
 * ooo_conference_main.features.user_role.inc
 */

/**
 * Implements hook_user_default_roles().
 */
function ooo_conference_main_user_default_roles() {
  $roles = array();

  // Exported role: buyer.
  $roles['buyer'] = array(
    'name' => 'buyer',
    'weight' => 5,
  );

  // Exported role: provider.
  $roles['provider'] = array(
    'name' => 'provider',
    'weight' => 4,
  );

  return $roles;
}
