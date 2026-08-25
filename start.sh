#!/bin/bash
echo "Starte Wilhelm Lippl Handwerk Website..."
if which xdg-open > /dev/null; then
  xdg-open index.html
elif which open > /dev/null; then
  open index.html
else
  echo "Bitte index.html manuell im Browser oeffnen."
fi
