namespace aoc2022
{
    public static class Day14
    {
        public static HashSet<(int, int)> CreateCave(List<string> inputs)
        {
            var retVal = new HashSet<(int, int)>();

            foreach(var input in inputs)
            {
                var endPoints = input.Split(" -> ");
                for(var ii = 0; ii < endPoints.Length - 1; ii++)
                {
                    var valA = endPoints[ii].Split(',');
                    var valB = endPoints[ii+1].Split(',');

                    var pointA = (int.Parse(valA[0]), int.Parse(valA[1]));
                    var pointB = (int.Parse(valB[0]), int.Parse(valB[1]));
                    
                    var updateX = true;
                    var init = 0;
                    var max = 0;
                    if (pointA.Item2 == pointB.Item2)
                    {
                        init = pointA.Item1 > pointB.Item1 ? pointB.Item1 : pointA.Item1;
                        max = pointA.Item1 > pointB.Item1 ? pointA.Item1 : pointB.Item1;                        
                    } else {
                        init = pointA.Item2 > pointB.Item2 ? pointB.Item2 : pointA.Item2;
                        max = pointA.Item2 > pointB.Item2 ? pointA.Item2 : pointB.Item2;
                        updateX = false;
                    }

                    for(var jj = init; jj <= max; jj++)
                    {
                        if (updateX){
                            retVal.Add((jj, pointB.Item2));
                        } else {
                            retVal.Add((pointB.Item1, jj));
                        }                        
                    }                    
                }
            }

            return retVal;
        }
    
        public static int DropSand(HashSet<(int, int)> cave, (int, int) start)
        {
            var counter = 0;
            var hitTheAbyss = false;
            var abyssYStart = cave.Min(i => i.Item1);

            while (!hitTheAbyss)
            {
                var sand = start;
                while(true)
                {
                    if (sand.Item2 == abyssYStart) {
                        hitTheAbyss = true;
                        break;
                    }

                    if (!cave.Contains((sand.Item1, sand.Item2 + 1))) {
                        sand.Item2++;
                    } else if (!cave.Contains((sand.Item1 - 1, sand.Item2 + 1))) {
                        sand.Item1--;
                        sand.Item2++;
                    } else if (!cave.Contains((sand.Item1 + 1, sand.Item2 + 1))) {
                        sand.Item1++;
                        sand.Item2++;
                    } else {
                        counter++;
                        cave.Add(sand);                        
                        break;
                    }
                }
            }

            return counter;            
        }
    }

}