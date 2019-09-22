<?php
/**
 * @file views-view-list.tpl.php
 * Default simple view template to display a list of rows.
 *
 * - $title : The title of this group of rows.  May be empty.
 * - $options['type'] will either be ul or ol.
 * @ingroup views_templates
 */
?>
<?php print $wrapper_prefix; ?>
<?php if (!empty($title)) : ?>
    <h3><?php print $title; ?></h3>
<?php endif; ?>

<ul id="Grid" class="items da-thumbs">
    <?php foreach ($rows as $id => $row): ?>


        <?php

        $classes_arr = explode(" ",$classes_array[$id]);
        $node_id = str_replace("node-","",end($classes_arr));

        $node = node_load($node_id);

        $terms = array();

        $terms_string = "";

        if(isset($node->field_profile_type[$node->language])){
            foreach($node->field_profile_type[$node->language] as $term_val){

                $terms[] = "term-".$term_val['tid'];

            }
        }

        $terms_string = implode(" ",$terms);	

        ?>


        <li class="<?php print $classes_array[$id]; ?> <?php print $terms_string; ?>"><?php print $row; ?></li>
    <?php endforeach; ?>
</ul>

<?php print $wrapper_suffix; ?>
<div class="portolio_detail_holder" style="display:none;">
    <div class="close_project" style="display:none;">
<a href="#" class="close">
    <i class="fa fa-times fa-2x">

    </i>
</a>
    </div>
    <div class="project_detail" style="visibility:hidden;">

    </div>
</div>
