// ==UserScript==
// @id             wneko@kagurazakayashi
// @name           wNeko
// @category       KagurazakaYashi
// @version        1.0
// @namespace
// @updateURL
// @downloadURL
// @description    Neko is a little cat who sits on the webpage and chases the mouse pointer around.
// @include        *
// @match          *
// @exclude        *yoooooooooo.com*
// @exclude        *yashi.moe*
// @exclude        *uuu.moe*
// @grant          none
// @require        //code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    let url_nico = `//github.com/kagurazakayashi/wNeko/blob/master/neko0.gif?raw=true`;
    let html = '<!-- wpNeko : https://github.com/kagurazakayashi/wNeko -->        <span class="yawn2 wnekotexture neko wneko" ondblclick="wneko_showconfig(true)"></span><div id=nekoconfigwindow class="w9xwindow wneko"><div id=nekoconfigwindowbg class=w9xwindowbg><div class=w9xtitlebg>🐱&nbsp;Configure&nbsp;Neko</div><div class=w9xtitlebtnbox><div class="w9xtitlebtn w9x3dobject w9xbutton" onclick="wneko_showconfig(false)">×</div></div><div class=w9windowsvc><p><span class="displayi nekocfg0"></span>&nbsp;Display</p>Size:<br><span class=w9xinputbborder><span class=w9xinputbg><input type=wneko_ssize name=wneko_ssize id=wneko_ssize value=1.0></span></span><br>&emsp;<br>Refresh:<br><span class=w9xinputbborder><span class=w9xinputbg><input type=wneko_sref name=wneko_sref id=wneko_sref value=200></span></span><br>&emsp;<br><p><span class="movement nekocfg0"></span>&nbsp;Sensitivity</p>Speed:<br><span class=w9xinputbborder><span class=w9xinputbg><input type=wneko_sspeed name=wneko_sspeed id=wneko_sspeed value=10></span></span><br>&emsp;<br>Sensitivity:<br><span class=w9xinputbborder><span class=w9xinputbg><input type=wneko_ssens name=wneko_ssens id=wneko_ssens value=64></span></span><br>&emsp;<br><div class=w9xdiglogbtnbox><p><div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_saveconfbtn()"><u>O</u>K</div>&emsp;<div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_showabout(true)"><u>A</u>bout</div>&emsp;<div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_exit()"><u>E</u>xit</div></p></div></div></div></div><div id=nekoaboutwindow class="w9xwindow wneko"><div id=nekoconfigwindowbg class=w9xwindowbg><div class=w9xtitlebg>🐱&nbsp;About&nbsp;Neko</div><div class=w9xtitlebtnbox><div class="w9xtitlebtn w9x3dobject w9xbutton" onclick="wneko_showabout(false)">×</div></div><div class=w9windowsvc><span class="awake wnekotexture nekoz"></span><p class=nekoabouttext>Neko for HTML5 v1.0<br><br>Written by Kagurazaka Yashi.<br>Taking ingredients from Windows Version:<br>The original program (X-Windows)<br>was  written by Masayuki Koba and<br>later modified by Tatsuya Kato.</p><p class=nekoabouttext>This program is proud to be FREEWARE!</p><div class=w9xdiglogbtnbox><p><div class="w9xtextbutton w9x3dobject w9xbutton" onclick="window.lonekoion.href=\'https://github.com/kagurazakayashi/wNeko\'"><u>G</u>ithub...</div>&emsp;<div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_showabout(false)"><u>O</u>K</div></p></div></div></div></div>';
    let css = '<style>.wnekobox{display:block;overflow:hidden;background:transparent;position:fixed;pointer-events:none;z-index:100000;width:100%;height:100%;top:0;left:0}.neko,.nekoz{display:block;overflow:hidden;background-repeat:no-repeat;position:fixed}#nekoconfigwindow{display:none;position:fixed;left:10px;top:10px;width:200px;height:370px;z-index:100001}#nekoaboutwindow{display:none;position:fixed;left:5px;top:50px;width:300px;height:230px}.nekoz{float:left}.nekoabouttext{margin-left:45px}#nekoconficon{width:100px;text-align:center;user-select:none;color:#FFF;text-shadow:1px 1px 1px #000;font-size:9pt;cursor:pointer}.w9xdesktop{background-color:#FFF}.w9xwindow{display:block;background-color:#FFF;border:1px solid;border-color:#c0c0c0 #000 #000 #c0c0c0;padding-right:2px;padding-bottom:2px;font-size:9pt;user-select:none}.w9xwindowbg{display:block;background-color:#c0c0c0;border:1px solid;border-color:#FFF #808080 #808080 #FFF;width:100%;height:100%}.w9x3dobject{background-color:#c0c0c0;border:1px solid;border-color:#FFF #808080 #808080 #FFF;box-shadow:1px 1px 1px #000}.w9xtitlebg{background:#001680;background:linear-gradient(to right, #000080 , #1084d0);height:18px;line-height:18px;width:100%;width:calc(100% - 2px);color:#FFF;text-indent:5px;border:1px solid #c0c0c0;overflow:hidden}.w9xtitlebtnbox{position:absolute;top:4px;width:100%;width:calc(100% - 6px);height:18px;text-align:right}.w9xtitlebtn{display:inline-block;height:7px;width:8px;padding:2px;font-size:9pt;line-height:7px;overflow:hidden}.w9xtextbutton{display:inline-block;width:auto;height:auto;padding-left:9px;padding-right:9px;padding-top:3px;padding-bottom:3px}.w9xbutton:active{border-color:#808080;box-shadow:0 0 1px #000;cursor:default}.w9xdiglogbtnbox{text-align:right;width:90%;width:calc(100% - 22px)}.w9windowsvc{width:100%;height:100%;margin:10px}.w9xinputbborder{border:1px solid;background-color:#FFF;border-color:#808080 #c0c0c0 #c0c0c0 #808080;box-shadow:1px 1px 1px #FFF}.w9xinputbg{border:1px solid;border-color:#000 #FFF #FFF #000}.w9xwindow input{border:none;background-color:transparent;outline:none;height:17px;overflow:hidden}.w9xwindow input::-webkit-outer-spin-button,.w9xwindow input::-webkit-inner-spin-button{-webkit-appearance:none}.wnekotexture{background-image:url('+url_nico+')}.Awake{width:32px;height:32px;background-position:-342px -36px}.Down1{width:32px;height:32px;background-position:-308px -70px}.Downleft2{width:32px;height:32px;background-position:-308px -36px}.Downright1{width:32px;height:32px;background-position:-342px -2px}.Right1{width:32px;height:32px;background-position:-308px -2px}.Rightclaw2{width:32px;height:32px;background-position:-274px -70px}.Up1{width:32px;height:32px;background-position:-274px -36px}.Up2{width:32px;height:32px;background-position:-274px -2px}.Upleft1{width:32px;height:32px;background-position:-240px -70px}.Upleft2{width:32px;height:32px;background-position:-240px -36px}.Upright1{width:32px;height:32px;background-position:-240px -2px}.Upright2{width:32px;height:32px;background-position:-206px -70px}.down2{width:32px;height:32px;background-position:-206px -36px}.downclaw1{width:32px;height:32px;background-position:-206px -2px}.downclaw2{width:32px;height:32px;background-position:-172px -70px}.downleft1{width:32px;height:32px;background-position:-172px -36px}.downright2{width:32px;height:32px;background-position:-172px -2px}.left1{width:32px;height:32px;background-position:-138px -70px}.left2{width:32px;height:32px;background-position:-138px -36px}.leftclaw1{width:32px;height:32px;background-position:-138px -2px}.leftclaw2{width:32px;height:32px;background-position:-104px -70px}.right2{width:32px;height:32px;background-position:-104px -36px}.rightclaw1{width:32px;height:32px;background-position:-104px -2px}.scratch1{width:32px;height:32px;background-position:-70px -70px}.scratch2{width:32px;height:32px;background-position:-70px -36px}.sleep1{width:32px;height:32px;background-position:-70px -2px}.sleep2{width:32px;height:32px;background-position:-36px -70px}.upclaw1{width:32px;height:32px;background-position:-36px -36px}.upclaw2{width:32px;height:32px;background-position:-36px -2px}.wash2{width:32px;height:32px;background-position:-2px -70px}.yawn2{width:32px;height:32px;background-position:-2px -36px}.yawn3{width:32px;height:32px;background-position:-2px -2px}.nekocfg0{display:inline-block;overflow:hidden;background-repeat:no-repeat;background-image:url(nekocfg.gif)}.AppIcon{width:32px;height:32px;background-position:-2px -2px}.displayi{width:16px;height:16px;background-position:-38px -20px}.independence{width:16px;height:16px;background-position:-38px -2px}.movement{width:16px;height:16px;background-position:-20px -36px}.play{width:8px;height:9px;background-position:-38px -38px}.sounds{width:16px;height:16px;background-position:-2px -36px}</style>';
    $("body").append(html+css);
})();
