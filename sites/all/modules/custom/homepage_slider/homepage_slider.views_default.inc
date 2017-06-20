<?php
/**
 * @file
 * homepage_slider.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function homepage_slider_views_default_views() {
  $export = array();

  $view = new view;
  $view->name = 'home_slider';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'HP Slider';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['css_class'] = 'hp-slider';
  $handler->display->display_options['access']['type'] = 'none';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['exposed_form']['options']['reset_button_label'] = 'Reiniciar';
  $handler->display->display_options['pager']['type'] = 'full';
  $handler->display->display_options['pager']['options']['items_per_page'] = '5';
  $handler->display->display_options['style_plugin'] = 'slideshow';
  $handler->display->display_options['style_options']['slideshow_type'] = 'views_slideshow_cycle';
  $handler->display->display_options['style_options']['slideshow_skin'] = 'default';
  $handler->display->display_options['style_options']['skin_info'] = array(
    'class' => 'default',
    'name' => 'Default',
    'module' => 'views_slideshow',
    'path' => '',
    'stylesheets' => array(),
  );
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['type'] = 'views_slideshow_pager_fields';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_pager']['views_slideshow_pager_fields_fields'] = array(
    'field_hp_slide' => 0,
  );
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_controls']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_controls']['type'] = 'views_slideshow_controls_text';
  $handler->display->display_options['style_options']['widgets']['top']['views_slideshow_slide_counter']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['type'] = 'views_slideshow_pager_fields';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_pager']['views_slideshow_pager_fields_fields'] = array(
    'field_hp_slide' => 0,
  );
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_controls']['weight'] = '1';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_controls']['type'] = 'views_slideshow_controls_text';
  $handler->display->display_options['style_options']['widgets']['bottom']['views_slideshow_slide_counter']['weight'] = '1';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['timeout'] = '5000';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['speed'] = '700';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['delay'] = '0';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['start_paused'] = 0;
  $handler->display->display_options['style_options']['views_slideshow_cycle']['remember_slide_days'] = '1';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['items_per_slide'] = '1';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['wait_for_image_load_timeout'] = '3000';
  $handler->display->display_options['style_options']['views_slideshow_cycle']['cleartype'] = 0;
  $handler->display->display_options['style_options']['views_slideshow_cycle']['cleartypenobg'] = 0;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['hide_empty'] = 0;
  $handler->display->display_options['row_options']['default_field_elements'] = 0;
  /* Field: Content: Imagem do Slide */
  $handler->display->display_options['fields']['field_hp_slide']['id'] = 'field_hp_slide';
  $handler->display->display_options['fields']['field_hp_slide']['table'] = 'field_data_field_hp_slide';
  $handler->display->display_options['fields']['field_hp_slide']['field'] = 'field_hp_slide';
  $handler->display->display_options['fields']['field_hp_slide']['label'] = '';
  $handler->display->display_options['fields']['field_hp_slide']['alter']['alter_text'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['make_link'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['absolute'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['external'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['replace_spaces'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['trim_whitespace'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['nl2br'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['word_boundary'] = 1;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['ellipsis'] = 1;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['strip_tags'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['trim'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['alter']['html'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_hp_slide']['element_default_classes'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['hide_empty'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['empty_zero'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['hide_alter_empty'] = 0;
  $handler->display->display_options['fields']['field_hp_slide']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_hp_slide']['settings'] = array(
    'image_style' => 'homepage_slide',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_hp_slide']['field_api_classes'] = 0;
  /* Sort criterion: Content: Post date */
  $handler->display->display_options['sorts']['created']['id'] = 'created';
  $handler->display->display_options['sorts']['created']['table'] = 'node';
  $handler->display->display_options['sorts']['created']['field'] = 'created';
  $handler->display->display_options['sorts']['created']['order'] = 'DESC';
  /* Filter criterion: Content: Published */
  $handler->display->display_options['filters']['status']['id'] = 'status';
  $handler->display->display_options['filters']['status']['table'] = 'node';
  $handler->display->display_options['filters']['status']['field'] = 'status';
  $handler->display->display_options['filters']['status']['value'] = 1;
  $handler->display->display_options['filters']['status']['group'] = 0;
  $handler->display->display_options['filters']['status']['expose']['operator'] = FALSE;
  /* Filter criterion: Content: Type */
  $handler->display->display_options['filters']['type']['id'] = 'type';
  $handler->display->display_options['filters']['type']['table'] = 'node';
  $handler->display->display_options['filters']['type']['field'] = 'type';
  $handler->display->display_options['filters']['type']['value'] = array(
    'hp_slide' => 'hp_slide',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['home_slider'] = $view;

  return $export;
}
