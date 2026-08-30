(function () {
  if (window.__tawkScriptAdded) return;
  window.__tawkScriptAdded = true;

  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = window.Tawk_LoadStart || new Date();
  window.Tawk_API.onBeforeLoad = function () {};
  window.Tawk_API.onStatusChange = function () {};

  window.Tawk_API.onLoad = function () {
    window.Tawk_API.onChatMaximized = function () {
      document.body.classList.add("tawk-chat-open");
    };

    window.Tawk_API.onChatMinimized = function () {
      document.body.classList.remove("tawk-chat-open");
    };

    window.Tawk_API.onChatEnded = function () {
      document.body.classList.remove("tawk-chat-open");
    };
  };

  if (document.querySelector('script[src*="embed.tawk.to"]')) return;

  var script = document.createElement("script");
  script.async = true;
  script.src = "https://embed.tawk.to/6a2575b75bdfa41c2ccf3d72/1jqh57ma3";
  script.charset = "UTF-8";
  script.setAttribute("crossorigin", "*");
  document.head.appendChild(script);
})();
