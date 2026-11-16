# EU AI Act Annex IV & ISO/IEC 42001 Technical Documentation Template

> **Status:** `DRAFT_UNSEALED_TEMPLATE` — Replace placeholders with your system-specific evidence before requesting Chamber review (`Role >= 40`).

## 1. General System Description (Annex IV §1)
- **App / System ID (`app_id`):** `governance-evidence-template`
- **Provider / Deployer Organization:** `replace-with-your-organization`
- **Intended Purpose & Operational Domain:** `<Describe the authorized operational scope, target user groups, and disallowed uses>`
- **Primary Jurisdictions:** `eu`, `us`, `global`
- **Hardware & Runtime Execution Environment:** `<Cloudflare Workers / Container / On-Premises / Model Gateway>`

## 2. Architecture, Components & Model Lineage (Annex IV §2)
- **Model Identifiers & Versions:** Declare all foundation models and weights in `gbom.json` under `models`.
- **MCP Tools & External Interfaces:** Declare all tool endpoints and scopes in `gbom.json` under `mcp_tools`.
- **Change & Drift Management:** Anchored via RFC 8785 canonical digest checks; runtime manifest drift triggers `VOIDED_ON_DRIFT` until Article 14 re-review.

## 3. Data Provenance, Training & Validation (Annex IV §2(d) & §3)
- **Dataset Inventory:** Declare curated datasets in `gbom.json` under `datasets`.
- **Bias & Robustness Evaluation Summary:** Reference records in `../risk-assessment/risk-register-template.json`.

## 4. Human Oversight & Post-Market Monitoring (Annex IV §2(e) & §9)
- **Article 14 Oversight Mode:** `article_14_human_in_the_loop` (`@moorage.dev/approvals` four-eyes handshake)
- **Oversight Signoff Register:** `../oversight/article-14-signoff-log.json`
- **Post-Market Incident Routing:** Route drift or safety incidents via `https://vantages.app/scan` or `vantages-ai/acta-remix`.

## 5. Mandatory Negative-Fact Disclosures (`NOT_CHECKED`)
- `NOT_CHECKED`: Template baseline only; runtime endpoints, proprietary model weights, and live tenant data boundaries were not inspected in this template repository.

> **Non-Legal Attestation Notice:** Technical documentation templates provide structured process readiness evidence, not legal certification. Human stewards remain solely accountable.
