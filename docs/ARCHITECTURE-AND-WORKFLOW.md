# Architecture & Operational Workflow (`vantages-ai/governance-evidence`)

> **Role in VOS Acta V4:** Your AI System's Verifiable Evidence Dossier Template  
> **Companion Engine:** [`vantages-ai/acta-remix`](https://github.com/vantages-ai/acta-remix) (The 55-Recipe Remediation & Incident Triage Hub)

---

## 1. Purpose & Audience (`governance-evidence` vs `acta-remix`)

| Dimension | `vantages-ai/governance-evidence` (This Repository) | `vantages-ai/acta-remix` (Companion Hub) |
| :--- | :--- | :--- |
| **Role** | Public **starter evidence template** cloned by each AI deployer or project (`Use this template`). | Public **remediation catalog & incident triage hub** linking statutory gaps to deterministic patches. |
| **Target Audience** | AI Deployers, CTOs, DPOs, CROs, and Compliance Engineers assembling system evidence. | Platform Engineers, Security Auditors, and `emdash-bot` / `Acta Room` reviewers. |
| **Outputs** | Structured manifests (`agent.json`, `gbom.json`), Annex IV / Art. 9 / Art. 14 records, and `checks 7/7` CI proofs. | 55 canonical Cookbook manifests (`recipes/catalog-55.json`), gap issue templates, and Remix PR workflows. |

---

## 2. File & Schema Reference

- **`agent.json`** *(validated by [`schemas/agent.v1.schema.json`](../schemas/agent.v1.schema.json))*: Declares `app_id`, `organization`, `canonical_url`, `jurisdictions` (`eu`, `us`, `global`), `risk_tier`, `oversight_mode`, and `approvals_policy`.
- **`gbom.json`** *(validated by [`schemas/gbom.v1.schema.json`](../schemas/gbom.v1.schema.json))*: Governance Bill of Materials declaring `models`, `datasets`, `mcp_tools`, `negative_fact_disclosures` (`NOT_CHECKED`), and `rfc8785_canonical_sha256`.
- **`.well-known/poppy.json`**: Discovery descriptor (`schema: "poppy/0.1"`) linking endpoint readiness probes from `https://vantages.app/scan`.
- **`annex-iv/annex-iv-template.md`**: EU AI Act Article 11 & Annex IV + ISO/IEC 42001 technical documentation starter structure.
- **`risk-assessment/`**: `risk-register-template.json` (`vos.risk_register.v1`) and `adversarial-evaluation-template.md` for Article 9 & NIST AI RMF risk evaluations.
- **`oversight/article-14-signoff-log.json`**: Structured human oversight register (`vos.art14_oversight_log.v1`) requiring Chamber Reviewer `role_level >= 40`.
- **`receipts/rfc8785-receipt-example.json`**: Reference receipt structure (`vos.rfc8785_evidence_receipt.v1`) pointing to verification portals (`https://proof.vantages.app/seals/...`).
- **`.acta/cookbook/` & `evidence/remediation/`**: Standardized target directories populated automatically when [`vantages-ai/acta-remix`](https://github.com/vantages-ai/acta-remix) compiles a Cookbook Remix Pull Request (`vos.acta_cookbook_control.v1`).

---

## 3. How Deterministic `checks 7/7` Works

Running `node scripts/verify-governance-evidence.mjs` locally (or via `.github/workflows/acta-evidence-checks.yml` on every push and Pull Request) executes seven zero-dependency verification gates:

1. **`CHK-01` (`agent-manifest`):** Validates `agent.json` fields (`app_id`, `jurisdictions`, `oversight_mode`) and `.well-known/poppy.json` (`poppy/0.1`).
2. **`CHK-02` (`gbom-negative-facts`):** Validates `gbom.json` (`vos.gbom.v1`) and requires at least one explicit `NOT_CHECKED` negative-fact disclosure.
3. **`CHK-03` (`annex-iv-and-risk`):** Confirms `docs/ARCHITECTURE-AND-WORKFLOW.md`, `annex-iv/annex-iv-template.md`, `risk-assessment/risk-register-template.json`, and `adversarial-evaluation-template.md` exist and meet minimum completeness thresholds.
4. **`CHK-04` (`art14-oversight-log`):** Validates `oversight/article-14-signoff-log.json` and enforces `role_level >= 40` on reviewer signoff records.
5. **`CHK-05` (`cookbook-patch-coherence`):** Validates JSON Schemas (`schemas/*.schema.json`), patch target folders (`.acta/cookbook/`, `evidence/remediation/`), and any applied `.acta/cookbook/*.json` control manifests.
6. **`CHK-06` (`rfc8785-digest-shape`):** Validates `receipts/rfc8785-receipt-example.json` and computes a live RFC 8785 canonical JSON (JCS) SHA-256 digest over `agent.json` + `gbom.json`.
7. **`CHK-07` (`zero-secrets-safe-copy`):** Scans repository files to block leaked tokens/private keys and prohibited legal-certification claims.

When a Remix PR passes all seven checks (`7/7 PASS`), GitHub `check_suite` / `workflow_run` telemetry advances the linked ticket on [`https://vantages.app/bot`](https://vantages.app/bot) to **`Ready for Notary Seal`**.

---

## 4. Six-Stage Notarial Docket (`E1 .. E6`) & Runtime Drift Interlock

1. **`E1_INTAKE` -> `E2_EVIDENCE_MAP` -> `E3_REMEDIATION`:** System evidence is mapped against statutory obligations and missing controls are patched via Cookbook Remix PRs.
2. **`E4_ART14_OVERSIGHT`:** An accredited Partner Chamber (`Role >= 40`) reviews the evidence dossier and signs off under Article 14 human oversight (`@moorage.dev/approvals`).
3. **`E5_PQC_SEALING` -> `E6_HANDOVER`:** Root Notary countersigns with `Ed25519 + NIST FIPS 204 ML-DSA-65` and issues a Living Passport (`https://vantages.app/showcase/<app_id>`).
4. **Runtime Drift (`VOIDED_ON_DRIFT`):** If deployed manifests diverge from the anchored RFC 8785 digest without human re-review, the edge badge fails closed to `VOIDED_ON_DRIFT` until re-verified.

---

> **Non-Legal Attestation Notice:** Template manifests, CI checks, and cryptographic seals provide tamper-evident process attestation, not legal certification. Human stewards remain solely accountable.
