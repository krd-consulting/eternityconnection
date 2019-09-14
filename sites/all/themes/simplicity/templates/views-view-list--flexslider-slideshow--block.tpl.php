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
<?php print $list_type_prefix; ?>

<?php foreach ($rows as $id => $row): ?>

    <?php

        //get the image URL to print as background style
        $classes_array_item = explode(" ",$classes_array[$id]);

        $fid = end($classes_array_item);

        $file = file_load($fid);

        $uri = $file->uri;  // file path as uri: 'public://';
        $url = file_create_url($uri);

    ?>
    <li class="<?php print $classes_array[$id]; ?>" style="background-image: url(<?php print $url; ?>);">
        <div class="overlay" style="display: block;"></div>

        <div class="content_hero">
			<?php	
		    	if(!$user->uid):
			?>
				<div><a class="button" href="/user/login" id="loginbutton" style="float: right;">Log In </a></div>
			<?php
				endif;
			?>
            <?php print $row; ?>
        </div>
    </li>
<?php endforeach; ?>
<?php print $list_type_suffix; ?>
<?php print $wrapper_suffix; ?>
