#!/usr/bin/env node
// Build the static export and deploy it to Hostinger over SSH.
//
//   npm run deploy
//
// Requires an SSH host alias (default "teleemon") with key-based login in
// ~/.ssh/config. Override with DEPLOY_HOST / DEPLOY_PATH env vars.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const host = process.env.DEPLOY_HOST || "teleemon";
const remoteDir = process.env.DEPLOY_PATH || "domains/teleemon.com/public_html";
const keepBackups = 5;

const outDir = path.join(root, "out");
const sshOpts = ["-o", "BatchMode=yes", "-o", "ConnectTimeout=20"];

function step(msg) {
  console.log(`\n==> ${msg}`);
}

function run(cmd, args, opts = {}) {
  const res = spawnSync(cmd, args, { cwd: root, stdio: "inherit", ...opts });
  if (res.status !== 0) {
    throw new Error(`${[cmd, ...args].join(" ")} failed (exit ${res.status ?? res.error})`);
  }
}

function ssh(command) {
  run("ssh", [...sshOpts, host, command]);
}

function build() {
  rmSync(outDir, { recursive: true, force: true });
  // STATIC_EXPORT makes next.config.ts skip the API route handlers.
  run("npm run build", [], {
    shell: true,
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  if (!existsSync(path.join(outDir, "index.html"))) {
    throw new Error("Build finished but out/index.html is missing.");
  }
}

function upload() {
  return new Promise((resolve, reject) => {
    const tar = spawn("tar", ["czf", "-", "-C", "out", "."], {
      cwd: root,
      stdio: ["ignore", "pipe", "inherit"],
    });
    const remote = spawn("ssh", [...sshOpts, host, `tar xzf - -C ~/${remoteDir}`], {
      stdio: ["pipe", "inherit", "inherit"],
    });
    tar.stdout.pipe(remote.stdin);

    let tarCode;
    tar.on("error", reject);
    remote.on("error", reject);
    tar.on("close", (code) => (tarCode = code));
    remote.on("close", (code) => {
      if (tarCode === 0 && code === 0) resolve();
      else reject(new Error(`Upload failed (tar exit ${tarCode}, ssh exit ${code})`));
    });
  });
}

async function main() {
  const dirty = spawnSync("git", ["status", "--porcelain"], { cwd: root, encoding: "utf8" });
  if (dirty.stdout?.trim()) {
    console.warn("Warning: you have uncommitted changes; they will be deployed too.");
  }

  step(`Checking SSH access to ${host}`);
  ssh(`test -d ~/${remoteDir}`);

  step("Building static export");
  build();

  step("Backing up live site on server");
  const parent = path.posix.dirname(remoteDir);
  const base = path.posix.basename(remoteDir);
  ssh(
    `cd ~/${parent} && tar czf ~/public_html-backup-$(date +%Y%m%d-%H%M%S).tar.gz ${base}` +
      ` && ls -1t ~/public_html-backup-*.tar.gz | tail -n +${keepBackups + 1} | xargs -r rm -f`,
  );

  step("Uploading build");
  await upload();

  console.log(`\nDeployed to ${host}:~/${remoteDir}`);
}

main().catch((err) => {
  console.error(`\nDeploy failed: ${err.message}`);
  process.exit(1);
});
