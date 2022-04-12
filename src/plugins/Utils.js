        
module.exports = {
    getAllFilesFromFolder:function(dir) {
        const fs = require('fs')
        let results = [];
        const origin = dir;

        fs.readdirSync(dir).forEach(function(file) {
            file = dir+'/'+file;
            let stat = fs.statSync(file);
            
            if (stat && stat.isDirectory()) {
                results = results.concat(module.exports.getAllFilesFromFolder(file))
            } else { 
                results.push(file);
            }
        });
        return results;
    }
}
  