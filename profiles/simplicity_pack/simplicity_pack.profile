<?php

/**
 * Implements hook_form_FORM_ID_alter().
 *
 * Allows the profile to alter the site configuration form.
 */
function simplicity_pack_form_install_configure_form_alter(&$form, $form_state) {
    // Pre-populate the site name with the server name.
    $form['site_information']['site_name']['#default_value'] = $_SERVER['SERVER_NAME'];

    $form['site_information']['#weight'] = 1;
    $form['front_page']['default_nodes_main']['#value'] = 1;
    $form['admin_account']['#weight'] = 2;

    $form['site_information']['theme_name_radio'] = array(
        '#type' => 'radios',
        '#default_value' => 'simplicity',
        '#options' => array(
            'simplicity' => t('Simplicity'),
        ),
        '#title' => t('What theme do you want set up as default?'),
    );

    $form['#submit'][] = 'add_theme';
}

function add_theme($form, &$form_state) {
    //die(var_dump($form['site_information']['theme_name_radio']['#value']));

    variable_set('selected_theme_name', $form['site_information']['theme_name_radio']['#value']);
}

function simplicity_pack_install_tasks($install_state) {

    $tasks['select_theme'] = array(
        'display_name' => st('Install Theme'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'set_theme',
    );

    $tasks['select_font'] = array(
        'display_name' => st('Install Font'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'set_font',
    );


    $tasks['insert_slide1'] = array(
        'display_name' => st('Insert Slide 1'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_slide1',
    );

    $tasks['insert_slide2'] = array(
        'display_name' => st('Insert Slide 2'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_slide2',
    );

    $tasks['insert_slide3'] = array(
        'display_name' => st('Insert Slide 3'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_slide3',
    );

    $tasks['insert_terms'] = array(
        'display_name' => st('Inserir Termos'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_terms',
    );

    $tasks['insert_custom_blocks'] = array(
        'display_name' => st('Insert Custom blocks'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_custom_blocks',
    );

    $tasks['insert_projects'] = array(
        'display_name' => st('Insert Projects'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_projects',
    );

    $tasks['insert_pages'] = array(
        'display_name' => st('Insert Pages'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_pages',
    );

    $tasks['insert_blogs'] = array(
        'display_name' => st('Insert Blogs'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_blogs',
    );

    $tasks['insert_quotes'] = array(
        'display_name' => st('Insert Quotes'),
        'display' => TRUE,
        'type' => 'normal',
        'run' => INSTALL_TASK_RUN_IF_REACHED,
        'function' => 'insert_quotes',
    );

//    $tasks['insert_contacts'] = array(
//        'display_name' => st('Inserir Formulário de Contacto'),
//        'display' => TRUE,
//        'type' => 'normal',
//        'run' => INSTALL_TASK_RUN_IF_REACHED,
//        'function' => 'insert_contact_form',
//    );

    return $tasks;
}

function insert_terms() {

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

function set_theme() {

    //die(variable_get('theme_default'));
    $theme = variable_get('selected_theme_name');

    //global $custom_theme;
    //$custom_theme = $theme;
    $enable = array(
        'theme_default' => $theme,
            // 'admin_theme' => 'seven',
            //'zen'
    );

    theme_enable($enable);
    variable_set('theme_default',$theme);

    theme_disable(array('bartik', 'seven'));

    $var_name = 'theme_' . $theme . '_settings';

    $settings = variable_get($var_name, array());

    $settings['slider_type'] = "full";
    $settings['bootstrap_breadcrumb'] = "0";

    variable_set($var_name, $settings);

}


function set_font(){

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

function insert_quotes() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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

function insert_blocks() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
//    die(var_dump($path_theme));

    $files = file_scan_directory($path_theme . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "blocks.content") {

            $blocks = array();
            ob_start();

            require $file->uri;

            ob_end_clean();

            $blocks = (object) $blocks;

            foreach ($blocks as $block_item) {

                $node = (object) $block_item;

                $node->uid = $account ? $account->uid : 1;

                //die(var_dump($node->field_block_placement));

                foreach ($node->field_block_placement as $placement) {

                    //die(var_dump($placement));

                    foreach ($placement as $last_term) {

                        //Se hover varios termos so esta a inserir um pq e uma dropdown
                        $term = taxonomy_get_term_by_name($last_term);

                        foreach ($term as $term_item) {
                            if ($term_item != null) {
                                //die(var_dump($term_item->tid));
                                $node->field_block_placement["und"][0]['tid'] = $term_item->tid;
                            }
                        }
                    }
                }

                node_save($node);
            }
        }
    }
}

function insert_custom_blocks() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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

function insert_slide1() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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

function insert_slide2() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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

function insert_slide3() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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

function insert_projects() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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
                if (is_array($node->field_project_image)) {

                    $count_index = 0;
                    foreach ($node->field_project_image as $image) {

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

                        $node->field_project_image["und"][$count_index] = (array) $file;
                        $node->field_project_image["und"][$count_index]['fid'] = (string) $file->fid;

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

function insert_blogs() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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

function insert_contact_form() {

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
    $files = file_scan_directory($path . '/' . $dir, '/\.content/', array('key' => 'name'));

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

function insert_about() {

    $dir = 'content';
    $ext = 'content';
    $account = NULL;

    $path = dirname(__FILE__);

    //$files = file_scan_directory($path . '/' . $dir, "\.content$");
    $files = file_scan_directory($path . '/' . $dir, '/\.content/', array('key' => 'name'));

    foreach ($files as $file) {

        if ($file->filename == "welcome.content") {

            $node = array();

            ob_start();

            require $file->uri;

            ob_end_clean();

            $node = (object) $node;

            $node->uid = $account ? $account->uid : 1;

            node_save($node);
        }
    }
}

function insert_pages() {

    $theme = variable_get('selected_theme_name');

    $dir_root = dirname(__FILE__);
    $path_theme = $dir_root . "";

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