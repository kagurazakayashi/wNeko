<?php
/**
 * @package wpNeko
 * @version 1.0
 */
/*
Plugin Name: wpNeko
Plugin URI: https://github.com/kagurazakayashi/wNeko
Description: Neko is a little cat who sits on the webpage and chases the mouse pointer around.
Version: 1.0
Author: KagurazakaYashi
Author URI: https://github.com/kagurazakayashi
Text Domain: wpNeko
*/

define("WPNEKO_PLUGIN_URL", plugin_dir_url( __FILE__ ));
define("WPNEKO_FULL_DIR", plugin_dir_path( __FILE__ ));

function wpnekoHead() {
    echo '<link href="'.WPNEKO_PLUGIN_URL.'lib/neko.css" rel="stylesheet">';
}
add_action("wp_head","wpnekoHead");

function wpneko(){
    echo '<!-- wpNeko : https://github.com/kagurazakayashi/wNeko -->';
    ?>
    <span class="yawn2 wnekotexture neko wneko" ondblclick="wneko_showconfig(true)"></span>
    <div id="nekoconfigwindow" class="w9xwindow wneko">
        <div id="nekoconfigwindowbg" class="w9xwindowbg">
            <div class="w9xtitlebg">🐱&nbsp;Configure&nbsp;Neko</div>
            <div class="w9xtitlebtnbox"><div class="w9xtitlebtn w9x3dobject w9xbutton" onclick="wneko_showconfig(false)">×</div></div>
            <div class="w9windowsvc">
                <p><span class="displayi nekocfg0"></span>&nbsp;Display</p>
                Size:<br/><span class="w9xinputbborder"><span class="w9xinputbg"><input type="wneko_ssize" name="wneko_ssize" id="wneko_ssize" value="1.0"></span></span><br/>&emsp;<br/>
                Refresh:<br/><span class="w9xinputbborder"><span class="w9xinputbg"><input type="wneko_sref" name="wneko_sref" id="wneko_sref" value="200"></span></span><br/>&emsp;<br/>
                <p><span class="movement nekocfg0"></span>&nbsp;Sensitivity</p>
                Speed:<br/><span class="w9xinputbborder"><span class="w9xinputbg"><input type="wneko_sspeed" name="wneko_sspeed" id="wneko_sspeed" value="10"></span></span><br/>&emsp;<br/>
                Sensitivity:<br/><span class="w9xinputbborder"><span class="w9xinputbg"><input type="wneko_ssens" name="wneko_ssens" id="wneko_ssens" value="64"></span></span><br/>&emsp;<br/>
                <div class="w9xdiglogbtnbox">
                <p><div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_saveconfbtn()"><u>O</u>K</div>&emsp;<div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_showabout(true)"><u>A</u>bout</div>&emsp;<div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_exit()"><u>E</u>xit</div></p>
                </div>
            </div>
        </div>
    </div>
    <div id="nekoaboutwindow" class="w9xwindow wneko">
        <div id="nekoconfigwindowbg" class="w9xwindowbg">
            <div class="w9xtitlebg">🐱&nbsp;About&nbsp;Neko</div>
            <div class="w9xtitlebtnbox"><div class="w9xtitlebtn w9x3dobject w9xbutton" onclick="wneko_showabout(false)">×</div></div>
            <div class="w9windowsvc">
                <span class="awake wnekotexture nekoz"></span>
                <p class="nekoabouttext">
                    Neko for HTML5 v1.0<br/><br/>
                    Written by Kagurazaka Yashi.<br/>Taking ingredients from Windows Version:<br/>The original program (X-Windows)<br/>was  written by Masayuki Koba and<br/>later modified by Tatsuya Kato.
                </p>
                <p class="nekoabouttext">This program is proud to be FREEWARE!</p>
                <div class="w9xdiglogbtnbox">
                <p><div class="w9xtextbutton w9x3dobject w9xbutton" onclick="window.lonekoion.href='https://github.com/kagurazakayashi/wNeko'"><u>G</u>ithub...</div>&emsp;<div class="w9xtextbutton w9x3dobject w9xbutton" onclick="wneko_showabout(false)"><u>O</u>K</div></p>
                </div>
            </div>
        </div>
    </div>
    <?php
    echo '<script type="text/javascript" src="'.WPNEKO_PLUGIN_URL.'lib/neko.min.js"></script>';
}
add_action('get_footer', 'wpneko');
?>