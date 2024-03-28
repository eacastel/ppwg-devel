<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* modules/contrib/slick/templates/slick-slide.html.twig */
class __TwigTemplate_599520fe57b5013befc6912d4d40e9b7 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'slick_slide' => [$this, 'block_slick_slide'],
            'slick_caption' => [$this, 'block_slick_caption'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 21
        $context["classes"] = [("slide--" . $this->sandbox->ensureToStringAllowed(        // line 22
($context["delta"] ?? null), 22, $this->source)), ((twig_test_empty(twig_get_attribute($this->env, $this->source,         // line 23
($context["item"] ?? null), "slide", [], "any", false, false, true, 23))) ? ("slide--text") : ("")), ((twig_get_attribute($this->env, $this->source,         // line 24
($context["settings"] ?? null), "layout", [], "any", false, false, true, 24)) ? (("slide--caption--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "layout", [], "any", false, false, true, 24), 24, $this->source)))) : ("")), ((twig_get_attribute($this->env, $this->source,         // line 25
($context["settings"] ?? null), "class", [], "any", false, false, true, 25)) ? (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "class", [], "any", false, false, true, 25)) : (""))];
        // line 29
        $context["content_classes"] = [((twig_get_attribute($this->env, $this->source,         // line 30
($context["settings"] ?? null), "detroy", [], "any", false, false, true, 30)) ? ("slide") : ("")), (( !twig_get_attribute($this->env, $this->source,         // line 31
($context["settings"] ?? null), "detroy", [], "any", false, false, true, 31)) ? ("slide__content") : (""))];
        // line 35
        $context["caption_classes"] = ["slide__caption"];
        // line 39
        $context["use_blazy"] = twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["blazies"] ?? null), "use", [], "any", false, false, true, 39), "theme_blazy", [], "any", false, false, true, 39);
        // line 40
        if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "wrapper", [], "any", false, false, true, 40)) {
            // line 41
            echo "<div";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [($context["classes"] ?? null)], "method", false, false, true, 41), 41, $this->source), "html", null, true);
            echo ">";
        }
        // line 44
        if (($context["use_blazy"] ?? null)) {
            // line 45
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["item"] ?? null), 45, $this->source), "html", null, true);
        } else {
            // line 47
            echo "    ";
            // line 51
            if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "use_ca", [], "any", false, false, true, 51)) {
                echo "<div";
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["content_attributes"] ?? null), "addClass", [($context["content_classes"] ?? null)], "method", false, false, true, 51), 51, $this->source), "html", null, true);
                echo ">";
            }
            // line 52
            ob_start(function () { return ''; });
            // line 53
            echo "        ";
            $this->displayBlock('slick_slide', $context, $blocks);
            // line 60
            echo "      ";
            $context["slide"] = ('' === $tmp = ob_get_clean()) ? '' : new Markup($tmp, $this->env->getCharset());
            // line 62
            if (twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "slide", [], "any", false, false, true, 62)) {
                // line 63
                echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["slide"] ?? null), 63, $this->source), "html", null, true);
            }
            // line 66
            if (twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 66)) {
                // line 67
                $this->displayBlock('slick_caption', $context, $blocks);
            }
            // line 92
            if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "use_ca", [], "any", false, false, true, 92)) {
                echo "</div>";
            }
        }
        // line 95
        if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "wrapper", [], "any", false, false, true, 95)) {
            // line 96
            echo "</div>";
        }
        $this->env->getExtension('\Drupal\Core\Template\TwigExtension')
            ->checkDeprecations($context, ["delta", "item", "settings", "blazies", "attributes", "content_attributes", "caption_attributes"]);    }

    // line 53
    public function block_slick_slide($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 54
        if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "split", [], "any", false, false, true, 54)) {
            // line 55
            echo "<div class=\"slide__media\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "slide", [], "any", false, false, true, 55), 55, $this->source), "html", null, true);
            echo "</div>
          ";
        } else {
            // line 57
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "slide", [], "any", false, false, true, 57), 57, $this->source), "html", null, true);
        }
    }

    // line 67
    public function block_slick_caption($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 68
        if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "fullwidth", [], "any", false, false, true, 68)) {
            echo "<div class=\"slide__constrained\">";
        }
        // line 69
        echo "<div";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["caption_attributes"] ?? null), "addClass", [($context["caption_classes"] ?? null)], "method", false, false, true, 69), 69, $this->source), "html", null, true);
        echo ">";
        // line 70
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 70), "overlay", [], "any", false, false, true, 70)) {
            // line 71
            echo "<div class=\"slide__overlay\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 71), "overlay", [], "any", false, false, true, 71), 71, $this->source), "html", null, true);
            echo "</div>";
            // line 72
            if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "data", [], "any", false, false, true, 72)) {
                echo "<div class=\"slide__data\">";
            }
        }
        // line 74
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 74), "title", [], "any", false, false, true, 74)) {
            // line 75
            echo "<h2 class=\"slide__title\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 75), "title", [], "any", false, false, true, 75), 75, $this->source), "html", null, true);
            echo "</h2>";
        }
        // line 77
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 77), "alt", [], "any", false, false, true, 77)) {
            // line 78
            echo "<p class=\"slide__description\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 78), "alt", [], "any", false, false, true, 78), 78, $this->source), "html", null, true);
            echo "</p>";
        }
        // line 80
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 80), "data", [], "any", false, false, true, 80)) {
            // line 81
            echo "<div class=\"slide__description\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 81), "data", [], "any", false, false, true, 81), 81, $this->source), "html", null, true);
            echo "</div>";
        }
        // line 83
        if (twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 83), "link", [], "any", false, false, true, 83)) {
            // line 84
            echo "<div class=\"slide__link\">";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 84), "link", [], "any", false, false, true, 84), 84, $this->source), "html", null, true);
            echo "</div>";
        }
        // line 86
        if ((twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["item"] ?? null), "caption", [], "any", false, false, true, 86), "overlay", [], "any", false, false, true, 86) && twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "data", [], "any", false, false, true, 86))) {
            echo "</div>";
        }
        // line 87
        echo "</div>";
        // line 88
        if (twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "fullwidth", [], "any", false, false, true, 88)) {
            echo "</div>";
        }
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "modules/contrib/slick/templates/slick-slide.html.twig";
    }

    /**
     * @codeCoverageIgnore
     */
    public function isTraitable()
    {
        return false;
    }

    /**
     * @codeCoverageIgnore
     */
    public function getDebugInfo()
    {
        return array (  180 => 88,  178 => 87,  174 => 86,  169 => 84,  167 => 83,  162 => 81,  160 => 80,  155 => 78,  153 => 77,  148 => 75,  146 => 74,  141 => 72,  137 => 71,  135 => 70,  131 => 69,  127 => 68,  123 => 67,  118 => 57,  112 => 55,  110 => 54,  106 => 53,  100 => 96,  98 => 95,  93 => 92,  90 => 67,  88 => 66,  85 => 63,  83 => 62,  80 => 60,  77 => 53,  75 => 52,  69 => 51,  67 => 47,  64 => 45,  62 => 44,  57 => 41,  55 => 40,  53 => 39,  51 => 35,  49 => 31,  48 => 30,  47 => 29,  45 => 25,  44 => 24,  43 => 23,  42 => 22,  41 => 21,);
    }

    public function getSourceContext()
    {
        return new Source("", "modules/contrib/slick/templates/slick-slide.html.twig", "/opt/drupal/web/modules/contrib/slick/templates/slick-slide.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 21, "if" => 40, "block" => 53);
        static $filters = array("clean_class" => 24, "escape" => 41);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'block'],
                ['clean_class', 'escape'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->source);

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }
}
