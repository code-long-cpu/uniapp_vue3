"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "demo4",
  setup(__props) {
    const num = common_vendor.ref(1);
    const change = () => {
      num.value++;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(num.value),
        b: common_vendor.o(change)
      };
    };
  }
};
wx.createPage(_sfc_main);
