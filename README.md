# VOS Acta AI Governance Evidence Template

[![VOS Acta Sigil Status](https://vantages.app/api/sigil/governance-evidence.svg)](https://vantages.app/showcase/governance-evidence)

> **Your AI System's Verifiable Evidence Dossier.**  
> Official public starter template for AI systems governed under **VOS Acta V4** (`AIActs CMS` / `Acta Room` and federated `ChamberCMS` oversight across **EU AI Act**, **US NIST AI RMF**, and **ISO/IEC 42001**).

---

## What This Repository Does (vs. `vantages-ai/acta-remix`)

- **`vantages-ai/governance-evidence` (This Template):** Lives inside **your** project or organization. It stores your system's identity (`agent.json`), Governance Bill of Materials (`gbom.json`), Annex IV technical documentation, Article 9 risk registers, Article 14 human signoff logs, and a deterministic **`checks 7/7`** verification suite.
- **[`vantages-ai/acta-remix`](https://github.com/vantages-ai/acta-remix) (The Remediation Engine):** Hosts the **55 canonical Cookbook remediation recipes** and issue-triage workflows powering [`https://vantages.app/bot`](https://vantages.app/bot). When a gap is detected, `acta-remix` generates deterministic Pull Requests directly into `.acta/cookbook/` and `evidence/remediation/` inside your repository.

---

## Repository Structure

```text
governance-evidence/
├── .acta/cookbook/                          # Target directory for Cookbook Remix control patches
├── .github/workflows/acta-evidence-checks.yml  # Deterministic 7/7 GitHub Actions CI gate
├── .well-known/poppy.json                   # Poppy 0.1 AI discovery manifest for /scan
├── docs/ARCHITECTURE-AND-WORKFLOW.md        # Detailed operational & 6-stage docket guide
├── evidence/remediation/                    # Target directory for Remix remediation evidence
├── schemas/                                 # JSON Schemas (agent.v1, gbom.v1, cookbook-control.v1)
├── scripts/verify-governance-evidence.mjs   # Zero-dependency Node.js 7/7 local & CI verifier
├── annex-iv/                                # EU AI Act Annex IV & ISO/IEC 42001 templates
├── risk-assessment/                         # Article 9 & NIST AI RMF risk & adversarial records
├── oversight/                               # Article 14 human-in-the-loop signoff log template
├── receipts/                                # RFC 8785 & NIST FIPS 204 ML-DSA-65 proof pointers
├── agent.json                               # System identity, risk tier, and oversight mode
└── gbom.json                                # Models, datasets, MCP tools, NOT_CHECKED & digest
```

---

## Quick Start

1. **Create your evidence repository:** Click **Use this template** on GitHub (`https://github.com/vantages-ai/governance-evidence`) or link an optional repository when opening an **Acta Room** in VOS Acta.
2. **Declare your system:** Populate `agent.json`, `gbom.json`, and `.well-known/poppy.json` for your AI application or agent endpoint.
3. **Run local `checks 7/7` verification (Node.js >= 20, zero dependencies):**
   ```bash
   node scripts/verify-governance-evidence.mjs
   ```
4. **Scan & Remediate:**
   - Run a free live diagnostic at [`https://vantages.app/scan`](https://vantages.app/scan).
   - Route detected gaps to [`vantages-ai/acta-remix`](https://github.com/vantages-ai/acta-remix) (`https://vantages.app/bot`) for Cookbook-backed Remix Pull Requests.
   - Request a **48h AIActs Evidence Review (`EUR 850`)** at [`https://vantages.app/evidence-review`](https://vantages.app/evidence-review) for accredited Chamber Article 14 oversight and dual-signature PQC sealing.
5. **Read Full Documentation:** See [`docs/ARCHITECTURE-AND-WORKFLOW.md`](./docs/ARCHITECTURE-AND-WORKFLOW.md).

---

## Disclosure & Accountability

- **Works without:** External third-party SaaS wallets or mandatory public GitHub account linkage (Shared `Acta Rooms` operate natively on VOS D1 with court-admissible receipts anchored in our private Notary Registry).
- **Optional:** Linking a repository created from this template (`client_github_repo`) enables automated `acta-remix` Pull Requests and GitHub Actions `checks 7/7` verification.
- **Requires:** Human steward review (`Role >= 40` / Article 14 oversight) for seal issuance; runtime drift against the anchored RFC 8785 digest switches public badges fail-closed to `VOIDED_ON_DRIFT`.

> **Non-Legal Attestation Notice:** Process evidence receipts, deterministic CI checks, and cryptographic seals provide tamper-evident process attestation, not legal certification. Human stewards remain solely accountable.
