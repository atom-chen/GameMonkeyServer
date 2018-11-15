let remote = require('../util')
let {wait} = require('../utils/commonFunc')

describe('聊天', function() {
    it('两个用户私聊', async () => {
        let userList = ["777.492", "777.493"];
        let remoteList = [remote.newone, remote.newone];

        let ret = await Promise.all([
            new Promise(resolve => { remoteList[0].login({openid: userList[0]}).then(msg => { resolve({id:remoteList[0].userInfo.id, openid:userList[0]}); });}),
            new Promise(resolve => { remoteList[1].login({openid: userList[1]}).then(msg => { resolve({id:remoteList[1].userInfo.id, openid:userList[1]}); });}),
        ]);

        remoteList[1].watch(msg => {
            console.log(msg);
        }, remote.NotifyType.chat);

        await remoteList[0].fetching({url:`q?act=102001&nid=${ret[1].id}&c=hello`});
    });

    //注意：当前系统设定，要求两个用户必须同服
    it('世界聊天', async () => {
        let users = ["777.492", "777.493"];
        let remotes = [remote.newone, remote.newone];
        let msg = await remotes[1].watch(msg=>{
            remotes[1].log(msg);
        }, remote.NotifyType.chat).login({openid: users[1]});

        msg = await remotes[0].login({openid: users[0]});
        await remotes[0].fetching({url:'q?act=102001&c=hello'});
    });

    it('收到系统公告', async () => {
        let msg = await remote.watch(msg=>{
            remote.log(msg);
        }, remote.NotifyType.chat).login();
        remote.isSuccess(msg,true);
    });
});
