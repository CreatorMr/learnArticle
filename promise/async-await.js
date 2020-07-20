function* test() {
  const data = yield getData()
  const data2 = yield getData()
  return 'success'
}
const getData = () => new Promise(resolve => setTimeout(_ => resolve('data'), 1000))
function asyncToGen(genFunction) {
  return function (...args) {
    const gen = genFunction.apply(this, args)
    return new Promise((resolve, reject) => {
      function step(key, args) {
        let genResult;
        try {
          genResult = gen[key](args);
        } catch (err) {
        }
        let { value, done } = genResult;
        if (done) { resolve(value) };
        return Promise.resolve(value).then(val => step('next', val), err => step('throw', err))
      }
      step('next')
    })
  }
}
const gen = asyncToGen(test)
gen().then(res => console.log(res))