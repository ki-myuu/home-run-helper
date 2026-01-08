interface ScoreBoardProps {
  inning: number;
  isTop: boolean;
  outs: number;
  balls: number;
  strikes: number;
  score: { home: number; away: number };
  runners: { first: boolean; second: boolean; third: boolean };
}

export const ScoreBoard = ({ 
  inning, 
  isTop, 
  outs, 
  balls, 
  strikes, 
  score,
  runners 
}: ScoreBoardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-lg border border-border">
      <div className="grid grid-cols-3 gap-4">
        {/* Inning Display */}
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">이닝</div>
          <div className="text-2xl font-bold text-foreground">
            {inning}회 {isTop ? '초' : '말'}
          </div>
        </div>

        {/* Score */}
        <div className="text-center border-x border-border px-4">
          <div className="text-xs text-muted-foreground mb-1">점수</div>
          <div className="flex justify-center gap-4">
            <div>
              <span className="text-xs text-muted-foreground">원정</span>
              <div className="text-2xl font-bold text-foreground">{score.away}</div>
            </div>
            <span className="text-2xl text-muted-foreground">:</span>
            <div>
              <span className="text-xs text-muted-foreground">홈</span>
              <div className="text-2xl font-bold text-foreground">{score.home}</div>
            </div>
          </div>
        </div>

        {/* Count and Outs */}
        <div className="text-center">
          <div className="text-xs text-muted-foreground mb-1">카운트</div>
          <div className="flex justify-center gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">B</span>
              <div className="flex gap-1 mt-1">
                {[0, 1, 2].map(i => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < balls ? 'bg-success' : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">S</span>
              <div className="flex gap-1 mt-1">
                {[0, 1].map(i => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < strikes ? 'bg-warning' : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">O</span>
              <div className="flex gap-1 mt-1">
                {[0, 1].map(i => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-full ${i < outs ? 'bg-destructive' : 'bg-muted'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diamond Runner Display */}
      <div className="mt-4 flex justify-center">
        <div className="relative w-20 h-20">
          {/* Diamond shape */}
          <div className="absolute inset-0 rotate-45 border-2 border-border rounded-sm bg-muted/50" />
          
          {/* Home */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-card border-2 border-border rounded-sm" />
          
          {/* First base */}
          <div className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border-2 ${runners.first ? 'bg-primary border-primary' : 'bg-card border-border'}`} />
          
          {/* Second base */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border-2 ${runners.second ? 'bg-primary border-primary' : 'bg-card border-border'}`} />
          
          {/* Third base */}
          <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-sm border-2 ${runners.third ? 'bg-primary border-primary' : 'bg-card border-border'}`} />
        </div>
      </div>
    </div>
  );
};
