<?php

/**
 * @file
 * Default theme implementation to present a picture configured for the
 * user's account.
 *
 * Available variables:
 * - $user_picture: Image set by the user or the site's default. Will be linked
 *   depending on the viewer's permission to view the user's profile page.
 * - $account: Array of account information. Potentially unsafe. Be sure to
 *   check_plain() before use.
 *
 * @see template_preprocess_user_picture()
 *
 * @ingroup themeable
 */
?>
<?php dsm($account); ?>

<?php 
	$name = preg_split("/[\s,_-]+/", $account->name);
	$initials = "";

	foreach ($name as $letters) {
  		$initials .= $letters[0];
	}

?>

<?php if ($user_picture): ?>
  <div class="<?php print $classes; ?>">
    <?php print $user_picture; ?>
  </div>
<?php else: ?>
	<div class="<?php print $classes; ?>">
		<span class="placeholder"><?php echo check_plain($initials); ?></span>
	</div>
<?php endif; ?>
