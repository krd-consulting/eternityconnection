<?php
/**
 * @file
 * ooo_conference_main.features.commerce_checkout_panes.inc
 */

/**
 * Implements hook_commerce_checkout_panes_default().
 */
function ooo_conference_main_commerce_checkout_panes_default() {
  $panes = array();

  $panes['commerce_payment'] = array(
    'page' => 'review',
    'weight' => 10,
    'pane_id' => 'commerce_payment',
    'fieldset' => TRUE,
    'collapsible' => FALSE,
    'collapsed' => FALSE,
    'enabled' => TRUE,
    'review' => TRUE,
  );

  $panes['customer_profile_billing'] = array(
    'page' => 'checkout',
    'weight' => 5,
    'pane_id' => 'customer_profile_billing',
    'fieldset' => TRUE,
    'collapsible' => FALSE,
    'collapsed' => FALSE,
    'enabled' => TRUE,
    'review' => TRUE,
  );

  return $panes;
}
