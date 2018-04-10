// 定义一个全局的 id 用来销毁
let myIntervalId = 0

// 定义自己的 setInterval 函数
function mySetInterval (func, time) {
  // 定义一个立即执行函数来递归执行 func
  (function temp () {
    myIntervalId = setTimeout(function () {
      func()
      temp()
    }, time)
  })()
}

// 定义自己的 clearInterval 函数
// 其实很简单，用 clearTimeout 清除掉最后一个 setTimeout 即可，当时那个人还说用字典存啥啥的。。。
function myClearInterval (id) {
  clearTimeout(id)
}

// 测试，每隔 1 秒输出一个 1
mySetInterval(function () {
  console.log(1)
}, 1000)

// 测试，5秒后停止执行
// 实际上因为 mySetInterval 是延迟 1 秒后执行的，所以总共执行了 4 次
// 我试了下，延迟 5005ms 之后会执行 5 次
setTimeout(function () {
  myClearInterval(myIntervalId)
}, 5000)


// 下面是网上的答案，我用来找到了思路

// var util = (function(){
//   //定义intervalObj对象，用于保存intervalId映射到真实timeoutId
//   var intervalObj = {}
//   //每调用一次_setInterval就会自增1的一个intervalId
//   var intervalId = 0
//
//   var _setInterval = function(fn, interval){
//     //这里注意要使用局部变量保存intervalId哦，避免next函数内部直接引用intervalId，因为intervalId可能会再次变化
//     var thisIntervalId = ++intervalId
//     function next(){
//       intervalObj[thisIntervalId] = setTimeout(function(){
//         fn()
//         next()
//       }, interval)
//     }
//     next()
//     return thisIntervalId
//   }
//
//   var _clearInterval = function(intervalId){
//     clearTimeout(intervalObj[intervalId])
//   }
//
//   return {setInterval: _setInterval, clearInterval: _clearInterval}
//
// })()
//
// var intervalId = util.setInterval(function(){
//   console.log('a')
// }, 1000)
//
// //10秒之后，清除掉定时器
// setTimeout(function(){
//   //实际清除代码
//   util.clearInterval(intervalId)
// }, 10000)