# Chaos Monkey
I'm a tab hoarder and I need help.

A silly Chrome extension that will semi-randomly close your tabs and store them so you can always go back and open them later. Possibly in the future I'll have it set a context for my to-dos and auto-close tabs if the tab has nothing to do with the context using the GPT API or something. We'll see!


## Current Features
Basically nothing. All it does is buggily rid you of tabs that are older than 1 hour since last activity.

Some things that need to be done:
- Add a closed tabs page with a list of closed tabs, batched by day and sub-sectioned by time
- Add a way to restore tabs
- Add a way to change the duration from creation / last activity to close a tab
- Add a session param such that if a user passes through a tab but doesn't linger, don't add this as the last active time since it wasn't "really" active
- Fix some of the data bugginess on installation as well as when you first load your browser
    - This'll also include new tab pages and chrome-extension pages like those created by the various suspender app
- Determine how to deal with tabs that never receives the url/title values because I opened them without actually going to the page (ctrl+click, middle click, etc)
    - Maybe prompt the user with "do you still want these? ya never opened them" or something


## Contributing
If you want to contribute, feel free to fork and clone. Push your changes to your fork and submit a PR. I'll try to get to it as soon as I can.
