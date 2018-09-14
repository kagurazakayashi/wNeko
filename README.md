[English](#wNeko) | [简体中文](#HTML5-版-Neko)

# wNeko

## Neko for HTML5

![Neko](ScreenShot/neko.gif?raw=true) [ネコネコネ ~](https://www.yoooooooooo.com/yashi/demo/wneko/)

Neko is a little cat who sits on the webpage and chases the mouse pointer / touch around.

When you run the demo webpage `index.html`, a webpage is opened with Neko inside it.

- As you move the mouse, Neko will follow.
- If the mouse is inside the webpage and it is not moving, Neko will go to sleep.
- When the mouse is moved Neko will awake and will chase the mouse.
- If the mouse is outside the window, Neko will scratch the webpage window boundary and goes to sleep.

![Neko will scratch the webpage window boundary](ScreenShot/b.jpg?raw=true)

Written by [`Kagurazaka Yashi`](https://github.com/kagurazakayashi). Taking ingredients from Windows Version : The original program (X Window) was written by `Masayuki Koba` and later modified by `Tatsuya Kato`.

![Neko](texture/neko2/t_neko2.gif?raw=true)

# Running wNeko

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

- Texture: `//github.com/kagurazakayashi/wNeko/blob/master/texture/neko2/t_neko2.gif?raw=true`
- Jquery: `//code.jquery.com/jquery-1.11.0.min.js`
  - Edit: `tampermonkey/wneko.tmp.js`
    - Line 20: `url_nico`
    - Line 21: `url_nicocur`

# Configuring wNeko

A configuration program has been supplied with wNeko. Double click on the neko. From here you can set all of the options for wNeko.

![Double click on the neko](ScreenShot/o.jpg?raw=true)

# Change Texture

`sh change.sh <texturename>`

`<texturename>`: `neko2`(default)/`neko`/`bsd`/`dog`/`tora`/`sakura`/`tomoyo`

texturename copyright: `texture/<texturename>/COPYRIGHT`

Optional step: [Update WordPress Plugin](#wordpress-plugin)

♥ [Texture List](https://github.com/kagurazakayashi/wNeko/tree/master/texture) ♥

# Known Problems

Having too many Nekos - especially if they're high speed will result in a reduction of system resources. This is unavoidable.

# License

TERMS OF USE

This program is totally unsupported FREEWARE and you use it at your own risk. Neither the author nor anyone involved in the distribution of this program can be held responsible for any damage or loss of revenue that the use of this program may cause.

As this program is unsupported, the author is under no obligation to read or reply to any questions regarding the operation of this program.

If you do not agree with these terms, you may not use this software.

Code License : MIT.

# wNeko

## HTML5 版 Neko

![Neko](ScreenShot/neko.gif?raw=true) [ネコネコネ ~](https://www.yoooooooooo.com/yashi/demo/wneko/)

Neko 是一只小猫（也可以通过 `change.sh` 替换为其他皮肤），它可以显示在你的网页中。

你只需要打开示例网页 `index.html`, 你就可以看到它。

- 当你移动鼠标指针或者触摸屏幕的时候，它就会追逐你的鼠标指针或触摸位置。
- 当鼠标在网页中但是没有移动时，它会在指针或触摸点旁边睡觉。
- 直到鼠标再次移动或屏幕再次被触摸，便会惊醒过来并继续追逐。
- 如果鼠标移动到了网页以外，它会在网页窗口边缘附近做抓挠动作并进入睡眠。

![如果鼠标移动到了网页以外](ScreenShot/b.jpg?raw=true)

程序由 [`神楽坂雅詩`](https://github.com/kagurazakayashi) 制作。参考自 Windows 中的版本 : 最开始运行在 X Window 中的程序 `oneko` 由 `Masayuki Koba` 制作，后来由 `Tatsuya Kato` 移植到了 Windows 3x - 9x 中。

![Neko](texture/neko2/t_neko2.gif?raw=true)

# 启动 wNeko

## 在你的网页中

1. 安装依赖 `npm install --save jquery`
2. 打开示例网页 `index.html`

## WordPress 插件

1. 安装依赖 `npm install --save jquery`
2. 安装依赖 `npm install --save google-closure-compiler`
3. 生成插件 `sh g_wpplugin.sh` 或 `sh g_wpplugin-addjq.sh`(嵌入 jquery)
4. 上传 `wpNeko` 文件夹到 WordPress 所在文件夹的 `/wp-content/plugins/` 文件夹中。
5. 在 WordPress 后台打开插件菜单并启用 `wpNeko` 。

## 油猴 (Tampermonkey®) 脚本

添加到油猴插件:

1. 生成脚本 `sh g_tampermonkey.sh`
2. 点击油猴插件图标，选 `添加新脚本...`
3. 拷贝 `tampermonkey/wneko.js` 中的内容到打开的编辑器中
4. 编辑器中的文件菜单 - 保存

![导入到其他网页中](ScreenShot/t.jpg?raw=true)

编辑油猴插件中的脚本:

1. 生成脚本 `sh g_tampermonkey.sh`
2. 点击油猴插件图标，选 `管理面板` - `已安装脚本`
3. 修改 `wNeko` 脚本
4. 拷贝 `tampermonkey/wneko.js` 中的内容到打开的编辑器中

修改从其他网站中载入的资源网址:

- 模型: `//github.com/kagurazakayashi/wNeko/blob/master/texture/neko2/t_neko2.gif?raw=true`
- jquery: `//code.jquery.com/jquery-1.11.0.min.js`
  - 编辑以上设置: 在文件 `tampermonkey/wneko.tmp.js` 中
    - 第 20 行: `url_nico` 变量
    - 第 21 行: `url_nicocur` 变量

# 设置 wNeko

双击它可以打开一个设置窗口，进行常用的设置。（目前仅临时生效，永久生效请直接修改 `wneko.js` 中的变量）

![设置窗口](ScreenShot/o.jpg?raw=true)

# 更换皮肤

`sh change.sh <皮肤名称>`

`<皮肤名称>`: `neko2`(默认)/`neko`/`bsd`/`dog`/`tora`/`sakura`/`tomoyo`

查看皮肤版权: `texture/<皮肤名称>/COPYRIGHT`

之后可以通过执行 WordPress 插件生成步骤更新插件中的皮肤。

♥ [查看皮肤列表和预览](https://github.com/kagurazakayashi/wNeko/tree/master/texture) ♥

# 已知问题

刷新速度设置过快会导致别人访问网页时发生浏览器大量处理器占用，这是无法避免的。

# 许可协议

这个程序是完全免费和开源的软件。作者不提供任何支持，作者和任何参与本项目的人都不会对使用本项目可能造成的任何损害或收入损失负责，你需要自行承担风险。

代码部分使用 MIT 协议授权。

皮肤由不同的作者制作，查看皮肤版权: `texture/<皮肤名称>/COPYRIGHT` 。

如果你不同意这些条款，请不要使用。
