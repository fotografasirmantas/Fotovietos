// FotoVietos: mygtukas „Įdiegti programėlę" ir instrukcijos kiekvienai naršyklei.
(function () {
  // Jau įdiegta ir atidaryta kaip programėlė, mygtuko nereikia
  if (window.matchMedia("(display-mode: standalone)").matches || navigator.standalone) return;

  var lang = "lt";
  try { lang = localStorage.getItem("lang") || (navigator.language || "lt").slice(0, 2).toLowerCase(); } catch (e) {}

  var T = {
    lt: {
      btn: "📲 Įdiegti programėlę", title: "Kaip įdiegti", close: "Uždaryti",
      copy: "Kopijuoti nuorodą", copied: "Nukopijuota ✓",
      inapp: "Ši programėlė (Messenger, Facebook, Instagram ar kita) neleidžia įdiegti. Atidarykite nuorodą Chrome naršyklėje: viršuje spauskite ⋮ arba ⋯ ir pasirinkite „Atidaryti naršyklėje". Arba nukopijuokite nuorodą ir įklijuokite į Chrome.",
      ios: "Atidarykite nuorodą Safari naršyklėje, apačioje spauskite „Bendrinti" (kvadratas su rodykle į viršų) ir pasirinkite „Į pradžios ekraną".",
      samsung: "Apačioje spauskite meniu ☰ → „Pridėti puslapį prie" → „Pradžios ekranas".",
      android: "Viršuje dešinėje spauskite ⋮ → „Įdiegti programą" arba „Pridėti prie pagrindinio ekrano" → „Įdiegti". Jei matote „Atidaryti programą", ji jau įdiegta.",
      desktop: "Adreso juostos dešinėje spauskite įdiegimo ženkliuką arba meniu ⋮ → „Įdiegti"."
    },
    en: {
      btn: "📲 Install the app", title: "How to install", close: "Close",
      copy: "Copy link", copied: "Copied ✓",
      inapp: "This app (Messenger, Facebook, Instagram or similar) does not allow installing. Open the link in Chrome: tap ⋮ or ⋯ at the top and choose "Open in browser". Or copy the link and paste it into Chrome.",
      ios: "Open the link in Safari, tap "Share" (square with an arrow) at the bottom and choose "Add to Home Screen".",
      samsung: "Tap the menu ☰ at the bottom → "Add page to" → "Home screen".",
      android: "Tap ⋮ at the top right → "Install app" or "Add to Home screen" → "Install". If you see "Open app", it is already installed.",
      desktop: "Click the install icon at the right of the address bar, or menu ⋮ → "Install"."
    },
    ru: {
      btn: "📲 Установить приложение", title: "Как установить", close: "Закрыть",
      copy: "Копировать ссылку", copied: "Скопировано ✓",
      inapp: "Это приложение (Messenger, Facebook, Instagram и т. п.) не позволяет установку. Откройте ссылку в Chrome: нажмите ⋮ или ⋯ вверху и выберите «Открыть в браузере». Или скопируйте ссылку и вставьте её в Chrome.",
      ios: "Откройте ссылку в Safari, нажмите «Поделиться» (квадрат со стрелкой) внизу и выберите «На экран „Домой"».",
      samsung: "Нажмите меню ☰ внизу → «Добавить страницу на» → «Главный экран».",
      android: "Нажмите ⋮ вверху справа → «Установить приложение» или «Добавить на главный экран» → «Установить». Если видите «Открыть приложение», оно уже установлено.",
      desktop: "Нажмите значок установки справа в адресной строке или меню ⋮ → «Установить»."
    }
  };
  var t = T[lang] || T.en;

  var ua = navigator.userAgent || "";
  var inApp = /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Messenger|Line\/|Snapchat|; wv\)/i.test(ua);
  var ios = /iPhone|iPad|iPod/i.test(ua);
  var samsung = /SamsungBrowser/i.test(ua);
  var mobile = /Android|iPhone|iPad|iPod/i.test(ua);

  var css = document.createElement("style");
  css.textContent =
    ".fv-install{position:fixed;left:16px;bottom:calc(20px + env(safe-area-inset-bottom));z-index:1100;border:0;border-radius:999px;padding:14px 18px;background:#1a3c34;color:#fff;font:600 15px system-ui,sans-serif;box-shadow:0 6px 18px rgba(0,0,0,.25);cursor:pointer}" +
    ".fv-install:focus-visible,.fv-box button:focus-visible{outline:3px solid #c9973f;outline-offset:2px}" +
    ".fv-back{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.45);display:flex;align-items:flex-end;justify-content:center;padding:16px}" +
    ".fv-box{background:#fff;color:#1f2a27;border-radius:16px;padding:18px;max-width:460px;width:100%;font:16px/1.5 system-ui,sans-serif}" +
    ".fv-box h2{margin:0 0 8px;font-size:19px}.fv-box p{margin:0 0 14px}" +
    ".fv-row{display:flex;gap:8px;flex-wrap:wrap}" +
    ".fv-box button{border:1px solid #d9d2c3;background:#fff;color:#1f2a27;border-radius:10px;padding:10px 14px;font:inherit;cursor:pointer}" +
    ".fv-box .fv-main{background:#1a3c34;color:#fff;border-color:#1a3c34}";
  document.head.appendChild(css);

  var deferred = null;
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "fv-install";
  btn.textContent = t.btn;
  btn.hidden = true;
  document.body.appendChild(btn);

  // Chrome ir Samsung leidžia įdiegti vienu paspaudimu
  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferred = e;
    btn.hidden = false;
  });
  window.addEventListener("appinstalled", function () { btn.hidden = true; deferred = null; });
  // Kitose naršyklėse mygtukas parodo instrukciją
  setTimeout(function () { btn.hidden = false; }, 2500);

  btn.addEventListener("click", function () {
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function (r) {
        if (r.outcome === "accepted") btn.hidden = true;
        deferred = null;
      });
      return;
    }
    showHelp();
  });

  function showHelp() {
    var msg = inApp ? t.inapp : ios ? t.ios : samsung ? t.samsung : mobile ? t.android : t.desktop;
    var back = document.createElement("div");
    back.className = "fv-back";
    var box = document.createElement("div");
    box.className = "fv-box";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-labelledby", "fv-h");
    var h = document.createElement("h2");
    h.id = "fv-h";
    h.textContent = t.title;
    var p = document.createElement("p");
    p.textContent = msg;
    var row = document.createElement("div");
    row.className = "fv-row";
    if (inApp) {
      var c = document.createElement("button");
      c.type = "button";
      c.textContent = t.copy;
      c.addEventListener("click", function () { copy(location.href.split("#")[0], c); });
      row.appendChild(c);
    }
    var x = document.createElement("button");
    x.type = "button";
    x.className = "fv-main";
    x.textContent = t.close;
    row.appendChild(x);
    box.appendChild(h); box.appendChild(p); box.appendChild(row);
    back.appendChild(box);
    document.body.appendChild(back);

    function close() { back.remove(); document.removeEventListener("keydown", esc); btn.focus(); }
    function esc(e) { if (e.key === "Escape") close(); }
    x.addEventListener("click", close);
    back.addEventListener("click", function (e) { if (e.target === back) close(); });
    document.addEventListener("keydown", esc);
    x.focus();
  }

  function copy(text, b) {
    var done = function () { b.textContent = t.copied; };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { window.prompt("", text); });
    } else {
      window.prompt("", text);
    }
  }
})();
