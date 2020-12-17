# oak

This is a personal **experiment** to bring some Elm's concepts to UI development.

This is also a liberal implementation, since it's not following Elm's source
code. Which means that while the API might look similar, the behaviour itself
might differ from Elm's.

**Note**: While this is a working proof-of-concept, I highly advise against to
use this in production as it is right now.

## Example

Create a button, that triggers an alert with the message "Hello World":

```typescript
import { button, text } from 'oak/HTML/Elements'
import { id, className, data } from 'oak/HTML/Attributes'
import { onClick } from 'oak/HTML/Events'

const helloButton = (model = 'Hello World') =>
  button(
    [
      id('hello-button'),
      className('primary-button'),
      data('qa-testing', 'hello-button')
      onClick(() => alert(model))
    ],
    [
      text(model)
    ]
  );

dom(helloButton()) // Add to DOM
```

## Documentation

The API is divided in `Elements`, `Attributes` and `Events`, which can be
imported individually or as a set, all follow a consistent API, where all
available items are simple functions.

**Elements**: Represent HTML tags, it accepts two arrays, the first being an
array of attributes and events, and the second is an array of child elements.

**Attributes**: These map to the HTML tag's attributes.

**Events**: These map to the possible events that can be attached to elements.
Unless stated otherwise, all events are attached to the root element, and event
delegation is used for performance reasons.
