## Textures

### Memory usage

It's important to understand that in general, textures take width _ height _ 4 / 1.33 bytes of memory.

### Magnification

For setting the filter when the texture is drawn larger than its original size you set `texture.magFilter`property to either:

- THREE.NearestFilter
  - pick the closet single pixel from the original texture. With a low resolution texture this gives you a very pixelated look like Minecraft.
- THREE.LinearFilter
  - pick the 4 pixels from the texture that are closest to the where we should be choosing a color from and blend them in the appropriate proportions relative to how far away the actual point is from each of the 4 pixels.

### Minification

For setting the filter when the texture is drawn smaller than its original size you set the `texture.minFilter`property to one of 6 values:

- THREE.NearestFilter
  - same as above, choose the closest pixel in the texture
  - this flickers in the distance because the GPU is picking pixels from the original texture
- THREE.LinearFilter
  - same as above, choose 4 pixels from the texture and blend them
  - this flickers in the distance because the GPU is picking pixels from the original texture
  -
- THREE.NearestMipmapNearestFilter
  - choose the appropriate mip then choose one pixel
- THREE.NearestMipmapLinearFilter
  - choose 2 mips, choose one pixel from each, blend the 2 pixels
- THREE.LinearMipmapNearestFilter
  - chose the appropriate mip then choose 4 pixels and blend them
- THREE.LinearMipmapLinearFilter
  - choose 2 mips, choose 4 pixels from each and blend all 8 into 1 pixel
  - smoothest, highest quality (of course with the trade-off of performance, especially on mobile)
