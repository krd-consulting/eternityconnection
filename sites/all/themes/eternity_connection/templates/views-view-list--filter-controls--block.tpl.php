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
    <li class="filter active" data-filter="all"><?php print t("Show All"); ?></li>
<?php foreach ($rows as $id => $row): ?>

    <?php

    $classes_arr = explode(" ",$classes_array[$id]);
    $data_filter = end($classes_arr);

    ?>

    <li class="<?php print $classes_array[$id]; ?>" data-filter="<?php print $data_filter; ?>"><?php print $row; ?></li>
<?php endforeach; ?>
<?php print $list_type_suffix; ?>
<?php print $wrapper_suffix; ?>