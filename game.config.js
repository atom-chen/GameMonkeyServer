/**
 * Created by liub on 2017-04-03.
 */
module.exports = {
    "servers":{
        "Index":{
            "1":{
                "debug": true,              //本地测试模式
                "UrlHead": "http",          //协议选择: http/https
                "MaxConnection": 3000,      //最大并发连接
                "MaxRegister": 12000,       //单服最大注册用户数
                "PoolMax": 500,             //最大数据库并发连接
                "game_secret": "055c269fb1a866163c970d5b7f979f1c",
                "game_name": "鸡小德",
                "clientPath": "./web/client",
                "adminPath": "./web/admin",
                "redis": {
                    "host": "127.0.0.1",
                    "port": 6379,
                    "opts": {}
                },
                "mysql": {
                    "logging" : false,
                    "db": "monkey",
                    "sa": "root",
                    "pwd": "helloworld",
                    "host": "127.0.0.1",
                    "port": 3306
                },
                "webserver": {
                    "mapping": "127.0.0.1",
                    "host": "127.0.0.1",
                    "port": 9901
                },
                "auth": {
                    "openid": "18681223392",
                    "openkey": "18681223392",
                    "domain": "tx.IOS",
                    "tokenExp": 600,
                    "sessionExp": 7200,
                    "pf": "wanba_ts"
                },
                "admin":{
                    "role":{
                        "default": "chick.server",
                        "system": "chick.server"
                    },
                    "game_secret": "055c269fb1a866163c970d5b7f979f1c"
                },
                "tx": {
                    "appid": "1105943531",
                    "appkey": "jzcfa29fmMS8F4J8&",
                    "pay_appid": "1450011656",
                    "pay_appkey": "l6LZfrwgKYO2KcJ6k6xAiZ5OqhMyIMNk&",
                    "reportApiUrl": "http://tencentlog.com",
                    "openApiUrl": "https://api.urlshare.cn",
                    "openApiUrlWithPay":"https://api.urlshare.cn"
                },
                "360":{
                    "appid":"203500811",
                    "game_key": "f075d0f4cab79b4df2ff690b4e0d96c4",
                    "game_secret": "055c269fb1a866163c970d5b7f979f1c"
                }
            }
        },
        "Image":{ //新增图片服务器
            "1":{
                "mysql": {
                    "logging" : false,
                    "db": "monkey",
                    "sa": "root",
                    "pwd": "helloworld",
                    "host": "127.0.0.1",
                    "port": 3306
                },
                "webserver": {
                    "mapping": "127.0.0.1",
                    "host": "127.0.0.1",
                    "port": 9401
                }
            }
        },
        "IOS":{
            "1":{
                "mysql": {
                    "logging" : false,
                    "db": "monkey",
                    "sa": "root",
                    "pwd": "helloworld",
                    "host": "127.0.0.1",
                    "port": 3306
                },
                "webserver": {
                    "mapping": "127.0.0.1",
                    "host": "127.0.0.1",
                    "port": 9101
                }
            }
        }
    },
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    "apps" : [
        {
            "name"      : "Chick_Index_1",
            "script"    : "app/start.js",
            "cwd"         : "./",  // pm2运行目录相对main.js的路径
            //"out_file"   : "./logs/index1/app-out.log",  // 普通日志路径
            "error_file" : "./logs/index1/app-err.log",  // 错误日志路径
            "env": {
                "NODE_ENV": "production",
                "sys":{
                    "serverType":"Index",
                    "serverId":1
                }
            }
        }
        ,{
            "name"      : "Chick_IOS_1",
            "script"    : "app/start.js",
            "cwd"         : "./",  // pm2运行目录相对main.js的路径
            //"out_file"   : "./logs/ios1/app-out.log",  // 普通日志路径
            "error_file" : "./logs/ios1/app-err.log",  // 错误日志路径
            "env": {
                "NODE_ENV": "production",
                "sys":{
                    "serverType":"IOS",
                    "serverId":1
                }
            }
        }
    ]
}
