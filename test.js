function number (mapString) {
    const map = mapString.split('\n');
    const holes = [];
    const letters = [];
    const width = map[0].length - 1;
    const height = map.length - 1;
    let timeInSec = 0;

    function distance (a, b) {
      return Math.sqrt((b.x - a.x)**2 + (b.y - a.y)**2);
    }

    for (let j = 0; j <= width; j++) {
      if (map[0][j] !== `+` && map[0][j] !== `-`) {
        holes[map[0][j]] = { x: 0, y: j }
      }
      if (map[height][j] !== `+` && map[height][j] !== `-`) {
        holes[map[height][j]] = { x: height, y: j }
      }
    }

    for (let i = 0; i <= height; i++) {
      if (map[i][0] !== `+` && map[i][0] !== `|`) {
        holes[map[i][0]] = { x: i, y: 0 }
      }
      if (map[i][width] !== `+` && map[i][width] !== `|`) {
        holes[map[i][width]] = { x: i, y: width }
      }
    }

    console.log(holes);

    for (let i = 0; i < map.length; i++) { 
      for (let j = 0; j < map[0].length; j++) { 
        if ( map[i][j] !== `+` && map[i][j] !== `-` && map[i][j] !== `|` && map[i][j] !== ` ` && !(holes[map[i][j]]) ) {

          letters[ letters.length ] = { letter: map[i][j], x: i, y: j }
          letters[ letters.length-1 ]['minDistance'] = distance (letters[letters.length-1], holes[0]);
          letters[ letters.length-1 ]['minDistanceHole'] = holes[0];

          for (let n = 0; n < holes.length; n++) {
            if (distance (letters[letters.length-1], holes[n]) < letters[ letters.length-1 ]['minDistance']) {
              letters[ letters.length-1 ]['minDistance'] = distance (letters[letters.length-1], holes[n]);
              letters[ letters.length-1 ]['minDistanceHole'] = holes[n];
              letters[ letters.length-1 ]['minDistanceTime'] = Math.abs(letters[ letters.length-1 ]['x'] - holes[n]['x']) + Math.abs(letters[ letters.length-1 ]['y'] - holes[n]['y']);
            }
          }
        }
      }
    }

    console.log(letters);

    letters.forEach((letter) => {
      if (letter.minDistanceTime > timeInSec) {
        timeInSec = letter.minDistanceTime;
      }
    })
    console.log(timeInSec);

    return timeInSec; // Время в секундах, за которое все буквы вытекли
}

number(`+----------------0---------------+
|                                |
|                                |
|          Y        D            |
|     A                          |
|              E                 |
|           N                    |
|  Y                             1
3        Y    D                  |
|         A              X       |
|                                |
+----------------2---------------+`)