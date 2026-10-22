// FotoVietos duomenys ir generavimas
(function () {
  var vietos = [
    {
      id: 1,
      pavadinimas: { lt: "Trakų pilis", en: "Trakai Castle", ru: "Тракайский замок" },
      aprasymas: {
        lt: "Viduramžių pilis saloje. Gražiausia ankstyvą rytą arba vakare aukso valandą.",
        en: "Medieval island castle. Best photographed early morning or during golden hour.",
        ru: "Средневековый островной замок. Лучше всего снимать рано утром или на закате."
      },
      nuotrauka: "https://images.unsplash.com/photo-1598608228254-05da2b6b588c?w=800&q=80",
      zurnalas: "https://example.com/trakai",
      instagram: "https://instagram.com/p/example1",
      kategorijos: ["pilis", "gamta", "vanduo"]
    },
    {
      id: 2,
      pavadinimas: { lt: "Vilniaus senamiestis", en: "Vilnius Old Town", ru: "Старый город Вильнюса" },
      aprasymas: {
        lt: "UNESCO paveldas. Siauros gatvelės, barokinė architektūra, geriausias apšvietimas vakare.",
        en: "UNESCO heritage. Narrow streets, baroque architecture, best lit in the evening.",
        ru: "Наследие ЮНЕСКО. Узкие улочки, барочная архитектура, лучшее освещение вечером."
      },
      nuotrauka: "https://images.unsplash.com/photo-1601891197111-c6c3df8c8f40?w=800&q=80",
      zurnalas: "https://example.com/vilnius-oldtown",
      instagram: "https://instagram.com/p/example2",
      kategorijos: ["miestas", "architektūra", "istorija"]
    },
    {
      id: 3,
      pavadinimas: { lt: "Kuršių nerija", en: "Curonian Spit", ru: "Куршская коса" },
      aprasymas: {
        lt: "Baltijos jūros kopos. Saulėlydis nuo Parnidžio kopos – nepakartojamai gražus.",
        en: "Baltic Sea dunes. Sunset from Parnidis Dune is unforgettably beautiful.",
        ru: "Дюны Балтийского моря. Закат с дюны Парнидис невероятно красив."
      },
      nuotrauka: "https://images.unsplash.com/photo-1599009434336-989c7c9c7a8d?w=800&q=80",
      zurnalas: "https://example.com/curonian-spit",
      instagram: "https://instagram.com/p/example3",
      kategorijos: ["gamta", "paplūdimys", "UNESCO"]
    },
    {
      id: 4,
      pavadinimas: { lt: "Kryžių kalnas", en: "Hill of Crosses", ru: "Гора крестов" },
      aprasymas: {
        lt: "Unikalus piligrimų objektas. Geriausia fotografuoti saulėtekio metu, kai šviesa sklinda pro kryžius.",
        en: "Unique pilgrimage site. Best at sunrise when light filters through the crosses.",
        ru: "Уникальное место паломничества. Лучше всего на рассвете, когда свет проходит сквозь кресты."
      },
      nuotrauka: "https://images.unsplash.com/photo-1598452963314-b09f397a5c48?w=800&q=80",
      zurnalas: "https://example.com/hill-of-crosses",
      instagram: "https://instagram.com/p/example4",
      kategorijos: ["istorija", "kultūra", "spiritualumas"]
    },
    {
      id: 5,
      pavadinimas: { lt: "Aukštaitijos nacionalinis parkas", en: "Aukštaitija National Park", ru: "Аукштайтийский национальный парк" },
      aprasymas: {
        lt: "Ežerai ir miškai. Labiausiai fotogeniškas rudenį, kai lapai keičia spalvas.",
        en: "Lakes and forests. Most photogenic in autumn when leaves change colors.",
        ru: "Озера и леса. Самый живописный осенью, когда листья меняют цвет."
      },
      nuotrauka: "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&q=80",
      zurnalas: "https://example.com/aukstaitija",
      instagram: "https://instagram.com/p/example5",
      kategorijos: ["gamta", "ežerai", "miškai"]
    },
    {
      id: 6,
      pavadinimas: { lt: "Kauno senamiestis ir Rotušė", en: "Kaunas Old Town and Town Hall", ru: "Старый город Каунаса и ратуша" },
      aprasymas: {
        lt: "Baltoji gulbė – Kauno rotušė. Vakaro mėlynoji valanda idealiai pabrėžia pastatų siluetus.",
        en: "The White Swan – Kaunas Town Hall. Evening blue hour perfectly highlights building silhouettes.",
        ru: "Белый лебедь – Каунасская ратуша. Вечерний синий час идеально подчеркивает силуэты зданий."
      },
      nuotrauka: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&q=80",
      zurnalas: "https://example.com/kaunas",
      instagram: "https://instagram.com/p/example6",
      kategorijos: ["miestas", "architektūra", "istorija"]
    }
  ];

  var vKategorijos = {
    lt: ["Visos", "pilis", "gamta", "vanduo", "miestas", "architektūra", "istorija", "UNESCO", "paplūdimys", "kultūra", "spiritualumas", "ežerai", "miškai"],
    en: ["All", "castle", "nature", "water", "city", "architecture", "history", "UNESCO", "beach", "culture", "spirituality", "lakes", "forests"],
    ru: ["Все", "замок", "природа", "вода", "город", "архитектура", "история", "ЮНЕСКО", "пляж", "культура", "духовность", "озёра", "леса"]
  };

  var katMap = {
    en: { pilis: "castle", gamta: "nature", vanduo: "water", miestas: "city", architektūra: "architecture", istorija: "history", UNESCO: "UNESCO", paplūdimys: "beach", kultūra: "culture", spiritualumas: "spirituality", ežerai: "lakes", miškai: "forests" },
    ru: { pilis: "замок", gamta: "природа", vanduo: "вода", miestas: "город", architektūra: "архитектура", istorija: "история", UNESCO: "ЮНЕСКО", paplūdimys: "пляж", kultūra: "культура", spiritualumas: "духовность", ežerai: "озёра", miškai: "леса" }
  };

  var lang = "lt";
  try { lang = localStorage.getItem("lang") || (navigator.language || "lt").slice(0, 2).toLowerCase(); } catch (e) {}
  if (!["lt", "en", "ru"].includes(lang)) lang = "en";

  var aktyvi = "Visos";

  function t(obj) { return obj[lang] || obj.lt || obj.en || ""; }
  function vert(k) { return (lang === "lt") ? k : (katMap[lang] && katMap[lang][k]) || k; }

  function rodyti() {
    var grid = document.getElementById("grid");
    if (!grid) return;
    grid.innerHTML = "";
    var filt = vietos.filter(function (v) {
      return aktyvi === (lang === "lt" ? "Visos" : lang === "en" ? "All" : "Все") || v.kategorijos.includes(aktyvi);
    });
    filt.forEach(function (v) {
      var card = document.createElement("div");
      card.className = "card";
      var img = document.createElement("img");
      img.src = v.nuotrauka;
      img.alt = t(v.pavadinimas);
      img.loading = "lazy";
      var body = document.createElement("div");
      body.className = "card-body";
      var h2 = document.createElement("h2");
      h2.textContent = t(v.pavadinimas);
      var p = document.createElement("p");
      p.textContent = t(v.aprasymas);
      var foot = document.createElement("div");
      foot.className = "card-footer";
      v.kategorijos.forEach(function (k) {
        var tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = vert(k);
        foot.appendChild(tag);
      });
      body.appendChild(h2);
      body.appendChild(p);
      body.appendChild(foot);
      card.appendChild(img);
      card.appendChild(body);
      grid.appendChild(card);
    });
  }

  function filtras() {
    var f = document.getElementById("filter");
    if (!f) return;
    f.innerHTML = "";
    vKategorijos[lang].forEach(function (k) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = k;
      if (k === aktyvi) btn.className = "active";
      btn.addEventListener("click", function () {
        aktyvi = k;
        filtras();
        rodyti();
      });
      f.appendChild(btn);
    });
  }

  function kalba(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) {}
    aktyvi = l === "lt" ? "Visos" : l === "en" ? "All" : "Все";
    filtras();
    rodyti();
    var btns = document.querySelectorAll(".lang-switch button");
    btns.forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === l);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang-switch button").forEach(function (b) {
      b.addEventListener("click", function () { kalba(b.dataset.lang); });
      b.classList.toggle("active", b.dataset.lang === lang);
    });
    filtras();
    rodyti();
  });
})();
