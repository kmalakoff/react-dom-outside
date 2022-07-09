function match(element: Element, testID: string): boolean {
  const propsKey = Object.keys(element).find(x => x.startsWith('__reactProps'));
  return propsKey ? element[propsKey]['data-testid'] === testID : false;
}

export default function findByTestID(element: Element, testID: string) {
  if (match(element, testID)) return element;
  if (!element.children) return;
  for (let i = 0; i < element.children.length; i++) {
    const found = findByTestID(element.children[i], testID);
    if (found) return found;
  }
  return null;
}
