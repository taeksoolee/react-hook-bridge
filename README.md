# react-hook-bridge
- It is a library that provides communication function between two windows as `react-hook`.

### example
``` javascript
// components/Parent.jsx
import React from 'react';
import { useParentwindow } from 'react-hook-bridge';

export default function Parent() {
  const [open] = useParentwindow({
    bridgeKey: 'hello',
    connectUrl: 'http://localhost:3001', // Child Url
    getData: () => ({token: 'this is token string'}),
    logging: true,
  });

  return (
    <div>
      <h1>Parent Component</h1>
      <button onClick={open}>open</button>
    </div>
  )
}
```

``` javascript
// components/Child.jsx
import React from 'react';
import { useChildwindow } from 'react-hook-bridge';

export default function Child() {
  const [logs] = useChildwindow({
    bridgeKey: 'hello',
    connectUrl: 'http://localhost:3000', // Parent Url
    callback: (data) => {
      console.log('useChildWindow : ', data);
    },
    logging: true,
  })

  return (
    <div>
      <h1>Child Component</h1>
      {logs?.map((log, i) => (
        <div key={i}>{JSON.stringify(log)}</div>
      ))}
    </div>
  )
}
```

``` javascript
// App.jsx
import React from 'react';
import Child from './components/Child';
import Parent from './components/Parent';

const App = () => (
  <>
    {window.location.origin === 'http://localhost:3000' && <Parent />}
    {window.location.origin === 'http://localhost:3001' && <Child />}
  </>
);

export default App;
```

``` json
// package.json
{
  "scripts": {
    "dev:parent": "export PORT=3000 && webpack-dev-server",
    "dev:child": "export PORT=3001 && webpack-dev-server",
  }
}
```