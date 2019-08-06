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

  // Exported permission: 'access CiviContribute'.
  $permissions['access CiviContribute'] = array(
    'name' => 'access CiviContribute',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'civicrm',
  );

  // Exported permission: 'access checkout'.
  $permissions['access checkout'] = array(
    'name' => 'access checkout',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
    ),
    'module' => 'commerce_checkout',
  );

  // Exported permission: 'access content'.
  $permissions['access content'] = array(
    'name' => 'access content',
    'roles' => array(
      'administrator' => 'administrator',
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'node',
  );

  // Exported permission: 'administer big blue button'.
  $permissions['administer big blue button'] = array(
    'name' => 'administer big blue button',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bbb',
  );

  // Exported permission: 'administer checkout'.
  $permissions['administer checkout'] = array(
    'name' => 'administer checkout',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_checkout',
  );

  // Exported permission: 'administer commerce node checkout'.
  $permissions['administer commerce node checkout'] = array(
    'name' => 'administer commerce node checkout',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_node_checkout',
  );

  // Exported permission: 'administer event status'.
  $permissions['administer event status'] = array(
    'name' => 'administer event status',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'event_calendar',
  );

  // Exported permission: 'administer maillog'.
  $permissions['administer maillog'] = array(
    'name' => 'administer maillog',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'maillog',
  );

  // Exported permission: 'attend meetings'.
  $permissions['attend meetings'] = array(
    'name' => 'attend meetings',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
    ),
    'module' => 'bbb',
  );

  // Exported permission: 'create appointment content'.
  $permissions['create appointment content'] = array(
    'name' => 'create appointment content',
    'roles' => array(
      'administrator' => 'administrator',
      'provider' => 'provider',
    ),
    'module' => 'node',
  );

  // Exported permission: 'create commerce_product entities of bundle commerce_node_checkout'.
  $permissions['create commerce_product entities of bundle commerce_node_checkout'] = array(
    'name' => 'create commerce_product entities of bundle commerce_node_checkout',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'create commerce_product entities of bundle product'.
  $permissions['create commerce_product entities of bundle product'] = array(
    'name' => 'create commerce_product entities of bundle product',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'create meeting_type content'.
  $permissions['create meeting_type content'] = array(
    'name' => 'create meeting_type content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'create videomeeting content'.
  $permissions['create videomeeting content'] = array(
    'name' => 'create videomeeting content',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any appointment content'.
  $permissions['delete any appointment content'] = array(
    'name' => 'delete any appointment content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any meeting_type content'.
  $permissions['delete any meeting_type content'] = array(
    'name' => 'delete any meeting_type content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete any videomeeting content'.
  $permissions['delete any videomeeting content'] = array(
    'name' => 'delete any videomeeting content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete in CiviContribute'.
  $permissions['delete in CiviContribute'] = array(
    'name' => 'delete in CiviContribute',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'civicrm',
  );

  // Exported permission: 'delete maillog'.
  $permissions['delete maillog'] = array(
    'name' => 'delete maillog',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'maillog',
  );

  // Exported permission: 'delete own appointment content'.
  $permissions['delete own appointment content'] = array(
    'name' => 'delete own appointment content',
    'roles' => array(
      'administrator' => 'administrator',
      'provider' => 'provider',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete own meeting_type content'.
  $permissions['delete own meeting_type content'] = array(
    'name' => 'delete own meeting_type content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'delete own videomeeting content'.
  $permissions['delete own videomeeting content'] = array(
    'name' => 'delete own videomeeting content',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit any appointment content'.
  $permissions['edit any appointment content'] = array(
    'name' => 'edit any appointment content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit any commerce_product entity'.
  $permissions['edit any commerce_product entity'] = array(
    'name' => 'edit any commerce_product entity',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'edit any commerce_product entity of bundle commerce_node_checkout'.
  $permissions['edit any commerce_product entity of bundle commerce_node_checkout'] = array(
    'name' => 'edit any commerce_product entity of bundle commerce_node_checkout',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'edit any meeting_type content'.
  $permissions['edit any meeting_type content'] = array(
    'name' => 'edit any meeting_type content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit any videomeeting content'.
  $permissions['edit any videomeeting content'] = array(
    'name' => 'edit any videomeeting content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit contributions'.
  $permissions['edit contributions'] = array(
    'name' => 'edit contributions',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'civicrm',
  );

  // Exported permission: 'edit own appointment content'.
  $permissions['edit own appointment content'] = array(
    'name' => 'edit own appointment content',
    'roles' => array(
      'administrator' => 'administrator',
      'provider' => 'provider',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit own commerce_product entities'.
  $permissions['edit own commerce_product entities'] = array(
    'name' => 'edit own commerce_product entities',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'edit own commerce_product entities of bundle commerce_node_checkout'.
  $permissions['edit own commerce_product entities of bundle commerce_node_checkout'] = array(
    'name' => 'edit own commerce_product entities of bundle commerce_node_checkout',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'edit own meeting_type content'.
  $permissions['edit own meeting_type content'] = array(
    'name' => 'edit own meeting_type content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'edit own videomeeting content'.
  $permissions['edit own videomeeting content'] = array(
    'name' => 'edit own videomeeting content',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
    ),
    'module' => 'node',
  );

  // Exported permission: 'make online contributions'.
  $permissions['make online contributions'] = array(
    'name' => 'make online contributions',
    'roles' => array(
      'administrator' => 'administrator',
      'anonymous user' => 'anonymous user',
      'authenticated user' => 'authenticated user',
    ),
    'module' => 'civicrm',
  );

  // Exported permission: 'provider access'.
  $permissions['provider access'] = array(
    'name' => 'provider access',
    'roles' => array(
      'administrator' => 'administrator',
      'provider' => 'provider',
    ),
    'module' => 'appointment_product',
  );
  
  // Exported permission: 'moderate meetings'.
  $permissions['moderate meetings'] = array(
    'name' => 'moderate meetings',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'bbb',
  );

  // Exported permission: 'moderate own meetings'.
  $permissions['moderate own meetings'] = array(
    'name' => 'moderate own meetings',
    'roles' => array(
      'administrator' => 'administrator',
      'provider' => 'provider',
    ),
    'module' => 'bbb',
  );

  // Exported permission: 'record meetings'.
  $permissions['record meetings'] = array(
    'name' => 'record meetings',
    'roles' => array(
      'administrator' => 'administrator',
      'provider' => 'provider',
    ),
    'module' => 'bbb',
  );

  // Exported permission: 'view any commerce_product entity'.
  $permissions['view any commerce_product entity'] = array(
    'name' => 'view any commerce_product entity',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'view any commerce_product entity of bundle commerce_node_checkout'.
  $permissions['view any commerce_product entity of bundle commerce_node_checkout'] = array(
    'name' => 'view any commerce_product entity of bundle commerce_node_checkout',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
      'provider' => 'provider',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'view maillog'.
  $permissions['view maillog'] = array(
    'name' => 'view maillog',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'maillog',
  );

  // Exported permission: 'view own commerce_product entities'.
  $permissions['view own commerce_product entities'] = array(
    'name' => 'view own commerce_product entities',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'view own commerce_product entities of bundle commerce_node_checkout'.
  $permissions['view own commerce_product entities of bundle commerce_node_checkout'] = array(
    'name' => 'view own commerce_product entities of bundle commerce_node_checkout',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'commerce_product',
  );

  // Exported permission: 'view own unpublished content'.
  $permissions['view own unpublished content'] = array(
    'name' => 'view own unpublished content',
    'roles' => array(
      'administrator' => 'administrator',
    ),
    'module' => 'node',
  );

  // Exported permission: 'view own commerce_order entities'.
  $permissions['view own commerce_order entities'] = array(
    'name' => 'view own commerce_order entities',
    'roles' => array(
      'administrator' => 'administrator',
      'buyer' => 'buyer',
    ),
    'module' => 'commerce',
  );
  
  return $permissions;
}
