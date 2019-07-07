.fam H \" Helvetica font family

.CD
.LG
.B "New Animation System"
.DE
.SH
Basic Structure
.LP
.IP 1. 3
Animations consist of
.B AnimationComponents ,
which can be conceptualized as individual images in a moving animation. For example, an arm of a character which moves and rotates during the animation.
.IP 2. 3
Each AnimationComponent consists of
.B AnimationFrames .
.IP 3 3
Each
.B AnimationFrame
holds information about its AnimationComponent at a specific point in time.

.SH
AnimationFrame
.LP
Think of an AnimationFrame as a
.BI  snapshot 
of a piece of an animation, at a particular point in time.
The frame holds information such a location and rotation about that piece of the animation.

.SH
AnimationComponents
.LP
AnimationComponents are made up of multiple AnimationFrames. Earlier in an example, we used a character's arm as an example of an AnimationComponent.
The arm in one particular position would be considered an AnimationFrame, but multiple frame stitched together created the AnimationComponent.

.SH
Animation
.LP
An Animation brings all of these together - multiple AnimationComponents composed into one object. For example, an animation of a character could consist of an AnimationComponent for his arms, another for his legs, and another for the rest of his body. When all played together, you have a seamless animation of your character.
.LP
This system allows for Animations to be easily modified - no need to redraw sprites! It enables granular control; simply modify some property of an AnimationFrame, and you're done.

