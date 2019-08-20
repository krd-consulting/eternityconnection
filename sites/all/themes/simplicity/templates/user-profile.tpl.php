<?php //dsm($variables); ?> 
<?php

 global $civi_user;
// print '<pre>';
// print_r($civi_user);
// print '</pre>';

?>


<section id="user-info-container">
	<?php if (isset($user_profile['user_picture']['#markup'])): ?>
		<?php print $user_profile['user_picture']['#markup']; ?>
	<?php endif  ?>
	<div id="user-info">
		<?php
			if($civi_user['display_name']):
		?>
			<h1 class="display-name"><?php echo $civi_user['display_name']; ?></h1>
			<h2 class="user-name"><?php echo $variables['elements']['#account']->name; ?></h2>
		<?php
			else:
		?>
			<h1 class="display-name"><?php echo $variables['elements']['#account']->name; ?></h1>
		<?php
			endif;
		?>
		<div class="user-roles">
			<?php foreach($variables['elements']['#account']->roles as $role) { 
				if($role == 'authenticated user')
					continue;
			?>
					<span class="label label-primary"><?php echo $role;  ?></span>
			<?php }  ?>
		</div>
		<br>
		<div class="user-civi-info user-address">
			<div>
				<i class="crm-i fa-home"></i>
			</div>
			<div>
				<div><?php echo $civi_user['street_address'];  ?></div>
				<div><?php echo $civi_user['supplemental_address_1'];  ?></div>
				<div><?php echo $civi_user['supplemental_address_2'];  ?></div>
				<div><?php echo $civi_user['supplemental_address_3'];  ?></div>
				<div>
					<?php echo $civi_user['city'];  ?>
					<?php echo $civi_user['state_province'];  ?>
				</div>
			</div>
		</div>
		<br>
		<?php if(!empty($civi_user['phone'])): ?>
			<div class="user-civi-info user-contact">
				<div>
                                	<i class="crm-i fa-phone"></i>
                        	</div>
                        	<div>
                                	<div>
                                       		<?php echo $civi_user['phone'];  ?>
                                	</div>
                        	</div>
			</div>
		<?php endif; ?>
	</div>
</section>
<hr>
