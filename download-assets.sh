#!/usr/bin/env bash
set -e
mkdir -p assets/images
base="https://elektrotechnik-deptalla.de/wp-content/uploads"
curl -L "$base/2018/04/deptalla_beleuchtung.jpg" -o assets/images/deptalla_beleuchtung.jpg
curl -L "$base/2018/04/hausinstallation.jpg" -o assets/images/hausinstallation.jpg
curl -L "$base/2018/04/deptalla_netzwerk.jpg" -o assets/images/deptalla_netzwerk.jpg
curl -L "$base/2018/04/deptalla_sat.jpg" -o assets/images/deptalla_sat.jpg
curl -L "$base/2018/04/deptalla_geraetepruefung.jpg" -o assets/images/deptalla_geraetepruefung.jpg
curl -L "$base/2018/08/deptalla_gruppenbild.png" -o assets/images/deptalla_gruppenbild.png
curl -L "$base/2018/08/mitarbeiter_deptalla.png" -o assets/images/mitarbeiter_deptalla.png
curl -L "$base/2018/08/mitarbeiter_1.png" -o assets/images/mitarbeiter_1.png
curl -L "$base/2018/08/mitarbeiter_2.png" -o assets/images/mitarbeiter_2.png
curl -L "$base/2018/08/mitarbeiter_3.png" -o assets/images/mitarbeiter_3.png
curl -L "$base/2018/08/mitarbeiter_4.png" -o assets/images/mitarbeiter_4.png
printf '\nBilder gespeichert unter assets/images/\n'
