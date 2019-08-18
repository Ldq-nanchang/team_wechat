const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function domH(dom, callback) {
  var query = wx.createSelectorQuery();
  query.select(dom).boundingClientRect(function (rect) {
    if (typeof callback == 'function') {
      callback(rect)
    }
  }).exec();
}
// 时间转换成倒计时
function timeTransform(time) {
  let _time = new Date()
  let time_ = parseInt(_time.valueOf() / 1000) - (new Date(time.replace(/-/g, '/'))).getTime() / 1000;
  let _time_ = '';
  if (time_ <= 15) {
    _time_ = '刚刚';
  } else if (time_ > 15 && time_ < 60) {
    _time_ = time_ + '秒前';
  } else if (time_ >= 60 && time_ < 3600) {
    _time_ = parseInt(time_ / 60) + '分钟前';
  } else if (time_ >= 3600 && time_ < 86400) {
    _time_ = parseInt(time_ / 3600) + '小时前'
  } else if (time_ >= 86400 && time_ < 2592000) {
    _time_ = (parseInt(time_ / 86400) + 1) + '天前'
  } else if (time_ >= 2592000) {
    _time_ = parseInt(time_ / 2592000) + '个月前'
  }

  return _time_;
}

module.exports = {
  formatTime: formatTime,
  domH,
  timeTransform
}
