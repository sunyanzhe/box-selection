/*! Update: 2020-07-17 18:13:26 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.BOX_SELECTION=e():t.BOX_SELECTION=e()}(window,(function(){return function(t){var e={};function i(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,i),r.l=!0,r.exports}return i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=5)}([function(t,e,i){var n=i(2),r=i(3);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[t.i,r,""]]);var o={insert:"head",singleton:!1};n(r,o);t.exports=r.locals||{}},function(t,e,i){"use strict";var n=i(0);i.n(n).a},function(t,e,i){"use strict";var n,r=function(){return void 0===n&&(n=Boolean(window&&document&&document.all&&!window.atob)),n},o=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}(),a=[];function s(t){for(var e=-1,i=0;i<a.length;i++)if(a[i].identifier===t){e=i;break}return e}function c(t,e){for(var i={},n=[],r=0;r<t.length;r++){var o=t[r],c=e.base?o[0]+e.base:o[0],l=i[c]||0,u="".concat(c," ").concat(l);i[c]=l+1;var d=s(u),f={css:o[1],media:o[2],sourceMap:o[3]};-1!==d?(a[d].references++,a[d].updater(f)):a.push({identifier:u,updater:m(f,e),references:1}),n.push(u)}return n}function l(t){var e=document.createElement("style"),n=t.attributes||{};if(void 0===n.nonce){var r=i.nc;r&&(n.nonce=r)}if(Object.keys(n).forEach((function(t){e.setAttribute(t,n[t])})),"function"==typeof t.insert)t.insert(e);else{var a=o(t.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(e)}return e}var u,d=(u=[],function(t,e){return u[t]=e,u.filter(Boolean).join("\n")});function f(t,e,i,n){var r=i?"":n.media?"@media ".concat(n.media," {").concat(n.css,"}"):n.css;if(t.styleSheet)t.styleSheet.cssText=d(e,r);else{var o=document.createTextNode(r),a=t.childNodes;a[e]&&t.removeChild(a[e]),a.length?t.insertBefore(o,a[e]):t.appendChild(o)}}function p(t,e,i){var n=i.css,r=i.media,o=i.sourceMap;if(r?t.setAttribute("media",r):t.removeAttribute("media"),o&&btoa&&(n+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var h=null,v=0;function m(t,e){var i,n,r;if(e.singleton){var o=v++;i=h||(h=l(e)),n=f.bind(null,i,o,!1),r=f.bind(null,i,o,!0)}else i=l(e),n=p.bind(null,i,e),r=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else r()}}t.exports=function(t,e){(e=e||{}).singleton||"boolean"==typeof e.singleton||(e.singleton=r());var i=c(t=t||[],e);return function(t){if(t=t||[],"[object Array]"===Object.prototype.toString.call(t)){for(var n=0;n<i.length;n++){var r=s(i[n]);a[r].references--}for(var o=c(t,e),l=0;l<i.length;l++){var u=s(i[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}i=o}}}},function(t,e,i){(e=i(4)(!1)).push([t.i,".drag-container[data-v-34221ad6]{overflow:hidden;position:relative;border:1px solid #e4e7ed;height:500px;width:500px;margin-left:20px;margin-top:20px;user-select:none}.drag-container.disabled[data-v-34221ad6]{border-color:#e4e7ed;color:#c0c4cc}.drag-container .disabled-mask[data-v-34221ad6]{position:absolute;z-index:1000;top:0;right:0;width:100%;height:100%;background-color:rgba(0,0,0,0.05);cursor:not-allowed}.drag-container[data-v-34221ad6]:focus{outline:none}.drag-container .drag-area[data-v-34221ad6]{border:1px solid #0078d7;background:rgba(0,120,215,0.35);position:absolute;box-sizing:border-box}.drag-container .drag-area.is-overlap[data-v-34221ad6]{border-color:#f15151;background:rgba(241,81,81,0.35)}.drag-container .drag-area.is-overlap .drag-anchor[data-v-34221ad6]{background:#f15151}.drag-container .drag-area .drag-anchor[data-v-34221ad6]{width:10px;height:10px;background:#0078d7;position:absolute}.drag-container .drag-area .drag-anchor.left-top[data-v-34221ad6]{top:0px;left:0px;margin-top:-5px;margin-left:-5px;cursor:se-resize}.drag-container .drag-area .drag-anchor.left[data-v-34221ad6]{top:50%;left:0px;margin-top:-5px;margin-left:-5px;cursor:e-resize}.drag-container .drag-area .drag-anchor.left-bottom[data-v-34221ad6]{bottom:0px;left:0px;margin-bottom:-5px;margin-left:-5px;cursor:ne-resize}.drag-container .drag-area .drag-anchor.top[data-v-34221ad6]{top:0px;left:50%;margin-top:-5px;margin-left:-5px;cursor:n-resize}.drag-container .drag-area .drag-anchor.right-top[data-v-34221ad6]{top:0px;right:0px;margin-right:-5px;margin-top:-5px;cursor:ne-resize}.drag-container .drag-area .drag-anchor.right[data-v-34221ad6]{top:50%;right:0px;margin-right:-5px;margin-top:-5px;cursor:e-resize}.drag-container .drag-area .drag-anchor.right-bottom[data-v-34221ad6]{right:0px;bottom:0px;margin-right:-5px;margin-bottom:-5px;cursor:se-resize}.drag-container .drag-area .drag-anchor.bottom[data-v-34221ad6]{bottom:0px;left:50%;margin-left:-5px;margin-bottom:-5px;cursor:n-resize}\n",""]),t.exports=e},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",n=t[3];if(!n)return i;if(e&&"function"==typeof btoa){var r=(a=n,s=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),c="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(s),"/*# ".concat(c," */")),o=n.sources.map((function(t){return"/*# sourceURL=".concat(n.sourceRoot||"").concat(t," */")}));return[i].concat(o).concat([r]).join("\n")}var a,s,c;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2]," {").concat(i,"}"):i})).join("")},e.i=function(t,i,n){"string"==typeof t&&(t=[[null,t,""]]);var r={};if(n)for(var o=0;o<this.length;o++){var a=this[o][0];null!=a&&(r[a]=!0)}for(var s=0;s<t.length;s++){var c=[].concat(t[s]);n&&r[c[0]]||(i&&(c[2]?c[2]="".concat(i," and ").concat(c[2]):c[2]=i),e.push(c))}},e}},function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"container",staticClass:"drag-container",class:{disabled:t.disabled},style:{width:t.width+"px",height:t.height+"px"},attrs:{tabindex:"-1"},on:{mousedown:function(e){return e.stopPropagation(),t.mouseDownHandle(e)},mouseup:function(e){return e.stopPropagation(),t.mouseUpHandle(e)},keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"delete",[8,46],e.key,["Backspace","Delete","Del"])?null:t.deleteSelect(e)},contextmenu:function(t){t.preventDefault()}}},[t.disabled?i("div",{staticClass:"disabled-mask"}):t._e(),t._v(" "),t._l(t.positionList,(function(e,n){var r=e.position,o=e.overlap,a=e.id,s=e.selected;return i("box",{key:a,attrs:{index:n,selected:s,position:r,overlap:o,calcTempStyle:t.calcTempStyle,calcShapeStyle:t.calcShapeStyle},on:{startMove:t.startMove,selectArea:t.selectIndex,startTransform:t.startTransform},scopedSlots:t._u([{key:"tag",fn:function(e){var i=e.data;return t.$scopedSlots.tag?[t._t("tag",[t._v(t._s(i.index))],{data:i})]:void 0}}],null,!0)})})),t._v(" "),t.isNew&&t.canCreate?i("div",{staticClass:"drag-area",style:t.calcTempStyle(t.tempPosition)}):t._e()],2)};n._withStripped=!0;var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"drag-area",class:{"is-overlap":t.overlap},style:[t.isTransform?t.calcTempStyle(t.position):t.calcShapeStyle(t.position),{"z-index":t.isMove||t.selected?999:null}],on:{mousedown:t.startMove,mouseup:t.endMove,click:function(e){return e.stopPropagation(),t.selectArea(e)}}},[t.$scopedSlots.tag?t._t("tag",null,{data:{index:t.index,position:t.position,overlap:t.overlap,selected:t.selected}}):t._e(),t._v(" "),t.selected?t._l(t.anchorList,(function(e){return i("span",{key:e,staticClass:"drag-anchor",class:e,on:{mousedown:function(i){return t.startTransform(e)}}})})):t._e()],2)};function o(t,e,i,n,r,o,a,s){var c,l="function"==typeof t?t.options:t;if(e&&(l.render=e,l.staticRenderFns=i,l._compiled=!0),n&&(l.functional=!0),o&&(l._scopeId="data-v-"+o),a?(c=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),r&&r.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},l._ssrRegister=c):r&&(c=s?function(){r.call(this,(l.functional?this.parent:this).$root.$options.shadowRoot)}:r),c)if(l.functional){l._injectStyles=c;var u=l.render;l.render=function(t,e){return c.call(e),u(t,e)}}else{var d=l.beforeCreate;l.beforeCreate=d?[].concat(d,c):[c]}return{exports:t,options:l}}r._withStripped=!0;var a=o({props:{overlap:Boolean,selected:Boolean,position:Array,index:Number||void 0,calcTempStyle:Function,calcShapeStyle:Function},data:function(){return{isMove:!1,isTransform:!1,anchorList:["left-top","left","left-bottom","bottom","right-bottom","right","right-top","top"]}},methods:{startMove:function(){this.isTransform||(this.isMove=!0,this.$emit("startMove",this.index))},endMove:function(){this.isTransform&&(this.isTransform=!1),this.isMove=!1},selectArea:function(){this.$emit("selectArea",this.index)},startTransform:function(t){this.isTransform=!0,this.$emit("startTransform",this.index,t.split("-"))}}},r,[],!1,null,null,null);a.options.__file="packages/box-selection/src/Box.vue";var s=a.exports;function c(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}function l(t){return function(t){if(Array.isArray(t))return f(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||d(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function u(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(t)))return;var i=[],n=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(i.push(a.value),!e||i.length!==e);n=!0);}catch(t){r=!0,o=t}finally{try{n||null==s.return||s.return()}finally{if(r)throw o}}return i}(t,e)||d(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t,e){if(t){if("string"==typeof t)return f(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Object"===i&&t.constructor&&(i=t.constructor.name),"Map"===i||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?f(t,e):void 0}}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,n=new Array(e);i<e;i++)n[i]=t[i];return n}var p={left:0,top:1,right:2,bottom:3},h={left:"X",right:"X",top:"Y",bottom:"Y"},v={name:"BoxSelection",components:{Box:s},props:{value:Array,disabled:{type:Boolean,default:!1},width:{type:Number,default:500},height:{type:Number,default:500}},data:function(){return{positionList:[],tempPosition:[],isNew:!1,canCreate:!1,isMove:!1,emitMove:!1,emitTransform:!1,isTransform:!1,canTransform:!1,location:[],currIndex:-1,rectWidth:0,rectHeight:0,id:0}},methods:{mouseDownHandle:function(t){if(this.disabled)return!1;if(!(this.isNew||this.isMove||this.isTransform)){var e=t.currentTarget,i=this.getOffset(t),n=i.offsetX,r=i.offsetY;this.tempPosition=[n,r],this.emitTransform?(this.isTransform=!0,this.tempPosition=this.positionList[this.currIndex].position.slice(),e.addEventListener("mousemove",this.transform,!1)):this.emitMove?(this.isMove=!0,e.addEventListener("mousemove",this.move,!1)):(this.isNew=!0,e.addEventListener("mousemove",this.dragMove,!1))}},mouseUpHandle:function(t){this.isNew&&this.endDrag(t),this.isMove&&this.endMove(t),this.isTransform&&this.endTransform(t)},dragMove:function(t){var e=this.getOffset(t),i=e.offsetX,n=e.offsetY,r=u(this.tempPosition,2),o=r[0],a=r[1];(this.isEffectiveDrag(this.tempPosition,{offsetX:i,offsetY:n})||this.canCreate)&&(this.canCreate=!0,this.tempPosition=[o,a,i,n])},endDrag:function(t){if(t.currentTarget.removeEventListener("mousemove",this.dragMove,!1),this.isNew=!1,this.canCreate){this.canCreate=!1;var e=this.calcPosition.apply(this,l(this.tempPosition)),i=this.id++,n=this.checkOverlap(e,void 0,this.overlapCallback);this.clearSelect(),this.positionList.push({overlap:n,id:i,position:e,selected:!0}),this.emitInput()}},startMove:function(t){this.currIndex=t,this.emitMove=!0,this.emitStartMove(t,this.positionList[t])},move:function(t){var e=this.getOffset(t),i=e.offsetX,n=e.offsetY,r=u(this.tempPosition,2),o=r[0],a=r[1];this.tempPosition=[i,n],this.moveArea([i-o,n-a],this.currIndex),this.emitMoving(this.currIndex,this.positionList[this.currIndex])},endMove:function(t){t.currentTarget.removeEventListener("mousemove",this.move,!1),this.isMove=!1,this.emitMove=!1,this.emitEndMove(this.currIndex,this.positionList[this.currIndex]),this.emitInput(),this.currentIndex=-1},moveArea:function(t,e){var i=u(t,2),n=i[0],r=i[1],o=this.positionList[e],a=o.position,s=(o.overlap,o.id),c=(o.selected,u(a,4)),l=c[0],d=c[1],f=c[2],p=c[3],h=l+n,v=f+n,m=d+r,g=p+r;h<0&&(h=0,v=f-l),v>this.rectWidth&&(h=l+this.rectWidth-f,v=this.rectWidth),m<0&&(m=0,g=p-d),g>this.rectHeight&&(m=d+this.rectHeight-p,g=this.rectHeight);var b=[h,m,v,g];o.position=b,o.overlap=this.checkOverlap(b,s,this.overlapCallback,this.recheckOverlap)},startTransform:function(t,e){this.emitTransform=!0,this.currIndex=t,this.location=e,this.emitStartTrans(t,this.positionList[t])},transform:function(t){var e=this.getOffset(t),i=this.tempPosition,n=this.location,r=this.currIndex,o=this.positionList[r],a=o.id;this.canTransform=!0;var s=this.setPosition(i,n,e);o.position=s,o.overlap=this.checkOverlap(this.calcPosition.apply(this,l(s)),a,this.overlapCallback,this.recheckOverlap),this.emitTrans(r,this.positionList[r])},endTransform:function(t){t.currentTarget.removeEventListener("mousemove",this.transform,!1);var e=this.currIndex,i=this.positionList[e],n=i.position;this.emitTransform=!1,this.isTransform=!1,this.canTransform=!1,this.location=[],i.position=this.calcPosition.apply(this,l(n)),this.emitEndTrans(e,this.positionList[e]),this.emitInput(),this.currIndex=-1},deleteSelect:function(){var t=this.positionList.findIndex((function(t){return t.selected}));this.remove(t),this.emitInput()},remove:function(t){if(-1===t)return!1;var e=this.positionList.splice(t,1)[0],i=e.position,n=e.overlap;this.positionList=this.positionList.filter((function(t){return!t.selected})),n&&this.checkOverlap(i,void 0,this.recheckOverlap)},isEffectiveDrag:function(t,e,i){if(void 0===i){var n=u(t,2),r=n[0],o=n[1],a=e.offsetX,s=e.offsetY;return Math.abs(r-a)>20||Math.abs(o-s)>20}var c=i.reduce((function(t,i){var n=p[i],r=e["offset".concat(h[i])];return t[n]=r,t}),{});return Object.entries(c).reduce((function(e,i){var n=u(i,2),r=n[0],o=n[1];return e||Math.abs(t[r]-o)>20}),!1)},setPosition:function(t,e,i){var n=e.reduce((function(t,e){var n=p[e],r=i["offset".concat(h[e])];return t[n]=r,t}),{});return Object.entries(n).forEach((function(e){var i=u(e,2),n=i[0],r=i[1];t[n]=r})),t.slice()},calcPosition:function(t,e,i,n){var r=u(t<i?[t,i]:[i,t],2);t=r[0],i=r[1];var o=u(e<n?[e,n]:[n,e],2);return[t,e=o[0],i,n=o[1]]},calcTempStyle:function(t){var e,i=u(t,4),n=i[0],r=i[1],o=i[2],a=i[3],s=n<o?"left":"right",l=r<a?"top":"bottom",d=n<o?n:this.rectWidth-n,f=r<a?r:this.rectHeight-r,p="".concat(Math.abs(a-r),"px"),h="".concat(Math.abs(o-n),"px");return c(e={},s,"".concat(d,"px")),c(e,l,"".concat(f,"px")),c(e,"height",p),c(e,"width",h),e},calcShapeStyle:function(t){var e=u(t,4),i=e[0],n=e[1],r=e[2],o=e[3];return{top:"".concat(n,"px"),left:"".concat(i,"px"),height:"".concat(o-n,"px"),width:"".concat(r-i,"px"),cursor:"move"}},getOffset:function(t){var e=this.$refs.container.getBoundingClientRect(),i=e.top,n=e.left;return{offsetX:t.clientX-n,offsetY:t.clientY-i}},getContainerRect:function(){var t=this.$refs.container;this.rectWidth=t.clientWidth,this.rectHeight=t.clientHeight},checkOverlap:function(t){for(var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,i=arguments.length>2?arguments[2]:void 0,n=arguments.length>3?arguments[3]:void 0,r=void 0!==e?this.positionList.filter((function(t){return t.id!==e})):this.positionList,o=[],a=[],s=!1,c=0;c<r.length;c++)this.overlap(t,r[c].position)?(s=!0,o.push(r[c])):a.push(r[c]);return i&&i(o),n&&n(a),s},overlap:function(t,e){var i=u(t,4),n=i[0],r=i[1],o=i[2],a=i[3],s=u(e,4),c=s[0],l=s[1],d=s[2],f=s[3];return!(o<=c||d<=n||a<=l||f<=r)},overlapCallback:function(t,e){t.forEach((function(t){t.overlap=!0,e&&e.add(t)}))},recheckOverlap:function(t){for(var e=this,i=t.filter((function(t){return t.overlap})),n=new Set,r=0;r<i.length;r++)if(!n.has(i[r])){var o=i[r],a=o.id,s=o.position;i[r].overlap=this.checkOverlap(s,a,(function(t){return e.overlapCallback(t,n)}))}},checkAllOverlap:function(){for(var t=this,e=new Set,i=this.positionList,n=0;n<i.length;n++){var r=i[n];if(!e.has(r)){var o=r.position,a=r.id;r.overlap=this.checkOverlap(o,a,(function(i){return t.overlapCallback(i,e)}))}}},firstRender:function(){var t,e=this,i=null!==(t=this.value)&&void 0!==t?t:[];this.positionList=i.map((function(t){return{position:t,selected:!1,overlap:!1,id:e.id++}})),this.checkAllOverlap()},selectIndex:function(t){for(var e=this.positionList,i=e.length,n=0;n<i;n++)e[n].selected=n===t},clearSelect:function(){for(var t=this.positionList,e=t.length,i=0;i<e;i++)t[i].selected=!1},emitInput:function(){var t=this.positionList.map((function(t){return t.position}));this.$emit("input",t)},emitStartMove:function(t,e){var i=e.position,n=e.overlap;this.$emit("movestart",{index:t,position:i,overlap:n})},emitMoving:function(t,e){var i=e.position,n=e.overlap;this.$emit("move",{index:t,position:i,overlap:n})},emitEndMove:function(t,e){var i=e.position,n=e.overlap;this.$emit("moveend",{index:t,position:i,overlap:n})},emitAdd:function(t){var e=t.position,i=t.overlap;this.$emit("add",{position:e,overlap:i})},emitDel:function(t){this.$emit("remove",t)},emitStartTrans:function(t,e){var i=e.position,n=e.overlap;this.$emit("transformstart",{index:t,position:i,overlap:n})},emitTrans:function(t,e){var i=e.position,n=e.overlap;this.$emit("transform",{index:t,position:i,overlap:n})},emitEndTrans:function(t,e){var i=e.position,n=e.overlap;this.$emit("transformend",{index:t,position:i,overlap:n})},validate:function(){for(var t=this.positionList,e=t.length,i=0;i<e;i++)if(t[i].overlap)return Promise.reject();return Promise.resolve()}},mounted:function(){this.getContainerRect(),this.firstRender()}},m=(i(1),o(v,n,[],!1,null,"34221ad6",null));m.options.__file="packages/box-selection/src/BoxSelection.vue";var g=m.exports;g.install=function(t){t.component(g.name,g)};var b=g,x=function(t){t.component(b.name,b)};void 0!==window&&window.Vue&&x(window.vue);e.default={BoxSelection:b,install:x}}]).default}));