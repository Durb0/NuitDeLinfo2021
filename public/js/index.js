function initElement() {
    var p = document.getElementById("form");
    p.onclick = changeHeader;
}

function changeHeader() {
    var h = document.getElementById("header");
    h.style.height = "50px";
}