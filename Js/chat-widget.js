function mountChatWidget() {
  if (document.getElementById("chatLauncher")) return;
  const wrap = document.createElement("div");
  wrap.innerHTML = `
    <button class="chat-launcher" id="chatLauncher" aria-label="Open Prakriti AI chat">${icon('bot')}</button>
    <div class="chat-panel" id="chatPanel" role="dialog" aria-modal="true" aria-label="Prakriti AI chat">
      <div class="chat-header">
        <span>🌿 Prakriti AI</span>
        <button id="chatClose" aria-label="Close chat" style="background:none;border:none;color:var(--white);cursor:pointer;min-width:36px;min-height:36px;">${icon('x')}</button>
      </div>
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chip-row">
        <button class="quick-chip">What is Nature Nexus?</button>
        <button class="quick-chip">Who can join?</button>
        <button class="quick-chip">What happened in 2025?</button>
      </div>
      <div class="chat-input-row">
        <input type="text" id="chatInput" placeholder="Ask Prakriti AI..." aria-label="Message Prakriti AI">
        <button id="chatSend" aria-label="Send">→</button>
      </div>
    </div>`;
  document.body.appendChild(wrap);
  if (typeof initAssistantWidget === "function") initAssistantWidget();
}

document.addEventListener("DOMContentLoaded", mountChatWidget);
