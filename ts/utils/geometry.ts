export default class Point {
    X = 0;
    Y = 0;

    constructor(private x:number, private y:number){
        this.X = x;
        this.Y = y;
    }

    // Is the point adjacent to p.
    // X == is Adjacent, . = current point
    // xxx
    // x.x
    // xxx    
    isNextTo(p:Point):boolean {
        // if the points overlap        
        if (p.X == this.X && p.Y == this.Y) return true;

        // if the point is to the left or right
        if (p.Y  == this.Y && (p.X == this.X+1 || p.X == this.X-1)) return true;

        // if the point is above or below
        if (p.X == this.X && (p.Y == this.Y+1 || p.Y == this.Y-1)) return true;

        // if the point is on the left corners
        if ((p.X == this.X-1 || p.X == this.X+1) && (p.Y == this.Y+1 || p.Y == this.Y-1)) return true;

        return false;
    }
}