/* eslint-disable */
(function(){
  var id;

  var script = document.querySelector('script#oberlo-override-script');
  if (script) {
    id = script.getAttribute('data-runtime-id');
  }

// create an observer instance
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length > 0) {
          parseNodes(mutation.addedNodes);
        }
      }
    });
  });

  function getParameterByName(name, url) {
    url = url ? url : '';
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("(?![?&])" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2]);
  }

  function parseNodes(nodes) {
    for (let i = 0; i < nodes.length; i++) {
      const elem = nodes[i];

      if (elem.tagName === 'SCRIPT') {
        const cbName = getParameterByName('callback', elem.src);

        if (cbName && cbName.indexOf('jQuery') > -1) {
          if (window[cbName]) {
            const tmp = window[cbName];

            window[cbName] = (data) => {
              tmp(data);

              chrome.runtime.sendMessage(id, {
                action: 'CONTENT_SCRIPT_ACTION',
                data: data,
                url: elem.src,
              });
            };
          }
        }
      }
    }
  }

  observer.observe(document.head, { attributes: true, childList: true, characterData: false });

  if (script) script.remove();
})();
