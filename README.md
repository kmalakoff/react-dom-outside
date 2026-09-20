## react-dom-outside

React components for detecting clicks outside a component in React DOM and react-native-web applications.

Install the package and its peer dependencies:

```bash
npm install react react-dom react-dom-outside react-dom-event react-ref-boundary
```

Requires React 16.8 or newer.

For a React Native version, see [react-native-outside](https://www.npmjs.com/package/react-native-outside).

### Active component

```tsx
import { forwardRef } from 'react';
import { EventProvider } from 'react-dom-event';
import { Active, type ActiveInjectedProps } from 'react-dom-outside';

const Component = forwardRef<HTMLDivElement, Partial<ActiveInjectedProps>>(({ isActive, setIsActive }, ref) => {
  return (
    <div ref={ref}>
      <div>{isActive ? 'active' : 'not active'}</div>
      <button type="button" onClick={() => setIsActive?.((current) => !current)}>
        Toggle
      </button>
    </div>
  );
});

export default function App() {
  return (
    <EventProvider>
      <Active>
        <Component />
      </Active>
    </EventProvider>
  );
}
```

`Active` and `ActiveBoundary` require exactly one child, which must forward its ref to the DOM element that defines its inside area. Fragments and multiple children are rejected. Both components preserve the child's existing object or callback ref, including React 19 cleanup callbacks. They inject `isActive` and the React state setter `setIsActive`. Clicking outside sets `isActive` to `false`.

### Active boundary component

Use `ActiveBoundary` when another DOM element should count as inside the active area. Register that element with `react-ref-boundary`:

```tsx
import { forwardRef } from 'react';
import { EventProvider } from 'react-dom-event';
import { ActiveBoundary, type ActiveInjectedProps } from 'react-dom-outside';
import { useRef as useBoundaryRef } from 'react-ref-boundary';

const Component = forwardRef<HTMLDivElement, Partial<ActiveInjectedProps>>(({ isActive, setIsActive }, ref) => (
  <div ref={ref}>
    <div>{isActive ? 'active' : 'not active'}</div>
    <button type="button" onClick={() => setIsActive?.((current) => !current)}>
      Toggle
    </button>
    <AdditionalBoundary />
  </div>
));

function AdditionalBoundary() {
  const ref = useBoundaryRef<HTMLDivElement>(null);
  return <div ref={ref}>Clicks here remain inside the active boundary.</div>;
}

export default function App() {
  return (
    <EventProvider>
      <ActiveBoundary>
        <Component />
      </ActiveBoundary>
    </EventProvider>
  );
}
```

### Documentation

[API Docs](https://kmalakoff.github.io/react-dom-outside/)
