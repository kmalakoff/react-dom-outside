# Changelog

## [1.1.0] - 2026-09-20

### Fixed

- Preserve a child's existing object or callback ref, including React 19 callback cleanup, when tracking its inside area.

### Changed

- Active and ActiveBoundary require exactly one non-Fragment child that forwards its ref to the inside DOM element. Multiple children, Fragments, and non-element children are rejected.
- Export ActiveInjectedProps, ActiveBoundaryInjectedProps, and ActiveChildProps. The injected setter type accepts both boolean values and functional updates.
- Declare the existing React Hooks requirement as React >=16.8.0.
