# Roadmap: Skillsmith (Skill Framework)

## Overview

Build a universal skill framework from syntax specs through a working meta-skill. Codify syntax standards grounded from PAUL's proven patterns, build the Skillsmith meta-skill for discovery and scaffolding, validate end-to-end, then audit existing skills.

## Current Milestone

**v0.1 Initial Release** (v0.1.0)
Status: In progress
Phases: 4 of 6 complete

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with [INSERTED])

| Phase | Name | Plans | Status | Completed |
|-------|------|-------|--------|-----------|
| 1 | Syntax Specs | 2 | Complete | 2026-03-04 |
| 2 | Skillsmith Discovery | 1 | Complete | 2026-03-04 |
| 3 | Skillsmith Scaffolding | 1 | Complete | 2026-03-04 |
| 3.1 | Skillsmith Distill [INSERTED] | 1 | Complete | 2026-03-04 |
| 4 | Validation | 1 | Not started | - |
| 5 | Audit | 1 | Not started | - |

## Phase Details

### Phase 1: Syntax Specs

**Goal:** Draft concrete syntax spec files for all 7 folder types, grounded from PAUL `src/` patterns, with real examples
**Depends on:** Nothing (first phase)
**Research:** Unlikely (PAUL source already analyzed in session)

**Scope:**
- Entry point spec (`{skill-name}.md`)
- Tasks spec (`tasks/*.md`)
- Templates spec (`templates/*.md`)
- Frameworks spec (`frameworks/*.md`)
- Context spec (`context/*.md`)
- Checklists spec (`checklists/*.md`)
- Rules spec (`rules/*.md`)

**Plans:**
- [x] 01-01: Core specs — entry point, tasks, templates
- [x] 01-02: Auxiliary specs — frameworks, context, checklists, rules

### Phase 2: Skillsmith Discovery

**Goal:** Build `/skillsmith` entry point and discovery workflow (interview user to determine skill type, structure, persona)
**Depends on:** Phase 1 (specs define what discovery must capture)
**Research:** Unlikely (patterns clear from PAUL commands/workflows)

**Scope:**
- Skillsmith entry point (`skillsmith.md`)
- Discovery workflow
- Skill spec output format

**Plans:**
- [x] 02-01: Build discovery phase

### Phase 3: Skillsmith Scaffolding

**Goal:** Build scaffolding engine that generates compliant skill directories from discovery output
**Depends on:** Phase 2 (scaffolding consumes discovery output)
**Research:** Unlikely

**Scope:**
- Scaffolding workflow
- Directory structure generation
- File generation using syntax specs as rules

**Plans:**
- [x] 03-01: Build scaffolding phase

### Phase 3.1: Skillsmith Distill [INSERTED]

**Goal:** Build `/skillsmith distill` command — transform raw source material (books, courses, transcripts) into structured framework chunks
**Depends on:** Phase 3 (needs framework rules for validation)
**Research:** None (proven pattern from Expert Secrets / Traffic Secrets chunking)

**Scope:**
- Distill task workflow (assess → plan → extract → consolidate → validate)
- Entry point updated with distill command and routing

**Plans:**
- [x] 3.1-01: Build distill task and update entry point

### Phase 4: Validation

**Goal:** Create one new skill end-to-end using `/skillsmith` to prove the framework works
**Depends on:** Phase 3 (need working meta-skill)
**Research:** Unlikely

**Scope:**
- Run `/skillsmith` to create a real skill
- Verify output matches all syntax specs
- Document any spec adjustments needed

**Plans:**
- [ ] 04-01: End-to-end skill creation test

### Phase 5: Audit

**Goal:** Audit existing skills against the syntax standards and document gaps
**Depends on:** Phase 4 (specs finalized after validation)
**Research:** Unlikely

**Scope:**
- Inventory existing skills
- Compare each against specs
- Generate compliance report

**Plans:**
- [ ] 05-01: Audit existing skills

---
*Roadmap created: 2026-03-04*
*Last updated: 2026-03-04 after Phase 3.1*
