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
    },

    getRandomNickname:function() {
        const { firstnames, lastnames } = require('./names.json');

		const rndint_f = Math.floor(Math.random() * firstnames.length);
		const rndint_l = Math.floor(Math.random() * lastnames.length);

        const firstname = firstnames[rndint_f].charAt(0).toUpperCase() + firstnames[rndint_f].slice(1);
        const lastname = lastnames[rndint_l].charAt(0).toUpperCase() + lastnames[rndint_l].slice(1);

		return firstname + " " + lastname;
	},

    getRandomPhoto:function() {
        const photos = this.getAllFilesFromFolder('./public/resources/images');
        const result = photos[Math.floor(Math.random() * photos.length)];

        return result.replace('./public/resources/images', '');
    },
}
  
