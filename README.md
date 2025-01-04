## react-dom-outside

React components for react-dom and react-native-web click outside

For a react-native version, check out [react-native-outside](https://www.npmjs.com/package/react-native-outside)

### Example 1: Active Component

```tsx
import { forwardRef } from "react",
import { dom } from "react-native",
import { Active } from "react-native-outside";
import { EventProvider } from "react-native-event";

const Component = forwardRef(({ isActive, setIsActive }, ref) => {
  return (
    <dom ref={ref}>
      <dom id="text">{isActive ? 'active' : 'not active'}</dom>
      <button
        id="toggle"
        onClick={function () {
          setIsActive(!isActive);
        }}
      />
    </dom>
  );
});

export default function App() {
  return (
    <EventProvider>
      <Active>
        <Component />
      </Active>
      <Active>
        <Component />
      </Active>
    </EventProvider>
  );
}
```

### Example 1: Active Boundary Component

```tsx
import { forwardRef, useEffect, useRef } from "react",
import { Active } from "react-native-outside";
import { EventProvider } from "react-native-event";
import { PortalProvider, Portal } from '@gorhom/portal';
import { useRef as useBoundaryRef } from 'react-ref-boundary';

// a modal for example outside the hierarchy
const PortalComponent = () => {
  const ref = useBoundaryRef(null); // react-ref-boundary ref
  const el = useRef(document.createElement('div'));
  useEffect(function () {
    container.appendChild(el.current);
  });
  return ReactDOM.createPortal(
    <button
      ref={ref}
      id="portal-click"
      OnClick={() => { /* this click will not inactivate due to react-ref-boundary ref */ }}
    />,
    el.current,
  );
}

// react-ref-boundary ref passed in
const Component = forwardRef(({ isActive, setIsActive }, ref) => {
  return (
    <dom ref={ref}>
      <dom id="text">{isActive ? 'active' : 'not active'}</dom>
      <button
        id="toggle"
        onClick={function () {
          setIsActive(!isActive);
        }}
      />
      <PortalComponent/>
    </dom>
  );
});

export default function App() {
  return (
    <EventProvider>
      <Active>
        <Component />
      </Active>
      <Active>
        <Component />
      </Active>
    </EventProvider>
  );
}
```

### Documentation

[API Docs](https://kmalakoff.github.io/react-dom-outside/)
