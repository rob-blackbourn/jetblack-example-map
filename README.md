# @jetblack/example-map

An example of a tiled map with React.

Tiled maps represent the world as a collection of image files (or tiles) at different levels of detail.
At the farthest level the wolrd can be represented as a single image showing the whole world.
As we zoom in one image becomes four, then sixteen, and so on until there are billions of images.
At this level of detail we couldn't possible show all the tiles; in fact
there are typically the same number of tiles displayed as we are just seeing
more detail.

There are a number of libraries that provide this tiled map functionality;
principally Google Maps. Most libraries use traditional JavaScript techniques. This can often be tricky to integrate with a React application.
This library provides a pure React implementation.

## Usage

1. Clone the repo.
2. Install the dependencies (`npm install`)
3. Start the app (`npm start`)

## Notes

### Coordinate Systems

There are three coordinate systems involved (and a projection!).

* Latitude and longitude - how we identify a location on Earth,
* Screen points - the distance in pixels from the top left of the screen,
* Tiles - the number of tiles (or fraction of tiles) accross or down the screen.

#### Latitude and Longitude

This is how we identify a position on earth. Thinking of the planet as a ball,
the coordinates describe two circles; one around the equator, and one around the poles. Longitude describes the ring around the equator, from -180 degrees to +180 degrees (i.e. 360 degrees in total). Latitude is an arc from the north to the south pole, from 90 to -90 degrees. The point at which these rings intersect is arbitrary, but by agreement is near the
Greenwich Observatory on London England.

Finally to represent the sphere of the earch on a two dimensional surface
we need to streatch or compress the original spherical surface. This is
known as a projection.

#### Screen Points

These are the actual pixels on the screen, represented as a vertical and
horizontal grid. There are a fixed number of dots in the horizontal and vertical direction.
The points atart at zero at the top left and increase right and down.

#### Tile Points

The final map is composed of a grid of one or many image tiles. A point on
the earth of a given latitude and longitude may be viewed from a range of
distances (or zoom levels). the bigger the zoom, the closer and more detailed the image.

Typically a tile is 256 pixels square. So an image of 1024 wide by 512 high
would (in screen points) would comprise of 4 tiles across by 2 down.
The coordinates in latitude and longitude this would depend on
the zoom level.

The tile provider only serves tiles for integral zoom levels. To handle
intermediate zooms we can scale the tiles by applying a simple scaler.