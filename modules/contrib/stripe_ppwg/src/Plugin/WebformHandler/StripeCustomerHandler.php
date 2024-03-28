<?php

namespace Drupal\stripe_ppwg\Plugin\WebformHandler;

use Drupal\Core\Form\FormStateInterface;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;

/**
 * Ensure the Stripe library is loaded.
 */
stripe_load_library();

/**
 * Form submission handler.
 */
class StripeCustomerHandler extends WebformHandlerBase {

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {
    // Retrieve the configured site-wide Stripe secret key.
    $apiKey = stripe_get_key('secret');
    
    // Initialize the Stripe client with the retrieved API key.
    $stripe = new \Stripe\StripeClient($apiKey);

    // Get submission data.
    $data = $webform_submission->getData();
    $name = $data['cardholder_name'] ?? 'No name provided';
    $email = $data['cardholder_email'] ?? '';

    try {
      // Create Stripe customer.
      $customer = $stripe->customers->create([
        'name' => $name,
        'email' => $email,
      ]);

      // Log the customer ID or take further actions as needed.
      \Drupal::logger('stripe_ppwg')->info('Created Stripe customer with ID: @id', ['@id' => $customer->id]);
    } catch (\Exception $e) {
      \Drupal::logger('stripe_ppwg')->error('Error creating Stripe customer: @message', ['@message' => $e->getMessage()]);
    }
  }
}
