# wNeko

## Neko for HTML5

[ネコネコネ ~](https://www.yoooooooooo.com/yashi/demo/wneko/)

Neko is a little cat who sits on the webpage and chases the mouse pointer / touch around.

When you run the demo webpage `index.html`, a webpage is opened with Neko inside it.

As you move the mouse, Neko will follow. If the mouse is inside the webpage and it is not moving, Neko will go to sleep. When the mouse is moved Neko will awake and will chase the mouse. If the mouse is outside the window and it is not moving, Neko will scratch the webpage window boundary and goes to sleep.

![Neko will scratch the webpage window boundary](ScreenShot/b.jpg?raw=true)

Written by [`Kagurazaka Yashi`](https://github.com/kagurazakayashi). Taking ingredients from Windows Version : The original program (X-Windows) was written by `Masayuki Koba` and later modified by `Tatsuya Kato`.

![Neko](texture/neko2/t_neko2.gif?raw=true)

# Running Neko

## Webpage

1. `npm install --save jquery`
2. Open `index.html`

## WordPress Plugin

1. `npm install --save jquery`
2. `npm install --save google-closure-compiler`
3. `sh g_wpplugin.sh` or `sh g_wpplugin-addjq.sh`(include jquery)
4. Upload the `wpNeko` folder to the `/wp-content/plugins/` directory.
5. Activate the `wpNeko` plugin through the `Plugins` menu in WordPress.

## Tampermonkey® Script

Add:

1. `sh g_tampermonkey.sh`
2. Tampermonkey® Icon - `Create a new script`
3. copy the contents of `tampermonkey/wneko.js` to Editor
4. File - Save

![Tampermonkey® Script](ScreenShot/t.jpg?raw=true)

Edit:

1. `sh g_tampermonkey.sh`
2. Tampermonkey® Icon - `Dashboard` - `Installed userscripts`
3. Edit `wNeko`
4. copy the contents of `tampermonkey/wneko.js` to Editor

Link URLs:

- `//github.com/kagurazakayashi/wNeko/blob/master/neko0.gif?raw=true`
- `//code.jquery.com/jquery-1.11.0.min.js`
  - Edit: `tampermonkey/wneko.tmp.js`
    - Line 20: `url_nico`
    - Line 21: `url_nicocur`

# Configuring Neko

A configuration program has been supplied with wNeko. Double click on the neko. From here you can set all of the options for wNeko.

![Double click on the neko](ScreenShot/o.jpg?raw=true)

## Change Texture

`sh change.sh <texturename>`

`<texturename>`: `neko2`(default)/`neko`/`bsd`/`dog`/`tora`/`sakura`/`tomoyo`

texturename copyright: `texture/<texturename>/COPYRIGHT`

Optional step: [Update WordPress Plugin](#wordpress-plugin)

[Texture List](https://github.com/kagurazakayashi/wNeko/tree/master/texture)

# Known Problems

Having too many Nekos - especially if they're high speed will result in a reduction of system resources. This is unavoidable.

# License

TERMS OF USE

This program is totally unsupported FREEWARE and you use it at your own risk. Neither the author nor anyone involved in the distribution of this program can be held responsible for any damage or loss of revenue that the use of this program may cause.

As this program is unsupported, the author is under no obligation to read or reply to any questions regarding the operation of this program.

If you do not agree with these terms, you may not use this software.

Code License : MIT.
