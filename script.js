// ================= SAFE LOAD =================
document.addEventListener("DOMContentLoaded", () => {

    applyTheme();
    applyParticles();
    createParticles();
    animateParticles();
    setupSearch();
    loadQuote();
    tabCloak();
    initLeaveConfirmation();
    initPanicKey();
    newTab("start.html"); // first tab loads automatically
    

    // -----------------------------------------
    // ONLY RUN ONCE AFTER THEME CHANGE
    // -----------------------------------------
    if (sessionStorage.getItem("theme-refresh") === "1") {
        sessionStorage.removeItem("theme-refresh");
    }


    const url = getURLParam();

    if (url) {
        newTab(url);
    } else {
        newTab("start.html");
    }
});

if (localStorage.getItem("particles") === null) { // makes sure first time users have particles
    localStorage.setItem("particles", "true");
}


// ================= QUOTES =================
function loadQuote() {

    let enabled = localStorage.getItem("quote");

    // Default to TRUE if never set
    if (enabled === null) {
        enabled = "true";
        localStorage.setItem("quote", "true");
    }

    if (enabled === "false") return;

    const quote = [
     "67 67 67 67 67 67",
     "im getting tired of 67",
     "ever heard of Cosmic Brownies?",
     "shout out to my arms for always being on my side",
     "shout out to my fingers because i can always count on them",
     "please speed i need this",
     "guess what",
     "chicken But",
     "cosmic brownies are delicious",
     "mark lowkey the thinker",
     "think, mark think",
     "will you rizz the ohio skibidi sigma",
     "why is frogies arcade always blocked",
     "shout out to me for making this",
     "should i add a link finder?",
     "join the discord for updates",
     "67 in the big 26 🥀",
     "imagine being called diego lol",
     "diego diego diego diego diego",
     "those who dih",
     "does anyone even read these",
     "shout out to arctic 1.0",
     "how did you find this link?",
     "should i add a custom mouse cursor?",
     "hackleBurger",
     "is rule to ping - Ismaeel1234, @voidnetwork",
     "why is the browser giving me so much trouble 😭",
     "lock in silly sally's",
     "what happened to doge unblocker v4?",
     "*villager noises*",
     "stop blocking my sites",
     "why do i hear sirens?",
     "yo why my dog walking like a human bro",
     "if your suggestion for turbine is epik, might as well help make it",
     "this is only v1, dont expect much"
    ];


    const el = document.getElementById("quote");

    if (!el) return;

    const random = quote[Math.floor(Math.random() * quote.length)];
    el.textContent = random;
}


// ================= THEMES =================
function applyTheme() {

    const saved = localStorage.getItem("theme");

    // Reset classes
    document.body.className = "";

    if (saved) {
        document.body.classList.add(saved);
    }
}

function setTheme(theme) {

    const current = localStorage.getItem("theme");

    // If same theme, do nothing
    if (current === theme) return;

    // Save new theme
    localStorage.setItem("theme", theme);

    // Mark that we WANT refresh (prevents loops)
    sessionStorage.setItem("theme-refresh", "1");

    // Refresh page so particles + UI update
    location.reload();
}


// ================= GRAPHICS =================

function toggleParticles() {

    // Get current state
    let enabled = localStorage.getItem("particles");

    // Default = ON
    if (enabled === null) enabled = "true";

    // Toggle
    enabled = (enabled === "true") ? "false" : "true";

    localStorage.setItem("particles", enabled);

    applyParticles();
}

function applyParticles() {

    const enabled = localStorage.getItem("particles");

    const bg = document.getElementById("bg-container");

    if (!bg) return;

    if (enabled === "false") {
        bg.style.display = "none";   // hide dots
    } else {
        bg.style.display = "block";  // show dots
    }
}


// ================= HEXAGON BACKGROUND =================
// ======================================================
// 🌌 TURBINE PARTICLE ENGINE
// Simple but powerful custom background system
// ======================================================

const particleContainer = document.getElementById("bg-container");

/* -------------------------------
   CONFIGURATION (EASY EDIT AREA)
   Change these to customize feel
-------------------------------- */
const CONFIG = {
    count: 35,              // number of particles
    size: 8,               // base size
    speed: 1.2,             // overall speed multiplier
};

/* -------------------------------
   THEME SETTINGS
   Each theme changes particle behavior
-------------------------------- */
function getThemeSettings() {

    const theme = localStorage.getItem("theme");

    switch (theme) {

        case "theme-starry":
            return {
                color: "#6d4494",
                direction: "down",
                speed: 0.4,
                size: 2,
                spinSpeed: 1.3
            };

        case "theme-sunset":
            return {
                color: "rgba(255, 163, 240, 0.61)",
                direction: "up",
                speed: 0.6,
                size: 3,
                spinSpeed: 0.8
            };

        case "theme-swamp":
            return {
                color: "#00ff88",
                direction: "up",      // 🌿 reverse movement
                speed: 2.2,           // faster movement
                size: 3,
                spinSpeed: 1.7
            };

        case "theme-magma":
            return {
                color: "rgba(0, 0, 0, 0.52)",
                direction: "down",
                speed: 0.3,           // slow heavy particles
                size: 15,               // BIG particles
                spinSpeed: 0.2           // spinning speed
            };

        case "theme-twilight":
            return {
                color: "rgba(44, 56, 212, 0.52)",
                direction: "up",
                speed: 0.6,           // slow heavy particles
                size: 2,               // BIG particles
                spinSpeed: 0.2           // spinning speed
            };

        case "theme-void":
            return {
                color: "rgba(0, 0, 0, 0.52)",
                direction: "down",
                speed: 2,           // slow heavy particles
                size: 2,               // BIG particles
                spinSpeed: 0.5           // spinning speed
            };

        case "theme-inferno":
            return {
                color: "rgba(255, 153, 0, 0.52)",
                direction: "up",
                speed: 3,           // slow heavy particles
                size: 9,               // BIG particles
                spinSpeed: 1           // spinning speed
            };

        case "theme-lunar":
            return {
                color: "rgba(191, 192, 130, 0.52)",
                direction: "up",
                speed: 1.3,           // slow heavy particles
                size: 2,               // BIG particles
                spinSpeed: 3           // spinning speed
            };

        case "theme-noir":
            return {
                color: "rgba(255, 255, 255, 0.52)",
                direction: "up",
                speed: 2,           // slow heavy particles
                size: 3,               // BIG particles
                spinSpeed: 1           // spinning speed
            };
            
        default: // Turbine V1
            return {
                color: "rgba(255, 205, 158, 0.5)",
                direction: "down",
                speed: 1.0,
                size: 2.5, 
                spinSpeed: 1.0
            };
    }
}

/* -------------------------------
   CREATE PARTICLES
-------------------------------- */
function createParticles() {

    if (!particleContainer) return;

    particleContainer.innerHTML = ""; // clear old particles

    const settings = getThemeSettings();

    for (let i = 0; i < CONFIG.count; i++) {

        const p = document.createElement("div");
        p.className = "particle";

        // -----------------------------------
        // POSITION (random starting point)
        // -----------------------------------
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;

        // -----------------------------------
        // SPEED (random per particle)
        // -----------------------------------
        let speed = (Math.random() * 1 + 0.5) * settings.speed;

        // -----------------------------------
        // SIZE (theme + randomness)
        // -----------------------------------
        let size = CONFIG.size * (settings.size || 1);

        p.style.width = size + "px";
        p.style.height = size + "px";

        // -----------------------------------
        // COLOR (theme controlled)
        // -----------------------------------
        p.style.background = settings.color;

        // -----------------------------------
        // RANDOM ROTATION (Arctic feel)
        // -----------------------------------
        let rotation = Math.random() * 360;

        // -----------------------------------
        // STORE DATA ON ELEMENT
        // -----------------------------------
        p.dataset.x = x;
        p.dataset.y = y;
        p.dataset.speed = speed;
        p.dataset.rotation = rotation;

        particleContainer.appendChild(p);
    }
}

/* -------------------------------
   ANIMATION LOOP (MAIN ENGINE)
-------------------------------- */
function animateParticles() {

    const particles = document.querySelectorAll(".particle");
    const settings = getThemeSettings();

    particles.forEach(p => {

        let x = parseFloat(p.dataset.x);
        let y = parseFloat(p.dataset.y);
        let speed = parseFloat(p.dataset.speed);
        let rot = parseFloat(p.dataset.rotation);

        // -----------------------------------
        // MOVEMENT LOGIC
        // -----------------------------------

        if (settings.direction === "down") {
            y += speed;
        } else {
            y -= speed;
        }

        x += Math.sin(y * 0.01) * 0.3; // slight drift (makes it feel alive)

        rot += settings.spinSpeed || 1; // spinning effect

        // -----------------------------------
        // RESET IF OFF SCREEN
        // -----------------------------------
        if (y > window.innerHeight + 20) {
            y = -20;
            x = Math.random() * window.innerWidth;
        }

        if (y < -20) {
            y = window.innerHeight + 20;
            x = Math.random() * window.innerWidth;
        }

        // -----------------------------------
        // APPLY TO ELEMENT
        // -----------------------------------
        p.style.transform =
            `translate(${x}px, ${y}px) rotate(${rot}deg)`;

        p.dataset.x = x;
        p.dataset.y = y;
        p.dataset.rotation = rot;
    });

    requestAnimationFrame(animateParticles);
}

/* -------------------------------
   INIT
-------------------------------- */
document.addEventListener("DOMContentLoaded", () => {

    createParticles();     // build particles
    animateParticles();    // start animation loop

});


// ================= SEARCH (INDEX PAGE) =================
function setupSearch() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    input.addEventListener("keydown", function (e) {

        if (e.key === "Enter") {

            let value = input.value.trim();

            if (!value) return;

            // If not a URL, search it
            if (!value.startsWith("http")) {
                value = "https://duckduckgo.com/?q=" + encodeURIComponent(value);
            }

            window.location.href = "browser.html?url=" + encodeURIComponent(value);
        }
    });
}

function goToURL() {

    let input = document.getElementById("urlInput").value.trim();

    // if no http → treat as search
    if (!input.startsWith("http")) {
        input = "https://www.google.com/search?q=" + encodeURIComponent(input);
    }

    tabs[activeTab].url = input;

    loadTab(activeTab);
}

document.getElementById("urlInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        goToURL();
    }
});

function getURLParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get("url");
}

document.querySelector(".search-box").addEventListener("click", () => {
    document.getElementById("searchInput").focus();
});

function goHome() {
    window.location.href = "index.html";
}

function goBack() {
    document.querySelector("iframe")?.contentWindow.history.back();
}

function goForward() {
    document.querySelector("iframe")?.contentWindow.history.forward();
}

function reloadPage() {
    document.querySelector("iframe")?.contentWindow.location.reload();
}

function toggleTabs() {
    const panel = document.getElementById("tabsPanel");
    panel.classList.toggle("active");
}

let tabs = [];
let activeTab = 0;

function newTab(url = "start.html") {

    tabs.push({
        url: url
    });

    activeTab = tabs.length - 1;

    renderTabs();
    loadTab(activeTab);
}

function closeTab() {

    if (tabs.length <= 1) return;

    tabs.splice(activeTab, 1);

    activeTab = Math.max(0, activeTab - 1);

    renderTabs();
    loadTab(activeTab);
}

function loadTab(index) {
    const frame = document.getElementById("browserFrame");

    let url = tabs[index].url;

    if (!url) url = "start.html";

    frame.src = url;

    // update URL bar
    document.getElementById("urlInput").value = url;
}

function renderTabs() {
    const list = document.getElementById("tabsList");
    list.innerHTML = "";

    tabs.forEach((tab, i) => {

        const el = document.createElement("div");
        el.className = "tab";

        el.textContent = "Tab " + (i + 1);

        if (i === activeTab) {
            el.style.opacity = "1";
        }

        el.onclick = () => {
            activeTab = i;
            loadTab(i);
            renderTabs();
        };

        list.appendChild(el);
    });
}

document.querySelector(".search-box").addEventListener("click", () => {
    document.getElementById("searchInput").focus();
});

// ================= SHORTCUTS =================
function openShortcut(url) {

    window.location.href = "browser.html?url=" + encodeURIComponent(url);
}


// ================= PARTNER POPUP =================
function openPartnerInfo() {

    const popup = document.getElementById("partner-popup");
    if (popup) {
        popup.classList.remove("hidden");
    }
}

function closePopup() {

    const popup = document.getElementById("partner-popup");
    if (popup) {
        popup.classList.add("hidden");
    }
}


// ================= ADD SHORTCUT (PLACEHOLDER) =================
function openAddMenu() {

    alert("Shortcut creator coming soon");
}


// ================= QUOTES SYSTEM =================
function setQuotes(enabled) {

    localStorage.setItem("quotes", enabled);
    alert("Quotes " + (enabled ? "enabled" : "disabled"));
}

// ============== CLOAKING ==============

const PRESETS = {
    default: {
        title: "Turbine V1",
        icon: "images/default.png"
    },

    drive: {
        title: "My Drive - Google Drive",
        icon: "images/drive.png"
    },

    docs: {
        title: "Google Docs",
        icon: "images/docs.png"
    },

    gmail: {
        title: "Inbox - Gmail",
        icon: "images/gmail.png"
    },

    youtube: {
        title: "YouTube",
        icon: "images/youtube.png"
    },
    
    classroom: {
        title: "Classes",
        icon: "images/classroom.png"
    },

    khan: {
        title: "Khan Academy",
        icon: "images/khan.png"
    },

    fakesearch: {
        title: "calculator - Google Search",
        icon: "images/favicon-1.png"
    },

    google: {
        title: "Google",
        icon: "images/favicon-1.png"
    }
};

function defaultPreset() {
    localStorage.setItem('cloakedTitle', 'Turbine 1.0');
    localStorage.setItem('cloakedIcon', 'images/loader.png');
    window.location.reload();
}

function drivePreset() {
    localStorage.setItem('cloakedTitle', 'My Drive - Google Drive');
    localStorage.setItem('cloakedIcon', 'images/drive.png');
    window.location.reload();
}

function docsPreset() {
    localStorage.setItem('cloakedTitle', 'Google Docs');
    localStorage.setItem('cloakedIcon', 'images/docs.png');
    window.location.reload();
}

function gmailPreset() {
    localStorage.setItem('cloakedTitle', 'Inbox - Gmail');
    localStorage.setItem('cloakedIcon', 'images/gmail.png');
    window.location.reload();
}

function ytPreset() {
    localStorage.setItem('cloakedTitle', 'Youtube');
    localStorage.setItem('cloakedIcon', 'images/youtube.png');
    window.location.reload();
}

function classPreset() {
    localStorage.setItem('cloakedTitle', 'Classes');
    localStorage.setItem('cloakedIcon', 'images/classroom.png');
    window.location.reload();
}

function fakePreset() {
    localStorage.setItem('cloakedTitle', 'calculator - Google Search');
    localStorage.setItem('cloakedIcon', 'images/favicon-1.png');
    window.location.reload();
}

function googlePreset() {
    localStorage.setItem('cloakedTitle', 'Google');
    localStorage.setItem('cloakedIcon', 'images/favicon-1.png');
    window.location.reload();
}

function khanPreset() {
    localStorage.setItem('cloakedTitle', 'Dashboard | Khan Academy');
    localStorage.setItem('cloakedIcon', 'images/khan.png');
    window.location.reload();
}

function applyPreset() {
    const saved = localStorage.getItem("preset");
    const preset = PRESETS[saved];

    if (!preset) return;

    document.title = preset.title;

    let icon = document.getElementById("favicon");

    if (!icon) {
        icon = document.createElement("link");
        icon.rel = "icon";
        icon.id = "favicon";
        document.head.appendChild(icon);
    }

    icon.href = preset.icon;
}

function setPreset(name) {
    localStorage.setItem("preset", name);
    location.reload(); // same as themes
}

function tabCloak() {

    const title = localStorage.getItem("cloakedTitle");
    const icon = localStorage.getItem("cloakedIcon");

    // Apply title
    if (title) {
        document.title = title;
    }

    // Apply favicon
    if (icon) {

        let favicon = document.querySelector("link[rel*='icon']");

        if (!favicon) {
            favicon = document.createElement("link");
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }

        favicon.href = icon;
    }
}

function openAboutBlank() {

    const win = window.open("", "_blank");

    if (!win) {
        alert("Popup blocked! Allow popups.");
        return;
    }

    const url = window.location.href;

    win.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Google</title>
            <link rel="icon" href="https://www.google.com/favicon.ico">

            <style>
                html, body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    overflow: hidden;
                    background: black;
                }

                iframe {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    border: none;
                }
            </style>
        </head>

        <body>
            <iframe src="${url}"></iframe>
        </body>
        </html>
    `);

    win.document.close();

    // optional: hide original tab
    window.location.replace("https://google.com");
}

// ================ LEAVE CONFIRMATION ================
function leaveConf() {
    const state = localStorage.getItem("leaveConfirmation");

    if (state === "enabled") {
        localStorage.setItem("leaveConfirmation", "disabled");
    } else {
        localStorage.setItem("leaveConfirmation", "enabled");
    }
}

window.addEventListener("beforeunload", function (e) {

    const state = localStorage.getItem("leaveConfirmation");

    if (state === "enabled") {

        // Required for modern browsers
        e.preventDefault();

        // Chrome requires returnValue to be set
        e.returnValue = '';

        return '';
    }
});

const enabledBtn = document.getElementById("enableLeave");
const disabledBtn = document.getElementById("disableLeave");

const state = localStorage.getItem("leaveConfirmation");

if (state === "enabled") {
    enabledBtn.disabled = true;
    disabledBtn.disabled = false;
} else {
    enabledBtn.disabled = false;
    disabledBtn.disabled = true;
}

function enableLeave() {
    localStorage.setItem("leaveConfirmation", "enabled");
    location.reload();
}

function disableLeave() {
    localStorage.setItem("leaveConfirmation", "disabled");
    location.reload();
}

function initLeaveConfirmation() {
    const enabled = localStorage.getItem("leaveConfirmation");

    if (enabled !== "enabled") return;

    window.addEventListener("beforeunload", (e) => {
        e.preventDefault();
        e.returnValue = "";
    });
}

// ================ PANIC KEY ==================
function initPanicKey() {

    document.addEventListener("keydown", function (event) {

        const savedKey = localStorage.getItem("pkKey");

        if (!savedKey) return;

        // Prevent triggering while typing
        const active = document.activeElement.tagName;
        if (active === "INPUT" || active === "TEXTAREA") return;

        // DEBUG
        console.log("Pressed:", event.key, "Saved:", savedKey);

        if (event.key.toLowerCase() === savedKey.toLowerCase()) {
            activatePanic();
        }
    });
}

function activatePanic() {
    window.location.href = "https://google.com";
}

function removePanicKey() {
    localStorage.removeItem("pkKey");
}

function savePanicKey() {
    const value = document.getElementById("panicKeyInput").value;

    if (!value || value === "Press any key...") return;

    localStorage.setItem("pkKey", value);

    console.log("Saved panic key:", value);
}

function detectPanicKey() {
    const input = document.getElementById("panicKeyInput");

    input.value = "Press any key...";

    function handler(e) {
        e.preventDefault();

        input.value = e.key;

        document.removeEventListener("keydown", handler);
    }

    document.addEventListener("keydown", handler);
}
