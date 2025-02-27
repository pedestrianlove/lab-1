// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><li class="part-title">一、認識eBPF</li><li class="chapter-item expanded "><a href="01-intro/intro.html"><strong aria-hidden="true">1.</strong> eBPF介紹</a></li><li class="chapter-item expanded "><a href="01-intro/minimal.html"><strong aria-hidden="true">2.</strong> 範例: minimal程式及其Makefile</a></li><li class="chapter-item expanded "><a href="01-intro/minimal-compile.html"><strong aria-hidden="true">3.</strong> 實作: 編譯minimal</a></li><li class="chapter-item expanded affix "><li class="part-title">二、認識eBPF中的map</li><li class="chapter-item expanded "><a href="02-map/map_intro.html"><strong aria-hidden="true">4.</strong> map介紹: 以bootstrap為例</a></li><li class="chapter-item expanded "><a href="02-map/bootstrap-compile.html"><strong aria-hidden="true">5.</strong> 實作: 編譯bootstrap</a></li><li class="chapter-item expanded affix "><li class="part-title">三、實作測量tcprtt的eBPF程式</li><li class="chapter-item expanded "><a href="03-tcprtt/target.html"><strong aria-hidden="true">6.</strong> 實作說明</a></li><li class="chapter-item expanded "><a href="03-tcprtt/tracepoint.html"><strong aria-hidden="true">7.</strong> 說明: 使用tracepoint</a></li><li class="chapter-item expanded "><a href="03-tcprtt/fentry.html"><strong aria-hidden="true">8.</strong> 說明: 使用fentry</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded "><a href="references.html"><strong aria-hidden="true">9.</strong> 參考資料</a></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
