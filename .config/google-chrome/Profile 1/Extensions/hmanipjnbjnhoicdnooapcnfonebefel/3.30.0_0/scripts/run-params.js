/* eslint-disable */
(function(){
  var script = document.getElementById('oberlo-run-params-script');
  if (script) {
    var id = script.getAttribute('data-runtime-id');
    chrome.runtime.sendMessage(id, { action: 'ALI_RUN_PARAMS', data: window.runParams });
    script.remove();
  }
})();
