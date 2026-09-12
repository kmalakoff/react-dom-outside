## react-dom-outside

React components for detecting clicks outside a component in React DOM and react-native-web applications.

Install the package and its peer dependencies:

```bash
npm install react react-dom react-dom-outside react-dom-event react-ref-boundary
```

For a React Native version, see [react-native-outside](https://www.npmjs.com/package/react-native-outside).

### Active component

```tsx
import { forwardRef } from 'react';
import { EventProvider } from 'react-dom-event';
import { Active } from 'react-dom-outside';

const Component = forwardRef<HTMLDivElement, { isActive?: boolean; setIsActive?: (value: boolean) => void }>(({ isActive, setIsActive }, ref) => {
  return (
    <div ref={ref}>
      <div>{isActive ? 'active' : 'not active'}</div>
      <button type="button" onClick={() => setIsActive?.(!isActive)}>
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

`Active` injects `isActive`, `setIsActive`, and a ref into its child. The child must forward that ref to the DOM element that defines its inside area. Clicking outside that element sets `isActive` to `false`.

### Active boundary component

Use `ActiveBoundary` when another DOM element should count as inside the active area. Register that element with `react-ref-boundary`:

```tsx
import { forwardRef } from 'react';
import { EventProvider } from 'react-dom-event';
import { ActiveBoundary } from 'react-dom-outside';
import { useRef as useBoundaryRef } from 'react-ref-boundary';

const Component = forwardRef<HTMLDivElement, { isActive?: boolean; setIsActive?: (value: boolean) => void }>(({ isActive, setIsActive }, ref) => (
  <div ref={ref}>
    <div>{isActive ? 'active' : 'not active'}</div>
    <button type="button" onClick={() => setIsActive?.(!isActive)}>
      Toggle
    </button>
  </div>
));

const AdditionalBoundary = forwardRef<HTMLDivElement>((_props, _ref) => {
  const ref = useBoundaryRef<HTMLDivElement>(null);
  return <div ref={ref}>Clicks here remain inside the active boundary.</div>;
});

export default function App() {
  return (
    <EventProvider>
      <ActiveBoundary>
        <Component />
        <AdditionalBoundary />
      </ActiveBoundary>
    </EventProvider>
  );
}
```

### Documentation

[API Docs](https://kmalakoff.github.io/react-dom-outside/)
