Stickery
========

Stickery is a jQuery plugin allowing to stick elements in the page when scrolling.

Demo: http://www.mangolight.com/labs/stickery

## Options
- **top**: distance (in px) between the top of the window and the element when the element is stuck (default: 0)
- **animate_stick**: animation when sticking the element (default: "none")
- **animate_unstick**: animation when unsticking the element (default: null, if null then it will use the same animation than animate_stick)
- **stick_after**: the distance (in px) to scroll before the element become stuck (default: null)
- **end**: the distance (in px) with the top of the page after what the element will stop to be stuck (default: null)

## Callbacks
- **onStick**: called after the element is stuck
- **beforeStick**: called just before the element is stuck
- **onUnstick**: called after the element is unstuck
- **beforeUnstick**: called just before the element is unstuck