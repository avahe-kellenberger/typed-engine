# typed-engine

2D Game Engine in TypeScript

**NOTE:** **_This package is currently in development - expected first usable release in April_**

# Game Structure

## Game
The `Game` class holds all objects that will be rendered and updated.

All of these objects are contained in a single `content` object, which will typically be a `Scene` or a `Layer`.
This object is assigned by calling `Game.setContent(contentObject)`.

## Layer
`Layer` represents a 2D plane, and holds many objects that can be updated or rendered.

Layers implement the interface `ZOrder`, which imitates distance on the `z` axis. This allows the game's camera to make layers with a higher `"Z order"` to appear farther away.

Any object that implements `Updatable` or `Renderable` can be added to a `Layer`.

## Scene
`Scene` is a simple system for rendering multiple `layers`.

It will automatically sort and render layers according to their `Z orders`, and allows layers to be added and removed on the fly.
