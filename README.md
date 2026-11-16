# VOS Acta AI Governance Evidence Template

[![VOS Acta Sigil Status](https://vantages.app/api/sigil/governance-evidence.svg)](https://vantages.app/showcase/governance-evidence)

Official public evidence template repository for AI systems governed under **VOS Acta V4** (`AIActs CMS` / `Acta Room` and federated `ChamberCMS` oversight across EU AI Act, US NIST AI RMF, and ISO/IEC 42001).

---

## Repository Structure

```text
governance-evidence/
├── agent.json                # AI system / agent identity, risk tier, and oversight mode
├── gbom.json                 # Governance Bill of Materials (models, datasets, MCP tools, RFC 8785 digest)
├── annex-iv/                 # EU AI Act Annex IV & ISO/IEC 42001 technical documentation
├── risk-assessment/          # Article 9 & NIST AI RMF risk evaluation & adversarial test records
├── oversight/                # Article 14 human-in-the-loop & four-eyes approval logs
└── receipts/                 # RFC 8785 canonical receipts & NIST FIPS 204 ML-DSA-65 proof pointers
```

---

## Quick Start

1. **Create your evidence repository:** Click **Use this template** on GitHub (`https://github.com/vantages-ai/governance-evidence`) or link an optional repository when opening an **Acta Room** in VOS Acta.
2. **Declare your system:** Populate `agent.json` and `gbom.json` for your AI application or agent endpoint.
3. **Run an endpoint scan:** Visit [`https://vantages.app/scan`](https://vantages.app/scan) to evaluate live endpoint readiness (`/.well-known/poppy.json`, security headers, and statutory gap checks).
4. **Remediate or request review:**
   - **Automated Remix PRs:** Route identified statutory gaps to [`vantages-ai/acta-remix`](https://github.com/vantages-ai/acta-remix) for Cookbook-backed Pull Requests.
   - **48h Evidence Review:** Submit your room dossier to an accredited **Chamber** reviewer (`https://vantages.app/evidence-review`) for Article 14 human oversight and dual-signature sealing.

---

## Disclosure & Accountability

- **Works without:** External third-party SaaS wallets, public GitHub account linkage (Shared `Acta Rooms` operate natively on VOS D1 with archival anchoring in VOS Notary Registry).
- **Optional:** Linking this GitHub template repository (`client_github_repo`) to enable automated `acta-remix` Pull Requests.
- **Requires:** Human steward review (`Role >= 40` / Article 14 oversight) for seal issuance; runtime drift against the anchored RFC 8785 digest switches public badges fail-closed to `VOIDED_ON_DRIFT`.

> **Non-Legal Attestation Notice:** Process evidence receipts and cryptographic seals provide tamper-evident process attestation, not legal certification. Human stewards remain solely accountable.
