"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[598],{9598:function(e,t,n){n.r(t),n.d(t,{c:function(){return l}});var r=n(889),a=Object.defineProperty,i=function(e,t){return a(e,"name",{value:t,configurable:!0})};function o(e,t){return t.forEach((function(t){t&&"string"!==typeof t&&!Array.isArray(t)&&Object.keys(t).forEach((function(n){if("default"!==n&&!(n in e)){var r=Object.getOwnPropertyDescriptor(t,n);Object.defineProperty(e,n,r.get?r:{enumerable:!0,get:function(){return t[n]}})}}))})),Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}i(o,"_mergeNamespaces");var s={exports:{}};!function(e){var t={pairs:"()[]{}''\"\"",closeBefore:")]}'\":;>",triples:"",explode:"[]{}"},n=e.Pos;function r(e,n){return"pairs"==n&&"string"==typeof e?e:"object"==typeof e&&null!=e[n]?e[n]:t[n]}e.defineOption("autoCloseBrackets",!1,(function(t,n,i){i&&i!=e.Init&&(t.removeKeyMap(a),t.state.closeBrackets=null),n&&(o(r(n,"pairs")),t.state.closeBrackets=n,t.addKeyMap(a))})),i(r,"getOption");var a={Backspace:c,Enter:u};function o(e){for(var t=0;t<e.length;t++){var n=e.charAt(t),r="'"+n+"'";a[r]||(a[r]=s(n))}}function s(e){return function(t){return p(t,e)}}function l(e){var t=e.state.closeBrackets;return!t||t.override?t:e.getModeAt(e.getCursor()).closeBrackets||t}function c(t){var a=l(t);if(!a||t.getOption("disableInput"))return e.Pass;for(var i=r(a,"pairs"),o=t.listSelections(),s=0;s<o.length;s++){if(!o[s].empty())return e.Pass;var c=d(t,o[s].head);if(!c||i.indexOf(c)%2!=0)return e.Pass}for(s=o.length-1;s>=0;s--){var u=o[s].head;t.replaceRange("",n(u.line,u.ch-1),n(u.line,u.ch+1),"+delete")}}function u(t){var n=l(t),a=n&&r(n,"explode");if(!a||t.getOption("disableInput"))return e.Pass;for(var i=t.listSelections(),o=0;o<i.length;o++){if(!i[o].empty())return e.Pass;var s=d(t,i[o].head);if(!s||a.indexOf(s)%2!=0)return e.Pass}t.operation((function(){var e=t.lineSeparator()||"\n";t.replaceSelection(e+e,null),f(t,-1),i=t.listSelections();for(var n=0;n<i.length;n++){var r=i[n].head.line;t.indentLine(r,null,!0),t.indentLine(r+1,null,!0)}}))}function f(e,t){for(var n=[],r=e.listSelections(),a=0,i=0;i<r.length;i++){var o=r[i];o.head==e.getCursor()&&(a=i);var s=o.head.ch||t>0?{line:o.head.line,ch:o.head.ch+t}:{line:o.head.line-1};n.push({anchor:s,head:s})}e.setSelections(n,a)}function h(t){var r=e.cmpPos(t.anchor,t.head)>0;return{anchor:new n(t.anchor.line,t.anchor.ch+(r?-1:1)),head:new n(t.head.line,t.head.ch+(r?1:-1))}}function p(t,a){var i=l(t);if(!i||t.getOption("disableInput"))return e.Pass;var o=r(i,"pairs"),s=o.indexOf(a);if(-1==s)return e.Pass;for(var c,u=r(i,"closeBefore"),p=r(i,"triples"),d=o.charAt(s+1)==a,v=t.listSelections(),b=s%2==0,y=0;y<v.length;y++){var k,S=v[y],O=S.head,P=t.getRange(O,n(O.line,O.ch+1));if(b&&!S.empty())k="surround";else if(!d&&b||P!=a)if(d&&O.ch>1&&p.indexOf(a)>=0&&t.getRange(n(O.line,O.ch-2),O)==a+a){if(O.ch>2&&/\bstring/.test(t.getTokenTypeAt(n(O.line,O.ch-2))))return e.Pass;k="addFour"}else if(d){var m=0==O.ch?" ":t.getRange(n(O.line,O.ch-1),O);if(e.isWordChar(P)||m==a||e.isWordChar(m))return e.Pass;k="both"}else{if(!b||!(0===P.length||/\s/.test(P)||u.indexOf(P)>-1))return e.Pass;k="both"}else k=d&&g(t,O)?"both":p.indexOf(a)>=0&&t.getRange(O,n(O.line,O.ch+3))==a+a+a?"skipThree":"skip";if(c){if(c!=k)return e.Pass}else c=k}var x=s%2?o.charAt(s-1):a,A=s%2?a:o.charAt(s+1);t.operation((function(){if("skip"==c)f(t,1);else if("skipThree"==c)f(t,3);else if("surround"==c){for(var e=t.getSelections(),n=0;n<e.length;n++)e[n]=x+e[n]+A;for(t.replaceSelections(e,"around"),e=t.listSelections().slice(),n=0;n<e.length;n++)e[n]=h(e[n]);t.setSelections(e)}else"both"==c?(t.replaceSelection(x+A,null),t.triggerElectric(x+A),f(t,-1)):"addFour"==c&&(t.replaceSelection(x+x+x+x,"before"),f(t,1))}))}function d(e,t){var r=e.getRange(n(t.line,t.ch-1),n(t.line,t.ch+1));return 2==r.length?r:null}function g(e,t){var r=e.getTokenAt(n(t.line,t.ch+1));return/\bstring/.test(r.type)&&r.start==t.ch&&(0==t.ch||!/\bstring/.test(e.getTokenTypeAt(t)))}i(o,"ensureBound"),o(t.pairs+"`"),i(s,"handler"),i(l,"getConfig"),i(c,"handleBackspace"),i(u,"handleEnter"),i(f,"moveSel"),i(h,"contractSelection"),i(p,"handleChar"),i(d,"charsAround"),i(g,"stringStartsAfter")}(r.a.exports);var l=o({__proto__:null,default:s.exports},[s.exports])}}]);
//# sourceMappingURL=598.b7c93e86.chunk.js.map