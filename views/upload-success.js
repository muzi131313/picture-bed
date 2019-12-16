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
  img: url => url,
  html: url => `<img src="${url}">`,
  ubb: url => `[IMG]${url}[/IMG]`,
  markdown: url => `![undefined](${url})`
}
var copys = {
  baseId: 'copy',
  types: types,
  inputs: Object.keys(types),
  getCopyString: function(type, url) {
    var func = types[type]
    return func(url)
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
