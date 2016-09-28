#!/bin/bash

mkdir processing
cd processing

cp ../resources/*.zip ./

# Download PSU OPP Data
cat ../resources/OPP-data-files.txt | parallel --gnu "wget {}"
find ./ -name \*.zip -exec unzip {} \


# Bulk convert shapefiles to geojson using ogr2ogr
# For more information, see http://ben.balter.com/2013/06/26/how-to-convert-shapefiles-to-geojson-for-use-on-github/

# Note: Assumes you're in a folder with one or more zip files containing shape files
# and Outputs as geojson with the crs:84 SRS (for use on GitHub or elsewhere)

#geojson conversion
function shp2geojson() {
  ogr2ogr -f GeoJSON -t_srs crs:84 "$1.geojson" "$1.shp"
}

#unzip all files in a directory
for var in *.zip; do unzip "$var"; done

#convert all shapefiles
for var in *.shp; do shp2geojson ${var%\.*}; done

# You'd probably want to `mv *.geojson [path-to-git-repo]/` at this point
# so you could commit the file to GitHub
# Happy mapping!

# add tippecanoe zoom levels and write to new geojson
mkdir geojson
node ../resources/zooms.js

cd geojson
tippecanoe -o ../../PSU-OPP-Campus-Data-v2.mbtiles \
  -n 'Penn State Office of the Physical Plant Campus GIS Layers' \
  -f -z 19 -Z 9 -b 8 -r 0\
  PSU_Area_Labels.json \
  PSU_Building_Labels.json \
  PSU_Administrative_Offices.json \
  PSU_Roof_Detail_Lines.json \
  PSU_Buildings.json \
  PSU_Emergency_Phones.json \
  PSU_Trees.json \
  PSU_Streetlights.json \
  PSU_Walls.json \
  PSU_Recreation.json \
  PSU_Recreation_polygon.json \
  PSU_Crosswalks_ln.json \
  PSU_Crosswalks_poly.json \
  PSU_ADA_Parking_Spots.json \
  PSU_Parking_Stripes.json \
  PSU_Planting_Beds.json \
  PSU_Sidewalks.json \
  PSU_Misc_paved.json \
  PSU_Football_Parking.json \
  PSU_Parking.json \
  PSU_Roads_major.json \
  PSU_Roads_minor.json \
  PSU_Roads_unpaved.json \
  PSU_Areas.json \
  PSU_Boundary.json

#72834 total features
