public class NodeComparer : IEqualityComparer<Node> {
    public bool Equals(Node one, Node two) {
        return one.Row == two.Row && one.Col == two.Col;
    }

    public int GetHashCode(Node node) {
        return $"{node.Row},{node.Col}".GetHashCode();
    }
}

public class Node {
    public int Row { get; set; }
    public int Col { get; set; }
    public char Elevation { get; set; }
    public int StepsToReach { get; set;}

    public List<Node> Neighbors { get; set;}
    public Node? Parent { get; set;}

    public Node(int row, int col, char elevation) {
        Row = row;
        Col = col;
        Elevation = elevation;
        Neighbors = new List<Node>();
        StepsToReach = elevation == 'S' ? 0 : int.MaxValue;
    }

    // Normally this should be private, but I wanted to unit test this.
    // S (Starting Elevation) is equivalent to 'a'
    // E (Ending Elevation) is equivalent to 'z'
    public static bool IsValidStep(char currentElevation, char nextElevation) {
        currentElevation = currentElevation == 'S' ? 'a' : currentElevation;
        nextElevation = nextElevation == 'E' ? 'z' : nextElevation;
        
        return nextElevation - currentElevation <= 1;
    }

    public static List<Node> BuildGraph(List<string> input) {
        var nodeList = new List<Node>();
        var nodeCount = input.Count() * input[0].Length;
        var maxRow = input.Count();
        var maxCol = input[0].Length;

        


        var row = 0;
        var grid = new char[input.Count()][];
        foreach (var line in input) {
            grid[row++] = line.ToCharArray();            
        }

        // build all the nodes
        for (var ii = 0; ii < maxRow; ii++) {
            for (var jj = 0; jj < maxCol; jj++) {
                nodeList.Add(new Node(ii, jj, grid[ii][jj]));
            }
        }

        // neighboring nodes (top, right, bottom, left)
        var neighbors = new [] { (-1, 0), (0, 1), (1, 0), (0, -1) };
        foreach (var node in nodeList)
        {
            foreach ((var rowDiff, var colDiff) in neighbors) {
                var nextNode = nodeList.FirstOrDefault(i => i.Row == node.Row + rowDiff && i.Col == node.Col + colDiff);
                if (nextNode != null && IsValidStep(node.Elevation, nextNode.Elevation)) node.Neighbors.Add(nextNode);
            }
        }

        return nodeList;
    }

    // Using BFS
    public static int FindShortestPath(List<Node> grid, Node start, Node end)
    {
        var queue = new Queue<Node>();
        var visited = new HashSet<Node>();

        visited.Add(start);
        queue.Enqueue(start);
        
        while(queue.Any()) {
            var node = queue.Dequeue();
            
            foreach (var neighbor in node.Neighbors)
            {
                if (!visited.Contains(neighbor))
                {
                    neighbor.StepsToReach = node.StepsToReach + 1;
                    neighbor.Parent = node;

                    if (neighbor.Elevation == end.Elevation)
                    {
                        return neighbor.StepsToReach;
                    }

                    visited.Add(neighbor);
                    queue.Enqueue(neighbor);
                }
            }
            // if (addedOK) {
            //     foreach((var rowDiff, var colDiff) in neighbors) {
            //         var nextNode = grid.FirstOrDefault(n => n.Row == node.Row + rowDiff && n.Col == node.Col + colDiff);    
            //         if (nextNode != null && IsValidStep(node.Elevation, nextNode.Elevation)) {

            //             nextNode.Parent = node;
            //             nextNode.StepsToReach = node.StepsToReach + 1;

            //             if (nextNode.Elevation == 'E')
            //             {
            //                 return nextNode.StepsToReach;
            //             }

            //             if (!visitedNodes.Contains(nextNode))
            //             {
            //                 nextToVisit.Enqueue(nextNode);
            //             }                        
            //         }
            //     }
            // }
        }

        return end.StepsToReach;
    }
}

