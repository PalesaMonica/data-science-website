// Shared header and footer for every page, so the menu only has to be edited in one place.
(function () {
  var pages = [
    ["index.html", "Home"],
    ["events.html", "Events"],
    ["resources.html", "Resources"],
    ["achievements.html", "Achievements"],
    ["team.html", "Team & Join"]
  ];
  var here = location.pathname.split("/").pop() || "index.html";

  var links = pages.map(function (p) {
    var current = p[0] === here ? ' aria-current="page"' : "";
    return '<a href="' + p[0] + '"' + current + ">" + p[1] + "</a>";
  }).join("");

  var header = document.getElementById("site-header");
  if (header) {
    header.innerHTML =
      '<div class="wrap">' +
        '<a class="brand" href="index.html">' +
          '<img src="assets/img/logo-icon.png" alt="">' +
          '<span class="brand-text"><strong>Data Science</strong><span>Interest Group</span></span>' +
        "</a>" +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="nav">Menu</button>' +
        '<nav class="nav" id="nav" aria-label="Main">' + links + "</nav>" +
      "</div>";
    var toggle = header.querySelector(".nav-toggle");
    var nav = header.querySelector(".nav");
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var footer = document.getElementById("site-footer");
  if (footer) {
    footer.innerHTML =
      '<div class="wrap">' +
        '<div class="cols">' +
          "<div>" +
            "<h4>Data Science Interest Group</h4>" +
            "<p>A student-run community within Mathematical Sciences Support at the University of the Witwatersrand, Johannesburg.</p>" +
            "<p>Thursdays, 13:15 to 14:00, MSL005</p>" +
          "</div>" +
          "<div><h4>Site</h4><ul>" +
            pages.map(function (p) { return '<li><a href="' + p[0] + '">' + p[1] + "</a></li>"; }).join("") +
          "</ul></div>" +
          "<div><h4>Links</h4><ul>" +
            '<li><a href="https://www.wits.ac.za/mss/interest-groups/data-science/">Wits MSS page</a></li>' +
            '<li><a href="https://data-science-interest-group-manu.gitbook.io/data-science-interest-group">Training manual</a></li>' +
            '<li><a href="https://palesamonica.github.io/dsig-playground/">Model Playground</a></li>' +
            '<li><a href="https://courses.ms.wits.ac.za/moodle/course/view.php?id=70">Moodle course</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<p class="legal">&copy; ' + new Date().getFullYear() + " Data Science Interest Group, Mathematical Sciences Support, University of the Witwatersrand.</p>" +
      "</div>";
  }

  // Photo lightbox: any <a class="tile"> opens its image full size, with arrows to move through the same gallery.
  var tiles = document.querySelectorAll("a.tile");
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
      var t = set[at], inner = t.querySelector("img"), c = t.querySelector(".cap");
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
        set = Array.prototype.slice.call(t.closest(".gallery").querySelectorAll("a.tile"));
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
