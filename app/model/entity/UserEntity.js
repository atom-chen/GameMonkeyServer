const facade = require('gamecloud')
let BaseUserEntity = facade.BaseUserEntity

/**
 * 用户角色类，继承自框架的UserBaseEntity
 */
class UserEntity extends BaseUserEntity
{
	constructor(user, core){
        super(user, core);
    }
}

exports = module.exports = UserEntity