(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[10],{137:function(e,t,n){"use strict";n.r(t),n.d(t,"LoginCallback",(function(){return o}));var a=n(19),r=n(20),l=n(22),u=n(21),c=n(0),i=n.n(c),o=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(a.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"redirect",value:function(){var e=sessionStorage.getItem("returnUrl");e=e||"/",console.log("ReturnUrl: ",e),setTimeout(function(){this.props.history.push(e)}.bind(this),5e3)}},{key:"render",value:function(){var e=sessionStorage.getItem("auth_cookie"),t=JSON.parse(sessionStorage.getItem("userData"));return this.redirect(),i.a.createElement("div",null,i.a.createElement("h1",null,"Redirecting back to home page..."),i.a.createElement("h3",null,"LoggedIn User Details: "),i.a.createElement("br",null),i.a.createElement("p",null,i.a.createElement("b",null,"Name: ")," ",t.Name),i.a.createElement("p",null,i.a.createElement("b",null,"Email: ")," ",t.Email),i.a.createElement("p",null,i.a.createElement("b",null,"Token: ")," ",e))}}]),n}(i.a.Component);t.default=o}}]);
//# sourceMappingURL=10.bf88b89d.chunk.js.map