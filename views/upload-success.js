var STORE_IMG_KEY = 'PICTURE-BED-IMG'
var $store = chrome.storage.sync
var $$imgId = '#img-show'

$store.get([ STORE_IMG_KEY ], function(info) {
  var imgInfo = info[STORE_IMG_KEY]
  var srcUrl = imgInfo.srcUrl
  var img = document.querySelector($$imgId)
  console.log('img: ', img)
  img.setAttribute('src', srcUrl)
  copys.initByURL(srcUrl)
})

var types = {
  img: function(url) { return url },
  html: function(url) { return '<img src="' + url + '">' },
  ubb: function(url) { return '[IMG]' + url + '[/IMG]' },
  markdown: function(url) { return '![undefined](' + url + ')' }
}
var copys = {
  baseId: 'copy',
  types: types,
  inputs: Object.keys(types),
  getCopyString: function(type, url) {
    var func = types[type]
    return func(url ? decodeURIComponent(url) : url)
  },
  initByURL(url) {
    var baseId = this.baseId
    var inputs = this.inputs
    var getCopyString = this.getCopyString
    inputs.forEach(type => {
      var domId = `${baseId}-${type}`
      var dom = document.querySelector(`#${domId}`)
      dom.value = getCopyString(type, url)
    })
  }
}
