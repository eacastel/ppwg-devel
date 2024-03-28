/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function(Drupal,drupalSettings){Drupal.behaviors.activeLinks={attach(context){const path=drupalSettings.path;const queryString=JSON.stringify(path.currentQuery);const querySelector=path.currentQuery?`[data-drupal-link-query='${queryString}']`:':not([data-drupal-link-query])';const originalSelectors=[`[data-drupal-link-system-path="${path.currentPath}"]`];let selectors;if(path.isFront)originalSelectors.push('[data-drupal-link-system-path="<front>"]');selectors=[].concat(originalSelectors.map((selector)=>`${selector}:not([hreflang])`),originalSelectors.map((selector)=>`${selector}[hreflang="${path.currentLanguage}"]`));selectors=selectors.map((current)=>current+querySelector);const activeLinks=context.querySelectorAll(selectors.join(','));const il=activeLinks.length;for(let i=0;i<il;i++)activeLinks[i].classList.add('is-active');},detach(context,settings,trigger){if(trigger==='unload'){const activeLinks=context.querySelectorAll('[data-drupal-link-system-path].is-active');const il=activeLinks.length;for(let i=0;i<il;i++)activeLinks[i].classList.remove('is-active');}}};})(Drupal,drupalSettings);;
(function($,once){'use strict';$(document).on('click','.contextual',function(){$(once('webform-contextual','a.webform-contextual',this)).each(function(){this.href=this.href.split('?')[0];if(/webform\/([^/]+)\/test$/.test(this.href))this.href=window.location.pathname+'?_webform_test='+RegExp.$1;});});})(jQuery,once);;
(function($,Drupal,once){'use strict';var hasLocalStorage=(function(){try{localStorage.setItem('webform','webform');localStorage.removeItem('webform');return true;}catch(e){return false;}}());Drupal.behaviors.webformDetailsSave={attach:function(context){if(!hasLocalStorage)return;$(once('webform-details-summary-save','details > summary',context)).on('click',function(){var $details=$(this).parent();if($details[0].hasAttribute('data-webform-details-nosave'))return;var name=Drupal.webformDetailsSaveGetName($details);if(!name)return;var open=($details.attr('open')!=='open')?'1':'0';localStorage.setItem(name,open);});$(once('webform-details-save','details',context)).each(function(){var $details=$(this);var name=Drupal.webformDetailsSaveGetName($details);if(!name)return;var open=localStorage.getItem(name);if(open===null)return;if(open==='1')$details.attr('open','open');else $details.removeAttr('open');});}};Drupal.webformDetailsSaveGetName=function($details){if(!hasLocalStorage)return '';if($details.hasClass('vertical-tabs__pane'))return '';var webformId=$details.attr('data-webform-element-id');if(webformId)return 'Drupal.webform.'+webformId.replace('--','.');var detailsId=$details.attr('id');if(!detailsId)return '';var $form=$details.parents('form');if(!$form.length||!$form.attr('id'))return '';var formId=$form.attr('id');if(!formId)return '';formId=formId.replace(/--.+?$/,'').replace(/-/g,'_');detailsId=detailsId.replace(/--.+?$/,'').replace(/-/g,'_');return 'Drupal.webform.'+formId+'.'+detailsId;};})(jQuery,Drupal,once);;
(function($,Drupal,once){'use strict';var hasLocalStorage=(function(){try{localStorage.setItem('webform','webform');localStorage.removeItem('webform');return true;}catch(e){return false;}}());var hasSessionStorage=(function(){try{sessionStorage.setItem('webform','webform');sessionStorage.removeItem('webform');return true;}catch(e){return false;}}());Drupal.behaviors.webformMessageClose={attach:function(context){$(once('webform-message--close','.js-webform-message--close',context)).each(function(){var $element=$(this);var id=$element.attr('data-message-id');var storage=$element.attr('data-message-storage');var effect=$element.attr('data-message-close-effect')||'hide';switch(effect){case 'slide':effect='slideUp';break;case 'fade':effect='fadeOut';break;}if(isClosed($element,storage,id))return;if($element.attr('style')!=='display: none;'&&!$element.hasClass('js-webform-states-hidden'))$element.show();$element.find('.js-webform-message__link').on('click',function(event){$element[effect]();setClosed($element,storage,id);$element.trigger('close');event.preventDefault();});});}};function isClosed($element,storage,id){if(!id||!storage)return false;switch(storage){case 'local':if(hasLocalStorage)return localStorage.getItem('Drupal.webform.message.'+id)||false;return false;case 'session':if(hasSessionStorage)return sessionStorage.getItem('Drupal.webform.message.'+id)||false;return false;default:return false;}}function setClosed($element,storage,id){if(!id||!storage)return;switch(storage){case 'local':if(hasLocalStorage)localStorage.setItem('Drupal.webform.message.'+id,true);break;case 'session':if(hasSessionStorage)sessionStorage.setItem('Drupal.webform.message.'+id,true);break;case 'user':case 'state':case 'custom':$.get($element.find('.js-webform-message__link').attr('href'));return true;}}})(jQuery,Drupal,once);;
(function($,Drupal){'use strict';var isChrome=(/chrom(e|ium)/.test(window.navigator.userAgent.toLowerCase()));if(isChrome){var backButton=false;if(window.performance){var navEntries=window.performance.getEntriesByType('navigation');if(navEntries.length>0&&navEntries[0].type==='back_forward')backButton=true;else{if(window.performance.navigation&&window.performance.navigation.type===window.performance.navigation.TYPE_BACK_FORWARD)backButton=true;}}if(backButton){var attachBehaviors=Drupal.attachBehaviors;Drupal.attachBehaviors=function(context,settings){setTimeout(function(context,settings){attachBehaviors(context,settings);},300);};}}})(jQuery,Drupal);;
(function($,Drupal){const states={postponed:[]};Drupal.states=states;function invert(a,invertState){return invertState&&typeof a!=='undefined'?!a:a;}function compare(a,b){if(a===b)return typeof a==='undefined'?a:true;return typeof a==='undefined'||typeof b==='undefined';}function ternary(a,b){if(typeof a==='undefined')return b;if(typeof b==='undefined')return a;return a&&b;}Drupal.behaviors.states={attach(context,settings){const $states=$(context).find('[data-drupal-states]');const il=$states.length;for(let i=0;i<il;i++){const config=JSON.parse($states[i].getAttribute('data-drupal-states'));Object.keys(config||{}).forEach((state)=>{new states.Dependent({element:$($states[i]),state:states.State.sanitize(state),constraints:config[state]});});}while(states.postponed.length)states.postponed.shift()();}};states.Dependent=function(args){$.extend(this,{values:{},oldValue:null},args);this.dependees=this.getDependees();Object.keys(this.dependees||{}).forEach((selector)=>{this.initializeDependee(selector,this.dependees[selector]);});};states.Dependent.comparisons={RegExp(reference,value){return reference.test(value);},Function(reference,value){return reference(value);},Number(reference,value){return typeof value==='string'?compare(reference.toString(),value):compare(reference,value);}};states.Dependent.prototype={initializeDependee(selector,dependeeStates){this.values[selector]={};Object.keys(dependeeStates).forEach((i)=>{let state=dependeeStates[i];if($.inArray(state,dependeeStates)===-1)return;state=states.State.sanitize(state);this.values[selector][state.name]=null;$(selector).on(`state:${state}`,{selector,state},(e)=>{this.update(e.data.selector,e.data.state,e.value);});new states.Trigger({selector,state});});},compare(reference,selector,state){const value=this.values[selector][state.name];if(reference.constructor.name in states.Dependent.comparisons)return states.Dependent.comparisons[reference.constructor.name](reference,value);return compare(reference,value);},update(selector,state,value){if(value!==this.values[selector][state.name]){this.values[selector][state.name]=value;this.reevaluate();}},reevaluate(){let value=this.verifyConstraints(this.constraints);if(value!==this.oldValue){this.oldValue=value;value=invert(value,this.state.invert);this.element.trigger({type:`state:${this.state}`,value,trigger:true});}},verifyConstraints(constraints,selector){let result;if($.isArray(constraints)){const hasXor=$.inArray('xor',constraints)===-1;const len=constraints.length;for(let i=0;i<len;i++)if(constraints[i]!=='xor'){const constraint=this.checkConstraints(constraints[i],selector,i);if(constraint&&(hasXor||result))return hasXor;result=result||constraint;}}else{if($.isPlainObject(constraints)){for(const n in constraints)if(constraints.hasOwnProperty(n)){result=ternary(result,this.checkConstraints(constraints[n],selector,n));if(result===false)return false;}}}return result;},checkConstraints(value,selector,state){if(typeof state!=='string'||/[0-9]/.test(state[0]))state=null;else{if(typeof selector==='undefined'){selector=state;state=null;}}if(state!==null){state=states.State.sanitize(state);return invert(this.compare(value,selector,state),state.invert);}return this.verifyConstraints(value,selector);},getDependees(){const cache={};const _compare=this.compare;this.compare=function(reference,selector,state){(cache[selector]||(cache[selector]=[])).push(state.name);};this.verifyConstraints(this.constraints);this.compare=_compare;return cache;}};states.Trigger=function(args){$.extend(this,args);if(this.state in states.Trigger.states){this.element=$(this.selector);if(!this.element.data(`trigger:${this.state}`))this.initialize();}};states.Trigger.prototype={initialize(){const trigger=states.Trigger.states[this.state];if(typeof trigger==='function')trigger.call(window,this.element);else Object.keys(trigger||{}).forEach((event)=>{this.defaultTrigger(event,trigger[event]);});this.element.data(`trigger:${this.state}`,true);},defaultTrigger(event,valueFn){let oldValue=valueFn.call(this.element);this.element.on(event,function(e){const value=valueFn.call(this.element,e);if(oldValue!==value){this.element.trigger({type:`state:${this.state}`,value,oldValue});oldValue=value;}}.bind(this));states.postponed.push(function(){this.element.trigger({type:`state:${this.state}`,value:oldValue,oldValue:null});}.bind(this));}};states.Trigger.states={empty:{keyup(){return this.val()==='';},change(){return this.val()==='';}},checked:{change(){let checked=false;this.each(function(){checked=$(this).prop('checked');return !checked;});return checked;}},value:{keyup(){if(this.length>1)return this.filter(':checked').val()||false;return this.val();},change(){if(this.length>1)return this.filter(':checked').val()||false;return this.val();}},collapsed:{collapsed(e){return typeof e!=='undefined'&&'value' in e?e.value:!this[0].hasAttribute('open');}}};states.State=function(state){this.pristine=state;this.name=state;let process=true;do{while(this.name.charAt(0)==='!'){this.name=this.name.substring(1);this.invert=!this.invert;}if(this.name in states.State.aliases)this.name=states.State.aliases[this.name];else process=false;}while(process);};states.State.sanitize=function(state){if(state instanceof states.State)return state;return new states.State(state);};states.State.aliases={enabled:'!disabled',invisible:'!visible',invalid:'!valid',untouched:'!touched',optional:'!required',filled:'!empty',unchecked:'!checked',irrelevant:'!relevant',expanded:'!collapsed',open:'!collapsed',closed:'collapsed',readwrite:'!readonly'};states.State.prototype={invert:false,toString(){return this.name;}};const $document=$(document);$document.on('state:disabled',(e)=>{if(e.trigger)$(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled',e.value).find('select, input, textarea').prop('disabled',e.value);});$document.on('state:readonly',(e)=>{if(e.trigger)$(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-readonly',e.value).find('input, textarea').prop('readonly',e.value);});$document.on('state:required',(e)=>{if(e.trigger)if(e.value){const label=`label${e.target.id?`[for=${e.target.id}]`:''}`;const $label=$(e.target).attr({required:'required','aria-required':'true'}).closest('.js-form-item, .js-form-wrapper').find(label);if(!$label.hasClass('js-form-required').length)$label.addClass('js-form-required form-required');}else $(e.target).removeAttr('required aria-required').closest('.js-form-item, .js-form-wrapper').find('label.js-form-required').removeClass('js-form-required form-required');});$document.on('state:visible',(e)=>{if(e.trigger){let $element=$(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper');if(e.target.tagName==='A')$element=$(e.target);$element.toggle(e.value);}});$document.on('state:checked',(e)=>{if(e.trigger)$(e.target).closest('.js-form-item, .js-form-wrapper').find('input').prop('checked',e.value).trigger('change');});$document.on('state:collapsed',(e)=>{if(e.trigger)if(e.target.hasAttribute('open')===e.value)$(e.target).find('> summary').trigger('click');});})(jQuery,Drupal);;
(function($){$(document).unbind('state:disabled');$(document).bind('state:disabled',function(e){if(e.trigger)$(e.target).attr('disabled',e.value).closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled',e.value).find(':input').attr('disabled',e.value);});})(jQuery);;
(function($,Drupal,once){'use strict';Drupal.webform=Drupal.webform||{};Drupal.webform.states=Drupal.webform.states||{};Drupal.webform.states.slideDown=Drupal.webform.states.slideDown||{};Drupal.webform.states.slideDown.duration='slow';Drupal.webform.states.slideUp=Drupal.webform.states.slideUp||{};Drupal.webform.states.slideUp.duration='fast';$.fn.hasData=function(data){return (typeof this.data(data)!=='undefined');};$.fn.isWebform=function(){return $(this).closest('form.webform-submission-form, form[id^="webform"], form[data-is-webform]').length?true:false;};$.fn.isWebformElement=function(){return ($(this).isWebform()||$(this).closest('[data-is-webform-element]').length)?true:false;};Drupal.states.Trigger.states.empty.change=function change(){return this.val()==='';};var states=Drupal.states;Drupal.states.Dependent.prototype.compare=function compare(reference,selector,state){var value=this.values[selector][state.name];var name=reference.constructor.name;if(!name){name=$.type(reference);name=name.charAt(0).toUpperCase()+name.slice(1);}if(name in states.Dependent.comparisons)return states.Dependent.comparisons[name](reference,value);if(reference.constructor.name in states.Dependent.comparisons)return states.Dependent.comparisons[reference.constructor.name](reference,value);return _compare2(reference,value);};function _compare2(a,b){if(a===b)return typeof a==='undefined'?a:true;return typeof a==='undefined'||typeof b==='undefined';}Drupal.states.Dependent.comparisons.Object=function(reference,value){if('pattern' in reference)return (new RegExp(reference['pattern'])).test(value);else if('!pattern' in reference)return !((new RegExp(reference['!pattern'])).test(value));else if('less' in reference)return (value!==''&&parseFloat(reference['less'])>parseFloat(value));else if('less_equal' in reference)return (value!==''&&parseFloat(reference['less_equal'])>=parseFloat(value));else if('greater' in reference)return (value!==''&&parseFloat(reference['greater'])<parseFloat(value));else if('greater_equal' in reference)return (value!==''&&parseFloat(reference['greater_equal'])<=parseFloat(value));else if('between' in reference||'!between' in reference){if(value==='')return false;var between=reference['between']||reference['!between'];var betweenParts=between.split(':');var greater=betweenParts[0];var less=(typeof betweenParts[1]!=='undefined')?betweenParts[1]:null;var isGreaterThan=(greater===null||greater===''||parseFloat(value)>=parseFloat(greater));var isLessThan=(less===null||less===''||parseFloat(value)<=parseFloat(less));var result=(isGreaterThan&&isLessThan);return (reference['!between'])?!result:result;}else return reference.indexOf(value)!==false;};var $document=$(document);$document.on('state:required',function(e){if(e.trigger&&$(e.target).isWebformElement()){var $target=$(e.target);toggleRequired($target.find('input[type="file"]'),e.value);if($target.is('.js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other, .js-webform-type-webform-entity-radios, .webform-likert-table')){$target.toggleClass('required',e.value);toggleRequired($target.find('input[type="radio"]'),e.value);}if($target.is('.js-form-type-checkboxes, .js-form-type-webform-checkboxes-other, .js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other')){$target.toggleClass('required',e.value);var $checkboxes=$target.find('input[type="checkbox"]');if(e.value){$checkboxes.on('click',statesCheckboxesRequiredEventHandler);checkboxesRequired($target);}else{$checkboxes.off('click',statesCheckboxesRequiredEventHandler);toggleRequired($checkboxes,false);}}if($target.is('.js-webform-tableselect')){$target.toggleClass('required',e.value);var isMultiple=$target.is('[multiple]');if(isMultiple){var $tbody=$target.find('tbody');var $checkboxes=$tbody.find('input[type="checkbox"]');copyRequireMessage($target,$checkboxes);if(e.value){$checkboxes.on('click change',statesCheckboxesRequiredEventHandler);checkboxesRequired($tbody);}else{$checkboxes.off('click change ',statesCheckboxesRequiredEventHandler);toggleRequired($tbody,false);}}else{var $radios=$target.find('input[type="radio"]');copyRequireMessage($target,$radios);toggleRequired($radios,e.value);}}if($target.is('.js-form-type-webform-select-other, .js-webform-type-webform-select-other')){var $select=$target.find('select');toggleRequired($select,e.value);copyRequireMessage($target,$select);}if($target.find('> label:not([for])').length)$target.find('> label').toggleClass('js-form-required form-required',e.value);if($target.is('.js-webform-type-radios, .js-webform-type-checkboxes, fieldset'))$target.find('legend span.fieldset-legend:not(.visually-hidden),legend span.fieldset__label:not(.visually-hidden)').toggleClass('js-form-required form-required',e.value);if($target.is('fieldset'))$target.removeAttr('required aria-required');}});$document.on('state:checked',function(e){if(e.trigger)$(e.target).trigger('change');});$document.on('state:readonly',function(e){if(e.trigger&&$(e.target).isWebformElement()){$(e.target).prop('readonly',e.value).closest('.js-form-item, .js-form-wrapper').toggleClass('webform-readonly',e.value).find('input, textarea').prop('readonly',e.value);$(e.target).trigger('webform:readonly').find('select, input, textarea, button').trigger('webform:readonly');}});$document.on('state:visible state:visible-slide',function(e){if(e.trigger&&$(e.target).isWebformElement())if(e.value)$(':input',e.target).addBack().each(function(){restoreValueAndRequired(this);triggerEventHandlers(this);});else $(':input',e.target).addBack().each(function(){backupValueAndRequired(this);clearValueAndRequired(this);triggerEventHandlers(this);});});$document.on('state:visible-slide',function(e){if(e.trigger&&$(e.target).isWebformElement()){var effect=e.value?'slideDown':'slideUp';var duration=Drupal.webform.states[effect].duration;$(e.target).closest('.js-form-item, .js-form-submit, .js-form-wrapper')[effect](duration);}});Drupal.states.State.aliases['invisible-slide']='!visible-slide';$document.on('state:disabled',function(e){if(e.trigger&&$(e.target).isWebformElement()){$(e.target).prop('disabled',e.value).closest('.js-form-item, .js-form-submit, .js-form-wrapper').toggleClass('form-disabled',e.value).find('select, input, textarea, button').prop('disabled',e.value);var fileElements=$(e.target).find(':input[type="hidden"][name$="[fids]"]');if(fileElements.length){if($(e.target).is('fieldset'))$(e.target).prop('disabled',false);fileElements.removeAttr('disabled');}$(e.target).trigger('webform:disabled').find('select, input, textarea, button').trigger('webform:disabled');}});Drupal.behaviors.webformCheckboxesRequired={attach:function(context){$(once('webform-checkboxes-required','.js-form-type-checkboxes.required, .js-form-type-webform-checkboxes-other.required, .js-webform-type-checkboxes.required, .js-webform-type-webform-checkboxes-other.required, .js-webform-type-webform-radios-other.checkboxes',context)).each(function(){var $element=$(this);$element.find('input[type="checkbox"]').on('click',statesCheckboxesRequiredEventHandler);setTimeout(function(){checkboxesRequired($element);});});}};Drupal.behaviors.webformRadiosRequired={attach:function(context){$(once('webform-radios-required','.js-form-type-radios, .js-form-type-webform-radios-other, .js-webform-type-radios, .js-webform-type-webform-radios-other, .js-webform-type-webform-entity-radios, .js-webform-type-webform-scale',context)).each(function(){var $element=$(this);setTimeout(function(){radiosRequired($element);});});}};Drupal.behaviors.webformTableSelectRequired={attach:function(context){$(once('webform-tableselect-required','.js-webform-tableselect.required',context)).each(function(){var $element=$(this);var $tbody=$element.find('tbody');var isMultiple=$element.is('[multiple]');if(isMultiple)$tbody.find('input[type="checkbox"]').on('click change',function(){checkboxesRequired($tbody);});setTimeout(function(){isMultiple?checkboxesRequired($tbody):radiosRequired($element);});});}};function checkboxesRequired($element){var $firstCheckbox=$element.find('input[type="checkbox"]').first();var isChecked=$element.find('input[type="checkbox"]').is(':checked');toggleRequired($firstCheckbox,!isChecked);copyRequireMessage($element,$firstCheckbox);}function radiosRequired($element){var $radios=$element.find('input[type="radio"]');var isRequired=$element.hasClass('required');toggleRequired($radios,isRequired);copyRequireMessage($element,$radios);}function statesCheckboxesRequiredEventHandler(){var $element=$(this).closest('.js-webform-type-checkboxes, .js-webform-type-webform-checkboxes-other');checkboxesRequired($element);}function triggerEventHandlers(input){var $input=$(input);var type=input.type;var tag=input.tagName.toLowerCase();var extraParameters=['webform.states'];if(type==='checkbox'||type==='radio')$input.trigger('change',extraParameters).trigger('blur',extraParameters);else if(tag==='select'){if($input.closest('.webform-type-address').length){if(!$input.data('webform-states-address-initialized')&&$input.attr('autocomplete')==='country'&&$input.val()===$input.find("option[selected]").attr('value'))return;$input.data('webform-states-address-initialized',true);}$input.trigger('change',extraParameters).trigger('blur',extraParameters);}else{if(type!=='submit'&&type!=='button'&&type!=='file'){var hasInputMask=($.fn.inputmask&&$input.hasClass('js-webform-input-mask'));hasInputMask&&$input.inputmask('remove');$input.trigger('input',extraParameters).trigger('change',extraParameters).trigger('keydown',extraParameters).trigger('keyup',extraParameters).trigger('blur',extraParameters);hasInputMask&&$input.inputmask();}}}function backupValueAndRequired(input){var $input=$(input);var type=input.type;var tag=input.tagName.toLowerCase();if($input.prop('required')&&!$input.hasData('webform-required'))$input.data('webform-required',true);if(!$input.hasData('webform-value'))if(type==='checkbox'||type==='radio')$input.data('webform-value',$input.prop('checked'));else if(tag==='select'){var values=[];$input.find('option:selected').each(function(i,option){values[i]=option.value;});$input.data('webform-value',values);}else{if(type!=='submit'&&type!=='button')$input.data('webform-value',input.value);}}function restoreValueAndRequired(input){var $input=$(input);var value=$input.data('webform-value');if(typeof value!=='undefined'){var type=input.type;var tag=input.tagName.toLowerCase();if(type==='checkbox'||type==='radio')$input.prop('checked',value);else if(tag==='select')$.each(value,function(i,option_value){option_value=option_value.replace(/'/g,"\\\'");$input.find("option[value='"+option_value+"']").prop('selected',true);});else{if(type!=='submit'&&type!=='button')input.value=value;}$input.removeData('webform-value');}var required=$input.data('webform-required');if(typeof required!=='undefined'){if(required)$input.prop('required',true);$input.removeData('webform-required');}}function clearValueAndRequired(input){var $input=$(input);if($input.closest('[data-webform-states-no-clear]').length)return;var type=input.type;var tag=input.tagName.toLowerCase();if(type==='checkbox'||type==='radio')$input.prop('checked',false);else if(tag==='select')if($input.find('option[value=""]').length)$input.val('');else input.selectedIndex=-1;else{if(type!=='submit'&&type!=='button')input.value=(type==='color')?'#000000':'';}$input.prop('required',false);}function toggleRequired($input,required){var isCheckboxOrRadio=($input.attr('type')==='radio'||$input.attr('type')==='checkbox');if(required)if(isCheckboxOrRadio)$input.attr({'required':'required'});else $input.attr({'required':'required','aria-required':'true'});else if(isCheckboxOrRadio)$input.removeAttr('required');else $input.removeAttr('required aria-required');}function copyRequireMessage($source,$destination){if($source.attr('data-msg-required'))$destination.attr('data-msg-required',$source.attr('data-msg-required'));}})(jQuery,Drupal,once);;
(function($,Drupal){'use strict';$(document).on('state:required',function(e){if(e.trigger&&$(e.target).isWebform()){var $target=$(e.target);if($target.is('.js-form-wrapper.panel'))if(e.value)$target.find('.panel-heading .panel-title').addClass('js-form-required form-required');else $target.find('.panel-heading .panel-title').removeClass('js-form-required form-required');}});})(jQuery,Drupal);;