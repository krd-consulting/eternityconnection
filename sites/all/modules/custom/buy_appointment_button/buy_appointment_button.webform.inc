<?php

/**
 * Creates webform to accept payments via civiCRM's Contributions.
 */
function buy_appointment_button_create_webform($nid) {
  global $user;
  $app_node = node_load($nid);

  $node = new stdClass();
  $node->type = 'webform';
  node_object_prepare($node);
  $node->title = 'Meeting with ' . check_plain($app_node->title);
  $node->language = 'en';
  $node->body[LANGUAGE_NONE][0]['value']   = '';
  $node->body[LANGUAGE_NONE][0]['format']  = 'full_html';
  $node->uid = $user->uid;
  $node->promote = 0;
  $node->comment = 0;

  // Create the webform components.
  $components = array(
    1 => array(
      'cid' => '1',
      'pid' => '0',
      'form_key' => 'civicrm_1_contact_1_fieldset_fieldset',
      'name' => 'Contact',
      'type' => 'fieldset',
      'value' => '',
      'extra' => array(
        'title_display' => 0,
        'collapsible' => 0,
        'collapsed' => 0,
        'description' => '',
        'description_above' => FALSE,
        'private' => FALSE,
      ),
      'required' => '0',
      'weight' => '1',
      'page_num' => 1,
    ),
    2 => array(
      'cid' => '2',
      'pid' => '1',
      'form_key' => 'civicrm_1_contact_1_contact_existing',
      'name' => 'Existing Contact',
      'type' => 'civicrm_contact',
      'value' => '',
      'extra' => array(
        'search_prompt' => '- Choose existing -',
        'allow_create' => 1,
        'none_prompt' => '+ Create new +',
        'widget' => 'hidden',
        'default' => 'user',
        'private' => 0,
        'results_display' => array(
          'display_name',
        ),
        'show_hidden_contact' => 0,
        'unique' => 0,
        'title_display' => 'before',
        'randomize' => 0,
        'description' => '',
        'no_autofill' => array(),
        'hide_fields' => array(),
        'hide_method' => 'hide',
        'no_hide_blank' => FALSE,
        'attributes' => array(),
        'default_contact_id' => '',
        'default_relationship' => '',
        'allow_url_autofill' => TRUE,
        'dupes_allowed' => FALSE,
        'filters' => array(
          'contact_sub_type' => 0,
          'group' => array(),
          'tag' => array(),
          'check_permissions' => 1,
        ),
      ),
      'required' => '0',
      'weight' => '2',
      'page_num' => 1,
    ),
    3 => array(
      'cid' => '3',
      'pid' => '1',
      'form_key' => 'civicrm_1_contact_1_contact_first_name',
      'name' => 'First Name',
      'type' => 'textfield',
      'value' => '',
      'extra' => array(
        'width' => 20,
        'private' => 0,
        'maxlength' => '',
        'minlength' => '',
        'field_prefix' => '',
        'field_suffix' => '',
        'disabled' => 0,
        'unique' => 0,
        'title_display' => 0,
        'description' => '',
        'description_above' => FALSE,
        'placeholder' => '',
        'attributes' => array(),
        'analysis' => FALSE,
      ),
      'required' => '0',
      'weight' => '4',
      'page_num' => 1,
    ),
    4 => array(
      'cid' => '4',
      'pid' => '1',
      'form_key' => 'civicrm_1_contact_1_contact_last_name',
      'name' => 'Last Name',
      'type' => 'textfield',
      'value' => '',
      'extra' => array(
        'width' => 20,
        'private' => 0,
        'maxlength' => '',
        'minlength' => '',
        'field_prefix' => '',
        'field_suffix' => '',
        'disabled' => 0,
        'unique' => 0,
        'title_display' => 0,
        'description' => '',
        'description_above' => FALSE,
        'placeholder' => '',
        'attributes' => array(),
        'analysis' => FALSE,
      ),
      'required' => '0',
      'weight' => '6',
      'page_num' => 1,
    ),
    5 => array(
      'cid' => '5',
      'pid' => '1',
      'form_key' => 'civicrm_1_contact_1_email_email',
      'name' => 'Email',
      'type' => 'email',
      'value' => '',
      'extra' => array(
        'width' => 20,
        'private' => 0,
        'multiple' => 0,
        'format' => 'short',
        'unique' => 0,
        'disabled' => 0,
        'title_display' => 0,
        'description' => '',
        'description_above' => FALSE,
        'placeholder' => '',
        'attributes' => array(),
        'analysis' => FALSE,
      ),
      'required' => '0',
      'weight' => '24',
      'page_num' => 1,
    ),
    8 => array(
      'cid' => '8',
      'pid' => '0',
      'form_key' => 'civicrm_1_contribution_1_contribution_total_amount',
      'name' => 'Appointment Fee',
      'type' => 'number',
      'value' => $app_node->field_price[LANGUAGE_NONE][0]['value'],
      'extra' => array(
        'title_display' => 'before',
        'description_above' => 0,
        'private' => 0,
        'wrapper_classes' => '',
        'css_classes' => '',
        'field_prefix' => '$',
        'decimals' => '2',
        'min' => '0',
        'type' => 'textfield',
        'field_suffix' => '',
        'disabled' => 0,
        'unique' => 0,
        'description' => '',
        'attributes' => array(),
        'analysis' => FALSE,
        'max' => '',
        'step' => '',
        'point' => '.',
        'separator' => ',',
        'integer' => 0,
        'excludezero' => 0,
      ),
      'required' => '1',
      'weight' => '9991',
      'page_num' => 1,
    ),
    7 => array(
      'cid' => '7',
      'pid' => '0',
      'form_key' => 'civicrm_1_contribution_1_contribution_contribution_page_id',
      'name' => 'Contribution Page',
      'type' => 'hidden',
      'value' => '2',
      'extra' => array(
        'hidden_type' => 'hidden',
        'private' => 0,
        'analysis' => FALSE,
      ),
      'required' => '0',
      'weight' => '9999',
      'page_num' => 1,
    ),
    9 => array(
      'cid' => '9',
      'pid' => '0',
      'form_key' => 'appointment_node',
      'name' => 'Appointment Node',
      'type' => 'hidden',
      'value' => $app_node->nid,
      'extra' => array(
        'private' => 0,
        'hidden_type' => 'value',
        'analysis' => FALSE,
      ),
      'required' => '1',
      'weight' => '10000',
      'page_num' => 1,
    )
  );

  if ($app_node->field_price[LANGUAGE_NONE][0]['value'] == 0) {
    unset($components['7']);
    unset($components['8']);
  }



  // Setup notification email.
  $emails = array(
    array(
      'email' => 'somebody@example.tld',
      'subject' => 'default',
      'from_name' => 'default',
      'from_address' => 'default',
      'template' => 'default',
      'excluded_components' => array(),
    ),
  );


  // Attach the webform to the node.
  $node->webform = array(
    'confirmation' => '',
    'confirmation_format' => 'plain_text',
    'redirect_url' => 'node/[node:nid]/confirmation-page',
    'status' => '1',
    'block' => '0',
    'allow_draft' => '0',
    'auto_save' => '0',
    'submit_notice' => '1',
    'submit_text' => 'Book Appointment',
    'submit_limit' => '1',
    'submit_interval' => '3600',
    'total_submit_limit' => '1',
    'total_submit_interval' => '-1',
    'progressbar_bar' => '0',
    'progressbar_page_number' => '0',
    'progressbar_percent' => '0',
    'progressbar_pagebreak_labels' => '0',
    'progressbar_include_confirmation' => '0',
    'progressbar_label_first' => 'Start',
    'progressbar_label_confirmation' => 'Complete',
    'preview' => '0',
    'preview_next_button_label' => '',
    'preview_prev_button_label' => '',
    'preview_title' => '',
    'preview_message' => '',
    'preview_message_format' => NULL,
    'preview_excluded_components' => array(),
    'next_serial' => '8',
    'confidential' => '0',
    'record_exists' => TRUE,
    'roles' => array(
      '1',
      '2',
    ),
    'emails' => $emails,
    'components' => $components,
    'conditionals' => array(),
  );



  $node->webform_civicrm = array(
    'data' => array(
      'contact' => array(
        1 => array(
          'contact' => array(
            1 => array(
              'contact_type' => 'individual',
              'contact_sub_type' => array(),
              'webform_label' => 'Contact 1',
            ),
          ),
          'matching_rule' => 'Unsupervised',
          'number_of_other' => '0',
          'number_of_address' => '0',
          'number_of_phone' => '0',
          'number_of_email' => '1',
          'number_of_website' => '0',
          'number_of_im' => '0',
          'email' => array(
            1 => array(
              'location_type_id' => '1',
            ),
          ),
        ),
      ),
      'activity' => array(
        'number_of_activity' => '0',
      ),
      'membership' => array(
        1 => array(
          'number_of_membership' => '0',
        ),
      ),
      'participant_reg_type' => '0',
      'reg_options' => array(
        'event_type' => '4',
        'show_past_events' => 'now',
        'show_future_events' => '1',
        'title_display' => 'title start dateformatDatetime',
        'show_remaining' => '0',
        'validate' => 1,
        'block_form' => 0,
        'disable_unregister' => 1,
        'allow_url_load' => 1,
      ),
      'contribution' => array(
        1 => array(
          'contribution' => array(
            1 => array(
              'contribution_page_id' => '2',
              'payment_processor_id' => '5',
              'honor_type_id' => '1',
               // @todo Change to '0' for real payments.
              'is_test' => '1',
            ),
          ),
        ),
      ),
    ),
    'prefix_known' => '',
    'prefix_unknown' => '',
    'message' => '',
    'confirm_subscription' => '1',
    'block_unknown_users' => '0',
    'create_fieldsets' => '1',
    'new_contact_source' => 'Appointment Buyer',
    'create_new_relationship' => '0',
  );



  node_save($node);
  return $node;
}

