/**
 * bootstrap-strength-meter.js
 * https://github.com/davidstutz/bootstrap-strength-meter
 *
 * Copyright 2013 David Stutz
 */
!function($) {
    
    "use strict";// jshint ;_;
    
    var StrengthMeter = {
        core: {
            /**
             * Get options for score.
             */
            getScoreOptions: function(settings) {
                var options = [];

                for (var i = 0; i < settings.dictionaries.length; i++) {
                    options[options.length] = {
                        type: 'dictionary',
                        dictionary: settings.dictionaries[i]
                    };

                    options[options.length] = {
                        type: 'leet',
                        dictionary: settings.dictionaries[i]
                    };
                }

                for (var i = 0; i < settings.keyboards.length; i++) {
                    options[options.length] = {
                        type: 'keyboard',
                        dictionary: settings.keyboards[i]
                    };
                }

                options[options.length] = {
                    type: 'repitition'
                };

                options[options.length] = {
                    type: 'sequences'
                };

                options[options.length] = {
                    type: 'dates'
                };

                return options;
            }
        },
        
        progressBar: function(input, options) {
        
            var defaults = {
                container: input.parent(),
                base: 120,
                hierarchy: {
                    '0': 'progress-bar-danger',
                    '40': 'progress-bar-warning',
                    '60': 'progress-bar-success'
                },
                dictionaries: [

                ],
                keyboards: [

                ]
            },

                settings = $.extend({}, defaults, options),

                template = '<div class="progress"><div class="progress-bar" role="progressbar" aria-valuemax="100" aria-valuemin="0" aria-valuenow="0"></div></div>',

                progress,

                progressBar,

                core = {

                    /**
                     * Initialize the plugin.
                     */
                    init: function() {
                        progress = settings.container.append($(template));
                        progressBar = $('.progress-bar', progress);
                        input.on('keyup', core.keyup)
                                .keyup();
                    },

                    /**
                     * Update progress abr accordning 
                     */
                    update: function(value) {
                        var width = Math.floor(value/settings.base*100);

                        if (width > 100) {
                            width = 100;
                        }

                        progressBar
                                .attr('area-valuenow', width)
                                .css('width', width + '%');

                        for (var value in settings.hierarchy) {
                            if (width > value) {
                                progressBar
                                        .removeClass()
                                        .addClass('progress-bar')
                                        .addClass(settings.hierarchy[value]);
                            }
                        }
                    },

                    /**
                     * Binding on keydown for updateing the progrssbar.
                     */
                    keyup: function(event) {
                        var password = $(event.target).val()
                        var value = 0;

                        if (password.length > 0) {
                            var score = new Score(password);
                            value = score.calculateEntropyScore(StrengthMeter.core.getScoreOptions(settings));
                        }

                        core.update(value);
                    },
                };

            core.init();
        },
                
        text: function(input, options) {
        
            var defaults = {
                container: input.parent(),
                hierarchy: {
                    '0': ['text-danger', 'ridiculus'],
                    '10': ['text-danger', 'very weak'],
                    '30': ['text-warning', 'weak'],
                    '50': ['text-warning', 'good'],
                    '70': ['text-success', 'strong'],
                    '100': ['text-success', 'very strong'],
                },
                dictionaries: [

                ],
                keyboards: [

                ]
            },

                settings = $.extend({}, defaults, options),

                core = {

                    /**
                     * Initialize the plugin.
                     */
                    init: function() {
                        input.on('keyup', core.keyup)
                            .keyup();
                    },

                    /**
                     * Update progress abr accordning 
                     */
                    update: function(value) {
                        for (var border in settings.hierarchy) {
                             if (value >= border) {
                                 var text = settings.hierarchy[border][1];
                                 var color = settings.hierarchy[border][0];
                                 
                                 settings.container.text(text)
                                    .removeClass()
                                    .addClass(color);
                             }
                        }
                    },

                    /**
                     * Binding on keydown for updateing the progrssbar.
                     */
                    keyup: function(event) {
                        var password = $(event.target).val()
                        var value = 0;

                        if (password.length > 0) {
                            var score = new Score(password);
                            value = score.calculateEntropyScore(StrengthMeter.core.getScoreOptions(settings));
                        }

                        core.update(value);
                    },
                };

            core.init();
        },
                
        tooltip: function(input, options) {
        
            var defaults = {
                hierarchy: {
                    '0': 'ridiculus',
                    '10': 'very weak',
                    '30': 'weak',
                    '50': 'good',
                    '70': 'string',
                    '100': 'very strong',
                },
                dictionaries: [

                ],
                keyboards: [

                ]
            },

                settings = $.extend({}, defaults, options),

                core = {

                    /**
                     * Initialize the plugin.
                     */
                    init: function() {
                        input.tooltip({
                            title: ''
                        });
                        
                        input.on('keyup', core.keyup)
                            .keyup();
                    },

                    /**
                     * Update progress abr accordning 
                     */
                    update: function(value) {
                        for (var border in settings.hierarchy) {
                             if (value >= border) {
                                 var text = settings.hierarchy[border];
                                 
                                 input.attr('data-original-title', text)
                                        .tooltip('show');
                             }
                        }
                    },

                    /**
                     * Binding on keydown for updateing the progrssbar.
                     */
                    keyup: function(event) {
                        var password = $(event.target).val()
                        var value = 0;

                        if (password.length > 0) {
                            var score = new Score(password);
                            value = score.calculateEntropyScore(StrengthMeter.core.getScoreOptions(settings));
                        }

                        core.update(value);
                    },
                };

            core.init();
        },
    }
    
    $.fn.strengthMeter = function(type, options) {
        if (type === undefined) {
            return;
        }
        
        if (!type in StrengthMeter) {
            return;
        }
        
        var instance = this.data('strengthMeter'),
            elem = this;
        
        return elem.each(function() {
            var strengthMeter;
            
            if (instance) {
                return;
            }
            
            strengthMeter = StrengthMeter[type](elem, options);
            elem.data('strengthMeter', strengthMeter);
        });
    };
    
}(window.jQuery);
