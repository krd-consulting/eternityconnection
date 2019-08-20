<?php

/**
 * @package CRM
 * @copyright CiviCRM LLC (c) 2004-2019
 *
 * Generated from xml/schema/CRM/Core/Phone.xml
 * DO NOT EDIT.  Generated by CRM_Core_CodeGen
 * (GenCodeChecksum:0534130e8e98264b63217e03811d6fce)
 */

/**
 * Database access object for the Phone entity.
 */
class CRM_Core_DAO_Phone extends CRM_Core_DAO {

  /**
   * Static instance to hold the table name.
   *
   * @var string
   */
  public static $_tableName = 'civicrm_phone';

  /**
   * Should CiviCRM log any modifications to this table in the civicrm_log table.
   *
   * @var bool
   */
  public static $_log = TRUE;

  /**
   * Unique Phone ID
   *
   * @var int
   */
  public $id;

  /**
   * FK to Contact ID
   *
   * @var int
   */
  public $contact_id;

  /**
   * Which Location does this phone belong to.
   *
   * @var int
   */
  public $location_type_id;

  /**
   * Is this the primary phone for this contact and location.
   *
   * @var bool
   */
  public $is_primary;

  /**
   * Is this the billing?
   *
   * @var bool
   */
  public $is_billing;

  /**
   * Which Mobile Provider does this phone belong to.
   *
   * @var int
   */
  public $mobile_provider_id;

  /**
   * Complete phone number.
   *
   * @var string
   */
  public $phone;

  /**
   * Optional extension for a phone number.
   *
   * @var string
   */
  public $phone_ext;

  /**
   * Phone number stripped of all whitespace, letters, and punctuation.
   *
   * @var string
   */
  public $phone_numeric;

  /**
   * Which type of phone does this number belongs.
   *
   * @var int
   */
  public $phone_type_id;

  /**
   * Class constructor.
   */
  public function __construct() {
    $this->__table = 'civicrm_phone';
    parent::__construct();
  }

  /**
   * Returns foreign keys and entity references.
   *
   * @return array
   *   [CRM_Core_Reference_Interface]
   */
  public static function getReferenceColumns() {
    if (!isset(Civi::$statics[__CLASS__]['links'])) {
      Civi::$statics[__CLASS__]['links'] = static::createReferenceColumns(__CLASS__);
      Civi::$statics[__CLASS__]['links'][] = new CRM_Core_Reference_Basic(self::getTableName(), 'contact_id', 'civicrm_contact', 'id');
      CRM_Core_DAO_AllCoreTables::invoke(__CLASS__, 'links_callback', Civi::$statics[__CLASS__]['links']);
    }
    return Civi::$statics[__CLASS__]['links'];
  }

  /**
   * Returns all the column names of this table
   *
   * @return array
   */
  public static function &fields() {
    if (!isset(Civi::$statics[__CLASS__]['fields'])) {
      Civi::$statics[__CLASS__]['fields'] = [
        'id' => [
          'name' => 'id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Phone ID'),
          'description' => ts('Unique Phone ID'),
          'required' => TRUE,
          'where' => 'civicrm_phone.id',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
        ],
        'contact_id' => [
          'name' => 'contact_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Phone Contact'),
          'description' => ts('FK to Contact ID'),
          'where' => 'civicrm_phone.contact_id',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
          'FKClassName' => 'CRM_Contact_DAO_Contact',
        ],
        'location_type_id' => [
          'name' => 'location_type_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Phone Location Type'),
          'description' => ts('Which Location does this phone belong to.'),
          'where' => 'civicrm_phone.location_type_id',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
          'html' => [
            'type' => 'Select',
          ],
          'pseudoconstant' => [
            'table' => 'civicrm_location_type',
            'keyColumn' => 'id',
            'labelColumn' => 'display_name',
          ],
        ],
        'is_primary' => [
          'name' => 'is_primary',
          'type' => CRM_Utils_Type::T_BOOLEAN,
          'title' => ts('Is Phone Primary?'),
          'description' => ts('Is this the primary phone for this contact and location.'),
          'where' => 'civicrm_phone.is_primary',
          'default' => '0',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
        ],
        'is_billing' => [
          'name' => 'is_billing',
          'type' => CRM_Utils_Type::T_BOOLEAN,
          'title' => ts('Is Billing Phone'),
          'description' => ts('Is this the billing?'),
          'where' => 'civicrm_phone.is_billing',
          'default' => '0',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
        ],
        'mobile_provider_id' => [
          'name' => 'mobile_provider_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Mobile Provider'),
          'description' => ts('Which Mobile Provider does this phone belong to.'),
          'where' => 'civicrm_phone.mobile_provider_id',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
        ],
        'phone' => [
          'name' => 'phone',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Phone'),
          'description' => ts('Complete phone number.'),
          'maxlength' => 32,
          'size' => CRM_Utils_Type::MEDIUM,
          'import' => TRUE,
          'where' => 'civicrm_phone.phone',
          'headerPattern' => '/phone/i',
          'dataPattern' => '/^[\d\(\)\-\.\s]+$/',
          'export' => TRUE,
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
          'html' => [
            'type' => 'Text',
          ],
        ],
        'phone_ext' => [
          'name' => 'phone_ext',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Phone Extension'),
          'description' => ts('Optional extension for a phone number.'),
          'maxlength' => 16,
          'size' => 4,
          'import' => TRUE,
          'where' => 'civicrm_phone.phone_ext',
          'headerPattern' => '/extension/i',
          'dataPattern' => '/^\d+$/',
          'export' => TRUE,
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
          'html' => [
            'type' => 'Text',
          ],
        ],
        'phone_numeric' => [
          'name' => 'phone_numeric',
          'type' => CRM_Utils_Type::T_STRING,
          'title' => ts('Phone Numeric'),
          'description' => ts('Phone number stripped of all whitespace, letters, and punctuation.'),
          'maxlength' => 32,
          'size' => CRM_Utils_Type::MEDIUM,
          'where' => 'civicrm_phone.phone_numeric',
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
        ],
        'phone_type_id' => [
          'name' => 'phone_type_id',
          'type' => CRM_Utils_Type::T_INT,
          'title' => ts('Phone Type'),
          'description' => ts('Which type of phone does this number belongs.'),
          'where' => 'civicrm_phone.phone_type_id',
          'export' => TRUE,
          'table_name' => 'civicrm_phone',
          'entity' => 'Phone',
          'bao' => 'CRM_Core_BAO_Phone',
          'localizable' => 0,
          'html' => [
            'type' => 'Select',
          ],
          'pseudoconstant' => [
            'optionGroupName' => 'phone_type',
            'optionEditPath' => 'civicrm/admin/options/phone_type',
          ],
        ],
      ];
      CRM_Core_DAO_AllCoreTables::invoke(__CLASS__, 'fields_callback', Civi::$statics[__CLASS__]['fields']);
    }
    return Civi::$statics[__CLASS__]['fields'];
  }

  /**
   * Return a mapping from field-name to the corresponding key (as used in fields()).
   *
   * @return array
   *   Array(string $name => string $uniqueName).
   */
  public static function &fieldKeys() {
    if (!isset(Civi::$statics[__CLASS__]['fieldKeys'])) {
      Civi::$statics[__CLASS__]['fieldKeys'] = array_flip(CRM_Utils_Array::collect('name', self::fields()));
    }
    return Civi::$statics[__CLASS__]['fieldKeys'];
  }

  /**
   * Returns the names of this table
   *
   * @return string
   */
  public static function getTableName() {
    return self::$_tableName;
  }

  /**
   * Returns if this table needs to be logged
   *
   * @return bool
   */
  public function getLog() {
    return self::$_log;
  }

  /**
   * Returns the list of fields that can be imported
   *
   * @param bool $prefix
   *
   * @return array
   */
  public static function &import($prefix = FALSE) {
    $r = CRM_Core_DAO_AllCoreTables::getImports(__CLASS__, 'phone', $prefix, []);
    return $r;
  }

  /**
   * Returns the list of fields that can be exported
   *
   * @param bool $prefix
   *
   * @return array
   */
  public static function &export($prefix = FALSE) {
    $r = CRM_Core_DAO_AllCoreTables::getExports(__CLASS__, 'phone', $prefix, []);
    return $r;
  }

  /**
   * Returns the list of indices
   *
   * @param bool $localize
   *
   * @return array
   */
  public static function indices($localize = TRUE) {
    $indices = [
      'index_location_type' => [
        'name' => 'index_location_type',
        'field' => [
          0 => 'location_type_id',
        ],
        'localizable' => FALSE,
        'sig' => 'civicrm_phone::0::location_type_id',
      ],
      'index_is_primary' => [
        'name' => 'index_is_primary',
        'field' => [
          0 => 'is_primary',
        ],
        'localizable' => FALSE,
        'sig' => 'civicrm_phone::0::is_primary',
      ],
      'index_is_billing' => [
        'name' => 'index_is_billing',
        'field' => [
          0 => 'is_billing',
        ],
        'localizable' => FALSE,
        'sig' => 'civicrm_phone::0::is_billing',
      ],
      'UI_mobile_provider_id' => [
        'name' => 'UI_mobile_provider_id',
        'field' => [
          0 => 'mobile_provider_id',
        ],
        'localizable' => FALSE,
        'sig' => 'civicrm_phone::0::mobile_provider_id',
      ],
      'index_phone_numeric' => [
        'name' => 'index_phone_numeric',
        'field' => [
          0 => 'phone_numeric',
        ],
        'localizable' => FALSE,
        'sig' => 'civicrm_phone::0::phone_numeric',
      ],
    ];
    return ($localize && !empty($indices)) ? CRM_Core_DAO_AllCoreTables::multilingualize(__CLASS__, $indices) : $indices;
  }

}
