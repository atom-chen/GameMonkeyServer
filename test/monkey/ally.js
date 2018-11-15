let remote = require('../util')

describe('联盟', function() {
    it('ally create', async () => {
        let msg = await remote.login();
        msg = await remote.fetching({url:`q?act=777001&oper=3`});
        console.dir(msg.data);
    });
});
