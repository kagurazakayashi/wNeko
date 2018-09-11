var nekoconfigwindow = $("#nekoconfigwindow");
var aboutwindow = $("#nekoaboutwindow");
function wneko_showconfig(isshow) {
    if (wneko_configdiglog) {
        if (isshow) {
            nekoconfigwindow.css("display","block");
        } else {
            nekoconfigwindow.css("display","none");
        }
        document.getElementById("wneko_ssize").value = wneko_scale;
        document.getElementById("wneko_sref").value = wneko_runspeed;
        document.getElementById("wneko_sspeed").value = wneko_runspeedf;
        document.getElementById("wneko_ssens").value = wneko_sensitivityp;
    }
}
function wneko_showabout(isshow) {
    if (isshow) {
        aboutwindow.css("display","block");
        nekoconfigwindow.css("display","none");
    } else {
        aboutwindow.css("display","none");
        nekoconfigwindow.css("display","block");
    }
}
function wneko_saveconfbtn() {
    wneko_scale = parseFloat(document.getElementById("wneko_ssize").value);
    wneko_runspeed = parseInt(document.getElementById("wneko_sref").value);
    wneko_runspeedf = parseInt(document.getElementById("wneko_sspeed").value);
    wneko_sensitivityp = parseInt(document.getElementById("wneko_ssens").value);
    wneko_resetmaininterval();
    wneko_showconfig(false);
}
