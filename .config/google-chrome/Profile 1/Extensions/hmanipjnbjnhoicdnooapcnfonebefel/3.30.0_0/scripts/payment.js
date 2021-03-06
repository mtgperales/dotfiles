// eslint-disable-next-line func-names
(function (window, document) {
  const script = document.getElementById('oberlo-payment-script');

  const jsonStringify = JSON.stringify;
  let payoutIds = null;

  // eslint-disable-next-line no-param-reassign
  window.setPayoutData = (newPayoutIds) => {
    payoutIds = newPayoutIds;
  };

  JSON.stringify = (obj, replacer, space) => {
    if (payoutIds && Array.isArray(obj) && obj.length) {
      const first = obj[0];

      if (first && first.constructor.name === 'Object') {
        const objKeys = Object.keys(first);

        if (objKeys.indexOf('orderId') > -1) {
          const result = jsonStringify(payoutIds);

          payoutIds = null;

          return result;
        }
      }
    }

    return jsonStringify(obj, replacer, space);
  };

  if (script) {
    script.remove();
  }
}(window, document));
