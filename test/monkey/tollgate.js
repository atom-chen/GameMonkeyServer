let remote = require('../util');
let facade = require('gamecloud')
let {ResType} = facade.const;
let {wait} = require('../utils/commonFunc')

describe('挂机关卡', function() {
    it('挂机通关 - 持续挂若干关', async () => {
        let msg = await remote.login({openid:"2222"});
        remote.isSuccess(msg);

        let recy = 0;
        async function sendData(){
            let msg = await remote.fetching({url:"q?act=100000&oper=5&gateNo=5&monsterNum=30"});
            remote.isSuccess(msg, true);

            if(recy++<60) {
                wait(1000);
                await sendData();
            } else {
                msg = await remote.fetching({url:"q?act=601001&oper=1"});
                remote.isSuccess(msg);

                console.log(msg.data.rank);
                msg.data.list.map(item=>{
                    console.log(JSON.stringify(item));
                });
            }
        }

        msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.Gold},5000`});
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=500001&oper=2&pm=5000&id=1"});
        remote.isSuccess(msg);

        await sendData();
    });

    /**
     * 7 普通重生：所有英魂转为魂石；当前关卡变为1；所有装备等级变为1；如果保留宠物设定，则所有宠物等级变为1；金币复位到一个初始值：基数为10万，受科技影响
     */
    it('重生', async () => {
        let msg = await remote.login({directly:true});
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=100000&oper=7"});
        remote.isSuccess(msg, true);
    });

    /**
     * 8 高级重生：所有英魂转为魂石，装备、金币、当前关卡都保持不变
     * 条件：转生精灵时效在有效期内
     */
    it('高级重生', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=100000&oper=8"});
        remote.isSuccess(msg, true);
    });

    /**
     * 9 请求挂机
     */
    it('挂机', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=100000&oper=9"});
        remote.isSuccess(msg, true);
    });

    /**
     * 10 请求使用元宝提前结束挂机
     */
    it('提前结束挂机', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=100000&oper=10"});
        remote.isSuccess(msg, true);
    });

    /**
     * 11 立即终止挂机
     */
    it('立即完成挂机', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=100000&oper=11"});
        remote.isSuccess(msg, true);
    });

    it('随机事件', async () =>{
        let msg = await remote.login()
        msg = await remote.fetching({url:"q?act=100001&eid=1"});
        remote.isSuccess(msg, true);
    });
});
