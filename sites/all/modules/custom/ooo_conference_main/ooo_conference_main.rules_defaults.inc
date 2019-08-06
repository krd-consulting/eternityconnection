<?php
/**
 * @file
 * ooo_conference_main.rules_defaults.inc
 */

/**
 * Implements hook_default_rules_configuration().
 */
function ooo_conference_main_default_rules_configuration() {
  $items = array();
  $items['commerce_payment_commerce_stripe'] = entity_import('rules_config', '{ "commerce_payment_commerce_stripe" : {
      "LABEL" : "Stripe",
      "PLUGIN" : "reaction rule",
      "OWNER" : "rules",
      "TAGS" : [ "Commerce Payment" ],
      "REQUIRES" : [ "commerce_payment" ],
      "ON" : { "commerce_payment_methods" : [] },
      "DO" : [
        { "commerce_payment_enable_commerce_stripe" : {
            "commerce_order" : [ "commerce-order" ],
            "payment_method" : { "value" : {
                "method_id" : "commerce_stripe",
                "settings" : {
                  "stripe_currency" : "USD",
                  "secret_key" : "sk_test_QRJLUBIWlRXn6vSMzKXR2VGk",
                  "public_key" : "pk_test_LZbEzpMg9p91Il0G0VcMsQX7",
                  "display_title" : "Stripe Test",
                  "receipt_email" : 1,
                  "integration_type" : "stripejs",
                  "checkout_settings" : {
                    "name" : "The Eternity Connection",
                    "description" : "",
                    "image" : {
                      "fid" : 0,
                      "upload_button" : "Upload",
                      "remove_button" : "Remove",
                      "upload" : ""
                    },
                    "panelLabel" : "Pay {{amount}}",
                    "zipCode" : 0,
                    "allowRememberMe" : 0,
                    "bitcoin" : 0,
                    "billingAddress" : 0,
                    "shippingAddress" : 0
                  }
                }
              }
            }
          }
        }
      ]
    }
  }');
  return $items;
}
