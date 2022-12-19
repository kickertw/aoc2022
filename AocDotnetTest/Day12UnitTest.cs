namespace AocDotnetTest
{
    public class Day12UnitTest
    {
        [Theory]
        [InlineData('S', 'a')]
        [InlineData('a', 'b')]
        [InlineData('b', 'a')]
        [InlineData('z', 'a')]
        [InlineData('z', 'E')]
        public void IsValidStepOld_CorrectElevations_ReturnTrue(char start, char end)
        {
            var result = Node.IsValidStep(start, end);

            Assert.True(result);
        }

        [Theory]
        [InlineData('S', 'b')]
        [InlineData('a', 'c')]
        [InlineData('a', 'e')]
        [InlineData('y', 'E')]
        public void IsValidStepOld_BadElevations_ReturnFalse(char start, char end)
        {
            var result = Node.IsValidStep(start, end);

            Assert.False(result);
        }
    }
}