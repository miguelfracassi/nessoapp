const P={cafecomleite:{n:"Café com Leite",d:"café + leite",pour:"/assets/cafecomleite.png",img:"/assets/cafecomleite_cup.png",cl:"s1"},cappucino:{n:"Cappucino",d:"espresso + leite + canela",pour:"/assets/cappucino.png",img:"/assets/cappucino.png",cl:"s2"}};
const SZ=[["Pequeno",10,26],["Médio",15,34],["Grande",20,42]],LOJA="Loja Praça Comidas",END="Rua José Estanislau de Oliveira, São Pedro.";
const IC={cup:'<path d="M6 8h12l-1.4 12.2a1.5 1.5 0 0 1-1.5 1.3H8.9a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M5 5h14v3H5z"/><path d="M12 5V2.5"/>',
ice:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/>',noice:'<path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12L4 7.5"/><path d="M3 3l18 18" stroke-width="2.4"/>',
bag:'<path d="M5.5 8h13l1 12.5h-15z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',card:'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><path d="M3 10h18M7 15h4"/>',
pix:'<path d="M12 2.8l4.6 4.6a2 2 0 0 1 0 2.8L12 12 7.4 10.2a2 2 0 0 1 0-2.8z"/><path d="M12 21.2l4.6-4.6a2 2 0 0 0 0-2.8L12 12l-4.6 1.8a2 2 0 0 0 0 2.8z"/><path d="M2.8 12l2.6-2.6M2.8 12l2.6 2.6M21.2 12l-2.6-2.6M21.2 12l-2.6 2.6"/>',
pin:'<path d="M12 21.5s7-6 7-11.5a7 7 0 0 0-14 0c0 5.5 7 11.5 7 11.5z"/><circle cx="12" cy="10" r="2.5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
check:'<path d="M4.5 12.5l5 5L19.5 7"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6 8-6s7 1.5 8 6"/>',store:'<path d="M4 9l1.5-5h13L20 9M4 9v11h16V9M4 9c0 2 3 2 4 0 1 2 3 2 4 0 1 2 3 2 4 0 1 2 4 2 4 0M10 20v-5h4v5"/>',print:'<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>'};
const I=(n,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:""}>${IC[n]}</svg>`;
const R=v=>"R$"+Number(v).toFixed(2).replace(".",",");
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
const sv=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let cart=ld("cart",[]),nome=ld("nome",""),pg="",tam="Médio",tipo=new URLSearchParams(location.search).get("tipo")=="semgelo"?"Sem Gelo":"Gelado";
const tot=()=>cart.reduce((a,i)=>a+i.preco,0);
const hd=s=>`<div class="hd ${s?"s":""}"><a href="/"><img class="lg" src="/assets/logo-white.png" alt="NESO"></a><nav><a href="/">Home</a><a href="/#menu">Menu</a><a href="/lojas/">Loja</a><a class="cb" id="cb" href="/carrinho/">${I("bag")}<b>${cart.length}</b></a></nav></div>`;
const stp=n=>`<div class="stepper">${["Carrinho","Loja","Nome","Pagamento"].map((s,i)=>`<span class="${i<n?"ok":i==n?"on":""}">${i<n?I("check"):""}${s}</span>`).join("")}</div>`;
const MQ=`<div class="mq"><div>${Array(10).fill(`<span>NESO COFFEE SHOP &amp; PASTRIES</span>${I("cup")}`).join("")}</div></div>`;
const fx=(n,st)=>`<div class="fx" style="${st}">${I(n)}</div>`;
const V={
home:()=>`<div class="hero">${hd()}<div class="glow"></div>${fx("ice","top:24%;left:12%;animation-delay:-1s")}${fx("ice","top:62%;left:30%;animation-delay:-3s;scale:.7")}${fx("cup","top:20%;right:14%;animation-delay:-2s;scale:.8")}${fx("ice","top:58%;right:22%;animation-delay:-4s")}
<div class="t"><div class="big" data-px="-.12">PEÇA</div><div><div class="big" data-px=".12">CAFÉ</div><span class="sc">bem-vindo</span></div></div><img class="cup" src="${P.cafecomleite.pour}" alt="">
<svg class="wave" viewBox="0 0 1440 70" preserveAspectRatio="none"><path fill="#F6EFE4" d="M0 40c240 40 480 40 720 10s480-40 720 0v20H0z"/></svg></div>${MQ}
<div class="sec" id="menu"><div class="top rv"><div><h2>Menu</h2><div class="sub">drinks</div></div><a class="pill" href="/carrinho/">${I("bag")} meu carrinho</a></div>
<div class="pcs">${Object.entries(P).map(([k,v],i)=>`<a class="bc ${v.cl} rv" style="transition-delay:${i*.15}s" href="/produtos/${k}/"><div class="pic"><img src="${v.img}" alt=""></div><h3>${v.n}</h3><p>${v.d}</p>
<div class="tg"><span>${I("ice")} Gelado</span><span>${I("noice")} Sem Gelo</span></div><div class="sz">${SZ.map(([s,p,z])=>`<div>${I("cup",z-6)}<b>${R(p)}</b>${s}</div>`).join("")}</div>
<div class="go"><span>a partir de<br><b>${R(10)}</b></span><i>${I("arrow",26)}</i></div></a>`).join("")}</div></div>
<div class="sec"><div class="top rv"><div><h2>Como funciona</h2><div class="sub">simples e rápido</div></div></div><div class="stp rv"><div>${I("cup")}<h3>1. Escolha</h3><p>Café com leite ou cappucino, gelado ou sem gelo, no tamanho que quiser.</p></div><div>${I("card")}<h3>2. Pague</h3><p>Débito, crédito ou pix, direto no site.</p></div><div>${I("clock")}<h3>3. Retire</h3><p>Seu pedido fica pronto em até 10 minutos na loja.</p></div></div></div>
<div class="sec"><div class="loja"><div class="im rv"><img src="/assets/copos.jpg" alt=""></div><div class="rv"><h2>Retire na loja</h2><div class="sub">peça e passe aqui</div><div class="ad">${I("pin")}<span><b>${LOJA}</b><br>${END}</span></div><a class="pill" href="/produtos/cappucino/">Fazer pedido ${I("arrow")}</a></div></div></div>
<footer><img src="/assets/logo-white.png" alt="NESO"><span>${LOJA} · ${END}</span></footer>`,
produto:k=>{const v=P[k];return hd(1)+`<div class="pg" style="max-width:1000px"><div class="pd"><div class="ph ${v.cl}"><img src="${v.pour}" alt=""></div><div><h1>${v.n}</h1><p style="color:var(--mut);margin:6px 0 0">${v.d}</p>
<div class="lb">Escolha</div>${["Gelado","Sem Gelo"].map(t=>`<button class="opt ${tipo==t?"on":""}" onclick="tipo='${t}';page()"><span>${I(t=="Gelado"?"ice":"noice",24)} ${t}</span>${tipo==t?I("check"):""}</button>`).join("")}
<div class="lb">Tamanho</div>${SZ.map(([s,p,z])=>`<button class="opt ${tam==s?"on":""}" onclick="tam='${s}';page()"><span>${I("cup",z)} ${s}</span><b>${R(p)}</b></button>`).join("")}
<br><button class="pill" style="width:100%" onclick="add('${k}')">${I("bag")} Adicionar · ${R(SZ.find(x=>x[0]==tam)[1])}</button></div></div></div>`},
carrinho:()=>hd(1)+`<div class="pg">${stp(0)}<h1>Carrinho</h1><br>${cart.length?cart.map((i,x)=>`<div class="row"><div class="th"><img src="${P[i.k].img}" alt=""></div><div class="in"><b>${P[i.k].n}</b><br><small>${i.tipo} · ${i.tam}</small></div><b>${R(i.preco)}</b><button class="pill o sm" onclick="cart.splice(${x},1);sv('cart',cart);page()">${I("x")}</button></div>`).join("")+`<div class="tt"><span>Total</span><span>${R(tot())}</span></div><a class="pill" href="/lojas/">Pagar ${I("arrow")}</a>`:`<p>Seu carrinho está vazio.</p><a class="pill" href="/">Ver menu</a>`}</div>`,
lojas:()=>hd(1)+`<div class="pg">${stp(1)}<h1>Escolha a loja</h1><br><a class="opt" href="/nome/"><span>${I("store",34)}<span style="display:block"><b style="font-size:22px;color:var(--dk)">${LOJA}</b><br><small style="color:var(--mut)">${END}</small></span></span>${I("arrow")}</a></div>`,
nome:()=>hd(1)+`<div class="pg">${stp(2)}<h1>Qual o seu nome?</h1><input type="text" id="nm" placeholder="Digite seu nome" value="${nome}"><button class="pill" onclick="nome=document.getElementById('nm').value.trim();if(!nome)return alert('Digite seu nome');sv('nome',nome);location='/pay/'">Continuar ${I("arrow")}</button></div>`,
pay:()=>hd(1)+`<div class="pg">${stp(3)}<h1>Pagamento</h1><br>${[["Débito","card"],["Crédito","card"],["Pix","pix"]].map(([n,e])=>`<button class="opt ${pg==n?"on":""}" onclick="pg='${n}';page()"><span>${I(e,28)} ${n}</span>${pg==n?I("check"):""}</button>`).join("")}<div class="tt"><span>Total</span><span>${R(tot())}</span></div><button class="pill" onclick="goPay()">Continuar ${I("arrow")}</button></div>`,
pagando:()=>`<div class="c" style="padding:150px 20px"><svg viewBox="0 0 120 150" width="170"><defs><clipPath id="cc"><path d="M20 34h80l-9 100a8 8 0 0 1-8 7H37a8 8 0 0 1-8-7z"/></clipPath></defs><g clip-path="url(#cc)"><g class="liq"><rect x="-40" y="150" width="240" height="140" fill="#b98a6a"/><path class="wv" d="M-40 150q10-8 20 0t20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0 20 0z" fill="#b98a6a"/></g></g><path d="M20 34h80l-9 100a8 8 0 0 1-8 7H37a8 8 0 0 1-8-7z" fill="none" stroke="#0033A6" stroke-width="5" stroke-linejoin="round"/><rect x="13" y="20" width="94" height="16" rx="8" fill="#0033A6"/></svg><h1 style="margin-top:20px">Pagando...</h1><p>Estamos preparando o seu pedido.</p><div class="bar"><i></i></div></div>`,
congrulations:()=>{const o=JSON.parse(sessionStorage.getItem("last")||"null");setTimeout(confetti,300);return `<div class="c" style="padding:70px 20px"><img class="pop" style="margin:auto" src="/assets/logo-blue.png" height="110" alt=""><h2 style="margin-top:28px">Parabéns${nome?", "+nome:""}!</h2><p style="font-size:20px">Pedido #${o?o.codigo:""} confirmado.</p><h3 style="font:600 26px Fredoka;margin:30px 0 0">Retire em até 10 minutos na</h3><div class="big pop" style="color:var(--bl);font-size:clamp(46px,9vw,110px);margin:10px 0">${LOJA}</div><p style="font-size:18px">${END}</p><br><a class="pill" href="/">Novo pedido</a></div><canvas id="cf"></canvas>`},
api:()=>hd(1)+`<div class="pg" style="max-width:960px"><h1>API NESO</h1><p>Os pedidos ficam no banco Neon. Qualquer sistema (impressora, ERP, WhatsApp, bot) lê pela API:</p>
${SN().map(([t,c],i)=>`<div class="lb">${t}</div><pre id="sn${i}">${c.replace(/</g,"&lt;")}</pre><button class="pill o sm" onclick="cp(${i},this)">Copiar código</button>`).join("")}
<div class="lb">Painel + impressão</div><input type="password" id="key" placeholder="ADMIN_TOKEN" value="${sessionStorage.getItem("tk")||""}"><div style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><button class="pill" onclick="loadO()">Carregar pedidos</button><label><input type="checkbox" onchange="auto(this.checked)"> imprimir novos a cada 5s</label></div><div id="ol" style="margin-top:24px"></div></div><div id="tk"></div>`};
const SN=()=>{const u=location.origin+"/api/orders";return [
["URL base",u],
["Criar pedido (JavaScript, sem token)",`fetch("${u}",{
  method:"POST",
  headers:{"Content-Type":"application/json"},
  body:JSON.stringify({
    cliente:"João",
    pagamento:"Pix", // Pix | Débito | Crédito
    itens:[{produto:"cappucino",tipo:"Gelado",tam:"Médio"}] // produto: cafecomleite | cappucino | tipo: Gelado | Sem Gelo | tam: Pequeno | Médio | Grande
  })
}).then(r=>r.json()).then(console.log) // {id, codigo, total}`],
["Listar pedidos (precisa do ADMIN_TOKEN)",`fetch("${u}?status=pago",{
  headers:{Authorization:"Bearer SEU_ADMIN_TOKEN"}
}).then(r=>r.json()).then(pedidos=>console.log(pedidos))`],
["Marcar como impresso",`fetch("${u}?id=ID_DO_PEDIDO",{
  method:"PATCH",
  headers:{"Content-Type":"application/json",Authorization:"Bearer SEU_ADMIN_TOKEN"},
  body:JSON.stringify({status:"impresso"})
})`],
["curl",`curl -H "Authorization: Bearer SEU_ADMIN_TOKEN" "${u}?status=pago"`]]};
function cp(i,b){navigator.clipboard.writeText(document.getElementById("sn"+i).textContent);b.textContent="Copiado!";setTimeout(()=>b.textContent="Copiar código",1500)}
function add(k){cart.push({k,nome:P[k].n,tipo,tam,preco:SZ.find(x=>x[0]==tam)[1]});sv("cart",cart);toast(I("check")+" Adicionado ao carrinho");setTimeout(()=>location="/carrinho/",800)}
function goPay(){if(!pg)return alert("Selecione a forma de pagamento");sessionStorage.setItem("pend",JSON.stringify({cliente:nome,pagamento:pg,itens:cart,total:tot()}));location="/pagando/"}
async function save(o){try{const r=await fetch("/api/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({cliente:o.cliente,pagamento:o.pagamento,itens:o.itens.map(i=>({produto:i.k,tipo:i.tipo,tam:i.tam}))})});if(r.ok)return await r.json()}catch(e){}
 const c=String(Math.floor(1000+Math.random()*9000)),a=ld("orders",[]);a.push({...o,id:crypto.randomUUID(),codigo:c,loja:LOJA,status:"pago",criado:new Date().toISOString()});sv("orders",a);return{codigo:c}}
function pagando(){const o=JSON.parse(sessionStorage.getItem("pend")||"null");if(!o)return location="/carrinho/";
 setTimeout(async()=>{const r=await save(o);sessionStorage.setItem("last",JSON.stringify({codigo:r.codigo}));sessionStorage.removeItem("pend");sv("cart",[]);location="/congrulations/"},5000)}
const H=()=>{const k=document.getElementById("key").value.trim();sessionStorage.setItem("tk",k);return{Authorization:"Bearer "+k,"Content-Type":"application/json"}};
async function getO(){try{const r=await fetch("/api/orders?limit=50",{headers:H()});if(r.status==401){alert("Token inválido");return[]}if(r.ok)return r.json()}catch(e){}return ld("orders",[]).reverse()}
async function loadO(){const o=await getO();window._o=o;document.getElementById("ol").innerHTML=`<table><tr><th>#</th><th>Cliente</th><th>Pgto</th><th>Total</th><th>Status</th><th></th></tr>${o.map((x,i)=>`<tr><td>${x.codigo}</td><td>${x.cliente}</td><td>${x.pagamento}</td><td>${R(x.total)}</td><td>${x.status}</td><td><button class="pill o sm" onclick="prt(_o[${i}])">${I("print")}</button></td></tr>`).join("")}</table>`}
function prt(o){const it=(typeof o.itens=="string"?JSON.parse(o.itens):o.itens);document.getElementById("tk").innerHTML=`<b>NESO - ${o.loja}</b><br>Pedido #${o.codigo}<br>Cliente: ${o.cliente}<br>Pgto: ${o.pagamento}<hr>${it.map(i=>`${P[i.k||i.produto].n} (${i.tipo}/${i.tam}) ${R(i.preco)}`).join("<br>")}<hr><b>Total ${R(o.total)}</b>`;print();
 fetch("/api/orders?id="+o.id,{method:"PATCH",headers:H(),body:JSON.stringify({status:"impresso"})}).catch(()=>{})}
let poll;function auto(on){clearInterval(poll);if(on)poll=setInterval(async()=>{for(const x of (await getO()).filter(x=>x.status=="pago"))prt(x);loadO()},5000)}
function toast(m){const t=document.createElement("div");t.className="toast";t.innerHTML=m;document.body.appendChild(t);requestAnimationFrame(()=>t.classList.add("on"))}
function confetti(){const c=document.getElementById("cf");if(!c)return;const x=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;const cl=["#0033A6","#F7D9A6","#fff","#b98a6a","#5b84ff"];
 const p=Array.from({length:180},()=>({x:innerWidth/2,y:innerHeight/2,vx:(Math.random()-.5)*20,vy:Math.random()*-17-4,s:Math.random()*9+5,c:cl[Math.random()*5|0],r:Math.random()*6}));let f=0;
 (function a(){x.clearRect(0,0,c.width,c.height);p.forEach(q=>{q.vy+=.35;q.x+=q.vx;q.y+=q.vy;q.r+=.2;x.fillStyle=q.c;x.save();x.translate(q.x,q.y);x.rotate(q.r);x.fillRect(-q.s/2,-q.s/2,q.s,q.s*.6);x.restore()});if(++f<240)requestAnimationFrame(a)})()}
function page(){const d=document.body.dataset,pn=d.page;
 document.getElementById("root").innerHTML=pn=="produto"?V.produto(d.k):V[pn]();
 if(pn=="pagando")pagando();
 const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")),{threshold:.12});document.querySelectorAll(".rv").forEach(e=>io.observe(e));
 const px=document.querySelectorAll("[data-px]");if(px.length)addEventListener("scroll",()=>px.forEach(e=>e.style.transform=`translateY(${scrollY*e.dataset.px}px)`),{passive:true});
 document.querySelectorAll(".bc").forEach(e=>{e.onmousemove=ev=>{const r=e.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;e.style.transform=`rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-6px)`};e.onmouseleave=()=>e.style.transform=""});
 if(location.hash&&pn=="home")setTimeout(()=>document.querySelector(location.hash)?.scrollIntoView(),100)}
page();
