parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"AaGI":[function(require,module,exports) {
var t={type:"window",includeUncontrolled:!0};self.addEventListener("install",function(t){}),self.addEventListener("activate",function(t){}),self.addEventListener("notificationclick",function(n){if(n.action)clients.matchAll(t).then(function(t){var e=!0,i=!1,l=void 0;try{for(var r,o=t[Symbol.iterator]();!(e=(r=o.next()).done);e=!0){r.value.postMessage({action:n.action})}}catch(a){i=!0,l=a}finally{try{e||null==o.return||o.return()}finally{if(i)throw l}}});else{var e=clients.matchAll(t).then(function(t){var n=!0,e=!1,i=void 0;try{for(var l,r=t[Symbol.iterator]();!(n=(l=r.next()).done);n=!0){return l.value.focus()}}catch(o){e=!0,i=o}finally{try{n||null==r.return||r.return()}finally{if(e)throw i}}});n.waitUntil(e)}}),self.addEventListener("notificationclose",function(t){}),self.addEventListener("fetch",function(t){console.log("sw fetch",t.request.url)});
},{}]},{},["AaGI"], null)
//# sourceMappingURL=service-worker.js.map