(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[998],{7630:function(e,t,r){Promise.resolve().then(r.bind(r,4881)),Promise.resolve().then(r.bind(r,6472)),Promise.resolve().then(r.bind(r,9853))},180:function(e,t,r){"use strict";r.d(t,{Bs:function(){return a},o4:function(){return l},qs:function(){return s}});var n=r(2580);let s=async(e,t)=>(await n.Z.post("/account/signin",{email:e,password:t})).data,a=async e=>(await n.Z.post("/account",{email:e.email,password:e.password,otp:e.otp,name:e.name,phone:e.phone,address:e.address})).data,l=async e=>{let t={name:e.name,phone:e.phone,address:e.address,email:e.email,userId:e.userId,total:e.total,listProduct:e.listProduct};return(await n.Z.post("/cart",t)).data}},6472:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return O}});var n=r(7437),s=r(2265),a=r(304),l=r(592),i=r(2757),c=r(9236),o=r(6285),d=r(828),m=r(703),h=r(6534),u=r(2782),x=r(248),f=r(1270),p=r(2670),g=r(5752),j=r(9259),b=r(2169);let v=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)(g.fC,{ref:t,className:(0,b.cn)("peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",r),...s,children:(0,n.jsx)(g.z$,{className:(0,b.cn)("flex items-center justify-center text-current"),children:(0,n.jsx)(j.Z,{className:"h-4 w-4"})})})});v.displayName=g.fC.displayName;var N=r(146),y=r(9497),w=r(180),k=r(5362);let C=k.fC,I=k.xz,S=s.forwardRef((e,t)=>{let{className:r,align:s="center",sideOffset:a=4,...l}=e;return(0,n.jsx)(k.VY,{ref:t,align:s,sideOffset:a,className:(0,b.cn)("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",r),...l})});S.displayName=k.VY.displayName;var R=r(6910),Z=r(8792),F=r(7907);let z=["Giỏ h\xe0ng","Th\xf4ng tin đặt h\xe0ng","Phương thức thanh to\xe1n","Ho\xe0n th\xe0nh"],L=x.z.object({email:x.z.string().email({message:"Email kh\xf4ng hợp lệ"}).max(50,{message:"Tối đa 50 k\xfd tự"}).refine(e=>/^[a-zA-Z0-9@._-]*$/.test(e),{message:"Chỉ chấp nhận k\xfd tự kh\xf4ng dấu kh\xf4ng khoảng trắng v\xe0 c\xe1c k\xfd tự đặc biệt của email"}),name:x.z.string().min(3).max(20,{message:"T\xean kh\xf4ng qu\xe1 20 k\xfd tự"}),phone:x.z.string().min(8).max(100,{message:"Số điện thoại kh\xf4ng qu\xe1 13 k\xfd tự"}),address:x.z.string().min(3).max(13,{message:"địa chỉ kh\xf4ng qu\xe1 100 k\xfd tự"})});function O(){let[e,t]=s.useState(0),[r,x]=s.useState({}),[g,j]=s.useState(!1),[b,k]=s.useState(!1),[O,P]=s.useState(),_=(0,d.I0)(),B=(0,d.v9)(e=>e.checkCartLocal.arrayCart),T=(0,F.useRouter)();(0,s.useEffect)(()=>{N.Z.get("userToken")||T.push("/checkLogin")},[]);let E=(0,p.cI)({resolver:(0,f.F)(L),defaultValues:{email:"",name:"",phone:"",address:""}}),G=async()=>{var e;j(!0);let t=null!==(e=localStorage.getItem("userID"))&&void 0!==e?e:"",r=B.reduce((e,t)=>(t&&"number"==typeof t.total&&(e.acc+=t.total),e),{acc:0}).acc.toString(),n={userId:t,name:null==O?void 0:O.name,email:null==O?void 0:O.email,address:null==O?void 0:O.address,phone:null==O?void 0:O.phone,total:r,listProduct:B};try{await (0,w.o4)(n),j(!1),k(!1),V()}catch(e){j(!1),k(!0),V()}},J=()=>z.length,M=()=>Object.keys(r).length,q=()=>e===J()-1,H=()=>M()===J(),W=()=>{t(q()&&!H()?z.findIndex((e,t)=>!(t in r)):e+1)},A=(e,n)=>()=>{0===n?t(n):r[n-1]&&t(n)},V=()=>{r[e]=!0,x(r),W()},X=e=>{_((0,h.Cn)(e))},D=B.reduce((e,t)=>(t&&"number"==typeof t.total&&(e.acc+=t.total),e),{acc:0}).acc.toString();return(0,n.jsxs)(a.Z,{sx:{width:"70%",margin:"auto"},children:[(0,n.jsx)(l.Z,{nonLinear:!0,activeStep:e,children:z.map((e,t)=>(0,n.jsx)(i.Z,{completed:r[t],children:(0,n.jsx)(c.Z,{color:"inherit",onClick:A(e,t),children:e})},e))}),(0,n.jsx)("div",{children:1===e?(0,n.jsxs)("section",{children:[(0,n.jsx)("h2",{className:"text-2xl font-semibold text-[#1b1b1bc9]",children:"Th\xf4ng tin đặt h\xe0ng"}),(0,n.jsx)("div",{className:"mt-8",children:(0,n.jsx)("div",{className:"flow-root",children:B.length>0?(0,n.jsx)(n.Fragment,{children:(0,n.jsx)(y.l0,{...E,children:(0,n.jsxs)("form",{onSubmit:E.handleSubmit(e=>{V(),P(e)}),className:"space-y-2",children:[(0,n.jsxs)("div",{className:" flex",children:[(0,n.jsx)(y.Wi,{control:E.control,name:"name",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"text-left text-2xl w-2/4 px-2",children:[(0,n.jsx)(y.lX,{children:"Họ v\xe0 t\xean"}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(u.I,{placeholder:"Họ v\xe0 t\xean",...t})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsx)(y.Wi,{control:E.control,name:"phone",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"text-left text-2xl w-2/4 px-2",children:[(0,n.jsx)(y.lX,{children:"Số điện thoại"}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(u.I,{placeholder:"Số điện thoại",...t})}),(0,n.jsx)(y.zG,{})]})}})]}),(0,n.jsx)(y.Wi,{control:E.control,name:"email",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"text-left text-2xl ",children:[(0,n.jsx)(y.lX,{children:"Email"}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(u.I,{placeholder:"Email",...t})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsx)(y.Wi,{control:E.control,name:"address",render:e=>{let{field:t}=e;return(0,n.jsxs)(y.xJ,{className:"text-left text-2xl",children:[(0,n.jsx)(y.lX,{children:"Địa chỉ"}),(0,n.jsx)(y.NI,{children:(0,n.jsx)(u.I,{placeholder:"Địa chỉ",...t})}),(0,n.jsx)(y.zG,{})]})}}),(0,n.jsx)(o.Z,{type:"submit",color:"success",className:"float-right h-14 rounded-sm font-medium bg-black hover:bg-slate-800 text-white",children:"Chuyển tiếp"})]})})}):(0,n.jsx)("div",{className:"text-center py-6",children:(0,n.jsx)("span",{children:"Kh\xf4ng c\xf3 sản phẩm n\xe0o trong giỏ h\xe0ng "})})})})]}):2===e?(0,n.jsxs)("section",{children:[(0,n.jsx)("h2",{className:"text-2xl font-semibold text-[#1b1b1bc9] mb-8",children:"Phương thức thanh to\xe1n"}),(0,n.jsxs)(C,{children:[(0,n.jsx)(I,{children:(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)(v,{id:"terms1",disabled:!0}),(0,n.jsxs)("div",{className:"pl-2 grid gap-1.5 leading-none",children:[(0,n.jsx)("label",{htmlFor:"terms1",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Thanh to\xe1n Online"}),(0,n.jsx)("p",{className:"text-sm text-muted-foreground",children:"Thanh to\xe1n bằng phương thức banking"})]})]})}),(0,n.jsx)(S,{children:"Chưa \xe1p dụng phương thức thanh to\xe1n Online vui l\xf2ng thử lại sau"})]}),(0,n.jsxs)("div",{className:"flex items-center",children:[(0,n.jsx)(v,{id:"terms1"}),(0,n.jsxs)("div",{className:"pl-2 grid gap-1.5 leading-none mt-4",children:[(0,n.jsx)("label",{htmlFor:"terms1",className:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",children:"Thanh to\xe1n trực tiếp"}),(0,n.jsx)("p",{className:"text-sm text-muted-foreground",children:"Thanh to\xe1n khi nh\xe2n vi\xean giao đến nh\xe0 bạn"})]})]}),(0,n.jsx)(o.Z,{color:"success",className:"float-right h-14 rounded-sm font-medium bg-black hover:bg-slate-800 text-white",onClick:G,children:"Chuyển tiếp"})]}):3===e?!0===b?(0,n.jsxs)("div",{className:"flex flex-col justify-center items-center text-center  h-[300px]",children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",className:"w-16 h-16 text-red-400",children:(0,n.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"})}),(0,n.jsx)("span",{className:"text-xl text-red-400",children:"Đặt h\xe0ng thất bại"}),(0,n.jsxs)("p",{className:"text-lg",children:["Vui l\xf2ng li\xean hệ với ch\xfang t\xf4i để giải quyết lỗi qua hotline hoặc email"," ",(0,n.jsx)(Z.default,{href:"mailto:vucuongtuan03@gmail.com",children:(0,n.jsx)("b",{children:(0,n.jsx)("i",{children:"vucuongtuan03@gmail.com"})})})]})]}):(0,n.jsx)("div",{className:"flex flex-col justify-center items-center text-2xl  h-[300px]",children:!0===g?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(R.Z,{color:"success"}),(0,n.jsx)("span",{children:"Đang xử l\xfd ..."})]}):(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",className:"w-16 h-16 text-green-500",children:(0,n.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m4.5 12.75 6 6 9-13.5"})}),(0,n.jsx)("span",{children:"Đặt h\xe0ng th\xe0nh c\xf4ng"})]})}):(0,n.jsx)("section",{children:(0,n.jsx)("div",{className:"mt-8",children:(0,n.jsx)("div",{className:"flow-root",children:B.length>0?(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("div",{role:"list",className:"my-1 px-4 rounded-md shadow-md h-[300px] divide-y divide-gray-200 ".concat(B.length>=3?"overflow-y-scroll":""),children:B.map(e=>{let t=e.total.toString();return(0,n.jsxs)("div",{className:"flex py-6",children:[(0,n.jsx)("div",{className:"h-24 w-24 relative flex-shrink-0 overflow-hidden rounded-md border border-gray-200",children:(0,n.jsx)(m.default,{height:200,width:200,src:e.thumbnail,alt:e.description,className:"h-full w-full object-contain object-center"})}),(0,n.jsxs)("div",{className:"ml-4 flex flex-1 flex-col",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("div",{className:"flex justify-between text-base font-medium text-gray-900",children:(0,n.jsx)("h3",{children:e.name})}),(0,n.jsx)("p",{className:"mt-1 text-sm text-gray-500",children:e.color})]}),(0,n.jsxs)("div",{className:"flex flex-1 items-end justify-between text-sm",children:[(0,n.jsxs)("p",{className:"text-gray-500",children:["Gi\xe1 ",t.replace(/\B(?=(\d{3})+(?!\d))/g,"."),"đ"]}),(0,n.jsx)("div",{className:"flex",children:(0,n.jsx)("button",{type:"button",className:"font-medium text-indigo-600 hover:text-indigo-500",onClick:()=>X(e._id),children:"Remove"})})]})]})]},e._id)})}),(0,n.jsxs)("div",{className:"border-t  w-full  flex justify-between items-center  h-[100px] shadow-lg border-gray-200 px-4 py-6 sm:px-6",children:[(0,n.jsxs)("div",{className:"float-left ",children:[(0,n.jsx)("div",{className:" text-base font-medium text-gray-900 ",children:(0,n.jsx)("p",{children:"Tổng gi\xe1 Sản phẩm"})}),(0,n.jsxs)("p",{className:"mt-0.5 text-xl text-gray-500 float-left ",children:[D.replace(/\B(?=(\d{3})+(?!\d))/g,".")," đ"]})]}),(0,n.jsx)(o.Z,{color:"success",className:"float-right h-14 rounded-sm font-medium bg-black hover:bg-slate-800 text-white",onClick:V,children:"Chuyển tiếp"})]})]}):(0,n.jsx)("div",{className:"text-center py-6",children:(0,n.jsx)("span",{children:"Kh\xf4ng c\xf3 sản phẩm n\xe0o trong giỏ h\xe0ng "})})})})})})]})}},9853:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return x}});var n=r(7437),s=r(2265),a=r(9143),l=r(7805),i=(r(9230),r(2169));let c=s.forwardRef((e,t)=>{let{...r}=e;return(0,n.jsx)("nav",{ref:t,"aria-label":"breadcrumb",...r})});c.displayName="Breadcrumb";let o=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("ol",{ref:t,className:(0,i.cn)("flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",r),...s})});o.displayName="BreadcrumbList";let d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("li",{ref:t,className:(0,i.cn)("inline-flex items-center gap-1.5",r),...s})});d.displayName="BreadcrumbItem";let m=s.forwardRef((e,t)=>{let{asChild:r,className:s,...l}=e,c=r?a.g7:"a";return(0,n.jsx)(c,{ref:t,className:(0,i.cn)("transition-colors hover:text-foreground",s),...l})});m.displayName="BreadcrumbLink",s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)("span",{ref:t,role:"link","aria-disabled":"true","aria-current":"page",className:(0,i.cn)("font-normal text-foreground",r),...s})}).displayName="BreadcrumbPage";let h=e=>{let{children:t,className:r,...s}=e;return(0,n.jsx)("li",{role:"presentation","aria-hidden":"true",className:(0,i.cn)("[&>svg]:size-3.5",r),...s,children:null!=t?t:(0,n.jsx)(l.Z,{})})};h.displayName="BreadcrumbSeparator";var u=r(7907);function x(e){let{nameb:t}=e,[r,a]=s.useState(""),l=(0,u.usePathname)();return s.useEffect(()=>{if("/product/laptop"===l)a("laptop");else if("/product/chuot"===l)a("chuot");else{if("/product/ban-phim"!==l)return a("/");a("ban-phim")}},[l]),(0,n.jsx)(c,{className:"py-3 ",children:(0,n.jsxs)(o,{children:[(0,n.jsx)(d,{children:(0,n.jsx)(m,{href:"/",children:"Home"})}),(0,n.jsx)(h,{}),(0,n.jsx)(d,{children:t?(0,n.jsx)("h1",{children:t}):(0,n.jsx)(m,{href:"/product/"+r,children:(0,n.jsx)("h1",{children:r})})})]})})}},9497:function(e,t,r){"use strict";r.d(t,{l0:function(){return m},NI:function(){return j},Wi:function(){return u},xJ:function(){return p},lX:function(){return g},zG:function(){return b}});var n=r(7437),s=r(2265),a=r(9143),l=r(2670),i=r(2169),c=r(4602);let o=(0,r(7742).j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),d=s.forwardRef((e,t)=>{let{className:r,...s}=e;return(0,n.jsx)(c.f,{ref:t,className:(0,i.cn)(o(),r),...s})});d.displayName=c.f.displayName;let m=l.RV,h=s.createContext({}),u=e=>{let{...t}=e;return(0,n.jsx)(h.Provider,{value:{name:t.name},children:(0,n.jsx)(l.Qr,{...t})})},x=()=>{let e=s.useContext(h),t=s.useContext(f),{getFieldState:r,formState:n}=(0,l.Gc)(),a=r(e.name,n);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=t;return{id:i,name:e.name,formItemId:"".concat(i,"-form-item"),formDescriptionId:"".concat(i,"-form-item-description"),formMessageId:"".concat(i,"-form-item-message"),...a}},f=s.createContext({}),p=s.forwardRef((e,t)=>{let{className:r,...a}=e,l=s.useId();return(0,n.jsx)(f.Provider,{value:{id:l},children:(0,n.jsx)("div",{ref:t,className:(0,i.cn)("space-y-2",r),...a})})});p.displayName="FormItem";let g=s.forwardRef((e,t)=>{let{className:r,...s}=e,{error:a,formItemId:l}=x();return(0,n.jsx)(d,{ref:t,className:(0,i.cn)(a&&"text-destructive",r),htmlFor:l,...s})});g.displayName="FormLabel";let j=s.forwardRef((e,t)=>{let{...r}=e,{error:s,formItemId:l,formDescriptionId:i,formMessageId:c}=x();return(0,n.jsx)(a.g7,{ref:t,id:l,"aria-describedby":s?"".concat(i," ").concat(c):"".concat(i),"aria-invalid":!!s,...r})});j.displayName="FormControl",s.forwardRef((e,t)=>{let{className:r,...s}=e,{formDescriptionId:a}=x();return(0,n.jsx)("p",{ref:t,id:a,className:(0,i.cn)("text-sm text-muted-foreground",r),...s})}).displayName="FormDescription";let b=s.forwardRef((e,t)=>{let{className:r,children:s,...a}=e,{error:l,formMessageId:c}=x(),o=l?String(null==l?void 0:l.message):s;return o?(0,n.jsx)("p",{ref:t,id:c,className:(0,i.cn)("text-sm font-medium text-destructive",r),...a,children:o}):null});b.displayName="FormMessage"},2782:function(e,t,r){"use strict";r.d(t,{I:function(){return l}});var n=r(7437),s=r(2265),a=r(2169);let l=s.forwardRef((e,t)=>{let{className:r,type:s,...l}=e;return(0,n.jsx)("input",{type:s,className:(0,a.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",r),ref:t,...l})});l.displayName="Input"},6534:function(e,t,r){"use strict";r.d(t,{Cn:function(){return i},Nc:function(){return s},Rf:function(){return a}});let n=(0,r(5972).oM)({name:"CHECK_LOCAL_CART",initialState:{isOpenModalCart:!1,checkCartLocal:!1,arrayCart:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]},reducers:{setCheckCartLocal:(e,t)=>{e.checkCartLocal=t.payload},setArrayCart:(e,t)=>{e.arrayCart=[...e.arrayCart,t.payload],localStorage.setItem("cartItems",JSON.stringify(e.arrayCart))},removeItemFromCart:(e,t)=>{let r=e.arrayCart.filter(e=>e._id!==t.payload);e.arrayCart=r,localStorage.setItem("cartItems",JSON.stringify(r))},setIsOpenModalCart:(e,t)=>{e.isOpenModalCart=t.payload}}}),{setCheckCartLocal:s,setArrayCart:a,setIsOpenModalCart:l,removeItemFromCart:i}=n.actions;t.ZP=n.reducer},2169:function(e,t,r){"use strict";r.d(t,{cn:function(){return a}});var n=r(3167),s=r(1367);function a(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return(0,s.m6)((0,n.W)(t))}},2580:function(e,t,r){"use strict";var n=r(7908);class s{constructor(){this.instance=n.Z.create({baseURL:"https://vtc-be-laptop.onrender.com"})}}let a=new s().instance;t.Z=a}},function(e){e.O(0,[150,749,561,203,250,193,40,743,209,654,971,69,744],function(){return e(e.s=7630)}),_N_E=e.O()}]);