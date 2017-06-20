<?php
/**
 * @file
 * jota_portfolio.views_default.inc
 */

/**
 * Implements hook_views_default_views().
 */
function jota_portfolio_views_default_views() {
  $export = array();

  $view = new view();
  $view->name = 'filter_controls';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'taxonomy_term_data';
  $view->human_name = 'Filter controls';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Work';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'filter term-[tid]';
  $handler->display->display_options['style_options']['wrapper_class'] = '';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* Header: Global: Text area */
  $handler->display->display_options['header']['area']['id'] = 'area';
  $handler->display->display_options['header']['area']['table'] = 'views';
  $handler->display->display_options['header']['area']['field'] = 'area';
  $handler->display->display_options['header']['area']['content'] = 'Our work goes from web development to photography. Browse our projects and get in touch for a quote to your specific needs';
  $handler->display->display_options['header']['area']['format'] = 'full_html';
  /* Field: Taxonomy term: Term ID */
  $handler->display->display_options['fields']['tid']['id'] = 'tid';
  $handler->display->display_options['fields']['tid']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['tid']['field'] = 'tid';
  $handler->display->display_options['fields']['tid']['label'] = '';
  $handler->display->display_options['fields']['tid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['tid']['alter']['text'] = 'term-[tid]';
  $handler->display->display_options['fields']['tid']['element_label_colon'] = FALSE;
  /* Field: Taxonomy term: Name */
  $handler->display->display_options['fields']['name']['id'] = 'name';
  $handler->display->display_options['fields']['name']['table'] = 'taxonomy_term_data';
  $handler->display->display_options['fields']['name']['field'] = 'name';
  $handler->display->display_options['fields']['name']['label'] = '';
  $handler->display->display_options['fields']['name']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['name']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['name']['element_label_colon'] = FALSE;
  /* Filter criterion: Taxonomy vocabulary: Machine name */
  $handler->display->display_options['filters']['machine_name']['id'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['table'] = 'taxonomy_vocabulary';
  $handler->display->display_options['filters']['machine_name']['field'] = 'machine_name';
  $handler->display->display_options['filters']['machine_name']['value'] = array(
    'project_type' => 'project_type',
  );

  /* Display: Block */
  $handler = $view->new_display('block', 'Block', 'block');
  $export['filter_controls'] = $view;

  $view = new view();
  $view->name = 'work';
  $view->description = '';
  $view->tag = 'default';
  $view->base_table = 'node';
  $view->human_name = 'Work';
  $view->core = 7;
  $view->api_version = '3.0';
  $view->disabled = FALSE; /* Edit this to true to make a default view disabled initially */

  /* Display: Master */
  $handler = $view->new_display('default', 'Master', 'default');
  $handler->display->display_options['title'] = 'Portfolio';
  $handler->display->display_options['use_more_always'] = FALSE;
  $handler->display->display_options['access']['type'] = 'perm';
  $handler->display->display_options['cache']['type'] = 'none';
  $handler->display->display_options['query']['type'] = 'views_query';
  $handler->display->display_options['query']['options']['query_comment'] = FALSE;
  $handler->display->display_options['exposed_form']['type'] = 'basic';
  $handler->display->display_options['pager']['type'] = 'none';
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'work-item mix [nid]';
  $handler->display->display_options['style_options']['class'] = 'items da-thumbs';
  $handler->display->display_options['style_options']['wrapper_class'] = 'work-list';
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['absolute'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Project type */
  $handler->display->display_options['fields']['field_project_type']['id'] = 'field_project_type';
  $handler->display->display_options['fields']['field_project_type']['table'] = 'field_data_field_project_type';
  $handler->display->display_options['fields']['field_project_type']['field'] = 'field_project_type';
  $handler->display->display_options['fields']['field_project_type']['label'] = '';
  $handler->display->display_options['fields']['field_project_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_project_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_project_type']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_project_type']['group_columns'] = array(
    'tid' => 'tid',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<ul class="social_icons"><li>
                        <a class="social_icon small" href="https://www.facebook.com/sharer/sharer.php?u=[path]" target="_blank"><i class="fa fa-facebook fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://plus.google.com/share?url=[path]" target="_blank"><i class="fa fa-google-plus fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://twitter.com/home?status=[path]" target="_blank"><i class="fa fa-twitter fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=[path]&amp;title=&amp;summary=&amp;source=" target="_blank"><i class="fa fa-linkedin fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://pinterest.com/pin/create/button/?url=&amp;media=[path]&amp;description=" target="_blank"><i class="fa fa-pinterest fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                </ul>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Content: Image */
  $handler->display->display_options['fields']['field_project_image']['id'] = 'field_project_image';
  $handler->display->display_options['fields']['field_project_image']['table'] = 'field_data_field_project_image';
  $handler->display->display_options['fields']['field_project_image']['field'] = 'field_project_image';
  $handler->display->display_options['fields']['field_project_image']['label'] = '';
  $handler->display->display_options['fields']['field_project_image']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['alter']['text'] = '[field_project_image]
<div>
<span class="title">[title]<br/><span class="category">[field_project_type]</span></span>
</div>';
  $handler->display->display_options['fields']['field_project_image']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['alter']['path'] = '[path]';
  $handler->display->display_options['fields']['field_project_image']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_project_image']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_project_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_project_image']['settings'] = array(
    'image_style' => 'portfolio',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_project_image']['group_column'] = 'entity_id';
  $handler->display->display_options['fields']['field_project_image']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_project_image']['delta_offset'] = '0';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['text'] = 'node_[nid]';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
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
    'project' => 'project',
  );

  /* Display: Work */
  $handler = $view->new_display('block', 'Work', 'block');
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['absolute'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Project type */
  $handler->display->display_options['fields']['field_project_type']['id'] = 'field_project_type';
  $handler->display->display_options['fields']['field_project_type']['table'] = 'field_data_field_project_type';
  $handler->display->display_options['fields']['field_project_type']['field'] = 'field_project_type';
  $handler->display->display_options['fields']['field_project_type']['label'] = '';
  $handler->display->display_options['fields']['field_project_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_project_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_project_type']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_project_type']['group_columns'] = array(
    'tid' => 'tid',
  );
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<ul class="social_icons"><li>
                        <a class="social_icon small" href="[path]"><i class="fa fa-link fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small open_project" href="[path]"><i class="fa fa-chevron-down fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                </ul>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Content: Image */
  $handler->display->display_options['fields']['field_project_image']['id'] = 'field_project_image';
  $handler->display->display_options['fields']['field_project_image']['table'] = 'field_data_field_project_image';
  $handler->display->display_options['fields']['field_project_image']['field'] = 'field_project_image';
  $handler->display->display_options['fields']['field_project_image']['label'] = '';
  $handler->display->display_options['fields']['field_project_image']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['alter']['text'] = '[field_project_image]
<div>
<span class="title">[title]<br/><span class="category">[field_project_type]</span></span>
</div>';
  $handler->display->display_options['fields']['field_project_image']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['alter']['path'] = '[path]';
  $handler->display->display_options['fields']['field_project_image']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_project_image']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_project_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_project_image']['settings'] = array(
    'image_style' => 'portfolio',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_project_image']['group_column'] = 'entity_id';
  $handler->display->display_options['fields']['field_project_image']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_project_image']['delta_offset'] = '0';
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['text'] = 'node_[nid]';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;

  /* Display: Portfolio 4 cols */
  $handler = $view->new_display('page', 'Portfolio 4 cols', 'page_2');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'row';
  $handler->display->display_options['path'] = 'portfolio';

  /* Display: Portfolio 3 cols */
  $handler = $view->new_display('page', 'Portfolio 3 cols', 'page_1');
  $handler->display->display_options['defaults']['css_class'] = FALSE;
  $handler->display->display_options['css_class'] = 'row';
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'list';
  $handler->display->display_options['style_options']['row_class'] = 'work-item mix [nid] cols_3';
  $handler->display->display_options['style_options']['class'] = 'items da-thumbs';
  $handler->display->display_options['style_options']['wrapper_class'] = 'work-list';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['path'] = 'portfolio-3-cols';

  /* Display: masonry_portfolio */
  $handler = $view->new_display('page', 'masonry_portfolio', 'page_3');
  $handler->display->display_options['defaults']['style_plugin'] = FALSE;
  $handler->display->display_options['style_plugin'] = 'default';
  $handler->display->display_options['style_options']['row_class'] = 'item';
  $handler->display->display_options['defaults']['style_options'] = FALSE;
  $handler->display->display_options['defaults']['row_plugin'] = FALSE;
  $handler->display->display_options['row_plugin'] = 'fields';
  $handler->display->display_options['row_options']['default_field_elements'] = FALSE;
  $handler->display->display_options['defaults']['row_options'] = FALSE;
  $handler->display->display_options['defaults']['fields'] = FALSE;
  /* Field: Content: Path */
  $handler->display->display_options['fields']['path']['id'] = 'path';
  $handler->display->display_options['fields']['path']['table'] = 'node';
  $handler->display->display_options['fields']['path']['field'] = 'path';
  $handler->display->display_options['fields']['path']['label'] = '';
  $handler->display->display_options['fields']['path']['exclude'] = TRUE;
  $handler->display->display_options['fields']['path']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['path']['absolute'] = TRUE;
  /* Field: Content: Title */
  $handler->display->display_options['fields']['title']['id'] = 'title';
  $handler->display->display_options['fields']['title']['table'] = 'node';
  $handler->display->display_options['fields']['title']['field'] = 'title';
  $handler->display->display_options['fields']['title']['label'] = '';
  $handler->display->display_options['fields']['title']['exclude'] = TRUE;
  $handler->display->display_options['fields']['title']['alter']['word_boundary'] = FALSE;
  $handler->display->display_options['fields']['title']['alter']['ellipsis'] = FALSE;
  $handler->display->display_options['fields']['title']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['title']['link_to_node'] = FALSE;
  /* Field: Content: Project type */
  $handler->display->display_options['fields']['field_project_type']['id'] = 'field_project_type';
  $handler->display->display_options['fields']['field_project_type']['table'] = 'field_data_field_project_type';
  $handler->display->display_options['fields']['field_project_type']['field'] = 'field_project_type';
  $handler->display->display_options['fields']['field_project_type']['label'] = '';
  $handler->display->display_options['fields']['field_project_type']['exclude'] = TRUE;
  $handler->display->display_options['fields']['field_project_type']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_project_type']['type'] = 'taxonomy_term_reference_plain';
  $handler->display->display_options['fields']['field_project_type']['group_columns'] = array(
    'tid' => 'tid',
  );
  /* Field: Content: Image */
  $handler->display->display_options['fields']['field_project_image']['id'] = 'field_project_image';
  $handler->display->display_options['fields']['field_project_image']['table'] = 'field_data_field_project_image';
  $handler->display->display_options['fields']['field_project_image']['field'] = 'field_project_image';
  $handler->display->display_options['fields']['field_project_image']['label'] = '';
  $handler->display->display_options['fields']['field_project_image']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['alter']['text'] = '[field_project_image]
<div>
<span class="title">[title]<br/><span class="category">[field_project_type]</span></span>
</div>';
  $handler->display->display_options['fields']['field_project_image']['alter']['make_link'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['alter']['path'] = '[path]';
  $handler->display->display_options['fields']['field_project_image']['alter']['absolute'] = TRUE;
  $handler->display->display_options['fields']['field_project_image']['element_label_colon'] = FALSE;
  $handler->display->display_options['fields']['field_project_image']['element_default_classes'] = FALSE;
  $handler->display->display_options['fields']['field_project_image']['click_sort_column'] = 'fid';
  $handler->display->display_options['fields']['field_project_image']['settings'] = array(
    'image_style' => 'portfolio_masonry',
    'image_link' => '',
  );
  $handler->display->display_options['fields']['field_project_image']['group_column'] = 'entity_id';
  $handler->display->display_options['fields']['field_project_image']['delta_limit'] = '1';
  $handler->display->display_options['fields']['field_project_image']['delta_offset'] = '0';
  /* Field: Global: Custom text */
  $handler->display->display_options['fields']['nothing']['id'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['table'] = 'views';
  $handler->display->display_options['fields']['nothing']['field'] = 'nothing';
  $handler->display->display_options['fields']['nothing']['label'] = '';
  $handler->display->display_options['fields']['nothing']['alter']['text'] = '<ul class="social_icons"><li>
                        <a class="social_icon small" href="https://www.facebook.com/sharer/sharer.php?u=[path]" target="_blank"><i class="fa fa-facebook fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://plus.google.com/share?url=[path]" target="_blank"><i class="fa fa-google-plus fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://twitter.com/home?status=[path]" target="_blank"><i class="fa fa-twitter fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://www.linkedin.com/shareArticle?mini=true&amp;url=[path]&amp;title=&amp;summary=&amp;source=" target="_blank"><i class="fa fa-linkedin fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                    <li>
                        <a class="social_icon small" href="https://pinterest.com/pin/create/button/?url=&amp;media=[path]&amp;description=" target="_blank"><i class="fa fa-pinterest fa-1x">
                                <!-- icon --></i><p></p></a>
                    </li>
                </ul>';
  $handler->display->display_options['fields']['nothing']['element_label_colon'] = FALSE;
  /* Field: Content: Nid */
  $handler->display->display_options['fields']['nid']['id'] = 'nid';
  $handler->display->display_options['fields']['nid']['table'] = 'node';
  $handler->display->display_options['fields']['nid']['field'] = 'nid';
  $handler->display->display_options['fields']['nid']['label'] = '';
  $handler->display->display_options['fields']['nid']['exclude'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['alter_text'] = TRUE;
  $handler->display->display_options['fields']['nid']['alter']['text'] = 'node_[nid]';
  $handler->display->display_options['fields']['nid']['element_label_colon'] = FALSE;
  $handler->display->display_options['path'] = 'portfolio-masonry';
  $export['work'] = $view;

  return $export;
}
