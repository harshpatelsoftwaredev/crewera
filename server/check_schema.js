const fs = require('fs');
const pool = require('./src/config/database');

async function test() {
    let output = '';
    const log = (msg) => { output += msg + '\n'; };

    try {
        const [cats] = await pool.query('SELECT * FROM media_categories ORDER BY id');
        log('=== media_categories ===');
        cats.forEach(r => log('  ID: ' + r.id + ' | Name: ' + r.category_name + ' | Extensions: ' + r.allowed_extensions));

        fs.writeFileSync('test_results.txt', output);
        console.log('Done');
        process.exit();
    } catch (err) {
        log('Error: ' + err.message);
        fs.writeFileSync('test_results.txt', output);
        process.exit(1);
    }
}
test();
