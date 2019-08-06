<?php

/**
 * @file
 * template.php
 */

function simplicity_js_alter(&$javascript) {
  if (!module_exists("jquery_update")) {

    //We define the path of our new jquery core file
    //assuming we are using the minified version 1.8.3
    $jquery_path = drupal_get_path('theme', 'simplicity') . '/js/jquery.min.js';

    //We duplicate the important information from the Drupal one
    $javascript[$jquery_path] = $javascript['misc/jquery.js'];
    //..and we update the information that we care about
    $javascript[$jquery_path]['version'] = '1.7.1';
    $javascript[$jquery_path]['data'] = $jquery_path;

    //Then we remove the Drupal core version
    unset($javascript['misc/jquery.js']);

  }
}

function simplicity_preprocess_page(&$vars, $hook) {
  if (isset($vars['page']['content']['system_main']['default_message'])) {
    unset($vars['page']['content']['system_main']['default_message']);
    drupal_set_title('');
  }
}

function simplicity_process_html(&$vars) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($vars);
  }
}

function simplicity_process_page(&$vars) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_page_alter($vars);
  }
}

function simplicity_theme() {
  return array(
    'contact_site_form' => array(
      'render element' => 'form',
      'template' => 'contact-site-form',
      'path' => drupal_get_path('theme', 'simplicity') . '/templates',
    ),
  );
}

function simplicity_preprocess_contact_site_form(&$vars) {
  $vars['contact'] = drupal_render_children($vars['form']);

}