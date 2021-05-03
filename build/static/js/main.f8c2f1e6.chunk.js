(this.webpackJsonpadmin_profma=this.webpackJsonpadmin_profma||[]).push([[0],{31:function(e,t,n){},56:function(e,t,n){"use strict";n.r(t);var i,c=n(0),r=n.n(c),s=n(9),a=n.n(s),l=n(16),d=n(10),o=n(20),j=(n(31),n(22)),h=function(e,t){return Promise.resolve(fetch("".concat("http://194.87.145.192/graphql"),{method:"POST",mode:"cors",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}))},p=n(62),b=n(59),m=n(63),O=n(60),f=n(61),x=n(21),u=n(1),g=j.a.div(i||(i=Object(o.a)(["\n  height: 50px;\n  width: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: #eee;\n"]))),y=function(){var e="Master",t="Client",n=Object(c.useState)(""),i=Object(d.a)(n,2),r=i[0],s=i[1],a=Object(c.useState)(null),o=Object(d.a)(a,2),j=o[0],y=o[1],v=Object(c.useState)(!1),_=Object(d.a)(v,2),k=_[0],C=_[1],S=Object(c.useState)(""),w=Object(d.a)(S,2),T=w[0],I=w[1],N=Object(c.useState)(!1),E=Object(d.a)(N,2),A=E[0],B=E[1],F=Object(c.useState)(!1),M=Object(d.a)(F,2),P=(M[0],M[1]),q=function(e){C(!0),h({query:"query {users (type: ".concat(e,", first:",100,") { \n        data { \n          id type\n          profile {id city {id name} name email about_me}\n          master_appointments {\n            id date time status\n            offers {\n              description price_by_pack {duration price}\n              service {id name specialization {id name} photos {src}}\n            }\n            client {\n              profile {\n                name email\n              }\n            }\n          }\n          client_appointments {\n            id date time status\n            offers {\n              description price_by_pack {duration price}\n              service {id name specialization {id name} photos {src}}\n            }\n            master {\n              profile {\n                name email\n              }\n            }\n          }\n        } \n      }}")}).then((function(e){return e.json()})).then((function(e){y(e.data.users.data),C(!1)})).catch((function(e){alert("error"),C(!1)}))};Object(c.useEffect)((function(){s("clients"),q(t)}),[]),Object(c.useEffect)((function(){console.log(j,"-data")}),[j]);var z=function(e){return Object(u.jsxs)(p.a,Object(l.a)(Object(l.a)({},e),{},{size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0,children:[Object(u.jsx)(p.a.Header,{closeButton:!0,children:Object(u.jsxs)(p.a.Title,{id:"contained-modal-title-vcenter",children:[Object(u.jsx)("div",{children:"Appointments"}),"UserId: ",T.id," Name:","  ",T.profile?T.profile.name:"-"," ","  ","Email:",T.profile?T.profile.email:"-"]})}),Object(u.jsx)(p.a.Body,{children:Object(u.jsxs)(b.a,{striped:!0,bordered:!0,hover:!0,children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{children:"Id"}),Object(u.jsx)("th",{children:"Master/client"}),Object(u.jsx)("th",{children:"Date"}),Object(u.jsx)("th",{children:"Time"}),Object(u.jsx)("th",{children:"Status"}),Object(u.jsx)("th",{children:"Offers"})]})}),Object(u.jsx)("tbody",{children:A&&A.length&&A.map((function(e,t){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:e.id}),Object(u.jsx)("td",{children:e.client?e.client.profile?e.client.profile.name:"-":e.master.profile?e.master.profile.name:"-"}),Object(u.jsx)("td",{children:e.date}),Object(u.jsx)("td",{children:e.time.slice(0,5)}),Object(u.jsx)("td",{children:e.status}),Object(u.jsx)("td",{children:e.offers.length?e.offers.map((function(e,t){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:e.service.name}),Object(u.jsxs)("td",{children:[e.price_by_pack.duration," \u043c\u0438\u043d."]}),Object(u.jsxs)("td",{children:[e.price_by_pack.price," \u0440\u0443\u0431."]})]})})):"-"})]})}))})]})})]}))};return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(g,{onClick:function(){return P(!0)}}),Object(u.jsxs)(x.slide,{id:"sidebar",className:"my-menu",width:"200px",children:[Object(u.jsxs)(m.a,{style:{margin:"10px",width:"160px"},variant:"light",block:!0,onClick:function(){s("clients"),q(t)},active:"clients"===r,children:["\u041a\u043b\u0438\u0435\u043d\u0442\u044b"," ",j&&j.length&&"Client"===j[0].type&&"(".concat(j.length,")")]}),Object(u.jsxs)(m.a,{style:{margin:"10px",width:"160px"},variant:"light",block:!0,onClick:function(){s("masters"),q(e)},active:"masters"===r,children:["\u041c\u0430\u0441\u0442\u0435\u0440\u0430"," ",j&&j.length&&"Master"===j[0].type&&"(".concat(j.length,")")]})]}),Object(u.jsx)(O.a,{children:Object(u.jsxs)(b.a,{striped:!0,bordered:!0,hover:!0,style:{marginTop:"100px"},children:[Object(u.jsx)("thead",{children:Object(u.jsxs)("tr",{children:[Object(u.jsx)("th",{children:"Id"}),Object(u.jsx)("th",{children:"Name"}),Object(u.jsx)("th",{children:"About me"}),Object(u.jsx)("th",{children:"Email"}),Object(u.jsx)("th",{children:"City"}),Object(u.jsx)("th",{children:"Appointments"})]})}),Object(u.jsx)("tbody",{children:j&&j.length&&j.map((function(e,t){return Object(u.jsxs)("tr",{children:[Object(u.jsx)("td",{children:e.id}),Object(u.jsx)("td",{children:e.profile&&e.profile.name?e.profile.name:"-"}),Object(u.jsx)("td",{children:e.profile&&e.profile.about_me?e.profile.about_me:"-"}),Object(u.jsx)("td",{children:e.profile&&e.profile.email?e.profile.email:"-"}),Object(u.jsx)("td",{children:e.profile&&e.profile.city?e.profile.city.name:"-"}),Object(u.jsx)("td",{children:0!==e.client_appointments.length||0!==e.master_appointments.length?Object(u.jsx)(m.a,{variant:"warning",onClick:function(){B(0!==e.client_appointments.length?e.client_appointments:e.master_appointments),I(e)},children:e.client_appointments.length||e.master_appointments.length}):"-"})]},t)}))})]})}),Object(u.jsx)(z,{show:A,onHide:function(){return B(!1)}}),k&&Object(u.jsx)("div",{style:{display:"flex",height:"100vh",justifyContent:"center",alignItems:"center"},children:Object(u.jsx)(f.a,{animation:"border",role:"status",children:Object(u.jsx)("span",{className:"sr-only",children:"Loading..."})})})]})},v=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,64)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),i(e),c(e),r(e),s(e)}))};a.a.render(Object(u.jsx)(r.a.StrictMode,{children:Object(u.jsx)(y,{})}),document.getElementById("root")),v()}},[[56,1,2]]]);
//# sourceMappingURL=main.f8c2f1e6.chunk.js.map