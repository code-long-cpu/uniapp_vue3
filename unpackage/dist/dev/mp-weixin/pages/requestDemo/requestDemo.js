"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  (_easycom_uni_segmented_control2 + _easycom_uni_icons2 + _easycom_uni_load_more2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_icons + _easycom_uni_load_more)();
}
const _sfc_main = {
  __name: "requestDemo",
  setup(__props) {
    const pets = common_vendor.ref([]);
    const current = common_vendor.ref(0);
    const classify = [{ key: "all", value: "全部" }, { key: "dog", value: "狗狗" }, { key: "cat", value: "猫猫" }];
    const value = common_vendor.computed(() => {
      return classify.map((item) => item.value);
    });
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    console.log([...arr1, ...arr2]);
    const request = async () => {
      common_vendor.index.showNavigationBarLoading();
      try {
        const res = await common_vendor.index.request({
          url: "https://tea.qingnian8.com/tools/petShow",
          // url:"https://tea.qingnian8.com/tools/taoShow",
          // url:"https://api.thecatapi.com/v1/images/search?limit=1",
          method: "GET",
          data: {
            size: 5,
            // limit:10,	
            type: classify[current.value].key
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
          title: error.errMsg,
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
    const reFresh = () => {
      console.log("刷新");
      common_vendor.index.startPullDownRefresh();
    };
    const backTop = () => {
      console.log("回到顶部");
      common_vendor.index.pageScrollTo({
        scrollTop: 0,
        duration: 100
      });
    };
    const onClickItem = (e) => {
      current.value = e.currentIndex;
      pets.value = [];
      request();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: value.value,
          styleType: "button",
          activeColor: "#1ce5e0"
        }),
        c: common_vendor.f(pets.value, (item, index, i0) => {
          return {
            a: item.url,
            b: common_vendor.t(item.source),
            c: common_vendor.t(item.type),
            d: common_vendor.t(index + 1),
            e: common_vendor.t(item.content),
            f: common_vendor.t(item.author),
            g: item._id,
            h: common_vendor.o(($event) => preview(index), item._id)
          };
        }),
        d: common_vendor.p({
          type: "refreshempty",
          size: "30",
          color: "#888"
        }),
        e: common_vendor.o(reFresh),
        f: common_vendor.p({
          type: "arrow-up",
          size: "30",
          color: "#888"
        }),
        g: common_vendor.o(backTop),
        h: common_vendor.p({
          status: "loading"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e25b1ed9"]]);
wx.createPage(MiniProgramPage);
