"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Clients = void 0;
var api_1 = require("@vtex/api");
var status_1 = require("./status");
// Extend the default IOClients implementation with our own custom clients.
var Clients = /** @class */ (function (_super) {
    __extends(Clients, _super);
    function Clients() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Clients.prototype, "status", {
        get: function () {
            return this.getOrSet('status', status_1["default"]);
        },
        enumerable: false,
        configurable: true
    });
    return Clients;
}(api_1.IOClients));
exports.Clients = Clients;
