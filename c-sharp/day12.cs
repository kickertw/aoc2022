public class Node {
    public int Row { get; set; }
    public int Col { get; set; }
    public HashSet<Node> nodes { get; set; }
    public char Elevation { get; set; }

    public Node(int row, int col, char elevation) {
        Row = row;
        Col = col;
        Elevation = elevation;
        nodes = new HashSet<Node>();
    }

    public void AddNode(Node node) {
        if (!nodes.Contains(node)) {
            nodes.Add(node);
        }
    }

    public static List<Node> BuildGraph(List<string> input) {
        var nodeList = new List<Node>();
        var nodeCount = input.Count() * input[0].Length;

        var row = 0;
        var grid = new char[input.Count()][];
        foreach (var line in input) {
            grid[row++] = line.ToCharArray();            
        }

        // build all the nodes
        for (var ii = 0; ii < input.Count(); ii++) {
            for (var jj = 0; jj < input[0].Length; jj++) {
                nodeList.Add(new Node(ii, jj, grid[ii][jj]));
            }
        }

        // connect the nodes
        foreach (var node in nodeList) {
            var top = nodeList.FirstOrDefault(n => n.Row == node.Row - 1 && n.Col == node.Col);
            var right = nodeList.FirstOrDefault(n => n.Row == node.Row && n.Col == node.Col + 1);
            var bot = nodeList.FirstOrDefault(n => n.Row == node.Row + 1 && n.Col == node.Col);
            var left = nodeList.FirstOrDefault(n => n.Row == node.Row && n.Col == node.Col - 1);

            var isStartOrEnd = node.Elevation == 'S' || node.Elevation == 'E' ? true : false;

            if (top != null && (isStartOrEnd || Math.Abs(top.Elevation - node.Elevation) <= 1)) { node.AddNode(top); }
            if (right != null && (isStartOrEnd || Math.Abs(right.Elevation - node.Elevation) <= 1)) { node.AddNode(right); }
            if (bot != null && (isStartOrEnd || Math.Abs(bot.Elevation - node.Elevation) <= 1)) { node.AddNode(bot); }
            if (left != null && (isStartOrEnd || Math.Abs(left.Elevation - node.Elevation) <= 1)) { node.AddNode(left); }
        }

        return nodeList;
    }
}

