<?php dsm($user_profile); ?>

<section>
	<?php if (isset($user_profile['user_picture']['#markup'])): ?>
		<?php print $user_profile['user_picture']['#markup']; ?>
  	<?php endif; ?>
	
	<div></div>
</section>
