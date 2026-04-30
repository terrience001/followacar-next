'use client';
import { useState, useRef } from 'react';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:138.2.60.1:3478' },
  { urls: 'turn:138.2.60.1:3478', username: 'followacar', credential: 'followacar2024' },
  { urls: 'turn:138.2.60.1:3478?transport=tcp', username: 'followacar', credential: 'followacar2024' },
];

type Candidate = { type: string; protocol: string; address: string; port: number; raw: string };
type LogEntry = { time: string; msg: string; color: string };

export default function TurnTest() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [status, setStatus] = useState<'idle' | 'testing' | 'done'>('idle');
  const [result, setResult] = useState<'success' | 'fail' | null>(null);
  const [mode, setMode] = useState<'all' | 'relay-only'>('all');
  const pcRef = useRef<RTCPeerConnection | null>(null);

  function log(msg: string, color = '#94a3b8') {
    const time = new Date().toLocaleTimeString();
    setLogs(p => [...p, { time, msg, color }]);
  }

  async function runTest() {
    if (pcRef.current) { pcRef.current.close(); pcRef.current = null; }
    setCandidates([]);
    setLogs([]);
    setResult(null);
    setStatus('testing');

    const config: RTCConfiguration = {
      iceServers: ICE_SERVERS,
      ...(mode === 'relay-only' ? { iceTransportPolicy: 'relay' } : {}),
    };

    log(`模式: ${mode === 'relay-only' ? '僅 TURN (relay-only)' : '全部 (STUN + TURN)'}`, '#60a5fa');
    log('建立 RTCPeerConnection...', '#60a5fa');

    const pc = new RTCPeerConnection(config);
    pcRef.current = pc;

    // Add dummy data channel to trigger ICE gathering
    pc.createDataChannel('test');

    let relayFound = false;

    pc.onicecandidate = (e) => {
      if (!e.candidate) {
        log('ICE gathering 完成', '#60a5fa');
        setStatus('done');
        setResult(relayFound ? 'success' : mode === 'relay-only' ? 'fail' : 'success');
        if (!relayFound && mode === 'relay-only') {
          log('❌ 沒有收到 relay candidate，TURN 可能無法運作', '#f87171');
        } else if (relayFound) {
          log('✅ TURN server 正常，relay candidate 已收到', '#22c55e');
        }
        return;
      }

      const c = e.candidate;
      const parts = c.candidate.split(' ');
      const type = parts[7] ?? '?';
      const protocol = parts[2] ?? '?';
      const address = parts[4] ?? '?';
      const port = parseInt(parts[5] ?? '0');

      if (type === 'relay') relayFound = true;

      const color = type === 'relay' ? '#22c55e' : type === 'srflx' ? '#facc15' : '#94a3b8';
      log(`[${type.toUpperCase()}] ${protocol.toUpperCase()} ${address}:${port}`, color);
      setCandidates(p => [...p, { type, protocol, address, port, raw: c.candidate }]);
    };

    pc.onicegatheringstatechange = () => {
      log(`ICE gathering state: ${pc.iceGatheringState}`, '#60a5fa');
    };

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      log('Local description 設定完成，等待 candidates...', '#60a5fa');
    } catch (e) {
      log(`錯誤: ${e}`, '#f87171');
      setStatus('done');
      setResult('fail');
    }

    // Timeout after 15s
    setTimeout(() => {
      if (pcRef.current?.iceGatheringState !== 'complete') {
        log('逾時 (15秒)', '#f87171');
        setStatus('done');
        if (!relayFound) setResult('fail');
      }
    }, 15000);
  }

  function stopTest() {
    pcRef.current?.close();
    pcRef.current = null;
    setStatus('done');
  }

  const relayCount = candidates.filter(c => c.type === 'relay').length;
  const srflxCount = candidates.filter(c => c.type === 'srflx').length;
  const hostCount = candidates.filter(c => c.type === 'host').length;

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#f1f5f9', padding: '1.5rem', fontFamily: 'monospace', maxWidth: '680px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '.25rem' }}>🔌 TURN Server 測試工具</h1>
      <p style={{ color: '#64748b', fontSize: '.8rem', marginBottom: '1.5rem' }}>TURN: 138.2.60.1:3478</p>

      {/* Mode selector */}
      <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
        {(['all', 'relay-only'] as const).map(m => (
          <button key={m} onClick={() => setMode(m)} style={{
            padding: '.4rem .9rem', borderRadius: '6px', fontSize: '.8rem', cursor: 'pointer', border: 'none',
            background: mode === m ? '#3b82f6' : '#1e293b', color: mode === m ? '#fff' : '#94a3b8', fontWeight: mode === m ? 600 : 400,
          }}>
            {m === 'all' ? '全部模式' : '僅 TURN 模式'}
          </button>
        ))}
      </div>
      <p style={{ color: '#475569', fontSize: '.75rem', marginBottom: '1rem' }}>
        {mode === 'relay-only' ? '強制只走 TURN，測試 TURN server 是否真的能用' : '正常模式，看會收集到哪些 candidates'}
      </p>

      {/* Action button */}
      <button onClick={status === 'testing' ? stopTest : runTest} style={{
        background: status === 'testing' ? '#dc2626' : '#22c55e',
        color: '#fff', border: 'none', borderRadius: '8px',
        padding: '.6rem 1.5rem', fontSize: '.95rem', fontWeight: 600,
        cursor: 'pointer', marginBottom: '1.5rem',
      }}>
        {status === 'testing' ? '⏹ 停止' : '▶ 開始測試'}
      </button>

      {/* Result banner */}
      {result && (
        <div style={{
          background: result === 'success' ? '#14532d' : '#7f1d1d',
          border: `1px solid ${result === 'success' ? '#22c55e' : '#f87171'}`,
          borderRadius: '8px', padding: '.75rem 1rem', marginBottom: '1rem',
          color: result === 'success' ? '#22c55e' : '#f87171', fontWeight: 600,
        }}>
          {result === 'success' ? '✅ TURN server 正常運作' : '❌ TURN server 無法連線'}
        </div>
      )}

      {/* Stats */}
      {candidates.length > 0 && (
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {[
            { label: 'relay (TURN)', count: relayCount, color: '#22c55e' },
            { label: 'srflx (STUN)', count: srflxCount, color: '#facc15' },
            { label: 'host (直連)', count: hostCount, color: '#94a3b8' },
          ].map(s => (
            <div key={s.label} style={{ background: '#1e293b', borderRadius: '6px', padding: '.4rem .8rem', fontSize: '.8rem' }}>
              <span style={{ color: s.color, fontWeight: 700 }}>{s.count}</span>
              <span style={{ color: '#64748b', marginLeft: '.3rem' }}>{s.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Logs */}
      <div style={{ background: '#020617', borderRadius: '8px', padding: '1rem', minHeight: '200px', fontSize: '.78rem', lineHeight: 1.7 }}>
        {logs.length === 0 && <span style={{ color: '#334155' }}>按「開始測試」...</span>}
        {logs.map((l, i) => (
          <div key={i}>
            <span style={{ color: '#334155' }}>{l.time} </span>
            <span style={{ color: l.color }}>{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
