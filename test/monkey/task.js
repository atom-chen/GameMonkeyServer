let remote = require('../util')

describe('任务管理', function() {
    it('查询任务列表', async () => {
        let msg = await remote.login({openid:"2222"});
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=101000&oper=0"});
        for(let val of Object.values(msg.data.items)){
            console.log(JSON.stringify(val));
        }
    });

    it('领取任务奖励', async () => {
        let msg = await remote.login();
        msg = await remote.fetching({url:"q?act=101001&id=1001&oper=0"});
        remote.isSuccess(msg);

        for(let val of Object.values(msg.data.items)){
            console.log(JSON.stringify(val));
        }
        console.log(msg.data.bonus);
    });

    it('强制完成任务并领取奖励', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=101001&id=1001&oper=1"});
        remote.isSuccess(msg);

        for(let val of Object.values(msg.data.items)){
            console.log(JSON.stringify(val));
        }
        console.log(msg.data.bonus);
    });
});
