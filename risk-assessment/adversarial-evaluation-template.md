# Adversarial Evaluation & Robustness Template (EU AI Act Art. 9 & Art. 15 / NIST AI RMF)

> **Status:** `DRAFT_UNSEALED_TEMPLATE` — Populate with deterministic evaluation logs before Chamber submission.

## 1. Evaluation Scope & Boundaries
- **Target `app_id`:** `governance-evidence-template`
- **Risk Tier:** `high_risk_candidate`
- **Test Harness:** Deterministic CI verification (`scripts/verify-governance-evidence.mjs`) + domain-specific evaluation suite.

## 2. Robustness & Refusal Boundary Checks
- **Prompt Injection / Boundary Halts:** Document refusal receipt evidence (`proof_issue_refusal_receipt`).
- **Drift & Integrity Verification:** Document RFC 8785 canonical hash verification checks.

## 3. Mandatory `NOT_CHECKED` Negative-Fact Disclosures
- `NOT_CHECKED`: Third-party foundation model pre-training corpora and external SaaS model weights are excluded from local repository inspection.
