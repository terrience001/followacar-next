'use client';
import { useEffect, useState } from 'react';
import { LANGUAGES, detectLang, getT, type Lang } from '../lib/i18n';

export default function Home() {
  const [lang, setLang] = useState<Lang>('zh-TW');
  const [langReady, setLangReady] = useState(false);

  useEffect(() => {
    const l = detectLang();
    setLang(l);
    setLangReady(true);
  }, []);

  const t = getT(lang);

  function changeLang(l: Lang) {
    setLang(l);
    localStorage.setItem('lang', l);
  }

  const [isLine, setIsLine] = useState(false);
  useEffect(() => {
    if (/Line\//i.test(navigator.userAgent)) setIsLine(true);
  }, []);

  useEffect(() => {
    if (!langReady) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => bootApp(lang);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [langReady]);

  if (!langReady) return null;

  const isRtl = lang === 'ar';

  if (isLine) return (
    <div style={{minHeight:'100vh',background:'#0f172a',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem',textAlign:'center',gap:'1.5rem'}}>
      <div style={{fontSize:'3rem'}}>🌐</div>
      <div style={{color:'#f1f5f9',fontSize:'1.1rem',fontWeight:600,lineHeight:1.6}}>
        請用瀏覽器開啟<br/>
        <span style={{color:'#94a3b8',fontSize:'.9rem',fontWeight:400}}>FollowACar 需要麥克風與相機權限，LINE 內建瀏覽器不支援</span>
      </div>
      <button
        onClick={()=>{
          const ua = navigator.userAgent;
          const url = location.href;
          if (/iPhone|iPad/i.test(ua)) {
            location.href = url.replace(/^https?:\/\//, 'googlechrome://');
            setTimeout(()=>{ location.href = url.replace(/^https?:\/\//, 'x-safari-https://'); }, 500);
          } else {
            location.href = `intent://${url.replace(/^https?:\/\//,'')}#Intent;scheme=https;package=com.android.chrome;end`;
          }
        }}
        style={{background:'#22c55e',color:'#fff',border:'none',borderRadius:'10px',padding:'.75rem 2rem',fontSize:'1rem',fontWeight:600,cursor:'pointer'}}
      >在瀏覽器中開啟</button>
      <div style={{color:'#475569',fontSize:'.8rem'}}>
        或點右上角 ··· → 用瀏覽器開啟
      </div>
    </div>
  );

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Language selector bar */}
      <div id="lang-bar" style={{position:'fixed',top:0,right:0,zIndex:1000,padding:'.3rem .5rem'}}>
        <select
          value={lang}
          onChange={e => changeLang(e.target.value as Lang)}
          style={{background:'#1e293b',color:'#94a3b8',border:'1px solid #334155',borderRadius:'6px',padding:'.2rem .4rem',fontSize:'.78rem',cursor:'pointer'}}
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Screen 1: Home */}
      <div className="screen" id="screen-home">
        <h1>🚗 FollowACar</h1>
        <input id="name-input-home" maxLength={20} placeholder={t.nameplaceholder} autoComplete="off" autoCorrect="off" spellCheck={false} />
        <button className="btn-primary" id="btn-create">{t.createRoom}</button>
        <div className="divider">{t.orJoin}</div>
        <div id="active-rooms"><span style={{fontSize:'.8rem',color:'#4b5563'}}>{t.loading}</span></div>
        <button className="btn-secondary" id="btn-join-manual">{t.joinByCode}</button>
        <p id="home-err" style={{color:'#f87171',display:'none'}}></p>
      </div>

      {/* Screen 2: Created */}
      <div className="screen" id="screen-created" style={{display:'none'}}>
        <h1>🚗 FollowACar</h1>
        <p style={{whiteSpace:'pre-line'}}>{t.roomCreated}</p>
        <div id="share-box">
          <p>{t.shareLink}</p>
          <div id="share-link"></div>
          <button className="copy-btn" id="copy-btn">{t.copyLink}</button>
        </div>
        <button className="btn-primary" id="btn-enter-name">{t.enterRoom}</button>
      </div>

      {/* Screen 3: Enter name */}
      <div className="screen" id="screen-name" style={{display:'none'}}>
        <h1>🚗 FollowACar</h1>
        <p id="room-hint">{t.enterNameToJoin}</p>
        <input id="name-input" maxLength={20} placeholder={t.yourName} autoComplete="off" autoCorrect="off" spellCheck={false} />
        <button className="btn-primary" id="btn-go">{t.join}</button>
        <p id="room-err" style={{color:'#f87171',display:'none'}}></p>
      </div>

      {/* Screen 4: Join by code */}
      <div className="screen" id="screen-join" style={{display:'none'}}>
        <h1>🚗 FollowACar</h1>
        <p>{t.enterCode}</p>
        <input id="code-input" maxLength={6} placeholder={t.codePlaceholder} autoComplete="off" style={{textTransform:'uppercase',letterSpacing:'.2em'}} />
        <button className="btn-primary" id="btn-code-go">{t.join}</button>
        <button className="btn-secondary" id="btn-back">{t.back}</button>
        <p id="code-err" style={{color:'#f87171',display:'none'}}></p>
      </div>

      {/* App */}
      <div id="app">
        <div id="map"></div>
        <button id="logout-btn" style={{position:'absolute',top:'2.6rem',right:'.5rem',zIndex:600,background:'rgba(248,113,113,0.92)',color:'#0f172a',border:'1.5px solid #7f1d1d',borderRadius:'8px',padding:'.3rem .7rem',fontSize:'.78rem',fontWeight:700,cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,.4)'}}>{t.logout}</button>
        <div id="gps-bar">
          <span id="gps-txt">{t.waitingGps}</span>
          <button id="dest-btn">{t.setDest}</button>
          <button id="share-photo-btn">📷</button>
          <input type="file" id="photo-input" accept="image/*" style={{display:'none'}} />
        </div>
        <div id="photo-thumbs" style={{position:'absolute',bottom:'calc(230px + .6rem)',right:'.6rem',display:'flex',flexDirection:'column',gap:'.4rem',zIndex:500,maxHeight:'45vh',overflowY:'auto'}}></div>
        <div id="photo-viewer" style={{display:'none',position:'fixed',inset:0,background:'rgba(0,0,0,0.92)',zIndex:2000,alignItems:'center',justifyContent:'center',cursor:'zoom-out'}}>
          <img id="photo-viewer-img" style={{maxWidth:'95vw',maxHeight:'95vh',objectFit:'contain',borderRadius:'8px'}} alt="" />
          <div id="photo-viewer-meta" style={{position:'absolute',top:'1rem',left:'1rem',color:'#f1f5f9',fontSize:'.85rem',background:'rgba(0,0,0,0.5)',padding:'.4rem .8rem',borderRadius:'6px'}}></div>
        </div>
        <div id="panel">
          <div id="tabs">
            <button className="tab" data-tab="chat">{t.msgTab}</button>
            <button className="tab active" data-tab="call">{t.callTab}</button>
          </div>
          <div className="tab-panel" id="tab-chat">
            <div id="chat-msgs"></div>
            <div id="chat-form">
              <input id="chat-input" placeholder="…" autoComplete="off" spellCheck={false} />
              <button id="chat-send">➤</button>
            </div>
          </div>
          <div className="tab-panel active" id="tab-call">
            <div id="call-panel">
              <div id="members-row" style={{display:'flex',flexWrap:'wrap',gap:'.7rem',marginBottom:'.9rem',alignItems:'flex-start'}}>
                <div id="my-avatar-wrap" style={{position:'relative',width:'52px',height:'52px',borderRadius:'50%',background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',flexShrink:0,border:'2px solid #475569'}}>
                  <span id="my-avatar-ph" style={{fontSize:'1.5rem',pointerEvents:'none'}}>👤</span>
                  <img id="my-avatar-img" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',display:'none',borderRadius:'50%',pointerEvents:'none'}} alt="" />
                  <div id="my-voice-badge" style={{position:'absolute',bottom:-2,right:-2,background:'#0f172a',borderRadius:'50%',width:'20px',height:'20px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'12px',border:'1.5px solid #1e293b',pointerEvents:'none'}}>📷</div>
                </div>
                <input type="file" id="avatar-input" accept="image/*" style={{display:'none'}} />
              </div>
              <div className="call-actions">
                <button id="group-call-btn">{t.joinVoice}</button>
                <button id="mute-btn">{t.mute}</button>
                <button id="rec-btn"></button>
              </div>
              <div id="rec-list"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Create-room dialog */}
      <div id="create-dialog">
        <div id="create-box">
          <h3>{t.createRoomTitle}</h3>
          <input id="create-room-name" maxLength={50} placeholder={t.roomNamePlaceholder} autoComplete="off" autoCorrect="off" spellCheck={false} />
          <input id="create-user-name" maxLength={20} placeholder={t.yourName} autoComplete="off" autoCorrect="off" spellCheck={false} />
          <label id="create-public-row">
            <input type="checkbox" id="create-is-public" defaultChecked />
            <span>{t.publicRoomLabel}</span>
          </label>
          <p id="create-public-hint">{t.publicRoomHint}</p>
          <p id="create-err" style={{display:'none'}}></p>
          <div className="dest-dialog-btns">
            <button id="create-confirm">{t.create}</button>
            <button id="create-cancel">{t.cancel}</button>
          </div>
        </div>
      </div>

      {/* Dest dialog */}
      <div id="dest-dialog">
        <div id="dest-box">
          <h3>{t.setDestTitle}</h3>
          <div className="dest-mode-toggle">
            <button className="dest-mode-btn active" id="dest-mode-url">{t.pasteLink}</button>
            <button className="dest-mode-btn" id="dest-mode-coord">{t.enterCoord}</button>
          </div>
          <div id="dest-url-section">
            <p style={{marginBottom:'.35rem'}} dangerouslySetInnerHTML={{__html: t.gmapsInstruct}} />
            <input id="dest-url" placeholder="https://www.google.com/maps/…" autoComplete="off" spellCheck={false} />
          </div>
          <div id="dest-coord-section" style={{display:'none'}}>
            <p style={{marginBottom:'.35rem'}}>{t.coordInstruct}</p>
            <input id="dest-coord" placeholder={t.coordPlaceholder} autoComplete="off" inputMode="decimal" spellCheck={false} />
          </div>
          <input id="dest-name" placeholder={t.destName} autoComplete="off" />
          <div id="dest-err" style={{display:'none'}}></div>
          <div className="dest-dialog-btns">
            <button id="dest-confirm">{t.confirm}</button>
            <button id="dest-clear">{t.clear}</button>
            <button id="dest-cancel">{t.cancel}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function bootApp(lang: Lang) {
  const L = (window as any).L;
  const PALETTE=['#f87171','#fb923c','#facc15','#4ade80','#38bdf8','#a78bfa','#f472b6','#34d399','#60a5fa','#fbbf24'];
  function nameColor(n: string){let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))>>>0;return PALETTE[h%PALETTE.length];}
  function escHtml(s: string){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function linkify(s: string){
    const re=/\b((?:https?:\/\/|www\.)[^\s<]+)/gi;
    let out='',last=0,m: RegExpExecArray|null;
    while((m=re.exec(s))!==null){
      out+=escHtml(s.slice(last,m.index));
      let url=m[1];const tail=url.match(/[.,;:!?)\]]+$/);let trail='';
      if(tail){trail=tail[0];url=url.slice(0,-trail.length);}
      const href=url.startsWith('www.')?'https://'+url:url;
      out+=`<a href="${escHtml(href)}" target="_blank" rel="noopener noreferrer" style="color:#7dd3fc;text-decoration:underline;word-break:break-all">${escHtml(url)}</a>${escHtml(trail)}`;
      last=m.index+m[1].length;
    }
    out+=escHtml(s.slice(last));
    return out;
  }
  function show(id: string){(document.getElementById(id) as HTMLElement).style.display='flex';}
  function hide(id: string){(document.getElementById(id) as HTMLElement).style.display='none';}
  function el<T extends HTMLElement>(id: string){return document.getElementById(id) as T;}

  // Import translations — inline since bootApp runs outside React
  const {getT} = (window as any).__i18n || {};
  const t = getT ? getT(lang) : null;
  function tr(key: string, fallback: string){return t?.[key]??fallback;}

  let ME='', ROOM='';
  const avatarCache: Record<string,string>={};

  function compressImage(file: File):Promise<Blob>{
    return new Promise((resolve,reject)=>{
      const img=new Image(),url=URL.createObjectURL(file);
      img.onload=()=>{
        URL.revokeObjectURL(url);
        const SIZE=128,c=document.createElement('canvas');c.width=SIZE;c.height=SIZE;
        const ctx=c.getContext('2d')!;ctx.fillStyle='#1e293b';ctx.fillRect(0,0,SIZE,SIZE);
        const sw=Math.min(img.width,img.height),sx=(img.width-sw)/2,sy=(img.height-sw)/2;
        ctx.drawImage(img,sx,sy,sw,sw,0,0,SIZE,SIZE);
        c.toBlob(b=>b?resolve(b):reject(new Error('toBlob failed')),'image/jpeg',0.8);
      };img.src=url;
    });
  }
  function applyMyAvatar(url: string){
    avatarCache[ME]=url;
    const img=el<HTMLImageElement>('my-avatar-img');img.src=url;img.style.display='block';
    el('my-avatar-ph').style.display='none';
  }
  function restoreMyAvatar(){const saved=localStorage.getItem('avatar_'+ME);if(saved){applyMyAvatar(saved);updateMembersList(lastMemberList);}}
  async function uploadAvatar(file: File){
    const blob=await compressImage(file);
    const fd=new FormData();fd.append('name',ME);fd.append('file',blob,'avatar.jpg');
    const res=await fetch('/api/avatar',{method:'POST',body:fd}).then(r=>r.json());
    if(res.ok&&res.url){localStorage.setItem('avatar_'+ME,res.url);applyMyAvatar(res.url);updateMembersList(lastMemberList);broadcastSignal(JSON.stringify({type:'avatar-update'}));}
    else alert(tr('uploadFailed','Upload failed: ')+(res.error||'unknown'));
  }
  function loadAvatars(){
    if(!ROOM)return;
    fetch(`/api/avatar?room=${encodeURIComponent(ROOM)}`).then(r=>r.json()).then((map: Record<string,string>)=>{
      Object.assign(avatarCache,map);if(avatarCache[ME])applyMyAvatar(avatarCache[ME]);updateMembersList(lastMemberList);
    }).catch(()=>{});
  }

  function saveSession(room: string,name: string){
    sessionStorage.setItem('room',room);sessionStorage.setItem('name',name);
    localStorage.setItem('room',room);localStorage.setItem('name',name);
  }
  function enterApp(){
    document.querySelectorAll('.screen').forEach((s: any)=>s.style.display='none');
    el('app').style.display='flex';
    requestAnimationFrame(()=>{initMap();initChat();initCall();startPolling();setTimeout(()=>map?.invalidateSize(),400);});
  }
  function requireName(){
    const v=el<HTMLInputElement>('name-input-home').value.trim();
    if(!v){const e=el('home-err');e.textContent=tr('enterNameFirst','Please enter your name first');e.style.display='';el('name-input-home').focus();return null;}
    el('home-err').style.display='none';return v;
  }

  const _sRoom=sessionStorage.getItem('room')||localStorage.getItem('room');
  const _sName=sessionStorage.getItem('name')||localStorage.getItem('name');
  const urlRoom=new URLSearchParams(location.search).get('room');

  if(_sRoom&&_sName){ROOM=_sRoom;ME=_sName;enterApp();}
  else if(urlRoom){
    fetch(`/api/room?id=${encodeURIComponent(urlRoom)}`).then(r=>r.json()).then((res: any)=>{
      if(res.ok){ROOM=urlRoom;hide('screen-home');el('room-hint').textContent=`${tr('joinRoomLabel','Join room')} ${ROOM}`;show('screen-name');}
      else{el('home-err').textContent=tr('invalidLink','Invalid link or room does not exist');el('home-err').style.display='';}
    });
  }else{loadActiveRooms();}

  function loadActiveRooms(){
    fetch('/api/rooms').then(r=>r.json()).then((rooms: any[])=>{
      const box=el('active-rooms');
      if(!rooms.length){box.innerHTML=`<span style="font-size:.8rem;color:#4b5563">${tr('noRooms','No active rooms')}</span>`;return;}
      box.innerHTML='';
      rooms.forEach(r=>{
        const card=document.createElement('div');card.className='room-card';
        const title=r.room_name?escHtml(r.room_name):escHtml(r.room_id);
        const sub=r.room_name?`${escHtml(r.room_id)} · ${escHtml(r.names)}`:escHtml(r.names);
        card.innerHTML=`<div><div class="rcode">${title}</div><div class="rnames">${sub}</div></div><div class="rcnt">${r.cnt} 人</div>`;
        card.onclick=()=>{const name=requireName();if(!name)return;ME=name;ROOM=r.room_id;saveSession(ROOM,ME);enterApp();};
        box.appendChild(card);
      });
    }).catch(()=>{el('active-rooms').innerHTML=`<span style="font-size:.8rem;color:#4b5563">${tr('loadFailed','Failed to load rooms')}</span>`;});
  }

  function openCreateDialog(){
    el<HTMLInputElement>('create-room-name').value='';
    el<HTMLInputElement>('create-user-name').value=el<HTMLInputElement>('name-input-home').value.trim();
    el<HTMLInputElement>('create-is-public').checked=true;
    el('create-err').style.display='none';el('home-err').style.display='none';
    el('create-dialog').classList.add('open');
    setTimeout(()=>el('create-room-name').focus(),50);
  }
  function closeCreateDialog(){el('create-dialog').classList.remove('open');}
  el('btn-create').onclick=openCreateDialog;
  el('create-cancel').onclick=closeCreateDialog;
  el('create-dialog').onclick=(e: MouseEvent)=>{if(e.target===el('create-dialog'))closeCreateDialog();};
  el('create-room-name').addEventListener('keydown',(e: KeyboardEvent)=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();el('create-user-name').focus();}});
  el('create-user-name').addEventListener('keydown',(e: KeyboardEvent)=>{if(e.key==='Enter'&&!e.isComposing){e.preventDefault();(el('create-confirm') as HTMLButtonElement).click();}});
  el('create-confirm').onclick=async()=>{
    const errEl=el('create-err');errEl.style.display='none';
    const myName=el<HTMLInputElement>('create-user-name').value.trim();
    if(!myName){errEl.textContent=tr('enterNameFirst','Please enter your name first');errEl.style.display='';el('create-user-name').focus();return;}
    const roomName=el<HTMLInputElement>('create-room-name').value.trim();
    const isPublic=el<HTMLInputElement>('create-is-public').checked;
    const btn=el<HTMLButtonElement>('create-confirm');const original=btn.textContent;
    btn.disabled=true;btn.textContent=tr('saving','Saving…');
    const fd=new FormData();fd.append('name',roomName);fd.append('is_public',isPublic?'true':'false');
    const res=await fetch('/api/room',{method:'POST',body:fd}).then(r=>r.json()).catch(()=>({ok:false}));
    btn.disabled=false;btn.textContent=original;
    if(!res.ok){errEl.textContent=res.error?`Server error: ${res.error}`:tr('loadFailed','Failed to load rooms');errEl.style.display='';return;}
    ME=myName;ROOM=res.room;
    el('share-link').textContent=location.origin+'/?room='+ROOM;
    closeCreateDialog();hide('screen-home');show('screen-created');
  };
  el('copy-btn').onclick=()=>{
    navigator.clipboard.writeText(el('share-link').textContent||'');
    const b=el('copy-btn');b.textContent=tr('copied','Copied!');b.classList.add('copied');
    setTimeout(()=>{b.textContent=tr('copyLink','Copy link');b.classList.remove('copied');},2000);
  };
  el('btn-enter-name').onclick=()=>{saveSession(ROOM,ME);hide('screen-created');enterApp();};
  el('btn-join-manual').onclick=()=>{const name=requireName();if(!name)return;ME=name;hide('screen-home');show('screen-join');};
  el('btn-back').onclick=()=>{hide('screen-join');show('screen-home');};
  el<HTMLInputElement>('code-input').addEventListener('input',function(this: HTMLInputElement){this.value=this.value.toUpperCase();});
  el('btn-code-go').onclick=async()=>{
    const code=el<HTMLInputElement>('code-input').value.trim().toUpperCase();
    const errEl=el('code-err');errEl.style.display='none';
    if(code.length!==6){errEl.textContent=tr('invalidCode','Please enter a 6-digit code');errEl.style.display='';return;}
    const res=await fetch(`/api/room?id=${encodeURIComponent(code)}`).then(r=>r.json());
    if(!res.ok){errEl.textContent=tr('roomNotFound','Room not found');errEl.style.display='';return;}
    ROOM=code;saveSession(ROOM,ME);hide('screen-join');enterApp();
  };
  el('code-input').addEventListener('keydown',(e: KeyboardEvent)=>{if(e.key==='Enter'&&!e.isComposing)(el('btn-code-go') as HTMLButtonElement).click();});
  el('btn-go').onclick=doJoin;
  el('name-input').addEventListener('keydown',(e: KeyboardEvent)=>{if(e.key==='Enter'&&!e.isComposing)doJoin();});
  function doJoin(){const v=el<HTMLInputElement>('name-input').value.trim();if(!v)return;ME=v;saveSession(ROOM,ME);hide('screen-name');enterApp();}

  let map: any,markers: Record<string,any>={},destMarker: any=null,destMode=false;
  const voiceStatus: Record<string,any>={};
  let lastMemberList: any[]=[];

  function initMap(){
    if(map)return;
    map=L.map('map').setView([23.5,121.0],8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OSM'}).addTo(map);
    startGPS();
  }
  let wakeLock: any=null;
  async function requestWakeLock(){if(!('wakeLock' in navigator))return;try{wakeLock=await (navigator as any).wakeLock.request('screen');wakeLock.addEventListener('release',()=>{wakeLock=null;});}catch(e){}}
  document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&wakeLock===null)requestWakeLock();});
  let lastLat: number|null=null,lastLng: number|null=null;
  function startGPS(){
    if(!navigator.geolocation){setGpsBar('err',tr('gpsPermDenied','Location unavailable'));return;}
    setGpsBar('','📍 …');requestWakeLock();
    navigator.geolocation.watchPosition(
      pos=>{lastLat=pos.coords.latitude;lastLng=pos.coords.longitude;setGpsBar('ok',`📍 ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}  ±${Math.round(pos.coords.accuracy)}m`);postLocation(pos.coords.latitude,pos.coords.longitude);},
      err=>{const m: Record<number,string>={1:tr('gpsPermDenied','Location denied'),2:tr('gpsNoSignal','No location signal'),3:tr('gpsTimeout','Location timeout')};setGpsBar('err','❌ '+(m[err.code]||err.message));},
      {enableHighAccuracy:true,timeout:15000,maximumAge:5000}
    );
    setInterval(()=>{if(lastLat!=null&&lastLng!=null)postLocation(lastLat,lastLng);},60000);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&lastLat!=null&&lastLng!=null)postLocation(lastLat,lastLng);});
  }
  function setGpsBar(cls: string,txt: string){el('gps-bar').className=cls;el('gps-txt').textContent=txt;}
  function postLocation(lat: number,lng: number){
    const fd=new FormData();fd.append('room',ROOM);fd.append('name',ME);fd.append('lat',String(lat));fd.append('lng',String(lng));
    fetch('/api/location',{method:'POST',body:fd});broadcastLocation(lat,lng);
  }
  function isOnline(ts: string){return(Date.now()/1000-parseInt(ts))<2*60;}
  function isVisible(ts: string){return(Date.now()/1000-parseInt(ts))<10*60;}
  function updateMarkers(list: any[]){
    const active=new Set<string>();
    list.forEach(p=>{
      if(!isVisible(p.ts))return;active.add(p.name);
      const ll=[parseFloat(p.lat),parseFloat(p.lng)],online=isOnline(p.ts);
      const col=online?nameColor(p.name):'#4b5563',textCol=online?'#000':'#9ca3af',opacity=online?1:0.45;
      const icon=L.divIcon({className:'',html:`<div class="car-label" style="background:${col};color:${textCol};opacity:${opacity}">${escHtml(p.name)}${online?'':tr('offline',' Offline')}</div>`,iconAnchor:[0,10]});
      if(markers[p.name]){markers[p.name].setLatLng(ll);markers[p.name].setIcon(icon);}
      else{
        const mk=L.marker(ll,{icon,opacity}).addTo(map);mk.bindPopup('');
        mk.on('popupopen',()=>{
          const av=avatarCache[p.name];
          mk.getPopup().setContent(`<div style="text-align:center;min-width:74px">${av?`<img src="${av}" style="width:64px;height:64px;border-radius:50%;object-fit:cover;display:block;margin:0 auto .4rem">`:''}<b>${escHtml(p.name)}</b></div>`);
        });
        markers[p.name]=mk;
      }
    });
    Object.keys(markers).forEach(n=>{if(!active.has(n)){markers[n].remove();delete markers[n];}});
    Object.keys(voiceStatus).forEach(n=>{if(n!==ME&&!active.has(n)){delete voiceStatus[n];if(peers[n]){hangupPeer(n);updatePeerStatus();}}});
    if(!destMode){const pts=Object.values(markers).map((m: any)=>m.getLatLng());if(pts.length===1)map.setView(pts[0],15);else if(pts.length>1)map.fitBounds(L.latLngBounds(pts),{padding:[40,40]});}
    updateMembersList(list);
  }
  function updateMembersList(list: any[]){
    lastMemberList=list;
    updateMyVoiceBadge();
    const row=el('members-row');
    row.querySelectorAll('[data-member]').forEach(n=>n.remove());
    list.forEach(p=>{
      if(p.name===ME)return;
      const online=isOnline(p.ts),visible=isVisible(p.ts),col=nameColor(p.name),vs=voiceStatus[p.name];
      const wrap=document.createElement('div');
      wrap.setAttribute('data-member','1');
      wrap.title=p.name+(online?'':visible?' (offline)':' (long offline)');
      wrap.style.cssText=`position:relative;width:52px;height:52px;border-radius:50%;background:#334155;flex-shrink:0;border:2px solid ${online?col:'#334155'};opacity:${online?1:visible?0.5:0.3};overflow:visible`;
      const avSrc=avatarCache[p.name];
      wrap.innerHTML=
        `<div style="width:100%;height:100%;border-radius:50%;overflow:hidden;display:flex;align-items:center;justify-content:center;background:#334155">`
        +(avSrc
          ?`<img src="${avSrc}" style="width:100%;height:100%;object-fit:cover" alt="">`
          :`<span style="font-size:1.1rem;color:${col};font-weight:700">${escHtml(p.name.slice(0,2))}</span>`)
        +`</div>`
        +(vs?.inCall
          ?`<div style="position:absolute;bottom:-2px;right:-2px;background:#0f172a;border-radius:50%;width:20px;height:20px;display:flex;align-items:center;justify-content:center;font-size:12px;border:1.5px solid #1e293b">${vs.muted?'🔇':'🎙'}</div>`
          :'');
      row.appendChild(wrap);
    });
  }
  function updateMyVoiceBadge(){
    const b=el('my-voice-badge');if(!b)return;
    const vs=voiceStatus[ME];
    b.textContent=vs?.inCall?(vs.muted?'🔇':'🎙'):'📷';
  }
  function updateMembersVoice(){updateMembersList(lastMemberList);}

  const photoIndex: Record<number,{from:string,url:string,created_at?:string}>={};
  const photoDismissed=new Set<number>(JSON.parse(localStorage.getItem('photoDismissed')||'[]'));
  function persistDismissed(){localStorage.setItem('photoDismissed',JSON.stringify([...photoDismissed]));}
  function addPhotoThumb(p: {id:number,from_name?:string,from?:string,url:string,created_at?:string}){
    const id=Number(p.id),from=p.from_name||p.from||'';
    if(!id||photoIndex[id]||photoDismissed.has(id))return;
    photoIndex[id]={from,url:p.url,created_at:p.created_at};
    const thumbs=el('photo-thumbs');
    const wrap=document.createElement('div');wrap.className='photo-thumb-wrap';wrap.dataset.photoId=String(id);
    const img=document.createElement('img');img.className='photo-thumb';img.src=p.url;img.alt='';
    img.title=from+(p.created_at?` · ${p.created_at}`:'');
    img.onclick=()=>openPhotoViewer(id);
    const close=document.createElement('button');close.className='photo-thumb-close';close.textContent='×';close.title='Hide';
    close.onclick=(e)=>{e.stopPropagation();photoDismissed.add(id);persistDismissed();wrap.remove();};
    wrap.appendChild(img);wrap.appendChild(close);
    thumbs.insertBefore(wrap,thumbs.firstChild);
    while(thumbs.children.length>20)thumbs.lastChild?.remove();
  }
  function openPhotoViewer(id: number){
    const p=photoIndex[id];if(!p)return;
    el<HTMLImageElement>('photo-viewer-img').src=p.url;
    el('photo-viewer-meta').textContent=p.from+(p.created_at?` · ${p.created_at}`:'');
    el('photo-viewer').style.display='flex';
  }
  el('photo-viewer').onclick=()=>{el('photo-viewer').style.display='none';};
  async function loadPhotos(){
    if(!ROOM)return;
    try{
      const list=await fetch(`/api/photo?room=${encodeURIComponent(ROOM)}`).then(r=>r.json()) as any[];
      list.slice().reverse().forEach(addPhotoThumb);
    }catch{}
  }
  function compressPhoto(file: File):Promise<Blob>{
    return new Promise((resolve,reject)=>{
      const img=new Image(),url=URL.createObjectURL(file);
      img.onload=()=>{
        URL.revokeObjectURL(url);
        const MAX=1600;let w=img.width,h=img.height;
        if(w>MAX||h>MAX){const s=MAX/Math.max(w,h);w=Math.round(w*s);h=Math.round(h*s);}
        const c=document.createElement('canvas');c.width=w;c.height=h;
        c.getContext('2d')!.drawImage(img,0,0,w,h);
        c.toBlob(b=>b?(b.size<file.size?resolve(b):resolve(file)):reject(new Error('toBlob failed')),'image/jpeg',0.85);
      };
      img.onerror=()=>{URL.revokeObjectURL(url);resolve(file);};
      img.src=url;
    });
  }
  el('share-photo-btn').onclick=()=>el('photo-input').click();
  el<HTMLInputElement>('photo-input').onchange=async(e: any)=>{
    const file=e.target.files?.[0];e.target.value='';
    if(!file)return;
    const btn=el('share-photo-btn') as HTMLButtonElement;
    const orig=btn.textContent;btn.disabled=true;btn.textContent='⏳';
    try{
      const blob=file.type.startsWith('image/')?await compressPhoto(file):file;
      const fd=new FormData();fd.append('room',ROOM);fd.append('from',ME);fd.append('file',blob,'photo.jpg');
      const res=await fetch('/api/photo',{method:'POST',body:fd}).then(r=>r.json());
      if(!res.ok){alert(tr('uploadFailed','Upload failed: ')+(res.error||'unknown'));return;}
      addPhotoThumb({id:res.id,from_name:ME,url:res.url});
      broadcastSignal(JSON.stringify({type:'photo-share',id:res.id,from:ME,url:res.url}));
    }finally{btn.disabled=false;btn.textContent=orig;}
  };

  let destInputMode='url';
  el('dest-btn').onclick=openDestDialog;
  el('dest-mode-url').onclick=()=>setDestMode('url');
  el('dest-mode-coord').onclick=()=>setDestMode('coord');
  function setDestMode(mode: string){
    destInputMode=mode;
    el('dest-mode-url').classList.toggle('active',mode==='url');el('dest-mode-coord').classList.toggle('active',mode==='coord');
    el('dest-url-section').style.display=mode==='url'?'':'none';el('dest-coord-section').style.display=mode==='coord'?'':'none';
    el('dest-err').style.display='none';
  }
  function openDestDialog(){
    el<HTMLInputElement>('dest-url').value='';el<HTMLInputElement>('dest-coord').value='';el<HTMLInputElement>('dest-name').value='';
    el('dest-err').style.display='none';setDestMode('url');destMode=true;
    el('dest-dialog').classList.add('open');setTimeout(()=>el('dest-url').focus(),50);
  }
  function closeDestDialog(){destMode=false;el('dest-dialog').classList.remove('open');}
  el('dest-cancel').onclick=closeDestDialog;
  el('dest-dialog').onclick=(e: MouseEvent)=>{if(e.target===el('dest-dialog'))closeDestDialog();};
  el('dest-clear').onclick=()=>{fetch(`/api/destination?room=${ROOM}`,{method:'DELETE'});closeDestDialog();};
  function parseCoordsFromUrl(u: string){
    let m: RegExpMatchArray|null;
    if(m=u.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/))return{lat:m[1],lng:m[2]};
    if(m=u.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/))return{lat:m[1],lng:m[2]};
    if(m=u.match(/[?&]q=(-?\d+\.\d+),(-?\d+\.\d+)/))return{lat:m[1],lng:m[2]};
    if(m=u.match(/[?&]ll=(-?\d+\.\d+),(-?\d+\.\d+)/))return{lat:m[1],lng:m[2]};
    return null;
  }
  async function saveDestCoords(lat: string,lng: string,label: string){
    const fd=new FormData();fd.append('room',ROOM);fd.append('lat',lat);fd.append('lng',lng);fd.append('label',label);
    try{return await fetch('/api/destination',{method:'POST',body:fd}).then(r=>r.json());}
    catch(e){return{ok:false,error:tr('loadFailed','Network error')};}
  }
  el('dest-confirm').onclick=async()=>{
    const label=el<HTMLInputElement>('dest-name').value.trim()||'🏁';
    const errEl=el('dest-err');errEl.style.display='none';const btn=el<HTMLButtonElement>('dest-confirm');
    if(destInputMode==='coord'){
      const raw=el<HTMLInputElement>('dest-coord').value.trim();
      const m=raw.match(/(-?\d+\.\d+)[^\d\-]+(-?\d+\.\d+)/);
      if(!m){errEl.textContent=tr('badCoordFormat','Invalid format, e.g. (38.7427938, 140.7432556)');errEl.style.display='';return;}
      btn.textContent=tr('saving','Saving…');const res=await saveDestCoords(m[1],m[2],label);btn.textContent=tr('confirm','Confirm');
      if(res.ok)closeDestDialog();else{errEl.textContent=res.error||tr('saving','Save failed');errEl.style.display='';}
      return;
    }
    const url=el<HTMLInputElement>('dest-url').value.trim();
    if(!url){errEl.textContent=tr('pasteGmaps','Please paste a Google Maps link');errEl.style.display='';return;}
    if(/maps\.app\.goo\.gl|goo\.gl/.test(url)){
      btn.textContent=tr('expanding','Expanding…');
      try{
        const fd2=new FormData();fd2.append('room',ROOM);fd2.append('url',url);fd2.append('label',label);
        const res=await fetch('/api/destination',{method:'POST',body:fd2}).then(r=>r.json());
        if(res.ok){btn.textContent=tr('confirm','Confirm');closeDestDialog();return;}
        if(res.error==='ftid'){
          btn.textContent=tr('confirm','Confirm');setDestMode('coord');errEl.innerHTML='';
          errEl.appendChild(Object.assign(document.createElement('div'),{textContent:'📍 '+tr('openGmaps','Open Google Maps')+':'}));
          const steps=document.createElement('ol');steps.style.cssText='margin:.4rem 0 0 1.2rem;font-size:.78rem;line-height:1.7';
          steps.innerHTML=`<li><a href="${url}" target="_blank" rel="noopener" style="color:#f59e0b">${tr('openGmaps','Open Google Maps')}</a></li><li>${tr('longPressCoord','Long-press the destination on the map')}</li><li>${tr('copyCoordBelow','Copy the coordinates shown at the top and paste below')}</li>`;
          errEl.appendChild(steps);errEl.style.display='';return;
        }
      }catch(e){}
      let coords=null;
      try{const r=await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);if(r.ok){const j=await r.json();coords=parseCoordsFromUrl(j.status?.url||'');if(!coords&&j.contents)coords=parseCoordsFromUrl(j.contents);}}catch(e){}
      if(!coords){try{const r=await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);if(r.ok){const html=await r.text();coords=parseCoordsFromUrl(html);}}catch(e){}}
      btn.textContent=tr('confirm','Confirm');
      if(coords){const res=await saveDestCoords(coords.lat,coords.lng,label);if(res.ok){closeDestDialog();return;}}
      setDestMode('coord');errEl.innerHTML=`${tr('noCoordInLink','Cannot parse coords')} — <a href="${url}" target="_blank" rel="noopener" style="color:#f59e0b;text-decoration:underline">${tr('openGmaps','Open map')}</a>`;errEl.style.display='';return;
    }
    const coords=parseCoordsFromUrl(url);
    if(coords){btn.textContent=tr('saving','Saving…');const res=await saveDestCoords(coords.lat,coords.lng,label);btn.textContent=tr('confirm','Confirm');if(res.ok)closeDestDialog();else{errEl.textContent=res.error||tr('saving','Save failed');errEl.style.display='';}}
    else{errEl.textContent=tr('noCoordInLink','Cannot parse coordinates from link, switch to enter coords mode');errEl.style.display='';}
  };
  function updateDestination(dest: any){
    if(!dest){destMarker?.remove();destMarker=null;return;}
    const ll=[parseFloat(dest.lat),parseFloat(dest.lng)];
    const icon=L.divIcon({className:'',html:`<div class="dest-label">🏁 ${escHtml(dest.label)}</div>`,iconAnchor:[0,10]});
    const popup=`<b>🏁 ${escHtml(dest.label)}</b><br><a href="https://maps.google.com/?daddr=${dest.lat},${dest.lng}" target="_blank" rel="noopener" style="display:inline-block;margin-top:.4rem;padding:.3rem .7rem;background:#f59e0b;color:#000;border-radius:6px;font-weight:700;text-decoration:none;font-size:.85rem">${tr('navigate','🧭 Navigate')}</a>`;
    if(destMarker){destMarker.setLatLng(ll);destMarker.setIcon(icon);destMarker.setPopupContent(popup);}
    else{destMarker=L.marker(ll,{icon}).addTo(map).bindPopup(popup);}
  }

  let lastMsgId=0;
  function initChat(){
    const input=el<HTMLInputElement>('chat-input');(input as any).composing=false;
    input.addEventListener('compositionstart',()=>(input as any).composing=true);
    input.addEventListener('compositionend',()=>(input as any).composing=false);
    input.addEventListener('keydown',(e: KeyboardEvent)=>{if(e.key==='Enter'&&!e.isComposing&&!(input as any).composing){e.preventDefault();sendMsg();}});
    el('chat-send').addEventListener('click',sendMsg);
  }
  function sendMsg(){
    const input=el<HTMLInputElement>('chat-input');if((input as any).composing)return;
    const text=input.value.trim();if(!text)return;input.value='';
    const box=el('chat-msgs');
    const div=document.createElement('div');div.className='msg';div.style.opacity='0.5';
    div.innerHTML=`<span class="who" style="color:${nameColor(ME)}">${escHtml(ME)}</span>${linkify(text)}`;
    box.appendChild(div);box.scrollTop=box.scrollHeight;
    const fd=new FormData();fd.append('room',ROOM);fd.append('name',ME);fd.append('content',text);
    fetch('/api/message',{method:'POST',body:fd}).then(r=>r.json()).then(res=>{
      if(res?.ok){if(res.id){const id=parseInt(res.id);if(id>lastMsgId)lastMsgId=id;}div.style.opacity='';}
      else{div.style.opacity='';div.style.color='#f87171';}
    }).catch(()=>{div.style.opacity='';div.style.color='#f87171';});
  }

  document.querySelectorAll('.tab').forEach(t=>{
    (t as HTMLElement).onclick=()=>{
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');el('tab-'+(t as HTMLElement).dataset.tab!).classList.add('active');
    };
  });

  const STUN: {iceServers: any[]}={iceServers:[
    {urls:'stun:stun.l.google.com:19302'},
    {urls:'stun:138.2.60.1:3478'},
    {urls:'turn:138.2.60.1:3478',username:'followacar',credential:'followacar2024'},
    {urls:'turn:138.2.60.1:3478?transport=tcp',username:'followacar',credential:'followacar2024'},
  ]};
  fetch('/api/turn-credentials').then(r=>r.json()).then(j=>{
    if(j?.iceServers){const extra=Array.isArray(j.iceServers)?j.iceServers:[j.iceServers];STUN.iceServers.push(...extra);}
  }).catch(()=>{});
  const peers: Record<string,any>={},peerRoles: Record<string,string>={},dataChannels: Record<string,any>={};
  const audioEls: Record<string,HTMLAudioElement>={};
  const remoteStreams: Record<string,MediaStream>={};
  let localStream: MediaStream|null=null,inCall=false,muted=false,lastSigId=0;

  function initCall(){
    el('my-avatar-wrap').title=ME;
    el('my-avatar-wrap').onclick=(e: any)=>{if(e.target.closest('#logout-btn'))return;el('avatar-input').click();};
    el<HTMLInputElement>('avatar-input').onchange=(e: any)=>{if(e.target.files[0])uploadAvatar(e.target.files[0]);e.target.value='';};
    el('group-call-btn').onclick=async()=>inCall?leaveGroupCall():await joinGroupCall();
    el('mute-btn').onclick=()=>{muted=!muted;localStream?.getAudioTracks().forEach(t=>t.enabled=!muted);const b=el('mute-btn');b.textContent=muted?tr('unmute','🔇 Unmute'):tr('mute','🎙 Mute');b.classList.toggle('muted',muted);if(voiceStatus[ME])voiceStatus[ME].muted=muted;broadcastSignal(JSON.stringify({type:'call-mute',muted}));updateMembersVoice();};
    el('logout-btn').onclick=(e: any)=>{
      e.stopPropagation();
      if(!confirm(tr('logoutConfirm','Are you sure you want to leave the room?')))return;
      if(inCall)leaveGroupCall();
      sendLeaveBeacon();
      localStorage.removeItem('room');localStorage.removeItem('name');
      sessionStorage.removeItem('room');sessionStorage.removeItem('name');
      location.href=location.origin;
    };
    window.addEventListener('pagehide',sendLeaveBeacon);
    initRecording();
  }

  const REC_DB='fac_recordings',REC_STORE='recs';
  function openRecDb():Promise<IDBDatabase>{
    return new Promise((resolve,reject)=>{
      const r=indexedDB.open(REC_DB,1);
      r.onupgradeneeded=()=>{const db=r.result;if(!db.objectStoreNames.contains(REC_STORE))db.createObjectStore(REC_STORE,{keyPath:'id',autoIncrement:true});};
      r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error);
    });
  }
  async function recAdd(blob: Blob,ext: string){
    const db=await openRecDb();
    return new Promise<void>((resolve,reject)=>{
      const tx=db.transaction(REC_STORE,'readwrite');
      tx.objectStore(REC_STORE).add({blob,ext,createdAt:Date.now()});
      tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);
    });
  }
  async function recList():Promise<{id:number;blob:Blob;ext:string;createdAt:number}[]>{
    const db=await openRecDb();
    return new Promise((resolve,reject)=>{
      const tx=db.transaction(REC_STORE,'readonly');
      const r=tx.objectStore(REC_STORE).getAll();
      r.onsuccess=()=>resolve(r.result||[]);r.onerror=()=>reject(r.error);
    });
  }
  async function recDelete(id: number){
    const db=await openRecDb();
    return new Promise<void>((resolve,reject)=>{
      const tx=db.transaction(REC_STORE,'readwrite');
      tx.objectStore(REC_STORE).delete(id);
      tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);
    });
  }

  let recRecorder: MediaRecorder|null=null,recChunks: Blob[]=[],recStream: MediaStream|null=null;
  let recAudioCtx: AudioContext|null=null,recDest: MediaStreamAudioDestinationNode|null=null,recOwnsMic=false;
  const recRemoteSources: Record<string,MediaStreamAudioSourceNode>={};
  const recObjectUrls: string[]=[];
  function pickRecMime(){
    const cands=['audio/webm;codecs=opus','audio/webm','audio/mp4','audio/mp4;codecs=mp4a.40.2','audio/ogg;codecs=opus'];
    for(const m of cands)if((window as any).MediaRecorder?.isTypeSupported?.(m))return m;
    return '';
  }
  function recAttachRemote(name: string,stream: MediaStream){
    if(!recAudioCtx||!recDest)return;
    try{recRemoteSources[name]?.disconnect();}catch{}
    try{const src=recAudioCtx.createMediaStreamSource(stream);src.connect(recDest);recRemoteSources[name]=src;}catch{}
  }
  async function recStart(){
    if(recRecorder)return;
    let mic: MediaStream;recOwnsMic=false;
    if(inCall&&localStream)mic=localStream;
    else{
      try{mic=await navigator.mediaDevices.getUserMedia({audio:true});recOwnsMic=true;}
      catch(e: any){alert(tr('micError','Cannot access microphone: ')+e.message);return;}
    }
    try{
      const Ctx=(window as any).AudioContext||(window as any).webkitAudioContext;
      const ctx: AudioContext=new Ctx();
      const dest=ctx.createMediaStreamDestination();
      ctx.createMediaStreamSource(mic).connect(dest);
      recAudioCtx=ctx;recDest=dest;
      Object.entries(remoteStreams).forEach(([n,s])=>recAttachRemote(n,s));
      recStream=dest.stream;
    }catch(e: any){
      alert(tr('micError','Cannot access microphone: ')+e.message);
      if(recOwnsMic)mic.getTracks().forEach(t=>t.stop());
      recAudioCtx?.close();recAudioCtx=null;recDest=null;return;
    }
    const mime=pickRecMime();
    try{recRecorder=mime?new MediaRecorder(recStream,{mimeType:mime}):new MediaRecorder(recStream);}
    catch(e: any){
      alert(tr('micError','Cannot access microphone: ')+e.message);
      if(recOwnsMic)mic.getTracks().forEach(t=>t.stop());
      recAudioCtx?.close();recAudioCtx=null;recDest=null;recStream=null;return;
    }
    recChunks=[];
    const ownsMic=recOwnsMic,ownMic=mic;
    recRecorder.ondataavailable=(e: BlobEvent)=>{if(e.data.size>0)recChunks.push(e.data);};
    recRecorder.onstop=async()=>{
      const type=recRecorder?.mimeType||'audio/webm';
      const sourceBlob=new Blob(recChunks,{type});
      Object.values(recRemoteSources).forEach(s=>{try{s.disconnect();}catch{}});
      Object.keys(recRemoteSources).forEach(k=>delete recRemoteSources[k]);
      try{recAudioCtx?.close();}catch{}recAudioCtx=null;recDest=null;
      if(ownsMic)ownMic.getTracks().forEach(t=>t.stop());
      recStream=null;recRecorder=null;recChunks=[];
      let saveBlob: Blob=sourceBlob;
      let ext=type.includes('mp4')?'m4a':type.includes('ogg')?'ogg':'webm';
      try{
        const Ctx=(window as any).AudioContext||(window as any).webkitAudioContext;
        const ctx: AudioContext=new Ctx();
        const ab=await sourceBlob.arrayBuffer();
        const audioBuffer=await ctx.decodeAudioData(ab);
        saveBlob=audioBufferToWav(audioBuffer);ext='wav';
        try{await ctx.close();}catch{}
      }catch{}
      try{await recAdd(saveBlob,ext);}catch(e){alert(tr('recordSaveFailed','Failed to save recording'));}
      updateRecBtn();refreshRecList();
    };
    recRecorder.start();updateRecBtn();
  }
  function recStop(){try{recRecorder?.stop();}catch{}}
  function audioBufferToWav(buffer: AudioBuffer): Blob{
    const numChannels=buffer.numberOfChannels;
    const sampleRate=buffer.sampleRate;
    const samples=buffer.length;
    const bytesPerSample=2;
    const dataSize=samples*numChannels*bytesPerSample;
    const ab=new ArrayBuffer(44+dataSize);
    const v=new DataView(ab);
    let off=0;
    const ws=(s: string)=>{for(let i=0;i<s.length;i++)v.setUint8(off++,s.charCodeAt(i));};
    ws('RIFF');v.setUint32(off,36+dataSize,true);off+=4;
    ws('WAVE');ws('fmt ');v.setUint32(off,16,true);off+=4;
    v.setUint16(off,1,true);off+=2;                                  // PCM
    v.setUint16(off,numChannels,true);off+=2;
    v.setUint32(off,sampleRate,true);off+=4;
    v.setUint32(off,sampleRate*numChannels*bytesPerSample,true);off+=4;
    v.setUint16(off,numChannels*bytesPerSample,true);off+=2;
    v.setUint16(off,16,true);off+=2;                                 // 16-bit
    ws('data');v.setUint32(off,dataSize,true);off+=4;
    const channels: Float32Array[]=[];
    for(let c=0;c<numChannels;c++)channels.push(buffer.getChannelData(c));
    for(let i=0;i<samples;i++){
      for(let c=0;c<numChannels;c++){
        let s=Math.max(-1,Math.min(1,channels[c][i]));
        s=s<0?s*0x8000:s*0x7FFF;
        v.setInt16(off,s,true);off+=2;
      }
    }
    return new Blob([ab],{type:'audio/wav'});
  }
  function updateRecBtn(){
    const btn=el('rec-btn');const recording=!!recRecorder;
    btn.textContent=recording?tr('stopRecord','⏹ 停止錄音'):tr('record','🎙 開始錄音');
    btn.classList.toggle('recording',recording);
  }
  function fmtRecTime(ts: number){
    const d=new Date(ts);const pad=(n: number)=>String(n).padStart(2,'0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  async function refreshRecList(){
    const list=await recList().catch(()=>[]);
    while(recObjectUrls.length){const u=recObjectUrls.pop();if(u)URL.revokeObjectURL(u);}
    const box=el('rec-list');box.innerHTML='';
    if(!list.length){box.innerHTML=`<span style="font-size:.75rem;color:#4b5563">${escHtml(tr('noRecordings','尚無錄音'))}</span>`;return;}
    list.sort((a,b)=>b.createdAt-a.createdAt);
    list.forEach(rec=>{
      const url=URL.createObjectURL(rec.blob);recObjectUrls.push(url);
      const fname=`recording-${rec.createdAt}.${rec.ext}`;
      const row=document.createElement('div');row.className='rec-row';
      row.innerHTML=`<span class="rec-time">${escHtml(fmtRecTime(rec.createdAt))}</span><audio src="${url}" controls preload="none"></audio><a href="${url}" download="${fname}">⬇</a><button data-id="${rec.id}">🗑</button>`;
      (row.querySelector('button') as HTMLButtonElement).onclick=async()=>{
        if(!confirm(tr('deleteConfirm','確定要刪除這段錄音嗎？')))return;
        await recDelete(rec.id);refreshRecList();
      };
      box.appendChild(row);
    });
  }
  function initRecording(){
    if(!(window as any).MediaRecorder||!navigator.mediaDevices?.getUserMedia){
      el('rec-btn').style.display='none';el('rec-list').style.display='none';return;
    }
    updateRecBtn();
    el('rec-btn').onclick=()=>recRecorder?recStop():recStart();
    refreshRecList();
  }
  async function joinGroupCall(){
    try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});}catch(e: any){alert(tr('micError','Cannot access microphone: ')+e.message);return;}
    inCall=true;muted=false;el('group-call-btn').textContent=tr('leaveVoice','📵 Leave voice');el('group-call-btn').classList.add('in-call');
    el('mute-btn').style.display='inline-block';el('mute-btn').textContent=tr('mute','🎙 Mute');el('mute-btn').classList.remove('muted');
    lastMemberList.filter((p: any)=>p.name!==ME&&isOnline(p.ts)).forEach((p: any)=>callPeer(p.name));
    broadcastSignal(JSON.stringify({type:'call-join'}));voiceStatus[ME]={inCall:true,muted:false};updateMembersVoice();
  }
  function leaveGroupCall(){
    inCall=false;localStream?.getTracks().forEach(t=>t.stop());localStream=null;Object.keys(peers).forEach(hangupPeer);
    el('group-call-btn').textContent=tr('joinVoice','🎙 Join voice');el('group-call-btn').classList.remove('in-call');
    el('mute-btn').style.display='none';
    broadcastSignal(JSON.stringify({type:'call-leave'}));voiceStatus[ME]={inCall:false,muted:false};updatePeerStatus();updateMembersVoice();
  }
  function setupDC(name: string,dc: any){dataChannels[name]=dc;dc.onmessage=(e: MessageEvent)=>{try{const d=JSON.parse(e.data);if(d.type==='loc'&&d.name&&d.lat&&d.lng)updateMarkers(lastMemberList.map(p=>p.name===d.name?{...p,lat:d.lat,lng:d.lng,ts:Math.floor(Date.now()/1000)}:p));}catch(e){}};dc.onclose=()=>{delete dataChannels[name];};}
  function broadcastLocation(lat: number,lng: number){const msg=JSON.stringify({type:'loc',name:ME,lat,lng});Object.values(dataChannels).forEach((dc: any)=>{try{if(dc.readyState==='open')dc.send(msg);}catch(e){}});}
  async function callPeer(target: string){
    if(peers[target])return;const pc=createPC(target);peerRoles[target]='caller';
    localStream!.getTracks().forEach(t=>pc.addTrack(t,localStream!));
    const dc=pc.createDataChannel('loc');setupDC(target,dc);
    const offer=await pc.createOffer();await pc.setLocalDescription(offer);sendSignal(target,JSON.stringify({type:'voice-offer',sdp:offer.sdp}));
  }
  function createPC(name: string){
    hangupPeer(name);const pc=new RTCPeerConnection(STUN);peers[name]=pc;
    pc.onicecandidate=(e: RTCPeerConnectionIceEvent)=>{if(e.candidate)sendSignal(name,JSON.stringify({type:'candidate',candidate:e.candidate}));};
    pc.ontrack=(e: RTCTrackEvent)=>{if(e.track.kind==='audio'){remoteStreams[name]=e.streams[0];playAudio(name,e.streams[0]);recAttachRemote(name,e.streams[0]);}};
    pc.ondatachannel=(e: RTCDataChannelEvent)=>setupDC(name,e.channel);
    pc.onconnectionstatechange=()=>{if(['disconnected','failed','closed'].includes(pc.connectionState)){hangupPeer(name);updatePeerStatus();}};
    return pc;
  }
  function hangupPeer(name: string){peers[name]?.close();delete peers[name];delete peerRoles[name];removeAudio(name);delete remoteStreams[name];delete dataChannels[name];}
  async function handleSignal(sig: any){
    const data=JSON.parse(sig.data),from=sig.from_name;
    if(data.type==='call-join'){voiceStatus[from]={inCall:true,muted:false};if(inCall&&!peers[from])callPeer(from);updateMembersVoice();}
    else if(data.type==='call-leave'){voiceStatus[from]={inCall:false,muted:false};updateMembersVoice();}
    else if(data.type==='call-mute'){if(voiceStatus[from])voiceStatus[from].muted=data.muted;else voiceStatus[from]={inCall:true,muted:data.muted};updateMembersVoice();}
    else if(data.type==='avatar-update'){loadAvatars();}
    else if(data.type==='photo-share'&&data.url){addPhotoThumb({id:data.id,from_name:data.from,url:data.url});}
    else if(data.type==='voice-offer'){
      if(!inCall)return;let pc=peers[from];
      if(!pc){pc=createPC(from);peerRoles[from]='callee';if(localStream)localStream.getTracks().forEach(t=>pc.addTrack(t,localStream!));}
      await pc.setRemoteDescription({type:'offer',sdp:data.sdp});const ans=await pc.createAnswer();await pc.setLocalDescription(ans);
      sendSignal(from,JSON.stringify({type:'voice-answer',sdp:ans.sdp}));updatePeerStatus();
    }else if(data.type==='voice-answer'){await peers[from]?.setRemoteDescription({type:'answer',sdp:data.sdp});updatePeerStatus();}
    else if(data.type==='candidate'){await peers[from]?.addIceCandidate(data.candidate);}
  }
  function updatePeerStatus(){updateMembersVoice();}
  function playAudio(name: string,stream: MediaStream){removeAudio(name);const a=document.createElement('audio') as HTMLAudioElement;a.autoplay=true;a.srcObject=stream;document.body.appendChild(a);audioEls[name]=a;}
  function removeAudio(name: string){audioEls[name]?.remove();delete audioEls[name];}
  function sendSignal(to: string,data: string){const fd=new FormData();fd.append('room',ROOM);fd.append('from',ME);fd.append('to',to);fd.append('data',data);fetch('/api/signal',{method:'POST',body:fd});}
  function broadcastSignal(data: string){const fd=new FormData();fd.append('room',ROOM);fd.append('from',ME);fd.append('to','*');fd.append('data',data);fetch('/api/signal',{method:'POST',body:fd});}
  function sendLeaveBeacon(){if(!ROOM||!ME)return;const fd=new FormData();fd.append('room',ROOM);fd.append('name',ME);try{navigator.sendBeacon('/api/room/leave',fd);}catch{}}

  function startPolling(){
    restoreMyAvatar();loadAvatars();loadPhotos();
    setInterval(loadAvatars,5*60*1000);
    let es: EventSource|null=null,reconnectTimer: any=null,msgsInitialized=false;
    function applyMessages(list: any[]){
      if(!list?.length)return;const box=el('chat-msgs');
      let hasIncoming=false;
      list.forEach(m=>{const id=parseInt(m.id);if(id<=lastMsgId)return;lastMsgId=id;if(m.name!==ME)hasIncoming=true;const div=document.createElement('div');div.className='msg';div.innerHTML=`<span class="who" style="color:${nameColor(m.name)}">${escHtml(m.name)}</span>${linkify(m.content)}`;box.appendChild(div);});
      box.scrollTop=box.scrollHeight;
      if(msgsInitialized&&hasIncoming&&!el('tab-chat').classList.contains('active')){
        const tab=document.querySelector('.tab[data-tab="chat"]') as HTMLElement|null;
        tab?.click();
      }
      msgsInitialized=true;
    }
    function applySignals(list: any[]){if(!list?.length)return;list.forEach(s=>{const id=parseInt(s.id);if(id<=lastSigId)return;lastSigId=id;handleSignal(s);});}
    function closeStream(){if(es){try{es.close();}catch{}es=null;}}
    function openStream(){
      closeStream();clearTimeout(reconnectTimer);
      if(!ROOM)return;
      const url=`/api/stream?room=${encodeURIComponent(ROOM)}&me=${encodeURIComponent(ME)}&since_msg=${lastMsgId}&since_sig=${lastSigId}`;
      es=new EventSource(url);
      es.addEventListener('messages',e=>applyMessages(JSON.parse((e as MessageEvent).data)));
      es.addEventListener('signals',e=>applySignals(JSON.parse((e as MessageEvent).data)));
      es.addEventListener('locations',e=>updateMarkers(JSON.parse((e as MessageEvent).data)));
      es.addEventListener('destination',e=>updateDestination(JSON.parse((e as MessageEvent).data)));
      es.onerror=()=>{closeStream();reconnectTimer=setTimeout(openStream,2000);};
    }
    openStream();
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')openStream();});
  }
}

// Make i18n available to bootApp via window
if (typeof window !== 'undefined') {
  import('../lib/i18n').then(m => {
    (window as any).__i18n = m;
  });
}
