(this["webpackJsonpmsw-example"]=this["webpackJsonpmsw-example"]||[]).push([[4],{82:function(r,t,e){"use strict";e.r(t),e.d(t,"mswWorker",(function(){return d}));var n={};e.r(n),e.d(n,"login",(function(){return c})),e.d(n,"getUserSuccess",(function(){return a})),e.d(n,"getUserFailed",(function(){return i})),e.d(n,"getUserError",(function(){return f}));var s=e(56),u=e(66),o=e(51),c=o.c.post("/login",(function(r,t,e){return t(e.status(200))})),a=o.c.get("/user",(function(r,t,e){return t(e.status(200),e.json({username:"admin"}))})),i=o.c.get("/user",(function(r,t,e){return t(e.status(403),e.json({message:"Not authorized"}))})),f=o.c.get("/user",(function(r,t,e){return t.networkError("Network Error")})),p=Object(s.a)(Object.values(n)),d=u.a.apply(void 0,Object(s.a)(p))}}]);
//# sourceMappingURL=4.8d907309.chunk.js.map