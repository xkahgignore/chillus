(function() {
    'use strict';

    const CONFIG = {
        domain: 'https://hune205.dev',
        service: 'faucet',
        serviceTitle: 'Home For Dev',
        primaryColor: '#7c3aed',
        scriptUrl: 'https://cdn.jsdelivr.net/gh/xkahgignore/chillus@main/cryptolinkforearn/script.js'
    };

    let isModalShown = false;
    let isKeyValid = false;

    const ICONS = {
        shield: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>`,
        key: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-1.5 1.5L16 7m-1.5 1.5L13 10m-1.5 1.5L10 13l-4 4v3h3l4-4 1.5-1.5M16 7l2-2m-1.5 1.5L15 8m4-4a3 3 0 1 0-4.24 4.24l.71.71m-2.83 2.83L6.83 17.5a4 4 0 0 0-1.17 2.83v1.67h1.67a4 4 0 0 0 2.83-1.17l5.66-5.66"/></svg>`,
        clock: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        award: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`
    };

    function getHWID() {
        let hwid = localStorage.getItem('hunehub_hwid');
        if (!hwid) {
            hwid = 'web_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
            localStorage.setItem('hunehub_hwid', hwid);
        }
        return hwid;
    }

    function getSavedKey() {
        return localStorage.getItem('hunehub_key') || '';
    }

    function saveKey(key) {
        localStorage.setItem('hunehub_key', key.trim());
    }

    function getGetKeyUrl() {
        const hwid = getHWID();
        return `${CONFIG.domain}/getkey?service=${encodeURIComponent(CONFIG.service)}&hwid=${encodeURIComponent(hwid)}`;
    }

    function getCloudflareToken() {
        const cookies = document.cookie.split('; ');
        for (let cookie of cookies) {
            if (cookie.startsWith('cf_clearance=')) {
                return cookie.split('=')[1];
            }
        }
        return null;
    }

    async function verifyKeyAPI(key) {
        const hwid = getHWID();
        const cfToken = getCloudflareToken();
        
        const payload = JSON.stringify({
            key: key.trim(),
            hwid: hwid,
            service: CONFIG.service,
            cfToken: cfToken
        });

        try {
            const response = await fetch(`${CONFIG.domain}/api/keys/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: payload
            });

            if (response.status === 403) {
                return { success: false, message: 'Vui lòng tải lại trang và hoàn thành xác minh Cloudflare' };
            }

            if (!response.ok) {
                return { success: false, message: `Lỗi máy chủ: ${response.status}` };
            }

            return await response.json();
        } catch (error) {
            return new Promise((resolve) => {
                if (typeof GM_xmlhttpRequest !== 'undefined') {
                    GM_xmlhttpRequest({
                        method: 'POST',
                        url: `${CONFIG.domain}/api/keys/verify`,
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        data: payload,
                        onload: function(response) {
                            try {
                                const data = JSON.parse(response.responseText);
                                resolve(data);
                            } catch (e) {
                                resolve({ success: false, message: 'Lỗi parse dữ liệu' });
                            }
                        },
                        onerror: function() {
                            resolve({ success: false, message: 'Không thể kết nối đến máy chủ' });
                        }
                    });
                } else {
                    resolve({ success: false, message: 'Không thể kết nối đến máy chủ' });
                }
            });
        }
    }

    function loadScriptFromUrl(url) {
        return new Promise((resolve, reject) => {
            if (typeof GM_xmlhttpRequest !== 'undefined') {
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    onload: function(response) {
                        try {
                            const scriptContent = response.responseText;
                            const scriptElement = document.createElement('script');
                            scriptElement.textContent = scriptContent;
                            scriptElement.setAttribute('data-source', 'hunehub');
                            document.head.appendChild(scriptElement);
                            resolve();
                        } catch (e) {
                            reject(e);
                        }
                    },
                    onerror: function(error) {
                        reject(error);
                    }
                });
            } else {
                const script = document.createElement('script');
                script.src = url;
                script.onload = () => resolve();
                script.onerror = (error) => reject(error);
                document.head.appendChild(script);
            }
        });
    }

    function showModalUI(onSuccessCallback) {
        if (isModalShown) return;
        if (document.getElementById('hune-auth-host')) return;
        isModalShown = true;

        const hwid = getHWID();
        const shortHwid = hwid.length > 20 ? `${hwid.slice(0, 10)}...${hwid.slice(-6)}` : hwid;

        const host = document.createElement('div');
        host.id = 'hune-auth-host';
        host.style.cssText = 'all: initial !important; position: fixed !important; z-index: 2147483647 !important; inset: 0 !important; pointer-events: auto !important;';

        const shadow = host.attachShadow({ mode: 'open' });

        shadow.innerHTML = `
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
                .backdrop { position: fixed; inset: 0; width: 100vw; height: 100vh; background: rgba(5, 6, 8, 0.85); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); display: flex; align-items: center; justify-content: center; padding: 16px; animation: fadeIn 0.3s ease-out; }
                .card { width: 100%; max-width: 440px; background: rgba(18, 20, 29, 0.98); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 24px; padding: 32px 28px; box-shadow: 0 30px 90px rgba(0,0,0,0.8); color: #e2e8f0; animation: scaleUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                .header { text-align: center; margin-bottom: 20px; }
                .icon-box { width: 54px; height: 54px; margin: 0 auto 12px; background: linear-gradient(135deg, ${CONFIG.primaryColor}, #4f46e5); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #fff; box-shadow: 0 8px 24px rgba(124,58,237,0.4); }
                .title { font-size: 1.45rem; font-weight: 800; color: #fff; margin-bottom: 4px; }
                .subtitle { font-size: 0.82rem; color: #94a3b8; }
                .info-box { display: flex; gap: 10px; margin-bottom: 18px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.06); padding: 10px 14px; border-radius: 14px; }
                .info-item { flex: 1; display: flex; flex-direction: column; gap: 2px; }
                .info-item .lbl { font-size: 0.65rem; font-weight: 800; color: #64748b; letter-spacing: 0.05em; }
                .info-item .val { font-size: 0.78rem; font-weight: 700; color: #cbd5e1; font-family: monospace; }
                .status-box { padding: 10px 14px; border-radius: 12px; font-size: 0.82rem; font-weight: 600; margin-bottom: 16px; line-height: 1.4; text-align: center; display: none; }
                .status-box.error { background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; display: block; }
                .status-box.success { background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.3); color: #4ade80; display: block; }
                .status-box.info { background: rgba(124, 58, 237, 0.15); border: 1px solid rgba(124, 58, 237, 0.3); color: #a78bfa; display: block; }
                .status-box.warning { background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.3); color: #fbbf24; display: block; }
                .input-wrap { margin-bottom: 16px; }
                .input-wrap input { width: 100%; background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 14px; padding: 14px 16px; color: #fff; font-size: 0.9rem; outline: none; transition: 0.2s ease; }
                .input-wrap input:focus { border-color: ${CONFIG.primaryColor}; background: rgba(124,58,237,0.05); box-shadow: 0 0 0 3px rgba(124,58,237,0.2); }
                .input-wrap input::placeholder { color: #64748b; }
                .btn-row { display: flex; gap: 12px; }
                .btn { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 13px 18px; border-radius: 14px; font-size: 0.88rem; font-weight: 700; cursor: pointer; border: none; transition: 0.2s ease; }
                .btn-secondary { background: rgba(255, 255, 255, 0.06); color: #cbd5e1; border: 1px solid rgba(255, 255, 255, 0.1); }
                .btn-secondary:hover { background: rgba(255, 255, 255, 0.12); color: #fff; transform: translateY(-1px); }
                .btn-primary { background: linear-gradient(135deg, ${CONFIG.primaryColor}, #4f46e5); color: #fff; box-shadow: 0 6px 20px -4px rgba(124,58,237,0.5); }
                .btn-primary:hover { opacity: 0.95; transform: translateY(-1px); box-shadow: 0 10px 24px -4px rgba(124,58,237,0.6); }
                .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }
                .footer { text-align: center; font-size: 0.72rem; color: #475569; margin-top: 22px; }
                .footer strong { color: #64748b; }
                .note { font-size: 0.7rem; color: #fbbf24; margin-top: 8px; padding: 8px; background: rgba(251, 191, 36, 0.1); border-radius: 8px; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes scaleUp { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
            </style>

            <div class="backdrop">
                <div class="card">
                    <div class="header">
                        <div class="icon-box">${ICONS.shield}</div>
                        <div class="title">${CONFIG.serviceTitle}</div>
                        <div class="subtitle">Secure Key Verification System</div>
                    </div>

                    <div class="info-box">
                        <div class="info-item">
                            <span class="lbl">SERVICE</span>
                            <span class="val">${CONFIG.service.toUpperCase()}</span>
                        </div>
                        <div class="info-item">
                            <span class="lbl">DEVICE HASH</span>
                            <span class="val" title="${hwid}">${shortHwid}</span>
                        </div>
                    </div>

                    <div class="status-box" id="statusBox"></div>

                    <div class="input-wrap">
                        <input type="text" id="keyInput" placeholder="Nhập License Key của bạn..." spellcheck="false" autocomplete="off" />
                    </div>

                    <div class="btn-row">
                        <button class="btn btn-secondary" id="btnGet">
                            <span>Get Key</span>
                            ${ICONS.key}
                        </button>
                        <button class="btn btn-primary" id="btnSubmit">
                            <span>Xác Thực</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                        </button>
                    </div>

                    <div class="footer">Protected by <strong>Home For Dev</strong> &copy; 2026</div>
                </div>
            </div>
        `;

        document.body.appendChild(host);

        const statusBox = shadow.getElementById('statusBox');
        const keyInput = shadow.getElementById('keyInput');
        const btnGet = shadow.getElementById('btnGet');
        const btnSubmit = shadow.getElementById('btnSubmit');

        if (!statusBox || !keyInput || !btnGet || !btnSubmit) {
            return;
        }

        const savedKey = getSavedKey();
        if (savedKey) {
            keyInput.value = savedKey;
        }

        function setStatus(msg, type) {
            if (statusBox) {
                statusBox.textContent = msg;
                statusBox.className = `status-box ${type}`;
            }
        }

        btnGet.addEventListener('click', function() {
            const link = getGetKeyUrl();
            window.open(link, '_blank');
            if (typeof GM_setClipboard !== 'undefined') {
                GM_setClipboard(link);
            }
            setStatus('Đã mở link Get Key & copy vào clipboard!', 'info');
        });

        btnSubmit.addEventListener('click', async function() {
            const keyVal = keyInput.value.trim();
            if (!keyVal) {
                setStatus('Vui lòng nhập License Key!', 'error');
                keyInput.focus();
                return;
            }

            btnSubmit.disabled = true;
            btnGet.disabled = true;
            setStatus('Đang kiểm tra key trên máy chủ...', 'info');

            const res = await verifyKeyAPI(keyVal);

            btnSubmit.disabled = false;
            btnGet.disabled = false;

            if (res && res.success) {
                saveKey(keyVal);
                isKeyValid = true;
                setStatus('Xác thực thành công!', 'success');

                setTimeout(function() {
                    host.remove();
                    isModalShown = false;
                    if (typeof onSuccessCallback === 'function') {
                        onSuccessCallback(res.data);
                    }
                }, 1200);
            } else {
                const msg = res?.message || 'Key không hợp lệ hoặc đã hết hạn!';
                if (msg.includes('Cloudflare') || msg.includes('tải lại')) {
                    setStatus('🛡️ ' + msg, 'warning');
                } else {
                    setStatus('❌ ' + msg, 'error');
                }
            }
        });

        keyInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !btnSubmit.disabled) {
                btnSubmit.click();
            }
        });
    }

    async function onAccessGranted(keyData) {
        try {
            await loadScriptFromUrl(CONFIG.scriptUrl);
        } catch (error) {
            try {
                const script = document.createElement('script');
                script.src = CONFIG.scriptUrl;
                document.head.appendChild(script);
            } catch (e2) {
                // Silent fail
            }
        }
    }

    async function init() {
        if (document.readyState === 'loading') {
            await new Promise(function(resolve) {
                document.addEventListener('DOMContentLoaded', resolve);
            });
        }

        const savedKey = getSavedKey();
        if (savedKey) {
            const res = await verifyKeyAPI(savedKey);
            if (res && res.success) {
                isKeyValid = true;
                await onAccessGranted(res.data);
                return;
            } else {
                localStorage.removeItem('hunehub_key');
            }
        }

        showModalUI(onAccessGranted);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

})();