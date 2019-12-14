chrome.runtime.onInstalled.addListener(function() {
  // http-request
  function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
  }

  var SUCCESS_VIEW_NAME = 'GitHub图床'
  var MENU_NAME = '上传' + SUCCESS_VIEW_NAME
  var STORE_IMG_KEY = 'PICTURE-BED-IMG'
  var $store = chrome.storage.sync

  // 颜色设置监听
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // 1.插件匹配(生效)网站
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          // developer.chrome.com
          pageUrl: {hostContains: '.com'},
        })
      ],
      actions: [
        new chrome.declarativeContent.ShowPageAction()
      ]
    }]);
  });

  function selectionOnClick(info, tab) {
    /**
     {"editable":false,
     "frameId":0,
     "linkUrl":"javascript:;",
     "mediaType":"image",
     "menuItemId":"picture-bed-upload",
     "pageUrl":"http://image.baidu.com/",
     "srcUrl":"http://e.hiphotos.baidu.com/image/h%3D300/sign=a9e671b9a551f3dedcb2bf64a4eff0ec/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg"}
     */
    // alert(JSON.stringify(info))
    $store.set({ [STORE_IMG_KEY]: info })

    let strWindowFeatures = `
      height=500,
      width=800,
      top=200,
      left=200,
      toolbar=no,
      menubar=no,
      resizable=no,
      scrollbars=no,
      location=yes,
      status=yes
    `;
    window.open('views/upload-success.html', SUCCESS_VIEW_NAME, strWindowFeatures)
  }
  // 2.图片右键菜单
  chrome.contextMenus.create({
    "type": "normal",
    "id": "picture-bed-upload",
    "title": MENU_NAME,
    "contexts": [ "image" ]
  });
  chrome.contextMenus.onClicked.addListener(selectionOnClick)
});
