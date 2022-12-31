namespace aoc2022.Extensions
{
    public static class Aoc2022Extensions
    {
        public static void AddPerimeterPoint(this HashSet<(long, long)> perimeters, long x, long y, long maxRange)
        {
            if (x >= 0 && x <= maxRange && y >= 0 && y <= maxRange)
            {
                perimeters.Add((x,y));
            }            
        }
    }
}