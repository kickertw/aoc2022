﻿// See https://aka.ms/new-console-template for more information
using aoc2022;

var inputs = File.ReadLines("input.txt");

#region Solved Problems
// Day 11 (Part 2)
//Monkey.RunMonkeyBusiness(inputs.ToList());

// Day 12
// var nodeList = Node.BuildGraph(inputs.ToList());
// var start = nodeList.First(i => i.Elevation == 'S');
// var end = nodeList.First(i => i.Elevation == 'E');
// var minSteps = Node.FindShortestPath(nodeList, start, end);
// Console.WriteLine($"P1 = {minSteps}");

// minSteps = int.MaxValue;
// var lowNodeList = nodeList.Where(i => i.Elevation == 'a' || i.Elevation == 'S');
// foreach (var startNode in lowNodeList)
// {
//     nodeList.ForEach(i => i.StepsToReach = 0);
//     var steps = Node.FindShortestPath(nodeList, startNode, end);
//     if (steps > 0)
//     {
//         minSteps = minSteps > steps ? steps : minSteps;
//     }    
// }
// Console.WriteLine($"P2 = {minSteps}");
#endregion

var cave = Day14.CreateCave(inputs.ToList());
var p1 = Day14.DropSand(cave, (500, 0));
Console.WriteLine($"P1 = {p1}");