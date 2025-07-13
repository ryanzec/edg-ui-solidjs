# Edg UI

This library is not in the state where I want it to be to write out the basic read me, once it is, this will be filled in.

# Setup
-

# Examples To Create

- event stream api mock
  - simulate openai chat streaming with UI
-

#  Notes
- when setting form values from the form system, if you want to do this in an effect, you will need to make sure to wrap that code in a `untrack()` as setting form data also reads that data (to update things like validation state) which means in an effect update the data that is read will cause the effect to run until solidjs errors out because of an infinite loop happening.
- have mkcert installed (homebrew easiest for mac)




QUICK THINGS TODO
- add `local` for node environment in api
- remove `hasPassword`
- ellipsis text update on resize of element
- add shift + click to submit for text area component
- file tabs scrolling should have scrollbar that does not overlap when scroll enabled
- add arrows for to file tabs when it is scrolling
- add tooltip for icons when sidebar is collapsed
- disabled grid header sort when no items available
- move the border to the container instead of each row (avoid not seeing side border when scrolling fast for vituralized data)
- typography white space / prewrap variant
- update marker to use badge component
- add disabled to form context (applies to all input under it)
- make copy button for code editor to be sticky / fixed

REVIEW COMPONENTS:
- avatar
- badge
- button
- callout
- card
- chart
- code block
- code editor
- combobox
- copy text
- data updated indicator
- date picker
- date time
- dialog
- drag and drop layout
- drag and drop
- drop down
- dynamic form builder
- ellipsis
- empty indicator
- errorindciator
- form error
- global notifications
- grid table
- input
- label
- list
- loading
- markdown
- overlay
- peek
- scroll area
- side navigation
- skeleton
- supporting text
- table
- textarea
- time input
- typography
- unsaved changes dialog
