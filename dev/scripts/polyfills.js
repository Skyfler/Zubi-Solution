"use strict";

module.exports = {
    init: function() {
        // console.log('running runAll');
        for (var key in this) {
            // console.log(key);
            if (/\bpolyfillFor/.test(key)) {
                this[key]();
            }
        }
    },

    polyfillForMatches: function() {
        // console.log('running polyfillForMatches');
        var e = Element.prototype;
        e.matches || (e.matches=e.matchesSelector||function(selector){
                var matches = document.querySelectorAll(selector), th = this;
                return Array.prototype.some.call(matches, function(e){
                    return e === th;
                });
            });
    },

    polyfillForClosest: function() {
        // console.log('running polyfillForClosest');
        var e = Element.prototype;
        e.closest = e.closest || function(css){
                var node = this;

                while (node) {
                    if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            }
    },

    polyfillForCustomEvent: function () {
        // console.log('running polyfillForCustomEvent');
        if ( typeof window.CustomEvent === "function" ) return false;

        function CustomEvent ( event, params ) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent( 'CustomEvent' );
            evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
            return evt;
        }

        CustomEvent.prototype = window.Event.prototype;

        window.CustomEvent = CustomEvent;
    },

    polyfillForInsertAdjacent: function() {
        // console.log('running polyfillForCustomEvent');
        if (typeof HTMLElement != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
            HTMLElement.prototype.insertAdjacentElement = function(where, parsedNode) {
                switch (where) {
                    case 'beforeBegin':
                        this.parentNode.insertBefore(parsedNode, this);
                        break;
                    case 'afterBegin':
                        this.insertBefore(parsedNode, this.firstChild);
                        break;
                    case 'beforeEnd':
                        this.appendChild(parsedNode);
                        break;
                    case 'afterEnd':
                        if (this.nextSibling) this.parentNode.insertBefore(parsedNode, this.nextSibling);
                        else this.parentNode.appendChild(parsedNode);
                        break;
                }
            };

            HTMLElement.prototype.insertAdjacentHTML = function(where, htmlStr) {
                var r = this.ownerDocument.createRange();
                r.setStartBefore(this);
                var parsedHTML = r.createContextualFragment(htmlStr);
                this.insertAdjacentElement(where, parsedHTML)
            };


            HTMLElement.prototype.insertAdjacentText = function(where, txtStr) {
                var parsedText = document.createTextNode(txtStr)
                this.insertAdjacentElement(where, parsedText)
            };
        }
    }
};