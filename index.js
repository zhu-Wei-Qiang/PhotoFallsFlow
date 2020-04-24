var oLi = document.getElementsByClassName("col");
function getData() {
  ajax(
    "GET",
    "./data.json",
    "",
    function (res) {
      var data = JSON.parse(res);
      console.log(res);
      console.log(data)
      renderDom(data);
    },
    true
  );
}

function renderDom(data) {
  // 利用固定图片宽度比较高度
  // 减去margin padding 得到实际图片宽度
  var imgWidth = oLi[0].offsetWidth - 40;
  data.forEach((ele, index) => {


    var oDiv = document.createElement("div");
    oDiv.className = "item";
    var img = new Image();
    img.src = ele.img;
    // 求出等比高度
    img.height = (ele.height / ele.width) * imgWidth;
    oDiv.appendChild(img);
    var oP = document.createElement("p");
    oP.innerText = ele.desc;

    // console.time('渲染');
    // var height = (ele.height / ele.width) * imgWidth;
    // var oDiv = document.createElement("div");
    // oDiv.className = 'item'
    // var modelStr = `<img src=${ele.img} alt="" height=${height} width=${imgWidth}/>
    //                   <p>${ele.desc}</p>`;
    // oDiv.innerHTML = modelStr;
    // console.timeEnd('渲染')

    var minIndex = getMinLi().minIndex;
    oLi[minIndex].appendChild(oDiv);
  });
}
//求最短的那条列 
function getMinLi() {
  var minIndex = 0;
  var minHeight = oLi[0].offsetHeight;
  for (var i = 1; i < oLi.length; i++) {
    if (minHeight > oLi[i].offsetHeight) {
      minHeight = oLi[i].offsetHeight;
      minIndex = i;
    }
  }
  return {
    minIndex,
    minHeight
  };
}
var timer = null;
function bindEvent() {
  getData();
  window.onscroll = function () {
    clearTimeout(timer);
    var minHeight = getMinLi().minHeight;
    // 可视高度
    var clientHeight = document.documentElement.clientHeight;
    // 滚动条离上边的距离
    var scoTop = document.documentElement.scrollTop;
    // 看到最短列出来了
    if (minHeight < scoTop + clientHeight) {
      // 懒加载效果 滚动取消
      timer = setTimeout(() => {
        getData();
      }, 500);
    }
  };
}
bindEvent();


