let remote = require('../util');
let facade = require('gamecloud')
let {ResType} = facade.const;

// query: 1,   //查询列表
// upgrade: 2, //升级
// changePoint: 3, //洗点
// assign: 4, //分配闲置的圣光点

describe('法宝', function() {
    beforeEach(async ()=>{
        await remote.login();
    });

    it('法宝升级', async () => {
        let msg = remote.fetching({url:"q?act=500001&oper=2&pm=5000&id=1"});
        remote.isSuccess(msg,true);
    });

    it('法宝洗点', async () => {
        //使用作弊指令补充一些钻石，避免执行次数不足而导致失败
        let msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.Diamond},1000`});
        remote.isSuccess(msg);

        //查询法宝列表
        msg = await remote.fetching({url:"q?act=500001&oper=1"});
        remote.isSuccess(msg);

        for(let val of Object.values(msg.data.items)){
            if(val.p > 0) {//搜寻圣光数量大于0的法宝
                //发起重新分配圣光点的请求
                await remote.fetching({url:`q?act=500001&oper=3&pm=${val.p}&id=${val.i}`});
                remote.isSuccess(msg);

                break;
            }
        }
    });

    it('分配闲置的圣光点', async () => {
        //使用作弊指令送出必要的资源
        let msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.Potential},1;${ResType.AssignPotential},1`});
        remote.isSuccess(msg);

        //查询结余的圣光点数
        msg = await remote.fetching({url:"q?act=500001&oper=1"});
        remote.isSuccess(msg);
        if(msg.data.totem>0){
            //一次性分配全部的圣光点
            msg = await remote.fetching({url:`q?act=500001&oper=4&pm=${msg.data.totem}`});
            remote.isSuccess(msg);
        }
    });

    it('查询法宝列表', async () => {
        let msg = await remote.fetching({url:"q?act=500001&oper=1&pm=1&id=1"});
        remote.isSuccess(msg);

        //打印法宝列表
        for(let val of Object.values(msg.data.items)){
            console.log(JSON.stringify(val));
        }

        //打印剩余金币和等级
        console.log(`金币:${JSON.stringify(msg.data.money)}, 战力:${JSON.stringify(msg.data.power)}, 免费分配次数:${msg.data.freePoint}, 圣光数量:${msg.data.totem}`);
    });
});
