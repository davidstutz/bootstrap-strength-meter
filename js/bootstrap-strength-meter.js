/**
 * bootstrap-strength-meter.js
 * https://github.com/davidstutz/bootstrap-strength-meter
 *
 * Copyright 2013 David Stutz
 */
!function($) {
    
    "use strict";// jshint ;_;

    var StrengthMeter = function(input, options) {
        
        var defaults = {
            container: input.parent(),
            base: 100,
            hierarchy: {
                '0': 'progress-bar-danger',
                '50': 'progress-bar-warning',
                '80': 'progress-bar-success'
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
            
            methods = {
                
            },
                    
            core = {
                
                /**
                 * Initialize the plugin.
                 */
                init: function() {
                    input.on('keyup', core.keyup);
                    progress = settings.container.append($(template));
                    progressBar = $('.progress-bar', progress);
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
                        value = score.calculateEntropyScore(core.getScoreOptions());
                    }
                    
                    core.update(value);
                },
                
                /**
                 * Get options for score.
                 */
                getScoreOptions: function() {
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
            };
        
        core.init();
        
        return methods;
    }
    
    $.fn.strengthMeter = function(options) {
        var instance = this.data('strengthMeter'),
            elem = this;
        
        return elem.each(function() {
            var strengthMeter;
            
            if (instance) {
                return;
            }
            
            strengthMeter = new StrengthMeter(elem, options);
            elem.data('strengthMeter', strengthMeter);
        });
    };
    
}(window.jQuery);
