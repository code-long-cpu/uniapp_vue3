"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const a = 6;
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let b = common_vendor.ref(8);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(a),
        c: common_vendor.t(common_vendor.unref(b))
      };
    };
  }
};
wx.createPage(_sfc_main);
