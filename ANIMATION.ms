.fam H \" Helvetica font family

.CD
.LG
.B "New Animation System"
.DE

.LP
.B "Basic Rules"

.IP 1. 3
Animations consist of 'animation frames', or 'key frames' (same concept, different name).
.IP 2.
An animation frame contains a number of renderable elements.
.IP 3.
Each element must be renderable, and may have multiple fields that can be maniputed (e.g. location, rotation).

.LP
.B "Frame to Frame"

Think of a frame as a
.BI  snapshot 
of an animation, at a particular point in time.
The frame knows each element that exists at that point in the animation, and information about those elements necessary to properly render.

