/* @license GNU-GPL-2.0-or-later https://www.drupal.org/licensing/faq */
(function($,window,Drupal,drupalSettings,Stripe,once){'use strict';var stripe=null;Drupal.theme.stripeSucceeded=function(str){return '<div class="stripe messages messages--status">'+Drupal.checkPlain(str)+'</div>';};$.fn.stripeUpdatePaymentIntent=function(argument){var $element=$('[data-drupal-stripe-trigger="'+argument.trigger+'"]');var $form=$element.closest('form');if(argument.error){$form.trigger('stripe:submit');return;}var elementData=$element.data('drupal-stripe-initialized');if(elementData){var client_secret=$element.find('.drupal-stripe-client-secret').val();if(elementData.type=='card')stripe.confirmCardPayment(client_secret,{payment_method:{card:elementData.element,billing_details:argument.billing_details}}).then(function(result){if(result.error)$element.trigger('stripe:error',result.error.message);else $form.trigger('stripe:submit');});if(elementData.type=='paymentrequest'){var paymentRequest=elementData.options.paymentRequest;if(argument.total)paymentRequest.update({total:argument.total});paymentRequest.show();}}};Drupal.behaviors.stripe={attach:function(context,settings){if(drupalSettings.stripe&&drupalSettings.stripe.apiKey&&!stripe)stripe=Stripe(drupalSettings.stripe.apiKey);if(!stripe)return;for(var base in settings.stripe.elements){var $element=$('#'+base,context);if(!$element.length)continue;if($element.data('drupal-stripe-initialized'))continue;(function($element,elementSettings){var $form=$element.closest('form');$form.on('stripe:submit:start',function(e){$(this).addClass('stripe-processing');});$form.on('stripe:submit:stop',function(e){$(this).removeClass('stripe-processing');});var client_secret=$element.find('.drupal-stripe-client-secret').val();var $payment_intent=$element.find('.drupal-stripe-payment-intent');if($payment_intent.data('payment-intent-status')=='succeeded'){$element.after(Drupal.theme('stripeSucceeded','You have already been charged, please submit the rest of the form.'));return;}var elements=stripe.elements();var stripeElementOptions={};$element.trigger('stripe:element:create',{type:elementSettings.type,stripe,elements,options:stripeElementOptions});var stripeElement={};if(elementSettings.type=='card'){stripeElement=elements.create('card',stripeElementOptions);stripeElement.mount($element.find('.drupal-stripe-element')[0]);stripeElement.on('change',function(event){$element.trigger('stripe:error',event.error?event.error.message:"");});}if(elementSettings.type=='paymentrequest'){var paymentRequest=stripe.paymentRequest({country:elementSettings.country,currency:elementSettings.currency,total:{label:elementSettings.label,amount:elementSettings.amount},requestPayerName:true,requestPayerEmail:true});stripeElementOptions.paymentRequest=paymentRequest;stripeElement=elements.create('paymentRequestButton',stripeElementOptions);paymentRequest.canMakePayment().then(function($element,result){if(result){var $form=$element.closest('form');stripeElement.mount($element.find('.drupal-stripe-element')[0]);stripeElement.on('click',function(event){event.preventDefault();if(HTMLFormElement.prototype.reportValidity)if(!$form[0].reportValidity())return false;$form.trigger('stripe:submit:start');var ajaxId=new Date().getTime();$element.attr('data-drupal-stripe-trigger',ajaxId);$element.find('.drupal-stripe-trigger').val(ajaxId);var formValues=$form.find(':input').not('.drupal-stripe-trigger, input[name="form_build_id"]').serialize();$form.attr('data-stripe-form-submit-last',formValues);$element.find('.drupal-stripe-update').trigger('mousedown');});}else $element.parent('.form-type-stripe-paymentrequest').hide();}.bind(null,$element));paymentRequest.on('cancel',function(){$form.trigger('stripe:submit:stop');});paymentRequest.on('paymentmethod',function(ev){stripe.confirmCardPayment(client_secret,{payment_method:ev.paymentMethod.id},{handleActions:false}).then(function(confirmResult){if(confirmResult.error){$element.trigger('stripe:error',confirmResult.error.message);ev.complete('fail');$form.trigger('stripe:submit:stop');}else{ev.complete('success');if(confirmResult.paymentIntent.status==="requires_action")stripe.confirmCardPayment(client_secret).then(function(result){if(result.error)$element.trigger('stripe:error',result.error.message);else $form.trigger('stripe:submit');});else $form.trigger('stripe:submit');}});});}var eventData={type:elementSettings.type,stripe,elements,options:stripeElementOptions,element:stripeElement,settings:elementSettings};$element.trigger('stripe:element:created',eventData);$element.data('drupal-stripe-initialized',eventData);$form.data('drupal-stripe-element-'+elementSettings.type,$element);$element.bind('stripe:error',function(event,text){var displayError=$element.find('.drupal-stripe-errors')[0];$form.removeAttr('data-stripe-form-submit-last');$form.trigger('stripe:submit:stop');displayError.textContent=text;});$(once('drupal-stripe-submit-click',$form)).find(':submit').click(function(event){var $element=$(event.currentTarget);var $form=$element.closest('form');if(HTMLFormElement.prototype.reportValidity)if(!$form[0].reportValidity())return true;if($form.data('drupal-stripe-submit')){$form.data('drupal-stripe-submit',false);return true;}event.preventDefault();var formValues=$form.find(':input').not('.drupal-stripe-trigger, input[name="form_build_id"]').serialize();var previousValues=$form.attr('data-stripe-form-submit-last');if(previousValues!==formValues){$form.attr('data-stripe-form-submit-last',formValues);$form.trigger('stripe:submit:start');var $element=$form.data('drupal-stripe-element-card');var ajaxId=new Date().getTime();$element.attr('data-drupal-stripe-trigger',ajaxId);$element.find('.drupal-stripe-trigger').val(ajaxId);$element.find('.drupal-stripe-update').trigger('mousedown');}else console.log('Prevent double submit');});$(once('drupal-stripe-submit',$form)).on('stripe:submit',function(event){var $form=$(this);$form.data('drupal-stripe-submit',true);var $submit=$();if(elementSettings.submit_selector)for(var i in elementSettings.submit_selector){var selector=elementSettings.submit_selector[i];$submit=$form.find(selector);if($submit.length)break;}if(!$submit.length)$form.find('.js-stripe-submit');if(!$submit.length)$submit=$form.find('.js-form-submit:not(.drupal-stripe-update)');$submit.first().trigger('click');});})($element,settings.stripe.elements[base]);}}};})(jQuery,window,Drupal,drupalSettings,Stripe,once);;