'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => bootApp();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Screen 1: Home */}
      <div className="screen" id="screen-home">
        <h1>🚗 FollowACar</h1>
        <input id="name-input-home" maxLength={20} placeholder="先輸入你的名稱" autoComplete="off" autoCorrect="off" spellCheck={false} />
        <button className="btn-primary" id="btn-create">＋ 建立新房間</button>
        <div className="divider">── 或加入已開啟的房間 ──</div>
        <div id="active-rooms"><span style={{fontSize:'.8rem',color:'#4b5563'}}>載入中…</span></div>
        <button className="btn-secondary" id="btn-join-manual">輸入房間代碼加入</button>
        <p id="home-err" style={{color:'#f87171',display:'none'}}></p>
      </div>

      {/* Screen 2: Created */}
      <div className="screen" id="screen-created" style={{display:'none'}}>
        <h1>🚗 FollowACar</h1>
        <p>房間建立成功！<br />複製連結分享給隊友</p>
        <div id="share-box">
          <p>分享連結</p>
          <div id="share-link"></div>
          <button className="copy-btn" id="copy-btn">複製連結</button>
        </div>
        <button className="btn-primary" id="btn-enter-name">進入房間</button>
      </div>

      {/* Screen 3: Enter name */}
      <div className="screen" id="screen-name" style={{display:'none'}}>
        <h1>🚗 FollowACar</h1>
        <p id="room-hint">輸入你的名稱加入房間</p>
        <input id="name-input" maxLength={20} placeholder="你的名稱" autoComplete="off" autoCorrect="off" spellCheck={false} />
        <button className="btn-primary" id="btn-go">加入</button>
        <p id="room-err" style={{color:'#f87171',display:'none'}}></p>
      </div>

      {/* Screen 4: Join by code */}
      <div className="screen" id="screen-join" style={{display:'none'}}>
        <h1>🚗 FollowACar</h1>
        <p>輸入房間代碼</p>
        <input id="code-input" maxLength={6} placeholder="6 碼代碼" autoComplete="off" style={{textTransform:'uppercase',letterSpacing:'.2em'}} />
        <button className="btn-primary" id="btn-code-go">加入</button>
        <button className="btn-secondary" id="btn-back">返回</button>
        <p id="code-err" style={{color:'#f87171',display:'none'}}></p>
      </div>

      {/* App */}
      <div id="app">
        <div id="map"></div>
        <div id="video-container"></div>
        <div id="gps-bar">
          <span id="gps-txt">📍 等待 GPS…</span>
          <button id="dest-btn">📌 設目的地</button>
        </div>
        <div id="panel">
          <div id="tabs">
            <button className="tab active" data-tab="chat">💬 訊息</button>
            <button className="tab" data-tab="call">📞 通話</button>
          </div>
          <div className="tab-panel active" id="tab-chat">
            <div id="chat-msgs"></div>
            <div id="chat-form">
              <input id="chat-input" placeholder="輸入訊息…" autoComplete="off" spellCheck={false} />
              <button id="chat-send">送出</button>
            </div>
          </div>
          <div className="tab-panel" id="tab-call">
            <div id="call-panel">
              <div className="call-label" style={{marginBottom:'.4rem'}}>我的大頭照</div>
              <div style={{display:'flex',alignItems:'center',gap:'.7rem',marginBottom:'.9rem'}}>
                <div id="my-avatar-wrap" style={{width:'44px',height:'44px',borderRadius:'50%',background:'#334155',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',overflow:'hidden',flexShrink:0,border:'2px solid #475569'}}>
                  <span id="my-avatar-ph" style={{fontSize:'1.3rem',pointerEvents:'none'}}>👤</span>
                  <img id="my-avatar-img" style={{width:'44px',height:'44px',objectFit:'cover',display:'none',borderRadius:'50%',pointerEvents:'none'}} alt="" />
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:'.3rem'}}>
                  <span id="my-name-label" style={{fontSize:'.85rem',color:'#f1f5f9',fontWeight:600}}></span>
                  <button id="avatar-upload-btn" style={{background:'#334155',color:'#94a3b8',border:'none',borderRadius:'6px',padding:'.25rem .65rem',fontSize:'.75rem',cursor:'pointer'}}>📷 上傳大頭照</button>
                </div>
                <input type="file" id="avatar-input" accept="image/*" style={{display:'none'}} />
              </div>
              <div className="call-label">目前成員</div>
              <div id="members-list" style={{display:'flex',flexWrap:'wrap',gap:'.4rem',marginBottom:'.5rem'}}></div>
              <div className="call-label">群體語音通話</div>
              <div className="call-actions">
                <button id="group-call-btn">🎙 加入語音</button>
                <button id="mute-btn">🎙 靜音</button>
                <button id="stream-btn">📹 直播</button>
                <button id="screen-btn">🖥 螢幕</button>
              </div>
              <div className="peer-status" id="peer-status"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Dest dialog */}
      <div id="dest-dialog">
        <div id="dest-box">
          <h3>📌 設定目的地</h3>
          <div className="dest-mode-toggle">
            <button className="dest-mode-btn active" id="dest-mode-url">🔗 貼上連結</button>
            <button className="dest-mode-btn" id="dest-mode-coord">📍 輸入座標</button>
          </div>
          <div id="dest-url-section">
            <p style={{marginBottom:'.35rem'}}>從 Google Maps <b>分享</b>後複製連結貼到下方</p>
            <input id="dest-url" placeholder="https://www.google.com/maps/…" autoComplete="off" spellCheck={false} />
          </div>
          <div id="dest-coord-section" style={{display:'none'}}>
            <p style={{marginBottom:'.35rem'}}>在 Google Maps 長按地點，複製顯示的座標貼入下方</p>
            <input id="dest-coord" placeholder="例：(38.7427938, 140.7432556)" autoComplete="off" inputMode="decimal" spellCheck={false} />
          </div>
          <input id="dest-name" placeholder="目的地名稱（可空白）" autoComplete="off" />
          <div id="dest-err"></div>
          <div className="dest-dialog-btns">
            <button id="dest-confirm">確定</button>
            <button id="dest-clear">🗑 清除</button>
            <button id="dest-cancel">取消</button>
          </div>
        </div>
      </div>
    </>
  );
}

function bootApp() {
  const L = (window as any).L;
  const PALETTE=['#f87171','#fb923c','#facc15','#4ade80','#38bdf8','#a78bfa','#f472b6','#34d399','#60a5fa','#fbbf24'];
  function nameColor(n: string){let h=0;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))>>>0;return PALETTE[h%PALETTE.length];}
  function escHtml(s: string){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
  function show(id: string){(document.getElementById(id) as HTMLElement).style.display='flex';}
  function hide(id: string){(document.getElementById(id) as HTMLElement).style.display='none';}
  function el<T extends HTMLElement>(id: string){return document.getElementById(id) as T;}

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
    else alert('上傳失敗：'+(res.error||'unknown'));
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
    if(!v){const e=el('home-err');e.textContent='請先輸入你的名稱';e.style.display='';el('name-input-home').focus();return null;}
    el('home-err').style.display='none';return v;
  }

  const _sRoom=sessionStorage.getItem('room')||localStorage.getItem('room');
  const _sName=sessionStorage.getItem('name')||localStorage.getItem('name');
  const urlRoom=new URLSearchParams(location.search).get('room');

  if(_sRoom&&_sName){ROOM=_sRoom;ME=_sName;enterApp();}
  else if(urlRoom){
    fetch(`/api/room?id=${encodeURIComponent(urlRoom)}`).then(r=>r.json()).then((res: any)=>{
      if(res.ok){ROOM=urlRoom;hide('screen-home');el('room-hint').textContent=`加入房間 ${ROOM}`;show('screen-name');}
      else{el('home-err').textContent='連結無效或房間不存在';el('home-err').style.display='';}
    });
  }else{loadActiveRooms();}

  function loadActiveRooms(){
    fetch('/api/rooms').then(r=>r.json()).then((rooms: any[])=>{
      const box=el('active-rooms');
      if(!rooms.length){box.innerHTML='<span style="font-size:.8rem;color:#4b5563">目前沒有進行中的房間</span>';return;}
      box.innerHTML='';
      rooms.forEach(r=>{
        const card=document.createElement('div');card.className='room-card';
        card.innerHTML=`<div><div class="rcode">${escHtml(r.room_id)}</div><div class="rnames">${escHtml(r.names)}</div></div><div class="rcnt">${r.cnt} 人</div>`;
        card.onclick=()=>{const name=requireName();if(!name)return;ME=name;ROOM=r.room_id;saveSession(ROOM,ME);enterApp();};
        box.appendChild(card);
      });
    }).catch(()=>{el('active-rooms').innerHTML='<span style="font-size:.8rem;color:#4b5563">無法載入房間</span>';});
  }

  el('btn-create').onclick=async()=>{
    const name=requireName();if(!name)return;
    const res=await fetch('/api/room',{method:'POST'}).then(r=>r.json());
    if(!res.ok)return;ME=name;ROOM=res.room;
    el('share-link').textContent=location.origin+'/?room='+ROOM;
    hide('screen-home');show('screen-created');
  };
  el('copy-btn').onclick=()=>{
    navigator.clipboard.writeText(el('share-link').textContent||'');
    const b=el('copy-btn');b.textContent='已複製！';b.classList.add('copied');
    setTimeout(()=>{b.textContent='複製連結';b.classList.remove('copied');},2000);
  };
  el('btn-enter-name').onclick=()=>{saveSession(ROOM,ME);hide('screen-created');enterApp();};
  el('btn-join-manual').onclick=()=>{const name=requireName();if(!name)return;ME=name;hide('screen-home');show('screen-join');};
  el('btn-back').onclick=()=>{hide('screen-join');show('screen-home');};
  el<HTMLInputElement>('code-input').addEventListener('input',function(this: HTMLInputElement){this.value=this.value.toUpperCase();});
  el('btn-code-go').onclick=async()=>{
    const code=el<HTMLInputElement>('code-input').value.trim().toUpperCase();
    const errEl=el('code-err');errEl.style.display='none';
    if(code.length!==6){errEl.textContent='請輸入 6 碼代碼';errEl.style.display='';return;}
    const res=await fetch(`/api/room?id=${encodeURIComponent(code)}`).then(r=>r.json());
    if(!res.ok){errEl.textContent='找不到此房間';errEl.style.display='';return;}
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
    if(!navigator.geolocation){setGpsBar('err','裝置不支援 GPS');return;}
    setGpsBar('','📍 請求定位權限…');requestWakeLock();
    navigator.geolocation.watchPosition(
      pos=>{setGpsBar('ok',`📍 ${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}  精度±${Math.round(pos.coords.accuracy)}m`);postLocation(pos.coords.latitude,pos.coords.longitude);},
      err=>{const m: Record<number,string>={1:'定位被拒絕，請開啟瀏覽器位置權限',2:'無法取得位置訊號',3:'定位逾時'};setGpsBar('err','❌ '+(m[err.code]||err.message));},
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
      const icon=L.divIcon({className:'',html:`<div class="car-label" style="background:${col};color:${textCol};opacity:${opacity}">${escHtml(p.name)}${online?'':' 離線'}</div>`,iconAnchor:[0,10]});
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
        +(online?'':visible?'<span style="font-size:.7rem;color:#6b7280"> 離線</span>':'<span style="font-size:.7rem;color:#4b5563"> 長時間離線</span>')
        +(vs?.inCall?`<span style="font-size:.8rem">${vs.muted?'🔇':'🎙'}</span>`:'');
      box.appendChild(tag);
    });
    if(!list.length)box.innerHTML='<span style="font-size:.8rem;color:#4b5563">尚無成員</span>';
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
    catch(e){return{ok:false,error:'網路錯誤'};}
  }
  el('dest-confirm').onclick=async()=>{
    const label=el<HTMLInputElement>('dest-name').value.trim()||'目的地';
    const errEl=el('dest-err');errEl.style.display='none';const btn=el<HTMLButtonElement>('dest-confirm');
    if(destInputMode==='coord'){
      const raw=el<HTMLInputElement>('dest-coord').value.trim();
      const m=raw.match(/(-?\d+\.\d+)[^\d\-]+(-?\d+\.\d+)/);
      if(!m){errEl.textContent='格式不正確，例：(38.7427938, 140.7432556)';errEl.style.display='';return;}
      btn.textContent='儲存中…';const res=await saveDestCoords(m[1],m[2],label);btn.textContent='確定';
      if(res.ok)closeDestDialog();else{errEl.textContent=res.error||'儲存失敗';errEl.style.display='';}
      return;
    }
    const url=el<HTMLInputElement>('dest-url').value.trim();
    if(!url){errEl.textContent='請貼上 Google Maps 連結';errEl.style.display='';return;}
    if(/maps\.app\.goo\.gl|goo\.gl/.test(url)){
      btn.textContent='展開中…';
      try{
        const fd2=new FormData();fd2.append('room',ROOM);fd2.append('url',url);fd2.append('label',label);
        const res=await fetch('/api/destination',{method:'POST',body:fd2}).then(r=>r.json());
        if(res.ok){btn.textContent='確定';closeDestDialog();return;}
        if(res.error==='ftid'){
          btn.textContent='確定';setDestMode('coord');errEl.innerHTML='';
          errEl.appendChild(Object.assign(document.createElement('div'),{textContent:'📍 短網址無法自動取得座標，請：'}));
          const steps=document.createElement('ol');steps.style.cssText='margin:.4rem 0 0 1.2rem;font-size:.78rem;line-height:1.7';
          steps.innerHTML=`<li><a href="${url}" target="_blank" rel="noopener" style="color:#f59e0b">點此開啟 Google Maps</a></li><li>長按地圖上的目的地標記</li><li>複製畫面頂部顯示的座標填入下方</li>`;
          errEl.appendChild(steps);errEl.style.display='';return;
        }
      }catch(e){}
      let coords=null;
      try{const r=await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);if(r.ok){const j=await r.json();coords=parseCoordsFromUrl(j.status?.url||'');if(!coords&&j.contents)coords=parseCoordsFromUrl(j.contents);}}catch(e){}
      if(!coords){try{const r=await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`);if(r.ok){const html=await r.text();coords=parseCoordsFromUrl(html);}}catch(e){}}
      btn.textContent='確定';
      if(coords){const res=await saveDestCoords(coords.lat,coords.lng,label);if(res.ok){closeDestDialog();return;}}
      setDestMode('coord');errEl.innerHTML=`請<a href="${url}" target="_blank" rel="noopener" style="color:#f59e0b;text-decoration:underline">點此開啟地圖</a>，從地圖上長按地標，複製顯示的座標填入下方`;errEl.style.display='';return;
    }
    const coords=parseCoordsFromUrl(url);
    if(coords){btn.textContent='儲存中…';const res=await saveDestCoords(coords.lat,coords.lng,label);btn.textContent='確定';if(res.ok)closeDestDialog();else{errEl.textContent=res.error||'儲存失敗';errEl.style.display='';}}
    else{errEl.textContent='無法從連結解析座標，請切換到「📍 輸入座標」模式';errEl.style.display='';}
  };
  function updateDestination(dest: any){
    if(!dest){destMarker?.remove();destMarker=null;return;}
    const ll=[parseFloat(dest.lat),parseFloat(dest.lng)];
    const icon=L.divIcon({className:'',html:`<div class="dest-label">🏁 ${escHtml(dest.label)}</div>`,iconAnchor:[0,10]});
    const popup=`<b>🏁 ${escHtml(dest.label)}</b><br><a href="https://maps.google.com/?daddr=${dest.lat},${dest.lng}" target="_blank" rel="noopener" style="display:inline-block;margin-top:.4rem;padding:.3rem .7rem;background:#f59e0b;color:#000;border-radius:6px;font-weight:700;text-decoration:none;font-size:.85rem">🧭 導航</a>`;
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
  function sendMsg(){const input=el<HTMLInputElement>('chat-input');if((input as any).composing)return;const text=input.value.trim();if(!text)return;input.value='';const fd=new FormData();fd.append('room',ROOM);fd.append('name',ME);fd.append('content',text);fetch('/api/message',{method:'POST',body:fd});}
  function pollMessages(){
    fetch(`/api/message?room=${encodeURIComponent(ROOM)}&since=${lastMsgId}`).then(r=>r.json()).then((msgs: any[])=>{
      if(!msgs.length)return;const box=el('chat-msgs');
      msgs.forEach(m=>{lastMsgId=Math.max(lastMsgId,parseInt(m.id));const div=document.createElement('div');div.className='msg';div.innerHTML=`<span class="who" style="color:${nameColor(m.name)}">${escHtml(m.name)}</span>${escHtml(m.content)}`;box.appendChild(div);});
      box.scrollTop=box.scrollHeight;
    });
  }

  document.querySelectorAll('.tab').forEach(t=>{
    (t as HTMLElement).onclick=()=>{
      document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(x=>x.classList.remove('active'));
      t.classList.add('active');el('tab-'+(t as HTMLElement).dataset.tab!).classList.add('active');
    };
  });

  const STUN={iceServers:[{urls:'stun:stun.l.google.com:19302'}]};
  const peers: Record<string,any>={},peerRoles: Record<string,string>={},dataChannels: Record<string,any>={};
  const audioEls: Record<string,HTMLAudioElement>={},videoEls: Record<string,HTMLElement>={};
  let localStream: MediaStream|null=null,inCall=false,muted=false,lastSigId=0;
  let streamTrack: MediaStreamTrack|null=null,streaming=false;

  function initCall(){
    el('my-name-label').textContent=ME;
    el('my-avatar-wrap').onclick=()=>el('avatar-input').click();
    el('avatar-upload-btn').onclick=()=>el('avatar-input').click();
    el<HTMLInputElement>('avatar-input').onchange=(e: any)=>{if(e.target.files[0])uploadAvatar(e.target.files[0]);e.target.value='';};
    el('group-call-btn').onclick=async()=>inCall?leaveGroupCall():await joinGroupCall();
    el('mute-btn').onclick=()=>{muted=!muted;localStream?.getAudioTracks().forEach(t=>t.enabled=!muted);const b=el('mute-btn');b.textContent=muted?'🔇 取消靜音':'🎙 靜音';b.classList.toggle('muted',muted);if(voiceStatus[ME])voiceStatus[ME].muted=muted;broadcastSignal(JSON.stringify({type:'call-mute',muted}));updateMembersVoice();};
    el('stream-btn').onclick=()=>streaming?stopStream():startStream('camera');
    if(!navigator.mediaDevices?.getDisplayMedia)el('screen-btn').style.display='none';
    else el('screen-btn').onclick=()=>startStream('screen');
  }
  async function joinGroupCall(){
    try{localStream=await navigator.mediaDevices.getUserMedia({audio:true,video:false});}catch(e: any){alert('無法取得麥克風：'+e.message);return;}
    inCall=true;muted=false;el('group-call-btn').textContent='📵 離開語音';el('group-call-btn').classList.add('in-call');
    el('mute-btn').style.display='inline-block';el('mute-btn').textContent='🎙 靜音';el('mute-btn').classList.remove('muted');
    el('stream-btn').style.display='inline-block';el('screen-btn').style.display='inline-block';updateStreamUI();
    const res=await fetch(`/api/location?room=${encodeURIComponent(ROOM)}`).then(r=>r.json());
    res.filter((p: any)=>p.name!==ME).forEach((p: any)=>callPeer(p.name));
    broadcastSignal(JSON.stringify({type:'call-join'}));voiceStatus[ME]={inCall:true,muted:false};updateMembersVoice();
  }
  function leaveGroupCall(){
    inCall=false;localStream?.getTracks().forEach(t=>t.stop());localStream=null;Object.keys(peers).forEach(hangupPeer);
    el('group-call-btn').textContent='🎙 加入語音';el('group-call-btn').classList.remove('in-call');
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
      const stream=mode==='screen'?await navigator.mediaDevices.getDisplayMedia({video:{frameRate:15} as any,audio:false}):await navigator.mediaDevices.getUserMedia({video:{width:640,height:360,frameRate:15} as any,audio:false});
      streamTrack=stream.getVideoTracks()[0];streaming=true;showVideo('local',stream);updateStreamUI();streamTrack.onended=stopStream;
      for(const[n,pc] of Object.entries(peers)){pc.addTrack(streamTrack,stream);if(peerRoles[n]==='caller')await renegotiate(n,pc);}
      broadcastSignal(JSON.stringify({type:'stream-start'}));
    }catch(e: any){alert('無法取得視訊：'+e.message);}
  }
  async function stopStream(){
    if(!streaming)return;streamTrack?.stop();streamTrack=null;streaming=false;removeVideo('local');updateStreamUI();
    for(const[n,pc] of Object.entries(peers)){const s=pc.getSenders().find((s: any)=>s.track?.kind==='video');if(s){pc.removeTrack(s);if(peerRoles[n]==='caller')await renegotiate(n,pc);}}
    broadcastSignal(JSON.stringify({type:'stream-stop'}));
  }
  async function renegotiate(name: string,pc: any){try{const o=await pc.createOffer();await pc.setLocalDescription(o);sendSignal(name,JSON.stringify({type:'voice-offer',sdp:o.sdp}));}catch(e){}}
  function updateStreamUI(){const sb=el('stream-btn'),scb=el('screen-btn'),h=!!navigator.mediaDevices?.getDisplayMedia;if(streaming){sb.textContent='⏹ 停止直播';sb.classList.add('streaming');scb.style.display='none';}else{sb.textContent='📹 鏡頭直播';sb.classList.remove('streaming');scb.style.display=h?'inline-block':'none';}}
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
    pollMessages();setInterval(pollMessages,2000);
    fetch(`/api/location?room=${encodeURIComponent(ROOM)}`).then(r=>r.json()).then(updateMarkers);
    setInterval(()=>fetch(`/api/location?room=${encodeURIComponent(ROOM)}`).then(r=>r.json()).then(updateMarkers),4000);
    setInterval(pollSignals,1500);
    fetch(`/api/destination?room=${encodeURIComponent(ROOM)}`).then(r=>r.json()).then(updateDestination);
    setInterval(()=>fetch(`/api/destination?room=${encodeURIComponent(ROOM)}`).then(r=>r.json()).then(updateDestination),5000);
    restoreMyAvatar();loadAvatars();setInterval(loadAvatars,30000);
  }
  function pollSignals(){fetch(`/api/signal?room=${encodeURIComponent(ROOM)}&me=${encodeURIComponent(ME)}&since=${lastSigId}`).then(r=>r.json()).then((sigs: any[])=>{sigs.forEach(s=>{lastSigId=Math.max(lastSigId,parseInt(s.id));handleSignal(s);});});}
}
