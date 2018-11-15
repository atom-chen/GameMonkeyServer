let remote = require('../util');

describe('时效性技能', function() {
    it('清除全部技能CD', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=503001&oper=3"});
        remote.isSuccess(msg);
    });

    it('查询时效性技能列表', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:`q?act=503001&oper=1`});
        remote.isSuccess(msg);

        for(let key in msg.data.items){
            console.log(msg.data.items[key]);
        }
        Object.keys(msg.data.effects).map(key=>{
            console.log(msg.data.effects[key]);
        });
    });

    it('使用指定技能', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=503001&oper=2&aid=1"});
        remote.isSuccess(msg);

        Object.keys(msg.data.items).map(key=>{
            console.log(msg.data.items[key]);
        });
        Object.keys(msg.data.effects).map(key=>{
            console.log(msg.data.effects[key]);
        });
    });
})