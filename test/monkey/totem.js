let remote = require('../util');

describe('图腾管理', function() {
    it('获取待激活的图腾列表, 并激活其中的第一项', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        //获取随机的待激活图腾
        msg = await remote.fetching({url:"q?act=501002&count=4"});
        remote.isSuccess(msg);

        if(!!msg.data.items && Object.keys(msg.data.items).length>0) {
            //激活第一项
            msg = await remote.fetching({url:`q?act=501001&oper=2&id=${msg.data.items[Object.keys(msg.data.items)[0]].i}`});
            remote.isSuccess(msg);

            //查询所有已激活图腾的列表
            msg = await remote.fetching({url:"q?act=501001&oper=1"});
            remote.isSuccess(msg);

            Object.keys(msg.data.items).map(key=>{
                console.log(JSON.stringify(msg.data.items[key]));
            });
        }
        else{
            console.log("图腾已全部激活");
        }
    });

    it('查询所有已激活图腾的列表', async () => {
        let msg = await remote.login();
        remote.isSuccess(msg);

        msg = await remote.fetching({url:"q?act=501001&oper=1"});
        remote.isSuccess(msg);
        Object.keys(msg.data.items).map(key=>{
            console.log(JSON.stringify(msg.data.items[key]));
        });
    });
})

