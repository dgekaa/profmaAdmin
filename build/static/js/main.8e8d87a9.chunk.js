(this.webpackJsonpadmin_profma=this.webpackJsonpadmin_profma||[]).push([[0],{17:function(e,n,t){},23:function(e,n,t){"use strict";t.r(n);var i,c,r,a,s,l,d,o,p=t(1),j=t.n(p),h=t(9),m=t.n(h),x=t(4),b=t(2),f=(t(17),t(3)),u=function(e,n){return Promise.resolve(fetch("".concat("http://194.87.145.192/graphql"),{method:"POST",mode:"cors",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}))},O=t(0),g=f.a.div(i||(i=Object(b.a)(["\n    cursor: pointer;\n    display: flex;\n    border-bottom: 1px solid #eee;\n    padding: 10px;\n    &:hover {\n      background: rgba(111, 111, 111, 0.05);\n      transition: 0.3s ease background;\n    }\n    @media (max-width: 760px) {\n    }\n  "]))),y=f.a.span(c||(c=Object(b.a)(["\n    display: flex;\n    padding: 0 10px;\n    width: 100px;\n    justify-content: center;\n    @media (max-width: 760px) {\n    }\n  "]))),v=f.a.div(r||(r=Object(b.a)(["\n    padding: 5px;\n    display: flex;\n    width: 100%;\n    flex-direction: column;\n    background: rgba(32, 234, 77, 0.4);\n    @media (max-width: 760px) {\n    }\n  "]))),w=f.a.div(a||(a=Object(b.a)(["\n    background: #fff;\n    padding: 5px;\n    margin: 5px;\n    display: flex;\n    flex-direction: row;\n    padding: 0;\n    @media (max-width: 760px) {\n    }\n  "]))),_=f.a.span(s||(s=Object(b.a)(["\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    width: ",";\n    color: ",";\n    @media (max-width: 760px) {\n    }\n  "])),(function(e){var n=e.width;return n?n+"px":"100px"}),(function(e){var n=e.color;return n||""})),k=f.a.div(l||(l=Object(b.a)(["\n    width: 100px;\n    @media (max-width: 760px) {\n    }\n  "]))),S=f.a.div(d||(d=Object(b.a)(["\n    margin: 5px 0;\n    @media (max-width: 760px) {\n    }\n  "]))),T=f.a.p(o||(o=Object(b.a)(["\n    width: 120px;\n    margin: 0;\n    padding: 0;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    @media (max-width: 760px) {\n    }\n  "]))),E=function(){var e="Master",n="Client",t=Object(p.useState)(""),i=Object(x.a)(t,2),c=i[0],r=i[1],a=Object(p.useState)(""),s=Object(x.a)(a,2),l=s[0],d=s[1],o=Object(p.useState)(!0),j=Object(x.a)(o,2),h=j[0],m=j[1],b=Object(p.useState)(!0),f=Object(x.a)(b,2),E=f[0],C=f[1],M=function(e){"Master"===e?C(!0):m(!0),u({query:"query {users (type: ".concat(e,", first:",100,") { \n        data { \n          id type\n          profile {id city {id name} name email about_me}\n          master_appointments {\n            id date time status\n            offers {\n              description price_by_pack {duration price}\n              service {id name specialization {id name} photos {src}}\n            }\n            client {\n              profile {\n                name email\n              }\n            }\n          }\n          client_appointments {\n            id date time status\n            offers {\n              description price_by_pack {duration price}\n              service {id name specialization {id name} photos {src}}\n            }\n            master {\n              profile {\n                name email\n              }\n            }\n          }\n        } \n      }}")}).then((function(e){return e.json()})).then((function(n){"Master"===e?C(!1):m(!1),"Master"===e?r(n.data.users.data):d(n.data.users.data)})).catch((function(n){"Master"===e?C(!1):m(!1),console.log(n)}))};return Object(p.useEffect)((function(){M(n),M(e)}),[]),Object(p.useEffect)((function(){console.log(c,"-----masters"),console.log(l,"-----clients")}),[c,l]),Object(O.jsxs)("div",{className:"App",children:[Object(O.jsx)("h1",{children:"PROFMA"}),Object(O.jsx)("h2",{children:"\u041c\u0430\u0441\u0442\u0435\u0440\u0430"}),E&&Object(O.jsx)("div",{children:"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445..."}),c&&c.length&&c.map((function(e,n){return Object(O.jsxs)("div",{children:[Object(O.jsxs)(g,{onClick:function(n){e.master_appointments.length&&("flex"===n.currentTarget.nextElementSibling.style.display?n.currentTarget.nextElementSibling.style.display="none":n.currentTarget.nextElementSibling.style.display="flex")},children:[e.master_appointments.length?"!":"",Object(O.jsx)(y,{children:e.id||"-"}),Object(O.jsx)(y,{children:e.profile.name||"-"}),Object(O.jsx)(y,{children:e.profile.about_me||"-"}),Object(O.jsx)(y,{children:e.profile.email||"-"}),Object(O.jsx)(y,{children:e.profile.city?e.profile.city.name:"-"})]}),Object(O.jsx)("div",{style:{display:"none"},children:e.master_appointments.length&&Object(O.jsx)(v,{children:e.master_appointments.map((function(e,n){return Object(O.jsxs)(w,{children:[Object(O.jsx)(_,{width:30,color:"red",children:e.id}),Object(O.jsx)(_,{children:e.client.profile.name}),Object(O.jsx)(_,{children:e.client.profile.email||"-"}),Object(O.jsx)(_,{children:e.status}),Object(O.jsx)(_,{children:e.date}),Object(O.jsx)(_,{children:e.time}),Object(O.jsx)(k,{children:e.offers.length&&e.offers.map((function(e,n){return Object(O.jsxs)(S,{children:[Object(O.jsx)(T,{children:e.service.name}),Object(O.jsxs)(T,{children:[e.price_by_pack.price," \u0440\u0443\u0431.",e.price_by_pack.duration," \u043c\u0438\u043d."]})]})}))})]})}))})})]})})),Object(O.jsx)("h2",{children:"\u041a\u043b\u0438\u0435\u043d\u0442\u044b"}),h&&Object(O.jsx)("div",{children:"\u0418\u0434\u0435\u0442 \u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0434\u0430\u043d\u043d\u044b\u0445..."}),l&&l.length&&l.map((function(e,n){return Object(O.jsxs)("div",{children:[Object(O.jsxs)(g,{onClick:function(n){e.client_appointments.length&&("flex"===n.currentTarget.nextElementSibling.style.display?n.currentTarget.nextElementSibling.style.display="none":n.currentTarget.nextElementSibling.style.display="flex")},children:[e.client_appointments.length?"!":"",Object(O.jsx)(y,{children:e.id||"-"}),Object(O.jsx)(y,{children:e.profile?e.profile.name:"-"}),Object(O.jsx)(y,{children:e.profile?e.profile.about_me:"-"}),Object(O.jsx)(y,{children:e.profile?e.profile.email:"-"}),Object(O.jsx)(y,{children:e.profile&&e.profile.city?e.profile.city.name:"-"})]}),Object(O.jsx)("div",{style:{display:"none"},children:e.client_appointments.length&&Object(O.jsx)(v,{children:e.client_appointments.map((function(e,n){return Object(O.jsxs)(w,{children:[Object(O.jsx)(_,{width:30,color:"red",children:e.id}),Object(O.jsx)(_,{children:e.master.profile?e.master.profile.name:"-"}),Object(O.jsx)(_,{children:e.master.profile?e.master.profile.email:"-"}),Object(O.jsx)(_,{children:e.status}),Object(O.jsx)(_,{children:e.date}),Object(O.jsx)(_,{children:e.time}),Object(O.jsx)(k,{children:e.offers.length&&e.offers.map((function(e,n){return Object(O.jsxs)(S,{children:[Object(O.jsx)(T,{children:e.service.name}),Object(O.jsxs)(T,{children:[e.price_by_pack.price," \u0440\u0443\u0431.",e.price_by_pack.duration," \u043c\u0438\u043d."]})]})}))})]})}))})})]})}))]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,24)).then((function(n){var t=n.getCLS,i=n.getFID,c=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),i(e),c(e),r(e),a(e)}))};m.a.render(Object(O.jsx)(j.a.StrictMode,{children:Object(O.jsx)(E,{})}),document.getElementById("root")),C()}},[[23,1,2]]]);
//# sourceMappingURL=main.8e8d87a9.chunk.js.map