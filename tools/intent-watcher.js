// tools/intent-watcher.js
// Usage: node tools/intent-watcher.js create --summary "Update hero button" --paths "src/components/Hero.jsx,src/styles/hero.css" --priority P1
// Or run with --watch to watch a folder and auto-create intents on change.

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { execSync } = require('child_process');

function writeIntent({ summary, paths, owner = 'human', priority = 'P2' }) {
    const id = `intent-${Date.now()}`;
    const obj = {
        id,
        summary,
        owner,
        priority,
        changed_paths: paths.split(',').map(p => p.trim()),
        requested_at: new Date().toISOString()
    };
    const f = path.join(process.cwd(), '.artifacts', 'intents', `${id}.yaml`);
    fs.mkdirSync(path.dirname(f), { recursive: true });
    fs.writeFileSync(f, yaml.dump(obj), 'utf8');
    console.log('Wrote intent:', f);
    // optionally commit or notify via your preferred channel
}

const argv = require('minimist')(process.argv.slice(2));
if (argv.create) {
    writeIntent({ summary: argv.summary || 'manual intent', paths: argv.paths || '' });
} else if (argv.watch) {
    const chokidar = require('chokidar');
    const watchPath = argv.path || 'src';
    const watcher = chokidar.watch(watchPath, { ignoreInitial: true });
    watcher.on('all', (ev, p) => {
        console.log(ev, p);
        writeIntent({ summary: `Change detected: ${p}`, paths: p });
    });
    console.log('Watching', watchPath);
} else {
    console.log('Usage: --create or --watch');
}
