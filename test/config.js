/**
 * 单元测试：获取配置文件
 * Creted by liub 2017.3.24
 *
 * @note 由于JSON中不便放置注释，关于配置文件，需要策划提供额外的字段说明文档
 */
let remote = require('./util')
let expect = require('chai').expect

describe('配置文件', function() {
    it('获取商品列表 shopdata', async () => {
        let msg = await remote.fetching({func:"config.get", "file":"shopdata"});
        expect(msg.code).to.be.equal(remote.ReturnCode.Success);    //返回值
    });

    it('获取每日登录奖励 DataDayLoginAward', async () => {
        let msg = await remote.fetching({func:"config.get", "file":"DataDayLoginAward"});
        expect(msg.code).to.be.equal(remote.ReturnCode.Success);
    });

    it('获取常量表 DataConst', async () => {
        let msg = await remote.fetching({func:"config.get", "file":"DataConst"});
        expect(msg.code).to.be.equal(remote.ReturnCode.Success);
    });
});
