(function($, _, undefined) {
  "use strict";
  /* jshint validthis: true */
  var
    entity,
    action,
    joins = [],
    actions = {values: ['get']},
    fields = [],
    getFieldData = {},
    getFieldsCache = {},
    getActionsCache = {},
    params = {},
    smartyPhp,
    entityDoc,
    fieldTpl = _.template($('#api-param-tpl').html()),
    optionsTpl = _.template($('#api-options-tpl').html()),
    returnTpl = _.template($('#api-return-tpl').html()),
    chainTpl = _.template($('#api-chain-tpl').html()),
    docCodeTpl = _.template($('#doc-code-tpl').html()),
    joinTpl = _.template($('#join-tpl').html()),

    // The following apis do not support the syntax for joins
    // FIXME: the solution is to convert these apis to use _civicrm_api3_basic_get
    NO_JOINS = ['Contact', 'Contribution', 'Pledge', 'Participant'],

    // These types of entityRef don't require any input to open
    // FIXME: ought to be in getfields metadata
    OPEN_IMMEDIATELY = ['RelationshipType', 'Event', 'Group', 'Tag'],

    // Actions that don't support fancy operators
    NO_OPERATORS = ['create', 'update', 'delete', 'setvalue', 'getoptions', 'getactions', 'getfields'],

    // Actions that don't support multiple values
    NO_MULTI = ['delete', 'getoptions', 'getactions', 'getfields',  'getfield', 'setvalue'],

    // Operators with special properties
    BOOL = ['IS NULL', 'IS NOT NULL'],
    TEXT = ['LIKE', 'NOT LIKE'],
    MULTI = ['IN', 'NOT IN', 'BETWEEN', 'NOT BETWEEN'];

  /**
   * Call prettyPrint function and perform additional formatting
   * @param ele
   */
  function prettyPrint(ele) {
    if (typeof window.prettyPrint === 'function') {
      $(ele).removeClass('prettyprinted').addClass('prettyprint');

      window.prettyPrint();

      // Highlight errors in api result
      $('span:contains("error_code"),span:contains("error_message")', '#api-result')
        .siblings('span.str').css('color', '#B00');
    }
  }

  /**
   * Data provider for select2 "fields to return" selector
   * @returns {{results: Array.<T>}}
   */
  function returnFields() {
    return {results: fields.concat({id: '-', text: ts('Other') + '...', description: ts('Choose a field not in this list')})};
  }

  /**
   * Data provider for select2 "field" selectors
   * @returns {{results: Array.<T>}}
   */
  function selectFields() {
    var items = _.filter(fields, function(field) {
      return params[field.id] === undefined;
    });
    return {results: items.concat({id: '-', text: ts('Other') + '...', description: ts('Choose a field not in this list')})};
  }

  /**
   * Recursively populates data for select2 "field" selectors
   * @param fields
   * @param entity
   * @param action
   * @param prefix
   * @param required
   */
  function populateFields(fields, entity, action, prefix, required) {
    _.each(getFieldsCache[entity+action].values, function(field) {
      var name = prefix + field.name,
        pos = fields.length;
      fields.push({
        id: name,
        text: field.title || field.name,
        multi: !!field['api.multiple'],
        description: field.description || '',
        required: !(!field['api.required'] || field['api.required'] === '0')
      });
      if (typeof joins[name] === 'string') {
        fields[pos].children = [];
        populateFields(fields[pos].children, joins[name], 'get', name + '.');
      }
      if (!prefix && required && field['api.required'] && field['api.required'] !== '0') {
        required.push(field.name);
      }
    });
  }

  /**
   * Fetch metadata for a field by name - searches across joins
   * @param name string
   * @returns {*}
   */
  function getField(name) {
    var field = {};
    if (name && getFieldData[name]) {
      field = _.cloneDeep(getFieldData[name]);
    } else if (name) {
      var ent = entity,
        act = action,
        prefix = '';
      _.each(name.split('.'), function(piece) {
        if (joins[prefix]) {
          ent = joins[prefix];
          act = 'get';
        }
        name = piece;
        prefix += (prefix.length ? '.' : '') + piece;
      });
      if (getFieldsCache[ent+act].values[name]) {
        field = _.cloneDeep(getFieldsCache[ent+act].values[name]);
      }
    }
    addJoinInfo(field, name);
    return field;
  }

  function addJoinInfo(field, name) {
    if (field.name === 'entity_id') {
      var entityTableParam = name.slice(0, -2) + 'table';
      if (params[entityTableParam]) {
        field.FKApiName = getField(entityTableParam).options[params[entityTableParam]];
      }
    }
    if (field.pseudoconstant && field.pseudoconstant.optionGroupName) {
      field.FKApiName = 'OptionValue';
    }
  }

  /**
   * Add a "fields" row
   * @param name string
   */
  function addField(name) {
    $('#api-params').append($(fieldTpl({name: name || '', noOps: _.includes(NO_OPERATORS, action)})));
    var $row = $('tr:last-child', '#api-params');
    $('input.api-param-name', $row).crmSelect2({
      data: selectFields,
      allowClear: false,
      formatSelection: function(field) {
        return field.text +
          (field.required ? ' <span class="crm-marker">*</span>' : '');
      },
      formatResult: function(field) {
        return field.text +
          (field.required ? ' <span class="crm-marker">*</span>' : '') +
          '<div class="api-field-desc">' + field.description + '</div>';
      }
    }).change();
  }

  /**
   * Add a new "options" row
   */
  function addOptionField() {
    if ($('.api-options-row', '#api-params').length) {
      $('.api-options-row:last', '#api-params').after($(optionsTpl({})));
    } else {
      $('#api-params').append($(optionsTpl({})));
    }
    var $row = $('.api-options-row:last', '#api-params');
    $('.api-option-name', $row).crmSelect2({
      data: [
        {id: 'limit', text: 'limit'},
        {id: 'offset', text: 'offset'},
        {id: 'match', text: 'match'},
        {id: 'match-mandatory', text: 'match-mandatory'},
        {id: 'metadata', text: 'metadata'},
        {id: 'reload', text: 'reload'},
        {id: 'sort', text: 'sort'},
        {id: '-', text: ts('Other') + '...'}
      ],
      allowClear: false
    })
      .select2('open');
  }

  /**
   * Add an "api chain" row
   */
  function addChainField() {
    $('#api-params').append($(chainTpl({})));
    var $row = $('tr:last-child', '#api-params');
    $('.api-chain-entity', $row).crmSelect2({
      formatSelection: function(item) {
        return '<i class="crm-i fa-link"></i> API ' +
          ($(item.element).hasClass('strikethrough') ? '<span class="strikethrough">' + item.text + '</span>' : item.text);
      },
      placeholder: '<i class="crm-i fa-link"></i> ' + ts('Entity'),
      allowClear: false,
      escapeMarkup: function(m) {return m;}
    })
      .select2('open');
  }

  /**
   * Fetch available actions for selected chained entity
   */
  function getChainedAction() {
    var
      $selector = $(this),
      entity = $selector.val(),
      $row = $selector.closest('tr');
    if (entity) {
      $selector.prop('disabled', true);
      getActions(entity)
        .done(function(actions) {
          $selector.prop('disabled', false);
          CRM.utils.setOptions($('.api-chain-action', $row), _.transform(actions.values, function(ret, item) {ret.push({value: item, key: item});}));
        });
    }
  }

  /**
   * Fetch metadata from the api and cache locally for performance
   * Returns a deferred object which resolves to entity.getfields
   */
  function getMetadata(entity, action) {
    var response = $.Deferred();
    if (getFieldsCache[entity+action]) {
      response.resolve(getFieldsCache[entity+action]);
    } else {
      var apiCalls = {
        getfields: [entity, 'getfields', {
          api_action: action,
          options: {get_options: 'all', get_options_context: 'match'}
        }]
      };
      if (!getActionsCache[entity]) {
        apiCalls.getactions = [entity, 'getactions'];
      }
      CRM.api3(apiCalls)
        .done(function(data) {
          data.getfields.values = _.indexBy(data.getfields.values, 'name');
          getFieldsCache[entity+action] = data.getfields;
          getActionsCache[entity] = getActionsCache[entity] || data.getactions;
          response.resolve(getFieldsCache[entity+action]);
        });
    }
    return response;
  }

  /**
   * TODO: This works given the current code structure but would cause race conditions if called many times per second
   * @param entity string
   * @returns $.Deferred
   */
  function getActions(entity) {
    if (getActionsCache[entity]) {
      return $.Deferred().resolve(getActionsCache[entity]);
    } else {
      return CRM.api3(entity, 'getactions');
    }
  }

  /**
   * Respond to changing the main entity+action
   */
  function onChangeEntityOrAction(changedElement) {
    var required = [];
    fields = [];
    joins = [];
    getFieldData = {};
    // Special case for getfields
    if (action === 'getfields') {
      fields.push({
        id: 'api_action',
        text: ts('Action')
      });
      getFieldData.api_action = {
        name: 'api_action',
        options: _.reduce(actions.values, function(ret, item) {
          ret[item] = item;
          return ret;
        }, {})
      };
      getFieldsCache[entity+action] = {values: _.cloneDeep(getFieldData)};
      showFields(['api_action']);
      renderJoinSelector();
      return;
    }
    getMetadata(entity, action).done(function(data) {
      if ($(changedElement).is('#api-entity')) {
        actions = getActionsCache[entity];
        populateActions();
        if (data.deprecated) CRM.alert(data.deprecated, entity + ' Deprecated');
      }
      onChangeAction(action);
      getFieldData = data.values;
      populateFields(fields, entity, action, '', required);
      showFields(required);
      renderJoinSelector();
      if (_.includes(['get', 'getsingle', 'getvalue', 'getstat'], action)) {
        showReturn();
      }
    });
  }

  function changeFKEntity() {
    var $row = $(this).closest('tr'),
      name = $('input.api-param-name', $row).val(),
      operator = $('.api-param-op', $row).val();
    if (name && name.slice(-12) === 'entity_table') {
      $('input[value=' + name.slice(0, -5) + 'id]', '#api-join').prop('checked', false).change();
    }
  }

  /**
   * For "get" actions show the "return" options
   *
   * TODO: Too many hard-coded actions here. Need a way to fetch this from metadata
   */
  function showReturn() {
    var title = ts('Fields to return'),
      params = {
        data: returnFields,
        multiple: true,
        placeholder: ts('Leave blank for default'),
        formatResult: function(field) {
          return field.text + '<div class="api-field-desc">' + field.description + '</div>';
        }
      };
    if (action == 'getstat') {
      title = ts('Group by');
    }
    if (action == 'getvalue') {
      title = ts('Return Value');
      params.placeholder = ts('Select field');
      params.multiple = false;
    }
    $('#api-params').prepend($(returnTpl({title: title, required: action == 'getvalue'})));
    $('#api-return-value').crmSelect2(params);
    $("#api-return-value").select2("container").find("ul.select2-choices").sortable({
      containment: 'parent',
      start: function() { $("#api-return-value").select2("onSortStart"); },
      update: function() { $("#api-return-value").select2("onSortEnd"); }
    });
  }

  /**
   * Test whether an action is deprecated
   * @param action
   * @returns {boolean}
   */
  function isActionDeprecated(action) {
    return !!(typeof actions.deprecated === 'object' && actions.deprecated[action]);
  }

  /**
   * Render action text depending on deprecation status
   * @param option
   * @returns {string}
   */
  function renderAction(option) {
    return isActionDeprecated(option.id) ? '<span class="strikethrough">' + option.text + '</span>' : option.text;
  }

  /**
   * Called after getActions to populate action list
   */
  function populateActions() {
    var val = $('#api-action').val();
    $('#api-action').removeClass('loading').select2({
      data: _.transform(actions.values, function(ret, item) {ret.push({text: item, id: item});}),
      formatSelection: renderAction,
      formatResult: renderAction
    });
    // If previously selected action is not available, set it to 'get' if possible
    if (!_.includes(actions.values, val)) {
      $('#api-action').select2('val', !_.includes(actions.values, 'get') ? actions.values[0] : 'get', true);
    }
  }

  /**
   * Check for and display action-specific deprecation notices
   * @param action
   */
  function onChangeAction(action) {
    if (isActionDeprecated(action)) {
      CRM.alert(actions.deprecated[action], action + ' deprecated');
    }
  }

  /**
   * Called after getfields to show buttons and required fields
   * @param required
   */
  function showFields(required) {
    $('#api-params').empty();
    $('#api-param-buttons').show();
    if (required.length) {
      _.each(required, addField);
    } else {
      addField();
    }
  }

  function isYesNo(fieldName) {
    return getField(fieldName).type === 16;
  }

  /**
   * Should we render a select or textfield?
   *
   * @param fieldName
   * @param operator
   * @returns boolean
   */
  function isSelect(fieldName, operator) {
    var fieldSpec = getField(fieldName);
    return (isYesNo(fieldName) || fieldSpec.options || fieldSpec.FKApiName) && !_.includes(TEXT, operator);
  }

  /**
   * Should we render a select as single or multi?
   *
   * @param fieldName
   * @param operator
   * @returns boolean
   */
  function isMultiSelect(fieldName, operator) {
    if (isYesNo(fieldName) || _.includes(NO_MULTI, action)) {
      return false;
    }
    if (_.includes(MULTI, operator)) {
      return true;
    }
    // The = operator is ambiguous but all others can be safely assumed to be single
    if (operator !== '=') {
      return false;
    }
    return fieldName !== 'entity_table';
    /*
     * Attempt to resolve the ambiguity of the = operator using metadata
     * commented out because there is not enough metadata in the api at this time
     * to accurately figure it out.
     */
    // var field = fieldName && _.find(fields, 'id', fieldName);
    // return field && field.multi;
  }

  /**
   * Render value input as a textfield, option list, entityRef, or hidden,
   * Depending on selected param name and operator
   */
  function renderValueField() {
    var $row = $(this).closest('tr'),
      name = $('input.api-param-name', $row).val(),
      operator = $('.api-param-op', $row).val(),
      $valField = $('input.api-param-value', $row),
      multiSelect = isMultiSelect(name, operator),
      currentVal = $valField.val(),
      fieldSpec = getField(name),
      wasSelect = $valField.data('select2');
    if (wasSelect) {
      $valField.crmEntityRef('destroy');
    }
    $valField.attr('placeholder', ts('Value'));
    // Boolean fields only have 1 possible value
    if (_.includes(BOOL, operator)) {
      $valField.css('visibility', 'hidden').val('1');
      return;
    }
    $valField.css('visibility', '');
    // Option list or entityRef input
    if (isSelect(name, operator)) {
      $valField.attr('placeholder', ts('- select -'));
      // Reset value before switching to a select from something else
      if ($(this).is('.api-param-name') || !wasSelect) {
        $valField.val('');
      }
      // When switching from multi-select to single select
      else if (!multiSelect && _.includes(currentVal, ',')) {
        $valField.val(currentVal.split(',')[0]);
      }
      // Yes-No options
      if (isYesNo(name)) {
        $valField.select2({
          data: [{id: 1, text: ts('Yes')}, {id: 0, text: ts('No')}]
        });
      }
      // Select options
      else if (fieldSpec.options) {
        $valField.select2({
          multiple: multiSelect,
          data: _.map(fieldSpec.options, function (value, key) {
            return {id: key, text: value};
          })
        });
      }
      // EntityRef
      else {
        var entity = fieldSpec.FKApiName;
        $valField.attr('placeholder', entity == 'Contact' ? '[' + ts('Auto-Select Current User') + ']' : ts('- select -'));
        $valField.crmEntityRef({
          entity: entity,
          select: {
            multiple: multiSelect,
            minimumInputLength: _.includes(OPEN_IMMEDIATELY, entity) ? 0 : 1,
            // If user types a numeric id, allow it as a choice
            createSearchChoice: function(input) {
              var match = /[1-9][0-9]*/.exec(input);
              if (match && match[0] === input) {
                return {id: input, label: input};
              }
            }
          }
        });
      }
    }
  }

  /**
   * Attempt to parse a string into a value of the intended type
   * @param val string
   * @param makeArray bool
   */
  function evaluate(val, makeArray) {
    try {
      if (!val.length) {
        return makeArray ? [] : '';
      }
      var first = val.charAt(0),
        last = val.slice(-1);
      // Simple types
      if (val === 'true' || val === 'false' || val === 'null') {
        /* jshint evil: true */
        return eval(val);
      }
      // Quoted strings
      if ((first === '"' || first === "'") && last === first) {
        return val.slice(1, -1);
      }
      // Parse json - use eval rather than $.parseJSON because it's less strict about formatting
      if ((first === '[' && last === ']') || (first === '{' && last === '}')) {
        return eval('(' + val + ')');
      }
      // Transform csv to array
      if (makeArray) {
        var result = [];
        $.each(val.split(','), function(k, v) {
          result.push(evaluate($.trim(v)) || v);
        });
        return result;
      }
      // Integers - skip any multidigit number that starts with 0 to avoid oddities (it will be treated as a string below)
      if (!isNaN(val) && val.search(/[^\d]/) < 0 && (val.length === 1 || first !== '0')) {
        return parseInt(val, 10);
      }
      // Ok ok it's really a string
      return val;
    } catch(e) {
      // If eval crashed return undefined
      return undefined;
    }
  }

  /**
   * Format value to look like php code
   * TODO: Use short array syntax when we drop support for php 5.3
   * @param val
   */
  function phpFormat(val) {
    var ret = '';
    if ($.isPlainObject(val)) {
      $.each(val, function(k, v) {
        ret += (ret ? ', ' : '') + "'" + k + "' => " + phpFormat(v);
      });
      return 'array(' + ret + ')';
    }
    if ($.isArray(val)) {
      $.each(val, function(k, v) {
        ret += (ret ? ', ' : '') + phpFormat(v);
      });
      return 'array(' + ret + ')';
    }
    return JSON.stringify(val).replace(/\$/g, '\\$');
  }

  /**
   * @param value string
   * @param js string
   * @param key string
   */
  function smartyFormat(value, js, key) {
    var varName = 'param_' + key.replace(/[. -]/g, '_').toLowerCase();
    // Can't pass array literals directly into smarty so we add a php snippet
    if (_.includes(js, '[') || _.includes(js, '{')) {
      smartyPhp.push('$this->assign("'+ varName + '", '+ phpFormat(value) +');');
      return '$' + varName;
    }
    return js;
  }

  /**
   * Create the params array from user input
   * @param e
   */
  function buildParams(e) {
    params = {};
    $('.api-param-checkbox:checked').each(function() {
      params[this.name] = 1;
    });
    $('input.api-param-value, input.api-option-value').each(function() {
      var $row = $(this).closest('tr'),
        input = $(this).val(),
        op = $('select.api-param-op', $row).val() || '=',
        name = $('input.api-param-name', $row).val(),
        // Workaround for ambiguity of the = operator
        makeArray = (op === '=' && isSelect(name, op)) ? _.includes(input, ',') : op !== '=' && isMultiSelect(name, op),
        val = evaluate(input, makeArray);

      // Ignore blank values for the return field
      if ($(this).is('#api-return-value') && !val) {
        return;
      }
      // Special syntax for api chaining
      if (!name && $('select.api-chain-entity', $row).val()) {
        name = 'api.' + $('select.api-chain-entity', $row).val() + '.' + $('select.api-chain-action', $row).val();
      }
      // Special handling for options
      if ($(this).is('.api-option-value')) {
        op = $('input.api-option-name', $row).val();
        if (op) {
          name = 'options';
        }
      }
      // Default for contact ref fields
      if ($(this).is('.crm-contact-ref') && input === '') {
        val = evaluate('user_contact_id', makeArray);
      }
      if (name && val !== undefined) {
        params[name] = op === '=' ? val : (params[name] || {});
        if (op !== '=') {
          params[name][op] = val;
        }
        if ($(this).hasClass('crm-error')) {
          clearError(this);
        }
      }
      else if (name && (!e || e.type !== 'keyup')) {
        setError(this);
      }
    });
    if (entity && action) {
      formatQuery();
    }
  }

  /**
   * Display error message on incorrectly-formatted params
   * @param el
   */
  function setError(el) {
    if (!$(el).hasClass('crm-error')) {
      var msg = ts('Syntax error: input should be valid JSON or a quoted string.');
      $(el)
        .addClass('crm-error')
        .css('width', '82%')
        .attr('title', msg)
        .before('<i class="crm-i fa-exclamation-triangle crm-i-red" title="'+msg+'"></i> ')
        .tooltip();
    }
  }

  /**
   * Remove error message
   * @param el
   */
  function clearError(el) {
    $(el)
      .removeClass('crm-error')
      .attr('title', '')
      .css('width', '85%')
      .tooltip('destroy')
      .siblings('.fa-exclamation-triangle').remove();
  }

  /**
   * Render the api request in various formats
   */
  function formatQuery() {
    var i = 0, q = {
      smarty: "{crmAPI var='result' entity='" + entity + "' action='" + action + "'" + (params.sequential ? '' : ' sequential=0'),
      php: "$result = civicrm_api3('" + entity + "', '" + action + "'",
      json: "CRM.api3('" + entity + "', '" + action + "'",
      drush: "drush cvapi " + entity + '.' + action + ' ',
      wpcli: "wp cv api " + entity + '.' + action + ' ',
      rest: CRM.config.resourceBase + "extern/rest.php?entity=" + entity + "&action=" + action + "&api_key=userkey&key=sitekey&json=" + JSON.stringify(params)
    };
    smartyPhp = [];
    $.each(params, function(key, value) {
      var json = JSON.stringify(value),
        // Encourage 'return' to be an array - at least in php & js
        js = key === 'return' && action !== 'getvalue' ? JSON.stringify(evaluate(value, true)) : json,
        php = key === 'return' && action !== 'getvalue' ? phpFormat(evaluate(value, true)) : phpFormat(value);
      if (!(i++)) {
        q.php += ", array(\n";
        q.json += ", {\n";
      } else {
        q.json += ",\n";
      }
      q.php += "  '" + key + "' => " + php + ",\n";
      q.json += "  \"" + key + '": ' + js;
      // smarty already defaults to sequential
      if (key !== 'sequential') {
        q.smarty += ' ' + key + '=' + smartyFormat(value, json, key);
      }
      // FIXME: This is not totally correct cli syntax
      q.drush += key + '=' + json + ' ';
      q.wpcli += key + '=' + json + ' ';
    });
    if (i) {
      q.php += ")";
      q.json += "\n}";
    }
    q.php += ");";
    q.json += ").done(function(result) {\n  // do something\n});";
    q.smarty += "}\n{foreach from=$result.values item=" + entity.toLowerCase() + "}\n  {$" + entity.toLowerCase() + ".some_field}\n{/foreach}";
    if (!_.includes(action, 'get')) {
      q.smarty = '{* Smarty API only works with get actions *}';
    } else if (smartyPhp.length) {
      q.smarty = "{php}\n  " + smartyPhp.join("\n  ") + "\n{/php}\n" + q.smarty;
    }
    $.each(q, function(type, val) {
      $('#api-' + type).text(val);
    });
    prettyPrint('#api-generated pre');
  }

  /**
   * Submit button handler
   * @param e
   */
  function submit(e) {
    e.preventDefault();
    if (!entity || !action) {
      alert(ts('Select an entity.'));
      return;
    }
    if (!_.includes(action, 'get') && action != 'check') {
      var msg = action === 'delete' ? ts('This will delete data from CiviCRM. Are you sure?') : ts('This will write to the database. Continue?');
      CRM.confirm({title: ts('Confirm %1', {1: action}), message: msg}).on('crmConfirm:yes', execute);
    } else {
      execute();
    }
  }

  /**
   * Execute api call and display the results
   * Note: We have to manually execute the ajax in order to add the secret extra "prettyprint" param
   */
  function execute() {
    var footer;
    $('#api-result').html('<div class="crm-loading-element"></div>');
    $.ajax({
      url: CRM.url('civicrm/ajax/rest'),
      data: {
        entity: entity,
        action: action,
        prettyprint: 1,
        json: JSON.stringify(params)
      },
      type: _.includes(action, 'get') ? 'GET' : 'POST',
      dataType: 'text'
    }).done(function(text) {
      // There may be debug information appended to the end of the json string
      var footerPos = text.indexOf("\n}<");
      if (footerPos) {
        footer = text.substr(footerPos + 2);
        text = text.substr(0, footerPos + 2);
      }
      $('#api-result').text(text);
      prettyPrint('#api-result');
      if (footer) {
        $('#api-result').append(footer);
      }
    });
  }

  /**
   * Fetch list of example files for a given entity
   */
  function getExamples() {
    CRM.utils.setOptions($('#example-action').prop('disabled', true).addClass('loading'), []);
    $.getJSON(CRM.url('civicrm/ajax/apiexample', {entity: $(this).val()}))
      .done(function(result) {
        CRM.utils.setOptions($('#example-action').prop('disabled', false).removeClass('loading'), result);
      });
  }

  /**
   * Fetch and display an example file
   */
  function getExample() {
    var
      entity = $('#example-entity').val(),
      action = $('#example-action').val();
    if (entity && action) {
      $('#example-result').block();
      $.get(CRM.url('civicrm/ajax/apiexample', {file: entity + '/' + action}))
        .done(function(result) {
          $('#example-result').unblock().text(result);
          prettyPrint('#example-result');
        });
    } else {
      $('#example-result').text($('#example-result').attr('placeholder'));
    }
  }

  /**
   * Fetch entity docs & actions
   */
  function getDocEntity() {
    CRM.utils.setOptions($('#doc-action').prop('disabled', true).addClass('loading'), []);
    $.getJSON(CRM.url('civicrm/ajax/apidoc', {entity: $(this).val()}))
      .done(function(result) {
        entityDoc = result.doc;
        CRM.utils.setOptions($('#doc-action').prop('disabled', false).removeClass('loading'), result.actions);
        $('#doc-result').html(result.doc);
        prettyPrint('#doc-result pre');
      });
  }

  /**
   * Fetch entity+action docs & code
   */
  function getDocAction() {
    var
      entity = $('#doc-entity').val(),
      action = $('#doc-action').val();
    if (entity && action) {
      $('#doc-result').block();
      $.get(CRM.url('civicrm/ajax/apidoc', {entity: entity, action: action}))
        .done(function(result) {
          $('#doc-result').unblock().html(result.doc);
          if (result.code) {
            $('#doc-result').append(docCodeTpl(result));
          }
          prettyPrint('#doc-result pre');
        });
    } else {
      $('#doc-result').html(entityDoc);
      prettyPrint('#doc-result pre');
    }
    checkBookKeepingEntity(entity, action);
  }

  /**
   * Check if entity is Financial Trxn and Entity Financial Trxn
   * and Action is Create, delete, update etc then display warning
   */
  function checkBookKeepingEntity(entity, action) {
    if ($.inArray(entity, ['EntityFinancialTrxn', 'FinancialTrxn']) > -1 && $.inArray(action, ['delete', 'setvalue', 'replace', 'create']) > -1) {
      var msg = ts('Given the importance of auditability, extension developers are strongly discouraged from writing code to add, update or delete entries in the civicrm_financial_item, civicrm_entity_financial_trxn, and civicrm_financial_trxn tables. Before publishing an extension on civicrm.org that does any of this, please ask for a special bookkeeping code review for the extension.');
      CRM.alert(msg, 'warning');
    }
  }

  /**
   * Renders nested checkboxes for adding joins to an api.get call
   */
  function renderJoinSelector() {
    $('#api-join').hide();
    if (!_.includes(NO_JOINS, entity) && _.includes(['get', 'getsingle'], action)) {
      var joinable = {};
      (function recurse(fields, joinable, prefix, depth, entities) {
        _.each(fields, function(field) {
          var name = prefix + field.name;
          addJoinInfo(field, name);
          var entity = field.FKApiName;
          if (entity) {
            joinable[name] = {
              title: field.title + ' (' + field.FKApiName + ')',
              entity: entity,
              checked: !!joins[name]
            };
            // Expose further joins if we are not over the limit or recursing onto the same entity multiple times
            if (joins[name] && depth < CRM.vars.explorer.max_joins && !_.countBy(entities)[entity]) {
              joinable[name].children = {};
              recurse(getFieldsCache[entity+'get'].values, joinable[name].children, name + '.', depth+1, entities.concat(entity));
            }
          } else if (field.name == 'entity_id' && fields.entity_table && fields.entity_table.options) {
            joinable[name] = {
              title: field.title + ' (' + ts('First select %1', {1: fields.entity_table.title}) + ')',
              entity: '',
              disabled: true
            };
          }
        });
      })(_.cloneDeep(getFieldData), joinable, '', 1, [entity]);
      if (!_.isEmpty(joinable)) {
        // Send joinTpl as a param so it can recursively call itself to render children
        $('#api-join').show().children('div').html(joinTpl({joins: joinable, tpl: joinTpl}));
      }
    }
  }

  /**
   * When adding or removing a join from an api.get call
   */
  function onSelectJoin() {
    var name = $(this).val(),
      ent = $(this).data('entity');
    fields = [];
    $('input', '#api-join').prop('disabled', true);
    if ($(this).is(':checked')) {
      joins[name] = ent;
      $('input.api-param-name, #api-return-value').addClass('loading');
      getMetadata(ent, 'get').done(function() {
        renderJoinSelector();
        populateFields(fields, entity, action, '');
        $('input.api-param-name, #api-return-value').removeClass('loading');
      });
    } else {
      joins = _.omit(joins, function(entity, n) {
        return n.indexOf(name) === 0;
      });
      renderJoinSelector();
      populateFields(fields, entity, action, '');
    }
  }

  $(document).ready(function() {
    // Set up tabs - bind active tab to document hash because... it's cool?
    document.location.hash = document.location.hash || 'explorer';
      $('#mainTabContainer')
      .tabs({
          active: $(document.location.hash + '-tab').index() - 1
        })
      .on('tabsactivate', function(e, ui) {
        if (ui.newPanel) {
          document.location.hash = ui.newPanel.attr('id').replace('-tab', '');
        }
      });
    $(window).on('hashchange', function() {
      $('#mainTabContainer').tabs('option', 'active', $(document.location.hash + '-tab').index() - 1);
    });

    // Initialize widgets
    $('#api-entity, #example-entity, #doc-entity').crmSelect2({
      // Add strikethough class to selection to indicate deprecated apis
      formatSelection: function(option) {
        return $(option.element).hasClass('strikethrough') ? '<span class="strikethrough">' + option.text + '</span>' : option.text;
      }
    });
    $('form#api-explorer')
      .on('change', '#api-entity, #api-action', function() {
        entity = $('#api-entity').val();
        action = $('#api-action').val();
        joins = {};
        if ($(this).is('#api-entity')) {
          $('#api-action').addClass('loading');
        }
        $('#api-params').html('<tr><td colspan="4" class="crm-loading-element"></td></tr>');
        $('#api-params-table thead').show();
        onChangeEntityOrAction(this);
        buildParams();
        checkBookKeepingEntity(entity, action);
      })
      .on('change keyup', 'input.api-input, #api-params select', buildParams)
      .on('change', '.api-param-name, .api-param-value, .api-param-op', changeFKEntity)
      .on('submit', submit);

    $('#api-params')
      .on('change', 'input.api-param-name, select.api-param-op', renderValueField)
      .on('select2-selecting', 'input.api-param-name, .api-option-name, #api-return-value', function(e) {
        if (e.val === '-') {
          $(this).one('change', function() {
            $(this)
              .crmSelect2('destroy')
              .val('')
              .focus();
          });
        }
      })
      .on('click', '.api-param-remove', function(e) {
        e.preventDefault();
        $(this).closest('tr').remove();
        buildParams();
      })
      .on('change', 'select.api-chain-entity', getChainedAction);
    $('#api-join').on('change', 'input', onSelectJoin);
    $('#example-entity').on('change', getExamples);
    $('#example-action').on('change', getExample);
    $('#doc-entity').on('change', getDocEntity);
    $('#doc-action').on('change', getDocAction);
    $('#api-params-add').on('click', function(e) {
      e.preventDefault();
      addField();
      $('tr:last-child input.api-param-name', '#api-params').select2('open');
    });
    $('#api-option-add').on('click', function(e) {
      e.preventDefault();
      addOptionField();
    });
    $('#api-chain-add').on('click', function(e) {
      e.preventDefault();
      addChainField();
    });
    populateActions();
  });
}(CRM.$, CRM._));
;
!function(){var q=null;window.PR_SHOULD_USE_CONTINUATION=!0;
(function(){function S(a){function d(e){var b=e.charCodeAt(0);if(b!==92)return b;var a=e.charAt(1);return(b=r[a])?b:"0"<=a&&a<="7"?parseInt(e.substring(1),8):a==="u"||a==="x"?parseInt(e.substring(2),16):e.charCodeAt(1)}function g(e){if(e<32)return(e<16?"\\x0":"\\x")+e.toString(16);e=String.fromCharCode(e);return e==="\\"||e==="-"||e==="]"||e==="^"?"\\"+e:e}function b(e){var b=e.substring(1,e.length-1).match(/\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\[0-3][0-7]{0,2}|\\[0-7]{1,2}|\\[\S\s]|[^\\]/g),e=[],a=
b[0]==="^",c=["["];a&&c.push("^");for(var a=a?1:0,f=b.length;a<f;++a){var h=b[a];if(/\\[bdsw]/i.test(h))c.push(h);else{var h=d(h),l;a+2<f&&"-"===b[a+1]?(l=d(b[a+2]),a+=2):l=h;e.push([h,l]);l<65||h>122||(l<65||h>90||e.push([Math.max(65,h)|32,Math.min(l,90)|32]),l<97||h>122||e.push([Math.max(97,h)&-33,Math.min(l,122)&-33]))}}e.sort(function(e,a){return e[0]-a[0]||a[1]-e[1]});b=[];f=[];for(a=0;a<e.length;++a)h=e[a],h[0]<=f[1]+1?f[1]=Math.max(f[1],h[1]):b.push(f=h);for(a=0;a<b.length;++a)h=b[a],c.push(g(h[0])),
h[1]>h[0]&&(h[1]+1>h[0]&&c.push("-"),c.push(g(h[1])));c.push("]");return c.join("")}function s(e){for(var a=e.source.match(/\[(?:[^\\\]]|\\[\S\s])*]|\\u[\dA-Fa-f]{4}|\\x[\dA-Fa-f]{2}|\\\d+|\\[^\dux]|\(\?[!:=]|[()^]|[^()[\\^]+/g),c=a.length,d=[],f=0,h=0;f<c;++f){var l=a[f];l==="("?++h:"\\"===l.charAt(0)&&(l=+l.substring(1))&&(l<=h?d[l]=-1:a[f]=g(l))}for(f=1;f<d.length;++f)-1===d[f]&&(d[f]=++x);for(h=f=0;f<c;++f)l=a[f],l==="("?(++h,d[h]||(a[f]="(?:")):"\\"===l.charAt(0)&&(l=+l.substring(1))&&l<=h&&
(a[f]="\\"+d[l]);for(f=0;f<c;++f)"^"===a[f]&&"^"!==a[f+1]&&(a[f]="");if(e.ignoreCase&&m)for(f=0;f<c;++f)l=a[f],e=l.charAt(0),l.length>=2&&e==="["?a[f]=b(l):e!=="\\"&&(a[f]=l.replace(/[A-Za-z]/g,function(a){a=a.charCodeAt(0);return"["+String.fromCharCode(a&-33,a|32)+"]"}));return a.join("")}for(var x=0,m=!1,j=!1,k=0,c=a.length;k<c;++k){var i=a[k];if(i.ignoreCase)j=!0;else if(/[a-z]/i.test(i.source.replace(/\\u[\da-f]{4}|\\x[\da-f]{2}|\\[^UXux]/gi,""))){m=!0;j=!1;break}}for(var r={b:8,t:9,n:10,v:11,
f:12,r:13},n=[],k=0,c=a.length;k<c;++k){i=a[k];if(i.global||i.multiline)throw Error(""+i);n.push("(?:"+s(i)+")")}return RegExp(n.join("|"),j?"gi":"g")}function T(a,d){function g(a){var c=a.nodeType;if(c==1){if(!b.test(a.className)){for(c=a.firstChild;c;c=c.nextSibling)g(c);c=a.nodeName.toLowerCase();if("br"===c||"li"===c)s[j]="\n",m[j<<1]=x++,m[j++<<1|1]=a}}else if(c==3||c==4)c=a.nodeValue,c.length&&(c=d?c.replace(/\r\n?/g,"\n"):c.replace(/[\t\n\r ]+/g," "),s[j]=c,m[j<<1]=x,x+=c.length,m[j++<<1|1]=
a)}var b=/(?:^|\s)nocode(?:\s|$)/,s=[],x=0,m=[],j=0;g(a);return{a:s.join("").replace(/\n$/,""),d:m}}function H(a,d,g,b){d&&(a={a:d,e:a},g(a),b.push.apply(b,a.g))}function U(a){for(var d=void 0,g=a.firstChild;g;g=g.nextSibling)var b=g.nodeType,d=b===1?d?a:g:b===3?V.test(g.nodeValue)?a:d:d;return d===a?void 0:d}function C(a,d){function g(a){for(var j=a.e,k=[j,"pln"],c=0,i=a.a.match(s)||[],r={},n=0,e=i.length;n<e;++n){var z=i[n],w=r[z],t=void 0,f;if(typeof w==="string")f=!1;else{var h=b[z.charAt(0)];
if(h)t=z.match(h[1]),w=h[0];else{for(f=0;f<x;++f)if(h=d[f],t=z.match(h[1])){w=h[0];break}t||(w="pln")}if((f=w.length>=5&&"lang-"===w.substring(0,5))&&!(t&&typeof t[1]==="string"))f=!1,w="src";f||(r[z]=w)}h=c;c+=z.length;if(f){f=t[1];var l=z.indexOf(f),B=l+f.length;t[2]&&(B=z.length-t[2].length,l=B-f.length);w=w.substring(5);H(j+h,z.substring(0,l),g,k);H(j+h+l,f,I(w,f),k);H(j+h+B,z.substring(B),g,k)}else k.push(j+h,w)}a.g=k}var b={},s;(function(){for(var g=a.concat(d),j=[],k={},c=0,i=g.length;c<i;++c){var r=
g[c],n=r[3];if(n)for(var e=n.length;--e>=0;)b[n.charAt(e)]=r;r=r[1];n=""+r;k.hasOwnProperty(n)||(j.push(r),k[n]=q)}j.push(/[\S\s]/);s=S(j)})();var x=d.length;return g}function v(a){var d=[],g=[];a.tripleQuotedStrings?d.push(["str",/^(?:'''(?:[^'\\]|\\[\S\s]|''?(?=[^']))*(?:'''|$)|"""(?:[^"\\]|\\[\S\s]|""?(?=[^"]))*(?:"""|$)|'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$))/,q,"'\""]):a.multiLineStrings?d.push(["str",/^(?:'(?:[^'\\]|\\[\S\s])*(?:'|$)|"(?:[^"\\]|\\[\S\s])*(?:"|$)|`(?:[^\\`]|\\[\S\s])*(?:`|$))/,
q,"'\"`"]):d.push(["str",/^(?:'(?:[^\n\r'\\]|\\.)*(?:'|$)|"(?:[^\n\r"\\]|\\.)*(?:"|$))/,q,"\"'"]);a.verbatimStrings&&g.push(["str",/^@"(?:[^"]|"")*(?:"|$)/,q]);var b=a.hashComments;b&&(a.cStyleComments?(b>1?d.push(["com",/^#(?:##(?:[^#]|#(?!##))*(?:###|$)|.*)/,q,"#"]):d.push(["com",/^#(?:(?:define|e(?:l|nd)if|else|error|ifn?def|include|line|pragma|undef|warning)\b|[^\n\r]*)/,q,"#"]),g.push(["str",/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h(?:h|pp|\+\+)?|[a-z]\w*)>/,q])):d.push(["com",
/^#[^\n\r]*/,q,"#"]));a.cStyleComments&&(g.push(["com",/^\/\/[^\n\r]*/,q]),g.push(["com",/^\/\*[\S\s]*?(?:\*\/|$)/,q]));if(b=a.regexLiterals){var s=(b=b>1?"":"\n\r")?".":"[\\S\\s]";g.push(["lang-regex",RegExp("^(?:^^\\.?|[+-]|[!=]=?=?|\\#|%=?|&&?=?|\\(|\\*=?|[+\\-]=|->|\\/=?|::?|<<?=?|>>?>?=?|,|;|\\?|@|\\[|~|{|\\^\\^?=?|\\|\\|?=?|break|case|continue|delete|do|else|finally|instanceof|return|throw|try|typeof)\\s*("+("/(?=[^/*"+b+"])(?:[^/\\x5B\\x5C"+b+"]|\\x5C"+s+"|\\x5B(?:[^\\x5C\\x5D"+b+"]|\\x5C"+
s+")*(?:\\x5D|$))+/")+")")])}(b=a.types)&&g.push(["typ",b]);b=(""+a.keywords).replace(/^ | $/g,"");b.length&&g.push(["kwd",RegExp("^(?:"+b.replace(/[\s,]+/g,"|")+")\\b"),q]);d.push(["pln",/^\s+/,q," \r\n\t\u00a0"]);b="^.[^\\s\\w.$@'\"`/\\\\]*";a.regexLiterals&&(b+="(?!s*/)");g.push(["lit",/^@[$_a-z][\w$@]*/i,q],["typ",/^(?:[@_]?[A-Z]+[a-z][\w$@]*|\w+_t\b)/,q],["pln",/^[$_a-z][\w$@]*/i,q],["lit",/^(?:0x[\da-f]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+-]?\d+)?)[a-z]*/i,q,"0123456789"],["pln",/^\\[\S\s]?/,
q],["pun",RegExp(b),q]);return C(d,g)}function J(a,d,g){function b(a){var c=a.nodeType;if(c==1&&!x.test(a.className))if("br"===a.nodeName)s(a),a.parentNode&&a.parentNode.removeChild(a);else for(a=a.firstChild;a;a=a.nextSibling)b(a);else if((c==3||c==4)&&g){var d=a.nodeValue,i=d.match(m);if(i)c=d.substring(0,i.index),a.nodeValue=c,(d=d.substring(i.index+i[0].length))&&a.parentNode.insertBefore(j.createTextNode(d),a.nextSibling),s(a),c||a.parentNode.removeChild(a)}}function s(a){function b(a,c){var d=
c?a.cloneNode(!1):a,e=a.parentNode;if(e){var e=b(e,1),g=a.nextSibling;e.appendChild(d);for(var i=g;i;i=g)g=i.nextSibling,e.appendChild(i)}return d}for(;!a.nextSibling;)if(a=a.parentNode,!a)return;for(var a=b(a.nextSibling,0),d;(d=a.parentNode)&&d.nodeType===1;)a=d;c.push(a)}for(var x=/(?:^|\s)nocode(?:\s|$)/,m=/\r\n?|\n/,j=a.ownerDocument,k=j.createElement("li");a.firstChild;)k.appendChild(a.firstChild);for(var c=[k],i=0;i<c.length;++i)b(c[i]);d===(d|0)&&c[0].setAttribute("value",d);var r=j.createElement("ol");
r.className="linenums";for(var d=Math.max(0,d-1|0)||0,i=0,n=c.length;i<n;++i)k=c[i],k.className="L"+(i+d)%10,k.firstChild||k.appendChild(j.createTextNode("\u00a0")),r.appendChild(k);a.appendChild(r)}function p(a,d){for(var g=d.length;--g>=0;){var b=d[g];F.hasOwnProperty(b)?D.console&&console.warn("cannot override language handler %s",b):F[b]=a}}function I(a,d){if(!a||!F.hasOwnProperty(a))a=/^\s*</.test(d)?"default-markup":"default-code";return F[a]}function K(a){var d=a.h;try{var g=T(a.c,a.i),b=g.a;
a.a=b;a.d=g.d;a.e=0;I(d,b)(a);var s=/\bMSIE\s(\d+)/.exec(navigator.userAgent),s=s&&+s[1]<=8,d=/\n/g,x=a.a,m=x.length,g=0,j=a.d,k=j.length,b=0,c=a.g,i=c.length,r=0;c[i]=m;var n,e;for(e=n=0;e<i;)c[e]!==c[e+2]?(c[n++]=c[e++],c[n++]=c[e++]):e+=2;i=n;for(e=n=0;e<i;){for(var p=c[e],w=c[e+1],t=e+2;t+2<=i&&c[t+1]===w;)t+=2;c[n++]=p;c[n++]=w;e=t}c.length=n;var f=a.c,h;if(f)h=f.style.display,f.style.display="none";try{for(;b<k;){var l=j[b+2]||m,B=c[r+2]||m,t=Math.min(l,B),A=j[b+1],G;if(A.nodeType!==1&&(G=x.substring(g,
t))){s&&(G=G.replace(d,"\r"));A.nodeValue=G;var L=A.ownerDocument,o=L.createElement("span");o.className=c[r+1];var v=A.parentNode;v.replaceChild(o,A);o.appendChild(A);g<l&&(j[b+1]=A=L.createTextNode(x.substring(t,l)),v.insertBefore(A,o.nextSibling))}g=t;g>=l&&(b+=2);g>=B&&(r+=2)}}finally{if(f)f.style.display=h}}catch(u){D.console&&console.log(u&&u.stack||u)}}var D=window,y=["break,continue,do,else,for,if,return,while"],E=[[y,"auto,case,char,const,default,double,enum,extern,float,goto,inline,int,long,register,short,signed,sizeof,static,struct,switch,typedef,union,unsigned,void,volatile"],
"catch,class,delete,false,import,new,operator,private,protected,public,this,throw,true,try,typeof"],M=[E,"alignof,align_union,asm,axiom,bool,concept,concept_map,const_cast,constexpr,decltype,delegate,dynamic_cast,explicit,export,friend,generic,late_check,mutable,namespace,nullptr,property,reinterpret_cast,static_assert,static_cast,template,typeid,typename,using,virtual,where"],N=[E,"abstract,assert,boolean,byte,extends,final,finally,implements,import,instanceof,interface,null,native,package,strictfp,super,synchronized,throws,transient"],
O=[N,"as,base,by,checked,decimal,delegate,descending,dynamic,event,fixed,foreach,from,group,implicit,in,internal,into,is,let,lock,object,out,override,orderby,params,partial,readonly,ref,sbyte,sealed,stackalloc,string,select,uint,ulong,unchecked,unsafe,ushort,var,virtual,where"],E=[E,"debugger,eval,export,function,get,null,set,undefined,var,with,Infinity,NaN"],P=[y,"and,as,assert,class,def,del,elif,except,exec,finally,from,global,import,in,is,lambda,nonlocal,not,or,pass,print,raise,try,with,yield,False,True,None"],
Q=[y,"alias,and,begin,case,class,def,defined,elsif,end,ensure,false,in,module,next,nil,not,or,redo,rescue,retry,self,super,then,true,undef,unless,until,when,yield,BEGIN,END"],W=[y,"as,assert,const,copy,drop,enum,extern,fail,false,fn,impl,let,log,loop,match,mod,move,mut,priv,pub,pure,ref,self,static,struct,true,trait,type,unsafe,use"],y=[y,"case,done,elif,esac,eval,fi,function,in,local,set,then,until"],R=/^(DIR|FILE|vector|(de|priority_)?queue|list|stack|(const_)?iterator|(multi)?(set|map)|bitset|u?(int|float)\d*)\b/,
V=/\S/,X=v({keywords:[M,O,E,"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",P,Q,y],hashComments:!0,cStyleComments:!0,multiLineStrings:!0,regexLiterals:!0}),F={};p(X,["default-code"]);p(C([],[["pln",/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],["com",/^<\!--[\S\s]*?(?:--\>|$)/],["lang-",/^<\?([\S\s]+?)(?:\?>|$)/],["lang-",/^<%([\S\s]+?)(?:%>|$)/],["pun",/^(?:<[%?]|[%?]>)/],["lang-",
/^<xmp\b[^>]*>([\S\s]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\S\s]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\S\s]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup","htm","html","mxml","xhtml","xml","xsl"]);p(C([["pln",/^\s+/,q," \t\r\n"],["atv",/^(?:"[^"]*"?|'[^']*'?)/,q,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w-.:]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^\s"'>]*(?:[^\s"'/>]|\/(?=\s)))/],["pun",/^[/<->]+/],
["lang-js",/^on\w+\s*=\s*"([^"]+)"/i],["lang-js",/^on\w+\s*=\s*'([^']+)'/i],["lang-js",/^on\w+\s*=\s*([^\s"'>]+)/i],["lang-css",/^style\s*=\s*"([^"]+)"/i],["lang-css",/^style\s*=\s*'([^']+)'/i],["lang-css",/^style\s*=\s*([^\s"'>]+)/i]]),["in.tag"]);p(C([],[["atv",/^[\S\s]+/]]),["uq.val"]);p(v({keywords:M,hashComments:!0,cStyleComments:!0,types:R}),["c","cc","cpp","cxx","cyc","m"]);p(v({keywords:"null,true,false"}),["json"]);p(v({keywords:O,hashComments:!0,cStyleComments:!0,verbatimStrings:!0,types:R}),
["cs"]);p(v({keywords:N,cStyleComments:!0}),["java"]);p(v({keywords:y,hashComments:!0,multiLineStrings:!0}),["bash","bsh","csh","sh"]);p(v({keywords:P,hashComments:!0,multiLineStrings:!0,tripleQuotedStrings:!0}),["cv","py","python"]);p(v({keywords:"caller,delete,die,do,dump,elsif,eval,exit,foreach,for,goto,if,import,last,local,my,next,no,our,print,package,redo,require,sub,undef,unless,until,use,wantarray,while,BEGIN,END",hashComments:!0,multiLineStrings:!0,regexLiterals:2}),["perl","pl","pm"]);p(v({keywords:Q,
hashComments:!0,multiLineStrings:!0,regexLiterals:!0}),["rb","ruby"]);p(v({keywords:E,cStyleComments:!0,regexLiterals:!0}),["javascript","js"]);p(v({keywords:"all,and,by,catch,class,else,extends,false,finally,for,if,in,is,isnt,loop,new,no,not,null,of,off,on,or,return,super,then,throw,true,try,unless,until,when,while,yes",hashComments:3,cStyleComments:!0,multilineStrings:!0,tripleQuotedStrings:!0,regexLiterals:!0}),["coffee"]);p(v({keywords:W,cStyleComments:!0,multilineStrings:!0}),["rc","rs","rust"]);
p(C([],[["str",/^[\S\s]+/]]),["regex"]);var Y=D.PR={createSimpleLexer:C,registerLangHandler:p,sourceDecorator:v,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:"com",PR_DECLARATION:"dec",PR_KEYWORD:"kwd",PR_LITERAL:"lit",PR_NOCODE:"nocode",PR_PLAIN:"pln",PR_PUNCTUATION:"pun",PR_SOURCE:"src",PR_STRING:"str",PR_TAG:"tag",PR_TYPE:"typ",prettyPrintOne:D.prettyPrintOne=function(a,d,g){var b=document.createElement("div");b.innerHTML="<pre>"+a+"</pre>";b=b.firstChild;g&&J(b,g,!0);K({h:d,j:g,c:b,i:1});
return b.innerHTML},prettyPrint:D.prettyPrint=function(a,d){function g(){for(var b=D.PR_SHOULD_USE_CONTINUATION?c.now()+250:Infinity;i<p.length&&c.now()<b;i++){for(var d=p[i],j=h,k=d;k=k.previousSibling;){var m=k.nodeType,o=(m===7||m===8)&&k.nodeValue;if(o?!/^\??prettify\b/.test(o):m!==3||/\S/.test(k.nodeValue))break;if(o){j={};o.replace(/\b(\w+)=([\w%+\-.:]+)/g,function(a,b,c){j[b]=c});break}}k=d.className;if((j!==h||e.test(k))&&!v.test(k)){m=!1;for(o=d.parentNode;o;o=o.parentNode)if(f.test(o.tagName)&&
o.className&&e.test(o.className)){m=!0;break}if(!m){d.className+=" prettyprinted";m=j.lang;if(!m){var m=k.match(n),y;if(!m&&(y=U(d))&&t.test(y.tagName))m=y.className.match(n);m&&(m=m[1])}if(w.test(d.tagName))o=1;else var o=d.currentStyle,u=s.defaultView,o=(o=o?o.whiteSpace:u&&u.getComputedStyle?u.getComputedStyle(d,q).getPropertyValue("white-space"):0)&&"pre"===o.substring(0,3);u=j.linenums;if(!(u=u==="true"||+u))u=(u=k.match(/\blinenums\b(?::(\d+))?/))?u[1]&&u[1].length?+u[1]:!0:!1;u&&J(d,u,o);r=
{h:m,c:d,j:u,i:o};K(r)}}}i<p.length?setTimeout(g,250):"function"===typeof a&&a()}for(var b=d||document.body,s=b.ownerDocument||document,b=[b.getElementsByTagName("pre"),b.getElementsByTagName("code"),b.getElementsByTagName("xmp")],p=[],m=0;m<b.length;++m)for(var j=0,k=b[m].length;j<k;++j)p.push(b[m][j]);var b=q,c=Date;c.now||(c={now:function(){return+new Date}});var i=0,r,n=/\blang(?:uage)?-([\w.]+)(?!\S)/,e=/\bprettyprint\b/,v=/\bprettyprinted\b/,w=/pre|xmp/i,t=/^code$/i,f=/^(?:pre|code|xmp)$/i,
h={};g()}};typeof define==="function"&&define.amd&&define("google-code-prettify",[],function(){return Y})})();}()
;
