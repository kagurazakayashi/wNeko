//可选配置
var wcat_size = 32; //尺寸
var wcat_anispeed = 1000; //动作速度
var wcat_runspeed = 1000; //移动速度
var wcat_sensitivity = 100; //警觉距离
//内部变量
var wcat_anitimer = null; //动作定时器
var wcat_runtimer = null; //移动定时器
//动画序列
const wcat_ani = {
    "awake":["Awake"], //警觉!
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

//动作定时器触发
function wcat_anitimerdo() {
}
//移动定时器触发
function wcat_runtimerdo() {
}
//创建和删除定时器
function setmaininterval(ison=true) {
    if (ison) {
        wcat_anitimer = setInterval(wcat_anitimerdo(),wcat_runtimer);
        wcat_anitimer = setInterval(wcat_runtimerdo(),wcat_runspeed);
    } else {
        clearInterval(maintimer);
    }
}
//重新创建定时器
function resetmaininterval() {
    setmaininterval(false);
    setmaininterval(true);
}
//main
setmaininterval();