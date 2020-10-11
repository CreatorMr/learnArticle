String.prototype.formatTime = function formatTime(template) {
  // 1.根据操作的时间字符串获取年月日小时分钟秒等信息
  let arr = this.match(/\d+/g).map(item => {
    return item.length < 2 ? '0' + item : item;
  });

  // 2.解析格式化的模板，找到对应的时间，替换模板中的内容
  template = template || '{0}年{1}月{2}日 {3}时{4}分{5}秒';
  return template.replace(/\{(\d+)\}/g, (_, group) => {
    return arr[group] || "00";
  });
};