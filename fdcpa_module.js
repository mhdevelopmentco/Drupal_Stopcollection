/**
 * @file
 * FDCPA Conversion form
 *
 */

 (function($){ Drupal.behaviors.FDCPA_Form = { attach: function(context, settings) {
  var $form = $('form.egm-frm');

  if($form.is('.step-contact') || $form.is('.form-full')) {
    var
    $fullName = $('.form-item-FullName .form-text'),
    $phone = $('.form-item-Phone .form-text'),
    $altphone = $('.form-item-AltPhone .form-text'),
    $email = $('.form-item-Email .form-text'),
    $zip = $('.form-item-Zip .form-text'),
    $form = $('form.egm-frm'),
    $submit = $('.egm-frm .form-submit');

    if($form.is('.step-contact')) {
     $fullName.focus();
   }
    // mask inputs (jquery masked input plugin)
    if(!navigator.userAgent.match(/Android|Opera Mobi|Opera Mini/i)) {
      $phone.mask('(999) 999-9999');
      $altphone.mask('(999) 999-9999');
      $zip.mask('99999');
    }
  }

  $form.submit(function(e) {
    $submit = $("form.egm-frm .form-submit");

    if($(this).is('.step-questions')){
      _text = 'Next...';
    }
    else if($(this).is('.step-contact')){
      _text = 'Sending...';
    }
    else {
     _text = 'Sending...';
   }

   $submit.val(_text);
   $submit.css({'cursor':'default'});
   $submit.prop('disabled','true');
   $submit.addClass('submit-btn-dis');
 });

  $("form#fdcpa-form div.questions-section input:checkbox").change(function() {
    isRequiredChecked();
  });
  function isRequiredChecked() {
    var cases = $('form#fdcpa-form label[for="edit-casedes"]');
    if ($("form#fdcpa-form div.questions-section input:checkbox:checked").length > 0){
      cases.find('span').remove();
      $('form#fdcpa-form textarea#edit-casedes').removeClass('error');
    } else {
      var html = '<span class="form-required" title="This field is required.">*</span>';
      cases.html(cases.html()+html);
    }
  }

  function alterForm(){
    $('.form-item-Email .form-text').removeClass('required');
    $('.form-item-Email').find('span').remove();
    //$zip.removeClass('required');
    //$('.form-item-Zip').find('span').remove();
    $('.form-item-Zip').find('input').val("None");
    $('.form-item-Zip').css('display', 'none');
    $('.form-item-CaseDes').find('span').remove();
    $('.egm-frm.step-contact .button-container').css('margin-top', '16.5rem');
  }

  $(document).ready(function() {
    isRequiredChecked();
    alterForm();
  });

}};})(jQuery);


//hide static footer in mobile on keyboard popup
var form_input=document.querySelectorAll('input');
var footer_fixed = document.querySelector('.footer-fixed');
var i;
if(footer_fixed){
	for(i=0; i<form_input.length; i++){
	  form_input[i].addEventListener('focusin', function(){footer_fixed.style.display='none'});
	  form_input[i].addEventListener('focusout', function(){footer_fixed.style.display='block'});
	}
}