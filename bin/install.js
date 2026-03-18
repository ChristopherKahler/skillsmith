#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');

// Colors
const green = '\x1b[32m';
const cyan = '\x1b[36m';
const yellow = '\x1b[33m';
const dim = '\x1b[2m';
const reset = '\x1b[0m';

// Get version from package.json
const pkg = require('../package.json');

const banner = `
${cyan}  ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗███╗   ███╗██╗████████╗██╗  ██╗
  ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝████╗ ████║██║╚══██╔══╝██║  ██║
  ███████╗█████╔╝ ██║██║     ██║     ███████╗██╔████╔██║██║   ██║   ███████║
  ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║██║╚██╔╝██║██║   ██║   ██╔══██║
  ███████║██║  ██╗██║███████╗███████╗███████║██║ ╚═╝ ██║██║   ██║   ██║  ██║
  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝╚═╝     ╚═╝╚═╝   ╚═╝   ╚═╝  ╚═╝${reset}

  Skillsmith ${dim}v${pkg.version}${reset}
  Build consistent Claude Code skills
`;

// Parse args
const args = process.argv.slice(2);
const hasHelp = args.includes('--help') || args.includes('-h');
const hasLocal = args.includes('--local') || args.includes('-l');

// Parse --config-dir argument
function parseConfigDirArg() {
  const idx = args.findIndex(arg => arg === '--config-dir' || arg === '-c');
  if (idx !== -1) {
    const nextArg = args[idx + 1];
    if (!nextArg || nextArg.startsWith('-')) {
      console.error(`  ${yellow}--config-dir requires a path argument${reset}`);
      process.exit(1);
    }
    return nextArg;
  }
  const configDirArg = args.find(arg => arg.startsWith('--config-dir=') || arg.startsWith('-c='));
  if (configDirArg) {
    return configDirArg.split('=')[1];
  }
  return null;
}

/**
 * Expand ~ to home directory
 */
function expandTilde(filePath) {
  if (filePath && filePath.startsWith('~/')) {
    return path.join(os.homedir(), filePath.slice(2));
  }
  return filePath;
}

/**
 * Recursively copy directory, skipping excluded dirs
 */
function copyDir(srcDir, destDir, skipDirs = []) {
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (skipDirs.includes(entry.name)) continue;
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath, skipDirs);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Count files recursively
 */
function countFiles(dir, ext) {
  let count = 0;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      count += countFiles(fullPath, ext);
    } else if (!ext || entry.name.endsWith(ext)) {
      count++;
    }
  }
  return count;
}

console.log(banner);

// Show help
if (hasHelp) {
  console.log(`  ${yellow}Usage:${reset} npx @chrisai/skillsmith [options]

  ${yellow}Options:${reset}
    ${cyan}-l, --local${reset}              Install to ./.claude/commands/ instead of global
    ${cyan}-c, --config-dir <path>${reset}  Specify custom Claude config directory
    ${cyan}-h, --help${reset}               Show this help message

  ${yellow}Examples:${reset}
    ${dim}# Install globally (default) — available in all workspaces${reset}
    npx @chrisai/skillsmith

    ${dim}# Install to current project only${reset}
    npx @chrisai/skillsmith --local

  ${yellow}What gets installed:${reset}
    ${cyan}commands/skillsmith/${reset}
      skillsmith.md        Entry point (routing + persona)
      tasks/               4 task files (discover, scaffold, distill, audit)
      rules/               6 authoring rule files
      templates/           Skill spec output template
    ${cyan}skillsmith-specs/${reset}
      7 syntax specification files (entry-point, tasks, templates, etc.)
`);
  process.exit(0);
}

// Determine install target
const explicitConfigDir = parseConfigDirArg();
const configDir = expandTilde(explicitConfigDir) || expandTilde(process.env.CLAUDE_CONFIG_DIR);
const globalDir = configDir || path.join(os.homedir(), '.claude');
const claudeDir = hasLocal ? path.join(process.cwd(), '.claude') : globalDir;
const skillDest = path.join(claudeDir, 'commands', 'skillsmith');
const specsDest = path.join(claudeDir, 'skillsmith-specs');

const locationLabel = hasLocal
  ? claudeDir.replace(process.cwd(), '.') + '/'
  : claudeDir.replace(os.homedir(), '~') + '/';

// Check if already installed
if (fs.existsSync(skillDest)) {
  console.log(`  ${yellow}Existing installation found${reset}`);
  console.log(`  Updating...\n`);
  fs.rmSync(skillDest, { recursive: true, force: true });
}
if (fs.existsSync(specsDest)) {
  fs.rmSync(specsDest, { recursive: true, force: true });
}

console.log(`  Installing to ${cyan}${locationLabel}${reset}\n`);

// Source directory (package root)
const src = path.join(__dirname, '..');
const skillSrc = path.join(src, 'skillsmith');

// Copy entry point
fs.mkdirSync(skillDest, { recursive: true });
fs.copyFileSync(path.join(skillSrc, 'skillsmith.md'), path.join(skillDest, 'skillsmith.md'));
console.log(`  ${green}+${reset} skillsmith.md ${dim}(entry point)${reset}`);

// Copy tasks
copyDir(path.join(skillSrc, 'tasks'), path.join(skillDest, 'tasks'));
const taskCount = countFiles(path.join(skillSrc, 'tasks'), '.md');
console.log(`  ${green}+${reset} tasks/ ${dim}(${taskCount} task files)${reset}`);

// Copy rules
copyDir(path.join(skillSrc, 'rules'), path.join(skillDest, 'rules'));
const ruleCount = countFiles(path.join(skillSrc, 'rules'), '.md');
console.log(`  ${green}+${reset} rules/ ${dim}(${ruleCount} authoring rules)${reset}`);

// Copy templates
copyDir(path.join(skillSrc, 'templates'), path.join(skillDest, 'templates'));
console.log(`  ${green}+${reset} templates/ ${dim}(skill spec template)${reset}`);

// Copy specs to separate location (referenced by tasks via @../specs/)
const specsSrc = path.join(src, 'specs');
copyDir(specsSrc, specsDest);
const specCount = countFiles(specsSrc, '.md');
console.log(`  ${green}+${reset} specs/ ${dim}(${specCount} syntax specifications)${reset}`);

// Rewrite @../specs/ references in task files to point to installed specs location
const tasksDir = path.join(skillDest, 'tasks');
const specRelPath = path.relative(tasksDir, specsDest).replace(/\\/g, '/');
const taskFiles = fs.readdirSync(tasksDir).filter(f => f.endsWith('.md'));
for (const file of taskFiles) {
  const filePath = path.join(tasksDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/@\.\.\/specs\//g, `@${specRelPath}/`);
  fs.writeFileSync(filePath, content);
}

// Also rewrite refs in the entry point routing section
const entryPath = path.join(skillDest, 'skillsmith.md');
let entryContent = fs.readFileSync(entryPath, 'utf8');
const specRelFromEntry = path.relative(skillDest, specsDest).replace(/\\/g, '/');
entryContent = entryContent.replace(/@specs\//g, `@${specRelFromEntry}/`);
fs.writeFileSync(entryPath, entryContent);

console.log(`
  ${green}Done!${reset} Open Claude Code and type ${cyan}/skillsmith${reset} to start.
`);
