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

/* modules/contrib/slick/templates/slick.html.twig */
class __TwigTemplate_8e922417eecbdc544ea1a4e068b75f1c extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
            'slick_content' => [$this, 'block_slick_content'],
            'slick_arrow' => [$this, 'block_slick_arrow'],
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $this->checkSecurity();
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 37
        $context["classes"] = [((twig_get_attribute($this->env, $this->source,         // line 38
($context["settings"] ?? null), "unslick", [], "any", false, false, true, 38)) ? ("unslick") : ("")), ((twig_get_attribute($this->env, $this->source,         // line 39
($context["settings"] ?? null), "vertical", [], "any", false, false, true, 39)) ? ("slick--vertical") : ("")), ((twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source,         // line 40
($context["settings"] ?? null), "attributes", [], "any", false, false, true, 40), "class", [], "any", false, false, true, 40)) ? (twig_join_filter($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "attributes", [], "any", false, false, true, 40), "class", [], "any", false, false, true, 40), 40, $this->source), " ")) : ("")), ((twig_get_attribute($this->env, $this->source,         // line 41
($context["settings"] ?? null), "skin", [], "any", false, false, true, 41)) ? (("slick--skin--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "skin", [], "any", false, false, true, 41), 41, $this->source)))) : ("")), ((twig_in_filter("boxed", twig_get_attribute($this->env, $this->source,         // line 42
($context["settings"] ?? null), "skin", [], "any", false, false, true, 42))) ? ("slick--skin--boxed") : ("")), ((twig_in_filter("split", twig_get_attribute($this->env, $this->source,         // line 43
($context["settings"] ?? null), "skin", [], "any", false, false, true, 43))) ? ("slick--skin--split") : ("")), ((twig_get_attribute($this->env, $this->source,         // line 44
($context["settings"] ?? null), "optionset", [], "any", false, false, true, 44)) ? (("slick--optionset--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "optionset", [], "any", false, false, true, 44), 44, $this->source)))) : ("")), ((        // line 45
array_key_exists("arrow_down_attributes", $context)) ? ("slick--has-arrow-down") : ("")), ((twig_get_attribute($this->env, $this->source,         // line 46
($context["settings"] ?? null), "asNavFor", [], "any", false, false, true, 46)) ? (("slick--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["display"] ?? null), 46, $this->source)))) : ("")), (((twig_get_attribute($this->env, $this->source,         // line 47
($context["settings"] ?? null), "slidesToShow", [], "any", false, false, true, 47) > 1)) ? ("slick--multiple-view") : ("")), (((twig_get_attribute($this->env, $this->source,         // line 48
($context["blazies"] ?? null), "count", [], "any", false, false, true, 48) <= twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "slidesToShow", [], "any", false, false, true, 48))) ? ("slick--less") : ("")), ((((        // line 49
($context["display"] ?? null) == "main") && twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "media_switch", [], "any", false, false, true, 49))) ? (("slick--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "media_switch", [], "any", false, false, true, 49), 49, $this->source)))) : ("")), ((((        // line 50
($context["display"] ?? null) == "thumbnail") && twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "thumbnail_caption", [], "any", false, false, true, 50))) ? ("slick--has-caption") : (""))];
        // line 54
        $context["arrow_classes"] = ["slick__arrow", ((twig_get_attribute($this->env, $this->source,         // line 56
($context["settings"] ?? null), "vertical", [], "any", false, false, true, 56)) ? ("slick__arrow--v") : ("")), ((twig_get_attribute($this->env, $this->source,         // line 57
($context["settings"] ?? null), "skin_arrows", [], "any", false, false, true, 57)) ? (("slick__arrow--" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "skin_arrows", [], "any", false, false, true, 57), 57, $this->source)))) : (""))];
        // line 60
        echo "<div";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["attributes"] ?? null), "addClass", [($context["classes"] ?? null)], "method", false, false, true, 60), 60, $this->source), "html", null, true);
        echo ">";
        // line 61
        if ( !twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "unslick", [], "any", false, false, true, 61)) {
            // line 62
            echo "<div";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["content_attributes"] ?? null), "addClass", ["slick__slider"], "method", false, false, true, 62), 62, $this->source), "html", null, true);
            echo ">";
        }
        // line 65
        $this->displayBlock('slick_content', $context, $blocks);
        // line 69
        if ( !twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "unslick", [], "any", false, false, true, 69)) {
            // line 70
            echo "</div>
    ";
            // line 71
            $this->displayBlock('slick_arrow', $context, $blocks);
        }
        // line 85
        echo "</div>
";
        $this->env->getExtension('\Drupal\Core\Template\TwigExtension')
            ->checkDeprecations($context, ["settings", "arrow_down_attributes", "display", "blazies", "attributes", "content_attributes", "items", "arrow_attributes"]);    }

    // line 65
    public function block_slick_content($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 66
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["items"] ?? null), 66, $this->source), "html", null, true);
    }

    // line 71
    public function block_slick_arrow($context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 72
        echo "      <nav";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["arrow_attributes"] ?? null), "addClass", [($context["arrow_classes"] ?? null)], "method", false, false, true, 72), 72, $this->source), "html", null, true);
        echo ">
        <button type=\"button\" data-role=\"none\" class=\"slick-prev\" aria-label=\"";
        // line 73
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, twig_striptags(t($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "prevArrow", [], "any", false, false, true, 73), 73, $this->source))), "html", null, true);
        echo "\" tabindex=\"0\">";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "prevArrow", [], "any", false, false, true, 73), 73, $this->source)));
        echo "</button>
        ";
        // line 74
        if (array_key_exists("arrow_down_attributes", $context)) {
            // line 75
            echo "          <button";
            echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, twig_get_attribute($this->env, $this->source, ($context["arrow_down_attributes"] ?? null), "addClass", ["slick-down"], "method", false, false, true, 75), "setAttribute", ["type", "button"], "method", false, false, true, 75), "setAttribute", ["data-role", "none"], "method", false, false, true, 76), "setAttribute", ["data-target", twig_get_attribute($this->env, $this->source,             // line 78
($context["settings"] ?? null), "downArrowTarget", [], "any", false, false, true, 78)], "method", false, false, true, 77), "setAttribute", ["data-offset", twig_get_attribute($this->env, $this->source,             // line 79
($context["settings"] ?? null), "downArrowOffset", [], "any", false, false, true, 79)], "method", false, false, true, 78), 79, $this->source), "html", null, true);
            echo "></button>
        ";
        }
        // line 81
        echo "        <button type=\"button\" data-role=\"none\" class=\"slick-next\" aria-label=\"";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->escapeFilter($this->env, twig_striptags(t($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "nextArrow", [], "any", false, false, true, 81), 81, $this->source))), "html", null, true);
        echo "\" tabindex=\"0\">";
        echo $this->extensions['Drupal\Core\Template\TwigExtension']->renderVar(t($this->sandbox->ensureToStringAllowed(twig_get_attribute($this->env, $this->source, ($context["settings"] ?? null), "nextArrow", [], "any", false, false, true, 81), 81, $this->source)));
        echo "</button>
      </nav>
    ";
    }

    /**
     * @codeCoverageIgnore
     */
    public function getTemplateName()
    {
        return "modules/contrib/slick/templates/slick.html.twig";
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
        return array (  120 => 81,  115 => 79,  114 => 78,  112 => 75,  110 => 74,  104 => 73,  99 => 72,  95 => 71,  91 => 66,  87 => 65,  81 => 85,  78 => 71,  75 => 70,  73 => 69,  71 => 65,  66 => 62,  64 => 61,  60 => 60,  58 => 57,  57 => 56,  56 => 54,  54 => 50,  53 => 49,  52 => 48,  51 => 47,  50 => 46,  49 => 45,  48 => 44,  47 => 43,  46 => 42,  45 => 41,  44 => 40,  43 => 39,  42 => 38,  41 => 37,);
    }

    public function getSourceContext()
    {
        return new Source("", "modules/contrib/slick/templates/slick.html.twig", "/opt/drupal/web/modules/contrib/slick/templates/slick.html.twig");
    }
    
    public function checkSecurity()
    {
        static $tags = array("set" => 37, "if" => 61, "block" => 65);
        static $filters = array("join" => 40, "clean_class" => 41, "escape" => 60, "striptags" => 73, "t" => 73);
        static $functions = array();

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if', 'block'],
                ['join', 'clean_class', 'escape', 'striptags', 't'],
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
