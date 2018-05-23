var shell = require('shelljs');
var fs = require("fs");
var path = require('path');

module.exports = {
    website: {
        assets: './assets',
        js: [
            'plugin.js'
        ],
        css: [
            'plugin.css'
        ]
    },

    hooks: {
        init: function(){
            var brachStr = shell.exec("git branch -r", {silent:true}).stdout;
            var re = /v\d+.\d.\d+/;
            var versions = brachStr.split('\n').filter(branch => re.test(branch));
            var currentVersion = versions.filter((version) => version.indexOf("*") != -1)[0];
            currentVersion = currentVersion.substring(currentVersion.search(re));
            versions = versions.map(version => version.substring(version.search(re)));
            this.config.values.pluginsConfig["versions"]["options"] = versions.map((version) => {
                return {
                    "text": version,
                    "value": `${this.config.values.pluginsConfig["versions"]["host"]}/${version}/`,
                    "selected": (currentVersion == version)
                }
            })
        }
    }
};
