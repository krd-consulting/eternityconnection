<?php

// Put the logo path into JavaScript for the live preview.
drupal_add_js(array('color' => array('logo' => theme_get_setting('logo', 'simplicity'))), 'setting');

$info = array(
  // Available colors and color labels used in theme.
  'fields' => array(
    //'top' => t('Header and footer'),
    'base' => t("Base color"),
    'text' => t("Text"),
    'link' => t('Links and Theme color'),
  ),
  // Pre-defined color schemes.
  'schemes' => array(
    'default' => array(
      'title' => t('Orange'),
      'colors' => array(
        //'top' => '#F17A4E',
        'base' => '#F17A4E',
        'text' => '#575757',
        'link' => '#F17A4E',
      ),
    ),
    'blue' => array(
      'title' => t('Blue'),
      'colors' => array(
          //'top' => '#5E9DF1',
          'base' => '#5E9DF1',
          //'bg' => '#ffffff',
          'text' => '#575757',
          'link' => '#5E9DF1',
      ),
    ),
    'red_wine' => array(
          'title' => t('Red wine'),
          'colors' => array(
              //'top' => '#FB3A48',
              'base' => '#FB3A48',
              //'bg' => '#ffffff',
              'text' => '#575757',
              'link' => '#FB3A48',
          ),
     ),
     'bee' => array(
          'title' => t('Bee'),
          'colors' => array(
              //'top' => '#FAC863',
              'base' => '#FAC863',
              //'bg' => '#ffffff',
              'text' => '#575757',
              'link' => '#FAC863',
          ),
      ),
      'salmon' => array(
          'title' => t('Salmon'),
          'colors' => array(
              //'top' => '#FA8072',
              'base' => '#FA8072',
              //'bg' => '#ffffff',
              'text' => '#575757',
              'link' => '#FA8072',
          ),
      ),
      'bordeaux' => array(
          'title' => t('Bordeuax'),
          'colors' => array(
              //'top' => '#9E404B',
              'base' => '#9E404B',
              //'bg' => '#ffffff',
              'text' => '#575757',
              'link' => '#9E404B'
          ),
      ),
  ),

  // CSS files (excluding @import) to rewrite with new color scheme.
  'css' => array(
    'css/colors.css',
  ),

  // Files to copy.
  'copy' => array(
    'logo.png',
  ),

  // Gradient definitions.
  'gradients' => array(
    array(
        'dimension' => array(0, 0, 0, 0),
    ),
  ),

  // Color areas to fill (x, y, width, height).
  'fill' => array(),

  // Coordinates of all the theme slices (x, y, width, height)
  // with their filename as used in the stylesheet.
  'slices' => array(),

  // Reference color used for blending. Matches the base.png's colors.
  'blend_target' => '#ffffff',

  // Preview files.
  'preview_css' => 'color/preview.css',
  'preview_js' => 'color/preview.js',
  'preview_html' => 'color/preview.html',

  // Base file for image generation.
  'base_image' => 'color/base.png',
);
