<?php dsm($variables); ?>

<section id="user-info-container">
	<?php if (isset($user_profile['user_picture']['#markup'])): ?>
		<?php print $user_profile['user_picture']['#markup']; ?>
	<?php endif  ?>
	<div id="user-info">
		<h1><?php echo $variables['elements']['#account']->name; ?></h1>
		<div>
			<span class="label label-primary">Role</span>
		</div>
		<?php 
			if(	
				!empty($variables['elements']['#account']->uid) &&
				!empty($variables['user']->uid) && 
				($variables['elements']['#account']->uid == $variables['user']->uid)):  
		?>
			<div>
				<a href="#">My Courses</a>
			</div>
		<?php endif;  ?>
	</div>
</section>
<hr>
<section id="user-contact-info-container">
	<h2>Contact Information</h2>
	<?php if (isset($user_profile['name_and_address'])): ?>
		<?php print($user_profile['name_and_address']['name_and_address']['#markup']) ?>
	
	<?php endif;  ?>
</section>
<hr>
