let remote = require('../util')
const facade = require('gamecloud')
let ConfigManager = facade.Util.ConfigManager

describe('PVE伙伴管理', function() {
    beforeEach(async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);
    });

    it('计算高阶升级费用', async () =>{
        console.log("从0级升级到50W级所需花费", JSON.stringify(ConfigManager.getCostCPet(0,500000)));
    });

    it('计算PVE宠物基础攻击力', async ()=>{
        console.log(ConfigManager.getPowerFormula(1)(500000));
    });

    it('进阶', async () => {
        // * name     | type     | description of param
        // * ---------|----------|--------------------
        // * oper     | int      | 操作码 1查询 2升级 3切换 4激活 5进阶
        // * id       | int      | 指定的宠物编号，查询列表时可不填写
        // * pm       | int      | 附加参数，升级时表示一次升多少级
        let msg = await remote.fetching({url:"q?act=504001&oper=5&id=2"});
        remote.isSuccess(msg);
    });

    it('切换', async () => {
        let msg = await remote.fetching({url:"q?act=504001&oper=3&id=1"});
        remote.isSuccess(msg);
        msg = await remote.fetching({url:"q?act=503001&oper=1"});
        remote.isSuccess(msg);
        console.log(msg.data.effects);
    });

    it('激活', async () => {
        let msg = await remote.fetching({url:"q?act=504001&oper=4&id=7"});
        remote.isSuccess(msg);
    });

    it('升级', async () => {
        let msg = await remote.fetching({url:"q?act=504001&oper=2&pm=1000"});
        remote.isSuccess(msg);
        console.log(msg.data.powerClick);
    });

    it('查询列表', async () => {
        let msg = await remote.fetching({url:"q?act=504001&oper=1"});
        remote.isSuccess(msg);
        console.log('current: ', msg.data.active);
        Object.keys(msg.data.items).map(key=>{
            console.log(msg.data.items[key]);
        });
    });
})
