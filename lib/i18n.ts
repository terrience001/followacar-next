export type Lang = 'zh-TW'|'en'|'ja'|'ko'|'es'|'fr'|'de'|'pt'|'ar'|'hi'|'it'|'ru'|'th'|'vi'|'id'|'tr'|'pl'|'nl'|'uk'|'ms';

export const LANGUAGES: {code: Lang; label: string}[] = [
  {code:'zh-TW', label:'繁體中文'},
  {code:'en',    label:'English'},
  {code:'ja',    label:'日本語'},
  {code:'ko',    label:'한국어'},
  {code:'es',    label:'Español'},
  {code:'fr',    label:'Français'},
  {code:'de',    label:'Deutsch'},
  {code:'pt',    label:'Português'},
  {code:'ar',    label:'العربية'},
  {code:'hi',    label:'हिन्दी'},
  {code:'it',    label:'Italiano'},
  {code:'ru',    label:'Русский'},
  {code:'th',    label:'ภาษาไทย'},
  {code:'vi',    label:'Tiếng Việt'},
  {code:'id',    label:'Bahasa Indonesia'},
  {code:'tr',    label:'Türkçe'},
  {code:'pl',    label:'Polski'},
  {code:'nl',    label:'Nederlands'},
  {code:'uk',    label:'Українська'},
  {code:'ms',    label:'Bahasa Melayu'},
];

type Translations = {
  nameplaceholder: string;
  createRoom: string;
  orJoin: string;
  loading: string;
  joinByCode: string;
  enterNameFirst: string;
  roomCreated: string;
  shareLink: string;
  copyLink: string;
  copied: string;
  enterRoom: string;
  enterNameToJoin: string;
  joinRoomLabel: string;
  yourName: string;
  join: string;
  enterCode: string;
  codePlaceholder: string;
  back: string;
  invalidCode: string;
  roomNotFound: string;
  invalidLink: string;
  noRooms: string;
  loadFailed: string;
  waitingGps: string;
  setDest: string;
  msgTab: string;
  callTab: string;
  myAvatar: string;
  uploadAvatar: string;
  members: string;
  voiceCall: string;
  joinVoice: string;
  leaveVoice: string;
  mute: string;
  unmute: string;
  live: string;
  stopLive: string;
  screen: string;
  setDestTitle: string;
  pasteLink: string;
  enterCoord: string;
  gmapsInstruct: string;
  coordInstruct: string;
  coordPlaceholder: string;
  destName: string;
  confirm: string;
  clear: string;
  cancel: string;
  saving: string;
  expanding: string;
  badCoordFormat: string;
  pasteGmaps: string;
  noCoordInLink: string;
  navigate: string;
  offline: string;
  longOffline: string;
  noMembers: string;
  micError: string;
  uploadFailed: string;
  gpsPermDenied: string;
  gpsNoSignal: string;
  gpsTimeout: string;
  openGmaps: string;
  longPressCoord: string;
  copyCoordBelow: string;
  logout: string;
  logoutConfirm: string;
};

const T: Record<Lang, Translations> = {
  'zh-TW': {
    nameplaceholder:'先輸入你的名稱',createRoom:'＋ 建立新房間',orJoin:'── 或加入已開啟的房間 ──',
    loading:'載入中…',joinByCode:'輸入房間代碼加入',enterNameFirst:'請先輸入你的名稱',
    roomCreated:'房間建立成功！\n複製連結分享給隊友',shareLink:'分享連結',copyLink:'複製連結',copied:'已複製！',
    enterRoom:'進入房間',enterNameToJoin:'輸入你的名稱加入房間',joinRoomLabel:'加入房間',yourName:'你的名稱',join:'加入',
    enterCode:'輸入房間代碼',codePlaceholder:'6 碼代碼',back:'返回',invalidCode:'請輸入 6 碼代碼',roomNotFound:'找不到此房間',
    invalidLink:'連結無效或房間不存在',noRooms:'目前沒有進行中的房間',loadFailed:'無法載入房間',
    waitingGps:'📍 等待 GPS…',setDest:'📌 設目的地',msgTab:'💬 訊息',callTab:'📞 通話',
    myAvatar:'我的大頭照',uploadAvatar:'📷 上傳大頭照',members:'目前成員',voiceCall:'群體語音通話',
    joinVoice:'🎙 加入語音',leaveVoice:'📵 離開語音',mute:'🎙 靜音',unmute:'🔇 取消靜音',
    live:'📹 鏡頭直播',stopLive:'⏹ 停止直播',screen:'🖥 螢幕',
    setDestTitle:'📌 設定目的地',pasteLink:'🔗 貼上連結',enterCoord:'📍 輸入座標',
    gmapsInstruct:'從 Google Maps <b>分享</b>後複製連結貼到下方',coordInstruct:'在 Google Maps 長按地點，複製顯示的座標貼入下方',
    coordPlaceholder:'例：(38.7427938, 140.7432556)',destName:'目的地名稱（可空白）',
    confirm:'確定',clear:'🗑 清除',cancel:'取消',saving:'儲存中…',expanding:'展開中…',
    badCoordFormat:'格式不正確，例：(38.7427938, 140.7432556)',pasteGmaps:'請貼上 Google Maps 連結',
    noCoordInLink:'無法從連結解析座標，請切換到「📍 輸入座標」模式',navigate:'🧭 導航',
    offline:' 離線',longOffline:' 長時間離線',noMembers:'尚無成員',
    micError:'無法取得麥克風：',uploadFailed:'上傳失敗：',
    gpsPermDenied:'定位被拒絕，請開啟瀏覽器位置權限',gpsNoSignal:'無法取得位置訊號',gpsTimeout:'定位逾時',
    openGmaps:'點此開啟 Google Maps',longPressCoord:'長按地圖上的目的地標記',copyCoordBelow:'複製畫面頂部顯示的座標填入下方',
    logout:'🚪 離開房間',logoutConfirm:'確定要離開房間嗎？',
  },
  'en': {
    nameplaceholder:'Enter your name',createRoom:'＋ Create New Room',orJoin:'── or join an active room ──',
    loading:'Loading…',joinByCode:'Join by room code',enterNameFirst:'Please enter your name first',
    roomCreated:'Room created!\nCopy the link to share with teammates',shareLink:'Share link',copyLink:'Copy link',copied:'Copied!',
    enterRoom:'Enter room',enterNameToJoin:'Enter your name to join',joinRoomLabel:'Join room',yourName:'Your name',join:'Join',
    enterCode:'Enter room code',codePlaceholder:'6-digit code',back:'Back',invalidCode:'Please enter a 6-digit code',roomNotFound:'Room not found',
    invalidLink:'Invalid link or room does not exist',noRooms:'No active rooms',loadFailed:'Failed to load rooms',
    waitingGps:'📍 Waiting for GPS…',setDest:'📌 Set destination',msgTab:'💬 Messages',callTab:'📞 Calls',
    myAvatar:'My avatar',uploadAvatar:'📷 Upload avatar',members:'Members',voiceCall:'Group voice call',
    joinVoice:'🎙 Join voice',leaveVoice:'📵 Leave voice',mute:'🎙 Mute',unmute:'🔇 Unmute',
    live:'📹 Camera live',stopLive:'⏹ Stop live',screen:'🖥 Screen',
    setDestTitle:'📌 Set destination',pasteLink:'🔗 Paste link',enterCoord:'📍 Enter coords',
    gmapsInstruct:'Copy a <b>Share</b> link from Google Maps and paste below',coordInstruct:'Long-press a location on Google Maps, then paste the coordinates below',
    coordPlaceholder:'e.g. (38.7427938, 140.7432556)',destName:'Destination name (optional)',
    confirm:'Confirm',clear:'🗑 Clear',cancel:'Cancel',saving:'Saving…',expanding:'Expanding…',
    badCoordFormat:'Invalid format, e.g. (38.7427938, 140.7432556)',pasteGmaps:'Please paste a Google Maps link',
    noCoordInLink:'Cannot parse coordinates from link, switch to 📍 Enter coords mode',navigate:'🧭 Navigate',
    offline:' Offline',longOffline:' Long offline',noMembers:'No members yet',
    micError:'Cannot access microphone: ',uploadFailed:'Upload failed: ',
    gpsPermDenied:'Location denied, please enable browser location permission',gpsNoSignal:'Cannot get location signal',gpsTimeout:'Location timeout',
    openGmaps:'Open Google Maps',longPressCoord:'Long-press the destination on the map',copyCoordBelow:'Copy the coordinates shown at the top and paste below',
    logout:'🚪 Leave room',logoutConfirm:'Are you sure you want to leave the room?',
  },
  'ja': {
    nameprintf:'名前を入力してください',nameplaceholder:'名前を入力してください',createRoom:'＋ 新しいルームを作成',orJoin:'── またはアクティブなルームに参加 ──',
    loading:'読み込み中…',joinByCode:'ルームコードで参加',enterNameFirst:'先に名前を入力してください',
    roomCreated:'ルームが作成されました！\nリンクをコピーしてチームメイトに共有',shareLink:'共有リンク',copyLink:'リンクをコピー',copied:'コピーしました！',
    enterRoom:'ルームに入る',enterNameToJoin:'名前を入力して参加',joinRoomLabel:'ルームに参加',yourName:'あなたの名前',join:'参加',
    enterCode:'ルームコードを入力',codePlaceholder:'6桁のコード',back:'戻る',invalidCode:'6桁のコードを入力してください',roomNotFound:'ルームが見つかりません',
    invalidLink:'無効なリンクまたはルームが存在しません',noRooms:'アクティブなルームはありません',loadFailed:'ルームの読み込みに失敗',
    waitingGps:'📍 GPSを待機中…',setDest:'📌 目的地を設定',msgTab:'💬 メッセージ',callTab:'📞 通話',
    myAvatar:'マイアバター',uploadAvatar:'📷 アバターをアップロード',members:'メンバー',voiceCall:'グループ音声通話',
    joinVoice:'🎙 音声に参加',leaveVoice:'📵 音声から退出',mute:'🎙 ミュート',unmute:'🔇 ミュート解除',
    live:'📹 カメラライブ',stopLive:'⏹ ライブ停止',screen:'🖥 画面',
    setDestTitle:'📌 目的地を設定',pasteLink:'🔗 リンクを貼り付け',enterCoord:'📍 座標を入力',
    gmapsInstruct:'Google Mapsの<b>共有</b>リンクをコピーして下に貼り付け',coordInstruct:'Google Mapsで場所を長押しし、座標をコピーして下に貼り付け',
    coordPlaceholder:'例：(38.7427938, 140.7432556)',destName:'目的地名（省略可）',
    confirm:'確定',clear:'🗑 クリア',cancel:'キャンセル',saving:'保存中…',expanding:'展開中…',
    badCoordFormat:'形式が正しくありません。例：(38.7427938, 140.7432556)',pasteGmaps:'Google Mapsのリンクを貼り付けてください',
    noCoordInLink:'リンクから座標を解析できません。📍 座標入力モードに切り替えてください',navigate:'🧭 ナビ',
    offline:' オフライン',longOffline:' 長時間オフライン',noMembers:'メンバーはまだいません',
    micError:'マイクにアクセスできません：',uploadFailed:'アップロード失敗：',
    gpsPermDenied:'位置情報が拒否されました。ブラウザの位置情報を有効にしてください',gpsNoSignal:'位置情報を取得できません',gpsTimeout:'位置情報タイムアウト',
    openGmaps:'Google Mapsを開く',longPressCoord:'地図上の目的地を長押し',copyCoordBelow:'上部に表示された座標をコピーして下に貼り付け',
    logout:'🚪 ルームを退出',logoutConfirm:'ルームを退出してもよろしいですか？',
  } as any,
  'ko': {
    nameplaceholder:'이름을 입력하세요',createRoom:'＋ 새 방 만들기',orJoin:'── 또는 활성 방에 참여 ──',
    loading:'로딩 중…',joinByCode:'방 코드로 참여',enterNameFirst:'먼저 이름을 입력해 주세요',
    roomCreated:'방이 생성되었습니다!\n링크를 복사해 팀원들에게 공유하세요',shareLink:'공유 링크',copyLink:'링크 복사',copied:'복사됨!',
    enterRoom:'방에 들어가기',enterNameToJoin:'이름을 입력해 방에 참여',joinRoomLabel:'방 참여',yourName:'내 이름',join:'참여',
    enterCode:'방 코드 입력',codePlaceholder:'6자리 코드',back:'뒤로',invalidCode:'6자리 코드를 입력해 주세요',roomNotFound:'방을 찾을 수 없습니다',
    invalidLink:'유효하지 않은 링크 또는 방이 존재하지 않음',noRooms:'활성 방 없음',loadFailed:'방 로드 실패',
    waitingGps:'📍 GPS 대기 중…',setDest:'📌 목적지 설정',msgTab:'💬 메시지',callTab:'📞 통화',
    myAvatar:'내 아바타',uploadAvatar:'📷 아바타 업로드',members:'현재 멤버',voiceCall:'그룹 음성 통화',
    joinVoice:'🎙 음성 참여',leaveVoice:'📵 음성 종료',mute:'🎙 음소거',unmute:'🔇 음소거 해제',
    live:'📹 카메라 라이브',stopLive:'⏹ 라이브 종료',screen:'🖥 화면',
    setDestTitle:'📌 목적지 설정',pasteLink:'🔗 링크 붙여넣기',enterCoord:'📍 좌표 입력',
    gmapsInstruct:'Google Maps에서 <b>공유</b> 링크를 복사해 아래에 붙여넣기',coordInstruct:'Google Maps에서 위치를 길게 누르고 좌표를 아래에 붙여넣기',
    coordPlaceholder:'예：(38.7427938, 140.7432556)',destName:'목적지 이름 (선택)',
    confirm:'확인',clear:'🗑 지우기',cancel:'취소',saving:'저장 중…',expanding:'확장 중…',
    badCoordFormat:'형식이 올바르지 않습니다. 예：(38.7427938, 140.7432556)',pasteGmaps:'Google Maps 링크를 붙여넣어 주세요',
    noCoordInLink:'링크에서 좌표를 파싱할 수 없습니다. 📍 좌표 입력 모드로 전환하세요',navigate:'🧭 내비게이션',
    offline:' 오프라인',longOffline:' 장시간 오프라인',noMembers:'멤버 없음',
    micError:'마이크 접근 불가：',uploadFailed:'업로드 실패：',
    gpsPermDenied:'위치 권한이 거부됨. 브라우저 위치 권한을 활성화하세요',gpsNoSignal:'위치 신호를 가져올 수 없음',gpsTimeout:'위치 시간 초과',
    openGmaps:'Google Maps 열기',longPressCoord:'지도에서 목적지를 길게 누르기',copyCoordBelow:'상단에 표시된 좌표를 복사해 아래에 붙여넣기',
    logout:'🚪 방 나가기',logoutConfirm:'방을 나가시겠습니까?',
  } as any,
  'es': {
    nameplaceholder:'Ingresa tu nombre',createRoom:'＋ Crear nueva sala',orJoin:'── o únete a una sala activa ──',
    loading:'Cargando…',joinByCode:'Unirse por código',enterNameFirst:'Por favor ingresa tu nombre primero',
    roomCreated:'¡Sala creada!\nCopia el enlace para compartir con tu equipo',shareLink:'Enlace de invitación',copyLink:'Copiar enlace',copied:'¡Copiado!',
    enterRoom:'Entrar a la sala',enterNameToJoin:'Ingresa tu nombre para unirte',joinRoomLabel:'Unirse a sala',yourName:'Tu nombre',join:'Unirse',
    enterCode:'Ingresa el código',codePlaceholder:'Código de 6 dígitos',back:'Volver',invalidCode:'Ingresa un código de 6 dígitos',roomNotFound:'Sala no encontrada',
    invalidLink:'Enlace inválido o sala inexistente',noRooms:'No hay salas activas',loadFailed:'Error al cargar salas',
    waitingGps:'📍 Esperando GPS…',setDest:'📌 Establecer destino',msgTab:'💬 Mensajes',callTab:'📞 Llamadas',
    myAvatar:'Mi avatar',uploadAvatar:'📷 Subir avatar',members:'Miembros',voiceCall:'Llamada de grupo',
    joinVoice:'🎙 Unirse a voz',leaveVoice:'📵 Salir de voz',mute:'🎙 Silenciar',unmute:'🔇 Activar sonido',
    live:'📹 En vivo',stopLive:'⏹ Detener en vivo',screen:'🖥 Pantalla',
    setDestTitle:'📌 Establecer destino',pasteLink:'🔗 Pegar enlace',enterCoord:'📍 Ingresar coords',
    gmapsInstruct:'Copia un enlace de <b>Compartir</b> de Google Maps y pégalo abajo',coordInstruct:'Mantén presionado un lugar en Google Maps, luego pega las coordenadas abajo',
    coordPlaceholder:'ej: (38.7427938, 140.7432556)',destName:'Nombre del destino (opcional)',
    confirm:'Confirmar',clear:'🗑 Limpiar',cancel:'Cancelar',saving:'Guardando…',expanding:'Expandiendo…',
    badCoordFormat:'Formato inválido, ej: (38.7427938, 140.7432556)',pasteGmaps:'Por favor pega un enlace de Google Maps',
    noCoordInLink:'No se pueden obtener coordenadas del enlace, usa el modo 📍 Ingresar coords',navigate:'🧭 Navegar',
    offline:' Desconectado',longOffline:' Largo tiempo desconectado',noMembers:'Sin miembros',
    micError:'No se puede acceder al micrófono: ',uploadFailed:'Error al subir: ',
    gpsPermDenied:'Ubicación denegada, activa los permisos de ubicación',gpsNoSignal:'No se puede obtener señal de ubicación',gpsTimeout:'Tiempo de espera de ubicación',
    openGmaps:'Abrir Google Maps',longPressCoord:'Mantén presionado el destino en el mapa',copyCoordBelow:'Copia las coordenadas mostradas arriba y pégalas abajo',
    logout:'🚪 Salir de la sala',logoutConfirm:'¿Seguro que quieres salir de la sala?',
  } as any,
  'fr': {
    nameplaceholder:'Entrez votre nom',createRoom:'＋ Créer une salle',orJoin:'── ou rejoindre une salle active ──',
    loading:'Chargement…',joinByCode:'Rejoindre par code',enterNameFirst:'Veuillez entrer votre nom d\'abord',
    roomCreated:'Salle créée !\nCopiez le lien pour le partager',shareLink:'Lien de partage',copyLink:'Copier le lien',copied:'Copié !',
    enterRoom:'Entrer dans la salle',enterNameToJoin:'Entrez votre nom pour rejoindre',joinRoomLabel:'Rejoindre la salle',yourName:'Votre nom',join:'Rejoindre',
    enterCode:'Entrez le code',codePlaceholder:'Code à 6 chiffres',back:'Retour',invalidCode:'Entrez un code à 6 chiffres',roomNotFound:'Salle introuvable',
    invalidLink:'Lien invalide ou salle inexistante',noRooms:'Aucune salle active',loadFailed:'Échec du chargement',
    waitingGps:'📍 En attente du GPS…',setDest:'📌 Définir destination',msgTab:'💬 Messages',callTab:'📞 Appels',
    myAvatar:'Mon avatar',uploadAvatar:'📷 Téléverser avatar',members:'Membres',voiceCall:'Appel vocal de groupe',
    joinVoice:'🎙 Rejoindre le vocal',leaveVoice:'📵 Quitter le vocal',mute:'🎙 Muet',unmute:'🔇 Activer le son',
    live:'📹 Live caméra',stopLive:'⏹ Arrêter le live',screen:'🖥 Écran',
    setDestTitle:'📌 Définir destination',pasteLink:'🔗 Coller le lien',enterCoord:'📍 Entrer coords',
    gmapsInstruct:'Copiez un lien de <b>partage</b> Google Maps et collez-le ci-dessous',coordInstruct:'Appuyez longuement sur un lieu dans Google Maps, puis collez les coordonnées ci-dessous',
    coordPlaceholder:'ex : (38.7427938, 140.7432556)',destName:'Nom de la destination (facultatif)',
    confirm:'Confirmer',clear:'🗑 Effacer',cancel:'Annuler',saving:'Enregistrement…',expanding:'Expansion…',
    badCoordFormat:'Format invalide, ex : (38.7427938, 140.7432556)',pasteGmaps:'Veuillez coller un lien Google Maps',
    noCoordInLink:'Impossible d\'extraire les coordonnées, passez au mode 📍 Entrer coords',navigate:'🧭 Naviguer',
    offline:' Hors ligne',longOffline:' Longtemps hors ligne',noMembers:'Aucun membre',
    micError:'Impossible d\'accéder au microphone : ',uploadFailed:'Échec du téléversement : ',
    gpsPermDenied:'Localisation refusée, activez la permission de localisation',gpsNoSignal:'Impossible d\'obtenir le signal de localisation',gpsTimeout:'Délai de localisation dépassé',
    openGmaps:'Ouvrir Google Maps',longPressCoord:'Appuyez longuement sur la destination sur la carte',copyCoordBelow:'Copiez les coordonnées affichées en haut et collez-les ci-dessous',
    logout:'🚪 Quitter la salle',logoutConfirm:'Voulez-vous vraiment quitter la salle ?',
  } as any,
  'de': {
    nameplaceholder:'Name eingeben',createRoom:'＋ Neuen Raum erstellen',orJoin:'── oder aktivem Raum beitreten ──',
    loading:'Lädt…',joinByCode:'Per Code beitreten',enterNameFirst:'Bitte zuerst Namen eingeben',
    roomCreated:'Raum erstellt!\nLink kopieren und teilen',shareLink:'Einladungslink',copyLink:'Link kopieren',copied:'Kopiert!',
    enterRoom:'Raum betreten',enterNameToJoin:'Namen eingeben um beizutreten',joinRoomLabel:'Raum beitreten',yourName:'Dein Name',join:'Beitreten',
    enterCode:'Code eingeben',codePlaceholder:'6-stelliger Code',back:'Zurück',invalidCode:'Bitte 6-stelligen Code eingeben',roomNotFound:'Raum nicht gefunden',
    invalidLink:'Ungültiger Link oder Raum nicht vorhanden',noRooms:'Keine aktiven Räume',loadFailed:'Räume konnten nicht geladen werden',
    waitingGps:'📍 Warte auf GPS…',setDest:'📌 Ziel festlegen',msgTab:'💬 Nachrichten',callTab:'📞 Anrufe',
    myAvatar:'Mein Avatar',uploadAvatar:'📷 Avatar hochladen',members:'Mitglieder',voiceCall:'Gruppensprachanruf',
    joinVoice:'🎙 Sprache beitreten',leaveVoice:'📵 Sprache verlassen',mute:'🎙 Stummschalten',unmute:'🔇 Ton an',
    live:'📹 Kamera-Live',stopLive:'⏹ Live stoppen',screen:'🖥 Bildschirm',
    setDestTitle:'📌 Ziel festlegen',pasteLink:'🔗 Link einfügen',enterCoord:'📍 Koordinaten eingeben',
    gmapsInstruct:'Kopiere einen <b>Teilen</b>-Link von Google Maps und füge ihn unten ein',coordInstruct:'Halte einen Ort in Google Maps gedrückt, dann Koordinaten unten einfügen',
    coordPlaceholder:'z.B. (38.7427938, 140.7432556)',destName:'Zielname (optional)',
    confirm:'Bestätigen',clear:'🗑 Löschen',cancel:'Abbrechen',saving:'Speichern…',expanding:'Expandieren…',
    badCoordFormat:'Ungültiges Format, z.B. (38.7427938, 140.7432556)',pasteGmaps:'Bitte Google Maps-Link einfügen',
    noCoordInLink:'Koordinaten konnten nicht extrahiert werden, wechsle zu 📍 Koordinaten eingeben',navigate:'🧭 Navigation',
    offline:' Offline',longOffline:' Lang offline',noMembers:'Keine Mitglieder',
    micError:'Mikrofon nicht erreichbar: ',uploadFailed:'Upload fehlgeschlagen: ',
    gpsPermDenied:'Standort abgelehnt, bitte Standortberechtigung aktivieren',gpsNoSignal:'Kein Standortsignal',gpsTimeout:'Standort-Timeout',
    openGmaps:'Google Maps öffnen',longPressCoord:'Ziel auf der Karte gedrückt halten',copyCoordBelow:'Oben angezeigte Koordinaten kopieren und unten einfügen',
    logout:'🚪 Raum verlassen',logoutConfirm:'Raum wirklich verlassen?',
  } as any,
  'pt': {
    nameplaceholder:'Digite seu nome',createRoom:'＋ Criar nova sala',orJoin:'── ou entre em uma sala ativa ──',
    loading:'Carregando…',joinByCode:'Entrar com código',enterNameFirst:'Por favor insira seu nome primeiro',
    roomCreated:'Sala criada!\nCopie o link para compartilhar',shareLink:'Link de convite',copyLink:'Copiar link',copied:'Copiado!',
    enterRoom:'Entrar na sala',enterNameToJoin:'Digite seu nome para entrar',joinRoomLabel:'Entrar na sala',yourName:'Seu nome',join:'Entrar',
    enterCode:'Digite o código',codePlaceholder:'Código de 6 dígitos',back:'Voltar',invalidCode:'Digite um código de 6 dígitos',roomNotFound:'Sala não encontrada',
    invalidLink:'Link inválido ou sala inexistente',noRooms:'Nenhuma sala ativa',loadFailed:'Falha ao carregar salas',
    waitingGps:'📍 Aguardando GPS…',setDest:'📌 Definir destino',msgTab:'💬 Mensagens',callTab:'📞 Chamadas',
    myAvatar:'Meu avatar',uploadAvatar:'📷 Enviar avatar',members:'Membros',voiceCall:'Chamada em grupo',
    joinVoice:'🎙 Entrar na voz',leaveVoice:'📵 Sair da voz',mute:'🎙 Silenciar',unmute:'🔇 Ativar som',
    live:'📹 Live câmera',stopLive:'⏹ Parar live',screen:'🖥 Tela',
    setDestTitle:'📌 Definir destino',pasteLink:'🔗 Colar link',enterCoord:'📍 Inserir coords',
    gmapsInstruct:'Copie um link de <b>Compartilhar</b> do Google Maps e cole abaixo',coordInstruct:'Pressione por uma localização no Google Maps, depois cole as coordenadas abaixo',
    coordPlaceholder:'ex: (38.7427938, 140.7432556)',destName:'Nome do destino (opcional)',
    confirm:'Confirmar',clear:'🗑 Limpar',cancel:'Cancelar',saving:'Salvando…',expanding:'Expandindo…',
    badCoordFormat:'Formato inválido, ex: (38.7427938, 140.7432556)',pasteGmaps:'Cole um link do Google Maps',
    noCoordInLink:'Não é possível obter coordenadas do link, use o modo 📍 Inserir coords',navigate:'🧭 Navegar',
    offline:' Offline',longOffline:' Offline há muito tempo',noMembers:'Sem membros',
    micError:'Não é possível acessar o microfone: ',uploadFailed:'Falha no envio: ',
    gpsPermDenied:'Localização negada, ative a permissão de localização',gpsNoSignal:'Não é possível obter sinal de localização',gpsTimeout:'Tempo limite de localização',
    openGmaps:'Abrir Google Maps',longPressCoord:'Pressione por no destino no mapa',copyCoordBelow:'Copie as coordenadas exibidas acima e cole abaixo',
    logout:'🚪 Sair da sala',logoutConfirm:'Tem certeza que quer sair da sala?',
  } as any,
  'ar': {
    nameplaceholder:'أدخل اسمك',createRoom:'＋ إنشاء غرفة جديدة',orJoin:'── أو انضم إلى غرفة نشطة ──',
    loading:'جارٍ التحميل…',joinByCode:'الانضمام برمز',enterNameFirst:'يرجى إدخال اسمك أولاً',
    roomCreated:'تم إنشاء الغرفة!\nانسخ الرابط وشاركه مع فريقك',shareLink:'رابط المشاركة',copyLink:'نسخ الرابط',copied:'تم النسخ!',
    enterRoom:'دخول الغرفة',enterNameToJoin:'أدخل اسمك للانضمام',joinRoomLabel:'انضمام للغرفة',yourName:'اسمك',join:'انضمام',
    enterCode:'أدخل الرمز',codePlaceholder:'رمز 6 أرقام',back:'رجوع',invalidCode:'يرجى إدخال رمز مكون من 6 أرقام',roomNotFound:'الغرفة غير موجودة',
    invalidLink:'رابط غير صالح أو الغرفة غير موجودة',noRooms:'لا توجد غرف نشطة',loadFailed:'فشل تحميل الغرف',
    waitingGps:'📍 في انتظار GPS…',setDest:'📌 تعيين الوجهة',msgTab:'💬 الرسائل',callTab:'📞 المكالمات',
    myAvatar:'صورتي الرمزية',uploadAvatar:'📷 رفع صورة رمزية',members:'الأعضاء',voiceCall:'مكالمة جماعية',
    joinVoice:'🎙 انضمام للصوت',leaveVoice:'📵 مغادرة الصوت',mute:'🎙 كتم الصوت',unmute:'🔇 إلغاء الكتم',
    live:'📹 بث مباشر',stopLive:'⏹ إيقاف البث',screen:'🖥 الشاشة',
    setDestTitle:'📌 تعيين الوجهة',pasteLink:'🔗 لصق الرابط',enterCoord:'📍 إدخال الإحداثيات',
    gmapsInstruct:'انسخ رابط <b>مشاركة</b> من خرائط Google والصقه أدناه',coordInstruct:'اضغط مطولاً على موقع في خرائط Google ثم الصق الإحداثيات أدناه',
    coordPlaceholder:'مثال: (38.7427938, 140.7432556)',destName:'اسم الوجهة (اختياري)',
    confirm:'تأكيد',clear:'🗑 مسح',cancel:'إلغاء',saving:'جارٍ الحفظ…',expanding:'جارٍ التوسيع…',
    badCoordFormat:'تنسيق غير صحيح، مثال: (38.7427938, 140.7432556)',pasteGmaps:'يرجى لصق رابط خرائط Google',
    noCoordInLink:'لا يمكن استخراج الإحداثيات، استخدم وضع 📍 إدخال الإحداثيات',navigate:'🧭 ملاحة',
    offline:' غير متصل',longOffline:' غير متصل منذ وقت طويل',noMembers:'لا يوجد أعضاء',
    micError:'لا يمكن الوصول للميكروفون: ',uploadFailed:'فشل الرفع: ',
    gpsPermDenied:'تم رفض الموقع، يرجى تفعيل إذن الموقع',gpsNoSignal:'لا يمكن الحصول على إشارة الموقع',gpsTimeout:'انتهت مهلة الموقع',
    openGmaps:'فتح خرائط Google',longPressCoord:'اضغط مطولاً على الوجهة في الخريطة',copyCoordBelow:'انسخ الإحداثيات المعروضة أعلاه والصقها أدناه',
    logout:'🚪 مغادرة الغرفة',logoutConfirm:'هل أنت متأكد من مغادرة الغرفة؟',
  } as any,
  'hi': {
    nameplaceholder:'अपना नाम दर्ज करें',createRoom:'＋ नया रूम बनाएं',orJoin:'── या किसी सक्रिय रूम में शामिल हों ──',
    loading:'लोड हो रहा है…',joinByCode:'कोड से जुड़ें',enterNameFirst:'कृपया पहले अपना नाम दर्ज करें',
    roomCreated:'रूम बना दिया गया!\nलिंक कॉपी करें और टीम से शेयर करें',shareLink:'शेयर लिंक',copyLink:'लिंक कॉपी करें',copied:'कॉपी हो गया!',
    enterRoom:'रूम में प्रवेश',enterNameToJoin:'जुड़ने के लिए नाम दर्ज करें',joinRoomLabel:'रूम में जुड़ें',yourName:'आपका नाम',join:'जुड़ें',
    enterCode:'कोड दर्ज करें',codePlaceholder:'6 अंकों का कोड',back:'वापस',invalidCode:'6 अंकों का कोड दर्ज करें',roomNotFound:'रूम नहीं मिला',
    invalidLink:'अमान्य लिंक या रूम मौजूद नहीं',noRooms:'कोई सक्रिय रूम नहीं',loadFailed:'रूम लोड नहीं हो सका',
    waitingGps:'📍 GPS का इंतज़ार…',setDest:'📌 गंतव्य सेट करें',msgTab:'💬 संदेश',callTab:'📞 कॉल',
    myAvatar:'मेरा अवतार',uploadAvatar:'📷 अवतार अपलोड करें',members:'सदस्य',voiceCall:'ग्रुप वॉयस कॉल',
    joinVoice:'🎙 वॉयस में जुड़ें',leaveVoice:'📵 वॉयस छोड़ें',mute:'🎙 म्यूट',unmute:'🔇 अनम्यूट',
    live:'📹 कैमरा लाइव',stopLive:'⏹ लाइव बंद करें',screen:'🖥 स्क्रीन',
    setDestTitle:'📌 गंतव्य सेट करें',pasteLink:'🔗 लिंक पेस्ट करें',enterCoord:'📍 कोऑर्डिनेट दर्ज करें',
    gmapsInstruct:'Google Maps से <b>शेयर</b> लिंक कॉपी करें और नीचे पेस्ट करें',coordInstruct:'Google Maps पर किसी स्थान को देर तक दबाएं, फिर कोऑर्डिनेट नीचे पेस्ट करें',
    coordPlaceholder:'उदा: (38.7427938, 140.7432556)',destName:'गंतव्य नाम (वैकल्पिक)',
    confirm:'पुष्टि करें',clear:'🗑 साफ़ करें',cancel:'रद्द करें',saving:'सहेजा जा रहा है…',expanding:'विस्तार हो रहा है…',
    badCoordFormat:'अमान्य फ़ॉर्मेट, उदा: (38.7427938, 140.7432556)',pasteGmaps:'कृपया Google Maps लिंक पेस्ट करें',
    noCoordInLink:'लिंक से कोऑर्डिनेट नहीं मिला, 📍 कोऑर्डिनेट दर्ज करें मोड में जाएं',navigate:'🧭 नेविगेट',
    offline:' ऑफलाइन',longOffline:' लंबे समय से ऑफलाइन',noMembers:'कोई सदस्य नहीं',
    micError:'माइक्रोफ़ोन एक्सेस नहीं हो सका: ',uploadFailed:'अपलोड विफल: ',
    gpsPermDenied:'लोकेशन अस्वीकृत, ब्राउज़र लोकेशन परमिशन चालू करें',gpsNoSignal:'लोकेशन सिग्नल नहीं मिला',gpsTimeout:'लोकेशन टाइमआउट',
    openGmaps:'Google Maps खोलें',longPressCoord:'मानचित्र पर गंतव्य को देर तक दबाएं',copyCoordBelow:'ऊपर दिखाए गए कोऑर्डिनेट कॉपी करें और नीचे पेस्ट करें',
    logout:'🚪 रूम छोड़ें',logoutConfirm:'क्या आप वाकई रूम छोड़ना चाहते हैं?',
  } as any,
  'it': {
    nameplaceholder:'Inserisci il tuo nome',createRoom:'＋ Crea nuova stanza',orJoin:'── o unisciti a una stanza attiva ──',
    loading:'Caricamento…',joinByCode:'Unisciti con codice',enterNameFirst:'Inserisci prima il tuo nome',
    roomCreated:'Stanza creata!\nCopia il link e condividilo col team',shareLink:'Link di condivisione',copyLink:'Copia link',copied:'Copiato!',
    enterRoom:'Entra nella stanza',enterNameToJoin:'Inserisci il nome per entrare',joinRoomLabel:'Entra in stanza',yourName:'Il tuo nome',join:'Entra',
    enterCode:'Inserisci il codice',codePlaceholder:'Codice a 6 cifre',back:'Indietro',invalidCode:'Inserisci un codice a 6 cifre',roomNotFound:'Stanza non trovata',
    invalidLink:'Link non valido o stanza inesistente',noRooms:'Nessuna stanza attiva',loadFailed:'Impossibile caricare le stanze',
    waitingGps:'📍 In attesa del GPS…',setDest:'📌 Imposta destinazione',msgTab:'💬 Messaggi',callTab:'📞 Chiamate',
    myAvatar:'Il mio avatar',uploadAvatar:'📷 Carica avatar',members:'Membri',voiceCall:'Chiamata vocale di gruppo',
    joinVoice:'🎙 Unisciti alla voce',leaveVoice:'📵 Lascia la voce',mute:'🎙 Silenzia',unmute:'🔇 Togli silenzio',
    live:'📹 Live camera',stopLive:'⏹ Ferma live',screen:'🖥 Schermo',
    setDestTitle:'📌 Imposta destinazione',pasteLink:'🔗 Incolla link',enterCoord:'📍 Inserisci coordinate',
    gmapsInstruct:'Copia un link di <b>condivisione</b> di Google Maps e incollalo sotto',coordInstruct:'Tieni premuto un luogo su Google Maps, poi incolla le coordinate sotto',
    coordPlaceholder:'es: (38.7427938, 140.7432556)',destName:'Nome destinazione (opzionale)',
    confirm:'Conferma',clear:'🗑 Cancella',cancel:'Annulla',saving:'Salvataggio…',expanding:'Espansione…',
    badCoordFormat:'Formato non valido, es: (38.7427938, 140.7432556)',pasteGmaps:'Incolla un link di Google Maps',
    noCoordInLink:'Impossibile estrarre coordinate dal link, usa 📍 Inserisci coordinate',navigate:'🧭 Naviga',
    offline:' Offline',longOffline:' A lungo offline',noMembers:'Nessun membro',
    micError:'Impossibile accedere al microfono: ',uploadFailed:'Caricamento fallito: ',
    gpsPermDenied:'Posizione negata, attiva il permesso di posizione',gpsNoSignal:'Impossibile ottenere segnale di posizione',gpsTimeout:'Timeout posizione',
    openGmaps:'Apri Google Maps',longPressCoord:'Tieni premuto la destinazione sulla mappa',copyCoordBelow:'Copia le coordinate mostrate in alto e incollale sotto',
    logout:'🚪 Esci dalla stanza',logoutConfirm:'Sei sicuro di voler uscire dalla stanza?',
  } as any,
  'ru': {
    nameplaceholder:'Введите ваше имя',createRoom:'＋ Создать комнату',orJoin:'── или войти в активную комнату ──',
    loading:'Загрузка…',joinByCode:'Войти по коду',enterNameFirst:'Пожалуйста, сначала введите имя',
    roomCreated:'Комната создана!\nСкопируйте ссылку и поделитесь с командой',shareLink:'Ссылка для входа',copyLink:'Копировать ссылку',copied:'Скопировано!',
    enterRoom:'Войти в комнату',enterNameToJoin:'Введите имя для входа',joinRoomLabel:'Войти в комнату',yourName:'Ваше имя',join:'Войти',
    enterCode:'Введите код',codePlaceholder:'6-значный код',back:'Назад',invalidCode:'Введите 6-значный код',roomNotFound:'Комната не найдена',
    invalidLink:'Недействительная ссылка или комната не существует',noRooms:'Нет активных комнат',loadFailed:'Не удалось загрузить комнаты',
    waitingGps:'📍 Ожидание GPS…',setDest:'📌 Установить маршрут',msgTab:'💬 Сообщения',callTab:'📞 Звонки',
    myAvatar:'Мой аватар',uploadAvatar:'📷 Загрузить аватар',members:'Участники',voiceCall:'Групповой голосовой вызов',
    joinVoice:'🎙 Войти в голосовой',leaveVoice:'📵 Выйти из голосового',mute:'🎙 Отключить звук',unmute:'🔇 Включить звук',
    live:'📹 Прямая трансляция',stopLive:'⏹ Остановить трансляцию',screen:'🖥 Экран',
    setDestTitle:'📌 Установить маршрут',pasteLink:'🔗 Вставить ссылку',enterCoord:'📍 Ввести координаты',
    gmapsInstruct:'Скопируйте ссылку <b>Поделиться</b> из Google Maps и вставьте ниже',coordInstruct:'Удерживайте место на Google Maps, затем вставьте координаты ниже',
    coordPlaceholder:'напр.: (38.7427938, 140.7432556)',destName:'Название пункта назначения (необязательно)',
    confirm:'Подтвердить',clear:'🗑 Очистить',cancel:'Отмена',saving:'Сохранение…',expanding:'Разворачивание…',
    badCoordFormat:'Неверный формат, напр.: (38.7427938, 140.7432556)',pasteGmaps:'Вставьте ссылку Google Maps',
    noCoordInLink:'Не удалось извлечь координаты, используйте режим 📍 Ввести координаты',navigate:'🧭 Навигация',
    offline:' Не в сети',longOffline:' Долго не в сети',noMembers:'Нет участников',
    micError:'Нет доступа к микрофону: ',uploadFailed:'Ошибка загрузки: ',
    gpsPermDenied:'Доступ к местоположению отклонён, включите разрешение',gpsNoSignal:'Нет сигнала местоположения',gpsTimeout:'Тайм-аут местоположения',
    openGmaps:'Открыть Google Maps',longPressCoord:'Удерживайте место назначения на карте',copyCoordBelow:'Скопируйте показанные координаты и вставьте ниже',
    logout:'🚪 Покинуть комнату',logoutConfirm:'Вы уверены, что хотите покинуть комнату?',
  } as any,
  'th': {
    nameplaceholder:'ใส่ชื่อของคุณ',createRoom:'＋ สร้างห้องใหม่',orJoin:'── หรือเข้าร่วมห้องที่เปิดอยู่ ──',
    loading:'กำลังโหลด…',joinByCode:'เข้าร่วมด้วยรหัส',enterNameFirst:'กรุณาใส่ชื่อก่อน',
    roomCreated:'สร้างห้องสำเร็จ!\nคัดลอกลิงก์แชร์ให้เพื่อน',shareLink:'ลิงก์เชิญ',copyLink:'คัดลอกลิงก์',copied:'คัดลอกแล้ว!',
    enterRoom:'เข้าห้อง',enterNameToJoin:'ใส่ชื่อเพื่อเข้าร่วม',joinRoomLabel:'เข้าร่วมห้อง',yourName:'ชื่อคุณ',join:'เข้าร่วม',
    enterCode:'ใส่รหัสห้อง',codePlaceholder:'รหัส 6 หลัก',back:'กลับ',invalidCode:'กรุณาใส่รหัส 6 หลัก',roomNotFound:'ไม่พบห้อง',
    invalidLink:'ลิงก์ไม่ถูกต้องหรือห้องไม่มีอยู่',noRooms:'ไม่มีห้องที่เปิดอยู่',loadFailed:'โหลดห้องไม่สำเร็จ',
    waitingGps:'📍 รอ GPS…',setDest:'📌 ตั้งจุดหมาย',msgTab:'💬 ข้อความ',callTab:'📞 โทร',
    myAvatar:'อวาตาร์ของฉัน',uploadAvatar:'📷 อัปโหลดอวาตาร์',members:'สมาชิก',voiceCall:'โทรหมู่',
    joinVoice:'🎙 เข้าร่วมเสียง',leaveVoice:'📵 ออกจากเสียง',mute:'🎙 ปิดเสียง',unmute:'🔇 เปิดเสียง',
    live:'📹 ไลฟ์กล้อง',stopLive:'⏹ หยุดไลฟ์',screen:'🖥 หน้าจอ',
    setDestTitle:'📌 ตั้งจุดหมาย',pasteLink:'🔗 วางลิงก์',enterCoord:'📍 ใส่พิกัด',
    gmapsInstruct:'คัดลอกลิงก์ <b>แชร์</b> จาก Google Maps แล้ววางด้านล่าง',coordInstruct:'กดค้างในสถานที่บน Google Maps แล้ววางพิกัดด้านล่าง',
    coordPlaceholder:'เช่น: (38.7427938, 140.7432556)',destName:'ชื่อจุดหมาย (ไม่บังคับ)',
    confirm:'ยืนยัน',clear:'🗑 ล้าง',cancel:'ยกเลิก',saving:'กำลังบันทึก…',expanding:'กำลังขยาย…',
    badCoordFormat:'รูปแบบไม่ถูกต้อง เช่น: (38.7427938, 140.7432556)',pasteGmaps:'กรุณาวางลิงก์ Google Maps',
    noCoordInLink:'ไม่สามารถดึงพิกัดจากลิงก์ได้ ใช้โหมด 📍 ใส่พิกัด',navigate:'🧭 นำทาง',
    offline:' ออฟไลน์',longOffline:' ออฟไลน์นาน',noMembers:'ยังไม่มีสมาชิก',
    micError:'ไม่สามารถเข้าถึงไมค์: ',uploadFailed:'อัปโหลดล้มเหลว: ',
    gpsPermDenied:'ถูกปฏิเสธตำแหน่ง กรุณาเปิดอนุญาตตำแหน่ง',gpsNoSignal:'ไม่มีสัญญาณตำแหน่ง',gpsTimeout:'หมดเวลาตำแหน่ง',
    openGmaps:'เปิด Google Maps',longPressCoord:'กดค้างที่จุดหมายบนแผนที่',copyCoordBelow:'คัดลอกพิกัดที่แสดงด้านบนแล้ววางด้านล่าง',
    logout:'🚪 ออกจากห้อง',logoutConfirm:'แน่ใจหรือว่าต้องการออกจากห้อง?',
  } as any,
  'vi': {
    nameplaceholder:'Nhập tên của bạn',createRoom:'＋ Tạo phòng mới',orJoin:'── hoặc tham gia phòng đang mở ──',
    loading:'Đang tải…',joinByCode:'Tham gia bằng mã',enterNameFirst:'Vui lòng nhập tên trước',
    roomCreated:'Tạo phòng thành công!\nSao chép link để chia sẻ',shareLink:'Link mời',copyLink:'Sao chép link',copied:'Đã sao chép!',
    enterRoom:'Vào phòng',enterNameToJoin:'Nhập tên để tham gia',joinRoomLabel:'Tham gia phòng',yourName:'Tên của bạn',join:'Tham gia',
    enterCode:'Nhập mã phòng',codePlaceholder:'Mã 6 ký tự',back:'Quay lại',invalidCode:'Vui lòng nhập mã 6 ký tự',roomNotFound:'Không tìm thấy phòng',
    invalidLink:'Link không hợp lệ hoặc phòng không tồn tại',noRooms:'Không có phòng nào',loadFailed:'Không tải được phòng',
    waitingGps:'📍 Đang chờ GPS…',setDest:'📌 Đặt điểm đến',msgTab:'💬 Tin nhắn',callTab:'📞 Gọi',
    myAvatar:'Ảnh đại diện',uploadAvatar:'📷 Tải ảnh đại diện',members:'Thành viên',voiceCall:'Gọi thoại nhóm',
    joinVoice:'🎙 Tham gia thoại',leaveVoice:'📵 Rời thoại',mute:'🎙 Tắt mic',unmute:'🔇 Bật mic',
    live:'📹 Live camera',stopLive:'⏹ Dừng live',screen:'🖥 Màn hình',
    setDestTitle:'📌 Đặt điểm đến',pasteLink:'🔗 Dán link',enterCoord:'📍 Nhập tọa độ',
    gmapsInstruct:'Sao chép link <b>Chia sẻ</b> từ Google Maps và dán bên dưới',coordInstruct:'Nhấn giữ một địa điểm trên Google Maps rồi dán tọa độ bên dưới',
    coordPlaceholder:'vd: (38.7427938, 140.7432556)',destName:'Tên điểm đến (tùy chọn)',
    confirm:'Xác nhận',clear:'🗑 Xóa',cancel:'Hủy',saving:'Đang lưu…',expanding:'Đang mở rộng…',
    badCoordFormat:'Định dạng không đúng, vd: (38.7427938, 140.7432556)',pasteGmaps:'Vui lòng dán link Google Maps',
    noCoordInLink:'Không thể lấy tọa độ từ link, chuyển sang chế độ 📍 Nhập tọa độ',navigate:'🧭 Dẫn đường',
    offline:' Ngoại tuyến',longOffline:' Ngoại tuyến lâu',noMembers:'Chưa có thành viên',
    micError:'Không truy cập được mic: ',uploadFailed:'Tải lên thất bại: ',
    gpsPermDenied:'Vị trí bị từ chối, hãy bật quyền vị trí',gpsNoSignal:'Không có tín hiệu vị trí',gpsTimeout:'Hết thời gian chờ vị trí',
    openGmaps:'Mở Google Maps',longPressCoord:'Nhấn giữ điểm đến trên bản đồ',copyCoordBelow:'Sao chép tọa độ hiển thị ở trên và dán bên dưới',
    logout:'🚪 Rời phòng',logoutConfirm:'Bạn chắc chắn muốn rời phòng?',
  } as any,
  'id': {
    nameplaceholder:'Masukkan nama Anda',createRoom:'＋ Buat ruangan baru',orJoin:'── atau bergabung ruangan aktif ──',
    loading:'Memuat…',joinByCode:'Bergabung dengan kode',enterNameFirst:'Masukkan nama Anda terlebih dahulu',
    roomCreated:'Ruangan berhasil dibuat!\nSalin tautan untuk dibagikan',shareLink:'Tautan undangan',copyLink:'Salin tautan',copied:'Tersalin!',
    enterRoom:'Masuk ruangan',enterNameToJoin:'Masukkan nama untuk bergabung',joinRoomLabel:'Bergabung ruangan',yourName:'Nama Anda',join:'Bergabung',
    enterCode:'Masukkan kode',codePlaceholder:'Kode 6 digit',back:'Kembali',invalidCode:'Masukkan kode 6 digit',roomNotFound:'Ruangan tidak ditemukan',
    invalidLink:'Tautan tidak valid atau ruangan tidak ada',noRooms:'Tidak ada ruangan aktif',loadFailed:'Gagal memuat ruangan',
    waitingGps:'📍 Menunggu GPS…',setDest:'📌 Atur tujuan',msgTab:'💬 Pesan',callTab:'📞 Panggilan',
    myAvatar:'Avatar saya',uploadAvatar:'📷 Unggah avatar',members:'Anggota',voiceCall:'Panggilan suara grup',
    joinVoice:'🎙 Bergabung suara',leaveVoice:'📵 Keluar suara',mute:'🎙 Bisukan',unmute:'🔇 Aktifkan suara',
    live:'📹 Live kamera',stopLive:'⏹ Hentikan live',screen:'🖥 Layar',
    setDestTitle:'📌 Atur tujuan',pasteLink:'🔗 Tempel tautan',enterCoord:'📍 Masukkan koordinat',
    gmapsInstruct:'Salin tautan <b>Bagikan</b> dari Google Maps dan tempel di bawah',coordInstruct:'Tekan lama lokasi di Google Maps lalu tempel koordinat di bawah',
    coordPlaceholder:'contoh: (38.7427938, 140.7432556)',destName:'Nama tujuan (opsional)',
    confirm:'Konfirmasi',clear:'🗑 Hapus',cancel:'Batal',saving:'Menyimpan…',expanding:'Memperluas…',
    badCoordFormat:'Format tidak valid, contoh: (38.7427938, 140.7432556)',pasteGmaps:'Tempel tautan Google Maps',
    noCoordInLink:'Tidak dapat mengekstrak koordinat dari tautan, gunakan mode 📍 Masukkan koordinat',navigate:'🧭 Navigasi',
    offline:' Offline',longOffline:' Lama offline',noMembers:'Belum ada anggota',
    micError:'Tidak dapat mengakses mikrofon: ',uploadFailed:'Gagal mengunggah: ',
    gpsPermDenied:'Lokasi ditolak, aktifkan izin lokasi',gpsNoSignal:'Tidak dapat memperoleh sinyal lokasi',gpsTimeout:'Waktu habis untuk lokasi',
    openGmaps:'Buka Google Maps',longPressCoord:'Tekan lama tujuan di peta',copyCoordBelow:'Salin koordinat yang ditampilkan di atas dan tempel di bawah',
    logout:'🚪 Keluar ruangan',logoutConfirm:'Yakin ingin keluar dari ruangan?',
  } as any,
  'tr': {
    nameplaceholder:'Adınızı girin',createRoom:'＋ Yeni oda oluştur',orJoin:'── veya aktif bir odaya katıl ──',
    loading:'Yükleniyor…',joinByCode:'Kodla katıl',enterNameFirst:'Lütfen önce adınızı girin',
    roomCreated:'Oda oluşturuldu!\nLinki kopyalayıp ekiple paylaşın',shareLink:'Davet linki',copyLink:'Linki kopyala',copied:'Kopyalandı!',
    enterRoom:'Odaya gir',enterNameToJoin:'Katılmak için adınızı girin',joinRoomLabel:'Odaya katıl',yourName:'Adınız',join:'Katıl',
    enterCode:'Kodu girin',codePlaceholder:'6 haneli kod',back:'Geri',invalidCode:'6 haneli kod girin',roomNotFound:'Oda bulunamadı',
    invalidLink:'Geçersiz link veya oda mevcut değil',noRooms:'Aktif oda yok',loadFailed:'Odalar yüklenemedi',
    waitingGps:'📍 GPS bekleniyor…',setDest:'📌 Hedef belirle',msgTab:'💬 Mesajlar',callTab:'📞 Aramalar',
    myAvatar:'Avatarım',uploadAvatar:'📷 Avatar yükle',members:'Üyeler',voiceCall:'Grup sesli görüşme',
    joinVoice:'🎙 Sese katıl',leaveVoice:'📵 Sesi bırak',mute:'🎙 Sessize al',unmute:'🔇 Sesi aç',
    live:'📹 Canlı kamera',stopLive:'⏹ Canlıyı durdur',screen:'🖥 Ekran',
    setDestTitle:'📌 Hedef belirle',pasteLink:'🔗 Link yapıştır',enterCoord:'📍 Koordinat gir',
    gmapsInstruct:'Google Maps\'ten <b>Paylaş</b> linkini kopyalayıp aşağıya yapıştırın',coordInstruct:'Google Maps\'te bir yere uzun basın, ardından koordinatları aşağıya yapıştırın',
    coordPlaceholder:'örn: (38.7427938, 140.7432556)',destName:'Hedef adı (isteğe bağlı)',
    confirm:'Onayla',clear:'🗑 Temizle',cancel:'İptal',saving:'Kaydediliyor…',expanding:'Genişletiliyor…',
    badCoordFormat:'Geçersiz format, örn: (38.7427938, 140.7432556)',pasteGmaps:'Google Maps linki yapıştırın',
    noCoordInLink:'Linkten koordinat alınamadı, 📍 Koordinat gir moduna geçin',navigate:'🧭 Navigasyon',
    offline:' Çevrimdışı',longOffline:' Uzun süredir çevrimdışı',noMembers:'Henüz üye yok',
    micError:'Mikrofona erişilemiyor: ',uploadFailed:'Yükleme başarısız: ',
    gpsPermDenied:'Konum reddedildi, konum iznini etkinleştirin',gpsNoSignal:'Konum sinyali alınamıyor',gpsTimeout:'Konum zaman aşımı',
    openGmaps:'Google Maps\'i aç',longPressCoord:'Haritada hedefe uzun basın',copyCoordBelow:'Üstte gösterilen koordinatları kopyalayıp aşağıya yapıştırın',
    logout:'🚪 Odadan çık',logoutConfirm:'Odadan çıkmak istediğinize emin misiniz?',
  } as any,
  'pl': {
    nameplaceholder:'Wpisz swoje imię',createRoom:'＋ Utwórz nowy pokój',orJoin:'── lub dołącz do aktywnego pokoju ──',
    loading:'Ładowanie…',joinByCode:'Dołącz kodem',enterNameFirst:'Proszę najpierw wpisz imię',
    roomCreated:'Pokój utworzony!\nSkopiuj link i udostępnij zespołowi',shareLink:'Link zaproszenia',copyLink:'Kopiuj link',copied:'Skopiowano!',
    enterRoom:'Wejdź do pokoju',enterNameToJoin:'Wpisz imię żeby dołączyć',joinRoomLabel:'Dołącz do pokoju',yourName:'Twoje imię',join:'Dołącz',
    enterCode:'Wpisz kod',codePlaceholder:'Kod 6-cyfrowy',back:'Wstecz',invalidCode:'Wpisz kod 6-cyfrowy',roomNotFound:'Pokój nie znaleziony',
    invalidLink:'Nieprawidłowy link lub pokój nie istnieje',noRooms:'Brak aktywnych pokojów',loadFailed:'Nie udało się załadować pokojów',
    waitingGps:'📍 Oczekiwanie na GPS…',setDest:'📌 Ustaw cel',msgTab:'💬 Wiadomości',callTab:'📞 Połączenia',
    myAvatar:'Mój awatar',uploadAvatar:'📷 Prześlij awatar',members:'Członkowie',voiceCall:'Grupowe połączenie głosowe',
    joinVoice:'🎙 Dołącz do głosu',leaveVoice:'📵 Opuść głos',mute:'🎙 Wycisz',unmute:'🔇 Włącz dźwięk',
    live:'📹 Live kamera',stopLive:'⏹ Zatrzymaj live',screen:'🖥 Ekran',
    setDestTitle:'📌 Ustaw cel',pasteLink:'🔗 Wklej link',enterCoord:'📍 Wpisz współrzędne',
    gmapsInstruct:'Skopiuj link <b>Udostępnij</b> z Google Maps i wklej poniżej',coordInstruct:'Przytrzymaj miejsce w Google Maps, następnie wklej współrzędne poniżej',
    coordPlaceholder:'np: (38.7427938, 140.7432556)',destName:'Nazwa celu (opcjonalnie)',
    confirm:'Potwierdź',clear:'🗑 Wyczyść',cancel:'Anuluj',saving:'Zapisywanie…',expanding:'Rozwijanie…',
    badCoordFormat:'Nieprawidłowy format, np: (38.7427938, 140.7432556)',pasteGmaps:'Wklej link Google Maps',
    noCoordInLink:'Nie można wyodrębnić współrzędnych, użyj trybu 📍 Wpisz współrzędne',navigate:'🧭 Nawigacja',
    offline:' Offline',longOffline:' Długo offline',noMembers:'Brak członków',
    micError:'Brak dostępu do mikrofonu: ',uploadFailed:'Przesyłanie nie powiodło się: ',
    gpsPermDenied:'Lokalizacja odrzucona, włącz uprawnienie lokalizacji',gpsNoSignal:'Brak sygnału lokalizacji',gpsTimeout:'Przekroczono czas oczekiwania',
    openGmaps:'Otwórz Google Maps',longPressCoord:'Przytrzymaj cel na mapie',copyCoordBelow:'Skopiuj wyświetlone współrzędne i wklej poniżej',
    logout:'🚪 Opuść pokój',logoutConfirm:'Czy na pewno chcesz opuścić pokój?',
  } as any,
  'nl': {
    nameplaceholder:'Voer je naam in',createRoom:'＋ Nieuwe kamer maken',orJoin:'── of neem deel aan een actieve kamer ──',
    loading:'Laden…',joinByCode:'Deelnemen met code',enterNameFirst:'Voer eerst je naam in',
    roomCreated:'Kamer aangemaakt!\nKopieer de link en deel met het team',shareLink:'Uitnodigingslink',copyLink:'Link kopiëren',copied:'Gekopieerd!',
    enterRoom:'Kamer betreden',enterNameToJoin:'Voer je naam in om deel te nemen',joinRoomLabel:'Deelnemen aan kamer',yourName:'Jouw naam',join:'Deelnemen',
    enterCode:'Voer code in',codePlaceholder:'6-cijferige code',back:'Terug',invalidCode:'Voer een 6-cijferige code in',roomNotFound:'Kamer niet gevonden',
    invalidLink:'Ongeldige link of kamer bestaat niet',noRooms:'Geen actieve kamers',loadFailed:'Laden van kamers mislukt',
    waitingGps:'📍 Wachten op GPS…',setDest:'📌 Bestemming instellen',msgTab:'💬 Berichten',callTab:'📞 Gesprekken',
    myAvatar:'Mijn avatar',uploadAvatar:'📷 Avatar uploaden',members:'Leden',voiceCall:'Groepsgesprek',
    joinVoice:'🎙 Deelnemen aan spraak',leaveVoice:'📵 Spraak verlaten',mute:'🎙 Dempen',unmute:'🔇 Dempen opheffen',
    live:'📹 Camera live',stopLive:'⏹ Live stoppen',screen:'🖥 Scherm',
    setDestTitle:'📌 Bestemming instellen',pasteLink:'🔗 Link plakken',enterCoord:'📍 Coördinaten invoeren',
    gmapsInstruct:'Kopieer een <b>Deel</b>-link van Google Maps en plak hieronder',coordInstruct:'Houd een locatie ingedrukt op Google Maps, plak de coördinaten hieronder',
    coordPlaceholder:'bijv: (38.7427938, 140.7432556)',destName:'Bestemmingsnaam (optioneel)',
    confirm:'Bevestigen',clear:'🗑 Wissen',cancel:'Annuleren',saving:'Opslaan…',expanding:'Uitbreiden…',
    badCoordFormat:'Ongeldig formaat, bijv: (38.7427938, 140.7432556)',pasteGmaps:'Plak een Google Maps-link',
    noCoordInLink:'Kan geen coördinaten uit link halen, gebruik 📍 Coördinaten invoeren',navigate:'🧭 Navigeren',
    offline:' Offline',longOffline:' Lang offline',noMembers:'Geen leden',
    micError:'Geen toegang tot microfoon: ',uploadFailed:'Upload mislukt: ',
    gpsPermDenied:'Locatie geweigerd, schakel locatietoestemming in',gpsNoSignal:'Geen locatiesignaal',gpsTimeout:'Locatie time-out',
    openGmaps:'Google Maps openen',longPressCoord:'Houd de bestemming op de kaart ingedrukt',copyCoordBelow:'Kopieer de getoonde coördinaten en plak hieronder',
    logout:'🚪 Kamer verlaten',logoutConfirm:'Weet je zeker dat je de kamer wilt verlaten?',
  } as any,
  'uk': {
    nameplaceholder:'Введіть ваше ім\'я',createRoom:'＋ Створити кімнату',orJoin:'── або приєднатись до активної ──',
    loading:'Завантаження…',joinByCode:'Приєднатись за кодом',enterNameFirst:'Будь ласка, спочатку введіть ім\'я',
    roomCreated:'Кімнату створено!\nСкопіюйте посилання та поділіться',shareLink:'Посилання для входу',copyLink:'Копіювати посилання',copied:'Скопійовано!',
    enterRoom:'Увійти до кімнати',enterNameToJoin:'Введіть ім\'я для входу',joinRoomLabel:'Приєднатись до кімнати',yourName:'Ваше ім\'я',join:'Приєднатись',
    enterCode:'Введіть код',codePlaceholder:'6-значний код',back:'Назад',invalidCode:'Введіть 6-значний код',roomNotFound:'Кімнату не знайдено',
    invalidLink:'Недійсне посилання або кімнати не існує',noRooms:'Немає активних кімнат',loadFailed:'Не вдалося завантажити',
    waitingGps:'📍 Очікування GPS…',setDest:'📌 Встановити маршрут',msgTab:'💬 Повідомлення',callTab:'📞 Дзвінки',
    myAvatar:'Мій аватар',uploadAvatar:'📷 Завантажити аватар',members:'Учасники',voiceCall:'Груповий голосовий дзвінок',
    joinVoice:'🎙 Приєднатись до голосу',leaveVoice:'📵 Покинути голос',mute:'🎙 Вимкнути звук',unmute:'🔇 Увімкнути звук',
    live:'📹 Пряма трансляція',stopLive:'⏹ Зупинити трансляцію',screen:'🖥 Екран',
    setDestTitle:'📌 Встановити маршрут',pasteLink:'🔗 Вставити посилання',enterCoord:'📍 Ввести координати',
    gmapsInstruct:'Скопіюйте посилання <b>Поділитись</b> з Google Maps та вставте нижче',coordInstruct:'Утримуйте місце на Google Maps, потім вставте координати нижче',
    coordPlaceholder:'напр.: (38.7427938, 140.7432556)',destName:'Назва пункту (необов\'язково)',
    confirm:'Підтвердити',clear:'🗑 Очистити',cancel:'Скасувати',saving:'Збереження…',expanding:'Розгортання…',
    badCoordFormat:'Невірний формат, напр.: (38.7427938, 140.7432556)',pasteGmaps:'Вставте посилання Google Maps',
    noCoordInLink:'Не вдалося витягти координати, використайте режим 📍 Ввести координати',navigate:'🧭 Навігація',
    offline:' Не в мережі',longOffline:' Довго не в мережі',noMembers:'Немає учасників',
    micError:'Немає доступу до мікрофона: ',uploadFailed:'Помилка завантаження: ',
    gpsPermDenied:'Доступ до місцезнаходження відхилено',gpsNoSignal:'Немає сигналу місцезнаходження',gpsTimeout:'Час очікування вичерпано',
    openGmaps:'Відкрити Google Maps',longPressCoord:'Утримуйте пункт призначення на карті',copyCoordBelow:'Скопіюйте показані координати та вставте нижче',
    logout:'🚪 Покинути кімнату',logoutConfirm:'Ви впевнені, що хочете покинути кімнату?',
  } as any,
  'ms': {
    nameplaceholder:'Masukkan nama anda',createRoom:'＋ Cipta bilik baru',orJoin:'── atau sertai bilik aktif ──',
    loading:'Memuatkan…',joinByCode:'Sertai dengan kod',enterNameFirst:'Sila masukkan nama anda dahulu',
    roomCreated:'Bilik berjaya dicipta!\nSalin pautan untuk dikongsi',shareLink:'Pautan jemputan',copyLink:'Salin pautan',copied:'Disalin!',
    enterRoom:'Masuk bilik',enterNameToJoin:'Masukkan nama untuk sertai',joinRoomLabel:'Sertai bilik',yourName:'Nama anda',join:'Sertai',
    enterCode:'Masukkan kod',codePlaceholder:'Kod 6 digit',back:'Kembali',invalidCode:'Masukkan kod 6 digit',roomNotFound:'Bilik tidak dijumpai',
    invalidLink:'Pautan tidak sah atau bilik tidak wujud',noRooms:'Tiada bilik aktif',loadFailed:'Gagal memuatkan bilik',
    waitingGps:'📍 Menunggu GPS…',setDest:'📌 Tetapkan destinasi',msgTab:'💬 Mesej',callTab:'📞 Panggilan',
    myAvatar:'Avatar saya',uploadAvatar:'📷 Muat naik avatar',members:'Ahli',voiceCall:'Panggilan suara kumpulan',
    joinVoice:'🎙 Sertai suara',leaveVoice:'📵 Tinggalkan suara',mute:'🎙 Redam',unmute:'🔇 Buka redam',
    live:'📹 Live kamera',stopLive:'⏹ Henti live',screen:'🖥 Skrin',
    setDestTitle:'📌 Tetapkan destinasi',pasteLink:'🔗 Tampal pautan',enterCoord:'📍 Masukkan koordinat',
    gmapsInstruct:'Salin pautan <b>Kongsi</b> dari Google Maps dan tampal di bawah',coordInstruct:'Tekan lama lokasi di Google Maps kemudian tampal koordinat di bawah',
    coordPlaceholder:'cth: (38.7427938, 140.7432556)',destName:'Nama destinasi (pilihan)',
    confirm:'Sahkan',clear:'🗑 Padam',cancel:'Batal',saving:'Menyimpan…',expanding:'Mengembangkan…',
    badCoordFormat:'Format tidak sah, cth: (38.7427938, 140.7432556)',pasteGmaps:'Tampal pautan Google Maps',
    noCoordInLink:'Tidak dapat mengekstrak koordinat, gunakan mod 📍 Masukkan koordinat',navigate:'🧭 Navigasi',
    offline:' Luar talian',longOffline:' Lama luar talian',noMembers:'Tiada ahli lagi',
    micError:'Tidak dapat akses mikrofon: ',uploadFailed:'Gagal muat naik: ',
    gpsPermDenied:'Lokasi ditolak, aktifkan kebenaran lokasi',gpsNoSignal:'Tiada isyarat lokasi',gpsTimeout:'Masa tamat lokasi',
    openGmaps:'Buka Google Maps',longPressCoord:'Tekan lama destinasi di peta',copyCoordBelow:'Salin koordinat yang dipaparkan di atas dan tampal di bawah',
    logout:'🚪 Tinggalkan bilik',logoutConfirm:'Adakah anda pasti mahu meninggalkan bilik?',
  } as any,
};

// Fix ja nameplaceholder typo
(T['ja'] as any).nameplaceholder = 'お名前を入力してください';

export function getT(lang: Lang): Translations {
  return T[lang] || T['en'];
}

export function detectLang(): Lang {
  if (typeof window === 'undefined') return 'zh-TW';
  const saved = localStorage.getItem('lang') as Lang;
  if (saved && T[saved]) return saved;
  const nav = navigator.language.toLowerCase();
  if (nav.startsWith('zh')) return 'zh-TW';
  if (nav.startsWith('ja')) return 'ja';
  if (nav.startsWith('ko')) return 'ko';
  if (nav.startsWith('es')) return 'es';
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('de')) return 'de';
  if (nav.startsWith('pt')) return 'pt';
  if (nav.startsWith('ar')) return 'ar';
  if (nav.startsWith('hi')) return 'hi';
  if (nav.startsWith('it')) return 'it';
  if (nav.startsWith('ru')) return 'ru';
  if (nav.startsWith('th')) return 'th';
  if (nav.startsWith('vi')) return 'vi';
  if (nav.startsWith('id')) return 'id';
  if (nav.startsWith('tr')) return 'tr';
  if (nav.startsWith('pl')) return 'pl';
  if (nav.startsWith('nl')) return 'nl';
  if (nav.startsWith('uk')) return 'uk';
  if (nav.startsWith('ms')) return 'ms';
  return 'en';
}
