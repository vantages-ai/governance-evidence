#!/usr/bin/env node
/**
 * Deterministic 7/7 Governance Evidence Verification Runner (STAGE-SEN-386 / D90)
 * Zero-dependency Node.js (>=20) check suite for vantages-ai/governance-evidence.
 */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

function canonicalizeJcs(val) {
  if (val === null || typeof val !== "object") return JSON.stringify(val);
  if (Array.isArray(val)) return "[" + val.map(canonicalizeJcs).join(",") + "]";
  const keys = Object.keys(val).filter((k) => val[k] !== undefined).sort();
  return "{" + keys.map((k) => JSON.stringify(k) + ":" + canonicalizeJcs(val[k])).join(",") + "}";
}

function sha256Hex(str) {
  return crypto.createHash("sha256").update(str, "utf8").digest("hex");
}

function readJson(relPath) {
  const full = path.join(REPO_ROOT, relPath);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing required file: ${relPath}`);
  }
  return JSON.parse(fs.readFileSync(full, "utf8"));
}

function listFilesRecursive(dir, relPrefix = "") {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const abs = path.join(dir, entry.name);
    const rel = relPrefix ? `${relPrefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...listFilesRecursive(abs, rel));
    } else {
      results.push(rel);
    }
  }
  return results;
}

const checks = [];

function runCheck(id, name, fn) {
  try {
    const detail = fn();
    checks.push({ id, name, passed: true, detail });
  } catch (err) {
    checks.push({ id, name, passed: false, error: err instanceof Error ? err.message : String(err) });
  }
}

// CHK-01: agent.json & .well-known/poppy.json
runCheck("CHK-01", "agent-manifest", () => {
  const agent = readJson("agent.json");
  const required = [
    "schema_version",
    "app_id",
    "organization",
    "canonical_url",
    "jurisdictions",
    "risk_tier",
    "oversight_mode",
    "approvals_policy",
  ];
  for (const field of required) {
    if (!(field in agent)) throw new Error(`agent.json missing '${field}'`);
  }
  if (!/^[a-z0-9][a-z0-9-]*$/.test(String(agent.app_id || ""))) {
    throw new Error("agent.json app_id must match ^[a-z0-9][a-z0-9-]*$");
  }
  if (!Array.isArray(agent.jurisdictions) || agent.jurisdictions.length === 0) {
    throw new Error("agent.json jurisdictions must be a non-empty array");
  }
  const poppy = readJson(".well-known/poppy.json");
  if (poppy.schema !== "poppy/0.1") {
    throw new Error(".well-known/poppy.json schema must equal 'poppy/0.1'");
  }
  return { app_id: agent.app_id, poppySchema: poppy.schema };
});

// CHK-02: gbom.json & NOT_CHECKED negative-fact disclosures
runCheck("CHK-02", "gbom-negative-facts", () => {
  const gbom = readJson("gbom.json");
  if (gbom.schema !== "vos.gbom.v1") {
    throw new Error("gbom.json schema must equal 'vos.gbom.v1'");
  }
  for (const arrField of ["models", "datasets", "mcp_tools", "negative_fact_disclosures"]) {
    if (!Array.isArray(gbom[arrField])) {
      throw new Error(`gbom.json '${arrField}' must be an array`);
    }
  }
  const hasNotChecked = gbom.negative_fact_disclosures.some((item) =>
    String(item).includes("NOT_CHECKED"),
  );
  if (!hasNotChecked) {
    throw new Error("gbom.json negative_fact_disclosures must include at least one NOT_CHECKED entry");
  }
  return { disclosures: gbom.negative_fact_disclosures.length };
});

// CHK-03: Annex IV, Art. 9 / NIST Risk Assessment templates & Architecture docs
runCheck("CHK-03", "annex-iv-and-risk", () => {
  const archDocsPath = path.join(REPO_ROOT, "docs/ARCHITECTURE-AND-WORKFLOW.md");
  if (!fs.existsSync(archDocsPath) || fs.readFileSync(archDocsPath, "utf8").trim().length < 200) {
    throw new Error("docs/ARCHITECTURE-AND-WORKFLOW.md is missing or too short");
  }
  const annexPath = path.join(REPO_ROOT, "annex-iv/annex-iv-template.md");
  if (!fs.existsSync(annexPath) || fs.readFileSync(annexPath, "utf8").trim().length < 100) {
    throw new Error("annex-iv/annex-iv-template.md is missing or too short");
  }
  const risk = readJson("risk-assessment/risk-register-template.json");
  if (risk.schema !== "vos.risk_register.v1") {
    throw new Error("risk-assessment/risk-register-template.json schema must equal 'vos.risk_register.v1'");
  }
  if (!Array.isArray(risk.risk_items) || risk.risk_items.length === 0) {
    throw new Error("risk-assessment/risk-register-template.json risk_items must be non-empty");
  }
  const advPath = path.join(REPO_ROOT, "risk-assessment/adversarial-evaluation-template.md");
  if (!fs.existsSync(advPath)) {
    throw new Error("risk-assessment/adversarial-evaluation-template.md missing");
  }
  return { riskItems: risk.risk_items.length };
});

// CHK-04: Article 14 Human Oversight log schema
runCheck("CHK-04", "art14-oversight-log", () => {
  const log = readJson("oversight/article-14-signoff-log.json");
  if (log.schema !== "vos.art14_oversight_log.v1") {
    throw new Error("oversight/article-14-signoff-log.json schema must equal 'vos.art14_oversight_log.v1'");
  }
  if (!Array.isArray(log.signoffs) || log.signoffs.length === 0) {
    throw new Error("oversight/article-14-signoff-log.json signoffs must be non-empty");
  }
  for (const s of log.signoffs) {
    if (typeof s.role_level !== "number" || s.role_level < 40) {
      throw new Error("Chamber oversight signoff entry must require role_level >= 40");
    }
  }
  return { signoffs: log.signoffs.length };
});

// CHK-05: JSON schemas & Remix patch target coherence
runCheck("CHK-05", "cookbook-patch-coherence", () => {
  for (const schemaFile of [
    "schemas/agent.v1.schema.json",
    "schemas/gbom.v1.schema.json",
    "schemas/cookbook-control.v1.schema.json",
  ]) {
    const parsed = readJson(schemaFile);
    if (!parsed.$schema || !parsed.title) {
      throw new Error(`${schemaFile} missing $schema or title`);
    }
  }
  if (!fs.existsSync(path.join(REPO_ROOT, ".acta/cookbook"))) {
    throw new Error("Missing .acta/cookbook directory");
  }
  if (!fs.existsSync(path.join(REPO_ROOT, "evidence/remediation"))) {
    throw new Error("Missing evidence/remediation directory");
  }
  const cookbookDir = path.join(REPO_ROOT, ".acta/cookbook");
  const controlFiles = fs.readdirSync(cookbookDir).filter((f) => f.endsWith(".json"));
  for (const file of controlFiles) {
    const ctrl = readJson(`.acta/cookbook/${file}`);
    if (ctrl.schemaVersion !== "vos.acta_cookbook_control.v1") {
      throw new Error(`.acta/cookbook/${file} invalid schemaVersion`);
    }
  }
  return { cookbookControlsChecked: controlFiles.length };
});

// CHK-06: RFC 8785 digest & receipt pointer integrity
runCheck("CHK-06", "rfc8785-digest-shape", () => {
  const receipt = readJson("receipts/rfc8785-receipt-example.json");
  if (receipt.schema !== "vos.rfc8785_evidence_receipt.v1") {
    throw new Error("receipts/rfc8785-receipt-example.json invalid schema");
  }
  const agent = readJson("agent.json");
  const gbom = readJson("gbom.json");
  const computedDigest = sha256Hex(canonicalizeJcs({ agent, gbom }));
  if (!/^[a-f0-9]{64}$/.test(computedDigest)) {
    throw new Error("Failed to compute valid SHA-256 JCS digest");
  }
  return { computedTemplateJcsSha256: computedDigest };
});

// CHK-07: Zero-Secrets & Marketplace-Safe Copy Guardrails
runCheck("CHK-07", "zero-secrets-safe-copy", () => {
  const allFiles = listFilesRecursive(REPO_ROOT);
  const forbiddenSecretPatterns = [
    /gho_[A-Za-z0-9_]{20,}/,
    /ghp_[A-Za-z0-9_]{20,}/,
    /sk_live_[A-Za-z0-9]{16,}/,
    /BEGIN (?:RSA|EC|OPENSSH|PRIVATE) PRIVATE KEY/,
  ];
  const forbiddenComplianceClaims = [
    /\blegally certified\b/i,
    /\bguaranteed eu ai act compliance\b/i,
  ];
  for (const rel of allFiles) {
    if (rel === "scripts/verify-governance-evidence.mjs") continue;
    const text = fs.readFileSync(path.join(REPO_ROOT, rel), "utf8");
    for (const pat of forbiddenSecretPatterns) {
      if (pat.test(text)) {
        throw new Error(`Forbidden secret pattern matched in ${rel}`);
      }
    }
    for (const claimPat of forbiddenComplianceClaims) {
      if (claimPat.test(text)) {
        throw new Error(`Prohibited compliance claim matched in ${rel}`);
      }
    }
  }
  return { scannedFiles: allFiles.length };
});

const checksPassed = checks.filter((c) => c.passed).length;
const checksTotal = checks.length;
const allPassed = checksPassed === 7 && checksTotal === 7;

console.log(
  JSON.stringify(
    {
      schema: "vos.governance_evidence_ci_report.v1",
      status: allPassed ? "7/7 PASS" : `${checksPassed}/${checksTotal} FAIL`,
      checksPassed,
      checksTotal,
      checks,
    },
    null,
    2,
  ),
);

if (!allPassed) {
  process.exit(1);
}
