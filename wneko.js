//可选配置
var wcat_size = 32; //尺寸
var wcat_runspeed = 200; //移动速度
var wcat_runspeedx = 10; //移动倍速
var wcat_sensitivity = 50; //警觉距离
//内部变量
var wcat_runtimer = null; //移动定时器
var wcat_wneko = $("#wneko"); //主框架div
var wcat_mousexy = [0,0]; //当前鼠标位置
//动画序列
const wcat_ani = {
    "awake":["Awake","Awake","Awake"], //警觉!
    "down":["Down1","down2"], //↓向下奔跑
    "downclaw":["downclaw1","downclaw2"], //↓向下抓挠
    "downleft":["downleft1","Downleft2"], //↙向左下奔跑
    "downright":["Downright1","downright2"], //↘向右下奔跑
    "left":["left1","left2"], //←向左奔跑
    "leftclaw":["leftclaw1","leftclaw2"], //←向左抓挠
    "right":["Right1","right2"], //→向右奔跑
    "rightclaw":["rightclaw1","Rightclaw2"], //→向右抓挠
    "up":["Up1","Up2"], //↑向上奔跑
    "upclaw":["upclaw1","upclaw2"], //↑向上抓挠
    "upleft":["Upleft1","Upleft2"], //↖向左上奔跑
    "upright":["Upright1","Upright2"], //↗向右上奔跑
    "stopani":["yawn2","yawn2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","wash2","yawn2","scratch1","scratch2","scratch1","scratch2","scratch1","scratch2","scratch1","scratch2","scratch1","scratch2","yawn3","yawn3","yawn3"], //原地动画序列
    "sleep":["sleep1","sleep2"] //睡觉z
};
//移动定时器触发
function wcat_runtimerdo() {
    $(".neko").each(function(){
        wcat_direction($(this));
        // wcat_anido($(this));
    });
}
//获取body边界尺寸
function wcat_bodypadding() {
    let tbody = $("body");
    let pp = 5;
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
    let ny = parseInt(tcat.css("top"));
    let nx = parseInt(tcat.css("left"));
    let tx = wcat_mousexy[0];
    let ty = wcat_mousexy[1];
    var ax = 0;
    var ay = 0;
    var dirstr = "";
    var isedit = false;
    var mout = wcat_runspeedx;
    let ww = document.documentElement.clientWidth;
    let wh = document.documentElement.clientHeight;
    var claw = "stopani";
    let bodyp = wcat_bodypadding(); //0上 1下 2左 3右
    var tclasss = tcat.attr("class").split(" ");
    let catanii = parseInt(tcat.attr("catani"));
    if (ty + wcat_size + wcat_runspeedx >= wh - bodyp[1]) {
        ty = wh - wcat_size - wcat_runspeedx - bodyp[1];
        claw = "downclaw";
    } else if (ty <= bodyp[0]) {
        ty = bodyp[0];
        claw = "upclaw";
    }
    if (tx + wcat_size + wcat_runspeedx >= ww - bodyp[3]) {
        tx = ww - wcat_size - wcat_runspeedx - bodyp[3];
        claw = "rightclaw";
    } else if (tx <= bodyp[2]) {
        tx = bodyp[2];
        claw = "leftclaw";
    }
    if (tcat.attr("catplay") == 0) {
        mout = wcat_sensitivity;
    }
    if (Math.abs(ny - ty) > mout) {
        if (ny < ty) {
            dirstr += "down";
            ay += wcat_runspeedx;
        } else {
            dirstr += "up";
            ay -= wcat_runspeedx;
        }
        isedit = true;
    }
    if (Math.abs(nx - tx) > mout) {
        if (nx < tx) {
            dirstr += "right";
            ax += wcat_runspeedx;
        } else {
            dirstr += "left";
            ax -= wcat_runspeedx;
        }
        isedit = true;
    }
    if (isedit) {
        tcat.css({"top":(ny+ay+"px"),"left":(nx+ax+"px"),"width":wcat_size,"height":wcat_size});
        tcat.attr("catplay",1);
    } else {
        dirstr = claw;
        tcat.attr("catplay",0);
    }
    if (dirstr != "") {
        tclasss[0] = wcat_ani[dirstr][catanii];
        catanii++;
        let nanileng = wcat_ani[dirstr].length;
        if (catanii >= nanileng) catanii = 0;
        tcat.attr("catmode",dirstr);
        let newclass = tclasss.join(" ");
        tcat.attr({"class":newclass,"catani":catanii});
    }
}
//获得初始坐标
function wcat_centerxy() {
    let csize = wcat_size * 0.5;
    let x = (document.documentElement.clientWidth * 0.5) - csize;
    let y = (document.documentElement.clientHeight * 0.5) - csize;
    return [x,y];
}
//创建和删除定时器
function wcat_setmaininterval(ison=true) {
    if (ison) {
        wcat_anitimer = setInterval("wcat_runtimerdo()",wcat_runspeed);
    } else {
        clearInterval(maintimer);
    }
}
//重新创建定时器
function wcat_resetmaininterval() {
    wcat_setmaininterval(false);
    wcat_setmaininterval(true);
}
//初始化位置
function wcat_initxy() {
    let centerxy = wcat_centerxy();
    let nekos = $(".neko");
    nekos.css({"top":centerxy[0],"left":centerxy[1],"width":wcat_size,"height":wcat_size});
    nekos.attr({"catmode":"awake","catplay":0,"catani":0});
    $(window).mousemove(function(e) {
        let x = e.pageX;
        let y = e.pageY;
        wcat_mousexy = [x,y];
    });
}
//main
wcat_initxy();
wcat_setmaininterval();