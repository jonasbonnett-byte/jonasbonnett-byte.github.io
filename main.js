// menu
const mb=document.getElementById('menuBtn'),nl=document.getElementById('navlist');
mb.onclick=()=>{const o=nl.classList.toggle('open');mb.setAttribute('aria-expanded',o)};nl.querySelectorAll('a').forEach(a=>a.onclick=()=>nl.classList.remove('open'));
// reveal + counters
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
document.querySelectorAll('[data-count]').forEach(e=>e.textContent='0'+(e.dataset.suffix||''));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,t=+el.dataset.count,s=el.dataset.suffix||'',t0=Date.now();co.unobserve(el);
const iv=setInterval(()=>{const p=Math.min((Date.now()-t0)/1600,1);el.textContent=Math.round(t*(1-Math.pow(1-p,3)))+s;if(p>=1){clearInterval(iv);el.textContent=t+s}},40);
setTimeout(()=>{clearInterval(iv);el.textContent=t+s},1800)}));
document.querySelectorAll('[data-count]').forEach(el=>co.observe(el));
// blueprint hero canvas
(()=>{const c=document.getElementById('bp'),x=c.getContext('2d');let w,h,t=0;
const rs=()=>{w=c.width=c.offsetWidth;h=c.height=c.offsetHeight};rs();addEventListener('resize',rs);
const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
function d(){x.clearRect(0,0,w,h);x.strokeStyle='rgba(95,179,255,.12)';x.lineWidth=1;
for(let i=0;i<w;i+=30){x.beginPath();x.moveTo(i,0);x.lineTo(i,h);x.stroke()}for(let j=0;j<h;j+=30){x.beginPath();x.moveTo(0,j);x.lineTo(w,j);x.stroke()}
const p=Math.min(t/240,1),cx=w*.72,cy=h*.48,s=Math.min(w,h)*.32;x.strokeStyle='rgba(95,179,255,.8)';x.lineWidth=2;x.setLineDash([1400]);x.lineDashOffset=1400*(1-p);
x.strokeRect(cx-s,cy-s*.6,s*2,s*1.2);x.strokeRect(cx-s*.6,cy-s*.35,s*1.2,s*.7);
[[-.85,-.45],[.85,-.45],[-.85,.45],[.85,.45]].forEach(([a,b])=>{x.beginPath();x.arc(cx+a*s,cy+b*s,s*.06,0,7);x.stroke()});
x.setLineDash([12,4,3,4]);x.strokeStyle='rgba(169,184,200,.5)';x.lineDashOffset=-t*.3;x.beginPath();x.moveTo(cx-s*1.2,cy);x.lineTo(cx+s*1.2,cy);x.moveTo(cx,cy-s*.8);x.lineTo(cx,cy+s*.8);x.stroke();
x.setLineDash([]);x.fillStyle='rgba(232,238,245,.6)';x.font='12px monospace';if(p>.6){x.fillText('120.00 ±0.10',cx-40,cy+s*.6+24);x.fillText('75.00',cx+s+10,cy)}
const sy=(t*2)%h;x.strokeStyle='rgba(95,179,255,.25)';x.beginPath();x.moveTo(0,sy);x.lineTo(w,sy);x.stroke();
t++;if(!red)requestAnimationFrame(d)}if(red)t=240;d()})();
// tabs
const tabs=[...document.querySelectorAll('[role=tab]')];tabs.forEach(b=>b.onclick=()=>{tabs.forEach(o=>{o.setAttribute('aria-selected',o===b);document.getElementById(o.getAttribute('aria-controls')).classList.toggle('on',o===b)});if(b.id==='t7')charts()});
// DFM
const cbs=[...document.querySelectorAll('#dfm input')];const upd=()=>{const p=Math.round(cbs.filter(c=>c.checked).length/cbs.length*100);dfmBar.style.width=p+'%';dfmTxt.textContent=p+'% complete'+(p===100?': ready for release':'')};cbs.forEach(c=>c.onchange=upd);
// FAI
const fai=[['Overall length',120,.10,120.04,'Caliper'],['Overall width',75,.10,74.97,'Caliper'],['Pocket width',74.6,.10,74.66,'CMM'],['Pocket depth',3.2,.05,3.27,'Height gauge'],['Hole Ø (4X)',5.5,.05,5.52,'Pin gauge'],['Hole position',0,.10,.06,'CMM'],['Flatness',0,.05,.02,'Surface plate'],['Tab slot width',4,.10,4.03,'Caliper']];
document.querySelector('#fai tbody').innerHTML=fai.map((r,i)=>{const ok=Math.abs(r[3]-r[1])<=r[2];return `<tr><td>${i+1}</td><td>${r[0]}</td><td>${r[1].toFixed(2)}</td><td>${r[2].toFixed(2)}</td><td>${r[3].toFixed(2)}</td><td>${r[4]}</td><td class="${ok?'pass':'fail'}">${ok?'PASS':'FAIL'}</td></tr>`}).join('');
// stack
const si=[...document.querySelectorAll('#stack tr')].slice(1);function st(){let n=0,wc=0,rs=0;si.forEach(r=>{const [a,b]=r.querySelectorAll('input'),s=r.cells[1].textContent==='+'?1:-1;n+=s*+a.value;wc+=+b.value;rs+=b.value*b.value});rs=Math.sqrt(rs);
stackOut.innerHTML=`Nominal gap: <b>${n.toFixed(3)} mm</b> · Worst case: ${(n-wc).toFixed(3)} to ${(n+wc).toFixed(3)} mm · RSS: ${(n-rs).toFixed(3)} to ${(n+rs).toFixed(3)} mm · ${n-wc>0?'<span class="pass">No interference (worst case)</span>':'<span class="fail">Possible interference: review</span>'}`}
si.forEach(r=>r.querySelectorAll('input').forEach(i=>i.oninput=st));st();
// charts
let done=false;function charts(){if(done||!window.Chart)return;done=true;Chart.defaults.color='#a9b8c8';Chart.defaults.borderColor='rgba(95,179,255,.15)';
const t=s=>({display:true,text:s+' (sample data)',color:'#e8eef5'});
new Chart(c1,{type:'bar',data:{labels:['W1','W2','W3','W4','W5','W6','W7','W8'],datasets:[{label:'Units built',data:[18,22,25,24,30,33,31,36],backgroundColor:'#2f7fd1'}]},options:{plugins:{title:t('Weekly units built (all types)')}}});
new Chart(c2,{type:'line',data:{labels:['Jan','Feb','Mar','Apr','May','Jun'],datasets:[{label:'First-pass yield %',data:[88,90,93,94,96,97],borderColor:'#3ecf8e',tension:.3,fill:false}]},options:{plugins:{title:t('First-pass yield trend')},scales:{y:{min:80,max:100}}}});
new Chart(c3,{type:'bar',data:{labels:['Wire routing','Fastener torque','Insulation','Label','Other'],datasets:[{label:'Defects',data:[14,7,5,3,2],backgroundColor:'#f5b942'}]},options:{indexAxis:'y',plugins:{title:t('Defect Pareto')}}});
new Chart(c4,{type:'doughnut',data:{labels:['Kitting','Mech. assembly','Wiring','Test','Logging'],datasets:[{data:[10,30,25,25,10],backgroundColor:['#5fb3ff','#2f7fd1','#123a63','#3ecf8e','#8fa3b8']}]},options:{plugins:{title:t('Assembly time breakdown %')}}});}
addEventListener('load',()=>{if(location.hash==='#charts'){document.getElementById('t7').click()}});
// certs
const C=[['Certified Associate in Project Management (CAPM)','',' ',''],['Lean Management','','Oct 2022',''],['Agile Scrum Master','','Oct 2022',''],['Mini-MBA in Business Management','IBMI','May 2023','ID 1111231-168-377-5458'],['Introduction to Data Science','Simplilearn','May 2023','ID 4310712'],['Website UI/UX Designing using ChatGPT','Simplilearn','May 2023','ID 4308844'],['Human Rights Consultant','US Institute of Diplomacy and Human Rights','May 2023','ID 73480809'],['Adult First Aid/CPR/AED','SAFEWEST','Mar 2023 (expired Mar 2025)',''],['Advanced SEO','Simplilearn','Oct 2022','ID 3891062'],['Lean Six Sigma White Belt','CSSC','Oct 2022','ID na3R9AH3kf'],['Project Manager','IAP Career College','Oct 2022',''],['Security Guard Card','BSIS','Aug 2020 to Aug 2022','ID 6511049'],['OSHA 10 / General Industry','Summit Training Source','Jul 2017; OSHA 10 also listed Mar 2026','']];
certList.innerHTML=C.map(c=>`<div class="cert reveal"><h3>${c[0]}</h3><p>${[c[1],c[2].trim()].filter(Boolean).join(' · ')}${c[3]?'<br>'+c[3]:''}</p></div>`).join('');certList.querySelectorAll('.reveal').forEach(el=>io.observe(el));
if(location.search.includes('shot')){document.querySelector('.hero').style.minHeight=(innerWidth<600?'760px':'820px');document.querySelectorAll('.reveal').forEach(e=>e.classList.add('vis'))}
if(location.search.includes('shot')){document.querySelectorAll('[data-count]').forEach(e=>{co.unobserve(e);e.textContent=e.dataset.count+(e.dataset.suffix||'')})}
if(location.search.includes('only=')){const id=location.search.split('only=')[1];document.querySelectorAll('main>*,footer').forEach(e=>{if(e.id!==id)e.style.display='none'})}
if(location.search.includes('shot')){const st=document.createElement('style');st.textContent='.reveal{transition:none!important;opacity:1!important;transform:none!important}';document.head.appendChild(st)}
