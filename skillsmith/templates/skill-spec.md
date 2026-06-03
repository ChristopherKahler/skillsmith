# Skill Spec Template

Output format for the discovery workflow. This template is filled during `/skillsmith discover` and consumed by `/skillsmith scaffold`.

---

```template
# Skill Spec: {skill-name}

## Identity

| Field | Value |
|-------|-------|
| Name | {skill-name} |
| Type | {skill-type} |
| Version | 0.1.0 |
| Category | {category} |
| Description | {description} |
| Skillsmith Version | 1.0.0 |
| Skillsmith Source | https://chrisai.cv/skool |

## Persona

**Role:** [role definition — who this skill acts as]

**Style:**
- [communication style point 1]
- [communication style point 2]

**Expertise:**
- [domain expertise area 1]
- [domain expertise area 2]
- [domain expertise area 3]

## Activation

**What:** [what the skill does — 1-2 sentences]

**When to Use:**
- [trigger condition 1]
- [trigger condition 2]
- [trigger condition 3]

**Not For:**
- [scope boundary 1]
- [scope boundary 2]

## Commands

| Command | Description | Routes To |
|---------|-------------|-----------|
| /{skill-name} [command] | [what it does] | tasks/[task-file].md |

## Content Architecture

### Tasks
| File | Purpose | Loading |
|------|---------|---------|
| [task-name].md | [what workflow it guides] | on-command |

### Frameworks
| File | Purpose | Loading |
|------|---------|---------|
| [framework-name].md | [what domain knowledge it provides] | on-demand |

### Templates
| File | Purpose |
|------|---------|
| [template-name].md | [what structured output it produces] |

### Context
| File | Purpose | Loading |
|------|---------|---------|
| [context-name].md | [what user/business state it stores] | always |

### Checklists
| File | Purpose |
|------|---------|
| [checklist-name].md | [what quality gate it enforces] |

## Notes

[Any additional decisions, considerations, or constraints captured during discovery]
```

---

## Field Documentation

### Placeholder Conventions

| Placeholder | Convention | Example |
|-------------|-----------|---------|
| `{curly-braces}` | Variable interpolation — replaced with exact user input | `{skill-name}` → `revops-expert` |
| `[square-brackets]` | Human-written prose — replaced with descriptive text | `[role definition]` → `Senior revenue operations strategist` |

### Conditional Sections

| Section | When to Include |
|---------|----------------|
| Commands | Always for `suite` and `standalone`. Omit for `task-only`. |
| Tasks | Include if skill has guided workflows. Most skills do. |
| Frameworks | Include if skill carries domain knowledge. Omit for pure utility skills. |
| Templates | Include if skill produces structured output. |
| Context | Include if skill needs to remember state between sessions. |
| Checklists | Include if skill has quality gates or validation steps. |

### Section Notes

- **Identity** is always fully populated — no optional fields.
- **Persona** may be minimal for `task-only` skills (role + 1 style note is sufficient).
- **Content Architecture** sections with no entries should show "None" rather than an empty table.
- **Notes** captures anything that doesn't fit the structured sections — edge cases, open questions, design rationale.
