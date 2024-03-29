/**
 * 单元测试：排行榜
 * Creted by liub 2017.3.24
 *
 * only skip before after beforeEach afterEach
 */

let facade = require('gamecloud')
const remote = require('../util')
let {UserStatus, ActionExecuteType, NotifyType, ReturnCode} = facade.const;

let myOpenid = '18681223392';
let uh = `q?sessionid=${myOpenid}&domain=tx.IOS&`;

/**
 * 随机挑选并返回数组中的一个元素，不影响原数组
 * @param {Array} list 
 */
Array.prototype.randomElement = function($n=1){
    let ret = [];
    if(this.length == 0){
    }
    else if(this.length < $n){
        this.map(it=>{
            ret.push(it);
        });
    }
    else{
        while(ret.length < $n){
            let cur = this[(Math.random()*this.length | 0) % this.length];
            if(ret.indexOf(cur)==-1){
                ret.push(cur);
            }
        }
    }
    return ret;
}

describe('排行榜', function() {
    beforeEach(async () => {
        await remote.login();
    });

    it('排行榜 - 查询总榜', async () => {
        let msg = await remote.fetching({url:uh+"act=601001&oper=1"});
        remote.isSuccess(msg);

        console.log(msg.data.rank);
        msg.data.list.map(item=>{
            console.log(JSON.stringify(item));
        });
    });

    it('排行榜 - 查询竞技榜', async () => {
        let msg = await remote.fetching({url:uh+"act=601001&oper=2"});
        remote.isSuccess(msg);
    
        console.log(msg.data.rank);
        for(let item of msg.data.list){
            console.log(JSON.stringify(item));
        }

        // //随机挑选一个敌手
        // let enemy = msg.data.list.filter(item => item.id != myOpenid).randomElement()[0].id;
        // let fn = async () => {
        //     let msg = await remote.fetch({url:`${uh}act=502001&oper=6&gid=1&debug=1&id=${enemy}`});
        //     remote.isSuccess(msg,true);
        //     msg.data.operation.map(it => {
        //         console.log(it);
        //     });
        // }
        // setInterval(fn, 3000);
    });
    
    it('排行榜 - 查询好友榜', async () => {
        let msg = await remote.fetching({url:uh+"act=601001&oper=3"});
        remote.isSuccess(msg);

        console.log(msg.data.rank);
        msg.data.list.map(item=>{
            console.log(JSON.stringify(item));
        });
    });
});
