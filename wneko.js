//可选配置
var wneko_scale = 1.0; //缩放倍数
var wneko_runspeed = 200; //动画刷新速度
var wneko_runspeedf = 10; //每次刷新移动距离
var wneko_sensitivityp = 50; //警觉距离
var wneko_sensitivityt = 2; //警觉时长
var wneko_configdiglog = true; //允许打开设置窗口
//内部变量
var wneko_size = 32; //尺寸
var wneko_sizex = wneko_size; //乘缩放率后尺寸
var wneko_delivery = 10000; //超过此距离直接传送
var wneko_runtimer = null; //移动定时器
var wneko_wneko = $("#wneko"); //主框架div
var wneko_mousexy = [-1000,-1000]; //当前鼠标位置
var wneko_sensitivityi = -1; //警觉时长计数器
var wneko_attr = {"nekomode":"awake","nekostop":1,"awake":0,"nekoani":0}; //初始DOM标签
//动画序列
const wneko_ani = {
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
const wneko_sani = ["downclaw","leftclaw","rightclaw","upclaw","stopani"];
//移动定时器触发
function wneko_runtimerdo() {
    $(".neko").each(function(){
        wneko_direction($(this));
    });
}
//获取body边界尺寸
function wneko_bodypadding() {
    return [0,0,0,0]; //(此函数弃用)
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
    let bodypadding = [ptop,pbottom,pleft,pright];
    return bodypadding;
}
//比对相对位置(核心运动方法)
function wneko_direction(tneko) {
    //如果是初始值坐标（-1000）则不作任何处理
    if (wneko_mousexy[0] == -1000 && wneko_mousexy[1] == -1000) {
        return;
    }
    //处于警觉状态，警觉时长计数器生效
    if (wneko_sensitivityi > -1) {
        wneko_sensitivityi++;
        if (wneko_sensitivityi > wneko_sensitivityt) {
            wneko_sensitivityi = -1;
        }
        return;
    }
    //初始化位置信息 tneko：当前猫
    let ny = parseInt(tneko.css("top")); //当前Y
    let nx = parseInt(tneko.css("left")); //当前X
    var tx = wneko_mousexy[0]; //鼠标X（目标X）
    var ty = wneko_mousexy[1]; //鼠标Y（目标Y）
    var ax = 0; //差距X
    var ay = 0; //差距Y
    var dirstr = ""; //使用的新移动动画序列名称
    var isedit = false; //如果否，使用静态序列名称作为当前动画
    var mout = wneko_runspeedf; //每帧移动距离
    let sw = document.documentElement.clientWidth; //视窗宽度
    let sh = document.documentElement.clientHeight; //视窗高度
    // let pw = document.documentElement.scrollWidth; //页面宽度
    // let ph = document.documentElement.scrollHeight; //页面高度
    var claw = "stopani"; //使用的新原地动画序列名称
    let bodyp = wneko_bodypadding(); //保留页边距 数组 0上 1下 2左 3右
    var tclasss = tneko.attr("class").split(" "); //数组 0当前动画序列
    let nekoanii = parseInt(tneko.attr("nekoani")); //当前动画序列的第几张
    var nnekomode = tneko.attr("nekomode"); //目前记录的动画序列名称
    let nekostop = parseInt(tneko.attr("nekostop")); //是否静止 0否 1是
    var movenow = false; //需要传送式移动
    let awake = tneko.attr("awake");
    wneko_sizex = wneko_size * wneko_scale; //猫尺寸 = 猫的尺寸 × 猫的缩放倍数
    tx -= wneko_sizex; //移动到鼠标指针左上方
    ty -= wneko_sizex; //移动到鼠标指针左上方
    if (nekostop == 1) { //如果标记为停止
        claw = nnekomode; //新停止动画序列名称 = 当前动画序列名称
    } else {
        //如果 鼠标Y + 猫尺寸 + 每帧移动距离 >= 视窗高度 - 视窗下边距
        if (ty + wneko_sizex + wneko_runspeedf >= sh - bodyp[1]) {
            ty = sh - wneko_sizex; //鼠标（目标）Y = 视窗高度 - 猫尺寸
            claw = "downclaw"; //静态序列名称 = 向下抓挠
        }
        //如果 鼠标Y <= 视窗上边距 + 实际尺寸
        else if (ty <= bodyp[0] + wneko_sizex) {
            ty = 0; //鼠标（目标）Y = 0
            claw = "upclaw"; //静态序列名称 = 向上抓挠
        }
        //如果 鼠标X + 猫尺寸 + 每帧移动距离 >= 视窗宽度 - 视窗右边距
        if (tx + wneko_sizex + wneko_runspeedf >= sw - bodyp[3]) {
            tx = sw - wneko_sizex; //鼠标（目标）X = 视窗宽度 - 猫尺寸
            claw = "rightclaw"; //静态序列名称 = 向右抓挠
        }
        //如果 鼠标X <= 视窗左边距 + 实际尺寸
        else if (tx <= bodyp[2] + wneko_sizex) {
            tx = 0; //鼠标（目标）X = 0
            claw = "leftclaw"; //静态序列名称 = 向左抓挠
        }
    }
    let cy = ny - ty; //差值 = 当前Y - 鼠标（目标）Y
    let cx = nx - tx; //差值 = 当前Y - 鼠标（目标）X
    let nty = Math.abs(cy); //差值Y = 差值的绝对值
    let ntx = Math.abs(cx); //差值X = 差值的绝对值
    var ntxy = false; //猫距鼠标的距离是否达到敏感距离
    //点到点之间的直线距离 √(cx)² + (cy)² 的绝对值
    let p2p = Math.abs(Math.sqrt(Math.pow((cy),2)+Math.pow((cx),2)));
    //如果 直线距离 >= 惊醒距离
    if (p2p >= wneko_sensitivityp) {
        ntxy = true; //达到敏感距离
    }
    //如果 差值Y > 超过此距离直接传送
    if (nty > wneko_delivery) {
        movenow = true; //标记为直接传送
    //如果 差值Y > 每帧移动距离 && 目标Y - 每帧移动距离 < 视窗高度 - 视窗下边距 && 目标Y + 每帧移动距离 > 视窗上边距 && 处于运动
    } else if (nty > mout && (ty - wneko_runspeedf) < (sh - bodyp[1]) && (ty + wneko_runspeedf) > bodyp[0] && nekostop == 0) {
        if (ny < ty) { //如果 当前Y < 目标Y
            dirstr += "down"; //动画序列名称 = 向下跑动
            ay += wneko_runspeedf; //差距Y += 每帧移动距离
        } else {
            dirstr += "up"; //动画序列名称 = 向上跑动
            ay -= wneko_runspeedf; //差距Y -= 每帧移动距离
        }
        isedit = true; //使用移动序列设为当前序列
    }
    //如果 差值X > 超过此距离直接传送
    if (ntx > wneko_delivery) {
        movenow = true; //标记为直接传送
    //如果 差值X > 每帧移动距离 && 目标X - 每帧移动距离 < 视窗宽度 - 视窗右边距 && 目标X + 每帧移动距离 > 视窗左边距 && 处于运动
    } else if (ntx > mout && (tx - wneko_runspeedf) < (sw - bodyp[3]) && (tx + wneko_runspeedf) > bodyp[2] && nekostop == 0) {
        if (nx < tx) { //如果 当前X < 目标X
            dirstr += "right"; //动画序列名称 = 向右跑动
            ax += wneko_runspeedf; //差距X += 每帧移动距离
        } else {
            dirstr += "left"; //动画序列名称 = 向左跑动
            ax -= wneko_runspeedf; //差距X -= 每帧移动距离
        }
        isedit = true; //使用移动序列设为当前序列
    }
    if (!isedit) {
        dirstr = claw; //使用原地动画序列设为当前序列
        tneko.attr("nekostop",1); //标记此猫为静止状态
        tneko.attr("awake",0); //标记此猫为非警觉状态
    }
    //如果 新移动动画序列名称没有被定义
    if (dirstr != "") {
        //目前动画序列 = 动画序列表[动画序列名][动画序列中的第几张]
        tclasss[0] = wneko_ani[dirstr][nekoanii];
        nekoanii++; //增加一张
        let nanileng = wneko_ani[dirstr].length; //当前动画序列里面有几张
        if (nekoanii >= nanileng) { //如果 当前在动画序列中的位置 >= 当前动画序列里面的张数
            //如果是抓挠动作
            if (dirstr == "upclaw" || dirstr == "downclaw" || dirstr == "leftclaw" || dirstr == "rightclaw") {
                dirstr = "stopani"; //转换为原地静止动画序列
                tneko.attr("awake",0); //标记此猫为非警觉状态
            }
            //如果是原地静止动作
            else if (dirstr == "stopani") {
                dirstr = "sleep"; //转换为睡眠动画序列
                tneko.attr("awake",0); //标记此猫为非警觉状态
            }
            nekoanii = 0; //移到动画序列中的第一张
        }
        tneko.attr("nekomode",dirstr); //标记此猫动作状态为 dirstr
        if (movenow) { //如果需要进行瞬移则立即进行移动
            tneko.css({"top":(ty+"px"),"left":(tx+"px"),"width":wneko_sizex,"height":wneko_sizex});
        }
        //如果没有定义 目前动画序列
        if (ntxy && nekostop == 1) {
            tclasss[0] = "Awake"; //转换为警觉动画序列
            nekoanii = 0;  //移到动画序列中的第一张
            wneko_sensitivityi = 0; //初始化警觉动画序列计数器
            tneko.attr("nekostop",0); //标记此猫为移动状态
            tneko.attr("awake",1); //标记此猫为警觉状态
        }
        if (awake == 1) { //如果已定义 目前动画序列
            if (!movenow) { //如果不需要进行瞬移
                let ttx = (nx+ax)+"px"; //最终X坐标 = 当前X + 差距X
                let tty = (ny+ay)+"px"; //最终Y坐标 = 当前Y + 差距Y
                wneko_setnicocss(ttx,tty,tneko); //应用到CSS显示
            }
        }
        let newclass = tclasss.join(" "); //创建新的 Class 类（控制动画图片）
        //应用当前图片：Class:当前图片 nekoani:序列中第几张
        tneko.attr({"class":newclass,"nekoani":nekoanii});
    }
}
//判断是否为静态状态 (此函数弃用)
function wneko_islocani(nnekomode) {
    //当前动画序列名称是否包含在了 wneko_sani 数组中
    return $.inArray(nnekomode, wneko_sani) >= 0 ? true : false;
}
//获得初始坐标
function wneko_centerxy() {
    let csize = wneko_sizex * 0.5; //自身一半尺寸
    //屏幕一半尺寸 - 自身一半尺寸
    let x = (document.documentElement.clientWidth * 0.5) - csize;
    let y = (document.documentElement.clientHeight * 0.5) - csize;
    return [x,y];
}
//创建和删除定时器
function wneko_setmaininterval(ison=true) {
    if (ison) {
        wneko_anitimer = setInterval("wneko_runtimerdo()",wneko_runspeed);
    } else {
        clearInterval(wneko_anitimer);
    }
}
//重新创建定时器(重置)
function wneko_resetmaininterval() {
    wneko_setmaininterval(false);
    let centerxy = wneko_centerxy();
    let nekos = $(".neko");
    wneko_setnicocss(centerxy[0],centerxy[1]);
    nekos.attr(wneko_attr);
    wneko_mousexy = [-1000,-1000];
    nekos.css("transform",("scale("+wneko_scale+")"));
    wneko_setmaininterval(true);
}
//终止&释放
function wneko_exit() {
    $(document).unbind('mousemove');
    wneko_setmaininterval(false);
    $(".wneko").remove();
}
//应用坐标到CSS样式，不指定neko为所有neko
function wneko_setnicocss(x,y,neko=null) {
    let ncss = {"top":y,"left":x};
    if (neko == null) {
        $(".neko").css(ncss);
    } else {
        neko.css(ncss);
    }
}
//初始化位置
function wneko_initxy() {
    let centerxy = wneko_centerxy();
    wneko_setnicocss(centerxy[0],centerxy[1]);
    let nekos = $(".neko");
    nekos.attr(wneko_attr);
    nekos.css("transform",("scale("+wneko_scale+")"));
    $(window).mousemove(function(e) {
        let x = e.pageX;
        let y = e.pageY;
        wneko_mousexy = [x,y];
    });
}
//main
wneko_initxy();
wneko_setmaininterval();