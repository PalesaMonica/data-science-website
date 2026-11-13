// Shared header and footer for every page, so the menu only has to be edited in one place.
(function () {
  document.documentElement.classList.add("js");

  // Links have no ".html" so the address bar shows clean URLs (for example /events).
  // Netlify and GitHub Pages both serve events.html when /events is requested.
  // Each entry: [link, tab name shown in the header, plain name used in the footer]
  var pages = [
    ["./", "home", "Home"],
    ["events", "events", "Events"],
    ["resources", "resources", "Resources"],
    ["achievements", "achievements", "Achievements"],
    ["team", "team", "Team & Join"]
  ];
  var here = location.pathname.split("/").pop().replace(/\.html$/, "");
  if (here === "" || here === "index") here = "./";

  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="chrome-top">' +
        '<a class="brand" href="./">' +
          '<img src="assets/img/logo-icon.png" alt="">' +
          '<span class="brand-text"><strong>Data Science</strong><span>Interest Group</span></span>' +
        "</a>" +
        '<span class="kernel" aria-hidden="true"><i></i>Python 3 (dsig) | <b>idle</b></span>' +
      "</div>" +
      '<nav class="tabs" aria-label="Main">' +
        pages.map(function (p) {
          var current = p[0] === here ? ' aria-current="page"' : "";
          return '<a href="' + p[0] + '"' + current + ' aria-label="' + p[2] + '">' + p[1] + "<span>.ipynb</span></a>";
        }).join("") +
      "</nav>";
    var active = header.querySelector('[aria-current="page"]');
    if (active && active.scrollIntoView) active.scrollIntoView({ block: "nearest", inline: "center" });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="cols">' +
          "<div>" +
            "<h4>Data Science Interest Group</h4>" +
            "<p>A student-run community within Mathematical Sciences Support at the University of the Witwatersrand, Johannesburg.</p>" +
          "</div>" +
          "<div><h4>Site</h4><ul>" +
            pages.map(function (p) { return '<li><a href="' + p[0] + '">' + p[2] + "</a></li>"; }).join("") +
          "</ul></div>" +
          "<div><h4>Links</h4><ul>" +
            '<li><a href="https://www.wits.ac.za/mss/interest-groups/data-science/">Wits MSS page</a></li>' +
            '<li><a href="https://data-science-interest-group-manu.gitbook.io/data-science-interest-group">Training manual</a></li>' +
            '<li><a href="https://palesamonica.github.io/dsig-playground/">Model Playground</a></li>' +
            '<li><a href="https://courses.ms.wits.ac.za/moodle/course/view.php?id=70">Moodle course</a></li>' +
          "</ul></div>" +
        "</div>" +
      "</div>" +
      '<div class="statusbar"><div class="wrap">' +
        "<span>Thursdays | 13:15 to 14:00 | MSL005</span>" +
        "<span>&copy; " + new Date().getFullYear() + " Data Science Interest Group, Wits MSS</span>" +
      "</div></div>";
  }

  // Cells "run" as they scroll into view: the prompt shows In [*]: for a moment, then the output appears.
  var cells = document.querySelectorAll(".cell");
  var calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (cells.length && "IntersectionObserver" in window && !calm) {
    var kernel = document.querySelector(".kernel"), kernelText = kernel && kernel.querySelector("b"), running = 0;
    var setKernel = function (d) {
      running += d;
      if (!kernel) return;
      kernel.classList.toggle("busy", running > 0);
      kernelText.textContent = running > 0 ? "busy" : "idle";
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var cell = e.target, prompt = cell.querySelector(".in-p");
        io.unobserve(cell);
        if (prompt) prompt.textContent = "In [*]:";
        setKernel(1);
        setTimeout(function () {
          if (prompt) prompt.textContent = "In [" + prompt.getAttribute("data-n") + "]:";
          cell.classList.remove("queued");
          setKernel(-1);
        }, 380);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    cells.forEach(function (c) {
      if (c.getBoundingClientRect().top > window.innerHeight * 0.9) { c.classList.add("queued"); io.observe(c); }
    });
  }

  // Photo lightbox: any <a class="ax"> opens its image full size, with arrows to move through the same gallery.
  var tiles = document.querySelectorAll("a.ax");
  if (tiles.length) {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Photo viewer");
    box.innerHTML =
      '<button class="lb-close" aria-label="Close">&times;</button>' +
      '<button class="lb-prev" aria-label="Previous photo">&#8249;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>' +
      '<button class="lb-next" aria-label="Next photo">&#8250;</button>';
    document.body.appendChild(box);
    var img = box.querySelector("img"), cap = box.querySelector("figcaption");
    var prev = box.querySelector(".lb-prev"), next = box.querySelector(".lb-next");
    var set = [], at = 0, opener = null;

    function show(n) {
      at = (n + set.length) % set.length;
      var t = set[at], inner = t.querySelector("img"), c = t.querySelector(".ax-title");
      img.src = t.getAttribute("href");
      img.alt = inner ? inner.alt : "";
      cap.textContent = c ? c.textContent : "";
      prev.style.display = next.style.display = set.length > 1 ? "" : "none";
    }
    function close() {
      box.classList.remove("open");
      document.body.style.overflow = "";
      if (opener) opener.focus();
    }
    tiles.forEach(function (t) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        opener = t;
        set = Array.prototype.slice.call(t.closest(".subplots").querySelectorAll("a.ax"));
        show(set.indexOf(t));
        box.classList.add("open");
        document.body.style.overflow = "hidden";
        box.querySelector(".lb-close").focus();
      });
    });
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("lb-close")) close();
    });
    prev.addEventListener("click", function () { show(at - 1); });
    next.addEventListener("click", function () { show(at + 1); });
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(at - 1);
      if (e.key === "ArrowRight") show(at + 1);
    });
  }
})();
