// http://civicrm.org/licensing
// Adds ajaxy behavior to a simple CiviCRM page
CRM.$(function($) {
  var active = 'a.button, a.action-item:not(.crm-enable-disable), a.crm-popup';
  $('#crm-main-content-wrapper')
    // Widgetize the content area
    .crmSnippet()
    // Open action links in a popup
    .off('.crmLivePage')
    .on('click.crmLivePage', active, CRM.popup)
    .on('crmPopupFormSuccess.crmLivePage', active, CRM.refreshParent);
});
;
if (!window.CRM) window.CRM = {};
window.cj = CRM.$ = jQuery.noConflict(true);
CRM._ = _.noConflict();
;
