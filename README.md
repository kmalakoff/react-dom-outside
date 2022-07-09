## react-dom-outside

React components for click outside

### Example 1

```jsx
import { useRef } from "react",
import { View } from "react-native",
import contains from "react-dom-outside";

function Component() {
  const ref = useRef();
  return (
    <View>
      <View ref={ref}>
        <View onPress={((event) => {
          contains(ref.current, event.target); // true
        })}/>
      </View>
      <View onPress={((event) => {
        contains(ref.current, event.target); // false
      })}/>
    </View>
  )
}
```

### Documentation

[API Docs](https://kmalakoff.github.io/react-dom-outside/)
