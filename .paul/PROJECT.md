# Project: Skillsmith (Skill Framework)

## What This Is

A universal framework for creating Claude Code skills — from discovery through deployment. Includes Skillsmith (the meta-skill that builds skills), syntax standards for every file type, and a scaffolding engine that generates compliant skill directories. First deployment targets Extendly Rev-Ops; designed for portable distribution via Skool community, Claude Code Masterclass, YouTube tutorials, and GitHub.

## Core Value

Anyone can build consistent, high-quality Claude Code skills in minutes using standardized syntax and automated scaffolding — eliminating ad hoc skill creation.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | 0.0.0 |
| Status | Design Phase |
| Last Updated | 2026-03-04 |

## Requirements

### Must Have
- Syntax specs for every folder type (entry point, tasks, templates, frameworks, context, checklists, rules)
- Meta-skill (`/skillsmith`) with discovery + scaffolding phases
- Three skill tiers: Suite, Standalone, Task-only
- Kebab-case directory naming enforcement
- Meaningful versioning in YAML frontmatter

### Should Have
- Concrete examples grounded from PAUL framework `src/` patterns
- Audit capability for existing skills against standards
- README generation as part of scaffolding

### Nice to Have
- Distribution packaging for Skool/courses/GitHub
- Migration tooling for existing skills

### Out of Scope
- Rev-Ops specific content (that's the first consumer, not the framework)
- Runtime execution engine (skills are static markdown, Claude executes them)

## Target Users

**Primary:** Chris + Zach (Extendly Rev-Ops team)
- Building many skills for revenue operations workflows
- Need consistency across skills built by different people
- Want fast scaffolding, not manual template copying

**Secondary:** Claude Code power users (Skool community, course students)
- Building their own skills for various domains
- Need clear standards and a starting point
- May not have seen well-structured skills before

## Context

**Business Context:**
- Chris AI Systems IP, not Extendly IP
- Rev-Ops deployment is the proving ground
- Distribution channels: Skool (free), Masterclass (paid), YouTube (growth), GitHub (open)

**Technical Context:**
- Syntax patterns derived from PAUL framework `src/` (commands, workflows, templates, references, rules)
- Skills deploy to `.claude/commands/` (local, not committed) from `skills/` (git-tracked shared library)
- No runtime dependencies — pure markdown consumed by Claude Code

## Constraints

### Technical Constraints
- Must work within Claude Code's slash command system
- Skills are markdown files — no custom parsers or tooling required
- Must be compatible with `.claude/commands/` directory structure

### Business Constraints
- Framework must be domain-agnostic (not tied to Rev-Ops)
- Must be extractable for standalone distribution

## Key Decisions

| Decision | Rationale | Date | Status |
|----------|-----------|------|--------|
| Meta-skill named `/skillsmith` | Implies craftsmanship + standards, distinctive | 2026-03-04 | Active |
| Kebab-case for all skill directories | Consistency, filesystem-friendly | 2026-03-04 | Active |
| Meaningful versioning in frontmatter | Track skill evolution, support distribution | 2026-03-04 | Active |
| Syntax grounded from PAUL `src/` | Proven patterns, not invented from scratch | 2026-03-04 | Active |
| BDD acceptance criteria NOT used for skills | Skills serve revenue/content work, not software — user stories are natural | 2026-03-04 | Active |
| Rules folder in meta-skill only | Individual skills follow standards; they don't carry the rulebook | 2026-03-04 | Active |
| Discovery uses 5 conversational phases | Natural groupings prevent decision fatigue | 2026-03-04 | Active |
| Skill spec as contract between discover/scaffold | Structured output format consumed by scaffolding engine | 2026-03-04 | Active |
| Rules as compact enforcement, not spec copies | Rules extract Must Have + Anti-Patterns from specs | 2026-03-04 | Active |
| 6 rules files (no rules-for-rules) | One per consumer folder type, no meta-recursion | 2026-03-04 | Active |

## Success Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Syntax specs complete | 7 folder types | 7 | Complete |
| Skillsmith meta-skill functional | Discovery + Scaffolding | Both complete | Complete |
| First skill built with framework | 1 end-to-end test | Multiple | Complete |
| Audit workflow built | /skillsmith audit command | Functional | Complete |

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Format | Markdown + XML + YAML frontmatter | Same as PAUL |
| Execution | Claude Code slash commands | No custom runtime |
| Storage | `skills/` (tracked) → `.claude/commands/` (local) | |

## Links

| Resource | URL |
|----------|-----|
| Planning Doc | projects/skill-framework/PLANNING.md |
| PAUL Reference | apps/paul-framework/src/ |

---
*Created: 2026-03-04*
*Last updated: 2026-03-17 after Phase 5 — v0.1 milestone complete*
