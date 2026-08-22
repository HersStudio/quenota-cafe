---
name: design-system-quenotacafe
description: Creates practical design-system guidance for Qué Nota Café's digital products, including tokens, components, content patterns, and accessibility criteria. Use when documenting UI behavior, aligning design and development, or improving consistency across the coffee brand's screens.
---

<!-- TYPEUI_SH_MANAGED_START -->

# Qué Nota Café Design System

## Mission
Conectar a los amantes del café con los mejores granos de origen colombiano, ofreciendo una experiencia de compra online simple, auténtica y de especialidad.

## Brand
- Product/brand: Qué Nota Café
- Audience: Amantes del café de especialidad en Colombia y LATAM
- Product surface: marketing site

## Style Foundations
- Visual style: warm, artisanal, premium, natural
- Typography scale: display-xl 36/40, heading-lg-bold 30/36, heading-lg-regular 30/36, heading-md 24/32, heading-sm-bold 20/28, heading-sm-regular 20/28, body-lg 18/28, body-lg-semibold 18/28, body-lg-bold 18/28, body-md 16/24, body-md-uppercase 16/24, body-md-semibold-uppercase 16/24, body-md-bold-uppercase 16/24, body-sm 14/20, body-sm-bold 14/20, body-sm-bold-uppercase 14/20, label-md 12/16, label-md-bold 12/16
- Color palette: bg-primary #F2E8E0, bg-white #FFFFFF, text-primary #1E1E1E, text-secondary #F2E8E0, accent-terracotta #C86A3A, accent-terracotta-light #B75929, text-disabled-primary #6A7282, text-disabled-secondary #5A3838, btn-hover-primary #2D2D2D, btn-hover-secondary #C5551C, btn-disabled-primary #D1D5DC, btn-disabled-secondary #A88776
- Spacing scale: space-xs 4px, space-sm 8px, space-md 16px, space-lg 24px, space-xl 32px, space-2xl 48px, space-3xl 64px
- Radius/shadow/motion tokens: duration-fast 120ms, duration-base 200ms, duration-slow 350ms, ease-standard, ease-out

## Component Families
- buttons
- inputs
- forms
- navigation
- cards
- overlays
- badges
- selectors
- modals
- feedback

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required
- Focus-visible rules required
- Contrast constraints required

## Writing Tone
warm, clear, brand-consistent

## Rules: Do
- Use semantic tokens (bg-primary
- accent-terracotta) never raw hex values.
- Define all button states: default
- hover
- focus
- active
- disabled
- loading.
- Use uppercase for CTAs and headings siguiendo la identidad de marca.
- Maintain cream (#F2E8E0) and terracotta (#C86A3A) as the only brand accent colors.
- Specify responsive behavior for mobile-first layouts.

## Rules: Don't
- Do not use colors outside the defined brand palette.
- Do not allow low-contrast text combinations against terracotta backgrounds.
- Do not introduce one-off spacing outside the defined space tokens.
- Do not use descriptive labels that don't reflect café specialty language.
- Do not mix border-radius styles within the same component family.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy
4. variants
5. and interactions.
6. Add accessibility acceptance criteria.
7. Add anti-patterns and migration notes.
8. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule uses "must".
- Every recommendation uses "should".
- Every accessibility rule is testable in implementation.
- Prefer system consistency over local visual exceptions.
- Brand palette must be respected in every component state.

## Acceptance Checklist
- Frontmatter exists with valid `name` and `description`.
- Guidance is under 500 lines for `skill.md` when possible.
- Accessibility and interaction states are explicitly documented.
- Rules are concrete, testable, and non-ambiguous.
- Output can be reused in other repositories with only variable replacement.

## TypeUI + Agentic Integration
This `SKILL.md` is intended for `typeui.sh` CLI workflows.
It can later be integrated with agentic tools including Claude Code, OpenCode, Gemini CLI, Cursor, and similar assistants.

<!-- TYPEUI_SH_MANAGED_END -->
