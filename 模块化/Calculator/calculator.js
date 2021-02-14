; (function (doc) {
  var Calculator = function () {
    console.log('decodeURI')
    this.oCalcultor = doc.getElementsByClassName('JS_Calculator')[0];
    this.oFirstValue = this.oCalcultor.getElementsByTagName('input')[0];
    this.oSecondValue = this.oCalcultor.getElementsByTagName('input')[1];
    this.oResult = this.oCalcultor.getElementsByClassName('result')[0]
    this.init()
  }

  Calculator.prototype.init = function () {
    this.bindEvent()
  }

  Calculator.prototype.bindEvent = function () {
    this.oCalcultor.addEventListener('click', this.onBtnClick.bind(this), false)
  }

  Calculator.prototype.onBtnClick = function (ev) {
    var e = ev || window.event,
      tar = e.target || e.srcElement,
      tagName = tar.tagName.toLowerCase();

    if (tagName === 'button') {
      var field = tar.getAttribute('data-field'),
        val1 = Number(this.oFirstValue.value) || 0,
        val2 = Number(this.oSecondValue.value) || 0;
      this.oResult.innerHTML = this.calculate(field, val1, val2)
    }
  }

  Calculator.prototype.calculate = function (field, val1, val2) {
    switch (field) {
      case 'plus':
        return val1 + val2;
      case 'minus':
        return val1 - val2;
      case "mul":
        return val1 * val2;
      case "div":
        return val1 / val2;
    }
  }

  window.Calculator = Calculator
})(document);