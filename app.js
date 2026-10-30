/* 南疆行程 · 喀什 → 塔县 → 库车 → 库尔勒（2026-10-31 ~ 11-08）
   底图：高德地图瓦片（GCJ-02）｜导航：高德 URI API */
'use strict';

const LS_KEY = 'nanjiang-plan-v1';
let state = null;
let ui = { place: 'all', tab: 'days', mapDay: null };
let PICK = false;          // 地图点选加景点模式
let RTOKEN = 0;            // 渲染版本号，防止旧地图残留

/* ============ 内置坐标库（GCJ-02，高德系） ============ */
const POI = {
  '喀什古城景区': [75.9900, 39.4700],
  '艾提尕尔清真寺': [75.9855, 39.4725],
  '高台民居': [75.9975, 39.4745],
  '香妃园': [75.9670, 39.4900],
  '东门大巴扎': [75.9950, 39.4785],
  '喀什火车站': [75.9800, 39.5080],
  '喀什机场': [75.9760, 39.5420],
  '白沙湖': [74.9330, 38.6330],
  '白沙湖北岸': [74.9450, 38.6650],
  '白沙湖南岸': [74.9280, 38.6050],
  '木吉火山口': [74.5022, 39.0019],
  '十八罗汉峰': [74.7200, 38.9800],
  '昆仑三雄': [75.0500, 38.4500],
  '雪柳树洞': [75.1329, 37.9874],
  '塔合曼湿地': [75.1690, 37.9280],
  '四国交界走廊': [75.0500, 37.3200],
  '瓦罕走廊': [75.0500, 37.3200],
  '红其拉甫国门': [75.4316, 36.8501],
  '班迪尔蓝湖': [75.4360, 37.8328],
  '帕米尔之眼': [75.3162, 37.8680],
  '塔莎古道': [75.5200, 37.6200],
  '慕士塔格冰川公园': [75.0550, 38.3100],
  '中巴友谊公路': [75.2800, 38.7800],
  '盖孜河谷': [75.2800, 38.7800],
  '奥依塔克红山谷': [75.2700, 38.8400],
  '红山': [75.2700, 38.8400],
  '喀拉库勒湖': [75.0570, 38.4300],
  '慕士塔格峰': [75.0494, 38.2756],
  '山风民宿（喀什古城景区店）': [75.9900, 39.4700],
  '星程库车天山中路酒店': [82.9550, 41.7200],
  '塔什库尔干县城': [75.2303, 37.7764],
  '塔县': [75.2303, 37.7764],
  '石头城': [75.2130, 37.7830],
  '金草滩': [75.2080, 37.7860],
  '塔吉克族村落': [75.2400, 37.7700],
  '盘龙古道': [75.2833, 37.7167],
  '库车王府': [82.9557, 41.7118],
  '库车老城': [82.9480, 41.7160],
  '龟兹小巷': [82.9460, 41.7185],
  '龟兹博物馆': [82.9600, 41.7167],
  '龟兹魏晋遗址博物馆': [82.9850, 41.7280],
  '热斯坦老街': [82.9440, 41.7200],
  '再帕尔美食城': [82.9500, 41.7140],
  '库车火车站': [82.9330, 41.7090],
  '独库公路终点': [83.2000, 42.1500],
  '天山神秘大峡谷': [83.1400, 42.0300],
  '库车大峡谷': [83.1400, 42.0300],
  '烈焰泉': [83.0500, 41.9000],
  '红石林': [82.8000, 41.7800],
  '克孜尔千佛洞': [82.5000, 41.7833],
  '库尔勒站': [86.1560, 41.7300],
  '巴州博物馆': [86.1680, 41.7230],
  '南疆大巴扎': [86.1800, 41.7400],
  '梨城大巴扎': [86.1800, 41.7400],
  '杜鹃河': [86.1950, 41.7450],
  '库尔勒客运站': [86.1500, 41.7260],
  '库尔勒机场': [86.1500, 41.6800],
  '塔塔秘境': [86.7927, 40.8698],
  '塔塔秘境·罗布湖': [86.7927, 40.8698]
};

/* ============ 初始行程数据 ============ */
const SEED = {
  v: 1,
  trip: {
    title: '南疆 9 日 · 行程',
    sub: '喀什 → 塔县 → 库车 → 库尔勒',
    start: '2026-10-31',
    end: '2026-11-08'
  },
  settings: { amapKey: '' },
  places: ['喀什', '塔县', '库车', '库尔勒'],
  days: [
    {
      id: 'd1', date: '2026-10-31', no: 'D1', wd: '周六', place: '喀什', city: '喀什',
      title: '落地日 · 老城夜色', stay: '山风民宿（喀什古城景区店）· 2 晚', stayLL: '75.9900,39.4700',
      legs: [{ id: 'd1l1', mode: '✈️', text: '飞抵喀什', time: '16:00', note: '重庆 → 喀什' }],
      stops: [
        { id: 'd1s1', name: '落地喀什', time: '16:00', ll: '75.9760,39.5420', intro: '取行李、去酒店、放包', note: '', links: [], done: false },
        { id: 'd1s2', name: '就近吃第一顿', time: '傍晚', ll: '', intro: '抓饭、烤肉、缸子肉、酸奶，先把胃安顿好', note: '', links: [], done: false },
        { id: 'd1s3', name: '老城夜色散步', time: '晚上', ll: '75.9900,39.4700', intro: '认清酒店到老城主街的路，为第二天整天步行探路', note: '早点睡，第二天不要赶早', links: [], done: false }
      ],
      notes: ['先懂这一站：喀什是丝路南北两道在西端重新汇合的地方。它的价值不在「古迹有多老」，而在老城至今还是生活区——多留意手工业与食物：馕、土陶、木器、干果贸易。'],
    },
    {
      id: 'd2', date: '2026-11-01', no: 'D2', wd: '周日', place: '喀什', city: '喀什',
      title: '喀什市区整天 · 步行+打车', stay: '山风民宿（喀什古城景区店）', stayLL: '75.9900,39.4700',
      legs: [],
      stops: [
        { id: 'd2s1', name: '老城慢走', time: '上午', ll: '75.9900,39.4700', intro: '土黄色生土建筑、过街楼、巷口小店。重点不是打卡点，是居民还在里面生活的样子：修鞋、打馕、卖干果', note: '', links: [], done: false },
        { id: 'd2s2', name: '巴扎与吃', time: '中午', ll: '75.9950,39.4785', intro: '在老城一带解决午饭，顺路逛市集', note: '买干果先尝后买、少量多样，别第一天就背满一包', links: [], done: false },
        { id: 'd2s3', name: '茶馆坐一会', time: '下午', ll: '75.9855,39.4725', intro: '把后面塔县团的集合时间、边防证、行李要求跟团方确认完', note: '', links: [], done: false },
        { id: 'd2s4', name: '早收 · 打包塔县行李', time: '晚上', ll: '', intro: '保暖层、防晒、证件、充电宝放随身包；大件行李若团方允许可寄存在喀什酒店', note: '', links: [], done: false }
      ],
      notes: ['这一天留白，是给高原行程攒体力的。'],
    },
    {
      id: 'd3', date: '2026-11-02', no: 'D3', wd: '周一', place: '塔县', city: '塔县',
      title: '帕米尔团 D1 · 中巴公路+白沙湖+木吉火山', stay: '团安排 · 塔县（约 3100m）', stayLL: '75.2303,37.7764',
      legs: [{ id: 'd3l1', mode: '🚐', text: '三日团 · 第 1 天（约 450km）', time: '以团单为准', note: '单次乘车最长约 6.5 小时，具体看路况。出发前确认：边防证、包含项、餐食自理、行李限制' }],
      stops: [
        { id: 'd3s1', name: '中巴友谊公路（沿途）', time: '上午', ll: '75.2800,38.7800', intro: 'G314 喀喇昆仑公路，整条路本身就是景点：盖孜河谷的红层、雪山、冰川依次展开', note: '沿途有检查站，不能拍照录像，配合检查', links: [], done: false },
        { id: 'd3s2', name: '红山【途观】', time: '上午', ll: '75.2700,38.8400', intro: '奥依塔克一带的红色山体，帕米尔给的第一个颜色冲击，车上观景', note: '', links: [], done: false },
        { id: 'd3s3', name: '白沙湖北岸', time: '中午', ll: '74.9450,38.6650', intro: '银白色沙山蜿蜒十几公里卧在湖边，无风时湖面如镜倒映沙山', note: '', links: [], done: false },
        { id: 'd3s4', name: '木吉火山口（帕米尔之眼）', time: '下午', ll: '74.5022,39.0019', intro: '今天的重点。阿克陶县木吉乡，海拔约 3500m，新疆最高的火山群。十三个火山口积水成蓝、绿、黄、褐各色，像大地的调色盘', note: '门票约 40 元；需边防证；景区间车免费往返，木栈道近 2000 米；有积水的大火山口最出片', links: [], done: false },
        { id: 'd3s5', name: '十八罗汉峰【途观】', time: '下午', ll: '74.7200,38.9800', intro: '火山口远处的背景：十八座雪峰一字排开，主峰萨尔祖鲁克 6678 米。最佳观赏点就在去木吉的路上', note: '', links: [], done: false },
        { id: 'd3s6', name: '白沙湖南岸', time: '傍晚', ll: '74.9280,38.6050', intro: '换个角度看同一片湖，光线更斜，湖色随日光变化', note: '', links: [], done: false },
        { id: 'd3s7', name: '昆仑三雄【途观】', time: '傍晚', ll: '75.0500,38.4500', intro: '公格尔峰、公格尔九别峰、慕士塔格峰同框的路边观景点', note: '', links: [], done: false },
        { id: 'd3s8', name: '雪柳树洞', time: '傍晚', ll: '75.1329,37.9874', intro: '塔合曼乡公路两侧的柳树树冠交织成一道绿色隧道，开车穿过像进了时光隧道', note: '', links: [], done: false },
        { id: 'd3s9', name: '塔合曼湿地', time: '日落', ll: '75.1690,37.9280', intro: '观景台看九曲十八弯的湿地草原和背后的雪山群，收尾在最好的光里', note: '', links: [], done: false }
      ],
      notes: ['高反提醒：塔县约 3100 米，今天还去过木吉。晚上不跑跳、不洗太热的澡、不喝酒，头痛乏力先休息多喝水。', '团方在塔县的住宿标准通常偏低，防感冒建议不要洗澡；即便夏天这里气温也是个位数，保暖层别离身。'],
    },
    {
      id: 'd4', date: '2026-11-03', no: 'D4', wd: '周二', place: '塔县', city: '塔县',
      title: '帕米尔团 D2 · 国门+盘龙古道+蓝湖', stay: '团安排 · 塔县（约 3100m）', stayLL: '75.2303,37.7764',
      legs: [{ id: 'd4l1', mode: '🚐', text: '三日团 · 第 2 天', time: '以团单为准', note: '单次乘车最长约 6.5 小时。今天海拔最高到约 5000m，随身带好证件、保暖层和保温水' }],
      stops: [
        { id: 'd4s1', name: '四国交界走廊（瓦罕走廊）', time: '上午', ll: '75.0500,37.3200', intro: '瓦罕走廊东端入口，中、阿、塔、巴四国在这里相接。看的是地理概念本身——帕米尔为什么是「亚洲的屋脊」', note: '', links: [], done: false },
        { id: 'd4s2', name: '红其拉甫国门', time: '上午', ll: '75.4316,36.8501', intro: '海拔约 5100 米的世界最高国门，中巴之间唯一的陆路口岸。这里风力常年七八级，体感极冷', note: '海拔 5000+，下车慢走别跑；边防证必须随身；军事禁区设施不要拍', links: [], done: false },
        { id: 'd4s3', name: '盘龙古道', time: '下午', ll: '75.2833,37.7167', intro: '从高处俯瞰那条蜿蜒盘旋到山下的公路，是这天最出片的一段', note: '山路弯多，晕车提前吃药；观景台风大', links: [], done: false },
        { id: 'd4s4', name: '班迪尔蓝湖全景', time: '下午', ll: '75.4360,37.8328', intro: '高原堰塞湖，晴天时湖水是一种不真实的蓝，盘龙下来正好收在这里', note: '', links: [], done: false },
        { id: 'd4s5', name: '帕米尔之眼', time: '傍晚', ll: '75.3162,37.8680', intro: '班迪尔乡的另一处打卡点，全年全天开放', note: '', links: [], done: false },
        { id: 'd4s6', name: '塔莎古道', time: '傍晚', ll: '75.5200,37.6200', intro: '通往莎车的老路，今晚只走开头一小段体验峡谷地貌，不会全程穿越', note: '', links: [], done: false }
      ],
      notes: ['今天到了约 5100 米。高原第二晚最容易出现反应，睡前别喝酒；若头晕、恶心、气喘明显，及时告诉领队。', '若当天回县城早，可自行去城侧的石头城遗址。'],
    },
    {
      id: 'd5', date: '2026-11-04', no: 'D5', wd: '周三', place: '塔县', city: '塔县→库车',
      title: '帕米尔团 D3 · 冰川+喀湖回喀什 · 夜卧去库车', stay: '夜卧（火车）', stayLL: '',
      legs: [
        { id: 'd5l1', mode: '🚐', text: '三日团 · 第 3 天', time: '以团单为准', note: '单次乘车最长约 6.5 小时。散团前确认返程到达喀什的时间，好倒推赶火车' },
        { id: 'd5l2', mode: '🚂', text: '夜卧 喀什 → 库车', time: '23:10 → 次日 07:06', note: '约 8 小时。洗漱用品、耳塞、眼罩放身边；证件手机随身' }
      ],
      stops: [
        { id: 'd5s1', name: '慕士塔格冰川公园', time: '上午', ll: '75.0550,38.3100', intro: '"冰山之父"慕士塔格（约 7500m）脚下的冰川，今天的重头戏', note: '冰川区海拔高、气温低，保暖层必带', links: [], done: false },
        { id: 'd5s2', name: '喀拉库勒湖', time: '中午', ll: '75.0570,38.4300', intro: '意为「黑湖」——阴天乌云密布时湖水会立刻转成墨色；晴天则是雪山倒映的样子', note: '', links: [], done: false },
        { id: 'd5s3', name: '回喀什市散团', time: '下午/傍晚', ll: '75.9900,39.4700', intro: '回城后取寄存行李、吃晚饭', note: '至少提前 1 小时到站', links: [], done: false },
        { id: 'd5s4', name: '喀什站 → 库车', time: '23:10', ll: '75.9800,39.5080', intro: '夜卧出发', note: '', links: [], done: false }
      ],
      notes: ['全程最紧的一环：团还要跑一天，当晚又要赶火车，白天别再透支体力。'],
    },
    {
      id: 'd6', date: '2026-11-05', no: 'D6', wd: '周四', place: '库车', city: '库车',
      title: '一天读懂龟兹 · 市区步行', stay: '星程库车天山中路酒店 · 2 晚', stayLL: '82.9550,41.7200',
      legs: [{ id: 'd6l1', mode: '🚂', text: '夜卧抵达库车', time: '07:06', note: '先回酒店放行李、吃早饭，必要时补一觉' }],
      stops: [
        { id: 'd6s1', name: '到库车站 · 寄存/入住 · 早餐', time: '07:06', ll: '82.9330,41.7090', intro: '不要一下车就冲 10:30 的仪式还硬扛全天', note: '', links: [], done: false },
        { id: 'd6s2', name: '库车王府 · 开府仪式', time: '10:30', ll: '82.9557,41.7118', intro: '先用仪式建立「王城感」', note: '', links: [], done: false },
        { id: 'd6s3', name: '老城城楼 · 开城仪式', time: '11:00', ll: '82.9480,41.7160', intro: '两场挨着排，先确认步行时间', note: '卡不准就优先保一场，不要两头跑', links: [], done: false },
        { id: 'd6s4', name: '龟兹小巷', time: '中午', ll: '82.9460,41.7185', intro: '尝 5 元大馕一带的小吃', note: '午饭从简，把胃口留给晚上', links: [], done: false },
        { id: 'd6s5', name: '龟兹博物馆', time: '下午', ll: '82.9600,41.7167', intro: '抓一条线：龟兹语、龟兹乐舞、汉唐经营西域的驻军与屯田', note: '', links: [], done: false },
        { id: 'd6s6', name: '龟兹魏晋遗址博物馆', time: '下午', ll: '82.9850,41.7280', intro: '把时间往前推——龟兹不是唐朝才出现的', note: '冬季逢半点有免费讲解员带领参观，进馆先问清下一场讲解的半点时间', links: [], done: false },
        { id: 'd6s7', name: '热斯坦老街', time: '傍晚', ll: '82.9440,41.7200', intro: '慢慢逛，看老城居民区和手工作坊', note: '', links: [], done: false },
        { id: 'd6s8', name: '再帕尔美食城 + 老城夜间表演', time: '晚上', ll: '82.9500,41.7140', intro: '把书本里的龟兹落回生活', note: '表演时间和地点当天向酒店或景区确认', links: [], done: false }
      ],
      notes: ['先懂这一站：龟兹是西域三十六国之一，也是鸠摩罗什的故乡。'],
    },
    {
      id: 'd7', date: '2026-11-06', no: 'D7', wd: '周五', place: '库车', city: '库车',
      title: '一日拼车 · 峡谷、红层与千佛洞', stay: '星程库车天山中路酒店', stayLL: '82.9550,41.7200',
      legs: [{ id: 'd7l1', mode: '🚙', text: '一日拼车', time: '09:00 → 19:00', note: '提前一晚确认：上车地点、师傅电话、是否含门票/区间车、千佛洞讲解是否另收费' }],
      stops: [
        { id: 'd7s1', name: '独库公路终点', time: '09:00', ll: '83.2000,42.1500', intro: '独库公路南端纪念点。11 月独库主体路段通常已封闭，这里看的是「终点」的仪式感', note: '不要期待走进封路路段', links: [], done: false },
        { id: 'd7s2', name: '天山神秘大峡谷', time: '上午', ll: '83.1400,42.0300', intro: '天山南麓红色砂岩被水切开的峡谷，跟着步道走，看岩层颜色随光线变化', note: '峡谷里信号弱，集合时间和地点先记清', links: [], done: false },
        { id: 'd7s3', name: '烈焰泉', time: '中午', ll: '83.0500,41.9000', intro: '行程中的短停点，以师傅现场讲解为准', note: '停留不会太久，不用为它单独做功课', links: [], done: false },
        { id: 'd7s4', name: '红石林', time: '下午', ll: '82.8000,41.7800', intro: '与大峡谷是同一套红层地貌的不同形态', note: '对照着看：一个看「切开」，一个看「风蚀」', links: [], done: false },
        { id: 'd7s5', name: '克孜尔千佛洞', time: '下午', ll: '82.5000,41.7833', intro: '当天的人文重点。按「形制 / 衣纹面孔 / 菱格本生故事画」三点看几个洞就够了', note: '洞内通常不许拍照，眼睛比相机重要', links: [], done: false }
      ],
      notes: ['峡谷步道多台阶和碎石，穿好走的鞋；11 月峡谷里阴冷，保暖层放随身包，不要全留在车上。', '19:00 回市区后逛吃即可，想买干果或纪念品放在今晚。'],
    },
    {
      id: 'd8', date: '2026-11-07', no: 'D8', wd: '周六', place: '库尔勒', city: '库尔勒',
      title: '火车转场 + 市区人文', stay: '维亚纳酒店（天鹅湖店）', stayLL: '86.1600,41.7220',
      legs: [{ id: 'd8l1', mode: '🚂', text: '库车 → 库尔勒', time: '07:12 → 10:01', note: '约 2.5 小时。前一晚拼车 19:00 才回，行李前一晚收好' }],
      stops: [
        { id: 'd8s1', name: '到库尔勒 · 酒店放行李', time: '上午', ll: '86.1560,41.7300', intro: '先落包再出门', note: '', links: [], done: false },
        { id: 'd8s2', name: '巴州博物馆', time: '白天', ll: '86.1680,41.7230', intro: '理解孔雀河、楼兰与罗布泊区域的入口，放在罗布人村寨之前看，顺序正好', note: '需在小程序提前预约；门口有讲解器，进馆先取再看', links: [], done: false },
        { id: 'd8s3', name: '南疆大巴扎（梨城大巴扎）', time: '傍晚', ll: '86.1800,41.7400', intro: '逛吃。库尔勒因香梨得名「梨城」，11 月若有晚熟梨或梨干可尝', note: '不要多买，后面还要长途转场', links: [], done: false },
        { id: 'd8s4', name: '杜鹃河散步', time: '傍晚', ll: '86.1950,41.7450', intro: '沿河走一段收尾', note: '', links: [], done: false }
      ],
      notes: ['先懂这一站：库尔勒守着孔雀河和塔里木盆地的东北门户，在行程里的作用是枢纽。'],
    },
    {
      id: 'd9', date: '2026-11-08', no: 'D9', wd: '周日', place: '库尔勒', city: '库尔勒',
      title: '塔塔秘境 · 罗布湖深处一日', stay: '维亚纳酒店（天鹅湖店）', stayLL: '86.1600,41.7220',
      legs: [{ id: 'd9l1', mode: '🚌', text: '客运站大巴往返', time: '10:00 → 17:00', note: '当天往返，中途会经过机场一带，约 17:00 回到市区' }],
      stops: [
        { id: 'd9s1', name: '塔塔秘境 · 罗布湖', time: '10:00-17:00', ll: '86.7927,40.8698', intro: '尉犁县 218 国道 887 公里处，距库尔勒约 120 公里。沙漠、胡杨与湖泊共存', note: '滑沙、越野、游船等项目按兴趣和当日价格自选', links: [], done: false },
        { id: 'd9s2', name: '回到市区 · 收尾', time: '傍晚', ll: '86.1600,41.7220', intro: '回酒店休整，晚上孔雀河边再走一段', note: '', links: [], done: false }
      ],
      notes: ['当晚仍需整理行李和次日安排：酒店地址、车次信息存成手机离线可看的截图，第二天早上不用临时找。']
    }
  ],
  tips: [
    { id: 't1', cat: '证件', text: '身份证随身带，不要放进行李箱深处——沿途安检、住宿、乘车高频使用。', done: false },
    { id: 't2', cat: '证件', text: '塔县方向通常需要边防证。出发前向团方确认：是团里统一办还是在喀什自行办理、需要提前几天、用什么材料。', done: false },
    { id: 't3', cat: '高原', text: '塔县约 3100 米：第一天不跑跳、不洗太热的澡、不喝酒；头痛乏力先休息多喝水。', done: false },
    { id: 't4', cat: '高原', text: '若头痛加重、恶心或明显气喘，不要硬撑拍照，及时告诉领队并下撤休息。', done: false },
    { id: 't5', cat: '预约', text: '巴州博物馆需在小程序提前预约（11.07 使用）。', done: false },
    { id: 't6', cat: '预约', text: '龟兹魏晋遗址博物馆冬季讲解、库车两场开城/开府仪式时间，出发前在官方渠道再核对一次。', done: false },
    { id: 't7', cat: '时间风险', text: '11.04 团回喀什的时间，提前一天就跟团方确认；夜卧 23:10，至少提前 1 小时到站。', done: false },
    { id: 't8', cat: '时间风险', text: '所有火车时刻以 12306 为准，攻略里的时刻只用于排顺序。', done: false },
    { id: 't9', cat: '节奏', text: '每晚只确认一件事（次日的集合点 / 车次 / 天气），其余时间放心玩。', done: false },
    { id: 't10', cat: '装备', text: '11 月南疆早晚温差大，塔县已是冬季体感：羽绒服、抓绒、保暖裤、防风外层、帽子手套都要有。', done: false },
    { id: 't11', cat: '装备', text: '高原和沙漠紫外线都强：防晒、墨镜、润唇膏、保湿，比夏天更需要。', done: false },
    { id: 't12', cat: '装备', text: '充电宝、相机电池多备：低温掉电快。', done: false },
    { id: 't13', cat: '离线', text: '离线先下好：新疆地图离线包、行程截图、酒店和团方联系电话。帕米尔和沙漠路段信号不稳定是常态。', done: false },
    { id: 't14', cat: '现金', text: '小额现金备一点：老城小店、乡村摊位、拼车分摊时更方便，大额用手机支付。', done: false }
  ]
};

const TIP_CAT = ['证件', '高原', '预约', '时间风险', '节奏', '装备', '离线', '现金', '其他'];
const TIP_ICON = { '证件': '🛂', '高原': '⛰️', '预约': '🎫', '时间风险': '⏱️', '节奏': '🚶', '装备': '🎒', '离线': '📶', '现金': '💰', '其他': '📌' };

/* ============ 工具 ============ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const uid = () => Math.random().toString(36).slice(2, 9);
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const V = (id) => { const e = $('#' + id); return e ? String(e.value).trim() : ''; };

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg; el.hidden = false;
  clearTimeout(el._t); el._t = setTimeout(() => { el.hidden = true; }, 2000);
}
const pad2 = (n) => String(n).padStart(2, '0');
const fmtDate = (ds) => { const p = String(ds || '').split('-'); return p.length === 3 ? `${+p[1]}.${pad2(+p[2])}` : ds; };
function wdOf(ds) {
  const d = new Date(ds + 'T00:00:00');
  return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()];
}
function dayDiff(a, b) { // b - a，单位天
  return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
}
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; };

/* WGS-84 → GCJ-02 */
const _PI = Math.PI, _A = 6378245.0, _EE = 0.00669342162296594323;
function _outOfChina(lng, lat) { return !(lng > 72.004 && lng < 137.8347 && lat > 0.8293 && lat < 55.8271); }
function _tLat(x, y) {
  let r = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  r += (20 * Math.sin(6 * x * _PI) + 20 * Math.sin(2 * x * _PI)) * 2 / 3;
  r += (20 * Math.sin(y * _PI) + 40 * Math.sin(y / 3 * _PI)) * 2 / 3;
  r += (160 * Math.sin(y / 12 * _PI) + 320 * Math.sin(y * _PI / 30)) * 2 / 3;
  return r;
}
function _tLng(x, y) {
  let r = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  r += (20 * Math.sin(6 * x * _PI) + 20 * Math.sin(2 * x * _PI)) * 2 / 3;
  r += (20 * Math.sin(x * _PI) + 40 * Math.sin(x / 3 * _PI)) * 2 / 3;
  r += (150 * Math.sin(x / 12 * _PI) + 300 * Math.sin(x / 30 * _PI)) * 2 / 3;
  return r;
}
function wgs2gcj(lng, lat) {
  if (_outOfChina(lng, lat)) return [lng, lat];
  let dLat = _tLat(lng - 105, lat - 35), dLng = _tLng(lng - 105, lat - 35);
  const rLat = lat / 180 * _PI;
  let m = Math.sin(rLat); m = 1 - _EE * m * m;
  const sm = Math.sqrt(m);
  dLat = (dLat * 180) / ((_A * (1 - _EE)) / (m * sm) * _PI);
  dLng = (dLng * 180) / (_A / sm * Math.cos(rLat) * _PI);
  return [lng + dLng, lat + dLat];
}

/* 坐标解析 / 格式化 */
function parseLL(s) {
  if (!s) return null;
  if (Array.isArray(s)) return [+s[0], +s[1]];
  const m = String(s).match(/(-?\d+\.?\d*)\s*[,，\s]\s*(-?\d+\.?\d*)/);
  if (!m) return null;
  const a = +m[1], b = +m[2];
  if (Math.abs(a) > 180 || Math.abs(b) > 90) return null;
  return [a, b];
}
const llStr = (ll) => (ll ? `${(+ll[0]).toFixed(5)},${(+ll[1]).toFixed(5)}` : '');

/* 高德链接 */
const amapMarker = (ll, name) => `https://uri.amap.com/marker?position=${ll[0]},${ll[1]}&name=${encodeURIComponent(name || '')}&src=njtrip&coordinate=gaode&callnative=1`;
const amapNav = (ll, name) => `https://uri.amap.com/navigation?to=${ll[0]},${ll[1]},${encodeURIComponent(name || '')}&mode=car&policy=1&src=njtrip&coordinate=gaode&callnative=1`;
const amapSearch = (q) => `https://uri.amap.com/search?keyword=${encodeURIComponent(q || '')}&src=njtrip&coordinate=gaode&callnative=1`;
const stopHref = (s) => { const ll = parseLL(s.ll); return ll ? amapNav(ll, s.name) : amapSearch(s.name); };

/* 从高德/其他地图分享链接里抠坐标 */
function parseMapUrl(s) {
  s = String(s || '').trim();
  if (!s) return null;
  const grab = (re, flip) => {
    const m = s.match(re);
    if (!m) return null;
    const a = parseFloat(m[1]), b = parseFloat(m[2]);
    if (!isFinite(a) || !isFinite(b)) return null;
    return flip ? [b, a] : [a, b];
  };
  const ll =
    grab(/[?&]position=(-?\d+\.?\d*)(?:%2C|,)[ ]*(-?\d+\.?\d*)/i) ||
    grab(/[?&](?:center|to|from|latlng|coordinate|location)=(-?\d+\.?\d*)(?:%2C|,)[ ]*(-?\d+\.?\d*)/i) ||
    grab(/[?&]lng=(-?\d+\.?\d*)[&]lat=(-?\d+\.?\d*)/i) ||
    grab(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/) ||
    grab(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/, true);
  let name = '';
  const nm = s.match(/[?&](?:name|keyword|query|title|poiname)=([^&#]*)/i);
  if (nm) { try { name = decodeURIComponent(nm[1].replace(/\+/g, ' ')); } catch (e) { name = nm[1]; } }
  return ll ? { ll, name } : null;
}

/* 地名 → 坐标 */
function lookupPOI(name) {
  const n = String(name || '').trim();
  if (!n) return null;
  if (POI[n]) return POI[n];
  const keys = Object.keys(POI).sort((a, b) => b.length - a.length);
  for (const k of keys) if (n.includes(k)) return POI[k];
  if (n.length >= 3) for (const k of keys) if (k.includes(n)) return POI[k];
  return null;
}
async function geocode(q) {
  q = String(q || '').trim();
  if (!q) return [];
  const out = [];
  const local = lookupPOI(q);
  if (local) out.push({ name: q, ll: local, addr: '内置坐标库' });

  const key = (state.settings && state.settings.amapKey) || '';
  if (key) {
    try {
      const u = `https://restapi.amap.com/v3/place/text?keywords=${encodeURIComponent(q)}&offset=6&key=${encodeURIComponent(key)}`;
      const r = await fetch(u);
      const j = await r.json();
      (j.pois || []).forEach((p) => {
        const ll = parseLL(p.location);
        if (ll) out.push({ name: p.name, ll, addr: [p.cityname, p.adname, p.address].filter(Boolean).join('') });
      });
    } catch (e) { /* 忽略，走下面的兜底 */ }
  }
  if (out.length) return out.slice(0, 8);

  try {
    const u = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&limit=6&countrycodes=cn&accept-language=zh-CN`;
    const r = await fetch(u, { headers: { 'Accept-Language': 'zh-CN' } });
    const j = await r.json();
    (j || []).forEach((p) => {
      const ll = wgs2gcj(+p.lon, +p.lat);
      out.push({ name: p.display_name.split(',')[0], ll, addr: p.display_name });
    });
  } catch (e) { }
  return out.slice(0, 8);
}

/* ============ 存储 ============ */
function save() {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) { }
}
function load() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) { state = JSON.parse(raw); normalize(); return; }
  } catch (e) { }
  resetState();
}
function resetState() { state = JSON.parse(JSON.stringify(SEED)); save(); }
function normalize() {
  state.trip = state.trip || SEED.trip;
  state.settings = state.settings || { amapKey: '' };
  state.places = state.places || [];
  state.tips = state.tips || [];
  state.days = (state.days || []).map((d) => {
    d.stops = (d.stops || []).map((s) => ({
      id: s.id || uid(), name: s.name || '未命名', time: s.time || '', intro: s.intro || '',
      note: s.note || '', ll: s.ll || '', links: s.links || [], done: !!s.done
    }));
    d.legs = d.legs || []; d.notes = d.notes || [];
    d.wd = d.wd || wdOf(d.date);
    return d;
  });
  // 保证 places 覆盖所有天的城市
  state.days.forEach((d) => { if (d.place && !state.places.includes(d.place)) state.places.push(d.place); });
}

/* ============ 地图 ============ */
let MAPS = [];
function regMap(scope, m) { MAPS.push({ scope, m }); return m; }
function killMaps(scope) {
  MAPS = MAPS.filter((x) => {
    if (!scope || x.scope === scope) { try { x.m.remove(); } catch (e) { } return false; }
    return true;
  });
}
const AMAP_TILE = 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}';
function addAmapTiles(map) {
  L.tileLayer(AMAP_TILE, {
    subdomains: ['1', '2', '3', '4'], minZoom: 3, maxZoom: 18,
    attribution: '© 高德地图'
  }).addTo(map);
}
function pinIcon(n, kind) {
  const cls = kind === 'stay' ? 'stay' : (kind === 'done' ? 'done' : '');
  const txt = kind === 'stay' ? '🏠' : n;
  return L.divIcon({
    html: `<div class="pin-icon ${cls}"><span>${txt}</span></div>`,
    className: '', iconSize: [23, 23], iconAnchor: [11, 21], popupAnchor: [0, -18]
  });
}
function dayPoints(day) {
  const pts = [];
  (day.stops || []).forEach((s, i) => { const ll = parseLL(s.ll); if (ll) pts.push({ i, s, ll }); });
  return pts;
}
function drawDay(map, day, opts) {
  opts = opts || {};
  const fg = L.featureGroup().addTo(map);
  const pts = dayPoints(day);
  pts.forEach((p) => {
    const mk = L.marker([p.ll[1], p.ll[0]], { icon: pinIcon(p.i + 1, p.s.done ? 'done' : '') });
    mk.bindPopup(`<b>${esc(p.s.name)}</b>${p.s.time ? ` · ${esc(p.s.time)}` : ''}${p.s.intro ? `<br><span style="color:#6d5c4d">${esc(p.s.intro)}</span>` : ''}`);
    fg.addLayer(mk);
  });
  const stay = parseLL(day.stayLL);
  if (stay && day.stay) {
    const mk = L.marker([stay[1], stay[0]], { icon: pinIcon(null, 'stay'), zIndexOffset: 800 });
    mk.bindPopup(`🏠 ${esc(day.stay)}`);
    fg.addLayer(mk);
  }
  if (pts.length > 1) {
    const latlngs = pts.map((p) => [p.ll[1], p.ll[0]]);
    fg.addLayer(L.polyline(latlngs, { color: '#c05a24', weight: 3, opacity: .75, dashArray: '6 5' }));
  }
  const b = fg.getBounds();
  if (b.isValid()) map.fitBounds(b, { padding: opts.big ? [46, 46] : [28, 28], maxZoom: opts.big ? 15 : 14 });
  else if (stay) map.setView([stay[1], stay[0]], 12);
  else map.setView([39.47, 79.0], 5);
  return fg;
}
function mountsMap(el, opts) {
  opts = opts || {};
  const m = L.map(el, { zoomControl: false, attributionControl: true, scrollWheelZoom: !!opts.wheel });
  addAmapTiles(m);
  if (opts.zoomCtl) L.control.zoom({ position: 'bottomright' }).addTo(m);
  return m;
}

let dmObs = null;
function scheduleDayMaps() {
  if (dmObs) { dmObs.disconnect(); dmObs = null; }
  const els = $$('#tab-days .daymap');
  if (!window.L) {
    els.forEach((el) => { el.innerHTML = '<div class="dm-fallback">🗺 地图未加载</div>'; });
    return;
  }
  if (!('IntersectionObserver' in window)) { els.forEach(initDayMapEl); return; }
  dmObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { dmObs.unobserve(en.target); initDayMapEl(en.target); } });
  }, { rootMargin: '320px 0px' });
  els.forEach((el) => dmObs.observe(el));
}
function initDayMapEl(el) {
  if (el.dataset.ok) return;
  el.dataset.ok = '1';
  const day = state.days.find((d) => d.id === el.dataset.dm);
  if (!day) return;
  try {
    const m = regMap('day', mountsMap(el));
    drawDay(m, day);
    const ld = el.querySelector('.dm-loading'); if (ld) ld.remove();
    setTimeout(() => m.invalidateSize(), 60);
  } catch (e) { el.innerHTML = '<div class="dm-fallback">🗺 地图加载失败</div>'; }
}

/* ============ 渲染 ============ */
function renderAll() {
  RTOKEN++;
  killMaps();
  $('#tripTitle').textContent = state.trip.title;
  $('#tripSub').textContent = `${fmtDate(state.trip.start)} → ${fmtDate(state.trip.end)} ｜ ${state.days.length} 天 · ${state.places.length} 站`;
  renderPlaces(); renderProgress(); renderDays(); renderMap(); renderTips();
}
function visibleDays() {
  return ui.place === 'all' ? state.days : state.days.filter((d) => (d.place || '') === ui.place);
}
function renderPlaces() {
  const cnt = {};
  state.days.forEach((d) => { cnt[d.place || '其他'] = (cnt[d.place || '其他'] || 0) + 1; });
  const list = ['all'].concat(state.places.filter((p) => cnt[p]));
  $('#places').innerHTML = list.map((p) => `
    <button data-act="place" data-place="${esc(p)}" class="${p === ui.place ? 'on' : ''}">
      ${p === 'all' ? '全部' : esc(p)}<i>${p === 'all' ? state.days.length : cnt[p]}</i>
    </button>`).join('') + '<button data-act="place-add" title="添加城市">＋</button>';
}
function renderProgress() {
  const days = visibleDays();
  const stops = days.reduce((a, d) => a + d.stops.length, 0);
  const done = days.reduce((a, d) => a + d.stops.filter((s) => s.done).length, 0);
  const pct = stops ? Math.round(done / stops * 100) : 0;
  $('#progressBar').style.width = pct + '%';
  $('#progressText').textContent = `${ui.place === 'all' ? '' : ui.place + ' · '}打卡 ${done}/${stops} · ${pct}%`;
}
function heroHtml() {
  const t = todayStr(), s = state.trip.start, e = state.trip.end;
  const total = dayDiff(s, e) + 1;
  let main, sub;
  if (dayDiff(t, s) > 0) { const n = dayDiff(t, s); main = `${n} 天`; sub = '后出发'; }
  else if (dayDiff(t, e) >= 0) { const n = dayDiff(s, t) + 1; main = `第 ${n} 天`; sub = `／共 ${total} 天`; }
  else { main = '已结束'; sub = ''; }
  const passed = Math.min(Math.max(dayDiff(s, t) + 1, 0), total);
  const pct = Math.round(passed / total * 100);
  const cur = state.days.find((d) => d.date === t);
  const loc = cur ? `今天：${cur.place} · ${cur.title}` : `${fmtDate(s)} 出发 · ${state.trip.sub}`;
  return `<div class="hero">
    <div class="hero-top"><span class="hero-cd">${esc(main)}<small>${esc(sub)}</small></span></div>
    <div class="hero-loc">${esc(loc)}</div>
    <div class="hero-bar"><i style="width:${pct}%"></i></div>
  </div>`;
}
function legsHtml(d) {
  if (!d.legs.length) return '';
  return `<div class="legs">${d.legs.map((l) => `
    <div class="leg" data-act="leg" data-day="${esc(d.id)}" data-id="${esc(l.id)}">
      <span class="lg-ic">${esc(l.mode || '🚗')}</span>
      <div class="lg-b">
        <b>${esc(l.text)}</b> <span class="lg-t">${esc(l.time || '')}</span>
        ${l.note ? `<span class="lg-n">${esc(l.note)}</span>` : ''}
      </div>
    </div>`).join('')}</div>`;
}
function stopHtml(d, s, i) {
  const ll = parseLL(s.ll);
  const links = (s.links || []).filter((l) => l && l.url);
  return `<div class="stop ${s.done ? 'done' : ''}" data-act="stop" data-day="${esc(d.id)}" data-id="${esc(s.id)}">
    <i class="pin">${i + 1}</i>
    <div class="sb">
      <div class="sname">${esc(s.name)}${s.time ? `<em>${esc(s.time)}</em>` : ''}</div>
      ${s.intro ? `<div class="sintro">${esc(s.intro)}</div>` : ''}
      ${s.note ? `<div class="snote">⚠️ ${esc(s.note)}</div>` : ''}
      ${!ll ? `<div class="no-ll">📍 未定位 · 点卡片可补坐标</div>` : ''}
      ${links.length ? `<div class="slinks">${links.map((l) => `<a href="${esc(l.url)}" target="_blank" rel="noopener" data-act="link">${esc(l.label || '链接')} ↗</a>`).join('')}</div>` : ''}
    </div>
    <div class="sacts">
      <button class="chk" data-act="done">${s.done ? '✓' : ''}</button>
      <a class="nav-btn" href="${esc(stopHref(s))}" target="_blank" rel="noopener" data-act="nav">导航</a>
    </div>
  </div>`;
}
function renderDays() {
  killMaps('day');
  const days = visibleDays();
  const t = todayStr();
  if (!days.length) { $('#tab-days').innerHTML = '<div class="empty">这个城市还没有安排</div>'; return; }
  $('#tab-days').innerHTML = heroHtml() + days.map((d) => `
    <div class="day ${d.date === t ? 'today' : ''}">
      <div class="dh">
        <div class="dh-no"><b>${esc(d.no || '')}</b><span>${esc(fmtDate(d.date))}</span></div>
        <div class="dh-main">
          <h3>${esc(d.title || '')}</h3>
          <div class="dh-meta">
            <span>${esc(d.wd || '')} · ${esc(d.city || d.place || '')}</span>
            ${d.stay ? `<span class="stay">🏠 ${esc(d.stay)}</span>` : ''}
          </div>
        </div>
        <button class="dh-edit" data-act="day" data-day="${esc(d.id)}">✎</button>
      </div>
      ${legsHtml(d)}
      <div class="stops">${d.stops.map((s, i) => stopHtml(d, s, i)).join('') || '<div class="empty" style="padding:16px">这天还没有安排</div>'}</div>
      ${(d.notes || []).length ? `<div class="dnotes">${d.notes.map((n) => `<div class="dnote">${esc(n)}</div>`).join('')}</div>` : ''}
      <div class="daymap" data-dm="${esc(d.id)}"><div class="dm-loading">🗺 地图加载中…</div></div>
      <button class="add-stop" data-act="add" data-day="${esc(d.id)}">＋ 加景点 / 事项</button>
      <div class="dayfoot">
        <button data-act="addleg" data-day="${esc(d.id)}">＋ 交通段</button>
        <button data-act="addnote" data-day="${esc(d.id)}">＋ 当日要点</button>
      </div>
    </div>`).join('');
  scheduleDayMaps();
}
function renderMap() {
  killMaps('big');
  const days = visibleDays();
  if (!days.length) { $('#tab-map').innerHTML = '<div class="empty">这个城市还没有安排</div>'; return; }
  const d = days.find((x) => x.id === ui.mapDay) || days[0];
  ui.mapDay = d.id;
  const pick = `<div class="map-pick">${days.map((x) =>
    `<button data-act="mday" data-day="${esc(x.id)}" class="${x.id === d.id ? 'on' : ''}">${esc(x.no)} ${esc(x.place || '')}</button>`).join('')}</div>`;
  $('#tab-map').innerHTML = pick + `
    <div class="bigmap-card">
      <div class="map-tools">
        <button data-act="pickmode" class="${PICK ? 'on' : ''}">${PICK ? '📍 点地图加景点（开）' : '📍 点地图加景点'}</button>
        <button data-act="add" data-day="${esc(d.id)}">＋ 手动添加</button>
      </div>
      <div class="daymap big ${PICK ? 'pickmode' : ''}" id="bigMap" data-dm="${esc(d.id)}">
        <div class="dm-badge ${PICK ? 'pick' : ''}">${PICK ? '点地图任意位置即可加景点' : '© 高德地图'}</div>
        <div class="dm-loading">🗺 地图加载中…</div>
      </div>
      <div class="map-list-head"><span>🗓 ${esc(d.no)} · ${esc(d.title || '')}</span><span>${d.stops.length} 项</span></div>
      <div class="map-list">
        ${d.stops.map((s, i) => {
    const ll = parseLL(s.ll);
    return `<div class="mi">
            <i>${i + 1}</i>
            <span data-act="stop" data-day="${esc(d.id)}" data-id="${esc(s.id)}">${esc(s.name)}${s.time ? `<small>${esc(s.time)}</small>` : ''}${!ll ? '<small>📍 未定位</small>' : ''}</span>
            <a class="go" href="${esc(stopHref(s))}" target="_blank" rel="noopener">导航</a>
            <button class="del" data-act="del" data-day="${esc(d.id)}" data-id="${esc(s.id)}">删</button>
          </div>`;
  }).join('')}
      </div>
    </div>`;
  if (!window.L) { $('#bigMap').innerHTML = '<div class="dm-fallback">🗺 地图未加载</div>'; return; }
  try {
    const el = $('#bigMap');
    const m = regMap('big', mountsMap(el, { zoomCtl: true, wheel: false }));
    drawDay(m, d, { big: true });
    m.on('click', (e) => {
      if (!PICK) return;
      PICK = false;
      const ll = [+e.latlng.lng.toFixed(5), +e.latlng.lat.toFixed(5)];
      openStopSheet(d.id, null, { ll });
    });
    setTimeout(() => m.invalidateSize(), 60);
    const ld = el.querySelector('.dm-loading'); if (ld) ld.remove();
  } catch (err) { $('#bigMap').innerHTML = '<div class="dm-fallback">🗺 地图加载失败</div>'; }
}
function renderTips() {
  const tips = state.tips || [];
  const groups = {};
  tips.forEach((t) => { (groups[t.cat || '其他'] = groups[t.cat || '其他'] || []).push(t); });
  const cats = Object.keys(groups).sort((a, b) => TIP_CAT.indexOf(a) - TIP_CAT.indexOf(b));
  $('#tab-tips').innerHTML = cats.map((c) => `
    <div class="tip-group">
      <h4>${esc(TIP_ICON[c] || '📌')} ${esc(c)}</h4>
      ${groups[c].map((t) => `
        <div class="tip ${t.done ? 'done' : ''}" data-act="tip" data-id="${esc(t.id)}">
          <span class="ti">${esc(TIP_ICON[c] || '📌')}</span>
          <div class="tt">${esc(t.text)}</div>
          <button class="chk" data-act="tip-done" data-id="${esc(t.id)}">${t.done ? '✓' : ''}</button>
        </div>`).join('')}
    </div>`).join('') + '<button class="tip-add" data-act="tip-add">＋ 加一条建议</button>';
}

/* ============ 弹层 ============ */
function openSheet(title, body, foot, onMount) {
  $('#sheetTitle').textContent = title;
  $('#sheetBody').innerHTML = body;
  $('#sheetFoot').innerHTML = foot;
  $('#sheet').hidden = false; $('#sheetBackdrop').hidden = false;
  document.body.style.overflow = 'hidden';
  if (onMount) onMount();
}
function closeSheet() {
  killMaps('sheet');
  $('#sheet').hidden = true; $('#sheetBackdrop').hidden = true;
  document.body.style.overflow = '';
}
const fld = (label, id, val, ph) => `<div class="fld"><label>${esc(label)}</label><input id="${id}" value="${esc(val || '')}" placeholder="${esc(ph || '')}"></div>`;
const area = (label, id, val, ph) => `<div class="fld"><label>${esc(label)}</label><textarea id="${id}" placeholder="${esc(ph || '')}">${esc(val || '')}</textarea></div>`;

/* ---- 链接编辑 ---- */
function linkRows(links) {
  return (links || []).map((l, i) => `<div class="link-row" data-lk="${i}">
      <input data-lk-label value="${esc(l.label || '')}" placeholder="名称">
      <input data-lk-url value="${esc(l.url || '')}" placeholder="https://">
      <button type="button" data-lk-del>✕</button>
    </div>`).join('');
}
function bindLinks(box, links) {
  const add = () => {
    const row = document.createElement('div');
    row.className = 'link-row';
    row.innerHTML = '<input data-lk-label placeholder="名称"><input data-lk-url placeholder="https://"><button type="button" data-lk-del>✕</button>';
    box.appendChild(row);
  };
  box.addEventListener('click', (e) => {
    if (e.target.dataset.lkDel !== undefined) { e.target.parentElement.remove(); }
  });
  box._add = add;
}
function collectLinks(box) {
  const out = [];
  $$('.link-row', box).forEach((r) => {
    const l = r.querySelector('[data-lk-label]').value.trim();
    const u = r.querySelector('[data-lk-url]').value.trim();
    if (u) out.push({ label: l || u.replace(/^https?:\/\//, '').slice(0, 18), url: u });
  });
  return out;
}

/* ---- 景点编辑 ---- */
function openStopSheet(dayId, stopId, preset) {
  preset = preset || {};
  const d = state.days.find((x) => x.id === dayId);
  if (!d) return;
  const isNew = !stopId;
  const s = isNew
    ? { id: '', name: preset.name || '', time: '', intro: '', note: '', ll: preset.ll ? llStr(preset.ll) : '', links: [], done: false }
    : d.stops.find((x) => x.id === stopId);
  if (!s) return;
  s.links = s.links || [];
  const ll0 = parseLL(s.ll);
  openSheet(isNew ? '添加景点 / 事项' : '编辑景点', `
    ${fld('名称 *', 'f_name', s.name, '例如：天山神秘大峡谷')}
    ${fld('时间', 'f_time', s.time, '例如：10:30 或 上午')}
    <div class="llbox">
      <div class="llhead">
        <span>📍 地图定位</span>
        <b id="llTxt">${ll0 ? llStr(ll0) : '未定位'}</b>
      </div>
      <div class="search-row" style="padding:8px 10px 0">
        <input id="f_find" placeholder="搜地名，或粘贴高德分享链接" value="">
        <button type="button" id="btnFind">搜索</button>
      </div>
      <div style="padding:6px 10px 0"><div id="findRes" class="find-results"></div></div>
      <div class="pickmap" id="pickMap"><div class="dm-loading">🗺 点地图选位置…</div></div>
      <div class="hint" style="margin:6px 10px 10px">
        在下方小地图上点一下即可定位；也可以直接搜名字。定位后地图和「导航」都按坐标走，不会搜错同名地点。
      </div>
      <input type="hidden" id="f_ll" value="${esc(s.ll || '')}">
    </div>
    ${area('一句话介绍', 'f_intro', s.intro, '显示在这条下面和地图气泡里')}
    ${area('备注（门票 / 预约 / 现场贴士）', 'f_note', s.note, '')}
    <div class="fld"><label>相关链接</label><div id="linksBox">${linkRows(s.links)}</div>
      <button type="button" class="btn-ghost" id="btnAddLink" style="width:100%;padding:9px;font-size:13px;margin-top:4px">＋ 添加链接</button>
    </div>
  `, `
    ${isNew ? '' : '<button class="btn-danger" id="btnDel">删除</button>'}
    <button class="btn-ghost" id="btnCancel">取消</button>
    <button class="btn-primary" id="btnSave">保存</button>
  `, () => {
    const box = $('#linksBox');
    bindLinks(box, s.links);
    $('#btnAddLink').onclick = () => box._add();
    $('#btnCancel').onclick = closeSheet;
    $('#btnDel') && ($('#btnDel').onclick = () => {
      d.stops = d.stops.filter((x) => x.id !== stopId);
      save(); closeSheet(); renderAll(); toast('已删除，地图同步更新');
    });
    $('#btnSave').onclick = () => {
      const name = V('f_name') || '未命名地点';
      const o = {
        id: s.id || uid(), name, time: V('f_time'), intro: $('#f_intro').value.trim(),
        note: $('#f_note').value.trim(), ll: V('f_ll'), links: collectLinks(box), done: !!s.done
      };
      if (isNew) d.stops.push(o);
      else d.stops[d.stops.findIndex((x) => x.id === stopId)] = o;
      save(); closeSheet(); renderAll(); toast(isNew ? '已添加' : '已保存');
    };
    /* 定位搜索 */
    const setLL = (ll, label) => {
      $('#f_ll').value = llStr(ll);
      $('#llTxt').textContent = llStr(ll);
      if (label && !V('f_name')) $('#f_name').value = label;
      if (pickM) {
        if (tmpMk) pickM.removeLayer(tmpMk);
        tmpMk = L.marker([ll[1], ll[0]], { icon: L.divIcon({ html: '<div class="tmp-pin"></div>', className: '', iconSize: [20, 20], iconAnchor: [10, 10] }) }).addTo(pickM);
        pickM.setView([ll[1], ll[0]], Math.max(pickM.getZoom(), 13));
      }
    };
    let pickM = null, tmpMk = null;
    if (window.L) {
      try {
        pickM = regMap('sheet', mountsMap($('#pickMap'), { wheel: false }));
        if (ll0) { pickM.setView([ll0[1], ll0[0]], 13); tmpMk = L.marker([ll0[1], ll0[0]], { icon: L.divIcon({ html: '<div class="tmp-pin"></div>', className: '', iconSize: [20, 20], iconAnchor: [10, 10] }) }).addTo(pickM); }
        else {
          const ref = dayPoints(d)[0] || (parseLL(d.stayLL) ? { ll: parseLL(d.stayLL) } : null);
          pickM.setView(ref ? [ref.ll[1], ref.ll[0]] : [39.47, 79.0], ref ? 10 : 5);
        }
        pickM.on('click', (e) => { setLL([+e.latlng.lng.toFixed(5), +e.latlng.lat.toFixed(5)]); });
        setTimeout(() => pickM.invalidateSize(), 60);
        const ld = $('#pickMap .dm-loading'); if (ld) ld.remove();
      } catch (e) { $('#pickMap').innerHTML = '<div class="dm-fallback">地图不可用，可直接搜索</div>'; }
    }
    const doFind = async () => {
      const q = V('f_find');
      if (!q) return;
      const fromUrl = parseMapUrl(q);
      if (fromUrl) {
        setLL(fromUrl.ll, fromUrl.name);
        $('#findRes').innerHTML = `<div class="fr">✅ 已从链接解析坐标 ${esc(llStr(fromUrl.ll))}</div>`;
        return;
      }
      $('#findRes').innerHTML = '<div class="fr"><small>搜索中…</small></div>';
      const res = await geocode(q);
      if (!res.length) { $('#findRes').innerHTML = '<div class="fr"><small>没找到，可在地图上直接点，或先保存后补</small></div>'; return; }
      $('#findRes').innerHTML = res.map((r, i) =>
        `<button type="button" class="fr" data-ll="${esc(llStr(r.ll))}" data-nm="${esc(r.name)}"><b>${esc(r.name)}</b><small>${esc(r.addr || '')}</small></button>`).join('');
      $$('#findRes .fr').forEach((b) => {
        b.onclick = () => { setLL(parseLL(b.dataset.ll), b.dataset.nm); $('#findRes').innerHTML = `<div class="fr">✅ 已选：${esc(b.dataset.nm)}</div>`; };
      });
    };
    $('#btnFind').onclick = doFind;
    $('#f_find').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); doFind(); } });
  });
}

/* ---- 交通段 ---- */
function openLegSheet(dayId, legId) {
  const d = state.days.find((x) => x.id === dayId);
  const isNew = !legId;
  const l = isNew ? { id: '', mode: '🚗', text: '', time: '', note: '' } : d.legs.find((x) => x.id === legId);
  if (!l) return;
  openSheet(isNew ? '添加交通段' : '编辑交通段', `
    <div class="fld"><label>方式</label>
      <select id="f_mode">${['✈️ 飞机', '🚂 火车', '🚙 包车/拼车', '🚌 大巴', '🚐 跟团', '🚕 打车', '🚶 步行', '🚗 其他'].map((o) => {
    const [ic, nm] = o.split(' ');
    return `<option value="${ic}" ${l.mode === ic ? 'selected' : ''}>${o}</option>`;
  }).join('')}</select></div>
    ${fld('内容', 'f_text', l.text, '例如：夜卧 喀什 → 库车')}
    ${fld('时间', 'f_time', l.time, '例如：23:10 → 次日 07:06')}
    ${area('备注', 'f_note', l.note, '')}
  `, `
    ${isNew ? '' : '<button class="btn-danger" id="btnDel">删除</button>'}
    <button class="btn-ghost" id="btnCancel">取消</button>
    <button class="btn-primary" id="btnSave">保存</button>
  `, () => {
    $('#btnCancel').onclick = closeSheet;
    $('#btnDel') && ($('#btnDel').onclick = () => {
      d.legs = d.legs.filter((x) => x.id !== legId); save(); closeSheet(); renderAll(); toast('已删除');
    });
    $('#btnSave').onclick = () => {
      const o = { id: l.id || uid(), mode: $('#f_mode').value, text: V('f_text') || '交通', time: V('f_time'), note: $('#f_note').value.trim() };
      if (isNew) d.legs.push(o); else d.legs[d.legs.findIndex((x) => x.id === legId)] = o;
      save(); closeSheet(); renderAll();
    };
  });
}
/* ---- 当日要点 ---- */
function openNoteSheet(dayId, idx) {
  const d = state.days.find((x) => x.id === dayId);
  const isNew = idx == null;
  const val = isNew ? '' : (d.notes[idx] || '');
  openSheet(isNew ? '添加当日要点' : '编辑要点', area('要点', 'f_note', val, '现场提醒、背景知识、要确认的事…'), `
    ${isNew ? '' : '<button class="btn-danger" id="btnDel">删除</button>'}
    <button class="btn-ghost" id="btnCancel">取消</button>
    <button class="btn-primary" id="btnSave">保存</button>
  `, () => {
    $('#btnCancel').onclick = closeSheet;
    $('#btnDel') && ($('#btnDel').onclick = () => {
      d.notes.splice(idx, 1); save(); closeSheet(); renderAll(); toast('已删除');
    });
    $('#btnSave').onclick = () => {
      const v = $('#f_note').value.trim(); if (!v) return closeSheet();
      if (isNew) d.notes.push(v); else d.notes[idx] = v;
      save(); closeSheet(); renderAll();
    };
  });
}
/* ---- 建议 ---- */
function openTipSheet(id) {
  const isNew = !id;
  const t = isNew ? { id: '', cat: '其他', text: '', done: false } : state.tips.find((x) => x.id === id);
  if (!t) return;
  openSheet(isNew ? '添加建议' : '编辑建议', `
    <div class="fld"><label>分类</label><select id="f_cat">
      ${TIP_CAT.map((c) => `<option value="${c}" ${t.cat === c ? 'selected' : ''}>${TIP_ICON[c]} ${c}</option>`).join('')}
    </select></div>
    ${area('内容', 'f_text', t.text, '')}
  `, `
    ${isNew ? '' : '<button class="btn-danger" id="btnDel">删除</button>'}
    <button class="btn-ghost" id="btnCancel">取消</button>
    <button class="btn-primary" id="btnSave">保存</button>
  `, () => {
    $('#btnCancel').onclick = closeSheet;
    $('#btnDel') && ($('#btnDel').onclick = () => {
      state.tips = state.tips.filter((x) => x.id !== id); save(); closeSheet(); renderAll(); toast('已删除');
    });
    $('#btnSave').onclick = () => {
      const o = { id: t.id || uid(), cat: $('#f_cat').value, text: $('#f_text').value.trim() || '（空）', done: !!t.done };
      if (isNew) state.tips.push(o); else state.tips[state.tips.findIndex((x) => x.id === id)] = o;
      save(); closeSheet(); renderAll();
    };
  });
}
/* ---- 当天信息 ---- */
function openDaySheet(dayId) {
  const d = state.days.find((x) => x.id === dayId);
  openSheet('编辑当天', `
    ${fld('标题', 'f_title', d.title, '')}
    <div class="fld-2">
      ${fld('日期', 'f_date', d.date, '2026-10-31')}
      ${fld('编号', 'f_no', d.no, 'D1')}
    </div>
    <div class="fld-2">
      ${fld('城市（用于顶部筛选）', 'f_place', d.place, '喀什')}
      ${fld('副标题地名', 'f_city', d.city, '喀什')}
    </div>
    ${fld('住宿', 'f_stay', d.stay, '')}
    ${fld('住宿坐标（lng,lat）', 'f_stayLL', d.stayLL, '75.9900,39.4700')}
  `, `
    <button class="btn-ghost" id="btnCancel">取消</button>
    <button class="btn-primary" id="btnSave">保存</button>
  `, () => {
    $('#btnCancel').onclick = closeSheet;
    $('#btnSave').onclick = () => {
      d.title = V('f_title'); d.date = V('f_date'); d.no = V('f_no');
      d.place = V('f_place'); d.city = V('f_city'); d.stay = V('f_stay'); d.stayLL = V('f_stayLL');
      d.wd = wdOf(d.date);
      if (d.place && !state.places.includes(d.place)) state.places.push(d.place);
      state.trip.start = state.days[0].date; state.trip.end = state.days[state.days.length - 1].date;
      save(); closeSheet(); renderAll();
    };
  });
}
/* ---- 菜单 ---- */
function openMenu() {
  openSheet('设置 / 数据', `
    <div class="fld"><label>行程标题</label><input id="m_title" value="${esc(state.trip.title)}"></div>
    <div class="fld"><label>副标题</label><input id="m_sub" value="${esc(state.trip.sub)}"></div>
    <div class="fld"><label>高德 Web 服务 Key（选填，填了搜索更准）</label>
      <input id="m_key" value="${esc(state.settings.amapKey || '')}" placeholder="留空则用内置坐标库 + 公开地名搜索">
      <div class="hint">在「高德开放平台 → 应用 → 添加 Key → 服务平台选 Web服务」获取。不填也能用。</div>
    </div>
    <button class="btn-ghost" id="m_export" style="width:100%;padding:11px;font-size:14px;margin-bottom:8px">⬇ 导出备份（JSON）</button>
    <button class="btn-ghost" id="m_import" style="width:100%;padding:11px;font-size:14px;margin-bottom:8px">⬆ 导入备份</button>
    <button class="btn-danger" id="m_reset" style="width:100%;padding:11px;font-size:14px">↺ 恢复初始行程（清空我的修改）</button>
    <div class="hint" style="margin-top:12px">数据只存在这台设备的浏览器里（含手机）。换设备用「导出 / 导入」搬家。</div>
  `, `<button class="btn-ghost" id="btnCancel">关闭</button><button class="btn-primary" id="btnSave">保存</button>`, () => {
    $('#btnCancel').onclick = closeSheet;
    $('#btnSave').onclick = () => {
      state.trip.title = V('m_title') || state.trip.title;
      state.trip.sub = V('m_sub');
      state.settings.amapKey = V('m_key');
      save(); closeSheet(); renderAll(); toast('已保存');
    };
    $('#m_export').onclick = () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'nanjiang-trip-' + todayStr() + '.json';
      a.click(); toast('已导出');
    };
    $('#m_import').onclick = () => {
      const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
      inp.onchange = () => {
        const f = inp.files[0]; if (!f) return;
        const rd = new FileReader();
        rd.onload = () => {
          try {
            const o = JSON.parse(rd.result);
            if (!o || !o.days) throw 0;
            state = o; normalize(); save(); closeSheet(); renderAll(); toast('导入成功');
          } catch (e) { toast('文件格式不对'); }
        };
        rd.readAsText(f);
      };
      inp.click();
    };
    $('#m_reset').onclick = () => {
      if (!confirm('会清空你在这台设备上做的所有修改，恢复成初始行程。确定？')) return;
      resetState(); closeSheet(); renderAll(); toast('已恢复初始行程');
    };
  });
}
function openPlaceAdd() {
  openSheet('添加城市', fld('城市名', 'f_p', '', '例如：和田'), `
    <button class="btn-ghost" id="btnCancel">取消</button>
    <button class="btn-primary" id="btnSave">保存</button>
  `, () => {
    $('#btnCancel').onclick = closeSheet;
    $('#btnSave').onclick = () => {
      const v = V('f_p'); if (!v) return;
      if (!state.places.includes(v)) state.places.push(v);
      ui.place = v; save(); closeSheet(); renderAll(); toast('已添加（到行程里给它排一天才会显示天数）');
    };
  });
}

/* ============ 事件 ============ */
document.addEventListener('click', (e) => {
  const t = e.target;
  if (t.id === 'sheetClose' || t.id === 'sheetBackdrop') return closeSheet();
  if (t.id === 'btnMenu') return openMenu();
  const nav = t.closest('#tabbar button');
  if (nav) {
    ui.tab = nav.dataset.tab;
    $$('#tabbar button').forEach((b) => b.classList.toggle('active', b === nav));
    $$('.tab').forEach((s) => s.classList.toggle('active', s.id === 'tab-' + ui.tab));
    if (ui.tab === 'map') renderMap();
    window.scrollTo({ top: 0 });
    return;
  }
  const el = t.closest('[data-act]');
  if (!el) return;
  const act = el.dataset.act;
  if (act === 'link' || act === 'nav' || act === 'stop-nav') return; // 让链接正常跳转
  const dayId = el.dataset.day, id = el.dataset.id, day = dayId && state.days.find((x) => x.id === dayId);

  switch (act) {
    case 'place': ui.place = el.dataset.place; renderAll(); break;
    case 'place-add': openPlaceAdd(); break;
    case 'add': if (day) openStopSheet(day.id, null); break;
    case 'stop': if (day && id) openStopSheet(day.id, id); break;
    case 'del':
      if (day && id) { day.stops = day.stops.filter((x) => x.id !== id); save(); renderAll(); toast('已删除，地图同步更新'); }
      break;
    case 'done': {
      e.stopPropagation();
      if (day && id) {
        const s = day.stops.find((x) => x.id === id);
        if (s) {
          s.done = !s.done; save(); renderProgress();
          const row = el.closest('.stop');
          if (row) { row.classList.toggle('done', s.done); const c = row.querySelector('.chk'); if (c) c.textContent = s.done ? '✓' : ''; }
        }
      }
      break;
    }
    case 'addleg': if (day) openLegSheet(day.id, null); break;
    case 'leg': if (day && id) openLegSheet(day.id, id); break;
    case 'addnote': if (day) openNoteSheet(day.id, null); break;
    case 'day': if (day) openDaySheet(day.id); break;
    case 'tip': if (id) openTipSheet(id); break;
    case 'tip-done': {
      e.stopPropagation();
      const tp = state.tips.find((x) => x.id === id);
      if (tp) { tp.done = !tp.done; save(); renderTips(); }
      break;
    }
    case 'tip-add': openTipSheet(null); break;
    case 'mday': ui.mapDay = el.dataset.day; PICK = false; renderMap(); break;
    case 'pickmode': PICK = !PICK; renderMap(); toast(PICK ? '在地图上点一下即可加景点' : '已退出点选模式'); break;
  }
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#sheet').hidden) closeSheet(); });

/* ============ 启动 ============ */
load();
renderAll();
