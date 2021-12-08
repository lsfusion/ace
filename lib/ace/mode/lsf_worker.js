define(function (require, exports, module) {
    "use strict";

    var oop = require("../lib/oop");
    var Mirror = require("../worker/mirror").Mirror;

    // antlr grammar
    require('./antlr/antlrLsfJSLogics');

    var LSFWorker = exports.LSFWorker = function(sender) {
        Mirror.call(this, sender);
        this.setTimeout(200);
    };

    oop.inherits(LSFWorker, Mirror);

    (function () {
        var lsfWorkerType;
        this.setOptions = function(options) {
            lsfWorkerType = options.lsfWorkerType;
        };

        this.onUpdate = function () {
            var annotations;
            if (lsfWorkerType === 'script') {
                annotations = antlrLSFValidate("MODULE module; " + this.doc.getValue());
            } else if (lsfWorkerType === 'action') {
                let rawAnnotations = antlrLSFValidate("MODULE module; script() { " + this.doc.getValue() + " \n }");
                annotations = rawAnnotations.map((annotation) => {
                    return {
                        column: annotation.column,
                        row: annotation.row - 1,
                        text: annotation.text,
                        type: annotation.type
                    }
                });
            } else if (lsfWorkerType === 'form') {
                annotations = antlrLSFValidate("MODULE module; FORM form " + this.doc.getValue() + " \n ;");
            } else {
                annotations = antlrLSFValidate(this.doc.getValue());
            }

            // var annotations = antlrLSFValidate(value);
            this.sender.emit("annotate", annotations);
        };

    }).call(LSFWorker.prototype);
});
