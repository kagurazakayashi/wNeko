var nekoconfigwindow = $("#nekoconfigwindow");
var aboutwindow = $("#nekoaboutwindow");
function wcat_showconfig(isshow) {
    if (isshow) {
        nekoconfigwindow.css("display","block");
    } else {
        nekoconfigwindow.css("display","none");
    }
}
function wcat_showabout(isshow) {
    if (isshow) {
        aboutwindow.css("display","block");
        nekoconfigwindow.css("display","none");
    } else {
        aboutwindow.css("display","none");
        nekoconfigwindow.css("display","block");
    }
}
function wcat_saveconfbtn() {
    wcat_scale = parseFloat(document.getElementById("wcat_ssize").value);
    wcat_runspeed = parseInt(document.getElementById("wcat_sref").value);
    wcat_runspeedx = parseInt(document.getElementById("wcat_sspeed").value);
    wcat_sensitivity = parseInt(document.getElementById("wcat_ssens").value);
    wcat_resetmaininterval();
    wcat_showconfig(false);
}