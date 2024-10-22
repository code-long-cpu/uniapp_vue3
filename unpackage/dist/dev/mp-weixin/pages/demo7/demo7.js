"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "demo7",
  setup(__props) {
    common_vendor.index.showToast({
      title: "操作成功"
    });
    const list = common_vendor.ref([
      { id: "1", name: "🎩帽子", price: 1500, checked: false },
      { id: "2", name: "👕上衣", price: 1e3, checked: true },
      { id: "3", name: "👖裤子", price: 2e3, checked: false },
      { id: "4", name: "👞鞋子", price: 3e3, checked: false }
    ]);
    common_vendor.ref([]);
    const checkedlist = common_vendor.ref([]);
    const itemchanges = (e) => {
      checkedlist.value = e.detail.value;
      list.value.forEach((item) => {
        item.checked = checkedlist.value.includes(item.id);
      });
    };
    const totalNumber = common_vendor.computed(() => checkedlist.value.length);
    const totalPrice = common_vendor.computed(() => {
      return list.value.filter((item) => item.checked).reduce((sum2, item) => sum2 + item.price, 0);
    });
    const newlist = common_vendor.computed(() => {
      return list.value.filter((item) => item.checked);
    });
    const sum = common_vendor.computed(() => {
      return newlist.value.reduce((sum2, item) => sum2 + item.price, 0);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.id,
            b: item.checked,
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.price),
            e: item.id
          };
        }),
        b: common_vendor.o(itemchanges),
        c: common_vendor.t(totalNumber.value),
        d: common_vendor.t(totalPrice.value),
        e: common_vendor.t(checkedlist.value),
        f: common_vendor.t(list.value),
        g: common_vendor.t(newlist.value),
        h: common_vendor.t(sum.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9595efcd"]]);
wx.createPage(MiniProgramPage);
