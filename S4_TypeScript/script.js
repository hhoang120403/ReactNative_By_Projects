var price = 0;
var input = document.getElementById("price-input");
var button = document.getElementById("submit");
button === null || button === void 0 ? void 0 : button.addEventListener("click", function (e) {
    price = +input.value;
    console.log(price.toFixed(2));
});
