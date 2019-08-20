<?php dsm($variables); ?> 

<section id="user-info-container">
	<?php if (isset($user_profile['user_picture']['#markup'])): ?>
		<?php print $user_profile['user_picture']['#markup']; ?>
	<?php endif  ?>
	<div id="user-info">
		<h1><?php echo $variables['elements']['#account']->name; ?></h1>
		<div class="user-roles">
			<?php foreach($variables['elements']['#account']->roles as $role) { 
				if($role == 'authenticated user')
					continue;
			?>
					<span class="label label-primary"><?php echo $role;  ?></span>
			<?php }  ?>
		</div>
	</div>
</section>
<hr>
