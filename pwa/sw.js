// 默认情况下 sw文件变化后会重新注册 serviceWorker
const CACHE_NAME = 'cache_v' + 1;
const cache_list = [
  '/',
  '/index.html',
  '/index.css',
  '/main.js',
  '/api/img'
]
function fetchAddSave (request) {
  return fetch(request).then(res => {
    let r = res.clone();
    // 更新缓存
    caches.open(CACHE_NAME).then(cache => cache.put(request, r))
    return res
  })
}
self.addEventListener('fetch', e => {
  // 如果联网的话就发请求
  // 缓存策略
  // 缓存优先 网络优先
  if (e.request.url.includes('/api/')) {
    return e.respondWith(
      fetchAddSave(e.request).catch(err => {
      // 打开缓存把缓存匹配到的结果返回
      return caches.open(CACHE_NAME).then(cache => cache.match(e.request))
    }))
  }
  e.respondWith(
    fetch(e.request).catch(err => {
      // 打开缓存把缓存匹配到的结果返回
      return caches.open(CACHE_NAME).then(cache => cache.match(e.request))
    })
  )
  // console.log(e)
});
// 缓存 需要缓存的内容
function preCache () {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(cache_list)
  })
}
// 缓存内容
self.addEventListener('install', (e) => {

  // 如果上一个serviceWorker未销毁，需要手动销毁 skipWaiting()
  e.waitUntil(preCache().then(skipWaiting)) // 等待 promise 执行完成
});
function clearCache () {
  return caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== CACHE_NAME) {
        return caches.delete(key)
      }
    }))
  })
}
// 激活到当前 serviceWorker 激活需要立即生效 self.clients.claim()
self.addEventListener('activate', e =>{
  e.waitUntil(
    Promise.all([ clearCache(), self.clients.claim() ])
  )
});

// 添加主屏幕 两次访问 间隔5分钟 会弹出
