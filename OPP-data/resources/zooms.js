var fs = require('fs');

var layers = [
  ['PSU_OPP_Boundary2015', 9, 19], // 14
  ['PSU_OPP_Areas2015', 9, 19],
  ['PSU_OPP_Buildings2015', 13, 19], // 1
  ['PSU_OPP_Parking2015', 14, 19], // 11
  ['PSU_OPP_Football_Parking2015', 14, 19],
  ['PSU_OPP_Parking_Stripes2015', 16, 19], // 7
  ['PSU_OPP_ADA_Parking_Spots2015', 16, 19],
  ['PSU_OPP_Planting_Beds2015', 16, 19], // 8
  ['PSU_OPP_Roads_major2015', 14, 19], // 12
  ['PSU_OPP_Roads_minor2015', 14, 19], // 13
  ['PSU_OPP_Roads_unpaved2015', 15, 19],
  ['PSU_OPP_Sidewalks2015', 14, 19], // 9
  ['PSU_OPP_Crosswalks_ln2015', 16, 19], // 5
  ['PSU_OPP_Crosswalks_poly2015', 16, 19], // 6
  ['PSU_OPP_Misc_paved2015', 14, 19], // 10
  ['PSU_OPP_Recreation2015', 16, 19], // 3
  ['PSU_OPP_Walls2015', 16, 19], // 2
  ['PSU_OPP_Recreation_polygon2015', 16, 19], // 4
  ['PSU_OPP_Roof_Detail_Lines2015', 16, 19], // -1
  ['PSU_OPP_Streetlights2015', 15, 19], // 0.2
  ['PSU_OPP_Trees2015', 16, 19], // 0.1
  ['PSU_OPP_Emergency_Phones2015', 15, 19],
  ['PSU_OPP_Administrative_Offices2015', 13, 19],
  ['PSU_OPP_Building_Labels2015', 13, 19],
  ['PSU_OPP_Area_Labels2015', 9, 19]
]

layers.map(function(d) {

  var data = JSON.parse(fs.readFileSync(d[0] + '.geojson'));

  data.features.map(function(feature) {
    return feature.tippecanoe = { maxzoom: d[2], minzoom: d[1] };
  });

  fs.writeFileSync('./geojson/PSU_' + d[0].substring(8, (d[0].length - 4)) + '.json', JSON.stringify(data));

})
