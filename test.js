const bcrypt = require('bcrypt-node');

let password = 'super secret';

console.time('make hash')

bcrypt.genSalt(11, (err, salt) => {
  bcrypt.hash(password, salt, null, (err, hash) => {
    console.log ('hash:', hash);
    console.timeEnd('make hash')

    bcrypt.compare(password, hash, (err, res) => {
      console.log ('err:', err);
      console.log ('res:', res);
    })
  })
})
