// See https://aka.ms/new-console-template for more information
var inputs = File.ReadLines("input.txt");

// Day 11 (Part 2)
//Monkey.RunMonkeyBusiness(inputs.ToList());

// Day 12
var nodeList = Node.BuildGraph(inputs.ToList());
var start = nodeList.FirstOrDefault(i => i.Elevation == 'S');
Console.WriteLine($"Start node[{start.Elevation} is located at ({start.Row},{start.Col}) and has {start.nodes.Count()} nodes.");