let remote = require('../util');
let facade = require('gamecloud')
let {ResType} = facade.const;

describe('商城', function() {
    it('作弊指令', async () => {
       //使用作弊指令获取必要的资源
       let msg = await remote.login();
       msg = await remote.fetching({url:`q?act=999003&oper=99&bonus=${ResType.Diamond},5000`});
       remote.isSuccess(msg);
    });

    it('购买元宝', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=999003&oper=2&type=1&id=1001"});
        remote.isSuccess(msg, true);
    });

    it('购买金币', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);
        msg = await remote.fetching({url:"q?act=999003&oper=2&type=1&id=1002"});
        remote.isSuccess(msg, true);
    });

    it('购买礼包', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);
        msg = await remote.fetching({url:"q?act=999003&oper=2&type=1&id=1006"});
        remote.isSuccess(msg, true);
    });

    it('强制刷新商品列表', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=999003&oper=3&type=1"});
        remote.isSuccess(msg);

        msg.data.items.map(it=>{
            console.log(it);
        });
    });

    it('购买礼包', async () => {
        let msg = await remote.login({openid:"2222"});
        remote.isSuccess(msg);
        msg = await remote.fetching({url:"q?act=999003&oper=2&type=1&id=1001"});
        remote.isSuccess(msg, true);
    });

    it('商品列表', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=999003&oper=1&type=8"});
        remote.isSuccess(msg);
        msg.data.items.map(it=>{
            console.log(it);
        });
    });

    it('shopInfo', async () => {
        let msg = await remote.login()
        msg = await remote.fetching({url:`q?act=101000`});
        console.dir(msg.data);
    });
})
