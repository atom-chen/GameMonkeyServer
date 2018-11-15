let remote = require('../util')

describe('活动', function() {
    it('新手引导', async () => {
        let msg = await remote.login();
        msg = await remote.fetching({url:`q?act=103001&oper=0`});
        console.dir(msg.data);
    });

    it('查询周活动信息', async () => {
        let msg = await remote.login();
        msg = await remote.fetching({url:`q?act=103001&oper=1`});
        console.dir(msg.data);
    });

    it('查询周活动排行', async () =>{
        let msg = await remote.login();
        msg = await remote.fetching({url:`q?act=103001&oper=2`});
        console.dir(msg.data);
    });
});
