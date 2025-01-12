"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.ProdutoPerecivel = void 0;
var Produto_1 = require("./Produto");
var ProdutoPerecivel = /** @class */ (function (_super) {
    __extends(ProdutoPerecivel, _super);
    function ProdutoPerecivel(id_produto, desc_produto, qtd_produto, val_unitario, dt_validade) {
        var _this = _super.call(this, id_produto, desc_produto, qtd_produto, val_unitario) || this;
        _this.dt_validade = dt_validade;
        return _this;
    }
    ProdutoPerecivel.prototype.isValid = function () {
        return this.dt_validade > new Date();
    };
    ProdutoPerecivel.prototype.repor = function (qtd_produto) {
        if (!this.isValid()) {
            throw new Error("Não é possível repor, o produto está fora da validade.");
        }
        _super.prototype.repor.call(this, qtd_produto);
    };
    ProdutoPerecivel.prototype.darBaixa = function (qtd_produto) {
        if (!this.isValid()) {
            throw new Error("Não é possível dar baixa, o produto está fora da validade.");
        }
        _super.prototype.darBaixa.call(this, qtd_produto);
    };
    return ProdutoPerecivel;
}(Produto_1.Produto));
exports.ProdutoPerecivel = ProdutoPerecivel;
