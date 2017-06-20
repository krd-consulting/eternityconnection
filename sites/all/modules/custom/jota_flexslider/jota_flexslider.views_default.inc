<?php
/**
 * @file
 * jota_flexslider.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function jota_flexslider_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'flexslider_slideshow';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'flexslider_slideshow';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'flexslider_slideshow';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = '[fid]';
  $handler->display->display_options['style_options']['class'] = 'slides';
  $handler->display->display_options['style_options']['wrapper_class'] = 'flexslider';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* Relationship: Content: Imagem do Slide (field_hp_slide:fid) */
  $handler->display->display_options['relationships']['field_hp_slide_fid']['id'] = 'field_hp_slide_fid';
  $handler->display->display_options['relationships']['field_hp_slide_fid']['table'] = 'field_data_field_hp_slide';
  $handler->display->display_options['relationships']['field_hp_slide_fid']['field'] = 'field_hp_slide_fid';
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_type'] = 'h1';
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Subtext */
  $handler->display->display_options['fields']['field_subtext']['id'] = 'field_subtext';
  $handler->display->display_options['fields']['field_subtext']['table'] = 'field_data_field_subtext';
  $handler->display->display_options['fields']['field_subtext']['field'] = 'field_subtext';
  $handler->display->display_options['fields']['field_subtext']['label'] = '';
  $handler->display->display_options['fields']['field_subtext']['element_label_colon'] = FALSE;
  /* Field: Content: Imagem do Slide */
  $handler->display->display_options['fields']['field_hp_slide']['id'] = 'field_hp_slide';
  $handler->display->display_options['fields']['field_hp_slide']['table'] = 'field_data_field_hp_slide';
  $handler->display->display_options['fields']['field_hp_slide']['field'] = 'field_hp_slide';
  $handler->display->display_options['fields']['field_hp_slide']['label'] = '';
  $handler->display->display_options['fields']['field_hp_slide']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_hp_slide']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_hp_slide']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_hp_slide']['settings'] = array(
    'image_style' => '',
    'image_link' => '',
  );
  /* Field: File: File ID */
  $handler->display->display_options['fields']['fid']['id'] = 'fid';
  $handler->display->display_options['fields']['fid']['table'] = 'file_managed';
  $handler->display->display_options['fields']['fid']['field'] = 'fid';
  $handler->display->display_options['fields']['fid']['relationship'] = 'field_hp_slide_fid';
  $handler->display->display_options['fields']['fid']['label'] = '';
  $handler->display->display_options['fields']['fid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['fid']['element_label_colon'] = FALSE;
  /* Field: Content: link */
  $handler->display->display_options['fields']['field_link']['id'] = 'field_link';
  $handler->display->display_options['fields']['field_link']['table'] = 'field_data_field_link';
  $handler->display->display_options['fields']['field_link']['field'] = 'field_link';
  $handler->display->display_options['fields']['field_link']['label'] = '';
  $handler->display->display_options['fields']['field_link']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_link']['alter']['text'] = 'Read more';
  $handler->display->display_options['fields']['field_link']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_link']['alter']['path'] = '[field_link-value]';
  $handler->display->display_options['fields']['field_link']['alter']['link_class'] = 'button';
  $handler->display->display_options['fields']['field_link']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_link']['element_wrapper_type'] = 'span';
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
  $export['flexslider_slideshow'] = $view;

  return $export;
}
