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
        <div id="video-container"></div>
        <div id="gps-bar">
          <span id="gps-txt">{t.waitingGps}</span>
          <button id="dest-btn">{t.setDest}</button>
        </div>
        <div id="panel">
          <div id="tabs">
            <button className="tab active" data-tab="chat">{t.msgTab}</button>
            <button className="tab" data-tab="call">{t.callTab}</button>
          </div>
          <div className="tab-panel active" id="tab-chat">
            <div id="chat-msgs"></div>
            <div id="chat-form">
              <input id="chat-input" placeholder="…" autoComplete="off" spellCheck={false} />
              <button id="chat-send">➤</button>
            </div>
          </div>
          <div className="tab-panel" id="tab-call">
            <div id="call-panel">
              <div style={{display:'flex',alignItems:'center',gap:'.7rem',marginBottom:'.9rem'}}>
                <div id="my-avatar-wrap" style={{position:'relative',width:'44px',height:'44px',borderRadius:'50%',background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',overflow:'hidden',flexShrink:0,border:'2px solid #475569'}}>
                  <span id="my-avatar-ph" style={{fontSize:'1.3rem',pointerEvents:'none'}}>👤</span>
                  <img id="my-avatar-img" style={{width:'44px',height:'44px',objectFit:'cover',display:'none',borderRadius:'50%',pointerEvents:'none'}} alt="" />
                  <div style={{position:'absolute',bottom:0,right:0,background:'#0f172a',borderRadius:'50%',width:'16px',height:'16px',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'10px',pointerEvents:'none'}}>📷</div>
                </div>
                <span id="my-name-label" style={{fontSize:'.85rem',color:'#f1f5f9',fontWeight:600}}></span>
                <input type="file" id="avatar-input" accept="image/*" style={{display:'none'}} />
              </div>
              <div className="call-actions">
                <button id="group-call-btn">{t.joinVoice}</button>
                <button id="mute-btn">{t.mute}</button>
                <button id="stream-btn">{t.live}</button>
                <button id="flip-btn">{t.flipCamera}</button>
                <button id="screen-btn">{t.screen}</button>
              </div>
              <div className="call-label" style={{marginTop:'.7rem'}}>{t.members}</div>
              <div id="members-list" style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'.5rem'}}></div>
              <div className="peer-status" id="peer-status"></div>
              <div style={{marginTop:'1rem',borderTop:'1px solid #334155',paddingTop:'.75rem'}}>
                <button id="logout-btn" style={{background:'transparent',color:'#f87171',border:'1px solid #f87171',borderRadius:'8px',padding:'.45rem 1rem',fontSize:'.85rem',cursor:'pointer',width:'100%'}}>{t.logout}</button>
              </div>
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
          <p id="create-err"></p>
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
          <div id="dest-err"></div>
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
  function show(id: string){(document.getElementById(id) as HTMLElement).style.display='flex';}
  function hide(id: string){(document.getElementById(id) as HTMLElement).style.display='none';}
  function el<T extends HTMLElement>(id: string){return document.getElementById(id) as T;}

  // Import translations — inline since bootApp runs outside React
  const {getT} = (window as any).__i18n || {};
  const t = getT ? getT(lang) : null;
  function tr(key: string, fallback: string){return t?.[key]??fallback;}

  let ME='', ROOM='';
  const avatarCache: Record<string,string>={};

  function compressImage(file: File):Promise<string>{
    return new Promise(resolve=>{
      const img=new Image(),url=URL.createObjectURL(file);
      img.onload=()=>{
        URL.revokeObjectURL(url);
        const SIZE=72,c=document.createElement('canvas');c.width=SIZE;c.height=SIZE;
        const ctx=c.getContext('2d')!;ctx.fillStyle='#1e293b';ctx.fillRect(0,0,SIZE,SIZE);
        const sw=Math.min(img.width,img.height),sx=(img.width-sw)/2,sy=(img.height-sw)/2;
        ctx.drawImage(img,sx,sy,sw,sw,0,0,SIZE,SIZE);
        resolve(c.toDataURL('image/jpeg',0.65));
      };img.src=url;
    });
  }
  function applyMyAvatar(data: string){
    avatarCache[ME]=data;
    const img=el<HTMLImageElement>('my-avatar-img');img.src=data;img.style.display='block';
    el('my-avatar-ph').style.display='none';
  }
  function restoreMyAvatar(){const saved=localStorage.getItem('avatar_'+ME);if(saved){applyMyAvatar(saved);updateMembersList(lastMemberList);}}
  async function uploadAvatar(file: File){
    const data=await compressImage(file);
    const fd=new FormData();fd.append('name',ME);fd.append('data',data);
    const res=await fetch('/api/avatar',{method:'POST',body:fd}).then(r=>r.json());
    if(res.ok){localStorage.setItem('avatar_'+ME,data);applyMyAvatar(data);updateMembersList(lastMemberList);broadcastSignal(JSON.stringify({type:'avatar-update'}));}
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
    if(!res.ok){errEl.textContent=tr('loadFailed','Failed to load rooms');errEl.style.display='';return;}
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
  function startGPS(){
    if(!navigator.geolocation){setGpsBar('err',tr('gpsPermDenied','Location unavailable'));return;}
    setGpsBar('','📍 …');requestWakeLock();
    navigator.geolocation.watchPosition(
      pos=>{setGpsBar('ok',`📍 ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}  ±${Math.round(pos.coords.accuracy)}m`);postLocation(pos.coords.latitude,pos.coords.longitude);},
      err=>{const m: Record<number,string>={1:tr('gpsPermDenied','Location denied'),2:tr('gpsNoSignal','No location signal'),3:tr('gpsTimeout','Location timeout')};setGpsBar('err','❌ '+(m[err.code]||err.message));},
      {enableHighAccuracy:true,timeout:15000,maximumAge:5000}
    );
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
    lastMemberList=list;const box=el('members-list');box.innerHTML='';
    list.forEach(p=>{
      const online=isOnline(p.ts),visible=isVisible(p.ts),col=nameColor(p.name),vs=voiceStatus[p.name];
      const tag=document.createElement('div');
      tag.style.cssText=`display:flex;align-items:center;gap:.3rem;padding:.25rem .55rem;border-radius:20px;border:1px solid ${online?col:visible?'#334155':'#1e293b'};opacity:${online?1:visible?0.45:0.25}`;
      const avSrc=avatarCache[p.name];
      tag.innerHTML=(avSrc?`<img class="av-sm" src="${avSrc}" style="opacity:${online?1:0.45}">`:
        `<div class="av-dot" style="background:${online?col:'#4b5563'};opacity:${online?1:0.45}"></div>`)
        +`<span style="font-size:.8rem;color:${online?col:'#6b7280'}">${escHtml(p.name)}</span>`
        +(online?'':visible?`<span style="font-size:.7rem;color:#6b7280">${tr('offline',' Offline')}</span>`:`<span style="font-size:.7rem;color:#4b5563">${tr('longOffline',' Long offline')}</span>`)
        +(vs?.inCall?`<span style="font-size:.8rem">${vs.muted?'🔇':'🎙'}</span>`:'');
      box.appendChild(tag);
    });
    if(!list.length)box.innerHTML=`<span style="font-size:.8rem;color:#4b5563">${tr('noMembers','No members yet')}</span>`;
  }
  function updateMembersVoice(){updateMembersList(lastMemberList);}

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
    div.innerHTML=`<span class="who" style="color:${nameColor(ME)}">${escHtml(ME)}</span>${escHtml(text)}`;
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

  const STUN={iceServers:[
    {urls:'stun:stun.l.google.com:19302'},
    {urls:'stun:138.2.60.1:3478'},
    {urls:'turn:138.2.60.1:3478',username:'followacar',credential:'followacar2024'},
    {urls:'turn:138.2.60.1:3478?transport=tcp',username:'followacar',credential:'followacar2024'},
  ]};
  const peers: Record<string,any>={},peerRoles: Record<string,string>={},dataChannels: Record<string,any>={};
  const audioEls: Record<string,HTMLAudioElement>={},videoEls: Record<string,HTMLElement>={};
  let localStream: MediaStream|null=null,inCall=false,muted=false,lastSigId=0;
  let streamTrack: MediaStreamTrack|null=null,streaming=false,facingMode:'user'|'environment'='environment';

  function initCall(){
    el('my-name-label').textContent=ME;
    el('my-avatar-wrap').onclick=()=>el('avatar-input').click();
    el<HTMLInputElement>('avatar-input').onchange=(e: any)=>{if(e.target.files[0])uploadAvatar(e.target.files[0]);e.target.value='';};
    el('group-call-btn').onclick=async()=>inCall?leaveGroupCall():await joinGroupCall();
    el('mute-btn').onclick=()=>{muted=!muted;localStream?.getAudioTracks().forEach(t=>t.enabled=!muted);const b=el('mute-btn');b.textContent=muted?tr('unmute','🔇 Unmute'):tr('mute','🎙 Mute');b.classList.toggle('muted',muted);if(voiceStatus[ME])voiceStatus[ME].muted=muted;broadcastSignal(JSON.stringify({type:'call-mute',muted}));updateMembersVoice();};
    el('stream-btn').onclick=()=>streaming?stopStream():startStream('camera');
    el('flip-btn').style.display='none';
    el('flip-btn').onclick=()=>flipCamera();
    if(!navigator.mediaDevices?.getDisplayMedia)el('screen-btn').style.display='none';
    else el('screen-btn').onclick=()=>startStream('screen');
    el('logout-btn').onclick=()=>{
      if(!confirm(tr('logoutConfirm','Are you sure you want to leave the room?')))return;
      if(inCall)leaveGroupCall();
      localStorage.removeItem('room');localStorage.removeItem('name');
      sessionStorage.removeItem('room');sessionStorage.removeItem('name');
      location.href=location.origin;
    };
  }
  async function joinGroupCall(){
    try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});}catch(e: any){alert(tr('micError','Cannot access microphone: ')+e.message);return;}
    inCall=true;muted=false;el('group-call-btn').textContent=tr('leaveVoice','📵 Leave voice');el('group-call-btn').classList.add('in-call');
    el('mute-btn').style.display='inline-block';el('mute-btn').textContent=tr('mute','🎙 Mute');el('mute-btn').classList.remove('muted');
    el('stream-btn').style.display='inline-block';el('screen-btn').style.display='inline-block';updateStreamUI();
    lastMemberList.filter((p: any)=>p.name!==ME&&isOnline(p.ts)).forEach((p: any)=>callPeer(p.name));
    broadcastSignal(JSON.stringify({type:'call-join'}));voiceStatus[ME]={inCall:true,muted:false};updateMembersVoice();
  }
  function leaveGroupCall(){
    inCall=false;localStream?.getTracks().forEach(t=>t.stop());localStream=null;Object.keys(peers).forEach(hangupPeer);
    el('group-call-btn').textContent=tr('joinVoice','🎙 Join voice');el('group-call-btn').classList.remove('in-call');
    el('mute-btn').style.display='none';el('stream-btn').style.display='none';el('screen-btn').style.display='none';
    if(streaming)stopStream();broadcastSignal(JSON.stringify({type:'call-leave'}));voiceStatus[ME]={inCall:false,muted:false};updatePeerStatus();updateMembersVoice();
  }
  function showVideo(name: string,stream: MediaStream){
    removeVideo(name);el('video-container').style.display='flex';
    const wrap=document.createElement('div');wrap.className='video-wrap';wrap.id='vw-'+name;
    const v=document.createElement('video') as HTMLVideoElement;v.autoplay=true;v.playsInline=true;v.muted=(name==='local');v.srcObject=stream;
    const lbl=document.createElement('div');lbl.className='vlabel';lbl.textContent=name==='local'?(ME+' 📡'):name;
    wrap.append(v,lbl);el('video-container').appendChild(wrap);videoEls[name]=wrap;
  }
  function removeVideo(name: string){videoEls[name]?.remove();delete videoEls[name];if(!Object.keys(videoEls).length)el('video-container').style.display='none';}
  async function startStream(mode: string){
    try{
      const stream=mode==='screen'?await navigator.mediaDevices.getDisplayMedia({video:{frameRate:15} as any,audio:false}):await navigator.mediaDevices.getUserMedia({video:{width:640,height:360,frameRate:15,facingMode} as any,audio:false});
      streamTrack=stream.getVideoTracks()[0];streaming=true;showVideo('local',stream);updateStreamUI(mode);streamTrack.onended=stopStream;
      for(const[n,pc] of Object.entries(peers)){pc.addTrack(streamTrack,stream);if(peerRoles[n]==='caller')await renegotiate(n,pc);}
      broadcastSignal(JSON.stringify({type:'stream-start'}));
    }catch(e: any){alert(tr('micError','Cannot access camera: ')+e.message);}
  }
  async function flipCamera(){
    if(!streaming)return;
    facingMode=facingMode==='environment'?'user':'environment';
    try{
      const stream=await navigator.mediaDevices.getUserMedia({video:{width:640,height:360,frameRate:15,facingMode} as any,audio:false});
      const newTrack=stream.getVideoTracks()[0];
      for(const[,pc] of Object.entries(peers)){
        const sender=pc.getSenders().find((s: any)=>s.track?.kind==='video');
        if(sender)await sender.replaceTrack(newTrack);
      }
      streamTrack?.stop();streamTrack=newTrack;streamTrack.onended=stopStream;
      const lv=document.querySelector('#vw-local video') as HTMLVideoElement;
      if(lv)lv.srcObject=stream;
    }catch(e: any){alert(tr('micError','Cannot access camera: ')+e.message);facingMode=facingMode==='environment'?'user':'environment';}
  }
  async function stopStream(){
    if(!streaming)return;streamTrack?.stop();streamTrack=null;streaming=false;removeVideo('local');updateStreamUI();
    for(const[n,pc] of Object.entries(peers)){const s=pc.getSenders().find((s: any)=>s.track?.kind==='video');if(s){pc.removeTrack(s);if(peerRoles[n]==='caller')await renegotiate(n,pc);}}
    broadcastSignal(JSON.stringify({type:'stream-stop'}));
  }
  async function renegotiate(name: string,pc: any){try{const o=await pc.createOffer();await pc.setLocalDescription(o);sendSignal(name,JSON.stringify({type:'voice-offer',sdp:o.sdp}));}catch(e){}}
  let _streamMode='';
  function updateStreamUI(mode=''){if(mode)_streamMode=mode;const sb=el('stream-btn'),scb=el('screen-btn'),fb=el('flip-btn'),h=!!navigator.mediaDevices?.getDisplayMedia;if(streaming){sb.textContent=tr('stopLive','⏹ Stop live');sb.classList.add('streaming');scb.style.display='none';fb.style.display=_streamMode==='camera'?'inline-block':'none';}else{sb.textContent=tr('live','📹 Live');sb.classList.remove('streaming');scb.style.display=h?'inline-block':'none';fb.style.display='none';}}
  function setupDC(name: string,dc: any){dataChannels[name]=dc;dc.onmessage=(e: MessageEvent)=>{try{const d=JSON.parse(e.data);if(d.type==='loc'&&d.name&&d.lat&&d.lng)updateMarkers(lastMemberList.map(p=>p.name===d.name?{...p,lat:d.lat,lng:d.lng,ts:Math.floor(Date.now()/1000)}:p));}catch(e){}};dc.onclose=()=>{delete dataChannels[name];};}
  function broadcastLocation(lat: number,lng: number){const msg=JSON.stringify({type:'loc',name:ME,lat,lng});Object.values(dataChannels).forEach((dc: any)=>{try{if(dc.readyState==='open')dc.send(msg);}catch(e){}});}
  async function callPeer(target: string){
    if(peers[target])return;const pc=createPC(target);peerRoles[target]='caller';
    localStream!.getTracks().forEach(t=>pc.addTrack(t,localStream!));if(streamTrack)pc.addTrack(streamTrack,new MediaStream([streamTrack]));
    const dc=pc.createDataChannel('loc');setupDC(target,dc);
    const offer=await pc.createOffer();await pc.setLocalDescription(offer);sendSignal(target,JSON.stringify({type:'voice-offer',sdp:offer.sdp}));
  }
  function createPC(name: string){
    hangupPeer(name);const pc=new RTCPeerConnection(STUN);peers[name]=pc;
    pc.onicecandidate=(e: RTCPeerConnectionIceEvent)=>{if(e.candidate)sendSignal(name,JSON.stringify({type:'candidate',candidate:e.candidate}));};
    pc.ontrack=(e: RTCTrackEvent)=>{if(e.track.kind==='audio')playAudio(name,e.streams[0]);else if(e.track.kind==='video')showVideo(name,e.streams[0]);};
    pc.ondatachannel=(e: RTCDataChannelEvent)=>setupDC(name,e.channel);
    pc.onconnectionstatechange=()=>{if(['disconnected','failed','closed'].includes(pc.connectionState)){hangupPeer(name);updatePeerStatus();}};
    return pc;
  }
  function hangupPeer(name: string){peers[name]?.close();delete peers[name];delete peerRoles[name];removeAudio(name);removeVideo(name);delete dataChannels[name];}
  async function handleSignal(sig: any){
    const data=JSON.parse(sig.data),from=sig.from_name;
    if(data.type==='call-join'){voiceStatus[from]={inCall:true,muted:false};if(inCall&&!peers[from])callPeer(from);updateMembersVoice();}
    else if(data.type==='call-leave'){voiceStatus[from]={inCall:false,muted:false};updateMembersVoice();}
    else if(data.type==='call-mute'){if(voiceStatus[from])voiceStatus[from].muted=data.muted;else voiceStatus[from]={inCall:true,muted:data.muted};updateMembersVoice();}
    else if(data.type==='avatar-update'){loadAvatars();}
    else if(data.type==='stream-stop'){removeVideo(from);}
    else if(data.type==='voice-offer'){
      if(!inCall)return;let pc=peers[from];
      if(!pc){pc=createPC(from);peerRoles[from]='callee';if(localStream)localStream.getTracks().forEach(t=>pc.addTrack(t,localStream!));if(streamTrack)pc.addTrack(streamTrack,new MediaStream([streamTrack]));}
      await pc.setRemoteDescription({type:'offer',sdp:data.sdp});const ans=await pc.createAnswer();await pc.setLocalDescription(ans);
      sendSignal(from,JSON.stringify({type:'voice-answer',sdp:ans.sdp}));updatePeerStatus();
    }else if(data.type==='voice-answer'){await peers[from]?.setRemoteDescription({type:'answer',sdp:data.sdp});updatePeerStatus();}
    else if(data.type==='candidate'){await peers[from]?.addIceCandidate(data.candidate);}
  }
  function updatePeerStatus(){const box=el('peer-status');box.innerHTML='';Object.keys(peers).forEach(n=>{const t=document.createElement('span');t.className='peer-tag in-call';t.style.borderColor=nameColor(n);t.style.color=nameColor(n);t.textContent='🎙 '+n;box.appendChild(t);});}
  function playAudio(name: string,stream: MediaStream){removeAudio(name);const a=document.createElement('audio') as HTMLAudioElement;a.autoplay=true;a.srcObject=stream;document.body.appendChild(a);audioEls[name]=a;}
  function removeAudio(name: string){audioEls[name]?.remove();delete audioEls[name];}
  function sendSignal(to: string,data: string){const fd=new FormData();fd.append('room',ROOM);fd.append('from',ME);fd.append('to',to);fd.append('data',data);fetch('/api/signal',{method:'POST',body:fd});}
  function broadcastSignal(data: string){const fd=new FormData();fd.append('room',ROOM);fd.append('from',ME);fd.append('to','*');fd.append('data',data);fetch('/api/signal',{method:'POST',body:fd});}

  function startPolling(){
    restoreMyAvatar();loadAvatars();
    let es: EventSource|null=null,reconnectTimer: any=null;
    function applyMessages(list: any[]){
      if(!list?.length)return;const box=el('chat-msgs');
      list.forEach(m=>{const id=parseInt(m.id);if(id<=lastMsgId)return;lastMsgId=id;const div=document.createElement('div');div.className='msg';div.innerHTML=`<span class="who" style="color:${nameColor(m.name)}">${escHtml(m.name)}</span>${escHtml(m.content)}`;box.appendChild(div);});
      box.scrollTop=box.scrollHeight;
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
