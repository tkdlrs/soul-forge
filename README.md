# Soul Forge

An application for tracking and building habits, and anything else I want to track or develop.
The idea is to cultivate one's soul and to forge it into whatever the user wants.

Also, it's really only for me. Go use a cranker or some other crap if you want something similar.

Project Decrees

1. Data going into the database shall be checked by a Zod Schema.
2. Data coming from the database shall be checked by a Zod Schema.
3. Heavy use of the 'seed once, edit freely, don't overwrite user input' pattern is used.
    - Because of this `untrack(() => ...)`is heavly used.
    - `untrack(() => ...)` is used to clearly indicate that values should be read once
      but not subscribed to.
4. Don't suppress compilar warnings. They are their to help.
5. To go in production all TypeScript errors need to be removed.
   #. ...
