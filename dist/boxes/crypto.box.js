"use strict";
exports.__esModule = true;
var contrib = require("blessed-contrib");
exports.cryptoGraph = contrib.line({
    style: {
        line: "yellow",
        text: "green",
        baseline: "green"
    },
    xLabelPadding: 5,
    xPadding: 5,
    left: '50%',
    top: '50%',
    width: '50%',
    height: '50%',
    label: 'NXT in USD'
});
