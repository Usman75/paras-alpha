if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,s,t)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const r={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return c;case"module":return r;default:return e(a)}})).then(e=>{const a=t(...e);return c.default||(c.default=a),c})}))}}define("./sw.js",["./workbox-4d0bff02"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/",revision:"ukq06uDHDaPaRIyvr_4rK"},{url:"/_next/static/chunks/0125913cc829adf62fc051b1beb317620e88153a.ecfd4d71ef1f38b0387e.js",revision:"1057af412d976cc5bc49e5eb06e5ea3b"},{url:"/_next/static/chunks/013875aa8fb3b129853e637f6c6f9aab9a4d06e0.de6d191cd2b3f5a31008.js",revision:"6b918e88f8e699e2b159d4e4ec7488b8"},{url:"/_next/static/chunks/0320b6ceb340f224726b66695f5107da0e0efd36.e64f08b42bc10a6862a0.js",revision:"1e28d649519cb019c1265040ac0ed26f"},{url:"/_next/static/chunks/094974312e5283553c718a34ba2e8eaef97b4cca.73cbb0a9aac86959cd3f.js",revision:"4c189a5990d77f5172d61a18b6cd31e9"},{url:"/_next/static/chunks/0fc79a5189add977c8fca080bf3b2cabcae6bd93.27056770cac7e7fe4ad5.js",revision:"6f901a215f4e383858e9554ecf001a2f"},{url:"/_next/static/chunks/1590eb9b6adbbd6c4f1f89184b8afb3d0ffdad11.2c86927b0acab9a56379.js",revision:"3b840224508be3e453e2ac601f176376"},{url:"/_next/static/chunks/1f049df3eb078f8ca77bfd51c8cb12dd0298d331.4fcba8acb2bb3d9cacd1.js",revision:"4746442d530ff0c8e0458dd8933f99f9"},{url:"/_next/static/chunks/304f9eed46d39598c96a4a5b2d14a243647a507f.99decbd64451dcf86867.js",revision:"4b5b5e21bd42a5a2b0c48e680888ca0e"},{url:"/_next/static/chunks/3c8083e64c866d05915d2cece9beb0ccf1fe1e2d.c4f49e79f7b7a247a7c0.js",revision:"e1feeda94c2e086d5a9e8687fe2cf152"},{url:"/_next/static/chunks/47a34465919d6fced041003bac9e5735968a10ee.c8870c132b8e354fe90c.js",revision:"6919a3f2b087e35f81706b859d266d52"},{url:"/_next/static/chunks/6e603b5ab15707d9cc240cacbee72bba8dee4ec2.718a1381934146328403.js",revision:"b421d960617012436abfad6ac220c897"},{url:"/_next/static/chunks/7551f6a6aa777cc5e3482a782f9e8b7d71a2c766.b039d4c03c68b63d04b2.js",revision:"1bbddcd172d4af93a9e31b90b04fe3fc"},{url:"/_next/static/chunks/7aede24fefe29c85385c3be1ac6cc18b2de7cab8.bb90131e4769935868ac.js",revision:"4364ef8b1a3926ba22f4fc019220f62f"},{url:"/_next/static/chunks/a16b59d9737e30f50bc00f752b0bfb359b1f0d73.a7e8c34db5142639f893.js",revision:"231bab19afebdb2a464661adcaefd676"},{url:"/_next/static/chunks/ad6d0db11e3bd5f54a504944ac9551ac1517bb50.4e757c2f488cda3c4685.js",revision:"f874c1ea6c2ba9b6d664e797b5f3d32c"},{url:"/_next/static/chunks/cecb425d7a30603941792800b712e16ddb2728ad.f3c3ee3733a10ca33f94.js",revision:"bd47a4c0c57bb61a9a40af71ad55a34e"},{url:"/_next/static/chunks/commons.cd9ca553a70fe5f8c3dd.js",revision:"5b4e704c66f64aebc4ecd3ff47aeef83"},{url:"/_next/static/chunks/e0f11011a84a32396233e00ecffcf62dd322fdb2.a49c7df0d5d6ae2b7bb7.js",revision:"2fe4f7b812a4d6976a610b6640784674"},{url:"/_next/static/chunks/e4de6618d2e0a7c83f01e16d989ecd5af17958b4.cc65606b0c5721e31623.js",revision:"82c9b573973d63a07d5a3466125b7e37"},{url:"/_next/static/chunks/framework.619a4f70c1d4d3a29cbc.js",revision:"8e6204793e3d11a8bedf359bfb6e110d"},{url:"/_next/static/css/95114212e25e4d1d4997.css",revision:"45ee7477c96f050f67db25aef994394d"},{url:"/_next/static/runtime/main-edf5e530cd29eed83de6.js",revision:"04119b96b2972379437e6d69a93d0553"},{url:"/_next/static/runtime/polyfills-7c26a35a5599f4138f4d.js",revision:"9e25eddfea520aeb56237d286d363584"},{url:"/_next/static/runtime/webpack-c212667a5f965e81e004.js",revision:"f5e6e2fca3144cc944812cfa3547f475"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/_buildManifest.js",revision:"fb96ae7926f5104f50f0cf1b3a23a9b5"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/%5Bid%5D.js",revision:"f513a5169d86d1e0786c615ef856226e"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/%5Bid]/memento.js",revision:"fb2db54a6619badb4c666eef54247d3f"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/_app.js",revision:"743939360166ceec1df8604cab147c93"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/_error.js",revision:"50d85f1a240f90512fee6f801a2eb89b"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/confirm-email/%5Bid%5D.js",revision:"fee0bc6181c5917232c8a1eebc602eb8"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/explore.js",revision:"79f7305c694cf6f0838b8b1842285e93"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/feed/recent.js",revision:"75ed68dfafd285ac704815531b05cb3a"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/hub/search.js",revision:"f2b94bc9167a7447691053a12647d334"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/index.js",revision:"e7119bce2471dcc87f93de3dc8129522"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/login.js",revision:"c5bd0e6df02044e0d79550175564ca8d"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/m/%5Bid%5D.js",revision:"bdbd8c869baa1707ce7fd4765b176d22"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/m/%5Bid]/edit.js",revision:"b58ba942e6c1a928233083d366cb8152"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/me/edit.js",revision:"ed090513e5f346c3a5e41ce02705af12"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/me/following.js",revision:"242e4d7eaa499e238eb6e40665628bdc"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/new/memento.js",revision:"a0b905a20e0b018b0e47f79d0ed67cc3"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/new/post.js",revision:"691117d824e6f515d8b71db439cc1232"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/new/post/distribute.js",revision:"d0dad8d78028d945e2df9ee0ab0c2868"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/post/%5Bid%5D.js",revision:"2b97f5da3eb814c35b412057839f569d"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/post/%5Bid]/comment.js",revision:"f1dd7370e103cd6631275e2d8e8f2e76"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/post/%5Bid]/edit.js",revision:"3dc1e5475d023a8ecd27c50a35c3425a"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/post/%5Bid]/memento.js",revision:"a0c4784e031498ace22c486daf9701e4"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/wallet.js",revision:"229946b8b60a2889ce3edbba5849acad"},{url:"/_next/static/ukq06uDHDaPaRIyvr_4rK/pages/wallet/transaction.js",revision:"7392cd17f61bf0b9b294c5cc3801c7c8"},{url:"/favicon.ico",revision:"91e582269634c4ec345a13f257a2ed66"},{url:"/static/manifest.json",revision:"3034cb2b1ea15f1d5c8cc605d20e3548"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/use\.fontawesome\.com\/releases\/.*/i,new e.CacheFirst({cacheName:"font-awesome",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.StaleWhileRevalidate({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"POST"),e.registerRoute(/.*/i,new e.StaleWhileRevalidate({cacheName:"others",plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
