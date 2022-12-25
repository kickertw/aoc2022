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
    
        public static int DropSand(HashSet<(int, int)> cave, (int, int) start, bool part2 = false)
        {
            var tempCave = new HashSet<(int, int)>(cave);
            var counter = 0;
            var floor = tempCave.Max(i => i.Item2) + 1;

            while (true)
            {
                var sand = start;
                while(true)
                {
                    if (!part2 && sand.Item2 == floor) {
                        return counter;
                    }

                    var atLowestPoint = part2 && sand.Item2 == floor;
                    if (!tempCave.Contains((sand.Item1, sand.Item2 + 1)) && !atLowestPoint) {
                        sand.Item2++;
                    } else if (!tempCave.Contains((sand.Item1 - 1, sand.Item2 + 1)) && !atLowestPoint) {
                        sand.Item1--;
                        sand.Item2++;
                    } else if (!tempCave.Contains((sand.Item1 + 1, sand.Item2 + 1)) && !atLowestPoint) {
                        sand.Item1++;
                        sand.Item2++;
                    } else {
                        if (part2 && sand == start) {
                            return counter + 1;
                        }                        

                        // When the sand can't move...
                        counter++;
                        tempCave.Add(sand);
                        break;
                    }
                }
            }

            throw new Exception("Should never get here");
        }
    }

}