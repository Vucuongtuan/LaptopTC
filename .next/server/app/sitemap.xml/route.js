"use strict";(()=>{var e={};e.id=717,e.ids=[717],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},18508:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>w,originalPathname:()=>A,patchFetch:()=>C,requestAsyncStorage:()=>h,routeModule:()=>y,serverHooks:()=>g,staticGenerationAsyncStorage:()=>v,staticGenerationBailout:()=>x});var a={};r.r(a),r.d(a,{default:()=>u});var o={};r.r(o),r.d(o,{GET:()=>m});var n=r(95419),i=r(69108),l=r(99678),s=r(13022);function u(){return[{url:"https://laptop-tc-rho.vercel.app/",lastModified:new Date,changeFrequency:"yearly",priority:1},{url:"https://laptop-tc-rho.vercel.app/product/laptop",lastModified:new Date,changeFrequency:"monthly",priority:.8},{url:"https://laptop-tc-rho.vercel.app/product/chuot",lastModified:new Date,changeFrequency:"weekly",priority:.8},{url:"https://laptop-tc-rho.vercel.app/product/banphim",lastModified:new Date,changeFrequency:"weekly",priority:.8}]}var p=r(57252);let c={...a},f=c.default,d=c.generateSitemaps;if("function"!=typeof f)throw Error('Default export is missing in "C:\\Users\\Admin\\Documents\\GitHub\\LaptopTC\\src\\app\\sitemap.ts"');async function m(e,t){let r;let{__metadata_id__:a,...o}=t.params||{},n=d?await d():null;if(n&&null==(r=n.find(e=>{let t=e.id.toString();return(t+=".xml")===a})?.id))return new s.NextResponse("Not Found",{status:404});let i=await f({id:r}),l=(0,p.resolveRouteData)(i,"sitemap");return new s.NextResponse(l,{headers:{"Content-Type":"application/xml","Cache-Control":"public, max-age=0, must-revalidate"}})}let y=new n.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/sitemap.xml/route",pathname:"/sitemap.xml",filename:"sitemap",bundlePath:"app/sitemap.xml/route"},resolvedPagePath:"next-metadata-route-loader?page=%2Fsitemap.xml%2Froute&filePath=C%3A%5CUsers%5CAdmin%5CDocuments%5CGitHub%5CLaptopTC%5Csrc%5Capp%5Csitemap.ts&isDynamic=1!?__next_metadata_route__",nextConfigOutput:"",userland:o}),{requestAsyncStorage:h,staticGenerationAsyncStorage:v,serverHooks:g,headerHooks:w,staticGenerationBailout:x}=y,A="/sitemap.xml/route";function C(){return(0,l.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:v})}},57252:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{resolveRobots:function(){return o},resolveSitemap:function(){return n},resolveManifest:function(){return i},resolveRouteData:function(){return l}});let a=r(79926);function o(e){let t="";for(let r of Array.isArray(e.rules)?e.rules:[e.rules]){for(let e of(0,a.resolveArray)(r.userAgent||["*"]))t+=`User-Agent: ${e}
`;if(r.allow)for(let e of(0,a.resolveArray)(r.allow))t+=`Allow: ${e}
`;if(r.disallow)for(let e of(0,a.resolveArray)(r.disallow))t+=`Disallow: ${e}
`;r.crawlDelay&&(t+=`Crawl-delay: ${r.crawlDelay}
`),t+="\n"}return e.host&&(t+=`Host: ${e.host}
`),e.sitemap&&(0,a.resolveArray)(e.sitemap).forEach(e=>{t+=`Sitemap: ${e}
`}),t}function n(e){let t="";for(let r of(t+='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n',e)){if(t+=`<url>
<loc>${r.url}</loc>
`,r.lastModified){let e=r.lastModified instanceof Date?r.lastModified.toISOString():r.lastModified;t+=`<lastmod>${e}</lastmod>
`}r.changeFrequency&&(t+=`<changefreq>${r.changeFrequency}</changefreq>
`),"number"==typeof r.priority&&(t+=`<priority>${r.priority}</priority>
`),t+="</url>\n"}return t+"</urlset>\n"}function i(e){return JSON.stringify(e)}function l(e,t){return"robots"===t?o(e):"sitemap"===t?n(e):"manifest"===t?i(e):""}},79926:(e,t)=>{function r(e){return Array.isArray(e)?e:[e]}function a(e){if(null!=e)return r(e)}Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{resolveAsArrayOrUndefined:function(){return a},resolveArray:function(){return r}})}};var t=require("../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[638,5],()=>r(18508));module.exports=a})();