/**
 * 单元测试：邮箱系统
 * Creted by liub 2017.3.24
 *
 * only skip before after beforeEach afterEach
 */

let facade = require('gamecloud')
const remote = require('../util')
let {UserStatus, ActionExecuteType, NotifyType, ReturnCode} = facade.const;

describe('邮箱', function() {
    it('消息系统 - 删除消息', async () => {
        let msg = await remote.login();
        msg = await remote.fetching({url:"q?act=600001&oper=2&idx=[1,8]"});
        remote.isSuccess(msg);
    });

    it('消息系统 - 读取消息', async () => {
        let msg = await remote.login();
        msg = await remote.fetching({url:"q?act=600001&oper=4&idx=[19,20,21,22,23]"});
        remote.isSuccess(msg, true);
    });

    it('消息系统 - 查询消息列表', async () =>{
        let msg = await remote.login();
        msg = await remote.fetching({url:"q?act=600001&oper=3&page=1"});
        remote.isSuccess(msg);

        console.log(`共${msg.data.total}页，第${msg.data.cur}页`);
        msg.data.list.map(item=>{
            console.log(JSON.stringify(item));
        });
    });
});
