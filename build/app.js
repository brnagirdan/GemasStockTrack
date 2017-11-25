webpackJsonp([1,2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(537);
	var app_component_1 = __webpack_require__(631);
	var http_1 = __webpack_require__(516);
	platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS]);


/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var common_1 = __webpack_require__(375);
	var compiler_1 = __webpack_require__(538);
	var core_1 = __webpack_require__(284);
	var platform_browser_1 = __webpack_require__(455);
	var core_private_1 = __webpack_require__(621);
	var async_1 = __webpack_require__(622);
	var lang_1 = __webpack_require__(623);
	var xhr_cache_1 = __webpack_require__(625);
	var xhr_impl_1 = __webpack_require__(630);
	/**
	 * @experimental
	 */
	exports.BROWSER_APP_COMPILER_PROVIDERS = [
	    compiler_1.COMPILER_PROVIDERS, {
	        provide: compiler_1.CompilerConfig,
	        useFactory: function (platformDirectives, platformPipes) {
	            return new compiler_1.CompilerConfig({ platformDirectives: platformDirectives, platformPipes: platformPipes });
	        },
	        deps: [core_1.PLATFORM_DIRECTIVES, core_1.PLATFORM_PIPES]
	    },
	    { provide: compiler_1.XHR, useClass: xhr_impl_1.XHRImpl },
	    { provide: core_1.PLATFORM_DIRECTIVES, useValue: common_1.COMMON_DIRECTIVES, multi: true },
	    { provide: core_1.PLATFORM_PIPES, useValue: common_1.COMMON_PIPES, multi: true }
	];
	/**
	 * @experimental
	 */
	exports.CACHED_TEMPLATE_PROVIDER = [{ provide: compiler_1.XHR, useClass: xhr_cache_1.CachedXHR }];
	/**
	 * Bootstrapping for Angular applications.
	 *
	 * You instantiate an Angular application by explicitly specifying a component to use
	 * as the root component for your application via the `bootstrap()` method.
	 *
	 * ## Simple Example
	 *
	 * Assuming this `index.html`:
	 *
	 * ```html
	 * <html>
	 *   <!-- load Angular script tags here. -->
	 *   <body>
	 *     <my-app>loading...</my-app>
	 *   </body>
	 * </html>
	 * ```
	 *
	 * An application is bootstrapped inside an existing browser DOM, typically `index.html`.
	 * Unlike Angular 1, Angular 2 does not compile/process providers in `index.html`. This is
	 * mainly for security reasons, as well as architectural changes in Angular 2. This means
	 * that `index.html` can safely be processed using server-side technologies such as
	 * providers. Bindings can thus use double-curly `{{ syntax }}` without collision from
	 * Angular 2 component double-curly `{{ syntax }}`.
	 *
	 * We can use this script code:
	 *
	 * {@example core/ts/bootstrap/bootstrap.ts region='bootstrap'}
	 *
	 * When the app developer invokes `bootstrap()` with the root component `MyApp` as its
	 * argument, Angular performs the following tasks:
	 *
	 *  1. It uses the component's `selector` property to locate the DOM element which needs
	 *     to be upgraded into the angular component.
	 *  2. It creates a new child injector (from the platform injector). Optionally, you can
	 *     also override the injector configuration for an app by invoking `bootstrap` with the
	 *     `componentInjectableBindings` argument.
	 *  3. It creates a new `Zone` and connects it to the angular application's change detection
	 *     domain instance.
	 *  4. It creates an emulated or shadow DOM on the selected component's host element and loads the
	 *     template into it.
	 *  5. It instantiates the specified component.
	 *  6. Finally, Angular performs change detection to apply the initial data providers for the
	 *     application.
	 *
	 *
	 * ## Bootstrapping Multiple Applications
	 *
	 * When working within a browser window, there are many singleton resources: cookies, title,
	 * location, and others. Angular services that represent these resources must likewise be
	 * shared across all Angular applications that occupy the same browser window. For this
	 * reason, Angular creates exactly one global platform object which stores all shared
	 * services, and each angular application injector has the platform injector as its parent.
	 *
	 * Each application has its own private injector as well. When there are multiple
	 * applications on a page, Angular treats each application injector's services as private
	 * to that application.
	 *
	 * ## API
	 *
	 * - `appComponentType`: The root component which should act as the application. This is
	 *   a reference to a `Type` which is annotated with `@Component(...)`.
	 * - `customProviders`: An additional set of providers that can be added to the
	 *   app injector to override default injection behavior.
	 *
	 * Returns a `Promise` of {@link ComponentRef}.
	 *
	 * @experimental This api cannot be used with the offline compiler and thus is still subject to
	 * change.
	 */
	function bootstrap(appComponentType, customProviders) {
	    core_private_1.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
	    var providers = [
	        platform_browser_1.BROWSER_APP_PROVIDERS, exports.BROWSER_APP_COMPILER_PROVIDERS,
	        lang_1.isPresent(customProviders) ? customProviders : []
	    ];
	    var appInjector = core_1.ReflectiveInjector.resolveAndCreate(providers, platform_browser_1.browserPlatform().injector);
	    return core_1.coreLoadAndBootstrap(appComponentType, appInjector);
	}
	exports.bootstrap = bootstrap;
	/**
	 * @experimental
	 */
	function bootstrapWorkerUi(workerScriptUri, customProviders) {
	    var app = core_1.ReflectiveInjector.resolveAndCreate([
	        platform_browser_1.WORKER_UI_APPLICATION_PROVIDERS, exports.BROWSER_APP_COMPILER_PROVIDERS,
	        { provide: platform_browser_1.WORKER_SCRIPT, useValue: workerScriptUri },
	        lang_1.isPresent(customProviders) ? customProviders : []
	    ], platform_browser_1.workerUiPlatform().injector);
	    // Return a promise so that we keep the same semantics as Dart,
	    // and we might want to wait for the app side to come up
	    // in the future...
	    return async_1.PromiseWrapper.resolve(app.get(core_1.ApplicationRef));
	}
	exports.bootstrapWorkerUi = bootstrapWorkerUi;
	/**
	 * @experimental
	 */
	var WORKER_APP_COMPILER_PROVIDERS = [
	    compiler_1.COMPILER_PROVIDERS, {
	        provide: compiler_1.CompilerConfig,
	        useFactory: function (platformDirectives, platformPipes) {
	            return new compiler_1.CompilerConfig({ platformDirectives: platformDirectives, platformPipes: platformPipes });
	        },
	        deps: [core_1.PLATFORM_DIRECTIVES, core_1.PLATFORM_PIPES]
	    },
	    { provide: compiler_1.XHR, useClass: xhr_impl_1.XHRImpl },
	    { provide: core_1.PLATFORM_DIRECTIVES, useValue: common_1.COMMON_DIRECTIVES, multi: true },
	    { provide: core_1.PLATFORM_PIPES, useValue: common_1.COMMON_PIPES, multi: true }
	];
	/**
	 * @experimental
	 */
	function bootstrapWorkerApp(appComponentType, customProviders) {
	    var appInjector = core_1.ReflectiveInjector.resolveAndCreate([
	        platform_browser_1.WORKER_APP_APPLICATION_PROVIDERS, WORKER_APP_COMPILER_PROVIDERS,
	        lang_1.isPresent(customProviders) ? customProviders : []
	    ], platform_browser_1.workerAppPlatform().injector);
	    return core_1.coreLoadAndBootstrap(appComponentType, appInjector);
	}
	exports.bootstrapWorkerApp = bootstrapWorkerApp;
	//# sourceMappingURL=index.js.map

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(539));
	//# sourceMappingURL=index.js.map

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	/**
	 * @module
	 * @description
	 * Starting point to import all compiler APIs.
	 */
	var compiler_1 = __webpack_require__(540);
	exports.COMPILER_PROVIDERS = compiler_1.COMPILER_PROVIDERS;
	exports.CompileDiDependencyMetadata = compiler_1.CompileDiDependencyMetadata;
	exports.CompileDirectiveMetadata = compiler_1.CompileDirectiveMetadata;
	exports.CompileFactoryMetadata = compiler_1.CompileFactoryMetadata;
	exports.CompileIdentifierMetadata = compiler_1.CompileIdentifierMetadata;
	exports.CompileMetadataWithIdentifier = compiler_1.CompileMetadataWithIdentifier;
	exports.CompileMetadataWithType = compiler_1.CompileMetadataWithType;
	exports.CompilePipeMetadata = compiler_1.CompilePipeMetadata;
	exports.CompileProviderMetadata = compiler_1.CompileProviderMetadata;
	exports.CompileQueryMetadata = compiler_1.CompileQueryMetadata;
	exports.CompileTemplateMetadata = compiler_1.CompileTemplateMetadata;
	exports.CompileTokenMetadata = compiler_1.CompileTokenMetadata;
	exports.CompileTypeMetadata = compiler_1.CompileTypeMetadata;
	exports.CompilerConfig = compiler_1.CompilerConfig;
	exports.DEFAULT_PACKAGE_URL_PROVIDER = compiler_1.DEFAULT_PACKAGE_URL_PROVIDER;
	exports.DirectiveResolver = compiler_1.DirectiveResolver;
	exports.NormalizedComponentWithViewDirectives = compiler_1.NormalizedComponentWithViewDirectives;
	exports.OfflineCompiler = compiler_1.OfflineCompiler;
	exports.PipeResolver = compiler_1.PipeResolver;
	exports.RenderTypes = compiler_1.RenderTypes;
	exports.RuntimeCompiler = compiler_1.RuntimeCompiler;
	exports.SourceModule = compiler_1.SourceModule;
	exports.TEMPLATE_TRANSFORMS = compiler_1.TEMPLATE_TRANSFORMS;
	exports.UrlResolver = compiler_1.UrlResolver;
	exports.ViewResolver = compiler_1.ViewResolver;
	exports.XHR = compiler_1.XHR;
	exports.createOfflineCompileUrlResolver = compiler_1.createOfflineCompileUrlResolver;
	var element_schema_registry_1 = __webpack_require__(560);
	exports.ElementSchemaRegistry = element_schema_registry_1.ElementSchemaRegistry;
	__export(__webpack_require__(541));
	__export(__webpack_require__(613));
	//# sourceMappingURL=compiler.js.map

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var core_1 = __webpack_require__(284);
	__export(__webpack_require__(541));
	var template_parser_1 = __webpack_require__(543);
	exports.TEMPLATE_TRANSFORMS = template_parser_1.TEMPLATE_TRANSFORMS;
	var config_1 = __webpack_require__(568);
	exports.CompilerConfig = config_1.CompilerConfig;
	exports.RenderTypes = config_1.RenderTypes;
	__export(__webpack_require__(565));
	__export(__webpack_require__(569));
	var runtime_compiler_1 = __webpack_require__(591);
	exports.RuntimeCompiler = runtime_compiler_1.RuntimeCompiler;
	__export(__webpack_require__(566));
	__export(__webpack_require__(597));
	var view_resolver_1 = __webpack_require__(603);
	exports.ViewResolver = view_resolver_1.ViewResolver;
	var directive_resolver_1 = __webpack_require__(601);
	exports.DirectiveResolver = directive_resolver_1.DirectiveResolver;
	var pipe_resolver_1 = __webpack_require__(602);
	exports.PipeResolver = pipe_resolver_1.PipeResolver;
	var template_parser_2 = __webpack_require__(543);
	var html_parser_1 = __webpack_require__(554);
	var directive_normalizer_1 = __webpack_require__(596);
	var metadata_resolver_1 = __webpack_require__(598);
	var style_compiler_1 = __webpack_require__(594);
	var view_compiler_1 = __webpack_require__(571);
	var config_2 = __webpack_require__(568);
	var runtime_compiler_2 = __webpack_require__(591);
	var element_schema_registry_1 = __webpack_require__(560);
	var dom_element_schema_registry_1 = __webpack_require__(611);
	var url_resolver_2 = __webpack_require__(566);
	var parser_1 = __webpack_require__(550);
	var lexer_1 = __webpack_require__(553);
	var view_resolver_2 = __webpack_require__(603);
	var directive_resolver_2 = __webpack_require__(601);
	var pipe_resolver_2 = __webpack_require__(602);
	/**
	 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
	 * template compilation.
	 */
	exports.COMPILER_PROVIDERS = 
	/*@ts2dart_const*/ [
	    lexer_1.Lexer, parser_1.Parser, html_parser_1.HtmlParser, template_parser_2.TemplateParser, directive_normalizer_1.DirectiveNormalizer, metadata_resolver_1.CompileMetadataResolver,
	    url_resolver_2.DEFAULT_PACKAGE_URL_PROVIDER, style_compiler_1.StyleCompiler, view_compiler_1.ViewCompiler,
	    /*@ts2dart_Provider*/ { provide: config_2.CompilerConfig, useValue: new config_2.CompilerConfig() },
	    runtime_compiler_2.RuntimeCompiler,
	    /*@ts2dart_Provider*/ { provide: core_1.ComponentResolver, useExisting: runtime_compiler_2.RuntimeCompiler },
	    /*@ts2dart_Provider*/ { provide: core_1.Compiler, useExisting: runtime_compiler_2.RuntimeCompiler },
	    dom_element_schema_registry_1.DomElementSchemaRegistry,
	    /*@ts2dart_Provider*/ { provide: element_schema_registry_1.ElementSchemaRegistry, useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry },
	    url_resolver_2.UrlResolver, view_resolver_2.ViewResolver, directive_resolver_2.DirectiveResolver, pipe_resolver_2.PipeResolver
	];
	//# sourceMappingURL=compiler.js.map

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	/**
	 * A segment of text within the template.
	 */
	var TextAst = (function () {
	    function TextAst(value, ngContentIndex, sourceSpan) {
	        this.value = value;
	        this.ngContentIndex = ngContentIndex;
	        this.sourceSpan = sourceSpan;
	    }
	    TextAst.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
	    return TextAst;
	}());
	exports.TextAst = TextAst;
	/**
	 * A bound expression within the text of a template.
	 */
	var BoundTextAst = (function () {
	    function BoundTextAst(value, ngContentIndex, sourceSpan) {
	        this.value = value;
	        this.ngContentIndex = ngContentIndex;
	        this.sourceSpan = sourceSpan;
	    }
	    BoundTextAst.prototype.visit = function (visitor, context) {
	        return visitor.visitBoundText(this, context);
	    };
	    return BoundTextAst;
	}());
	exports.BoundTextAst = BoundTextAst;
	/**
	 * A plain attribute on an element.
	 */
	var AttrAst = (function () {
	    function AttrAst(name, value, sourceSpan) {
	        this.name = name;
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    AttrAst.prototype.visit = function (visitor, context) { return visitor.visitAttr(this, context); };
	    return AttrAst;
	}());
	exports.AttrAst = AttrAst;
	/**
	 * A binding for an element property (e.g. `[property]="expression"`).
	 */
	var BoundElementPropertyAst = (function () {
	    function BoundElementPropertyAst(name, type, securityContext, value, unit, sourceSpan) {
	        this.name = name;
	        this.type = type;
	        this.securityContext = securityContext;
	        this.value = value;
	        this.unit = unit;
	        this.sourceSpan = sourceSpan;
	    }
	    BoundElementPropertyAst.prototype.visit = function (visitor, context) {
	        return visitor.visitElementProperty(this, context);
	    };
	    return BoundElementPropertyAst;
	}());
	exports.BoundElementPropertyAst = BoundElementPropertyAst;
	/**
	 * A binding for an element event (e.g. `(event)="handler()"`).
	 */
	var BoundEventAst = (function () {
	    function BoundEventAst(name, target, handler, sourceSpan) {
	        this.name = name;
	        this.target = target;
	        this.handler = handler;
	        this.sourceSpan = sourceSpan;
	    }
	    BoundEventAst.prototype.visit = function (visitor, context) {
	        return visitor.visitEvent(this, context);
	    };
	    Object.defineProperty(BoundEventAst.prototype, "fullName", {
	        get: function () {
	            if (lang_1.isPresent(this.target)) {
	                return this.target + ":" + this.name;
	            }
	            else {
	                return this.name;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return BoundEventAst;
	}());
	exports.BoundEventAst = BoundEventAst;
	/**
	 * A reference declaration on an element (e.g. `let someName="expression"`).
	 */
	var ReferenceAst = (function () {
	    function ReferenceAst(name, value, sourceSpan) {
	        this.name = name;
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    ReferenceAst.prototype.visit = function (visitor, context) {
	        return visitor.visitReference(this, context);
	    };
	    return ReferenceAst;
	}());
	exports.ReferenceAst = ReferenceAst;
	/**
	 * A variable declaration on a <template> (e.g. `var-someName="someLocalName"`).
	 */
	var VariableAst = (function () {
	    function VariableAst(name, value, sourceSpan) {
	        this.name = name;
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    VariableAst.prototype.visit = function (visitor, context) {
	        return visitor.visitVariable(this, context);
	    };
	    return VariableAst;
	}());
	exports.VariableAst = VariableAst;
	/**
	 * An element declaration in a template.
	 */
	var ElementAst = (function () {
	    function ElementAst(name, attrs, inputs, outputs, references, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
	        this.name = name;
	        this.attrs = attrs;
	        this.inputs = inputs;
	        this.outputs = outputs;
	        this.references = references;
	        this.directives = directives;
	        this.providers = providers;
	        this.hasViewContainer = hasViewContainer;
	        this.children = children;
	        this.ngContentIndex = ngContentIndex;
	        this.sourceSpan = sourceSpan;
	    }
	    ElementAst.prototype.visit = function (visitor, context) {
	        return visitor.visitElement(this, context);
	    };
	    return ElementAst;
	}());
	exports.ElementAst = ElementAst;
	/**
	 * A `<template>` element included in an Angular template.
	 */
	var EmbeddedTemplateAst = (function () {
	    function EmbeddedTemplateAst(attrs, outputs, references, variables, directives, providers, hasViewContainer, children, ngContentIndex, sourceSpan) {
	        this.attrs = attrs;
	        this.outputs = outputs;
	        this.references = references;
	        this.variables = variables;
	        this.directives = directives;
	        this.providers = providers;
	        this.hasViewContainer = hasViewContainer;
	        this.children = children;
	        this.ngContentIndex = ngContentIndex;
	        this.sourceSpan = sourceSpan;
	    }
	    EmbeddedTemplateAst.prototype.visit = function (visitor, context) {
	        return visitor.visitEmbeddedTemplate(this, context);
	    };
	    return EmbeddedTemplateAst;
	}());
	exports.EmbeddedTemplateAst = EmbeddedTemplateAst;
	/**
	 * A directive property with a bound value (e.g. `*ngIf="condition").
	 */
	var BoundDirectivePropertyAst = (function () {
	    function BoundDirectivePropertyAst(directiveName, templateName, value, sourceSpan) {
	        this.directiveName = directiveName;
	        this.templateName = templateName;
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    BoundDirectivePropertyAst.prototype.visit = function (visitor, context) {
	        return visitor.visitDirectiveProperty(this, context);
	    };
	    return BoundDirectivePropertyAst;
	}());
	exports.BoundDirectivePropertyAst = BoundDirectivePropertyAst;
	/**
	 * A directive declared on an element.
	 */
	var DirectiveAst = (function () {
	    function DirectiveAst(directive, inputs, hostProperties, hostEvents, sourceSpan) {
	        this.directive = directive;
	        this.inputs = inputs;
	        this.hostProperties = hostProperties;
	        this.hostEvents = hostEvents;
	        this.sourceSpan = sourceSpan;
	    }
	    DirectiveAst.prototype.visit = function (visitor, context) {
	        return visitor.visitDirective(this, context);
	    };
	    return DirectiveAst;
	}());
	exports.DirectiveAst = DirectiveAst;
	/**
	 * A provider declared on an element
	 */
	var ProviderAst = (function () {
	    function ProviderAst(token, multiProvider, eager, providers, providerType, sourceSpan) {
	        this.token = token;
	        this.multiProvider = multiProvider;
	        this.eager = eager;
	        this.providers = providers;
	        this.providerType = providerType;
	        this.sourceSpan = sourceSpan;
	    }
	    ProviderAst.prototype.visit = function (visitor, context) {
	        // No visit method in the visitor for now...
	        return null;
	    };
	    return ProviderAst;
	}());
	exports.ProviderAst = ProviderAst;
	(function (ProviderAstType) {
	    ProviderAstType[ProviderAstType["PublicService"] = 0] = "PublicService";
	    ProviderAstType[ProviderAstType["PrivateService"] = 1] = "PrivateService";
	    ProviderAstType[ProviderAstType["Component"] = 2] = "Component";
	    ProviderAstType[ProviderAstType["Directive"] = 3] = "Directive";
	    ProviderAstType[ProviderAstType["Builtin"] = 4] = "Builtin";
	})(exports.ProviderAstType || (exports.ProviderAstType = {}));
	var ProviderAstType = exports.ProviderAstType;
	/**
	 * Position where content is to be projected (instance of `<ng-content>` in a template).
	 */
	var NgContentAst = (function () {
	    function NgContentAst(index, ngContentIndex, sourceSpan) {
	        this.index = index;
	        this.ngContentIndex = ngContentIndex;
	        this.sourceSpan = sourceSpan;
	    }
	    NgContentAst.prototype.visit = function (visitor, context) {
	        return visitor.visitNgContent(this, context);
	    };
	    return NgContentAst;
	}());
	exports.NgContentAst = NgContentAst;
	/**
	 * Enumeration of types of property bindings.
	 */
	(function (PropertyBindingType) {
	    /**
	     * A normal binding to a property (e.g. `[property]="expression"`).
	     */
	    PropertyBindingType[PropertyBindingType["Property"] = 0] = "Property";
	    /**
	     * A binding to an element attribute (e.g. `[attr.name]="expression"`).
	     */
	    PropertyBindingType[PropertyBindingType["Attribute"] = 1] = "Attribute";
	    /**
	     * A binding to a CSS class (e.g. `[class.name]="condition"`).
	     */
	    PropertyBindingType[PropertyBindingType["Class"] = 2] = "Class";
	    /**
	     * A binding to a style rule (e.g. `[style.rule]="expression"`).
	     */
	    PropertyBindingType[PropertyBindingType["Style"] = 3] = "Style";
	    /**
	     * A binding to an animation reference (e.g. `[animate.key]="expression"`).
	     */
	    PropertyBindingType[PropertyBindingType["Animation"] = 4] = "Animation";
	})(exports.PropertyBindingType || (exports.PropertyBindingType = {}));
	var PropertyBindingType = exports.PropertyBindingType;
	/**
	 * Visit every node in a list of {@link TemplateAst}s with the given {@link TemplateAstVisitor}.
	 */
	function templateVisitAll(visitor, asts, context) {
	    if (context === void 0) { context = null; }
	    var result = [];
	    asts.forEach(function (ast) {
	        var astResult = ast.visit(visitor, context);
	        if (lang_1.isPresent(astResult)) {
	            result.push(astResult);
	        }
	    });
	    return result;
	}
	exports.templateVisitAll = templateVisitAll;
	//# sourceMappingURL=template_ast.js.map

/***/ }),

/***/ 542:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var globalScope;
	if (typeof window === 'undefined') {
	    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
	        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
	        globalScope = self;
	    }
	    else {
	        globalScope = global;
	    }
	}
	else {
	    globalScope = window;
	}
	function scheduleMicroTask(fn) {
	    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
	}
	exports.scheduleMicroTask = scheduleMicroTask;
	exports.IS_DART = false;
	// Need to declare a new variable for global here since TypeScript
	// exports the original value of the symbol.
	var _global = globalScope;
	exports.global = _global;
	/**
	 * Runtime representation a type that a Component or other object is instances of.
	 *
	 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
	 * the `MyCustomComponent` constructor function.
	 *
	 * @stable
	 */
	exports.Type = Function;
	function getTypeNameForDebugging(type) {
	    if (type['name']) {
	        return type['name'];
	    }
	    return typeof type;
	}
	exports.getTypeNameForDebugging = getTypeNameForDebugging;
	exports.Math = _global.Math;
	exports.Date = _global.Date;
	// TODO: remove calls to assert in production environment
	// Note: Can't just export this and import in in other files
	// as `assert` is a reserved keyword in Dart
	_global.assert = function assert(condition) {
	    // TODO: to be fixed properly via #2830, noop for now
	};
	function isPresent(obj) {
	    return obj !== undefined && obj !== null;
	}
	exports.isPresent = isPresent;
	function isBlank(obj) {
	    return obj === undefined || obj === null;
	}
	exports.isBlank = isBlank;
	function isBoolean(obj) {
	    return typeof obj === 'boolean';
	}
	exports.isBoolean = isBoolean;
	function isNumber(obj) {
	    return typeof obj === 'number';
	}
	exports.isNumber = isNumber;
	function isString(obj) {
	    return typeof obj === 'string';
	}
	exports.isString = isString;
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	exports.isFunction = isFunction;
	function isType(obj) {
	    return isFunction(obj);
	}
	exports.isType = isType;
	function isStringMap(obj) {
	    return typeof obj === 'object' && obj !== null;
	}
	exports.isStringMap = isStringMap;
	var STRING_MAP_PROTO = Object.getPrototypeOf({});
	function isStrictStringMap(obj) {
	    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
	}
	exports.isStrictStringMap = isStrictStringMap;
	function isPromise(obj) {
	    return obj instanceof _global.Promise;
	}
	exports.isPromise = isPromise;
	function isArray(obj) {
	    return Array.isArray(obj);
	}
	exports.isArray = isArray;
	function isDate(obj) {
	    return obj instanceof exports.Date && !isNaN(obj.valueOf());
	}
	exports.isDate = isDate;
	function noop() { }
	exports.noop = noop;
	function stringify(token) {
	    if (typeof token === 'string') {
	        return token;
	    }
	    if (token === undefined || token === null) {
	        return '' + token;
	    }
	    if (token.name) {
	        return token.name;
	    }
	    if (token.overriddenName) {
	        return token.overriddenName;
	    }
	    var res = token.toString();
	    var newLineIndex = res.indexOf('\n');
	    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
	}
	exports.stringify = stringify;
	// serialize / deserialize enum exist only for consistency with dart API
	// enums in typescript don't need to be serialized
	function serializeEnum(val) {
	    return val;
	}
	exports.serializeEnum = serializeEnum;
	function deserializeEnum(val, values) {
	    return val;
	}
	exports.deserializeEnum = deserializeEnum;
	function resolveEnumToken(enumValue, val) {
	    return enumValue[val];
	}
	exports.resolveEnumToken = resolveEnumToken;
	var StringWrapper = (function () {
	    function StringWrapper() {
	    }
	    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
	    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
	    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
	    StringWrapper.equals = function (s, s2) { return s === s2; };
	    StringWrapper.stripLeft = function (s, charVal) {
	        if (s && s.length) {
	            var pos = 0;
	            for (var i = 0; i < s.length; i++) {
	                if (s[i] != charVal)
	                    break;
	                pos++;
	            }
	            s = s.substring(pos);
	        }
	        return s;
	    };
	    StringWrapper.stripRight = function (s, charVal) {
	        if (s && s.length) {
	            var pos = s.length;
	            for (var i = s.length - 1; i >= 0; i--) {
	                if (s[i] != charVal)
	                    break;
	                pos--;
	            }
	            s = s.substring(0, pos);
	        }
	        return s;
	    };
	    StringWrapper.replace = function (s, from, replace) {
	        return s.replace(from, replace);
	    };
	    StringWrapper.replaceAll = function (s, from, replace) {
	        return s.replace(from, replace);
	    };
	    StringWrapper.slice = function (s, from, to) {
	        if (from === void 0) { from = 0; }
	        if (to === void 0) { to = null; }
	        return s.slice(from, to === null ? undefined : to);
	    };
	    StringWrapper.replaceAllMapped = function (s, from, cb) {
	        return s.replace(from, function () {
	            var matches = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                matches[_i - 0] = arguments[_i];
	            }
	            // Remove offset & string from the result array
	            matches.splice(-2, 2);
	            // The callback receives match, p1, ..., pn
	            return cb(matches);
	        });
	    };
	    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
	    StringWrapper.compare = function (a, b) {
	        if (a < b) {
	            return -1;
	        }
	        else if (a > b) {
	            return 1;
	        }
	        else {
	            return 0;
	        }
	    };
	    return StringWrapper;
	}());
	exports.StringWrapper = StringWrapper;
	var StringJoiner = (function () {
	    function StringJoiner(parts) {
	        if (parts === void 0) { parts = []; }
	        this.parts = parts;
	    }
	    StringJoiner.prototype.add = function (part) { this.parts.push(part); };
	    StringJoiner.prototype.toString = function () { return this.parts.join(''); };
	    return StringJoiner;
	}());
	exports.StringJoiner = StringJoiner;
	var NumberParseError = (function (_super) {
	    __extends(NumberParseError, _super);
	    function NumberParseError(message) {
	        _super.call(this);
	        this.message = message;
	    }
	    NumberParseError.prototype.toString = function () { return this.message; };
	    return NumberParseError;
	}(Error));
	exports.NumberParseError = NumberParseError;
	var NumberWrapper = (function () {
	    function NumberWrapper() {
	    }
	    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
	    NumberWrapper.equal = function (a, b) { return a === b; };
	    NumberWrapper.parseIntAutoRadix = function (text) {
	        var result = parseInt(text);
	        if (isNaN(result)) {
	            throw new NumberParseError('Invalid integer literal when parsing ' + text);
	        }
	        return result;
	    };
	    NumberWrapper.parseInt = function (text, radix) {
	        if (radix == 10) {
	            if (/^(\-|\+)?[0-9]+$/.test(text)) {
	                return parseInt(text, radix);
	            }
	        }
	        else if (radix == 16) {
	            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
	                return parseInt(text, radix);
	            }
	        }
	        else {
	            var result = parseInt(text, radix);
	            if (!isNaN(result)) {
	                return result;
	            }
	        }
	        throw new NumberParseError('Invalid integer literal when parsing ' + text + ' in base ' + radix);
	    };
	    // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
	    NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
	    Object.defineProperty(NumberWrapper, "NaN", {
	        get: function () { return NaN; },
	        enumerable: true,
	        configurable: true
	    });
	    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
	    NumberWrapper.isNaN = function (value) { return isNaN(value); };
	    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
	    return NumberWrapper;
	}());
	exports.NumberWrapper = NumberWrapper;
	exports.RegExp = _global.RegExp;
	var RegExpWrapper = (function () {
	    function RegExpWrapper() {
	    }
	    RegExpWrapper.create = function (regExpStr, flags) {
	        if (flags === void 0) { flags = ''; }
	        flags = flags.replace(/g/g, '');
	        return new _global.RegExp(regExpStr, flags + 'g');
	    };
	    RegExpWrapper.firstMatch = function (regExp, input) {
	        // Reset multimatch regex state
	        regExp.lastIndex = 0;
	        return regExp.exec(input);
	    };
	    RegExpWrapper.test = function (regExp, input) {
	        regExp.lastIndex = 0;
	        return regExp.test(input);
	    };
	    RegExpWrapper.matcher = function (regExp, input) {
	        // Reset regex state for the case
	        // someone did not loop over all matches
	        // last time.
	        regExp.lastIndex = 0;
	        return { re: regExp, input: input };
	    };
	    RegExpWrapper.replaceAll = function (regExp, input, replace) {
	        var c = regExp.exec(input);
	        var res = '';
	        regExp.lastIndex = 0;
	        var prev = 0;
	        while (c) {
	            res += input.substring(prev, c.index);
	            res += replace(c);
	            prev = c.index + c[0].length;
	            regExp.lastIndex = prev;
	            c = regExp.exec(input);
	        }
	        res += input.substring(prev);
	        return res;
	    };
	    return RegExpWrapper;
	}());
	exports.RegExpWrapper = RegExpWrapper;
	var RegExpMatcherWrapper = (function () {
	    function RegExpMatcherWrapper() {
	    }
	    RegExpMatcherWrapper.next = function (matcher) {
	        return matcher.re.exec(matcher.input);
	    };
	    return RegExpMatcherWrapper;
	}());
	exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
	var FunctionWrapper = (function () {
	    function FunctionWrapper() {
	    }
	    FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
	    FunctionWrapper.bind = function (fn, scope) { return fn.bind(scope); };
	    return FunctionWrapper;
	}());
	exports.FunctionWrapper = FunctionWrapper;
	// JS has NaN !== NaN
	function looseIdentical(a, b) {
	    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
	}
	exports.looseIdentical = looseIdentical;
	// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
	// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
	function getMapKey(value) {
	    return value;
	}
	exports.getMapKey = getMapKey;
	function normalizeBlank(obj) {
	    return isBlank(obj) ? null : obj;
	}
	exports.normalizeBlank = normalizeBlank;
	function normalizeBool(obj) {
	    return isBlank(obj) ? false : obj;
	}
	exports.normalizeBool = normalizeBool;
	function isJsObject(o) {
	    return o !== null && (typeof o === 'function' || typeof o === 'object');
	}
	exports.isJsObject = isJsObject;
	function print(obj) {
	    console.log(obj);
	}
	exports.print = print;
	function warn(obj) {
	    console.warn(obj);
	}
	exports.warn = warn;
	// Can't be all uppercase as our transpiler would think it is a special directive...
	var Json = (function () {
	    function Json() {
	    }
	    Json.parse = function (s) { return _global.JSON.parse(s); };
	    Json.stringify = function (data) {
	        // Dart doesn't take 3 arguments
	        return _global.JSON.stringify(data, null, 2);
	    };
	    return Json;
	}());
	exports.Json = Json;
	var DateWrapper = (function () {
	    function DateWrapper() {
	    }
	    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
	        if (month === void 0) { month = 1; }
	        if (day === void 0) { day = 1; }
	        if (hour === void 0) { hour = 0; }
	        if (minutes === void 0) { minutes = 0; }
	        if (seconds === void 0) { seconds = 0; }
	        if (milliseconds === void 0) { milliseconds = 0; }
	        return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
	    };
	    DateWrapper.fromISOString = function (str) { return new exports.Date(str); };
	    DateWrapper.fromMillis = function (ms) { return new exports.Date(ms); };
	    DateWrapper.toMillis = function (date) { return date.getTime(); };
	    DateWrapper.now = function () { return new exports.Date(); };
	    DateWrapper.toJson = function (date) { return date.toJSON(); };
	    return DateWrapper;
	}());
	exports.DateWrapper = DateWrapper;
	function setValueOnPath(global, path, value) {
	    var parts = path.split('.');
	    var obj = global;
	    while (parts.length > 1) {
	        var name = parts.shift();
	        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
	            obj = obj[name];
	        }
	        else {
	            obj = obj[name] = {};
	        }
	    }
	    if (obj === undefined || obj === null) {
	        obj = {};
	    }
	    obj[parts.shift()] = value;
	}
	exports.setValueOnPath = setValueOnPath;
	var _symbolIterator = null;
	function getSymbolIterator() {
	    if (isBlank(_symbolIterator)) {
	        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
	            _symbolIterator = Symbol.iterator;
	        }
	        else {
	            // es6-shim specific logic
	            var keys = Object.getOwnPropertyNames(Map.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (key !== 'entries' && key !== 'size' &&
	                    Map.prototype[key] === Map.prototype['entries']) {
	                    _symbolIterator = key;
	                }
	            }
	        }
	    }
	    return _symbolIterator;
	}
	exports.getSymbolIterator = getSymbolIterator;
	function evalExpression(sourceUrl, expr, declarations, vars) {
	    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
	    var fnArgNames = [];
	    var fnArgValues = [];
	    for (var argName in vars) {
	        fnArgNames.push(argName);
	        fnArgValues.push(vars[argName]);
	    }
	    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
	}
	exports.evalExpression = evalExpression;
	function isPrimitive(obj) {
	    return !isJsObject(obj);
	}
	exports.isPrimitive = isPrimitive;
	function hasConstructor(value, type) {
	    return value.constructor === type;
	}
	exports.hasConstructor = hasConstructor;
	function escape(s) {
	    return _global.encodeURI(s);
	}
	exports.escape = escape;
	function escapeRegExp(s) {
	    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}
	exports.escapeRegExp = escapeRegExp;
	//# sourceMappingURL=lang.js.map

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var exceptions_1 = __webpack_require__(546);
	var ast_1 = __webpack_require__(549);
	var parser_1 = __webpack_require__(550);
	var html_parser_1 = __webpack_require__(554);
	var html_tags_1 = __webpack_require__(557);
	var parse_util_1 = __webpack_require__(558);
	var template_ast_1 = __webpack_require__(541);
	var selector_1 = __webpack_require__(559);
	var element_schema_registry_1 = __webpack_require__(560);
	var template_preparser_1 = __webpack_require__(561);
	var style_url_resolver_1 = __webpack_require__(562);
	var html_ast_1 = __webpack_require__(555);
	var util_1 = __webpack_require__(563);
	var identifiers_1 = __webpack_require__(564);
	var provider_parser_1 = __webpack_require__(567);
	// Group 1 = "bind-"
	// Group 2 = "var-"
	// Group 3 = "let-"
	// Group 4 = "ref-/#"
	// Group 5 = "on-"
	// Group 6 = "bindon-"
	// Group 7 = "animate-/@"
	// Group 8 = the identifier after "bind-", "var-/#", or "on-"
	// Group 9 = identifier inside [()]
	// Group 10 = identifier inside []
	// Group 11 = identifier inside ()
	var BIND_NAME_REGEXP = /^(?:(?:(?:(bind-)|(var-)|(let-)|(ref-|#)|(on-)|(bindon-)|(animate-|@))(.+))|\[\(([^\)]+)\)\]|\[([^\]]+)\]|\(([^\)]+)\))$/g;
	var TEMPLATE_ELEMENT = 'template';
	var TEMPLATE_ATTR = 'template';
	var TEMPLATE_ATTR_PREFIX = '*';
	var CLASS_ATTR = 'class';
	var PROPERTY_PARTS_SEPARATOR = '.';
	var ATTRIBUTE_PREFIX = 'attr';
	var CLASS_PREFIX = 'class';
	var STYLE_PREFIX = 'style';
	var TEXT_CSS_SELECTOR = selector_1.CssSelector.parse('*')[0];
	/**
	 * Provides an array of {@link TemplateAstVisitor}s which will be used to transform
	 * parsed templates before compilation is invoked, allowing custom expression syntax
	 * and other advanced transformations.
	 *
	 * This is currently an internal-only feature and not meant for general use.
	 */
	exports.TEMPLATE_TRANSFORMS = new core_1.OpaqueToken('TemplateTransforms');
	var TemplateParseError = (function (_super) {
	    __extends(TemplateParseError, _super);
	    function TemplateParseError(message, span, level) {
	        _super.call(this, span, message, level);
	    }
	    return TemplateParseError;
	}(parse_util_1.ParseError));
	exports.TemplateParseError = TemplateParseError;
	var TemplateParseResult = (function () {
	    function TemplateParseResult(templateAst, errors) {
	        this.templateAst = templateAst;
	        this.errors = errors;
	    }
	    return TemplateParseResult;
	}());
	exports.TemplateParseResult = TemplateParseResult;
	var TemplateParser = (function () {
	    function TemplateParser(_exprParser, _schemaRegistry, _htmlParser, _console, transforms) {
	        this._exprParser = _exprParser;
	        this._schemaRegistry = _schemaRegistry;
	        this._htmlParser = _htmlParser;
	        this._console = _console;
	        this.transforms = transforms;
	    }
	    TemplateParser.prototype.parse = function (component, template, directives, pipes, templateUrl) {
	        var result = this.tryParse(component, template, directives, pipes, templateUrl);
	        var warnings = result.errors.filter(function (error) { return error.level === parse_util_1.ParseErrorLevel.WARNING; });
	        var errors = result.errors.filter(function (error) { return error.level === parse_util_1.ParseErrorLevel.FATAL; });
	        if (warnings.length > 0) {
	            this._console.warn("Template parse warnings:\n" + warnings.join('\n'));
	        }
	        if (errors.length > 0) {
	            var errorString = errors.join('\n');
	            throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
	        }
	        return result.templateAst;
	    };
	    TemplateParser.prototype.tryParse = function (component, template, directives, pipes, templateUrl) {
	        var htmlAstWithErrors = this._htmlParser.parse(template, templateUrl);
	        var errors = htmlAstWithErrors.errors;
	        var result;
	        if (htmlAstWithErrors.rootNodes.length > 0) {
	            var uniqDirectives = removeDuplicates(directives);
	            var uniqPipes = removeDuplicates(pipes);
	            var providerViewContext = new provider_parser_1.ProviderViewContext(component, htmlAstWithErrors.rootNodes[0].sourceSpan);
	            var parseVisitor = new TemplateParseVisitor(providerViewContext, uniqDirectives, uniqPipes, this._exprParser, this._schemaRegistry);
	            result = html_ast_1.htmlVisitAll(parseVisitor, htmlAstWithErrors.rootNodes, EMPTY_ELEMENT_CONTEXT);
	            errors = errors.concat(parseVisitor.errors).concat(providerViewContext.errors);
	        }
	        else {
	            result = [];
	        }
	        this._assertNoReferenceDuplicationOnTemplate(result, errors);
	        if (errors.length > 0) {
	            return new TemplateParseResult(result, errors);
	        }
	        if (lang_1.isPresent(this.transforms)) {
	            this.transforms.forEach(function (transform) { result = template_ast_1.templateVisitAll(transform, result); });
	        }
	        return new TemplateParseResult(result, errors);
	    };
	    /** @internal */
	    TemplateParser.prototype._assertNoReferenceDuplicationOnTemplate = function (result, errors) {
	        var existingReferences = [];
	        result.filter(function (element) { return !!element.references; })
	            .forEach(function (element) { return element.references.forEach(function (reference /** TODO #???? */) {
	            var name = reference.name;
	            if (existingReferences.indexOf(name) < 0) {
	                existingReferences.push(name);
	            }
	            else {
	                var error = new TemplateParseError("Reference \"#" + name + "\" is defined several times", reference.sourceSpan, parse_util_1.ParseErrorLevel.FATAL);
	                errors.push(error);
	            }
	        }); });
	    };
	    /** @nocollapse */
	    TemplateParser.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    TemplateParser.ctorParameters = [
	        { type: parser_1.Parser, },
	        { type: element_schema_registry_1.ElementSchemaRegistry, },
	        { type: html_parser_1.HtmlParser, },
	        { type: core_private_1.Console, },
	        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Inject, args: [exports.TEMPLATE_TRANSFORMS,] },] },
	    ];
	    return TemplateParser;
	}());
	exports.TemplateParser = TemplateParser;
	var TemplateParseVisitor = (function () {
	    function TemplateParseVisitor(providerViewContext, directives, pipes, _exprParser, _schemaRegistry) {
	        var _this = this;
	        this.providerViewContext = providerViewContext;
	        this._exprParser = _exprParser;
	        this._schemaRegistry = _schemaRegistry;
	        this.errors = [];
	        this.directivesIndex = new Map();
	        this.ngContentCount = 0;
	        this.selectorMatcher = new selector_1.SelectorMatcher();
	        var tempMeta = providerViewContext.component.template;
	        if (lang_1.isPresent(tempMeta) && lang_1.isPresent(tempMeta.interpolation)) {
	            this._interpolationConfig = {
	                start: tempMeta.interpolation[0],
	                end: tempMeta.interpolation[1]
	            };
	        }
	        collection_1.ListWrapper.forEachWithIndex(directives, function (directive, index) {
	            var selector = selector_1.CssSelector.parse(directive.selector);
	            _this.selectorMatcher.addSelectables(selector, directive);
	            _this.directivesIndex.set(directive, index);
	        });
	        this.pipesByName = new Map();
	        pipes.forEach(function (pipe) { return _this.pipesByName.set(pipe.name, pipe); });
	    }
	    TemplateParseVisitor.prototype._reportError = function (message, sourceSpan, level) {
	        if (level === void 0) { level = parse_util_1.ParseErrorLevel.FATAL; }
	        this.errors.push(new TemplateParseError(message, sourceSpan, level));
	    };
	    TemplateParseVisitor.prototype._parseInterpolation = function (value, sourceSpan) {
	        var sourceInfo = sourceSpan.start.toString();
	        try {
	            var ast = this._exprParser.parseInterpolation(value, sourceInfo, this._interpolationConfig);
	            this._checkPipes(ast, sourceSpan);
	            if (lang_1.isPresent(ast) &&
	                ast.ast.expressions.length > core_private_1.MAX_INTERPOLATION_VALUES) {
	                throw new exceptions_1.BaseException("Only support at most " + core_private_1.MAX_INTERPOLATION_VALUES + " interpolation values!");
	            }
	            return ast;
	        }
	        catch (e) {
	            this._reportError("" + e, sourceSpan);
	            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
	        }
	    };
	    TemplateParseVisitor.prototype._parseAction = function (value, sourceSpan) {
	        var sourceInfo = sourceSpan.start.toString();
	        try {
	            var ast = this._exprParser.parseAction(value, sourceInfo, this._interpolationConfig);
	            this._checkPipes(ast, sourceSpan);
	            return ast;
	        }
	        catch (e) {
	            this._reportError("" + e, sourceSpan);
	            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
	        }
	    };
	    TemplateParseVisitor.prototype._parseBinding = function (value, sourceSpan) {
	        var sourceInfo = sourceSpan.start.toString();
	        try {
	            var ast = this._exprParser.parseBinding(value, sourceInfo, this._interpolationConfig);
	            this._checkPipes(ast, sourceSpan);
	            return ast;
	        }
	        catch (e) {
	            this._reportError("" + e, sourceSpan);
	            return this._exprParser.wrapLiteralPrimitive('ERROR', sourceInfo);
	        }
	    };
	    TemplateParseVisitor.prototype._parseTemplateBindings = function (value, sourceSpan) {
	        var _this = this;
	        var sourceInfo = sourceSpan.start.toString();
	        try {
	            var bindingsResult = this._exprParser.parseTemplateBindings(value, sourceInfo);
	            bindingsResult.templateBindings.forEach(function (binding) {
	                if (lang_1.isPresent(binding.expression)) {
	                    _this._checkPipes(binding.expression, sourceSpan);
	                }
	            });
	            bindingsResult.warnings.forEach(function (warning) { _this._reportError(warning, sourceSpan, parse_util_1.ParseErrorLevel.WARNING); });
	            return bindingsResult.templateBindings;
	        }
	        catch (e) {
	            this._reportError("" + e, sourceSpan);
	            return [];
	        }
	    };
	    TemplateParseVisitor.prototype._checkPipes = function (ast, sourceSpan) {
	        var _this = this;
	        if (lang_1.isPresent(ast)) {
	            var collector = new PipeCollector();
	            ast.visit(collector);
	            collector.pipes.forEach(function (pipeName) {
	                if (!_this.pipesByName.has(pipeName)) {
	                    _this._reportError("The pipe '" + pipeName + "' could not be found", sourceSpan);
	                }
	            });
	        }
	    };
	    TemplateParseVisitor.prototype.visitExpansion = function (ast, context) { return null; };
	    TemplateParseVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
	    TemplateParseVisitor.prototype.visitText = function (ast, parent) {
	        var ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
	        var expr = this._parseInterpolation(ast.value, ast.sourceSpan);
	        if (lang_1.isPresent(expr)) {
	            return new template_ast_1.BoundTextAst(expr, ngContentIndex, ast.sourceSpan);
	        }
	        else {
	            return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
	        }
	    };
	    TemplateParseVisitor.prototype.visitAttr = function (ast, contex) {
	        return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
	    };
	    TemplateParseVisitor.prototype.visitComment = function (ast, context) { return null; };
	    TemplateParseVisitor.prototype.visitElement = function (element, parent) {
	        var _this = this;
	        var nodeName = element.name;
	        var preparsedElement = template_preparser_1.preparseElement(element);
	        if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
	            preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE) {
	            // Skipping <script> for security reasons
	            // Skipping <style> as we already processed them
	            // in the StyleCompiler
	            return null;
	        }
	        if (preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET &&
	            style_url_resolver_1.isStyleUrlResolvable(preparsedElement.hrefAttr)) {
	            // Skipping stylesheets with either relative urls or package scheme as we already processed
	            // them in the StyleCompiler
	            return null;
	        }
	        var matchableAttrs = [];
	        var elementOrDirectiveProps = [];
	        var elementOrDirectiveRefs = [];
	        var elementVars = [];
	        var animationProps = [];
	        var events = [];
	        var templateElementOrDirectiveProps = [];
	        var templateMatchableAttrs = [];
	        var templateElementVars = [];
	        var hasInlineTemplates = false;
	        var attrs = [];
	        var lcElName = html_tags_1.splitNsName(nodeName.toLowerCase())[1];
	        var isTemplateElement = lcElName == TEMPLATE_ELEMENT;
	        element.attrs.forEach(function (attr) {
	            var hasBinding = _this._parseAttr(isTemplateElement, attr, matchableAttrs, elementOrDirectiveProps, animationProps, events, elementOrDirectiveRefs, elementVars);
	            var hasTemplateBinding = _this._parseInlineTemplateBinding(attr, templateMatchableAttrs, templateElementOrDirectiveProps, templateElementVars);
	            if (hasTemplateBinding && hasInlineTemplates) {
	                _this._reportError("Can't have multiple template bindings on one element. Use only one attribute named 'template' or prefixed with *", attr.sourceSpan);
	            }
	            if (!hasBinding && !hasTemplateBinding) {
	                // don't include the bindings as attributes as well in the AST
	                attrs.push(_this.visitAttr(attr, null));
	                matchableAttrs.push([attr.name, attr.value]);
	            }
	            if (hasTemplateBinding) {
	                hasInlineTemplates = true;
	            }
	        });
	        var elementCssSelector = createElementCssSelector(nodeName, matchableAttrs);
	        var directiveMetas = this._parseDirectives(this.selectorMatcher, elementCssSelector);
	        var references = [];
	        var directiveAsts = this._createDirectiveAsts(isTemplateElement, element.name, directiveMetas, elementOrDirectiveProps, elementOrDirectiveRefs, element.sourceSpan, references);
	        var elementProps = this._createElementPropertyAsts(element.name, elementOrDirectiveProps, directiveAsts)
	            .concat(animationProps);
	        var isViewRoot = parent.isTemplateElement || hasInlineTemplates;
	        var providerContext = new provider_parser_1.ProviderElementContext(this.providerViewContext, parent.providerContext, isViewRoot, directiveAsts, attrs, references, element.sourceSpan);
	        var children = html_ast_1.htmlVisitAll(preparsedElement.nonBindable ? NON_BINDABLE_VISITOR : this, element.children, ElementContext.create(isTemplateElement, directiveAsts, isTemplateElement ? parent.providerContext : providerContext));
	        providerContext.afterElement();
	        // Override the actual selector when the `ngProjectAs` attribute is provided
	        var projectionSelector = lang_1.isPresent(preparsedElement.projectAs) ?
	            selector_1.CssSelector.parse(preparsedElement.projectAs)[0] :
	            elementCssSelector;
	        var ngContentIndex = parent.findNgContentIndex(projectionSelector);
	        var parsedElement;
	        if (preparsedElement.type === template_preparser_1.PreparsedElementType.NG_CONTENT) {
	            if (lang_1.isPresent(element.children) && element.children.length > 0) {
	                this._reportError("<ng-content> element cannot have content. <ng-content> must be immediately followed by </ng-content>", element.sourceSpan);
	            }
	            parsedElement = new template_ast_1.NgContentAst(this.ngContentCount++, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
	        }
	        else if (isTemplateElement) {
	            this._assertAllEventsPublishedByDirectives(directiveAsts, events);
	            this._assertNoComponentsNorElementBindingsOnTemplate(directiveAsts, elementProps, element.sourceSpan);
	            parsedElement = new template_ast_1.EmbeddedTemplateAst(attrs, events, references, elementVars, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex, element.sourceSpan);
	        }
	        else {
	            this._assertOnlyOneComponent(directiveAsts, element.sourceSpan);
	            var ngContentIndex_1 = hasInlineTemplates ? null : parent.findNgContentIndex(projectionSelector);
	            parsedElement = new template_ast_1.ElementAst(nodeName, attrs, elementProps, events, references, providerContext.transformedDirectiveAsts, providerContext.transformProviders, providerContext.transformedHasViewContainer, children, hasInlineTemplates ? null : ngContentIndex_1, element.sourceSpan);
	        }
	        if (hasInlineTemplates) {
	            var templateCssSelector = createElementCssSelector(TEMPLATE_ELEMENT, templateMatchableAttrs);
	            var templateDirectiveMetas = this._parseDirectives(this.selectorMatcher, templateCssSelector);
	            var templateDirectiveAsts = this._createDirectiveAsts(true, element.name, templateDirectiveMetas, templateElementOrDirectiveProps, [], element.sourceSpan, []);
	            var templateElementProps = this._createElementPropertyAsts(element.name, templateElementOrDirectiveProps, templateDirectiveAsts);
	            this._assertNoComponentsNorElementBindingsOnTemplate(templateDirectiveAsts, templateElementProps, element.sourceSpan);
	            var templateProviderContext = new provider_parser_1.ProviderElementContext(this.providerViewContext, parent.providerContext, parent.isTemplateElement, templateDirectiveAsts, [], [], element.sourceSpan);
	            templateProviderContext.afterElement();
	            parsedElement = new template_ast_1.EmbeddedTemplateAst([], [], [], templateElementVars, templateProviderContext.transformedDirectiveAsts, templateProviderContext.transformProviders, templateProviderContext.transformedHasViewContainer, [parsedElement], ngContentIndex, element.sourceSpan);
	        }
	        return parsedElement;
	    };
	    TemplateParseVisitor.prototype._parseInlineTemplateBinding = function (attr, targetMatchableAttrs, targetProps, targetVars) {
	        var templateBindingsSource = null;
	        if (attr.name == TEMPLATE_ATTR) {
	            templateBindingsSource = attr.value;
	        }
	        else if (attr.name.startsWith(TEMPLATE_ATTR_PREFIX)) {
	            var key = attr.name.substring(TEMPLATE_ATTR_PREFIX.length); // remove the star
	            templateBindingsSource = (attr.value.length == 0) ? key : key + ' ' + attr.value;
	        }
	        if (lang_1.isPresent(templateBindingsSource)) {
	            var bindings = this._parseTemplateBindings(templateBindingsSource, attr.sourceSpan);
	            for (var i = 0; i < bindings.length; i++) {
	                var binding = bindings[i];
	                if (binding.keyIsVar) {
	                    targetVars.push(new template_ast_1.VariableAst(binding.key, binding.name, attr.sourceSpan));
	                }
	                else if (lang_1.isPresent(binding.expression)) {
	                    this._parsePropertyAst(binding.key, binding.expression, attr.sourceSpan, targetMatchableAttrs, targetProps);
	                }
	                else {
	                    targetMatchableAttrs.push([binding.key, '']);
	                    this._parseLiteralAttr(binding.key, null, attr.sourceSpan, targetProps);
	                }
	            }
	            return true;
	        }
	        return false;
	    };
	    TemplateParseVisitor.prototype._parseAttr = function (isTemplateElement, attr, targetMatchableAttrs, targetProps, targetAnimationProps, targetEvents, targetRefs, targetVars) {
	        var attrName = this._normalizeAttributeName(attr.name);
	        var attrValue = attr.value;
	        var bindParts = lang_1.RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
	        var hasBinding = false;
	        if (lang_1.isPresent(bindParts)) {
	            hasBinding = true;
	            if (lang_1.isPresent(bindParts[1])) {
	                this._parseProperty(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
	            }
	            else if (lang_1.isPresent(bindParts[2])) {
	                var identifier = bindParts[8];
	                if (isTemplateElement) {
	                    this._reportError("\"var-\" on <template> elements is deprecated. Use \"let-\" instead!", attr.sourceSpan, parse_util_1.ParseErrorLevel.WARNING);
	                    this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
	                }
	                else {
	                    this._reportError("\"var-\" on non <template> elements is deprecated. Use \"ref-\" instead!", attr.sourceSpan, parse_util_1.ParseErrorLevel.WARNING);
	                    this._parseReference(identifier, attrValue, attr.sourceSpan, targetRefs);
	                }
	            }
	            else if (lang_1.isPresent(bindParts[3])) {
	                if (isTemplateElement) {
	                    var identifier = bindParts[8];
	                    this._parseVariable(identifier, attrValue, attr.sourceSpan, targetVars);
	                }
	                else {
	                    this._reportError("\"let-\" is only supported on template elements.", attr.sourceSpan);
	                }
	            }
	            else if (lang_1.isPresent(bindParts[4])) {
	                var identifier = bindParts[8];
	                this._parseReference(identifier, attrValue, attr.sourceSpan, targetRefs);
	            }
	            else if (lang_1.isPresent(bindParts[5])) {
	                this._parseEvent(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
	            }
	            else if (lang_1.isPresent(bindParts[6])) {
	                this._parseProperty(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
	                this._parseAssignmentEvent(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
	            }
	            else if (lang_1.isPresent(bindParts[7])) {
	                this._parseAnimation(bindParts[8], attrValue, attr.sourceSpan, targetMatchableAttrs, targetAnimationProps);
	            }
	            else if (lang_1.isPresent(bindParts[9])) {
	                this._parseProperty(bindParts[9], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
	                this._parseAssignmentEvent(bindParts[9], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
	            }
	            else if (lang_1.isPresent(bindParts[10])) {
	                this._parseProperty(bindParts[10], attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
	            }
	            else if (lang_1.isPresent(bindParts[11])) {
	                this._parseEvent(bindParts[11], attrValue, attr.sourceSpan, targetMatchableAttrs, targetEvents);
	            }
	        }
	        else {
	            hasBinding = this._parsePropertyInterpolation(attrName, attrValue, attr.sourceSpan, targetMatchableAttrs, targetProps);
	        }
	        if (!hasBinding) {
	            this._parseLiteralAttr(attrName, attrValue, attr.sourceSpan, targetProps);
	        }
	        return hasBinding;
	    };
	    TemplateParseVisitor.prototype._normalizeAttributeName = function (attrName) {
	        return attrName.toLowerCase().startsWith('data-') ? attrName.substring(5) : attrName;
	    };
	    TemplateParseVisitor.prototype._parseVariable = function (identifier, value, sourceSpan, targetVars) {
	        if (identifier.indexOf('-') > -1) {
	            this._reportError("\"-\" is not allowed in variable names", sourceSpan);
	        }
	        targetVars.push(new template_ast_1.VariableAst(identifier, value, sourceSpan));
	    };
	    TemplateParseVisitor.prototype._parseReference = function (identifier, value, sourceSpan, targetRefs) {
	        if (identifier.indexOf('-') > -1) {
	            this._reportError("\"-\" is not allowed in reference names", sourceSpan);
	        }
	        targetRefs.push(new ElementOrDirectiveRef(identifier, value, sourceSpan));
	    };
	    TemplateParseVisitor.prototype._parseProperty = function (name, expression, sourceSpan, targetMatchableAttrs, targetProps) {
	        this._parsePropertyAst(name, this._parseBinding(expression, sourceSpan), sourceSpan, targetMatchableAttrs, targetProps);
	    };
	    TemplateParseVisitor.prototype._parseAnimation = function (name, expression, sourceSpan, targetMatchableAttrs, targetAnimationProps) {
	        // This will occur when a @trigger is not paired with an expression.
	        // For animations it is valid to not have an expression since */void
	        // states will be applied by angular when the element is attached/detached
	        if (!lang_1.isPresent(expression) || expression.length == 0) {
	            expression = 'null';
	        }
	        var ast = this._parseBinding(expression, sourceSpan);
	        targetMatchableAttrs.push([name, ast.source]);
	        targetAnimationProps.push(new template_ast_1.BoundElementPropertyAst(name, template_ast_1.PropertyBindingType.Animation, core_private_1.SecurityContext.NONE, ast, null, sourceSpan));
	    };
	    TemplateParseVisitor.prototype._parsePropertyInterpolation = function (name, value, sourceSpan, targetMatchableAttrs, targetProps) {
	        var expr = this._parseInterpolation(value, sourceSpan);
	        if (lang_1.isPresent(expr)) {
	            this._parsePropertyAst(name, expr, sourceSpan, targetMatchableAttrs, targetProps);
	            return true;
	        }
	        return false;
	    };
	    TemplateParseVisitor.prototype._parsePropertyAst = function (name, ast, sourceSpan, targetMatchableAttrs, targetProps) {
	        targetMatchableAttrs.push([name, ast.source]);
	        targetProps.push(new BoundElementOrDirectiveProperty(name, ast, false, sourceSpan));
	    };
	    TemplateParseVisitor.prototype._parseAssignmentEvent = function (name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
	        this._parseEvent(name + "Change", expression + "=$event", sourceSpan, targetMatchableAttrs, targetEvents);
	    };
	    TemplateParseVisitor.prototype._parseEvent = function (name, expression, sourceSpan, targetMatchableAttrs, targetEvents) {
	        // long format: 'target: eventName'
	        var parts = util_1.splitAtColon(name, [null, name]);
	        var target = parts[0];
	        var eventName = parts[1];
	        var ast = this._parseAction(expression, sourceSpan);
	        targetMatchableAttrs.push([name, ast.source]);
	        targetEvents.push(new template_ast_1.BoundEventAst(eventName, target, ast, sourceSpan));
	        // Don't detect directives for event names for now,
	        // so don't add the event name to the matchableAttrs
	    };
	    TemplateParseVisitor.prototype._parseLiteralAttr = function (name, value, sourceSpan, targetProps) {
	        targetProps.push(new BoundElementOrDirectiveProperty(name, this._exprParser.wrapLiteralPrimitive(value, ''), true, sourceSpan));
	    };
	    TemplateParseVisitor.prototype._parseDirectives = function (selectorMatcher, elementCssSelector) {
	        var _this = this;
	        // Need to sort the directives so that we get consistent results throughout,
	        // as selectorMatcher uses Maps inside.
	        // Also dedupe directives as they might match more than one time!
	        var directives = collection_1.ListWrapper.createFixedSize(this.directivesIndex.size);
	        selectorMatcher.match(elementCssSelector, function (selector, directive) {
	            directives[_this.directivesIndex.get(directive)] = directive;
	        });
	        return directives.filter(function (dir) { return lang_1.isPresent(dir); });
	    };
	    TemplateParseVisitor.prototype._createDirectiveAsts = function (isTemplateElement, elementName, directives, props, elementOrDirectiveRefs, sourceSpan, targetReferences) {
	        var _this = this;
	        var matchedReferences = new Set();
	        var component = null;
	        var directiveAsts = directives.map(function (directive) {
	            if (directive.isComponent) {
	                component = directive;
	            }
	            var hostProperties = [];
	            var hostEvents = [];
	            var directiveProperties = [];
	            _this._createDirectiveHostPropertyAsts(elementName, directive.hostProperties, sourceSpan, hostProperties);
	            _this._createDirectiveHostEventAsts(directive.hostListeners, sourceSpan, hostEvents);
	            _this._createDirectivePropertyAsts(directive.inputs, props, directiveProperties);
	            elementOrDirectiveRefs.forEach(function (elOrDirRef) {
	                if ((elOrDirRef.value.length === 0 && directive.isComponent) ||
	                    (directive.exportAs == elOrDirRef.value)) {
	                    targetReferences.push(new template_ast_1.ReferenceAst(elOrDirRef.name, identifiers_1.identifierToken(directive.type), elOrDirRef.sourceSpan));
	                    matchedReferences.add(elOrDirRef.name);
	                }
	            });
	            return new template_ast_1.DirectiveAst(directive, directiveProperties, hostProperties, hostEvents, sourceSpan);
	        });
	        elementOrDirectiveRefs.forEach(function (elOrDirRef) {
	            if (elOrDirRef.value.length > 0) {
	                if (!collection_1.SetWrapper.has(matchedReferences, elOrDirRef.name)) {
	                    _this._reportError("There is no directive with \"exportAs\" set to \"" + elOrDirRef.value + "\"", elOrDirRef.sourceSpan);
	                }
	                ;
	            }
	            else if (lang_1.isBlank(component)) {
	                var refToken = null;
	                if (isTemplateElement) {
	                    refToken = identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef);
	                }
	                targetReferences.push(new template_ast_1.ReferenceAst(elOrDirRef.name, refToken, elOrDirRef.sourceSpan));
	            }
	        }); // fix syntax highlighting issue: `
	        return directiveAsts;
	    };
	    TemplateParseVisitor.prototype._createDirectiveHostPropertyAsts = function (elementName, hostProps, sourceSpan, targetPropertyAsts) {
	        var _this = this;
	        if (lang_1.isPresent(hostProps)) {
	            collection_1.StringMapWrapper.forEach(hostProps, function (expression, propName) {
	                var exprAst = _this._parseBinding(expression, sourceSpan);
	                targetPropertyAsts.push(_this._createElementPropertyAst(elementName, propName, exprAst, sourceSpan));
	            });
	        }
	    };
	    TemplateParseVisitor.prototype._createDirectiveHostEventAsts = function (hostListeners, sourceSpan, targetEventAsts) {
	        var _this = this;
	        if (lang_1.isPresent(hostListeners)) {
	            collection_1.StringMapWrapper.forEach(hostListeners, function (expression, propName) {
	                _this._parseEvent(propName, expression, sourceSpan, [], targetEventAsts);
	            });
	        }
	    };
	    TemplateParseVisitor.prototype._createDirectivePropertyAsts = function (directiveProperties, boundProps, targetBoundDirectiveProps) {
	        if (lang_1.isPresent(directiveProperties)) {
	            var boundPropsByName = new Map();
	            boundProps.forEach(function (boundProp) {
	                var prevValue = boundPropsByName.get(boundProp.name);
	                if (lang_1.isBlank(prevValue) || prevValue.isLiteral) {
	                    // give [a]="b" a higher precedence than a="b" on the same element
	                    boundPropsByName.set(boundProp.name, boundProp);
	                }
	            });
	            collection_1.StringMapWrapper.forEach(directiveProperties, function (elProp, dirProp) {
	                var boundProp = boundPropsByName.get(elProp);
	                // Bindings are optional, so this binding only needs to be set up if an expression is given.
	                if (lang_1.isPresent(boundProp)) {
	                    targetBoundDirectiveProps.push(new template_ast_1.BoundDirectivePropertyAst(dirProp, boundProp.name, boundProp.expression, boundProp.sourceSpan));
	                }
	            });
	        }
	    };
	    TemplateParseVisitor.prototype._createElementPropertyAsts = function (elementName, props, directives) {
	        var _this = this;
	        var boundElementProps = [];
	        var boundDirectivePropsIndex = new Map();
	        directives.forEach(function (directive) {
	            directive.inputs.forEach(function (prop) {
	                boundDirectivePropsIndex.set(prop.templateName, prop);
	            });
	        });
	        props.forEach(function (prop) {
	            if (!prop.isLiteral && lang_1.isBlank(boundDirectivePropsIndex.get(prop.name))) {
	                boundElementProps.push(_this._createElementPropertyAst(elementName, prop.name, prop.expression, prop.sourceSpan));
	            }
	        });
	        return boundElementProps;
	    };
	    TemplateParseVisitor.prototype._createElementPropertyAst = function (elementName, name, ast, sourceSpan) {
	        var unit = null;
	        var bindingType;
	        var boundPropertyName;
	        var parts = name.split(PROPERTY_PARTS_SEPARATOR);
	        var securityContext;
	        if (parts.length === 1) {
	            boundPropertyName = this._schemaRegistry.getMappedPropName(parts[0]);
	            securityContext = this._schemaRegistry.securityContext(elementName, boundPropertyName);
	            bindingType = template_ast_1.PropertyBindingType.Property;
	            if (!this._schemaRegistry.hasProperty(elementName, boundPropertyName)) {
	                this._reportError("Can't bind to '" + boundPropertyName + "' since it isn't a known native property", sourceSpan);
	            }
	        }
	        else {
	            if (parts[0] == ATTRIBUTE_PREFIX) {
	                boundPropertyName = parts[1];
	                if (boundPropertyName.toLowerCase().startsWith('on')) {
	                    this._reportError(("Binding to event attribute '" + boundPropertyName + "' is disallowed ") +
	                        ("for security reasons, please use (" + boundPropertyName.slice(2) + ")=..."), sourceSpan);
	                }
	                // NB: For security purposes, use the mapped property name, not the attribute name.
	                securityContext = this._schemaRegistry.securityContext(elementName, this._schemaRegistry.getMappedPropName(boundPropertyName));
	                var nsSeparatorIdx = boundPropertyName.indexOf(':');
	                if (nsSeparatorIdx > -1) {
	                    var ns = boundPropertyName.substring(0, nsSeparatorIdx);
	                    var name_1 = boundPropertyName.substring(nsSeparatorIdx + 1);
	                    boundPropertyName = html_tags_1.mergeNsAndName(ns, name_1);
	                }
	                bindingType = template_ast_1.PropertyBindingType.Attribute;
	            }
	            else if (parts[0] == CLASS_PREFIX) {
	                boundPropertyName = parts[1];
	                bindingType = template_ast_1.PropertyBindingType.Class;
	                securityContext = core_private_1.SecurityContext.NONE;
	            }
	            else if (parts[0] == STYLE_PREFIX) {
	                unit = parts.length > 2 ? parts[2] : null;
	                boundPropertyName = parts[1];
	                bindingType = template_ast_1.PropertyBindingType.Style;
	                securityContext = core_private_1.SecurityContext.STYLE;
	            }
	            else {
	                this._reportError("Invalid property name '" + name + "'", sourceSpan);
	                bindingType = null;
	                securityContext = null;
	            }
	        }
	        return new template_ast_1.BoundElementPropertyAst(boundPropertyName, bindingType, securityContext, ast, unit, sourceSpan);
	    };
	    TemplateParseVisitor.prototype._findComponentDirectiveNames = function (directives) {
	        var componentTypeNames = [];
	        directives.forEach(function (directive) {
	            var typeName = directive.directive.type.name;
	            if (directive.directive.isComponent) {
	                componentTypeNames.push(typeName);
	            }
	        });
	        return componentTypeNames;
	    };
	    TemplateParseVisitor.prototype._assertOnlyOneComponent = function (directives, sourceSpan) {
	        var componentTypeNames = this._findComponentDirectiveNames(directives);
	        if (componentTypeNames.length > 1) {
	            this._reportError("More than one component: " + componentTypeNames.join(','), sourceSpan);
	        }
	    };
	    TemplateParseVisitor.prototype._assertNoComponentsNorElementBindingsOnTemplate = function (directives, elementProps, sourceSpan) {
	        var _this = this;
	        var componentTypeNames = this._findComponentDirectiveNames(directives);
	        if (componentTypeNames.length > 0) {
	            this._reportError("Components on an embedded template: " + componentTypeNames.join(','), sourceSpan);
	        }
	        elementProps.forEach(function (prop) {
	            _this._reportError("Property binding " + prop.name + " not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the \"directives\" section.", sourceSpan);
	        });
	    };
	    TemplateParseVisitor.prototype._assertAllEventsPublishedByDirectives = function (directives, events) {
	        var _this = this;
	        var allDirectiveEvents = new Set();
	        directives.forEach(function (directive) {
	            collection_1.StringMapWrapper.forEach(directive.directive.outputs, function (eventName) {
	                allDirectiveEvents.add(eventName);
	            });
	        });
	        events.forEach(function (event) {
	            if (lang_1.isPresent(event.target) || !collection_1.SetWrapper.has(allDirectiveEvents, event.name)) {
	                _this._reportError("Event binding " + event.fullName + " not emitted by any directive on an embedded template. Make sure that the event name is spelled correctly and all directives are listed in the \"directives\" section.", event.sourceSpan);
	            }
	        });
	    };
	    return TemplateParseVisitor;
	}());
	var NonBindableVisitor = (function () {
	    function NonBindableVisitor() {
	    }
	    NonBindableVisitor.prototype.visitElement = function (ast, parent) {
	        var preparsedElement = template_preparser_1.preparseElement(ast);
	        if (preparsedElement.type === template_preparser_1.PreparsedElementType.SCRIPT ||
	            preparsedElement.type === template_preparser_1.PreparsedElementType.STYLE ||
	            preparsedElement.type === template_preparser_1.PreparsedElementType.STYLESHEET) {
	            // Skipping <script> for security reasons
	            // Skipping <style> and stylesheets as we already processed them
	            // in the StyleCompiler
	            return null;
	        }
	        var attrNameAndValues = ast.attrs.map(function (attrAst) { return [attrAst.name, attrAst.value]; });
	        var selector = createElementCssSelector(ast.name, attrNameAndValues);
	        var ngContentIndex = parent.findNgContentIndex(selector);
	        var children = html_ast_1.htmlVisitAll(this, ast.children, EMPTY_ELEMENT_CONTEXT);
	        return new template_ast_1.ElementAst(ast.name, html_ast_1.htmlVisitAll(this, ast.attrs), [], [], [], [], [], false, children, ngContentIndex, ast.sourceSpan);
	    };
	    NonBindableVisitor.prototype.visitComment = function (ast, context) { return null; };
	    NonBindableVisitor.prototype.visitAttr = function (ast, context) {
	        return new template_ast_1.AttrAst(ast.name, ast.value, ast.sourceSpan);
	    };
	    NonBindableVisitor.prototype.visitText = function (ast, parent) {
	        var ngContentIndex = parent.findNgContentIndex(TEXT_CSS_SELECTOR);
	        return new template_ast_1.TextAst(ast.value, ngContentIndex, ast.sourceSpan);
	    };
	    NonBindableVisitor.prototype.visitExpansion = function (ast, context) { return ast; };
	    NonBindableVisitor.prototype.visitExpansionCase = function (ast, context) { return ast; };
	    return NonBindableVisitor;
	}());
	var BoundElementOrDirectiveProperty = (function () {
	    function BoundElementOrDirectiveProperty(name, expression, isLiteral, sourceSpan) {
	        this.name = name;
	        this.expression = expression;
	        this.isLiteral = isLiteral;
	        this.sourceSpan = sourceSpan;
	    }
	    return BoundElementOrDirectiveProperty;
	}());
	var ElementOrDirectiveRef = (function () {
	    function ElementOrDirectiveRef(name, value, sourceSpan) {
	        this.name = name;
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    return ElementOrDirectiveRef;
	}());
	function splitClasses(classAttrValue) {
	    return lang_1.StringWrapper.split(classAttrValue.trim(), /\s+/g);
	}
	exports.splitClasses = splitClasses;
	var ElementContext = (function () {
	    function ElementContext(isTemplateElement, _ngContentIndexMatcher, _wildcardNgContentIndex, providerContext) {
	        this.isTemplateElement = isTemplateElement;
	        this._ngContentIndexMatcher = _ngContentIndexMatcher;
	        this._wildcardNgContentIndex = _wildcardNgContentIndex;
	        this.providerContext = providerContext;
	    }
	    ElementContext.create = function (isTemplateElement, directives, providerContext) {
	        var matcher = new selector_1.SelectorMatcher();
	        var wildcardNgContentIndex = null;
	        var component = directives.find(function (directive) { return directive.directive.isComponent; });
	        if (lang_1.isPresent(component)) {
	            var ngContentSelectors = component.directive.template.ngContentSelectors;
	            for (var i = 0; i < ngContentSelectors.length; i++) {
	                var selector = ngContentSelectors[i];
	                if (lang_1.StringWrapper.equals(selector, '*')) {
	                    wildcardNgContentIndex = i;
	                }
	                else {
	                    matcher.addSelectables(selector_1.CssSelector.parse(ngContentSelectors[i]), i);
	                }
	            }
	        }
	        return new ElementContext(isTemplateElement, matcher, wildcardNgContentIndex, providerContext);
	    };
	    ElementContext.prototype.findNgContentIndex = function (selector) {
	        var ngContentIndices = [];
	        this._ngContentIndexMatcher.match(selector, function (selector, ngContentIndex) { ngContentIndices.push(ngContentIndex); });
	        collection_1.ListWrapper.sort(ngContentIndices);
	        if (lang_1.isPresent(this._wildcardNgContentIndex)) {
	            ngContentIndices.push(this._wildcardNgContentIndex);
	        }
	        return ngContentIndices.length > 0 ? ngContentIndices[0] : null;
	    };
	    return ElementContext;
	}());
	function createElementCssSelector(elementName, matchableAttrs) {
	    var cssSelector = new selector_1.CssSelector();
	    var elNameNoNs = html_tags_1.splitNsName(elementName)[1];
	    cssSelector.setElement(elNameNoNs);
	    for (var i = 0; i < matchableAttrs.length; i++) {
	        var attrName = matchableAttrs[i][0];
	        var attrNameNoNs = html_tags_1.splitNsName(attrName)[1];
	        var attrValue = matchableAttrs[i][1];
	        cssSelector.addAttribute(attrNameNoNs, attrValue);
	        if (attrName.toLowerCase() == CLASS_ATTR) {
	            var classes = splitClasses(attrValue);
	            classes.forEach(function (className) { return cssSelector.addClassName(className); });
	        }
	    }
	    return cssSelector;
	}
	var EMPTY_ELEMENT_CONTEXT = new ElementContext(true, new selector_1.SelectorMatcher(), null, null);
	var NON_BINDABLE_VISITOR = new NonBindableVisitor();
	var PipeCollector = (function (_super) {
	    __extends(PipeCollector, _super);
	    function PipeCollector() {
	        _super.apply(this, arguments);
	        this.pipes = new Set();
	    }
	    PipeCollector.prototype.visitPipe = function (ast, context) {
	        this.pipes.add(ast.name);
	        ast.exp.visit(this);
	        this.visitAll(ast.args, context);
	        return null;
	    };
	    return PipeCollector;
	}(ast_1.RecursiveAstVisitor));
	exports.PipeCollector = PipeCollector;
	function removeDuplicates(items) {
	    var res = [];
	    items.forEach(function (item) {
	        var hasMatch = res.filter(function (r) { return r.type.name == item.type.name && r.type.moduleUrl == item.type.moduleUrl &&
	            r.type.runtime == item.type.runtime; })
	            .length > 0;
	        if (!hasMatch) {
	            res.push(item);
	        }
	    });
	    return res;
	}
	//# sourceMappingURL=template_parser.js.map

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	exports.isDefaultChangeDetectionStrategy = core_1.__core_private__.isDefaultChangeDetectionStrategy;
	exports.ChangeDetectorStatus = core_1.__core_private__.ChangeDetectorStatus;
	exports.CHANGE_DETECTION_STRATEGY_VALUES = core_1.__core_private__.CHANGE_DETECTION_STRATEGY_VALUES;
	exports.constructDependencies = core_1.__core_private__.constructDependencies;
	exports.LifecycleHooks = core_1.__core_private__.LifecycleHooks;
	exports.LIFECYCLE_HOOKS_VALUES = core_1.__core_private__.LIFECYCLE_HOOKS_VALUES;
	exports.ReflectorReader = core_1.__core_private__.ReflectorReader;
	exports.ReflectorComponentResolver = core_1.__core_private__.ReflectorComponentResolver;
	exports.AppElement = core_1.__core_private__.AppElement;
	exports.CodegenComponentFactoryResolver = core_1.__core_private__.CodegenComponentFactoryResolver;
	exports.AppView = core_1.__core_private__.AppView;
	exports.DebugAppView = core_1.__core_private__.DebugAppView;
	exports.ViewType = core_1.__core_private__.ViewType;
	exports.MAX_INTERPOLATION_VALUES = core_1.__core_private__.MAX_INTERPOLATION_VALUES;
	exports.checkBinding = core_1.__core_private__.checkBinding;
	exports.flattenNestedViewRenderNodes = core_1.__core_private__.flattenNestedViewRenderNodes;
	exports.interpolate = core_1.__core_private__.interpolate;
	exports.ViewUtils = core_1.__core_private__.ViewUtils;
	exports.VIEW_ENCAPSULATION_VALUES = core_1.__core_private__.VIEW_ENCAPSULATION_VALUES;
	exports.DebugContext = core_1.__core_private__.DebugContext;
	exports.StaticNodeDebugInfo = core_1.__core_private__.StaticNodeDebugInfo;
	exports.devModeEqual = core_1.__core_private__.devModeEqual;
	exports.uninitialized = core_1.__core_private__.uninitialized;
	exports.ValueUnwrapper = core_1.__core_private__.ValueUnwrapper;
	exports.TemplateRef_ = core_1.__core_private__.TemplateRef_;
	exports.RenderDebugInfo = core_1.__core_private__.RenderDebugInfo;
	exports.SecurityContext = core_1.__core_private__.SecurityContext;
	exports.SanitizationService = core_1.__core_private__.SanitizationService;
	exports.createProvider = core_1.__core_private__.createProvider;
	exports.isProviderLiteral = core_1.__core_private__.isProviderLiteral;
	exports.EMPTY_ARRAY = core_1.__core_private__.EMPTY_ARRAY;
	exports.EMPTY_MAP = core_1.__core_private__.EMPTY_MAP;
	exports.pureProxy1 = core_1.__core_private__.pureProxy1;
	exports.pureProxy2 = core_1.__core_private__.pureProxy2;
	exports.pureProxy3 = core_1.__core_private__.pureProxy3;
	exports.pureProxy4 = core_1.__core_private__.pureProxy4;
	exports.pureProxy5 = core_1.__core_private__.pureProxy5;
	exports.pureProxy6 = core_1.__core_private__.pureProxy6;
	exports.pureProxy7 = core_1.__core_private__.pureProxy7;
	exports.pureProxy8 = core_1.__core_private__.pureProxy8;
	exports.pureProxy9 = core_1.__core_private__.pureProxy9;
	exports.pureProxy10 = core_1.__core_private__.pureProxy10;
	exports.castByValue = core_1.__core_private__.castByValue;
	exports.Console = core_1.__core_private__.Console;
	exports.reflector = core_1.__core_private__.reflector;
	exports.NoOpAnimationPlayer = core_1.__core_private__.NoOpAnimationPlayer;
	exports.AnimationPlayer = core_1.__core_private__.AnimationPlayer;
	exports.NoOpAnimationDriver = core_1.__core_private__.NoOpAnimationDriver;
	exports.AnimationDriver = core_1.__core_private__.AnimationDriver;
	exports.AnimationSequencePlayer = core_1.__core_private__.AnimationSequencePlayer;
	exports.AnimationGroupPlayer = core_1.__core_private__.AnimationGroupPlayer;
	exports.AnimationKeyframe = core_1.__core_private__.AnimationKeyframe;
	exports.AnimationStyles = core_1.__core_private__.AnimationStyles;
	exports.ANY_STATE = core_1.__core_private__.ANY_STATE;
	exports.DEFAULT_STATE = core_1.__core_private__.DEFAULT_STATE;
	exports.EMPTY_STATE = core_1.__core_private__.EMPTY_STATE;
	exports.FILL_STYLE_FLAG = core_1.__core_private__.FILL_STYLE_FLAG;
	exports.prepareFinalAnimationStyles = core_1.__core_private__.prepareFinalAnimationStyles;
	exports.balanceAnimationKeyframes = core_1.__core_private__.balanceAnimationKeyframes;
	exports.flattenStyles = core_1.__core_private__.flattenStyles;
	exports.clearStyles = core_1.__core_private__.clearStyles;
	exports.collectAndResolveStyles = core_1.__core_private__.collectAndResolveStyles;
	exports.renderStyles = core_1.__core_private__.renderStyles;
	//# sourceMappingURL=core_private.js.map

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	exports.Map = lang_1.global.Map;
	exports.Set = lang_1.global.Set;
	// Safari and Internet Explorer do not support the iterable parameter to the
	// Map constructor.  We work around that by manually adding the items.
	var createMapFromPairs = (function () {
	    try {
	        if (new exports.Map([[1, 2]]).size === 1) {
	            return function createMapFromPairs(pairs) { return new exports.Map(pairs); };
	        }
	    }
	    catch (e) {
	    }
	    return function createMapAndPopulateFromPairs(pairs) {
	        var map = new exports.Map();
	        for (var i = 0; i < pairs.length; i++) {
	            var pair = pairs[i];
	            map.set(pair[0], pair[1]);
	        }
	        return map;
	    };
	})();
	var createMapFromMap = (function () {
	    try {
	        if (new exports.Map(new exports.Map())) {
	            return function createMapFromMap(m) { return new exports.Map(m); };
	        }
	    }
	    catch (e) {
	    }
	    return function createMapAndPopulateFromMap(m) {
	        var map = new exports.Map();
	        m.forEach(function (v, k) { map.set(k, v); });
	        return map;
	    };
	})();
	var _clearValues = (function () {
	    if ((new exports.Map()).keys().next) {
	        return function _clearValues(m) {
	            var keyIterator = m.keys();
	            var k;
	            while (!((k = keyIterator.next()).done)) {
	                m.set(k.value, null);
	            }
	        };
	    }
	    else {
	        return function _clearValuesWithForeEach(m) {
	            m.forEach(function (v, k) { m.set(k, null); });
	        };
	    }
	})();
	// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
	// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
	var _arrayFromMap = (function () {
	    try {
	        if ((new exports.Map()).values().next) {
	            return function createArrayFromMap(m, getValues) {
	                return getValues ? Array.from(m.values()) : Array.from(m.keys());
	            };
	        }
	    }
	    catch (e) {
	    }
	    return function createArrayFromMapWithForeach(m, getValues) {
	        var res = ListWrapper.createFixedSize(m.size), i = 0;
	        m.forEach(function (v, k) {
	            res[i] = getValues ? v : k;
	            i++;
	        });
	        return res;
	    };
	})();
	var MapWrapper = (function () {
	    function MapWrapper() {
	    }
	    MapWrapper.clone = function (m) { return createMapFromMap(m); };
	    MapWrapper.createFromStringMap = function (stringMap) {
	        var result = new exports.Map();
	        for (var prop in stringMap) {
	            result.set(prop, stringMap[prop]);
	        }
	        return result;
	    };
	    MapWrapper.toStringMap = function (m) {
	        var r = {};
	        m.forEach(function (v, k) { return r[k] = v; });
	        return r;
	    };
	    MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
	    MapWrapper.clearValues = function (m) { _clearValues(m); };
	    MapWrapper.iterable = function (m) { return m; };
	    MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
	    MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
	    return MapWrapper;
	}());
	exports.MapWrapper = MapWrapper;
	/**
	 * Wraps Javascript Objects
	 */
	var StringMapWrapper = (function () {
	    function StringMapWrapper() {
	    }
	    StringMapWrapper.create = function () {
	        // Note: We are not using Object.create(null) here due to
	        // performance!
	        // http://jsperf.com/ng2-object-create-null
	        return {};
	    };
	    StringMapWrapper.contains = function (map, key) {
	        return map.hasOwnProperty(key);
	    };
	    StringMapWrapper.get = function (map, key) {
	        return map.hasOwnProperty(key) ? map[key] : undefined;
	    };
	    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
	    StringMapWrapper.keys = function (map) { return Object.keys(map); };
	    StringMapWrapper.values = function (map) {
	        return Object.keys(map).reduce(function (r, a) {
	            r.push(map[a]);
	            return r;
	        }, []);
	    };
	    StringMapWrapper.isEmpty = function (map) {
	        for (var prop in map) {
	            return false;
	        }
	        return true;
	    };
	    StringMapWrapper.delete = function (map, key) { delete map[key]; };
	    StringMapWrapper.forEach = function (map, callback) {
	        for (var prop in map) {
	            if (map.hasOwnProperty(prop)) {
	                callback(map[prop], prop);
	            }
	        }
	    };
	    StringMapWrapper.merge = function (m1, m2) {
	        var m = {};
	        for (var attr in m1) {
	            if (m1.hasOwnProperty(attr)) {
	                m[attr] = m1[attr];
	            }
	        }
	        for (var attr in m2) {
	            if (m2.hasOwnProperty(attr)) {
	                m[attr] = m2[attr];
	            }
	        }
	        return m;
	    };
	    StringMapWrapper.equals = function (m1, m2) {
	        var k1 = Object.keys(m1);
	        var k2 = Object.keys(m2);
	        if (k1.length != k2.length) {
	            return false;
	        }
	        var key;
	        for (var i = 0; i < k1.length; i++) {
	            key = k1[i];
	            if (m1[key] !== m2[key]) {
	                return false;
	            }
	        }
	        return true;
	    };
	    return StringMapWrapper;
	}());
	exports.StringMapWrapper = StringMapWrapper;
	var ListWrapper = (function () {
	    function ListWrapper() {
	    }
	    // JS has no way to express a statically fixed size list, but dart does so we
	    // keep both methods.
	    ListWrapper.createFixedSize = function (size) { return new Array(size); };
	    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
	    ListWrapper.clone = function (array) { return array.slice(0); };
	    ListWrapper.forEachWithIndex = function (array, fn) {
	        for (var i = 0; i < array.length; i++) {
	            fn(array[i], i);
	        }
	    };
	    ListWrapper.first = function (array) {
	        if (!array)
	            return null;
	        return array[0];
	    };
	    ListWrapper.last = function (array) {
	        if (!array || array.length == 0)
	            return null;
	        return array[array.length - 1];
	    };
	    ListWrapper.indexOf = function (array, value, startIndex) {
	        if (startIndex === void 0) { startIndex = 0; }
	        return array.indexOf(value, startIndex);
	    };
	    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
	    ListWrapper.reversed = function (array) {
	        var a = ListWrapper.clone(array);
	        return a.reverse();
	    };
	    ListWrapper.concat = function (a, b) { return a.concat(b); };
	    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
	    ListWrapper.removeAt = function (list, index) {
	        var res = list[index];
	        list.splice(index, 1);
	        return res;
	    };
	    ListWrapper.removeAll = function (list, items) {
	        for (var i = 0; i < items.length; ++i) {
	            var index = list.indexOf(items[i]);
	            list.splice(index, 1);
	        }
	    };
	    ListWrapper.remove = function (list, el) {
	        var index = list.indexOf(el);
	        if (index > -1) {
	            list.splice(index, 1);
	            return true;
	        }
	        return false;
	    };
	    ListWrapper.clear = function (list) { list.length = 0; };
	    ListWrapper.isEmpty = function (list) { return list.length == 0; };
	    ListWrapper.fill = function (list, value, start, end) {
	        if (start === void 0) { start = 0; }
	        if (end === void 0) { end = null; }
	        list.fill(value, start, end === null ? list.length : end);
	    };
	    ListWrapper.equals = function (a, b) {
	        if (a.length != b.length)
	            return false;
	        for (var i = 0; i < a.length; ++i) {
	            if (a[i] !== b[i])
	                return false;
	        }
	        return true;
	    };
	    ListWrapper.slice = function (l, from, to) {
	        if (from === void 0) { from = 0; }
	        if (to === void 0) { to = null; }
	        return l.slice(from, to === null ? undefined : to);
	    };
	    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
	    ListWrapper.sort = function (l, compareFn) {
	        if (lang_1.isPresent(compareFn)) {
	            l.sort(compareFn);
	        }
	        else {
	            l.sort();
	        }
	    };
	    ListWrapper.toString = function (l) { return l.toString(); };
	    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
	    ListWrapper.maximum = function (list, predicate) {
	        if (list.length == 0) {
	            return null;
	        }
	        var solution = null;
	        var maxValue = -Infinity;
	        for (var index = 0; index < list.length; index++) {
	            var candidate = list[index];
	            if (lang_1.isBlank(candidate)) {
	                continue;
	            }
	            var candidateValue = predicate(candidate);
	            if (candidateValue > maxValue) {
	                solution = candidate;
	                maxValue = candidateValue;
	            }
	        }
	        return solution;
	    };
	    ListWrapper.flatten = function (list) {
	        var target = [];
	        _flattenArray(list, target);
	        return target;
	    };
	    ListWrapper.addAll = function (list, source) {
	        for (var i = 0; i < source.length; i++) {
	            list.push(source[i]);
	        }
	    };
	    return ListWrapper;
	}());
	exports.ListWrapper = ListWrapper;
	function _flattenArray(source, target) {
	    if (lang_1.isPresent(source)) {
	        for (var i = 0; i < source.length; i++) {
	            var item = source[i];
	            if (lang_1.isArray(item)) {
	                _flattenArray(item, target);
	            }
	            else {
	                target.push(item);
	            }
	        }
	    }
	    return target;
	}
	function isListLikeIterable(obj) {
	    if (!lang_1.isJsObject(obj))
	        return false;
	    return lang_1.isArray(obj) ||
	        (!(obj instanceof exports.Map) &&
	            lang_1.getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
	}
	exports.isListLikeIterable = isListLikeIterable;
	function areIterablesEqual(a, b, comparator) {
	    var iterator1 = a[lang_1.getSymbolIterator()]();
	    var iterator2 = b[lang_1.getSymbolIterator()]();
	    while (true) {
	        var item1 = iterator1.next();
	        var item2 = iterator2.next();
	        if (item1.done && item2.done)
	            return true;
	        if (item1.done || item2.done)
	            return false;
	        if (!comparator(item1.value, item2.value))
	            return false;
	    }
	}
	exports.areIterablesEqual = areIterablesEqual;
	function iterateListLike(obj, fn) {
	    if (lang_1.isArray(obj)) {
	        for (var i = 0; i < obj.length; i++) {
	            fn(obj[i]);
	        }
	    }
	    else {
	        var iterator = obj[lang_1.getSymbolIterator()]();
	        var item;
	        while (!((item = iterator.next()).done)) {
	            fn(item.value);
	        }
	    }
	}
	exports.iterateListLike = iterateListLike;
	// Safari and Internet Explorer do not support the iterable parameter to the
	// Set constructor.  We work around that by manually adding the items.
	var createSetFromList = (function () {
	    var test = new exports.Set([1, 2, 3]);
	    if (test.size === 3) {
	        return function createSetFromList(lst) { return new exports.Set(lst); };
	    }
	    else {
	        return function createSetAndPopulateFromList(lst) {
	            var res = new exports.Set(lst);
	            if (res.size !== lst.length) {
	                for (var i = 0; i < lst.length; i++) {
	                    res.add(lst[i]);
	                }
	            }
	            return res;
	        };
	    }
	})();
	var SetWrapper = (function () {
	    function SetWrapper() {
	    }
	    SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
	    SetWrapper.has = function (s, key) { return s.has(key); };
	    SetWrapper.delete = function (m, k) { m.delete(k); };
	    return SetWrapper;
	}());
	exports.SetWrapper = SetWrapper;
	//# sourceMappingURL=collection.js.map

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var base_wrapped_exception_1 = __webpack_require__(547);
	var exception_handler_1 = __webpack_require__(548);
	var exception_handler_2 = __webpack_require__(548);
	exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
	/**
	 * @stable
	 */
	var BaseException = (function (_super) {
	    __extends(BaseException, _super);
	    function BaseException(message) {
	        if (message === void 0) { message = '--'; }
	        _super.call(this, message);
	        this.message = message;
	        this.stack = (new Error(message)).stack;
	    }
	    BaseException.prototype.toString = function () { return this.message; };
	    return BaseException;
	}(Error));
	exports.BaseException = BaseException;
	/**
	 * Wraps an exception and provides additional context or information.
	 * @stable
	 */
	var WrappedException = (function (_super) {
	    __extends(WrappedException, _super);
	    function WrappedException(_wrapperMessage, _originalException /** TODO #9100 */, _originalStack /** TODO #9100 */, _context /** TODO #9100 */) {
	        _super.call(this, _wrapperMessage);
	        this._wrapperMessage = _wrapperMessage;
	        this._originalException = _originalException;
	        this._originalStack = _originalStack;
	        this._context = _context;
	        this._wrapperStack = (new Error(_wrapperMessage)).stack;
	    }
	    Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
	        get: function () { return this._wrapperMessage; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "wrapperStack", {
	        get: function () { return this._wrapperStack; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "originalException", {
	        get: function () { return this._originalException; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "originalStack", {
	        get: function () { return this._originalStack; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "context", {
	        get: function () { return this._context; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "message", {
	        get: function () { return exception_handler_1.ExceptionHandler.exceptionToString(this); },
	        enumerable: true,
	        configurable: true
	    });
	    WrappedException.prototype.toString = function () { return this.message; };
	    return WrappedException;
	}(base_wrapped_exception_1.BaseWrappedException));
	exports.WrappedException = WrappedException;
	function makeTypeError(message) {
	    return new TypeError(message);
	}
	exports.makeTypeError = makeTypeError;
	function unimplemented() {
	    throw new BaseException('unimplemented');
	}
	exports.unimplemented = unimplemented;
	//# sourceMappingURL=exceptions.js.map

/***/ }),

/***/ 547:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * A base class for the WrappedException that can be used to identify
	 * a WrappedException from ExceptionHandler without adding circular
	 * dependency.
	 */
	var BaseWrappedException = (function (_super) {
	    __extends(BaseWrappedException, _super);
	    function BaseWrappedException(message) {
	        _super.call(this, message);
	    }
	    Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
	        get: function () { return ''; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "originalException", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "context", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "message", {
	        get: function () { return ''; },
	        enumerable: true,
	        configurable: true
	    });
	    return BaseWrappedException;
	}(Error));
	exports.BaseWrappedException = BaseWrappedException;
	//# sourceMappingURL=base_wrapped_exception.js.map

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var base_wrapped_exception_1 = __webpack_require__(547);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var _ArrayLogger = (function () {
	    function _ArrayLogger() {
	        this.res = [];
	    }
	    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
	    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
	    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
	    _ArrayLogger.prototype.logGroupEnd = function () { };
	    ;
	    return _ArrayLogger;
	}());
	/**
	 * Provides a hook for centralized exception handling.
	 *
	 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
	 * intercept error handling,
	 * write a custom exception handler that replaces this default as appropriate for your app.
	 *
	 * ### Example
	 *
	 * ```javascript
	 *
	 * class MyExceptionHandler implements ExceptionHandler {
	 *   call(error, stackTrace = null, reason = null) {
	 *     // do something with the exception
	 *   }
	 * }
	 *
	 * bootstrap(MyApp, {provide: ExceptionHandler, useClass: MyExceptionHandler}])
	 *
	 * ```
	 * @stable
	 */
	var ExceptionHandler = (function () {
	    function ExceptionHandler(_logger, _rethrowException) {
	        if (_rethrowException === void 0) { _rethrowException = true; }
	        this._logger = _logger;
	        this._rethrowException = _rethrowException;
	    }
	    ExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
	        if (stackTrace === void 0) { stackTrace = null; }
	        if (reason === void 0) { reason = null; }
	        var l = new _ArrayLogger();
	        var e = new ExceptionHandler(l, false);
	        e.call(exception, stackTrace, reason);
	        return l.res.join('\n');
	    };
	    ExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
	        if (stackTrace === void 0) { stackTrace = null; }
	        if (reason === void 0) { reason = null; }
	        var originalException = this._findOriginalException(exception);
	        var originalStack = this._findOriginalStack(exception);
	        var context = this._findContext(exception);
	        this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
	        if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
	            this._logger.logError('STACKTRACE:');
	            this._logger.logError(this._longStackTrace(stackTrace));
	        }
	        if (lang_1.isPresent(reason)) {
	            this._logger.logError("REASON: " + reason);
	        }
	        if (lang_1.isPresent(originalException)) {
	            this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
	        }
	        if (lang_1.isPresent(originalStack)) {
	            this._logger.logError('ORIGINAL STACKTRACE:');
	            this._logger.logError(this._longStackTrace(originalStack));
	        }
	        if (lang_1.isPresent(context)) {
	            this._logger.logError('ERROR CONTEXT:');
	            this._logger.logError(context);
	        }
	        this._logger.logGroupEnd();
	        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
	        // when an exception happens. If we do not rethrow, bootstrap will always succeed.
	        if (this._rethrowException)
	            throw exception;
	    };
	    /** @internal */
	    ExceptionHandler.prototype._extractMessage = function (exception) {
	        return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
	            exception.toString();
	    };
	    /** @internal */
	    ExceptionHandler.prototype._longStackTrace = function (stackTrace) {
	        return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join('\n\n-----async gap-----\n') :
	            stackTrace.toString();
	    };
	    /** @internal */
	    ExceptionHandler.prototype._findContext = function (exception) {
	        try {
	            if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
	                return null;
	            return lang_1.isPresent(exception.context) ? exception.context :
	                this._findContext(exception.originalException);
	        }
	        catch (e) {
	            // exception.context can throw an exception. if it happens, we ignore the context.
	            return null;
	        }
	    };
	    /** @internal */
	    ExceptionHandler.prototype._findOriginalException = function (exception) {
	        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
	            return null;
	        var e = exception.originalException;
	        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
	            e = e.originalException;
	        }
	        return e;
	    };
	    /** @internal */
	    ExceptionHandler.prototype._findOriginalStack = function (exception) {
	        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
	            return null;
	        var e = exception;
	        var stack = exception.originalStack;
	        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
	            e = e.originalException;
	            if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
	                stack = e.originalStack;
	            }
	        }
	        return stack;
	    };
	    return ExceptionHandler;
	}());
	exports.ExceptionHandler = ExceptionHandler;
	//# sourceMappingURL=exception_handler.js.map

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var collection_1 = __webpack_require__(545);
	var AST = (function () {
	    function AST() {
	    }
	    AST.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return null;
	    };
	    AST.prototype.toString = function () { return 'AST'; };
	    return AST;
	}());
	exports.AST = AST;
	/**
	 * Represents a quoted expression of the form:
	 *
	 * quote = prefix `:` uninterpretedExpression
	 * prefix = identifier
	 * uninterpretedExpression = arbitrary string
	 *
	 * A quoted expression is meant to be pre-processed by an AST transformer that
	 * converts it into another AST that no longer contains quoted expressions.
	 * It is meant to allow third-party developers to extend Angular template
	 * expression language. The `uninterpretedExpression` part of the quote is
	 * therefore not interpreted by the Angular's own expression parser.
	 */
	var Quote = (function (_super) {
	    __extends(Quote, _super);
	    function Quote(prefix, uninterpretedExpression, location) {
	        _super.call(this);
	        this.prefix = prefix;
	        this.uninterpretedExpression = uninterpretedExpression;
	        this.location = location;
	    }
	    Quote.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitQuote(this, context);
	    };
	    Quote.prototype.toString = function () { return 'Quote'; };
	    return Quote;
	}(AST));
	exports.Quote = Quote;
	var EmptyExpr = (function (_super) {
	    __extends(EmptyExpr, _super);
	    function EmptyExpr() {
	        _super.apply(this, arguments);
	    }
	    EmptyExpr.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        // do nothing
	    };
	    return EmptyExpr;
	}(AST));
	exports.EmptyExpr = EmptyExpr;
	var ImplicitReceiver = (function (_super) {
	    __extends(ImplicitReceiver, _super);
	    function ImplicitReceiver() {
	        _super.apply(this, arguments);
	    }
	    ImplicitReceiver.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitImplicitReceiver(this, context);
	    };
	    return ImplicitReceiver;
	}(AST));
	exports.ImplicitReceiver = ImplicitReceiver;
	/**
	 * Multiple expressions separated by a semicolon.
	 */
	var Chain = (function (_super) {
	    __extends(Chain, _super);
	    function Chain(expressions) {
	        _super.call(this);
	        this.expressions = expressions;
	    }
	    Chain.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitChain(this, context);
	    };
	    return Chain;
	}(AST));
	exports.Chain = Chain;
	var Conditional = (function (_super) {
	    __extends(Conditional, _super);
	    function Conditional(condition, trueExp, falseExp) {
	        _super.call(this);
	        this.condition = condition;
	        this.trueExp = trueExp;
	        this.falseExp = falseExp;
	    }
	    Conditional.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitConditional(this, context);
	    };
	    return Conditional;
	}(AST));
	exports.Conditional = Conditional;
	var PropertyRead = (function (_super) {
	    __extends(PropertyRead, _super);
	    function PropertyRead(receiver, name) {
	        _super.call(this);
	        this.receiver = receiver;
	        this.name = name;
	    }
	    PropertyRead.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitPropertyRead(this, context);
	    };
	    return PropertyRead;
	}(AST));
	exports.PropertyRead = PropertyRead;
	var PropertyWrite = (function (_super) {
	    __extends(PropertyWrite, _super);
	    function PropertyWrite(receiver, name, value) {
	        _super.call(this);
	        this.receiver = receiver;
	        this.name = name;
	        this.value = value;
	    }
	    PropertyWrite.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitPropertyWrite(this, context);
	    };
	    return PropertyWrite;
	}(AST));
	exports.PropertyWrite = PropertyWrite;
	var SafePropertyRead = (function (_super) {
	    __extends(SafePropertyRead, _super);
	    function SafePropertyRead(receiver, name) {
	        _super.call(this);
	        this.receiver = receiver;
	        this.name = name;
	    }
	    SafePropertyRead.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitSafePropertyRead(this, context);
	    };
	    return SafePropertyRead;
	}(AST));
	exports.SafePropertyRead = SafePropertyRead;
	var KeyedRead = (function (_super) {
	    __extends(KeyedRead, _super);
	    function KeyedRead(obj, key) {
	        _super.call(this);
	        this.obj = obj;
	        this.key = key;
	    }
	    KeyedRead.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitKeyedRead(this, context);
	    };
	    return KeyedRead;
	}(AST));
	exports.KeyedRead = KeyedRead;
	var KeyedWrite = (function (_super) {
	    __extends(KeyedWrite, _super);
	    function KeyedWrite(obj, key, value) {
	        _super.call(this);
	        this.obj = obj;
	        this.key = key;
	        this.value = value;
	    }
	    KeyedWrite.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitKeyedWrite(this, context);
	    };
	    return KeyedWrite;
	}(AST));
	exports.KeyedWrite = KeyedWrite;
	var BindingPipe = (function (_super) {
	    __extends(BindingPipe, _super);
	    function BindingPipe(exp, name, args) {
	        _super.call(this);
	        this.exp = exp;
	        this.name = name;
	        this.args = args;
	    }
	    BindingPipe.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitPipe(this, context);
	    };
	    return BindingPipe;
	}(AST));
	exports.BindingPipe = BindingPipe;
	var LiteralPrimitive = (function (_super) {
	    __extends(LiteralPrimitive, _super);
	    function LiteralPrimitive(value) {
	        _super.call(this);
	        this.value = value;
	    }
	    LiteralPrimitive.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitLiteralPrimitive(this, context);
	    };
	    return LiteralPrimitive;
	}(AST));
	exports.LiteralPrimitive = LiteralPrimitive;
	var LiteralArray = (function (_super) {
	    __extends(LiteralArray, _super);
	    function LiteralArray(expressions) {
	        _super.call(this);
	        this.expressions = expressions;
	    }
	    LiteralArray.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitLiteralArray(this, context);
	    };
	    return LiteralArray;
	}(AST));
	exports.LiteralArray = LiteralArray;
	var LiteralMap = (function (_super) {
	    __extends(LiteralMap, _super);
	    function LiteralMap(keys, values) {
	        _super.call(this);
	        this.keys = keys;
	        this.values = values;
	    }
	    LiteralMap.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitLiteralMap(this, context);
	    };
	    return LiteralMap;
	}(AST));
	exports.LiteralMap = LiteralMap;
	var Interpolation = (function (_super) {
	    __extends(Interpolation, _super);
	    function Interpolation(strings, expressions) {
	        _super.call(this);
	        this.strings = strings;
	        this.expressions = expressions;
	    }
	    Interpolation.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitInterpolation(this, context);
	    };
	    return Interpolation;
	}(AST));
	exports.Interpolation = Interpolation;
	var Binary = (function (_super) {
	    __extends(Binary, _super);
	    function Binary(operation, left, right) {
	        _super.call(this);
	        this.operation = operation;
	        this.left = left;
	        this.right = right;
	    }
	    Binary.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitBinary(this, context);
	    };
	    return Binary;
	}(AST));
	exports.Binary = Binary;
	var PrefixNot = (function (_super) {
	    __extends(PrefixNot, _super);
	    function PrefixNot(expression) {
	        _super.call(this);
	        this.expression = expression;
	    }
	    PrefixNot.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitPrefixNot(this, context);
	    };
	    return PrefixNot;
	}(AST));
	exports.PrefixNot = PrefixNot;
	var MethodCall = (function (_super) {
	    __extends(MethodCall, _super);
	    function MethodCall(receiver, name, args) {
	        _super.call(this);
	        this.receiver = receiver;
	        this.name = name;
	        this.args = args;
	    }
	    MethodCall.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitMethodCall(this, context);
	    };
	    return MethodCall;
	}(AST));
	exports.MethodCall = MethodCall;
	var SafeMethodCall = (function (_super) {
	    __extends(SafeMethodCall, _super);
	    function SafeMethodCall(receiver, name, args) {
	        _super.call(this);
	        this.receiver = receiver;
	        this.name = name;
	        this.args = args;
	    }
	    SafeMethodCall.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitSafeMethodCall(this, context);
	    };
	    return SafeMethodCall;
	}(AST));
	exports.SafeMethodCall = SafeMethodCall;
	var FunctionCall = (function (_super) {
	    __extends(FunctionCall, _super);
	    function FunctionCall(target, args) {
	        _super.call(this);
	        this.target = target;
	        this.args = args;
	    }
	    FunctionCall.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return visitor.visitFunctionCall(this, context);
	    };
	    return FunctionCall;
	}(AST));
	exports.FunctionCall = FunctionCall;
	var ASTWithSource = (function (_super) {
	    __extends(ASTWithSource, _super);
	    function ASTWithSource(ast, source, location) {
	        _super.call(this);
	        this.ast = ast;
	        this.source = source;
	        this.location = location;
	    }
	    ASTWithSource.prototype.visit = function (visitor, context) {
	        if (context === void 0) { context = null; }
	        return this.ast.visit(visitor, context);
	    };
	    ASTWithSource.prototype.toString = function () { return this.source + " in " + this.location; };
	    return ASTWithSource;
	}(AST));
	exports.ASTWithSource = ASTWithSource;
	var TemplateBinding = (function () {
	    function TemplateBinding(key, keyIsVar, name, expression) {
	        this.key = key;
	        this.keyIsVar = keyIsVar;
	        this.name = name;
	        this.expression = expression;
	    }
	    return TemplateBinding;
	}());
	exports.TemplateBinding = TemplateBinding;
	var RecursiveAstVisitor = (function () {
	    function RecursiveAstVisitor() {
	    }
	    RecursiveAstVisitor.prototype.visitBinary = function (ast, context) {
	        ast.left.visit(this);
	        ast.right.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitChain = function (ast, context) { return this.visitAll(ast.expressions, context); };
	    RecursiveAstVisitor.prototype.visitConditional = function (ast, context) {
	        ast.condition.visit(this);
	        ast.trueExp.visit(this);
	        ast.falseExp.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitPipe = function (ast, context) {
	        ast.exp.visit(this);
	        this.visitAll(ast.args, context);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitFunctionCall = function (ast, context) {
	        ast.target.visit(this);
	        this.visitAll(ast.args, context);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitImplicitReceiver = function (ast, context) { return null; };
	    RecursiveAstVisitor.prototype.visitInterpolation = function (ast, context) {
	        return this.visitAll(ast.expressions, context);
	    };
	    RecursiveAstVisitor.prototype.visitKeyedRead = function (ast, context) {
	        ast.obj.visit(this);
	        ast.key.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitKeyedWrite = function (ast, context) {
	        ast.obj.visit(this);
	        ast.key.visit(this);
	        ast.value.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitLiteralArray = function (ast, context) {
	        return this.visitAll(ast.expressions, context);
	    };
	    RecursiveAstVisitor.prototype.visitLiteralMap = function (ast, context) { return this.visitAll(ast.values, context); };
	    RecursiveAstVisitor.prototype.visitLiteralPrimitive = function (ast, context) { return null; };
	    RecursiveAstVisitor.prototype.visitMethodCall = function (ast, context) {
	        ast.receiver.visit(this);
	        return this.visitAll(ast.args, context);
	    };
	    RecursiveAstVisitor.prototype.visitPrefixNot = function (ast, context) {
	        ast.expression.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitPropertyRead = function (ast, context) {
	        ast.receiver.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitPropertyWrite = function (ast, context) {
	        ast.receiver.visit(this);
	        ast.value.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitSafePropertyRead = function (ast, context) {
	        ast.receiver.visit(this);
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitSafeMethodCall = function (ast, context) {
	        ast.receiver.visit(this);
	        return this.visitAll(ast.args, context);
	    };
	    RecursiveAstVisitor.prototype.visitAll = function (asts, context) {
	        var _this = this;
	        asts.forEach(function (ast) { return ast.visit(_this, context); });
	        return null;
	    };
	    RecursiveAstVisitor.prototype.visitQuote = function (ast, context) { return null; };
	    return RecursiveAstVisitor;
	}());
	exports.RecursiveAstVisitor = RecursiveAstVisitor;
	var AstTransformer = (function () {
	    function AstTransformer() {
	    }
	    AstTransformer.prototype.visitImplicitReceiver = function (ast, context) { return ast; };
	    AstTransformer.prototype.visitInterpolation = function (ast, context) {
	        return new Interpolation(ast.strings, this.visitAll(ast.expressions));
	    };
	    AstTransformer.prototype.visitLiteralPrimitive = function (ast, context) {
	        return new LiteralPrimitive(ast.value);
	    };
	    AstTransformer.prototype.visitPropertyRead = function (ast, context) {
	        return new PropertyRead(ast.receiver.visit(this), ast.name);
	    };
	    AstTransformer.prototype.visitPropertyWrite = function (ast, context) {
	        return new PropertyWrite(ast.receiver.visit(this), ast.name, ast.value);
	    };
	    AstTransformer.prototype.visitSafePropertyRead = function (ast, context) {
	        return new SafePropertyRead(ast.receiver.visit(this), ast.name);
	    };
	    AstTransformer.prototype.visitMethodCall = function (ast, context) {
	        return new MethodCall(ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
	    };
	    AstTransformer.prototype.visitSafeMethodCall = function (ast, context) {
	        return new SafeMethodCall(ast.receiver.visit(this), ast.name, this.visitAll(ast.args));
	    };
	    AstTransformer.prototype.visitFunctionCall = function (ast, context) {
	        return new FunctionCall(ast.target.visit(this), this.visitAll(ast.args));
	    };
	    AstTransformer.prototype.visitLiteralArray = function (ast, context) {
	        return new LiteralArray(this.visitAll(ast.expressions));
	    };
	    AstTransformer.prototype.visitLiteralMap = function (ast, context) {
	        return new LiteralMap(ast.keys, this.visitAll(ast.values));
	    };
	    AstTransformer.prototype.visitBinary = function (ast, context) {
	        return new Binary(ast.operation, ast.left.visit(this), ast.right.visit(this));
	    };
	    AstTransformer.prototype.visitPrefixNot = function (ast, context) {
	        return new PrefixNot(ast.expression.visit(this));
	    };
	    AstTransformer.prototype.visitConditional = function (ast, context) {
	        return new Conditional(ast.condition.visit(this), ast.trueExp.visit(this), ast.falseExp.visit(this));
	    };
	    AstTransformer.prototype.visitPipe = function (ast, context) {
	        return new BindingPipe(ast.exp.visit(this), ast.name, this.visitAll(ast.args));
	    };
	    AstTransformer.prototype.visitKeyedRead = function (ast, context) {
	        return new KeyedRead(ast.obj.visit(this), ast.key.visit(this));
	    };
	    AstTransformer.prototype.visitKeyedWrite = function (ast, context) {
	        return new KeyedWrite(ast.obj.visit(this), ast.key.visit(this), ast.value.visit(this));
	    };
	    AstTransformer.prototype.visitAll = function (asts) {
	        var res = collection_1.ListWrapper.createFixedSize(asts.length);
	        for (var i = 0; i < asts.length; ++i) {
	            res[i] = asts[i].visit(this);
	        }
	        return res;
	    };
	    AstTransformer.prototype.visitChain = function (ast, context) { return new Chain(this.visitAll(ast.expressions)); };
	    AstTransformer.prototype.visitQuote = function (ast, context) {
	        return new Quote(ast.prefix, ast.uninterpretedExpression, ast.location);
	    };
	    return AstTransformer;
	}());
	exports.AstTransformer = AstTransformer;
	//# sourceMappingURL=ast.js.map

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var chars = __webpack_require__(551);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var interpolation_config_1 = __webpack_require__(552);
	var ast_1 = __webpack_require__(549);
	var lexer_1 = __webpack_require__(553);
	var _implicitReceiver = new ast_1.ImplicitReceiver();
	var ParseException = (function (_super) {
	    __extends(ParseException, _super);
	    function ParseException(message, input, errLocation, ctxLocation) {
	        _super.call(this, "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation);
	    }
	    return ParseException;
	}(exceptions_1.BaseException));
	var SplitInterpolation = (function () {
	    function SplitInterpolation(strings, expressions) {
	        this.strings = strings;
	        this.expressions = expressions;
	    }
	    return SplitInterpolation;
	}());
	exports.SplitInterpolation = SplitInterpolation;
	var TemplateBindingParseResult = (function () {
	    function TemplateBindingParseResult(templateBindings, warnings) {
	        this.templateBindings = templateBindings;
	        this.warnings = warnings;
	    }
	    return TemplateBindingParseResult;
	}());
	exports.TemplateBindingParseResult = TemplateBindingParseResult;
	function _createInterpolateRegExp(config) {
	    var regexp = lang_1.escapeRegExp(config.start) + '([\\s\\S]*?)' + lang_1.escapeRegExp(config.end);
	    return lang_1.RegExpWrapper.create(regexp, 'g');
	}
	var Parser = (function () {
	    function Parser(/** @internal */ _lexer) {
	        this._lexer = _lexer;
	    }
	    Parser.prototype.parseAction = function (input, location, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        this._checkNoInterpolation(input, location, interpolationConfig);
	        var tokens = this._lexer.tokenize(this._stripComments(input));
	        var ast = new _ParseAST(input, location, tokens, true).parseChain();
	        return new ast_1.ASTWithSource(ast, input, location);
	    };
	    Parser.prototype.parseBinding = function (input, location, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        var ast = this._parseBindingAst(input, location, interpolationConfig);
	        return new ast_1.ASTWithSource(ast, input, location);
	    };
	    Parser.prototype.parseSimpleBinding = function (input, location, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        var ast = this._parseBindingAst(input, location, interpolationConfig);
	        if (!SimpleExpressionChecker.check(ast)) {
	            throw new ParseException('Host binding expression can only contain field access and constants', input, location);
	        }
	        return new ast_1.ASTWithSource(ast, input, location);
	    };
	    Parser.prototype._parseBindingAst = function (input, location, interpolationConfig) {
	        // Quotes expressions use 3rd-party expression language. We don't want to use
	        // our lexer or parser for that, so we check for that ahead of time.
	        var quote = this._parseQuote(input, location);
	        if (lang_1.isPresent(quote)) {
	            return quote;
	        }
	        this._checkNoInterpolation(input, location, interpolationConfig);
	        var tokens = this._lexer.tokenize(this._stripComments(input));
	        return new _ParseAST(input, location, tokens, false).parseChain();
	    };
	    Parser.prototype._parseQuote = function (input, location) {
	        if (lang_1.isBlank(input))
	            return null;
	        var prefixSeparatorIndex = input.indexOf(':');
	        if (prefixSeparatorIndex == -1)
	            return null;
	        var prefix = input.substring(0, prefixSeparatorIndex).trim();
	        if (!lexer_1.isIdentifier(prefix))
	            return null;
	        var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
	        return new ast_1.Quote(prefix, uninterpretedExpression, location);
	    };
	    Parser.prototype.parseTemplateBindings = function (input, location) {
	        var tokens = this._lexer.tokenize(input);
	        return new _ParseAST(input, location, tokens, false).parseTemplateBindings();
	    };
	    Parser.prototype.parseInterpolation = function (input, location, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        var split = this.splitInterpolation(input, location, interpolationConfig);
	        if (split == null)
	            return null;
	        var expressions = [];
	        for (var i = 0; i < split.expressions.length; ++i) {
	            var tokens = this._lexer.tokenize(this._stripComments(split.expressions[i]));
	            var ast = new _ParseAST(input, location, tokens, false).parseChain();
	            expressions.push(ast);
	        }
	        return new ast_1.ASTWithSource(new ast_1.Interpolation(split.strings, expressions), input, location);
	    };
	    Parser.prototype.splitInterpolation = function (input, location, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        var regexp = _createInterpolateRegExp(interpolationConfig);
	        var parts = lang_1.StringWrapper.split(input, regexp);
	        if (parts.length <= 1) {
	            return null;
	        }
	        var strings = [];
	        var expressions = [];
	        for (var i = 0; i < parts.length; i++) {
	            var part = parts[i];
	            if (i % 2 === 0) {
	                // fixed string
	                strings.push(part);
	            }
	            else if (part.trim().length > 0) {
	                expressions.push(part);
	            }
	            else {
	                throw new ParseException('Blank expressions are not allowed in interpolated strings', input, "at column " + this._findInterpolationErrorColumn(parts, i, interpolationConfig) + " in", location);
	            }
	        }
	        return new SplitInterpolation(strings, expressions);
	    };
	    Parser.prototype.wrapLiteralPrimitive = function (input, location) {
	        return new ast_1.ASTWithSource(new ast_1.LiteralPrimitive(input), input, location);
	    };
	    Parser.prototype._stripComments = function (input) {
	        var i = this._commentStart(input);
	        return lang_1.isPresent(i) ? input.substring(0, i).trim() : input;
	    };
	    Parser.prototype._commentStart = function (input) {
	        var outerQuote = null;
	        for (var i = 0; i < input.length - 1; i++) {
	            var char = lang_1.StringWrapper.charCodeAt(input, i);
	            var nextChar = lang_1.StringWrapper.charCodeAt(input, i + 1);
	            if (char === chars.$SLASH && nextChar == chars.$SLASH && lang_1.isBlank(outerQuote))
	                return i;
	            if (outerQuote === char) {
	                outerQuote = null;
	            }
	            else if (lang_1.isBlank(outerQuote) && lexer_1.isQuote(char)) {
	                outerQuote = char;
	            }
	        }
	        return null;
	    };
	    Parser.prototype._checkNoInterpolation = function (input, location, interpolationConfig) {
	        var regexp = _createInterpolateRegExp(interpolationConfig);
	        var parts = lang_1.StringWrapper.split(input, regexp);
	        if (parts.length > 1) {
	            throw new ParseException("Got interpolation (" + interpolationConfig.start + interpolationConfig.end + ") where expression was expected", input, "at column " + this._findInterpolationErrorColumn(parts, 1, interpolationConfig) + " in", location);
	        }
	    };
	    Parser.prototype._findInterpolationErrorColumn = function (parts, partInErrIdx, interpolationConfig) {
	        var errLocation = '';
	        for (var j = 0; j < partInErrIdx; j++) {
	            errLocation += j % 2 === 0 ?
	                parts[j] :
	                "" + interpolationConfig.start + parts[j] + interpolationConfig.end;
	        }
	        return errLocation.length;
	    };
	    /** @nocollapse */
	    Parser.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    Parser.ctorParameters = [
	        { type: lexer_1.Lexer, },
	    ];
	    return Parser;
	}());
	exports.Parser = Parser;
	var _ParseAST = (function () {
	    function _ParseAST(input, location, tokens, parseAction) {
	        this.input = input;
	        this.location = location;
	        this.tokens = tokens;
	        this.parseAction = parseAction;
	        this.index = 0;
	    }
	    _ParseAST.prototype.peek = function (offset) {
	        var i = this.index + offset;
	        return i < this.tokens.length ? this.tokens[i] : lexer_1.EOF;
	    };
	    Object.defineProperty(_ParseAST.prototype, "next", {
	        get: function () { return this.peek(0); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(_ParseAST.prototype, "inputIndex", {
	        get: function () {
	            return (this.index < this.tokens.length) ? this.next.index : this.input.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    _ParseAST.prototype.advance = function () { this.index++; };
	    _ParseAST.prototype.optionalCharacter = function (code) {
	        if (this.next.isCharacter(code)) {
	            this.advance();
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    _ParseAST.prototype.peekKeywordLet = function () { return this.next.isKeywordLet(); };
	    _ParseAST.prototype.peekDeprecatedKeywordVar = function () { return this.next.isKeywordDeprecatedVar(); };
	    _ParseAST.prototype.peekDeprecatedOperatorHash = function () { return this.next.isOperator('#'); };
	    _ParseAST.prototype.expectCharacter = function (code) {
	        if (this.optionalCharacter(code))
	            return;
	        this.error("Missing expected " + lang_1.StringWrapper.fromCharCode(code));
	    };
	    _ParseAST.prototype.optionalOperator = function (op) {
	        if (this.next.isOperator(op)) {
	            this.advance();
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    _ParseAST.prototype.expectOperator = function (operator) {
	        if (this.optionalOperator(operator))
	            return;
	        this.error("Missing expected operator " + operator);
	    };
	    _ParseAST.prototype.expectIdentifierOrKeyword = function () {
	        var n = this.next;
	        if (!n.isIdentifier() && !n.isKeyword()) {
	            this.error("Unexpected token " + n + ", expected identifier or keyword");
	        }
	        this.advance();
	        return n.toString();
	    };
	    _ParseAST.prototype.expectIdentifierOrKeywordOrString = function () {
	        var n = this.next;
	        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
	            this.error("Unexpected token " + n + ", expected identifier, keyword, or string");
	        }
	        this.advance();
	        return n.toString();
	    };
	    _ParseAST.prototype.parseChain = function () {
	        var exprs = [];
	        while (this.index < this.tokens.length) {
	            var expr = this.parsePipe();
	            exprs.push(expr);
	            if (this.optionalCharacter(chars.$SEMICOLON)) {
	                if (!this.parseAction) {
	                    this.error('Binding expression cannot contain chained expression');
	                }
	                while (this.optionalCharacter(chars.$SEMICOLON)) {
	                } // read all semicolons
	            }
	            else if (this.index < this.tokens.length) {
	                this.error("Unexpected token '" + this.next + "'");
	            }
	        }
	        if (exprs.length == 0)
	            return new ast_1.EmptyExpr();
	        if (exprs.length == 1)
	            return exprs[0];
	        return new ast_1.Chain(exprs);
	    };
	    _ParseAST.prototype.parsePipe = function () {
	        var result = this.parseExpression();
	        if (this.optionalOperator('|')) {
	            if (this.parseAction) {
	                this.error('Cannot have a pipe in an action expression');
	            }
	            do {
	                var name = this.expectIdentifierOrKeyword();
	                var args = [];
	                while (this.optionalCharacter(chars.$COLON)) {
	                    args.push(this.parseExpression());
	                }
	                result = new ast_1.BindingPipe(result, name, args);
	            } while (this.optionalOperator('|'));
	        }
	        return result;
	    };
	    _ParseAST.prototype.parseExpression = function () { return this.parseConditional(); };
	    _ParseAST.prototype.parseConditional = function () {
	        var start = this.inputIndex;
	        var result = this.parseLogicalOr();
	        if (this.optionalOperator('?')) {
	            var yes = this.parsePipe();
	            if (!this.optionalCharacter(chars.$COLON)) {
	                var end = this.inputIndex;
	                var expression = this.input.substring(start, end);
	                this.error("Conditional expression " + expression + " requires all 3 expressions");
	            }
	            var no = this.parsePipe();
	            return new ast_1.Conditional(result, yes, no);
	        }
	        else {
	            return result;
	        }
	    };
	    _ParseAST.prototype.parseLogicalOr = function () {
	        // '||'
	        var result = this.parseLogicalAnd();
	        while (this.optionalOperator('||')) {
	            result = new ast_1.Binary('||', result, this.parseLogicalAnd());
	        }
	        return result;
	    };
	    _ParseAST.prototype.parseLogicalAnd = function () {
	        // '&&'
	        var result = this.parseEquality();
	        while (this.optionalOperator('&&')) {
	            result = new ast_1.Binary('&&', result, this.parseEquality());
	        }
	        return result;
	    };
	    _ParseAST.prototype.parseEquality = function () {
	        // '==','!=','===','!=='
	        var result = this.parseRelational();
	        while (true) {
	            if (this.optionalOperator('==')) {
	                result = new ast_1.Binary('==', result, this.parseRelational());
	            }
	            else if (this.optionalOperator('===')) {
	                result = new ast_1.Binary('===', result, this.parseRelational());
	            }
	            else if (this.optionalOperator('!=')) {
	                result = new ast_1.Binary('!=', result, this.parseRelational());
	            }
	            else if (this.optionalOperator('!==')) {
	                result = new ast_1.Binary('!==', result, this.parseRelational());
	            }
	            else {
	                return result;
	            }
	        }
	    };
	    _ParseAST.prototype.parseRelational = function () {
	        // '<', '>', '<=', '>='
	        var result = this.parseAdditive();
	        while (true) {
	            if (this.optionalOperator('<')) {
	                result = new ast_1.Binary('<', result, this.parseAdditive());
	            }
	            else if (this.optionalOperator('>')) {
	                result = new ast_1.Binary('>', result, this.parseAdditive());
	            }
	            else if (this.optionalOperator('<=')) {
	                result = new ast_1.Binary('<=', result, this.parseAdditive());
	            }
	            else if (this.optionalOperator('>=')) {
	                result = new ast_1.Binary('>=', result, this.parseAdditive());
	            }
	            else {
	                return result;
	            }
	        }
	    };
	    _ParseAST.prototype.parseAdditive = function () {
	        // '+', '-'
	        var result = this.parseMultiplicative();
	        while (true) {
	            if (this.optionalOperator('+')) {
	                result = new ast_1.Binary('+', result, this.parseMultiplicative());
	            }
	            else if (this.optionalOperator('-')) {
	                result = new ast_1.Binary('-', result, this.parseMultiplicative());
	            }
	            else {
	                return result;
	            }
	        }
	    };
	    _ParseAST.prototype.parseMultiplicative = function () {
	        // '*', '%', '/'
	        var result = this.parsePrefix();
	        while (true) {
	            if (this.optionalOperator('*')) {
	                result = new ast_1.Binary('*', result, this.parsePrefix());
	            }
	            else if (this.optionalOperator('%')) {
	                result = new ast_1.Binary('%', result, this.parsePrefix());
	            }
	            else if (this.optionalOperator('/')) {
	                result = new ast_1.Binary('/', result, this.parsePrefix());
	            }
	            else {
	                return result;
	            }
	        }
	    };
	    _ParseAST.prototype.parsePrefix = function () {
	        if (this.optionalOperator('+')) {
	            return this.parsePrefix();
	        }
	        else if (this.optionalOperator('-')) {
	            return new ast_1.Binary('-', new ast_1.LiteralPrimitive(0), this.parsePrefix());
	        }
	        else if (this.optionalOperator('!')) {
	            return new ast_1.PrefixNot(this.parsePrefix());
	        }
	        else {
	            return this.parseCallChain();
	        }
	    };
	    _ParseAST.prototype.parseCallChain = function () {
	        var result = this.parsePrimary();
	        while (true) {
	            if (this.optionalCharacter(chars.$PERIOD)) {
	                result = this.parseAccessMemberOrMethodCall(result, false);
	            }
	            else if (this.optionalOperator('?.')) {
	                result = this.parseAccessMemberOrMethodCall(result, true);
	            }
	            else if (this.optionalCharacter(chars.$LBRACKET)) {
	                var key = this.parsePipe();
	                this.expectCharacter(chars.$RBRACKET);
	                if (this.optionalOperator('=')) {
	                    var value = this.parseConditional();
	                    result = new ast_1.KeyedWrite(result, key, value);
	                }
	                else {
	                    result = new ast_1.KeyedRead(result, key);
	                }
	            }
	            else if (this.optionalCharacter(chars.$LPAREN)) {
	                var args = this.parseCallArguments();
	                this.expectCharacter(chars.$RPAREN);
	                result = new ast_1.FunctionCall(result, args);
	            }
	            else {
	                return result;
	            }
	        }
	    };
	    _ParseAST.prototype.parsePrimary = function () {
	        if (this.optionalCharacter(chars.$LPAREN)) {
	            var result = this.parsePipe();
	            this.expectCharacter(chars.$RPAREN);
	            return result;
	        }
	        else if (this.next.isKeywordNull() || this.next.isKeywordUndefined()) {
	            this.advance();
	            return new ast_1.LiteralPrimitive(null);
	        }
	        else if (this.next.isKeywordTrue()) {
	            this.advance();
	            return new ast_1.LiteralPrimitive(true);
	        }
	        else if (this.next.isKeywordFalse()) {
	            this.advance();
	            return new ast_1.LiteralPrimitive(false);
	        }
	        else if (this.optionalCharacter(chars.$LBRACKET)) {
	            var elements = this.parseExpressionList(chars.$RBRACKET);
	            this.expectCharacter(chars.$RBRACKET);
	            return new ast_1.LiteralArray(elements);
	        }
	        else if (this.next.isCharacter(chars.$LBRACE)) {
	            return this.parseLiteralMap();
	        }
	        else if (this.next.isIdentifier()) {
	            return this.parseAccessMemberOrMethodCall(_implicitReceiver, false);
	        }
	        else if (this.next.isNumber()) {
	            var value = this.next.toNumber();
	            this.advance();
	            return new ast_1.LiteralPrimitive(value);
	        }
	        else if (this.next.isString()) {
	            var literalValue = this.next.toString();
	            this.advance();
	            return new ast_1.LiteralPrimitive(literalValue);
	        }
	        else if (this.index >= this.tokens.length) {
	            this.error("Unexpected end of expression: " + this.input);
	        }
	        else {
	            this.error("Unexpected token " + this.next);
	        }
	        // error() throws, so we don't reach here.
	        throw new exceptions_1.BaseException('Fell through all cases in parsePrimary');
	    };
	    _ParseAST.prototype.parseExpressionList = function (terminator) {
	        var result = [];
	        if (!this.next.isCharacter(terminator)) {
	            do {
	                result.push(this.parsePipe());
	            } while (this.optionalCharacter(chars.$COMMA));
	        }
	        return result;
	    };
	    _ParseAST.prototype.parseLiteralMap = function () {
	        var keys = [];
	        var values = [];
	        this.expectCharacter(chars.$LBRACE);
	        if (!this.optionalCharacter(chars.$RBRACE)) {
	            do {
	                var key = this.expectIdentifierOrKeywordOrString();
	                keys.push(key);
	                this.expectCharacter(chars.$COLON);
	                values.push(this.parsePipe());
	            } while (this.optionalCharacter(chars.$COMMA));
	            this.expectCharacter(chars.$RBRACE);
	        }
	        return new ast_1.LiteralMap(keys, values);
	    };
	    _ParseAST.prototype.parseAccessMemberOrMethodCall = function (receiver, isSafe) {
	        if (isSafe === void 0) { isSafe = false; }
	        var id = this.expectIdentifierOrKeyword();
	        if (this.optionalCharacter(chars.$LPAREN)) {
	            var args = this.parseCallArguments();
	            this.expectCharacter(chars.$RPAREN);
	            return isSafe ? new ast_1.SafeMethodCall(receiver, id, args) : new ast_1.MethodCall(receiver, id, args);
	        }
	        else {
	            if (isSafe) {
	                if (this.optionalOperator('=')) {
	                    this.error('The \'?.\' operator cannot be used in the assignment');
	                }
	                else {
	                    return new ast_1.SafePropertyRead(receiver, id);
	                }
	            }
	            else {
	                if (this.optionalOperator('=')) {
	                    if (!this.parseAction) {
	                        this.error('Bindings cannot contain assignments');
	                    }
	                    var value = this.parseConditional();
	                    return new ast_1.PropertyWrite(receiver, id, value);
	                }
	                else {
	                    return new ast_1.PropertyRead(receiver, id);
	                }
	            }
	        }
	        return null;
	    };
	    _ParseAST.prototype.parseCallArguments = function () {
	        if (this.next.isCharacter(chars.$RPAREN))
	            return [];
	        var positionals = [];
	        do {
	            positionals.push(this.parsePipe());
	        } while (this.optionalCharacter(chars.$COMMA));
	        return positionals;
	    };
	    /**
	     * An identifier, a keyword, a string with an optional `-` inbetween.
	     */
	    _ParseAST.prototype.expectTemplateBindingKey = function () {
	        var result = '';
	        var operatorFound = false;
	        do {
	            result += this.expectIdentifierOrKeywordOrString();
	            operatorFound = this.optionalOperator('-');
	            if (operatorFound) {
	                result += '-';
	            }
	        } while (operatorFound);
	        return result.toString();
	    };
	    _ParseAST.prototype.parseTemplateBindings = function () {
	        var bindings = [];
	        var prefix = null;
	        var warnings = [];
	        while (this.index < this.tokens.length) {
	            var keyIsVar = this.peekKeywordLet();
	            if (!keyIsVar && this.peekDeprecatedKeywordVar()) {
	                keyIsVar = true;
	                warnings.push("\"var\" inside of expressions is deprecated. Use \"let\" instead!");
	            }
	            if (!keyIsVar && this.peekDeprecatedOperatorHash()) {
	                keyIsVar = true;
	                warnings.push("\"#\" inside of expressions is deprecated. Use \"let\" instead!");
	            }
	            if (keyIsVar) {
	                this.advance();
	            }
	            var key = this.expectTemplateBindingKey();
	            if (!keyIsVar) {
	                if (prefix == null) {
	                    prefix = key;
	                }
	                else {
	                    key = prefix + key[0].toUpperCase() + key.substring(1);
	                }
	            }
	            this.optionalCharacter(chars.$COLON);
	            var name = null;
	            var expression = null;
	            if (keyIsVar) {
	                if (this.optionalOperator('=')) {
	                    name = this.expectTemplateBindingKey();
	                }
	                else {
	                    name = '\$implicit';
	                }
	            }
	            else if (this.next !== lexer_1.EOF && !this.peekKeywordLet() && !this.peekDeprecatedKeywordVar() &&
	                !this.peekDeprecatedOperatorHash()) {
	                var start = this.inputIndex;
	                var ast = this.parsePipe();
	                var source = this.input.substring(start, this.inputIndex);
	                expression = new ast_1.ASTWithSource(ast, source, this.location);
	            }
	            bindings.push(new ast_1.TemplateBinding(key, keyIsVar, name, expression));
	            if (!this.optionalCharacter(chars.$SEMICOLON)) {
	                this.optionalCharacter(chars.$COMMA);
	            }
	        }
	        return new TemplateBindingParseResult(bindings, warnings);
	    };
	    _ParseAST.prototype.error = function (message, index) {
	        if (index === void 0) { index = null; }
	        if (lang_1.isBlank(index))
	            index = this.index;
	        var location = (index < this.tokens.length) ? "at column " + (this.tokens[index].index + 1) + " in" :
	            "at the end of the expression";
	        throw new ParseException(message, this.input, location, this.location);
	    };
	    return _ParseAST;
	}());
	exports._ParseAST = _ParseAST;
	var SimpleExpressionChecker = (function () {
	    function SimpleExpressionChecker() {
	        this.simple = true;
	    }
	    SimpleExpressionChecker.check = function (ast) {
	        var s = new SimpleExpressionChecker();
	        ast.visit(s);
	        return s.simple;
	    };
	    SimpleExpressionChecker.prototype.visitImplicitReceiver = function (ast, context) { };
	    SimpleExpressionChecker.prototype.visitInterpolation = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitLiteralPrimitive = function (ast, context) { };
	    SimpleExpressionChecker.prototype.visitPropertyRead = function (ast, context) { };
	    SimpleExpressionChecker.prototype.visitPropertyWrite = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitSafePropertyRead = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitMethodCall = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitSafeMethodCall = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitFunctionCall = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitLiteralArray = function (ast, context) { this.visitAll(ast.expressions); };
	    SimpleExpressionChecker.prototype.visitLiteralMap = function (ast, context) { this.visitAll(ast.values); };
	    SimpleExpressionChecker.prototype.visitBinary = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitPrefixNot = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitConditional = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitPipe = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitKeyedRead = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitKeyedWrite = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitAll = function (asts) {
	        var res = collection_1.ListWrapper.createFixedSize(asts.length);
	        for (var i = 0; i < asts.length; ++i) {
	            res[i] = asts[i].visit(this);
	        }
	        return res;
	    };
	    SimpleExpressionChecker.prototype.visitChain = function (ast, context) { this.simple = false; };
	    SimpleExpressionChecker.prototype.visitQuote = function (ast, context) { this.simple = false; };
	    return SimpleExpressionChecker;
	}());
	//# sourceMappingURL=parser.js.map

/***/ }),

/***/ 551:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	exports.$EOF = 0;
	exports.$TAB = 9;
	exports.$LF = 10;
	exports.$VTAB = 11;
	exports.$FF = 12;
	exports.$CR = 13;
	exports.$SPACE = 32;
	exports.$BANG = 33;
	exports.$DQ = 34;
	exports.$HASH = 35;
	exports.$$ = 36;
	exports.$PERCENT = 37;
	exports.$AMPERSAND = 38;
	exports.$SQ = 39;
	exports.$LPAREN = 40;
	exports.$RPAREN = 41;
	exports.$STAR = 42;
	exports.$PLUS = 43;
	exports.$COMMA = 44;
	exports.$MINUS = 45;
	exports.$PERIOD = 46;
	exports.$SLASH = 47;
	exports.$COLON = 58;
	exports.$SEMICOLON = 59;
	exports.$LT = 60;
	exports.$EQ = 61;
	exports.$GT = 62;
	exports.$QUESTION = 63;
	exports.$0 = 48;
	exports.$9 = 57;
	exports.$A = 65;
	exports.$E = 69;
	exports.$F = 70;
	exports.$X = 88;
	exports.$Z = 90;
	exports.$LBRACKET = 91;
	exports.$BACKSLASH = 92;
	exports.$RBRACKET = 93;
	exports.$CARET = 94;
	exports.$_ = 95;
	exports.$a = 97;
	exports.$e = 101;
	exports.$f = 102;
	exports.$n = 110;
	exports.$r = 114;
	exports.$t = 116;
	exports.$u = 117;
	exports.$v = 118;
	exports.$x = 120;
	exports.$z = 122;
	exports.$LBRACE = 123;
	exports.$BAR = 124;
	exports.$RBRACE = 125;
	exports.$NBSP = 160;
	exports.$PIPE = 124;
	exports.$TILDA = 126;
	exports.$AT = 64;
	exports.$BT = 96;
	function isWhitespace(code) {
	    return (code >= exports.$TAB && code <= exports.$SPACE) || (code == exports.$NBSP);
	}
	exports.isWhitespace = isWhitespace;
	function isDigit(code) {
	    return exports.$0 <= code && code <= exports.$9;
	}
	exports.isDigit = isDigit;
	function isAsciiLetter(code) {
	    return code >= exports.$a && code <= exports.$z || code >= exports.$A && code <= exports.$Z;
	}
	exports.isAsciiLetter = isAsciiLetter;
	function isAsciiHexDigit(code) {
	    return code >= exports.$a && code <= exports.$f || code >= exports.$A && code <= exports.$F || isDigit(code);
	}
	exports.isAsciiHexDigit = isAsciiHexDigit;
	//# sourceMappingURL=chars.js.map

/***/ }),

/***/ 552:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	exports.DEFAULT_INTERPOLATION_CONFIG = {
	    start: '{{',
	    end: '}}'
	};
	//# sourceMappingURL=interpolation_config.js.map

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var chars = __webpack_require__(551);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	(function (TokenType) {
	    TokenType[TokenType["Character"] = 0] = "Character";
	    TokenType[TokenType["Identifier"] = 1] = "Identifier";
	    TokenType[TokenType["Keyword"] = 2] = "Keyword";
	    TokenType[TokenType["String"] = 3] = "String";
	    TokenType[TokenType["Operator"] = 4] = "Operator";
	    TokenType[TokenType["Number"] = 5] = "Number";
	})(exports.TokenType || (exports.TokenType = {}));
	var TokenType = exports.TokenType;
	var KEYWORDS = ['var', 'let', 'null', 'undefined', 'true', 'false', 'if', 'else'];
	var Lexer = (function () {
	    function Lexer() {
	    }
	    Lexer.prototype.tokenize = function (text) {
	        var scanner = new _Scanner(text);
	        var tokens = [];
	        var token = scanner.scanToken();
	        while (token != null) {
	            tokens.push(token);
	            token = scanner.scanToken();
	        }
	        return tokens;
	    };
	    /** @nocollapse */
	    Lexer.decorators = [
	        { type: core_1.Injectable },
	    ];
	    return Lexer;
	}());
	exports.Lexer = Lexer;
	var Token = (function () {
	    function Token(index, type, numValue, strValue) {
	        this.index = index;
	        this.type = type;
	        this.numValue = numValue;
	        this.strValue = strValue;
	    }
	    Token.prototype.isCharacter = function (code) {
	        return (this.type == TokenType.Character && this.numValue == code);
	    };
	    Token.prototype.isNumber = function () { return (this.type == TokenType.Number); };
	    Token.prototype.isString = function () { return (this.type == TokenType.String); };
	    Token.prototype.isOperator = function (operater) {
	        return (this.type == TokenType.Operator && this.strValue == operater);
	    };
	    Token.prototype.isIdentifier = function () { return (this.type == TokenType.Identifier); };
	    Token.prototype.isKeyword = function () { return (this.type == TokenType.Keyword); };
	    Token.prototype.isKeywordDeprecatedVar = function () {
	        return (this.type == TokenType.Keyword && this.strValue == 'var');
	    };
	    Token.prototype.isKeywordLet = function () { return (this.type == TokenType.Keyword && this.strValue == 'let'); };
	    Token.prototype.isKeywordNull = function () { return (this.type == TokenType.Keyword && this.strValue == 'null'); };
	    Token.prototype.isKeywordUndefined = function () {
	        return (this.type == TokenType.Keyword && this.strValue == 'undefined');
	    };
	    Token.prototype.isKeywordTrue = function () { return (this.type == TokenType.Keyword && this.strValue == 'true'); };
	    Token.prototype.isKeywordFalse = function () { return (this.type == TokenType.Keyword && this.strValue == 'false'); };
	    Token.prototype.toNumber = function () {
	        // -1 instead of NULL ok?
	        return (this.type == TokenType.Number) ? this.numValue : -1;
	    };
	    Token.prototype.toString = function () {
	        switch (this.type) {
	            case TokenType.Character:
	            case TokenType.Identifier:
	            case TokenType.Keyword:
	            case TokenType.Operator:
	            case TokenType.String:
	                return this.strValue;
	            case TokenType.Number:
	                return this.numValue.toString();
	            default:
	                return null;
	        }
	    };
	    return Token;
	}());
	exports.Token = Token;
	function newCharacterToken(index, code) {
	    return new Token(index, TokenType.Character, code, lang_1.StringWrapper.fromCharCode(code));
	}
	function newIdentifierToken(index, text) {
	    return new Token(index, TokenType.Identifier, 0, text);
	}
	function newKeywordToken(index, text) {
	    return new Token(index, TokenType.Keyword, 0, text);
	}
	function newOperatorToken(index, text) {
	    return new Token(index, TokenType.Operator, 0, text);
	}
	function newStringToken(index, text) {
	    return new Token(index, TokenType.String, 0, text);
	}
	function newNumberToken(index, n) {
	    return new Token(index, TokenType.Number, n, '');
	}
	exports.EOF = new Token(-1, TokenType.Character, 0, '');
	var ScannerError = (function (_super) {
	    __extends(ScannerError, _super);
	    function ScannerError(message) {
	        _super.call(this);
	        this.message = message;
	    }
	    ScannerError.prototype.toString = function () { return this.message; };
	    return ScannerError;
	}(exceptions_1.BaseException));
	exports.ScannerError = ScannerError;
	var _Scanner = (function () {
	    function _Scanner(input) {
	        this.input = input;
	        this.peek = 0;
	        this.index = -1;
	        this.length = input.length;
	        this.advance();
	    }
	    _Scanner.prototype.advance = function () {
	        this.peek =
	            ++this.index >= this.length ? chars.$EOF : lang_1.StringWrapper.charCodeAt(this.input, this.index);
	    };
	    _Scanner.prototype.scanToken = function () {
	        var input = this.input, length = this.length, peek = this.peek, index = this.index;
	        // Skip whitespace.
	        while (peek <= chars.$SPACE) {
	            if (++index >= length) {
	                peek = chars.$EOF;
	                break;
	            }
	            else {
	                peek = lang_1.StringWrapper.charCodeAt(input, index);
	            }
	        }
	        this.peek = peek;
	        this.index = index;
	        if (index >= length) {
	            return null;
	        }
	        // Handle identifiers and numbers.
	        if (isIdentifierStart(peek))
	            return this.scanIdentifier();
	        if (chars.isDigit(peek))
	            return this.scanNumber(index);
	        var start = index;
	        switch (peek) {
	            case chars.$PERIOD:
	                this.advance();
	                return chars.isDigit(this.peek) ? this.scanNumber(start) :
	                    newCharacterToken(start, chars.$PERIOD);
	            case chars.$LPAREN:
	            case chars.$RPAREN:
	            case chars.$LBRACE:
	            case chars.$RBRACE:
	            case chars.$LBRACKET:
	            case chars.$RBRACKET:
	            case chars.$COMMA:
	            case chars.$COLON:
	            case chars.$SEMICOLON:
	                return this.scanCharacter(start, peek);
	            case chars.$SQ:
	            case chars.$DQ:
	                return this.scanString();
	            case chars.$HASH:
	            case chars.$PLUS:
	            case chars.$MINUS:
	            case chars.$STAR:
	            case chars.$SLASH:
	            case chars.$PERCENT:
	            case chars.$CARET:
	                return this.scanOperator(start, lang_1.StringWrapper.fromCharCode(peek));
	            case chars.$QUESTION:
	                return this.scanComplexOperator(start, '?', chars.$PERIOD, '.');
	            case chars.$LT:
	            case chars.$GT:
	                return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), chars.$EQ, '=');
	            case chars.$BANG:
	            case chars.$EQ:
	                return this.scanComplexOperator(start, lang_1.StringWrapper.fromCharCode(peek), chars.$EQ, '=', chars.$EQ, '=');
	            case chars.$AMPERSAND:
	                return this.scanComplexOperator(start, '&', chars.$AMPERSAND, '&');
	            case chars.$BAR:
	                return this.scanComplexOperator(start, '|', chars.$BAR, '|');
	            case chars.$NBSP:
	                while (chars.isWhitespace(this.peek))
	                    this.advance();
	                return this.scanToken();
	        }
	        this.error("Unexpected character [" + lang_1.StringWrapper.fromCharCode(peek) + "]", 0);
	        return null;
	    };
	    _Scanner.prototype.scanCharacter = function (start, code) {
	        this.advance();
	        return newCharacterToken(start, code);
	    };
	    _Scanner.prototype.scanOperator = function (start, str) {
	        this.advance();
	        return newOperatorToken(start, str);
	    };
	    /**
	     * Tokenize a 2/3 char long operator
	     *
	     * @param start start index in the expression
	     * @param one first symbol (always part of the operator)
	     * @param twoCode code point for the second symbol
	     * @param two second symbol (part of the operator when the second code point matches)
	     * @param threeCode code point for the third symbol
	     * @param three third symbol (part of the operator when provided and matches source expression)
	     * @returns {Token}
	     */
	    _Scanner.prototype.scanComplexOperator = function (start, one, twoCode, two, threeCode, three) {
	        this.advance();
	        var str = one;
	        if (this.peek == twoCode) {
	            this.advance();
	            str += two;
	        }
	        if (lang_1.isPresent(threeCode) && this.peek == threeCode) {
	            this.advance();
	            str += three;
	        }
	        return newOperatorToken(start, str);
	    };
	    _Scanner.prototype.scanIdentifier = function () {
	        var start = this.index;
	        this.advance();
	        while (isIdentifierPart(this.peek))
	            this.advance();
	        var str = this.input.substring(start, this.index);
	        return KEYWORDS.indexOf(str) > -1 ? newKeywordToken(start, str) :
	            newIdentifierToken(start, str);
	    };
	    _Scanner.prototype.scanNumber = function (start) {
	        var simple = (this.index === start);
	        this.advance(); // Skip initial digit.
	        while (true) {
	            if (chars.isDigit(this.peek)) {
	            }
	            else if (this.peek == chars.$PERIOD) {
	                simple = false;
	            }
	            else if (isExponentStart(this.peek)) {
	                this.advance();
	                if (isExponentSign(this.peek))
	                    this.advance();
	                if (!chars.isDigit(this.peek))
	                    this.error('Invalid exponent', -1);
	                simple = false;
	            }
	            else {
	                break;
	            }
	            this.advance();
	        }
	        var str = this.input.substring(start, this.index);
	        var value = simple ? lang_1.NumberWrapper.parseIntAutoRadix(str) : lang_1.NumberWrapper.parseFloat(str);
	        return newNumberToken(start, value);
	    };
	    _Scanner.prototype.scanString = function () {
	        var start = this.index;
	        var quote = this.peek;
	        this.advance(); // Skip initial quote.
	        var buffer;
	        var marker = this.index;
	        var input = this.input;
	        while (this.peek != quote) {
	            if (this.peek == chars.$BACKSLASH) {
	                if (buffer == null)
	                    buffer = new lang_1.StringJoiner();
	                buffer.add(input.substring(marker, this.index));
	                this.advance();
	                var unescapedCode;
	                if (this.peek == chars.$u) {
	                    // 4 character hex code for unicode character.
	                    var hex = input.substring(this.index + 1, this.index + 5);
	                    try {
	                        unescapedCode = lang_1.NumberWrapper.parseInt(hex, 16);
	                    }
	                    catch (e) {
	                        this.error("Invalid unicode escape [\\u" + hex + "]", 0);
	                    }
	                    for (var i = 0; i < 5; i++) {
	                        this.advance();
	                    }
	                }
	                else {
	                    unescapedCode = unescape(this.peek);
	                    this.advance();
	                }
	                buffer.add(lang_1.StringWrapper.fromCharCode(unescapedCode));
	                marker = this.index;
	            }
	            else if (this.peek == chars.$EOF) {
	                this.error('Unterminated quote', 0);
	            }
	            else {
	                this.advance();
	            }
	        }
	        var last = input.substring(marker, this.index);
	        this.advance(); // Skip terminating quote.
	        // Compute the unescaped string value.
	        var unescaped = last;
	        if (buffer != null) {
	            buffer.add(last);
	            unescaped = buffer.toString();
	        }
	        return newStringToken(start, unescaped);
	    };
	    _Scanner.prototype.error = function (message, offset) {
	        var position = this.index + offset;
	        throw new ScannerError("Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]");
	    };
	    return _Scanner;
	}());
	function isIdentifierStart(code) {
	    return (chars.$a <= code && code <= chars.$z) || (chars.$A <= code && code <= chars.$Z) ||
	        (code == chars.$_) || (code == chars.$$);
	}
	function isIdentifier(input) {
	    if (input.length == 0)
	        return false;
	    var scanner = new _Scanner(input);
	    if (!isIdentifierStart(scanner.peek))
	        return false;
	    scanner.advance();
	    while (scanner.peek !== chars.$EOF) {
	        if (!isIdentifierPart(scanner.peek))
	            return false;
	        scanner.advance();
	    }
	    return true;
	}
	exports.isIdentifier = isIdentifier;
	function isIdentifierPart(code) {
	    return chars.isAsciiLetter(code) || chars.isDigit(code) || (code == chars.$_) ||
	        (code == chars.$$);
	}
	function isExponentStart(code) {
	    return code == chars.$e || code == chars.$E;
	}
	function isExponentSign(code) {
	    return code == chars.$MINUS || code == chars.$PLUS;
	}
	function isQuote(code) {
	    return code === chars.$SQ || code === chars.$DQ || code === chars.$BT;
	}
	exports.isQuote = isQuote;
	function unescape(code) {
	    switch (code) {
	        case chars.$n:
	            return chars.$LF;
	        case chars.$f:
	            return chars.$FF;
	        case chars.$r:
	            return chars.$CR;
	        case chars.$t:
	            return chars.$TAB;
	        case chars.$v:
	            return chars.$VTAB;
	        default:
	            return code;
	    }
	}
	//# sourceMappingURL=lexer.js.map

/***/ }),

/***/ 554:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var lang_1 = __webpack_require__(542);
	var collection_1 = __webpack_require__(545);
	var html_ast_1 = __webpack_require__(555);
	var html_lexer_1 = __webpack_require__(556);
	var parse_util_1 = __webpack_require__(558);
	var html_tags_1 = __webpack_require__(557);
	var HtmlTreeError = (function (_super) {
	    __extends(HtmlTreeError, _super);
	    function HtmlTreeError(elementName, span, msg) {
	        _super.call(this, span, msg);
	        this.elementName = elementName;
	    }
	    HtmlTreeError.create = function (elementName, span, msg) {
	        return new HtmlTreeError(elementName, span, msg);
	    };
	    return HtmlTreeError;
	}(parse_util_1.ParseError));
	exports.HtmlTreeError = HtmlTreeError;
	var HtmlParseTreeResult = (function () {
	    function HtmlParseTreeResult(rootNodes, errors) {
	        this.rootNodes = rootNodes;
	        this.errors = errors;
	    }
	    return HtmlParseTreeResult;
	}());
	exports.HtmlParseTreeResult = HtmlParseTreeResult;
	var HtmlParser = (function () {
	    function HtmlParser() {
	    }
	    HtmlParser.prototype.parse = function (sourceContent, sourceUrl, parseExpansionForms) {
	        if (parseExpansionForms === void 0) { parseExpansionForms = false; }
	        var tokensAndErrors = html_lexer_1.tokenizeHtml(sourceContent, sourceUrl, parseExpansionForms);
	        var treeAndErrors = new TreeBuilder(tokensAndErrors.tokens).build();
	        return new HtmlParseTreeResult(treeAndErrors.rootNodes, tokensAndErrors.errors.concat(treeAndErrors.errors));
	    };
	    /** @nocollapse */
	    HtmlParser.decorators = [
	        { type: core_1.Injectable },
	    ];
	    return HtmlParser;
	}());
	exports.HtmlParser = HtmlParser;
	var TreeBuilder = (function () {
	    function TreeBuilder(tokens) {
	        this.tokens = tokens;
	        this.index = -1;
	        this.rootNodes = [];
	        this.errors = [];
	        this.elementStack = [];
	        this._advance();
	    }
	    TreeBuilder.prototype.build = function () {
	        while (this.peek.type !== html_lexer_1.HtmlTokenType.EOF) {
	            if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_START) {
	                this._consumeStartTag(this._advance());
	            }
	            else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_CLOSE) {
	                this._consumeEndTag(this._advance());
	            }
	            else if (this.peek.type === html_lexer_1.HtmlTokenType.CDATA_START) {
	                this._closeVoidElement();
	                this._consumeCdata(this._advance());
	            }
	            else if (this.peek.type === html_lexer_1.HtmlTokenType.COMMENT_START) {
	                this._closeVoidElement();
	                this._consumeComment(this._advance());
	            }
	            else if (this.peek.type === html_lexer_1.HtmlTokenType.TEXT || this.peek.type === html_lexer_1.HtmlTokenType.RAW_TEXT ||
	                this.peek.type === html_lexer_1.HtmlTokenType.ESCAPABLE_RAW_TEXT) {
	                this._closeVoidElement();
	                this._consumeText(this._advance());
	            }
	            else if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_START) {
	                this._consumeExpansion(this._advance());
	            }
	            else {
	                // Skip all other tokens...
	                this._advance();
	            }
	        }
	        return new HtmlParseTreeResult(this.rootNodes, this.errors);
	    };
	    TreeBuilder.prototype._advance = function () {
	        var prev = this.peek;
	        if (this.index < this.tokens.length - 1) {
	            // Note: there is always an EOF token at the end
	            this.index++;
	        }
	        this.peek = this.tokens[this.index];
	        return prev;
	    };
	    TreeBuilder.prototype._advanceIf = function (type) {
	        if (this.peek.type === type) {
	            return this._advance();
	        }
	        return null;
	    };
	    TreeBuilder.prototype._consumeCdata = function (startToken) {
	        this._consumeText(this._advance());
	        this._advanceIf(html_lexer_1.HtmlTokenType.CDATA_END);
	    };
	    TreeBuilder.prototype._consumeComment = function (token) {
	        var text = this._advanceIf(html_lexer_1.HtmlTokenType.RAW_TEXT);
	        this._advanceIf(html_lexer_1.HtmlTokenType.COMMENT_END);
	        var value = lang_1.isPresent(text) ? text.parts[0].trim() : null;
	        this._addToParent(new html_ast_1.HtmlCommentAst(value, token.sourceSpan));
	    };
	    TreeBuilder.prototype._consumeExpansion = function (token) {
	        var switchValue = this._advance();
	        var type = this._advance();
	        var cases = [];
	        // read =
	        while (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_VALUE) {
	            var expCase = this._parseExpansionCase();
	            if (lang_1.isBlank(expCase))
	                return; // error
	            cases.push(expCase);
	        }
	        // read the final }
	        if (this.peek.type !== html_lexer_1.HtmlTokenType.EXPANSION_FORM_END) {
	            this.errors.push(HtmlTreeError.create(null, this.peek.sourceSpan, "Invalid expansion form. Missing '}'."));
	            return;
	        }
	        this._advance();
	        var mainSourceSpan = new parse_util_1.ParseSourceSpan(token.sourceSpan.start, this.peek.sourceSpan.end);
	        this._addToParent(new html_ast_1.HtmlExpansionAst(switchValue.parts[0], type.parts[0], cases, mainSourceSpan, switchValue.sourceSpan));
	    };
	    TreeBuilder.prototype._parseExpansionCase = function () {
	        var value = this._advance();
	        // read {
	        if (this.peek.type !== html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START) {
	            this.errors.push(HtmlTreeError.create(null, this.peek.sourceSpan, "Invalid expansion form. Missing '{'.,"));
	            return null;
	        }
	        // read until }
	        var start = this._advance();
	        var exp = this._collectExpansionExpTokens(start);
	        if (lang_1.isBlank(exp))
	            return null;
	        var end = this._advance();
	        exp.push(new html_lexer_1.HtmlToken(html_lexer_1.HtmlTokenType.EOF, [], end.sourceSpan));
	        // parse everything in between { and }
	        var parsedExp = new TreeBuilder(exp).build();
	        if (parsedExp.errors.length > 0) {
	            this.errors = this.errors.concat(parsedExp.errors);
	            return null;
	        }
	        var sourceSpan = new parse_util_1.ParseSourceSpan(value.sourceSpan.start, end.sourceSpan.end);
	        var expSourceSpan = new parse_util_1.ParseSourceSpan(start.sourceSpan.start, end.sourceSpan.end);
	        return new html_ast_1.HtmlExpansionCaseAst(value.parts[0], parsedExp.rootNodes, sourceSpan, value.sourceSpan, expSourceSpan);
	    };
	    TreeBuilder.prototype._collectExpansionExpTokens = function (start) {
	        var exp = [];
	        var expansionFormStack = [html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START];
	        while (true) {
	            if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_START ||
	                this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START) {
	                expansionFormStack.push(this.peek.type);
	            }
	            if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_END) {
	                if (lastOnStack(expansionFormStack, html_lexer_1.HtmlTokenType.EXPANSION_CASE_EXP_START)) {
	                    expansionFormStack.pop();
	                    if (expansionFormStack.length == 0)
	                        return exp;
	                }
	                else {
	                    this.errors.push(HtmlTreeError.create(null, start.sourceSpan, "Invalid expansion form. Missing '}'."));
	                    return null;
	                }
	            }
	            if (this.peek.type === html_lexer_1.HtmlTokenType.EXPANSION_FORM_END) {
	                if (lastOnStack(expansionFormStack, html_lexer_1.HtmlTokenType.EXPANSION_FORM_START)) {
	                    expansionFormStack.pop();
	                }
	                else {
	                    this.errors.push(HtmlTreeError.create(null, start.sourceSpan, "Invalid expansion form. Missing '}'."));
	                    return null;
	                }
	            }
	            if (this.peek.type === html_lexer_1.HtmlTokenType.EOF) {
	                this.errors.push(HtmlTreeError.create(null, start.sourceSpan, "Invalid expansion form. Missing '}'."));
	                return null;
	            }
	            exp.push(this._advance());
	        }
	    };
	    TreeBuilder.prototype._consumeText = function (token) {
	        var text = token.parts[0];
	        if (text.length > 0 && text[0] == '\n') {
	            var parent_1 = this._getParentElement();
	            if (lang_1.isPresent(parent_1) && parent_1.children.length == 0 &&
	                html_tags_1.getHtmlTagDefinition(parent_1.name).ignoreFirstLf) {
	                text = text.substring(1);
	            }
	        }
	        if (text.length > 0) {
	            this._addToParent(new html_ast_1.HtmlTextAst(text, token.sourceSpan));
	        }
	    };
	    TreeBuilder.prototype._closeVoidElement = function () {
	        if (this.elementStack.length > 0) {
	            var el = collection_1.ListWrapper.last(this.elementStack);
	            if (html_tags_1.getHtmlTagDefinition(el.name).isVoid) {
	                this.elementStack.pop();
	            }
	        }
	    };
	    TreeBuilder.prototype._consumeStartTag = function (startTagToken) {
	        var prefix = startTagToken.parts[0];
	        var name = startTagToken.parts[1];
	        var attrs = [];
	        while (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_NAME) {
	            attrs.push(this._consumeAttr(this._advance()));
	        }
	        var fullName = getElementFullName(prefix, name, this._getParentElement());
	        var selfClosing = false;
	        // Note: There could have been a tokenizer error
	        // so that we don't get a token for the end tag...
	        if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END_VOID) {
	            this._advance();
	            selfClosing = true;
	            if (html_tags_1.getNsPrefix(fullName) == null && !html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
	                this.errors.push(HtmlTreeError.create(fullName, startTagToken.sourceSpan, "Only void and foreign elements can be self closed \"" + startTagToken.parts[1] + "\""));
	            }
	        }
	        else if (this.peek.type === html_lexer_1.HtmlTokenType.TAG_OPEN_END) {
	            this._advance();
	            selfClosing = false;
	        }
	        var end = this.peek.sourceSpan.start;
	        var span = new parse_util_1.ParseSourceSpan(startTagToken.sourceSpan.start, end);
	        var el = new html_ast_1.HtmlElementAst(fullName, attrs, [], span, span, null);
	        this._pushElement(el);
	        if (selfClosing) {
	            this._popElement(fullName);
	            el.endSourceSpan = span;
	        }
	    };
	    TreeBuilder.prototype._pushElement = function (el) {
	        if (this.elementStack.length > 0) {
	            var parentEl = collection_1.ListWrapper.last(this.elementStack);
	            if (html_tags_1.getHtmlTagDefinition(parentEl.name).isClosedByChild(el.name)) {
	                this.elementStack.pop();
	            }
	        }
	        var tagDef = html_tags_1.getHtmlTagDefinition(el.name);
	        var _a = this._getParentElementSkippingContainers(), parent = _a.parent, container = _a.container;
	        if (lang_1.isPresent(parent) && tagDef.requireExtraParent(parent.name)) {
	            var newParent = new html_ast_1.HtmlElementAst(tagDef.parentToAdd, [], [], el.sourceSpan, el.startSourceSpan, el.endSourceSpan);
	            this._insertBeforeContainer(parent, container, newParent);
	        }
	        this._addToParent(el);
	        this.elementStack.push(el);
	    };
	    TreeBuilder.prototype._consumeEndTag = function (endTagToken) {
	        var fullName = getElementFullName(endTagToken.parts[0], endTagToken.parts[1], this._getParentElement());
	        if (this._getParentElement()) {
	            this._getParentElement().endSourceSpan = endTagToken.sourceSpan;
	        }
	        if (html_tags_1.getHtmlTagDefinition(fullName).isVoid) {
	            this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan, "Void elements do not have end tags \"" + endTagToken.parts[1] + "\""));
	        }
	        else if (!this._popElement(fullName)) {
	            this.errors.push(HtmlTreeError.create(fullName, endTagToken.sourceSpan, "Unexpected closing tag \"" + endTagToken.parts[1] + "\""));
	        }
	    };
	    TreeBuilder.prototype._popElement = function (fullName) {
	        for (var stackIndex = this.elementStack.length - 1; stackIndex >= 0; stackIndex--) {
	            var el = this.elementStack[stackIndex];
	            if (el.name == fullName) {
	                collection_1.ListWrapper.splice(this.elementStack, stackIndex, this.elementStack.length - stackIndex);
	                return true;
	            }
	            if (!html_tags_1.getHtmlTagDefinition(el.name).closedByParent) {
	                return false;
	            }
	        }
	        return false;
	    };
	    TreeBuilder.prototype._consumeAttr = function (attrName) {
	        var fullName = html_tags_1.mergeNsAndName(attrName.parts[0], attrName.parts[1]);
	        var end = attrName.sourceSpan.end;
	        var value = '';
	        if (this.peek.type === html_lexer_1.HtmlTokenType.ATTR_VALUE) {
	            var valueToken = this._advance();
	            value = valueToken.parts[0];
	            end = valueToken.sourceSpan.end;
	        }
	        return new html_ast_1.HtmlAttrAst(fullName, value, new parse_util_1.ParseSourceSpan(attrName.sourceSpan.start, end));
	    };
	    TreeBuilder.prototype._getParentElement = function () {
	        return this.elementStack.length > 0 ? collection_1.ListWrapper.last(this.elementStack) : null;
	    };
	    /**
	     * Returns the parent in the DOM and the container.
	     *
	     * `<ng-container>` elements are skipped as they are not rendered as DOM element.
	     */
	    TreeBuilder.prototype._getParentElementSkippingContainers = function () {
	        var container = null;
	        for (var i = this.elementStack.length - 1; i >= 0; i--) {
	            if (this.elementStack[i].name !== 'ng-container') {
	                return { parent: this.elementStack[i], container: container };
	            }
	            container = this.elementStack[i];
	        }
	        return { parent: collection_1.ListWrapper.last(this.elementStack), container: container };
	    };
	    TreeBuilder.prototype._addToParent = function (node) {
	        var parent = this._getParentElement();
	        if (lang_1.isPresent(parent)) {
	            parent.children.push(node);
	        }
	        else {
	            this.rootNodes.push(node);
	        }
	    };
	    /**
	     * Insert a node between the parent and the container.
	     * When no container is given, the node is appended as a child of the parent.
	     * Also updates the element stack accordingly.
	     *
	     * @internal
	     */
	    TreeBuilder.prototype._insertBeforeContainer = function (parent, container, node) {
	        if (!container) {
	            this._addToParent(node);
	            this.elementStack.push(node);
	        }
	        else {
	            if (parent) {
	                // replace the container with the new node in the children
	                var index = parent.children.indexOf(container);
	                parent.children[index] = node;
	            }
	            else {
	                this.rootNodes.push(node);
	            }
	            node.children.push(container);
	            this.elementStack.splice(this.elementStack.indexOf(container), 0, node);
	        }
	    };
	    return TreeBuilder;
	}());
	function getElementFullName(prefix, localName, parentElement) {
	    if (lang_1.isBlank(prefix)) {
	        prefix = html_tags_1.getHtmlTagDefinition(localName).implicitNamespacePrefix;
	        if (lang_1.isBlank(prefix) && lang_1.isPresent(parentElement)) {
	            prefix = html_tags_1.getNsPrefix(parentElement.name);
	        }
	    }
	    return html_tags_1.mergeNsAndName(prefix, localName);
	}
	function lastOnStack(stack, element) {
	    return stack.length > 0 && stack[stack.length - 1] === element;
	}
	//# sourceMappingURL=html_parser.js.map

/***/ }),

/***/ 555:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	var HtmlTextAst = (function () {
	    function HtmlTextAst(value, sourceSpan) {
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    HtmlTextAst.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
	    return HtmlTextAst;
	}());
	exports.HtmlTextAst = HtmlTextAst;
	var HtmlExpansionAst = (function () {
	    function HtmlExpansionAst(switchValue, type, cases, sourceSpan, switchValueSourceSpan) {
	        this.switchValue = switchValue;
	        this.type = type;
	        this.cases = cases;
	        this.sourceSpan = sourceSpan;
	        this.switchValueSourceSpan = switchValueSourceSpan;
	    }
	    HtmlExpansionAst.prototype.visit = function (visitor, context) {
	        return visitor.visitExpansion(this, context);
	    };
	    return HtmlExpansionAst;
	}());
	exports.HtmlExpansionAst = HtmlExpansionAst;
	var HtmlExpansionCaseAst = (function () {
	    function HtmlExpansionCaseAst(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
	        this.value = value;
	        this.expression = expression;
	        this.sourceSpan = sourceSpan;
	        this.valueSourceSpan = valueSourceSpan;
	        this.expSourceSpan = expSourceSpan;
	    }
	    HtmlExpansionCaseAst.prototype.visit = function (visitor, context) {
	        return visitor.visitExpansionCase(this, context);
	    };
	    return HtmlExpansionCaseAst;
	}());
	exports.HtmlExpansionCaseAst = HtmlExpansionCaseAst;
	var HtmlAttrAst = (function () {
	    function HtmlAttrAst(name, value, sourceSpan) {
	        this.name = name;
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    HtmlAttrAst.prototype.visit = function (visitor, context) { return visitor.visitAttr(this, context); };
	    return HtmlAttrAst;
	}());
	exports.HtmlAttrAst = HtmlAttrAst;
	var HtmlElementAst = (function () {
	    function HtmlElementAst(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan) {
	        this.name = name;
	        this.attrs = attrs;
	        this.children = children;
	        this.sourceSpan = sourceSpan;
	        this.startSourceSpan = startSourceSpan;
	        this.endSourceSpan = endSourceSpan;
	    }
	    HtmlElementAst.prototype.visit = function (visitor, context) { return visitor.visitElement(this, context); };
	    return HtmlElementAst;
	}());
	exports.HtmlElementAst = HtmlElementAst;
	var HtmlCommentAst = (function () {
	    function HtmlCommentAst(value, sourceSpan) {
	        this.value = value;
	        this.sourceSpan = sourceSpan;
	    }
	    HtmlCommentAst.prototype.visit = function (visitor, context) { return visitor.visitComment(this, context); };
	    return HtmlCommentAst;
	}());
	exports.HtmlCommentAst = HtmlCommentAst;
	function htmlVisitAll(visitor, asts, context) {
	    if (context === void 0) { context = null; }
	    var result = [];
	    asts.forEach(function (ast) {
	        var astResult = ast.visit(visitor, context);
	        if (lang_1.isPresent(astResult)) {
	            result.push(astResult);
	        }
	    });
	    return result;
	}
	exports.htmlVisitAll = htmlVisitAll;
	//# sourceMappingURL=html_ast.js.map

/***/ }),

/***/ 556:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var chars = __webpack_require__(551);
	var lang_1 = __webpack_require__(542);
	var html_tags_1 = __webpack_require__(557);
	var interpolation_config_1 = __webpack_require__(552);
	var parse_util_1 = __webpack_require__(558);
	(function (HtmlTokenType) {
	    HtmlTokenType[HtmlTokenType["TAG_OPEN_START"] = 0] = "TAG_OPEN_START";
	    HtmlTokenType[HtmlTokenType["TAG_OPEN_END"] = 1] = "TAG_OPEN_END";
	    HtmlTokenType[HtmlTokenType["TAG_OPEN_END_VOID"] = 2] = "TAG_OPEN_END_VOID";
	    HtmlTokenType[HtmlTokenType["TAG_CLOSE"] = 3] = "TAG_CLOSE";
	    HtmlTokenType[HtmlTokenType["TEXT"] = 4] = "TEXT";
	    HtmlTokenType[HtmlTokenType["ESCAPABLE_RAW_TEXT"] = 5] = "ESCAPABLE_RAW_TEXT";
	    HtmlTokenType[HtmlTokenType["RAW_TEXT"] = 6] = "RAW_TEXT";
	    HtmlTokenType[HtmlTokenType["COMMENT_START"] = 7] = "COMMENT_START";
	    HtmlTokenType[HtmlTokenType["COMMENT_END"] = 8] = "COMMENT_END";
	    HtmlTokenType[HtmlTokenType["CDATA_START"] = 9] = "CDATA_START";
	    HtmlTokenType[HtmlTokenType["CDATA_END"] = 10] = "CDATA_END";
	    HtmlTokenType[HtmlTokenType["ATTR_NAME"] = 11] = "ATTR_NAME";
	    HtmlTokenType[HtmlTokenType["ATTR_VALUE"] = 12] = "ATTR_VALUE";
	    HtmlTokenType[HtmlTokenType["DOC_TYPE"] = 13] = "DOC_TYPE";
	    HtmlTokenType[HtmlTokenType["EXPANSION_FORM_START"] = 14] = "EXPANSION_FORM_START";
	    HtmlTokenType[HtmlTokenType["EXPANSION_CASE_VALUE"] = 15] = "EXPANSION_CASE_VALUE";
	    HtmlTokenType[HtmlTokenType["EXPANSION_CASE_EXP_START"] = 16] = "EXPANSION_CASE_EXP_START";
	    HtmlTokenType[HtmlTokenType["EXPANSION_CASE_EXP_END"] = 17] = "EXPANSION_CASE_EXP_END";
	    HtmlTokenType[HtmlTokenType["EXPANSION_FORM_END"] = 18] = "EXPANSION_FORM_END";
	    HtmlTokenType[HtmlTokenType["EOF"] = 19] = "EOF";
	})(exports.HtmlTokenType || (exports.HtmlTokenType = {}));
	var HtmlTokenType = exports.HtmlTokenType;
	var HtmlToken = (function () {
	    function HtmlToken(type, parts, sourceSpan) {
	        this.type = type;
	        this.parts = parts;
	        this.sourceSpan = sourceSpan;
	    }
	    return HtmlToken;
	}());
	exports.HtmlToken = HtmlToken;
	var HtmlTokenError = (function (_super) {
	    __extends(HtmlTokenError, _super);
	    function HtmlTokenError(errorMsg, tokenType, span) {
	        _super.call(this, span, errorMsg);
	        this.tokenType = tokenType;
	    }
	    return HtmlTokenError;
	}(parse_util_1.ParseError));
	exports.HtmlTokenError = HtmlTokenError;
	var HtmlTokenizeResult = (function () {
	    function HtmlTokenizeResult(tokens, errors) {
	        this.tokens = tokens;
	        this.errors = errors;
	    }
	    return HtmlTokenizeResult;
	}());
	exports.HtmlTokenizeResult = HtmlTokenizeResult;
	function tokenizeHtml(sourceContent, sourceUrl, tokenizeExpansionForms, interpolationConfig) {
	    if (tokenizeExpansionForms === void 0) { tokenizeExpansionForms = false; }
	    if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	    return new _HtmlTokenizer(new parse_util_1.ParseSourceFile(sourceContent, sourceUrl), tokenizeExpansionForms, interpolationConfig)
	        .tokenize();
	}
	exports.tokenizeHtml = tokenizeHtml;
	var CR_OR_CRLF_REGEXP = /\r\n?/g;
	function unexpectedCharacterErrorMsg(charCode) {
	    var char = charCode === chars.$EOF ? 'EOF' : lang_1.StringWrapper.fromCharCode(charCode);
	    return "Unexpected character \"" + char + "\"";
	}
	function unknownEntityErrorMsg(entitySrc) {
	    return "Unknown entity \"" + entitySrc + "\" - use the \"&#<decimal>;\" or  \"&#x<hex>;\" syntax";
	}
	var ControlFlowError = (function () {
	    function ControlFlowError(error) {
	        this.error = error;
	    }
	    return ControlFlowError;
	}());
	// See http://www.w3.org/TR/html51/syntax.html#writing
	var _HtmlTokenizer = (function () {
	    function _HtmlTokenizer(file, tokenizeExpansionForms, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        this.file = file;
	        this.tokenizeExpansionForms = tokenizeExpansionForms;
	        this.interpolationConfig = interpolationConfig;
	        // Note: this is always lowercase!
	        this._peek = -1;
	        this._nextPeek = -1;
	        this._index = -1;
	        this._line = 0;
	        this._column = -1;
	        this._expansionCaseStack = [];
	        this._inInterpolation = false;
	        this.tokens = [];
	        this.errors = [];
	        this._input = file.content;
	        this._length = file.content.length;
	        this._advance();
	    }
	    _HtmlTokenizer.prototype._processCarriageReturns = function (content) {
	        // http://www.w3.org/TR/html5/syntax.html#preprocessing-the-input-stream
	        // In order to keep the original position in the source, we can not
	        // pre-process it.
	        // Instead CRs are processed right before instantiating the tokens.
	        return lang_1.StringWrapper.replaceAll(content, CR_OR_CRLF_REGEXP, '\n');
	    };
	    _HtmlTokenizer.prototype.tokenize = function () {
	        while (this._peek !== chars.$EOF) {
	            var start = this._getLocation();
	            try {
	                if (this._attemptCharCode(chars.$LT)) {
	                    if (this._attemptCharCode(chars.$BANG)) {
	                        if (this._attemptCharCode(chars.$LBRACKET)) {
	                            this._consumeCdata(start);
	                        }
	                        else if (this._attemptCharCode(chars.$MINUS)) {
	                            this._consumeComment(start);
	                        }
	                        else {
	                            this._consumeDocType(start);
	                        }
	                    }
	                    else if (this._attemptCharCode(chars.$SLASH)) {
	                        this._consumeTagClose(start);
	                    }
	                    else {
	                        this._consumeTagOpen(start);
	                    }
	                }
	                else if (isExpansionFormStart(this._input, this._index, this.interpolationConfig.start) &&
	                    this.tokenizeExpansionForms) {
	                    this._consumeExpansionFormStart();
	                }
	                else if (isExpansionCaseStart(this._peek) && this._isInExpansionForm() &&
	                    this.tokenizeExpansionForms) {
	                    this._consumeExpansionCaseStart();
	                }
	                else if (this._peek === chars.$RBRACE && this._isInExpansionCase() &&
	                    this.tokenizeExpansionForms) {
	                    this._consumeExpansionCaseEnd();
	                }
	                else if (this._peek === chars.$RBRACE && this._isInExpansionForm() &&
	                    this.tokenizeExpansionForms) {
	                    this._consumeExpansionFormEnd();
	                }
	                else {
	                    this._consumeText();
	                }
	            }
	            catch (e) {
	                if (e instanceof ControlFlowError) {
	                    this.errors.push(e.error);
	                }
	                else {
	                    throw e;
	                }
	            }
	        }
	        this._beginToken(HtmlTokenType.EOF);
	        this._endToken([]);
	        return new HtmlTokenizeResult(mergeTextTokens(this.tokens), this.errors);
	    };
	    _HtmlTokenizer.prototype._getLocation = function () {
	        return new parse_util_1.ParseLocation(this.file, this._index, this._line, this._column);
	    };
	    _HtmlTokenizer.prototype._getSpan = function (start, end) {
	        if (lang_1.isBlank(start)) {
	            start = this._getLocation();
	        }
	        if (lang_1.isBlank(end)) {
	            end = this._getLocation();
	        }
	        return new parse_util_1.ParseSourceSpan(start, end);
	    };
	    _HtmlTokenizer.prototype._beginToken = function (type, start) {
	        if (start === void 0) { start = null; }
	        if (lang_1.isBlank(start)) {
	            start = this._getLocation();
	        }
	        this._currentTokenStart = start;
	        this._currentTokenType = type;
	    };
	    _HtmlTokenizer.prototype._endToken = function (parts, end) {
	        if (end === void 0) { end = null; }
	        if (lang_1.isBlank(end)) {
	            end = this._getLocation();
	        }
	        var token = new HtmlToken(this._currentTokenType, parts, new parse_util_1.ParseSourceSpan(this._currentTokenStart, end));
	        this.tokens.push(token);
	        this._currentTokenStart = null;
	        this._currentTokenType = null;
	        return token;
	    };
	    _HtmlTokenizer.prototype._createError = function (msg, span) {
	        var error = new HtmlTokenError(msg, this._currentTokenType, span);
	        this._currentTokenStart = null;
	        this._currentTokenType = null;
	        return new ControlFlowError(error);
	    };
	    _HtmlTokenizer.prototype._advance = function () {
	        if (this._index >= this._length) {
	            throw this._createError(unexpectedCharacterErrorMsg(chars.$EOF), this._getSpan());
	        }
	        if (this._peek === chars.$LF) {
	            this._line++;
	            this._column = 0;
	        }
	        else if (this._peek !== chars.$LF && this._peek !== chars.$CR) {
	            this._column++;
	        }
	        this._index++;
	        this._peek = this._index >= this._length ? chars.$EOF :
	            lang_1.StringWrapper.charCodeAt(this._input, this._index);
	        this._nextPeek = this._index + 1 >= this._length ?
	            chars.$EOF :
	            lang_1.StringWrapper.charCodeAt(this._input, this._index + 1);
	    };
	    _HtmlTokenizer.prototype._attemptCharCode = function (charCode) {
	        if (this._peek === charCode) {
	            this._advance();
	            return true;
	        }
	        return false;
	    };
	    _HtmlTokenizer.prototype._attemptCharCodeCaseInsensitive = function (charCode) {
	        if (compareCharCodeCaseInsensitive(this._peek, charCode)) {
	            this._advance();
	            return true;
	        }
	        return false;
	    };
	    _HtmlTokenizer.prototype._requireCharCode = function (charCode) {
	        var location = this._getLocation();
	        if (!this._attemptCharCode(charCode)) {
	            throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan(location, location));
	        }
	    };
	    _HtmlTokenizer.prototype._attemptStr = function (chars) {
	        var len = chars.length;
	        if (this._index + len > this._length) {
	            return false;
	        }
	        var initialPosition = this._savePosition();
	        for (var i = 0; i < len; i++) {
	            if (!this._attemptCharCode(lang_1.StringWrapper.charCodeAt(chars, i))) {
	                // If attempting to parse the string fails, we want to reset the parser
	                // to where it was before the attempt
	                this._restorePosition(initialPosition);
	                return false;
	            }
	        }
	        return true;
	    };
	    _HtmlTokenizer.prototype._attemptStrCaseInsensitive = function (chars) {
	        for (var i = 0; i < chars.length; i++) {
	            if (!this._attemptCharCodeCaseInsensitive(lang_1.StringWrapper.charCodeAt(chars, i))) {
	                return false;
	            }
	        }
	        return true;
	    };
	    _HtmlTokenizer.prototype._requireStr = function (chars) {
	        var location = this._getLocation();
	        if (!this._attemptStr(chars)) {
	            throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan(location));
	        }
	    };
	    _HtmlTokenizer.prototype._attemptCharCodeUntilFn = function (predicate) {
	        while (!predicate(this._peek)) {
	            this._advance();
	        }
	    };
	    _HtmlTokenizer.prototype._requireCharCodeUntilFn = function (predicate, len) {
	        var start = this._getLocation();
	        this._attemptCharCodeUntilFn(predicate);
	        if (this._index - start.offset < len) {
	            throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan(start, start));
	        }
	    };
	    _HtmlTokenizer.prototype._attemptUntilChar = function (char) {
	        while (this._peek !== char) {
	            this._advance();
	        }
	    };
	    _HtmlTokenizer.prototype._readChar = function (decodeEntities) {
	        if (decodeEntities && this._peek === chars.$AMPERSAND) {
	            return this._decodeEntity();
	        }
	        else {
	            var index = this._index;
	            this._advance();
	            return this._input[index];
	        }
	    };
	    _HtmlTokenizer.prototype._decodeEntity = function () {
	        var start = this._getLocation();
	        this._advance();
	        if (this._attemptCharCode(chars.$HASH)) {
	            var isHex = this._attemptCharCode(chars.$x) || this._attemptCharCode(chars.$X);
	            var numberStart = this._getLocation().offset;
	            this._attemptCharCodeUntilFn(isDigitEntityEnd);
	            if (this._peek != chars.$SEMICOLON) {
	                throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan());
	            }
	            this._advance();
	            var strNum = this._input.substring(numberStart, this._index - 1);
	            try {
	                var charCode = lang_1.NumberWrapper.parseInt(strNum, isHex ? 16 : 10);
	                return lang_1.StringWrapper.fromCharCode(charCode);
	            }
	            catch (e) {
	                var entity = this._input.substring(start.offset + 1, this._index - 1);
	                throw this._createError(unknownEntityErrorMsg(entity), this._getSpan(start));
	            }
	        }
	        else {
	            var startPosition = this._savePosition();
	            this._attemptCharCodeUntilFn(isNamedEntityEnd);
	            if (this._peek != chars.$SEMICOLON) {
	                this._restorePosition(startPosition);
	                return '&';
	            }
	            this._advance();
	            var name_1 = this._input.substring(start.offset + 1, this._index - 1);
	            var char = html_tags_1.NAMED_ENTITIES[name_1];
	            if (lang_1.isBlank(char)) {
	                throw this._createError(unknownEntityErrorMsg(name_1), this._getSpan(start));
	            }
	            return char;
	        }
	    };
	    _HtmlTokenizer.prototype._consumeRawText = function (decodeEntities, firstCharOfEnd, attemptEndRest) {
	        var tagCloseStart;
	        var textStart = this._getLocation();
	        this._beginToken(decodeEntities ? HtmlTokenType.ESCAPABLE_RAW_TEXT : HtmlTokenType.RAW_TEXT, textStart);
	        var parts = [];
	        while (true) {
	            tagCloseStart = this._getLocation();
	            if (this._attemptCharCode(firstCharOfEnd) && attemptEndRest()) {
	                break;
	            }
	            if (this._index > tagCloseStart.offset) {
	                // add the characters consumed by the previous if statement to the output
	                parts.push(this._input.substring(tagCloseStart.offset, this._index));
	            }
	            while (this._peek !== firstCharOfEnd) {
	                parts.push(this._readChar(decodeEntities));
	            }
	        }
	        return this._endToken([this._processCarriageReturns(parts.join(''))], tagCloseStart);
	    };
	    _HtmlTokenizer.prototype._consumeComment = function (start) {
	        var _this = this;
	        this._beginToken(HtmlTokenType.COMMENT_START, start);
	        this._requireCharCode(chars.$MINUS);
	        this._endToken([]);
	        var textToken = this._consumeRawText(false, chars.$MINUS, function () { return _this._attemptStr('->'); });
	        this._beginToken(HtmlTokenType.COMMENT_END, textToken.sourceSpan.end);
	        this._endToken([]);
	    };
	    _HtmlTokenizer.prototype._consumeCdata = function (start) {
	        var _this = this;
	        this._beginToken(HtmlTokenType.CDATA_START, start);
	        this._requireStr('CDATA[');
	        this._endToken([]);
	        var textToken = this._consumeRawText(false, chars.$RBRACKET, function () { return _this._attemptStr(']>'); });
	        this._beginToken(HtmlTokenType.CDATA_END, textToken.sourceSpan.end);
	        this._endToken([]);
	    };
	    _HtmlTokenizer.prototype._consumeDocType = function (start) {
	        this._beginToken(HtmlTokenType.DOC_TYPE, start);
	        this._attemptUntilChar(chars.$GT);
	        this._advance();
	        this._endToken([this._input.substring(start.offset + 2, this._index - 1)]);
	    };
	    _HtmlTokenizer.prototype._consumePrefixAndName = function () {
	        var nameOrPrefixStart = this._index;
	        var prefix = null;
	        while (this._peek !== chars.$COLON && !isPrefixEnd(this._peek)) {
	            this._advance();
	        }
	        var nameStart;
	        if (this._peek === chars.$COLON) {
	            this._advance();
	            prefix = this._input.substring(nameOrPrefixStart, this._index - 1);
	            nameStart = this._index;
	        }
	        else {
	            nameStart = nameOrPrefixStart;
	        }
	        this._requireCharCodeUntilFn(isNameEnd, this._index === nameStart ? 1 : 0);
	        var name = this._input.substring(nameStart, this._index);
	        return [prefix, name];
	    };
	    _HtmlTokenizer.prototype._consumeTagOpen = function (start) {
	        var savedPos = this._savePosition();
	        var lowercaseTagName;
	        try {
	            if (!chars.isAsciiLetter(this._peek)) {
	                throw this._createError(unexpectedCharacterErrorMsg(this._peek), this._getSpan());
	            }
	            var nameStart = this._index;
	            this._consumeTagOpenStart(start);
	            lowercaseTagName = this._input.substring(nameStart, this._index).toLowerCase();
	            this._attemptCharCodeUntilFn(isNotWhitespace);
	            while (this._peek !== chars.$SLASH && this._peek !== chars.$GT) {
	                this._consumeAttributeName();
	                this._attemptCharCodeUntilFn(isNotWhitespace);
	                if (this._attemptCharCode(chars.$EQ)) {
	                    this._attemptCharCodeUntilFn(isNotWhitespace);
	                    this._consumeAttributeValue();
	                }
	                this._attemptCharCodeUntilFn(isNotWhitespace);
	            }
	            this._consumeTagOpenEnd();
	        }
	        catch (e) {
	            if (e instanceof ControlFlowError) {
	                // When the start tag is invalid, assume we want a "<"
	                this._restorePosition(savedPos);
	                // Back to back text tokens are merged at the end
	                this._beginToken(HtmlTokenType.TEXT, start);
	                this._endToken(['<']);
	                return;
	            }
	            throw e;
	        }
	        var contentTokenType = html_tags_1.getHtmlTagDefinition(lowercaseTagName).contentType;
	        if (contentTokenType === html_tags_1.HtmlTagContentType.RAW_TEXT) {
	            this._consumeRawTextWithTagClose(lowercaseTagName, false);
	        }
	        else if (contentTokenType === html_tags_1.HtmlTagContentType.ESCAPABLE_RAW_TEXT) {
	            this._consumeRawTextWithTagClose(lowercaseTagName, true);
	        }
	    };
	    _HtmlTokenizer.prototype._consumeRawTextWithTagClose = function (lowercaseTagName, decodeEntities) {
	        var _this = this;
	        var textToken = this._consumeRawText(decodeEntities, chars.$LT, function () {
	            if (!_this._attemptCharCode(chars.$SLASH))
	                return false;
	            _this._attemptCharCodeUntilFn(isNotWhitespace);
	            if (!_this._attemptStrCaseInsensitive(lowercaseTagName))
	                return false;
	            _this._attemptCharCodeUntilFn(isNotWhitespace);
	            if (!_this._attemptCharCode(chars.$GT))
	                return false;
	            return true;
	        });
	        this._beginToken(HtmlTokenType.TAG_CLOSE, textToken.sourceSpan.end);
	        this._endToken([null, lowercaseTagName]);
	    };
	    _HtmlTokenizer.prototype._consumeTagOpenStart = function (start) {
	        this._beginToken(HtmlTokenType.TAG_OPEN_START, start);
	        var parts = this._consumePrefixAndName();
	        this._endToken(parts);
	    };
	    _HtmlTokenizer.prototype._consumeAttributeName = function () {
	        this._beginToken(HtmlTokenType.ATTR_NAME);
	        var prefixAndName = this._consumePrefixAndName();
	        this._endToken(prefixAndName);
	    };
	    _HtmlTokenizer.prototype._consumeAttributeValue = function () {
	        this._beginToken(HtmlTokenType.ATTR_VALUE);
	        var value;
	        if (this._peek === chars.$SQ || this._peek === chars.$DQ) {
	            var quoteChar = this._peek;
	            this._advance();
	            var parts = [];
	            while (this._peek !== quoteChar) {
	                parts.push(this._readChar(true));
	            }
	            value = parts.join('');
	            this._advance();
	        }
	        else {
	            var valueStart = this._index;
	            this._requireCharCodeUntilFn(isNameEnd, 1);
	            value = this._input.substring(valueStart, this._index);
	        }
	        this._endToken([this._processCarriageReturns(value)]);
	    };
	    _HtmlTokenizer.prototype._consumeTagOpenEnd = function () {
	        var tokenType = this._attemptCharCode(chars.$SLASH) ? HtmlTokenType.TAG_OPEN_END_VOID :
	            HtmlTokenType.TAG_OPEN_END;
	        this._beginToken(tokenType);
	        this._requireCharCode(chars.$GT);
	        this._endToken([]);
	    };
	    _HtmlTokenizer.prototype._consumeTagClose = function (start) {
	        this._beginToken(HtmlTokenType.TAG_CLOSE, start);
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        var prefixAndName = this._consumePrefixAndName();
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        this._requireCharCode(chars.$GT);
	        this._endToken(prefixAndName);
	    };
	    _HtmlTokenizer.prototype._consumeExpansionFormStart = function () {
	        this._beginToken(HtmlTokenType.EXPANSION_FORM_START, this._getLocation());
	        this._requireCharCode(chars.$LBRACE);
	        this._endToken([]);
	        this._beginToken(HtmlTokenType.RAW_TEXT, this._getLocation());
	        var condition = this._readUntil(chars.$COMMA);
	        this._endToken([condition], this._getLocation());
	        this._requireCharCode(chars.$COMMA);
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        this._beginToken(HtmlTokenType.RAW_TEXT, this._getLocation());
	        var type = this._readUntil(chars.$COMMA);
	        this._endToken([type], this._getLocation());
	        this._requireCharCode(chars.$COMMA);
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        this._expansionCaseStack.push(HtmlTokenType.EXPANSION_FORM_START);
	    };
	    _HtmlTokenizer.prototype._consumeExpansionCaseStart = function () {
	        this._beginToken(HtmlTokenType.EXPANSION_CASE_VALUE, this._getLocation());
	        var value = this._readUntil(chars.$LBRACE).trim();
	        this._endToken([value], this._getLocation());
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        this._beginToken(HtmlTokenType.EXPANSION_CASE_EXP_START, this._getLocation());
	        this._requireCharCode(chars.$LBRACE);
	        this._endToken([], this._getLocation());
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        this._expansionCaseStack.push(HtmlTokenType.EXPANSION_CASE_EXP_START);
	    };
	    _HtmlTokenizer.prototype._consumeExpansionCaseEnd = function () {
	        this._beginToken(HtmlTokenType.EXPANSION_CASE_EXP_END, this._getLocation());
	        this._requireCharCode(chars.$RBRACE);
	        this._endToken([], this._getLocation());
	        this._attemptCharCodeUntilFn(isNotWhitespace);
	        this._expansionCaseStack.pop();
	    };
	    _HtmlTokenizer.prototype._consumeExpansionFormEnd = function () {
	        this._beginToken(HtmlTokenType.EXPANSION_FORM_END, this._getLocation());
	        this._requireCharCode(chars.$RBRACE);
	        this._endToken([]);
	        this._expansionCaseStack.pop();
	    };
	    _HtmlTokenizer.prototype._consumeText = function () {
	        var start = this._getLocation();
	        this._beginToken(HtmlTokenType.TEXT, start);
	        var parts = [];
	        do {
	            if (this._attemptStr(this.interpolationConfig.start)) {
	                parts.push(this.interpolationConfig.start);
	                this._inInterpolation = true;
	            }
	            else if (this._attemptStr(this.interpolationConfig.end) && this._inInterpolation) {
	                parts.push(this.interpolationConfig.end);
	                this._inInterpolation = false;
	            }
	            else {
	                parts.push(this._readChar(true));
	            }
	        } while (!this._isTextEnd());
	        this._endToken([this._processCarriageReturns(parts.join(''))]);
	    };
	    _HtmlTokenizer.prototype._isTextEnd = function () {
	        if (this._peek === chars.$LT || this._peek === chars.$EOF) {
	            return true;
	        }
	        if (this.tokenizeExpansionForms) {
	            if (isExpansionFormStart(this._input, this._index, this.interpolationConfig.start)) {
	                // start of an expansion form
	                return true;
	            }
	            if (this._peek === chars.$RBRACE && !this._inInterpolation && this._isInExpansionCase()) {
	                // end of and expansion case
	                return true;
	            }
	        }
	        return false;
	    };
	    _HtmlTokenizer.prototype._savePosition = function () {
	        return [this._peek, this._index, this._column, this._line, this.tokens.length];
	    };
	    _HtmlTokenizer.prototype._readUntil = function (char) {
	        var start = this._index;
	        this._attemptUntilChar(char);
	        return this._input.substring(start, this._index);
	    };
	    _HtmlTokenizer.prototype._restorePosition = function (position) {
	        this._peek = position[0];
	        this._index = position[1];
	        this._column = position[2];
	        this._line = position[3];
	        var nbTokens = position[4];
	        if (nbTokens < this.tokens.length) {
	            // remove any extra tokens
	            this.tokens = this.tokens.slice(0, nbTokens);
	        }
	    };
	    _HtmlTokenizer.prototype._isInExpansionCase = function () {
	        return this._expansionCaseStack.length > 0 &&
	            this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
	                HtmlTokenType.EXPANSION_CASE_EXP_START;
	    };
	    _HtmlTokenizer.prototype._isInExpansionForm = function () {
	        return this._expansionCaseStack.length > 0 &&
	            this._expansionCaseStack[this._expansionCaseStack.length - 1] ===
	                HtmlTokenType.EXPANSION_FORM_START;
	    };
	    return _HtmlTokenizer;
	}());
	function isNotWhitespace(code) {
	    return !chars.isWhitespace(code) || code === chars.$EOF;
	}
	function isNameEnd(code) {
	    return chars.isWhitespace(code) || code === chars.$GT || code === chars.$SLASH ||
	        code === chars.$SQ || code === chars.$DQ || code === chars.$EQ;
	}
	function isPrefixEnd(code) {
	    return (code < chars.$a || chars.$z < code) && (code < chars.$A || chars.$Z < code) &&
	        (code < chars.$0 || code > chars.$9);
	}
	function isDigitEntityEnd(code) {
	    return code == chars.$SEMICOLON || code == chars.$EOF || !chars.isAsciiHexDigit(code);
	}
	function isNamedEntityEnd(code) {
	    return code == chars.$SEMICOLON || code == chars.$EOF || !chars.isAsciiLetter(code);
	}
	function isExpansionFormStart(input, offset, interpolationStart) {
	    return input.charCodeAt(offset) == chars.$LBRACE &&
	        input.indexOf(interpolationStart, offset) != offset;
	}
	function isExpansionCaseStart(peek) {
	    return peek === chars.$EQ || chars.isAsciiLetter(peek);
	}
	function compareCharCodeCaseInsensitive(code1, code2) {
	    return toUpperCaseCharCode(code1) == toUpperCaseCharCode(code2);
	}
	function toUpperCaseCharCode(code) {
	    return code >= chars.$a && code <= chars.$z ? code - chars.$a + chars.$A : code;
	}
	function mergeTextTokens(srcTokens) {
	    var dstTokens = [];
	    var lastDstToken;
	    for (var i = 0; i < srcTokens.length; i++) {
	        var token = srcTokens[i];
	        if (lang_1.isPresent(lastDstToken) && lastDstToken.type == HtmlTokenType.TEXT &&
	            token.type == HtmlTokenType.TEXT) {
	            lastDstToken.parts[0] += token.parts[0];
	            lastDstToken.sourceSpan.end = token.sourceSpan.end;
	        }
	        else {
	            lastDstToken = token;
	            dstTokens.push(lastDstToken);
	        }
	    }
	    return dstTokens;
	}
	//# sourceMappingURL=html_lexer.js.map

/***/ }),

/***/ 557:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	// see http://www.w3.org/TR/html51/syntax.html#named-character-references
	// see https://html.spec.whatwg.org/multipage/entities.json
	// This list is not exhaustive to keep the compiler footprint low.
	// The `&#123;` / `&#x1ab;` syntax should be used when the named character reference does not exist.
	exports.NAMED_ENTITIES = {
	    'Aacute': '\u00C1',
	    'aacute': '\u00E1',
	    'Acirc': '\u00C2',
	    'acirc': '\u00E2',
	    'acute': '\u00B4',
	    'AElig': '\u00C6',
	    'aelig': '\u00E6',
	    'Agrave': '\u00C0',
	    'agrave': '\u00E0',
	    'alefsym': '\u2135',
	    'Alpha': '\u0391',
	    'alpha': '\u03B1',
	    'amp': '&',
	    'and': '\u2227',
	    'ang': '\u2220',
	    'apos': '\u0027',
	    'Aring': '\u00C5',
	    'aring': '\u00E5',
	    'asymp': '\u2248',
	    'Atilde': '\u00C3',
	    'atilde': '\u00E3',
	    'Auml': '\u00C4',
	    'auml': '\u00E4',
	    'bdquo': '\u201E',
	    'Beta': '\u0392',
	    'beta': '\u03B2',
	    'brvbar': '\u00A6',
	    'bull': '\u2022',
	    'cap': '\u2229',
	    'Ccedil': '\u00C7',
	    'ccedil': '\u00E7',
	    'cedil': '\u00B8',
	    'cent': '\u00A2',
	    'Chi': '\u03A7',
	    'chi': '\u03C7',
	    'circ': '\u02C6',
	    'clubs': '\u2663',
	    'cong': '\u2245',
	    'copy': '\u00A9',
	    'crarr': '\u21B5',
	    'cup': '\u222A',
	    'curren': '\u00A4',
	    'dagger': '\u2020',
	    'Dagger': '\u2021',
	    'darr': '\u2193',
	    'dArr': '\u21D3',
	    'deg': '\u00B0',
	    'Delta': '\u0394',
	    'delta': '\u03B4',
	    'diams': '\u2666',
	    'divide': '\u00F7',
	    'Eacute': '\u00C9',
	    'eacute': '\u00E9',
	    'Ecirc': '\u00CA',
	    'ecirc': '\u00EA',
	    'Egrave': '\u00C8',
	    'egrave': '\u00E8',
	    'empty': '\u2205',
	    'emsp': '\u2003',
	    'ensp': '\u2002',
	    'Epsilon': '\u0395',
	    'epsilon': '\u03B5',
	    'equiv': '\u2261',
	    'Eta': '\u0397',
	    'eta': '\u03B7',
	    'ETH': '\u00D0',
	    'eth': '\u00F0',
	    'Euml': '\u00CB',
	    'euml': '\u00EB',
	    'euro': '\u20AC',
	    'exist': '\u2203',
	    'fnof': '\u0192',
	    'forall': '\u2200',
	    'frac12': '\u00BD',
	    'frac14': '\u00BC',
	    'frac34': '\u00BE',
	    'frasl': '\u2044',
	    'Gamma': '\u0393',
	    'gamma': '\u03B3',
	    'ge': '\u2265',
	    'gt': '>',
	    'harr': '\u2194',
	    'hArr': '\u21D4',
	    'hearts': '\u2665',
	    'hellip': '\u2026',
	    'Iacute': '\u00CD',
	    'iacute': '\u00ED',
	    'Icirc': '\u00CE',
	    'icirc': '\u00EE',
	    'iexcl': '\u00A1',
	    'Igrave': '\u00CC',
	    'igrave': '\u00EC',
	    'image': '\u2111',
	    'infin': '\u221E',
	    'int': '\u222B',
	    'Iota': '\u0399',
	    'iota': '\u03B9',
	    'iquest': '\u00BF',
	    'isin': '\u2208',
	    'Iuml': '\u00CF',
	    'iuml': '\u00EF',
	    'Kappa': '\u039A',
	    'kappa': '\u03BA',
	    'Lambda': '\u039B',
	    'lambda': '\u03BB',
	    'lang': '\u27E8',
	    'laquo': '\u00AB',
	    'larr': '\u2190',
	    'lArr': '\u21D0',
	    'lceil': '\u2308',
	    'ldquo': '\u201C',
	    'le': '\u2264',
	    'lfloor': '\u230A',
	    'lowast': '\u2217',
	    'loz': '\u25CA',
	    'lrm': '\u200E',
	    'lsaquo': '\u2039',
	    'lsquo': '\u2018',
	    'lt': '<',
	    'macr': '\u00AF',
	    'mdash': '\u2014',
	    'micro': '\u00B5',
	    'middot': '\u00B7',
	    'minus': '\u2212',
	    'Mu': '\u039C',
	    'mu': '\u03BC',
	    'nabla': '\u2207',
	    'nbsp': '\u00A0',
	    'ndash': '\u2013',
	    'ne': '\u2260',
	    'ni': '\u220B',
	    'not': '\u00AC',
	    'notin': '\u2209',
	    'nsub': '\u2284',
	    'Ntilde': '\u00D1',
	    'ntilde': '\u00F1',
	    'Nu': '\u039D',
	    'nu': '\u03BD',
	    'Oacute': '\u00D3',
	    'oacute': '\u00F3',
	    'Ocirc': '\u00D4',
	    'ocirc': '\u00F4',
	    'OElig': '\u0152',
	    'oelig': '\u0153',
	    'Ograve': '\u00D2',
	    'ograve': '\u00F2',
	    'oline': '\u203E',
	    'Omega': '\u03A9',
	    'omega': '\u03C9',
	    'Omicron': '\u039F',
	    'omicron': '\u03BF',
	    'oplus': '\u2295',
	    'or': '\u2228',
	    'ordf': '\u00AA',
	    'ordm': '\u00BA',
	    'Oslash': '\u00D8',
	    'oslash': '\u00F8',
	    'Otilde': '\u00D5',
	    'otilde': '\u00F5',
	    'otimes': '\u2297',
	    'Ouml': '\u00D6',
	    'ouml': '\u00F6',
	    'para': '\u00B6',
	    'permil': '\u2030',
	    'perp': '\u22A5',
	    'Phi': '\u03A6',
	    'phi': '\u03C6',
	    'Pi': '\u03A0',
	    'pi': '\u03C0',
	    'piv': '\u03D6',
	    'plusmn': '\u00B1',
	    'pound': '\u00A3',
	    'prime': '\u2032',
	    'Prime': '\u2033',
	    'prod': '\u220F',
	    'prop': '\u221D',
	    'Psi': '\u03A8',
	    'psi': '\u03C8',
	    'quot': '\u0022',
	    'radic': '\u221A',
	    'rang': '\u27E9',
	    'raquo': '\u00BB',
	    'rarr': '\u2192',
	    'rArr': '\u21D2',
	    'rceil': '\u2309',
	    'rdquo': '\u201D',
	    'real': '\u211C',
	    'reg': '\u00AE',
	    'rfloor': '\u230B',
	    'Rho': '\u03A1',
	    'rho': '\u03C1',
	    'rlm': '\u200F',
	    'rsaquo': '\u203A',
	    'rsquo': '\u2019',
	    'sbquo': '\u201A',
	    'Scaron': '\u0160',
	    'scaron': '\u0161',
	    'sdot': '\u22C5',
	    'sect': '\u00A7',
	    'shy': '\u00AD',
	    'Sigma': '\u03A3',
	    'sigma': '\u03C3',
	    'sigmaf': '\u03C2',
	    'sim': '\u223C',
	    'spades': '\u2660',
	    'sub': '\u2282',
	    'sube': '\u2286',
	    'sum': '\u2211',
	    'sup': '\u2283',
	    'sup1': '\u00B9',
	    'sup2': '\u00B2',
	    'sup3': '\u00B3',
	    'supe': '\u2287',
	    'szlig': '\u00DF',
	    'Tau': '\u03A4',
	    'tau': '\u03C4',
	    'there4': '\u2234',
	    'Theta': '\u0398',
	    'theta': '\u03B8',
	    'thetasym': '\u03D1',
	    'thinsp': '\u2009',
	    'THORN': '\u00DE',
	    'thorn': '\u00FE',
	    'tilde': '\u02DC',
	    'times': '\u00D7',
	    'trade': '\u2122',
	    'Uacute': '\u00DA',
	    'uacute': '\u00FA',
	    'uarr': '\u2191',
	    'uArr': '\u21D1',
	    'Ucirc': '\u00DB',
	    'ucirc': '\u00FB',
	    'Ugrave': '\u00D9',
	    'ugrave': '\u00F9',
	    'uml': '\u00A8',
	    'upsih': '\u03D2',
	    'Upsilon': '\u03A5',
	    'upsilon': '\u03C5',
	    'Uuml': '\u00DC',
	    'uuml': '\u00FC',
	    'weierp': '\u2118',
	    'Xi': '\u039E',
	    'xi': '\u03BE',
	    'Yacute': '\u00DD',
	    'yacute': '\u00FD',
	    'yen': '\u00A5',
	    'yuml': '\u00FF',
	    'Yuml': '\u0178',
	    'Zeta': '\u0396',
	    'zeta': '\u03B6',
	    'zwj': '\u200D',
	    'zwnj': '\u200C',
	};
	(function (HtmlTagContentType) {
	    HtmlTagContentType[HtmlTagContentType["RAW_TEXT"] = 0] = "RAW_TEXT";
	    HtmlTagContentType[HtmlTagContentType["ESCAPABLE_RAW_TEXT"] = 1] = "ESCAPABLE_RAW_TEXT";
	    HtmlTagContentType[HtmlTagContentType["PARSABLE_DATA"] = 2] = "PARSABLE_DATA";
	})(exports.HtmlTagContentType || (exports.HtmlTagContentType = {}));
	var HtmlTagContentType = exports.HtmlTagContentType;
	var HtmlTagDefinition = (function () {
	    function HtmlTagDefinition(_a) {
	        var _this = this;
	        var _b = _a === void 0 ? {} : _a, closedByChildren = _b.closedByChildren, requiredParents = _b.requiredParents, implicitNamespacePrefix = _b.implicitNamespacePrefix, contentType = _b.contentType, closedByParent = _b.closedByParent, isVoid = _b.isVoid, ignoreFirstLf = _b.ignoreFirstLf;
	        this.closedByChildren = {};
	        this.closedByParent = false;
	        if (lang_1.isPresent(closedByChildren) && closedByChildren.length > 0) {
	            closedByChildren.forEach(function (tagName) { return _this.closedByChildren[tagName] = true; });
	        }
	        this.isVoid = lang_1.normalizeBool(isVoid);
	        this.closedByParent = lang_1.normalizeBool(closedByParent) || this.isVoid;
	        if (lang_1.isPresent(requiredParents) && requiredParents.length > 0) {
	            this.requiredParents = {};
	            this.parentToAdd = requiredParents[0];
	            requiredParents.forEach(function (tagName) { return _this.requiredParents[tagName] = true; });
	        }
	        this.implicitNamespacePrefix = implicitNamespacePrefix;
	        this.contentType = lang_1.isPresent(contentType) ? contentType : HtmlTagContentType.PARSABLE_DATA;
	        this.ignoreFirstLf = lang_1.normalizeBool(ignoreFirstLf);
	    }
	    HtmlTagDefinition.prototype.requireExtraParent = function (currentParent) {
	        if (lang_1.isBlank(this.requiredParents)) {
	            return false;
	        }
	        if (lang_1.isBlank(currentParent)) {
	            return true;
	        }
	        var lcParent = currentParent.toLowerCase();
	        return this.requiredParents[lcParent] != true && lcParent != 'template';
	    };
	    HtmlTagDefinition.prototype.isClosedByChild = function (name) {
	        return this.isVoid || lang_1.normalizeBool(this.closedByChildren[name.toLowerCase()]);
	    };
	    return HtmlTagDefinition;
	}());
	exports.HtmlTagDefinition = HtmlTagDefinition;
	// see http://www.w3.org/TR/html51/syntax.html#optional-tags
	// This implementation does not fully conform to the HTML5 spec.
	var TAG_DEFINITIONS = {
	    'base': new HtmlTagDefinition({ isVoid: true }),
	    'meta': new HtmlTagDefinition({ isVoid: true }),
	    'area': new HtmlTagDefinition({ isVoid: true }),
	    'embed': new HtmlTagDefinition({ isVoid: true }),
	    'link': new HtmlTagDefinition({ isVoid: true }),
	    'img': new HtmlTagDefinition({ isVoid: true }),
	    'input': new HtmlTagDefinition({ isVoid: true }),
	    'param': new HtmlTagDefinition({ isVoid: true }),
	    'hr': new HtmlTagDefinition({ isVoid: true }),
	    'br': new HtmlTagDefinition({ isVoid: true }),
	    'source': new HtmlTagDefinition({ isVoid: true }),
	    'track': new HtmlTagDefinition({ isVoid: true }),
	    'wbr': new HtmlTagDefinition({ isVoid: true }),
	    'p': new HtmlTagDefinition({
	        closedByChildren: [
	            'address', 'article', 'aside', 'blockquote', 'div', 'dl', 'fieldset', 'footer', 'form',
	            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr',
	            'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul'
	        ],
	        closedByParent: true
	    }),
	    'thead': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'] }),
	    'tbody': new HtmlTagDefinition({ closedByChildren: ['tbody', 'tfoot'], closedByParent: true }),
	    'tfoot': new HtmlTagDefinition({ closedByChildren: ['tbody'], closedByParent: true }),
	    'tr': new HtmlTagDefinition({
	        closedByChildren: ['tr'],
	        requiredParents: ['tbody', 'tfoot', 'thead'],
	        closedByParent: true
	    }),
	    'td': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
	    'th': new HtmlTagDefinition({ closedByChildren: ['td', 'th'], closedByParent: true }),
	    'col': new HtmlTagDefinition({ requiredParents: ['colgroup'], isVoid: true }),
	    'svg': new HtmlTagDefinition({ implicitNamespacePrefix: 'svg' }),
	    'math': new HtmlTagDefinition({ implicitNamespacePrefix: 'math' }),
	    'li': new HtmlTagDefinition({ closedByChildren: ['li'], closedByParent: true }),
	    'dt': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'] }),
	    'dd': new HtmlTagDefinition({ closedByChildren: ['dt', 'dd'], closedByParent: true }),
	    'rb': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
	    'rt': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
	    'rtc': new HtmlTagDefinition({ closedByChildren: ['rb', 'rtc', 'rp'], closedByParent: true }),
	    'rp': new HtmlTagDefinition({ closedByChildren: ['rb', 'rt', 'rtc', 'rp'], closedByParent: true }),
	    'optgroup': new HtmlTagDefinition({ closedByChildren: ['optgroup'], closedByParent: true }),
	    'option': new HtmlTagDefinition({ closedByChildren: ['option', 'optgroup'], closedByParent: true }),
	    'pre': new HtmlTagDefinition({ ignoreFirstLf: true }),
	    'listing': new HtmlTagDefinition({ ignoreFirstLf: true }),
	    'style': new HtmlTagDefinition({ contentType: HtmlTagContentType.RAW_TEXT }),
	    'script': new HtmlTagDefinition({ contentType: HtmlTagContentType.RAW_TEXT }),
	    'title': new HtmlTagDefinition({ contentType: HtmlTagContentType.ESCAPABLE_RAW_TEXT }),
	    'textarea': new HtmlTagDefinition({ contentType: HtmlTagContentType.ESCAPABLE_RAW_TEXT, ignoreFirstLf: true }),
	};
	var DEFAULT_TAG_DEFINITION = new HtmlTagDefinition();
	function getHtmlTagDefinition(tagName) {
	    var result = TAG_DEFINITIONS[tagName.toLowerCase()];
	    return lang_1.isPresent(result) ? result : DEFAULT_TAG_DEFINITION;
	}
	exports.getHtmlTagDefinition = getHtmlTagDefinition;
	var NS_PREFIX_RE = /^:([^:]+):(.+)/g;
	function splitNsName(elementName) {
	    if (elementName[0] != ':') {
	        return [null, elementName];
	    }
	    var match = lang_1.RegExpWrapper.firstMatch(NS_PREFIX_RE, elementName);
	    return [match[1], match[2]];
	}
	exports.splitNsName = splitNsName;
	function getNsPrefix(elementName) {
	    return splitNsName(elementName)[0];
	}
	exports.getNsPrefix = getNsPrefix;
	function mergeNsAndName(prefix, localName) {
	    return lang_1.isPresent(prefix) ? ":" + prefix + ":" + localName : localName;
	}
	exports.mergeNsAndName = mergeNsAndName;
	//# sourceMappingURL=html_tags.js.map

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var ParseLocation = (function () {
	    function ParseLocation(file, offset, line, col) {
	        this.file = file;
	        this.offset = offset;
	        this.line = line;
	        this.col = col;
	    }
	    ParseLocation.prototype.toString = function () { return this.file.url + "@" + this.line + ":" + this.col; };
	    return ParseLocation;
	}());
	exports.ParseLocation = ParseLocation;
	var ParseSourceFile = (function () {
	    function ParseSourceFile(content, url) {
	        this.content = content;
	        this.url = url;
	    }
	    return ParseSourceFile;
	}());
	exports.ParseSourceFile = ParseSourceFile;
	var ParseSourceSpan = (function () {
	    function ParseSourceSpan(start, end) {
	        this.start = start;
	        this.end = end;
	    }
	    ParseSourceSpan.prototype.toString = function () {
	        return this.start.file.content.substring(this.start.offset, this.end.offset);
	    };
	    return ParseSourceSpan;
	}());
	exports.ParseSourceSpan = ParseSourceSpan;
	(function (ParseErrorLevel) {
	    ParseErrorLevel[ParseErrorLevel["WARNING"] = 0] = "WARNING";
	    ParseErrorLevel[ParseErrorLevel["FATAL"] = 1] = "FATAL";
	})(exports.ParseErrorLevel || (exports.ParseErrorLevel = {}));
	var ParseErrorLevel = exports.ParseErrorLevel;
	var ParseError = (function () {
	    function ParseError(span, msg, level) {
	        if (level === void 0) { level = ParseErrorLevel.FATAL; }
	        this.span = span;
	        this.msg = msg;
	        this.level = level;
	    }
	    ParseError.prototype.toString = function () {
	        var source = this.span.start.file.content;
	        var ctxStart = this.span.start.offset;
	        if (ctxStart > source.length - 1) {
	            ctxStart = source.length - 1;
	        }
	        var ctxEnd = ctxStart;
	        var ctxLen = 0;
	        var ctxLines = 0;
	        while (ctxLen < 100 && ctxStart > 0) {
	            ctxStart--;
	            ctxLen++;
	            if (source[ctxStart] == '\n') {
	                if (++ctxLines == 3) {
	                    break;
	                }
	            }
	        }
	        ctxLen = 0;
	        ctxLines = 0;
	        while (ctxLen < 100 && ctxEnd < source.length - 1) {
	            ctxEnd++;
	            ctxLen++;
	            if (source[ctxEnd] == '\n') {
	                if (++ctxLines == 3) {
	                    break;
	                }
	            }
	        }
	        var context = source.substring(ctxStart, this.span.start.offset) + '[ERROR ->]' +
	            source.substring(this.span.start.offset, ctxEnd + 1);
	        return this.msg + " (\"" + context + "\"): " + this.span.start;
	    };
	    return ParseError;
	}());
	exports.ParseError = ParseError;
	//# sourceMappingURL=parse_util.js.map

/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var _EMPTY_ATTR_VALUE = '';
	// TODO: Can't use `const` here as
	// in Dart this is not transpiled into `final` yet...
	var _SELECTOR_REGEXP = lang_1.RegExpWrapper.create('(\\:not\\()|' +
	    '([-\\w]+)|' +
	    '(?:\\.([-\\w]+))|' +
	    '(?:\\[([-\\w*]+)(?:=([^\\]]*))?\\])|' +
	    '(\\))|' +
	    '(\\s*,\\s*)'); // ","
	/**
	 * A css selector contains an element name,
	 * css classes and attribute/value pairs with the purpose
	 * of selecting subsets out of them.
	 */
	var CssSelector = (function () {
	    function CssSelector() {
	        this.element = null;
	        this.classNames = [];
	        this.attrs = [];
	        this.notSelectors = [];
	    }
	    CssSelector.parse = function (selector) {
	        var results = [];
	        var _addResult = function (res, cssSel) {
	            if (cssSel.notSelectors.length > 0 && lang_1.isBlank(cssSel.element) &&
	                collection_1.ListWrapper.isEmpty(cssSel.classNames) && collection_1.ListWrapper.isEmpty(cssSel.attrs)) {
	                cssSel.element = '*';
	            }
	            res.push(cssSel);
	        };
	        var cssSelector = new CssSelector();
	        var matcher = lang_1.RegExpWrapper.matcher(_SELECTOR_REGEXP, selector);
	        var match;
	        var current = cssSelector;
	        var inNot = false;
	        while (lang_1.isPresent(match = lang_1.RegExpMatcherWrapper.next(matcher))) {
	            if (lang_1.isPresent(match[1])) {
	                if (inNot) {
	                    throw new exceptions_1.BaseException('Nesting :not is not allowed in a selector');
	                }
	                inNot = true;
	                current = new CssSelector();
	                cssSelector.notSelectors.push(current);
	            }
	            if (lang_1.isPresent(match[2])) {
	                current.setElement(match[2]);
	            }
	            if (lang_1.isPresent(match[3])) {
	                current.addClassName(match[3]);
	            }
	            if (lang_1.isPresent(match[4])) {
	                current.addAttribute(match[4], match[5]);
	            }
	            if (lang_1.isPresent(match[6])) {
	                inNot = false;
	                current = cssSelector;
	            }
	            if (lang_1.isPresent(match[7])) {
	                if (inNot) {
	                    throw new exceptions_1.BaseException('Multiple selectors in :not are not supported');
	                }
	                _addResult(results, cssSelector);
	                cssSelector = current = new CssSelector();
	            }
	        }
	        _addResult(results, cssSelector);
	        return results;
	    };
	    CssSelector.prototype.isElementSelector = function () {
	        return lang_1.isPresent(this.element) && collection_1.ListWrapper.isEmpty(this.classNames) &&
	            collection_1.ListWrapper.isEmpty(this.attrs) && this.notSelectors.length === 0;
	    };
	    CssSelector.prototype.setElement = function (element) {
	        if (element === void 0) { element = null; }
	        this.element = element;
	    };
	    /** Gets a template string for an element that matches the selector. */
	    CssSelector.prototype.getMatchingElementTemplate = function () {
	        var tagName = lang_1.isPresent(this.element) ? this.element : 'div';
	        var classAttr = this.classNames.length > 0 ? " class=\"" + this.classNames.join(' ') + "\"" : '';
	        var attrs = '';
	        for (var i = 0; i < this.attrs.length; i += 2) {
	            var attrName = this.attrs[i];
	            var attrValue = this.attrs[i + 1] !== '' ? "=\"" + this.attrs[i + 1] + "\"" : '';
	            attrs += " " + attrName + attrValue;
	        }
	        return "<" + tagName + classAttr + attrs + "></" + tagName + ">";
	    };
	    CssSelector.prototype.addAttribute = function (name, value) {
	        if (value === void 0) { value = _EMPTY_ATTR_VALUE; }
	        this.attrs.push(name);
	        if (lang_1.isPresent(value)) {
	            value = value.toLowerCase();
	        }
	        else {
	            value = _EMPTY_ATTR_VALUE;
	        }
	        this.attrs.push(value);
	    };
	    CssSelector.prototype.addClassName = function (name) { this.classNames.push(name.toLowerCase()); };
	    CssSelector.prototype.toString = function () {
	        var res = '';
	        if (lang_1.isPresent(this.element)) {
	            res += this.element;
	        }
	        if (lang_1.isPresent(this.classNames)) {
	            for (var i = 0; i < this.classNames.length; i++) {
	                res += '.' + this.classNames[i];
	            }
	        }
	        if (lang_1.isPresent(this.attrs)) {
	            for (var i = 0; i < this.attrs.length;) {
	                var attrName = this.attrs[i++];
	                var attrValue = this.attrs[i++];
	                res += '[' + attrName;
	                if (attrValue.length > 0) {
	                    res += '=' + attrValue;
	                }
	                res += ']';
	            }
	        }
	        this.notSelectors.forEach(function (notSelector) { return res += ":not(" + notSelector + ")"; });
	        return res;
	    };
	    return CssSelector;
	}());
	exports.CssSelector = CssSelector;
	/**
	 * Reads a list of CssSelectors and allows to calculate which ones
	 * are contained in a given CssSelector.
	 */
	var SelectorMatcher = (function () {
	    function SelectorMatcher() {
	        this._elementMap = new collection_1.Map();
	        this._elementPartialMap = new collection_1.Map();
	        this._classMap = new collection_1.Map();
	        this._classPartialMap = new collection_1.Map();
	        this._attrValueMap = new collection_1.Map();
	        this._attrValuePartialMap = new collection_1.Map();
	        this._listContexts = [];
	    }
	    SelectorMatcher.createNotMatcher = function (notSelectors) {
	        var notMatcher = new SelectorMatcher();
	        notMatcher.addSelectables(notSelectors, null);
	        return notMatcher;
	    };
	    SelectorMatcher.prototype.addSelectables = function (cssSelectors, callbackCtxt) {
	        var listContext = null;
	        if (cssSelectors.length > 1) {
	            listContext = new SelectorListContext(cssSelectors);
	            this._listContexts.push(listContext);
	        }
	        for (var i = 0; i < cssSelectors.length; i++) {
	            this._addSelectable(cssSelectors[i], callbackCtxt, listContext);
	        }
	    };
	    /**
	     * Add an object that can be found later on by calling `match`.
	     * @param cssSelector A css selector
	     * @param callbackCtxt An opaque object that will be given to the callback of the `match` function
	     */
	    SelectorMatcher.prototype._addSelectable = function (cssSelector, callbackCtxt, listContext) {
	        var matcher = this;
	        var element = cssSelector.element;
	        var classNames = cssSelector.classNames;
	        var attrs = cssSelector.attrs;
	        var selectable = new SelectorContext(cssSelector, callbackCtxt, listContext);
	        if (lang_1.isPresent(element)) {
	            var isTerminal = attrs.length === 0 && classNames.length === 0;
	            if (isTerminal) {
	                this._addTerminal(matcher._elementMap, element, selectable);
	            }
	            else {
	                matcher = this._addPartial(matcher._elementPartialMap, element);
	            }
	        }
	        if (lang_1.isPresent(classNames)) {
	            for (var index = 0; index < classNames.length; index++) {
	                var isTerminal = attrs.length === 0 && index === classNames.length - 1;
	                var className = classNames[index];
	                if (isTerminal) {
	                    this._addTerminal(matcher._classMap, className, selectable);
	                }
	                else {
	                    matcher = this._addPartial(matcher._classPartialMap, className);
	                }
	            }
	        }
	        if (lang_1.isPresent(attrs)) {
	            for (var index = 0; index < attrs.length;) {
	                var isTerminal = index === attrs.length - 2;
	                var attrName = attrs[index++];
	                var attrValue = attrs[index++];
	                if (isTerminal) {
	                    var terminalMap = matcher._attrValueMap;
	                    var terminalValuesMap = terminalMap.get(attrName);
	                    if (lang_1.isBlank(terminalValuesMap)) {
	                        terminalValuesMap = new collection_1.Map();
	                        terminalMap.set(attrName, terminalValuesMap);
	                    }
	                    this._addTerminal(terminalValuesMap, attrValue, selectable);
	                }
	                else {
	                    var parttialMap = matcher._attrValuePartialMap;
	                    var partialValuesMap = parttialMap.get(attrName);
	                    if (lang_1.isBlank(partialValuesMap)) {
	                        partialValuesMap = new collection_1.Map();
	                        parttialMap.set(attrName, partialValuesMap);
	                    }
	                    matcher = this._addPartial(partialValuesMap, attrValue);
	                }
	            }
	        }
	    };
	    SelectorMatcher.prototype._addTerminal = function (map, name, selectable) {
	        var terminalList = map.get(name);
	        if (lang_1.isBlank(terminalList)) {
	            terminalList = [];
	            map.set(name, terminalList);
	        }
	        terminalList.push(selectable);
	    };
	    SelectorMatcher.prototype._addPartial = function (map, name) {
	        var matcher = map.get(name);
	        if (lang_1.isBlank(matcher)) {
	            matcher = new SelectorMatcher();
	            map.set(name, matcher);
	        }
	        return matcher;
	    };
	    /**
	     * Find the objects that have been added via `addSelectable`
	     * whose css selector is contained in the given css selector.
	     * @param cssSelector A css selector
	     * @param matchedCallback This callback will be called with the object handed into `addSelectable`
	     * @return boolean true if a match was found
	    */
	    SelectorMatcher.prototype.match = function (cssSelector, matchedCallback) {
	        var result = false;
	        var element = cssSelector.element;
	        var classNames = cssSelector.classNames;
	        var attrs = cssSelector.attrs;
	        for (var i = 0; i < this._listContexts.length; i++) {
	            this._listContexts[i].alreadyMatched = false;
	        }
	        result = this._matchTerminal(this._elementMap, element, cssSelector, matchedCallback) || result;
	        result = this._matchPartial(this._elementPartialMap, element, cssSelector, matchedCallback) ||
	            result;
	        if (lang_1.isPresent(classNames)) {
	            for (var index = 0; index < classNames.length; index++) {
	                var className = classNames[index];
	                result =
	                    this._matchTerminal(this._classMap, className, cssSelector, matchedCallback) || result;
	                result =
	                    this._matchPartial(this._classPartialMap, className, cssSelector, matchedCallback) ||
	                        result;
	            }
	        }
	        if (lang_1.isPresent(attrs)) {
	            for (var index = 0; index < attrs.length;) {
	                var attrName = attrs[index++];
	                var attrValue = attrs[index++];
	                var terminalValuesMap = this._attrValueMap.get(attrName);
	                if (!lang_1.StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
	                    result = this._matchTerminal(terminalValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) ||
	                        result;
	                }
	                result = this._matchTerminal(terminalValuesMap, attrValue, cssSelector, matchedCallback) ||
	                    result;
	                var partialValuesMap = this._attrValuePartialMap.get(attrName);
	                if (!lang_1.StringWrapper.equals(attrValue, _EMPTY_ATTR_VALUE)) {
	                    result = this._matchPartial(partialValuesMap, _EMPTY_ATTR_VALUE, cssSelector, matchedCallback) ||
	                        result;
	                }
	                result =
	                    this._matchPartial(partialValuesMap, attrValue, cssSelector, matchedCallback) || result;
	            }
	        }
	        return result;
	    };
	    /** @internal */
	    SelectorMatcher.prototype._matchTerminal = function (map, name, cssSelector, matchedCallback) {
	        if (lang_1.isBlank(map) || lang_1.isBlank(name)) {
	            return false;
	        }
	        var selectables = map.get(name);
	        var starSelectables = map.get('*');
	        if (lang_1.isPresent(starSelectables)) {
	            selectables = selectables.concat(starSelectables);
	        }
	        if (lang_1.isBlank(selectables)) {
	            return false;
	        }
	        var selectable;
	        var result = false;
	        for (var index = 0; index < selectables.length; index++) {
	            selectable = selectables[index];
	            result = selectable.finalize(cssSelector, matchedCallback) || result;
	        }
	        return result;
	    };
	    /** @internal */
	    SelectorMatcher.prototype._matchPartial = function (map, name, cssSelector, matchedCallback) {
	        if (lang_1.isBlank(map) || lang_1.isBlank(name)) {
	            return false;
	        }
	        var nestedSelector = map.get(name);
	        if (lang_1.isBlank(nestedSelector)) {
	            return false;
	        }
	        // TODO(perf): get rid of recursion and measure again
	        // TODO(perf): don't pass the whole selector into the recursion,
	        // but only the not processed parts
	        return nestedSelector.match(cssSelector, matchedCallback);
	    };
	    return SelectorMatcher;
	}());
	exports.SelectorMatcher = SelectorMatcher;
	var SelectorListContext = (function () {
	    function SelectorListContext(selectors) {
	        this.selectors = selectors;
	        this.alreadyMatched = false;
	    }
	    return SelectorListContext;
	}());
	exports.SelectorListContext = SelectorListContext;
	// Store context to pass back selector and context when a selector is matched
	var SelectorContext = (function () {
	    function SelectorContext(selector, cbContext, listContext) {
	        this.selector = selector;
	        this.cbContext = cbContext;
	        this.listContext = listContext;
	        this.notSelectors = selector.notSelectors;
	    }
	    SelectorContext.prototype.finalize = function (cssSelector, callback) {
	        var result = true;
	        if (this.notSelectors.length > 0 &&
	            (lang_1.isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
	            var notMatcher = SelectorMatcher.createNotMatcher(this.notSelectors);
	            result = !notMatcher.match(cssSelector, null);
	        }
	        if (result && lang_1.isPresent(callback) &&
	            (lang_1.isBlank(this.listContext) || !this.listContext.alreadyMatched)) {
	            if (lang_1.isPresent(this.listContext)) {
	                this.listContext.alreadyMatched = true;
	            }
	            callback(this.selector, this.cbContext);
	        }
	        return result;
	    };
	    return SelectorContext;
	}());
	exports.SelectorContext = SelectorContext;
	//# sourceMappingURL=selector.js.map

/***/ }),

/***/ 560:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var ElementSchemaRegistry = (function () {
	    function ElementSchemaRegistry() {
	    }
	    return ElementSchemaRegistry;
	}());
	exports.ElementSchemaRegistry = ElementSchemaRegistry;
	//# sourceMappingURL=element_schema_registry.js.map

/***/ }),

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	var html_tags_1 = __webpack_require__(557);
	var NG_CONTENT_SELECT_ATTR = 'select';
	var NG_CONTENT_ELEMENT = 'ng-content';
	var LINK_ELEMENT = 'link';
	var LINK_STYLE_REL_ATTR = 'rel';
	var LINK_STYLE_HREF_ATTR = 'href';
	var LINK_STYLE_REL_VALUE = 'stylesheet';
	var STYLE_ELEMENT = 'style';
	var SCRIPT_ELEMENT = 'script';
	var NG_NON_BINDABLE_ATTR = 'ngNonBindable';
	var NG_PROJECT_AS = 'ngProjectAs';
	function preparseElement(ast) {
	    var selectAttr = null;
	    var hrefAttr = null;
	    var relAttr = null;
	    var nonBindable = false;
	    var projectAs = null;
	    ast.attrs.forEach(function (attr) {
	        var lcAttrName = attr.name.toLowerCase();
	        if (lcAttrName == NG_CONTENT_SELECT_ATTR) {
	            selectAttr = attr.value;
	        }
	        else if (lcAttrName == LINK_STYLE_HREF_ATTR) {
	            hrefAttr = attr.value;
	        }
	        else if (lcAttrName == LINK_STYLE_REL_ATTR) {
	            relAttr = attr.value;
	        }
	        else if (attr.name == NG_NON_BINDABLE_ATTR) {
	            nonBindable = true;
	        }
	        else if (attr.name == NG_PROJECT_AS) {
	            if (attr.value.length > 0) {
	                projectAs = attr.value;
	            }
	        }
	    });
	    selectAttr = normalizeNgContentSelect(selectAttr);
	    var nodeName = ast.name.toLowerCase();
	    var type = PreparsedElementType.OTHER;
	    if (html_tags_1.splitNsName(nodeName)[1] == NG_CONTENT_ELEMENT) {
	        type = PreparsedElementType.NG_CONTENT;
	    }
	    else if (nodeName == STYLE_ELEMENT) {
	        type = PreparsedElementType.STYLE;
	    }
	    else if (nodeName == SCRIPT_ELEMENT) {
	        type = PreparsedElementType.SCRIPT;
	    }
	    else if (nodeName == LINK_ELEMENT && relAttr == LINK_STYLE_REL_VALUE) {
	        type = PreparsedElementType.STYLESHEET;
	    }
	    return new PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs);
	}
	exports.preparseElement = preparseElement;
	(function (PreparsedElementType) {
	    PreparsedElementType[PreparsedElementType["NG_CONTENT"] = 0] = "NG_CONTENT";
	    PreparsedElementType[PreparsedElementType["STYLE"] = 1] = "STYLE";
	    PreparsedElementType[PreparsedElementType["STYLESHEET"] = 2] = "STYLESHEET";
	    PreparsedElementType[PreparsedElementType["SCRIPT"] = 3] = "SCRIPT";
	    PreparsedElementType[PreparsedElementType["OTHER"] = 4] = "OTHER";
	})(exports.PreparsedElementType || (exports.PreparsedElementType = {}));
	var PreparsedElementType = exports.PreparsedElementType;
	var PreparsedElement = (function () {
	    function PreparsedElement(type, selectAttr, hrefAttr, nonBindable, projectAs) {
	        this.type = type;
	        this.selectAttr = selectAttr;
	        this.hrefAttr = hrefAttr;
	        this.nonBindable = nonBindable;
	        this.projectAs = projectAs;
	    }
	    return PreparsedElement;
	}());
	exports.PreparsedElement = PreparsedElement;
	function normalizeNgContentSelect(selectAttr) {
	    if (lang_1.isBlank(selectAttr) || selectAttr.length === 0) {
	        return '*';
	    }
	    return selectAttr;
	}
	//# sourceMappingURL=template_preparser.js.map

/***/ }),

/***/ 562:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	// Some of the code comes from WebComponents.JS
	// https://github.com/webcomponents/webcomponentsjs/blob/master/src/HTMLImports/path.js
	var lang_1 = __webpack_require__(542);
	var StyleWithImports = (function () {
	    function StyleWithImports(style, styleUrls) {
	        this.style = style;
	        this.styleUrls = styleUrls;
	    }
	    return StyleWithImports;
	}());
	exports.StyleWithImports = StyleWithImports;
	function isStyleUrlResolvable(url) {
	    if (lang_1.isBlank(url) || url.length === 0 || url[0] == '/')
	        return false;
	    var schemeMatch = lang_1.RegExpWrapper.firstMatch(_urlWithSchemaRe, url);
	    return lang_1.isBlank(schemeMatch) || schemeMatch[1] == 'package' || schemeMatch[1] == 'asset';
	}
	exports.isStyleUrlResolvable = isStyleUrlResolvable;
	/**
	 * Rewrites stylesheets by resolving and removing the @import urls that
	 * are either relative or don't have a `package:` scheme
	 */
	function extractStyleUrls(resolver, baseUrl, cssText) {
	    var foundUrls = [];
	    var modifiedCssText = lang_1.StringWrapper.replaceAllMapped(cssText, _cssImportRe, function (m) {
	        var url = lang_1.isPresent(m[1]) ? m[1] : m[2];
	        if (!isStyleUrlResolvable(url)) {
	            // Do not attempt to resolve non-package absolute URLs with URI scheme
	            return m[0];
	        }
	        foundUrls.push(resolver.resolve(baseUrl, url));
	        return '';
	    });
	    return new StyleWithImports(modifiedCssText, foundUrls);
	}
	exports.extractStyleUrls = extractStyleUrls;
	var _cssImportRe = /@import\s+(?:url\()?\s*(?:(?:['"]([^'"]*))|([^;\)\s]*))[^;]*;?/g;
	// TODO: can't use /^[^:/?#.]+:/g due to clang-format bug:
	//       https://github.com/angular/angular/issues/4596
	var _urlWithSchemaRe = /^([a-zA-Z\-\+\.]+):/g;
	//# sourceMappingURL=style_url_resolver.js.map

/***/ }),

/***/ 563:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	exports.MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '';
	var CAMEL_CASE_REGEXP = /([A-Z])/g;
	function camelCaseToDashCase(input) {
	    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
	}
	exports.camelCaseToDashCase = camelCaseToDashCase;
	function splitAtColon(input, defaultValues) {
	    var parts = lang_1.StringWrapper.split(input.trim(), /\s*:\s*/g);
	    if (parts.length > 1) {
	        return parts;
	    }
	    else {
	        return defaultValues;
	    }
	}
	exports.splitAtColon = splitAtColon;
	function sanitizeIdentifier(name) {
	    return lang_1.StringWrapper.replaceAll(name, /\W/g, '_');
	}
	exports.sanitizeIdentifier = sanitizeIdentifier;
	function visitValue(value, visitor, context) {
	    if (lang_1.isArray(value)) {
	        return visitor.visitArray(value, context);
	    }
	    else if (lang_1.isStrictStringMap(value)) {
	        return visitor.visitStringMap(value, context);
	    }
	    else if (lang_1.isBlank(value) || lang_1.isPrimitive(value)) {
	        return visitor.visitPrimitive(value, context);
	    }
	    else {
	        return visitor.visitOther(value, context);
	    }
	}
	exports.visitValue = visitValue;
	var ValueTransformer = (function () {
	    function ValueTransformer() {
	    }
	    ValueTransformer.prototype.visitArray = function (arr, context) {
	        var _this = this;
	        return arr.map(function (value) { return visitValue(value, _this, context); });
	    };
	    ValueTransformer.prototype.visitStringMap = function (map, context) {
	        var _this = this;
	        var result = {};
	        collection_1.StringMapWrapper.forEach(map, function (value /** TODO #9100 */, key /** TODO #9100 */) {
	            result[key] = visitValue(value, _this, context);
	        });
	        return result;
	    };
	    ValueTransformer.prototype.visitPrimitive = function (value, context) { return value; };
	    ValueTransformer.prototype.visitOther = function (value, context) { return value; };
	    return ValueTransformer;
	}());
	exports.ValueTransformer = ValueTransformer;
	function assetUrl(pkg, path, type) {
	    if (path === void 0) { path = null; }
	    if (type === void 0) { type = 'src'; }
	    if (lang_1.IS_DART) {
	        if (path == null) {
	            return "asset:angular2/" + pkg + "/" + pkg + ".dart";
	        }
	        else {
	            return "asset:angular2/lib/" + pkg + "/src/" + path + ".dart";
	        }
	    }
	    else {
	        if (path == null) {
	            return "asset:@angular/lib/" + pkg + "/index";
	        }
	        else {
	            return "asset:@angular/lib/" + pkg + "/src/" + path;
	        }
	    }
	}
	exports.assetUrl = assetUrl;
	//# sourceMappingURL=util.js.map

/***/ }),

/***/ 564:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var compile_metadata_1 = __webpack_require__(565);
	var util_1 = __webpack_require__(563);
	var APP_VIEW_MODULE_URL = util_1.assetUrl('core', 'linker/view');
	var VIEW_UTILS_MODULE_URL = util_1.assetUrl('core', 'linker/view_utils');
	var CD_MODULE_URL = util_1.assetUrl('core', 'change_detection/change_detection');
	// Reassign the imports to different variables so we can
	// define static variables with the name of the import.
	// (only needed for Dart).
	var impViewUtils = core_private_1.ViewUtils;
	var impAppView = core_private_1.AppView;
	var impDebugAppView = core_private_1.DebugAppView;
	var impDebugContext = core_private_1.DebugContext;
	var impAppElement = core_private_1.AppElement;
	var impElementRef = core_1.ElementRef;
	var impViewContainerRef = core_1.ViewContainerRef;
	var impChangeDetectorRef = core_1.ChangeDetectorRef;
	var impRenderComponentType = core_1.RenderComponentType;
	var impQueryList = core_1.QueryList;
	var impTemplateRef = core_1.TemplateRef;
	var impTemplateRef_ = core_private_1.TemplateRef_;
	var impValueUnwrapper = core_private_1.ValueUnwrapper;
	var impInjector = core_1.Injector;
	var impViewEncapsulation = core_1.ViewEncapsulation;
	var impViewType = core_private_1.ViewType;
	var impChangeDetectionStrategy = core_1.ChangeDetectionStrategy;
	var impStaticNodeDebugInfo = core_private_1.StaticNodeDebugInfo;
	var impRenderer = core_1.Renderer;
	var impSimpleChange = core_1.SimpleChange;
	var impUninitialized = core_private_1.uninitialized;
	var impChangeDetectorStatus = core_private_1.ChangeDetectorStatus;
	var impFlattenNestedViewRenderNodes = core_private_1.flattenNestedViewRenderNodes;
	var impDevModeEqual = core_private_1.devModeEqual;
	var impInterpolate = core_private_1.interpolate;
	var impCheckBinding = core_private_1.checkBinding;
	var impCastByValue = core_private_1.castByValue;
	var impEMPTY_ARRAY = core_private_1.EMPTY_ARRAY;
	var impEMPTY_MAP = core_private_1.EMPTY_MAP;
	var impAnimationGroupPlayer = core_private_1.AnimationGroupPlayer;
	var impAnimationSequencePlayer = core_private_1.AnimationSequencePlayer;
	var impAnimationKeyframe = core_private_1.AnimationKeyframe;
	var impAnimationStyles = core_private_1.AnimationStyles;
	var impNoOpAnimationPlayer = core_private_1.NoOpAnimationPlayer;
	var ANIMATION_STYLE_UTIL_ASSET_URL = util_1.assetUrl('core', 'animation/animation_style_util');
	var Identifiers = (function () {
	    function Identifiers() {
	    }
	    Identifiers.ViewUtils = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ViewUtils', moduleUrl: util_1.assetUrl('core', 'linker/view_utils'), runtime: impViewUtils });
	    Identifiers.AppView = new compile_metadata_1.CompileIdentifierMetadata({ name: 'AppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impAppView });
	    Identifiers.DebugAppView = new compile_metadata_1.CompileIdentifierMetadata({ name: 'DebugAppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impDebugAppView });
	    Identifiers.AppElement = new compile_metadata_1.CompileIdentifierMetadata({ name: 'AppElement', moduleUrl: util_1.assetUrl('core', 'linker/element'), runtime: impAppElement });
	    Identifiers.ElementRef = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'ElementRef',
	        moduleUrl: util_1.assetUrl('core', 'linker/element_ref'),
	        runtime: impElementRef
	    });
	    Identifiers.ViewContainerRef = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'ViewContainerRef',
	        moduleUrl: util_1.assetUrl('core', 'linker/view_container_ref'),
	        runtime: impViewContainerRef
	    });
	    Identifiers.ChangeDetectorRef = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'ChangeDetectorRef',
	        moduleUrl: util_1.assetUrl('core', 'change_detection/change_detector_ref'),
	        runtime: impChangeDetectorRef
	    });
	    Identifiers.RenderComponentType = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'RenderComponentType',
	        moduleUrl: util_1.assetUrl('core', 'render/api'),
	        runtime: impRenderComponentType
	    });
	    Identifiers.QueryList = new compile_metadata_1.CompileIdentifierMetadata({ name: 'QueryList', moduleUrl: util_1.assetUrl('core', 'linker/query_list'), runtime: impQueryList });
	    Identifiers.TemplateRef = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'TemplateRef',
	        moduleUrl: util_1.assetUrl('core', 'linker/template_ref'),
	        runtime: impTemplateRef
	    });
	    Identifiers.TemplateRef_ = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'TemplateRef_',
	        moduleUrl: util_1.assetUrl('core', 'linker/template_ref'),
	        runtime: impTemplateRef_
	    });
	    Identifiers.CodegenComponentFactoryResolver = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'CodegenComponentFactoryResolver',
	        moduleUrl: util_1.assetUrl('core', 'linker/component_factory_resolver'),
	        runtime: core_private_1.CodegenComponentFactoryResolver
	    });
	    Identifiers.ComponentFactoryResolver = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'ComponentFactoryResolver',
	        moduleUrl: util_1.assetUrl('core', 'linker/component_factory_resolver'),
	        runtime: core_1.ComponentFactoryResolver
	    });
	    Identifiers.ValueUnwrapper = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ValueUnwrapper', moduleUrl: CD_MODULE_URL, runtime: impValueUnwrapper });
	    Identifiers.Injector = new compile_metadata_1.CompileIdentifierMetadata({ name: 'Injector', moduleUrl: util_1.assetUrl('core', 'di/injector'), runtime: impInjector });
	    Identifiers.ViewEncapsulation = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'ViewEncapsulation',
	        moduleUrl: util_1.assetUrl('core', 'metadata/view'),
	        runtime: impViewEncapsulation
	    });
	    Identifiers.ViewType = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ViewType', moduleUrl: util_1.assetUrl('core', 'linker/view_type'), runtime: impViewType });
	    Identifiers.ChangeDetectionStrategy = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'ChangeDetectionStrategy',
	        moduleUrl: CD_MODULE_URL,
	        runtime: impChangeDetectionStrategy
	    });
	    Identifiers.StaticNodeDebugInfo = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'StaticNodeDebugInfo',
	        moduleUrl: util_1.assetUrl('core', 'linker/debug_context'),
	        runtime: impStaticNodeDebugInfo
	    });
	    Identifiers.DebugContext = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'DebugContext',
	        moduleUrl: util_1.assetUrl('core', 'linker/debug_context'),
	        runtime: impDebugContext
	    });
	    Identifiers.Renderer = new compile_metadata_1.CompileIdentifierMetadata({ name: 'Renderer', moduleUrl: util_1.assetUrl('core', 'render/api'), runtime: impRenderer });
	    Identifiers.SimpleChange = new compile_metadata_1.CompileIdentifierMetadata({ name: 'SimpleChange', moduleUrl: CD_MODULE_URL, runtime: impSimpleChange });
	    Identifiers.uninitialized = new compile_metadata_1.CompileIdentifierMetadata({ name: 'uninitialized', moduleUrl: CD_MODULE_URL, runtime: impUninitialized });
	    Identifiers.ChangeDetectorStatus = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ChangeDetectorStatus', moduleUrl: CD_MODULE_URL, runtime: impChangeDetectorStatus });
	    Identifiers.checkBinding = new compile_metadata_1.CompileIdentifierMetadata({ name: 'checkBinding', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCheckBinding });
	    Identifiers.flattenNestedViewRenderNodes = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'flattenNestedViewRenderNodes',
	        moduleUrl: VIEW_UTILS_MODULE_URL,
	        runtime: impFlattenNestedViewRenderNodes
	    });
	    Identifiers.devModeEqual = new compile_metadata_1.CompileIdentifierMetadata({ name: 'devModeEqual', moduleUrl: CD_MODULE_URL, runtime: impDevModeEqual });
	    Identifiers.interpolate = new compile_metadata_1.CompileIdentifierMetadata({ name: 'interpolate', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impInterpolate });
	    Identifiers.castByValue = new compile_metadata_1.CompileIdentifierMetadata({ name: 'castByValue', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCastByValue });
	    Identifiers.EMPTY_ARRAY = new compile_metadata_1.CompileIdentifierMetadata({ name: 'EMPTY_ARRAY', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impEMPTY_ARRAY });
	    Identifiers.EMPTY_MAP = new compile_metadata_1.CompileIdentifierMetadata({ name: 'EMPTY_MAP', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impEMPTY_MAP });
	    Identifiers.pureProxies = [
	        null,
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy1', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy1 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy2', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy2 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy3', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy3 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy4', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy4 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy5', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy5 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy6', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy6 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy7', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy7 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy8', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy8 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy9', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy9 }),
	        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy10', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy10 }),
	    ];
	    Identifiers.SecurityContext = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'SecurityContext',
	        moduleUrl: util_1.assetUrl('core', 'security'),
	        runtime: core_private_1.SecurityContext,
	    });
	    Identifiers.AnimationKeyframe = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'AnimationKeyframe',
	        moduleUrl: util_1.assetUrl('core', 'animation/animation_keyframe'),
	        runtime: impAnimationKeyframe
	    });
	    Identifiers.AnimationStyles = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'AnimationStyles',
	        moduleUrl: util_1.assetUrl('core', 'animation/animation_styles'),
	        runtime: impAnimationStyles
	    });
	    Identifiers.NoOpAnimationPlayer = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'NoOpAnimationPlayer',
	        moduleUrl: util_1.assetUrl('core', 'animation/animation_player'),
	        runtime: impNoOpAnimationPlayer
	    });
	    Identifiers.AnimationGroupPlayer = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'AnimationGroupPlayer',
	        moduleUrl: util_1.assetUrl('core', 'animation/animation_group_player'),
	        runtime: impAnimationGroupPlayer
	    });
	    Identifiers.AnimationSequencePlayer = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'AnimationSequencePlayer',
	        moduleUrl: util_1.assetUrl('core', 'animation/animation_sequence_player'),
	        runtime: impAnimationSequencePlayer
	    });
	    Identifiers.prepareFinalAnimationStyles = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'prepareFinalAnimationStyles',
	        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
	        runtime: core_private_1.prepareFinalAnimationStyles
	    });
	    Identifiers.balanceAnimationKeyframes = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'balanceAnimationKeyframes',
	        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
	        runtime: core_private_1.balanceAnimationKeyframes
	    });
	    Identifiers.clearStyles = new compile_metadata_1.CompileIdentifierMetadata({ name: 'clearStyles', moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL, runtime: core_private_1.clearStyles });
	    Identifiers.renderStyles = new compile_metadata_1.CompileIdentifierMetadata({ name: 'renderStyles', moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL, runtime: core_private_1.renderStyles });
	    Identifiers.collectAndResolveStyles = new compile_metadata_1.CompileIdentifierMetadata({
	        name: 'collectAndResolveStyles',
	        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
	        runtime: core_private_1.collectAndResolveStyles
	    });
	    return Identifiers;
	}());
	exports.Identifiers = Identifiers;
	function identifierToken(identifier) {
	    return new compile_metadata_1.CompileTokenMetadata({ identifier: identifier });
	}
	exports.identifierToken = identifierToken;
	//# sourceMappingURL=identifiers.js.map

/***/ }),

/***/ 565:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var selector_1 = __webpack_require__(559);
	var url_resolver_1 = __webpack_require__(566);
	var util_1 = __webpack_require__(563);
	// group 2: "event" from "(event)"
	var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))$/g;
	var CompileMetadataWithIdentifier = (function () {
	    function CompileMetadataWithIdentifier() {
	    }
	    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "identifier", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    return CompileMetadataWithIdentifier;
	}());
	exports.CompileMetadataWithIdentifier = CompileMetadataWithIdentifier;
	var CompileMetadataWithType = (function (_super) {
	    __extends(CompileMetadataWithType, _super);
	    function CompileMetadataWithType() {
	        _super.apply(this, arguments);
	    }
	    Object.defineProperty(CompileMetadataWithType.prototype, "type", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompileMetadataWithType.prototype, "identifier", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    return CompileMetadataWithType;
	}(CompileMetadataWithIdentifier));
	exports.CompileMetadataWithType = CompileMetadataWithType;
	function metadataFromJson(data) {
	    return _COMPILE_METADATA_FROM_JSON[data['class']](data);
	}
	exports.metadataFromJson = metadataFromJson;
	var CompileAnimationEntryMetadata = (function () {
	    function CompileAnimationEntryMetadata(name, definitions) {
	        if (name === void 0) { name = null; }
	        if (definitions === void 0) { definitions = null; }
	        this.name = name;
	        this.definitions = definitions;
	    }
	    CompileAnimationEntryMetadata.fromJson = function (data) {
	        var value = data['value'];
	        var defs = _arrayFromJson(value['definitions'], metadataFromJson);
	        return new CompileAnimationEntryMetadata(value['name'], defs);
	    };
	    CompileAnimationEntryMetadata.prototype.toJson = function () {
	        return {
	            'class': 'AnimationEntryMetadata',
	            'value': { 'name': this.name, 'definitions': _arrayToJson(this.definitions) }
	        };
	    };
	    return CompileAnimationEntryMetadata;
	}());
	exports.CompileAnimationEntryMetadata = CompileAnimationEntryMetadata;
	var CompileAnimationStateMetadata = (function () {
	    function CompileAnimationStateMetadata() {
	    }
	    return CompileAnimationStateMetadata;
	}());
	exports.CompileAnimationStateMetadata = CompileAnimationStateMetadata;
	var CompileAnimationStateDeclarationMetadata = (function (_super) {
	    __extends(CompileAnimationStateDeclarationMetadata, _super);
	    function CompileAnimationStateDeclarationMetadata(stateNameExpr, styles) {
	        _super.call(this);
	        this.stateNameExpr = stateNameExpr;
	        this.styles = styles;
	    }
	    CompileAnimationStateDeclarationMetadata.fromJson = function (data) {
	        var value = data['value'];
	        var styles = _objFromJson(value['styles'], metadataFromJson);
	        return new CompileAnimationStateDeclarationMetadata(value['stateNameExpr'], styles);
	    };
	    CompileAnimationStateDeclarationMetadata.prototype.toJson = function () {
	        return {
	            'class': 'AnimationStateDeclarationMetadata',
	            'value': { 'stateNameExpr': this.stateNameExpr, 'styles': this.styles.toJson() }
	        };
	    };
	    return CompileAnimationStateDeclarationMetadata;
	}(CompileAnimationStateMetadata));
	exports.CompileAnimationStateDeclarationMetadata = CompileAnimationStateDeclarationMetadata;
	var CompileAnimationStateTransitionMetadata = (function (_super) {
	    __extends(CompileAnimationStateTransitionMetadata, _super);
	    function CompileAnimationStateTransitionMetadata(stateChangeExpr, steps) {
	        _super.call(this);
	        this.stateChangeExpr = stateChangeExpr;
	        this.steps = steps;
	    }
	    CompileAnimationStateTransitionMetadata.fromJson = function (data) {
	        var value = data['value'];
	        var steps = _objFromJson(value['steps'], metadataFromJson);
	        return new CompileAnimationStateTransitionMetadata(value['stateChangeExpr'], steps);
	    };
	    CompileAnimationStateTransitionMetadata.prototype.toJson = function () {
	        return {
	            'class': 'AnimationStateTransitionMetadata',
	            'value': { 'stateChangeExpr': this.stateChangeExpr, 'steps': this.steps.toJson() }
	        };
	    };
	    return CompileAnimationStateTransitionMetadata;
	}(CompileAnimationStateMetadata));
	exports.CompileAnimationStateTransitionMetadata = CompileAnimationStateTransitionMetadata;
	var CompileAnimationMetadata = (function () {
	    function CompileAnimationMetadata() {
	    }
	    return CompileAnimationMetadata;
	}());
	exports.CompileAnimationMetadata = CompileAnimationMetadata;
	var CompileAnimationKeyframesSequenceMetadata = (function (_super) {
	    __extends(CompileAnimationKeyframesSequenceMetadata, _super);
	    function CompileAnimationKeyframesSequenceMetadata(steps) {
	        if (steps === void 0) { steps = []; }
	        _super.call(this);
	        this.steps = steps;
	    }
	    CompileAnimationKeyframesSequenceMetadata.fromJson = function (data) {
	        var steps = _arrayFromJson(data['value'], metadataFromJson);
	        return new CompileAnimationKeyframesSequenceMetadata(steps);
	    };
	    CompileAnimationKeyframesSequenceMetadata.prototype.toJson = function () {
	        return { 'class': 'AnimationKeyframesSequenceMetadata', 'value': _arrayToJson(this.steps) };
	    };
	    return CompileAnimationKeyframesSequenceMetadata;
	}(CompileAnimationMetadata));
	exports.CompileAnimationKeyframesSequenceMetadata = CompileAnimationKeyframesSequenceMetadata;
	var CompileAnimationStyleMetadata = (function (_super) {
	    __extends(CompileAnimationStyleMetadata, _super);
	    function CompileAnimationStyleMetadata(offset, styles) {
	        if (styles === void 0) { styles = null; }
	        _super.call(this);
	        this.offset = offset;
	        this.styles = styles;
	    }
	    CompileAnimationStyleMetadata.fromJson = function (data) {
	        var value = data['value'];
	        var offsetVal = value['offset'];
	        var offset = lang_1.isPresent(offsetVal) ? lang_1.NumberWrapper.parseFloat(offsetVal) : null;
	        var styles = value['styles'];
	        return new CompileAnimationStyleMetadata(offset, styles);
	    };
	    CompileAnimationStyleMetadata.prototype.toJson = function () {
	        return {
	            'class': 'AnimationStyleMetadata',
	            'value': { 'offset': this.offset, 'styles': this.styles }
	        };
	    };
	    return CompileAnimationStyleMetadata;
	}(CompileAnimationMetadata));
	exports.CompileAnimationStyleMetadata = CompileAnimationStyleMetadata;
	var CompileAnimationAnimateMetadata = (function (_super) {
	    __extends(CompileAnimationAnimateMetadata, _super);
	    function CompileAnimationAnimateMetadata(timings, styles) {
	        if (timings === void 0) { timings = 0; }
	        if (styles === void 0) { styles = null; }
	        _super.call(this);
	        this.timings = timings;
	        this.styles = styles;
	    }
	    CompileAnimationAnimateMetadata.fromJson = function (data) {
	        var value = data['value'];
	        var timings = value['timings'];
	        var styles = _objFromJson(value['styles'], metadataFromJson);
	        return new CompileAnimationAnimateMetadata(timings, styles);
	    };
	    CompileAnimationAnimateMetadata.prototype.toJson = function () {
	        return {
	            'class': 'AnimationAnimateMetadata',
	            'value': { 'timings': this.timings, 'styles': _objToJson(this.styles) }
	        };
	    };
	    return CompileAnimationAnimateMetadata;
	}(CompileAnimationMetadata));
	exports.CompileAnimationAnimateMetadata = CompileAnimationAnimateMetadata;
	var CompileAnimationWithStepsMetadata = (function (_super) {
	    __extends(CompileAnimationWithStepsMetadata, _super);
	    function CompileAnimationWithStepsMetadata(steps) {
	        if (steps === void 0) { steps = null; }
	        _super.call(this);
	        this.steps = steps;
	    }
	    return CompileAnimationWithStepsMetadata;
	}(CompileAnimationMetadata));
	exports.CompileAnimationWithStepsMetadata = CompileAnimationWithStepsMetadata;
	var CompileAnimationSequenceMetadata = (function (_super) {
	    __extends(CompileAnimationSequenceMetadata, _super);
	    function CompileAnimationSequenceMetadata(steps) {
	        if (steps === void 0) { steps = null; }
	        _super.call(this, steps);
	    }
	    CompileAnimationSequenceMetadata.fromJson = function (data) {
	        var steps = _arrayFromJson(data['value'], metadataFromJson);
	        return new CompileAnimationSequenceMetadata(steps);
	    };
	    CompileAnimationSequenceMetadata.prototype.toJson = function () {
	        return { 'class': 'AnimationSequenceMetadata', 'value': _arrayToJson(this.steps) };
	    };
	    return CompileAnimationSequenceMetadata;
	}(CompileAnimationWithStepsMetadata));
	exports.CompileAnimationSequenceMetadata = CompileAnimationSequenceMetadata;
	var CompileAnimationGroupMetadata = (function (_super) {
	    __extends(CompileAnimationGroupMetadata, _super);
	    function CompileAnimationGroupMetadata(steps) {
	        if (steps === void 0) { steps = null; }
	        _super.call(this, steps);
	    }
	    CompileAnimationGroupMetadata.fromJson = function (data) {
	        var steps = _arrayFromJson(data['value'], metadataFromJson);
	        return new CompileAnimationGroupMetadata(steps);
	    };
	    CompileAnimationGroupMetadata.prototype.toJson = function () {
	        return { 'class': 'AnimationGroupMetadata', 'value': _arrayToJson(this.steps) };
	    };
	    return CompileAnimationGroupMetadata;
	}(CompileAnimationWithStepsMetadata));
	exports.CompileAnimationGroupMetadata = CompileAnimationGroupMetadata;
	var CompileIdentifierMetadata = (function () {
	    function CompileIdentifierMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, value = _b.value;
	        this.runtime = runtime;
	        this.name = name;
	        this.prefix = prefix;
	        this.moduleUrl = moduleUrl;
	        this.value = value;
	    }
	    CompileIdentifierMetadata.fromJson = function (data) {
	        var value = lang_1.isArray(data['value']) ? _arrayFromJson(data['value'], metadataFromJson) :
	            _objFromJson(data['value'], metadataFromJson);
	        return new CompileIdentifierMetadata({ name: data['name'], prefix: data['prefix'], moduleUrl: data['moduleUrl'], value: value });
	    };
	    CompileIdentifierMetadata.prototype.toJson = function () {
	        var value = lang_1.isArray(this.value) ? _arrayToJson(this.value) : _objToJson(this.value);
	        return {
	            // Note: Runtime type can't be serialized...
	            'class': 'Identifier',
	            'name': this.name,
	            'moduleUrl': this.moduleUrl,
	            'prefix': this.prefix,
	            'value': value
	        };
	    };
	    Object.defineProperty(CompileIdentifierMetadata.prototype, "identifier", {
	        get: function () { return this; },
	        enumerable: true,
	        configurable: true
	    });
	    return CompileIdentifierMetadata;
	}());
	exports.CompileIdentifierMetadata = CompileIdentifierMetadata;
	var CompileDiDependencyMetadata = (function () {
	    function CompileDiDependencyMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, isAttribute = _b.isAttribute, isSelf = _b.isSelf, isHost = _b.isHost, isSkipSelf = _b.isSkipSelf, isOptional = _b.isOptional, isValue = _b.isValue, query = _b.query, viewQuery = _b.viewQuery, token = _b.token, value = _b.value;
	        this.isAttribute = lang_1.normalizeBool(isAttribute);
	        this.isSelf = lang_1.normalizeBool(isSelf);
	        this.isHost = lang_1.normalizeBool(isHost);
	        this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
	        this.isOptional = lang_1.normalizeBool(isOptional);
	        this.isValue = lang_1.normalizeBool(isValue);
	        this.query = query;
	        this.viewQuery = viewQuery;
	        this.token = token;
	        this.value = value;
	    }
	    CompileDiDependencyMetadata.fromJson = function (data) {
	        return new CompileDiDependencyMetadata({
	            token: _objFromJson(data['token'], CompileTokenMetadata.fromJson),
	            query: _objFromJson(data['query'], CompileQueryMetadata.fromJson),
	            viewQuery: _objFromJson(data['viewQuery'], CompileQueryMetadata.fromJson),
	            value: data['value'],
	            isAttribute: data['isAttribute'],
	            isSelf: data['isSelf'],
	            isHost: data['isHost'],
	            isSkipSelf: data['isSkipSelf'],
	            isOptional: data['isOptional'],
	            isValue: data['isValue']
	        });
	    };
	    CompileDiDependencyMetadata.prototype.toJson = function () {
	        return {
	            'token': _objToJson(this.token),
	            'query': _objToJson(this.query),
	            'viewQuery': _objToJson(this.viewQuery),
	            'value': this.value,
	            'isAttribute': this.isAttribute,
	            'isSelf': this.isSelf,
	            'isHost': this.isHost,
	            'isSkipSelf': this.isSkipSelf,
	            'isOptional': this.isOptional,
	            'isValue': this.isValue
	        };
	    };
	    return CompileDiDependencyMetadata;
	}());
	exports.CompileDiDependencyMetadata = CompileDiDependencyMetadata;
	var CompileProviderMetadata = (function () {
	    function CompileProviderMetadata(_a) {
	        var token = _a.token, useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
	        this.token = token;
	        this.useClass = useClass;
	        this.useValue = useValue;
	        this.useExisting = useExisting;
	        this.useFactory = useFactory;
	        this.deps = lang_1.normalizeBlank(deps);
	        this.multi = lang_1.normalizeBool(multi);
	    }
	    CompileProviderMetadata.fromJson = function (data) {
	        return new CompileProviderMetadata({
	            token: _objFromJson(data['token'], CompileTokenMetadata.fromJson),
	            useClass: _objFromJson(data['useClass'], CompileTypeMetadata.fromJson),
	            useExisting: _objFromJson(data['useExisting'], CompileTokenMetadata.fromJson),
	            useValue: _objFromJson(data['useValue'], CompileIdentifierMetadata.fromJson),
	            useFactory: _objFromJson(data['useFactory'], CompileFactoryMetadata.fromJson),
	            multi: data['multi'],
	            deps: _arrayFromJson(data['deps'], CompileDiDependencyMetadata.fromJson)
	        });
	    };
	    CompileProviderMetadata.prototype.toJson = function () {
	        return {
	            // Note: Runtime type can't be serialized...
	            'class': 'Provider',
	            'token': _objToJson(this.token),
	            'useClass': _objToJson(this.useClass),
	            'useExisting': _objToJson(this.useExisting),
	            'useValue': _objToJson(this.useValue),
	            'useFactory': _objToJson(this.useFactory),
	            'multi': this.multi,
	            'deps': _arrayToJson(this.deps)
	        };
	    };
	    return CompileProviderMetadata;
	}());
	exports.CompileProviderMetadata = CompileProviderMetadata;
	var CompileFactoryMetadata = (function () {
	    function CompileFactoryMetadata(_a) {
	        var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, prefix = _a.prefix, diDeps = _a.diDeps, value = _a.value;
	        this.runtime = runtime;
	        this.name = name;
	        this.prefix = prefix;
	        this.moduleUrl = moduleUrl;
	        this.diDeps = _normalizeArray(diDeps);
	        this.value = value;
	    }
	    Object.defineProperty(CompileFactoryMetadata.prototype, "identifier", {
	        get: function () { return this; },
	        enumerable: true,
	        configurable: true
	    });
	    CompileFactoryMetadata.fromJson = function (data) {
	        return new CompileFactoryMetadata({
	            name: data['name'],
	            prefix: data['prefix'],
	            moduleUrl: data['moduleUrl'],
	            value: data['value'],
	            diDeps: _arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
	        });
	    };
	    CompileFactoryMetadata.prototype.toJson = function () {
	        return {
	            'class': 'Factory',
	            'name': this.name,
	            'prefix': this.prefix,
	            'moduleUrl': this.moduleUrl,
	            'value': this.value,
	            'diDeps': _arrayToJson(this.diDeps)
	        };
	    };
	    return CompileFactoryMetadata;
	}());
	exports.CompileFactoryMetadata = CompileFactoryMetadata;
	var UNDEFINED = new Object();
	var CompileTokenMetadata = (function () {
	    function CompileTokenMetadata(_a) {
	        var value = _a.value, identifier = _a.identifier, identifierIsInstance = _a.identifierIsInstance;
	        this._assetCacheKey = UNDEFINED;
	        this.value = value;
	        this.identifier = identifier;
	        this.identifierIsInstance = lang_1.normalizeBool(identifierIsInstance);
	    }
	    CompileTokenMetadata.fromJson = function (data) {
	        return new CompileTokenMetadata({
	            value: data['value'],
	            identifier: _objFromJson(data['identifier'], CompileIdentifierMetadata.fromJson),
	            identifierIsInstance: data['identifierIsInstance']
	        });
	    };
	    CompileTokenMetadata.prototype.toJson = function () {
	        return {
	            'value': this.value,
	            'identifier': _objToJson(this.identifier),
	            'identifierIsInstance': this.identifierIsInstance
	        };
	    };
	    Object.defineProperty(CompileTokenMetadata.prototype, "runtimeCacheKey", {
	        get: function () {
	            if (lang_1.isPresent(this.identifier)) {
	                return this.identifier.runtime;
	            }
	            else {
	                return this.value;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompileTokenMetadata.prototype, "assetCacheKey", {
	        get: function () {
	            if (this._assetCacheKey === UNDEFINED) {
	                if (lang_1.isPresent(this.identifier)) {
	                    if (lang_1.isPresent(this.identifier.moduleUrl) &&
	                        lang_1.isPresent(url_resolver_1.getUrlScheme(this.identifier.moduleUrl))) {
	                        var uri = core_private_1.reflector.importUri({ 'filePath': this.identifier.moduleUrl, 'name': this.identifier.name });
	                        this._assetCacheKey = this.identifier.name + "|" + uri + "|" + this.identifierIsInstance;
	                    }
	                    else {
	                        this._assetCacheKey = null;
	                    }
	                }
	                else {
	                    this._assetCacheKey = this.value;
	                }
	            }
	            return this._assetCacheKey;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CompileTokenMetadata.prototype.equalsTo = function (token2) {
	        var rk = this.runtimeCacheKey;
	        var ak = this.assetCacheKey;
	        return (lang_1.isPresent(rk) && rk == token2.runtimeCacheKey) ||
	            (lang_1.isPresent(ak) && ak == token2.assetCacheKey);
	    };
	    Object.defineProperty(CompileTokenMetadata.prototype, "name", {
	        get: function () {
	            return lang_1.isPresent(this.value) ? util_1.sanitizeIdentifier(this.value) : this.identifier.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CompileTokenMetadata;
	}());
	exports.CompileTokenMetadata = CompileTokenMetadata;
	var CompileTokenMap = (function () {
	    function CompileTokenMap() {
	        this._valueMap = new Map();
	        this._values = [];
	    }
	    CompileTokenMap.prototype.add = function (token, value) {
	        var existing = this.get(token);
	        if (lang_1.isPresent(existing)) {
	            throw new exceptions_1.BaseException("Can only add to a TokenMap! Token: " + token.name);
	        }
	        this._values.push(value);
	        var rk = token.runtimeCacheKey;
	        if (lang_1.isPresent(rk)) {
	            this._valueMap.set(rk, value);
	        }
	        var ak = token.assetCacheKey;
	        if (lang_1.isPresent(ak)) {
	            this._valueMap.set(ak, value);
	        }
	    };
	    CompileTokenMap.prototype.get = function (token) {
	        var rk = token.runtimeCacheKey;
	        var ak = token.assetCacheKey;
	        var result;
	        if (lang_1.isPresent(rk)) {
	            result = this._valueMap.get(rk);
	        }
	        if (lang_1.isBlank(result) && lang_1.isPresent(ak)) {
	            result = this._valueMap.get(ak);
	        }
	        return result;
	    };
	    CompileTokenMap.prototype.values = function () { return this._values; };
	    Object.defineProperty(CompileTokenMap.prototype, "size", {
	        get: function () { return this._values.length; },
	        enumerable: true,
	        configurable: true
	    });
	    return CompileTokenMap;
	}());
	exports.CompileTokenMap = CompileTokenMap;
	/**
	 * Metadata regarding compilation of a type.
	 */
	var CompileTypeMetadata = (function () {
	    function CompileTypeMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, isHost = _b.isHost, value = _b.value, diDeps = _b.diDeps;
	        this.runtime = runtime;
	        this.name = name;
	        this.moduleUrl = moduleUrl;
	        this.prefix = prefix;
	        this.isHost = lang_1.normalizeBool(isHost);
	        this.value = value;
	        this.diDeps = _normalizeArray(diDeps);
	    }
	    CompileTypeMetadata.fromJson = function (data) {
	        return new CompileTypeMetadata({
	            name: data['name'],
	            moduleUrl: data['moduleUrl'],
	            prefix: data['prefix'],
	            isHost: data['isHost'],
	            value: data['value'],
	            diDeps: _arrayFromJson(data['diDeps'], CompileDiDependencyMetadata.fromJson)
	        });
	    };
	    Object.defineProperty(CompileTypeMetadata.prototype, "identifier", {
	        get: function () { return this; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompileTypeMetadata.prototype, "type", {
	        get: function () { return this; },
	        enumerable: true,
	        configurable: true
	    });
	    CompileTypeMetadata.prototype.toJson = function () {
	        return {
	            // Note: Runtime type can't be serialized...
	            'class': 'Type',
	            'name': this.name,
	            'moduleUrl': this.moduleUrl,
	            'prefix': this.prefix,
	            'isHost': this.isHost,
	            'value': this.value,
	            'diDeps': _arrayToJson(this.diDeps)
	        };
	    };
	    return CompileTypeMetadata;
	}());
	exports.CompileTypeMetadata = CompileTypeMetadata;
	var CompileQueryMetadata = (function () {
	    function CompileQueryMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, selectors = _b.selectors, descendants = _b.descendants, first = _b.first, propertyName = _b.propertyName, read = _b.read;
	        this.selectors = selectors;
	        this.descendants = lang_1.normalizeBool(descendants);
	        this.first = lang_1.normalizeBool(first);
	        this.propertyName = propertyName;
	        this.read = read;
	    }
	    CompileQueryMetadata.fromJson = function (data) {
	        return new CompileQueryMetadata({
	            selectors: _arrayFromJson(data['selectors'], CompileTokenMetadata.fromJson),
	            descendants: data['descendants'],
	            first: data['first'],
	            propertyName: data['propertyName'],
	            read: _objFromJson(data['read'], CompileTokenMetadata.fromJson)
	        });
	    };
	    CompileQueryMetadata.prototype.toJson = function () {
	        return {
	            'selectors': _arrayToJson(this.selectors),
	            'descendants': this.descendants,
	            'first': this.first,
	            'propertyName': this.propertyName,
	            'read': _objToJson(this.read)
	        };
	    };
	    return CompileQueryMetadata;
	}());
	exports.CompileQueryMetadata = CompileQueryMetadata;
	/**
	 * Metadata about a stylesheet
	 */
	var CompileStylesheetMetadata = (function () {
	    function CompileStylesheetMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, moduleUrl = _b.moduleUrl, styles = _b.styles, styleUrls = _b.styleUrls;
	        this.moduleUrl = moduleUrl;
	        this.styles = _normalizeArray(styles);
	        this.styleUrls = _normalizeArray(styleUrls);
	    }
	    CompileStylesheetMetadata.fromJson = function (data) {
	        return new CompileStylesheetMetadata({ moduleUrl: data['moduleUrl'], styles: data['styles'], styleUrls: data['styleUrls'] });
	    };
	    CompileStylesheetMetadata.prototype.toJson = function () {
	        return { 'moduleUrl': this.moduleUrl, 'styles': this.styles, 'styleUrls': this.styleUrls };
	    };
	    return CompileStylesheetMetadata;
	}());
	exports.CompileStylesheetMetadata = CompileStylesheetMetadata;
	/**
	 * Metadata regarding compilation of a template.
	 */
	var CompileTemplateMetadata = (function () {
	    function CompileTemplateMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, encapsulation = _b.encapsulation, template = _b.template, templateUrl = _b.templateUrl, styles = _b.styles, styleUrls = _b.styleUrls, externalStylesheets = _b.externalStylesheets, animations = _b.animations, ngContentSelectors = _b.ngContentSelectors, interpolation = _b.interpolation;
	        this.encapsulation = encapsulation;
	        this.template = template;
	        this.templateUrl = templateUrl;
	        this.styles = _normalizeArray(styles);
	        this.styleUrls = _normalizeArray(styleUrls);
	        this.externalStylesheets = _normalizeArray(externalStylesheets);
	        this.animations = lang_1.isPresent(animations) ? collection_1.ListWrapper.flatten(animations) : [];
	        this.ngContentSelectors = lang_1.isPresent(ngContentSelectors) ? ngContentSelectors : [];
	        if (lang_1.isPresent(interpolation) && interpolation.length != 2) {
	            throw new exceptions_1.BaseException("'interpolation' should have a start and an end symbol.");
	        }
	        this.interpolation = interpolation;
	    }
	    CompileTemplateMetadata.fromJson = function (data) {
	        var animations = _arrayFromJson(data['animations'], metadataFromJson);
	        return new CompileTemplateMetadata({
	            encapsulation: lang_1.isPresent(data['encapsulation']) ?
	                core_private_1.VIEW_ENCAPSULATION_VALUES[data['encapsulation']] :
	                data['encapsulation'],
	            template: data['template'],
	            templateUrl: data['templateUrl'],
	            styles: data['styles'],
	            styleUrls: data['styleUrls'],
	            externalStylesheets: _arrayFromJson(data['externalStylesheets'], CompileStylesheetMetadata.fromJson),
	            animations: animations,
	            ngContentSelectors: data['ngContentSelectors'],
	            interpolation: data['interpolation']
	        });
	    };
	    CompileTemplateMetadata.prototype.toJson = function () {
	        return {
	            'encapsulation': lang_1.isPresent(this.encapsulation) ? lang_1.serializeEnum(this.encapsulation) :
	                this.encapsulation,
	            'template': this.template,
	            'templateUrl': this.templateUrl,
	            'styles': this.styles,
	            'styleUrls': this.styleUrls,
	            'externalStylesheets': _objToJson(this.externalStylesheets),
	            'animations': _objToJson(this.animations),
	            'ngContentSelectors': this.ngContentSelectors,
	            'interpolation': this.interpolation
	        };
	    };
	    return CompileTemplateMetadata;
	}());
	exports.CompileTemplateMetadata = CompileTemplateMetadata;
	/**
	 * Metadata regarding compilation of a directive.
	 */
	var CompileDirectiveMetadata = (function () {
	    function CompileDirectiveMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, hostListeners = _b.hostListeners, hostProperties = _b.hostProperties, hostAttributes = _b.hostAttributes, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, precompile = _b.precompile, template = _b.template;
	        this.type = type;
	        this.isComponent = isComponent;
	        this.selector = selector;
	        this.exportAs = exportAs;
	        this.changeDetection = changeDetection;
	        this.inputs = inputs;
	        this.outputs = outputs;
	        this.hostListeners = hostListeners;
	        this.hostProperties = hostProperties;
	        this.hostAttributes = hostAttributes;
	        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
	        this.providers = _normalizeArray(providers);
	        this.viewProviders = _normalizeArray(viewProviders);
	        this.queries = _normalizeArray(queries);
	        this.viewQueries = _normalizeArray(viewQueries);
	        this.precompile = _normalizeArray(precompile);
	        this.template = template;
	    }
	    CompileDirectiveMetadata.create = function (_a) {
	        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, host = _b.host, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, precompile = _b.precompile, template = _b.template;
	        var hostListeners = {};
	        var hostProperties = {};
	        var hostAttributes = {};
	        if (lang_1.isPresent(host)) {
	            collection_1.StringMapWrapper.forEach(host, function (value, key) {
	                var matches = lang_1.RegExpWrapper.firstMatch(HOST_REG_EXP, key);
	                if (lang_1.isBlank(matches)) {
	                    hostAttributes[key] = value;
	                }
	                else if (lang_1.isPresent(matches[1])) {
	                    hostProperties[matches[1]] = value;
	                }
	                else if (lang_1.isPresent(matches[2])) {
	                    hostListeners[matches[2]] = value;
	                }
	            });
	        }
	        var inputsMap = {};
	        if (lang_1.isPresent(inputs)) {
	            inputs.forEach(function (bindConfig) {
	                // canonical syntax: `dirProp: elProp`
	                // if there is no `:`, use dirProp = elProp
	                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
	                inputsMap[parts[0]] = parts[1];
	            });
	        }
	        var outputsMap = {};
	        if (lang_1.isPresent(outputs)) {
	            outputs.forEach(function (bindConfig) {
	                // canonical syntax: `dirProp: elProp`
	                // if there is no `:`, use dirProp = elProp
	                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
	                outputsMap[parts[0]] = parts[1];
	            });
	        }
	        return new CompileDirectiveMetadata({
	            type: type,
	            isComponent: lang_1.normalizeBool(isComponent),
	            selector: selector,
	            exportAs: exportAs,
	            changeDetection: changeDetection,
	            inputs: inputsMap,
	            outputs: outputsMap,
	            hostListeners: hostListeners,
	            hostProperties: hostProperties,
	            hostAttributes: hostAttributes,
	            lifecycleHooks: lang_1.isPresent(lifecycleHooks) ? lifecycleHooks : [],
	            providers: providers,
	            viewProviders: viewProviders,
	            queries: queries,
	            viewQueries: viewQueries,
	            precompile: precompile,
	            template: template
	        });
	    };
	    Object.defineProperty(CompileDirectiveMetadata.prototype, "identifier", {
	        get: function () { return this.type; },
	        enumerable: true,
	        configurable: true
	    });
	    CompileDirectiveMetadata.fromJson = function (data) {
	        return new CompileDirectiveMetadata({
	            isComponent: data['isComponent'],
	            selector: data['selector'],
	            exportAs: data['exportAs'],
	            type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
	            changeDetection: lang_1.isPresent(data['changeDetection']) ?
	                core_private_1.CHANGE_DETECTION_STRATEGY_VALUES[data['changeDetection']] :
	                data['changeDetection'],
	            inputs: data['inputs'],
	            outputs: data['outputs'],
	            hostListeners: data['hostListeners'],
	            hostProperties: data['hostProperties'],
	            hostAttributes: data['hostAttributes'],
	            lifecycleHooks: data['lifecycleHooks'].map(function (hookValue) { return core_private_1.LIFECYCLE_HOOKS_VALUES[hookValue]; }),
	            template: lang_1.isPresent(data['template']) ? CompileTemplateMetadata.fromJson(data['template']) :
	                data['template'],
	            providers: _arrayFromJson(data['providers'], metadataFromJson),
	            viewProviders: _arrayFromJson(data['viewProviders'], metadataFromJson),
	            queries: _arrayFromJson(data['queries'], CompileQueryMetadata.fromJson),
	            viewQueries: _arrayFromJson(data['viewQueries'], CompileQueryMetadata.fromJson),
	            precompile: _arrayFromJson(data['precompile'], CompileTypeMetadata.fromJson)
	        });
	    };
	    CompileDirectiveMetadata.prototype.toJson = function () {
	        return {
	            'class': 'Directive',
	            'isComponent': this.isComponent,
	            'selector': this.selector,
	            'exportAs': this.exportAs,
	            'type': lang_1.isPresent(this.type) ? this.type.toJson() : this.type,
	            'changeDetection': lang_1.isPresent(this.changeDetection) ? lang_1.serializeEnum(this.changeDetection) :
	                this.changeDetection,
	            'inputs': this.inputs,
	            'outputs': this.outputs,
	            'hostListeners': this.hostListeners,
	            'hostProperties': this.hostProperties,
	            'hostAttributes': this.hostAttributes,
	            'lifecycleHooks': this.lifecycleHooks.map(function (hook) { return lang_1.serializeEnum(hook); }),
	            'template': lang_1.isPresent(this.template) ? this.template.toJson() : this.template,
	            'providers': _arrayToJson(this.providers),
	            'viewProviders': _arrayToJson(this.viewProviders),
	            'queries': _arrayToJson(this.queries),
	            'viewQueries': _arrayToJson(this.viewQueries),
	            'precompile': _arrayToJson(this.precompile)
	        };
	    };
	    return CompileDirectiveMetadata;
	}());
	exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
	/**
	 * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
	 */
	function createHostComponentMeta(componentType, componentSelector) {
	    var template = selector_1.CssSelector.parse(componentSelector)[0].getMatchingElementTemplate();
	    return CompileDirectiveMetadata.create({
	        type: new CompileTypeMetadata({
	            runtime: Object,
	            name: componentType.name + "_Host",
	            moduleUrl: componentType.moduleUrl,
	            isHost: true
	        }),
	        template: new CompileTemplateMetadata({
	            template: template,
	            templateUrl: '',
	            styles: [],
	            styleUrls: [],
	            ngContentSelectors: [],
	            animations: []
	        }),
	        changeDetection: core_1.ChangeDetectionStrategy.Default,
	        inputs: [],
	        outputs: [],
	        host: {},
	        lifecycleHooks: [],
	        isComponent: true,
	        selector: '*',
	        providers: [],
	        viewProviders: [],
	        queries: [],
	        viewQueries: []
	    });
	}
	exports.createHostComponentMeta = createHostComponentMeta;
	var CompilePipeMetadata = (function () {
	    function CompilePipeMetadata(_a) {
	        var _b = _a === void 0 ? {} : _a, type = _b.type, name = _b.name, pure = _b.pure, lifecycleHooks = _b.lifecycleHooks;
	        this.type = type;
	        this.name = name;
	        this.pure = lang_1.normalizeBool(pure);
	        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
	    }
	    Object.defineProperty(CompilePipeMetadata.prototype, "identifier", {
	        get: function () { return this.type; },
	        enumerable: true,
	        configurable: true
	    });
	    CompilePipeMetadata.fromJson = function (data) {
	        return new CompilePipeMetadata({
	            type: lang_1.isPresent(data['type']) ? CompileTypeMetadata.fromJson(data['type']) : data['type'],
	            name: data['name'],
	            pure: data['pure']
	        });
	    };
	    CompilePipeMetadata.prototype.toJson = function () {
	        return {
	            'class': 'Pipe',
	            'type': lang_1.isPresent(this.type) ? this.type.toJson() : null,
	            'name': this.name,
	            'pure': this.pure
	        };
	    };
	    return CompilePipeMetadata;
	}());
	exports.CompilePipeMetadata = CompilePipeMetadata;
	var _COMPILE_METADATA_FROM_JSON = {
	    'Directive': CompileDirectiveMetadata.fromJson,
	    'Pipe': CompilePipeMetadata.fromJson,
	    'Type': CompileTypeMetadata.fromJson,
	    'Provider': CompileProviderMetadata.fromJson,
	    'Identifier': CompileIdentifierMetadata.fromJson,
	    'Factory': CompileFactoryMetadata.fromJson,
	    'AnimationEntryMetadata': CompileAnimationEntryMetadata.fromJson,
	    'AnimationStateDeclarationMetadata': CompileAnimationStateDeclarationMetadata.fromJson,
	    'AnimationStateTransitionMetadata': CompileAnimationStateTransitionMetadata.fromJson,
	    'AnimationSequenceMetadata': CompileAnimationSequenceMetadata.fromJson,
	    'AnimationGroupMetadata': CompileAnimationGroupMetadata.fromJson,
	    'AnimationAnimateMetadata': CompileAnimationAnimateMetadata.fromJson,
	    'AnimationStyleMetadata': CompileAnimationStyleMetadata.fromJson,
	    'AnimationKeyframesSequenceMetadata': CompileAnimationKeyframesSequenceMetadata.fromJson
	};
	function _arrayFromJson(obj, fn) {
	    return lang_1.isBlank(obj) ? null : obj.map(function (o) { return _objFromJson(o, fn); });
	}
	function _arrayToJson(obj) {
	    return lang_1.isBlank(obj) ? null : obj.map(_objToJson);
	}
	function _objFromJson(obj, fn) {
	    if (lang_1.isArray(obj))
	        return _arrayFromJson(obj, fn);
	    if (lang_1.isString(obj) || lang_1.isBlank(obj) || lang_1.isBoolean(obj) || lang_1.isNumber(obj))
	        return obj;
	    return fn(obj);
	}
	function _objToJson(obj) {
	    if (lang_1.isArray(obj))
	        return _arrayToJson(obj);
	    if (lang_1.isString(obj) || lang_1.isBlank(obj) || lang_1.isBoolean(obj) || lang_1.isNumber(obj))
	        return obj;
	    return obj.toJson();
	}
	function _normalizeArray(obj) {
	    return lang_1.isPresent(obj) ? obj : [];
	}
	//# sourceMappingURL=compile_metadata.js.map

/***/ }),

/***/ 566:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var lang_1 = __webpack_require__(542);
	var _ASSET_SCHEME = 'asset:';
	/**
	 * Create a {@link UrlResolver} with no package prefix.
	 */
	function createUrlResolverWithoutPackagePrefix() {
	    return new UrlResolver();
	}
	exports.createUrlResolverWithoutPackagePrefix = createUrlResolverWithoutPackagePrefix;
	function createOfflineCompileUrlResolver() {
	    return new UrlResolver(_ASSET_SCHEME);
	}
	exports.createOfflineCompileUrlResolver = createOfflineCompileUrlResolver;
	/**
	 * A default provider for {@link PACKAGE_ROOT_URL} that maps to '/'.
	 */
	exports.DEFAULT_PACKAGE_URL_PROVIDER = {
	    provide: core_1.PACKAGE_ROOT_URL,
	    useValue: '/'
	};
	var UrlResolver = (function () {
	    function UrlResolver(_packagePrefix) {
	        if (_packagePrefix === void 0) { _packagePrefix = null; }
	        this._packagePrefix = _packagePrefix;
	    }
	    /**
	     * Resolves the `url` given the `baseUrl`:
	     * - when the `url` is null, the `baseUrl` is returned,
	     * - if `url` is relative ('path/to/here', './path/to/here'), the resolved url is a combination of
	     * `baseUrl` and `url`,
	     * - if `url` is absolute (it has a scheme: 'http://', 'https://' or start with '/'), the `url` is
	     * returned as is (ignoring the `baseUrl`)
	     */
	    UrlResolver.prototype.resolve = function (baseUrl, url) {
	        var resolvedUrl = url;
	        if (lang_1.isPresent(baseUrl) && baseUrl.length > 0) {
	            resolvedUrl = _resolveUrl(baseUrl, resolvedUrl);
	        }
	        var resolvedParts = _split(resolvedUrl);
	        var prefix = this._packagePrefix;
	        if (lang_1.isPresent(prefix) && lang_1.isPresent(resolvedParts) &&
	            resolvedParts[_ComponentIndex.Scheme] == 'package') {
	            var path = resolvedParts[_ComponentIndex.Path];
	            if (this._packagePrefix === _ASSET_SCHEME) {
	                var pathSegements = path.split(/\//);
	                resolvedUrl = "asset:" + pathSegements[0] + "/lib/" + pathSegements.slice(1).join('/');
	            }
	            else {
	                prefix = lang_1.StringWrapper.stripRight(prefix, '/');
	                path = lang_1.StringWrapper.stripLeft(path, '/');
	                return prefix + "/" + path;
	            }
	        }
	        return resolvedUrl;
	    };
	    /** @nocollapse */
	    UrlResolver.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    UrlResolver.ctorParameters = [
	        { type: undefined, decorators: [{ type: core_1.Inject, args: [core_1.PACKAGE_ROOT_URL,] },] },
	    ];
	    return UrlResolver;
	}());
	exports.UrlResolver = UrlResolver;
	/**
	 * Extract the scheme of a URL.
	 */
	function getUrlScheme(url) {
	    var match = _split(url);
	    return (match && match[_ComponentIndex.Scheme]) || '';
	}
	exports.getUrlScheme = getUrlScheme;
	// The code below is adapted from Traceur:
	// https://github.com/google/traceur-compiler/blob/9511c1dafa972bf0de1202a8a863bad02f0f95a8/src/runtime/url.js
	/**
	 * Builds a URI string from already-encoded parts.
	 *
	 * No encoding is performed.  Any component may be omitted as either null or
	 * undefined.
	 *
	 * @param opt_scheme The scheme such as 'http'.
	 * @param opt_userInfo The user name before the '@'.
	 * @param opt_domain The domain such as 'www.google.com', already
	 *     URI-encoded.
	 * @param opt_port The port number.
	 * @param opt_path The path, already URI-encoded.  If it is not
	 *     empty, it must begin with a slash.
	 * @param opt_queryData The URI-encoded query data.
	 * @param opt_fragment The URI-encoded fragment identifier.
	 * @return The fully combined URI.
	 */
	function _buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
	    var out = [];
	    if (lang_1.isPresent(opt_scheme)) {
	        out.push(opt_scheme + ':');
	    }
	    if (lang_1.isPresent(opt_domain)) {
	        out.push('//');
	        if (lang_1.isPresent(opt_userInfo)) {
	            out.push(opt_userInfo + '@');
	        }
	        out.push(opt_domain);
	        if (lang_1.isPresent(opt_port)) {
	            out.push(':' + opt_port);
	        }
	    }
	    if (lang_1.isPresent(opt_path)) {
	        out.push(opt_path);
	    }
	    if (lang_1.isPresent(opt_queryData)) {
	        out.push('?' + opt_queryData);
	    }
	    if (lang_1.isPresent(opt_fragment)) {
	        out.push('#' + opt_fragment);
	    }
	    return out.join('');
	}
	/**
	 * A regular expression for breaking a URI into its component parts.
	 *
	 * {@link http://www.gbiv.com/protocols/uri/rfc/rfc3986.html#RFC2234} says
	 * As the "first-match-wins" algorithm is identical to the "greedy"
	 * disambiguation method used by POSIX regular expressions, it is natural and
	 * commonplace to use a regular expression for parsing the potential five
	 * components of a URI reference.
	 *
	 * The following line is the regular expression for breaking-down a
	 * well-formed URI reference into its components.
	 *
	 * <pre>
	 * ^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?
	 *  12            3  4          5       6  7        8 9
	 * </pre>
	 *
	 * The numbers in the second line above are only to assist readability; they
	 * indicate the reference points for each subexpression (i.e., each paired
	 * parenthesis). We refer to the value matched for subexpression <n> as $<n>.
	 * For example, matching the above expression to
	 * <pre>
	 *     http://www.ics.uci.edu/pub/ietf/uri/#Related
	 * </pre>
	 * results in the following subexpression matches:
	 * <pre>
	 *    $1 = http:
	 *    $2 = http
	 *    $3 = //www.ics.uci.edu
	 *    $4 = www.ics.uci.edu
	 *    $5 = /pub/ietf/uri/
	 *    $6 = <undefined>
	 *    $7 = <undefined>
	 *    $8 = #Related
	 *    $9 = Related
	 * </pre>
	 * where <undefined> indicates that the component is not present, as is the
	 * case for the query component in the above example. Therefore, we can
	 * determine the value of the five components as
	 * <pre>
	 *    scheme    = $2
	 *    authority = $4
	 *    path      = $5
	 *    query     = $7
	 *    fragment  = $9
	 * </pre>
	 *
	 * The regular expression has been modified slightly to expose the
	 * userInfo, domain, and port separately from the authority.
	 * The modified version yields
	 * <pre>
	 *    $1 = http              scheme
	 *    $2 = <undefined>       userInfo -\
	 *    $3 = www.ics.uci.edu   domain     | authority
	 *    $4 = <undefined>       port     -/
	 *    $5 = /pub/ietf/uri/    path
	 *    $6 = <undefined>       query without ?
	 *    $7 = Related           fragment without #
	 * </pre>
	 * @type {!RegExp}
	 * @internal
	 */
	var _splitRe = lang_1.RegExpWrapper.create('^' +
	    '(?:' +
	    '([^:/?#.]+)' +
	    // used by other URL parts such as :,
	    // ?, /, #, and .
	    ':)?' +
	    '(?://' +
	    '(?:([^/?#]*)@)?' +
	    '([\\w\\d\\-\\u0100-\\uffff.%]*)' +
	    // digits, dashes, dots, percent
	    // escapes, and unicode characters.
	    '(?::([0-9]+))?' +
	    ')?' +
	    '([^?#]+)?' +
	    '(?:\\?([^#]*))?' +
	    '(?:#(.*))?' +
	    '$');
	/**
	 * The index of each URI component in the return value of goog.uri.utils.split.
	 * @enum {number}
	 */
	var _ComponentIndex;
	(function (_ComponentIndex) {
	    _ComponentIndex[_ComponentIndex["Scheme"] = 1] = "Scheme";
	    _ComponentIndex[_ComponentIndex["UserInfo"] = 2] = "UserInfo";
	    _ComponentIndex[_ComponentIndex["Domain"] = 3] = "Domain";
	    _ComponentIndex[_ComponentIndex["Port"] = 4] = "Port";
	    _ComponentIndex[_ComponentIndex["Path"] = 5] = "Path";
	    _ComponentIndex[_ComponentIndex["QueryData"] = 6] = "QueryData";
	    _ComponentIndex[_ComponentIndex["Fragment"] = 7] = "Fragment";
	})(_ComponentIndex || (_ComponentIndex = {}));
	/**
	 * Splits a URI into its component parts.
	 *
	 * Each component can be accessed via the component indices; for example:
	 * <pre>
	 * goog.uri.utils.split(someStr)[goog.uri.utils.CompontentIndex.QUERY_DATA];
	 * </pre>
	 *
	 * @param uri The URI string to examine.
	 * @return Each component still URI-encoded.
	 *     Each component that is present will contain the encoded value, whereas
	 *     components that are not present will be undefined or empty, depending
	 *     on the browser's regular expression implementation.  Never null, since
	 *     arbitrary strings may still look like path names.
	 */
	function _split(uri) {
	    return lang_1.RegExpWrapper.firstMatch(_splitRe, uri);
	}
	/**
	  * Removes dot segments in given path component, as described in
	  * RFC 3986, section 5.2.4.
	  *
	  * @param path A non-empty path component.
	  * @return Path component with removed dot segments.
	  */
	function _removeDotSegments(path) {
	    if (path == '/')
	        return '/';
	    var leadingSlash = path[0] == '/' ? '/' : '';
	    var trailingSlash = path[path.length - 1] === '/' ? '/' : '';
	    var segments = path.split('/');
	    var out = [];
	    var up = 0;
	    for (var pos = 0; pos < segments.length; pos++) {
	        var segment = segments[pos];
	        switch (segment) {
	            case '':
	            case '.':
	                break;
	            case '..':
	                if (out.length > 0) {
	                    out.pop();
	                }
	                else {
	                    up++;
	                }
	                break;
	            default:
	                out.push(segment);
	        }
	    }
	    if (leadingSlash == '') {
	        while (up-- > 0) {
	            out.unshift('..');
	        }
	        if (out.length === 0)
	            out.push('.');
	    }
	    return leadingSlash + out.join('/') + trailingSlash;
	}
	/**
	 * Takes an array of the parts from split and canonicalizes the path part
	 * and then joins all the parts.
	 */
	function _joinAndCanonicalizePath(parts) {
	    var path = parts[_ComponentIndex.Path];
	    path = lang_1.isBlank(path) ? '' : _removeDotSegments(path);
	    parts[_ComponentIndex.Path] = path;
	    return _buildFromEncodedParts(parts[_ComponentIndex.Scheme], parts[_ComponentIndex.UserInfo], parts[_ComponentIndex.Domain], parts[_ComponentIndex.Port], path, parts[_ComponentIndex.QueryData], parts[_ComponentIndex.Fragment]);
	}
	/**
	 * Resolves a URL.
	 * @param base The URL acting as the base URL.
	 * @param to The URL to resolve.
	 */
	function _resolveUrl(base, url) {
	    var parts = _split(encodeURI(url));
	    var baseParts = _split(base);
	    if (lang_1.isPresent(parts[_ComponentIndex.Scheme])) {
	        return _joinAndCanonicalizePath(parts);
	    }
	    else {
	        parts[_ComponentIndex.Scheme] = baseParts[_ComponentIndex.Scheme];
	    }
	    for (var i = _ComponentIndex.Scheme; i <= _ComponentIndex.Port; i++) {
	        if (lang_1.isBlank(parts[i])) {
	            parts[i] = baseParts[i];
	        }
	    }
	    if (parts[_ComponentIndex.Path][0] == '/') {
	        return _joinAndCanonicalizePath(parts);
	    }
	    var path = baseParts[_ComponentIndex.Path];
	    if (lang_1.isBlank(path))
	        path = '/';
	    var index = path.lastIndexOf('/');
	    path = path.substring(0, index + 1) + parts[_ComponentIndex.Path];
	    parts[_ComponentIndex.Path] = path;
	    return _joinAndCanonicalizePath(parts);
	}
	//# sourceMappingURL=url_resolver.js.map

/***/ }),

/***/ 567:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var compile_metadata_1 = __webpack_require__(565);
	var identifiers_1 = __webpack_require__(564);
	var parse_util_1 = __webpack_require__(558);
	var template_ast_1 = __webpack_require__(541);
	var ProviderError = (function (_super) {
	    __extends(ProviderError, _super);
	    function ProviderError(message, span) {
	        _super.call(this, span, message);
	    }
	    return ProviderError;
	}(parse_util_1.ParseError));
	exports.ProviderError = ProviderError;
	var ProviderViewContext = (function () {
	    function ProviderViewContext(component, sourceSpan) {
	        var _this = this;
	        this.component = component;
	        this.sourceSpan = sourceSpan;
	        this.errors = [];
	        this.viewQueries = _getViewQueries(component);
	        this.viewProviders = new compile_metadata_1.CompileTokenMap();
	        _normalizeProviders(component.viewProviders, sourceSpan, this.errors).forEach(function (provider) {
	            if (lang_1.isBlank(_this.viewProviders.get(provider.token))) {
	                _this.viewProviders.add(provider.token, true);
	            }
	        });
	    }
	    return ProviderViewContext;
	}());
	exports.ProviderViewContext = ProviderViewContext;
	var ProviderElementContext = (function () {
	    function ProviderElementContext(_viewContext, _parent, _isViewRoot, _directiveAsts, attrs, refs, _sourceSpan) {
	        var _this = this;
	        this._viewContext = _viewContext;
	        this._parent = _parent;
	        this._isViewRoot = _isViewRoot;
	        this._directiveAsts = _directiveAsts;
	        this._sourceSpan = _sourceSpan;
	        this._transformedProviders = new compile_metadata_1.CompileTokenMap();
	        this._seenProviders = new compile_metadata_1.CompileTokenMap();
	        this._hasViewContainer = false;
	        this._attrs = {};
	        attrs.forEach(function (attrAst) { return _this._attrs[attrAst.name] = attrAst.value; });
	        var directivesMeta = _directiveAsts.map(function (directiveAst) { return directiveAst.directive; });
	        this._allProviders =
	            _resolveProvidersFromDirectives(directivesMeta, _sourceSpan, _viewContext.errors);
	        this._contentQueries = _getContentQueries(directivesMeta);
	        var queriedTokens = new compile_metadata_1.CompileTokenMap();
	        this._allProviders.values().forEach(function (provider) { _this._addQueryReadsTo(provider.token, queriedTokens); });
	        refs.forEach(function (refAst) {
	            _this._addQueryReadsTo(new compile_metadata_1.CompileTokenMetadata({ value: refAst.name }), queriedTokens);
	        });
	        if (lang_1.isPresent(queriedTokens.get(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef)))) {
	            this._hasViewContainer = true;
	        }
	        // create the providers that we know are eager first
	        this._allProviders.values().forEach(function (provider) {
	            var eager = provider.eager || lang_1.isPresent(queriedTokens.get(provider.token));
	            if (eager) {
	                _this._getOrCreateLocalProvider(provider.providerType, provider.token, true);
	            }
	        });
	    }
	    ProviderElementContext.prototype.afterElement = function () {
	        var _this = this;
	        // collect lazy providers
	        this._allProviders.values().forEach(function (provider) {
	            _this._getOrCreateLocalProvider(provider.providerType, provider.token, false);
	        });
	    };
	    Object.defineProperty(ProviderElementContext.prototype, "transformProviders", {
	        get: function () { return this._transformedProviders.values(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ProviderElementContext.prototype, "transformedDirectiveAsts", {
	        get: function () {
	            var sortedProviderTypes = this._transformedProviders.values().map(function (provider) { return provider.token.identifier; });
	            var sortedDirectives = collection_1.ListWrapper.clone(this._directiveAsts);
	            collection_1.ListWrapper.sort(sortedDirectives, function (dir1, dir2) { return sortedProviderTypes.indexOf(dir1.directive.type) -
	                sortedProviderTypes.indexOf(dir2.directive.type); });
	            return sortedDirectives;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ProviderElementContext.prototype, "transformedHasViewContainer", {
	        get: function () { return this._hasViewContainer; },
	        enumerable: true,
	        configurable: true
	    });
	    ProviderElementContext.prototype._addQueryReadsTo = function (token, queryReadTokens) {
	        this._getQueriesFor(token).forEach(function (query) {
	            var queryReadToken = lang_1.isPresent(query.read) ? query.read : token;
	            if (lang_1.isBlank(queryReadTokens.get(queryReadToken))) {
	                queryReadTokens.add(queryReadToken, true);
	            }
	        });
	    };
	    ProviderElementContext.prototype._getQueriesFor = function (token) {
	        var result = [];
	        var currentEl = this;
	        var distance = 0;
	        var queries;
	        while (currentEl !== null) {
	            queries = currentEl._contentQueries.get(token);
	            if (lang_1.isPresent(queries)) {
	                collection_1.ListWrapper.addAll(result, queries.filter(function (query) { return query.descendants || distance <= 1; }));
	            }
	            if (currentEl._directiveAsts.length > 0) {
	                distance++;
	            }
	            currentEl = currentEl._parent;
	        }
	        queries = this._viewContext.viewQueries.get(token);
	        if (lang_1.isPresent(queries)) {
	            collection_1.ListWrapper.addAll(result, queries);
	        }
	        return result;
	    };
	    ProviderElementContext.prototype._getOrCreateLocalProvider = function (requestingProviderType, token, eager) {
	        var _this = this;
	        var resolvedProvider = this._allProviders.get(token);
	        if (lang_1.isBlank(resolvedProvider) ||
	            ((requestingProviderType === template_ast_1.ProviderAstType.Directive ||
	                requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
	                resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService) ||
	            ((requestingProviderType === template_ast_1.ProviderAstType.PrivateService ||
	                requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
	                resolvedProvider.providerType === template_ast_1.ProviderAstType.Builtin)) {
	            return null;
	        }
	        var transformedProviderAst = this._transformedProviders.get(token);
	        if (lang_1.isPresent(transformedProviderAst)) {
	            return transformedProviderAst;
	        }
	        if (lang_1.isPresent(this._seenProviders.get(token))) {
	            this._viewContext.errors.push(new ProviderError("Cannot instantiate cyclic dependency! " + token.name, this._sourceSpan));
	            return null;
	        }
	        this._seenProviders.add(token, true);
	        var transformedProviders = resolvedProvider.providers.map(function (provider) {
	            var transformedUseValue = provider.useValue;
	            var transformedUseExisting = provider.useExisting;
	            var transformedDeps;
	            if (lang_1.isPresent(provider.useExisting)) {
	                var existingDiDep = _this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }), eager);
	                if (lang_1.isPresent(existingDiDep.token)) {
	                    transformedUseExisting = existingDiDep.token;
	                }
	                else {
	                    transformedUseExisting = null;
	                    transformedUseValue = existingDiDep.value;
	                }
	            }
	            else if (lang_1.isPresent(provider.useFactory)) {
	                var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
	                transformedDeps =
	                    deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep, eager); });
	            }
	            else if (lang_1.isPresent(provider.useClass)) {
	                var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
	                transformedDeps =
	                    deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep, eager); });
	            }
	            return _transformProvider(provider, {
	                useExisting: transformedUseExisting,
	                useValue: transformedUseValue,
	                deps: transformedDeps
	            });
	        });
	        transformedProviderAst =
	            _transformProviderAst(resolvedProvider, { eager: eager, providers: transformedProviders });
	        this._transformedProviders.add(token, transformedProviderAst);
	        return transformedProviderAst;
	    };
	    ProviderElementContext.prototype._getLocalDependency = function (requestingProviderType, dep, eager) {
	        if (eager === void 0) { eager = null; }
	        if (dep.isAttribute) {
	            var attrValue = this._attrs[dep.token.value];
	            return new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: lang_1.normalizeBlank(attrValue) });
	        }
	        if (lang_1.isPresent(dep.query) || lang_1.isPresent(dep.viewQuery)) {
	            return dep;
	        }
	        if (lang_1.isPresent(dep.token)) {
	            // access builtints
	            if ((requestingProviderType === template_ast_1.ProviderAstType.Directive ||
	                requestingProviderType === template_ast_1.ProviderAstType.Component)) {
	                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer)) ||
	                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef)) ||
	                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef)) ||
	                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef))) {
	                    return dep;
	                }
	                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef))) {
	                    this._hasViewContainer = true;
	                }
	            }
	            // access the injector
	            if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector))) {
	                return dep;
	            }
	            // access providers
	            if (lang_1.isPresent(this._getOrCreateLocalProvider(requestingProviderType, dep.token, eager))) {
	                return dep;
	            }
	        }
	        return null;
	    };
	    ProviderElementContext.prototype._getDependency = function (requestingProviderType, dep, eager) {
	        if (eager === void 0) { eager = null; }
	        var currElement = this;
	        var currEager = eager;
	        var result = null;
	        if (!dep.isSkipSelf) {
	            result = this._getLocalDependency(requestingProviderType, dep, eager);
	        }
	        if (dep.isSelf) {
	            if (lang_1.isBlank(result) && dep.isOptional) {
	                result = new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: null });
	            }
	        }
	        else {
	            // check parent elements
	            while (lang_1.isBlank(result) && lang_1.isPresent(currElement._parent)) {
	                var prevElement = currElement;
	                currElement = currElement._parent;
	                if (prevElement._isViewRoot) {
	                    currEager = false;
	                }
	                result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, dep, currEager);
	            }
	            // check @Host restriction
	            if (lang_1.isBlank(result)) {
	                if (!dep.isHost || this._viewContext.component.type.isHost ||
	                    identifiers_1.identifierToken(this._viewContext.component.type).equalsTo(dep.token) ||
	                    lang_1.isPresent(this._viewContext.viewProviders.get(dep.token))) {
	                    result = dep;
	                }
	                else {
	                    result = dep.isOptional ?
	                        result = new compile_metadata_1.CompileDiDependencyMetadata({ isValue: true, value: null }) :
	                        null;
	                }
	            }
	        }
	        if (lang_1.isBlank(result)) {
	            this._viewContext.errors.push(new ProviderError("No provider for " + dep.token.name, this._sourceSpan));
	        }
	        return result;
	    };
	    return ProviderElementContext;
	}());
	exports.ProviderElementContext = ProviderElementContext;
	function _transformProvider(provider, _a) {
	    var useExisting = _a.useExisting, useValue = _a.useValue, deps = _a.deps;
	    return new compile_metadata_1.CompileProviderMetadata({
	        token: provider.token,
	        useClass: provider.useClass,
	        useExisting: useExisting,
	        useFactory: provider.useFactory,
	        useValue: useValue,
	        deps: deps,
	        multi: provider.multi
	    });
	}
	function _transformProviderAst(provider, _a) {
	    var eager = _a.eager, providers = _a.providers;
	    return new template_ast_1.ProviderAst(provider.token, provider.multiProvider, provider.eager || eager, providers, provider.providerType, provider.sourceSpan);
	}
	function _normalizeProviders(providers, sourceSpan, targetErrors, targetProviders) {
	    if (targetProviders === void 0) { targetProviders = null; }
	    if (lang_1.isBlank(targetProviders)) {
	        targetProviders = [];
	    }
	    if (lang_1.isPresent(providers)) {
	        providers.forEach(function (provider) {
	            if (lang_1.isArray(provider)) {
	                _normalizeProviders(provider, sourceSpan, targetErrors, targetProviders);
	            }
	            else {
	                var normalizeProvider;
	                if (provider instanceof compile_metadata_1.CompileProviderMetadata) {
	                    normalizeProvider = provider;
	                }
	                else if (provider instanceof compile_metadata_1.CompileTypeMetadata) {
	                    normalizeProvider = new compile_metadata_1.CompileProviderMetadata({ token: new compile_metadata_1.CompileTokenMetadata({ identifier: provider }), useClass: provider });
	                }
	                else {
	                    targetErrors.push(new ProviderError("Unknown provider type " + provider, sourceSpan));
	                }
	                if (lang_1.isPresent(normalizeProvider)) {
	                    targetProviders.push(normalizeProvider);
	                }
	            }
	        });
	    }
	    return targetProviders;
	}
	function _resolveProvidersFromDirectives(directives, sourceSpan, targetErrors) {
	    var providersByToken = new compile_metadata_1.CompileTokenMap();
	    directives.forEach(function (directive) {
	        var dirProvider = new compile_metadata_1.CompileProviderMetadata({ token: new compile_metadata_1.CompileTokenMetadata({ identifier: directive.type }), useClass: directive.type });
	        _resolveProviders([dirProvider], directive.isComponent ? template_ast_1.ProviderAstType.Component : template_ast_1.ProviderAstType.Directive, true, sourceSpan, targetErrors, providersByToken);
	    });
	    // Note: directives need to be able to overwrite providers of a component!
	    var directivesWithComponentFirst = directives.filter(function (dir) { return dir.isComponent; }).concat(directives.filter(function (dir) { return !dir.isComponent; }));
	    directivesWithComponentFirst.forEach(function (directive) {
	        _resolveProviders(_normalizeProviders(directive.providers, sourceSpan, targetErrors), template_ast_1.ProviderAstType.PublicService, false, sourceSpan, targetErrors, providersByToken);
	        _resolveProviders(_normalizeProviders(directive.viewProviders, sourceSpan, targetErrors), template_ast_1.ProviderAstType.PrivateService, false, sourceSpan, targetErrors, providersByToken);
	    });
	    return providersByToken;
	}
	function _resolveProviders(providers, providerType, eager, sourceSpan, targetErrors, targetProvidersByToken) {
	    providers.forEach(function (provider) {
	        var resolvedProvider = targetProvidersByToken.get(provider.token);
	        if (lang_1.isPresent(resolvedProvider) && resolvedProvider.multiProvider !== provider.multi) {
	            targetErrors.push(new ProviderError("Mixing multi and non multi provider is not possible for token " + resolvedProvider.token.name, sourceSpan));
	        }
	        if (lang_1.isBlank(resolvedProvider)) {
	            resolvedProvider = new template_ast_1.ProviderAst(provider.token, provider.multi, eager, [provider], providerType, sourceSpan);
	            targetProvidersByToken.add(provider.token, resolvedProvider);
	        }
	        else {
	            if (!provider.multi) {
	                collection_1.ListWrapper.clear(resolvedProvider.providers);
	            }
	            resolvedProvider.providers.push(provider);
	        }
	    });
	}
	function _getViewQueries(component) {
	    var viewQueries = new compile_metadata_1.CompileTokenMap();
	    if (lang_1.isPresent(component.viewQueries)) {
	        component.viewQueries.forEach(function (query) { return _addQueryToTokenMap(viewQueries, query); });
	    }
	    component.type.diDeps.forEach(function (dep) {
	        if (lang_1.isPresent(dep.viewQuery)) {
	            _addQueryToTokenMap(viewQueries, dep.viewQuery);
	        }
	    });
	    return viewQueries;
	}
	function _getContentQueries(directives) {
	    var contentQueries = new compile_metadata_1.CompileTokenMap();
	    directives.forEach(function (directive) {
	        if (lang_1.isPresent(directive.queries)) {
	            directive.queries.forEach(function (query) { return _addQueryToTokenMap(contentQueries, query); });
	        }
	        directive.type.diDeps.forEach(function (dep) {
	            if (lang_1.isPresent(dep.query)) {
	                _addQueryToTokenMap(contentQueries, dep.query);
	            }
	        });
	    });
	    return contentQueries;
	}
	function _addQueryToTokenMap(map, query) {
	    query.selectors.forEach(function (token) {
	        var entry = map.get(token);
	        if (lang_1.isBlank(entry)) {
	            entry = [];
	            map.add(token, entry);
	        }
	        entry.push(query);
	    });
	}
	//# sourceMappingURL=provider_parser.js.map

/***/ }),

/***/ 568:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var exceptions_1 = __webpack_require__(546);
	var identifiers_1 = __webpack_require__(564);
	var CompilerConfig = (function () {
	    function CompilerConfig(_a) {
	        var _b = _a === void 0 ? {} : _a, _c = _b.renderTypes, renderTypes = _c === void 0 ? new DefaultRenderTypes() : _c, _d = _b.defaultEncapsulation, defaultEncapsulation = _d === void 0 ? core_1.ViewEncapsulation.Emulated : _d, genDebugInfo = _b.genDebugInfo, logBindingUpdate = _b.logBindingUpdate, _e = _b.useJit, useJit = _e === void 0 ? true : _e, _f = _b.platformDirectives, platformDirectives = _f === void 0 ? [] : _f, _g = _b.platformPipes, platformPipes = _g === void 0 ? [] : _g;
	        this.renderTypes = renderTypes;
	        this.defaultEncapsulation = defaultEncapsulation;
	        this._genDebugInfo = genDebugInfo;
	        this._logBindingUpdate = logBindingUpdate;
	        this.useJit = useJit;
	        this.platformDirectives = platformDirectives;
	        this.platformPipes = platformPipes;
	    }
	    Object.defineProperty(CompilerConfig.prototype, "genDebugInfo", {
	        get: function () {
	            return this._genDebugInfo === void 0 ? core_1.isDevMode() : this._genDebugInfo;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(CompilerConfig.prototype, "logBindingUpdate", {
	        get: function () {
	            return this._logBindingUpdate === void 0 ? core_1.isDevMode() : this._logBindingUpdate;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return CompilerConfig;
	}());
	exports.CompilerConfig = CompilerConfig;
	/**
	 * Types used for the renderer.
	 * Can be replaced to specialize the generated output to a specific renderer
	 * to help tree shaking.
	 */
	var RenderTypes = (function () {
	    function RenderTypes() {
	    }
	    Object.defineProperty(RenderTypes.prototype, "renderer", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderTypes.prototype, "renderText", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderTypes.prototype, "renderElement", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderTypes.prototype, "renderComment", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderTypes.prototype, "renderNode", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(RenderTypes.prototype, "renderEvent", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    return RenderTypes;
	}());
	exports.RenderTypes = RenderTypes;
	var DefaultRenderTypes = (function () {
	    function DefaultRenderTypes() {
	        this.renderer = identifiers_1.Identifiers.Renderer;
	        this.renderText = null;
	        this.renderElement = null;
	        this.renderComment = null;
	        this.renderNode = null;
	        this.renderEvent = null;
	    }
	    return DefaultRenderTypes;
	}());
	exports.DefaultRenderTypes = DefaultRenderTypes;
	//# sourceMappingURL=config.js.map

/***/ }),

/***/ 569:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var compile_metadata_1 = __webpack_require__(565);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var o = __webpack_require__(570);
	var util_1 = __webpack_require__(563);
	var view_compiler_1 = __webpack_require__(571);
	var _COMPONENT_FACTORY_IDENTIFIER = new compile_metadata_1.CompileIdentifierMetadata({
	    name: 'ComponentFactory',
	    runtime: core_1.ComponentFactory,
	    moduleUrl: util_1.assetUrl('core', 'linker/component_factory')
	});
	var SourceModule = (function () {
	    function SourceModule(moduleUrl, source) {
	        this.moduleUrl = moduleUrl;
	        this.source = source;
	    }
	    return SourceModule;
	}());
	exports.SourceModule = SourceModule;
	var StyleSheetSourceWithImports = (function () {
	    function StyleSheetSourceWithImports(source, importedUrls) {
	        this.source = source;
	        this.importedUrls = importedUrls;
	    }
	    return StyleSheetSourceWithImports;
	}());
	exports.StyleSheetSourceWithImports = StyleSheetSourceWithImports;
	var NormalizedComponentWithViewDirectives = (function () {
	    function NormalizedComponentWithViewDirectives(component, directives, pipes) {
	        this.component = component;
	        this.directives = directives;
	        this.pipes = pipes;
	    }
	    return NormalizedComponentWithViewDirectives;
	}());
	exports.NormalizedComponentWithViewDirectives = NormalizedComponentWithViewDirectives;
	var OfflineCompiler = (function () {
	    function OfflineCompiler(_directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _outputEmitter) {
	        this._directiveNormalizer = _directiveNormalizer;
	        this._templateParser = _templateParser;
	        this._styleCompiler = _styleCompiler;
	        this._viewCompiler = _viewCompiler;
	        this._outputEmitter = _outputEmitter;
	    }
	    OfflineCompiler.prototype.normalizeDirectiveMetadata = function (directive) {
	        return this._directiveNormalizer.normalizeDirective(directive).asyncResult;
	    };
	    OfflineCompiler.prototype.compileTemplates = function (components) {
	        var _this = this;
	        if (components.length === 0) {
	            throw new exceptions_1.BaseException('No components given');
	        }
	        var statements = [];
	        var exportedVars = [];
	        var moduleUrl = _ngfactoryModuleUrl(components[0].component.type);
	        var outputSourceModules = [];
	        components.forEach(function (componentWithDirs) {
	            var compMeta = componentWithDirs.component;
	            _assertComponent(compMeta);
	            var fileSuffix = _splitLastSuffix(compMeta.type.moduleUrl)[1];
	            var stylesCompileResults = _this._styleCompiler.compileComponent(compMeta);
	            stylesCompileResults.externalStylesheets.forEach(function (compiledStyleSheet) {
	                outputSourceModules.push(_this._codgenStyles(compiledStyleSheet, fileSuffix));
	            });
	            var compViewFactoryVar = _this._compileComponent(compMeta, componentWithDirs.directives, componentWithDirs.pipes, stylesCompileResults.componentStylesheet, fileSuffix, statements);
	            exportedVars.push(compViewFactoryVar);
	            var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
	            var hostViewFactoryVar = _this._compileComponent(hostMeta, [compMeta], [], null, fileSuffix, statements);
	            var compFactoryVar = _componentFactoryName(compMeta.type);
	            statements.push(o.variable(compFactoryVar)
	                .set(o.importExpr(_COMPONENT_FACTORY_IDENTIFIER, [o.importType(compMeta.type)])
	                .instantiate([
	                o.literal(compMeta.selector), o.variable(hostViewFactoryVar),
	                o.importExpr(compMeta.type)
	            ], o.importType(_COMPONENT_FACTORY_IDENTIFIER, [o.importType(compMeta.type)], [o.TypeModifier.Const])))
	                .toDeclStmt(null, [o.StmtModifier.Final]));
	            exportedVars.push(compFactoryVar);
	        });
	        outputSourceModules.unshift(this._codegenSourceModule(moduleUrl, statements, exportedVars));
	        return outputSourceModules;
	    };
	    OfflineCompiler.prototype._compileComponent = function (compMeta, directives, pipes, componentStyles, fileSuffix, targetStatements) {
	        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, compMeta.type.name);
	        var stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
	        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, stylesExpr, pipes);
	        if (componentStyles) {
	            collection_1.ListWrapper.addAll(targetStatements, _resolveStyleStatements(componentStyles, fileSuffix));
	        }
	        collection_1.ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
	        return viewResult.viewFactoryVar;
	    };
	    OfflineCompiler.prototype._codgenStyles = function (stylesCompileResult, fileSuffix) {
	        _resolveStyleStatements(stylesCompileResult, fileSuffix);
	        return this._codegenSourceModule(_stylesModuleUrl(stylesCompileResult.meta.moduleUrl, stylesCompileResult.isShimmed, fileSuffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
	    };
	    OfflineCompiler.prototype._codegenSourceModule = function (moduleUrl, statements, exportedVars) {
	        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
	    };
	    return OfflineCompiler;
	}());
	exports.OfflineCompiler = OfflineCompiler;
	function _resolveViewStatements(compileResult) {
	    compileResult.dependencies.forEach(function (dep) {
	        if (dep instanceof view_compiler_1.ViewFactoryDependency) {
	            var vfd = dep;
	            vfd.placeholder.moduleUrl = _ngfactoryModuleUrl(vfd.comp);
	        }
	        else if (dep instanceof view_compiler_1.ComponentFactoryDependency) {
	            var cfd = dep;
	            cfd.placeholder.name = _componentFactoryName(cfd.comp);
	            cfd.placeholder.moduleUrl = _ngfactoryModuleUrl(cfd.comp);
	        }
	    });
	    return compileResult.statements;
	}
	function _resolveStyleStatements(compileResult, fileSuffix) {
	    compileResult.dependencies.forEach(function (dep) {
	        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, fileSuffix);
	    });
	    return compileResult.statements;
	}
	function _ngfactoryModuleUrl(comp) {
	    var urlWithSuffix = _splitLastSuffix(comp.moduleUrl);
	    return urlWithSuffix[0] + ".ngfactory" + urlWithSuffix[1];
	}
	function _componentFactoryName(comp) {
	    return comp.name + "NgFactory";
	}
	function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
	    return shim ? stylesheetUrl + ".shim" + suffix : "" + stylesheetUrl + suffix;
	}
	function _assertComponent(meta) {
	    if (!meta.isComponent) {
	        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
	    }
	}
	function _splitLastSuffix(path) {
	    var lastDot = path.lastIndexOf('.');
	    if (lastDot !== -1) {
	        return [path.substring(0, lastDot), path.substring(lastDot)];
	    }
	    else {
	        return [path, ''];
	    }
	}
	//# sourceMappingURL=offline_compiler.js.map

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var lang_1 = __webpack_require__(542);
	//// Types
	(function (TypeModifier) {
	    TypeModifier[TypeModifier["Const"] = 0] = "Const";
	})(exports.TypeModifier || (exports.TypeModifier = {}));
	var TypeModifier = exports.TypeModifier;
	var Type = (function () {
	    function Type(modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        this.modifiers = modifiers;
	        if (lang_1.isBlank(modifiers)) {
	            this.modifiers = [];
	        }
	    }
	    Type.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
	    return Type;
	}());
	exports.Type = Type;
	(function (BuiltinTypeName) {
	    BuiltinTypeName[BuiltinTypeName["Dynamic"] = 0] = "Dynamic";
	    BuiltinTypeName[BuiltinTypeName["Bool"] = 1] = "Bool";
	    BuiltinTypeName[BuiltinTypeName["String"] = 2] = "String";
	    BuiltinTypeName[BuiltinTypeName["Int"] = 3] = "Int";
	    BuiltinTypeName[BuiltinTypeName["Number"] = 4] = "Number";
	    BuiltinTypeName[BuiltinTypeName["Function"] = 5] = "Function";
	})(exports.BuiltinTypeName || (exports.BuiltinTypeName = {}));
	var BuiltinTypeName = exports.BuiltinTypeName;
	var BuiltinType = (function (_super) {
	    __extends(BuiltinType, _super);
	    function BuiltinType(name, modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.name = name;
	    }
	    BuiltinType.prototype.visitType = function (visitor, context) {
	        return visitor.visitBuiltintType(this, context);
	    };
	    return BuiltinType;
	}(Type));
	exports.BuiltinType = BuiltinType;
	var ExternalType = (function (_super) {
	    __extends(ExternalType, _super);
	    function ExternalType(value, typeParams, modifiers) {
	        if (typeParams === void 0) { typeParams = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.value = value;
	        this.typeParams = typeParams;
	    }
	    ExternalType.prototype.visitType = function (visitor, context) {
	        return visitor.visitExternalType(this, context);
	    };
	    return ExternalType;
	}(Type));
	exports.ExternalType = ExternalType;
	var ArrayType = (function (_super) {
	    __extends(ArrayType, _super);
	    function ArrayType(of, modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.of = of;
	    }
	    ArrayType.prototype.visitType = function (visitor, context) {
	        return visitor.visitArrayType(this, context);
	    };
	    return ArrayType;
	}(Type));
	exports.ArrayType = ArrayType;
	var MapType = (function (_super) {
	    __extends(MapType, _super);
	    function MapType(valueType, modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.valueType = valueType;
	    }
	    MapType.prototype.visitType = function (visitor, context) { return visitor.visitMapType(this, context); };
	    return MapType;
	}(Type));
	exports.MapType = MapType;
	exports.DYNAMIC_TYPE = new BuiltinType(BuiltinTypeName.Dynamic);
	exports.BOOL_TYPE = new BuiltinType(BuiltinTypeName.Bool);
	exports.INT_TYPE = new BuiltinType(BuiltinTypeName.Int);
	exports.NUMBER_TYPE = new BuiltinType(BuiltinTypeName.Number);
	exports.STRING_TYPE = new BuiltinType(BuiltinTypeName.String);
	exports.FUNCTION_TYPE = new BuiltinType(BuiltinTypeName.Function);
	///// Expressions
	(function (BinaryOperator) {
	    BinaryOperator[BinaryOperator["Equals"] = 0] = "Equals";
	    BinaryOperator[BinaryOperator["NotEquals"] = 1] = "NotEquals";
	    BinaryOperator[BinaryOperator["Identical"] = 2] = "Identical";
	    BinaryOperator[BinaryOperator["NotIdentical"] = 3] = "NotIdentical";
	    BinaryOperator[BinaryOperator["Minus"] = 4] = "Minus";
	    BinaryOperator[BinaryOperator["Plus"] = 5] = "Plus";
	    BinaryOperator[BinaryOperator["Divide"] = 6] = "Divide";
	    BinaryOperator[BinaryOperator["Multiply"] = 7] = "Multiply";
	    BinaryOperator[BinaryOperator["Modulo"] = 8] = "Modulo";
	    BinaryOperator[BinaryOperator["And"] = 9] = "And";
	    BinaryOperator[BinaryOperator["Or"] = 10] = "Or";
	    BinaryOperator[BinaryOperator["Lower"] = 11] = "Lower";
	    BinaryOperator[BinaryOperator["LowerEquals"] = 12] = "LowerEquals";
	    BinaryOperator[BinaryOperator["Bigger"] = 13] = "Bigger";
	    BinaryOperator[BinaryOperator["BiggerEquals"] = 14] = "BiggerEquals";
	})(exports.BinaryOperator || (exports.BinaryOperator = {}));
	var BinaryOperator = exports.BinaryOperator;
	var Expression = (function () {
	    function Expression(type) {
	        this.type = type;
	    }
	    Expression.prototype.prop = function (name) { return new ReadPropExpr(this, name); };
	    Expression.prototype.key = function (index, type) {
	        if (type === void 0) { type = null; }
	        return new ReadKeyExpr(this, index, type);
	    };
	    Expression.prototype.callMethod = function (name, params) {
	        return new InvokeMethodExpr(this, name, params);
	    };
	    Expression.prototype.callFn = function (params) { return new InvokeFunctionExpr(this, params); };
	    Expression.prototype.instantiate = function (params, type) {
	        if (type === void 0) { type = null; }
	        return new InstantiateExpr(this, params, type);
	    };
	    Expression.prototype.conditional = function (trueCase, falseCase) {
	        if (falseCase === void 0) { falseCase = null; }
	        return new ConditionalExpr(this, trueCase, falseCase);
	    };
	    Expression.prototype.equals = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Equals, this, rhs);
	    };
	    Expression.prototype.notEquals = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.NotEquals, this, rhs);
	    };
	    Expression.prototype.identical = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Identical, this, rhs);
	    };
	    Expression.prototype.notIdentical = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.NotIdentical, this, rhs);
	    };
	    Expression.prototype.minus = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Minus, this, rhs);
	    };
	    Expression.prototype.plus = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Plus, this, rhs);
	    };
	    Expression.prototype.divide = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Divide, this, rhs);
	    };
	    Expression.prototype.multiply = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Multiply, this, rhs);
	    };
	    Expression.prototype.modulo = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Modulo, this, rhs);
	    };
	    Expression.prototype.and = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.And, this, rhs);
	    };
	    Expression.prototype.or = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Or, this, rhs);
	    };
	    Expression.prototype.lower = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Lower, this, rhs);
	    };
	    Expression.prototype.lowerEquals = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.LowerEquals, this, rhs);
	    };
	    Expression.prototype.bigger = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.Bigger, this, rhs);
	    };
	    Expression.prototype.biggerEquals = function (rhs) {
	        return new BinaryOperatorExpr(BinaryOperator.BiggerEquals, this, rhs);
	    };
	    Expression.prototype.isBlank = function () {
	        // Note: We use equals by purpose here to compare to null and undefined in JS.
	        return this.equals(exports.NULL_EXPR);
	    };
	    Expression.prototype.cast = function (type) { return new CastExpr(this, type); };
	    Expression.prototype.toStmt = function () { return new ExpressionStatement(this); };
	    return Expression;
	}());
	exports.Expression = Expression;
	(function (BuiltinVar) {
	    BuiltinVar[BuiltinVar["This"] = 0] = "This";
	    BuiltinVar[BuiltinVar["Super"] = 1] = "Super";
	    BuiltinVar[BuiltinVar["CatchError"] = 2] = "CatchError";
	    BuiltinVar[BuiltinVar["CatchStack"] = 3] = "CatchStack";
	})(exports.BuiltinVar || (exports.BuiltinVar = {}));
	var BuiltinVar = exports.BuiltinVar;
	var ReadVarExpr = (function (_super) {
	    __extends(ReadVarExpr, _super);
	    function ReadVarExpr(name, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        if (lang_1.isString(name)) {
	            this.name = name;
	            this.builtin = null;
	        }
	        else {
	            this.name = null;
	            this.builtin = name;
	        }
	    }
	    ReadVarExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitReadVarExpr(this, context);
	    };
	    ReadVarExpr.prototype.set = function (value) { return new WriteVarExpr(this.name, value); };
	    return ReadVarExpr;
	}(Expression));
	exports.ReadVarExpr = ReadVarExpr;
	var WriteVarExpr = (function (_super) {
	    __extends(WriteVarExpr, _super);
	    function WriteVarExpr(name, value, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, lang_1.isPresent(type) ? type : value.type);
	        this.name = name;
	        this.value = value;
	    }
	    WriteVarExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitWriteVarExpr(this, context);
	    };
	    WriteVarExpr.prototype.toDeclStmt = function (type, modifiers) {
	        if (type === void 0) { type = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        return new DeclareVarStmt(this.name, this.value, type, modifiers);
	    };
	    return WriteVarExpr;
	}(Expression));
	exports.WriteVarExpr = WriteVarExpr;
	var WriteKeyExpr = (function (_super) {
	    __extends(WriteKeyExpr, _super);
	    function WriteKeyExpr(receiver, index, value, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, lang_1.isPresent(type) ? type : value.type);
	        this.receiver = receiver;
	        this.index = index;
	        this.value = value;
	    }
	    WriteKeyExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitWriteKeyExpr(this, context);
	    };
	    return WriteKeyExpr;
	}(Expression));
	exports.WriteKeyExpr = WriteKeyExpr;
	var WritePropExpr = (function (_super) {
	    __extends(WritePropExpr, _super);
	    function WritePropExpr(receiver, name, value, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, lang_1.isPresent(type) ? type : value.type);
	        this.receiver = receiver;
	        this.name = name;
	        this.value = value;
	    }
	    WritePropExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitWritePropExpr(this, context);
	    };
	    return WritePropExpr;
	}(Expression));
	exports.WritePropExpr = WritePropExpr;
	(function (BuiltinMethod) {
	    BuiltinMethod[BuiltinMethod["ConcatArray"] = 0] = "ConcatArray";
	    BuiltinMethod[BuiltinMethod["SubscribeObservable"] = 1] = "SubscribeObservable";
	    BuiltinMethod[BuiltinMethod["bind"] = 2] = "bind";
	})(exports.BuiltinMethod || (exports.BuiltinMethod = {}));
	var BuiltinMethod = exports.BuiltinMethod;
	var InvokeMethodExpr = (function (_super) {
	    __extends(InvokeMethodExpr, _super);
	    function InvokeMethodExpr(receiver, method, args, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.receiver = receiver;
	        this.args = args;
	        if (lang_1.isString(method)) {
	            this.name = method;
	            this.builtin = null;
	        }
	        else {
	            this.name = null;
	            this.builtin = method;
	        }
	    }
	    InvokeMethodExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitInvokeMethodExpr(this, context);
	    };
	    return InvokeMethodExpr;
	}(Expression));
	exports.InvokeMethodExpr = InvokeMethodExpr;
	var InvokeFunctionExpr = (function (_super) {
	    __extends(InvokeFunctionExpr, _super);
	    function InvokeFunctionExpr(fn, args, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.fn = fn;
	        this.args = args;
	    }
	    InvokeFunctionExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitInvokeFunctionExpr(this, context);
	    };
	    return InvokeFunctionExpr;
	}(Expression));
	exports.InvokeFunctionExpr = InvokeFunctionExpr;
	var InstantiateExpr = (function (_super) {
	    __extends(InstantiateExpr, _super);
	    function InstantiateExpr(classExpr, args, type) {
	        _super.call(this, type);
	        this.classExpr = classExpr;
	        this.args = args;
	    }
	    InstantiateExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitInstantiateExpr(this, context);
	    };
	    return InstantiateExpr;
	}(Expression));
	exports.InstantiateExpr = InstantiateExpr;
	var LiteralExpr = (function (_super) {
	    __extends(LiteralExpr, _super);
	    function LiteralExpr(value, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.value = value;
	    }
	    LiteralExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitLiteralExpr(this, context);
	    };
	    return LiteralExpr;
	}(Expression));
	exports.LiteralExpr = LiteralExpr;
	var ExternalExpr = (function (_super) {
	    __extends(ExternalExpr, _super);
	    function ExternalExpr(value, type, typeParams) {
	        if (type === void 0) { type = null; }
	        if (typeParams === void 0) { typeParams = null; }
	        _super.call(this, type);
	        this.value = value;
	        this.typeParams = typeParams;
	    }
	    ExternalExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitExternalExpr(this, context);
	    };
	    return ExternalExpr;
	}(Expression));
	exports.ExternalExpr = ExternalExpr;
	var ConditionalExpr = (function (_super) {
	    __extends(ConditionalExpr, _super);
	    function ConditionalExpr(condition, trueCase, falseCase, type) {
	        if (falseCase === void 0) { falseCase = null; }
	        if (type === void 0) { type = null; }
	        _super.call(this, lang_1.isPresent(type) ? type : trueCase.type);
	        this.condition = condition;
	        this.falseCase = falseCase;
	        this.trueCase = trueCase;
	    }
	    ConditionalExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitConditionalExpr(this, context);
	    };
	    return ConditionalExpr;
	}(Expression));
	exports.ConditionalExpr = ConditionalExpr;
	var NotExpr = (function (_super) {
	    __extends(NotExpr, _super);
	    function NotExpr(condition) {
	        _super.call(this, exports.BOOL_TYPE);
	        this.condition = condition;
	    }
	    NotExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitNotExpr(this, context);
	    };
	    return NotExpr;
	}(Expression));
	exports.NotExpr = NotExpr;
	var CastExpr = (function (_super) {
	    __extends(CastExpr, _super);
	    function CastExpr(value, type) {
	        _super.call(this, type);
	        this.value = value;
	    }
	    CastExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitCastExpr(this, context);
	    };
	    return CastExpr;
	}(Expression));
	exports.CastExpr = CastExpr;
	var FnParam = (function () {
	    function FnParam(name, type) {
	        if (type === void 0) { type = null; }
	        this.name = name;
	        this.type = type;
	    }
	    return FnParam;
	}());
	exports.FnParam = FnParam;
	var FunctionExpr = (function (_super) {
	    __extends(FunctionExpr, _super);
	    function FunctionExpr(params, statements, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.params = params;
	        this.statements = statements;
	    }
	    FunctionExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitFunctionExpr(this, context);
	    };
	    FunctionExpr.prototype.toDeclStmt = function (name, modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        return new DeclareFunctionStmt(name, this.params, this.statements, this.type, modifiers);
	    };
	    return FunctionExpr;
	}(Expression));
	exports.FunctionExpr = FunctionExpr;
	var BinaryOperatorExpr = (function (_super) {
	    __extends(BinaryOperatorExpr, _super);
	    function BinaryOperatorExpr(operator, lhs, rhs, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, lang_1.isPresent(type) ? type : lhs.type);
	        this.operator = operator;
	        this.rhs = rhs;
	        this.lhs = lhs;
	    }
	    BinaryOperatorExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitBinaryOperatorExpr(this, context);
	    };
	    return BinaryOperatorExpr;
	}(Expression));
	exports.BinaryOperatorExpr = BinaryOperatorExpr;
	var ReadPropExpr = (function (_super) {
	    __extends(ReadPropExpr, _super);
	    function ReadPropExpr(receiver, name, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.receiver = receiver;
	        this.name = name;
	    }
	    ReadPropExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitReadPropExpr(this, context);
	    };
	    ReadPropExpr.prototype.set = function (value) {
	        return new WritePropExpr(this.receiver, this.name, value);
	    };
	    return ReadPropExpr;
	}(Expression));
	exports.ReadPropExpr = ReadPropExpr;
	var ReadKeyExpr = (function (_super) {
	    __extends(ReadKeyExpr, _super);
	    function ReadKeyExpr(receiver, index, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.receiver = receiver;
	        this.index = index;
	    }
	    ReadKeyExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitReadKeyExpr(this, context);
	    };
	    ReadKeyExpr.prototype.set = function (value) {
	        return new WriteKeyExpr(this.receiver, this.index, value);
	    };
	    return ReadKeyExpr;
	}(Expression));
	exports.ReadKeyExpr = ReadKeyExpr;
	var LiteralArrayExpr = (function (_super) {
	    __extends(LiteralArrayExpr, _super);
	    function LiteralArrayExpr(entries, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.entries = entries;
	    }
	    LiteralArrayExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitLiteralArrayExpr(this, context);
	    };
	    return LiteralArrayExpr;
	}(Expression));
	exports.LiteralArrayExpr = LiteralArrayExpr;
	var LiteralMapExpr = (function (_super) {
	    __extends(LiteralMapExpr, _super);
	    function LiteralMapExpr(entries, type) {
	        if (type === void 0) { type = null; }
	        _super.call(this, type);
	        this.entries = entries;
	        this.valueType = null;
	        if (lang_1.isPresent(type)) {
	            this.valueType = type.valueType;
	        }
	    }
	    LiteralMapExpr.prototype.visitExpression = function (visitor, context) {
	        return visitor.visitLiteralMapExpr(this, context);
	    };
	    return LiteralMapExpr;
	}(Expression));
	exports.LiteralMapExpr = LiteralMapExpr;
	exports.THIS_EXPR = new ReadVarExpr(BuiltinVar.This);
	exports.SUPER_EXPR = new ReadVarExpr(BuiltinVar.Super);
	exports.CATCH_ERROR_VAR = new ReadVarExpr(BuiltinVar.CatchError);
	exports.CATCH_STACK_VAR = new ReadVarExpr(BuiltinVar.CatchStack);
	exports.NULL_EXPR = new LiteralExpr(null, null);
	//// Statements
	(function (StmtModifier) {
	    StmtModifier[StmtModifier["Final"] = 0] = "Final";
	    StmtModifier[StmtModifier["Private"] = 1] = "Private";
	})(exports.StmtModifier || (exports.StmtModifier = {}));
	var StmtModifier = exports.StmtModifier;
	var Statement = (function () {
	    function Statement(modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        this.modifiers = modifiers;
	        if (lang_1.isBlank(modifiers)) {
	            this.modifiers = [];
	        }
	    }
	    Statement.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
	    return Statement;
	}());
	exports.Statement = Statement;
	var DeclareVarStmt = (function (_super) {
	    __extends(DeclareVarStmt, _super);
	    function DeclareVarStmt(name, value, type, modifiers) {
	        if (type === void 0) { type = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.name = name;
	        this.value = value;
	        this.type = lang_1.isPresent(type) ? type : value.type;
	    }
	    DeclareVarStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitDeclareVarStmt(this, context);
	    };
	    return DeclareVarStmt;
	}(Statement));
	exports.DeclareVarStmt = DeclareVarStmt;
	var DeclareFunctionStmt = (function (_super) {
	    __extends(DeclareFunctionStmt, _super);
	    function DeclareFunctionStmt(name, params, statements, type, modifiers) {
	        if (type === void 0) { type = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.name = name;
	        this.params = params;
	        this.statements = statements;
	        this.type = type;
	    }
	    DeclareFunctionStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitDeclareFunctionStmt(this, context);
	    };
	    return DeclareFunctionStmt;
	}(Statement));
	exports.DeclareFunctionStmt = DeclareFunctionStmt;
	var ExpressionStatement = (function (_super) {
	    __extends(ExpressionStatement, _super);
	    function ExpressionStatement(expr) {
	        _super.call(this);
	        this.expr = expr;
	    }
	    ExpressionStatement.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitExpressionStmt(this, context);
	    };
	    return ExpressionStatement;
	}(Statement));
	exports.ExpressionStatement = ExpressionStatement;
	var ReturnStatement = (function (_super) {
	    __extends(ReturnStatement, _super);
	    function ReturnStatement(value) {
	        _super.call(this);
	        this.value = value;
	    }
	    ReturnStatement.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitReturnStmt(this, context);
	    };
	    return ReturnStatement;
	}(Statement));
	exports.ReturnStatement = ReturnStatement;
	var AbstractClassPart = (function () {
	    function AbstractClassPart(type, modifiers) {
	        if (type === void 0) { type = null; }
	        this.type = type;
	        this.modifiers = modifiers;
	        if (lang_1.isBlank(modifiers)) {
	            this.modifiers = [];
	        }
	    }
	    AbstractClassPart.prototype.hasModifier = function (modifier) { return this.modifiers.indexOf(modifier) !== -1; };
	    return AbstractClassPart;
	}());
	exports.AbstractClassPart = AbstractClassPart;
	var ClassField = (function (_super) {
	    __extends(ClassField, _super);
	    function ClassField(name, type, modifiers) {
	        if (type === void 0) { type = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, type, modifiers);
	        this.name = name;
	    }
	    return ClassField;
	}(AbstractClassPart));
	exports.ClassField = ClassField;
	var ClassMethod = (function (_super) {
	    __extends(ClassMethod, _super);
	    function ClassMethod(name, params, body, type, modifiers) {
	        if (type === void 0) { type = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, type, modifiers);
	        this.name = name;
	        this.params = params;
	        this.body = body;
	    }
	    return ClassMethod;
	}(AbstractClassPart));
	exports.ClassMethod = ClassMethod;
	var ClassGetter = (function (_super) {
	    __extends(ClassGetter, _super);
	    function ClassGetter(name, body, type, modifiers) {
	        if (type === void 0) { type = null; }
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, type, modifiers);
	        this.name = name;
	        this.body = body;
	    }
	    return ClassGetter;
	}(AbstractClassPart));
	exports.ClassGetter = ClassGetter;
	var ClassStmt = (function (_super) {
	    __extends(ClassStmt, _super);
	    function ClassStmt(name, parent, fields, getters, constructorMethod, methods, modifiers) {
	        if (modifiers === void 0) { modifiers = null; }
	        _super.call(this, modifiers);
	        this.name = name;
	        this.parent = parent;
	        this.fields = fields;
	        this.getters = getters;
	        this.constructorMethod = constructorMethod;
	        this.methods = methods;
	    }
	    ClassStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitDeclareClassStmt(this, context);
	    };
	    return ClassStmt;
	}(Statement));
	exports.ClassStmt = ClassStmt;
	var IfStmt = (function (_super) {
	    __extends(IfStmt, _super);
	    function IfStmt(condition, trueCase, falseCase) {
	        if (falseCase === void 0) { falseCase = []; }
	        _super.call(this);
	        this.condition = condition;
	        this.trueCase = trueCase;
	        this.falseCase = falseCase;
	    }
	    IfStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitIfStmt(this, context);
	    };
	    return IfStmt;
	}(Statement));
	exports.IfStmt = IfStmt;
	var CommentStmt = (function (_super) {
	    __extends(CommentStmt, _super);
	    function CommentStmt(comment) {
	        _super.call(this);
	        this.comment = comment;
	    }
	    CommentStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitCommentStmt(this, context);
	    };
	    return CommentStmt;
	}(Statement));
	exports.CommentStmt = CommentStmt;
	var TryCatchStmt = (function (_super) {
	    __extends(TryCatchStmt, _super);
	    function TryCatchStmt(bodyStmts, catchStmts) {
	        _super.call(this);
	        this.bodyStmts = bodyStmts;
	        this.catchStmts = catchStmts;
	    }
	    TryCatchStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitTryCatchStmt(this, context);
	    };
	    return TryCatchStmt;
	}(Statement));
	exports.TryCatchStmt = TryCatchStmt;
	var ThrowStmt = (function (_super) {
	    __extends(ThrowStmt, _super);
	    function ThrowStmt(error) {
	        _super.call(this);
	        this.error = error;
	    }
	    ThrowStmt.prototype.visitStatement = function (visitor, context) {
	        return visitor.visitThrowStmt(this, context);
	    };
	    return ThrowStmt;
	}(Statement));
	exports.ThrowStmt = ThrowStmt;
	var ExpressionTransformer = (function () {
	    function ExpressionTransformer() {
	    }
	    ExpressionTransformer.prototype.visitReadVarExpr = function (ast, context) { return ast; };
	    ExpressionTransformer.prototype.visitWriteVarExpr = function (expr, context) {
	        return new WriteVarExpr(expr.name, expr.value.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitWriteKeyExpr = function (expr, context) {
	        return new WriteKeyExpr(expr.receiver.visitExpression(this, context), expr.index.visitExpression(this, context), expr.value.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitWritePropExpr = function (expr, context) {
	        return new WritePropExpr(expr.receiver.visitExpression(this, context), expr.name, expr.value.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitInvokeMethodExpr = function (ast, context) {
	        var method = lang_1.isPresent(ast.builtin) ? ast.builtin : ast.name;
	        return new InvokeMethodExpr(ast.receiver.visitExpression(this, context), method, this.visitAllExpressions(ast.args, context), ast.type);
	    };
	    ExpressionTransformer.prototype.visitInvokeFunctionExpr = function (ast, context) {
	        return new InvokeFunctionExpr(ast.fn.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
	    };
	    ExpressionTransformer.prototype.visitInstantiateExpr = function (ast, context) {
	        return new InstantiateExpr(ast.classExpr.visitExpression(this, context), this.visitAllExpressions(ast.args, context), ast.type);
	    };
	    ExpressionTransformer.prototype.visitLiteralExpr = function (ast, context) { return ast; };
	    ExpressionTransformer.prototype.visitExternalExpr = function (ast, context) { return ast; };
	    ExpressionTransformer.prototype.visitConditionalExpr = function (ast, context) {
	        return new ConditionalExpr(ast.condition.visitExpression(this, context), ast.trueCase.visitExpression(this, context), ast.falseCase.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitNotExpr = function (ast, context) {
	        return new NotExpr(ast.condition.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitCastExpr = function (ast, context) {
	        return new CastExpr(ast.value.visitExpression(this, context), context);
	    };
	    ExpressionTransformer.prototype.visitFunctionExpr = function (ast, context) {
	        // Don't descend into nested functions
	        return ast;
	    };
	    ExpressionTransformer.prototype.visitBinaryOperatorExpr = function (ast, context) {
	        return new BinaryOperatorExpr(ast.operator, ast.lhs.visitExpression(this, context), ast.rhs.visitExpression(this, context), ast.type);
	    };
	    ExpressionTransformer.prototype.visitReadPropExpr = function (ast, context) {
	        return new ReadPropExpr(ast.receiver.visitExpression(this, context), ast.name, ast.type);
	    };
	    ExpressionTransformer.prototype.visitReadKeyExpr = function (ast, context) {
	        return new ReadKeyExpr(ast.receiver.visitExpression(this, context), ast.index.visitExpression(this, context), ast.type);
	    };
	    ExpressionTransformer.prototype.visitLiteralArrayExpr = function (ast, context) {
	        return new LiteralArrayExpr(this.visitAllExpressions(ast.entries, context));
	    };
	    ExpressionTransformer.prototype.visitLiteralMapExpr = function (ast, context) {
	        var _this = this;
	        return new LiteralMapExpr(ast.entries.map(function (entry) { return [entry[0], entry[1].visitExpression(_this, context)]; }));
	    };
	    ExpressionTransformer.prototype.visitAllExpressions = function (exprs, context) {
	        var _this = this;
	        return exprs.map(function (expr) { return expr.visitExpression(_this, context); });
	    };
	    ExpressionTransformer.prototype.visitDeclareVarStmt = function (stmt, context) {
	        return new DeclareVarStmt(stmt.name, stmt.value.visitExpression(this, context), stmt.type, stmt.modifiers);
	    };
	    ExpressionTransformer.prototype.visitDeclareFunctionStmt = function (stmt, context) {
	        // Don't descend into nested functions
	        return stmt;
	    };
	    ExpressionTransformer.prototype.visitExpressionStmt = function (stmt, context) {
	        return new ExpressionStatement(stmt.expr.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitReturnStmt = function (stmt, context) {
	        return new ReturnStatement(stmt.value.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitDeclareClassStmt = function (stmt, context) {
	        // Don't descend into nested functions
	        return stmt;
	    };
	    ExpressionTransformer.prototype.visitIfStmt = function (stmt, context) {
	        return new IfStmt(stmt.condition.visitExpression(this, context), this.visitAllStatements(stmt.trueCase, context), this.visitAllStatements(stmt.falseCase, context));
	    };
	    ExpressionTransformer.prototype.visitTryCatchStmt = function (stmt, context) {
	        return new TryCatchStmt(this.visitAllStatements(stmt.bodyStmts, context), this.visitAllStatements(stmt.catchStmts, context));
	    };
	    ExpressionTransformer.prototype.visitThrowStmt = function (stmt, context) {
	        return new ThrowStmt(stmt.error.visitExpression(this, context));
	    };
	    ExpressionTransformer.prototype.visitCommentStmt = function (stmt, context) { return stmt; };
	    ExpressionTransformer.prototype.visitAllStatements = function (stmts, context) {
	        var _this = this;
	        return stmts.map(function (stmt) { return stmt.visitStatement(_this, context); });
	    };
	    return ExpressionTransformer;
	}());
	exports.ExpressionTransformer = ExpressionTransformer;
	var RecursiveExpressionVisitor = (function () {
	    function RecursiveExpressionVisitor() {
	    }
	    RecursiveExpressionVisitor.prototype.visitReadVarExpr = function (ast, context) { return ast; };
	    RecursiveExpressionVisitor.prototype.visitWriteVarExpr = function (expr, context) {
	        expr.value.visitExpression(this, context);
	        return expr;
	    };
	    RecursiveExpressionVisitor.prototype.visitWriteKeyExpr = function (expr, context) {
	        expr.receiver.visitExpression(this, context);
	        expr.index.visitExpression(this, context);
	        expr.value.visitExpression(this, context);
	        return expr;
	    };
	    RecursiveExpressionVisitor.prototype.visitWritePropExpr = function (expr, context) {
	        expr.receiver.visitExpression(this, context);
	        expr.value.visitExpression(this, context);
	        return expr;
	    };
	    RecursiveExpressionVisitor.prototype.visitInvokeMethodExpr = function (ast, context) {
	        ast.receiver.visitExpression(this, context);
	        this.visitAllExpressions(ast.args, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitInvokeFunctionExpr = function (ast, context) {
	        ast.fn.visitExpression(this, context);
	        this.visitAllExpressions(ast.args, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitInstantiateExpr = function (ast, context) {
	        ast.classExpr.visitExpression(this, context);
	        this.visitAllExpressions(ast.args, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitLiteralExpr = function (ast, context) { return ast; };
	    RecursiveExpressionVisitor.prototype.visitExternalExpr = function (ast, context) { return ast; };
	    RecursiveExpressionVisitor.prototype.visitConditionalExpr = function (ast, context) {
	        ast.condition.visitExpression(this, context);
	        ast.trueCase.visitExpression(this, context);
	        ast.falseCase.visitExpression(this, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitNotExpr = function (ast, context) {
	        ast.condition.visitExpression(this, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitCastExpr = function (ast, context) {
	        ast.value.visitExpression(this, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitFunctionExpr = function (ast, context) { return ast; };
	    RecursiveExpressionVisitor.prototype.visitBinaryOperatorExpr = function (ast, context) {
	        ast.lhs.visitExpression(this, context);
	        ast.rhs.visitExpression(this, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitReadPropExpr = function (ast, context) {
	        ast.receiver.visitExpression(this, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitReadKeyExpr = function (ast, context) {
	        ast.receiver.visitExpression(this, context);
	        ast.index.visitExpression(this, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitLiteralArrayExpr = function (ast, context) {
	        this.visitAllExpressions(ast.entries, context);
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitLiteralMapExpr = function (ast, context) {
	        var _this = this;
	        ast.entries.forEach(function (entry) { return entry[1].visitExpression(_this, context); });
	        return ast;
	    };
	    RecursiveExpressionVisitor.prototype.visitAllExpressions = function (exprs, context) {
	        var _this = this;
	        exprs.forEach(function (expr) { return expr.visitExpression(_this, context); });
	    };
	    RecursiveExpressionVisitor.prototype.visitDeclareVarStmt = function (stmt, context) {
	        stmt.value.visitExpression(this, context);
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitDeclareFunctionStmt = function (stmt, context) {
	        // Don't descend into nested functions
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitExpressionStmt = function (stmt, context) {
	        stmt.expr.visitExpression(this, context);
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitReturnStmt = function (stmt, context) {
	        stmt.value.visitExpression(this, context);
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitDeclareClassStmt = function (stmt, context) {
	        // Don't descend into nested functions
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitIfStmt = function (stmt, context) {
	        stmt.condition.visitExpression(this, context);
	        this.visitAllStatements(stmt.trueCase, context);
	        this.visitAllStatements(stmt.falseCase, context);
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitTryCatchStmt = function (stmt, context) {
	        this.visitAllStatements(stmt.bodyStmts, context);
	        this.visitAllStatements(stmt.catchStmts, context);
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitThrowStmt = function (stmt, context) {
	        stmt.error.visitExpression(this, context);
	        return stmt;
	    };
	    RecursiveExpressionVisitor.prototype.visitCommentStmt = function (stmt, context) { return stmt; };
	    RecursiveExpressionVisitor.prototype.visitAllStatements = function (stmts, context) {
	        var _this = this;
	        stmts.forEach(function (stmt) { return stmt.visitStatement(_this, context); });
	    };
	    return RecursiveExpressionVisitor;
	}());
	exports.RecursiveExpressionVisitor = RecursiveExpressionVisitor;
	function replaceVarInExpression(varName, newValue, expression) {
	    var transformer = new _ReplaceVariableTransformer(varName, newValue);
	    return expression.visitExpression(transformer, null);
	}
	exports.replaceVarInExpression = replaceVarInExpression;
	var _ReplaceVariableTransformer = (function (_super) {
	    __extends(_ReplaceVariableTransformer, _super);
	    function _ReplaceVariableTransformer(_varName, _newValue) {
	        _super.call(this);
	        this._varName = _varName;
	        this._newValue = _newValue;
	    }
	    _ReplaceVariableTransformer.prototype.visitReadVarExpr = function (ast, context) {
	        return ast.name == this._varName ? this._newValue : ast;
	    };
	    return _ReplaceVariableTransformer;
	}(ExpressionTransformer));
	function findReadVarNames(stmts) {
	    var finder = new _VariableFinder();
	    finder.visitAllStatements(stmts, null);
	    return finder.varNames;
	}
	exports.findReadVarNames = findReadVarNames;
	var _VariableFinder = (function (_super) {
	    __extends(_VariableFinder, _super);
	    function _VariableFinder() {
	        _super.apply(this, arguments);
	        this.varNames = new Set();
	    }
	    _VariableFinder.prototype.visitReadVarExpr = function (ast, context) {
	        this.varNames.add(ast.name);
	        return null;
	    };
	    return _VariableFinder;
	}(RecursiveExpressionVisitor));
	function variable(name, type) {
	    if (type === void 0) { type = null; }
	    return new ReadVarExpr(name, type);
	}
	exports.variable = variable;
	function importExpr(id, typeParams) {
	    if (typeParams === void 0) { typeParams = null; }
	    return new ExternalExpr(id, null, typeParams);
	}
	exports.importExpr = importExpr;
	function importType(id, typeParams, typeModifiers) {
	    if (typeParams === void 0) { typeParams = null; }
	    if (typeModifiers === void 0) { typeModifiers = null; }
	    return lang_1.isPresent(id) ? new ExternalType(id, typeParams, typeModifiers) : null;
	}
	exports.importType = importType;
	function literal(value, type) {
	    if (type === void 0) { type = null; }
	    return new LiteralExpr(value, type);
	}
	exports.literal = literal;
	function literalArr(values, type) {
	    if (type === void 0) { type = null; }
	    return new LiteralArrayExpr(values, type);
	}
	exports.literalArr = literalArr;
	function literalMap(values, type) {
	    if (type === void 0) { type = null; }
	    return new LiteralMapExpr(values, type);
	}
	exports.literalMap = literalMap;
	function not(expr) {
	    return new NotExpr(expr);
	}
	exports.not = not;
	function fn(params, body, type) {
	    if (type === void 0) { type = null; }
	    return new FunctionExpr(params, body, type);
	}
	exports.fn = fn;
	//# sourceMappingURL=output_ast.js.map

/***/ }),

/***/ 571:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var animation_compiler_1 = __webpack_require__(572);
	var config_1 = __webpack_require__(568);
	var compile_element_1 = __webpack_require__(577);
	var compile_view_1 = __webpack_require__(582);
	var view_binder_1 = __webpack_require__(584);
	var view_builder_1 = __webpack_require__(590);
	var view_builder_2 = __webpack_require__(590);
	exports.ComponentFactoryDependency = view_builder_2.ComponentFactoryDependency;
	exports.ViewFactoryDependency = view_builder_2.ViewFactoryDependency;
	var ViewCompileResult = (function () {
	    function ViewCompileResult(statements, viewFactoryVar, dependencies) {
	        this.statements = statements;
	        this.viewFactoryVar = viewFactoryVar;
	        this.dependencies = dependencies;
	    }
	    return ViewCompileResult;
	}());
	exports.ViewCompileResult = ViewCompileResult;
	var ViewCompiler = (function () {
	    function ViewCompiler(_genConfig) {
	        this._genConfig = _genConfig;
	        this._animationCompiler = new animation_compiler_1.AnimationCompiler();
	    }
	    ViewCompiler.prototype.compileComponent = function (component, template, styles, pipes) {
	        var dependencies = [];
	        var compiledAnimations = this._animationCompiler.compileComponent(component);
	        var statements = [];
	        compiledAnimations.map(function (entry) {
	            statements.push(entry.statesMapStatement);
	            statements.push(entry.fnStatement);
	        });
	        var view = new compile_view_1.CompileView(component, this._genConfig, pipes, styles, compiledAnimations, 0, compile_element_1.CompileElement.createNull(), []);
	        view_builder_1.buildView(view, template, dependencies);
	        // Need to separate binding from creation to be able to refer to
	        // variables that have been declared after usage.
	        view_binder_1.bindView(view, template);
	        view_builder_1.finishView(view, statements);
	        return new ViewCompileResult(statements, view.viewFactory.name, dependencies);
	    };
	    /** @nocollapse */
	    ViewCompiler.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    ViewCompiler.ctorParameters = [
	        { type: config_1.CompilerConfig, },
	    ];
	    return ViewCompiler;
	}());
	exports.ViewCompiler = ViewCompiler;
	//# sourceMappingURL=view_compiler.js.map

/***/ }),

/***/ 572:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var animation_ast_1 = __webpack_require__(573);
	var animation_parser_1 = __webpack_require__(574);
	var CompiledAnimation = (function () {
	    function CompiledAnimation(name, statesMapStatement, statesVariableName, fnStatement, fnVariable) {
	        this.name = name;
	        this.statesMapStatement = statesMapStatement;
	        this.statesVariableName = statesVariableName;
	        this.fnStatement = fnStatement;
	        this.fnVariable = fnVariable;
	    }
	    return CompiledAnimation;
	}());
	exports.CompiledAnimation = CompiledAnimation;
	var AnimationCompiler = (function () {
	    function AnimationCompiler() {
	    }
	    AnimationCompiler.prototype.compileComponent = function (component) {
	        var compiledAnimations = [];
	        var index = 0;
	        component.template.animations.forEach(function (entry) {
	            var result = animation_parser_1.parseAnimationEntry(entry);
	            if (result.errors.length > 0) {
	                var errorMessage = '';
	                result.errors.forEach(function (error) { errorMessage += '\n- ' + error.msg; });
	                // todo (matsko): include the component name when throwing
	                throw new exceptions_1.BaseException(("Unable to parse the animation sequence for \"" + entry.name + "\" due to the following errors: ") +
	                    errorMessage);
	            }
	            var factoryName = component.type.name + "_" + entry.name + "_" + index;
	            index++;
	            var visitor = new _AnimationBuilder(entry.name, factoryName);
	            compiledAnimations.push(visitor.build(result.ast));
	        });
	        return compiledAnimations;
	    };
	    return AnimationCompiler;
	}());
	exports.AnimationCompiler = AnimationCompiler;
	var _ANIMATION_FACTORY_ELEMENT_VAR = o.variable('element');
	var _ANIMATION_DEFAULT_STATE_VAR = o.variable('defaultStateStyles');
	var _ANIMATION_FACTORY_VIEW_VAR = o.variable('view');
	var _ANIMATION_FACTORY_RENDERER_VAR = _ANIMATION_FACTORY_VIEW_VAR.prop('renderer');
	var _ANIMATION_CURRENT_STATE_VAR = o.variable('currentState');
	var _ANIMATION_NEXT_STATE_VAR = o.variable('nextState');
	var _ANIMATION_PLAYER_VAR = o.variable('player');
	var _ANIMATION_START_STATE_STYLES_VAR = o.variable('startStateStyles');
	var _ANIMATION_END_STATE_STYLES_VAR = o.variable('endStateStyles');
	var _ANIMATION_COLLECTED_STYLES = o.variable('collectedStyles');
	var EMPTY_MAP = o.literalMap([]);
	var _AnimationBuilder = (function () {
	    function _AnimationBuilder(animationName, factoryName) {
	        this.animationName = animationName;
	        this._fnVarName = factoryName + '_factory';
	        this._statesMapVarName = factoryName + '_states';
	        this._statesMapVar = o.variable(this._statesMapVarName);
	    }
	    _AnimationBuilder.prototype.visitAnimationStyles = function (ast, context) {
	        var stylesArr = [];
	        if (context.isExpectingFirstStyleStep) {
	            stylesArr.push(_ANIMATION_START_STATE_STYLES_VAR);
	            context.isExpectingFirstStyleStep = false;
	        }
	        ast.styles.forEach(function (entry) {
	            stylesArr.push(o.literalMap(collection_1.StringMapWrapper.keys(entry).map(function (key) { return [key, o.literal(entry[key])]; })));
	        });
	        return o.importExpr(identifiers_1.Identifiers.AnimationStyles).instantiate([
	            o.importExpr(identifiers_1.Identifiers.collectAndResolveStyles).callFn([
	                _ANIMATION_COLLECTED_STYLES, o.literalArr(stylesArr)
	            ])
	        ]);
	    };
	    _AnimationBuilder.prototype.visitAnimationKeyframe = function (ast, context) {
	        return o.importExpr(identifiers_1.Identifiers.AnimationKeyframe).instantiate([
	            o.literal(ast.offset), ast.styles.visit(this, context)
	        ]);
	    };
	    _AnimationBuilder.prototype.visitAnimationStep = function (ast, context) {
	        var _this = this;
	        if (context.endStateAnimateStep === ast) {
	            return this._visitEndStateAnimation(ast, context);
	        }
	        var startingStylesExpr = ast.startingStyles.visit(this, context);
	        var keyframeExpressions = ast.keyframes.map(function (keyframeEntry) { return keyframeEntry.visit(_this, context); });
	        return this._callAnimateMethod(ast, startingStylesExpr, o.literalArr(keyframeExpressions));
	    };
	    /** @internal */
	    _AnimationBuilder.prototype._visitEndStateAnimation = function (ast, context) {
	        var _this = this;
	        var startingStylesExpr = ast.startingStyles.visit(this, context);
	        var keyframeExpressions = ast.keyframes.map(function (keyframe) { return keyframe.visit(_this, context); });
	        var keyframesExpr = o.importExpr(identifiers_1.Identifiers.balanceAnimationKeyframes).callFn([
	            _ANIMATION_COLLECTED_STYLES, _ANIMATION_END_STATE_STYLES_VAR,
	            o.literalArr(keyframeExpressions)
	        ]);
	        return this._callAnimateMethod(ast, startingStylesExpr, keyframesExpr);
	    };
	    /** @internal */
	    _AnimationBuilder.prototype._callAnimateMethod = function (ast, startingStylesExpr, keyframesExpr) {
	        return _ANIMATION_FACTORY_RENDERER_VAR.callMethod('animate', [
	            _ANIMATION_FACTORY_ELEMENT_VAR, startingStylesExpr, keyframesExpr, o.literal(ast.duration),
	            o.literal(ast.delay), o.literal(ast.easing)
	        ]);
	    };
	    _AnimationBuilder.prototype.visitAnimationSequence = function (ast, context) {
	        var _this = this;
	        var playerExprs = ast.steps.map(function (step) { return step.visit(_this, context); });
	        return o.importExpr(identifiers_1.Identifiers.AnimationSequencePlayer).instantiate([o.literalArr(playerExprs)]);
	    };
	    _AnimationBuilder.prototype.visitAnimationGroup = function (ast, context) {
	        var _this = this;
	        var playerExprs = ast.steps.map(function (step) { return step.visit(_this, context); });
	        return o.importExpr(identifiers_1.Identifiers.AnimationGroupPlayer).instantiate([o.literalArr(playerExprs)]);
	    };
	    _AnimationBuilder.prototype.visitAnimationStateDeclaration = function (ast, context) {
	        var flatStyles = {};
	        _getStylesArray(ast).forEach(function (entry) {
	            collection_1.StringMapWrapper.forEach(entry, function (value, key) { flatStyles[key] = value; });
	        });
	        context.stateMap.registerState(ast.stateName, flatStyles);
	    };
	    _AnimationBuilder.prototype.visitAnimationStateTransition = function (ast, context) {
	        var steps = ast.animation.steps;
	        var lastStep = steps[steps.length - 1];
	        if (_isEndStateAnimateStep(lastStep)) {
	            context.endStateAnimateStep = lastStep;
	        }
	        context.isExpectingFirstStyleStep = true;
	        var stateChangePreconditions = [];
	        ast.stateChanges.forEach(function (stateChange) {
	            stateChangePreconditions.push(_compareToAnimationStateExpr(_ANIMATION_CURRENT_STATE_VAR, stateChange.fromState)
	                .and(_compareToAnimationStateExpr(_ANIMATION_NEXT_STATE_VAR, stateChange.toState)));
	            if (stateChange.fromState != core_private_1.ANY_STATE) {
	                context.stateMap.registerState(stateChange.fromState);
	            }
	            if (stateChange.toState != core_private_1.ANY_STATE) {
	                context.stateMap.registerState(stateChange.toState);
	            }
	        });
	        var animationPlayerExpr = ast.animation.visit(this, context);
	        var reducedStateChangesPrecondition = stateChangePreconditions.reduce(function (a, b) { return a.or(b); });
	        var precondition = _ANIMATION_PLAYER_VAR.equals(o.NULL_EXPR).and(reducedStateChangesPrecondition);
	        return new o.IfStmt(precondition, [_ANIMATION_PLAYER_VAR.set(animationPlayerExpr).toStmt()]);
	    };
	    _AnimationBuilder.prototype.visitAnimationEntry = function (ast, context) {
	        var _this = this;
	        // visit each of the declarations first to build the context state map
	        ast.stateDeclarations.forEach(function (def) { return def.visit(_this, context); });
	        // this should always be defined even if the user overrides it
	        context.stateMap.registerState(core_private_1.DEFAULT_STATE, {});
	        var statements = [];
	        statements.push(_ANIMATION_FACTORY_VIEW_VAR
	            .callMethod('cancelActiveAnimation', [
	            _ANIMATION_FACTORY_ELEMENT_VAR, o.literal(this.animationName),
	            _ANIMATION_NEXT_STATE_VAR.equals(o.literal(core_private_1.EMPTY_STATE))
	        ])
	            .toStmt());
	        statements.push(_ANIMATION_COLLECTED_STYLES.set(EMPTY_MAP).toDeclStmt());
	        statements.push(_ANIMATION_PLAYER_VAR.set(o.NULL_EXPR).toDeclStmt());
	        statements.push(_ANIMATION_DEFAULT_STATE_VAR.set(this._statesMapVar.key(o.literal(core_private_1.DEFAULT_STATE)))
	            .toDeclStmt());
	        statements.push(_ANIMATION_START_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_CURRENT_STATE_VAR))
	            .toDeclStmt());
	        statements.push(new o.IfStmt(_ANIMATION_START_STATE_STYLES_VAR.equals(o.NULL_EXPR), [_ANIMATION_START_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
	        statements.push(_ANIMATION_END_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_NEXT_STATE_VAR))
	            .toDeclStmt());
	        statements.push(new o.IfStmt(_ANIMATION_END_STATE_STYLES_VAR.equals(o.NULL_EXPR), [_ANIMATION_END_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
	        var RENDER_STYLES_FN = o.importExpr(identifiers_1.Identifiers.renderStyles);
	        // before we start any animation we want to clear out the starting
	        // styles from the element's style property (since they were placed
	        // there at the end of the last animation
	        statements.push(RENDER_STYLES_FN
	            .callFn([
	            _ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR,
	            o.importExpr(identifiers_1.Identifiers.clearStyles).callFn([_ANIMATION_START_STATE_STYLES_VAR])
	        ])
	            .toStmt());
	        ast.stateTransitions.forEach(function (transAst) { return statements.push(transAst.visit(_this, context)); });
	        // this check ensures that the animation factory always returns a player
	        // so that the onDone callback can be used for tracking
	        statements.push(new o.IfStmt(_ANIMATION_PLAYER_VAR.equals(o.NULL_EXPR), [_ANIMATION_PLAYER_VAR.set(o.importExpr(identifiers_1.Identifiers.NoOpAnimationPlayer).instantiate([]))
	                .toStmt()]));
	        // once complete we want to apply the styles on the element
	        // since the destination state's values should persist once
	        // the animation sequence has completed.
	        statements.push(_ANIMATION_PLAYER_VAR
	            .callMethod('onDone', [o.fn([], [RENDER_STYLES_FN
	                    .callFn([
	                    _ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR,
	                    o.importExpr(identifiers_1.Identifiers.prepareFinalAnimationStyles).callFn([
	                        _ANIMATION_START_STATE_STYLES_VAR, _ANIMATION_END_STATE_STYLES_VAR
	                    ])
	                ])
	                    .toStmt()])])
	            .toStmt());
	        statements.push(_ANIMATION_FACTORY_VIEW_VAR
	            .callMethod('registerAndStartAnimation', [
	            _ANIMATION_FACTORY_ELEMENT_VAR, o.literal(this.animationName),
	            _ANIMATION_PLAYER_VAR
	        ])
	            .toStmt());
	        return o.fn([
	            new o.FnParam(_ANIMATION_FACTORY_VIEW_VAR.name, o.importType(identifiers_1.Identifiers.AppView, [o.DYNAMIC_TYPE])),
	            new o.FnParam(_ANIMATION_FACTORY_ELEMENT_VAR.name, o.DYNAMIC_TYPE),
	            new o.FnParam(_ANIMATION_CURRENT_STATE_VAR.name, o.DYNAMIC_TYPE),
	            new o.FnParam(_ANIMATION_NEXT_STATE_VAR.name, o.DYNAMIC_TYPE)
	        ], statements);
	    };
	    _AnimationBuilder.prototype.build = function (ast) {
	        var context = new _AnimationBuilderContext();
	        var fnStatement = ast.visit(this, context).toDeclStmt(this._fnVarName);
	        var fnVariable = o.variable(this._fnVarName);
	        var lookupMap = [];
	        collection_1.StringMapWrapper.forEach(context.stateMap.states, function (value, stateName) {
	            var variableValue = EMPTY_MAP;
	            if (lang_1.isPresent(value)) {
	                var styleMap_1 = [];
	                collection_1.StringMapWrapper.forEach(value, function (value, key) {
	                    styleMap_1.push([key, o.literal(value)]);
	                });
	                variableValue = o.literalMap(styleMap_1);
	            }
	            lookupMap.push([stateName, variableValue]);
	        });
	        var compiledStatesMapExpr = this._statesMapVar.set(o.literalMap(lookupMap)).toDeclStmt();
	        return new CompiledAnimation(this.animationName, compiledStatesMapExpr, this._statesMapVarName, fnStatement, fnVariable);
	    };
	    return _AnimationBuilder;
	}());
	var _AnimationBuilderContext = (function () {
	    function _AnimationBuilderContext() {
	        this.stateMap = new _AnimationBuilderStateMap();
	        this.endStateAnimateStep = null;
	        this.isExpectingFirstStyleStep = false;
	    }
	    return _AnimationBuilderContext;
	}());
	var _AnimationBuilderStateMap = (function () {
	    function _AnimationBuilderStateMap() {
	        this._states = {};
	    }
	    Object.defineProperty(_AnimationBuilderStateMap.prototype, "states", {
	        get: function () { return this._states; },
	        enumerable: true,
	        configurable: true
	    });
	    _AnimationBuilderStateMap.prototype.registerState = function (name, value) {
	        if (value === void 0) { value = null; }
	        var existingEntry = this._states[name];
	        if (lang_1.isBlank(existingEntry)) {
	            this._states[name] = value;
	        }
	    };
	    return _AnimationBuilderStateMap;
	}());
	function _compareToAnimationStateExpr(value, animationState) {
	    var emptyStateLiteral = o.literal(core_private_1.EMPTY_STATE);
	    switch (animationState) {
	        case core_private_1.EMPTY_STATE:
	            return value.equals(emptyStateLiteral);
	        case core_private_1.ANY_STATE:
	            return o.literal(true);
	        default:
	            return value.equals(o.literal(animationState));
	    }
	}
	function _isEndStateAnimateStep(step) {
	    // the final animation step is characterized by having only TWO
	    // keyframe values and it must have zero styles for both keyframes
	    if (step instanceof animation_ast_1.AnimationStepAst && step.duration > 0 && step.keyframes.length == 2) {
	        var styles1 = _getStylesArray(step.keyframes[0])[0];
	        var styles2 = _getStylesArray(step.keyframes[1])[0];
	        return collection_1.StringMapWrapper.isEmpty(styles1) && collection_1.StringMapWrapper.isEmpty(styles2);
	    }
	    return false;
	}
	function _getStylesArray(obj) {
	    return obj.styles.styles;
	}
	//# sourceMappingURL=animation_compiler.js.map

/***/ }),

/***/ 573:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var AnimationAst = (function () {
	    function AnimationAst() {
	        this.startTime = 0;
	        this.playTime = 0;
	    }
	    return AnimationAst;
	}());
	exports.AnimationAst = AnimationAst;
	var AnimationStateAst = (function (_super) {
	    __extends(AnimationStateAst, _super);
	    function AnimationStateAst() {
	        _super.apply(this, arguments);
	    }
	    return AnimationStateAst;
	}(AnimationAst));
	exports.AnimationStateAst = AnimationStateAst;
	var AnimationEntryAst = (function (_super) {
	    __extends(AnimationEntryAst, _super);
	    function AnimationEntryAst(name, stateDeclarations, stateTransitions) {
	        _super.call(this);
	        this.name = name;
	        this.stateDeclarations = stateDeclarations;
	        this.stateTransitions = stateTransitions;
	    }
	    AnimationEntryAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationEntry(this, context);
	    };
	    return AnimationEntryAst;
	}(AnimationAst));
	exports.AnimationEntryAst = AnimationEntryAst;
	var AnimationStateDeclarationAst = (function (_super) {
	    __extends(AnimationStateDeclarationAst, _super);
	    function AnimationStateDeclarationAst(stateName, styles) {
	        _super.call(this);
	        this.stateName = stateName;
	        this.styles = styles;
	    }
	    AnimationStateDeclarationAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationStateDeclaration(this, context);
	    };
	    return AnimationStateDeclarationAst;
	}(AnimationStateAst));
	exports.AnimationStateDeclarationAst = AnimationStateDeclarationAst;
	var AnimationStateTransitionExpression = (function () {
	    function AnimationStateTransitionExpression(fromState, toState) {
	        this.fromState = fromState;
	        this.toState = toState;
	    }
	    return AnimationStateTransitionExpression;
	}());
	exports.AnimationStateTransitionExpression = AnimationStateTransitionExpression;
	var AnimationStateTransitionAst = (function (_super) {
	    __extends(AnimationStateTransitionAst, _super);
	    function AnimationStateTransitionAst(stateChanges, animation) {
	        _super.call(this);
	        this.stateChanges = stateChanges;
	        this.animation = animation;
	    }
	    AnimationStateTransitionAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationStateTransition(this, context);
	    };
	    return AnimationStateTransitionAst;
	}(AnimationStateAst));
	exports.AnimationStateTransitionAst = AnimationStateTransitionAst;
	var AnimationStepAst = (function (_super) {
	    __extends(AnimationStepAst, _super);
	    function AnimationStepAst(startingStyles, keyframes, duration, delay, easing) {
	        _super.call(this);
	        this.startingStyles = startingStyles;
	        this.keyframes = keyframes;
	        this.duration = duration;
	        this.delay = delay;
	        this.easing = easing;
	    }
	    AnimationStepAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationStep(this, context);
	    };
	    return AnimationStepAst;
	}(AnimationAst));
	exports.AnimationStepAst = AnimationStepAst;
	var AnimationStylesAst = (function (_super) {
	    __extends(AnimationStylesAst, _super);
	    function AnimationStylesAst(styles) {
	        _super.call(this);
	        this.styles = styles;
	    }
	    AnimationStylesAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationStyles(this, context);
	    };
	    return AnimationStylesAst;
	}(AnimationAst));
	exports.AnimationStylesAst = AnimationStylesAst;
	var AnimationKeyframeAst = (function (_super) {
	    __extends(AnimationKeyframeAst, _super);
	    function AnimationKeyframeAst(offset, styles) {
	        _super.call(this);
	        this.offset = offset;
	        this.styles = styles;
	    }
	    AnimationKeyframeAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationKeyframe(this, context);
	    };
	    return AnimationKeyframeAst;
	}(AnimationAst));
	exports.AnimationKeyframeAst = AnimationKeyframeAst;
	var AnimationWithStepsAst = (function (_super) {
	    __extends(AnimationWithStepsAst, _super);
	    function AnimationWithStepsAst(steps) {
	        _super.call(this);
	        this.steps = steps;
	    }
	    return AnimationWithStepsAst;
	}(AnimationAst));
	exports.AnimationWithStepsAst = AnimationWithStepsAst;
	var AnimationGroupAst = (function (_super) {
	    __extends(AnimationGroupAst, _super);
	    function AnimationGroupAst(steps) {
	        _super.call(this, steps);
	    }
	    AnimationGroupAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationGroup(this, context);
	    };
	    return AnimationGroupAst;
	}(AnimationWithStepsAst));
	exports.AnimationGroupAst = AnimationGroupAst;
	var AnimationSequenceAst = (function (_super) {
	    __extends(AnimationSequenceAst, _super);
	    function AnimationSequenceAst(steps) {
	        _super.call(this, steps);
	    }
	    AnimationSequenceAst.prototype.visit = function (visitor, context) {
	        return visitor.visitAnimationSequence(this, context);
	    };
	    return AnimationSequenceAst;
	}(AnimationWithStepsAst));
	exports.AnimationSequenceAst = AnimationSequenceAst;
	//# sourceMappingURL=animation_ast.js.map

/***/ }),

/***/ 574:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_private_1 = __webpack_require__(544);
	var compile_metadata_1 = __webpack_require__(565);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var math_1 = __webpack_require__(575);
	var parse_util_1 = __webpack_require__(558);
	var animation_ast_1 = __webpack_require__(573);
	var styles_collection_1 = __webpack_require__(576);
	var _INITIAL_KEYFRAME = 0;
	var _TERMINAL_KEYFRAME = 1;
	var _ONE_SECOND = 1000;
	var AnimationParseError = (function (_super) {
	    __extends(AnimationParseError, _super);
	    function AnimationParseError(message /** TODO #9100 */) {
	        _super.call(this, null, message);
	    }
	    AnimationParseError.prototype.toString = function () { return "" + this.msg; };
	    return AnimationParseError;
	}(parse_util_1.ParseError));
	exports.AnimationParseError = AnimationParseError;
	var ParsedAnimationResult = (function () {
	    function ParsedAnimationResult(ast, errors) {
	        this.ast = ast;
	        this.errors = errors;
	    }
	    return ParsedAnimationResult;
	}());
	exports.ParsedAnimationResult = ParsedAnimationResult;
	function parseAnimationEntry(entry) {
	    var errors = [];
	    var stateStyles = {};
	    var transitions = [];
	    var stateDeclarationAsts = [];
	    entry.definitions.forEach(function (def) {
	        if (def instanceof compile_metadata_1.CompileAnimationStateDeclarationMetadata) {
	            _parseAnimationDeclarationStates(def, errors).forEach(function (ast) {
	                stateDeclarationAsts.push(ast);
	                stateStyles[ast.stateName] = ast.styles;
	            });
	        }
	        else {
	            transitions.push(def);
	        }
	    });
	    var stateTransitionAsts = transitions.map(function (transDef) { return _parseAnimationStateTransition(transDef, stateStyles, errors); });
	    var ast = new animation_ast_1.AnimationEntryAst(entry.name, stateDeclarationAsts, stateTransitionAsts);
	    return new ParsedAnimationResult(ast, errors);
	}
	exports.parseAnimationEntry = parseAnimationEntry;
	function _parseAnimationDeclarationStates(stateMetadata, errors) {
	    var styleValues = [];
	    stateMetadata.styles.styles.forEach(function (stylesEntry) {
	        // TODO (matsko): change this when we get CSS class integration support
	        if (lang_1.isStringMap(stylesEntry)) {
	            styleValues.push(stylesEntry);
	        }
	        else {
	            errors.push(new AnimationParseError("State based animations cannot contain references to other states"));
	        }
	    });
	    var defStyles = new animation_ast_1.AnimationStylesAst(styleValues);
	    var states = stateMetadata.stateNameExpr.split(/\s*,\s*/);
	    return states.map(function (state) { return new animation_ast_1.AnimationStateDeclarationAst(state, defStyles); });
	}
	function _parseAnimationStateTransition(transitionStateMetadata, stateStyles, errors) {
	    var styles = new styles_collection_1.StylesCollection();
	    var transitionExprs = [];
	    var transitionStates = transitionStateMetadata.stateChangeExpr.split(/\s*,\s*/);
	    transitionStates.forEach(function (expr) {
	        _parseAnimationTransitionExpr(expr, errors).forEach(function (transExpr) {
	            transitionExprs.push(transExpr);
	        });
	    });
	    var entry = _normalizeAnimationEntry(transitionStateMetadata.steps);
	    var animation = _normalizeStyleSteps(entry, stateStyles, errors);
	    var animationAst = _parseTransitionAnimation(animation, 0, styles, stateStyles, errors);
	    if (errors.length == 0) {
	        _fillAnimationAstStartingKeyframes(animationAst, styles, errors);
	    }
	    var sequenceAst = (animationAst instanceof animation_ast_1.AnimationSequenceAst) ?
	        animationAst :
	        new animation_ast_1.AnimationSequenceAst([animationAst]);
	    return new animation_ast_1.AnimationStateTransitionAst(transitionExprs, sequenceAst);
	}
	function _parseAnimationTransitionExpr(eventStr, errors) {
	    var expressions = [];
	    var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
	    if (!lang_1.isPresent(match) || match.length < 4) {
	        errors.push(new AnimationParseError("the provided " + eventStr + " is not of a supported format"));
	        return expressions;
	    }
	    var fromState = match[1];
	    var separator = match[2];
	    var toState = match[3];
	    expressions.push(new animation_ast_1.AnimationStateTransitionExpression(fromState, toState));
	    var isFullAnyStateExpr = fromState == core_private_1.ANY_STATE && toState == core_private_1.ANY_STATE;
	    if (separator[0] == '<' && !isFullAnyStateExpr) {
	        expressions.push(new animation_ast_1.AnimationStateTransitionExpression(toState, fromState));
	    }
	    return expressions;
	}
	function _fetchSylesFromState(stateName, stateStyles) {
	    var entry = stateStyles[stateName];
	    if (lang_1.isPresent(entry)) {
	        var styles = entry.styles;
	        return new compile_metadata_1.CompileAnimationStyleMetadata(0, styles);
	    }
	    return null;
	}
	function _normalizeAnimationEntry(entry) {
	    return lang_1.isArray(entry) ? new compile_metadata_1.CompileAnimationSequenceMetadata(entry) :
	        entry;
	}
	function _normalizeStyleMetadata(entry, stateStyles, errors) {
	    var normalizedStyles = [];
	    entry.styles.forEach(function (styleEntry) {
	        if (lang_1.isString(styleEntry)) {
	            collection_1.ListWrapper.addAll(normalizedStyles, _resolveStylesFromState(styleEntry, stateStyles, errors));
	        }
	        else {
	            normalizedStyles.push(styleEntry);
	        }
	    });
	    return normalizedStyles;
	}
	function _normalizeStyleSteps(entry, stateStyles, errors) {
	    var steps = _normalizeStyleStepEntry(entry, stateStyles, errors);
	    return new compile_metadata_1.CompileAnimationSequenceMetadata(steps);
	}
	function _mergeAnimationStyles(stylesList, newItem) {
	    if (lang_1.isStringMap(newItem) && stylesList.length > 0) {
	        var lastIndex = stylesList.length - 1;
	        var lastItem = stylesList[lastIndex];
	        if (lang_1.isStringMap(lastItem)) {
	            stylesList[lastIndex] = collection_1.StringMapWrapper.merge(lastItem, newItem);
	            return;
	        }
	    }
	    stylesList.push(newItem);
	}
	function _normalizeStyleStepEntry(entry, stateStyles, errors) {
	    var steps;
	    if (entry instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
	        steps = entry.steps;
	    }
	    else {
	        return [entry];
	    }
	    var newSteps = [];
	    var combinedStyles;
	    steps.forEach(function (step) {
	        if (step instanceof compile_metadata_1.CompileAnimationStyleMetadata) {
	            // this occurs when a style step is followed by a previous style step
	            // or when the first style step is run. We want to concatenate all subsequent
	            // style steps together into a single style step such that we have the correct
	            // starting keyframe data to pass into the animation player.
	            if (!lang_1.isPresent(combinedStyles)) {
	                combinedStyles = [];
	            }
	            _normalizeStyleMetadata(step, stateStyles, errors)
	                .forEach(function (entry) { _mergeAnimationStyles(combinedStyles, entry); });
	        }
	        else {
	            // it is important that we create a metadata entry of the combined styles
	            // before we go on an process the animate, sequence or group metadata steps.
	            // This will ensure that the AST will have the previous styles painted on
	            // screen before any further animations that use the styles take place.
	            if (lang_1.isPresent(combinedStyles)) {
	                newSteps.push(new compile_metadata_1.CompileAnimationStyleMetadata(0, combinedStyles));
	                combinedStyles = null;
	            }
	            if (step instanceof compile_metadata_1.CompileAnimationAnimateMetadata) {
	                // we do not recurse into CompileAnimationAnimateMetadata since
	                // those style steps are not going to be squashed
	                var animateStyleValue = step.styles;
	                if (animateStyleValue instanceof compile_metadata_1.CompileAnimationStyleMetadata) {
	                    animateStyleValue.styles =
	                        _normalizeStyleMetadata(animateStyleValue, stateStyles, errors);
	                }
	                else if (animateStyleValue instanceof compile_metadata_1.CompileAnimationKeyframesSequenceMetadata) {
	                    animateStyleValue.steps.forEach(function (step) { step.styles = _normalizeStyleMetadata(step, stateStyles, errors); });
	                }
	            }
	            else if (step instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
	                var innerSteps = _normalizeStyleStepEntry(step, stateStyles, errors);
	                step = step instanceof compile_metadata_1.CompileAnimationGroupMetadata ?
	                    new compile_metadata_1.CompileAnimationGroupMetadata(innerSteps) :
	                    new compile_metadata_1.CompileAnimationSequenceMetadata(innerSteps);
	            }
	            newSteps.push(step);
	        }
	    });
	    // this happens when only styles were animated within the sequence
	    if (lang_1.isPresent(combinedStyles)) {
	        newSteps.push(new compile_metadata_1.CompileAnimationStyleMetadata(0, combinedStyles));
	    }
	    return newSteps;
	}
	function _resolveStylesFromState(stateName, stateStyles, errors) {
	    var styles = [];
	    if (stateName[0] != ':') {
	        errors.push(new AnimationParseError("Animation states via styles must be prefixed with a \":\""));
	    }
	    else {
	        var normalizedStateName = stateName.substring(1);
	        var value = stateStyles[normalizedStateName];
	        if (!lang_1.isPresent(value)) {
	            errors.push(new AnimationParseError("Unable to apply styles due to missing a state: \"" + normalizedStateName + "\""));
	        }
	        else {
	            value.styles.forEach(function (stylesEntry) {
	                if (lang_1.isStringMap(stylesEntry)) {
	                    styles.push(stylesEntry);
	                }
	            });
	        }
	    }
	    return styles;
	}
	var _AnimationTimings = (function () {
	    function _AnimationTimings(duration, delay, easing) {
	        this.duration = duration;
	        this.delay = delay;
	        this.easing = easing;
	    }
	    return _AnimationTimings;
	}());
	function _parseAnimationKeyframes(keyframeSequence, currentTime, collectedStyles, stateStyles, errors) {
	    var totalEntries = keyframeSequence.steps.length;
	    var totalOffsets = 0;
	    keyframeSequence.steps.forEach(function (step) { return totalOffsets += (lang_1.isPresent(step.offset) ? 1 : 0); });
	    if (totalOffsets > 0 && totalOffsets < totalEntries) {
	        errors.push(new AnimationParseError("Not all style() entries contain an offset for the provided keyframe()"));
	        totalOffsets = totalEntries;
	    }
	    var limit = totalEntries - 1;
	    var margin = totalOffsets == 0 ? (1 / limit) : 0;
	    var rawKeyframes = [];
	    var index = 0;
	    var doSortKeyframes = false;
	    var lastOffset = 0;
	    keyframeSequence.steps.forEach(function (styleMetadata) {
	        var offset = styleMetadata.offset;
	        var keyframeStyles = {};
	        styleMetadata.styles.forEach(function (entry) {
	            collection_1.StringMapWrapper.forEach(entry, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
	                if (prop != 'offset') {
	                    keyframeStyles[prop] = value;
	                }
	            });
	        });
	        if (lang_1.isPresent(offset)) {
	            doSortKeyframes = doSortKeyframes || (offset < lastOffset);
	        }
	        else {
	            offset = index == limit ? _TERMINAL_KEYFRAME : (margin * index);
	        }
	        rawKeyframes.push([offset, keyframeStyles]);
	        lastOffset = offset;
	        index++;
	    });
	    if (doSortKeyframes) {
	        collection_1.ListWrapper.sort(rawKeyframes, function (a, b) { return a[0] <= b[0] ? -1 : 1; });
	    }
	    var i;
	    var firstKeyframe = rawKeyframes[0];
	    if (firstKeyframe[0] != _INITIAL_KEYFRAME) {
	        collection_1.ListWrapper.insert(rawKeyframes, 0, firstKeyframe = [_INITIAL_KEYFRAME, {}]);
	    }
	    var firstKeyframeStyles = firstKeyframe[1];
	    var limit = rawKeyframes.length - 1;
	    var lastKeyframe = rawKeyframes[limit];
	    if (lastKeyframe[0] != _TERMINAL_KEYFRAME) {
	        rawKeyframes.push(lastKeyframe = [_TERMINAL_KEYFRAME, {}]);
	        limit++;
	    }
	    var lastKeyframeStyles = lastKeyframe[1];
	    for (i = 1; i <= limit; i++) {
	        var entry = rawKeyframes[i];
	        var styles = entry[1];
	        collection_1.StringMapWrapper.forEach(styles, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
	            if (!lang_1.isPresent(firstKeyframeStyles[prop])) {
	                firstKeyframeStyles[prop] = core_private_1.FILL_STYLE_FLAG;
	            }
	        });
	    }
	    for (i = limit - 1; i >= 0; i--) {
	        var entry = rawKeyframes[i];
	        var styles = entry[1];
	        collection_1.StringMapWrapper.forEach(styles, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
	            if (!lang_1.isPresent(lastKeyframeStyles[prop])) {
	                lastKeyframeStyles[prop] = value;
	            }
	        });
	    }
	    return rawKeyframes.map(function (entry) { return new animation_ast_1.AnimationKeyframeAst(entry[0], new animation_ast_1.AnimationStylesAst([entry[1]])); });
	}
	function _parseTransitionAnimation(entry, currentTime, collectedStyles, stateStyles, errors) {
	    var ast;
	    var playTime = 0;
	    var startingTime = currentTime;
	    if (entry instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
	        var maxDuration = 0;
	        var steps = [];
	        var isGroup = entry instanceof compile_metadata_1.CompileAnimationGroupMetadata;
	        var previousStyles;
	        entry.steps.forEach(function (entry) {
	            // these will get picked up by the next step...
	            var time = isGroup ? startingTime : currentTime;
	            if (entry instanceof compile_metadata_1.CompileAnimationStyleMetadata) {
	                entry.styles.forEach(function (stylesEntry) {
	                    // by this point we know that we only have stringmap values
	                    var map = stylesEntry;
	                    collection_1.StringMapWrapper.forEach(map, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
	                        collectedStyles.insertAtTime(prop, time, value);
	                    });
	                });
	                previousStyles = entry.styles;
	                return;
	            }
	            var innerAst = _parseTransitionAnimation(entry, time, collectedStyles, stateStyles, errors);
	            if (lang_1.isPresent(previousStyles)) {
	                if (entry instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
	                    var startingStyles = new animation_ast_1.AnimationStylesAst(previousStyles);
	                    steps.push(new animation_ast_1.AnimationStepAst(startingStyles, [], 0, 0, ''));
	                }
	                else {
	                    var innerStep = innerAst;
	                    collection_1.ListWrapper.addAll(innerStep.startingStyles.styles, previousStyles);
	                }
	                previousStyles = null;
	            }
	            var astDuration = innerAst.playTime;
	            currentTime += astDuration;
	            playTime += astDuration;
	            maxDuration = math_1.Math.max(astDuration, maxDuration);
	            steps.push(innerAst);
	        });
	        if (lang_1.isPresent(previousStyles)) {
	            var startingStyles = new animation_ast_1.AnimationStylesAst(previousStyles);
	            steps.push(new animation_ast_1.AnimationStepAst(startingStyles, [], 0, 0, ''));
	        }
	        if (isGroup) {
	            ast = new animation_ast_1.AnimationGroupAst(steps);
	            playTime = maxDuration;
	            currentTime = startingTime + playTime;
	        }
	        else {
	            ast = new animation_ast_1.AnimationSequenceAst(steps);
	        }
	    }
	    else if (entry instanceof compile_metadata_1.CompileAnimationAnimateMetadata) {
	        var timings = _parseTimeExpression(entry.timings, errors);
	        var styles = entry.styles;
	        var keyframes;
	        if (styles instanceof compile_metadata_1.CompileAnimationKeyframesSequenceMetadata) {
	            keyframes =
	                _parseAnimationKeyframes(styles, currentTime, collectedStyles, stateStyles, errors);
	        }
	        else {
	            var styleData = styles;
	            var offset = _TERMINAL_KEYFRAME;
	            var styleAst = new animation_ast_1.AnimationStylesAst(styleData.styles);
	            var keyframe = new animation_ast_1.AnimationKeyframeAst(offset, styleAst);
	            keyframes = [keyframe];
	        }
	        ast = new animation_ast_1.AnimationStepAst(new animation_ast_1.AnimationStylesAst([]), keyframes, timings.duration, timings.delay, timings.easing);
	        playTime = timings.duration + timings.delay;
	        currentTime += playTime;
	        keyframes.forEach(function (keyframe /** TODO #9100 */) { return keyframe.styles.styles.forEach(function (entry /** TODO #9100 */) { return collection_1.StringMapWrapper.forEach(entry, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
	            return collectedStyles.insertAtTime(prop, currentTime, value);
	        }); }); });
	    }
	    else {
	        // if the code reaches this stage then an error
	        // has already been populated within the _normalizeStyleSteps()
	        // operation...
	        ast = new animation_ast_1.AnimationStepAst(null, [], 0, 0, '');
	    }
	    ast.playTime = playTime;
	    ast.startTime = startingTime;
	    return ast;
	}
	function _fillAnimationAstStartingKeyframes(ast, collectedStyles, errors) {
	    // steps that only contain style will not be filled
	    if ((ast instanceof animation_ast_1.AnimationStepAst) && ast.keyframes.length > 0) {
	        var keyframes = ast.keyframes;
	        if (keyframes.length == 1) {
	            var endKeyframe = keyframes[0];
	            var startKeyframe = _createStartKeyframeFromEndKeyframe(endKeyframe, ast.startTime, ast.playTime, collectedStyles, errors);
	            ast.keyframes = [startKeyframe, endKeyframe];
	        }
	    }
	    else if (ast instanceof animation_ast_1.AnimationWithStepsAst) {
	        ast.steps.forEach(function (entry) { return _fillAnimationAstStartingKeyframes(entry, collectedStyles, errors); });
	    }
	}
	function _parseTimeExpression(exp, errors) {
	    var regex = /^([\.\d]+)(m?s)(?:\s+([\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?/gi;
	    var duration;
	    var delay = 0;
	    var easing = null;
	    if (lang_1.isString(exp)) {
	        var matches = lang_1.RegExpWrapper.firstMatch(regex, exp);
	        if (!lang_1.isPresent(matches)) {
	            errors.push(new AnimationParseError("The provided timing value \"" + exp + "\" is invalid."));
	            return new _AnimationTimings(0, 0, null);
	        }
	        var durationMatch = lang_1.NumberWrapper.parseFloat(matches[1]);
	        var durationUnit = matches[2];
	        if (durationUnit == 's') {
	            durationMatch *= _ONE_SECOND;
	        }
	        duration = math_1.Math.floor(durationMatch);
	        var delayMatch = matches[3];
	        var delayUnit = matches[4];
	        if (lang_1.isPresent(delayMatch)) {
	            var delayVal = lang_1.NumberWrapper.parseFloat(delayMatch);
	            if (lang_1.isPresent(delayUnit) && delayUnit == 's') {
	                delayVal *= _ONE_SECOND;
	            }
	            delay = math_1.Math.floor(delayVal);
	        }
	        var easingVal = matches[5];
	        if (!lang_1.isBlank(easingVal)) {
	            easing = easingVal;
	        }
	    }
	    else {
	        duration = exp;
	    }
	    return new _AnimationTimings(duration, delay, easing);
	}
	function _createStartKeyframeFromEndKeyframe(endKeyframe, startTime, duration, collectedStyles, errors) {
	    var values = {};
	    var endTime = startTime + duration;
	    endKeyframe.styles.styles.forEach(function (styleData) {
	        collection_1.StringMapWrapper.forEach(styleData, function (val /** TODO #9100 */, prop /** TODO #9100 */) {
	            if (prop == 'offset')
	                return;
	            var resultIndex = collectedStyles.indexOfAtOrBeforeTime(prop, startTime);
	            var resultEntry /** TODO #9100 */, nextEntry /** TODO #9100 */, value;
	            if (lang_1.isPresent(resultIndex)) {
	                resultEntry = collectedStyles.getByIndex(prop, resultIndex);
	                value = resultEntry.value;
	                nextEntry = collectedStyles.getByIndex(prop, resultIndex + 1);
	            }
	            else {
	                // this is a flag that the runtime code uses to pass
	                // in a value either from the state declaration styles
	                // or using the AUTO_STYLE value (e.g. getComputedStyle)
	                value = core_private_1.FILL_STYLE_FLAG;
	            }
	            if (lang_1.isPresent(nextEntry) && !nextEntry.matches(endTime, val)) {
	                errors.push(new AnimationParseError("The animated CSS property \"" + prop + "\" unexpectedly changes between steps \"" + resultEntry.time + "ms\" and \"" + endTime + "ms\" at \"" + nextEntry.time + "ms\""));
	            }
	            values[prop] = value;
	        });
	    });
	    return new animation_ast_1.AnimationKeyframeAst(_INITIAL_KEYFRAME, new animation_ast_1.AnimationStylesAst([values]));
	}
	//# sourceMappingURL=animation_parser.js.map

/***/ }),

/***/ 575:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	exports.Math = lang_1.global.Math;
	exports.NaN = typeof exports.NaN;
	//# sourceMappingURL=math.js.map

/***/ }),

/***/ 576:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var StylesCollectionEntry = (function () {
	    function StylesCollectionEntry(time, value) {
	        this.time = time;
	        this.value = value;
	    }
	    StylesCollectionEntry.prototype.matches = function (time, value) {
	        return time == this.time && value == this.value;
	    };
	    return StylesCollectionEntry;
	}());
	exports.StylesCollectionEntry = StylesCollectionEntry;
	var StylesCollection = (function () {
	    function StylesCollection() {
	        this.styles = {};
	    }
	    StylesCollection.prototype.insertAtTime = function (property, time, value) {
	        var tuple = new StylesCollectionEntry(time, value);
	        var entries = this.styles[property];
	        if (!lang_1.isPresent(entries)) {
	            entries = this.styles[property] = [];
	        }
	        // insert this at the right stop in the array
	        // this way we can keep it sorted
	        var insertionIndex = 0;
	        for (var i = entries.length - 1; i >= 0; i--) {
	            if (entries[i].time <= time) {
	                insertionIndex = i + 1;
	                break;
	            }
	        }
	        collection_1.ListWrapper.insert(entries, insertionIndex, tuple);
	    };
	    StylesCollection.prototype.getByIndex = function (property, index) {
	        var items = this.styles[property];
	        if (lang_1.isPresent(items)) {
	            return index >= items.length ? null : items[index];
	        }
	        return null;
	    };
	    StylesCollection.prototype.indexOfAtOrBeforeTime = function (property, time) {
	        var entries = this.styles[property];
	        if (lang_1.isPresent(entries)) {
	            for (var i = entries.length - 1; i >= 0; i--) {
	                if (entries[i].time <= time)
	                    return i;
	            }
	        }
	        return null;
	    };
	    return StylesCollection;
	}());
	exports.StylesCollection = StylesCollection;
	//# sourceMappingURL=styles_collection.js.map

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var template_ast_1 = __webpack_require__(541);
	var constants_1 = __webpack_require__(578);
	var compile_metadata_1 = __webpack_require__(565);
	var util_1 = __webpack_require__(579);
	var compile_query_1 = __webpack_require__(580);
	var compile_method_1 = __webpack_require__(581);
	var util_2 = __webpack_require__(563);
	var CompileNode = (function () {
	    function CompileNode(parent, view, nodeIndex, renderNode, sourceAst) {
	        this.parent = parent;
	        this.view = view;
	        this.nodeIndex = nodeIndex;
	        this.renderNode = renderNode;
	        this.sourceAst = sourceAst;
	    }
	    CompileNode.prototype.isNull = function () { return lang_1.isBlank(this.renderNode); };
	    CompileNode.prototype.isRootElement = function () { return this.view != this.parent.view; };
	    return CompileNode;
	}());
	exports.CompileNode = CompileNode;
	var CompileElement = (function (_super) {
	    __extends(CompileElement, _super);
	    function CompileElement(parent, view, nodeIndex, renderNode, sourceAst, component, _directives, _resolvedProvidersArray, hasViewContainer, hasEmbeddedView, references) {
	        var _this = this;
	        _super.call(this, parent, view, nodeIndex, renderNode, sourceAst);
	        this.component = component;
	        this._directives = _directives;
	        this._resolvedProvidersArray = _resolvedProvidersArray;
	        this.hasViewContainer = hasViewContainer;
	        this.hasEmbeddedView = hasEmbeddedView;
	        this._compViewExpr = null;
	        this._instances = new compile_metadata_1.CompileTokenMap();
	        this._queryCount = 0;
	        this._queries = new compile_metadata_1.CompileTokenMap();
	        this._componentConstructorViewQueryLists = [];
	        this.contentNodesByNgContentIndex = null;
	        this.referenceTokens = {};
	        references.forEach(function (ref) { return _this.referenceTokens[ref.name] = ref.value; });
	        this.elementRef = o.importExpr(identifiers_1.Identifiers.ElementRef).instantiate([this.renderNode]);
	        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ElementRef), this.elementRef);
	        this.injector = o.THIS_EXPR.callMethod('injector', [o.literal(this.nodeIndex)]);
	        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector), this.injector);
	        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.Renderer), o.THIS_EXPR.prop('renderer'));
	        if (this.hasViewContainer || this.hasEmbeddedView || lang_1.isPresent(this.component)) {
	            this._createAppElement();
	        }
	    }
	    CompileElement.createNull = function () {
	        return new CompileElement(null, null, null, null, null, null, [], [], false, false, []);
	    };
	    CompileElement.prototype._createAppElement = function () {
	        var fieldName = "_appEl_" + this.nodeIndex;
	        var parentNodeIndex = this.isRootElement() ? null : this.parent.nodeIndex;
	        // private is fine here as no child view will reference an AppElement
	        this.view.fields.push(new o.ClassField(fieldName, o.importType(identifiers_1.Identifiers.AppElement), [o.StmtModifier.Private]));
	        var statement = o.THIS_EXPR.prop(fieldName)
	            .set(o.importExpr(identifiers_1.Identifiers.AppElement).instantiate([
	            o.literal(this.nodeIndex), o.literal(parentNodeIndex), o.THIS_EXPR, this.renderNode
	        ]))
	            .toStmt();
	        this.view.createMethod.addStmt(statement);
	        this.appElement = o.THIS_EXPR.prop(fieldName);
	        this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.AppElement), this.appElement);
	    };
	    CompileElement.prototype.createComponentFactoryResolver = function (precompileComponent) {
	        if (!precompileComponent || precompileComponent.length === 0) {
	            return;
	        }
	        var createComponentFactoryResolverExpr = o.importExpr(identifiers_1.Identifiers.CodegenComponentFactoryResolver).instantiate([
	            o.literalArr(precompileComponent.map(function (precompiledComponent) { return o.importExpr(precompiledComponent); })),
	            util_1.injectFromViewParentInjector(identifiers_1.identifierToken(identifiers_1.Identifiers.ComponentFactoryResolver), false)
	        ]);
	        var provider = new compile_metadata_1.CompileProviderMetadata({
	            token: identifiers_1.identifierToken(identifiers_1.Identifiers.ComponentFactoryResolver),
	            useValue: createComponentFactoryResolverExpr
	        });
	        // Add ComponentFactoryResolver as first provider as it does not have deps on other providers
	        // ProviderAstType.PrivateService as only the component and its view can see it,
	        // but nobody else
	        this._resolvedProvidersArray.unshift(new template_ast_1.ProviderAst(provider.token, false, true, [provider], template_ast_1.ProviderAstType.PrivateService, this.sourceAst.sourceSpan));
	    };
	    CompileElement.prototype.setComponentView = function (compViewExpr) {
	        this._compViewExpr = compViewExpr;
	        this.contentNodesByNgContentIndex =
	            collection_1.ListWrapper.createFixedSize(this.component.template.ngContentSelectors.length);
	        for (var i = 0; i < this.contentNodesByNgContentIndex.length; i++) {
	            this.contentNodesByNgContentIndex[i] = [];
	        }
	    };
	    CompileElement.prototype.setEmbeddedView = function (embeddedView) {
	        this.embeddedView = embeddedView;
	        if (lang_1.isPresent(embeddedView)) {
	            var createTemplateRefExpr = o.importExpr(identifiers_1.Identifiers.TemplateRef_).instantiate([
	                this.appElement, this.embeddedView.viewFactory
	            ]);
	            var provider = new compile_metadata_1.CompileProviderMetadata({ token: identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef), useValue: createTemplateRefExpr });
	            // Add TemplateRef as first provider as it does not have deps on other providers
	            this._resolvedProvidersArray.unshift(new template_ast_1.ProviderAst(provider.token, false, true, [provider], template_ast_1.ProviderAstType.Builtin, this.sourceAst.sourceSpan));
	        }
	    };
	    CompileElement.prototype.beforeChildren = function () {
	        var _this = this;
	        if (this.hasViewContainer) {
	            this._instances.add(identifiers_1.identifierToken(identifiers_1.Identifiers.ViewContainerRef), this.appElement.prop('vcRef'));
	        }
	        this._resolvedProviders = new compile_metadata_1.CompileTokenMap();
	        this._resolvedProvidersArray.forEach(function (provider) { return _this._resolvedProviders.add(provider.token, provider); });
	        // create all the provider instances, some in the view constructor,
	        // some as getters. We rely on the fact that they are already sorted topologically.
	        this._resolvedProviders.values().forEach(function (resolvedProvider) {
	            var providerValueExpressions = resolvedProvider.providers.map(function (provider) {
	                if (lang_1.isPresent(provider.useExisting)) {
	                    return _this._getDependency(resolvedProvider.providerType, new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }));
	                }
	                else if (lang_1.isPresent(provider.useFactory)) {
	                    var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
	                    var depsExpr = deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep); });
	                    return o.importExpr(provider.useFactory).callFn(depsExpr);
	                }
	                else if (lang_1.isPresent(provider.useClass)) {
	                    var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
	                    var depsExpr = deps.map(function (dep) { return _this._getDependency(resolvedProvider.providerType, dep); });
	                    return o.importExpr(provider.useClass)
	                        .instantiate(depsExpr, o.importType(provider.useClass));
	                }
	                else {
	                    return _convertValueToOutputAst(provider.useValue);
	                }
	            });
	            var propName = "_" + resolvedProvider.token.name + "_" + _this.nodeIndex + "_" + _this._instances.size;
	            var instance = createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager, _this);
	            _this._instances.add(resolvedProvider.token, instance);
	        });
	        this.directiveInstances =
	            this._directives.map(function (directive) { return _this._instances.get(identifiers_1.identifierToken(directive.type)); });
	        for (var i = 0; i < this.directiveInstances.length; i++) {
	            var directiveInstance = this.directiveInstances[i];
	            var directive = this._directives[i];
	            directive.queries.forEach(function (queryMeta) { _this._addQuery(queryMeta, directiveInstance); });
	        }
	        var queriesWithReads = [];
	        this._resolvedProviders.values().forEach(function (resolvedProvider) {
	            var queriesForProvider = _this._getQueriesFor(resolvedProvider.token);
	            collection_1.ListWrapper.addAll(queriesWithReads, queriesForProvider.map(function (query) { return new _QueryWithRead(query, resolvedProvider.token); }));
	        });
	        collection_1.StringMapWrapper.forEach(this.referenceTokens, function (_, varName) {
	            var token = _this.referenceTokens[varName];
	            var varValue;
	            if (lang_1.isPresent(token)) {
	                varValue = _this._instances.get(token);
	            }
	            else {
	                varValue = _this.renderNode;
	            }
	            _this.view.locals.set(varName, varValue);
	            var varToken = new compile_metadata_1.CompileTokenMetadata({ value: varName });
	            collection_1.ListWrapper.addAll(queriesWithReads, _this._getQueriesFor(varToken).map(function (query) { return new _QueryWithRead(query, varToken); }));
	        });
	        queriesWithReads.forEach(function (queryWithRead) {
	            var value;
	            if (lang_1.isPresent(queryWithRead.read.identifier)) {
	                // query for an identifier
	                value = _this._instances.get(queryWithRead.read);
	            }
	            else {
	                // query for a reference
	                var token = _this.referenceTokens[queryWithRead.read.value];
	                if (lang_1.isPresent(token)) {
	                    value = _this._instances.get(token);
	                }
	                else {
	                    value = _this.elementRef;
	                }
	            }
	            if (lang_1.isPresent(value)) {
	                queryWithRead.query.addValue(value, _this.view);
	            }
	        });
	        if (lang_1.isPresent(this.component)) {
	            var componentConstructorViewQueryList = lang_1.isPresent(this.component) ?
	                o.literalArr(this._componentConstructorViewQueryLists) :
	                o.NULL_EXPR;
	            var compExpr = lang_1.isPresent(this.getComponent()) ? this.getComponent() : o.NULL_EXPR;
	            this.view.createMethod.addStmt(this.appElement
	                .callMethod('initComponent', [compExpr, componentConstructorViewQueryList, this._compViewExpr])
	                .toStmt());
	        }
	    };
	    CompileElement.prototype.afterChildren = function (childNodeCount) {
	        var _this = this;
	        this._resolvedProviders.values().forEach(function (resolvedProvider) {
	            // Note: afterChildren is called after recursing into children.
	            // This is good so that an injector match in an element that is closer to a requesting element
	            // matches first.
	            var providerExpr = _this._instances.get(resolvedProvider.token);
	            // Note: view providers are only visible on the injector of that element.
	            // This is not fully correct as the rules during codegen don't allow a directive
	            // to get hold of a view provdier on the same element. We still do this semantic
	            // as it simplifies our model to having only one runtime injector per element.
	            var providerChildNodeCount = resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService ? 0 : childNodeCount;
	            _this.view.injectorGetMethod.addStmt(createInjectInternalCondition(_this.nodeIndex, providerChildNodeCount, resolvedProvider, providerExpr));
	        });
	        this._queries.values().forEach(function (queries) { return queries.forEach(function (query) {
	            return query.afterChildren(_this.view.createMethod, _this.view.updateContentQueriesMethod);
	        }); });
	    };
	    CompileElement.prototype.addContentNode = function (ngContentIndex, nodeExpr) {
	        this.contentNodesByNgContentIndex[ngContentIndex].push(nodeExpr);
	    };
	    CompileElement.prototype.getComponent = function () {
	        return lang_1.isPresent(this.component) ? this._instances.get(identifiers_1.identifierToken(this.component.type)) :
	            null;
	    };
	    CompileElement.prototype.getProviderTokens = function () {
	        return this._resolvedProviders.values().map(function (resolvedProvider) { return util_1.createDiTokenExpression(resolvedProvider.token); });
	    };
	    CompileElement.prototype._getQueriesFor = function (token) {
	        var result = [];
	        var currentEl = this;
	        var distance = 0;
	        var queries;
	        while (!currentEl.isNull()) {
	            queries = currentEl._queries.get(token);
	            if (lang_1.isPresent(queries)) {
	                collection_1.ListWrapper.addAll(result, queries.filter(function (query) { return query.meta.descendants || distance <= 1; }));
	            }
	            if (currentEl._directives.length > 0) {
	                distance++;
	            }
	            currentEl = currentEl.parent;
	        }
	        queries = this.view.componentView.viewQueries.get(token);
	        if (lang_1.isPresent(queries)) {
	            collection_1.ListWrapper.addAll(result, queries);
	        }
	        return result;
	    };
	    CompileElement.prototype._addQuery = function (queryMeta, directiveInstance) {
	        var propName = "_query_" + queryMeta.selectors[0].name + "_" + this.nodeIndex + "_" + this._queryCount++;
	        var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, this.view);
	        var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, this.view);
	        compile_query_1.addQueryToTokenMap(this._queries, query);
	        return query;
	    };
	    CompileElement.prototype._getLocalDependency = function (requestingProviderType, dep) {
	        var result = null;
	        // constructor content query
	        if (lang_1.isBlank(result) && lang_1.isPresent(dep.query)) {
	            result = this._addQuery(dep.query, null).queryList;
	        }
	        // constructor view query
	        if (lang_1.isBlank(result) && lang_1.isPresent(dep.viewQuery)) {
	            result = compile_query_1.createQueryList(dep.viewQuery, null, "_viewQuery_" + dep.viewQuery.selectors[0].name + "_" + this.nodeIndex + "_" + this._componentConstructorViewQueryLists.length, this.view);
	            this._componentConstructorViewQueryLists.push(result);
	        }
	        if (lang_1.isPresent(dep.token)) {
	            // access builtins with special visibility
	            if (lang_1.isBlank(result)) {
	                if (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
	                    if (requestingProviderType === template_ast_1.ProviderAstType.Component) {
	                        return this._compViewExpr.prop('ref');
	                    }
	                    else {
	                        return util_1.getPropertyInView(o.THIS_EXPR.prop('ref'), this.view, this.view.componentView);
	                    }
	                }
	            }
	            // access regular providers on the element
	            if (lang_1.isBlank(result)) {
	                var resolvedProvider = this._resolvedProviders.get(dep.token);
	                // don't allow directives / public services to access private services.
	                // only components and private services can access private services.
	                if (resolvedProvider && (requestingProviderType === template_ast_1.ProviderAstType.Directive ||
	                    requestingProviderType === template_ast_1.ProviderAstType.PublicService) &&
	                    resolvedProvider.providerType === template_ast_1.ProviderAstType.PrivateService) {
	                    return null;
	                }
	                result = this._instances.get(dep.token);
	            }
	        }
	        return result;
	    };
	    CompileElement.prototype._getDependency = function (requestingProviderType, dep) {
	        var currElement = this;
	        var result = null;
	        if (dep.isValue) {
	            result = o.literal(dep.value);
	        }
	        if (lang_1.isBlank(result) && !dep.isSkipSelf) {
	            result = this._getLocalDependency(requestingProviderType, dep);
	        }
	        // check parent elements
	        while (lang_1.isBlank(result) && !currElement.parent.isNull()) {
	            currElement = currElement.parent;
	            result = currElement._getLocalDependency(template_ast_1.ProviderAstType.PublicService, new compile_metadata_1.CompileDiDependencyMetadata({ token: dep.token }));
	        }
	        if (lang_1.isBlank(result)) {
	            result = util_1.injectFromViewParentInjector(dep.token, dep.isOptional);
	        }
	        if (lang_1.isBlank(result)) {
	            result = o.NULL_EXPR;
	        }
	        return util_1.getPropertyInView(result, this.view, currElement.view);
	    };
	    return CompileElement;
	}(CompileNode));
	exports.CompileElement = CompileElement;
	function createInjectInternalCondition(nodeIndex, childNodeCount, provider, providerExpr) {
	    var indexCondition;
	    if (childNodeCount > 0) {
	        indexCondition = o.literal(nodeIndex)
	            .lowerEquals(constants_1.InjectMethodVars.requestNodeIndex)
	            .and(constants_1.InjectMethodVars.requestNodeIndex.lowerEquals(o.literal(nodeIndex + childNodeCount)));
	    }
	    else {
	        indexCondition = o.literal(nodeIndex).identical(constants_1.InjectMethodVars.requestNodeIndex);
	    }
	    return new o.IfStmt(constants_1.InjectMethodVars.token.identical(util_1.createDiTokenExpression(provider.token)).and(indexCondition), [new o.ReturnStatement(providerExpr)]);
	}
	function createProviderProperty(propName, provider, providerValueExpressions, isMulti, isEager, compileElement) {
	    var view = compileElement.view;
	    var resolvedProviderValueExpr;
	    var type;
	    if (isMulti) {
	        resolvedProviderValueExpr = o.literalArr(providerValueExpressions);
	        type = new o.ArrayType(o.DYNAMIC_TYPE);
	    }
	    else {
	        resolvedProviderValueExpr = providerValueExpressions[0];
	        type = providerValueExpressions[0].type;
	    }
	    if (lang_1.isBlank(type)) {
	        type = o.DYNAMIC_TYPE;
	    }
	    if (isEager) {
	        view.fields.push(new o.ClassField(propName, type));
	        view.createMethod.addStmt(o.THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
	    }
	    else {
	        var internalField = "_" + propName;
	        view.fields.push(new o.ClassField(internalField, type));
	        var getter = new compile_method_1.CompileMethod(view);
	        getter.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
	        // Note: Equals is important for JS so that it also checks the undefined case!
	        getter.addStmt(new o.IfStmt(o.THIS_EXPR.prop(internalField).isBlank(), [o.THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]));
	        getter.addStmt(new o.ReturnStatement(o.THIS_EXPR.prop(internalField)));
	        view.getters.push(new o.ClassGetter(propName, getter.finish(), type));
	    }
	    return o.THIS_EXPR.prop(propName);
	}
	var _QueryWithRead = (function () {
	    function _QueryWithRead(query, match) {
	        this.query = query;
	        this.read = lang_1.isPresent(query.meta.read) ? query.meta.read : match;
	    }
	    return _QueryWithRead;
	}());
	function _convertValueToOutputAst(value) {
	    return util_2.visitValue(value, new _ValueOutputAstTransformer(), null);
	}
	var _ValueOutputAstTransformer = (function (_super) {
	    __extends(_ValueOutputAstTransformer, _super);
	    function _ValueOutputAstTransformer() {
	        _super.apply(this, arguments);
	    }
	    _ValueOutputAstTransformer.prototype.visitArray = function (arr, context) {
	        var _this = this;
	        return o.literalArr(arr.map(function (value) { return util_2.visitValue(value, _this, context); }));
	    };
	    _ValueOutputAstTransformer.prototype.visitStringMap = function (map, context) {
	        var _this = this;
	        var entries = [];
	        collection_1.StringMapWrapper.forEach(map, function (value, key) {
	            entries.push([key, util_2.visitValue(value, _this, context)]);
	        });
	        return o.literalMap(entries);
	    };
	    _ValueOutputAstTransformer.prototype.visitPrimitive = function (value, context) { return o.literal(value); };
	    _ValueOutputAstTransformer.prototype.visitOther = function (value, context) {
	        if (value instanceof compile_metadata_1.CompileIdentifierMetadata) {
	            return o.importExpr(value);
	        }
	        else if (value instanceof o.Expression) {
	            return value;
	        }
	        else {
	            throw new core_1.BaseException("Illegal state: Don't now how to compile value " + value);
	        }
	    };
	    return _ValueOutputAstTransformer;
	}(util_2.ValueTransformer));
	//# sourceMappingURL=compile_element.js.map

/***/ }),

/***/ 578:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var compile_metadata_1 = __webpack_require__(565);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	function _enumExpression(classIdentifier, value) {
	    if (lang_1.isBlank(value))
	        return o.NULL_EXPR;
	    var name = lang_1.resolveEnumToken(classIdentifier.runtime, value);
	    return o.importExpr(new compile_metadata_1.CompileIdentifierMetadata({
	        name: classIdentifier.name + "." + name,
	        moduleUrl: classIdentifier.moduleUrl,
	        runtime: value
	    }));
	}
	var ViewTypeEnum = (function () {
	    function ViewTypeEnum() {
	    }
	    ViewTypeEnum.fromValue = function (value) {
	        return _enumExpression(identifiers_1.Identifiers.ViewType, value);
	    };
	    ViewTypeEnum.HOST = ViewTypeEnum.fromValue(core_private_1.ViewType.HOST);
	    ViewTypeEnum.COMPONENT = ViewTypeEnum.fromValue(core_private_1.ViewType.COMPONENT);
	    ViewTypeEnum.EMBEDDED = ViewTypeEnum.fromValue(core_private_1.ViewType.EMBEDDED);
	    return ViewTypeEnum;
	}());
	exports.ViewTypeEnum = ViewTypeEnum;
	var ViewEncapsulationEnum = (function () {
	    function ViewEncapsulationEnum() {
	    }
	    ViewEncapsulationEnum.fromValue = function (value) {
	        return _enumExpression(identifiers_1.Identifiers.ViewEncapsulation, value);
	    };
	    ViewEncapsulationEnum.Emulated = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.Emulated);
	    ViewEncapsulationEnum.Native = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.Native);
	    ViewEncapsulationEnum.None = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.None);
	    return ViewEncapsulationEnum;
	}());
	exports.ViewEncapsulationEnum = ViewEncapsulationEnum;
	var ChangeDetectionStrategyEnum = (function () {
	    function ChangeDetectionStrategyEnum() {
	    }
	    ChangeDetectionStrategyEnum.fromValue = function (value) {
	        return _enumExpression(identifiers_1.Identifiers.ChangeDetectionStrategy, value);
	    };
	    ChangeDetectionStrategyEnum.OnPush = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.OnPush);
	    ChangeDetectionStrategyEnum.Default = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.Default);
	    return ChangeDetectionStrategyEnum;
	}());
	exports.ChangeDetectionStrategyEnum = ChangeDetectionStrategyEnum;
	var ChangeDetectorStatusEnum = (function () {
	    function ChangeDetectorStatusEnum() {
	    }
	    ChangeDetectorStatusEnum.fromValue = function (value) {
	        return _enumExpression(identifiers_1.Identifiers.ChangeDetectorStatus, value);
	    };
	    ChangeDetectorStatusEnum.CheckOnce = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.CheckOnce);
	    ChangeDetectorStatusEnum.Checked = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Checked);
	    ChangeDetectorStatusEnum.CheckAlways = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.CheckAlways);
	    ChangeDetectorStatusEnum.Detached = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Detached);
	    ChangeDetectorStatusEnum.Errored = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Errored);
	    ChangeDetectorStatusEnum.Destroyed = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Destroyed);
	    return ChangeDetectorStatusEnum;
	}());
	exports.ChangeDetectorStatusEnum = ChangeDetectorStatusEnum;
	var ViewConstructorVars = (function () {
	    function ViewConstructorVars() {
	    }
	    ViewConstructorVars.viewUtils = o.variable('viewUtils');
	    ViewConstructorVars.parentInjector = o.variable('parentInjector');
	    ViewConstructorVars.declarationEl = o.variable('declarationEl');
	    return ViewConstructorVars;
	}());
	exports.ViewConstructorVars = ViewConstructorVars;
	var ViewProperties = (function () {
	    function ViewProperties() {
	    }
	    ViewProperties.renderer = o.THIS_EXPR.prop('renderer');
	    ViewProperties.projectableNodes = o.THIS_EXPR.prop('projectableNodes');
	    ViewProperties.viewUtils = o.THIS_EXPR.prop('viewUtils');
	    return ViewProperties;
	}());
	exports.ViewProperties = ViewProperties;
	var EventHandlerVars = (function () {
	    function EventHandlerVars() {
	    }
	    EventHandlerVars.event = o.variable('$event');
	    return EventHandlerVars;
	}());
	exports.EventHandlerVars = EventHandlerVars;
	var InjectMethodVars = (function () {
	    function InjectMethodVars() {
	    }
	    InjectMethodVars.token = o.variable('token');
	    InjectMethodVars.requestNodeIndex = o.variable('requestNodeIndex');
	    InjectMethodVars.notFoundResult = o.variable('notFoundResult');
	    return InjectMethodVars;
	}());
	exports.InjectMethodVars = InjectMethodVars;
	var DetectChangesVars = (function () {
	    function DetectChangesVars() {
	    }
	    DetectChangesVars.throwOnChange = o.variable("throwOnChange");
	    DetectChangesVars.changes = o.variable("changes");
	    DetectChangesVars.changed = o.variable("changed");
	    DetectChangesVars.valUnwrapper = o.variable("valUnwrapper");
	    return DetectChangesVars;
	}());
	exports.DetectChangesVars = DetectChangesVars;
	//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 579:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var o = __webpack_require__(570);
	var identifiers_1 = __webpack_require__(564);
	function getPropertyInView(property, callingView, definedView) {
	    if (callingView === definedView) {
	        return property;
	    }
	    else {
	        var viewProp = o.THIS_EXPR;
	        var currView = callingView;
	        while (currView !== definedView && lang_1.isPresent(currView.declarationElement.view)) {
	            currView = currView.declarationElement.view;
	            viewProp = viewProp.prop('parent');
	        }
	        if (currView !== definedView) {
	            throw new exceptions_1.BaseException("Internal error: Could not calculate a property in a parent view: " + property);
	        }
	        if (property instanceof o.ReadPropExpr) {
	            var readPropExpr_1 = property;
	            // Note: Don't cast for members of the AppView base class...
	            if (definedView.fields.some(function (field) { return field.name == readPropExpr_1.name; }) ||
	                definedView.getters.some(function (field) { return field.name == readPropExpr_1.name; })) {
	                viewProp = viewProp.cast(definedView.classType);
	            }
	        }
	        return o.replaceVarInExpression(o.THIS_EXPR.name, viewProp, property);
	    }
	}
	exports.getPropertyInView = getPropertyInView;
	function injectFromViewParentInjector(token, optional) {
	    var args = [createDiTokenExpression(token)];
	    if (optional) {
	        args.push(o.NULL_EXPR);
	    }
	    return o.THIS_EXPR.prop('parentInjector').callMethod('get', args);
	}
	exports.injectFromViewParentInjector = injectFromViewParentInjector;
	function getViewFactoryName(component, embeddedTemplateIndex) {
	    return "viewFactory_" + component.type.name + embeddedTemplateIndex;
	}
	exports.getViewFactoryName = getViewFactoryName;
	function createDiTokenExpression(token) {
	    if (lang_1.isPresent(token.value)) {
	        return o.literal(token.value);
	    }
	    else if (token.identifierIsInstance) {
	        return o.importExpr(token.identifier)
	            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
	    }
	    else {
	        return o.importExpr(token.identifier);
	    }
	}
	exports.createDiTokenExpression = createDiTokenExpression;
	function createFlatArray(expressions) {
	    var lastNonArrayExpressions = [];
	    var result = o.literalArr([]);
	    for (var i = 0; i < expressions.length; i++) {
	        var expr = expressions[i];
	        if (expr.type instanceof o.ArrayType) {
	            if (lastNonArrayExpressions.length > 0) {
	                result =
	                    result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
	                lastNonArrayExpressions = [];
	            }
	            result = result.callMethod(o.BuiltinMethod.ConcatArray, [expr]);
	        }
	        else {
	            lastNonArrayExpressions.push(expr);
	        }
	    }
	    if (lastNonArrayExpressions.length > 0) {
	        result =
	            result.callMethod(o.BuiltinMethod.ConcatArray, [o.literalArr(lastNonArrayExpressions)]);
	    }
	    return result;
	}
	exports.createFlatArray = createFlatArray;
	function createPureProxy(fn, argCount, pureProxyProp, view) {
	    view.fields.push(new o.ClassField(pureProxyProp.name, null));
	    var pureProxyId = argCount < identifiers_1.Identifiers.pureProxies.length ? identifiers_1.Identifiers.pureProxies[argCount] : null;
	    if (lang_1.isBlank(pureProxyId)) {
	        throw new exceptions_1.BaseException("Unsupported number of argument for pure functions: " + argCount);
	    }
	    view.createMethod.addStmt(o.THIS_EXPR.prop(pureProxyProp.name).set(o.importExpr(pureProxyId).callFn([fn])).toStmt());
	}
	exports.createPureProxy = createPureProxy;
	//# sourceMappingURL=util.js.map

/***/ }),

/***/ 580:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var util_1 = __webpack_require__(579);
	var ViewQueryValues = (function () {
	    function ViewQueryValues(view, values) {
	        this.view = view;
	        this.values = values;
	    }
	    return ViewQueryValues;
	}());
	var CompileQuery = (function () {
	    function CompileQuery(meta, queryList, ownerDirectiveExpression, view) {
	        this.meta = meta;
	        this.queryList = queryList;
	        this.ownerDirectiveExpression = ownerDirectiveExpression;
	        this.view = view;
	        this._values = new ViewQueryValues(view, []);
	    }
	    CompileQuery.prototype.addValue = function (value, view) {
	        var currentView = view;
	        var elPath = [];
	        while (lang_1.isPresent(currentView) && currentView !== this.view) {
	            var parentEl = currentView.declarationElement;
	            elPath.unshift(parentEl);
	            currentView = parentEl.view;
	        }
	        var queryListForDirtyExpr = util_1.getPropertyInView(this.queryList, view, this.view);
	        var viewValues = this._values;
	        elPath.forEach(function (el) {
	            var last = viewValues.values.length > 0 ? viewValues.values[viewValues.values.length - 1] : null;
	            if (last instanceof ViewQueryValues && last.view === el.embeddedView) {
	                viewValues = last;
	            }
	            else {
	                var newViewValues = new ViewQueryValues(el.embeddedView, []);
	                viewValues.values.push(newViewValues);
	                viewValues = newViewValues;
	            }
	        });
	        viewValues.values.push(value);
	        if (elPath.length > 0) {
	            view.dirtyParentQueriesMethod.addStmt(queryListForDirtyExpr.callMethod('setDirty', []).toStmt());
	        }
	    };
	    CompileQuery.prototype._isStatic = function () {
	        return !this._values.values.some(function (value) { return value instanceof ViewQueryValues; });
	    };
	    CompileQuery.prototype.afterChildren = function (targetStaticMethod /** TODO #9100 */, targetDynamicMethod) {
	        var values = createQueryValues(this._values);
	        var updateStmts = [this.queryList.callMethod('reset', [o.literalArr(values)]).toStmt()];
	        if (lang_1.isPresent(this.ownerDirectiveExpression)) {
	            var valueExpr = this.meta.first ? this.queryList.prop('first') : this.queryList;
	            updateStmts.push(this.ownerDirectiveExpression.prop(this.meta.propertyName).set(valueExpr).toStmt());
	        }
	        if (!this.meta.first) {
	            updateStmts.push(this.queryList.callMethod('notifyOnChanges', []).toStmt());
	        }
	        if (this.meta.first && this._isStatic()) {
	            // for queries that don't change and the user asked for a single element,
	            // set it immediately. That is e.g. needed for querying for ViewContainerRefs, ...
	            // we don't do this for QueryLists for now as this would break the timing when
	            // we call QueryList listeners...
	            targetStaticMethod.addStmts(updateStmts);
	        }
	        else {
	            targetDynamicMethod.addStmt(new o.IfStmt(this.queryList.prop('dirty'), updateStmts));
	        }
	    };
	    return CompileQuery;
	}());
	exports.CompileQuery = CompileQuery;
	function createQueryValues(viewValues) {
	    return collection_1.ListWrapper.flatten(viewValues.values.map(function (entry) {
	        if (entry instanceof ViewQueryValues) {
	            return mapNestedViews(entry.view.declarationElement.appElement, entry.view, createQueryValues(entry));
	        }
	        else {
	            return entry;
	        }
	    }));
	}
	function mapNestedViews(declarationAppElement, view, expressions) {
	    var adjustedExpressions = expressions.map(function (expr) {
	        return o.replaceVarInExpression(o.THIS_EXPR.name, o.variable('nestedView'), expr);
	    });
	    return declarationAppElement.callMethod('mapNestedViews', [
	        o.variable(view.className), o.fn([new o.FnParam('nestedView', view.classType)], [new o.ReturnStatement(o.literalArr(adjustedExpressions))])
	    ]);
	}
	function createQueryList(query, directiveInstance, propertyName, compileView) {
	    compileView.fields.push(new o.ClassField(propertyName, o.importType(identifiers_1.Identifiers.QueryList, [o.DYNAMIC_TYPE])));
	    var expr = o.THIS_EXPR.prop(propertyName);
	    compileView.createMethod.addStmt(o.THIS_EXPR.prop(propertyName)
	        .set(o.importExpr(identifiers_1.Identifiers.QueryList, [o.DYNAMIC_TYPE]).instantiate([]))
	        .toStmt());
	    return expr;
	}
	exports.createQueryList = createQueryList;
	function addQueryToTokenMap(map, query) {
	    query.meta.selectors.forEach(function (selector) {
	        var entry = map.get(selector);
	        if (lang_1.isBlank(entry)) {
	            entry = [];
	            map.add(selector, entry);
	        }
	        entry.push(query);
	    });
	}
	exports.addQueryToTokenMap = addQueryToTokenMap;
	//# sourceMappingURL=compile_query.js.map

/***/ }),

/***/ 581:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var o = __webpack_require__(570);
	var _DebugState = (function () {
	    function _DebugState(nodeIndex, sourceAst) {
	        this.nodeIndex = nodeIndex;
	        this.sourceAst = sourceAst;
	    }
	    return _DebugState;
	}());
	var NULL_DEBUG_STATE = new _DebugState(null, null);
	var CompileMethod = (function () {
	    function CompileMethod(_view) {
	        this._view = _view;
	        this._newState = NULL_DEBUG_STATE;
	        this._currState = NULL_DEBUG_STATE;
	        this._bodyStatements = [];
	        this._debugEnabled = this._view.genConfig.genDebugInfo;
	    }
	    CompileMethod.prototype._updateDebugContextIfNeeded = function () {
	        if (this._newState.nodeIndex !== this._currState.nodeIndex ||
	            this._newState.sourceAst !== this._currState.sourceAst) {
	            var expr = this._updateDebugContext(this._newState);
	            if (lang_1.isPresent(expr)) {
	                this._bodyStatements.push(expr.toStmt());
	            }
	        }
	    };
	    CompileMethod.prototype._updateDebugContext = function (newState) {
	        this._currState = this._newState = newState;
	        if (this._debugEnabled) {
	            var sourceLocation = lang_1.isPresent(newState.sourceAst) ? newState.sourceAst.sourceSpan.start : null;
	            return o.THIS_EXPR.callMethod('debug', [
	                o.literal(newState.nodeIndex),
	                lang_1.isPresent(sourceLocation) ? o.literal(sourceLocation.line) : o.NULL_EXPR,
	                lang_1.isPresent(sourceLocation) ? o.literal(sourceLocation.col) : o.NULL_EXPR
	            ]);
	        }
	        else {
	            return null;
	        }
	    };
	    CompileMethod.prototype.resetDebugInfoExpr = function (nodeIndex, templateAst) {
	        var res = this._updateDebugContext(new _DebugState(nodeIndex, templateAst));
	        return lang_1.isPresent(res) ? res : o.NULL_EXPR;
	    };
	    CompileMethod.prototype.resetDebugInfo = function (nodeIndex, templateAst) {
	        this._newState = new _DebugState(nodeIndex, templateAst);
	    };
	    CompileMethod.prototype.addStmt = function (stmt) {
	        this._updateDebugContextIfNeeded();
	        this._bodyStatements.push(stmt);
	    };
	    CompileMethod.prototype.addStmts = function (stmts) {
	        this._updateDebugContextIfNeeded();
	        collection_1.ListWrapper.addAll(this._bodyStatements, stmts);
	    };
	    CompileMethod.prototype.finish = function () { return this._bodyStatements; };
	    CompileMethod.prototype.isEmpty = function () { return this._bodyStatements.length === 0; };
	    return CompileMethod;
	}());
	exports.CompileMethod = CompileMethod;
	//# sourceMappingURL=compile_method.js.map

/***/ }),

/***/ 582:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_private_1 = __webpack_require__(544);
	var compile_metadata_1 = __webpack_require__(565);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var compile_method_1 = __webpack_require__(581);
	var compile_pipe_1 = __webpack_require__(583);
	var compile_query_1 = __webpack_require__(580);
	var constants_1 = __webpack_require__(578);
	var util_1 = __webpack_require__(579);
	var CompileView = (function () {
	    function CompileView(component, genConfig, pipeMetas, styles, animations, viewIndex, declarationElement, templateVariableBindings) {
	        var _this = this;
	        this.component = component;
	        this.genConfig = genConfig;
	        this.pipeMetas = pipeMetas;
	        this.styles = styles;
	        this.viewIndex = viewIndex;
	        this.declarationElement = declarationElement;
	        this.templateVariableBindings = templateVariableBindings;
	        this.nodes = [];
	        // root nodes or AppElements for ViewContainers
	        this.rootNodesOrAppElements = [];
	        this.bindings = [];
	        this.classStatements = [];
	        this.eventHandlerMethods = [];
	        this.fields = [];
	        this.getters = [];
	        this.disposables = [];
	        this.subscriptions = [];
	        this.purePipes = new Map();
	        this.pipes = [];
	        this.locals = new Map();
	        this.literalArrayCount = 0;
	        this.literalMapCount = 0;
	        this.pipeCount = 0;
	        this.animations = new Map();
	        animations.forEach(function (entry) { return _this.animations.set(entry.name, entry); });
	        this.createMethod = new compile_method_1.CompileMethod(this);
	        this.injectorGetMethod = new compile_method_1.CompileMethod(this);
	        this.updateContentQueriesMethod = new compile_method_1.CompileMethod(this);
	        this.dirtyParentQueriesMethod = new compile_method_1.CompileMethod(this);
	        this.updateViewQueriesMethod = new compile_method_1.CompileMethod(this);
	        this.detectChangesInInputsMethod = new compile_method_1.CompileMethod(this);
	        this.detectChangesRenderPropertiesMethod = new compile_method_1.CompileMethod(this);
	        this.afterContentLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
	        this.afterViewLifecycleCallbacksMethod = new compile_method_1.CompileMethod(this);
	        this.destroyMethod = new compile_method_1.CompileMethod(this);
	        this.detachMethod = new compile_method_1.CompileMethod(this);
	        this.viewType = getViewType(component, viewIndex);
	        this.className = "_View_" + component.type.name + viewIndex;
	        this.classType = o.importType(new compile_metadata_1.CompileIdentifierMetadata({ name: this.className }));
	        this.viewFactory = o.variable(util_1.getViewFactoryName(component, viewIndex));
	        if (this.viewType === core_private_1.ViewType.COMPONENT || this.viewType === core_private_1.ViewType.HOST) {
	            this.componentView = this;
	        }
	        else {
	            this.componentView = this.declarationElement.view.componentView;
	        }
	        this.componentContext =
	            util_1.getPropertyInView(o.THIS_EXPR.prop('context'), this, this.componentView);
	        var viewQueries = new compile_metadata_1.CompileTokenMap();
	        if (this.viewType === core_private_1.ViewType.COMPONENT) {
	            var directiveInstance = o.THIS_EXPR.prop('context');
	            collection_1.ListWrapper.forEachWithIndex(this.component.viewQueries, function (queryMeta, queryIndex) {
	                var propName = "_viewQuery_" + queryMeta.selectors[0].name + "_" + queryIndex;
	                var queryList = compile_query_1.createQueryList(queryMeta, directiveInstance, propName, _this);
	                var query = new compile_query_1.CompileQuery(queryMeta, queryList, directiveInstance, _this);
	                compile_query_1.addQueryToTokenMap(viewQueries, query);
	            });
	            var constructorViewQueryCount = 0;
	            this.component.type.diDeps.forEach(function (dep) {
	                if (lang_1.isPresent(dep.viewQuery)) {
	                    var queryList = o.THIS_EXPR.prop('declarationAppElement')
	                        .prop('componentConstructorViewQueries')
	                        .key(o.literal(constructorViewQueryCount++));
	                    var query = new compile_query_1.CompileQuery(dep.viewQuery, queryList, null, _this);
	                    compile_query_1.addQueryToTokenMap(viewQueries, query);
	                }
	            });
	        }
	        this.viewQueries = viewQueries;
	        templateVariableBindings.forEach(function (entry) { _this.locals.set(entry[1], o.THIS_EXPR.prop('context').prop(entry[0])); });
	        if (!this.declarationElement.isNull()) {
	            this.declarationElement.setEmbeddedView(this);
	        }
	    }
	    CompileView.prototype.callPipe = function (name, input, args) {
	        return compile_pipe_1.CompilePipe.call(this, name, [input].concat(args));
	    };
	    CompileView.prototype.getLocal = function (name) {
	        if (name == constants_1.EventHandlerVars.event.name) {
	            return constants_1.EventHandlerVars.event;
	        }
	        var currView = this;
	        var result = currView.locals.get(name);
	        while (lang_1.isBlank(result) && lang_1.isPresent(currView.declarationElement.view)) {
	            currView = currView.declarationElement.view;
	            result = currView.locals.get(name);
	        }
	        if (lang_1.isPresent(result)) {
	            return util_1.getPropertyInView(result, this, currView);
	        }
	        else {
	            return null;
	        }
	    };
	    CompileView.prototype.createLiteralArray = function (values) {
	        if (values.length === 0) {
	            return o.importExpr(identifiers_1.Identifiers.EMPTY_ARRAY);
	        }
	        var proxyExpr = o.THIS_EXPR.prop("_arr_" + this.literalArrayCount++);
	        var proxyParams = [];
	        var proxyReturnEntries = [];
	        for (var i = 0; i < values.length; i++) {
	            var paramName = "p" + i;
	            proxyParams.push(new o.FnParam(paramName));
	            proxyReturnEntries.push(o.variable(paramName));
	        }
	        util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalArr(proxyReturnEntries))], new o.ArrayType(o.DYNAMIC_TYPE)), values.length, proxyExpr, this);
	        return proxyExpr.callFn(values);
	    };
	    CompileView.prototype.createLiteralMap = function (entries) {
	        if (entries.length === 0) {
	            return o.importExpr(identifiers_1.Identifiers.EMPTY_MAP);
	        }
	        var proxyExpr = o.THIS_EXPR.prop("_map_" + this.literalMapCount++);
	        var proxyParams = [];
	        var proxyReturnEntries = [];
	        var values = [];
	        for (var i = 0; i < entries.length; i++) {
	            var paramName = "p" + i;
	            proxyParams.push(new o.FnParam(paramName));
	            proxyReturnEntries.push([entries[i][0], o.variable(paramName)]);
	            values.push(entries[i][1]);
	        }
	        util_1.createPureProxy(o.fn(proxyParams, [new o.ReturnStatement(o.literalMap(proxyReturnEntries))], new o.MapType(o.DYNAMIC_TYPE)), entries.length, proxyExpr, this);
	        return proxyExpr.callFn(values);
	    };
	    CompileView.prototype.afterNodes = function () {
	        var _this = this;
	        this.pipes.forEach(function (pipe) { return pipe.create(); });
	        this.viewQueries.values().forEach(function (queries) { return queries.forEach(function (query) { return query.afterChildren(_this.createMethod, _this.updateViewQueriesMethod); }); });
	    };
	    return CompileView;
	}());
	exports.CompileView = CompileView;
	function getViewType(component, embeddedTemplateIndex) {
	    if (embeddedTemplateIndex > 0) {
	        return core_private_1.ViewType.EMBEDDED;
	    }
	    else if (component.type.isHost) {
	        return core_private_1.ViewType.HOST;
	    }
	    else {
	        return core_private_1.ViewType.COMPONENT;
	    }
	}
	//# sourceMappingURL=compile_view.js.map

/***/ }),

/***/ 583:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var util_1 = __webpack_require__(579);
	var _PurePipeProxy = (function () {
	    function _PurePipeProxy(view, instance, argCount) {
	        this.view = view;
	        this.instance = instance;
	        this.argCount = argCount;
	    }
	    return _PurePipeProxy;
	}());
	var CompilePipe = (function () {
	    function CompilePipe(view, meta) {
	        this.view = view;
	        this.meta = meta;
	        this._purePipeProxies = [];
	        this.instance = o.THIS_EXPR.prop("_pipe_" + meta.name + "_" + view.pipeCount++);
	    }
	    CompilePipe.call = function (view, name, args) {
	        var compView = view.componentView;
	        var meta = _findPipeMeta(compView, name);
	        var pipe;
	        if (meta.pure) {
	            // pure pipes live on the component view
	            pipe = compView.purePipes.get(name);
	            if (lang_1.isBlank(pipe)) {
	                pipe = new CompilePipe(compView, meta);
	                compView.purePipes.set(name, pipe);
	                compView.pipes.push(pipe);
	            }
	        }
	        else {
	            // Non pure pipes live on the view that called it
	            pipe = new CompilePipe(view, meta);
	            view.pipes.push(pipe);
	        }
	        return pipe._call(view, args);
	    };
	    Object.defineProperty(CompilePipe.prototype, "pure", {
	        get: function () { return this.meta.pure; },
	        enumerable: true,
	        configurable: true
	    });
	    CompilePipe.prototype.create = function () {
	        var _this = this;
	        var deps = this.meta.type.diDeps.map(function (diDep) {
	            if (diDep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ChangeDetectorRef))) {
	                return util_1.getPropertyInView(o.THIS_EXPR.prop('ref'), _this.view, _this.view.componentView);
	            }
	            return util_1.injectFromViewParentInjector(diDep.token, false);
	        });
	        this.view.fields.push(new o.ClassField(this.instance.name, o.importType(this.meta.type)));
	        this.view.createMethod.resetDebugInfo(null, null);
	        this.view.createMethod.addStmt(o.THIS_EXPR.prop(this.instance.name)
	            .set(o.importExpr(this.meta.type).instantiate(deps))
	            .toStmt());
	        this._purePipeProxies.forEach(function (purePipeProxy) {
	            var pipeInstanceSeenFromPureProxy = util_1.getPropertyInView(_this.instance, purePipeProxy.view, _this.view);
	            util_1.createPureProxy(pipeInstanceSeenFromPureProxy.prop('transform')
	                .callMethod(o.BuiltinMethod.bind, [pipeInstanceSeenFromPureProxy]), purePipeProxy.argCount, purePipeProxy.instance, purePipeProxy.view);
	        });
	    };
	    CompilePipe.prototype._call = function (callingView, args) {
	        if (this.meta.pure) {
	            // PurePipeProxies live on the view that called them.
	            var purePipeProxy = new _PurePipeProxy(callingView, o.THIS_EXPR.prop(this.instance.name + "_" + this._purePipeProxies.length), args.length);
	            this._purePipeProxies.push(purePipeProxy);
	            return o.importExpr(identifiers_1.Identifiers.castByValue)
	                .callFn([
	                purePipeProxy.instance,
	                util_1.getPropertyInView(this.instance.prop('transform'), callingView, this.view)
	            ])
	                .callFn(args);
	        }
	        else {
	            return util_1.getPropertyInView(this.instance, callingView, this.view).callMethod('transform', args);
	        }
	    };
	    return CompilePipe;
	}());
	exports.CompilePipe = CompilePipe;
	function _findPipeMeta(view, name) {
	    var pipeMeta = null;
	    for (var i = view.pipeMetas.length - 1; i >= 0; i--) {
	        var localPipeMeta = view.pipeMetas[i];
	        if (localPipeMeta.name == name) {
	            pipeMeta = localPipeMeta;
	            break;
	        }
	    }
	    if (lang_1.isBlank(pipeMeta)) {
	        throw new exceptions_1.BaseException("Illegal state: Could not find pipe " + name + " although the parser should have detected this error!");
	    }
	    return pipeMeta;
	}
	//# sourceMappingURL=compile_pipe.js.map

/***/ }),

/***/ 584:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var template_ast_1 = __webpack_require__(541);
	var property_binder_1 = __webpack_require__(585);
	var event_binder_1 = __webpack_require__(588);
	var lifecycle_binder_1 = __webpack_require__(589);
	function bindView(view, parsedTemplate) {
	    var visitor = new ViewBinderVisitor(view);
	    template_ast_1.templateVisitAll(visitor, parsedTemplate);
	    view.pipes.forEach(function (pipe) { lifecycle_binder_1.bindPipeDestroyLifecycleCallbacks(pipe.meta, pipe.instance, pipe.view); });
	}
	exports.bindView = bindView;
	var ViewBinderVisitor = (function () {
	    function ViewBinderVisitor(view) {
	        this.view = view;
	        this._nodeIndex = 0;
	    }
	    ViewBinderVisitor.prototype.visitBoundText = function (ast, parent) {
	        var node = this.view.nodes[this._nodeIndex++];
	        property_binder_1.bindRenderText(ast, node, this.view);
	        return null;
	    };
	    ViewBinderVisitor.prototype.visitText = function (ast, parent) {
	        this._nodeIndex++;
	        return null;
	    };
	    ViewBinderVisitor.prototype.visitNgContent = function (ast, parent) { return null; };
	    ViewBinderVisitor.prototype.visitElement = function (ast, parent) {
	        var compileElement = this.view.nodes[this._nodeIndex++];
	        var eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
	        property_binder_1.bindRenderInputs(ast.inputs, compileElement);
	        event_binder_1.bindRenderOutputs(eventListeners);
	        collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
	            var directiveInstance = compileElement.directiveInstances[index];
	            property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
	            lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
	            property_binder_1.bindDirectiveHostProps(directiveAst, directiveInstance, compileElement);
	            event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
	        });
	        template_ast_1.templateVisitAll(this, ast.children, compileElement);
	        // afterContent and afterView lifecycles need to be called bottom up
	        // so that children are notified before parents
	        collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
	            var directiveInstance = compileElement.directiveInstances[index];
	            lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
	            lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
	            lifecycle_binder_1.bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
	        });
	        return null;
	    };
	    ViewBinderVisitor.prototype.visitEmbeddedTemplate = function (ast, parent) {
	        var compileElement = this.view.nodes[this._nodeIndex++];
	        var eventListeners = event_binder_1.collectEventListeners(ast.outputs, ast.directives, compileElement);
	        collection_1.ListWrapper.forEachWithIndex(ast.directives, function (directiveAst, index) {
	            var directiveInstance = compileElement.directiveInstances[index];
	            property_binder_1.bindDirectiveInputs(directiveAst, directiveInstance, compileElement);
	            lifecycle_binder_1.bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement);
	            event_binder_1.bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners);
	            lifecycle_binder_1.bindDirectiveAfterContentLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
	            lifecycle_binder_1.bindDirectiveAfterViewLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
	            lifecycle_binder_1.bindDirectiveDestroyLifecycleCallbacks(directiveAst.directive, directiveInstance, compileElement);
	        });
	        bindView(compileElement.embeddedView, ast.children);
	        return null;
	    };
	    ViewBinderVisitor.prototype.visitAttr = function (ast, ctx) { return null; };
	    ViewBinderVisitor.prototype.visitDirective = function (ast, ctx) { return null; };
	    ViewBinderVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
	        return null;
	    };
	    ViewBinderVisitor.prototype.visitReference = function (ast, ctx) { return null; };
	    ViewBinderVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
	    ViewBinderVisitor.prototype.visitDirectiveProperty = function (ast, context) { return null; };
	    ViewBinderVisitor.prototype.visitElementProperty = function (ast, context) { return null; };
	    return ViewBinderVisitor;
	}());
	//# sourceMappingURL=view_binder.js.map

/***/ }),

/***/ 585:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_private_1 = __webpack_require__(544);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var constants_1 = __webpack_require__(578);
	var template_ast_1 = __webpack_require__(541);
	var util_1 = __webpack_require__(563);
	var expression_converter_1 = __webpack_require__(586);
	var compile_binding_1 = __webpack_require__(587);
	var core_1 = __webpack_require__(284);
	function createBindFieldExpr(exprIndex) {
	    return o.THIS_EXPR.prop("_expr_" + exprIndex);
	}
	function createCurrValueExpr(exprIndex) {
	    return o.variable("currVal_" + exprIndex); // fix syntax highlighting: `
	}
	function bind(view, currValExpr, fieldExpr, parsedExpression, context, actions, method) {
	    var checkExpression = expression_converter_1.convertCdExpressionToIr(view, context, parsedExpression, constants_1.DetectChangesVars.valUnwrapper);
	    if (lang_1.isBlank(checkExpression.expression)) {
	        // e.g. an empty expression was given
	        return;
	    }
	    // private is fine here as no child view will reference the cached value...
	    view.fields.push(new o.ClassField(fieldExpr.name, null, [o.StmtModifier.Private]));
	    view.createMethod.addStmt(o.THIS_EXPR.prop(fieldExpr.name).set(o.importExpr(identifiers_1.Identifiers.uninitialized)).toStmt());
	    if (checkExpression.needsValueUnwrapper) {
	        var initValueUnwrapperStmt = constants_1.DetectChangesVars.valUnwrapper.callMethod('reset', []).toStmt();
	        method.addStmt(initValueUnwrapperStmt);
	    }
	    method.addStmt(currValExpr.set(checkExpression.expression).toDeclStmt(null, [o.StmtModifier.Final]));
	    var condition = o.importExpr(identifiers_1.Identifiers.checkBinding).callFn([
	        constants_1.DetectChangesVars.throwOnChange, fieldExpr, currValExpr
	    ]);
	    if (checkExpression.needsValueUnwrapper) {
	        condition = constants_1.DetectChangesVars.valUnwrapper.prop('hasWrappedValue').or(condition);
	    }
	    method.addStmt(new o.IfStmt(condition, actions.concat([o.THIS_EXPR.prop(fieldExpr.name).set(currValExpr).toStmt()])));
	}
	function bindRenderText(boundText, compileNode, view) {
	    var bindingIndex = view.bindings.length;
	    view.bindings.push(new compile_binding_1.CompileBinding(compileNode, boundText));
	    var currValExpr = createCurrValueExpr(bindingIndex);
	    var valueField = createBindFieldExpr(bindingIndex);
	    view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileNode.nodeIndex, boundText);
	    bind(view, currValExpr, valueField, boundText.value, view.componentContext, [o.THIS_EXPR.prop('renderer')
	            .callMethod('setText', [compileNode.renderNode, currValExpr])
	            .toStmt()], view.detectChangesRenderPropertiesMethod);
	}
	exports.bindRenderText = bindRenderText;
	function bindAndWriteToRenderer(boundProps, context, compileElement) {
	    var view = compileElement.view;
	    var renderNode = compileElement.renderNode;
	    boundProps.forEach(function (boundProp) {
	        var bindingIndex = view.bindings.length;
	        view.bindings.push(new compile_binding_1.CompileBinding(compileElement, boundProp));
	        view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileElement.nodeIndex, boundProp);
	        var fieldExpr = createBindFieldExpr(bindingIndex);
	        var currValExpr = createCurrValueExpr(bindingIndex);
	        var renderMethod;
	        var oldRenderValue = sanitizedValue(boundProp, fieldExpr);
	        var renderValue = sanitizedValue(boundProp, currValExpr);
	        var updateStmts = [];
	        switch (boundProp.type) {
	            case template_ast_1.PropertyBindingType.Property:
	                if (view.genConfig.logBindingUpdate) {
	                    updateStmts.push(logBindingUpdateStmt(renderNode, boundProp.name, renderValue));
	                }
	                updateStmts.push(o.THIS_EXPR.prop('renderer')
	                    .callMethod('setElementProperty', [renderNode, o.literal(boundProp.name), renderValue])
	                    .toStmt());
	                break;
	            case template_ast_1.PropertyBindingType.Attribute:
	                renderValue =
	                    renderValue.isBlank().conditional(o.NULL_EXPR, renderValue.callMethod('toString', []));
	                updateStmts.push(o.THIS_EXPR.prop('renderer')
	                    .callMethod('setElementAttribute', [renderNode, o.literal(boundProp.name), renderValue])
	                    .toStmt());
	                break;
	            case template_ast_1.PropertyBindingType.Class:
	                updateStmts.push(o.THIS_EXPR.prop('renderer')
	                    .callMethod('setElementClass', [renderNode, o.literal(boundProp.name), renderValue])
	                    .toStmt());
	                break;
	            case template_ast_1.PropertyBindingType.Style:
	                var strValue = renderValue.callMethod('toString', []);
	                if (lang_1.isPresent(boundProp.unit)) {
	                    strValue = strValue.plus(o.literal(boundProp.unit));
	                }
	                renderValue = renderValue.isBlank().conditional(o.NULL_EXPR, strValue);
	                updateStmts.push(o.THIS_EXPR.prop('renderer')
	                    .callMethod('setElementStyle', [renderNode, o.literal(boundProp.name), renderValue])
	                    .toStmt());
	                break;
	            case template_ast_1.PropertyBindingType.Animation:
	                var animationName = boundProp.name;
	                var animation = view.componentView.animations.get(animationName);
	                if (!lang_1.isPresent(animation)) {
	                    throw new core_1.BaseException("Internal Error: couldn't find an animation entry for " + boundProp.name);
	                }
	                // it's important to normalize the void value as `void` explicitly
	                // so that the styles data can be obtained from the stringmap
	                var emptyStateValue = o.literal(core_private_1.EMPTY_STATE);
	                // void => ...
	                var oldRenderVar = o.variable('oldRenderVar');
	                updateStmts.push(oldRenderVar.set(oldRenderValue).toDeclStmt());
	                updateStmts.push(new o.IfStmt(oldRenderVar.equals(o.importExpr(identifiers_1.Identifiers.uninitialized)), [oldRenderVar.set(emptyStateValue).toStmt()]));
	                // ... => void
	                var newRenderVar = o.variable('newRenderVar');
	                updateStmts.push(newRenderVar.set(renderValue).toDeclStmt());
	                updateStmts.push(new o.IfStmt(newRenderVar.equals(o.importExpr(identifiers_1.Identifiers.uninitialized)), [newRenderVar.set(emptyStateValue).toStmt()]));
	                updateStmts.push(animation.fnVariable.callFn([o.THIS_EXPR, renderNode, oldRenderVar, newRenderVar])
	                    .toStmt());
	                view.detachMethod.addStmt(animation.fnVariable.callFn([o.THIS_EXPR, renderNode, oldRenderValue, emptyStateValue])
	                    .toStmt());
	                break;
	        }
	        bind(view, currValExpr, fieldExpr, boundProp.value, context, updateStmts, view.detectChangesRenderPropertiesMethod);
	    });
	}
	function sanitizedValue(boundProp, renderValue) {
	    var enumValue;
	    switch (boundProp.securityContext) {
	        case core_private_1.SecurityContext.NONE:
	            return renderValue; // No sanitization needed.
	        case core_private_1.SecurityContext.HTML:
	            enumValue = 'HTML';
	            break;
	        case core_private_1.SecurityContext.STYLE:
	            enumValue = 'STYLE';
	            break;
	        case core_private_1.SecurityContext.SCRIPT:
	            enumValue = 'SCRIPT';
	            break;
	        case core_private_1.SecurityContext.URL:
	            enumValue = 'URL';
	            break;
	        case core_private_1.SecurityContext.RESOURCE_URL:
	            enumValue = 'RESOURCE_URL';
	            break;
	        default:
	            throw new Error("internal error, unexpected SecurityContext " + boundProp.securityContext + ".");
	    }
	    var ctx = constants_1.ViewProperties.viewUtils.prop('sanitizer');
	    var args = [o.importExpr(identifiers_1.Identifiers.SecurityContext).prop(enumValue), renderValue];
	    return ctx.callMethod('sanitize', args);
	}
	function bindRenderInputs(boundProps, compileElement) {
	    bindAndWriteToRenderer(boundProps, compileElement.view.componentContext, compileElement);
	}
	exports.bindRenderInputs = bindRenderInputs;
	function bindDirectiveHostProps(directiveAst, directiveInstance, compileElement) {
	    bindAndWriteToRenderer(directiveAst.hostProperties, directiveInstance, compileElement);
	}
	exports.bindDirectiveHostProps = bindDirectiveHostProps;
	function bindDirectiveInputs(directiveAst, directiveInstance, compileElement) {
	    if (directiveAst.inputs.length === 0) {
	        return;
	    }
	    var view = compileElement.view;
	    var detectChangesInInputsMethod = view.detectChangesInInputsMethod;
	    detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
	    var lifecycleHooks = directiveAst.directive.lifecycleHooks;
	    var calcChangesMap = lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnChanges) !== -1;
	    var isOnPushComp = directiveAst.directive.isComponent &&
	        !core_private_1.isDefaultChangeDetectionStrategy(directiveAst.directive.changeDetection);
	    if (calcChangesMap) {
	        detectChangesInInputsMethod.addStmt(constants_1.DetectChangesVars.changes.set(o.NULL_EXPR).toStmt());
	    }
	    if (isOnPushComp) {
	        detectChangesInInputsMethod.addStmt(constants_1.DetectChangesVars.changed.set(o.literal(false)).toStmt());
	    }
	    directiveAst.inputs.forEach(function (input) {
	        var bindingIndex = view.bindings.length;
	        view.bindings.push(new compile_binding_1.CompileBinding(compileElement, input));
	        detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, input);
	        var fieldExpr = createBindFieldExpr(bindingIndex);
	        var currValExpr = createCurrValueExpr(bindingIndex);
	        var statements = [directiveInstance.prop(input.directiveName).set(currValExpr).toStmt()];
	        if (calcChangesMap) {
	            statements.push(new o.IfStmt(constants_1.DetectChangesVars.changes.identical(o.NULL_EXPR), [constants_1.DetectChangesVars.changes
	                    .set(o.literalMap([], new o.MapType(o.importType(identifiers_1.Identifiers.SimpleChange))))
	                    .toStmt()]));
	            statements.push(constants_1.DetectChangesVars.changes.key(o.literal(input.directiveName))
	                .set(o.importExpr(identifiers_1.Identifiers.SimpleChange).instantiate([fieldExpr, currValExpr]))
	                .toStmt());
	        }
	        if (isOnPushComp) {
	            statements.push(constants_1.DetectChangesVars.changed.set(o.literal(true)).toStmt());
	        }
	        if (view.genConfig.logBindingUpdate) {
	            statements.push(logBindingUpdateStmt(compileElement.renderNode, input.directiveName, currValExpr));
	        }
	        bind(view, currValExpr, fieldExpr, input.value, view.componentContext, statements, detectChangesInInputsMethod);
	    });
	    if (isOnPushComp) {
	        detectChangesInInputsMethod.addStmt(new o.IfStmt(constants_1.DetectChangesVars.changed, [
	            compileElement.appElement.prop('componentView').callMethod('markAsCheckOnce', []).toStmt()
	        ]));
	    }
	}
	exports.bindDirectiveInputs = bindDirectiveInputs;
	function logBindingUpdateStmt(renderNode, propName, value) {
	    return o.THIS_EXPR.prop('renderer')
	        .callMethod('setBindingDebugInfo', [
	        renderNode, o.literal("ng-reflect-" + util_1.camelCaseToDashCase(propName)),
	        value.isBlank().conditional(o.NULL_EXPR, value.callMethod('toString', []))
	    ])
	        .toStmt();
	}
	//# sourceMappingURL=property_binder.js.map

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var IMPLICIT_RECEIVER = o.variable('#implicit');
	var ExpressionWithWrappedValueInfo = (function () {
	    function ExpressionWithWrappedValueInfo(expression, needsValueUnwrapper) {
	        this.expression = expression;
	        this.needsValueUnwrapper = needsValueUnwrapper;
	    }
	    return ExpressionWithWrappedValueInfo;
	}());
	exports.ExpressionWithWrappedValueInfo = ExpressionWithWrappedValueInfo;
	function convertCdExpressionToIr(nameResolver, implicitReceiver, expression, valueUnwrapper) {
	    var visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, valueUnwrapper);
	    var irAst = expression.visit(visitor, _Mode.Expression);
	    return new ExpressionWithWrappedValueInfo(irAst, visitor.needsValueUnwrapper);
	}
	exports.convertCdExpressionToIr = convertCdExpressionToIr;
	function convertCdStatementToIr(nameResolver, implicitReceiver, stmt) {
	    var visitor = new _AstToIrVisitor(nameResolver, implicitReceiver, null);
	    var statements = [];
	    flattenStatements(stmt.visit(visitor, _Mode.Statement), statements);
	    return statements;
	}
	exports.convertCdStatementToIr = convertCdStatementToIr;
	var _Mode;
	(function (_Mode) {
	    _Mode[_Mode["Statement"] = 0] = "Statement";
	    _Mode[_Mode["Expression"] = 1] = "Expression";
	})(_Mode || (_Mode = {}));
	function ensureStatementMode(mode, ast) {
	    if (mode !== _Mode.Statement) {
	        throw new exceptions_1.BaseException("Expected a statement, but saw " + ast);
	    }
	}
	function ensureExpressionMode(mode, ast) {
	    if (mode !== _Mode.Expression) {
	        throw new exceptions_1.BaseException("Expected an expression, but saw " + ast);
	    }
	}
	function convertToStatementIfNeeded(mode, expr) {
	    if (mode === _Mode.Statement) {
	        return expr.toStmt();
	    }
	    else {
	        return expr;
	    }
	}
	var _AstToIrVisitor = (function () {
	    function _AstToIrVisitor(_nameResolver, _implicitReceiver, _valueUnwrapper) {
	        this._nameResolver = _nameResolver;
	        this._implicitReceiver = _implicitReceiver;
	        this._valueUnwrapper = _valueUnwrapper;
	        this.needsValueUnwrapper = false;
	    }
	    _AstToIrVisitor.prototype.visitBinary = function (ast, mode) {
	        var op;
	        switch (ast.operation) {
	            case '+':
	                op = o.BinaryOperator.Plus;
	                break;
	            case '-':
	                op = o.BinaryOperator.Minus;
	                break;
	            case '*':
	                op = o.BinaryOperator.Multiply;
	                break;
	            case '/':
	                op = o.BinaryOperator.Divide;
	                break;
	            case '%':
	                op = o.BinaryOperator.Modulo;
	                break;
	            case '&&':
	                op = o.BinaryOperator.And;
	                break;
	            case '||':
	                op = o.BinaryOperator.Or;
	                break;
	            case '==':
	                op = o.BinaryOperator.Equals;
	                break;
	            case '!=':
	                op = o.BinaryOperator.NotEquals;
	                break;
	            case '===':
	                op = o.BinaryOperator.Identical;
	                break;
	            case '!==':
	                op = o.BinaryOperator.NotIdentical;
	                break;
	            case '<':
	                op = o.BinaryOperator.Lower;
	                break;
	            case '>':
	                op = o.BinaryOperator.Bigger;
	                break;
	            case '<=':
	                op = o.BinaryOperator.LowerEquals;
	                break;
	            case '>=':
	                op = o.BinaryOperator.BiggerEquals;
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unsupported operation " + ast.operation);
	        }
	        return convertToStatementIfNeeded(mode, new o.BinaryOperatorExpr(op, ast.left.visit(this, _Mode.Expression), ast.right.visit(this, _Mode.Expression)));
	    };
	    _AstToIrVisitor.prototype.visitChain = function (ast, mode) {
	        ensureStatementMode(mode, ast);
	        return this.visitAll(ast.expressions, mode);
	    };
	    _AstToIrVisitor.prototype.visitConditional = function (ast, mode) {
	        var value = ast.condition.visit(this, _Mode.Expression);
	        return convertToStatementIfNeeded(mode, value.conditional(ast.trueExp.visit(this, _Mode.Expression), ast.falseExp.visit(this, _Mode.Expression)));
	    };
	    _AstToIrVisitor.prototype.visitPipe = function (ast, mode) {
	        var input = ast.exp.visit(this, _Mode.Expression);
	        var args = this.visitAll(ast.args, _Mode.Expression);
	        var value = this._nameResolver.callPipe(ast.name, input, args);
	        this.needsValueUnwrapper = true;
	        return convertToStatementIfNeeded(mode, this._valueUnwrapper.callMethod('unwrap', [value]));
	    };
	    _AstToIrVisitor.prototype.visitFunctionCall = function (ast, mode) {
	        return convertToStatementIfNeeded(mode, ast.target.visit(this, _Mode.Expression).callFn(this.visitAll(ast.args, _Mode.Expression)));
	    };
	    _AstToIrVisitor.prototype.visitImplicitReceiver = function (ast, mode) {
	        ensureExpressionMode(mode, ast);
	        return IMPLICIT_RECEIVER;
	    };
	    _AstToIrVisitor.prototype.visitInterpolation = function (ast, mode) {
	        ensureExpressionMode(mode, ast);
	        var args = [o.literal(ast.expressions.length)];
	        for (var i = 0; i < ast.strings.length - 1; i++) {
	            args.push(o.literal(ast.strings[i]));
	            args.push(ast.expressions[i].visit(this, _Mode.Expression));
	        }
	        args.push(o.literal(ast.strings[ast.strings.length - 1]));
	        return o.importExpr(identifiers_1.Identifiers.interpolate).callFn(args);
	    };
	    _AstToIrVisitor.prototype.visitKeyedRead = function (ast, mode) {
	        return convertToStatementIfNeeded(mode, ast.obj.visit(this, _Mode.Expression).key(ast.key.visit(this, _Mode.Expression)));
	    };
	    _AstToIrVisitor.prototype.visitKeyedWrite = function (ast, mode) {
	        var obj = ast.obj.visit(this, _Mode.Expression);
	        var key = ast.key.visit(this, _Mode.Expression);
	        var value = ast.value.visit(this, _Mode.Expression);
	        return convertToStatementIfNeeded(mode, obj.key(key).set(value));
	    };
	    _AstToIrVisitor.prototype.visitLiteralArray = function (ast, mode) {
	        return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralArray(this.visitAll(ast.expressions, mode)));
	    };
	    _AstToIrVisitor.prototype.visitLiteralMap = function (ast, mode) {
	        var parts = [];
	        for (var i = 0; i < ast.keys.length; i++) {
	            parts.push([ast.keys[i], ast.values[i].visit(this, _Mode.Expression)]);
	        }
	        return convertToStatementIfNeeded(mode, this._nameResolver.createLiteralMap(parts));
	    };
	    _AstToIrVisitor.prototype.visitLiteralPrimitive = function (ast, mode) {
	        return convertToStatementIfNeeded(mode, o.literal(ast.value));
	    };
	    _AstToIrVisitor.prototype.visitMethodCall = function (ast, mode) {
	        var args = this.visitAll(ast.args, _Mode.Expression);
	        var result = null;
	        var receiver = ast.receiver.visit(this, _Mode.Expression);
	        if (receiver === IMPLICIT_RECEIVER) {
	            var varExpr = this._nameResolver.getLocal(ast.name);
	            if (lang_1.isPresent(varExpr)) {
	                result = varExpr.callFn(args);
	            }
	            else {
	                receiver = this._implicitReceiver;
	            }
	        }
	        if (lang_1.isBlank(result)) {
	            result = receiver.callMethod(ast.name, args);
	        }
	        return convertToStatementIfNeeded(mode, result);
	    };
	    _AstToIrVisitor.prototype.visitPrefixNot = function (ast, mode) {
	        return convertToStatementIfNeeded(mode, o.not(ast.expression.visit(this, _Mode.Expression)));
	    };
	    _AstToIrVisitor.prototype.visitPropertyRead = function (ast, mode) {
	        var result = null;
	        var receiver = ast.receiver.visit(this, _Mode.Expression);
	        if (receiver === IMPLICIT_RECEIVER) {
	            result = this._nameResolver.getLocal(ast.name);
	            if (lang_1.isBlank(result)) {
	                receiver = this._implicitReceiver;
	            }
	        }
	        if (lang_1.isBlank(result)) {
	            result = receiver.prop(ast.name);
	        }
	        return convertToStatementIfNeeded(mode, result);
	    };
	    _AstToIrVisitor.prototype.visitPropertyWrite = function (ast, mode) {
	        var receiver = ast.receiver.visit(this, _Mode.Expression);
	        if (receiver === IMPLICIT_RECEIVER) {
	            var varExpr = this._nameResolver.getLocal(ast.name);
	            if (lang_1.isPresent(varExpr)) {
	                throw new exceptions_1.BaseException('Cannot assign to a reference or variable!');
	            }
	            receiver = this._implicitReceiver;
	        }
	        return convertToStatementIfNeeded(mode, receiver.prop(ast.name).set(ast.value.visit(this, _Mode.Expression)));
	    };
	    _AstToIrVisitor.prototype.visitSafePropertyRead = function (ast, mode) {
	        var receiver = ast.receiver.visit(this, _Mode.Expression);
	        return convertToStatementIfNeeded(mode, receiver.isBlank().conditional(o.NULL_EXPR, receiver.prop(ast.name)));
	    };
	    _AstToIrVisitor.prototype.visitSafeMethodCall = function (ast, mode) {
	        var receiver = ast.receiver.visit(this, _Mode.Expression);
	        var args = this.visitAll(ast.args, _Mode.Expression);
	        return convertToStatementIfNeeded(mode, receiver.isBlank().conditional(o.NULL_EXPR, receiver.callMethod(ast.name, args)));
	    };
	    _AstToIrVisitor.prototype.visitAll = function (asts, mode) {
	        var _this = this;
	        return asts.map(function (ast) { return ast.visit(_this, mode); });
	    };
	    _AstToIrVisitor.prototype.visitQuote = function (ast, mode) {
	        throw new exceptions_1.BaseException('Quotes are not supported for evaluation!');
	    };
	    return _AstToIrVisitor;
	}());
	function flattenStatements(arg, output) {
	    if (lang_1.isArray(arg)) {
	        arg.forEach(function (entry) { return flattenStatements(entry, output); });
	    }
	    else {
	        output.push(arg);
	    }
	}
	//# sourceMappingURL=expression_converter.js.map

/***/ }),

/***/ 587:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var CompileBinding = (function () {
	    function CompileBinding(node, sourceAst) {
	        this.node = node;
	        this.sourceAst = sourceAst;
	    }
	    return CompileBinding;
	}());
	exports.CompileBinding = CompileBinding;
	//# sourceMappingURL=compile_binding.js.map

/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var o = __webpack_require__(570);
	var compile_binding_1 = __webpack_require__(587);
	var compile_method_1 = __webpack_require__(581);
	var constants_1 = __webpack_require__(578);
	var expression_converter_1 = __webpack_require__(586);
	var CompileEventListener = (function () {
	    function CompileEventListener(compileElement, eventTarget, eventName, listenerIndex) {
	        this.compileElement = compileElement;
	        this.eventTarget = eventTarget;
	        this.eventName = eventName;
	        this._hasComponentHostListener = false;
	        this._actionResultExprs = [];
	        this._method = new compile_method_1.CompileMethod(compileElement.view);
	        this._methodName =
	            "_handle_" + santitizeEventName(eventName) + "_" + compileElement.nodeIndex + "_" + listenerIndex;
	        this._eventParam = new o.FnParam(constants_1.EventHandlerVars.event.name, o.importType(this.compileElement.view.genConfig.renderTypes.renderEvent));
	    }
	    CompileEventListener.getOrCreate = function (compileElement, eventTarget, eventName, targetEventListeners) {
	        var listener = targetEventListeners.find(function (listener) { return listener.eventTarget == eventTarget && listener.eventName == eventName; });
	        if (lang_1.isBlank(listener)) {
	            listener = new CompileEventListener(compileElement, eventTarget, eventName, targetEventListeners.length);
	            targetEventListeners.push(listener);
	        }
	        return listener;
	    };
	    CompileEventListener.prototype.addAction = function (hostEvent, directive, directiveInstance) {
	        if (lang_1.isPresent(directive) && directive.isComponent) {
	            this._hasComponentHostListener = true;
	        }
	        this._method.resetDebugInfo(this.compileElement.nodeIndex, hostEvent);
	        var context = lang_1.isPresent(directiveInstance) ? directiveInstance :
	            this.compileElement.view.componentContext;
	        var actionStmts = expression_converter_1.convertCdStatementToIr(this.compileElement.view, context, hostEvent.handler);
	        var lastIndex = actionStmts.length - 1;
	        if (lastIndex >= 0) {
	            var lastStatement = actionStmts[lastIndex];
	            var returnExpr = convertStmtIntoExpression(lastStatement);
	            var preventDefaultVar = o.variable("pd_" + this._actionResultExprs.length);
	            this._actionResultExprs.push(preventDefaultVar);
	            if (lang_1.isPresent(returnExpr)) {
	                // Note: We need to cast the result of the method call to dynamic,
	                // as it might be a void method!
	                actionStmts[lastIndex] =
	                    preventDefaultVar.set(returnExpr.cast(o.DYNAMIC_TYPE).notIdentical(o.literal(false)))
	                        .toDeclStmt(null, [o.StmtModifier.Final]);
	            }
	        }
	        this._method.addStmts(actionStmts);
	    };
	    CompileEventListener.prototype.finishMethod = function () {
	        var markPathToRootStart = this._hasComponentHostListener ?
	            this.compileElement.appElement.prop('componentView') :
	            o.THIS_EXPR;
	        var resultExpr = o.literal(true);
	        this._actionResultExprs.forEach(function (expr) { resultExpr = resultExpr.and(expr); });
	        var stmts = [markPathToRootStart.callMethod('markPathToRootAsCheckOnce', []).toStmt()]
	            .concat(this._method.finish())
	            .concat([new o.ReturnStatement(resultExpr)]);
	        // private is fine here as no child view will reference the event handler...
	        this.compileElement.view.eventHandlerMethods.push(new o.ClassMethod(this._methodName, [this._eventParam], stmts, o.BOOL_TYPE, [o.StmtModifier.Private]));
	    };
	    CompileEventListener.prototype.listenToRenderer = function () {
	        var listenExpr;
	        var eventListener = o.THIS_EXPR.callMethod('eventHandler', [o.THIS_EXPR.prop(this._methodName).callMethod(o.BuiltinMethod.bind, [o.THIS_EXPR])]);
	        if (lang_1.isPresent(this.eventTarget)) {
	            listenExpr = constants_1.ViewProperties.renderer.callMethod('listenGlobal', [o.literal(this.eventTarget), o.literal(this.eventName), eventListener]);
	        }
	        else {
	            listenExpr = constants_1.ViewProperties.renderer.callMethod('listen', [this.compileElement.renderNode, o.literal(this.eventName), eventListener]);
	        }
	        var disposable = o.variable("disposable_" + this.compileElement.view.disposables.length);
	        this.compileElement.view.disposables.push(disposable);
	        // private is fine here as no child view will reference the event handler...
	        this.compileElement.view.createMethod.addStmt(disposable.set(listenExpr).toDeclStmt(o.FUNCTION_TYPE, [o.StmtModifier.Private]));
	    };
	    CompileEventListener.prototype.listenToDirective = function (directiveInstance, observablePropName) {
	        var subscription = o.variable("subscription_" + this.compileElement.view.subscriptions.length);
	        this.compileElement.view.subscriptions.push(subscription);
	        var eventListener = o.THIS_EXPR.callMethod('eventHandler', [o.THIS_EXPR.prop(this._methodName).callMethod(o.BuiltinMethod.bind, [o.THIS_EXPR])]);
	        this.compileElement.view.createMethod.addStmt(subscription
	            .set(directiveInstance.prop(observablePropName)
	            .callMethod(o.BuiltinMethod.SubscribeObservable, [eventListener]))
	            .toDeclStmt(null, [o.StmtModifier.Final]));
	    };
	    return CompileEventListener;
	}());
	exports.CompileEventListener = CompileEventListener;
	function collectEventListeners(hostEvents, dirs, compileElement) {
	    var eventListeners = [];
	    hostEvents.forEach(function (hostEvent) {
	        compileElement.view.bindings.push(new compile_binding_1.CompileBinding(compileElement, hostEvent));
	        var listener = CompileEventListener.getOrCreate(compileElement, hostEvent.target, hostEvent.name, eventListeners);
	        listener.addAction(hostEvent, null, null);
	    });
	    collection_1.ListWrapper.forEachWithIndex(dirs, function (directiveAst, i) {
	        var directiveInstance = compileElement.directiveInstances[i];
	        directiveAst.hostEvents.forEach(function (hostEvent) {
	            compileElement.view.bindings.push(new compile_binding_1.CompileBinding(compileElement, hostEvent));
	            var listener = CompileEventListener.getOrCreate(compileElement, hostEvent.target, hostEvent.name, eventListeners);
	            listener.addAction(hostEvent, directiveAst.directive, directiveInstance);
	        });
	    });
	    eventListeners.forEach(function (listener) { return listener.finishMethod(); });
	    return eventListeners;
	}
	exports.collectEventListeners = collectEventListeners;
	function bindDirectiveOutputs(directiveAst, directiveInstance, eventListeners) {
	    collection_1.StringMapWrapper.forEach(directiveAst.directive.outputs, function (eventName /** TODO #9100 */, observablePropName /** TODO #9100 */) {
	        eventListeners.filter(function (listener) { return listener.eventName == eventName; }).forEach(function (listener) {
	            listener.listenToDirective(directiveInstance, observablePropName);
	        });
	    });
	}
	exports.bindDirectiveOutputs = bindDirectiveOutputs;
	function bindRenderOutputs(eventListeners) {
	    eventListeners.forEach(function (listener) { return listener.listenToRenderer(); });
	}
	exports.bindRenderOutputs = bindRenderOutputs;
	function convertStmtIntoExpression(stmt) {
	    if (stmt instanceof o.ExpressionStatement) {
	        return stmt.expr;
	    }
	    else if (stmt instanceof o.ReturnStatement) {
	        return stmt.value;
	    }
	    return null;
	}
	function santitizeEventName(name) {
	    return lang_1.StringWrapper.replaceAll(name, /[^a-zA-Z_]/g, '_');
	}
	//# sourceMappingURL=event_binder.js.map

/***/ }),

/***/ 589:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_private_1 = __webpack_require__(544);
	var o = __webpack_require__(570);
	var constants_1 = __webpack_require__(578);
	var STATE_IS_NEVER_CHECKED = o.THIS_EXPR.prop('numberOfChecks').identical(new o.LiteralExpr(0));
	var NOT_THROW_ON_CHANGES = o.not(constants_1.DetectChangesVars.throwOnChange);
	function bindDirectiveDetectChangesLifecycleCallbacks(directiveAst, directiveInstance, compileElement) {
	    var view = compileElement.view;
	    var detectChangesInInputsMethod = view.detectChangesInInputsMethod;
	    var lifecycleHooks = directiveAst.directive.lifecycleHooks;
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnChanges) !== -1 && directiveAst.inputs.length > 0) {
	        detectChangesInInputsMethod.addStmt(new o.IfStmt(constants_1.DetectChangesVars.changes.notIdentical(o.NULL_EXPR), [directiveInstance.callMethod('ngOnChanges', [constants_1.DetectChangesVars.changes]).toStmt()]));
	    }
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnInit) !== -1) {
	        detectChangesInInputsMethod.addStmt(new o.IfStmt(STATE_IS_NEVER_CHECKED.and(NOT_THROW_ON_CHANGES), [directiveInstance.callMethod('ngOnInit', []).toStmt()]));
	    }
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.DoCheck) !== -1) {
	        detectChangesInInputsMethod.addStmt(new o.IfStmt(NOT_THROW_ON_CHANGES, [directiveInstance.callMethod('ngDoCheck', []).toStmt()]));
	    }
	}
	exports.bindDirectiveDetectChangesLifecycleCallbacks = bindDirectiveDetectChangesLifecycleCallbacks;
	function bindDirectiveAfterContentLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
	    var view = compileElement.view;
	    var lifecycleHooks = directiveMeta.lifecycleHooks;
	    var afterContentLifecycleCallbacksMethod = view.afterContentLifecycleCallbacksMethod;
	    afterContentLifecycleCallbacksMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterContentInit) !== -1) {
	        afterContentLifecycleCallbacksMethod.addStmt(new o.IfStmt(STATE_IS_NEVER_CHECKED, [directiveInstance.callMethod('ngAfterContentInit', []).toStmt()]));
	    }
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterContentChecked) !== -1) {
	        afterContentLifecycleCallbacksMethod.addStmt(directiveInstance.callMethod('ngAfterContentChecked', []).toStmt());
	    }
	}
	exports.bindDirectiveAfterContentLifecycleCallbacks = bindDirectiveAfterContentLifecycleCallbacks;
	function bindDirectiveAfterViewLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
	    var view = compileElement.view;
	    var lifecycleHooks = directiveMeta.lifecycleHooks;
	    var afterViewLifecycleCallbacksMethod = view.afterViewLifecycleCallbacksMethod;
	    afterViewLifecycleCallbacksMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterViewInit) !== -1) {
	        afterViewLifecycleCallbacksMethod.addStmt(new o.IfStmt(STATE_IS_NEVER_CHECKED, [directiveInstance.callMethod('ngAfterViewInit', []).toStmt()]));
	    }
	    if (lifecycleHooks.indexOf(core_private_1.LifecycleHooks.AfterViewChecked) !== -1) {
	        afterViewLifecycleCallbacksMethod.addStmt(directiveInstance.callMethod('ngAfterViewChecked', []).toStmt());
	    }
	}
	exports.bindDirectiveAfterViewLifecycleCallbacks = bindDirectiveAfterViewLifecycleCallbacks;
	function bindDirectiveDestroyLifecycleCallbacks(directiveMeta, directiveInstance, compileElement) {
	    var onDestroyMethod = compileElement.view.destroyMethod;
	    onDestroyMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
	    if (directiveMeta.lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnDestroy) !== -1) {
	        onDestroyMethod.addStmt(directiveInstance.callMethod('ngOnDestroy', []).toStmt());
	    }
	}
	exports.bindDirectiveDestroyLifecycleCallbacks = bindDirectiveDestroyLifecycleCallbacks;
	function bindPipeDestroyLifecycleCallbacks(pipeMeta, pipeInstance, view) {
	    var onDestroyMethod = view.destroyMethod;
	    if (pipeMeta.lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnDestroy) !== -1) {
	        onDestroyMethod.addStmt(pipeInstance.callMethod('ngOnDestroy', []).toStmt());
	    }
	}
	exports.bindPipeDestroyLifecycleCallbacks = bindPipeDestroyLifecycleCallbacks;
	//# sourceMappingURL=lifecycle_binder.js.map

/***/ }),

/***/ 590:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var animation_compiler_1 = __webpack_require__(572);
	var compile_metadata_1 = __webpack_require__(565);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var identifiers_1 = __webpack_require__(564);
	var o = __webpack_require__(570);
	var template_ast_1 = __webpack_require__(541);
	var compile_element_1 = __webpack_require__(577);
	var compile_view_1 = __webpack_require__(582);
	var constants_1 = __webpack_require__(578);
	var util_1 = __webpack_require__(579);
	var IMPLICIT_TEMPLATE_VAR = '\$implicit';
	var CLASS_ATTR = 'class';
	var STYLE_ATTR = 'style';
	var NG_CONTAINER_TAG = 'ng-container';
	var parentRenderNodeVar = o.variable('parentRenderNode');
	var rootSelectorVar = o.variable('rootSelector');
	var ViewFactoryDependency = (function () {
	    function ViewFactoryDependency(comp, placeholder) {
	        this.comp = comp;
	        this.placeholder = placeholder;
	    }
	    return ViewFactoryDependency;
	}());
	exports.ViewFactoryDependency = ViewFactoryDependency;
	var ComponentFactoryDependency = (function () {
	    function ComponentFactoryDependency(comp, placeholder) {
	        this.comp = comp;
	        this.placeholder = placeholder;
	    }
	    return ComponentFactoryDependency;
	}());
	exports.ComponentFactoryDependency = ComponentFactoryDependency;
	function buildView(view, template, targetDependencies) {
	    var builderVisitor = new ViewBuilderVisitor(view, targetDependencies);
	    template_ast_1.templateVisitAll(builderVisitor, template, view.declarationElement.isNull() ? view.declarationElement : view.declarationElement.parent);
	    return builderVisitor.nestedViewCount;
	}
	exports.buildView = buildView;
	function finishView(view, targetStatements) {
	    view.afterNodes();
	    createViewTopLevelStmts(view, targetStatements);
	    view.nodes.forEach(function (node) {
	        if (node instanceof compile_element_1.CompileElement && node.hasEmbeddedView) {
	            finishView(node.embeddedView, targetStatements);
	        }
	    });
	}
	exports.finishView = finishView;
	var ViewBuilderVisitor = (function () {
	    function ViewBuilderVisitor(view, targetDependencies) {
	        this.view = view;
	        this.targetDependencies = targetDependencies;
	        this.nestedViewCount = 0;
	        this._animationCompiler = new animation_compiler_1.AnimationCompiler();
	    }
	    ViewBuilderVisitor.prototype._isRootNode = function (parent) { return parent.view !== this.view; };
	    ViewBuilderVisitor.prototype._addRootNodeAndProject = function (node) {
	        var projectedNode = _getOuterContainerOrSelf(node);
	        var parent = projectedNode.parent;
	        var ngContentIndex = projectedNode.sourceAst.ngContentIndex;
	        var vcAppEl = (node instanceof compile_element_1.CompileElement && node.hasViewContainer) ? node.appElement : null;
	        if (this._isRootNode(parent)) {
	            // store appElement as root node only for ViewContainers
	            if (this.view.viewType !== core_private_1.ViewType.COMPONENT) {
	                this.view.rootNodesOrAppElements.push(lang_1.isPresent(vcAppEl) ? vcAppEl : node.renderNode);
	            }
	        }
	        else if (lang_1.isPresent(parent.component) && lang_1.isPresent(ngContentIndex)) {
	            parent.addContentNode(ngContentIndex, lang_1.isPresent(vcAppEl) ? vcAppEl : node.renderNode);
	        }
	    };
	    ViewBuilderVisitor.prototype._getParentRenderNode = function (parent) {
	        parent = _getOuterContainerParentOrSelf(parent);
	        if (this._isRootNode(parent)) {
	            if (this.view.viewType === core_private_1.ViewType.COMPONENT) {
	                return parentRenderNodeVar;
	            }
	            else {
	                // root node of an embedded/host view
	                return o.NULL_EXPR;
	            }
	        }
	        else {
	            return lang_1.isPresent(parent.component) &&
	                parent.component.template.encapsulation !== core_1.ViewEncapsulation.Native ?
	                o.NULL_EXPR :
	                parent.renderNode;
	        }
	    };
	    ViewBuilderVisitor.prototype.visitBoundText = function (ast, parent) {
	        return this._visitText(ast, '', parent);
	    };
	    ViewBuilderVisitor.prototype.visitText = function (ast, parent) {
	        return this._visitText(ast, ast.value, parent);
	    };
	    ViewBuilderVisitor.prototype._visitText = function (ast, value, parent) {
	        var fieldName = "_text_" + this.view.nodes.length;
	        this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderText)));
	        var renderNode = o.THIS_EXPR.prop(fieldName);
	        var compileNode = new compile_element_1.CompileNode(parent, this.view, this.view.nodes.length, renderNode, ast);
	        var createRenderNode = o.THIS_EXPR.prop(fieldName)
	            .set(constants_1.ViewProperties.renderer.callMethod('createText', [
	            this._getParentRenderNode(parent), o.literal(value),
	            this.view.createMethod.resetDebugInfoExpr(this.view.nodes.length, ast)
	        ]))
	            .toStmt();
	        this.view.nodes.push(compileNode);
	        this.view.createMethod.addStmt(createRenderNode);
	        this._addRootNodeAndProject(compileNode);
	        return renderNode;
	    };
	    ViewBuilderVisitor.prototype.visitNgContent = function (ast, parent) {
	        // the projected nodes originate from a different view, so we don't
	        // have debug information for them...
	        this.view.createMethod.resetDebugInfo(null, ast);
	        var parentRenderNode = this._getParentRenderNode(parent);
	        var nodesExpression = constants_1.ViewProperties.projectableNodes.key(o.literal(ast.index), new o.ArrayType(o.importType(this.view.genConfig.renderTypes.renderNode)));
	        if (parentRenderNode !== o.NULL_EXPR) {
	            this.view.createMethod.addStmt(constants_1.ViewProperties.renderer
	                .callMethod('projectNodes', [
	                parentRenderNode,
	                o.importExpr(identifiers_1.Identifiers.flattenNestedViewRenderNodes).callFn([nodesExpression])
	            ])
	                .toStmt());
	        }
	        else if (this._isRootNode(parent)) {
	            if (this.view.viewType !== core_private_1.ViewType.COMPONENT) {
	                // store root nodes only for embedded/host views
	                this.view.rootNodesOrAppElements.push(nodesExpression);
	            }
	        }
	        else {
	            if (lang_1.isPresent(parent.component) && lang_1.isPresent(ast.ngContentIndex)) {
	                parent.addContentNode(ast.ngContentIndex, nodesExpression);
	            }
	        }
	        return null;
	    };
	    ViewBuilderVisitor.prototype.visitElement = function (ast, parent) {
	        var _this = this;
	        var nodeIndex = this.view.nodes.length;
	        var createRenderNodeExpr;
	        var debugContextExpr = this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast);
	        if (nodeIndex === 0 && this.view.viewType === core_private_1.ViewType.HOST) {
	            createRenderNodeExpr = o.THIS_EXPR.callMethod('selectOrCreateHostElement', [o.literal(ast.name), rootSelectorVar, debugContextExpr]);
	        }
	        else {
	            if (ast.name === NG_CONTAINER_TAG) {
	                createRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createTemplateAnchor', [this._getParentRenderNode(parent), debugContextExpr]);
	            }
	            else {
	                createRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createElement', [this._getParentRenderNode(parent), o.literal(ast.name), debugContextExpr]);
	            }
	        }
	        var fieldName = "_el_" + nodeIndex;
	        this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderElement)));
	        this.view.createMethod.addStmt(o.THIS_EXPR.prop(fieldName).set(createRenderNodeExpr).toStmt());
	        var renderNode = o.THIS_EXPR.prop(fieldName);
	        var directives = ast.directives.map(function (directiveAst) { return directiveAst.directive; });
	        var component = directives.find(function (directive) { return directive.isComponent; });
	        var htmlAttrs = _readHtmlAttrs(ast.attrs);
	        var attrNameAndValues = _mergeHtmlAndDirectiveAttrs(htmlAttrs, directives);
	        for (var i = 0; i < attrNameAndValues.length; i++) {
	            var attrName = attrNameAndValues[i][0];
	            var attrValue = attrNameAndValues[i][1];
	            this.view.createMethod.addStmt(constants_1.ViewProperties.renderer
	                .callMethod('setElementAttribute', [renderNode, o.literal(attrName), o.literal(attrValue)])
	                .toStmt());
	        }
	        var compileElement = new compile_element_1.CompileElement(parent, this.view, nodeIndex, renderNode, ast, component, directives, ast.providers, ast.hasViewContainer, false, ast.references);
	        this.view.nodes.push(compileElement);
	        var compViewExpr = null;
	        if (lang_1.isPresent(component)) {
	            var nestedComponentIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: util_1.getViewFactoryName(component, 0) });
	            this.targetDependencies.push(new ViewFactoryDependency(component.type, nestedComponentIdentifier));
	            var precompileComponentIdentifiers = component.precompile.map(function (precompileComp) {
	                var id = new compile_metadata_1.CompileIdentifierMetadata({ name: precompileComp.name });
	                _this.targetDependencies.push(new ComponentFactoryDependency(precompileComp, id));
	                return id;
	            });
	            compileElement.createComponentFactoryResolver(precompileComponentIdentifiers);
	            compViewExpr = o.variable("compView_" + nodeIndex); // fix highlighting: `
	            compileElement.setComponentView(compViewExpr);
	            this.view.createMethod.addStmt(compViewExpr
	                .set(o.importExpr(nestedComponentIdentifier).callFn([
	                constants_1.ViewProperties.viewUtils, compileElement.injector, compileElement.appElement
	            ]))
	                .toDeclStmt());
	        }
	        compileElement.beforeChildren();
	        this._addRootNodeAndProject(compileElement);
	        template_ast_1.templateVisitAll(this, ast.children, compileElement);
	        compileElement.afterChildren(this.view.nodes.length - nodeIndex - 1);
	        if (lang_1.isPresent(compViewExpr)) {
	            var codeGenContentNodes;
	            if (this.view.component.type.isHost) {
	                codeGenContentNodes = constants_1.ViewProperties.projectableNodes;
	            }
	            else {
	                codeGenContentNodes = o.literalArr(compileElement.contentNodesByNgContentIndex.map(function (nodes) { return util_1.createFlatArray(nodes); }));
	            }
	            this.view.createMethod.addStmt(compViewExpr
	                .callMethod('create', [compileElement.getComponent(), codeGenContentNodes, o.NULL_EXPR])
	                .toStmt());
	        }
	        return null;
	    };
	    ViewBuilderVisitor.prototype.visitEmbeddedTemplate = function (ast, parent) {
	        var nodeIndex = this.view.nodes.length;
	        var fieldName = "_anchor_" + nodeIndex;
	        this.view.fields.push(new o.ClassField(fieldName, o.importType(this.view.genConfig.renderTypes.renderComment)));
	        this.view.createMethod.addStmt(o.THIS_EXPR.prop(fieldName)
	            .set(constants_1.ViewProperties.renderer.callMethod('createTemplateAnchor', [
	            this._getParentRenderNode(parent),
	            this.view.createMethod.resetDebugInfoExpr(nodeIndex, ast)
	        ]))
	            .toStmt());
	        var renderNode = o.THIS_EXPR.prop(fieldName);
	        var templateVariableBindings = ast.variables.map(function (varAst) { return [varAst.value.length > 0 ? varAst.value : IMPLICIT_TEMPLATE_VAR, varAst.name]; });
	        var directives = ast.directives.map(function (directiveAst) { return directiveAst.directive; });
	        var compileElement = new compile_element_1.CompileElement(parent, this.view, nodeIndex, renderNode, ast, null, directives, ast.providers, ast.hasViewContainer, true, ast.references);
	        this.view.nodes.push(compileElement);
	        var compiledAnimations = this._animationCompiler.compileComponent(this.view.component);
	        this.nestedViewCount++;
	        var embeddedView = new compile_view_1.CompileView(this.view.component, this.view.genConfig, this.view.pipeMetas, o.NULL_EXPR, compiledAnimations, this.view.viewIndex + this.nestedViewCount, compileElement, templateVariableBindings);
	        this.nestedViewCount += buildView(embeddedView, ast.children, this.targetDependencies);
	        compileElement.beforeChildren();
	        this._addRootNodeAndProject(compileElement);
	        compileElement.afterChildren(0);
	        return null;
	    };
	    ViewBuilderVisitor.prototype.visitAttr = function (ast, ctx) { return null; };
	    ViewBuilderVisitor.prototype.visitDirective = function (ast, ctx) { return null; };
	    ViewBuilderVisitor.prototype.visitEvent = function (ast, eventTargetAndNames) {
	        return null;
	    };
	    ViewBuilderVisitor.prototype.visitReference = function (ast, ctx) { return null; };
	    ViewBuilderVisitor.prototype.visitVariable = function (ast, ctx) { return null; };
	    ViewBuilderVisitor.prototype.visitDirectiveProperty = function (ast, context) { return null; };
	    ViewBuilderVisitor.prototype.visitElementProperty = function (ast, context) { return null; };
	    return ViewBuilderVisitor;
	}());
	/**
	 * Walks up the nodes while the direct parent is a container.
	 *
	 * Returns the outer container or the node itself when it is not a direct child of a container.
	 *
	 * @internal
	 */
	function _getOuterContainerOrSelf(node) {
	    var view = node.view;
	    while (_isNgContainer(node.parent, view)) {
	        node = node.parent;
	    }
	    return node;
	}
	/**
	 * Walks up the nodes while they are container and returns the first parent which is not.
	 *
	 * Returns the parent of the outer container or the node itself when it is not a container.
	 *
	 * @internal
	 */
	function _getOuterContainerParentOrSelf(el) {
	    var view = el.view;
	    while (_isNgContainer(el, view)) {
	        el = el.parent;
	    }
	    return el;
	}
	function _isNgContainer(node, view) {
	    return !node.isNull() && node.sourceAst.name === NG_CONTAINER_TAG &&
	        node.view === view;
	}
	function _mergeHtmlAndDirectiveAttrs(declaredHtmlAttrs, directives) {
	    var result = {};
	    collection_1.StringMapWrapper.forEach(declaredHtmlAttrs, function (value, key) { result[key] = value; });
	    directives.forEach(function (directiveMeta) {
	        collection_1.StringMapWrapper.forEach(directiveMeta.hostAttributes, function (value, name) {
	            var prevValue = result[name];
	            result[name] = lang_1.isPresent(prevValue) ? mergeAttributeValue(name, prevValue, value) : value;
	        });
	    });
	    return mapToKeyValueArray(result);
	}
	function _readHtmlAttrs(attrs) {
	    var htmlAttrs = {};
	    attrs.forEach(function (ast) { htmlAttrs[ast.name] = ast.value; });
	    return htmlAttrs;
	}
	function mergeAttributeValue(attrName, attrValue1, attrValue2) {
	    if (attrName == CLASS_ATTR || attrName == STYLE_ATTR) {
	        return attrValue1 + " " + attrValue2;
	    }
	    else {
	        return attrValue2;
	    }
	}
	function mapToKeyValueArray(data) {
	    var entryArray = [];
	    collection_1.StringMapWrapper.forEach(data, function (value, name) {
	        entryArray.push([name, value]);
	    });
	    // We need to sort to get a defined output order
	    // for tests and for caching generated artifacts...
	    collection_1.ListWrapper.sort(entryArray, function (entry1, entry2) { return lang_1.StringWrapper.compare(entry1[0], entry2[0]); });
	    return entryArray;
	}
	function createViewTopLevelStmts(view, targetStatements) {
	    var nodeDebugInfosVar = o.NULL_EXPR;
	    if (view.genConfig.genDebugInfo) {
	        nodeDebugInfosVar = o.variable("nodeDebugInfos_" + view.component.type.name + view.viewIndex); // fix highlighting: `
	        targetStatements.push(nodeDebugInfosVar
	            .set(o.literalArr(view.nodes.map(createStaticNodeDebugInfo), new o.ArrayType(new o.ExternalType(identifiers_1.Identifiers.StaticNodeDebugInfo), [o.TypeModifier.Const])))
	            .toDeclStmt(null, [o.StmtModifier.Final]));
	    }
	    var renderCompTypeVar = o.variable("renderType_" + view.component.type.name); // fix highlighting: `
	    if (view.viewIndex === 0) {
	        targetStatements.push(renderCompTypeVar.set(o.NULL_EXPR)
	            .toDeclStmt(o.importType(identifiers_1.Identifiers.RenderComponentType)));
	    }
	    var viewClass = createViewClass(view, renderCompTypeVar, nodeDebugInfosVar);
	    targetStatements.push(viewClass);
	    targetStatements.push(createViewFactory(view, viewClass, renderCompTypeVar));
	}
	function createStaticNodeDebugInfo(node) {
	    var compileElement = node instanceof compile_element_1.CompileElement ? node : null;
	    var providerTokens = [];
	    var componentToken = o.NULL_EXPR;
	    var varTokenEntries = [];
	    if (lang_1.isPresent(compileElement)) {
	        providerTokens = compileElement.getProviderTokens();
	        if (lang_1.isPresent(compileElement.component)) {
	            componentToken = util_1.createDiTokenExpression(identifiers_1.identifierToken(compileElement.component.type));
	        }
	        collection_1.StringMapWrapper.forEach(compileElement.referenceTokens, function (token, varName) {
	            varTokenEntries.push([varName, lang_1.isPresent(token) ? util_1.createDiTokenExpression(token) : o.NULL_EXPR]);
	        });
	    }
	    return o.importExpr(identifiers_1.Identifiers.StaticNodeDebugInfo)
	        .instantiate([
	        o.literalArr(providerTokens, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])),
	        componentToken,
	        o.literalMap(varTokenEntries, new o.MapType(o.DYNAMIC_TYPE, [o.TypeModifier.Const]))
	    ], o.importType(identifiers_1.Identifiers.StaticNodeDebugInfo, null, [o.TypeModifier.Const]));
	}
	function createViewClass(view, renderCompTypeVar, nodeDebugInfosVar) {
	    var viewConstructorArgs = [
	        new o.FnParam(constants_1.ViewConstructorVars.viewUtils.name, o.importType(identifiers_1.Identifiers.ViewUtils)),
	        new o.FnParam(constants_1.ViewConstructorVars.parentInjector.name, o.importType(identifiers_1.Identifiers.Injector)),
	        new o.FnParam(constants_1.ViewConstructorVars.declarationEl.name, o.importType(identifiers_1.Identifiers.AppElement))
	    ];
	    var superConstructorArgs = [
	        o.variable(view.className), renderCompTypeVar, constants_1.ViewTypeEnum.fromValue(view.viewType),
	        constants_1.ViewConstructorVars.viewUtils, constants_1.ViewConstructorVars.parentInjector,
	        constants_1.ViewConstructorVars.declarationEl,
	        constants_1.ChangeDetectorStatusEnum.fromValue(getChangeDetectionMode(view))
	    ];
	    if (view.genConfig.genDebugInfo) {
	        superConstructorArgs.push(nodeDebugInfosVar);
	    }
	    var viewConstructor = new o.ClassMethod(null, viewConstructorArgs, [o.SUPER_EXPR.callFn(superConstructorArgs).toStmt()]);
	    var viewMethods = [
	        new o.ClassMethod('createInternal', [new o.FnParam(rootSelectorVar.name, o.STRING_TYPE)], generateCreateMethod(view), o.importType(identifiers_1.Identifiers.AppElement)),
	        new o.ClassMethod('injectorGetInternal', [
	            new o.FnParam(constants_1.InjectMethodVars.token.name, o.DYNAMIC_TYPE),
	            // Note: Can't use o.INT_TYPE here as the method in AppView uses number
	            new o.FnParam(constants_1.InjectMethodVars.requestNodeIndex.name, o.NUMBER_TYPE),
	            new o.FnParam(constants_1.InjectMethodVars.notFoundResult.name, o.DYNAMIC_TYPE)
	        ], addReturnValuefNotEmpty(view.injectorGetMethod.finish(), constants_1.InjectMethodVars.notFoundResult), o.DYNAMIC_TYPE),
	        new o.ClassMethod('detectChangesInternal', [new o.FnParam(constants_1.DetectChangesVars.throwOnChange.name, o.BOOL_TYPE)], generateDetectChangesMethod(view)),
	        new o.ClassMethod('dirtyParentQueriesInternal', [], view.dirtyParentQueriesMethod.finish()),
	        new o.ClassMethod('destroyInternal', [], view.destroyMethod.finish()),
	        new o.ClassMethod('detachInternal', [], view.detachMethod.finish())
	    ].concat(view.eventHandlerMethods);
	    var superClass = view.genConfig.genDebugInfo ? identifiers_1.Identifiers.DebugAppView : identifiers_1.Identifiers.AppView;
	    var viewClass = new o.ClassStmt(view.className, o.importExpr(superClass, [getContextType(view)]), view.fields, view.getters, viewConstructor, viewMethods.filter(function (method) { return method.body.length > 0; }));
	    return viewClass;
	}
	function createViewFactory(view, viewClass, renderCompTypeVar) {
	    var viewFactoryArgs = [
	        new o.FnParam(constants_1.ViewConstructorVars.viewUtils.name, o.importType(identifiers_1.Identifiers.ViewUtils)),
	        new o.FnParam(constants_1.ViewConstructorVars.parentInjector.name, o.importType(identifiers_1.Identifiers.Injector)),
	        new o.FnParam(constants_1.ViewConstructorVars.declarationEl.name, o.importType(identifiers_1.Identifiers.AppElement))
	    ];
	    var initRenderCompTypeStmts = [];
	    var templateUrlInfo;
	    if (view.component.template.templateUrl == view.component.type.moduleUrl) {
	        templateUrlInfo =
	            view.component.type.moduleUrl + " class " + view.component.type.name + " - inline template";
	    }
	    else {
	        templateUrlInfo = view.component.template.templateUrl;
	    }
	    if (view.viewIndex === 0) {
	        initRenderCompTypeStmts = [new o.IfStmt(renderCompTypeVar.identical(o.NULL_EXPR), [
	                renderCompTypeVar
	                    .set(constants_1.ViewConstructorVars.viewUtils.callMethod('createRenderComponentType', [
	                    o.literal(templateUrlInfo),
	                    o.literal(view.component.template.ngContentSelectors.length),
	                    constants_1.ViewEncapsulationEnum.fromValue(view.component.template.encapsulation), view.styles
	                ]))
	                    .toStmt()
	            ])];
	    }
	    return o
	        .fn(viewFactoryArgs, initRenderCompTypeStmts.concat([new o.ReturnStatement(o.variable(viewClass.name)
	            .instantiate(viewClass.constructorMethod.params.map(function (param) { return o.variable(param.name); })))]), o.importType(identifiers_1.Identifiers.AppView, [getContextType(view)]))
	        .toDeclStmt(view.viewFactory.name, [o.StmtModifier.Final]);
	}
	function generateCreateMethod(view) {
	    var parentRenderNodeExpr = o.NULL_EXPR;
	    var parentRenderNodeStmts = [];
	    if (view.viewType === core_private_1.ViewType.COMPONENT) {
	        parentRenderNodeExpr = constants_1.ViewProperties.renderer.callMethod('createViewRoot', [o.THIS_EXPR.prop('declarationAppElement').prop('nativeElement')]);
	        parentRenderNodeStmts =
	            [parentRenderNodeVar.set(parentRenderNodeExpr)
	                    .toDeclStmt(o.importType(view.genConfig.renderTypes.renderNode), [o.StmtModifier.Final])];
	    }
	    var resultExpr;
	    if (view.viewType === core_private_1.ViewType.HOST) {
	        resultExpr = view.nodes[0].appElement;
	    }
	    else {
	        resultExpr = o.NULL_EXPR;
	    }
	    return parentRenderNodeStmts.concat(view.createMethod.finish(), [
	        o.THIS_EXPR
	            .callMethod('init', [
	            util_1.createFlatArray(view.rootNodesOrAppElements),
	            o.literalArr(view.nodes.map(function (node) { return node.renderNode; })), o.literalArr(view.disposables),
	            o.literalArr(view.subscriptions)
	        ])
	            .toStmt(),
	        new o.ReturnStatement(resultExpr)
	    ]);
	}
	function generateDetectChangesMethod(view) {
	    var stmts = [];
	    if (view.detectChangesInInputsMethod.isEmpty() && view.updateContentQueriesMethod.isEmpty() &&
	        view.afterContentLifecycleCallbacksMethod.isEmpty() &&
	        view.detectChangesRenderPropertiesMethod.isEmpty() &&
	        view.updateViewQueriesMethod.isEmpty() && view.afterViewLifecycleCallbacksMethod.isEmpty()) {
	        return stmts;
	    }
	    collection_1.ListWrapper.addAll(stmts, view.detectChangesInInputsMethod.finish());
	    stmts.push(o.THIS_EXPR.callMethod('detectContentChildrenChanges', [constants_1.DetectChangesVars.throwOnChange])
	        .toStmt());
	    var afterContentStmts = view.updateContentQueriesMethod.finish().concat(view.afterContentLifecycleCallbacksMethod.finish());
	    if (afterContentStmts.length > 0) {
	        stmts.push(new o.IfStmt(o.not(constants_1.DetectChangesVars.throwOnChange), afterContentStmts));
	    }
	    collection_1.ListWrapper.addAll(stmts, view.detectChangesRenderPropertiesMethod.finish());
	    stmts.push(o.THIS_EXPR.callMethod('detectViewChildrenChanges', [constants_1.DetectChangesVars.throwOnChange])
	        .toStmt());
	    var afterViewStmts = view.updateViewQueriesMethod.finish().concat(view.afterViewLifecycleCallbacksMethod.finish());
	    if (afterViewStmts.length > 0) {
	        stmts.push(new o.IfStmt(o.not(constants_1.DetectChangesVars.throwOnChange), afterViewStmts));
	    }
	    var varStmts = [];
	    var readVars = o.findReadVarNames(stmts);
	    if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.changed.name)) {
	        varStmts.push(constants_1.DetectChangesVars.changed.set(o.literal(true)).toDeclStmt(o.BOOL_TYPE));
	    }
	    if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.changes.name)) {
	        varStmts.push(constants_1.DetectChangesVars.changes.set(o.NULL_EXPR)
	            .toDeclStmt(new o.MapType(o.importType(identifiers_1.Identifiers.SimpleChange))));
	    }
	    if (collection_1.SetWrapper.has(readVars, constants_1.DetectChangesVars.valUnwrapper.name)) {
	        varStmts.push(constants_1.DetectChangesVars.valUnwrapper.set(o.importExpr(identifiers_1.Identifiers.ValueUnwrapper).instantiate([]))
	            .toDeclStmt(null, [o.StmtModifier.Final]));
	    }
	    return varStmts.concat(stmts);
	}
	function addReturnValuefNotEmpty(statements, value) {
	    if (statements.length > 0) {
	        return statements.concat([new o.ReturnStatement(value)]);
	    }
	    else {
	        return statements;
	    }
	}
	function getContextType(view) {
	    if (view.viewType === core_private_1.ViewType.COMPONENT) {
	        return o.importType(view.component.type);
	    }
	    return o.DYNAMIC_TYPE;
	}
	function getChangeDetectionMode(view) {
	    var mode;
	    if (view.viewType === core_private_1.ViewType.COMPONENT) {
	        mode = core_private_1.isDefaultChangeDetectionStrategy(view.component.changeDetection) ?
	            core_private_1.ChangeDetectorStatus.CheckAlways :
	            core_private_1.ChangeDetectorStatus.CheckOnce;
	    }
	    else {
	        mode = core_private_1.ChangeDetectorStatus.CheckAlways;
	    }
	    return mode;
	}
	//# sourceMappingURL=view_builder.js.map

/***/ }),

/***/ 591:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var async_1 = __webpack_require__(592);
	var compile_metadata_1 = __webpack_require__(565);
	var style_compiler_1 = __webpack_require__(594);
	var view_compiler_1 = __webpack_require__(571);
	var template_parser_1 = __webpack_require__(543);
	var directive_normalizer_1 = __webpack_require__(596);
	var metadata_resolver_1 = __webpack_require__(598);
	var config_1 = __webpack_require__(568);
	var ir = __webpack_require__(570);
	var output_jit_1 = __webpack_require__(604);
	var output_interpreter_1 = __webpack_require__(607);
	var interpretive_view_1 = __webpack_require__(610);
	var RuntimeCompiler = (function () {
	    function RuntimeCompiler(_metadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _genConfig) {
	        this._metadataResolver = _metadataResolver;
	        this._templateNormalizer = _templateNormalizer;
	        this._templateParser = _templateParser;
	        this._styleCompiler = _styleCompiler;
	        this._viewCompiler = _viewCompiler;
	        this._genConfig = _genConfig;
	        this._compiledTemplateCache = new Map();
	        this._compiledHostTemplateCache = new Map();
	    }
	    RuntimeCompiler.prototype.resolveComponent = function (component) {
	        if (lang_1.isString(component)) {
	            return async_1.PromiseWrapper.reject(new exceptions_1.BaseException("Cannot resolve component using '" + component + "'."), null);
	        }
	        return this.compileComponentAsync(component);
	    };
	    RuntimeCompiler.prototype.compileComponentAsync = function (compType) {
	        var _this = this;
	        var templates = this._getTransitiveCompiledTemplates(compType, true);
	        var loadingPromises = [];
	        templates.forEach(function (template) {
	            if (template.loading) {
	                loadingPromises.push(template.loading);
	            }
	        });
	        return Promise.all(loadingPromises).then(function () {
	            templates.forEach(function (template) { _this._compileTemplate(template); });
	            return _this._getCompiledHostTemplate(compType).proxyComponentFactory;
	        });
	    };
	    RuntimeCompiler.prototype.compileComponentSync = function (compType) {
	        var _this = this;
	        var templates = this._getTransitiveCompiledTemplates(compType, true);
	        templates.forEach(function (template) {
	            if (template.loading) {
	                throw new exceptions_1.BaseException("Can't compile synchronously as " + template.compType.name + " is still being loaded!");
	            }
	        });
	        templates.forEach(function (template) { _this._compileTemplate(template); });
	        return this._getCompiledHostTemplate(compType).proxyComponentFactory;
	    };
	    RuntimeCompiler.prototype.clearCacheFor = function (compType) {
	        this._metadataResolver.clearCacheFor(compType);
	        this._compiledHostTemplateCache.delete(compType);
	        var compiledTemplate = this._compiledTemplateCache.get(compType);
	        if (compiledTemplate) {
	            this._templateNormalizer.clearCacheFor(compiledTemplate.normalizedCompMeta);
	            this._compiledTemplateCache.delete(compType);
	        }
	    };
	    RuntimeCompiler.prototype.clearCache = function () {
	        this._metadataResolver.clearCache();
	        this._compiledTemplateCache.clear();
	        this._compiledHostTemplateCache.clear();
	        this._templateNormalizer.clearCache();
	    };
	    RuntimeCompiler.prototype._getCompiledHostTemplate = function (type) {
	        var compiledTemplate = this._compiledHostTemplateCache.get(type);
	        if (lang_1.isBlank(compiledTemplate)) {
	            var compMeta = this._metadataResolver.getDirectiveMetadata(type);
	            assertComponent(compMeta);
	            var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta.type, compMeta.selector);
	            compiledTemplate = new CompiledTemplate(true, compMeta.selector, compMeta.type, [], [type], [], [], this._templateNormalizer.normalizeDirective(hostMeta));
	            this._compiledHostTemplateCache.set(type, compiledTemplate);
	        }
	        return compiledTemplate;
	    };
	    RuntimeCompiler.prototype._getCompiledTemplate = function (type) {
	        var compiledTemplate = this._compiledTemplateCache.get(type);
	        if (lang_1.isBlank(compiledTemplate)) {
	            var compMeta = this._metadataResolver.getDirectiveMetadata(type);
	            assertComponent(compMeta);
	            var viewDirectives = [];
	            var viewComponentTypes = [];
	            this._metadataResolver.getViewDirectivesMetadata(type).forEach(function (dirOrComp) {
	                if (dirOrComp.isComponent) {
	                    viewComponentTypes.push(dirOrComp.type.runtime);
	                }
	                else {
	                    viewDirectives.push(dirOrComp);
	                }
	            });
	            var precompileComponentTypes = compMeta.precompile.map(function (typeMeta) { return typeMeta.runtime; });
	            var pipes = this._metadataResolver.getViewPipesMetadata(type);
	            compiledTemplate = new CompiledTemplate(false, compMeta.selector, compMeta.type, viewDirectives, viewComponentTypes, precompileComponentTypes, pipes, this._templateNormalizer.normalizeDirective(compMeta));
	            this._compiledTemplateCache.set(type, compiledTemplate);
	        }
	        return compiledTemplate;
	    };
	    RuntimeCompiler.prototype._getTransitiveCompiledTemplates = function (compType, isHost, target) {
	        var _this = this;
	        if (target === void 0) { target = new Set(); }
	        var template = isHost ? this._getCompiledHostTemplate(compType) : this._getCompiledTemplate(compType);
	        if (!target.has(template)) {
	            target.add(template);
	            template.viewComponentTypes.forEach(function (compType) { _this._getTransitiveCompiledTemplates(compType, false, target); });
	            template.precompileHostComponentTypes.forEach(function (compType) { _this._getTransitiveCompiledTemplates(compType, true, target); });
	        }
	        return target;
	    };
	    RuntimeCompiler.prototype._compileTemplate = function (template) {
	        var _this = this;
	        if (template.isCompiled) {
	            return;
	        }
	        var compMeta = template.normalizedCompMeta;
	        var externalStylesheetsByModuleUrl = new Map();
	        var stylesCompileResult = this._styleCompiler.compileComponent(compMeta);
	        stylesCompileResult.externalStylesheets.forEach(function (r) { externalStylesheetsByModuleUrl.set(r.meta.moduleUrl, r); });
	        this._resolveStylesCompileResult(stylesCompileResult.componentStylesheet, externalStylesheetsByModuleUrl);
	        var viewCompMetas = template.viewComponentTypes.map(function (compType) { return _this._getCompiledTemplate(compType).normalizedCompMeta; });
	        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, template.viewDirectives.concat(viewCompMetas), template.viewPipes, compMeta.type.name);
	        var compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, ir.variable(stylesCompileResult.componentStylesheet.stylesVar), template.viewPipes);
	        var depTemplates = compileResult.dependencies.map(function (dep) {
	            var depTemplate;
	            if (dep instanceof view_compiler_1.ViewFactoryDependency) {
	                var vfd = dep;
	                depTemplate = _this._getCompiledTemplate(vfd.comp.runtime);
	                vfd.placeholder.runtime = depTemplate.proxyViewFactory;
	                vfd.placeholder.name = "viewFactory_" + vfd.comp.name;
	            }
	            else if (dep instanceof view_compiler_1.ComponentFactoryDependency) {
	                var cfd = dep;
	                depTemplate = _this._getCompiledHostTemplate(cfd.comp.runtime);
	                cfd.placeholder.runtime = depTemplate.proxyComponentFactory;
	                cfd.placeholder.name = "compFactory_" + cfd.comp.name;
	            }
	            return depTemplate;
	        });
	        var statements = stylesCompileResult.componentStylesheet.statements.concat(compileResult.statements);
	        var factory;
	        if (lang_1.IS_DART || !this._genConfig.useJit) {
	            factory = output_interpreter_1.interpretStatements(statements, compileResult.viewFactoryVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
	        }
	        else {
	            factory = output_jit_1.jitStatements(template.compType.name + ".template.js", statements, compileResult.viewFactoryVar);
	        }
	        template.compiled(factory);
	    };
	    RuntimeCompiler.prototype._resolveStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
	        var _this = this;
	        result.dependencies.forEach(function (dep, i) {
	            var nestedCompileResult = externalStylesheetsByModuleUrl.get(dep.moduleUrl);
	            var nestedStylesArr = _this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
	            dep.valuePlaceholder.runtime = nestedStylesArr;
	            dep.valuePlaceholder.name = "importedStyles" + i;
	        });
	    };
	    RuntimeCompiler.prototype._resolveAndEvalStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
	        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
	        if (lang_1.IS_DART || !this._genConfig.useJit) {
	            return output_interpreter_1.interpretStatements(result.statements, result.stylesVar, new interpretive_view_1.InterpretiveAppViewInstanceFactory());
	        }
	        else {
	            return output_jit_1.jitStatements(result.meta.moduleUrl + ".css.js", result.statements, result.stylesVar);
	        }
	    };
	    /** @nocollapse */
	    RuntimeCompiler.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    RuntimeCompiler.ctorParameters = [
	        { type: metadata_resolver_1.CompileMetadataResolver, },
	        { type: directive_normalizer_1.DirectiveNormalizer, },
	        { type: template_parser_1.TemplateParser, },
	        { type: style_compiler_1.StyleCompiler, },
	        { type: view_compiler_1.ViewCompiler, },
	        { type: config_1.CompilerConfig, },
	    ];
	    return RuntimeCompiler;
	}());
	exports.RuntimeCompiler = RuntimeCompiler;
	var CompiledTemplate = (function () {
	    function CompiledTemplate(isHost, selector, compType, viewDirectives, viewComponentTypes, precompileHostComponentTypes, viewPipes, _normalizeResult) {
	        var _this = this;
	        this.isHost = isHost;
	        this.compType = compType;
	        this.viewDirectives = viewDirectives;
	        this.viewComponentTypes = viewComponentTypes;
	        this.precompileHostComponentTypes = precompileHostComponentTypes;
	        this.viewPipes = viewPipes;
	        this._normalizeResult = _normalizeResult;
	        this._viewFactory = null;
	        this.loading = null;
	        this._normalizedCompMeta = null;
	        this.isCompiled = false;
	        this.isCompiledWithDeps = false;
	        this.proxyViewFactory = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            return _this._viewFactory.apply(null, args);
	        };
	        this.proxyComponentFactory = isHost ?
	            new core_1.ComponentFactory(selector, this.proxyViewFactory, compType.runtime) :
	            null;
	        if (_normalizeResult.syncResult) {
	            this._normalizedCompMeta = _normalizeResult.syncResult;
	        }
	        else {
	            this.loading = _normalizeResult.asyncResult.then(function (normalizedCompMeta) {
	                _this._normalizedCompMeta = normalizedCompMeta;
	                _this.loading = null;
	            });
	        }
	    }
	    Object.defineProperty(CompiledTemplate.prototype, "normalizedCompMeta", {
	        get: function () {
	            if (this.loading) {
	                throw new exceptions_1.BaseException("Template is still loading for " + this.compType.name + "!");
	            }
	            return this._normalizedCompMeta;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    CompiledTemplate.prototype.compiled = function (viewFactory) {
	        this._viewFactory = viewFactory;
	        this.isCompiled = true;
	    };
	    CompiledTemplate.prototype.depsCompiled = function () { this.isCompiledWithDeps = true; };
	    return CompiledTemplate;
	}());
	function assertComponent(meta) {
	    if (!meta.isComponent) {
	        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
	    }
	}
	//# sourceMappingURL=runtime_compiler.js.map

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(2);
	var PromiseObservable_1 = __webpack_require__(54);
	var toPromise_1 = __webpack_require__(260);
	var lang_1 = __webpack_require__(542);
	var Observable_1 = __webpack_require__(3);
	exports.Observable = Observable_1.Observable;
	var Subject_2 = __webpack_require__(2);
	exports.Subject = Subject_2.Subject;
	var promise_1 = __webpack_require__(593);
	exports.PromiseCompleter = promise_1.PromiseCompleter;
	exports.PromiseWrapper = promise_1.PromiseWrapper;
	var TimerWrapper = (function () {
	    function TimerWrapper() {
	    }
	    TimerWrapper.setTimeout = function (fn, millis) {
	        return lang_1.global.setTimeout(fn, millis);
	    };
	    TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
	    TimerWrapper.setInterval = function (fn, millis) {
	        return lang_1.global.setInterval(fn, millis);
	    };
	    TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
	    return TimerWrapper;
	}());
	exports.TimerWrapper = TimerWrapper;
	var ObservableWrapper = (function () {
	    function ObservableWrapper() {
	    }
	    // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
	    ObservableWrapper.subscribe = function (emitter, onNext, onError, onComplete) {
	        if (onComplete === void 0) { onComplete = function () { }; }
	        onError = (typeof onError === 'function') && onError || lang_1.noop;
	        onComplete = (typeof onComplete === 'function') && onComplete || lang_1.noop;
	        return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
	    };
	    ObservableWrapper.isObservable = function (obs) { return !!obs.subscribe; };
	    /**
	     * Returns whether `obs` has any subscribers listening to events.
	     */
	    ObservableWrapper.hasSubscribers = function (obs) { return obs.observers.length > 0; };
	    ObservableWrapper.dispose = function (subscription) { subscription.unsubscribe(); };
	    /**
	     * @deprecated - use callEmit() instead
	     */
	    ObservableWrapper.callNext = function (emitter, value) { emitter.emit(value); };
	    ObservableWrapper.callEmit = function (emitter, value) { emitter.emit(value); };
	    ObservableWrapper.callError = function (emitter, error) { emitter.error(error); };
	    ObservableWrapper.callComplete = function (emitter) { emitter.complete(); };
	    ObservableWrapper.fromPromise = function (promise) {
	        return PromiseObservable_1.PromiseObservable.create(promise);
	    };
	    ObservableWrapper.toPromise = function (obj) { return toPromise_1.toPromise.call(obj); };
	    return ObservableWrapper;
	}());
	exports.ObservableWrapper = ObservableWrapper;
	/**
	 * Use by directives and components to emit custom Events.
	 *
	 * ### Examples
	 *
	 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
	 * title gets clicked:
	 *
	 * ```
	 * @Component({
	 *   selector: 'zippy',
	 *   template: `
	 *   <div class="zippy">
	 *     <div (click)="toggle()">Toggle</div>
	 *     <div [hidden]="!visible">
	 *       <ng-content></ng-content>
	 *     </div>
	 *  </div>`})
	 * export class Zippy {
	 *   visible: boolean = true;
	 *   @Output() open: EventEmitter<any> = new EventEmitter();
	 *   @Output() close: EventEmitter<any> = new EventEmitter();
	 *
	 *   toggle() {
	 *     this.visible = !this.visible;
	 *     if (this.visible) {
	 *       this.open.emit(null);
	 *     } else {
	 *       this.close.emit(null);
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * The events payload can be accessed by the parameter `$event` on the components output event
	 * handler:
	 *
	 * ```
	 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
	 * ```
	 *
	 * Uses Rx.Observable but provides an adapter to make it work as specified here:
	 * https://github.com/jhusain/observable-spec
	 *
	 * Once a reference implementation of the spec is available, switch to it.
	 * @stable
	 */
	var EventEmitter = (function (_super) {
	    __extends(EventEmitter, _super);
	    /**
	     * Creates an instance of [EventEmitter], which depending on [isAsync],
	     * delivers events synchronously or asynchronously.
	     */
	    function EventEmitter(isAsync) {
	        if (isAsync === void 0) { isAsync = false; }
	        _super.call(this);
	        this.__isAsync = isAsync;
	    }
	    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
	    /**
	     * @deprecated - use .emit(value) instead
	     */
	    EventEmitter.prototype.next = function (value) { _super.prototype.next.call(this, value); };
	    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
	        var schedulerFn;
	        var errorFn = function (err) { return null; };
	        var completeFn = function () { return null; };
	        if (generatorOrNext && typeof generatorOrNext === 'object') {
	            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                setTimeout(function () { return generatorOrNext.next(value); });
	            } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
	            if (generatorOrNext.error) {
	                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
	                    function (err) { generatorOrNext.error(err); };
	            }
	            if (generatorOrNext.complete) {
	                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
	                    function () { generatorOrNext.complete(); };
	            }
	        }
	        else {
	            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                setTimeout(function () { return generatorOrNext(value); });
	            } : function (value /** TODO #9100 */) { generatorOrNext(value); };
	            if (error) {
	                errorFn =
	                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
	            }
	            if (complete) {
	                completeFn =
	                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
	            }
	        }
	        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
	    };
	    return EventEmitter;
	}(Subject_1.Subject));
	exports.EventEmitter = EventEmitter;
	//# sourceMappingURL=async.js.map

/***/ }),

/***/ 593:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var PromiseCompleter = (function () {
	    function PromiseCompleter() {
	        var _this = this;
	        this.promise = new Promise(function (res, rej) {
	            _this.resolve = res;
	            _this.reject = rej;
	        });
	    }
	    return PromiseCompleter;
	}());
	exports.PromiseCompleter = PromiseCompleter;
	var PromiseWrapper = (function () {
	    function PromiseWrapper() {
	    }
	    PromiseWrapper.resolve = function (obj) { return Promise.resolve(obj); };
	    PromiseWrapper.reject = function (obj, _) { return Promise.reject(obj); };
	    // Note: We can't rename this method into `catch`, as this is not a valid
	    // method name in Dart.
	    PromiseWrapper.catchError = function (promise, onError) {
	        return promise.catch(onError);
	    };
	    PromiseWrapper.all = function (promises) {
	        if (promises.length == 0)
	            return Promise.resolve([]);
	        return Promise.all(promises);
	    };
	    PromiseWrapper.then = function (promise, success, rejection) {
	        return promise.then(success, rejection);
	    };
	    PromiseWrapper.wrap = function (computation) {
	        return new Promise(function (res, rej) {
	            try {
	                res(computation());
	            }
	            catch (e) {
	                rej(e);
	            }
	        });
	    };
	    PromiseWrapper.scheduleMicrotask = function (computation) {
	        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function (_) { });
	    };
	    PromiseWrapper.completer = function () { return new PromiseCompleter(); };
	    return PromiseWrapper;
	}());
	exports.PromiseWrapper = PromiseWrapper;
	//# sourceMappingURL=promise.js.map

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var compile_metadata_1 = __webpack_require__(565);
	var o = __webpack_require__(570);
	var shadow_css_1 = __webpack_require__(595);
	var url_resolver_1 = __webpack_require__(566);
	var COMPONENT_VARIABLE = '%COMP%';
	var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
	var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
	var StylesCompileDependency = (function () {
	    function StylesCompileDependency(moduleUrl, isShimmed, valuePlaceholder) {
	        this.moduleUrl = moduleUrl;
	        this.isShimmed = isShimmed;
	        this.valuePlaceholder = valuePlaceholder;
	    }
	    return StylesCompileDependency;
	}());
	exports.StylesCompileDependency = StylesCompileDependency;
	var StylesCompileResult = (function () {
	    function StylesCompileResult(componentStylesheet, externalStylesheets) {
	        this.componentStylesheet = componentStylesheet;
	        this.externalStylesheets = externalStylesheets;
	    }
	    return StylesCompileResult;
	}());
	exports.StylesCompileResult = StylesCompileResult;
	var CompiledStylesheet = (function () {
	    function CompiledStylesheet(statements, stylesVar, dependencies, isShimmed, meta) {
	        this.statements = statements;
	        this.stylesVar = stylesVar;
	        this.dependencies = dependencies;
	        this.isShimmed = isShimmed;
	        this.meta = meta;
	    }
	    return CompiledStylesheet;
	}());
	exports.CompiledStylesheet = CompiledStylesheet;
	var StyleCompiler = (function () {
	    function StyleCompiler(_urlResolver) {
	        this._urlResolver = _urlResolver;
	        this._shadowCss = new shadow_css_1.ShadowCss();
	    }
	    StyleCompiler.prototype.compileComponent = function (comp) {
	        var _this = this;
	        var shim = comp.template.encapsulation === core_1.ViewEncapsulation.Emulated;
	        var externalStylesheets = [];
	        var componentStylesheet = this._compileStyles(comp, new compile_metadata_1.CompileStylesheetMetadata({
	            styles: comp.template.styles,
	            styleUrls: comp.template.styleUrls,
	            moduleUrl: comp.type.moduleUrl
	        }), true);
	        comp.template.externalStylesheets.forEach(function (stylesheetMeta) {
	            var compiledStylesheet = _this._compileStyles(comp, stylesheetMeta, false);
	            externalStylesheets.push(compiledStylesheet);
	        });
	        return new StylesCompileResult(componentStylesheet, externalStylesheets);
	    };
	    StyleCompiler.prototype._compileStyles = function (comp, stylesheet, isComponentStylesheet) {
	        var _this = this;
	        var shim = comp.template.encapsulation === core_1.ViewEncapsulation.Emulated;
	        var styleExpressions = stylesheet.styles.map(function (plainStyle) { return o.literal(_this._shimIfNeeded(plainStyle, shim)); });
	        var dependencies = [];
	        for (var i = 0; i < stylesheet.styleUrls.length; i++) {
	            var identifier = new compile_metadata_1.CompileIdentifierMetadata({ name: getStylesVarName(null) });
	            dependencies.push(new StylesCompileDependency(stylesheet.styleUrls[i], shim, identifier));
	            styleExpressions.push(new o.ExternalExpr(identifier));
	        }
	        // styles variable contains plain strings and arrays of other styles arrays (recursive),
	        // so we set its type to dynamic.
	        var stylesVar = getStylesVarName(isComponentStylesheet ? comp : null);
	        var stmt = o.variable(stylesVar)
	            .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
	            .toDeclStmt(null, [o.StmtModifier.Final]);
	        return new CompiledStylesheet([stmt], stylesVar, dependencies, shim, stylesheet);
	    };
	    StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
	        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
	    };
	    /** @nocollapse */
	    StyleCompiler.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    StyleCompiler.ctorParameters = [
	        { type: url_resolver_1.UrlResolver, },
	    ];
	    return StyleCompiler;
	}());
	exports.StyleCompiler = StyleCompiler;
	function getStylesVarName(component) {
	    var result = "styles";
	    if (component) {
	        result += "_" + component.type.name;
	    }
	    return result;
	}
	//# sourceMappingURL=style_compiler.js.map

/***/ }),

/***/ 595:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	/**
	 * This file is a port of shadowCSS from webcomponents.js to TypeScript.
	 *
	 * Please make sure to keep to edits in sync with the source file.
	 *
	 * Source:
	 * https://github.com/webcomponents/webcomponentsjs/blob/4efecd7e0e/src/ShadowCSS/ShadowCSS.js
	 *
	 * The original file level comment is reproduced below
	 */
	/*
	  This is a limited shim for ShadowDOM css styling.
	  https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#styles
	
	  The intention here is to support only the styling features which can be
	  relatively simply implemented. The goal is to allow users to avoid the
	  most obvious pitfalls and do so without compromising performance significantly.
	  For ShadowDOM styling that's not covered here, a set of best practices
	  can be provided that should allow users to accomplish more complex styling.
	
	  The following is a list of specific ShadowDOM styling features and a brief
	  discussion of the approach used to shim.
	
	  Shimmed features:
	
	  * :host, :host-context: ShadowDOM allows styling of the shadowRoot's host
	  element using the :host rule. To shim this feature, the :host styles are
	  reformatted and prefixed with a given scope name and promoted to a
	  document level stylesheet.
	  For example, given a scope name of .foo, a rule like this:
	
	    :host {
	        background: red;
	      }
	    }
	
	  becomes:
	
	    .foo {
	      background: red;
	    }
	
	  * encapsultion: Styles defined within ShadowDOM, apply only to
	  dom inside the ShadowDOM. Polymer uses one of two techniques to implement
	  this feature.
	
	  By default, rules are prefixed with the host element tag name
	  as a descendant selector. This ensures styling does not leak out of the 'top'
	  of the element's ShadowDOM. For example,
	
	  div {
	      font-weight: bold;
	    }
	
	  becomes:
	
	  x-foo div {
	      font-weight: bold;
	    }
	
	  becomes:
	
	
	  Alternatively, if WebComponents.ShadowCSS.strictStyling is set to true then
	  selectors are scoped by adding an attribute selector suffix to each
	  simple selector that contains the host element tag name. Each element
	  in the element's ShadowDOM template is also given the scope attribute.
	  Thus, these rules match only elements that have the scope attribute.
	  For example, given a scope name of x-foo, a rule like this:
	
	    div {
	      font-weight: bold;
	    }
	
	  becomes:
	
	    div[x-foo] {
	      font-weight: bold;
	    }
	
	  Note that elements that are dynamically added to a scope must have the scope
	  selector added to them manually.
	
	  * upper/lower bound encapsulation: Styles which are defined outside a
	  shadowRoot should not cross the ShadowDOM boundary and should not apply
	  inside a shadowRoot.
	
	  This styling behavior is not emulated. Some possible ways to do this that
	  were rejected due to complexity and/or performance concerns include: (1) reset
	  every possible property for every possible selector for a given scope name;
	  (2) re-implement css in javascript.
	
	  As an alternative, users should make sure to use selectors
	  specific to the scope in which they are working.
	
	  * ::distributed: This behavior is not emulated. It's often not necessary
	  to style the contents of a specific insertion point and instead, descendants
	  of the host element can be styled selectively. Users can also create an
	  extra node around an insertion point and style that node's contents
	  via descendent selectors. For example, with a shadowRoot like this:
	
	    <style>
	      ::content(div) {
	        background: red;
	      }
	    </style>
	    <content></content>
	
	  could become:
	
	    <style>
	      / *@polyfill .content-container div * /
	      ::content(div) {
	        background: red;
	      }
	    </style>
	    <div class="content-container">
	      <content></content>
	    </div>
	
	  Note the use of @polyfill in the comment above a ShadowDOM specific style
	  declaration. This is a directive to the styling shim to use the selector
	  in comments in lieu of the next selector when running under polyfill.
	*/
	var ShadowCss = (function () {
	    function ShadowCss() {
	        this.strictStyling = true;
	    }
	    /*
	    * Shim some cssText with the given selector. Returns cssText that can
	    * be included in the document via WebComponents.ShadowCSS.addCssToDocument(css).
	    *
	    * When strictStyling is true:
	    * - selector is the attribute added to all elements inside the host,
	    * - hostSelector is the attribute added to the host itself.
	    */
	    ShadowCss.prototype.shimCssText = function (cssText, selector, hostSelector) {
	        if (hostSelector === void 0) { hostSelector = ''; }
	        cssText = stripComments(cssText);
	        cssText = this._insertDirectives(cssText);
	        return this._scopeCssText(cssText, selector, hostSelector);
	    };
	    ShadowCss.prototype._insertDirectives = function (cssText) {
	        cssText = this._insertPolyfillDirectivesInCssText(cssText);
	        return this._insertPolyfillRulesInCssText(cssText);
	    };
	    /*
	     * Process styles to convert native ShadowDOM rules that will trip
	     * up the css parser; we rely on decorating the stylesheet with inert rules.
	     *
	     * For example, we convert this rule:
	     *
	     * polyfill-next-selector { content: ':host menu-item'; }
	     * ::content menu-item {
	     *
	     * to this:
	     *
	     * scopeName menu-item {
	     *
	    **/
	    ShadowCss.prototype._insertPolyfillDirectivesInCssText = function (cssText) {
	        // Difference with webcomponents.js: does not handle comments
	        return lang_1.StringWrapper.replaceAllMapped(cssText, _cssContentNextSelectorRe, function (m /** TODO #9100 */) { return m[1] + '{'; });
	    };
	    /*
	     * Process styles to add rules which will only apply under the polyfill
	     *
	     * For example, we convert this rule:
	     *
	     * polyfill-rule {
	     *   content: ':host menu-item';
	     * ...
	     * }
	     *
	     * to this:
	     *
	     * scopeName menu-item {...}
	     *
	    **/
	    ShadowCss.prototype._insertPolyfillRulesInCssText = function (cssText) {
	        // Difference with webcomponents.js: does not handle comments
	        return lang_1.StringWrapper.replaceAllMapped(cssText, _cssContentRuleRe, function (m /** TODO #9100 */) {
	            var rule = m[0];
	            rule = lang_1.StringWrapper.replace(rule, m[1], '');
	            rule = lang_1.StringWrapper.replace(rule, m[2], '');
	            return m[3] + rule;
	        });
	    };
	    /* Ensure styles are scoped. Pseudo-scoping takes a rule like:
	     *
	     *  .foo {... }
	     *
	     *  and converts this to
	     *
	     *  scopeName .foo { ... }
	    */
	    ShadowCss.prototype._scopeCssText = function (cssText, scopeSelector, hostSelector) {
	        var unscoped = this._extractUnscopedRulesFromCssText(cssText);
	        cssText = this._insertPolyfillHostInCssText(cssText);
	        cssText = this._convertColonHost(cssText);
	        cssText = this._convertColonHostContext(cssText);
	        cssText = this._convertShadowDOMSelectors(cssText);
	        if (lang_1.isPresent(scopeSelector)) {
	            cssText = this._scopeSelectors(cssText, scopeSelector, hostSelector);
	        }
	        cssText = cssText + '\n' + unscoped;
	        return cssText.trim();
	    };
	    /*
	     * Process styles to add rules which will only apply under the polyfill
	     * and do not process via CSSOM. (CSSOM is destructive to rules on rare
	     * occasions, e.g. -webkit-calc on Safari.)
	     * For example, we convert this rule:
	     *
	     * @polyfill-unscoped-rule {
	     *   content: 'menu-item';
	     * ... }
	     *
	     * to this:
	     *
	     * menu-item {...}
	     *
	    **/
	    ShadowCss.prototype._extractUnscopedRulesFromCssText = function (cssText) {
	        // Difference with webcomponents.js: does not handle comments
	        var r = '', m;
	        var matcher = lang_1.RegExpWrapper.matcher(_cssContentUnscopedRuleRe, cssText);
	        while (lang_1.isPresent(m = lang_1.RegExpMatcherWrapper.next(matcher))) {
	            var rule = m[0];
	            rule = lang_1.StringWrapper.replace(rule, m[2], '');
	            rule = lang_1.StringWrapper.replace(rule, m[1], m[3]);
	            r += rule + '\n\n';
	        }
	        return r;
	    };
	    /*
	     * convert a rule like :host(.foo) > .bar { }
	     *
	     * to
	     *
	     * scopeName.foo > .bar
	    */
	    ShadowCss.prototype._convertColonHost = function (cssText) {
	        return this._convertColonRule(cssText, _cssColonHostRe, this._colonHostPartReplacer);
	    };
	    /*
	     * convert a rule like :host-context(.foo) > .bar { }
	     *
	     * to
	     *
	     * scopeName.foo > .bar, .foo scopeName > .bar { }
	     *
	     * and
	     *
	     * :host-context(.foo:host) .bar { ... }
	     *
	     * to
	     *
	     * scopeName.foo .bar { ... }
	    */
	    ShadowCss.prototype._convertColonHostContext = function (cssText) {
	        return this._convertColonRule(cssText, _cssColonHostContextRe, this._colonHostContextPartReplacer);
	    };
	    ShadowCss.prototype._convertColonRule = function (cssText, regExp, partReplacer) {
	        // p1 = :host, p2 = contents of (), p3 rest of rule
	        return lang_1.StringWrapper.replaceAllMapped(cssText, regExp, function (m /** TODO #9100 */) {
	            if (lang_1.isPresent(m[2])) {
	                var parts = m[2].split(','), r = [];
	                for (var i = 0; i < parts.length; i++) {
	                    var p = parts[i];
	                    if (lang_1.isBlank(p))
	                        break;
	                    p = p.trim();
	                    r.push(partReplacer(_polyfillHostNoCombinator, p, m[3]));
	                }
	                return r.join(',');
	            }
	            else {
	                return _polyfillHostNoCombinator + m[3];
	            }
	        });
	    };
	    ShadowCss.prototype._colonHostContextPartReplacer = function (host, part, suffix) {
	        if (lang_1.StringWrapper.contains(part, _polyfillHost)) {
	            return this._colonHostPartReplacer(host, part, suffix);
	        }
	        else {
	            return host + part + suffix + ', ' + part + ' ' + host + suffix;
	        }
	    };
	    ShadowCss.prototype._colonHostPartReplacer = function (host, part, suffix) {
	        return host + lang_1.StringWrapper.replace(part, _polyfillHost, '') + suffix;
	    };
	    /*
	     * Convert combinators like ::shadow and pseudo-elements like ::content
	     * by replacing with space.
	    */
	    ShadowCss.prototype._convertShadowDOMSelectors = function (cssText) {
	        for (var i = 0; i < _shadowDOMSelectorsRe.length; i++) {
	            cssText = lang_1.StringWrapper.replaceAll(cssText, _shadowDOMSelectorsRe[i], ' ');
	        }
	        return cssText;
	    };
	    // change a selector like 'div' to 'name div'
	    ShadowCss.prototype._scopeSelectors = function (cssText, scopeSelector, hostSelector) {
	        var _this = this;
	        return processRules(cssText, function (rule) {
	            var selector = rule.selector;
	            var content = rule.content;
	            if (rule.selector[0] != '@' || rule.selector.startsWith('@page')) {
	                selector =
	                    _this._scopeSelector(rule.selector, scopeSelector, hostSelector, _this.strictStyling);
	            }
	            else if (rule.selector.startsWith('@media') || rule.selector.startsWith('@supports')) {
	                content = _this._scopeSelectors(rule.content, scopeSelector, hostSelector);
	            }
	            return new CssRule(selector, content);
	        });
	    };
	    ShadowCss.prototype._scopeSelector = function (selector, scopeSelector, hostSelector, strict) {
	        var r = [], parts = selector.split(',');
	        for (var i = 0; i < parts.length; i++) {
	            var p = parts[i].trim();
	            var deepParts = lang_1.StringWrapper.split(p, _shadowDeepSelectors);
	            var shallowPart = deepParts[0];
	            if (this._selectorNeedsScoping(shallowPart, scopeSelector)) {
	                deepParts[0] = strict && !lang_1.StringWrapper.contains(shallowPart, _polyfillHostNoCombinator) ?
	                    this._applyStrictSelectorScope(shallowPart, scopeSelector) :
	                    this._applySelectorScope(shallowPart, scopeSelector, hostSelector);
	            }
	            // replace /deep/ with a space for child selectors
	            r.push(deepParts.join(' '));
	        }
	        return r.join(', ');
	    };
	    ShadowCss.prototype._selectorNeedsScoping = function (selector, scopeSelector) {
	        var re = this._makeScopeMatcher(scopeSelector);
	        return !lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(re, selector));
	    };
	    ShadowCss.prototype._makeScopeMatcher = function (scopeSelector) {
	        var lre = /\[/g;
	        var rre = /\]/g;
	        scopeSelector = lang_1.StringWrapper.replaceAll(scopeSelector, lre, '\\[');
	        scopeSelector = lang_1.StringWrapper.replaceAll(scopeSelector, rre, '\\]');
	        return lang_1.RegExpWrapper.create('^(' + scopeSelector + ')' + _selectorReSuffix, 'm');
	    };
	    ShadowCss.prototype._applySelectorScope = function (selector, scopeSelector, hostSelector) {
	        // Difference from webcomponentsjs: scopeSelector could not be an array
	        return this._applySimpleSelectorScope(selector, scopeSelector, hostSelector);
	    };
	    // scope via name and [is=name]
	    ShadowCss.prototype._applySimpleSelectorScope = function (selector, scopeSelector, hostSelector) {
	        if (lang_1.isPresent(lang_1.RegExpWrapper.firstMatch(_polyfillHostRe, selector))) {
	            var replaceBy = this.strictStyling ? "[" + hostSelector + "]" : scopeSelector;
	            selector = lang_1.StringWrapper.replace(selector, _polyfillHostNoCombinator, replaceBy);
	            return lang_1.StringWrapper.replaceAll(selector, _polyfillHostRe, replaceBy + ' ');
	        }
	        else {
	            return scopeSelector + ' ' + selector;
	        }
	    };
	    // return a selector with [name] suffix on each simple selector
	    // e.g. .foo.bar > .zot becomes .foo[name].bar[name] > .zot[name]  /** @internal */
	    ShadowCss.prototype._applyStrictSelectorScope = function (selector, scopeSelector) {
	        var isRe = /\[is=([^\]]*)\]/g;
	        scopeSelector =
	            lang_1.StringWrapper.replaceAllMapped(scopeSelector, isRe, function (m /** TODO #9100 */) { return m[1]; });
	        var splits = [' ', '>', '+', '~'], scoped = selector, attrName = '[' + scopeSelector + ']';
	        for (var i = 0; i < splits.length; i++) {
	            var sep = splits[i];
	            var parts = scoped.split(sep);
	            scoped = parts
	                .map(function (p) {
	                // remove :host since it should be unnecessary
	                var t = lang_1.StringWrapper.replaceAll(p.trim(), _polyfillHostRe, '');
	                if (t.length > 0 && !collection_1.ListWrapper.contains(splits, t) &&
	                    !lang_1.StringWrapper.contains(t, attrName)) {
	                    var re = /([^:]*)(:*)(.*)/g;
	                    var m = lang_1.RegExpWrapper.firstMatch(re, t);
	                    if (lang_1.isPresent(m)) {
	                        p = m[1] + attrName + m[2] + m[3];
	                    }
	                }
	                return p;
	            })
	                .join(sep);
	        }
	        return scoped;
	    };
	    ShadowCss.prototype._insertPolyfillHostInCssText = function (selector) {
	        selector = lang_1.StringWrapper.replaceAll(selector, _colonHostContextRe, _polyfillHostContext);
	        selector = lang_1.StringWrapper.replaceAll(selector, _colonHostRe, _polyfillHost);
	        return selector;
	    };
	    return ShadowCss;
	}());
	exports.ShadowCss = ShadowCss;
	var _cssContentNextSelectorRe = /polyfill-next-selector[^}]*content:[\s]*?['"](.*?)['"][;\s]*}([^{]*?){/gim;
	var _cssContentRuleRe = /(polyfill-rule)[^}]*(content:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim;
	var _cssContentUnscopedRuleRe = /(polyfill-unscoped-rule)[^}]*(content:[\s]*['"](.*?)['"])[;\s]*[^}]*}/gim;
	var _polyfillHost = '-shadowcsshost';
	// note: :host-context pre-processed to -shadowcsshostcontext.
	var _polyfillHostContext = '-shadowcsscontext';
	var _parenSuffix = ')(?:\\((' +
	    '(?:\\([^)(]*\\)|[^)(]*)+?' +
	    ')\\))?([^,{]*)';
	var _cssColonHostRe = lang_1.RegExpWrapper.create('(' + _polyfillHost + _parenSuffix, 'im');
	var _cssColonHostContextRe = lang_1.RegExpWrapper.create('(' + _polyfillHostContext + _parenSuffix, 'im');
	var _polyfillHostNoCombinator = _polyfillHost + '-no-combinator';
	var _shadowDOMSelectorsRe = [
	    /::shadow/g, /::content/g,
	    // Deprecated selectors
	    // TODO(vicb): see https://github.com/angular/clang-format/issues/16
	    // clang-format off
	    /\/shadow-deep\//g,
	    /\/shadow\//g,
	];
	var _shadowDeepSelectors = /(?:>>>)|(?:\/deep\/)/g;
	var _selectorReSuffix = '([>\\s~+\[.,{:][\\s\\S]*)?$';
	var _polyfillHostRe = lang_1.RegExpWrapper.create(_polyfillHost, 'im');
	var _colonHostRe = /:host/gim;
	var _colonHostContextRe = /:host-context/gim;
	var _commentRe = /\/\*[\s\S]*?\*\//g;
	function stripComments(input) {
	    return lang_1.StringWrapper.replaceAllMapped(input, _commentRe, function (_ /** TODO #9100 */) { return ''; });
	}
	var _ruleRe = /(\s*)([^;\{\}]+?)(\s*)((?:{%BLOCK%}?\s*;?)|(?:\s*;))/g;
	var _curlyRe = /([{}])/g;
	var OPEN_CURLY = '{';
	var CLOSE_CURLY = '}';
	var BLOCK_PLACEHOLDER = '%BLOCK%';
	var CssRule = (function () {
	    function CssRule(selector, content) {
	        this.selector = selector;
	        this.content = content;
	    }
	    return CssRule;
	}());
	exports.CssRule = CssRule;
	function processRules(input, ruleCallback) {
	    var inputWithEscapedBlocks = escapeBlocks(input);
	    var nextBlockIndex = 0;
	    return lang_1.StringWrapper.replaceAllMapped(inputWithEscapedBlocks.escapedString, _ruleRe, function (m /** TODO #9100 */) {
	        var selector = m[2];
	        var content = '';
	        var suffix = m[4];
	        var contentPrefix = '';
	        if (lang_1.isPresent(m[4]) && m[4].startsWith('{' + BLOCK_PLACEHOLDER)) {
	            content = inputWithEscapedBlocks.blocks[nextBlockIndex++];
	            suffix = m[4].substring(BLOCK_PLACEHOLDER.length + 1);
	            contentPrefix = '{';
	        }
	        var rule = ruleCallback(new CssRule(selector, content));
	        return "" + m[1] + rule.selector + m[3] + contentPrefix + rule.content + suffix;
	    });
	}
	exports.processRules = processRules;
	var StringWithEscapedBlocks = (function () {
	    function StringWithEscapedBlocks(escapedString, blocks) {
	        this.escapedString = escapedString;
	        this.blocks = blocks;
	    }
	    return StringWithEscapedBlocks;
	}());
	function escapeBlocks(input) {
	    var inputParts = lang_1.StringWrapper.split(input, _curlyRe);
	    var resultParts = [];
	    var escapedBlocks = [];
	    var bracketCount = 0;
	    var currentBlockParts = [];
	    for (var partIndex = 0; partIndex < inputParts.length; partIndex++) {
	        var part = inputParts[partIndex];
	        if (part == CLOSE_CURLY) {
	            bracketCount--;
	        }
	        if (bracketCount > 0) {
	            currentBlockParts.push(part);
	        }
	        else {
	            if (currentBlockParts.length > 0) {
	                escapedBlocks.push(currentBlockParts.join(''));
	                resultParts.push(BLOCK_PLACEHOLDER);
	                currentBlockParts = [];
	            }
	            resultParts.push(part);
	        }
	        if (part == OPEN_CURLY) {
	            bracketCount++;
	        }
	    }
	    if (currentBlockParts.length > 0) {
	        escapedBlocks.push(currentBlockParts.join(''));
	        resultParts.push(BLOCK_PLACEHOLDER);
	    }
	    return new StringWithEscapedBlocks(resultParts.join(''), escapedBlocks);
	}
	//# sourceMappingURL=shadow_css.js.map

/***/ }),

/***/ 596:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var compile_metadata_1 = __webpack_require__(565);
	var config_1 = __webpack_require__(568);
	var html_ast_1 = __webpack_require__(555);
	var html_parser_1 = __webpack_require__(554);
	var style_url_resolver_1 = __webpack_require__(562);
	var template_preparser_1 = __webpack_require__(561);
	var url_resolver_1 = __webpack_require__(566);
	var xhr_1 = __webpack_require__(597);
	var NormalizeDirectiveResult = (function () {
	    function NormalizeDirectiveResult(syncResult, asyncResult) {
	        this.syncResult = syncResult;
	        this.asyncResult = asyncResult;
	    }
	    return NormalizeDirectiveResult;
	}());
	exports.NormalizeDirectiveResult = NormalizeDirectiveResult;
	var DirectiveNormalizer = (function () {
	    function DirectiveNormalizer(_xhr, _urlResolver, _htmlParser, _config) {
	        this._xhr = _xhr;
	        this._urlResolver = _urlResolver;
	        this._htmlParser = _htmlParser;
	        this._config = _config;
	        this._xhrCache = new Map();
	    }
	    DirectiveNormalizer.prototype.clearCache = function () { this._xhrCache.clear(); };
	    DirectiveNormalizer.prototype.clearCacheFor = function (normalizedDirective) {
	        var _this = this;
	        if (!normalizedDirective.isComponent) {
	            return;
	        }
	        this._xhrCache.delete(normalizedDirective.template.templateUrl);
	        normalizedDirective.template.externalStylesheets.forEach(function (stylesheet) { _this._xhrCache.delete(stylesheet.moduleUrl); });
	    };
	    DirectiveNormalizer.prototype._fetch = function (url) {
	        var result = this._xhrCache.get(url);
	        if (!result) {
	            result = this._xhr.get(url);
	            this._xhrCache.set(url, result);
	        }
	        return result;
	    };
	    DirectiveNormalizer.prototype.normalizeDirective = function (directive) {
	        var _this = this;
	        if (!directive.isComponent) {
	            // For non components there is nothing to be normalized yet.
	            return new NormalizeDirectiveResult(directive, Promise.resolve(directive));
	        }
	        var normalizedTemplateSync = null;
	        var normalizedTemplateAsync;
	        if (lang_1.isPresent(directive.template.template)) {
	            normalizedTemplateSync = this.normalizeTemplateSync(directive.type, directive.template);
	            normalizedTemplateAsync = Promise.resolve(normalizedTemplateSync);
	        }
	        else if (directive.template.templateUrl) {
	            normalizedTemplateAsync = this.normalizeTemplateAsync(directive.type, directive.template);
	        }
	        else {
	            throw new exceptions_1.BaseException("No template specified for component " + directive.type.name);
	        }
	        if (normalizedTemplateSync && normalizedTemplateSync.styleUrls.length === 0) {
	            // sync case
	            var normalizedDirective = _cloneDirectiveWithTemplate(directive, normalizedTemplateSync);
	            return new NormalizeDirectiveResult(normalizedDirective, Promise.resolve(normalizedDirective));
	        }
	        else {
	            // async case
	            return new NormalizeDirectiveResult(null, normalizedTemplateAsync
	                .then(function (normalizedTemplate) { return _this.normalizeExternalStylesheets(normalizedTemplate); })
	                .then(function (normalizedTemplate) {
	                return _cloneDirectiveWithTemplate(directive, normalizedTemplate);
	            }));
	        }
	    };
	    DirectiveNormalizer.prototype.normalizeTemplateSync = function (directiveType, template) {
	        return this.normalizeLoadedTemplate(directiveType, template, template.template, directiveType.moduleUrl);
	    };
	    DirectiveNormalizer.prototype.normalizeTemplateAsync = function (directiveType, template) {
	        var _this = this;
	        var templateUrl = this._urlResolver.resolve(directiveType.moduleUrl, template.templateUrl);
	        return this._fetch(templateUrl)
	            .then(function (value) { return _this.normalizeLoadedTemplate(directiveType, template, value, templateUrl); });
	    };
	    DirectiveNormalizer.prototype.normalizeLoadedTemplate = function (directiveType, templateMeta, template, templateAbsUrl) {
	        var rootNodesAndErrors = this._htmlParser.parse(template, directiveType.name);
	        if (rootNodesAndErrors.errors.length > 0) {
	            var errorString = rootNodesAndErrors.errors.join('\n');
	            throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
	        }
	        var templateMetadataStyles = this.normalizeStylesheet(new compile_metadata_1.CompileStylesheetMetadata({
	            styles: templateMeta.styles,
	            styleUrls: templateMeta.styleUrls,
	            moduleUrl: directiveType.moduleUrl
	        }));
	        var visitor = new TemplatePreparseVisitor();
	        html_ast_1.htmlVisitAll(visitor, rootNodesAndErrors.rootNodes);
	        var templateStyles = this.normalizeStylesheet(new compile_metadata_1.CompileStylesheetMetadata({ styles: visitor.styles, styleUrls: visitor.styleUrls, moduleUrl: templateAbsUrl }));
	        var allStyles = templateMetadataStyles.styles.concat(templateStyles.styles);
	        var allStyleUrls = templateMetadataStyles.styleUrls.concat(templateStyles.styleUrls);
	        var encapsulation = templateMeta.encapsulation;
	        if (lang_1.isBlank(encapsulation)) {
	            encapsulation = this._config.defaultEncapsulation;
	        }
	        if (encapsulation === core_1.ViewEncapsulation.Emulated && allStyles.length === 0 &&
	            allStyleUrls.length === 0) {
	            encapsulation = core_1.ViewEncapsulation.None;
	        }
	        return new compile_metadata_1.CompileTemplateMetadata({
	            encapsulation: encapsulation,
	            template: template,
	            templateUrl: templateAbsUrl,
	            styles: allStyles,
	            styleUrls: allStyleUrls,
	            externalStylesheets: templateMeta.externalStylesheets,
	            ngContentSelectors: visitor.ngContentSelectors,
	            animations: templateMeta.animations,
	            interpolation: templateMeta.interpolation
	        });
	    };
	    DirectiveNormalizer.prototype.normalizeExternalStylesheets = function (templateMeta) {
	        return this._loadMissingExternalStylesheets(templateMeta.styleUrls)
	            .then(function (externalStylesheets) { return new compile_metadata_1.CompileTemplateMetadata({
	            encapsulation: templateMeta.encapsulation,
	            template: templateMeta.template,
	            templateUrl: templateMeta.templateUrl,
	            styles: templateMeta.styles,
	            styleUrls: templateMeta.styleUrls,
	            externalStylesheets: externalStylesheets,
	            ngContentSelectors: templateMeta.ngContentSelectors,
	            animations: templateMeta.animations,
	            interpolation: templateMeta.interpolation
	        }); });
	    };
	    DirectiveNormalizer.prototype._loadMissingExternalStylesheets = function (styleUrls, loadedStylesheets) {
	        var _this = this;
	        if (loadedStylesheets === void 0) { loadedStylesheets = new Map(); }
	        return Promise
	            .all(styleUrls.filter(function (styleUrl) { return !loadedStylesheets.has(styleUrl); })
	            .map(function (styleUrl) { return _this._fetch(styleUrl).then(function (loadedStyle) {
	            var stylesheet = _this.normalizeStylesheet(new compile_metadata_1.CompileStylesheetMetadata({ styles: [loadedStyle], moduleUrl: styleUrl }));
	            loadedStylesheets.set(styleUrl, stylesheet);
	            return _this._loadMissingExternalStylesheets(stylesheet.styleUrls, loadedStylesheets);
	        }); }))
	            .then(function (_) { return collection_1.MapWrapper.values(loadedStylesheets); });
	    };
	    DirectiveNormalizer.prototype.normalizeStylesheet = function (stylesheet) {
	        var _this = this;
	        var allStyleUrls = stylesheet.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
	            .map(function (url) { return _this._urlResolver.resolve(stylesheet.moduleUrl, url); });
	        var allStyles = stylesheet.styles.map(function (style) {
	            var styleWithImports = style_url_resolver_1.extractStyleUrls(_this._urlResolver, stylesheet.moduleUrl, style);
	            allStyleUrls.push.apply(allStyleUrls, styleWithImports.styleUrls);
	            return styleWithImports.style;
	        });
	        return new compile_metadata_1.CompileStylesheetMetadata({ styles: allStyles, styleUrls: allStyleUrls, moduleUrl: stylesheet.moduleUrl });
	    };
	    /** @nocollapse */
	    DirectiveNormalizer.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    DirectiveNormalizer.ctorParameters = [
	        { type: xhr_1.XHR, },
	        { type: url_resolver_1.UrlResolver, },
	        { type: html_parser_1.HtmlParser, },
	        { type: config_1.CompilerConfig, },
	    ];
	    return DirectiveNormalizer;
	}());
	exports.DirectiveNormalizer = DirectiveNormalizer;
	var TemplatePreparseVisitor = (function () {
	    function TemplatePreparseVisitor() {
	        this.ngContentSelectors = [];
	        this.styles = [];
	        this.styleUrls = [];
	        this.ngNonBindableStackCount = 0;
	    }
	    TemplatePreparseVisitor.prototype.visitElement = function (ast, context) {
	        var preparsedElement = template_preparser_1.preparseElement(ast);
	        switch (preparsedElement.type) {
	            case template_preparser_1.PreparsedElementType.NG_CONTENT:
	                if (this.ngNonBindableStackCount === 0) {
	                    this.ngContentSelectors.push(preparsedElement.selectAttr);
	                }
	                break;
	            case template_preparser_1.PreparsedElementType.STYLE:
	                var textContent = '';
	                ast.children.forEach(function (child) {
	                    if (child instanceof html_ast_1.HtmlTextAst) {
	                        textContent += child.value;
	                    }
	                });
	                this.styles.push(textContent);
	                break;
	            case template_preparser_1.PreparsedElementType.STYLESHEET:
	                this.styleUrls.push(preparsedElement.hrefAttr);
	                break;
	            default:
	                // DDC reports this as error. See:
	                // https://github.com/dart-lang/dev_compiler/issues/428
	                break;
	        }
	        if (preparsedElement.nonBindable) {
	            this.ngNonBindableStackCount++;
	        }
	        html_ast_1.htmlVisitAll(this, ast.children);
	        if (preparsedElement.nonBindable) {
	            this.ngNonBindableStackCount--;
	        }
	        return null;
	    };
	    TemplatePreparseVisitor.prototype.visitComment = function (ast, context) { return null; };
	    TemplatePreparseVisitor.prototype.visitAttr = function (ast, context) { return null; };
	    TemplatePreparseVisitor.prototype.visitText = function (ast, context) { return null; };
	    TemplatePreparseVisitor.prototype.visitExpansion = function (ast, context) { return null; };
	    TemplatePreparseVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
	    return TemplatePreparseVisitor;
	}());
	function _cloneDirectiveWithTemplate(directive, template) {
	    return new compile_metadata_1.CompileDirectiveMetadata({
	        type: directive.type,
	        isComponent: directive.isComponent,
	        selector: directive.selector,
	        exportAs: directive.exportAs,
	        changeDetection: directive.changeDetection,
	        inputs: directive.inputs,
	        outputs: directive.outputs,
	        hostListeners: directive.hostListeners,
	        hostProperties: directive.hostProperties,
	        hostAttributes: directive.hostAttributes,
	        lifecycleHooks: directive.lifecycleHooks,
	        providers: directive.providers,
	        viewProviders: directive.viewProviders,
	        queries: directive.queries,
	        viewQueries: directive.viewQueries,
	        precompile: directive.precompile,
	        template: template
	    });
	}
	//# sourceMappingURL=directive_normalizer.js.map

/***/ }),

/***/ 597:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	// TODO: vsavkin rename it into TemplateLoader
	/**
	 * An interface for retrieving documents by URL that the compiler uses
	 * to load templates.
	 */
	var XHR = (function () {
	    function XHR() {
	    }
	    XHR.prototype.get = function (url) { return null; };
	    return XHR;
	}());
	exports.XHR = XHR;
	//# sourceMappingURL=xhr.js.map

/***/ }),

/***/ 598:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var assertions_1 = __webpack_require__(599);
	var cpl = __webpack_require__(565);
	var config_1 = __webpack_require__(568);
	var directive_lifecycle_reflector_1 = __webpack_require__(600);
	var directive_resolver_1 = __webpack_require__(601);
	var pipe_resolver_1 = __webpack_require__(602);
	var url_resolver_1 = __webpack_require__(566);
	var util_1 = __webpack_require__(563);
	var view_resolver_1 = __webpack_require__(603);
	var CompileMetadataResolver = (function () {
	    function CompileMetadataResolver(_directiveResolver, _pipeResolver, _viewResolver, _config, _reflector) {
	        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
	        this._directiveResolver = _directiveResolver;
	        this._pipeResolver = _pipeResolver;
	        this._viewResolver = _viewResolver;
	        this._config = _config;
	        this._reflector = _reflector;
	        this._directiveCache = new Map();
	        this._pipeCache = new Map();
	        this._anonymousTypes = new Map();
	        this._anonymousTypeIndex = 0;
	    }
	    CompileMetadataResolver.prototype.sanitizeTokenName = function (token) {
	        var identifier = lang_1.stringify(token);
	        if (identifier.indexOf('(') >= 0) {
	            // case: anonymous functions!
	            var found = this._anonymousTypes.get(token);
	            if (lang_1.isBlank(found)) {
	                this._anonymousTypes.set(token, this._anonymousTypeIndex++);
	                found = this._anonymousTypes.get(token);
	            }
	            identifier = "anonymous_token_" + found + "_";
	        }
	        return util_1.sanitizeIdentifier(identifier);
	    };
	    CompileMetadataResolver.prototype.clearCacheFor = function (compType) {
	        this._directiveCache.delete(compType);
	        this._pipeCache.delete(compType);
	    };
	    CompileMetadataResolver.prototype.clearCache = function () {
	        this._directiveCache.clear();
	        this._pipeCache.clear();
	    };
	    CompileMetadataResolver.prototype.getAnimationEntryMetadata = function (entry) {
	        var _this = this;
	        var defs = entry.definitions.map(function (def) { return _this.getAnimationStateMetadata(def); });
	        return new cpl.CompileAnimationEntryMetadata(entry.name, defs);
	    };
	    CompileMetadataResolver.prototype.getAnimationStateMetadata = function (value) {
	        if (value instanceof core_1.AnimationStateDeclarationMetadata) {
	            var styles = this.getAnimationStyleMetadata(value.styles);
	            return new cpl.CompileAnimationStateDeclarationMetadata(value.stateNameExpr, styles);
	        }
	        else if (value instanceof core_1.AnimationStateTransitionMetadata) {
	            return new cpl.CompileAnimationStateTransitionMetadata(value.stateChangeExpr, this.getAnimationMetadata(value.steps));
	        }
	        return null;
	    };
	    CompileMetadataResolver.prototype.getAnimationStyleMetadata = function (value) {
	        return new cpl.CompileAnimationStyleMetadata(value.offset, value.styles);
	    };
	    CompileMetadataResolver.prototype.getAnimationMetadata = function (value) {
	        var _this = this;
	        if (value instanceof core_1.AnimationStyleMetadata) {
	            return this.getAnimationStyleMetadata(value);
	        }
	        else if (value instanceof core_1.AnimationKeyframesSequenceMetadata) {
	            return new cpl.CompileAnimationKeyframesSequenceMetadata(value.steps.map(function (entry) { return _this.getAnimationStyleMetadata(entry); }));
	        }
	        else if (value instanceof core_1.AnimationAnimateMetadata) {
	            var animateData = this
	                .getAnimationMetadata(value.styles);
	            return new cpl.CompileAnimationAnimateMetadata(value.timings, animateData);
	        }
	        else if (value instanceof core_1.AnimationWithStepsMetadata) {
	            var steps = value.steps.map(function (step) { return _this.getAnimationMetadata(step); });
	            if (value instanceof core_1.AnimationGroupMetadata) {
	                return new cpl.CompileAnimationGroupMetadata(steps);
	            }
	            else {
	                return new cpl.CompileAnimationSequenceMetadata(steps);
	            }
	        }
	        return null;
	    };
	    CompileMetadataResolver.prototype.getDirectiveMetadata = function (directiveType) {
	        var _this = this;
	        var meta = this._directiveCache.get(directiveType);
	        if (lang_1.isBlank(meta)) {
	            var dirMeta = this._directiveResolver.resolve(directiveType);
	            var templateMeta = null;
	            var changeDetectionStrategy = null;
	            var viewProviders = [];
	            var moduleUrl = staticTypeModuleUrl(directiveType);
	            var precompileTypes = [];
	            if (dirMeta instanceof core_1.ComponentMetadata) {
	                var cmpMeta = dirMeta;
	                var viewMeta = this._viewResolver.resolve(directiveType);
	                assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
	                assertions_1.assertInterpolationSymbols('interpolation', viewMeta.interpolation);
	                var animations = lang_1.isPresent(viewMeta.animations) ?
	                    viewMeta.animations.map(function (e) { return _this.getAnimationEntryMetadata(e); }) :
	                    null;
	                assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
	                assertions_1.assertArrayOfStrings('styleUrls', viewMeta.styleUrls);
	                templateMeta = new cpl.CompileTemplateMetadata({
	                    encapsulation: viewMeta.encapsulation,
	                    template: viewMeta.template,
	                    templateUrl: viewMeta.templateUrl,
	                    styles: viewMeta.styles,
	                    styleUrls: viewMeta.styleUrls,
	                    animations: animations,
	                    interpolation: viewMeta.interpolation
	                });
	                changeDetectionStrategy = cmpMeta.changeDetection;
	                if (lang_1.isPresent(dirMeta.viewProviders)) {
	                    viewProviders = this.getProvidersMetadata(verifyNonBlankProviders(directiveType, dirMeta.viewProviders, 'viewProviders'));
	                }
	                moduleUrl = componentModuleUrl(this._reflector, directiveType, cmpMeta);
	                if (cmpMeta.precompile) {
	                    precompileTypes = flattenArray(cmpMeta.precompile)
	                        .map(function (cmp) { return _this.getTypeMetadata(cmp, staticTypeModuleUrl(cmp)); });
	                }
	            }
	            var providers = [];
	            if (lang_1.isPresent(dirMeta.providers)) {
	                providers = this.getProvidersMetadata(verifyNonBlankProviders(directiveType, dirMeta.providers, 'providers'));
	            }
	            var queries = [];
	            var viewQueries = [];
	            if (lang_1.isPresent(dirMeta.queries)) {
	                queries = this.getQueriesMetadata(dirMeta.queries, false, directiveType);
	                viewQueries = this.getQueriesMetadata(dirMeta.queries, true, directiveType);
	            }
	            meta = cpl.CompileDirectiveMetadata.create({
	                selector: dirMeta.selector,
	                exportAs: dirMeta.exportAs,
	                isComponent: lang_1.isPresent(templateMeta),
	                type: this.getTypeMetadata(directiveType, moduleUrl),
	                template: templateMeta,
	                changeDetection: changeDetectionStrategy,
	                inputs: dirMeta.inputs,
	                outputs: dirMeta.outputs,
	                host: dirMeta.host,
	                lifecycleHooks: core_private_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); }),
	                providers: providers,
	                viewProviders: viewProviders,
	                queries: queries,
	                viewQueries: viewQueries,
	                precompile: precompileTypes
	            });
	            this._directiveCache.set(directiveType, meta);
	        }
	        return meta;
	    };
	    /**
	     * @param someType a symbol which may or may not be a directive type
	     * @returns {cpl.CompileDirectiveMetadata} if possible, otherwise null.
	     */
	    CompileMetadataResolver.prototype.maybeGetDirectiveMetadata = function (someType) {
	        try {
	            return this.getDirectiveMetadata(someType);
	        }
	        catch (e) {
	            if (e.message.indexOf('No Directive annotation') !== -1) {
	                return null;
	            }
	            throw e;
	        }
	    };
	    CompileMetadataResolver.prototype.getTypeMetadata = function (type, moduleUrl, dependencies) {
	        if (dependencies === void 0) { dependencies = null; }
	        return new cpl.CompileTypeMetadata({
	            name: this.sanitizeTokenName(type),
	            moduleUrl: moduleUrl,
	            runtime: type,
	            diDeps: this.getDependenciesMetadata(type, dependencies)
	        });
	    };
	    CompileMetadataResolver.prototype.getFactoryMetadata = function (factory, moduleUrl, dependencies) {
	        if (dependencies === void 0) { dependencies = null; }
	        return new cpl.CompileFactoryMetadata({
	            name: this.sanitizeTokenName(factory),
	            moduleUrl: moduleUrl,
	            runtime: factory,
	            diDeps: this.getDependenciesMetadata(factory, dependencies)
	        });
	    };
	    CompileMetadataResolver.prototype.getPipeMetadata = function (pipeType) {
	        var meta = this._pipeCache.get(pipeType);
	        if (lang_1.isBlank(meta)) {
	            var pipeMeta = this._pipeResolver.resolve(pipeType);
	            meta = new cpl.CompilePipeMetadata({
	                type: this.getTypeMetadata(pipeType, staticTypeModuleUrl(pipeType)),
	                name: pipeMeta.name,
	                pure: pipeMeta.pure,
	                lifecycleHooks: core_private_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, pipeType); }),
	            });
	            this._pipeCache.set(pipeType, meta);
	        }
	        return meta;
	    };
	    CompileMetadataResolver.prototype.getViewDirectivesMetadata = function (component) {
	        var _this = this;
	        var view = this._viewResolver.resolve(component);
	        var directives = flattenDirectives(view, this._config.platformDirectives);
	        for (var i = 0; i < directives.length; i++) {
	            if (!isValidType(directives[i])) {
	                throw new exceptions_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
	            }
	        }
	        return directives.map(function (type) { return _this.getDirectiveMetadata(type); });
	    };
	    CompileMetadataResolver.prototype.getViewPipesMetadata = function (component) {
	        var _this = this;
	        var view = this._viewResolver.resolve(component);
	        var pipes = flattenPipes(view, this._config.platformPipes);
	        for (var i = 0; i < pipes.length; i++) {
	            if (!isValidType(pipes[i])) {
	                throw new exceptions_1.BaseException("Unexpected piped value '" + lang_1.stringify(pipes[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
	            }
	        }
	        return pipes.map(function (type) { return _this.getPipeMetadata(type); });
	    };
	    CompileMetadataResolver.prototype.getDependenciesMetadata = function (typeOrFunc, dependencies) {
	        var _this = this;
	        var hasUnknownDeps = false;
	        var params = lang_1.isPresent(dependencies) ? dependencies : this._reflector.parameters(typeOrFunc);
	        if (lang_1.isBlank(params)) {
	            params = [];
	        }
	        var dependenciesMetadata = params.map(function (param) {
	            var isAttribute = false;
	            var isHost = false;
	            var isSelf = false;
	            var isSkipSelf = false;
	            var isOptional = false;
	            var query = null;
	            var viewQuery = null;
	            var token = null;
	            if (lang_1.isArray(param)) {
	                param.forEach(function (paramEntry) {
	                    if (paramEntry instanceof core_1.HostMetadata) {
	                        isHost = true;
	                    }
	                    else if (paramEntry instanceof core_1.SelfMetadata) {
	                        isSelf = true;
	                    }
	                    else if (paramEntry instanceof core_1.SkipSelfMetadata) {
	                        isSkipSelf = true;
	                    }
	                    else if (paramEntry instanceof core_1.OptionalMetadata) {
	                        isOptional = true;
	                    }
	                    else if (paramEntry instanceof core_1.AttributeMetadata) {
	                        isAttribute = true;
	                        token = paramEntry.attributeName;
	                    }
	                    else if (paramEntry instanceof core_1.QueryMetadata) {
	                        if (paramEntry.isViewQuery) {
	                            viewQuery = paramEntry;
	                        }
	                        else {
	                            query = paramEntry;
	                        }
	                    }
	                    else if (paramEntry instanceof core_1.InjectMetadata) {
	                        token = paramEntry.token;
	                    }
	                    else if (isValidType(paramEntry) && lang_1.isBlank(token)) {
	                        token = paramEntry;
	                    }
	                });
	            }
	            else {
	                token = param;
	            }
	            if (lang_1.isBlank(token)) {
	                hasUnknownDeps = true;
	                return null;
	            }
	            return new cpl.CompileDiDependencyMetadata({
	                isAttribute: isAttribute,
	                isHost: isHost,
	                isSelf: isSelf,
	                isSkipSelf: isSkipSelf,
	                isOptional: isOptional,
	                query: lang_1.isPresent(query) ? _this.getQueryMetadata(query, null, typeOrFunc) : null,
	                viewQuery: lang_1.isPresent(viewQuery) ? _this.getQueryMetadata(viewQuery, null, typeOrFunc) : null,
	                token: _this.getTokenMetadata(token)
	            });
	        });
	        if (hasUnknownDeps) {
	            var depsTokens = dependenciesMetadata.map(function (dep) { return dep ? lang_1.stringify(dep.token) : '?'; })
	                .join(', ');
	            throw new exceptions_1.BaseException("Can't resolve all parameters for " + lang_1.stringify(typeOrFunc) + ": (" + depsTokens + ").");
	        }
	        return dependenciesMetadata;
	    };
	    CompileMetadataResolver.prototype.getTokenMetadata = function (token) {
	        token = core_1.resolveForwardRef(token);
	        var compileToken;
	        if (lang_1.isString(token)) {
	            compileToken = new cpl.CompileTokenMetadata({ value: token });
	        }
	        else {
	            compileToken = new cpl.CompileTokenMetadata({
	                identifier: new cpl.CompileIdentifierMetadata({
	                    runtime: token,
	                    name: this.sanitizeTokenName(token),
	                    moduleUrl: staticTypeModuleUrl(token)
	                })
	            });
	        }
	        return compileToken;
	    };
	    CompileMetadataResolver.prototype.getProvidersMetadata = function (providers) {
	        var _this = this;
	        return providers.map(function (provider) {
	            provider = core_1.resolveForwardRef(provider);
	            if (lang_1.isArray(provider)) {
	                return _this.getProvidersMetadata(provider);
	            }
	            else if (provider instanceof core_1.Provider) {
	                return _this.getProviderMetadata(provider);
	            }
	            else if (core_private_1.isProviderLiteral(provider)) {
	                return _this.getProviderMetadata(core_private_1.createProvider(provider));
	            }
	            else {
	                return _this.getTypeMetadata(provider, staticTypeModuleUrl(provider));
	            }
	        });
	    };
	    CompileMetadataResolver.prototype.getProviderMetadata = function (provider) {
	        var compileDeps;
	        var compileTypeMetadata = null;
	        var compileFactoryMetadata = null;
	        if (lang_1.isPresent(provider.useClass)) {
	            compileTypeMetadata = this.getTypeMetadata(provider.useClass, staticTypeModuleUrl(provider.useClass), provider.dependencies);
	            compileDeps = compileTypeMetadata.diDeps;
	        }
	        else if (lang_1.isPresent(provider.useFactory)) {
	            compileFactoryMetadata = this.getFactoryMetadata(provider.useFactory, staticTypeModuleUrl(provider.useFactory), provider.dependencies);
	            compileDeps = compileFactoryMetadata.diDeps;
	        }
	        return new cpl.CompileProviderMetadata({
	            token: this.getTokenMetadata(provider.token),
	            useClass: compileTypeMetadata,
	            useValue: convertToCompileValue(provider.useValue),
	            useFactory: compileFactoryMetadata,
	            useExisting: lang_1.isPresent(provider.useExisting) ? this.getTokenMetadata(provider.useExisting) :
	                null,
	            deps: compileDeps,
	            multi: provider.multi
	        });
	    };
	    CompileMetadataResolver.prototype.getQueriesMetadata = function (queries, isViewQuery, directiveType) {
	        var _this = this;
	        var compileQueries = [];
	        collection_1.StringMapWrapper.forEach(queries, function (query /** TODO #9100 */, propertyName /** TODO #9100 */) {
	            if (query.isViewQuery === isViewQuery) {
	                compileQueries.push(_this.getQueryMetadata(query, propertyName, directiveType));
	            }
	        });
	        return compileQueries;
	    };
	    CompileMetadataResolver.prototype.getQueryMetadata = function (q, propertyName, typeOrFunc) {
	        var _this = this;
	        var selectors;
	        if (q.isVarBindingQuery) {
	            selectors = q.varBindings.map(function (varName) { return _this.getTokenMetadata(varName); });
	        }
	        else {
	            if (!lang_1.isPresent(q.selector)) {
	                throw new exceptions_1.BaseException("Can't construct a query for the property \"" + propertyName + "\" of \"" + lang_1.stringify(typeOrFunc) + "\" since the query selector wasn't defined.");
	            }
	            selectors = [this.getTokenMetadata(q.selector)];
	        }
	        return new cpl.CompileQueryMetadata({
	            selectors: selectors,
	            first: q.first,
	            descendants: q.descendants,
	            propertyName: propertyName,
	            read: lang_1.isPresent(q.read) ? this.getTokenMetadata(q.read) : null
	        });
	    };
	    /** @nocollapse */
	    CompileMetadataResolver.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    CompileMetadataResolver.ctorParameters = [
	        { type: directive_resolver_1.DirectiveResolver, },
	        { type: pipe_resolver_1.PipeResolver, },
	        { type: view_resolver_1.ViewResolver, },
	        { type: config_1.CompilerConfig, },
	        { type: core_private_1.ReflectorReader, },
	    ];
	    return CompileMetadataResolver;
	}());
	exports.CompileMetadataResolver = CompileMetadataResolver;
	function flattenDirectives(view, platformDirectives) {
	    var directives = [];
	    if (lang_1.isPresent(platformDirectives)) {
	        flattenArray(platformDirectives, directives);
	    }
	    if (lang_1.isPresent(view.directives)) {
	        flattenArray(view.directives, directives);
	    }
	    return directives;
	}
	function flattenPipes(view, platformPipes) {
	    var pipes = [];
	    if (lang_1.isPresent(platformPipes)) {
	        flattenArray(platformPipes, pipes);
	    }
	    if (lang_1.isPresent(view.pipes)) {
	        flattenArray(view.pipes, pipes);
	    }
	    return pipes;
	}
	function flattenArray(tree, out) {
	    if (out === void 0) { out = []; }
	    for (var i = 0; i < tree.length; i++) {
	        var item = core_1.resolveForwardRef(tree[i]);
	        if (lang_1.isArray(item)) {
	            flattenArray(item, out);
	        }
	        else {
	            out.push(item);
	        }
	    }
	    return out;
	}
	function verifyNonBlankProviders(directiveType, providersTree, providersType) {
	    var flat = [];
	    var errMsg;
	    flattenArray(providersTree, flat);
	    for (var i = 0; i < flat.length; i++) {
	        if (lang_1.isBlank(flat[i])) {
	            errMsg = flat.map(function (provider) { return lang_1.isBlank(provider) ? '?' : lang_1.stringify(provider); }).join(', ');
	            throw new exceptions_1.BaseException("One or more of " + providersType + " for \"" + lang_1.stringify(directiveType) + "\" were not defined: [" + errMsg + "].");
	        }
	    }
	    return providersTree;
	}
	function isStaticType(value) {
	    return lang_1.isStringMap(value) && lang_1.isPresent(value['name']) && lang_1.isPresent(value['filePath']);
	}
	function isValidType(value) {
	    return isStaticType(value) || (value instanceof lang_1.Type);
	}
	function staticTypeModuleUrl(value) {
	    return isStaticType(value) ? value['filePath'] : null;
	}
	function componentModuleUrl(reflector, type, cmpMetadata) {
	    if (isStaticType(type)) {
	        return staticTypeModuleUrl(type);
	    }
	    if (lang_1.isPresent(cmpMetadata.moduleId)) {
	        var moduleId = cmpMetadata.moduleId;
	        var scheme = url_resolver_1.getUrlScheme(moduleId);
	        return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
	            "package:" + moduleId + util_1.MODULE_SUFFIX;
	    }
	    return reflector.importUri(type);
	}
	// Only fill CompileIdentifierMetadata.runtime if needed...
	function convertToCompileValue(value) {
	    return util_1.visitValue(value, new _CompileValueConverter(), null);
	}
	var _CompileValueConverter = (function (_super) {
	    __extends(_CompileValueConverter, _super);
	    function _CompileValueConverter() {
	        _super.apply(this, arguments);
	    }
	    _CompileValueConverter.prototype.visitOther = function (value, context) {
	        if (isStaticType(value)) {
	            return new cpl.CompileIdentifierMetadata({ name: value['name'], moduleUrl: staticTypeModuleUrl(value) });
	        }
	        else {
	            return new cpl.CompileIdentifierMetadata({ runtime: value });
	        }
	    };
	    return _CompileValueConverter;
	}(util_1.ValueTransformer));
	//# sourceMappingURL=metadata_resolver.js.map

/***/ }),

/***/ 599:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	function assertArrayOfStrings(identifier, value) {
	    if (!core_1.isDevMode() || lang_1.isBlank(value)) {
	        return;
	    }
	    if (!lang_1.isArray(value)) {
	        throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
	    }
	    for (var i = 0; i < value.length; i += 1) {
	        if (!lang_1.isString(value[i])) {
	            throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array of strings.");
	        }
	    }
	}
	exports.assertArrayOfStrings = assertArrayOfStrings;
	var INTERPOLATION_BLACKLIST_REGEXPS = [
	    /^\s*$/,
	    /[<>]/,
	    /^[{}]$/,
	    /&(#|[a-z])/i,
	];
	function assertInterpolationSymbols(identifier, value) {
	    if (core_1.isDevMode() && !lang_1.isBlank(value) && (!lang_1.isArray(value) || value.length != 2)) {
	        throw new exceptions_1.BaseException("Expected '" + identifier + "' to be an array, [start, end].");
	    }
	    else if (core_1.isDevMode() && !lang_1.isBlank(value)) {
	        var start_1 = value[0];
	        var end_1 = value[1];
	        // black list checking
	        INTERPOLATION_BLACKLIST_REGEXPS.forEach(function (regexp) {
	            if (regexp.test(start_1) || regexp.test(end_1)) {
	                throw new exceptions_1.BaseException("['" + start_1 + "', '" + end_1 + "'] contains unusable interpolation symbol.");
	            }
	        });
	    }
	}
	exports.assertInterpolationSymbols = assertInterpolationSymbols;
	//# sourceMappingURL=assertions.js.map

/***/ }),

/***/ 600:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var LIFECYCLE_INTERFACES = collection_1.MapWrapper.createFromPairs([
	    [core_private_1.LifecycleHooks.OnInit, core_1.OnInit],
	    [core_private_1.LifecycleHooks.OnDestroy, core_1.OnDestroy],
	    [core_private_1.LifecycleHooks.DoCheck, core_1.DoCheck],
	    [core_private_1.LifecycleHooks.OnChanges, core_1.OnChanges],
	    [core_private_1.LifecycleHooks.AfterContentInit, core_1.AfterContentInit],
	    [core_private_1.LifecycleHooks.AfterContentChecked, core_1.AfterContentChecked],
	    [core_private_1.LifecycleHooks.AfterViewInit, core_1.AfterViewInit],
	    [core_private_1.LifecycleHooks.AfterViewChecked, core_1.AfterViewChecked],
	]);
	var LIFECYCLE_PROPS = collection_1.MapWrapper.createFromPairs([
	    [core_private_1.LifecycleHooks.OnInit, 'ngOnInit'],
	    [core_private_1.LifecycleHooks.OnDestroy, 'ngOnDestroy'],
	    [core_private_1.LifecycleHooks.DoCheck, 'ngDoCheck'],
	    [core_private_1.LifecycleHooks.OnChanges, 'ngOnChanges'],
	    [core_private_1.LifecycleHooks.AfterContentInit, 'ngAfterContentInit'],
	    [core_private_1.LifecycleHooks.AfterContentChecked, 'ngAfterContentChecked'],
	    [core_private_1.LifecycleHooks.AfterViewInit, 'ngAfterViewInit'],
	    [core_private_1.LifecycleHooks.AfterViewChecked, 'ngAfterViewChecked'],
	]);
	function hasLifecycleHook(hook, token) {
	    var lcInterface = LIFECYCLE_INTERFACES.get(hook);
	    var lcProp = LIFECYCLE_PROPS.get(hook);
	    return core_private_1.reflector.hasLifecycleHook(token, lcInterface, lcProp);
	}
	exports.hasLifecycleHook = hasLifecycleHook;
	//# sourceMappingURL=directive_lifecycle_reflector.js.map

/***/ }),

/***/ 601:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	function _isDirectiveMetadata(type) {
	    return type instanceof core_1.DirectiveMetadata;
	}
	var DirectiveResolver = (function () {
	    function DirectiveResolver(_reflector) {
	        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
	        this._reflector = _reflector;
	    }
	    /**
	     * Return {@link DirectiveMetadata} for a given `Type`.
	     */
	    DirectiveResolver.prototype.resolve = function (type) {
	        var typeMetadata = this._reflector.annotations(core_1.resolveForwardRef(type));
	        if (lang_1.isPresent(typeMetadata)) {
	            var metadata = typeMetadata.find(_isDirectiveMetadata);
	            if (lang_1.isPresent(metadata)) {
	                var propertyMetadata = this._reflector.propMetadata(type);
	                return this._mergeWithPropertyMetadata(metadata, propertyMetadata, type);
	            }
	        }
	        throw new exceptions_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
	    };
	    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata, directiveType) {
	        var inputs = [];
	        var outputs = [];
	        var host = {};
	        var queries = {};
	        collection_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
	            metadata.forEach(function (a) {
	                if (a instanceof core_1.InputMetadata) {
	                    if (lang_1.isPresent(a.bindingPropertyName)) {
	                        inputs.push(propName + ": " + a.bindingPropertyName);
	                    }
	                    else {
	                        inputs.push(propName);
	                    }
	                }
	                if (a instanceof core_1.OutputMetadata) {
	                    if (lang_1.isPresent(a.bindingPropertyName)) {
	                        outputs.push(propName + ": " + a.bindingPropertyName);
	                    }
	                    else {
	                        outputs.push(propName);
	                    }
	                }
	                if (a instanceof core_1.HostBindingMetadata) {
	                    if (lang_1.isPresent(a.hostPropertyName)) {
	                        host[("[" + a.hostPropertyName + "]")] = propName;
	                    }
	                    else {
	                        host[("[" + propName + "]")] = propName;
	                    }
	                }
	                if (a instanceof core_1.HostListenerMetadata) {
	                    var args = lang_1.isPresent(a.args) ? a.args.join(', ') : '';
	                    host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
	                }
	                if (a instanceof core_1.QueryMetadata) {
	                    queries[propName] = a;
	                }
	            });
	        });
	        return this._merge(dm, inputs, outputs, host, queries, directiveType);
	    };
	    DirectiveResolver.prototype._merge = function (dm, inputs, outputs, host, queries, directiveType) {
	        var mergedInputs = lang_1.isPresent(dm.inputs) ? collection_1.ListWrapper.concat(dm.inputs, inputs) : inputs;
	        var mergedOutputs;
	        if (lang_1.isPresent(dm.outputs)) {
	            dm.outputs.forEach(function (propName) {
	                if (collection_1.ListWrapper.contains(outputs, propName)) {
	                    throw new exceptions_1.BaseException("Output event '" + propName + "' defined multiple times in '" + lang_1.stringify(directiveType) + "'");
	                }
	            });
	            mergedOutputs = collection_1.ListWrapper.concat(dm.outputs, outputs);
	        }
	        else {
	            mergedOutputs = outputs;
	        }
	        var mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
	        var mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
	        if (dm instanceof core_1.ComponentMetadata) {
	            return new core_1.ComponentMetadata({
	                selector: dm.selector,
	                inputs: mergedInputs,
	                outputs: mergedOutputs,
	                host: mergedHost,
	                exportAs: dm.exportAs,
	                moduleId: dm.moduleId,
	                queries: mergedQueries,
	                changeDetection: dm.changeDetection,
	                providers: dm.providers,
	                viewProviders: dm.viewProviders,
	                precompile: dm.precompile
	            });
	        }
	        else {
	            return new core_1.DirectiveMetadata({
	                selector: dm.selector,
	                inputs: mergedInputs,
	                outputs: mergedOutputs,
	                host: mergedHost,
	                exportAs: dm.exportAs,
	                queries: mergedQueries,
	                providers: dm.providers
	            });
	        }
	    };
	    /** @nocollapse */
	    DirectiveResolver.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    DirectiveResolver.ctorParameters = [
	        { type: core_private_1.ReflectorReader, },
	    ];
	    return DirectiveResolver;
	}());
	exports.DirectiveResolver = DirectiveResolver;
	exports.CODEGEN_DIRECTIVE_RESOLVER = new DirectiveResolver(core_private_1.reflector);
	//# sourceMappingURL=directive_resolver.js.map

/***/ }),

/***/ 602:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	function _isPipeMetadata(type) {
	    return type instanceof core_1.PipeMetadata;
	}
	var PipeResolver = (function () {
	    function PipeResolver(_reflector) {
	        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
	        this._reflector = _reflector;
	    }
	    /**
	     * Return {@link PipeMetadata} for a given `Type`.
	     */
	    PipeResolver.prototype.resolve = function (type) {
	        var metas = this._reflector.annotations(core_1.resolveForwardRef(type));
	        if (lang_1.isPresent(metas)) {
	            var annotation = metas.find(_isPipeMetadata);
	            if (lang_1.isPresent(annotation)) {
	                return annotation;
	            }
	        }
	        throw new exceptions_1.BaseException("No Pipe decorator found on " + lang_1.stringify(type));
	    };
	    /** @nocollapse */
	    PipeResolver.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    PipeResolver.ctorParameters = [
	        { type: core_private_1.ReflectorReader, },
	    ];
	    return PipeResolver;
	}());
	exports.PipeResolver = PipeResolver;
	//# sourceMappingURL=pipe_resolver.js.map

/***/ }),

/***/ 603:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var lang_1 = __webpack_require__(542);
	var exceptions_1 = __webpack_require__(546);
	var ViewResolver = (function () {
	    function ViewResolver(_reflector) {
	        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
	        this._reflector = _reflector;
	    }
	    ViewResolver.prototype.resolve = function (component) {
	        var compMeta;
	        this._reflector.annotations(component).forEach(function (m) {
	            if (m instanceof core_1.ComponentMetadata) {
	                compMeta = m;
	            }
	        });
	        if (lang_1.isPresent(compMeta)) {
	            if (lang_1.isBlank(compMeta.template) && lang_1.isBlank(compMeta.templateUrl)) {
	                throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' must have either 'template' or 'templateUrl' set.");
	            }
	            else {
	                return new core_1.ViewMetadata({
	                    templateUrl: compMeta.templateUrl,
	                    template: compMeta.template,
	                    directives: compMeta.directives,
	                    pipes: compMeta.pipes,
	                    encapsulation: compMeta.encapsulation,
	                    styles: compMeta.styles,
	                    styleUrls: compMeta.styleUrls,
	                    animations: compMeta.animations,
	                    interpolation: compMeta.interpolation
	                });
	            }
	        }
	        else {
	            throw new exceptions_1.BaseException("Could not compile '" + lang_1.stringify(component) + "' because it is not a component.");
	        }
	    };
	    /** @nocollapse */
	    ViewResolver.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    ViewResolver.ctorParameters = [
	        { type: core_private_1.ReflectorReader, },
	    ];
	    return ViewResolver;
	}());
	exports.ViewResolver = ViewResolver;
	//# sourceMappingURL=view_resolver.js.map

/***/ }),

/***/ 604:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var lang_1 = __webpack_require__(542);
	var abstract_emitter_1 = __webpack_require__(605);
	var abstract_js_emitter_1 = __webpack_require__(606);
	var util_1 = __webpack_require__(563);
	function jitStatements(sourceUrl, statements, resultVar) {
	    var converter = new JitEmitterVisitor();
	    var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([resultVar]);
	    converter.visitAllStatements(statements, ctx);
	    return lang_1.evalExpression(sourceUrl, resultVar, ctx.toSource(), converter.getArgs());
	}
	exports.jitStatements = jitStatements;
	var JitEmitterVisitor = (function (_super) {
	    __extends(JitEmitterVisitor, _super);
	    function JitEmitterVisitor() {
	        _super.apply(this, arguments);
	        this._evalArgNames = [];
	        this._evalArgValues = [];
	    }
	    JitEmitterVisitor.prototype.getArgs = function () {
	        var result = {};
	        for (var i = 0; i < this._evalArgNames.length; i++) {
	            result[this._evalArgNames[i]] = this._evalArgValues[i];
	        }
	        return result;
	    };
	    JitEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
	        var value = ast.value.runtime;
	        var id = this._evalArgValues.indexOf(value);
	        if (id === -1) {
	            id = this._evalArgValues.length;
	            this._evalArgValues.push(value);
	            var name = lang_1.isPresent(ast.value.name) ? util_1.sanitizeIdentifier(ast.value.name) : 'val';
	            this._evalArgNames.push(util_1.sanitizeIdentifier("jit_" + name + id));
	        }
	        ctx.print(this._evalArgNames[id]);
	        return null;
	    };
	    return JitEmitterVisitor;
	}(abstract_js_emitter_1.AbstractJsEmitterVisitor));
	//# sourceMappingURL=output_jit.js.map

/***/ }),

/***/ 605:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var o = __webpack_require__(570);
	var _SINGLE_QUOTE_ESCAPE_STRING_RE = /'|\\|\n|\r|\$/g;
	exports.CATCH_ERROR_VAR = o.variable('error');
	exports.CATCH_STACK_VAR = o.variable('stack');
	var OutputEmitter = (function () {
	    function OutputEmitter() {
	    }
	    return OutputEmitter;
	}());
	exports.OutputEmitter = OutputEmitter;
	var _EmittedLine = (function () {
	    function _EmittedLine(indent) {
	        this.indent = indent;
	        this.parts = [];
	    }
	    return _EmittedLine;
	}());
	var EmitterVisitorContext = (function () {
	    function EmitterVisitorContext(_exportedVars, _indent) {
	        this._exportedVars = _exportedVars;
	        this._indent = _indent;
	        this._classes = [];
	        this._lines = [new _EmittedLine(_indent)];
	    }
	    EmitterVisitorContext.createRoot = function (exportedVars) {
	        return new EmitterVisitorContext(exportedVars, 0);
	    };
	    Object.defineProperty(EmitterVisitorContext.prototype, "_currentLine", {
	        get: function () { return this._lines[this._lines.length - 1]; },
	        enumerable: true,
	        configurable: true
	    });
	    EmitterVisitorContext.prototype.isExportedVar = function (varName) { return this._exportedVars.indexOf(varName) !== -1; };
	    EmitterVisitorContext.prototype.println = function (lastPart) {
	        if (lastPart === void 0) { lastPart = ''; }
	        this.print(lastPart, true);
	    };
	    EmitterVisitorContext.prototype.lineIsEmpty = function () { return this._currentLine.parts.length === 0; };
	    EmitterVisitorContext.prototype.print = function (part, newLine) {
	        if (newLine === void 0) { newLine = false; }
	        if (part.length > 0) {
	            this._currentLine.parts.push(part);
	        }
	        if (newLine) {
	            this._lines.push(new _EmittedLine(this._indent));
	        }
	    };
	    EmitterVisitorContext.prototype.removeEmptyLastLine = function () {
	        if (this.lineIsEmpty()) {
	            this._lines.pop();
	        }
	    };
	    EmitterVisitorContext.prototype.incIndent = function () {
	        this._indent++;
	        this._currentLine.indent = this._indent;
	    };
	    EmitterVisitorContext.prototype.decIndent = function () {
	        this._indent--;
	        this._currentLine.indent = this._indent;
	    };
	    EmitterVisitorContext.prototype.pushClass = function (clazz) { this._classes.push(clazz); };
	    EmitterVisitorContext.prototype.popClass = function () { return this._classes.pop(); };
	    Object.defineProperty(EmitterVisitorContext.prototype, "currentClass", {
	        get: function () {
	            return this._classes.length > 0 ? this._classes[this._classes.length - 1] : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    EmitterVisitorContext.prototype.toSource = function () {
	        var lines = this._lines;
	        if (lines[lines.length - 1].parts.length === 0) {
	            lines = lines.slice(0, lines.length - 1);
	        }
	        return lines
	            .map(function (line) {
	            if (line.parts.length > 0) {
	                return _createIndent(line.indent) + line.parts.join('');
	            }
	            else {
	                return '';
	            }
	        })
	            .join('\n');
	    };
	    return EmitterVisitorContext;
	}());
	exports.EmitterVisitorContext = EmitterVisitorContext;
	var AbstractEmitterVisitor = (function () {
	    function AbstractEmitterVisitor(_escapeDollarInStrings) {
	        this._escapeDollarInStrings = _escapeDollarInStrings;
	    }
	    AbstractEmitterVisitor.prototype.visitExpressionStmt = function (stmt, ctx) {
	        stmt.expr.visitExpression(this, ctx);
	        ctx.println(';');
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitReturnStmt = function (stmt, ctx) {
	        ctx.print("return ");
	        stmt.value.visitExpression(this, ctx);
	        ctx.println(';');
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitIfStmt = function (stmt, ctx) {
	        ctx.print("if (");
	        stmt.condition.visitExpression(this, ctx);
	        ctx.print(") {");
	        var hasElseCase = lang_1.isPresent(stmt.falseCase) && stmt.falseCase.length > 0;
	        if (stmt.trueCase.length <= 1 && !hasElseCase) {
	            ctx.print(" ");
	            this.visitAllStatements(stmt.trueCase, ctx);
	            ctx.removeEmptyLastLine();
	            ctx.print(" ");
	        }
	        else {
	            ctx.println();
	            ctx.incIndent();
	            this.visitAllStatements(stmt.trueCase, ctx);
	            ctx.decIndent();
	            if (hasElseCase) {
	                ctx.println("} else {");
	                ctx.incIndent();
	                this.visitAllStatements(stmt.falseCase, ctx);
	                ctx.decIndent();
	            }
	        }
	        ctx.println("}");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitThrowStmt = function (stmt, ctx) {
	        ctx.print("throw ");
	        stmt.error.visitExpression(this, ctx);
	        ctx.println(";");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitCommentStmt = function (stmt, ctx) {
	        var lines = stmt.comment.split('\n');
	        lines.forEach(function (line) { ctx.println("// " + line); });
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitWriteVarExpr = function (expr, ctx) {
	        var lineWasEmpty = ctx.lineIsEmpty();
	        if (!lineWasEmpty) {
	            ctx.print('(');
	        }
	        ctx.print(expr.name + " = ");
	        expr.value.visitExpression(this, ctx);
	        if (!lineWasEmpty) {
	            ctx.print(')');
	        }
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitWriteKeyExpr = function (expr, ctx) {
	        var lineWasEmpty = ctx.lineIsEmpty();
	        if (!lineWasEmpty) {
	            ctx.print('(');
	        }
	        expr.receiver.visitExpression(this, ctx);
	        ctx.print("[");
	        expr.index.visitExpression(this, ctx);
	        ctx.print("] = ");
	        expr.value.visitExpression(this, ctx);
	        if (!lineWasEmpty) {
	            ctx.print(')');
	        }
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitWritePropExpr = function (expr, ctx) {
	        var lineWasEmpty = ctx.lineIsEmpty();
	        if (!lineWasEmpty) {
	            ctx.print('(');
	        }
	        expr.receiver.visitExpression(this, ctx);
	        ctx.print("." + expr.name + " = ");
	        expr.value.visitExpression(this, ctx);
	        if (!lineWasEmpty) {
	            ctx.print(')');
	        }
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitInvokeMethodExpr = function (expr, ctx) {
	        expr.receiver.visitExpression(this, ctx);
	        var name = expr.name;
	        if (lang_1.isPresent(expr.builtin)) {
	            name = this.getBuiltinMethodName(expr.builtin);
	            if (lang_1.isBlank(name)) {
	                // some builtins just mean to skip the call.
	                // e.g. `bind` in Dart.
	                return null;
	            }
	        }
	        ctx.print("." + name + "(");
	        this.visitAllExpressions(expr.args, ctx, ",");
	        ctx.print(")");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr, ctx) {
	        expr.fn.visitExpression(this, ctx);
	        ctx.print("(");
	        this.visitAllExpressions(expr.args, ctx, ',');
	        ctx.print(")");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitReadVarExpr = function (ast, ctx) {
	        var varName = ast.name;
	        if (lang_1.isPresent(ast.builtin)) {
	            switch (ast.builtin) {
	                case o.BuiltinVar.Super:
	                    varName = 'super';
	                    break;
	                case o.BuiltinVar.This:
	                    varName = 'this';
	                    break;
	                case o.BuiltinVar.CatchError:
	                    varName = exports.CATCH_ERROR_VAR.name;
	                    break;
	                case o.BuiltinVar.CatchStack:
	                    varName = exports.CATCH_STACK_VAR.name;
	                    break;
	                default:
	                    throw new exceptions_1.BaseException("Unknown builtin variable " + ast.builtin);
	            }
	        }
	        ctx.print(varName);
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitInstantiateExpr = function (ast, ctx) {
	        ctx.print("new ");
	        ast.classExpr.visitExpression(this, ctx);
	        ctx.print("(");
	        this.visitAllExpressions(ast.args, ctx, ',');
	        ctx.print(")");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitLiteralExpr = function (ast, ctx) {
	        var value = ast.value;
	        if (lang_1.isString(value)) {
	            ctx.print(escapeSingleQuoteString(value, this._escapeDollarInStrings));
	        }
	        else if (lang_1.isBlank(value)) {
	            ctx.print('null');
	        }
	        else {
	            ctx.print("" + value);
	        }
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitConditionalExpr = function (ast, ctx) {
	        ctx.print("(");
	        ast.condition.visitExpression(this, ctx);
	        ctx.print('? ');
	        ast.trueCase.visitExpression(this, ctx);
	        ctx.print(': ');
	        ast.falseCase.visitExpression(this, ctx);
	        ctx.print(")");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitNotExpr = function (ast, ctx) {
	        ctx.print('!');
	        ast.condition.visitExpression(this, ctx);
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
	        var opStr;
	        switch (ast.operator) {
	            case o.BinaryOperator.Equals:
	                opStr = '==';
	                break;
	            case o.BinaryOperator.Identical:
	                opStr = '===';
	                break;
	            case o.BinaryOperator.NotEquals:
	                opStr = '!=';
	                break;
	            case o.BinaryOperator.NotIdentical:
	                opStr = '!==';
	                break;
	            case o.BinaryOperator.And:
	                opStr = '&&';
	                break;
	            case o.BinaryOperator.Or:
	                opStr = '||';
	                break;
	            case o.BinaryOperator.Plus:
	                opStr = '+';
	                break;
	            case o.BinaryOperator.Minus:
	                opStr = '-';
	                break;
	            case o.BinaryOperator.Divide:
	                opStr = '/';
	                break;
	            case o.BinaryOperator.Multiply:
	                opStr = '*';
	                break;
	            case o.BinaryOperator.Modulo:
	                opStr = '%';
	                break;
	            case o.BinaryOperator.Lower:
	                opStr = '<';
	                break;
	            case o.BinaryOperator.LowerEquals:
	                opStr = '<=';
	                break;
	            case o.BinaryOperator.Bigger:
	                opStr = '>';
	                break;
	            case o.BinaryOperator.BiggerEquals:
	                opStr = '>=';
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unknown operator " + ast.operator);
	        }
	        ctx.print("(");
	        ast.lhs.visitExpression(this, ctx);
	        ctx.print(" " + opStr + " ");
	        ast.rhs.visitExpression(this, ctx);
	        ctx.print(")");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitReadPropExpr = function (ast, ctx) {
	        ast.receiver.visitExpression(this, ctx);
	        ctx.print(".");
	        ctx.print(ast.name);
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitReadKeyExpr = function (ast, ctx) {
	        ast.receiver.visitExpression(this, ctx);
	        ctx.print("[");
	        ast.index.visitExpression(this, ctx);
	        ctx.print("]");
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitLiteralArrayExpr = function (ast, ctx) {
	        var useNewLine = ast.entries.length > 1;
	        ctx.print("[", useNewLine);
	        ctx.incIndent();
	        this.visitAllExpressions(ast.entries, ctx, ',', useNewLine);
	        ctx.decIndent();
	        ctx.print("]", useNewLine);
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitLiteralMapExpr = function (ast, ctx) {
	        var _this = this;
	        var useNewLine = ast.entries.length > 1;
	        ctx.print("{", useNewLine);
	        ctx.incIndent();
	        this.visitAllObjects(function (entry /** TODO #9100 */) {
	            ctx.print(escapeSingleQuoteString(entry[0], _this._escapeDollarInStrings) + ": ");
	            entry[1].visitExpression(_this, ctx);
	        }, ast.entries, ctx, ',', useNewLine);
	        ctx.decIndent();
	        ctx.print("}", useNewLine);
	        return null;
	    };
	    AbstractEmitterVisitor.prototype.visitAllExpressions = function (expressions, ctx, separator, newLine) {
	        var _this = this;
	        if (newLine === void 0) { newLine = false; }
	        this.visitAllObjects(function (expr /** TODO #9100 */) { return expr.visitExpression(_this, ctx); }, expressions, ctx, separator, newLine);
	    };
	    AbstractEmitterVisitor.prototype.visitAllObjects = function (handler, expressions, ctx, separator, newLine) {
	        if (newLine === void 0) { newLine = false; }
	        for (var i = 0; i < expressions.length; i++) {
	            if (i > 0) {
	                ctx.print(separator, newLine);
	            }
	            handler(expressions[i]);
	        }
	        if (newLine) {
	            ctx.println();
	        }
	    };
	    AbstractEmitterVisitor.prototype.visitAllStatements = function (statements, ctx) {
	        var _this = this;
	        statements.forEach(function (stmt) { return stmt.visitStatement(_this, ctx); });
	    };
	    return AbstractEmitterVisitor;
	}());
	exports.AbstractEmitterVisitor = AbstractEmitterVisitor;
	function escapeSingleQuoteString(input, escapeDollar) {
	    if (lang_1.isBlank(input)) {
	        return null;
	    }
	    var body = lang_1.StringWrapper.replaceAllMapped(input, _SINGLE_QUOTE_ESCAPE_STRING_RE, function (match /** TODO #9100 */) {
	        if (match[0] == '$') {
	            return escapeDollar ? '\\$' : '$';
	        }
	        else if (match[0] == '\n') {
	            return '\\n';
	        }
	        else if (match[0] == '\r') {
	            return '\\r';
	        }
	        else {
	            return "\\" + match[0];
	        }
	    });
	    return "'" + body + "'";
	}
	exports.escapeSingleQuoteString = escapeSingleQuoteString;
	function _createIndent(count) {
	    var res = '';
	    for (var i = 0; i < count; i++) {
	        res += '  ';
	    }
	    return res;
	}
	//# sourceMappingURL=abstract_emitter.js.map

/***/ }),

/***/ 606:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var abstract_emitter_1 = __webpack_require__(605);
	var o = __webpack_require__(570);
	var AbstractJsEmitterVisitor = (function (_super) {
	    __extends(AbstractJsEmitterVisitor, _super);
	    function AbstractJsEmitterVisitor() {
	        _super.call(this, false);
	    }
	    AbstractJsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
	        var _this = this;
	        ctx.pushClass(stmt);
	        this._visitClassConstructor(stmt, ctx);
	        if (lang_1.isPresent(stmt.parent)) {
	            ctx.print(stmt.name + ".prototype = Object.create(");
	            stmt.parent.visitExpression(this, ctx);
	            ctx.println(".prototype);");
	        }
	        stmt.getters.forEach(function (getter) { return _this._visitClassGetter(stmt, getter, ctx); });
	        stmt.methods.forEach(function (method) { return _this._visitClassMethod(stmt, method, ctx); });
	        ctx.popClass();
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
	        ctx.print("function " + stmt.name + "(");
	        if (lang_1.isPresent(stmt.constructorMethod)) {
	            this._visitParams(stmt.constructorMethod.params, ctx);
	        }
	        ctx.println(") {");
	        ctx.incIndent();
	        if (lang_1.isPresent(stmt.constructorMethod)) {
	            if (stmt.constructorMethod.body.length > 0) {
	                ctx.println("var self = this;");
	                this.visitAllStatements(stmt.constructorMethod.body, ctx);
	            }
	        }
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    AbstractJsEmitterVisitor.prototype._visitClassGetter = function (stmt, getter, ctx) {
	        ctx.println("Object.defineProperty(" + stmt.name + ".prototype, '" + getter.name + "', { get: function() {");
	        ctx.incIndent();
	        if (getter.body.length > 0) {
	            ctx.println("var self = this;");
	            this.visitAllStatements(getter.body, ctx);
	        }
	        ctx.decIndent();
	        ctx.println("}});");
	    };
	    AbstractJsEmitterVisitor.prototype._visitClassMethod = function (stmt, method, ctx) {
	        ctx.print(stmt.name + ".prototype." + method.name + " = function(");
	        this._visitParams(method.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        if (method.body.length > 0) {
	            ctx.println("var self = this;");
	            this.visitAllStatements(method.body, ctx);
	        }
	        ctx.decIndent();
	        ctx.println("};");
	    };
	    AbstractJsEmitterVisitor.prototype.visitReadVarExpr = function (ast, ctx) {
	        if (ast.builtin === o.BuiltinVar.This) {
	            ctx.print('self');
	        }
	        else if (ast.builtin === o.BuiltinVar.Super) {
	            throw new exceptions_1.BaseException("'super' needs to be handled at a parent ast node, not at the variable level!");
	        }
	        else {
	            _super.prototype.visitReadVarExpr.call(this, ast, ctx);
	        }
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
	        ctx.print("var " + stmt.name + " = ");
	        stmt.value.visitExpression(this, ctx);
	        ctx.println(";");
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
	        ast.value.visitExpression(this, ctx);
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype.visitInvokeFunctionExpr = function (expr, ctx) {
	        var fnExpr = expr.fn;
	        if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
	            ctx.currentClass.parent.visitExpression(this, ctx);
	            ctx.print(".call(this");
	            if (expr.args.length > 0) {
	                ctx.print(", ");
	                this.visitAllExpressions(expr.args, ctx, ',');
	            }
	            ctx.print(")");
	        }
	        else {
	            _super.prototype.visitInvokeFunctionExpr.call(this, expr, ctx);
	        }
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
	        ctx.print("function(");
	        this._visitParams(ast.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        this.visitAllStatements(ast.statements, ctx);
	        ctx.decIndent();
	        ctx.print("}");
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
	        ctx.print("function " + stmt.name + "(");
	        this._visitParams(stmt.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.statements, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
	        ctx.println("try {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.bodyStmts, ctx);
	        ctx.decIndent();
	        ctx.println("} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ") {");
	        ctx.incIndent();
	        var catchStmts = [abstract_emitter_1.CATCH_STACK_VAR.set(abstract_emitter_1.CATCH_ERROR_VAR.prop('stack')).toDeclStmt(null, [
	                o.StmtModifier.Final
	            ])].concat(stmt.catchStmts);
	        this.visitAllStatements(catchStmts, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	        return null;
	    };
	    AbstractJsEmitterVisitor.prototype._visitParams = function (params, ctx) {
	        this.visitAllObjects(function (param /** TODO #9100 */) { return ctx.print(param.name); }, params, ctx, ',');
	    };
	    AbstractJsEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
	        var name;
	        switch (method) {
	            case o.BuiltinMethod.ConcatArray:
	                name = 'concat';
	                break;
	            case o.BuiltinMethod.SubscribeObservable:
	                name = 'subscribe';
	                break;
	            case o.BuiltinMethod.bind:
	                name = 'bind';
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unknown builtin method: " + method);
	        }
	        return name;
	    };
	    return AbstractJsEmitterVisitor;
	}(abstract_emitter_1.AbstractEmitterVisitor));
	exports.AbstractJsEmitterVisitor = AbstractJsEmitterVisitor;
	//# sourceMappingURL=abstract_js_emitter.js.map

/***/ }),

/***/ 607:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_private_1 = __webpack_require__(544);
	var async_1 = __webpack_require__(592);
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var dart_emitter_1 = __webpack_require__(608);
	var o = __webpack_require__(570);
	var ts_emitter_1 = __webpack_require__(609);
	function interpretStatements(statements, resultVar, instanceFactory) {
	    var stmtsWithReturn = statements.concat([new o.ReturnStatement(o.variable(resultVar))]);
	    var ctx = new _ExecutionContext(null, null, null, null, new Map(), new Map(), new Map(), new Map(), instanceFactory);
	    var visitor = new StatementInterpreter();
	    var result = visitor.visitAllStatements(stmtsWithReturn, ctx);
	    return lang_1.isPresent(result) ? result.value : null;
	}
	exports.interpretStatements = interpretStatements;
	var DynamicInstance = (function () {
	    function DynamicInstance() {
	    }
	    Object.defineProperty(DynamicInstance.prototype, "props", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DynamicInstance.prototype, "getters", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DynamicInstance.prototype, "methods", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(DynamicInstance.prototype, "clazz", {
	        get: function () { return exceptions_1.unimplemented(); },
	        enumerable: true,
	        configurable: true
	    });
	    return DynamicInstance;
	}());
	exports.DynamicInstance = DynamicInstance;
	function isDynamicInstance(instance) {
	    if (lang_1.IS_DART) {
	        return instance instanceof DynamicInstance;
	    }
	    else {
	        return lang_1.isPresent(instance) && lang_1.isPresent(instance.props) && lang_1.isPresent(instance.getters) &&
	            lang_1.isPresent(instance.methods);
	    }
	}
	function _executeFunctionStatements(varNames, varValues, statements, ctx, visitor) {
	    var childCtx = ctx.createChildWihtLocalVars();
	    for (var i = 0; i < varNames.length; i++) {
	        childCtx.vars.set(varNames[i], varValues[i]);
	    }
	    var result = visitor.visitAllStatements(statements, childCtx);
	    return lang_1.isPresent(result) ? result.value : null;
	}
	var _ExecutionContext = (function () {
	    function _ExecutionContext(parent, superClass, superInstance, className, vars, props, getters, methods, instanceFactory) {
	        this.parent = parent;
	        this.superClass = superClass;
	        this.superInstance = superInstance;
	        this.className = className;
	        this.vars = vars;
	        this.props = props;
	        this.getters = getters;
	        this.methods = methods;
	        this.instanceFactory = instanceFactory;
	    }
	    _ExecutionContext.prototype.createChildWihtLocalVars = function () {
	        return new _ExecutionContext(this, this.superClass, this.superInstance, this.className, new Map(), this.props, this.getters, this.methods, this.instanceFactory);
	    };
	    return _ExecutionContext;
	}());
	var ReturnValue = (function () {
	    function ReturnValue(value) {
	        this.value = value;
	    }
	    return ReturnValue;
	}());
	var _DynamicClass = (function () {
	    function _DynamicClass(_classStmt, _ctx, _visitor) {
	        this._classStmt = _classStmt;
	        this._ctx = _ctx;
	        this._visitor = _visitor;
	    }
	    _DynamicClass.prototype.instantiate = function (args) {
	        var _this = this;
	        var props = new Map();
	        var getters = new Map();
	        var methods = new Map();
	        var superClass = this._classStmt.parent.visitExpression(this._visitor, this._ctx);
	        var instanceCtx = new _ExecutionContext(this._ctx, superClass, null, this._classStmt.name, this._ctx.vars, props, getters, methods, this._ctx.instanceFactory);
	        this._classStmt.fields.forEach(function (field) { props.set(field.name, null); });
	        this._classStmt.getters.forEach(function (getter) {
	            getters.set(getter.name, function () { return _executeFunctionStatements([], [], getter.body, instanceCtx, _this._visitor); });
	        });
	        this._classStmt.methods.forEach(function (method) {
	            var paramNames = method.params.map(function (param) { return param.name; });
	            methods.set(method.name, _declareFn(paramNames, method.body, instanceCtx, _this._visitor));
	        });
	        var ctorParamNames = this._classStmt.constructorMethod.params.map(function (param) { return param.name; });
	        _executeFunctionStatements(ctorParamNames, args, this._classStmt.constructorMethod.body, instanceCtx, this._visitor);
	        return instanceCtx.superInstance;
	    };
	    _DynamicClass.prototype.debugAst = function () { return this._visitor.debugAst(this._classStmt); };
	    return _DynamicClass;
	}());
	var StatementInterpreter = (function () {
	    function StatementInterpreter() {
	    }
	    StatementInterpreter.prototype.debugAst = function (ast) {
	        return lang_1.IS_DART ? dart_emitter_1.debugOutputAstAsDart(ast) : ts_emitter_1.debugOutputAstAsTypeScript(ast);
	    };
	    StatementInterpreter.prototype.visitDeclareVarStmt = function (stmt, ctx) {
	        ctx.vars.set(stmt.name, stmt.value.visitExpression(this, ctx));
	        return null;
	    };
	    StatementInterpreter.prototype.visitWriteVarExpr = function (expr, ctx) {
	        var value = expr.value.visitExpression(this, ctx);
	        var currCtx = ctx;
	        while (currCtx != null) {
	            if (currCtx.vars.has(expr.name)) {
	                currCtx.vars.set(expr.name, value);
	                return value;
	            }
	            currCtx = currCtx.parent;
	        }
	        throw new exceptions_1.BaseException("Not declared variable " + expr.name);
	    };
	    StatementInterpreter.prototype.visitReadVarExpr = function (ast, ctx) {
	        var varName = ast.name;
	        if (lang_1.isPresent(ast.builtin)) {
	            switch (ast.builtin) {
	                case o.BuiltinVar.Super:
	                case o.BuiltinVar.This:
	                    return ctx.superInstance;
	                case o.BuiltinVar.CatchError:
	                    varName = CATCH_ERROR_VAR;
	                    break;
	                case o.BuiltinVar.CatchStack:
	                    varName = CATCH_STACK_VAR;
	                    break;
	                default:
	                    throw new exceptions_1.BaseException("Unknown builtin variable " + ast.builtin);
	            }
	        }
	        var currCtx = ctx;
	        while (currCtx != null) {
	            if (currCtx.vars.has(varName)) {
	                return currCtx.vars.get(varName);
	            }
	            currCtx = currCtx.parent;
	        }
	        throw new exceptions_1.BaseException("Not declared variable " + varName);
	    };
	    StatementInterpreter.prototype.visitWriteKeyExpr = function (expr, ctx) {
	        var receiver = expr.receiver.visitExpression(this, ctx);
	        var index = expr.index.visitExpression(this, ctx);
	        var value = expr.value.visitExpression(this, ctx);
	        receiver[index] = value;
	        return value;
	    };
	    StatementInterpreter.prototype.visitWritePropExpr = function (expr, ctx) {
	        var receiver = expr.receiver.visitExpression(this, ctx);
	        var value = expr.value.visitExpression(this, ctx);
	        if (isDynamicInstance(receiver)) {
	            var di = receiver;
	            if (di.props.has(expr.name)) {
	                di.props.set(expr.name, value);
	            }
	            else {
	                core_private_1.reflector.setter(expr.name)(receiver, value);
	            }
	        }
	        else {
	            core_private_1.reflector.setter(expr.name)(receiver, value);
	        }
	        return value;
	    };
	    StatementInterpreter.prototype.visitInvokeMethodExpr = function (expr, ctx) {
	        var receiver = expr.receiver.visitExpression(this, ctx);
	        var args = this.visitAllExpressions(expr.args, ctx);
	        var result;
	        if (lang_1.isPresent(expr.builtin)) {
	            switch (expr.builtin) {
	                case o.BuiltinMethod.ConcatArray:
	                    result = collection_1.ListWrapper.concat(receiver, args[0]);
	                    break;
	                case o.BuiltinMethod.SubscribeObservable:
	                    result = async_1.ObservableWrapper.subscribe(receiver, args[0]);
	                    break;
	                case o.BuiltinMethod.bind:
	                    if (lang_1.IS_DART) {
	                        result = receiver;
	                    }
	                    else {
	                        result = receiver.bind(args[0]);
	                    }
	                    break;
	                default:
	                    throw new exceptions_1.BaseException("Unknown builtin method " + expr.builtin);
	            }
	        }
	        else if (isDynamicInstance(receiver)) {
	            var di = receiver;
	            if (di.methods.has(expr.name)) {
	                result = lang_1.FunctionWrapper.apply(di.methods.get(expr.name), args);
	            }
	            else {
	                result = core_private_1.reflector.method(expr.name)(receiver, args);
	            }
	        }
	        else {
	            result = core_private_1.reflector.method(expr.name)(receiver, args);
	        }
	        return result;
	    };
	    StatementInterpreter.prototype.visitInvokeFunctionExpr = function (stmt, ctx) {
	        var args = this.visitAllExpressions(stmt.args, ctx);
	        var fnExpr = stmt.fn;
	        if (fnExpr instanceof o.ReadVarExpr && fnExpr.builtin === o.BuiltinVar.Super) {
	            ctx.superInstance = ctx.instanceFactory.createInstance(ctx.superClass, ctx.className, args, ctx.props, ctx.getters, ctx.methods);
	            ctx.parent.superInstance = ctx.superInstance;
	            return null;
	        }
	        else {
	            var fn = stmt.fn.visitExpression(this, ctx);
	            return lang_1.FunctionWrapper.apply(fn, args);
	        }
	    };
	    StatementInterpreter.prototype.visitReturnStmt = function (stmt, ctx) {
	        return new ReturnValue(stmt.value.visitExpression(this, ctx));
	    };
	    StatementInterpreter.prototype.visitDeclareClassStmt = function (stmt, ctx) {
	        var clazz = new _DynamicClass(stmt, ctx, this);
	        ctx.vars.set(stmt.name, clazz);
	        return null;
	    };
	    StatementInterpreter.prototype.visitExpressionStmt = function (stmt, ctx) {
	        return stmt.expr.visitExpression(this, ctx);
	    };
	    StatementInterpreter.prototype.visitIfStmt = function (stmt, ctx) {
	        var condition = stmt.condition.visitExpression(this, ctx);
	        if (condition) {
	            return this.visitAllStatements(stmt.trueCase, ctx);
	        }
	        else if (lang_1.isPresent(stmt.falseCase)) {
	            return this.visitAllStatements(stmt.falseCase, ctx);
	        }
	        return null;
	    };
	    StatementInterpreter.prototype.visitTryCatchStmt = function (stmt, ctx) {
	        try {
	            return this.visitAllStatements(stmt.bodyStmts, ctx);
	        }
	        catch (e) {
	            var childCtx = ctx.createChildWihtLocalVars();
	            childCtx.vars.set(CATCH_ERROR_VAR, e);
	            childCtx.vars.set(CATCH_STACK_VAR, e.stack);
	            return this.visitAllStatements(stmt.catchStmts, childCtx);
	        }
	    };
	    StatementInterpreter.prototype.visitThrowStmt = function (stmt, ctx) {
	        throw stmt.error.visitExpression(this, ctx);
	    };
	    StatementInterpreter.prototype.visitCommentStmt = function (stmt, context) { return null; };
	    StatementInterpreter.prototype.visitInstantiateExpr = function (ast, ctx) {
	        var args = this.visitAllExpressions(ast.args, ctx);
	        var clazz = ast.classExpr.visitExpression(this, ctx);
	        if (clazz instanceof _DynamicClass) {
	            return clazz.instantiate(args);
	        }
	        else {
	            return lang_1.FunctionWrapper.apply(core_private_1.reflector.factory(clazz), args);
	        }
	    };
	    StatementInterpreter.prototype.visitLiteralExpr = function (ast, ctx) { return ast.value; };
	    StatementInterpreter.prototype.visitExternalExpr = function (ast, ctx) { return ast.value.runtime; };
	    StatementInterpreter.prototype.visitConditionalExpr = function (ast, ctx) {
	        if (ast.condition.visitExpression(this, ctx)) {
	            return ast.trueCase.visitExpression(this, ctx);
	        }
	        else if (lang_1.isPresent(ast.falseCase)) {
	            return ast.falseCase.visitExpression(this, ctx);
	        }
	        return null;
	    };
	    StatementInterpreter.prototype.visitNotExpr = function (ast, ctx) {
	        return !ast.condition.visitExpression(this, ctx);
	    };
	    StatementInterpreter.prototype.visitCastExpr = function (ast, ctx) {
	        return ast.value.visitExpression(this, ctx);
	    };
	    StatementInterpreter.prototype.visitFunctionExpr = function (ast, ctx) {
	        var paramNames = ast.params.map(function (param) { return param.name; });
	        return _declareFn(paramNames, ast.statements, ctx, this);
	    };
	    StatementInterpreter.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
	        var paramNames = stmt.params.map(function (param) { return param.name; });
	        ctx.vars.set(stmt.name, _declareFn(paramNames, stmt.statements, ctx, this));
	        return null;
	    };
	    StatementInterpreter.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
	        var _this = this;
	        var lhs = function () { return ast.lhs.visitExpression(_this, ctx); };
	        var rhs = function () { return ast.rhs.visitExpression(_this, ctx); };
	        switch (ast.operator) {
	            case o.BinaryOperator.Equals:
	                return lhs() == rhs();
	            case o.BinaryOperator.Identical:
	                return lhs() === rhs();
	            case o.BinaryOperator.NotEquals:
	                return lhs() != rhs();
	            case o.BinaryOperator.NotIdentical:
	                return lhs() !== rhs();
	            case o.BinaryOperator.And:
	                return lhs() && rhs();
	            case o.BinaryOperator.Or:
	                return lhs() || rhs();
	            case o.BinaryOperator.Plus:
	                return lhs() + rhs();
	            case o.BinaryOperator.Minus:
	                return lhs() - rhs();
	            case o.BinaryOperator.Divide:
	                return lhs() / rhs();
	            case o.BinaryOperator.Multiply:
	                return lhs() * rhs();
	            case o.BinaryOperator.Modulo:
	                return lhs() % rhs();
	            case o.BinaryOperator.Lower:
	                return lhs() < rhs();
	            case o.BinaryOperator.LowerEquals:
	                return lhs() <= rhs();
	            case o.BinaryOperator.Bigger:
	                return lhs() > rhs();
	            case o.BinaryOperator.BiggerEquals:
	                return lhs() >= rhs();
	            default:
	                throw new exceptions_1.BaseException("Unknown operator " + ast.operator);
	        }
	    };
	    StatementInterpreter.prototype.visitReadPropExpr = function (ast, ctx) {
	        var result;
	        var receiver = ast.receiver.visitExpression(this, ctx);
	        if (isDynamicInstance(receiver)) {
	            var di = receiver;
	            if (di.props.has(ast.name)) {
	                result = di.props.get(ast.name);
	            }
	            else if (di.getters.has(ast.name)) {
	                result = di.getters.get(ast.name)();
	            }
	            else if (di.methods.has(ast.name)) {
	                result = di.methods.get(ast.name);
	            }
	            else {
	                result = core_private_1.reflector.getter(ast.name)(receiver);
	            }
	        }
	        else {
	            result = core_private_1.reflector.getter(ast.name)(receiver);
	        }
	        return result;
	    };
	    StatementInterpreter.prototype.visitReadKeyExpr = function (ast, ctx) {
	        var receiver = ast.receiver.visitExpression(this, ctx);
	        var prop = ast.index.visitExpression(this, ctx);
	        return receiver[prop];
	    };
	    StatementInterpreter.prototype.visitLiteralArrayExpr = function (ast, ctx) {
	        return this.visitAllExpressions(ast.entries, ctx);
	    };
	    StatementInterpreter.prototype.visitLiteralMapExpr = function (ast, ctx) {
	        var _this = this;
	        var result = {};
	        ast.entries.forEach(function (entry) { return result[entry[0]] =
	            entry[1].visitExpression(_this, ctx); });
	        return result;
	    };
	    StatementInterpreter.prototype.visitAllExpressions = function (expressions, ctx) {
	        var _this = this;
	        return expressions.map(function (expr) { return expr.visitExpression(_this, ctx); });
	    };
	    StatementInterpreter.prototype.visitAllStatements = function (statements, ctx) {
	        for (var i = 0; i < statements.length; i++) {
	            var stmt = statements[i];
	            var val = stmt.visitStatement(this, ctx);
	            if (val instanceof ReturnValue) {
	                return val;
	            }
	        }
	        return null;
	    };
	    return StatementInterpreter;
	}());
	function _declareFn(varNames, statements, ctx, visitor) {
	    switch (varNames.length) {
	        case 0:
	            return function () { return _executeFunctionStatements(varNames, [], statements, ctx, visitor); };
	        case 1:
	            return function (d0 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0], statements, ctx, visitor);
	            };
	        case 2:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1], statements, ctx, visitor);
	            };
	        case 3:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2], statements, ctx, visitor);
	            };
	        case 4:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3], statements, ctx, visitor);
	            };
	        case 5:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */, d4 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4], statements, ctx, visitor);
	            };
	        case 6:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */, d4 /** TODO #9100 */, d5 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5], statements, ctx, visitor);
	            };
	        case 7:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */, d4 /** TODO #9100 */, d5 /** TODO #9100 */, d6 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6], statements, ctx, visitor);
	            };
	        case 8:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */, d4 /** TODO #9100 */, d5 /** TODO #9100 */, d6 /** TODO #9100 */, d7 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7], statements, ctx, visitor);
	            };
	        case 9:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */, d4 /** TODO #9100 */, d5 /** TODO #9100 */, d6 /** TODO #9100 */, d7 /** TODO #9100 */, d8 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7, d8], statements, ctx, visitor);
	            };
	        case 10:
	            return function (d0 /** TODO #9100 */, d1 /** TODO #9100 */, d2 /** TODO #9100 */, d3 /** TODO #9100 */, d4 /** TODO #9100 */, d5 /** TODO #9100 */, d6 /** TODO #9100 */, d7 /** TODO #9100 */, d8 /** TODO #9100 */, d9 /** TODO #9100 */) {
	                return _executeFunctionStatements(varNames, [d0, d1, d2, d3, d4, d5, d6, d7, d8, d9], statements, ctx, visitor);
	            };
	        default:
	            throw new exceptions_1.BaseException('Declaring functions with more than 10 arguments is not supported right now');
	    }
	}
	var CATCH_ERROR_VAR = 'error';
	var CATCH_STACK_VAR = 'stack';
	//# sourceMappingURL=output_interpreter.js.map

/***/ }),

/***/ 608:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var o = __webpack_require__(570);
	var abstract_emitter_1 = __webpack_require__(605);
	var _debugModuleUrl = 'asset://debug/lib';
	function debugOutputAstAsDart(ast) {
	    var converter = new _DartEmitterVisitor(_debugModuleUrl);
	    var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([]);
	    var asts;
	    if (lang_1.isArray(ast)) {
	        asts = ast;
	    }
	    else {
	        asts = [ast];
	    }
	    asts.forEach(function (ast) {
	        if (ast instanceof o.Statement) {
	            ast.visitStatement(converter, ctx);
	        }
	        else if (ast instanceof o.Expression) {
	            ast.visitExpression(converter, ctx);
	        }
	        else if (ast instanceof o.Type) {
	            ast.visitType(converter, ctx);
	        }
	        else {
	            throw new exceptions_1.BaseException("Don't know how to print debug info for " + ast);
	        }
	    });
	    return ctx.toSource();
	}
	exports.debugOutputAstAsDart = debugOutputAstAsDart;
	var DartEmitter = (function () {
	    function DartEmitter(_importGenerator) {
	        this._importGenerator = _importGenerator;
	    }
	    DartEmitter.prototype.emitStatements = function (moduleUrl, stmts, exportedVars) {
	        var _this = this;
	        var srcParts = [];
	        // Note: We are not creating a library here as Dart does not need it.
	        // Dart analzyer might complain about it though.
	        var converter = new _DartEmitterVisitor(moduleUrl);
	        var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
	        converter.visitAllStatements(stmts, ctx);
	        converter.importsWithPrefixes.forEach(function (prefix, importedModuleUrl) {
	            srcParts.push("import '" + _this._importGenerator.getImportPath(moduleUrl, importedModuleUrl) + "' as " + prefix + ";");
	        });
	        srcParts.push(ctx.toSource());
	        return srcParts.join('\n');
	    };
	    return DartEmitter;
	}());
	exports.DartEmitter = DartEmitter;
	var _DartEmitterVisitor = (function (_super) {
	    __extends(_DartEmitterVisitor, _super);
	    function _DartEmitterVisitor(_moduleUrl) {
	        _super.call(this, true);
	        this._moduleUrl = _moduleUrl;
	        this.importsWithPrefixes = new Map();
	    }
	    _DartEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
	        this._visitIdentifier(ast.value, ast.typeParams, ctx);
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
	        if (stmt.hasModifier(o.StmtModifier.Final)) {
	            if (isConstType(stmt.type)) {
	                ctx.print("const ");
	            }
	            else {
	                ctx.print("final ");
	            }
	        }
	        else if (lang_1.isBlank(stmt.type)) {
	            ctx.print("var ");
	        }
	        if (lang_1.isPresent(stmt.type)) {
	            stmt.type.visitType(this, ctx);
	            ctx.print(" ");
	        }
	        ctx.print(stmt.name + " = ");
	        stmt.value.visitExpression(this, ctx);
	        ctx.println(";");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
	        ctx.print("(");
	        ast.value.visitExpression(this, ctx);
	        ctx.print(" as ");
	        ast.type.visitType(this, ctx);
	        ctx.print(")");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
	        var _this = this;
	        ctx.pushClass(stmt);
	        ctx.print("class " + stmt.name);
	        if (lang_1.isPresent(stmt.parent)) {
	            ctx.print(" extends ");
	            stmt.parent.visitExpression(this, ctx);
	        }
	        ctx.println(" {");
	        ctx.incIndent();
	        stmt.fields.forEach(function (field) { return _this._visitClassField(field, ctx); });
	        if (lang_1.isPresent(stmt.constructorMethod)) {
	            this._visitClassConstructor(stmt, ctx);
	        }
	        stmt.getters.forEach(function (getter) { return _this._visitClassGetter(getter, ctx); });
	        stmt.methods.forEach(function (method) { return _this._visitClassMethod(method, ctx); });
	        ctx.decIndent();
	        ctx.println("}");
	        ctx.popClass();
	        return null;
	    };
	    _DartEmitterVisitor.prototype._visitClassField = function (field, ctx) {
	        if (field.hasModifier(o.StmtModifier.Final)) {
	            ctx.print("final ");
	        }
	        else if (lang_1.isBlank(field.type)) {
	            ctx.print("var ");
	        }
	        if (lang_1.isPresent(field.type)) {
	            field.type.visitType(this, ctx);
	            ctx.print(" ");
	        }
	        ctx.println(field.name + ";");
	    };
	    _DartEmitterVisitor.prototype._visitClassGetter = function (getter, ctx) {
	        if (lang_1.isPresent(getter.type)) {
	            getter.type.visitType(this, ctx);
	            ctx.print(" ");
	        }
	        ctx.println("get " + getter.name + " {");
	        ctx.incIndent();
	        this.visitAllStatements(getter.body, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    _DartEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
	        ctx.print(stmt.name + "(");
	        this._visitParams(stmt.constructorMethod.params, ctx);
	        ctx.print(")");
	        var ctorStmts = stmt.constructorMethod.body;
	        var superCtorExpr = ctorStmts.length > 0 ? getSuperConstructorCallExpr(ctorStmts[0]) : null;
	        if (lang_1.isPresent(superCtorExpr)) {
	            ctx.print(": ");
	            superCtorExpr.visitExpression(this, ctx);
	            ctorStmts = ctorStmts.slice(1);
	        }
	        ctx.println(" {");
	        ctx.incIndent();
	        this.visitAllStatements(ctorStmts, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    _DartEmitterVisitor.prototype._visitClassMethod = function (method, ctx) {
	        if (lang_1.isPresent(method.type)) {
	            method.type.visitType(this, ctx);
	        }
	        else {
	            ctx.print("void");
	        }
	        ctx.print(" " + method.name + "(");
	        this._visitParams(method.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        this.visitAllStatements(method.body, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    _DartEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
	        ctx.print("(");
	        this._visitParams(ast.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        this.visitAllStatements(ast.statements, ctx);
	        ctx.decIndent();
	        ctx.print("}");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
	        if (lang_1.isPresent(stmt.type)) {
	            stmt.type.visitType(this, ctx);
	        }
	        else {
	            ctx.print("void");
	        }
	        ctx.print(" " + stmt.name + "(");
	        this._visitParams(stmt.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.statements, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
	        var name;
	        switch (method) {
	            case o.BuiltinMethod.ConcatArray:
	                name = '.addAll';
	                break;
	            case o.BuiltinMethod.SubscribeObservable:
	                name = 'listen';
	                break;
	            case o.BuiltinMethod.bind:
	                name = null;
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unknown builtin method: " + method);
	        }
	        return name;
	    };
	    _DartEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
	        ctx.println("try {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.bodyStmts, ctx);
	        ctx.decIndent();
	        ctx.println("} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ", " + abstract_emitter_1.CATCH_STACK_VAR.name + ") {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.catchStmts, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitBinaryOperatorExpr = function (ast, ctx) {
	        switch (ast.operator) {
	            case o.BinaryOperator.Identical:
	                ctx.print("identical(");
	                ast.lhs.visitExpression(this, ctx);
	                ctx.print(", ");
	                ast.rhs.visitExpression(this, ctx);
	                ctx.print(")");
	                break;
	            case o.BinaryOperator.NotIdentical:
	                ctx.print("!identical(");
	                ast.lhs.visitExpression(this, ctx);
	                ctx.print(", ");
	                ast.rhs.visitExpression(this, ctx);
	                ctx.print(")");
	                break;
	            default:
	                _super.prototype.visitBinaryOperatorExpr.call(this, ast, ctx);
	        }
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitLiteralArrayExpr = function (ast, ctx) {
	        if (isConstType(ast.type)) {
	            ctx.print("const ");
	        }
	        return _super.prototype.visitLiteralArrayExpr.call(this, ast, ctx);
	    };
	    _DartEmitterVisitor.prototype.visitLiteralMapExpr = function (ast, ctx) {
	        if (isConstType(ast.type)) {
	            ctx.print("const ");
	        }
	        if (lang_1.isPresent(ast.valueType)) {
	            ctx.print("<String, ");
	            ast.valueType.visitType(this, ctx);
	            ctx.print(">");
	        }
	        return _super.prototype.visitLiteralMapExpr.call(this, ast, ctx);
	    };
	    _DartEmitterVisitor.prototype.visitInstantiateExpr = function (ast, ctx) {
	        ctx.print(isConstType(ast.type) ? "const" : "new");
	        ctx.print(' ');
	        ast.classExpr.visitExpression(this, ctx);
	        ctx.print("(");
	        this.visitAllExpressions(ast.args, ctx, ",");
	        ctx.print(")");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitBuiltintType = function (type, ctx) {
	        var typeStr;
	        switch (type.name) {
	            case o.BuiltinTypeName.Bool:
	                typeStr = 'bool';
	                break;
	            case o.BuiltinTypeName.Dynamic:
	                typeStr = 'dynamic';
	                break;
	            case o.BuiltinTypeName.Function:
	                typeStr = 'Function';
	                break;
	            case o.BuiltinTypeName.Number:
	                typeStr = 'num';
	                break;
	            case o.BuiltinTypeName.Int:
	                typeStr = 'int';
	                break;
	            case o.BuiltinTypeName.String:
	                typeStr = 'String';
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unsupported builtin type " + type.name);
	        }
	        ctx.print(typeStr);
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitExternalType = function (ast, ctx) {
	        this._visitIdentifier(ast.value, ast.typeParams, ctx);
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitArrayType = function (type, ctx) {
	        ctx.print("List<");
	        if (lang_1.isPresent(type.of)) {
	            type.of.visitType(this, ctx);
	        }
	        else {
	            ctx.print("dynamic");
	        }
	        ctx.print(">");
	        return null;
	    };
	    _DartEmitterVisitor.prototype.visitMapType = function (type, ctx) {
	        ctx.print("Map<String, ");
	        if (lang_1.isPresent(type.valueType)) {
	            type.valueType.visitType(this, ctx);
	        }
	        else {
	            ctx.print("dynamic");
	        }
	        ctx.print(">");
	        return null;
	    };
	    _DartEmitterVisitor.prototype._visitParams = function (params, ctx) {
	        var _this = this;
	        this.visitAllObjects(function (param /** TODO #9100 */) {
	            if (lang_1.isPresent(param.type)) {
	                param.type.visitType(_this, ctx);
	                ctx.print(' ');
	            }
	            ctx.print(param.name);
	        }, params, ctx, ',');
	    };
	    _DartEmitterVisitor.prototype._visitIdentifier = function (value, typeParams, ctx) {
	        var _this = this;
	        if (lang_1.isBlank(value.name)) {
	            throw new exceptions_1.BaseException("Internal error: unknown identifier " + value);
	        }
	        if (lang_1.isPresent(value.moduleUrl) && value.moduleUrl != this._moduleUrl) {
	            var prefix = this.importsWithPrefixes.get(value.moduleUrl);
	            if (lang_1.isBlank(prefix)) {
	                prefix = "import" + this.importsWithPrefixes.size;
	                this.importsWithPrefixes.set(value.moduleUrl, prefix);
	            }
	            ctx.print(prefix + ".");
	        }
	        ctx.print(value.name);
	        if (lang_1.isPresent(typeParams) && typeParams.length > 0) {
	            ctx.print("<");
	            this.visitAllObjects(function (type /** TODO #9100 */) { return type.visitType(_this, ctx); }, typeParams, ctx, ',');
	            ctx.print(">");
	        }
	    };
	    return _DartEmitterVisitor;
	}(abstract_emitter_1.AbstractEmitterVisitor));
	function getSuperConstructorCallExpr(stmt) {
	    if (stmt instanceof o.ExpressionStatement) {
	        var expr = stmt.expr;
	        if (expr instanceof o.InvokeFunctionExpr) {
	            var fn = expr.fn;
	            if (fn instanceof o.ReadVarExpr) {
	                if (fn.builtin === o.BuiltinVar.Super) {
	                    return expr;
	                }
	            }
	        }
	    }
	    return null;
	}
	function isConstType(type) {
	    return lang_1.isPresent(type) && type.hasModifier(o.TypeModifier.Const);
	}
	//# sourceMappingURL=dart_emitter.js.map

/***/ }),

/***/ 609:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var abstract_emitter_1 = __webpack_require__(605);
	var o = __webpack_require__(570);
	var _debugModuleUrl = 'asset://debug/lib';
	function debugOutputAstAsTypeScript(ast) {
	    var converter = new _TsEmitterVisitor(_debugModuleUrl);
	    var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot([]);
	    var asts;
	    if (lang_1.isArray(ast)) {
	        asts = ast;
	    }
	    else {
	        asts = [ast];
	    }
	    asts.forEach(function (ast) {
	        if (ast instanceof o.Statement) {
	            ast.visitStatement(converter, ctx);
	        }
	        else if (ast instanceof o.Expression) {
	            ast.visitExpression(converter, ctx);
	        }
	        else if (ast instanceof o.Type) {
	            ast.visitType(converter, ctx);
	        }
	        else {
	            throw new exceptions_1.BaseException("Don't know how to print debug info for " + ast);
	        }
	    });
	    return ctx.toSource();
	}
	exports.debugOutputAstAsTypeScript = debugOutputAstAsTypeScript;
	var TypeScriptEmitter = (function () {
	    function TypeScriptEmitter(_importGenerator) {
	        this._importGenerator = _importGenerator;
	    }
	    TypeScriptEmitter.prototype.emitStatements = function (moduleUrl, stmts, exportedVars) {
	        var _this = this;
	        var converter = new _TsEmitterVisitor(moduleUrl);
	        var ctx = abstract_emitter_1.EmitterVisitorContext.createRoot(exportedVars);
	        converter.visitAllStatements(stmts, ctx);
	        var srcParts = [];
	        converter.importsWithPrefixes.forEach(function (prefix, importedModuleUrl) {
	            // Note: can't write the real word for import as it screws up system.js auto detection...
	            srcParts.push("imp" +
	                ("ort * as " + prefix + " from '" + _this._importGenerator.getImportPath(moduleUrl, importedModuleUrl) + "';"));
	        });
	        srcParts.push(ctx.toSource());
	        return srcParts.join('\n');
	    };
	    return TypeScriptEmitter;
	}());
	exports.TypeScriptEmitter = TypeScriptEmitter;
	var _TsEmitterVisitor = (function (_super) {
	    __extends(_TsEmitterVisitor, _super);
	    function _TsEmitterVisitor(_moduleUrl) {
	        _super.call(this, false);
	        this._moduleUrl = _moduleUrl;
	        this.importsWithPrefixes = new Map();
	    }
	    _TsEmitterVisitor.prototype.visitType = function (t, ctx, defaultType) {
	        if (defaultType === void 0) { defaultType = 'any'; }
	        if (lang_1.isPresent(t)) {
	            t.visitType(this, ctx);
	        }
	        else {
	            ctx.print(defaultType);
	        }
	    };
	    _TsEmitterVisitor.prototype.visitExternalExpr = function (ast, ctx) {
	        this._visitIdentifier(ast.value, ast.typeParams, ctx);
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitDeclareVarStmt = function (stmt, ctx) {
	        if (ctx.isExportedVar(stmt.name)) {
	            ctx.print("export ");
	        }
	        if (stmt.hasModifier(o.StmtModifier.Final)) {
	            ctx.print("const");
	        }
	        else {
	            ctx.print("var");
	        }
	        ctx.print(" " + stmt.name + ":");
	        this.visitType(stmt.type, ctx);
	        ctx.print(" = ");
	        stmt.value.visitExpression(this, ctx);
	        ctx.println(";");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitCastExpr = function (ast, ctx) {
	        ctx.print("(<");
	        ast.type.visitType(this, ctx);
	        ctx.print(">");
	        ast.value.visitExpression(this, ctx);
	        ctx.print(")");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitDeclareClassStmt = function (stmt, ctx) {
	        var _this = this;
	        ctx.pushClass(stmt);
	        if (ctx.isExportedVar(stmt.name)) {
	            ctx.print("export ");
	        }
	        ctx.print("class " + stmt.name);
	        if (lang_1.isPresent(stmt.parent)) {
	            ctx.print(" extends ");
	            stmt.parent.visitExpression(this, ctx);
	        }
	        ctx.println(" {");
	        ctx.incIndent();
	        stmt.fields.forEach(function (field) { return _this._visitClassField(field, ctx); });
	        if (lang_1.isPresent(stmt.constructorMethod)) {
	            this._visitClassConstructor(stmt, ctx);
	        }
	        stmt.getters.forEach(function (getter) { return _this._visitClassGetter(getter, ctx); });
	        stmt.methods.forEach(function (method) { return _this._visitClassMethod(method, ctx); });
	        ctx.decIndent();
	        ctx.println("}");
	        ctx.popClass();
	        return null;
	    };
	    _TsEmitterVisitor.prototype._visitClassField = function (field, ctx) {
	        if (field.hasModifier(o.StmtModifier.Private)) {
	            ctx.print("private ");
	        }
	        ctx.print(field.name);
	        ctx.print(':');
	        this.visitType(field.type, ctx);
	        ctx.println(";");
	    };
	    _TsEmitterVisitor.prototype._visitClassGetter = function (getter, ctx) {
	        if (getter.hasModifier(o.StmtModifier.Private)) {
	            ctx.print("private ");
	        }
	        ctx.print("get " + getter.name + "()");
	        ctx.print(':');
	        this.visitType(getter.type, ctx);
	        ctx.println(" {");
	        ctx.incIndent();
	        this.visitAllStatements(getter.body, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    _TsEmitterVisitor.prototype._visitClassConstructor = function (stmt, ctx) {
	        ctx.print("constructor(");
	        this._visitParams(stmt.constructorMethod.params, ctx);
	        ctx.println(") {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.constructorMethod.body, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    _TsEmitterVisitor.prototype._visitClassMethod = function (method, ctx) {
	        if (method.hasModifier(o.StmtModifier.Private)) {
	            ctx.print("private ");
	        }
	        ctx.print(method.name + "(");
	        this._visitParams(method.params, ctx);
	        ctx.print("):");
	        this.visitType(method.type, ctx, 'void');
	        ctx.println(" {");
	        ctx.incIndent();
	        this.visitAllStatements(method.body, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	    };
	    _TsEmitterVisitor.prototype.visitFunctionExpr = function (ast, ctx) {
	        ctx.print("(");
	        this._visitParams(ast.params, ctx);
	        ctx.print("):");
	        this.visitType(ast.type, ctx, 'void');
	        ctx.println(" => {");
	        ctx.incIndent();
	        this.visitAllStatements(ast.statements, ctx);
	        ctx.decIndent();
	        ctx.print("}");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitDeclareFunctionStmt = function (stmt, ctx) {
	        if (ctx.isExportedVar(stmt.name)) {
	            ctx.print("export ");
	        }
	        ctx.print("function " + stmt.name + "(");
	        this._visitParams(stmt.params, ctx);
	        ctx.print("):");
	        this.visitType(stmt.type, ctx, 'void');
	        ctx.println(" {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.statements, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitTryCatchStmt = function (stmt, ctx) {
	        ctx.println("try {");
	        ctx.incIndent();
	        this.visitAllStatements(stmt.bodyStmts, ctx);
	        ctx.decIndent();
	        ctx.println("} catch (" + abstract_emitter_1.CATCH_ERROR_VAR.name + ") {");
	        ctx.incIndent();
	        var catchStmts = [abstract_emitter_1.CATCH_STACK_VAR.set(abstract_emitter_1.CATCH_ERROR_VAR.prop('stack')).toDeclStmt(null, [
	                o.StmtModifier.Final
	            ])].concat(stmt.catchStmts);
	        this.visitAllStatements(catchStmts, ctx);
	        ctx.decIndent();
	        ctx.println("}");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitBuiltintType = function (type, ctx) {
	        var typeStr;
	        switch (type.name) {
	            case o.BuiltinTypeName.Bool:
	                typeStr = 'boolean';
	                break;
	            case o.BuiltinTypeName.Dynamic:
	                typeStr = 'any';
	                break;
	            case o.BuiltinTypeName.Function:
	                typeStr = 'Function';
	                break;
	            case o.BuiltinTypeName.Number:
	                typeStr = 'number';
	                break;
	            case o.BuiltinTypeName.Int:
	                typeStr = 'number';
	                break;
	            case o.BuiltinTypeName.String:
	                typeStr = 'string';
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unsupported builtin type " + type.name);
	        }
	        ctx.print(typeStr);
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitExternalType = function (ast, ctx) {
	        this._visitIdentifier(ast.value, ast.typeParams, ctx);
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitArrayType = function (type, ctx) {
	        this.visitType(type.of, ctx);
	        ctx.print("[]");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.visitMapType = function (type, ctx) {
	        ctx.print("{[key: string]:");
	        this.visitType(type.valueType, ctx);
	        ctx.print("}");
	        return null;
	    };
	    _TsEmitterVisitor.prototype.getBuiltinMethodName = function (method) {
	        var name;
	        switch (method) {
	            case o.BuiltinMethod.ConcatArray:
	                name = 'concat';
	                break;
	            case o.BuiltinMethod.SubscribeObservable:
	                name = 'subscribe';
	                break;
	            case o.BuiltinMethod.bind:
	                name = 'bind';
	                break;
	            default:
	                throw new exceptions_1.BaseException("Unknown builtin method: " + method);
	        }
	        return name;
	    };
	    _TsEmitterVisitor.prototype._visitParams = function (params, ctx) {
	        var _this = this;
	        this.visitAllObjects(function (param /** TODO #9100 */) {
	            ctx.print(param.name);
	            ctx.print(':');
	            _this.visitType(param.type, ctx);
	        }, params, ctx, ',');
	    };
	    _TsEmitterVisitor.prototype._visitIdentifier = function (value, typeParams, ctx) {
	        var _this = this;
	        if (lang_1.isBlank(value.name)) {
	            throw new exceptions_1.BaseException("Internal error: unknown identifier " + value);
	        }
	        if (lang_1.isPresent(value.moduleUrl) && value.moduleUrl != this._moduleUrl) {
	            var prefix = this.importsWithPrefixes.get(value.moduleUrl);
	            if (lang_1.isBlank(prefix)) {
	                prefix = "import" + this.importsWithPrefixes.size;
	                this.importsWithPrefixes.set(value.moduleUrl, prefix);
	            }
	            ctx.print(prefix + ".");
	        }
	        ctx.print(value.name);
	        if (lang_1.isPresent(typeParams) && typeParams.length > 0) {
	            ctx.print("<");
	            this.visitAllObjects(function (type /** TODO #9100 */) { return type.visitType(_this, ctx); }, typeParams, ctx, ',');
	            ctx.print(">");
	        }
	    };
	    return _TsEmitterVisitor;
	}(abstract_emitter_1.AbstractEmitterVisitor));
	//# sourceMappingURL=ts_emitter.js.map

/***/ }),

/***/ 610:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_private_1 = __webpack_require__(544);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var InterpretiveAppViewInstanceFactory = (function () {
	    function InterpretiveAppViewInstanceFactory() {
	    }
	    InterpretiveAppViewInstanceFactory.prototype.createInstance = function (superClass, clazz, args, props, getters, methods) {
	        if (superClass === core_private_1.AppView) {
	            // We are always using DebugAppView as parent.
	            // However, in prod mode we generate a constructor call that does
	            // not have the argument for the debugNodeInfos.
	            args = args.concat([null]);
	            return new _InterpretiveAppView(args, props, getters, methods);
	        }
	        else if (superClass === core_private_1.DebugAppView) {
	            return new _InterpretiveAppView(args, props, getters, methods);
	        }
	        throw new exceptions_1.BaseException("Can't instantiate class " + superClass + " in interpretative mode");
	    };
	    return InterpretiveAppViewInstanceFactory;
	}());
	exports.InterpretiveAppViewInstanceFactory = InterpretiveAppViewInstanceFactory;
	var _InterpretiveAppView = (function (_super) {
	    __extends(_InterpretiveAppView, _super);
	    function _InterpretiveAppView(args, props, getters, methods) {
	        _super.call(this, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
	        this.props = props;
	        this.getters = getters;
	        this.methods = methods;
	    }
	    _InterpretiveAppView.prototype.createInternal = function (rootSelector) {
	        var m = this.methods.get('createInternal');
	        if (lang_1.isPresent(m)) {
	            return m(rootSelector);
	        }
	        else {
	            return _super.prototype.createInternal.call(this, rootSelector);
	        }
	    };
	    _InterpretiveAppView.prototype.injectorGetInternal = function (token, nodeIndex, notFoundResult) {
	        var m = this.methods.get('injectorGetInternal');
	        if (lang_1.isPresent(m)) {
	            return m(token, nodeIndex, notFoundResult);
	        }
	        else {
	            return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
	        }
	    };
	    _InterpretiveAppView.prototype.detachInternal = function () {
	        var m = this.methods.get('detachInternal');
	        if (lang_1.isPresent(m)) {
	            return m();
	        }
	        else {
	            return _super.prototype.detachInternal.call(this);
	        }
	    };
	    _InterpretiveAppView.prototype.destroyInternal = function () {
	        var m = this.methods.get('destroyInternal');
	        if (lang_1.isPresent(m)) {
	            return m();
	        }
	        else {
	            return _super.prototype.destroyInternal.call(this);
	        }
	    };
	    _InterpretiveAppView.prototype.dirtyParentQueriesInternal = function () {
	        var m = this.methods.get('dirtyParentQueriesInternal');
	        if (lang_1.isPresent(m)) {
	            return m();
	        }
	        else {
	            return _super.prototype.dirtyParentQueriesInternal.call(this);
	        }
	    };
	    _InterpretiveAppView.prototype.detectChangesInternal = function (throwOnChange) {
	        var m = this.methods.get('detectChangesInternal');
	        if (lang_1.isPresent(m)) {
	            return m(throwOnChange);
	        }
	        else {
	            return _super.prototype.detectChangesInternal.call(this, throwOnChange);
	        }
	    };
	    return _InterpretiveAppView;
	}(core_private_1.DebugAppView));
	//# sourceMappingURL=interpretive_view.js.map

/***/ }),

/***/ 611:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var core_1 = __webpack_require__(284);
	var core_private_1 = __webpack_require__(544);
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var dom_security_schema_1 = __webpack_require__(612);
	var element_schema_registry_1 = __webpack_require__(560);
	var EVENT = 'event';
	var BOOLEAN = 'boolean';
	var NUMBER = 'number';
	var STRING = 'string';
	var OBJECT = 'object';
	/**
	 * This array represents the DOM schema. It encodes inheritance, properties, and events.
	 *
	 * ## Overview
	 *
	 * Each line represents one kind of element. The `element_inheritance` and properties are joined
	 * using `element_inheritance|preperties` syntax.
	 *
	 * ## Element Inheritance
	 *
	 * The `element_inheritance` can be further subdivided as `element1,element2,...^parentElement`.
	 * Here the individual elements are separated by `,` (commas). Every element in the list
	 * has identical properties.
	 *
	 * An `element` may inherit additional properties from `parentElement` If no `^parentElement` is
	 * specified then `""` (blank) element is assumed.
	 *
	 * NOTE: The blank element inherits from root `*` element, the super element of all elements.
	 *
	 * NOTE an element prefix such as `:svg:` has no special meaning to the schema.
	 *
	 * ## Properties
	 *
	 * Each element has a set of properties separated by `,` (commas). Each property can be prefixed
	 * by a special character designating its type:
	 *
	 * - (no prefix): property is a string.
	 * - `*`: property represents an event.
	 * - `!`: property is a boolean.
	 * - `#`: property is a number.
	 * - `%`: property is an object.
	 *
	 * ## Query
	 *
	 * The class creates an internal squas representaino which allows to easily answer the query of
	 * if a given property exist on a given element.
	 *
	 * NOTE: We don't yet support querying for types or events.
	 * NOTE: This schema is auto extracted from `schema_extractor.ts` located in the test folder,
	 *       see dom_element_schema_registry_spec.ts
	 */
	// =================================================================================================
	// =================================================================================================
	// =========== S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P  ===========
	// =================================================================================================
	// =================================================================================================
	//
	//                       DO NOT EDIT THIS DOM SCHEMA WITHOUT A SECURITY REVIEW!
	//
	// Newly added properties must be security reviewed and assigned an appropriate SecurityContext in
	// dom_security_schema.ts. Reach out to mprobst & rjamet for details.
	//
	// =================================================================================================
	var SCHEMA = 
	/*@ts2dart_const*/ ([
	    '*|textContent,%classList,className,id,innerHTML,*beforecopy,*beforecut,*beforepaste,*copy,*cut,*paste,*search,*selectstart,*webkitfullscreenchange,*webkitfullscreenerror,*wheel,outerHTML,#scrollLeft,#scrollTop',
	    '^*|accessKey,contentEditable,dir,!draggable,!hidden,innerText,lang,*abort,*autocomplete,*autocompleteerror,*beforecopy,*beforecut,*beforepaste,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*copy,*cuechange,*cut,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*message,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*mozfullscreenchange,*mozfullscreenerror,*mozpointerlockchange,*mozpointerlockerror,*paste,*pause,*play,*playing,*progress,*ratechange,*reset,*resize,*scroll,*search,*seeked,*seeking,*select,*selectstart,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,*webglcontextcreationerror,*webglcontextlost,*webglcontextrestored,*webkitfullscreenchange,*webkitfullscreenerror,*wheel,outerText,!spellcheck,%style,#tabIndex,title,!translate',
	    'media|!autoplay,!controls,%crossOrigin,#currentTime,!defaultMuted,#defaultPlaybackRate,!disableRemotePlayback,!loop,!muted,*encrypted,#playbackRate,preload,src,#volume',
	    ':svg:^*|*abort,*autocomplete,*autocompleteerror,*blur,*cancel,*canplay,*canplaythrough,*change,*click,*close,*contextmenu,*cuechange,*dblclick,*drag,*dragend,*dragenter,*dragleave,*dragover,*dragstart,*drop,*durationchange,*emptied,*ended,*error,*focus,*input,*invalid,*keydown,*keypress,*keyup,*load,*loadeddata,*loadedmetadata,*loadstart,*mousedown,*mouseenter,*mouseleave,*mousemove,*mouseout,*mouseover,*mouseup,*mousewheel,*pause,*play,*playing,*progress,*ratechange,*reset,*resize,*scroll,*seeked,*seeking,*select,*show,*stalled,*submit,*suspend,*timeupdate,*toggle,*volumechange,*waiting,%style,#tabIndex',
	    ':svg:graphics^:svg:|',
	    ':svg:animation^:svg:|*begin,*end,*repeat',
	    ':svg:geometry^:svg:|',
	    ':svg:componentTransferFunction^:svg:|',
	    ':svg:gradient^:svg:|',
	    ':svg:textContent^:svg:graphics|',
	    ':svg:textPositioning^:svg:textContent|',
	    'a|charset,coords,download,hash,host,hostname,href,hreflang,name,password,pathname,ping,port,protocol,referrerpolicy,rel,rev,search,shape,target,text,type,username',
	    'area|alt,coords,hash,host,hostname,href,!noHref,password,pathname,ping,port,protocol,referrerpolicy,search,shape,target,username',
	    'audio^media|',
	    'br|clear',
	    'base|href,target',
	    'body|aLink,background,bgColor,link,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,text,vLink',
	    'button|!autofocus,!disabled,formAction,formEnctype,formMethod,!formNoValidate,formTarget,name,type,value',
	    'canvas|#height,#width',
	    'content|select',
	    'dl|!compact',
	    'datalist|',
	    'details|!open',
	    'dialog|!open,returnValue',
	    'dir|!compact',
	    'div|align',
	    'embed|align,height,name,src,type,width',
	    'fieldset|!disabled,name',
	    'font|color,face,size',
	    'form|acceptCharset,action,autocomplete,encoding,enctype,method,name,!noValidate,target',
	    'frame|frameBorder,longDesc,marginHeight,marginWidth,name,!noResize,scrolling,src',
	    'frameset|cols,*beforeunload,*blur,*error,*focus,*hashchange,*languagechange,*load,*message,*offline,*online,*pagehide,*pageshow,*popstate,*rejectionhandled,*resize,*scroll,*storage,*unhandledrejection,*unload,rows',
	    'hr|align,color,!noShade,size,width',
	    'head|',
	    'h1,h2,h3,h4,h5,h6|align',
	    'html|version',
	    'iframe|align,!allowFullscreen,frameBorder,height,longDesc,marginHeight,marginWidth,name,referrerpolicy,%sandbox,scrolling,src,srcdoc,width',
	    'img|align,alt,border,%crossOrigin,#height,#hspace,!isMap,longDesc,lowsrc,name,referrerpolicy,sizes,src,srcset,useMap,#vspace,#width',
	    'input|accept,align,alt,autocapitalize,autocomplete,!autofocus,!checked,!defaultChecked,defaultValue,dirName,!disabled,%files,formAction,formEnctype,formMethod,!formNoValidate,formTarget,#height,!incremental,!indeterminate,max,#maxLength,min,#minLength,!multiple,name,pattern,placeholder,!readOnly,!required,selectionDirection,#selectionEnd,#selectionStart,#size,src,step,type,useMap,value,%valueAsDate,#valueAsNumber,#width',
	    'keygen|!autofocus,challenge,!disabled,keytype,name',
	    'li|type,#value',
	    'label|htmlFor',
	    'legend|align',
	    'link|as,charset,%crossOrigin,!disabled,href,hreflang,integrity,media,rel,%relList,rev,%sizes,target,type',
	    'map|name',
	    'marquee|behavior,bgColor,direction,height,#hspace,#loop,#scrollAmount,#scrollDelay,!trueSpeed,#vspace,width',
	    'menu|!compact',
	    'meta|content,httpEquiv,name,scheme',
	    'meter|#high,#low,#max,#min,#optimum,#value',
	    'ins,del|cite,dateTime',
	    'ol|!compact,!reversed,#start,type',
	    'object|align,archive,border,code,codeBase,codeType,data,!declare,height,#hspace,name,standby,type,useMap,#vspace,width',
	    'optgroup|!disabled,label',
	    'option|!defaultSelected,!disabled,label,!selected,text,value',
	    'output|defaultValue,%htmlFor,name,value',
	    'p|align',
	    'param|name,type,value,valueType',
	    'picture|',
	    'pre|#width',
	    'progress|#max,#value',
	    'q,blockquote,cite|',
	    'script|!async,charset,%crossOrigin,!defer,event,htmlFor,integrity,src,text,type',
	    'select|!autofocus,!disabled,#length,!multiple,name,!required,#selectedIndex,#size,value',
	    'shadow|',
	    'source|media,sizes,src,srcset,type',
	    'span|',
	    'style|!disabled,media,type',
	    'caption|align',
	    'th,td|abbr,align,axis,bgColor,ch,chOff,#colSpan,headers,height,!noWrap,#rowSpan,scope,vAlign,width',
	    'col,colgroup|align,ch,chOff,#span,vAlign,width',
	    'table|align,bgColor,border,%caption,cellPadding,cellSpacing,frame,rules,summary,%tFoot,%tHead,width',
	    'tr|align,bgColor,ch,chOff,vAlign',
	    'tfoot,thead,tbody|align,ch,chOff,vAlign',
	    'template|',
	    'textarea|autocapitalize,!autofocus,#cols,defaultValue,dirName,!disabled,#maxLength,#minLength,name,placeholder,!readOnly,!required,#rows,selectionDirection,#selectionEnd,#selectionStart,value,wrap',
	    'title|text',
	    'track|!default,kind,label,src,srclang',
	    'ul|!compact,type',
	    'unknown|',
	    'video^media|#height,poster,#width',
	    ':svg:a^:svg:graphics|',
	    ':svg:animate^:svg:animation|',
	    ':svg:animateMotion^:svg:animation|',
	    ':svg:animateTransform^:svg:animation|',
	    ':svg:circle^:svg:geometry|',
	    ':svg:clipPath^:svg:graphics|',
	    ':svg:cursor^:svg:|',
	    ':svg:defs^:svg:graphics|',
	    ':svg:desc^:svg:|',
	    ':svg:discard^:svg:|',
	    ':svg:ellipse^:svg:geometry|',
	    ':svg:feBlend^:svg:|',
	    ':svg:feColorMatrix^:svg:|',
	    ':svg:feComponentTransfer^:svg:|',
	    ':svg:feComposite^:svg:|',
	    ':svg:feConvolveMatrix^:svg:|',
	    ':svg:feDiffuseLighting^:svg:|',
	    ':svg:feDisplacementMap^:svg:|',
	    ':svg:feDistantLight^:svg:|',
	    ':svg:feDropShadow^:svg:|',
	    ':svg:feFlood^:svg:|',
	    ':svg:feFuncA^:svg:componentTransferFunction|',
	    ':svg:feFuncB^:svg:componentTransferFunction|',
	    ':svg:feFuncG^:svg:componentTransferFunction|',
	    ':svg:feFuncR^:svg:componentTransferFunction|',
	    ':svg:feGaussianBlur^:svg:|',
	    ':svg:feImage^:svg:|',
	    ':svg:feMerge^:svg:|',
	    ':svg:feMergeNode^:svg:|',
	    ':svg:feMorphology^:svg:|',
	    ':svg:feOffset^:svg:|',
	    ':svg:fePointLight^:svg:|',
	    ':svg:feSpecularLighting^:svg:|',
	    ':svg:feSpotLight^:svg:|',
	    ':svg:feTile^:svg:|',
	    ':svg:feTurbulence^:svg:|',
	    ':svg:filter^:svg:|',
	    ':svg:foreignObject^:svg:graphics|',
	    ':svg:g^:svg:graphics|',
	    ':svg:image^:svg:graphics|',
	    ':svg:line^:svg:geometry|',
	    ':svg:linearGradient^:svg:gradient|',
	    ':svg:mpath^:svg:|',
	    ':svg:marker^:svg:|',
	    ':svg:mask^:svg:|',
	    ':svg:metadata^:svg:|',
	    ':svg:path^:svg:geometry|',
	    ':svg:pattern^:svg:|',
	    ':svg:polygon^:svg:geometry|',
	    ':svg:polyline^:svg:geometry|',
	    ':svg:radialGradient^:svg:gradient|',
	    ':svg:rect^:svg:geometry|',
	    ':svg:svg^:svg:graphics|#currentScale,#zoomAndPan',
	    ':svg:script^:svg:|type',
	    ':svg:set^:svg:animation|',
	    ':svg:stop^:svg:|',
	    ':svg:style^:svg:|!disabled,media,title,type',
	    ':svg:switch^:svg:graphics|',
	    ':svg:symbol^:svg:|',
	    ':svg:tspan^:svg:textPositioning|',
	    ':svg:text^:svg:textPositioning|',
	    ':svg:textPath^:svg:textContent|',
	    ':svg:title^:svg:|',
	    ':svg:use^:svg:graphics|',
	    ':svg:view^:svg:|#zoomAndPan',
	]);
	var attrToPropMap = {
	    'class': 'className',
	    'formaction': 'formAction',
	    'innerHtml': 'innerHTML',
	    'readonly': 'readOnly',
	    'tabindex': 'tabIndex'
	};
	var DomElementSchemaRegistry = (function (_super) {
	    __extends(DomElementSchemaRegistry, _super);
	    function DomElementSchemaRegistry() {
	        var _this = this;
	        _super.call(this);
	        this.schema = {};
	        SCHEMA.forEach(function (encodedType) {
	            var parts = encodedType.split('|');
	            var properties = parts[1].split(',');
	            var typeParts = (parts[0] + '^').split('^');
	            var typeName = typeParts[0];
	            var type = {};
	            typeName.split(',').forEach(function (tag) { return _this.schema[tag] = type; });
	            var superType = _this.schema[typeParts[1]];
	            if (lang_1.isPresent(superType)) {
	                collection_1.StringMapWrapper.forEach(superType, function (v /** TODO #9100 */, k /** TODO #9100 */) { return type[k] = v; });
	            }
	            properties.forEach(function (property) {
	                if (property == '') {
	                }
	                else if (property.startsWith('*')) {
	                }
	                else if (property.startsWith('!')) {
	                    type[property.substring(1)] = BOOLEAN;
	                }
	                else if (property.startsWith('#')) {
	                    type[property.substring(1)] = NUMBER;
	                }
	                else if (property.startsWith('%')) {
	                    type[property.substring(1)] = OBJECT;
	                }
	                else {
	                    type[property] = STRING;
	                }
	            });
	        });
	    }
	    DomElementSchemaRegistry.prototype.hasProperty = function (tagName, propName) {
	        if (tagName.indexOf('-') !== -1) {
	            if (tagName === 'ng-container' || tagName === 'ng-content') {
	                return false;
	            }
	            // Can't tell now as we don't know which properties a custom element will get
	            // once it is instantiated
	            return true;
	        }
	        else {
	            var elementProperties = this.schema[tagName.toLowerCase()];
	            if (!lang_1.isPresent(elementProperties)) {
	                elementProperties = this.schema['unknown'];
	            }
	            return lang_1.isPresent(elementProperties[propName]);
	        }
	    };
	    /**
	     * securityContext returns the security context for the given property on the given DOM tag.
	     *
	     * Tag and property name are statically known and cannot change at runtime, i.e. it is not
	     * possible to bind a value into a changing attribute or tag name.
	     *
	     * The filtering is white list based. All attributes in the schema above are assumed to have the
	     * 'NONE' security context, i.e. that they are safe inert string values. Only specific well known
	     * attack vectors are assigned their appropriate context.
	     */
	    DomElementSchemaRegistry.prototype.securityContext = function (tagName, propName) {
	        // Make sure comparisons are case insensitive, so that case differences between attribute and
	        // property names do not have a security impact.
	        tagName = tagName.toLowerCase();
	        propName = propName.toLowerCase();
	        var ctx = dom_security_schema_1.SECURITY_SCHEMA[tagName + '|' + propName];
	        if (ctx !== undefined)
	            return ctx;
	        ctx = dom_security_schema_1.SECURITY_SCHEMA['*|' + propName];
	        return ctx !== undefined ? ctx : core_private_1.SecurityContext.NONE;
	    };
	    DomElementSchemaRegistry.prototype.getMappedPropName = function (propName) {
	        var mappedPropName = collection_1.StringMapWrapper.get(attrToPropMap, propName);
	        return lang_1.isPresent(mappedPropName) ? mappedPropName : propName;
	    };
	    /** @nocollapse */
	    DomElementSchemaRegistry.decorators = [
	        { type: core_1.Injectable },
	    ];
	    /** @nocollapse */
	    DomElementSchemaRegistry.ctorParameters = [];
	    return DomElementSchemaRegistry;
	}(element_schema_registry_1.ElementSchemaRegistry));
	exports.DomElementSchemaRegistry = DomElementSchemaRegistry;
	//# sourceMappingURL=dom_element_schema_registry.js.map

/***/ }),

/***/ 612:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_private_1 = __webpack_require__(544);
	// =================================================================================================
	// =================================================================================================
	// =========== S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P  ===========
	// =================================================================================================
	// =================================================================================================
	//
	//        DO NOT EDIT THIS LIST OF SECURITY SENSITIVE PROPERTIES WITHOUT A SECURITY REVIEW!
	//                               Reach out to mprobst for details.
	//
	// =================================================================================================
	/** Map from tagName|propertyName SecurityContext. Properties applying to all tags use '*'. */
	exports.SECURITY_SCHEMA = {};
	function registerContext(ctx, specs) {
	    for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
	        var spec = specs_1[_i];
	        exports.SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
	    }
	}
	// Case is insignificant below, all element and attribute names are lower-cased for lookup.
	registerContext(core_private_1.SecurityContext.HTML, [
	    'iframe|srcdoc',
	    '*|innerHTML',
	    '*|outerHTML',
	]);
	registerContext(core_private_1.SecurityContext.STYLE, ['*|style']);
	// NB: no SCRIPT contexts here, they are never allowed due to the parser stripping them.
	registerContext(core_private_1.SecurityContext.URL, [
	    '*|formAction', 'area|href', 'area|ping', 'audio|src', 'a|href',
	    'a|ping', 'blockquote|cite', 'body|background', 'del|cite', 'form|action',
	    'img|src', 'img|srcset', 'input|src', 'ins|cite', 'q|cite',
	    'source|src', 'source|srcset', 'video|poster', 'video|src',
	]);
	registerContext(core_private_1.SecurityContext.RESOURCE_URL, [
	    'applet|code',
	    'applet|codebase',
	    'base|href',
	    'embed|src',
	    'frame|src',
	    'head|profile',
	    'html|manifest',
	    'iframe|src',
	    'link|href',
	    'media|src',
	    'object|codebase',
	    'object|data',
	    'script|src',
	    'track|src',
	]);
	//# sourceMappingURL=dom_security_schema.js.map

/***/ }),

/***/ 613:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var directive_normalizer = __webpack_require__(596);
	var lexer = __webpack_require__(553);
	var parser = __webpack_require__(550);
	var html_parser = __webpack_require__(554);
	var i18n_html_parser = __webpack_require__(614);
	var i18n_message = __webpack_require__(617);
	var i18n_extractor = __webpack_require__(618);
	var xmb_serializer = __webpack_require__(619);
	var metadata_resolver = __webpack_require__(598);
	var path_util = __webpack_require__(620);
	var ts_emitter = __webpack_require__(609);
	var parse_util = __webpack_require__(558);
	var dom_element_schema_registry = __webpack_require__(611);
	var selector = __webpack_require__(559);
	var style_compiler = __webpack_require__(594);
	var template_parser = __webpack_require__(543);
	var view_compiler = __webpack_require__(571);
	var __compiler_private__;
	(function (__compiler_private__) {
	    __compiler_private__.SelectorMatcher = selector.SelectorMatcher;
	    __compiler_private__.CssSelector = selector.CssSelector;
	    __compiler_private__.AssetUrl = path_util.AssetUrl;
	    __compiler_private__.ImportGenerator = path_util.ImportGenerator;
	    __compiler_private__.CompileMetadataResolver = metadata_resolver.CompileMetadataResolver;
	    __compiler_private__.HtmlParser = html_parser.HtmlParser;
	    __compiler_private__.I18nHtmlParser = i18n_html_parser.I18nHtmlParser;
	    __compiler_private__.ExtractionResult = i18n_extractor.ExtractionResult;
	    __compiler_private__.Message = i18n_message.Message;
	    __compiler_private__.MessageExtractor = i18n_extractor.MessageExtractor;
	    __compiler_private__.removeDuplicates = i18n_extractor.removeDuplicates;
	    __compiler_private__.serializeXmb = xmb_serializer.serializeXmb;
	    __compiler_private__.deserializeXmb = xmb_serializer.deserializeXmb;
	    __compiler_private__.DirectiveNormalizer = directive_normalizer.DirectiveNormalizer;
	    __compiler_private__.Lexer = lexer.Lexer;
	    __compiler_private__.Parser = parser.Parser;
	    __compiler_private__.ParseLocation = parse_util.ParseLocation;
	    __compiler_private__.ParseError = parse_util.ParseError;
	    __compiler_private__.ParseErrorLevel = parse_util.ParseErrorLevel;
	    __compiler_private__.ParseSourceFile = parse_util.ParseSourceFile;
	    __compiler_private__.ParseSourceSpan = parse_util.ParseSourceSpan;
	    __compiler_private__.TemplateParser = template_parser.TemplateParser;
	    __compiler_private__.DomElementSchemaRegistry = dom_element_schema_registry.DomElementSchemaRegistry;
	    __compiler_private__.StyleCompiler = style_compiler.StyleCompiler;
	    __compiler_private__.ViewCompiler = view_compiler.ViewCompiler;
	    __compiler_private__.TypeScriptEmitter = ts_emitter.TypeScriptEmitter;
	})(__compiler_private__ = exports.__compiler_private__ || (exports.__compiler_private__ = {}));
	//# sourceMappingURL=private_export.js.map

/***/ }),

/***/ 614:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	var html_ast_1 = __webpack_require__(555);
	var html_parser_1 = __webpack_require__(554);
	var interpolation_config_1 = __webpack_require__(552);
	var expander_1 = __webpack_require__(615);
	var message_1 = __webpack_require__(617);
	var shared_1 = __webpack_require__(616);
	var _PLACEHOLDER_ELEMENT = 'ph';
	var _NAME_ATTR = 'name';
	var _PLACEHOLDER_EXPANDED_REGEXP = /<ph(\s)+name=("(\w)+")><\/ph>/gi;
	/**
	 * Creates an i18n-ed version of the parsed template.
	 *
	 * Algorithm:
	 *
	 * See `message_extractor.ts` for details on the partitioning algorithm.
	 *
	 * This is how the merging works:
	 *
	 * 1. Use the stringify function to get the message id. Look up the message in the map.
	 * 2. Get the translated message. At this point we have two trees: the original tree
	 * and the translated tree, where all the elements are replaced with placeholders.
	 * 3. Use the original tree to create a mapping Index:number -> HtmlAst.
	 * 4. Walk the translated tree.
	 * 5. If we encounter a placeholder element, get its name property.
	 * 6. Get the type and the index of the node using the name property.
	 * 7. If the type is 'e', which means element, then:
	 *     - translate the attributes of the original element
	 *     - recurse to merge the children
	 *     - create a new element using the original element name, original position,
	 *     and translated children and attributes
	 * 8. If the type if 't', which means text, then:
	 *     - get the list of expressions from the original node.
	 *     - get the string version of the interpolation subtree
	 *     - find all the placeholders in the translated message, and replace them with the
	 *     corresponding original expressions
	 */
	var I18nHtmlParser = (function () {
	    function I18nHtmlParser(_htmlParser, _parser, _messagesContent, _messages, _implicitTags, _implicitAttrs) {
	        this._htmlParser = _htmlParser;
	        this._parser = _parser;
	        this._messagesContent = _messagesContent;
	        this._messages = _messages;
	        this._implicitTags = _implicitTags;
	        this._implicitAttrs = _implicitAttrs;
	    }
	    I18nHtmlParser.prototype.parse = function (sourceContent, sourceUrl, parseExpansionForms, interpolationConfig) {
	        if (parseExpansionForms === void 0) { parseExpansionForms = false; }
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        this.errors = [];
	        this._interpolationConfig = interpolationConfig;
	        var res = this._htmlParser.parse(sourceContent, sourceUrl, true);
	        if (res.errors.length > 0) {
	            return res;
	        }
	        else {
	            var expanded = expander_1.expandNodes(res.rootNodes);
	            var nodes = this._recurse(expanded.nodes);
	            (_a = this.errors).push.apply(_a, expanded.errors);
	            return this.errors.length > 0 ? new html_parser_1.HtmlParseTreeResult([], this.errors) :
	                new html_parser_1.HtmlParseTreeResult(nodes, []);
	        }
	        var _a;
	    };
	    I18nHtmlParser.prototype._processI18nPart = function (part) {
	        try {
	            return part.hasI18n ? this._mergeI18Part(part) : this._recurseIntoI18nPart(part);
	        }
	        catch (e) {
	            if (e instanceof shared_1.I18nError) {
	                this.errors.push(e);
	                return [];
	            }
	            else {
	                throw e;
	            }
	        }
	    };
	    I18nHtmlParser.prototype._mergeI18Part = function (part) {
	        var message = part.createMessage(this._parser, this._interpolationConfig);
	        var messageId = message_1.id(message);
	        if (!collection_1.StringMapWrapper.contains(this._messages, messageId)) {
	            throw new shared_1.I18nError(part.sourceSpan, "Cannot find message for id '" + messageId + "', content '" + message.content + "'.");
	        }
	        var parsedMessage = this._messages[messageId];
	        return this._mergeTrees(part, parsedMessage, part.children);
	    };
	    I18nHtmlParser.prototype._recurseIntoI18nPart = function (p) {
	        // we found an element without an i18n attribute
	        // we need to recurse in cause its children may have i18n set
	        // we also need to translate its attributes
	        if (lang_1.isPresent(p.rootElement)) {
	            var root = p.rootElement;
	            var children = this._recurse(p.children);
	            var attrs = this._i18nAttributes(root);
	            return [new html_ast_1.HtmlElementAst(root.name, attrs, children, root.sourceSpan, root.startSourceSpan, root.endSourceSpan)];
	        }
	        else if (lang_1.isPresent(p.rootTextNode)) {
	            return [p.rootTextNode];
	        }
	        else {
	            return this._recurse(p.children);
	        }
	    };
	    I18nHtmlParser.prototype._recurse = function (nodes) {
	        var _this = this;
	        var parts = shared_1.partition(nodes, this.errors, this._implicitTags);
	        return collection_1.ListWrapper.flatten(parts.map(function (p) { return _this._processI18nPart(p); }));
	    };
	    I18nHtmlParser.prototype._mergeTrees = function (p, translated, original) {
	        var l = new _CreateNodeMapping();
	        html_ast_1.htmlVisitAll(l, original);
	        // merge the translated tree with the original tree.
	        // we do it by preserving the source code position of the original tree
	        var merged = this._mergeTreesHelper(translated, l.mapping);
	        // if the root element is present, we need to create a new root element with its attributes
	        // translated
	        if (lang_1.isPresent(p.rootElement)) {
	            var root = p.rootElement;
	            var attrs = this._i18nAttributes(root);
	            return [new html_ast_1.HtmlElementAst(root.name, attrs, merged, root.sourceSpan, root.startSourceSpan, root.endSourceSpan)];
	        }
	        else if (lang_1.isPresent(p.rootTextNode)) {
	            throw new exceptions_1.BaseException('should not be reached');
	        }
	        else {
	            return merged;
	        }
	    };
	    I18nHtmlParser.prototype._mergeTreesHelper = function (translated, mapping) {
	        var _this = this;
	        return translated.map(function (t) {
	            if (t instanceof html_ast_1.HtmlElementAst) {
	                return _this._mergeElementOrInterpolation(t, translated, mapping);
	            }
	            else if (t instanceof html_ast_1.HtmlTextAst) {
	                return t;
	            }
	            else {
	                throw new exceptions_1.BaseException('should not be reached');
	            }
	        });
	    };
	    I18nHtmlParser.prototype._mergeElementOrInterpolation = function (t, translated, mapping) {
	        var name = this._getName(t);
	        var type = name[0];
	        var index = lang_1.NumberWrapper.parseInt(name.substring(1), 10);
	        var originalNode = mapping[index];
	        if (type == 't') {
	            return this._mergeTextInterpolation(t, originalNode);
	        }
	        else if (type == 'e') {
	            return this._mergeElement(t, originalNode, mapping);
	        }
	        else {
	            throw new exceptions_1.BaseException('should not be reached');
	        }
	    };
	    I18nHtmlParser.prototype._getName = function (t) {
	        if (t.name != _PLACEHOLDER_ELEMENT) {
	            throw new shared_1.I18nError(t.sourceSpan, "Unexpected tag \"" + t.name + "\". Only \"" + _PLACEHOLDER_ELEMENT + "\" tags are allowed.");
	        }
	        var names = t.attrs.filter(function (a) { return a.name == _NAME_ATTR; });
	        if (names.length == 0) {
	            throw new shared_1.I18nError(t.sourceSpan, "Missing \"" + _NAME_ATTR + "\" attribute.");
	        }
	        return names[0].value;
	    };
	    I18nHtmlParser.prototype._mergeTextInterpolation = function (t, originalNode) {
	        var split = this._parser.splitInterpolation(originalNode.value, originalNode.sourceSpan.toString(), this._interpolationConfig);
	        var exps = lang_1.isPresent(split) ? split.expressions : [];
	        var messageSubstring = this._messagesContent.substring(t.startSourceSpan.end.offset, t.endSourceSpan.start.offset);
	        var translated = this._replacePlaceholdersWithExpressions(messageSubstring, exps, originalNode.sourceSpan);
	        return new html_ast_1.HtmlTextAst(translated, originalNode.sourceSpan);
	    };
	    I18nHtmlParser.prototype._mergeElement = function (t, originalNode, mapping) {
	        var children = this._mergeTreesHelper(t.children, mapping);
	        return new html_ast_1.HtmlElementAst(originalNode.name, this._i18nAttributes(originalNode), children, originalNode.sourceSpan, originalNode.startSourceSpan, originalNode.endSourceSpan);
	    };
	    I18nHtmlParser.prototype._i18nAttributes = function (el) {
	        var _this = this;
	        var res = [];
	        var implicitAttrs = lang_1.isPresent(this._implicitAttrs[el.name]) ? this._implicitAttrs[el.name] : [];
	        el.attrs.forEach(function (attr) {
	            if (attr.name.startsWith(shared_1.I18N_ATTR_PREFIX) || attr.name == shared_1.I18N_ATTR)
	                return;
	            var message;
	            var i18ns = el.attrs.filter(function (a) { return a.name == "" + shared_1.I18N_ATTR_PREFIX + attr.name; });
	            if (i18ns.length == 0) {
	                if (implicitAttrs.indexOf(attr.name) == -1) {
	                    res.push(attr);
	                    return;
	                }
	                message = shared_1.messageFromAttribute(_this._parser, _this._interpolationConfig, attr);
	            }
	            else {
	                message = shared_1.messageFromI18nAttribute(_this._parser, _this._interpolationConfig, el, i18ns[0]);
	            }
	            var messageId = message_1.id(message);
	            if (collection_1.StringMapWrapper.contains(_this._messages, messageId)) {
	                var updatedMessage = _this._replaceInterpolationInAttr(attr, _this._messages[messageId]);
	                res.push(new html_ast_1.HtmlAttrAst(attr.name, updatedMessage, attr.sourceSpan));
	            }
	            else {
	                throw new shared_1.I18nError(attr.sourceSpan, "Cannot find message for id '" + messageId + "', content '" + message.content + "'.");
	            }
	        });
	        return res;
	    };
	    I18nHtmlParser.prototype._replaceInterpolationInAttr = function (attr, msg) {
	        var split = this._parser.splitInterpolation(attr.value, attr.sourceSpan.toString(), this._interpolationConfig);
	        var exps = lang_1.isPresent(split) ? split.expressions : [];
	        var first = msg[0];
	        var last = msg[msg.length - 1];
	        var start = first.sourceSpan.start.offset;
	        var end = last instanceof html_ast_1.HtmlElementAst ? last.endSourceSpan.end.offset : last.sourceSpan.end.offset;
	        var messageSubstring = this._messagesContent.substring(start, end);
	        return this._replacePlaceholdersWithExpressions(messageSubstring, exps, attr.sourceSpan);
	    };
	    ;
	    I18nHtmlParser.prototype._replacePlaceholdersWithExpressions = function (message, exps, sourceSpan) {
	        var _this = this;
	        var expMap = this._buildExprMap(exps);
	        return lang_1.RegExpWrapper.replaceAll(_PLACEHOLDER_EXPANDED_REGEXP, message, function (match) {
	            var nameWithQuotes = match[2];
	            var name = nameWithQuotes.substring(1, nameWithQuotes.length - 1);
	            return _this._convertIntoExpression(name, expMap, sourceSpan);
	        });
	    };
	    I18nHtmlParser.prototype._buildExprMap = function (exps) {
	        var expMap = new Map();
	        var usedNames = new Map();
	        for (var i = 0; i < exps.length; i++) {
	            var phName = shared_1.getPhNameFromBinding(exps[i], i);
	            expMap.set(shared_1.dedupePhName(usedNames, phName), exps[i]);
	        }
	        return expMap;
	    };
	    I18nHtmlParser.prototype._convertIntoExpression = function (name, expMap, sourceSpan) {
	        if (expMap.has(name)) {
	            return "" + this._interpolationConfig.start + expMap.get(name) + this._interpolationConfig.end;
	        }
	        else {
	            throw new shared_1.I18nError(sourceSpan, "Invalid interpolation name '" + name + "'");
	        }
	    };
	    return I18nHtmlParser;
	}());
	exports.I18nHtmlParser = I18nHtmlParser;
	var _CreateNodeMapping = (function () {
	    function _CreateNodeMapping() {
	        this.mapping = [];
	    }
	    _CreateNodeMapping.prototype.visitElement = function (ast, context) {
	        this.mapping.push(ast);
	        html_ast_1.htmlVisitAll(this, ast.children);
	        return null;
	    };
	    _CreateNodeMapping.prototype.visitAttr = function (ast, context) { return null; };
	    _CreateNodeMapping.prototype.visitText = function (ast, context) {
	        this.mapping.push(ast);
	        return null;
	    };
	    _CreateNodeMapping.prototype.visitExpansion = function (ast, context) { return null; };
	    _CreateNodeMapping.prototype.visitExpansionCase = function (ast, context) { return null; };
	    _CreateNodeMapping.prototype.visitComment = function (ast, context) { return ''; };
	    return _CreateNodeMapping;
	}());
	//# sourceMappingURL=i18n_html_parser.js.map

/***/ }),

/***/ 615:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var exceptions_1 = __webpack_require__(546);
	var html_ast_1 = __webpack_require__(555);
	var shared_1 = __webpack_require__(616);
	// http://cldr.unicode.org/index/cldr-spec/plural-rules
	var PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
	/**
	 * Expands special forms into elements.
	 *
	 * For example,
	 *
	 * ```
	 * { messages.length, plural,
	 *   =0 {zero}
	 *   =1 {one}
	 *   other {more than one}
	 * }
	 * ```
	 *
	 * will be expanded into
	 *
	 * ```
	 * <ng-container [ngPlural]="messages.length">
	 *   <template ngPluralCase="=0">zero</ng-container>
	 *   <template ngPluralCase="=1">one</ng-container>
	 *   <template ngPluralCase="other">more than one</ng-container>
	 * </ng-container>
	 * ```
	 */
	function expandNodes(nodes) {
	    var expander = new _Expander();
	    return new ExpansionResult(html_ast_1.htmlVisitAll(expander, nodes), expander.isExpanded, expander.errors);
	}
	exports.expandNodes = expandNodes;
	var ExpansionResult = (function () {
	    function ExpansionResult(nodes, expanded, errors) {
	        this.nodes = nodes;
	        this.expanded = expanded;
	        this.errors = errors;
	    }
	    return ExpansionResult;
	}());
	exports.ExpansionResult = ExpansionResult;
	/**
	 * Expand expansion forms (plural, select) to directives
	 *
	 * @internal
	 */
	var _Expander = (function () {
	    function _Expander() {
	        this.isExpanded = false;
	        this.errors = [];
	    }
	    _Expander.prototype.visitElement = function (ast, context) {
	        return new html_ast_1.HtmlElementAst(ast.name, ast.attrs, html_ast_1.htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
	    };
	    _Expander.prototype.visitAttr = function (ast, context) { return ast; };
	    _Expander.prototype.visitText = function (ast, context) { return ast; };
	    _Expander.prototype.visitComment = function (ast, context) { return ast; };
	    _Expander.prototype.visitExpansion = function (ast, context) {
	        this.isExpanded = true;
	        return ast.type == 'plural' ? _expandPluralForm(ast, this.errors) :
	            _expandDefaultForm(ast, this.errors);
	    };
	    _Expander.prototype.visitExpansionCase = function (ast, context) {
	        throw new exceptions_1.BaseException('Should not be reached');
	    };
	    return _Expander;
	}());
	function _expandPluralForm(ast, errors) {
	    var children = ast.cases.map(function (c) {
	        if (PLURAL_CASES.indexOf(c.value) == -1 && !c.value.match(/^=\d+$/)) {
	            errors.push(new shared_1.I18nError(c.valueSourceSpan, "Plural cases should be \"=<number>\" or one of " + PLURAL_CASES.join(", ")));
	        }
	        var expansionResult = expandNodes(c.expression);
	        errors.push.apply(errors, expansionResult.errors);
	        return new html_ast_1.HtmlElementAst("template", [new html_ast_1.HtmlAttrAst('ngPluralCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
	    });
	    var switchAttr = new html_ast_1.HtmlAttrAst('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan);
	    return new html_ast_1.HtmlElementAst('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
	}
	function _expandDefaultForm(ast, errors) {
	    var children = ast.cases.map(function (c) {
	        var expansionResult = expandNodes(c.expression);
	        errors.push.apply(errors, expansionResult.errors);
	        return new html_ast_1.HtmlElementAst("template", [new html_ast_1.HtmlAttrAst('ngSwitchCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
	    });
	    var switchAttr = new html_ast_1.HtmlAttrAst('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan);
	    return new html_ast_1.HtmlElementAst('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
	}
	//# sourceMappingURL=expander.js.map

/***/ }),

/***/ 616:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var lang_1 = __webpack_require__(542);
	var html_ast_1 = __webpack_require__(555);
	var parse_util_1 = __webpack_require__(558);
	var message_1 = __webpack_require__(617);
	exports.I18N_ATTR = 'i18n';
	exports.I18N_ATTR_PREFIX = 'i18n-';
	var CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
	/**
	 * An i18n error.
	 */
	var I18nError = (function (_super) {
	    __extends(I18nError, _super);
	    function I18nError(span, msg) {
	        _super.call(this, span, msg);
	    }
	    return I18nError;
	}(parse_util_1.ParseError));
	exports.I18nError = I18nError;
	function partition(nodes, errors, implicitTags) {
	    var parts = [];
	    for (var i = 0; i < nodes.length; ++i) {
	        var node = nodes[i];
	        var msgNodes = [];
	        // Nodes between `<!-- i18n -->` and `<!-- /i18n -->`
	        if (_isOpeningComment(node)) {
	            var i18n = node.value.replace(/^i18n:?/, '').trim();
	            while (++i < nodes.length && !_isClosingComment(nodes[i])) {
	                msgNodes.push(nodes[i]);
	            }
	            if (i === nodes.length) {
	                errors.push(new I18nError(node.sourceSpan, 'Missing closing \'i18n\' comment.'));
	                break;
	            }
	            parts.push(new Part(null, null, msgNodes, i18n, true));
	        }
	        else if (node instanceof html_ast_1.HtmlElementAst) {
	            // Node with an `i18n` attribute
	            var i18n = _findI18nAttr(node);
	            var hasI18n = lang_1.isPresent(i18n) || implicitTags.indexOf(node.name) > -1;
	            parts.push(new Part(node, null, node.children, lang_1.isPresent(i18n) ? i18n.value : null, hasI18n));
	        }
	        else if (node instanceof html_ast_1.HtmlTextAst) {
	            parts.push(new Part(null, node, null, null, false));
	        }
	    }
	    return parts;
	}
	exports.partition = partition;
	var Part = (function () {
	    function Part(rootElement, rootTextNode, children, i18n, hasI18n) {
	        this.rootElement = rootElement;
	        this.rootTextNode = rootTextNode;
	        this.children = children;
	        this.i18n = i18n;
	        this.hasI18n = hasI18n;
	    }
	    Object.defineProperty(Part.prototype, "sourceSpan", {
	        get: function () {
	            if (lang_1.isPresent(this.rootElement)) {
	                return this.rootElement.sourceSpan;
	            }
	            if (lang_1.isPresent(this.rootTextNode)) {
	                return this.rootTextNode.sourceSpan;
	            }
	            return this.children[0].sourceSpan;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Part.prototype.createMessage = function (parser, interpolationConfig) {
	        return new message_1.Message(stringifyNodes(this.children, parser, interpolationConfig), meaning(this.i18n), description(this.i18n));
	    };
	    return Part;
	}());
	exports.Part = Part;
	function _isOpeningComment(n) {
	    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value.startsWith('i18n');
	}
	function _isClosingComment(n) {
	    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value === '/i18n';
	}
	function _findI18nAttr(p) {
	    var attrs = p.attrs;
	    for (var i = 0; i < attrs.length; i++) {
	        if (attrs[i].name === exports.I18N_ATTR) {
	            return attrs[i];
	        }
	    }
	    return null;
	}
	function meaning(i18n) {
	    if (lang_1.isBlank(i18n) || i18n == '')
	        return null;
	    return i18n.split('|')[0];
	}
	exports.meaning = meaning;
	function description(i18n) {
	    if (lang_1.isBlank(i18n) || i18n == '')
	        return null;
	    var parts = i18n.split('|', 2);
	    return parts.length > 1 ? parts[1] : null;
	}
	exports.description = description;
	/**
	 * Extract a translation string given an `i18n-` prefixed attribute.
	 *
	 * @internal
	 */
	function messageFromI18nAttribute(parser, interpolationConfig, p, i18nAttr) {
	    var expectedName = i18nAttr.name.substring(5);
	    var attr = p.attrs.find(function (a) { return a.name == expectedName; });
	    if (attr) {
	        return messageFromAttribute(parser, interpolationConfig, attr, meaning(i18nAttr.value), description(i18nAttr.value));
	    }
	    throw new I18nError(p.sourceSpan, "Missing attribute '" + expectedName + "'.");
	}
	exports.messageFromI18nAttribute = messageFromI18nAttribute;
	function messageFromAttribute(parser, interpolationConfig, attr, meaning, description) {
	    if (meaning === void 0) { meaning = null; }
	    if (description === void 0) { description = null; }
	    var value = removeInterpolation(attr.value, attr.sourceSpan, parser, interpolationConfig);
	    return new message_1.Message(value, meaning, description);
	}
	exports.messageFromAttribute = messageFromAttribute;
	function removeInterpolation(value, source, parser, interpolationConfig) {
	    try {
	        var parsed = parser.splitInterpolation(value, source.toString(), interpolationConfig);
	        var usedNames = new Map();
	        if (lang_1.isPresent(parsed)) {
	            var res = '';
	            for (var i = 0; i < parsed.strings.length; ++i) {
	                res += parsed.strings[i];
	                if (i != parsed.strings.length - 1) {
	                    var customPhName = getPhNameFromBinding(parsed.expressions[i], i);
	                    customPhName = dedupePhName(usedNames, customPhName);
	                    res += "<ph name=\"" + customPhName + "\"/>";
	                }
	            }
	            return res;
	        }
	        else {
	            return value;
	        }
	    }
	    catch (e) {
	        return value;
	    }
	}
	exports.removeInterpolation = removeInterpolation;
	function getPhNameFromBinding(input, index) {
	    var customPhMatch = lang_1.StringWrapper.split(input, CUSTOM_PH_EXP);
	    return customPhMatch.length > 1 ? customPhMatch[1] : "" + index;
	}
	exports.getPhNameFromBinding = getPhNameFromBinding;
	function dedupePhName(usedNames, name) {
	    var duplicateNameCount = usedNames.get(name);
	    if (lang_1.isPresent(duplicateNameCount)) {
	        usedNames.set(name, duplicateNameCount + 1);
	        return name + "_" + duplicateNameCount;
	    }
	    else {
	        usedNames.set(name, 1);
	        return name;
	    }
	}
	exports.dedupePhName = dedupePhName;
	function stringifyNodes(nodes, parser, interpolationConfig) {
	    var visitor = new _StringifyVisitor(parser, interpolationConfig);
	    return html_ast_1.htmlVisitAll(visitor, nodes).join('');
	}
	exports.stringifyNodes = stringifyNodes;
	var _StringifyVisitor = (function () {
	    function _StringifyVisitor(_parser, _interpolationConfig) {
	        this._parser = _parser;
	        this._interpolationConfig = _interpolationConfig;
	        this._index = 0;
	    }
	    _StringifyVisitor.prototype.visitElement = function (ast, context) {
	        var name = this._index++;
	        var children = this._join(html_ast_1.htmlVisitAll(this, ast.children), '');
	        return "<ph name=\"e" + name + "\">" + children + "</ph>";
	    };
	    _StringifyVisitor.prototype.visitAttr = function (ast, context) { return null; };
	    _StringifyVisitor.prototype.visitText = function (ast, context) {
	        var index = this._index++;
	        var noInterpolation = removeInterpolation(ast.value, ast.sourceSpan, this._parser, this._interpolationConfig);
	        if (noInterpolation != ast.value) {
	            return "<ph name=\"t" + index + "\">" + noInterpolation + "</ph>";
	        }
	        return ast.value;
	    };
	    _StringifyVisitor.prototype.visitComment = function (ast, context) { return ''; };
	    _StringifyVisitor.prototype.visitExpansion = function (ast, context) { return null; };
	    _StringifyVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
	    _StringifyVisitor.prototype._join = function (strs, str) {
	        return strs.filter(function (s) { return s.length > 0; }).join(str);
	    };
	    return _StringifyVisitor;
	}());
	//# sourceMappingURL=shared.js.map

/***/ }),

/***/ 617:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(542);
	/**
	 * A message extracted from a template.
	 *
	 * The identity of a message is comprised of `content` and `meaning`.
	 *
	 * `description` is additional information provided to the translator.
	 */
	var Message = (function () {
	    function Message(content, meaning, description) {
	        if (description === void 0) { description = null; }
	        this.content = content;
	        this.meaning = meaning;
	        this.description = description;
	    }
	    return Message;
	}());
	exports.Message = Message;
	/**
	 * Computes the id of a message
	 */
	function id(m) {
	    var meaning = lang_1.isPresent(m.meaning) ? m.meaning : '';
	    var content = lang_1.isPresent(m.content) ? m.content : '';
	    return lang_1.escape("$ng|" + meaning + "|" + content);
	}
	exports.id = id;
	//# sourceMappingURL=message.js.map

/***/ }),

/***/ 618:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var collection_1 = __webpack_require__(545);
	var lang_1 = __webpack_require__(542);
	var html_ast_1 = __webpack_require__(555);
	var interpolation_config_1 = __webpack_require__(552);
	var message_1 = __webpack_require__(617);
	var shared_1 = __webpack_require__(616);
	/**
	 * All messages extracted from a template.
	 */
	var ExtractionResult = (function () {
	    function ExtractionResult(messages, errors) {
	        this.messages = messages;
	        this.errors = errors;
	    }
	    return ExtractionResult;
	}());
	exports.ExtractionResult = ExtractionResult;
	/**
	 * Removes duplicate messages.
	 */
	function removeDuplicates(messages) {
	    var uniq = {};
	    messages.forEach(function (m) {
	        if (!collection_1.StringMapWrapper.contains(uniq, message_1.id(m))) {
	            uniq[message_1.id(m)] = m;
	        }
	    });
	    return collection_1.StringMapWrapper.values(uniq);
	}
	exports.removeDuplicates = removeDuplicates;
	/**
	 * Extracts all messages from a template.
	 *
	 * Algorithm:
	 *
	 * To understand the algorithm, you need to know how partitioning works.
	 * Partitioning is required as we can use two i18n comments to group node siblings together.
	 * That is why we cannot just use nodes.
	 *
	 * Partitioning transforms an array of HtmlAst into an array of Part.
	 * A part can optionally contain a root element or a root text node. And it can also contain
	 * children.
	 * A part can contain i18n property, in which case it needs to be extracted.
	 *
	 * Example:
	 *
	 * The following array of nodes will be split into four parts:
	 *
	 * ```
	 * <a>A</a>
	 * <b i18n>B</b>
	 * <!-- i18n -->
	 * <c>C</c>
	 * D
	 * <!-- /i18n -->
	 * E
	 * ```
	 *
	 * Part 1 containing the a tag. It should not be translated.
	 * Part 2 containing the b tag. It should be translated.
	 * Part 3 containing the c tag and the D text node. It should be translated.
	 * Part 4 containing the E text node. It should not be translated..
	 *
	 * It is also important to understand how we stringify nodes to create a message.
	 *
	 * We walk the tree and replace every element node with a placeholder. We also replace
	 * all expressions in interpolation with placeholders. We also insert a placeholder element
	 * to wrap a text node containing interpolation.
	 *
	 * Example:
	 *
	 * The following tree:
	 *
	 * ```
	 * <a>A{{I}}</a><b>B</b>
	 * ```
	 *
	 * will be stringified into:
	 * ```
	 * <ph name="e0"><ph name="t1">A<ph name="0"/></ph></ph><ph name="e2">B</ph>
	 * ```
	 *
	 * This is what the algorithm does:
	 *
	 * 1. Use the provided html parser to get the html AST of the template.
	 * 2. Partition the root nodes, and process each part separately.
	 * 3. If a part does not have the i18n attribute, recurse to process children and attributes.
	 * 4. If a part has the i18n attribute, stringify the nodes to create a Message.
	 */
	var MessageExtractor = (function () {
	    function MessageExtractor(_htmlParser, _parser, _implicitTags, _implicitAttrs) {
	        this._htmlParser = _htmlParser;
	        this._parser = _parser;
	        this._implicitTags = _implicitTags;
	        this._implicitAttrs = _implicitAttrs;
	    }
	    MessageExtractor.prototype.extract = function (template, sourceUrl, interpolationConfig) {
	        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
	        this._messages = [];
	        this._errors = [];
	        var res = this._htmlParser.parse(template, sourceUrl, true);
	        if (res.errors.length == 0) {
	            this._recurse(res.rootNodes, interpolationConfig);
	        }
	        return new ExtractionResult(this._messages, this._errors.concat(res.errors));
	    };
	    MessageExtractor.prototype._extractMessagesFromPart = function (part, interpolationConfig) {
	        if (part.hasI18n) {
	            this._messages.push(part.createMessage(this._parser, interpolationConfig));
	            this._recurseToExtractMessagesFromAttributes(part.children, interpolationConfig);
	        }
	        else {
	            this._recurse(part.children, interpolationConfig);
	        }
	        if (lang_1.isPresent(part.rootElement)) {
	            this._extractMessagesFromAttributes(part.rootElement, interpolationConfig);
	        }
	    };
	    MessageExtractor.prototype._recurse = function (nodes, interpolationConfig) {
	        var _this = this;
	        if (lang_1.isPresent(nodes)) {
	            var parts = shared_1.partition(nodes, this._errors, this._implicitTags);
	            parts.forEach(function (part) { return _this._extractMessagesFromPart(part, interpolationConfig); });
	        }
	    };
	    MessageExtractor.prototype._recurseToExtractMessagesFromAttributes = function (nodes, interpolationConfig) {
	        var _this = this;
	        nodes.forEach(function (n) {
	            if (n instanceof html_ast_1.HtmlElementAst) {
	                _this._extractMessagesFromAttributes(n, interpolationConfig);
	                _this._recurseToExtractMessagesFromAttributes(n.children, interpolationConfig);
	            }
	        });
	    };
	    MessageExtractor.prototype._extractMessagesFromAttributes = function (p, interpolationConfig) {
	        var _this = this;
	        var transAttrs = lang_1.isPresent(this._implicitAttrs[p.name]) ? this._implicitAttrs[p.name] : [];
	        var explicitAttrs = [];
	        // `i18n-` prefixed attributes should be translated
	        p.attrs.filter(function (attr) { return attr.name.startsWith(shared_1.I18N_ATTR_PREFIX); }).forEach(function (attr) {
	            try {
	                explicitAttrs.push(attr.name.substring(shared_1.I18N_ATTR_PREFIX.length));
	                _this._messages.push(shared_1.messageFromI18nAttribute(_this._parser, interpolationConfig, p, attr));
	            }
	            catch (e) {
	                if (e instanceof shared_1.I18nError) {
	                    _this._errors.push(e);
	                }
	                else {
	                    throw e;
	                }
	            }
	        });
	        // implicit attributes should also be translated
	        p.attrs.filter(function (attr) { return !attr.name.startsWith(shared_1.I18N_ATTR_PREFIX); })
	            .filter(function (attr) { return explicitAttrs.indexOf(attr.name) == -1; })
	            .filter(function (attr) { return transAttrs.indexOf(attr.name) > -1; })
	            .forEach(function (attr) {
	            return _this._messages.push(shared_1.messageFromAttribute(_this._parser, interpolationConfig, attr));
	        });
	    };
	    return MessageExtractor;
	}());
	exports.MessageExtractor = MessageExtractor;
	//# sourceMappingURL=message_extractor.js.map

/***/ }),

/***/ 619:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var lang_1 = __webpack_require__(542);
	var html_ast_1 = __webpack_require__(555);
	var html_parser_1 = __webpack_require__(554);
	var parse_util_1 = __webpack_require__(558);
	var message_1 = __webpack_require__(617);
	var _PLACEHOLDER_REGEXP = lang_1.RegExpWrapper.create("\\<ph(\\s)+name=(\"(\\w)+\")\\/\\>");
	var _ID_ATTR = 'id';
	var _MSG_ELEMENT = 'msg';
	var _BUNDLE_ELEMENT = 'message-bundle';
	function serializeXmb(messages) {
	    var ms = messages.map(function (m) { return _serializeMessage(m); }).join('');
	    return "<message-bundle>" + ms + "</message-bundle>";
	}
	exports.serializeXmb = serializeXmb;
	var XmbDeserializationResult = (function () {
	    function XmbDeserializationResult(content, messages, errors) {
	        this.content = content;
	        this.messages = messages;
	        this.errors = errors;
	    }
	    return XmbDeserializationResult;
	}());
	exports.XmbDeserializationResult = XmbDeserializationResult;
	var XmbDeserializationError = (function (_super) {
	    __extends(XmbDeserializationError, _super);
	    function XmbDeserializationError(span, msg) {
	        _super.call(this, span, msg);
	    }
	    return XmbDeserializationError;
	}(parse_util_1.ParseError));
	exports.XmbDeserializationError = XmbDeserializationError;
	function deserializeXmb(content, url) {
	    var parser = new html_parser_1.HtmlParser();
	    var normalizedContent = _expandPlaceholder(content.trim());
	    var parsed = parser.parse(normalizedContent, url);
	    if (parsed.errors.length > 0) {
	        return new XmbDeserializationResult(null, {}, parsed.errors);
	    }
	    if (_checkRootElement(parsed.rootNodes)) {
	        return new XmbDeserializationResult(null, {}, [new XmbDeserializationError(null, "Missing element \"" + _BUNDLE_ELEMENT + "\"")]);
	    }
	    var bundleEl = parsed.rootNodes[0]; // test this
	    var errors = [];
	    var messages = {};
	    _createMessages(bundleEl.children, messages, errors);
	    return (errors.length == 0) ?
	        new XmbDeserializationResult(normalizedContent, messages, []) :
	        new XmbDeserializationResult(null, {}, errors);
	}
	exports.deserializeXmb = deserializeXmb;
	function _checkRootElement(nodes) {
	    return nodes.length < 1 || !(nodes[0] instanceof html_ast_1.HtmlElementAst) ||
	        nodes[0].name != _BUNDLE_ELEMENT;
	}
	function _createMessages(nodes, messages, errors) {
	    nodes.forEach(function (item) {
	        if (item instanceof html_ast_1.HtmlElementAst) {
	            var msg = item;
	            if (msg.name != _MSG_ELEMENT) {
	                errors.push(new XmbDeserializationError(item.sourceSpan, "Unexpected element \"" + msg.name + "\""));
	                return;
	            }
	            var id_1 = _id(msg);
	            if (lang_1.isBlank(id_1)) {
	                errors.push(new XmbDeserializationError(item.sourceSpan, "\"" + _ID_ATTR + "\" attribute is missing"));
	                return;
	            }
	            messages[id_1] = msg.children;
	        }
	    });
	}
	function _id(el) {
	    var ids = el.attrs.filter(function (a) { return a.name == _ID_ATTR; });
	    return ids.length > 0 ? ids[0].value : null;
	}
	function _serializeMessage(m) {
	    var desc = lang_1.isPresent(m.description) ? " desc='" + _escapeXml(m.description) + "'" : '';
	    var meaning = lang_1.isPresent(m.meaning) ? " meaning='" + _escapeXml(m.meaning) + "'" : '';
	    return "<msg id='" + message_1.id(m) + "'" + desc + meaning + ">" + m.content + "</msg>";
	}
	function _expandPlaceholder(input) {
	    return lang_1.RegExpWrapper.replaceAll(_PLACEHOLDER_REGEXP, input, function (match) {
	        var nameWithQuotes = match[2];
	        return "<ph name=" + nameWithQuotes + "></ph>";
	    });
	}
	var _XML_ESCAPED_CHARS = [
	    [/&/g, '&amp;'],
	    [/"/g, '&quot;'],
	    [/'/g, '&apos;'],
	    [/</g, '&lt;'],
	    [/>/g, '&gt;'],
	];
	function _escapeXml(value) {
	    return _XML_ESCAPED_CHARS.reduce(function (value, escape) { return value.replace(escape[0], escape[1]); }, value);
	}
	//# sourceMappingURL=xmb_serializer.js.map

/***/ }),

/***/ 620:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var exceptions_1 = __webpack_require__(546);
	var lang_1 = __webpack_require__(542);
	// asset:<package-name>/<realm>/<path-to-module>
	var _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/g;
	/**
	 * Interface that defines how import statements should be generated.
	 */
	var ImportGenerator = (function () {
	    function ImportGenerator() {
	    }
	    ImportGenerator.parseAssetUrl = function (url) { return AssetUrl.parse(url); };
	    return ImportGenerator;
	}());
	exports.ImportGenerator = ImportGenerator;
	var AssetUrl = (function () {
	    function AssetUrl(packageName, firstLevelDir, modulePath) {
	        this.packageName = packageName;
	        this.firstLevelDir = firstLevelDir;
	        this.modulePath = modulePath;
	    }
	    AssetUrl.parse = function (url, allowNonMatching) {
	        if (allowNonMatching === void 0) { allowNonMatching = true; }
	        var match = lang_1.RegExpWrapper.firstMatch(_ASSET_URL_RE, url);
	        if (lang_1.isPresent(match)) {
	            return new AssetUrl(match[1], match[2], match[3]);
	        }
	        if (allowNonMatching) {
	            return null;
	        }
	        throw new exceptions_1.BaseException("Url " + url + " is not a valid asset: url");
	    };
	    return AssetUrl;
	}());
	exports.AssetUrl = AssetUrl;
	//# sourceMappingURL=path_util.js.map

/***/ }),

/***/ 621:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var core_1 = __webpack_require__(284);
	exports.ReflectionCapabilities = core_1.__core_private__.ReflectionCapabilities;
	exports.reflector = core_1.__core_private__.reflector;
	//# sourceMappingURL=core_private.js.map

/***/ }),

/***/ 622:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Subject_1 = __webpack_require__(2);
	var PromiseObservable_1 = __webpack_require__(54);
	var toPromise_1 = __webpack_require__(260);
	var lang_1 = __webpack_require__(623);
	var Observable_1 = __webpack_require__(3);
	exports.Observable = Observable_1.Observable;
	var Subject_2 = __webpack_require__(2);
	exports.Subject = Subject_2.Subject;
	var promise_1 = __webpack_require__(624);
	exports.PromiseCompleter = promise_1.PromiseCompleter;
	exports.PromiseWrapper = promise_1.PromiseWrapper;
	var TimerWrapper = (function () {
	    function TimerWrapper() {
	    }
	    TimerWrapper.setTimeout = function (fn, millis) {
	        return lang_1.global.setTimeout(fn, millis);
	    };
	    TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
	    TimerWrapper.setInterval = function (fn, millis) {
	        return lang_1.global.setInterval(fn, millis);
	    };
	    TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
	    return TimerWrapper;
	}());
	exports.TimerWrapper = TimerWrapper;
	var ObservableWrapper = (function () {
	    function ObservableWrapper() {
	    }
	    // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
	    ObservableWrapper.subscribe = function (emitter, onNext, onError, onComplete) {
	        if (onComplete === void 0) { onComplete = function () { }; }
	        onError = (typeof onError === 'function') && onError || lang_1.noop;
	        onComplete = (typeof onComplete === 'function') && onComplete || lang_1.noop;
	        return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
	    };
	    ObservableWrapper.isObservable = function (obs) { return !!obs.subscribe; };
	    /**
	     * Returns whether `obs` has any subscribers listening to events.
	     */
	    ObservableWrapper.hasSubscribers = function (obs) { return obs.observers.length > 0; };
	    ObservableWrapper.dispose = function (subscription) { subscription.unsubscribe(); };
	    /**
	     * @deprecated - use callEmit() instead
	     */
	    ObservableWrapper.callNext = function (emitter, value) { emitter.emit(value); };
	    ObservableWrapper.callEmit = function (emitter, value) { emitter.emit(value); };
	    ObservableWrapper.callError = function (emitter, error) { emitter.error(error); };
	    ObservableWrapper.callComplete = function (emitter) { emitter.complete(); };
	    ObservableWrapper.fromPromise = function (promise) {
	        return PromiseObservable_1.PromiseObservable.create(promise);
	    };
	    ObservableWrapper.toPromise = function (obj) { return toPromise_1.toPromise.call(obj); };
	    return ObservableWrapper;
	}());
	exports.ObservableWrapper = ObservableWrapper;
	/**
	 * Use by directives and components to emit custom Events.
	 *
	 * ### Examples
	 *
	 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
	 * title gets clicked:
	 *
	 * ```
	 * @Component({
	 *   selector: 'zippy',
	 *   template: `
	 *   <div class="zippy">
	 *     <div (click)="toggle()">Toggle</div>
	 *     <div [hidden]="!visible">
	 *       <ng-content></ng-content>
	 *     </div>
	 *  </div>`})
	 * export class Zippy {
	 *   visible: boolean = true;
	 *   @Output() open: EventEmitter<any> = new EventEmitter();
	 *   @Output() close: EventEmitter<any> = new EventEmitter();
	 *
	 *   toggle() {
	 *     this.visible = !this.visible;
	 *     if (this.visible) {
	 *       this.open.emit(null);
	 *     } else {
	 *       this.close.emit(null);
	 *     }
	 *   }
	 * }
	 * ```
	 *
	 * The events payload can be accessed by the parameter `$event` on the components output event
	 * handler:
	 *
	 * ```
	 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
	 * ```
	 *
	 * Uses Rx.Observable but provides an adapter to make it work as specified here:
	 * https://github.com/jhusain/observable-spec
	 *
	 * Once a reference implementation of the spec is available, switch to it.
	 * @stable
	 */
	var EventEmitter = (function (_super) {
	    __extends(EventEmitter, _super);
	    /**
	     * Creates an instance of [EventEmitter], which depending on [isAsync],
	     * delivers events synchronously or asynchronously.
	     */
	    function EventEmitter(isAsync) {
	        if (isAsync === void 0) { isAsync = false; }
	        _super.call(this);
	        this.__isAsync = isAsync;
	    }
	    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
	    /**
	     * @deprecated - use .emit(value) instead
	     */
	    EventEmitter.prototype.next = function (value) { _super.prototype.next.call(this, value); };
	    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
	        var schedulerFn;
	        var errorFn = function (err) { return null; };
	        var completeFn = function () { return null; };
	        if (generatorOrNext && typeof generatorOrNext === 'object') {
	            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                setTimeout(function () { return generatorOrNext.next(value); });
	            } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
	            if (generatorOrNext.error) {
	                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
	                    function (err) { generatorOrNext.error(err); };
	            }
	            if (generatorOrNext.complete) {
	                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
	                    function () { generatorOrNext.complete(); };
	            }
	        }
	        else {
	            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
	                setTimeout(function () { return generatorOrNext(value); });
	            } : function (value /** TODO #9100 */) { generatorOrNext(value); };
	            if (error) {
	                errorFn =
	                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
	            }
	            if (complete) {
	                completeFn =
	                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
	            }
	        }
	        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
	    };
	    return EventEmitter;
	}(Subject_1.Subject));
	exports.EventEmitter = EventEmitter;
	//# sourceMappingURL=async.js.map

/***/ }),

/***/ 623:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var globalScope;
	if (typeof window === 'undefined') {
	    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
	        // TODO: Replace any with WorkerGlobalScope from lib.webworker.d.ts #3492
	        globalScope = self;
	    }
	    else {
	        globalScope = global;
	    }
	}
	else {
	    globalScope = window;
	}
	function scheduleMicroTask(fn) {
	    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
	}
	exports.scheduleMicroTask = scheduleMicroTask;
	exports.IS_DART = false;
	// Need to declare a new variable for global here since TypeScript
	// exports the original value of the symbol.
	var _global = globalScope;
	exports.global = _global;
	/**
	 * Runtime representation a type that a Component or other object is instances of.
	 *
	 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is be represented by
	 * the `MyCustomComponent` constructor function.
	 *
	 * @stable
	 */
	exports.Type = Function;
	function getTypeNameForDebugging(type) {
	    if (type['name']) {
	        return type['name'];
	    }
	    return typeof type;
	}
	exports.getTypeNameForDebugging = getTypeNameForDebugging;
	exports.Math = _global.Math;
	exports.Date = _global.Date;
	// TODO: remove calls to assert in production environment
	// Note: Can't just export this and import in in other files
	// as `assert` is a reserved keyword in Dart
	_global.assert = function assert(condition) {
	    // TODO: to be fixed properly via #2830, noop for now
	};
	function isPresent(obj) {
	    return obj !== undefined && obj !== null;
	}
	exports.isPresent = isPresent;
	function isBlank(obj) {
	    return obj === undefined || obj === null;
	}
	exports.isBlank = isBlank;
	function isBoolean(obj) {
	    return typeof obj === 'boolean';
	}
	exports.isBoolean = isBoolean;
	function isNumber(obj) {
	    return typeof obj === 'number';
	}
	exports.isNumber = isNumber;
	function isString(obj) {
	    return typeof obj === 'string';
	}
	exports.isString = isString;
	function isFunction(obj) {
	    return typeof obj === 'function';
	}
	exports.isFunction = isFunction;
	function isType(obj) {
	    return isFunction(obj);
	}
	exports.isType = isType;
	function isStringMap(obj) {
	    return typeof obj === 'object' && obj !== null;
	}
	exports.isStringMap = isStringMap;
	var STRING_MAP_PROTO = Object.getPrototypeOf({});
	function isStrictStringMap(obj) {
	    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
	}
	exports.isStrictStringMap = isStrictStringMap;
	function isPromise(obj) {
	    return obj instanceof _global.Promise;
	}
	exports.isPromise = isPromise;
	function isArray(obj) {
	    return Array.isArray(obj);
	}
	exports.isArray = isArray;
	function isDate(obj) {
	    return obj instanceof exports.Date && !isNaN(obj.valueOf());
	}
	exports.isDate = isDate;
	function noop() { }
	exports.noop = noop;
	function stringify(token) {
	    if (typeof token === 'string') {
	        return token;
	    }
	    if (token === undefined || token === null) {
	        return '' + token;
	    }
	    if (token.name) {
	        return token.name;
	    }
	    if (token.overriddenName) {
	        return token.overriddenName;
	    }
	    var res = token.toString();
	    var newLineIndex = res.indexOf('\n');
	    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
	}
	exports.stringify = stringify;
	// serialize / deserialize enum exist only for consistency with dart API
	// enums in typescript don't need to be serialized
	function serializeEnum(val) {
	    return val;
	}
	exports.serializeEnum = serializeEnum;
	function deserializeEnum(val, values) {
	    return val;
	}
	exports.deserializeEnum = deserializeEnum;
	function resolveEnumToken(enumValue, val) {
	    return enumValue[val];
	}
	exports.resolveEnumToken = resolveEnumToken;
	var StringWrapper = (function () {
	    function StringWrapper() {
	    }
	    StringWrapper.fromCharCode = function (code) { return String.fromCharCode(code); };
	    StringWrapper.charCodeAt = function (s, index) { return s.charCodeAt(index); };
	    StringWrapper.split = function (s, regExp) { return s.split(regExp); };
	    StringWrapper.equals = function (s, s2) { return s === s2; };
	    StringWrapper.stripLeft = function (s, charVal) {
	        if (s && s.length) {
	            var pos = 0;
	            for (var i = 0; i < s.length; i++) {
	                if (s[i] != charVal)
	                    break;
	                pos++;
	            }
	            s = s.substring(pos);
	        }
	        return s;
	    };
	    StringWrapper.stripRight = function (s, charVal) {
	        if (s && s.length) {
	            var pos = s.length;
	            for (var i = s.length - 1; i >= 0; i--) {
	                if (s[i] != charVal)
	                    break;
	                pos--;
	            }
	            s = s.substring(0, pos);
	        }
	        return s;
	    };
	    StringWrapper.replace = function (s, from, replace) {
	        return s.replace(from, replace);
	    };
	    StringWrapper.replaceAll = function (s, from, replace) {
	        return s.replace(from, replace);
	    };
	    StringWrapper.slice = function (s, from, to) {
	        if (from === void 0) { from = 0; }
	        if (to === void 0) { to = null; }
	        return s.slice(from, to === null ? undefined : to);
	    };
	    StringWrapper.replaceAllMapped = function (s, from, cb) {
	        return s.replace(from, function () {
	            var matches = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                matches[_i - 0] = arguments[_i];
	            }
	            // Remove offset & string from the result array
	            matches.splice(-2, 2);
	            // The callback receives match, p1, ..., pn
	            return cb(matches);
	        });
	    };
	    StringWrapper.contains = function (s, substr) { return s.indexOf(substr) != -1; };
	    StringWrapper.compare = function (a, b) {
	        if (a < b) {
	            return -1;
	        }
	        else if (a > b) {
	            return 1;
	        }
	        else {
	            return 0;
	        }
	    };
	    return StringWrapper;
	}());
	exports.StringWrapper = StringWrapper;
	var StringJoiner = (function () {
	    function StringJoiner(parts) {
	        if (parts === void 0) { parts = []; }
	        this.parts = parts;
	    }
	    StringJoiner.prototype.add = function (part) { this.parts.push(part); };
	    StringJoiner.prototype.toString = function () { return this.parts.join(''); };
	    return StringJoiner;
	}());
	exports.StringJoiner = StringJoiner;
	var NumberParseError = (function (_super) {
	    __extends(NumberParseError, _super);
	    function NumberParseError(message) {
	        _super.call(this);
	        this.message = message;
	    }
	    NumberParseError.prototype.toString = function () { return this.message; };
	    return NumberParseError;
	}(Error));
	exports.NumberParseError = NumberParseError;
	var NumberWrapper = (function () {
	    function NumberWrapper() {
	    }
	    NumberWrapper.toFixed = function (n, fractionDigits) { return n.toFixed(fractionDigits); };
	    NumberWrapper.equal = function (a, b) { return a === b; };
	    NumberWrapper.parseIntAutoRadix = function (text) {
	        var result = parseInt(text);
	        if (isNaN(result)) {
	            throw new NumberParseError('Invalid integer literal when parsing ' + text);
	        }
	        return result;
	    };
	    NumberWrapper.parseInt = function (text, radix) {
	        if (radix == 10) {
	            if (/^(\-|\+)?[0-9]+$/.test(text)) {
	                return parseInt(text, radix);
	            }
	        }
	        else if (radix == 16) {
	            if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
	                return parseInt(text, radix);
	            }
	        }
	        else {
	            var result = parseInt(text, radix);
	            if (!isNaN(result)) {
	                return result;
	            }
	        }
	        throw new NumberParseError('Invalid integer literal when parsing ' + text + ' in base ' + radix);
	    };
	    // TODO: NaN is a valid literal but is returned by parseFloat to indicate an error.
	    NumberWrapper.parseFloat = function (text) { return parseFloat(text); };
	    Object.defineProperty(NumberWrapper, "NaN", {
	        get: function () { return NaN; },
	        enumerable: true,
	        configurable: true
	    });
	    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
	    NumberWrapper.isNaN = function (value) { return isNaN(value); };
	    NumberWrapper.isInteger = function (value) { return Number.isInteger(value); };
	    return NumberWrapper;
	}());
	exports.NumberWrapper = NumberWrapper;
	exports.RegExp = _global.RegExp;
	var RegExpWrapper = (function () {
	    function RegExpWrapper() {
	    }
	    RegExpWrapper.create = function (regExpStr, flags) {
	        if (flags === void 0) { flags = ''; }
	        flags = flags.replace(/g/g, '');
	        return new _global.RegExp(regExpStr, flags + 'g');
	    };
	    RegExpWrapper.firstMatch = function (regExp, input) {
	        // Reset multimatch regex state
	        regExp.lastIndex = 0;
	        return regExp.exec(input);
	    };
	    RegExpWrapper.test = function (regExp, input) {
	        regExp.lastIndex = 0;
	        return regExp.test(input);
	    };
	    RegExpWrapper.matcher = function (regExp, input) {
	        // Reset regex state for the case
	        // someone did not loop over all matches
	        // last time.
	        regExp.lastIndex = 0;
	        return { re: regExp, input: input };
	    };
	    RegExpWrapper.replaceAll = function (regExp, input, replace) {
	        var c = regExp.exec(input);
	        var res = '';
	        regExp.lastIndex = 0;
	        var prev = 0;
	        while (c) {
	            res += input.substring(prev, c.index);
	            res += replace(c);
	            prev = c.index + c[0].length;
	            regExp.lastIndex = prev;
	            c = regExp.exec(input);
	        }
	        res += input.substring(prev);
	        return res;
	    };
	    return RegExpWrapper;
	}());
	exports.RegExpWrapper = RegExpWrapper;
	var RegExpMatcherWrapper = (function () {
	    function RegExpMatcherWrapper() {
	    }
	    RegExpMatcherWrapper.next = function (matcher) {
	        return matcher.re.exec(matcher.input);
	    };
	    return RegExpMatcherWrapper;
	}());
	exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
	var FunctionWrapper = (function () {
	    function FunctionWrapper() {
	    }
	    FunctionWrapper.apply = function (fn, posArgs) { return fn.apply(null, posArgs); };
	    FunctionWrapper.bind = function (fn, scope) { return fn.bind(scope); };
	    return FunctionWrapper;
	}());
	exports.FunctionWrapper = FunctionWrapper;
	// JS has NaN !== NaN
	function looseIdentical(a, b) {
	    return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
	}
	exports.looseIdentical = looseIdentical;
	// JS considers NaN is the same as NaN for map Key (while NaN !== NaN otherwise)
	// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
	function getMapKey(value) {
	    return value;
	}
	exports.getMapKey = getMapKey;
	function normalizeBlank(obj) {
	    return isBlank(obj) ? null : obj;
	}
	exports.normalizeBlank = normalizeBlank;
	function normalizeBool(obj) {
	    return isBlank(obj) ? false : obj;
	}
	exports.normalizeBool = normalizeBool;
	function isJsObject(o) {
	    return o !== null && (typeof o === 'function' || typeof o === 'object');
	}
	exports.isJsObject = isJsObject;
	function print(obj) {
	    console.log(obj);
	}
	exports.print = print;
	function warn(obj) {
	    console.warn(obj);
	}
	exports.warn = warn;
	// Can't be all uppercase as our transpiler would think it is a special directive...
	var Json = (function () {
	    function Json() {
	    }
	    Json.parse = function (s) { return _global.JSON.parse(s); };
	    Json.stringify = function (data) {
	        // Dart doesn't take 3 arguments
	        return _global.JSON.stringify(data, null, 2);
	    };
	    return Json;
	}());
	exports.Json = Json;
	var DateWrapper = (function () {
	    function DateWrapper() {
	    }
	    DateWrapper.create = function (year, month, day, hour, minutes, seconds, milliseconds) {
	        if (month === void 0) { month = 1; }
	        if (day === void 0) { day = 1; }
	        if (hour === void 0) { hour = 0; }
	        if (minutes === void 0) { minutes = 0; }
	        if (seconds === void 0) { seconds = 0; }
	        if (milliseconds === void 0) { milliseconds = 0; }
	        return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
	    };
	    DateWrapper.fromISOString = function (str) { return new exports.Date(str); };
	    DateWrapper.fromMillis = function (ms) { return new exports.Date(ms); };
	    DateWrapper.toMillis = function (date) { return date.getTime(); };
	    DateWrapper.now = function () { return new exports.Date(); };
	    DateWrapper.toJson = function (date) { return date.toJSON(); };
	    return DateWrapper;
	}());
	exports.DateWrapper = DateWrapper;
	function setValueOnPath(global, path, value) {
	    var parts = path.split('.');
	    var obj = global;
	    while (parts.length > 1) {
	        var name = parts.shift();
	        if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
	            obj = obj[name];
	        }
	        else {
	            obj = obj[name] = {};
	        }
	    }
	    if (obj === undefined || obj === null) {
	        obj = {};
	    }
	    obj[parts.shift()] = value;
	}
	exports.setValueOnPath = setValueOnPath;
	var _symbolIterator = null;
	function getSymbolIterator() {
	    if (isBlank(_symbolIterator)) {
	        if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
	            _symbolIterator = Symbol.iterator;
	        }
	        else {
	            // es6-shim specific logic
	            var keys = Object.getOwnPropertyNames(Map.prototype);
	            for (var i = 0; i < keys.length; ++i) {
	                var key = keys[i];
	                if (key !== 'entries' && key !== 'size' &&
	                    Map.prototype[key] === Map.prototype['entries']) {
	                    _symbolIterator = key;
	                }
	            }
	        }
	    }
	    return _symbolIterator;
	}
	exports.getSymbolIterator = getSymbolIterator;
	function evalExpression(sourceUrl, expr, declarations, vars) {
	    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
	    var fnArgNames = [];
	    var fnArgValues = [];
	    for (var argName in vars) {
	        fnArgNames.push(argName);
	        fnArgValues.push(vars[argName]);
	    }
	    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
	}
	exports.evalExpression = evalExpression;
	function isPrimitive(obj) {
	    return !isJsObject(obj);
	}
	exports.isPrimitive = isPrimitive;
	function hasConstructor(value, type) {
	    return value.constructor === type;
	}
	exports.hasConstructor = hasConstructor;
	function escape(s) {
	    return _global.encodeURI(s);
	}
	exports.escape = escape;
	function escapeRegExp(s) {
	    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}
	exports.escapeRegExp = escapeRegExp;
	//# sourceMappingURL=lang.js.map

/***/ }),

/***/ 624:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var PromiseCompleter = (function () {
	    function PromiseCompleter() {
	        var _this = this;
	        this.promise = new Promise(function (res, rej) {
	            _this.resolve = res;
	            _this.reject = rej;
	        });
	    }
	    return PromiseCompleter;
	}());
	exports.PromiseCompleter = PromiseCompleter;
	var PromiseWrapper = (function () {
	    function PromiseWrapper() {
	    }
	    PromiseWrapper.resolve = function (obj) { return Promise.resolve(obj); };
	    PromiseWrapper.reject = function (obj, _) { return Promise.reject(obj); };
	    // Note: We can't rename this method into `catch`, as this is not a valid
	    // method name in Dart.
	    PromiseWrapper.catchError = function (promise, onError) {
	        return promise.catch(onError);
	    };
	    PromiseWrapper.all = function (promises) {
	        if (promises.length == 0)
	            return Promise.resolve([]);
	        return Promise.all(promises);
	    };
	    PromiseWrapper.then = function (promise, success, rejection) {
	        return promise.then(success, rejection);
	    };
	    PromiseWrapper.wrap = function (computation) {
	        return new Promise(function (res, rej) {
	            try {
	                res(computation());
	            }
	            catch (e) {
	                rej(e);
	            }
	        });
	    };
	    PromiseWrapper.scheduleMicrotask = function (computation) {
	        PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function (_) { });
	    };
	    PromiseWrapper.completer = function () { return new PromiseCompleter(); };
	    return PromiseWrapper;
	}());
	exports.PromiseWrapper = PromiseWrapper;
	//# sourceMappingURL=promise.js.map

/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var compiler_1 = __webpack_require__(538);
	var exceptions_1 = __webpack_require__(626);
	var lang_1 = __webpack_require__(623);
	var promise_1 = __webpack_require__(624);
	/**
	 * An implementation of XHR that uses a template cache to avoid doing an actual
	 * XHR.
	 *
	 * The template cache needs to be built and loaded into window.$templateCache
	 * via a separate mechanism.
	 */
	var CachedXHR = (function (_super) {
	    __extends(CachedXHR, _super);
	    function CachedXHR() {
	        _super.call(this);
	        this._cache = lang_1.global.$templateCache;
	        if (this._cache == null) {
	            throw new exceptions_1.BaseException('CachedXHR: Template cache was not found in $templateCache.');
	        }
	    }
	    CachedXHR.prototype.get = function (url) {
	        if (this._cache.hasOwnProperty(url)) {
	            return promise_1.PromiseWrapper.resolve(this._cache[url]);
	        }
	        else {
	            return promise_1.PromiseWrapper.reject('CachedXHR: Did not find cached template for ' + url, null);
	        }
	    };
	    return CachedXHR;
	}(compiler_1.XHR));
	exports.CachedXHR = CachedXHR;
	//# sourceMappingURL=xhr_cache.js.map

/***/ }),

/***/ 626:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var base_wrapped_exception_1 = __webpack_require__(627);
	var exception_handler_1 = __webpack_require__(628);
	var exception_handler_2 = __webpack_require__(628);
	exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
	/**
	 * @stable
	 */
	var BaseException = (function (_super) {
	    __extends(BaseException, _super);
	    function BaseException(message) {
	        if (message === void 0) { message = '--'; }
	        _super.call(this, message);
	        this.message = message;
	        this.stack = (new Error(message)).stack;
	    }
	    BaseException.prototype.toString = function () { return this.message; };
	    return BaseException;
	}(Error));
	exports.BaseException = BaseException;
	/**
	 * Wraps an exception and provides additional context or information.
	 * @stable
	 */
	var WrappedException = (function (_super) {
	    __extends(WrappedException, _super);
	    function WrappedException(_wrapperMessage, _originalException /** TODO #9100 */, _originalStack /** TODO #9100 */, _context /** TODO #9100 */) {
	        _super.call(this, _wrapperMessage);
	        this._wrapperMessage = _wrapperMessage;
	        this._originalException = _originalException;
	        this._originalStack = _originalStack;
	        this._context = _context;
	        this._wrapperStack = (new Error(_wrapperMessage)).stack;
	    }
	    Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
	        get: function () { return this._wrapperMessage; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "wrapperStack", {
	        get: function () { return this._wrapperStack; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "originalException", {
	        get: function () { return this._originalException; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "originalStack", {
	        get: function () { return this._originalStack; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "context", {
	        get: function () { return this._context; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(WrappedException.prototype, "message", {
	        get: function () { return exception_handler_1.ExceptionHandler.exceptionToString(this); },
	        enumerable: true,
	        configurable: true
	    });
	    WrappedException.prototype.toString = function () { return this.message; };
	    return WrappedException;
	}(base_wrapped_exception_1.BaseWrappedException));
	exports.WrappedException = WrappedException;
	function makeTypeError(message) {
	    return new TypeError(message);
	}
	exports.makeTypeError = makeTypeError;
	function unimplemented() {
	    throw new BaseException('unimplemented');
	}
	exports.unimplemented = unimplemented;
	//# sourceMappingURL=exceptions.js.map

/***/ }),

/***/ 627:
/***/ (function(module, exports) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * A base class for the WrappedException that can be used to identify
	 * a WrappedException from ExceptionHandler without adding circular
	 * dependency.
	 */
	var BaseWrappedException = (function (_super) {
	    __extends(BaseWrappedException, _super);
	    function BaseWrappedException(message) {
	        _super.call(this, message);
	    }
	    Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
	        get: function () { return ''; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "originalException", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "context", {
	        get: function () { return null; },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(BaseWrappedException.prototype, "message", {
	        get: function () { return ''; },
	        enumerable: true,
	        configurable: true
	    });
	    return BaseWrappedException;
	}(Error));
	exports.BaseWrappedException = BaseWrappedException;
	//# sourceMappingURL=base_wrapped_exception.js.map

/***/ }),

/***/ 628:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var base_wrapped_exception_1 = __webpack_require__(627);
	var collection_1 = __webpack_require__(629);
	var lang_1 = __webpack_require__(623);
	var _ArrayLogger = (function () {
	    function _ArrayLogger() {
	        this.res = [];
	    }
	    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
	    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
	    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
	    _ArrayLogger.prototype.logGroupEnd = function () { };
	    ;
	    return _ArrayLogger;
	}());
	/**
	 * Provides a hook for centralized exception handling.
	 *
	 * The default implementation of `ExceptionHandler` prints error messages to the `Console`. To
	 * intercept error handling,
	 * write a custom exception handler that replaces this default as appropriate for your app.
	 *
	 * ### Example
	 *
	 * ```javascript
	 *
	 * class MyExceptionHandler implements ExceptionHandler {
	 *   call(error, stackTrace = null, reason = null) {
	 *     // do something with the exception
	 *   }
	 * }
	 *
	 * bootstrap(MyApp, {provide: ExceptionHandler, useClass: MyExceptionHandler}])
	 *
	 * ```
	 * @stable
	 */
	var ExceptionHandler = (function () {
	    function ExceptionHandler(_logger, _rethrowException) {
	        if (_rethrowException === void 0) { _rethrowException = true; }
	        this._logger = _logger;
	        this._rethrowException = _rethrowException;
	    }
	    ExceptionHandler.exceptionToString = function (exception, stackTrace, reason) {
	        if (stackTrace === void 0) { stackTrace = null; }
	        if (reason === void 0) { reason = null; }
	        var l = new _ArrayLogger();
	        var e = new ExceptionHandler(l, false);
	        e.call(exception, stackTrace, reason);
	        return l.res.join('\n');
	    };
	    ExceptionHandler.prototype.call = function (exception, stackTrace, reason) {
	        if (stackTrace === void 0) { stackTrace = null; }
	        if (reason === void 0) { reason = null; }
	        var originalException = this._findOriginalException(exception);
	        var originalStack = this._findOriginalStack(exception);
	        var context = this._findContext(exception);
	        this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
	        if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
	            this._logger.logError('STACKTRACE:');
	            this._logger.logError(this._longStackTrace(stackTrace));
	        }
	        if (lang_1.isPresent(reason)) {
	            this._logger.logError("REASON: " + reason);
	        }
	        if (lang_1.isPresent(originalException)) {
	            this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
	        }
	        if (lang_1.isPresent(originalStack)) {
	            this._logger.logError('ORIGINAL STACKTRACE:');
	            this._logger.logError(this._longStackTrace(originalStack));
	        }
	        if (lang_1.isPresent(context)) {
	            this._logger.logError('ERROR CONTEXT:');
	            this._logger.logError(context);
	        }
	        this._logger.logGroupEnd();
	        // We rethrow exceptions, so operations like 'bootstrap' will result in an error
	        // when an exception happens. If we do not rethrow, bootstrap will always succeed.
	        if (this._rethrowException)
	            throw exception;
	    };
	    /** @internal */
	    ExceptionHandler.prototype._extractMessage = function (exception) {
	        return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage :
	            exception.toString();
	    };
	    /** @internal */
	    ExceptionHandler.prototype._longStackTrace = function (stackTrace) {
	        return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join('\n\n-----async gap-----\n') :
	            stackTrace.toString();
	    };
	    /** @internal */
	    ExceptionHandler.prototype._findContext = function (exception) {
	        try {
	            if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
	                return null;
	            return lang_1.isPresent(exception.context) ? exception.context :
	                this._findContext(exception.originalException);
	        }
	        catch (e) {
	            // exception.context can throw an exception. if it happens, we ignore the context.
	            return null;
	        }
	    };
	    /** @internal */
	    ExceptionHandler.prototype._findOriginalException = function (exception) {
	        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
	            return null;
	        var e = exception.originalException;
	        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
	            e = e.originalException;
	        }
	        return e;
	    };
	    /** @internal */
	    ExceptionHandler.prototype._findOriginalStack = function (exception) {
	        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
	            return null;
	        var e = exception;
	        var stack = exception.originalStack;
	        while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
	            e = e.originalException;
	            if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
	                stack = e.originalStack;
	            }
	        }
	        return stack;
	    };
	    return ExceptionHandler;
	}());
	exports.ExceptionHandler = ExceptionHandler;
	//# sourceMappingURL=exception_handler.js.map

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var lang_1 = __webpack_require__(623);
	exports.Map = lang_1.global.Map;
	exports.Set = lang_1.global.Set;
	// Safari and Internet Explorer do not support the iterable parameter to the
	// Map constructor.  We work around that by manually adding the items.
	var createMapFromPairs = (function () {
	    try {
	        if (new exports.Map([[1, 2]]).size === 1) {
	            return function createMapFromPairs(pairs) { return new exports.Map(pairs); };
	        }
	    }
	    catch (e) {
	    }
	    return function createMapAndPopulateFromPairs(pairs) {
	        var map = new exports.Map();
	        for (var i = 0; i < pairs.length; i++) {
	            var pair = pairs[i];
	            map.set(pair[0], pair[1]);
	        }
	        return map;
	    };
	})();
	var createMapFromMap = (function () {
	    try {
	        if (new exports.Map(new exports.Map())) {
	            return function createMapFromMap(m) { return new exports.Map(m); };
	        }
	    }
	    catch (e) {
	    }
	    return function createMapAndPopulateFromMap(m) {
	        var map = new exports.Map();
	        m.forEach(function (v, k) { map.set(k, v); });
	        return map;
	    };
	})();
	var _clearValues = (function () {
	    if ((new exports.Map()).keys().next) {
	        return function _clearValues(m) {
	            var keyIterator = m.keys();
	            var k;
	            while (!((k = keyIterator.next()).done)) {
	                m.set(k.value, null);
	            }
	        };
	    }
	    else {
	        return function _clearValuesWithForeEach(m) {
	            m.forEach(function (v, k) { m.set(k, null); });
	        };
	    }
	})();
	// Safari doesn't implement MapIterator.next(), which is used is Traceur's polyfill of Array.from
	// TODO(mlaval): remove the work around once we have a working polyfill of Array.from
	var _arrayFromMap = (function () {
	    try {
	        if ((new exports.Map()).values().next) {
	            return function createArrayFromMap(m, getValues) {
	                return getValues ? Array.from(m.values()) : Array.from(m.keys());
	            };
	        }
	    }
	    catch (e) {
	    }
	    return function createArrayFromMapWithForeach(m, getValues) {
	        var res = ListWrapper.createFixedSize(m.size), i = 0;
	        m.forEach(function (v, k) {
	            res[i] = getValues ? v : k;
	            i++;
	        });
	        return res;
	    };
	})();
	var MapWrapper = (function () {
	    function MapWrapper() {
	    }
	    MapWrapper.clone = function (m) { return createMapFromMap(m); };
	    MapWrapper.createFromStringMap = function (stringMap) {
	        var result = new exports.Map();
	        for (var prop in stringMap) {
	            result.set(prop, stringMap[prop]);
	        }
	        return result;
	    };
	    MapWrapper.toStringMap = function (m) {
	        var r = {};
	        m.forEach(function (v, k) { return r[k] = v; });
	        return r;
	    };
	    MapWrapper.createFromPairs = function (pairs) { return createMapFromPairs(pairs); };
	    MapWrapper.clearValues = function (m) { _clearValues(m); };
	    MapWrapper.iterable = function (m) { return m; };
	    MapWrapper.keys = function (m) { return _arrayFromMap(m, false); };
	    MapWrapper.values = function (m) { return _arrayFromMap(m, true); };
	    return MapWrapper;
	}());
	exports.MapWrapper = MapWrapper;
	/**
	 * Wraps Javascript Objects
	 */
	var StringMapWrapper = (function () {
	    function StringMapWrapper() {
	    }
	    StringMapWrapper.create = function () {
	        // Note: We are not using Object.create(null) here due to
	        // performance!
	        // http://jsperf.com/ng2-object-create-null
	        return {};
	    };
	    StringMapWrapper.contains = function (map, key) {
	        return map.hasOwnProperty(key);
	    };
	    StringMapWrapper.get = function (map, key) {
	        return map.hasOwnProperty(key) ? map[key] : undefined;
	    };
	    StringMapWrapper.set = function (map, key, value) { map[key] = value; };
	    StringMapWrapper.keys = function (map) { return Object.keys(map); };
	    StringMapWrapper.values = function (map) {
	        return Object.keys(map).reduce(function (r, a) {
	            r.push(map[a]);
	            return r;
	        }, []);
	    };
	    StringMapWrapper.isEmpty = function (map) {
	        for (var prop in map) {
	            return false;
	        }
	        return true;
	    };
	    StringMapWrapper.delete = function (map, key) { delete map[key]; };
	    StringMapWrapper.forEach = function (map, callback) {
	        for (var prop in map) {
	            if (map.hasOwnProperty(prop)) {
	                callback(map[prop], prop);
	            }
	        }
	    };
	    StringMapWrapper.merge = function (m1, m2) {
	        var m = {};
	        for (var attr in m1) {
	            if (m1.hasOwnProperty(attr)) {
	                m[attr] = m1[attr];
	            }
	        }
	        for (var attr in m2) {
	            if (m2.hasOwnProperty(attr)) {
	                m[attr] = m2[attr];
	            }
	        }
	        return m;
	    };
	    StringMapWrapper.equals = function (m1, m2) {
	        var k1 = Object.keys(m1);
	        var k2 = Object.keys(m2);
	        if (k1.length != k2.length) {
	            return false;
	        }
	        var key;
	        for (var i = 0; i < k1.length; i++) {
	            key = k1[i];
	            if (m1[key] !== m2[key]) {
	                return false;
	            }
	        }
	        return true;
	    };
	    return StringMapWrapper;
	}());
	exports.StringMapWrapper = StringMapWrapper;
	var ListWrapper = (function () {
	    function ListWrapper() {
	    }
	    // JS has no way to express a statically fixed size list, but dart does so we
	    // keep both methods.
	    ListWrapper.createFixedSize = function (size) { return new Array(size); };
	    ListWrapper.createGrowableSize = function (size) { return new Array(size); };
	    ListWrapper.clone = function (array) { return array.slice(0); };
	    ListWrapper.forEachWithIndex = function (array, fn) {
	        for (var i = 0; i < array.length; i++) {
	            fn(array[i], i);
	        }
	    };
	    ListWrapper.first = function (array) {
	        if (!array)
	            return null;
	        return array[0];
	    };
	    ListWrapper.last = function (array) {
	        if (!array || array.length == 0)
	            return null;
	        return array[array.length - 1];
	    };
	    ListWrapper.indexOf = function (array, value, startIndex) {
	        if (startIndex === void 0) { startIndex = 0; }
	        return array.indexOf(value, startIndex);
	    };
	    ListWrapper.contains = function (list, el) { return list.indexOf(el) !== -1; };
	    ListWrapper.reversed = function (array) {
	        var a = ListWrapper.clone(array);
	        return a.reverse();
	    };
	    ListWrapper.concat = function (a, b) { return a.concat(b); };
	    ListWrapper.insert = function (list, index, value) { list.splice(index, 0, value); };
	    ListWrapper.removeAt = function (list, index) {
	        var res = list[index];
	        list.splice(index, 1);
	        return res;
	    };
	    ListWrapper.removeAll = function (list, items) {
	        for (var i = 0; i < items.length; ++i) {
	            var index = list.indexOf(items[i]);
	            list.splice(index, 1);
	        }
	    };
	    ListWrapper.remove = function (list, el) {
	        var index = list.indexOf(el);
	        if (index > -1) {
	            list.splice(index, 1);
	            return true;
	        }
	        return false;
	    };
	    ListWrapper.clear = function (list) { list.length = 0; };
	    ListWrapper.isEmpty = function (list) { return list.length == 0; };
	    ListWrapper.fill = function (list, value, start, end) {
	        if (start === void 0) { start = 0; }
	        if (end === void 0) { end = null; }
	        list.fill(value, start, end === null ? list.length : end);
	    };
	    ListWrapper.equals = function (a, b) {
	        if (a.length != b.length)
	            return false;
	        for (var i = 0; i < a.length; ++i) {
	            if (a[i] !== b[i])
	                return false;
	        }
	        return true;
	    };
	    ListWrapper.slice = function (l, from, to) {
	        if (from === void 0) { from = 0; }
	        if (to === void 0) { to = null; }
	        return l.slice(from, to === null ? undefined : to);
	    };
	    ListWrapper.splice = function (l, from, length) { return l.splice(from, length); };
	    ListWrapper.sort = function (l, compareFn) {
	        if (lang_1.isPresent(compareFn)) {
	            l.sort(compareFn);
	        }
	        else {
	            l.sort();
	        }
	    };
	    ListWrapper.toString = function (l) { return l.toString(); };
	    ListWrapper.toJSON = function (l) { return JSON.stringify(l); };
	    ListWrapper.maximum = function (list, predicate) {
	        if (list.length == 0) {
	            return null;
	        }
	        var solution = null;
	        var maxValue = -Infinity;
	        for (var index = 0; index < list.length; index++) {
	            var candidate = list[index];
	            if (lang_1.isBlank(candidate)) {
	                continue;
	            }
	            var candidateValue = predicate(candidate);
	            if (candidateValue > maxValue) {
	                solution = candidate;
	                maxValue = candidateValue;
	            }
	        }
	        return solution;
	    };
	    ListWrapper.flatten = function (list) {
	        var target = [];
	        _flattenArray(list, target);
	        return target;
	    };
	    ListWrapper.addAll = function (list, source) {
	        for (var i = 0; i < source.length; i++) {
	            list.push(source[i]);
	        }
	    };
	    return ListWrapper;
	}());
	exports.ListWrapper = ListWrapper;
	function _flattenArray(source, target) {
	    if (lang_1.isPresent(source)) {
	        for (var i = 0; i < source.length; i++) {
	            var item = source[i];
	            if (lang_1.isArray(item)) {
	                _flattenArray(item, target);
	            }
	            else {
	                target.push(item);
	            }
	        }
	    }
	    return target;
	}
	function isListLikeIterable(obj) {
	    if (!lang_1.isJsObject(obj))
	        return false;
	    return lang_1.isArray(obj) ||
	        (!(obj instanceof exports.Map) &&
	            lang_1.getSymbolIterator() in obj); // JS Iterable have a Symbol.iterator prop
	}
	exports.isListLikeIterable = isListLikeIterable;
	function areIterablesEqual(a, b, comparator) {
	    var iterator1 = a[lang_1.getSymbolIterator()]();
	    var iterator2 = b[lang_1.getSymbolIterator()]();
	    while (true) {
	        var item1 = iterator1.next();
	        var item2 = iterator2.next();
	        if (item1.done && item2.done)
	            return true;
	        if (item1.done || item2.done)
	            return false;
	        if (!comparator(item1.value, item2.value))
	            return false;
	    }
	}
	exports.areIterablesEqual = areIterablesEqual;
	function iterateListLike(obj, fn) {
	    if (lang_1.isArray(obj)) {
	        for (var i = 0; i < obj.length; i++) {
	            fn(obj[i]);
	        }
	    }
	    else {
	        var iterator = obj[lang_1.getSymbolIterator()]();
	        var item;
	        while (!((item = iterator.next()).done)) {
	            fn(item.value);
	        }
	    }
	}
	exports.iterateListLike = iterateListLike;
	// Safari and Internet Explorer do not support the iterable parameter to the
	// Set constructor.  We work around that by manually adding the items.
	var createSetFromList = (function () {
	    var test = new exports.Set([1, 2, 3]);
	    if (test.size === 3) {
	        return function createSetFromList(lst) { return new exports.Set(lst); };
	    }
	    else {
	        return function createSetAndPopulateFromList(lst) {
	            var res = new exports.Set(lst);
	            if (res.size !== lst.length) {
	                for (var i = 0; i < lst.length; i++) {
	                    res.add(lst[i]);
	                }
	            }
	            return res;
	        };
	    }
	})();
	var SetWrapper = (function () {
	    function SetWrapper() {
	    }
	    SetWrapper.createFromList = function (lst) { return createSetFromList(lst); };
	    SetWrapper.has = function (s, key) { return s.has(key); };
	    SetWrapper.delete = function (m, k) { m.delete(k); };
	    return SetWrapper;
	}());
	exports.SetWrapper = SetWrapper;
	//# sourceMappingURL=collection.js.map

/***/ }),

/***/ 630:
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * @license
	 * Copyright Google Inc. All Rights Reserved.
	 *
	 * Use of this source code is governed by an MIT-style license that can be
	 * found in the LICENSE file at https://angular.io/license
	 */
	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var compiler_1 = __webpack_require__(538);
	var lang_1 = __webpack_require__(623);
	var promise_1 = __webpack_require__(624);
	var XHRImpl = (function (_super) {
	    __extends(XHRImpl, _super);
	    function XHRImpl() {
	        _super.apply(this, arguments);
	    }
	    XHRImpl.prototype.get = function (url) {
	        var completer = promise_1.PromiseWrapper.completer();
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url, true);
	        xhr.responseType = 'text';
	        xhr.onload = function () {
	            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
	            // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
	            var response = lang_1.isPresent(xhr.response) ? xhr.response : xhr.responseText;
	            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
	            var status = xhr.status === 1223 ? 204 : xhr.status;
	            // fix status code when it is 0 (0 status is undocumented).
	            // Occurs when accessing file resources or on Android 4.1 stock browser
	            // while retrieving files from application cache.
	            if (status === 0) {
	                status = response ? 200 : 0;
	            }
	            if (200 <= status && status <= 300) {
	                completer.resolve(response);
	            }
	            else {
	                completer.reject("Failed to load " + url, null);
	            }
	        };
	        xhr.onerror = function () { completer.reject("Failed to load " + url, null); };
	        xhr.send();
	        return completer.promise;
	    };
	    return XHRImpl;
	}(compiler_1.XHR));
	exports.XHRImpl = XHRImpl;
	//# sourceMappingURL=xhr_impl.js.map

/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(284);
	var AppComponent = (function () {
	    function AppComponent() {
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'myapp',
	            templateUrl: 'app.component.html',
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ })

});
//# sourceMappingURL=app.js.map