/* eslint-disable */
(function(window) {
  const script = document.getElementById('oberlo-injected-script');

  function getReactInstance(node, up = 0) {
    const reactInternalInstancePropName = Object.getOwnPropertyNames(node).find(function (node) {
      return node.startsWith('__reactInternalInstance$');
    });
    let fiber = node[reactInternalInstancePropName] === null ? null : node[reactInternalInstancePropName].return;
    for (let i = 0; i < up; i++) {
      fiber = fiber.return;
    }

    return fiber.stateNode;
  }

  const chromeRuntimeId = script.getAttribute('data-runtime-id');

  function checkIframeLoaded(iframe, event) {
    if (!iframe.contentWindow.runParams) {
      event.source.postMessage({
        type: 'productInfo',
        runtimeId: chromeRuntimeId,
        productInfo: null,
        productUrl: null,
      }, event.origin);

      iframe.onload = () => {};
    }
  }

  window.addEventListener('message', function (event) {
    if (!event.data.type || !event.data.runtimeId || event.data.runtimeId !== chromeRuntimeId) {
      return;
    }

    if (event.data.type === 'selectPaymentMethod') {
      const options = {
        bindCardAllowed: !0,
        subPaymentMethodList: [{
          available: !0,
          paymentMethodName: '...',
          paymentGateway: 'alipay',
        }],
        needChangeCurrency: !1,
        needCpfInput: !1,
        pmtOpt: 'others',
        screen: 1,
        available: !0
      };
      let paymentMethodEl = document.querySelector('.pay-method');
      if (paymentMethodEl === null) {
        paymentMethodEl = document.querySelector('#main .payment-info .pay-method');
      }
      const payMethodComponentReactInstance = getReactInstance(paymentMethodEl);
      payMethodComponentReactInstance.selectPayMethod(options);
      payMethodComponentReactInstance.confirmPay();
      const rootComponentEl = document.querySelector('#root > div');
      const rootComponentReactInstance = getReactInstance(rootComponentEl, 1);
      let intervalId = setInterval(() => {
        if (payMethodComponentReactInstance.props.payMethodState.pmtOpt === 'others'
          && rootComponentReactInstance.props.payMethod.saveCardLoading === false) {
          event.source.postMessage(
            { type: 'otherPaymentMethodsSelected', runtimeId: chromeRuntimeId },
            event.origin
          );
        }
      }, 400);
      setTimeout(() => clearInterval(intervalId), 5000);
    } else if (event.data.type === 'setSupplierNote') {
      const noteContainerNodesSelector = '.message-container .seller-message';
      const noteInputsSelector = '.seller-message-input span.next-input-textarea';

      const noteInputs = document.querySelectorAll(noteInputsSelector);
      noteInputs.forEach(function (inputNode) {
        let nodeReactInst = getReactInstance(inputNode);
        nodeReactInst.setState({
          value: event.data.note,
        });
        nodeReactInst.onChange({
          target: {
            value: event.data.note,
          },
        });
        nodeReactInst.onKeyDown({
          target: {
            value: event.data.note,
          },
        });
      });

      // Display note inputs
      const noteContainerNodes = document.querySelectorAll(noteContainerNodesSelector);
      noteContainerNodes.forEach(function (containerNode) {
        let nodeReactInst = getReactInstance(containerNode);
        nodeReactInst.setState({
          visible: false, // Toggles between `Leave message` button and input
        });
      });

      event.source.postMessage({ type: 'noteFilled', runtimeId: chromeRuntimeId }, event.origin);
    } else if (event.data.type === 'scrapeProductPage' && event.data.productUrl) {
      let productUrl = event.data.productUrl;
      // Replace ://es., ://pt., etc. with ://www.
      productUrl = productUrl.replace(/:\/\/[a-z]{2}\./, '://www.');

      let currentLocaleCookies = window.document.cookie.split(';').filter(item => item.trim().indexOf('aep_usuc_f') === 0 || item.trim().indexOf('intl_locale') === 0);

      window.document.cookie = 'aep_usuc_f=region=US&site=glo&b_locale=en_US&c_tp=USD;domain=.aliexpress.com;path=/';
      window.document.cookie = 'intl_locale=en_US;domain=.aliexpress.com;path=/';

      const iframe = window.document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = productUrl;
      iframe.onload = () => {
        if (currentLocaleCookies.length > 0) {
          currentLocaleCookies.forEach((cookie) => {
            window.parent.document.cookie = cookie.trim() + ';domain=.aliexpress.com;path=/';
          });
        }

        event.source.postMessage({
          type: 'productInfo',
          runtimeId: chromeRuntimeId,
          productInfo: iframe.contentWindow.runParams,
          productUrl: iframe.contentWindow.location.href,
        }, event.origin);
      };

      window.setTimeout(() => {
        checkIframeLoaded(iframe, event);
      }, 5000);

      document.body.appendChild(iframe);
    }
  }, false);

  if (script) {
    script.remove();
  }
})(window);
