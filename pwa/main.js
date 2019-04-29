let content = document.getElementById('content');
let str = '';
const xhr = new XMLHttpRequest()

xhr.open('GET','/api/img', true);

xhr.responseType = 'json';

xhr.onload = function () {
  let data = xhr.response;
  data.forEach(item => {
    str +=`<li><img src="${item}"></li>`
  });
  content.innerHTML = str
};

xhr.send();

window.addEventListener('load',function () {
  // 解决离线缓存问题
  if ('serviceWorker' in window.navigator) {
    navigator.serviceWorker.register('./sw.js').then(registration => {
      // console.log(registration);
    })
  }
});
