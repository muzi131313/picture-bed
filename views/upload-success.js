var STORE_IMG_KEY = 'PICTURE-BED-IMG'
var $store = chrome.storage.sync
var $$imgId = '#img-show'

$store.get([ STORE_IMG_KEY ], function(info) {
  var imgInfo = info[STORE_IMG_KEY]
  var srcUrl = imgInfo.srcUrl
  var img = document.querySelector($$imgId)
  console.log('img: ', img)
  img.setAttribute('src', srcUrl)
})
