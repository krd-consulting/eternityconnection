<?php
/**
 * @file
 * jota_portfolio.features.taxonomy.inc
 */

/**
 * Implements hook_taxonomy_default_vocabularies().
 */
function jota_portfolio_taxonomy_default_vocabularies() {
  return array(
    'project_type' => array(
      'name' => 'Project type',
      'machine_name' => 'project_type',
      'description' => 'The types of projects in jota_portfolio',
      'hierarchy' => 0,
      'module' => 'taxonomy',
      'weight' => 0,
      'rdf_mapping' => array(
        'rdftype' => array(
          0 => 'skos:ConceptScheme',
        ),
        'name' => array(
          'predicates' => array(
            0 => 'dc:title',
          ),
        ),
        'description' => array(
          'predicates' => array(
            0 => 'rdfs:comment',
          ),
        ),
      ),
    ),
  );
}
