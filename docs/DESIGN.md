# SOVRAN website identity

## Source and decisions

The existing extension mark is a pair of square brackets surrounding an orange dot. Keep its original geometry,
wordmark, and motto. The extension uses VS Code's system typography rather than a bundled font. The website uses
self-hosted Manrope for readable, compact headings and body copy, with the system monospace stack for code.

| Token | Value | Role |
|---|---|---|
| Ink | `#0F1012` | Existing brand background |
| Surface | `#17191D` | Raised content |
| Paper | `#F4F2EE` | Existing brand foreground |
| Orange | `#FF5A36` | Existing brand dot and primary action |
| Muted | `#A3A6AE` | Readable secondary text |
| Rule | `#303238` | Quiet structural borders |

## Layout

Left-aligned editorial hero paired with a connection diagram: the bracketed dot connects directly to the three
places the user's model can run. A wide, original repository screenshot follows. Feature rows alternate quiet text,
screenshots, and compact utility cards. Documentation uses a sticky contents rail and a comfortable reading width.

```
logo              features  documentation  community     github
Own your          local ──┐
intelligence.     hosted ─┼── [ • ] ── VS Code
description       gateway┘
install / source
──────────────── original product screenshot ────────────────
model choice      read → plan → review → apply
recovery          original screenshot + explanation
open source      contribution / license / source
```

## Review against the brief

The dark/orange palette is retained because it comes from the actual logo. Avoid the usual repeated grid of
identical SaaS cards: the connection diagram, generous product screenshot and mode comparison do the explanatory
work. Reserve glow for the dot's connection field. One short page-load sequence and a finite connection animation
draw attention to the product's direct connection model. Hover and menu transitions respond to the visitor.
Reduced motion disables decorative movement, and all content is visible without JavaScript.

Screenshots are existing repository assets showing example sessions; they are not performance evidence.
