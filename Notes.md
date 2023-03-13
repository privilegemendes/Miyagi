# Design Notes

1. Use customize-cra and react-app-rewired to override cra default webpack config
2. 

## Frontend
1. JS and CSS grid block slider
2. Attach the algorithm to it


### CSS Grid
#### Pros
 - Easy to create a grid layout for the puzzle pieces
 - lightweight and easy to maintain

#### Cons
 - Can be less performant for complex puzzle with many pieces
 - Limited ability to add custom graphics or animations to the puzzle pieces

### SVG
#### Pros
  - Can create custom graphics and animations for the puzzle pieces
  - Can be more performant for complex puzzle with many pieces
  - Ability to use external tools to create and manipulate SVG graphics

#### Cons
 - Step learning curve for creating and manipulating SVG graphics
 - May require more code to create the puzzle pieces and implement drag and drop functionality
 - Can be more difficult to maintain

### HTML5 Canvas
#### Pros
 - Highly performant for complex puzzle with many pieces
 - Ability to create custom graphics and animations for the puzzle pieces
 - Supports advanced features like pixel-level collision detection

#### Cons
 - Requires more code and a deeper understanding of graphics programming
 - Not as flexible for creating layouts as CSS Grid or SVG
 - Canvas is a bitmap-based graphics technology, meaning that images can become pixelated when scaled up or down
