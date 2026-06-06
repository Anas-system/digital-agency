/* Browser ke sabhi default gaps aur borders ko jad se khatam karne ke liye */
html, body, #root {
    margin: 0 !important;
    padding: 0 !important;
    border: 0 !important;
    outline: 0 !important;
    width: 100% !important;
    height: 100% !important;
    min-height: 100vh !important;
    background-color: #0b1528 !important; /* Jo aapki website ka main dark color hai */
    overflow-x: hidden !important;
}

/* Kisi bhi browser layout wrapper ko stretch karne ke liye */
div, section, main, header {
    box-sizing: border-box;
}