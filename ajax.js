function ajax(type, url, data, callback, flag) {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject("Microsoft.XMLHttp");
  }
  if (type == "GET") {
    xhr.open(type, url + "?" + data, flag);
    xhr.send();
  } else if (type == "POST") {
    xhr.open(type, url, flag);
    // 编译码 application/json  json字符串或json对象
    // 编译码 multipart/from-data  上传文件 file
    // 编译码 application/x-www-from-urlencoded  字符串键值对
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.responseText);
    } else {
      Error("请求错误");
    }
  };
}
