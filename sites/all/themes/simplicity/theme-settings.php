<?php
/**
 * @file
 * theme-settings.php
 *
 * Provides theme settings for Bootstrap based themes when admin theme is not.
 *
 * @see theme/settings.inc
 */
define('SIMPLICITY_THEME',"simplicity");


function simplicity_form_system_theme_settings_alter(&$form, &$form_state) {

    if(theme_get_setting('slider_type') == null){
        $default = "full";
    }
    else{
        $default = theme_get_setting('slider_type');
    }

    $form['simplicity'] = array(
        '#type' => 'vertical_tabs',
        '#attached' => array(
            'js'  => array(drupal_get_path('theme', 'bootstrap') . '/js/bootstrap.admin.js'),
        ),
        '#prefix' => '<h2><small>' . t('Simplicity Settings') . '</small></h2>',
        '#weight' => -9,
    );

    // Components.
    $form['slideshow'] = array(
        '#type' => 'fieldset',
        '#title' => t('Slideshow'),
        '#group' => 'simplicity',
    );

    $form['slideshow']['slider_type'] = array(
        '#type' => 'radios',
        '#title' => t('Homepage slider size'),
        '#description' => t('Specify ur type of slider.'),
        '#options' => array(
            'partial' => t('Partial'),
            'full' => t('Full height'),
        ),
        '#default_value' => $default,
    );

    $form['layout'] = array(
        '#type' => 'fieldset',
        '#title' => t('Layout'),
        '#group' => 'simplicity',
    );

    if(theme_get_setting('layout_type') == null){
        $default_layout = "full_width";
    }
    else{
        $default_layout = theme_get_setting('layout_type');
    }

    $form['layout']['layout_type'] = array(
        '#type' => 'radios',
        '#title' => t('Homepage slider size'),
        '#description' => t('Specify ur type of slider.'),
        '#options' => array(
            'full_width' => t('Full width'),
            'boxed' => t('Boxed'),
        ),
        '#default_value' => $default_layout,
    );

    // Components.
    $form['demo_content'] = array(
        '#type' => 'fieldset',
        '#title' => t('Features content'),
        '#group' => 'simplicity',
    );

    if(theme_get_setting('demo_features_installed') == null){
        $default_demo = 0;
    }
    else{
        $default_demo = theme_get_setting('demo_features_installed');
    }

    $form['demo_content']['demo_features_installed'] = array(
        '#type' => 'checkbox',
        '#title' => t('Install simplicity features'),
        '#description' => t('Click to install theme features like flexslider,quotes,portfolio.'),
        '#default_value' => $default_demo,
    );

    if(theme_get_setting('demo_content_installed') == null){
        $default_demo_content = 0;
    }
    else{
        $default_demo_content = theme_get_setting('demo_content_installed');
    }

    $form['demo_content']['demo_content_installed'] = array(
        '#type' => 'checkbox',
        '#title' => t('Install simplicity demo Content'),
        '#description' => t('Click to install the theme demonstration content.'),
        '#default_value' => $default_demo_content,
    );

    $form['#submit'][] = 'simplicity_settings_form_submit';

    // Work-around for this bug: https://drupal.org/node/1862892
    $theme_settings_path = drupal_get_path('theme', 'simplicity') . '/theme-settings.php';
    if (file_exists($theme_settings_path) && isset($form_state['build_info']['files']) && !in_array($theme_settings_path, $form_state['build_info']['files'])) {
        $form_state['build_info']['files'][] = $theme_settings_path;
    }
}

function simplicity_settings_form_submit(&$form, $form_state){

    $module_list = array(
        "jota_flexslider",
        "simplicity_blog",
        "jota_portfolio",
        "fontawesome",
        "fontyourface",
        "fontyourface_ui",
        "google_fonts_api",
        "jota_quotes",
        "user_tweets"
    );

    if($form_state['values']['demo_features_installed']){

        //THEME FEATURES HAS BEEN ENABLED (StiLL CHECK FOR IF IT HAD ALREADY BEEN SET)

        $features_enabled = variable_get("simplicity_features","disabled");

        if($features_enabled != "enabled"){

            //RUN THEM
            foreach($module_list as $module){
                if(!module_exists($module)){
                    module_enable(array($module));
                }
            }

            $features_enabled = variable_set("simplicity_features","enabled");

            demo_insert_blocks_in_places();

            drupal_flush_all_caches();

            demo_insert_terms();

            demo_insert_menus();

            demo_insert_custom_blocks();

            demo_set_font();

            drupal_set_message(t("Simplicity features where installed"));

        }



    }
    else{

        //DISABLE THEME FEATURES

        /*foreach($module_list as $module){
            if(module_exists($module)){
                $return = module_disable(array($module));
                if(!$return){
                    drupal_set_message(t("Failed to load some module dependencies"));
                }
            }
        }*/

        $features_enabled = variable_set("simplicity_features","disabled");

    }


    if($form_state['values']['demo_content_installed']){

        $demo_content_enabled = variable_get("simplicity_demo_content","disabled");

        if($demo_content_enabled != "enabled"){

            //CHECK IF IS TO INSERT DEMO CONTENT
            demo_insert_slide1();
            demo_insert_slide2();
            demo_insert_slide3();

            demo_insert_projects();

            demo_insert_blogs();

            demo_insert_contact_form();

            demo_insert_pages();

            $demo_content_enabled = variable_set("simplicity_demo_content","enabled");

            drupal_set_message(t("Simplicity demo content was installed"));

        }

    }

}


/*INSTALL DEMO CONTENT FUNCTIONS*/

function demo_insert_menus(){
    $item = array(
        'link_title' => st('Work'),
        'link_path' => 'portfolio',
        'menu_name' => 'main-menu',
        'weight' => 3,
    );
    $work_lid = menu_link_save($item);

    $item = array(
        'link_title' => st('Work 4 columns'),
        'link_path' => 'portfolio',
        'menu_name' => 'main-menu',
        'weight' => 0,
        'plid' => $work_lid,
    );
    menu_link_save($item);

    $item = array(
        'link_title' => st('Work 3 columns'),
        'link_path' => 'portfolio-3-cols',
        'menu_name' => 'main-menu',
        'weight' => 1,
        'plid' => $work_lid,
    );
    menu_link_save($item);

    $item = array(
        'link_title' => st('Work masonry'),
        'link_path' => 'portfolio-masonry',
        'menu_name' => 'main-menu',
        'weight' => 0,
        'plid' => $work_lid,
    );
    menu_link_save($item);

    $item = array(
        'link_title' => st('Blog'),
        'link_path' => 'blog/1',
        'menu_name' => 'main-menu',
        'weight' => 4,
    );
    $blog_lid = menu_link_save($item);

    $item = array(
        'link_title' => st('Blog sidebar right'),
        'link_path' => 'blog/1',
        'menu_name' => 'main-menu',
        'weight' => 1,
        'plid' => $blog_lid,
    );
    menu_link_save($item);

    $item = array(
        'link_title' => st('Blog sidebar left'),
        'link_path' => 'blog-left-sidebar',
        'menu_name' => 'main-menu',
        'weight' => 2,
        'plid' => $blog_lid,
    );
    menu_link_save($item);

    $item = array(
        'link_title' => st('Blog 2 columns'),
        'link_path' => 'blog-2-cols',
        'menu_name' => 'main-menu',
        'weight' => 3,
        'plid' => $blog_lid,
    );
    menu_link_save($item);

    $item = array(
        'link_title' => st('Blog 3 columns'),
        'link_path' => 'blog-3-cols',
        'menu_name' => 'main-menu',
        'weight' => 4,
        'plid' => $blog_lid,
    );
    menu_link_save($item);
}

function demo_insert_custom_blocks() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "custom_blocks.content") {

            $custom_blocks = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $custom_blocks = (object) $custom_blocks;

            foreach ($custom_blocks as $block_item) {

                $custom_block = $block_item;

                //CODE TO CREATE THE BLOCK
                $delta = db_insert('block_custom')
                    ->fields(array(
                        'body' => $custom_block['content'],
                        'info' => $custom_block['description'],
                        'format' => "full_html",
                    ))
                    ->execute();
                // Store block delta to allow other modules to work with new block.
                $custom_block_new_delta = $delta;
                $query = db_insert('block')->fields(array('visibility', 'pages', 'custom', 'title', 'module', 'theme','region', 'status', 'weight', 'delta', 'cache'));
                $query->values(array(
                    'visibility' => (int) $custom_block['visibility'],
                    'pages' => trim($custom_block['pages']),
                    'custom' => 1,
                    'title' => $custom_block['title'],
                    'module' => "block",
                    'theme' => $theme,
                    'region' => $custom_block['region'],
                    'status' => 1,
                    'weight' => 1,
                    'delta' => $delta,
                    'cache' => DRUPAL_NO_CACHE,
                ));
                $query->execute();
                /*$query = db_insert('block_role')->fields(array('rid', 'module', 'delta'));
                $query->values(array(
                    'rid' => 1,
                    'module' => "block",
                    'delta' => $delta,
                ));
                $query->execute();*/
                // Store regions per theme for this block
                /*foreach ($form_state['values']['regions'] as $theme => $region) {
                    db_merge('block')
                        ->key(array('theme' => $theme, 'delta' => $delta, 'module' => $form_state['values']['module']))
                        ->fields(array(
                            'region' => ($region == BLOCK_REGION_NONE ? '' : $region),
                            'pages' => trim($form_state['values']['pages']),
                            'status' => (int) ($region != BLOCK_REGION_NONE),
                        ))
                        ->execute();
                }*/

            }
        }
    }
}

function demo_insert_blocks_in_places(){
    // Enable some simplicity blocks.
    $default_theme = SIMPLICITY_THEME;

    $admin_theme = 'seven';
    $values = array(
        array(
            'module' => 'views',
            'delta' => 'flexslider_slideshow-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'hero',
            'visibility' => 1,
            'pages' => '<front>',
            'title' => '<none>',
            'cache' => -1,
        ),array(
            'module' => 'views',
            'delta' => 'quotes_block-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'quotes',
            'visibility' => 1,
            'pages' => '<front>',
            'title' => '<none>',
            'cache' => -1,
        ),array(
            'module' => 'views',
            'delta' => 'simplicity_user_tweets-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'tweets_area',
            'visibility' => 1,
            'pages' => '<front>',
            'title' => 'Twitter activity',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'blocks-block_3',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'content',
            'visibility' => 1,
            'pages' => '<front>',
            'title' => '<none>',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'filter_controls-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 1,
            'region' => 'third_content',
            'visibility' => 1,
            'pages' => '<front>',
            'title' => 'Our work',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'tag_cloud-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'sidebar_second',
            'visibility' => 1,
            'pages' => 'blog/*
taxonomy/*',
            'title' => 'Blog topics - Tag cloud',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'categories-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'sidebar_second',
            'visibility' => 1,
            'pages' => 'blog/*
taxonomy/*',
            'title' => 'Post Categories',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'tag_cloud-block_1',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'sidebar_first',
            'visibility' => 1,
            'pages' => 'blog-left-sidebar',
            'title' => 'Blog topics - Tag cloud',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'categories-block_1',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 0,
            'region' => 'sidebar_first',
            'visibility' => 1,
            'pages' => 'blog-left-sidebar',
            'title' => 'Post Categories',
            'cache' => -1,
        ),
        array(
            'module' => 'views',
            'delta' => 'work-block',
            'theme' => $default_theme,
            'status' => 1,
            'weight' => 1,
            'region' => 'third_content',
            'visibility' => 1,
            'pages' => '<front>',
            'title' => '<none>',
            'cache' => -1,
        ),
    );
    $query = db_insert('block')->fields(array('module', 'delta', 'theme', 'status', 'weight', 'visibility', 'region', 'pages', 'title', 'cache'));
    foreach ($values as $record) {
        $query->values($record);
    }
    $query->execute();

    //TAKE SEARCH  OUT - NOT SUPPORTED BY THEME

    db_merge('block')
        ->key(array('theme' => $default_theme, 'delta' => "form", 'module' => "search"))
        ->fields(array(
            'region' => (BLOCK_REGION_NONE),
            'pages' => trim(""),
            'status' => (int) (BLOCK_REGION_NONE),
            'visibility' => 0,
        ))
        ->execute();

    db_merge('block')
        ->key(array('theme' => $default_theme, 'delta' => "navigation", 'module' => "system"))
        ->fields(array(
            'region' => (BLOCK_REGION_NONE),
            'pages' => trim(""),
            'status' => (int) (BLOCK_REGION_NONE),
            'visibility' => 0,
        ))
        ->execute();

    db_merge('block')
        ->key(array('theme' => $default_theme, 'delta' => "login", 'module' => "user"))
        ->fields(array(
            'region' => (BLOCK_REGION_NONE),
            'pages' => trim(""),
            'status' => (int) (BLOCK_REGION_NONE),
            'visibility' => 0,
        ))
        ->execute();
}

function demo_insert_slide1() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "slide1.content") {

            $node = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $node = (object) $node;

            $node->uid = $account ? $account->uid : 1;

            node_save($node);

            //Get the node just saved to attach images
            $node_id_saved = $node->nid;

            node_object_prepare($node);

            if (is_array($node->field_hp_slide)) {

                $count_index = 0;
                foreach ($node->field_hp_slide as $image) {

                    /**
                     * Add a file.
                     */
                    // Some filepath on our system. It's the Druplicon! :D
                    //$filepath = drupal_realpath('misc/' . $image);
                    $filepath = drupal_realpath($image);

                    // Create managed File object and associate with Image field.
                    $file = (object) array(
                        'uid' => 1,
                        'uri' => $filepath,
                        'filemime' => file_get_mimetype($filepath),
                        'status' => 1,
                    );

                    // We save the file to the root of the files directory.
                    $file = file_copy($file, 'public://');

                    $node->field_hp_slide["und"][$count_index] = (array) $file;
                    $node->field_hp_slide["und"][$count_index]['fid'] = (string) $file->fid;

                    $count_index = $count_index + 1;
                }

                node_save((object) $node);
            }
        }
    }
}

function demo_insert_slide2() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "slide2.content") {

            $node = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $node = (object) $node;

            $node->uid = $account ? $account->uid : 1;

            node_save($node);

            //Get the node just saved to attach images
            $node_id_saved = $node->nid;

            node_object_prepare($node);

            if (is_array($node->field_hp_slide)) {

                $count_index = 0;
                foreach ($node->field_hp_slide as $image) {

                    /**
                     * Add a file.
                     */
                    // Some filepath on our system. It's the Druplicon! :D
                    //$filepath = drupal_realpath('misc/' . $image);
                    $filepath = drupal_realpath($image);

                    // Create managed File object and associate with Image field.
                    $file = (object) array(
                        'uid' => 1,
                        'uri' => $filepath,
                        'filemime' => file_get_mimetype($filepath),
                        'status' => 1,
                    );

                    // We save the file to the root of the files directory.
                    $file = file_copy($file, 'public://');

                    $node->field_hp_slide["und"][$count_index] = (array) $file;
                    $node->field_hp_slide["und"][$count_index]['fid'] = (string) $file->fid;

                    $count_index = $count_index + 1;
                }

                node_save((object) $node);
            }
        }
    }
}

function demo_insert_slide3() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "slide3.content") {

            $node = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $node = (object) $node;

            $node->uid = $account ? $account->uid : 1;

            node_save($node);

            //Get the node just saved to attach images
            $node_id_saved = $node->nid;

            node_object_prepare($node);

            if (is_array($node->field_hp_slide)) {

                $count_index = 0;
                foreach ($node->field_hp_slide as $image) {

                    /**
                     * Add a file.
                     */
                    // Some filepath on our system. It's the Druplicon! :D
                    //$filepath = drupal_realpath('misc/' . $image);
                    $filepath = drupal_realpath($image);

                    // Create managed File object and associate with Image field.
                    $file = (object) array(
                        'uid' => 1,
                        'uri' => $filepath,
                        'filemime' => file_get_mimetype($filepath),
                        'status' => 1,
                    );

                    // We save the file to the root of the files directory.
                    $file = file_copy($file, 'public://');

                    $node->field_hp_slide["und"][$count_index] = (array) $file;
                    $node->field_hp_slide["und"][$count_index]['fid'] = (string) $file->fid;

                    $count_index = $count_index + 1;
                }

                node_save((object) $node);
            }
        }
    }
}

function demo_insert_terms() {

    $project_terms[0]['name'] = "Design";
    $project_terms[1]['name'] = "Web";
    $project_terms[2]['name'] = "Photography";
    $project_terms[3]['name'] = "Video production";


    $voc = taxonomy_vocabulary_machine_name_load('project_type');
    foreach ($project_terms as $project_term_name) {
        $project_term = new stdClass();
        $project_term->name = $project_term_name['name'];
        $project_term->vid = $voc->vid;
        taxonomy_term_save($project_term);
    }

    //Post type taxonomy
    $post_terms[0]['name'] = "Standard";
    $post_terms[1]['name'] = "Embed video";
    $post_terms[2]['name'] = "Self hosted video";
    $post_terms[3]['name'] = "Soundcloud";
    $post_terms[4]['name'] = "Self hosted audio";

    $voc = taxonomy_vocabulary_machine_name_load('blog_type');
    foreach ($post_terms as $post_term_name) {
        $post_term = new stdClass();
        $post_term->name = $post_term_name['name'];
        $post_term->vid = $voc->vid;
        taxonomy_term_save($post_term);
    }

}

function demo_insert_projects() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "projectos.content") {

            $projects = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $projects = (object) $projects;

            foreach ($projects as $node_item) {

                $node = (object) $node_item;

                $node->uid = $account ? $account->uid : 1;

                node_save($node);

                //Save project Image
                if (is_array($node->field_blog_image)) {

                    $count_index = 0;
                    foreach ($node->field_blog_image as $image) {

                        /**
                         * Add a file.
                         */
                        // Some filepath on our system. It's the Druplicon! :D
                        //$filepath = drupal_realpath('misc/' . $image);
                        $filepath = drupal_realpath($image);

                        // Create managed File object and associate with Image field.
                        $file = (object) array(
                            'uid' => 1,
                            'uri' => $filepath,
                            'alt' => 'project_image',
                            'filemime' => file_get_mimetype($filepath),
                            'status' => 1,
                        );

                        // We save the file to the root of the files directory.
                        $file = file_copy($file, 'public://');

                        $node->field_blog_image["und"][$count_index] = (array) $file;
                        $node->field_blog_image["und"][$count_index]['fid'] = (string) $file->fid;

                        $count_index = $count_index + 1;
                    }

                    //node_save((object) $node);
                }


                //$node = (object) $node;
                $count = 0;
                foreach ($node->field_project_type as $project_type) {

                    //die(var_dump($placement));

                    $term = taxonomy_get_term_by_name($project_type['name']);

                    foreach ($term as $term_item) {
                        if ($term_item != null) {
                            //die(var_dump($term_item->tid));
                            $node->field_project_type["und"][$count]['tid'] = $term_item->tid;
                            $count = $count + 1;
                        }
                    }


                }

                node_save((object) $node);

            }
        }
    }
}

function demo_insert_blogs() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "blogs.content") {

            $blogs = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $blogs = (object) $blogs;

            foreach ($blogs as $node_item) {

                $node = (object) $node_item;

                $node->uid = $account ? $account->uid : 1;

                node_save($node);

                //Save project Image
                if (isset($node->field_blog_image) && is_array($node->field_blog_image)) {

                    $count_index = 0;
                    foreach ($node->field_blog_image as $image) {

                        /**
                         * Add a file.
                         */
                        // Some filepath on our system. It's the Druplicon! :D
                        //$filepath = drupal_realpath('misc/' . $image);
                        $filepath = drupal_realpath($image);

                        // Create managed File object and associate with Image field.
                        $file = (object) array(
                            'uid' => 1,
                            'uri' => $filepath,
                            'filemime' => file_get_mimetype($filepath),
                            'status' => 1,
                        );

                        // We save the file to the root of the files directory.
                        $file = file_copy($file, 'public://');

                        $node->field_blog_image["und"][$count_index] = (array) $file;
                        $node->field_blog_image["und"][$count_index]['fid'] = (string) $file->fid;

                        $count_index = $count_index + 1;
                    }

                    //node_save((object) $node);
                }


                //$node = (object) $node;
                //Insert taxonomy
                foreach ($node->field_post_type as $blog_type) {

                    //die(var_dump($placement));

                    foreach ($blog_type as $last_term) {

                        //Se hover varios termos so esta a inserir um pq e uma dropdown
                        $term = taxonomy_get_term_by_name($last_term);

                        foreach ($term as $term_item) {
                            if ($term_item != null) {
                                //die(var_dump($term_item->tid));
                                $node->field_post_type["und"][0]['tid'] = $term_item->tid;
                            }
                        }
                    }
                }

                //Field tags

                $voc = taxonomy_vocabulary_machine_name_load('Tags');

                $count = 0;
                foreach ($node->field_tags as $tag) {

                    $tag_term = new stdClass();
                    $tag_term->name = $tag['name'];
                    $tag_term->vid = $voc->vid;
                    taxonomy_term_save($tag_term);

                    $node->field_tags["und"][$count]['tid'] = $tag_term->tid;
                    $count++;
                }


                if (isset($node->field_video_embed) && is_array($node->field_video_embed)) {

                    foreach ($node->field_video_embed as $video_embed) {

                        $node->field_video_embed["und"][0]['video_url'] = $video_embed['video_url'];

                    }

                }


                //MEDIA FILES (VIDEO)
                if (isset($node->field_media_element) && is_array($node->field_media_element)) {

                    $count_index = 0;
                    foreach ($node->field_media_element as $video) {

                        /**
                         * Add a file.
                         */
                        // Some filepath on our system. It's the Druplicon! :D
                        //$filepath = drupal_realpath('misc/' . $image);
                        $filepath = drupal_realpath($video);

                        // Create managed File object and associate with Image field.
                        $file = (object) array(
                            'uid' => 1,
                            'uri' => $filepath,
                            'filemime' => file_get_mimetype($filepath),
                            'status' => 1,
                        );

                        // We save the file to the root of the files directory.
                        $file = file_copy($file, 'public://');

                        $node->field_media_element["und"][$count_index] = (array) $file;
                        $node->field_media_element["und"][$count_index]['fid'] = (string) $file->fid;
                        $node->field_media_element["und"][$count_index]['display'] = "1";


                        $count_index = $count_index + 1;
                    }

                    //node_save((object) $node);
                }

                //MEDIA FILES (AUDIO)
                if (isset($node->field_audio_upload) && is_array($node->field_audio_upload)) {

                    $count_index = 0;
                    foreach ($node->field_audio_upload as $audio) {

                        /**
                         * Add a file.
                         */
                        // Some filepath on our system. It's the Druplicon! :D
                        //$filepath = drupal_realpath('misc/' . $image);
                        $filepath = drupal_realpath($audio);

                        // Create managed File object and associate with Image field.
                        $file = (object) array(
                            'uid' => 1,
                            'uri' => $filepath,
                            'filemime' => file_get_mimetype($filepath),
                            'status' => 1,
                        );

                        // We save the file to the root of the files directory.
                        $file = file_copy($file, 'public://');

                        $node->field_audio_upload["und"][$count_index] = (array) $file;
                        $node->field_audio_upload["und"][$count_index]['fid'] = (string) $file->fid;
                        $node->field_audio_upload["und"][$count_index]['display'] = "1";

                        $count_index = $count_index + 1;
                    }

                    //node_save((object) $node);
                }

                //SOUNDCLOUD
                if (isset($node->field_soundcloud) && is_array($node->field_soundcloud)) {

                    foreach ($node->field_soundcloud as $soundcloud) {

                        $node->field_soundcloud["und"][0]['url'] = $soundcloud;

                    }

                }

                node_save((object) $node);

            }
        }
    }
}

function demo_set_font(){

    //QUERY THE FONT ID - HEADER
    $name = 'Ubuntu Condensed regular (latin)';

    $query = db_select('fontyourface_font', 'font');
    $query->fields('font',array('name','fid'));
    $query->condition('name', '%' . db_like($name) . '%', 'LIKE');

    $fid = "";

    $result = $query->execute();
    while($record = $result->fetchAssoc()) {
        $fid = $record['fid'];
    }

    $headers_font = $fid;

    //Install raleways fonts

    //QUERY THE FONT ID - HEADER
    $name_body = 'Lora regular (latin)';

    $query = db_select('fontyourface_font', 'font');
    $query->fields('font',array('name','fid'));
    $query->condition('name', '%' . db_like($name_body) . '%', 'LIKE');

    $fid_body = "";

    $result = $query->execute();
    while($record = $result->fetchAssoc()) {
        $fid_body = $record['fid'];
    }
    $body_font = $fid_body;

    /*.titles selector*/
    $name_titles = 'Ubuntu Condensed regular (latin-ext)';

    $query = db_select('fontyourface_font', 'font');
    $query->fields('font',array('name','fid'));
    $query->condition('name', '%' . db_like($name_titles) . '%', 'LIKE');

    $fid = "";

    $result = $query->execute();
    while($record = $result->fetchAssoc()) {
        $fid = $record['fid'];
    }

    $titles_font = $fid;

    $fonts_update_body = db_update('fontyourface_font') // Table name no longer needs {}
        ->fields(array(
            'enabled' => 1,
            'css_selector' => "body",
        ))
        ->condition('fid', $body_font)
        ->execute();

    $fonts_update_headers = db_update('fontyourface_font') // Table name no longer needs {}
        ->fields(array(
            'enabled' => 1,
            'css_selector' => "h1, h2, h3, h4, h5, h6",
        ))
        ->condition('fid', $headers_font)
        ->execute();

    $fonts_update_titles = db_update('fontyourface_font') // Table name no longer needs {}
        ->fields(array(
            'enabled' => 1,
            'css_selector' => ".title, .menu",
        ))
        ->condition('fid', $titles_font)
        ->execute();

}

function demo_insert_quotes() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "quotes.content") {

            $quotes = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $quotes = (object) $quotes;

            foreach ($quotes as $node_item) {

                $node = (object) $node_item;

                $node->uid = $account ? $account->uid : 1;

                node_save($node);
            }
        }
    }
}

function demo_insert_contact_form() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "contact.content") {

            $node = array();

            ob_start();

            require $file->uri;

            ob_end_clean();

            $node = (object) $node;

            $node->uid = $account ? $account->uid : 1;

            node_save($node);

            //INSERIR FIELDS NO FORMULARIO
        }
    }
}

function demo_insert_pages() {

    $theme = SIMPLICITY_THEME;

    $dir_root = dirname($_SERVER['SCRIPT_FILENAME']);
    $path_theme = $dir_root . "/profiles/simplicity_pack_pack";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "pages.content") {

            $pages = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $pages = (object) $pages;

            foreach ($pages as $node_item) {

                $node = (object) $node_item;

                $node->uid = $account ? $account->uid : 1;

                node_save($node);
            }
        }
    }
}