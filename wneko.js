//可选配置
var wcat_scale = 1.0; //缩放倍数
var wcat_runspeed = 200; //动画刷新速度
var wcat_runspeedf = 10; //每次刷新移动距离
var wcat_sensitivity = 800; //警觉距离
var wcat_sensitivityt = 2; //警觉时长
//内部变量
var wcat_size = 32; //尺寸
var wcat_sizex = wcat_size; //乘缩放率后尺寸
var wcat_delivery = 10000; //超过此距离直接传送
var wcat_runtimer = null; //移动定时器
var wcat_wneko = $("#wneko"); //主框架div
var wcat_mousexy = [-1000,-1000]; //当前鼠标位置
var wcat_sensitivityi = -1; //警觉时长计数器
//动画序列
const wcat_ani = {
    "awake":["Awake","Awake","Awake"], //警觉!
    "down":["Down1","down2"], //↓向下奔跑
    "downclaw":["yawn2","yawn2","yawn2","yawn2","yawn2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2","downclaw1","downclaw2"], //↓向下抓挠
    "downleft":["downleft1","Downleft2"], //↙向左下奔跑
    "downright":["Downright1","downright2"], //↘向右下奔跑
    "left":["left1","left2"], //←向左奔跑
    "leftclaw":["yawn2","yawn2","yawn2","yawn2","yawn2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2","leftclaw1","leftclaw2"], //←向左抓挠
    "right":["Right1","right2"], //→向右奔跑
    "rightclaw":["yawn2","yawn2","yawn2","yawn2","yawn2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2","rightclaw1","Rightclaw2"], //→向右抓挠
    "up":["Up1","Up2"], //↑向上奔跑
    "upclaw":["yawn2","yawn2","yawn2","yawn2","yawn2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2","upclaw1","upclaw2"], //↑向上抓挠
    "upleft":["Upleft1","Upleft2"], //↖向左上奔跑
    "upright":["Upright1","Upright2"], //↗向右上奔跑
    "stopani":["yawn2","yawn2","yawn2","yawn2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","scratch1","scratch2","scratch1","scratch2","scratch1","scratch2","scratch1","scratch2","scratch1","scratch2","yawn3","yawn3","yawn3"], //原地动画序列
    "sleep":["sleep1","sleep1","sleep1","sleep1","sleep1","sleep2","sleep2","sleep2","sleep2","sleep2"] //睡觉z
};
//位置静止动画列表
const wcat_sani = ["downclaw","leftclaw","rightclaw","upclaw","stopani"];
//移动定时器触发
function wcat_runtimerdo() {
    $(".neko").each(function(){
        wcat_direction($(this));
    });
}
//获取body边界尺寸
function wcat_bodypadding() {
    let tbody = $("body");
    let paddingleft = parseInt(tbody.css("padding-left"));
    let paddingright = parseInt(tbody.css("padding-right"));
    let paddingtop = parseInt(tbody.css("padding-top"));
    let paddingbottom = parseInt(tbody.css("padding-bottom"));
    let marginleft = parseInt(tbody.css("margin-left"));
    let marginright = parseInt(tbody.css("margin-right"));
    let margintop = parseInt(tbody.css("margin-top"));
    let marginbottom = parseInt(tbody.css("margin-bottom"));
    let pleft = paddingleft + marginleft;
    let pright = paddingright + marginright;
    let ptop = paddingtop + margintop;
    let pbottom = paddingbottom + marginbottom;
    return [ptop,pbottom,pleft,pright];
}
//比对相对位置
function wcat_direction(tcat) {
    if (wcat_mousexy[0] == -1000 && wcat_mousexy[1] == -1000) {
        return;
    }
    if (wcat_sensitivityi > -1) {
        wcat_sensitivityi++;
        if (wcat_sensitivityi > wcat_sensitivityt) {
            wcat_sensitivityi = -1;
        }
        return;
    }
    let ny = parseInt(tcat.css("top"));
    let nx = parseInt(tcat.css("left"));
    var tx = wcat_mousexy[0];
    var ty = wcat_mousexy[1];
    var ax = 0;
    var ay = 0;
    var dirstr = "";
    var isedit = false;
    var mout = wcat_runspeedf;
    let sw = document.documentElement.clientWidth;
    let sh = document.documentElement.clientHeight;
    let pw = document.documentElement.scrollWidth;
    let ph = document.documentElement.scrollHeight;
    var claw = "stopani";
    let bodyp = wcat_bodypadding(); //0上 1下 2左 3右
    var tclasss = tcat.attr("class").split(" ");
    let catanii = parseInt(tcat.attr("catani"));
    var ncatmode = tcat.attr("catmode");
    let catplay = parseInt(tcat.attr("catplay"));
    let catstop = parseInt(tcat.attr("catstop"));
    var movenow = false;
    wcat_sizex = wcat_size * wcat_scale;
    tx -= wcat_sizex;
    ty -= wcat_sizex;
    // pw -= wcat_sizex;
    // ph -= wcat_sizex;
    // sw -= wcat_sizex;
    // sh -= wcat_sizex;
    if (catstop == 1) {
        claw = ncatmode;
    } else {
        if (ty + wcat_sizex + wcat_runspeedf >= sh - bodyp[1]) {
            ty = sh - wcat_sizex;
            claw = "downclaw";
        } else if (ty <= bodyp[0] + wcat_sizex) {
            ty = 0;
            claw = "upclaw";
        }
        if (tx + wcat_sizex + wcat_runspeedf >= sw - bodyp[3]) {
            tx = sw - wcat_sizex;
            claw = "rightclaw";
        } else if (tx <= bodyp[2] + wcat_sizex) {
            tx = 0;
            claw = "leftclaw";
        }
    }
    let nty = Math.abs(ny - ty);
    let ntx = Math.abs(nx - tx);
    if (nty > wcat_delivery) {
        movenow = true;
    } else if (nty > mout && (ty - wcat_runspeedf) < (sh - bodyp[1]) && (ty + wcat_runspeedf) > bodyp[0]) {
        if (ny < ty && ty < sh) {
            dirstr += "down";
            ay += wcat_runspeedf;
        } else {
            dirstr += "up";
            ay -= wcat_runspeedf;
        }
        isedit = true;
    }
    if (ntx > wcat_delivery) {
        movenow = true;
    } else if (ntx > mout && (tx - wcat_runspeedf) < (sw - bodyp[3]) && (tx + wcat_runspeedf) > bodyp[2]) {
        if (nx < tx) {
            dirstr += "right";
            ax += wcat_runspeedf;
        } else {
            dirstr += "left";
            ax -= wcat_runspeedf;
        }
        isedit = true;
    }
    if (!isedit) dirstr = claw;
    if (dirstr != "") {
        tclasss[0] = wcat_ani[dirstr][catanii];
        catanii++;
        let nanileng = wcat_ani[dirstr].length;
        if (catanii >= nanileng) {
            if (dirstr == "upclaw" || dirstr == "downclaw" || dirstr == "leftclaw" || dirstr == "rightclaw") {
                dirstr = "stopani";
                catplayto2 = true;
                tcat.attr("catstop",1);
            } else if (dirstr == "stopani") {
                dirstr = "sleep";
                catplayto2 = true;
                tcat.attr("catstop",1);
            }
            catanii = 0;
        }
        tcat.attr("catmode",dirstr);
        if (movenow) {
            tcat.css({"top":(ty+"px"),"left":(tx+"px"),"width":wcat_sizex,"height":wcat_sizex});
        }
        if (tclasss[0] === undefined) {
            tclasss[0] = "Awake";
            catanii = 0;
            wcat_sensitivityi = 0;
            tcat.attr("catstop",0);
        } else {
            if (!movenow) {
                let ttx = (nx+ax)+"px";
                let tty = (ny+ay)+"px";
                wcat_setnicocss(ttx,tty,tcat);
            }
        }
        let newclass = tclasss.join(" ");
        tcat.attr({"class":newclass,"catani":catanii});
    }
}
//判断是否为静态状态
function wcat_islocani(ncatmode) {
    return $.inArray(ncatmode, wcat_sani) >= 0 ? true : false;
}
//获得初始坐标
function wcat_centerxy() {
    let csize = wcat_sizex * 0.5;
    let x = (document.documentElement.clientWidth * 0.5) - csize;
    let y = (document.documentElement.clientHeight * 0.5) - csize;
    return [x,y];
}
//创建和删除定时器
function wcat_setmaininterval(ison=true) {
    if (ison) {
        wcat_anitimer = setInterval("wcat_runtimerdo()",wcat_runspeed);
    } else {
        clearInterval(wcat_anitimer);
    }
}
//重新创建定时器(重置)
function wcat_resetmaininterval() {
    wcat_setmaininterval(false);
    let centerxy = wcat_centerxy();
    let nekos = $(".neko");
    wcat_setnicocss(centerxy[1],centerxy[0]);
    nekos.attr({"catmode":"awake","catplay":0,"catstop":0,"catani":0});
    wcat_mousexy = [-1000,-1000];
    nekos.css("transform",("scale("+wcat_scale+")"));
    wcat_setmaininterval(true);
}
//终止
function wcat_exit() {
    $(document).unbind('mousemove');
    wcat_setmaininterval(false);
    $(".wcat").remove();
}
function wcat_setnicocss(x,y,neko=null) {
    let ncss = {"top":y,"left":x};
    if (neko == null) {
        $(".neko").css(ncss);
    } else {
        neko.css(ncss);
    }
}
//初始化位置
function wcat_initxy() {
    let centerxy = wcat_centerxy();
    wcat_setnicocss(centerxy[1],centerxy[0]);
    let nekos = $(".neko");
    nekos.attr({"catmode":"awake","catplay":0,"catstop":0,"catani":0});
    nekos.css("transform",("scale("+wcat_scale+")"));
    $(window).mousemove(function(e) {
        let x = e.pageX;
        let y = e.pageY;
        wcat_mousexy = [x,y];
    });
}
//main
wcat_initxy();
wcat_setmaininterval();