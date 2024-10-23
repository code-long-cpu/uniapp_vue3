"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "requestDemo",
  setup(__props) {
    const pets = common_vendor.ref([]);
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    console.log([...arr1, ...arr2]);
    const request = async () => {
      common_vendor.index.showNavigationBarLoading();
      try {
        const res = await common_vendor.index.request({
          url: "https://tea.qingnian8.com/tools/petShow",
          // url:"https://api.thecatapi.com/v1/images/search?limit=1",
          method: "GET",
          data: {
            size: 5
            // limit:10,	
          },
          header: {
            "access-key": "369395"
          }
        });
        if (res.data.errCode === 0) {
          pets.value = [...pets.value, ...res.data.data];
        } else {
          common_vendor.index.showToast({
            title: res.data.errMsg,
            icon: "none",
            duration: 3e3
          });
        }
      } catch (error) {
        console.log(error);
        common_vendor.index.showToast({
          title: "请求有误",
          icon: "none",
          duration: 3e3
        });
      }
      common_vendor.index.hideNavigationBarLoading();
      common_vendor.index.stopPullDownRefresh();
    };
    request();
    const preview = (index) => {
      const urls = pets.value.map((item) => item.url);
      common_vendor.index.previewImage({
        current: index,
        urls
      });
    };
    common_vendor.onReachBottom(() => {
      console.log("到底部了");
      request();
    });
    common_vendor.onPullDownRefresh(() => {
      console.log("刷新了");
      pets.value = [];
      request();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(pets.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.content),
            c: common_vendor.t(item.author),
            d: item._id,
            e: common_vendor.o(($event) => preview(index), item._id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e25b1ed9"]]);
wx.createPage(MiniProgramPage);
