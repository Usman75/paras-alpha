if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,s,i)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const n={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return c;case"module":return n;default:return e(a)}})).then(e=>{const a=i(...e);return c.default||(c.default=a),c})}))}}define("./sw.js",["./workbox-4d0bff02"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"Y2mEAlR1ClvUI0lZOMkwn"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/%5Bid%5D.js",revision:"e65aa8d5b7a63f64f5415a8359ea6681"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/%5Bid]/memento.js",revision:"6378c0f39375b20e146cef0829fd9685"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/_app.js",revision:"4276146e6693291b7f8146619419fcb3"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/_error.js",revision:"c48c9e73a84a0209588ce1cbbd1c3026"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/confirm-email/%5Bid%5D.js",revision:"8a3e801663a9bb6d5f3d4feba53c0741"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/explore.js",revision:"fdd5ad6024e17a5ae399d80f9c5026ac"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/feed/recent.js",revision:"25790750de2f06fe0ea702e0f0d83ed7"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/hub/search.js",revision:"e35f473b2d63f83ee0831ebc8d867fb1"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/index.js",revision:"d5551b5a32917c6cd8b9db22c41cec68"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/login.js",revision:"e127ab56466efeef5b374095674ee6e2"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/m/%5Bid%5D.js",revision:"7fe6c170fc54d486e5153c55b791f76c"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/m/%5Bid]/edit.js",revision:"d8c95b76473b0205f72df000ad156784"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/me/edit.js",revision:"21bd4a42ec37f9f2c289451dee71c070"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/me/following.js",revision:"ce5158d053a9066c8f9dfa9f6af40ef0"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/new/memento.js",revision:"df97dab24878f99c5f382a7ef55907b3"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/new/post.js",revision:"03ebcfbb20e243e1476c28647a6a5eb5"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/new/post/distribute.js",revision:"8373a1f8686bcec3f5784d28a25f0601"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/post/%5Bid%5D.js",revision:"01723143a150f3183bc338bf12bb84a2"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/post/%5Bid]/comment.js",revision:"f74b011b8cf6b864203bc15eb408022c"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/post/%5Bid]/edit.js",revision:"83eca48f4cd8d150cd718ed3d79cd8d3"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/post/%5Bid]/memento.js",revision:"87722ccc8bda615008313b29a93db8b5"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/wallet.js",revision:"848baf54d50f60128909d15908f25bab"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/wallet/send.js",revision:"5e524634c9259f60659a1bae5c1ec812"},{url:"/_next/static/Y2mEAlR1ClvUI0lZOMkwn/pages/wallet/transaction.js",revision:"2d5bdf7fa2d7afb843715b8c05cbdeee"},{url:"/_next/static/chunks/01840ff7b0d32f8f12fae33b5339384e402e35f8.90ba8eaf49bb2228637c.js",revision:"a2d8695a2fec9c2b39fef305c939e2c7"},{url:"/_next/static/chunks/03ce14e5dbdaafa84f84cff30d5ee35e2c4c632c.9afebe8209c6670cf32f.js",revision:"0f44ea5e5c929961888481a46a5de8a5"},{url:"/_next/static/chunks/094e29bc594d40429908a8d8531c776b4c885523.0a1bfcad8aa9f2e5160f.js",revision:"e8d89827bef0368a2c210b477bbd0b11"},{url:"/_next/static/chunks/1838bcd2bccf96c7d18a039a8a2749c00a3b6f73.a49c7df0d5d6ae2b7bb7.js",revision:"2fe4f7b812a4d6976a610b6640784674"},{url:"/_next/static/chunks/1fc256f1a25c9120e5d9344f1dee5307f73c1e5a.7979c66f1d7296317a2b.js",revision:"6517558cc1646cae9df803bca2607d07"},{url:"/_next/static/chunks/2a04eebb9bec9bb4332c27f580be5de43b5c3c57.f847a8f11c5c1ed48259.js",revision:"929e711e84203c9e19bdfa9619b601ea"},{url:"/_next/static/chunks/34641b677a5d2dc8f03c8d815796e972f885ef74.de529d53a8e7f7902161.js",revision:"38ba258780f3b3e7c4ba473ad1568e5c"},{url:"/_next/static/chunks/3d2d2ce239e6badb14a0bfa8b2d736823f2d2154.fc45168c2cf69b0ea2c8.js",revision:"17fce8290e43b44f07290796e5f28ce4"},{url:"/_next/static/chunks/3ea49f3eea2491f6ed0f21ba6a178e317208cca7.4a9e00792f806b879086.js",revision:"3a53c288e14d0affbd482a591d83cdb8"},{url:"/_next/static/chunks/47aa67ccdfecc08def05a182370e2aa7acc7e110.3d0a7ce8eb287bc44914.js",revision:"eae67b9f09f4aaa28549dcc823099859"},{url:"/_next/static/chunks/498c30647721009dd1be5fe0df9445f30b2199eb.54cc3c5848eded94921b.js",revision:"afc8dc0cbb7e1a14e231d69e74ae8fee"},{url:"/_next/static/chunks/702b72a4715beff355f3f1a212ab3c6a1cd91154.1fd45aa32eff262e733a.js",revision:"41e82b708e42f5f5c8e89e8b06f584e0"},{url:"/_next/static/chunks/7e840ef10d4de644aaf565c45bbe8a29b0266eeb.c75d6af75769f983def8.js",revision:"90b1e7462d2119d76f9de4c5b2163d87"},{url:"/_next/static/chunks/9b9e355a963099702ba873eadbf8fe0f2d0a9ff1.de8ab80965e4e35381c9.js",revision:"3c18d3358d1af3ddcb6284eb8e592ca9"},{url:"/_next/static/chunks/aad2fc9ce088028b72cdb356a3b6f052264e06e8.2c86927b0acab9a56379.js",revision:"3b840224508be3e453e2ac601f176376"},{url:"/_next/static/chunks/ad32c29fbe2c79ebd54ea40069c4183a51a08e8a.3879921c473467f9b7ba.js",revision:"290b8e820cd48e108886fd9cb0c9a362"},{url:"/_next/static/chunks/b02acb454deaf784f502c743753e597caabd8bc3.cc65606b0c5721e31623.js",revision:"82c9b573973d63a07d5a3466125b7e37"},{url:"/_next/static/chunks/c50ffd82d330fd9df68edb2a7ae76475686d1e46.8c0dc570ad791b685b3a.js",revision:"bca7581fc477101e95499eb736495859"},{url:"/_next/static/chunks/commons.cd9ca553a70fe5f8c3dd.js",revision:"5b4e704c66f64aebc4ecd3ff47aeef83"},{url:"/_next/static/chunks/dbffe83d5a08aa5a878ec03bb1c4487f516c0005.91a0efd55167a5ac5b14.js",revision:"caecc88389ccf55a5e2614698862131d"},{url:"/_next/static/chunks/dd2a17aea88fea310c9cd94bd99a7e05883f47b9.f585209a1631c8ecae9c.js",revision:"0b2d3d7e7924b8a6b0027d5b3f86d7f1"},{url:"/_next/static/chunks/ed385e79c391c0ea23bb25e0a42f8756755d1aee.b826e581651abc0e86bf.js",revision:"70ad37f5abb75f48cdde31b39fb9ab97"},{url:"/_next/static/chunks/framework.619a4f70c1d4d3a29cbc.js",revision:"8e6204793e3d11a8bedf359bfb6e110d"},{url:"/_next/static/css/f8ffcc951af1e7562e97.css",revision:"c38827df9be1cb41c01b47a19f6e60d5"},{url:"/_next/static/runtime/main-a1bfe28440a50bd1af03.js",revision:"bb9166d7166c44bdf7678e85aa88e20d"},{url:"/_next/static/runtime/polyfills-b067cd998a54a250decd.js",revision:"c363d1d5c2411afc63879b43eca54635"},{url:"/_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/favicon.ico",revision:"91e582269634c4ec345a13f257a2ed66"},{url:"/static/images/icons/icon-128x128.png",revision:"e2c789b19451d4359b0a757ad8efb810"},{url:"/static/images/icons/icon-144x144.png",revision:"48e70244f769d28e54be5b0a28bfe699"},{url:"/static/images/icons/icon-152x152.png",revision:"970fa4d9234cb0452439bea3ff70fc74"},{url:"/static/images/icons/icon-192x192.png",revision:"2bf576ab0c8a771927d092940c7b3fa2"},{url:"/static/images/icons/icon-384x384.png",revision:"dc804f9ddf542e0c60659d433b8095b5"},{url:"/static/images/icons/icon-512x512.png",revision:"85261cc3de46c31f30680af1c6b9a593"},{url:"/static/images/icons/icon-72x72.png",revision:"ee995fd797a8d488e968e999e2e15de1"},{url:"/static/images/icons/icon-96x96.png",revision:"043905a6e067810e634591c523a3caa7"},{url:"/static/manifest.json",revision:"6a01b1f646831be4515031bda830a719"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"POST"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
