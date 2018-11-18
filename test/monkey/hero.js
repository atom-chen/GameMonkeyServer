let remote = require('../util')
let facade = require('gamecloud')
let BattleRoom = facade.Util.BattleManager
let {ResType, SkillType} = facade.const;
let {wait} = require('../utils/commonFunc')

function users(){//模拟用户布阵
    return [
        {id:1, lv:15, skill:[[102,40], [103,40]]},    //代表攻方的玩家，携带特定卡组
        {id:2, lv:15, skill:[[104,40]]}               //代表守方的玩家，携带特定卡组。
    ]    
}

//输入说明：
// * name     | type     | description of param
// * ---------|----------|--------------------
// * oper     | int      | 操作码 1查询 2升级 3切换 4激活 5进阶
// * id       | int      | 指定的宠物编号，查询列表时可不填写
// * pm       | int      | 附加参数，升级时表示一次升多少级

//输出说明
// * data     | int      | 返回数据对象
// * .chip    | int      | 万能强化碎片
// * .adChip  | int      | 万能进阶碎片
// * .items   | array    | PVP英雄列表
// * ..i      | int      | 编号
// * ..l      | int      | 当前等级
// * ..en     | int      | 当前强化等级
// * ..ad     | int      | 当前进阶等级
// * ..p      | int      | 当前拥有的专属碎片数量 point
// * ..b      | int      | 当前战力 power

describe('PVP英雄管理', function() {
    it('查询列表', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=502001&oper=1"});
        remote.isSuccess(msg);
        Object.keys(msg.data.items).map(key=>{
            console.log(JSON.stringify(msg.data.items[key]));
        });

        console.log('万能强化碎片', msg.data.chip);
        console.log('万能进阶碎片', msg.data.adChip);
    });

    it('升级', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.chip},5000`});
        remote.isSuccess(msg);

        let recy = 0;
        let fetch = async function() {
            let msg = await remote.fetching({url:"q?act=502001&oper=2&id=1&pm=1"});
            remote.isSuccess(msg);

            if(++recy< 19) {
                wait(1000);
                await fetch();
            } else {
                msg = await remote.fetching({url:"q?act=502001&oper=1"});
                remote.isSuccess(msg);
                Object.keys(msg.data.items).map(key=>{
                    console.log(JSON.stringify(msg.data.items[key]));
                });
            }
        }

        await fetch();
    });

    it('强化 - 使用专用碎片或者万能碎片进行激活或者强化', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        for(let i = 1; i<=25; i++) {
            msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.PetChipHead},${i},5000`});
            remote.isSuccess(msg);

            msg = await remote.fetching({url:`q?act=502001&oper=3&id=${i}&pm=1`});
            remote.isSuccess(msg);

            msg = await remote.fetching({url:"q?act=502001&oper=1"});
            remote.isSuccess(msg);

            Object.keys(msg.data.items).map(key=>{
                console.log(JSON.stringify(msg.data.items[key]));
            });
        }
    });

    it('进阶 - 使用进阶碎片进行进阶', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.advancedChip},5000`});
        for(i = 1; i<= 25; i++){
            msg = await remote.fetching({url:`q?act=502001&oper=4&id=${i}&pm=1`});
            remote.isSuccess(msg);

            msg = await remote.fetching({url:"q?act=502001&oper=1"});
            remote.isSuccess(msg);

            Object.keys(msg.data.items).map(key=>{
                console.log(JSON.stringify(msg.data.items[key]));
            });
        }
    });

    it('离开分组', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);
        msg = await remote.fetching({url:"q?act=502001&oper=8&id=1&gid=1"});
        remote.isSuccess(msg,true);
    });

    it('查询敌方默认卡组', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=502001&oper=10&id=18681223392"});
        remote.isSuccess(msg,true);
    });

    it('三界符抽奖', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=502001&oper=1"});
        remote.isSuccess(msg, true);

        let m = {oriPetChip:[], oriChip:0, oriAdChip:0};
        for(let $key in msg.data.items){
            let $value = msg.data.items[$key];
            m.oriPetChip.push($value.p);
        }
        m.oriChip = msg.data.chip;
        m.oriAdChip = msg.data.adChip;
        console.log(JSON.stringify(m));

        //oper=5 单抽，每天免费3次，后续花费元宝；
        //oper=11 11连抽，必须花费元宝，10次的花费、抽11次
        msg = await remote.fetching({url:"q?act=502001&oper=11"});
        remote.isSuccess(msg);

        let n = {petChip:[], chip:0, adChip:0};
        for(let $key in msg.data.items){
            let $value = msg.data.items[$key];
            n.petChip.push($value.p);
        }
        n.petChip = n.petChip.map((val, idx)=>{
            return val - m.oriPetChip[idx];
        });
        n.chip = msg.data.chip - m.oriChip;
        n.adChip = msg.data.adChip - m.oriAdChip;
        console.log(JSON.stringify(n));
    });

    it.skip('打印模拟战斗到文件', async () => {
        console.time('计算耗时');
        for(let i = 0; i < 1; i++){
            let result = BattleRoom.CreateRoom(...users()).QuickBattle();//计算结果并输出战斗过程
            let fs = require('fs');
            let logName = `./battleReport${(+new Date()/1000)|0}.json`;
        
            fs.appendFileSync(logName, "[\r\n");
            let $begin = true;
            for(let $item of result){
                if($begin){
                    $begin = false;
                }
                else{
                    fs.appendFileSync(logName, ",\r\n");
                }
                fs.appendFileSync(logName, '\t');
                fs.appendFileSync(logName, JSON.stringify($item.translate()));
            }
            fs.appendFileSync(logName, "\r\n]");
        
            console.log(`文件已生成：${logName}`);
        }
        console.timeEnd('计算耗时');

        done();
    });

    it.skip('打印模拟战斗到控制台', done => {
        console.time('计算耗时');
        for(let i = 0; i < 1; i++){
            let result = BattleRoom.CreateRoom(...users()).QuickBattle();//计算结果并输出战斗过程
            let reflect = {0:true};
            while(result.length>0){
                let $item = result.splice(0,1)[0];
                if(!!reflect[$item.PreCondition]){
                    console.log($item.translate().params.desc, `${$item.translate().EventIndex}/${$item.PreCondition}`, ); //仅打印说明
                    reflect[$item.EventIndex] = true;
                }
                else{
                    result.push($item);
                }
            }
        }
        console.timeEnd('计算耗时');

        done();
    });

    it('查询卡牌分组', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=502001&oper=9"});
        remote.isSuccess(msg,true);

        console.log("编组列表：");
        Object.values(msg.data.loc).map(it=>{
            console.log(it);
        })
        console.log("有效战力：");
        msg.data.power.map(it=>{
            console.log(it);
        });
    });

    it('加入分组', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=502001&oper=7&id=3&gid=1"});
        remote.isSuccess(msg, true);
    });

    it('输出战斗过程到JSON对象', async () => {
        let msg = await remote.login({openid:"sss1"});
        remote.isSuccess(msg);

        let func = async () => {
            msg = await remote.fetching({url:"q?act=502001&oper=6&openid=sss1&gid=1&debug=1"});
            remote.isSuccess(msg);
            msg.data.operation.map(it => {
                console.log(it);
            });
        }
        setInterval(func, 2000);
    });
})
