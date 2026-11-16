# Cryptographic Evidence Receipts & Counter-Seal Pointers

Store verifiable RFC 8785 canonical digest receipts and verification pointers (e.g. `https://proof.vantages.app/seals/<sealId>`) anchored during Chamber review (`E1_INTAKE .. E6_HANDOVER`).

Runtime drift against the anchored receipt invalidates the associated dynamic badge (`VOIDED_ON_DRIFT`) until human re-review is completed.
