# NOTES

## Container for charts should not change size

It is important to note that if there is dynamic data related the chart (like clicking a node in the chart adding new content to the page), this dynamic data should live outside of the element that is containing the chart itself. The reason for this is because with some charts (like the radar chart), if the container the chart is in changes size and the chart is not maintaining the aspect ratio (which is the default), the container element seems to continuously get bigger.
