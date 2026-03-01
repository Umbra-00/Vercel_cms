const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const chokidar = require('chokidar');

const ARTIFACTS_DIR = path.join(process.cwd(), '.artifacts');
const INTENTS_DIR = path.join(ARTIFACTS_DIR, 'intents');
const IMPACT_DIR = path.join(ARTIFACTS_DIR, 'impact');
const LOGS_DIR = path.join(ARTIFACTS_DIR, 'logs');
const ESCALATIONS_DIR = path.join(ARTIFACTS_DIR, 'escalations');
const APPROVED_DIR = path.join(ARTIFACTS_DIR, 'approved');

const LOG_FILE = path.join(LOGS_DIR, 'coordinator.log');

const AGENTS = ['ui_ux', 'frontend', 'performance', 'qa'];

// Ensure directories exist
[INTENTS_DIR, IMPACT_DIR, LOGS_DIR, ESCALATIONS_DIR, APPROVED_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

function log(message) {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(LOG_FILE, logEntry);
    console.log(logEntry.trim());
}

function getIntentIdFromFilename(filename) {
    return path.basename(filename, path.extname(filename));
}

function handleNewIntent(filePath) {
    const intentId = getIntentIdFromFilename(filePath);
    const assignedFile = path.join(IMPACT_DIR, `${intentId}-assigned.json`);

    if (fs.existsSync(assignedFile)) {
        return; // Already assigned
    }

    try {
        const intentContent = fs.readFileSync(filePath, 'utf8');
        const intent = yaml.load(intentContent);

        const assignment = {
            intent_id: intentId,
            assigned_agents: AGENTS,
            status: 'pending_impact',
            timestamp: new Date().toISOString()
        };

        fs.writeFileSync(assignedFile, JSON.stringify(assignment, null, 2));
        log(`Published assignment for ${intentId} to ${AGENTS.join(', ')}`);
    } catch (err) {
        log(`Error processing intent ${intentId}: ${err.message}`);
    }
}

async function readJsonWithRetry(filePath, retries = 3, delay = 100) {
    for (let i = 0; i < retries; i++) {
        try {
            const content = fs.readFileSync(filePath, 'utf8');
            if (!content) throw new Error('Empty file');
            return JSON.parse(content);
        } catch (err) {
            if (i === retries - 1) throw err;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

async function checkQuorum(intentId) {
    // Check if already approved or escalated
    if (fs.existsSync(path.join(APPROVED_DIR, `${intentId}-approved.json`))) return;
    if (fs.existsSync(path.join(ESCALATIONS_DIR, `${intentId}-escalation.json`))) return;

    let approvals = 0;
    let blockers = [];

    for (const agent of AGENTS) {
        const agentFile = path.join(IMPACT_DIR, `${intentId}-${agent}.json`);
        if (fs.existsSync(agentFile)) {
            try {
                const impact = await readJsonWithRetry(agentFile);

                if (impact.approve === false) {
                    blockers.push(`${agent} rejected`);
                } else if (impact.risk === 'high') {
                    blockers.push(`${agent} flagged high risk`);
                } else if (impact.approve === true) {
                    approvals++;
                }
            } catch (err) {
                log(`Error reading impact from ${agent} for ${intentId}: ${err.message}`);
            }
        }
    }

    if (blockers.length > 0) {
        // Escalate
        const escalation = {
            intent_id: intentId,
            reason: 'Blockers detected',
            details: blockers,
            timestamp: new Date().toISOString()
        };
        fs.writeFileSync(path.join(ESCALATIONS_DIR, `${intentId}-escalation.json`), JSON.stringify(escalation, null, 2));
        log(`Escalated intent ${intentId}: ${blockers.join(', ')}`);
        // Notify human (simulated by log)
    } else if (approvals >= 3) {
        // Quorum reached
        const approved = {
            intent_id: intentId,
            status: 'approved',
            timestamp: new Date().toISOString()
        };
        fs.writeFileSync(path.join(APPROVED_DIR, `${intentId}-approved.json`), JSON.stringify(approved, null, 2));

        log(`Quorum reached for ${intentId} (${approvals} approvals).`);

        // Instruct acting agent
        log(`INSTRUCTION: Acting agent (owner) for ${intentId} must now:`);
        log(`  1. Create branch feature/${intentId}`);
        log(`  2. Apply changes`);
        log(`  3. Run tests`);
        log(`  4. Build`);
        log(`  5. Open PR (do not merge)`);
    }
}

// Watch for new intents
const intentWatcher = chokidar.watch(INTENTS_DIR, { ignoreInitial: false });
intentWatcher.on('add', (filePath) => {
    if (path.extname(filePath) === '.yaml') {
        handleNewIntent(filePath);
    }
});

// Watch for impact artifacts
const impactWatcher = chokidar.watch(IMPACT_DIR, { ignoreInitial: false });
impactWatcher.on('add', (filePath) => {
    const filename = path.basename(filePath);
    if (filename.endsWith('-assigned.json')) return;

    const agent = AGENTS.find(a => filename.endsWith(`-${a}.json`));
    if (agent) {
        const suffix = `-${agent}.json`;
        if (filename.endsWith(suffix)) {
            const intentId = filename.substring(0, filename.length - suffix.length);
            checkQuorum(intentId);
        }
    }
});
impactWatcher.on('change', (filePath) => {
    const filename = path.basename(filePath);
    if (filename.endsWith('-assigned.json')) return;
    const agent = AGENTS.find(a => filename.endsWith(`-${a}.json`));
    if (agent) {
        const suffix = `-${agent}.json`;
        if (filename.endsWith(suffix)) {
            const intentId = filename.substring(0, filename.length - suffix.length);
            checkQuorum(intentId);
        }
    }
});

log('Coordinator started. Watching for intents and impact artifacts...');
