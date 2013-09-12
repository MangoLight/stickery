/* ==========================================================
* Stickery 0.1
* http://mangolight.github.com/stickery
* ==========================================================
* Copyright 2013 MangoLight / http://www.mangolight.com
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ========================================================== */
(function($){
    $.fn.stickery = function(options){
        
        var settings = $.extend({
            top: 0,
            animate_stick: "none",
            animate_unstick: null,
            stick_after: null,
            onStick: function () {},
            beforeStick: function () {},
            onUnstick: function () {},
            beforeUnstick: function () {},
            end: null
        }, options);
        
        return this.each(function(){
            var e = $(this);
            $(window).scroll(function(){
                var top = $(window).scrollTop();
                var active_top = 0;
                if(e.hasClass("stickery-done")){
                    active_top = Math.floor(e.attr("data-active-top"));
                }else{
                    if(!settings.stick_after){
                        active_top = e.offset().top-settings.top;
                    }else{
                        if(typeof settings.stick_after=="number"){
                            active_top = settings.stick_after;
                        }else{
                            active_top = settings.stick_after.offset().top+settings.stick_after.height();
                        }
                    }
                }
                if(top>active_top){
                    if(!e.hasClass("stickery-animate")){
                        if(!e.hasClass("stickery-done")){
                            var g = e.clone().addClass("stickery-ghost");
                            g.css({
                                opacity: 0
                            }).insertAfter(e);
                            e.attr("data-original-position",e.css("position")).attr("data-active-top",active_top).addClass("stickery-done").css({
                                position: "fixed",
                                width: e.width(),
                                height: e.height()
                            });
                            settings.beforeStick.call();
                            if(settings.animate_stick=="fade"){
                                e.stop().addClass("stickery-animate").hide().css({
                                    top: settings.top
                                }).fadeIn(function(){
                                    stuck(e,settings.onStick);
                                });
                            }else if(settings.animate_stick=="scroll"){
                                e.stop().addClass("stickery-animate").css({
                                    top: -50
                                }).animate({
                                    top: settings.top
                                },function(){
                                    stuck(e,settings.onStick);
                                });
                            }else if(settings.animate_stick=="slide"){
                                e.stop().addClass("stickery-animate").hide().css({
                                    top: c.top
                                }).slideDown(function(){
                                    stuck(e,settings.onStick);
                                });
                            }else{
                                e.css({
                                    top: settings.top
                                });
                                stuck(e,settings.onStick);
                            }
                        }else{
                            if(settings.end!==null && top + e.height() + settings.top > settings.end) {
                                e.css({
                                    top: settings.end - top - e.height()
                                });
                            } else {
                                e.css({
                                    top: settings.top
                                });
                            }
                        }
                    }
                }else{
                    if(e.hasClass("stickery-done")){
                        settings.beforeUnstick.call();
                        if(!settings.animate_unstick && settings.animate_stick!="none"){
                            settings.animate_unstick = settings.animate_stick;
                        }
                        if(settings.animate_unstick=="fade"){
                            e.stop().addClass("stickery-animate").fadeOut("fast",function(){
                                unstuck(e,settings.onUnstick);
                            });
                        }else if(settings.animate_unstick=="scroll"){
                            e.stop().addClass("stickery-animate").animate({
                                top: -50
                            },"fast",function(){
                                unstuck(e,settings.onUnstick);
                            });
                        }else if(settings.animate_unstick=="slide"){
                            e.stop().addClass("stickery-animate").slideUp("fast",function(){
                                unstuck(e,settings.onUnstick);
                            });
                        }else{
                            unstuck(e,settings.onUnstick);
                        }
                    }
                }
            });
            
            $(window).resize(function(){
                if(e.hasClass("stickery-done")){
                    var g = b.next(".stickery-ghost");
                    e.css({
                        width: g.width(),
                        height: g.height()
                    });
                }
            })
        });

        function stuck(e,callback){
            e.removeClass("stickery-animate");
            callback.call(e);
        }

        function unstuck(e,callback){
            e.next(".stickery-ghost").remove();
            e.css({
                position: e.attr("data-original-position"),
                width: "auto",
                height: "auto"
            }).removeClass("stickery-done stickery-animate").show();
            callback.call(e);
        }
    }
})(jQuery);
