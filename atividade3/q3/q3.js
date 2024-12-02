function formatNumber(nuns) {
    var str = '';
    nuns.forEach(function (element) { return str = str + "".concat(element, "-"); });
    console.log(str.slice(0, -1));
}
formatNumber([1, 2, 3, 4]);
