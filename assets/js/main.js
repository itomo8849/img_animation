window.addEventListener("load", () => {
  // boxをすべて取得
  const showImgTrigger = document.querySelectorAll(".js_showImgTrigger");
  // scrollイベントをセット
  window.addEventListener("scroll", showImg);
  // ロードのタイミングで一度発火
  showImg();

  function showImg() {
    // 発火位置
    const triggerBottom = window.innerHeight - 100;

    showImgTrigger.forEach((box) => {
      // boxの頭部分の座標を取得
      const boxTop = box.getBoundingClientRect().top;

      // boxの頭部分が発火位置を超えたら
      if (boxTop < triggerBottom) {
        box.classList.add("is_show");
      } 
      // クラスの脱着の場合
      // else {
      //   box.classList.remove("is_inview");
      // }
    });
  }
});