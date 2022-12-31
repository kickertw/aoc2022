using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using aoc2022.Extensions;

namespace aoc2022
{
    public struct Sensor
    {
        public (long, long) Location { get; set; }
        public long? ManhattenDistance { get; set; }

        public Sensor(long x, long y, long distance)
        {
            Location = (x, y);
            ManhattenDistance = distance;
        }
    }

    public static class Day15
    {
        public static (HashSet<Sensor>, HashSet<(long, long)>) ParseSensorsAndBeacons(List<string> inputs)
        {
            var sensors = new HashSet<Sensor>();
            var beacons = new HashSet<(long, long)>();

            foreach(var input in inputs)
            {
                var x1 = input.IndexOf("x=") + 2;
                var x1End = input.IndexOf(',');
                var y1 = input.IndexOf("y=") + 2;
                var y1End = input.IndexOf(":");
                var x2 = input.IndexOf("x=", x1) + 2;
                var x2End = input.IndexOf(',', x2);
                var y2 = input.IndexOf("y=", y1) + 2;

                var x1Val = long.Parse(input.Substring(x1, x1End - x1));
                var y1Val = long.Parse(input.Substring(y1, y1End - y1));
                var x2Val = long.Parse(input.Substring(x2, x2End - x2));
                var y2Val = long.Parse(input.Substring(y2).TrimEnd());
                var manhattenDist = CalcManhattenDist(x1Val, y1Val, x2Val, y2Val);

                sensors.Add(new Sensor(x1Val, y1Val, manhattenDist));
                beacons.Add((x2Val, y2Val));
            }

            return (sensors, beacons);
        }

        public static long GetInvalidPositions(HashSet<Sensor> sensors, HashSet<(long, long)> beacons, int rowToCheck)
        {
            var invalidValues = new HashSet<long>();
            var beaconsInRow = beacons.Where(i => i.Item2 == rowToCheck).Select(i => i.Item1).ToHashSet();

            foreach(var sensor in sensors)
            {
                var (x, y) = sensor.Location;

                for (var ii = 0; true; ii++)
                {
                    var tempDist = CalcManhattenDist(x, y, x + ii, rowToCheck);
                    if (tempDist > sensor.ManhattenDistance) { break; }

                    if (ii == 0 && !beaconsInRow.Contains(x))
                    {
                        invalidValues.Add(x);
                    }
                    else
                    {
                        if (!beaconsInRow.Contains(x + ii))
                        {
                            invalidValues.Add(x + ii);
                        }
                        
                        if (!beaconsInRow.Contains(x - ii))
                        {
                            invalidValues.Add(x - ii);
                        }                        
                    }
                }
            }

            return invalidValues.Count();
        }

        public static long GetTuningFrequency(HashSet<Sensor> sensors, HashSet<(long, long)> beacons, int maxRange = 20)
        {
            var beaconPoint = LocateDistressBeacon(sensors, beacons, maxRange);
            return beaconPoint.Item1 * 4000000 + beaconPoint.Item2;
        }

        private static long CalcManhattenDist(long x1, long y1, long x2, long y2)
        {
            return Math.Abs(x1 - x2) + Math.Abs(y1 - y2);
        }        

        private static (long, long) LocateDistressBeacon(HashSet<Sensor> sensors, HashSet<(long, long)> beacons, int maxRange)
        {
            var perimeter = new HashSet<(long, long)>();

            // Find permitter of each sensor (+1 to each sensor's manhatten distance)
            foreach(var sensor in sensors)
            {
                var perimeterDist = (sensor.ManhattenDistance ?? 0) + 1;
                var xDiff = 0;
                for (var yDiff = perimeterDist; yDiff >= 0; yDiff--)
                {
                    perimeter.AddPerimeterPoint(sensor.Location.Item1 + xDiff, sensor.Location.Item2 + yDiff, maxRange);
                    perimeter.AddPerimeterPoint(sensor.Location.Item1 - xDiff, sensor.Location.Item2 + yDiff, maxRange);
                    perimeter.AddPerimeterPoint(sensor.Location.Item1 + xDiff, sensor.Location.Item2 - yDiff, maxRange);
                    perimeter.AddPerimeterPoint(sensor.Location.Item1 - xDiff, sensor.Location.Item2 - yDiff, maxRange);

                    xDiff++;                    
                }
            }

            // Check which perimeter location is outside of all sensor's max manhatten distance)
            foreach(var point in perimeter)
            {
                var isDistressBeacon = sensors.All(s => CalcManhattenDist(s.Location.Item1, s.Location.Item2, point.Item1, point.Item2) > s.ManhattenDistance);
                if (isDistressBeacon)
                {
                    return point;
                }
            }

            throw new Exception("Should never get here");
        }
    }
}
