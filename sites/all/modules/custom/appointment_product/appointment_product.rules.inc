<?php
/**
 * Implementation of hook_rules_action_info().
 * @ingroup rules
 */
function appointment_product_rules_action_info() {
  return array(
    'appointment_product_action_create_civicontribution' => array(
      'label' => t('Create civiContribution'),
      'arguments' => array(
        'commerce_order' => array('type' => 'commerce_order', 'label' => t('Commerce Order')),
      ),
      'module' => 'appointment_product',
      'group' => t('CiviCRM'),
      'base' => 'appointment_product_action_create_civicontribution',
    ),
  );
}

function appointment_product_action_create_civicontribution($order) {
  global $user;
  #if (empty($entity)) return;
  watchdog('app_pro', 'Order ' . print_r($order, 1));



/*
  if (!civicrm_initialize()) {return;}
  if (empty($nid) || !is_numeric($nid)) return;
  $node = node_load($nid);
  $lang = $node->language;

  $result = civicrm_api3('Contribution', 'create', array(
    'sequential' => 1,
    'financial_type_id' => "1",
    'total_amount' => $node->field_appointment_price[$lang][0]['amount'] / 100,
    'source' => $node->title,
    'currency' => $node->field_appointment_price[$lang][0]['currency_code'],
    'contact_id' => $user->uid,

  ));
  echo 'Created civiContribution for node id' . check_plain($nid);
  #dpm ($result);

  // Update source node at successful payment.
  $node->event_calendar_status[$lang][0]['tid'] = 31;
  node_save($node);




  return array('entity' => $contrib);
*/
}

