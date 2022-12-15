using System.Linq;

public class Monkey {
    public List<long> Items { get; set; }
    public string Operation { get; set; }
    public long Test { get; set; }
    public int TestTrueMonkeyIndex { get; set; }
    public int TestFalseMonkeyIndex { get; set; }
    public long InspectCounter { get; set;}

    public Monkey() {
        Operation = String.Empty;
        Items = new List<long>();        
    }

    public override string ToString() {
        return $"I have {Items.Count()} items and [{Operation}]";
    }

    private static string replaceOld(string operation, long oldVal) {
        if (operation == null) return String.Empty;

        while (operation.Contains("old")) {
            operation = operation.Replace("old", oldVal.ToString());
        }    

        return operation;
    }

    private static long evaluateWorryLevel(string operation) {
        var inputs = operation.Split(' ');
        var a = long.Parse(inputs[0]);
        var b = long.Parse(inputs[2]);

        switch (inputs[1]) {
            case "*":
                return a * b;
            case "+":
                return a + b;
            case "-":
                return a - b;
        }

        throw new Exception("We shouldn't get here");
    }

    public static void RunMonkeyBusiness(List<string> inputs) {
        // Initializing monkeys
        var monkeys = new List<Monkey>();

        // Initializing Monkeys
        for (var ii = 0; ii < inputs.Count(); ii++) {
            var tempMonkey = new Monkey();
            //var monkeyIdx = inputs[ii][7];

            tempMonkey.Items = inputs[ii+1].Substring(18).Split(", ").Select(val => long.Parse(val)).ToList();
            tempMonkey.Operation = inputs[ii+2].Split(" = ").Last();
            tempMonkey.Test = long.Parse(inputs[ii+3].Substring(21));
            tempMonkey.TestTrueMonkeyIndex = int.Parse(inputs[ii+4].Last().ToString());
            tempMonkey.TestFalseMonkeyIndex = int.Parse(inputs[ii+5].Last().ToString());
            monkeys.Add(tempMonkey);
            ii += 6;
        }

        var prodOfPrimes = monkeys.Select(i => i.Test).Aggregate((total, next) => total * next);

        // Let the monkey business begin
        var totalRounds = 10000;
        for(var ii = 0; ii < totalRounds; ii++) {
            for(var jj = 0; jj < monkeys.Count(); jj++) {
                //inspect items
                foreach(var item in monkeys[jj].Items) {
                    var newFormula = replaceOld(monkeys[jj].Operation, item);
                    var newWorryLevel = evaluateWorryLevel(newFormula);

                    // Test and throw to another monkey
                    var nextMonkey = newWorryLevel % monkeys[jj].Test == 0 ? monkeys[jj].TestTrueMonkeyIndex : monkeys[jj].TestFalseMonkeyIndex;
                    monkeys[nextMonkey].Items.Add(newWorryLevel % prodOfPrimes);
                }

                monkeys[jj].InspectCounter += monkeys[jj].Items.Count();
                monkeys[jj].Items.Clear();
            }
        }
        
        for (var i = 0; i < monkeys.Count(); i++) {
            Console.WriteLine($"    Monkey {i} inspected {monkeys[i].InspectCounter}");
        }
        
        var countList = monkeys.Select(i => i.InspectCounter).ToList();
        countList.Sort();
        countList.Reverse();

        Console.WriteLine($"P2 = {countList[0] * countList[1]}");
    }
}