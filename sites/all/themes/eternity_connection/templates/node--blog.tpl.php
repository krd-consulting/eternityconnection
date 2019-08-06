<?php

/**
 * @file
 * Default theme implementation to display a node.
 *
 * Available variables:
 * - $title: the (sanitized) title of the node.
 * - $content: An array of node items. Use render($content) to print them all,
 *   or print a subset such as render($content['field_example']). Use
 *   hide($content['field_example']) to temporarily suppress the printing of a
 *   given element.
 * - $user_picture: The node author's picture from user-picture.tpl.php.
 * - $date: Formatted creation date. Preprocess functions can reformat it by
 *   calling format_date() with the desired parameters on the $created variable.
 * - $name: Themed username of node author output from theme_username().
 * - $node_url: Direct URL of the current node.
 * - $display_submitted: Whether submission information should be displayed.
 * - $submitted: Submission information created from $name and $date during
 *   template_preprocess_node().
 * - $classes: String of classes that can be used to style contextually through
 *   CSS. It can be manipulated through the variable $classes_array from
 *   preprocess functions. The default values can be one or more of the
 *   following:
 *   - node: The current template type; for example, "theming hook".
 *   - node-[type]: The current node type. For example, if the node is a
 *     "Blog entry" it would result in "node-blog". Note that the machine
 *     name will often be in a short form of the human readable label.
 *   - node-teaser: Nodes in teaser form.
 *   - node-preview: Nodes in preview mode.
 *   The following are controlled through the node publishing options.
 *   - node-promoted: Nodes promoted to the front page.
 *   - node-sticky: Nodes ordered above other non-sticky nodes in teaser
 *     listings.
 *   - node-unpublished: Unpublished nodes visible only to administrators.
 * - $title_prefix (array): An array containing additional output populated by
 *   modules, intended to be displayed in front of the main title tag that
 *   appears in the template.
 * - $title_suffix (array): An array containing additional output populated by
 *   modules, intended to be displayed after the main title tag that appears in
 *   the template.
 *
 * Other variables:
 * - $node: Full node object. Contains data that may not be safe.
 * - $type: Node type; for example, story, page, blog, etc.
 * - $comment_count: Number of comments attached to the node.
 * - $uid: User ID of the node author.
 * - $created: Time the node was published formatted in Unix timestamp.
 * - $classes_array: Array of html class attribute values. It is flattened
 *   into a string within the variable $classes.
 * - $zebra: Outputs either "even" or "odd". Useful for zebra striping in
 *   teaser listings.
 * - $id: Position of the node. Increments each time it's output.
 *
 * Node status variables:
 * - $view_mode: View mode; for example, "full", "teaser".
 * - $teaser: Flag for the teaser state (shortcut for $view_mode == 'teaser').
 * - $page: Flag for the full page state.
 * - $promote: Flag for front page promotion state.
 * - $sticky: Flags for sticky post setting.
 * - $status: Flag for published status.
 * - $comment: State of comment settings for the node.
 * - $readmore: Flags true if the teaser content of the node cannot hold the
 *   main body content.
 * - $is_front: Flags true when presented in the front page.
 * - $logged_in: Flags true when the current user is a logged-in member.
 * - $is_admin: Flags true when the current user is an administrator.
 *
 * Field variables: for each field instance attached to the node a corresponding
 * variable is defined; for example, $node->body becomes $body. When needing to
 * access a field's raw values, developers/themers are strongly encouraged to
 * use these variables. Otherwise they will have to explicitly specify the
 * desired field language; for example, $node->body['en'], thus overriding any
 * language negotiation rule that was previously applied.
 *
 * @see template_preprocess()
 * @see template_preprocess_node()
 * @see template_process()
 *
 * @ingroup themeable
 */

//debug($node);

$array_post_types_icons = array(
    'Embed video' => 'fa-video-camera',
    'Self hosted audio' => 'fa-music',
    'Self hosted video' => 'fa-video-camera',
    'Soundcloud' => 'fa-play-circle',
    'Standard' => 'fa-picture-o',
);

//debug($content['field_post_type']['#object']->field_post_type[$node->language][0]['taxonomy_term']->name);

if (isset($content['field_post_type']['#object']->field_post_type[$node->language][0]['taxonomy_term']->name)){

    $post_type = $content['field_post_type']['#object']->field_post_type[$node->language][0]['taxonomy_term']->name;

    $icon = $array_post_types_icons[$post_type];

    //debug($icon);

    //unset($content['field_post_type']);
}

?>
<div id="node-<?php print $node->nid; ?>" class="<?php print $classes; ?> clearfix"<?php print $attributes; ?>>


    <?php if (isset($content['field_blog_image']['#object']->field_blog_image[$node->language])
        || isset($content['field_video_embed']['#object']->field_video_embed[$node->language])
        || isset($content['field_media_element']['#object']->field_media_element[$node->language])
        || isset($content['field_audio_upload']['#object']->field_audio_upload[$node->language])
        || isset($content['field_soundcloud']['#object']->field_soundcloud[$node->language])): ?>

        <?php if (isset($icon)): ?>
            <div class="blog_post_type">
                <a>
                    <i class="fa <?php print $icon; ?> fa-2x"></i>
                </a>
            </div>
        <?php endif; ?>
        <div class="blog_post_date">
            <div>
                <?php
                echo date("M j",$node->created)
                ?>
            </div>
        </div>

    <?php endif; ?>

    <div class="blog_content">

        <div class="blog_head">
            <?php if (isset($content['field_blog_image']['#object']->field_blog_image[$node->language])): ?>
                <div class="project_images">

                    <div class="post-thumbnail slider-thumbnail" data-effect="slide">

                        <div class="flexslider">
                            <ul class="slides">
                                <?php

                                $image_fields = $content['field_blog_image']['#object']->field_blog_image[$node->language];

                                //debug($image_fields);

                                foreach($image_fields as $key => $image){
                                    print "<li>";
                                    //debug($image);
                                    /*print theme_image(array(
                                            'path' => $image['uri'],
                                            'attributes' => null,
                                            'width' => null,
                                            'height' => null
                                        )
                                    );*/

                                    print theme('image_style', array('style_name' => 'portfolio_detail', 'path' => $image['uri'], 'attributes' => array('class' => '')));

                                    print "</li>";
                                }

                                unset($content['field_blog_image']);

                                ?>
                            </ul>
                        </div>

                    </div>

                </div>
            <?php endif; ?>

            <?php if (isset($content['field_video_embed']['#object']->field_video_embed[$node->language])): ?>

                <?php
                print render($content['field_video_embed']);
                unset($content['field_video_embed']);
                ?>

            <?php endif; ?>

            <?php if (isset($content['field_media_element']['#object']->field_media_element[$node->language])): ?>

                <?php
                print render($content['field_media_element']);
                unset($content['field_media_element']);
                ?>

            <?php endif; ?>

            <?php if (isset($content['field_audio_upload']['#object']->field_audio_upload[$node->language])): ?>

                <?php
                print render($content['field_audio_upload']);
                unset($content['field_audio_upload']);
                ?>

            <?php endif; ?>

            <?php if (isset($content['field_soundcloud']['#object']->field_soundcloud[$node->language])): ?>

                <?php
                print render($content['field_soundcloud']);
                unset($content['field_soundcloud']);
                ?>

            <?php endif; ?>
        </div>

        <?php print $user_picture; ?>

        <?php print render($title_prefix); ?>
        <?php if (!$page): ?>
            <h2<?php print $title_attributes; ?>><a href="<?php print $node_url; ?>"><?php print $title; ?></a></h2>
        <?php endif; ?>
        <?php print render($title_suffix); ?>

        <div class="post_blog_info">

            <?php if (isset($content['field_post_type']['#object']->field_post_type[$node->language])): ?>

                <div class="blog_category">
                    <i class="fa <?php print $icon; ?> fa-1x"></i>
                    <?php
                    print render($content['field_post_type']);
                    unset($content['field_post_type']);
                    ?>
                </div>

            <?php endif; ?>

            <?php if ($display_submitted): ?>
                <div class="submitted">
                    <?php print $submitted; ?>
                </div>
            <?php endif; ?>

        </div>

        <div class="content"<?php print $content_attributes; ?>>
            <?php
            // We hide the comments and links now so that we can render them later.
            hide($content['comments']);
            hide($content['links']);
            print render($content);
            ?>
        </div>

        <?php print render($content['links']); ?>

        <?php print render($content['comments']); ?>

    </div>


</div>
