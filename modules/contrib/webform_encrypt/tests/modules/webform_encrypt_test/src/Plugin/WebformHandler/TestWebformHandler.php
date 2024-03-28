<?php

namespace Drupal\webform_encrypt_test\Plugin\WebformHandler;

use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\WebformSubmissionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Webform submission action handler.
 *
 * @WebformHandler(
 *   id = "test_webform_handler",
 *   label = @Translation("Test Handler"),
 *   category = @Translation("Test"),
 *   description = @Translation("A Test webform handler."),
 *   cardinality =
 *   \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_SINGLE,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_IGNORED,
 *   submission =
 *   \Drupal\webform\Plugin\WebformHandlerInterface::SUBMISSION_OPTIONAL,
 * )
 */
class TestWebformHandler extends WebformHandlerBase {

  /**
   * The State system service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition) {
    $instance = parent::create($container, $configuration, $plugin_id, $plugin_definition);
    $instance->state = $container->get('state');
    return $instance;
  }

  /**
   * {@inheritdoc}
   */
  public function preSave(WebformSubmissionInterface $webform_submission) {
    $counter = $this->state->get('test_webform_handler_presave_counter', 0);
    $this->state->set('test_webform_handler_presave_counter', ++$counter);
  }

}
