import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { RuleExplanationModal } from '@/components/game/RuleExplanationModal';
import { fieldingSituations, GameSituation } from '@/data/baseballData';
import { ArrowLeft, HelpCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

interface Ball {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  type: 'fly' | 'ground' | 'line';
  speed: number;
}

interface GameState {
  inning: number;
  isTop: boolean;
  outs: number;
  balls: number;
  strikes: number;
  score: { home: number; away: number };
  runners: { first: boolean; second: boolean; third: boolean };
  isGameOver: boolean;
}

interface GlovePosition {
  x: number;
  y: number;
}

const initialGameState: GameState = {
  inning: 1,
  isTop: true,
  outs: 0,
  balls: 0,
  strikes: 0,
  score: { home: 0, away: 0 },
  runners: { first: false, second: false, third: false },
  isGameOver: false,
};

const FieldingGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [glovePosition, setGlovePosition] = useState<GlovePosition>({ x: 50, y: 70 });
  const [balls, setBalls] = useState<Ball[]>([]);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [currentSituation, setCurrentSituation] = useState<GameSituation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [catchCount, setCatchCount] = useState(0);
  const [missCount, setMissCount] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastBallTime = useRef<number>(0);

  const getSituation = (id: string): GameSituation | undefined => {
    return fieldingSituations.find(s => s.id === id);
  };

  const showSituation = (id: string) => {
    const situation = getSituation(id);
    if (situation) {
      setCurrentSituation(situation);
      setIsModalOpen(true);
    }
  };

  const addOut = useCallback(() => {
    setGameState(prev => {
      const newOuts = prev.outs + 1;
      if (newOuts >= 3) {
        const newIsTop = !prev.isTop;
        const newInning = newIsTop ? prev.inning : prev.inning + 1;
        
        if (newInning > 3) {
          return { ...prev, isGameOver: true, outs: 3 };
        }
        
        return {
          ...prev,
          outs: 0,
          isTop: newIsTop,
          inning: newIsTop ? prev.inning : newInning,
          runners: { first: false, second: false, third: false },
        };
      }
      return { ...prev, outs: newOuts };
    });
  }, []);

  const spawnBall = useCallback(() => {
    const types: ('fly' | 'ground' | 'line')[] = ['fly', 'ground', 'line'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const targetX = 20 + Math.random() * 60; // 20-80% of width
    const targetY = type === 'fly' ? 50 + Math.random() * 30 : 70 + Math.random() * 20;
    
    // Slower speeds for better playability (was 2-4, now 0.6-1.2)
    const newBall: Ball = {
      id: Date.now(),
      x: 50,
      y: 5,
      targetX,
      targetY,
      type,
      speed: type === 'ground' ? 0.8 : type === 'line' ? 1.2 : 0.6,
    };

    setBalls(prev => [...prev, newBall]);
  }, []);

  const handleCatch = useCallback((ball: Ball) => {
    setBalls(prev => prev.filter(b => b.id !== ball.id));
    setCatchCount(prev => prev + 1);
    
    const random = Math.random();
    
    if (ball.type === 'fly') {
      setLastResult('플라이볼 캐치! 👏');
      showSituation('flyout_catch');
      addOut();
      toast.success('플라이볼 아웃!');
      
      // Chance for tag up situation
      if (gameState.runners.third && gameState.outs < 2 && random < 0.3) {
        setTimeout(() => {
          setLastResult('태그업 득점 허용! 😓');
          showSituation('tagup');
          setGameState(prev => ({
            ...prev,
            score: prev.isTop 
              ? { ...prev.score, away: prev.score.away + 1 }
              : { ...prev.score, home: prev.score.home + 1 },
            runners: { ...prev.runners, third: false }
          }));
          toast.info('태그업으로 득점!');
        }, 500);
      }
    } else if (ball.type === 'ground') {
      // Check for double play opportunity
      if (gameState.runners.first && gameState.outs < 2 && random < 0.5) {
        setLastResult('병살타 완성! 💪');
        showSituation('double_play');
        setGameState(prev => {
          const newOuts = prev.outs + 2;
          if (newOuts >= 3) {
            const newIsTop = !prev.isTop;
            const newInning = newIsTop ? prev.inning : prev.inning + 1;
            if (newInning > 3) {
              return { ...prev, isGameOver: true, outs: 3 };
            }
            return {
              ...prev,
              outs: 0,
              isTop: newIsTop,
              inning: newIsTop ? prev.inning : newInning,
              runners: { first: false, second: false, third: false },
            };
          }
          return { ...prev, outs: newOuts, runners: { ...prev.runners, first: false } };
        });
        toast.success('병살 완성!');
      } else {
        setLastResult('땅볼 처리! 👏');
        showSituation('groundball');
        addOut();
        toast.success('땅볼 아웃!');
      }
    } else {
      setLastResult('라인드라이브 캐치! 🔥');
      showSituation('flyout_catch');
      addOut();
      toast.success('라인드라이브 아웃!');
    }
  }, [gameState, addOut]);

  const handleMiss = useCallback((ball: Ball) => {
    setBalls(prev => prev.filter(b => b.id !== ball.id));
    setMissCount(prev => prev + 1);
    
    const random = Math.random();
    
    if (ball.type === 'ground') {
      if (random < 0.3) {
        setLastResult('에러! 실책! 😱');
        showSituation('error');
        // Runner advances
        setGameState(prev => {
          let { runners, score, isTop } = prev;
          if (runners.third) {
            score = isTop 
              ? { ...score, away: score.away + 1 }
              : { ...score, home: score.home + 1 };
            runners = { ...runners, third: false };
          }
          if (runners.second) {
            runners = { ...runners, third: true, second: false };
          }
          if (runners.first) {
            runners = { ...runners, second: true, first: false };
          }
          runners = { ...runners, first: true };
          return { ...prev, runners, score };
        });
        toast.error('에러!');
      } else {
        setLastResult('안타 허용! 😓');
        setGameState(prev => {
          let { runners, score, isTop } = prev;
          if (runners.third) {
            score = isTop 
              ? { ...score, away: score.away + 1 }
              : { ...score, home: score.home + 1 };
            runners = { ...runners, third: false };
          }
          if (runners.second) {
            runners = { ...runners, third: true, second: false };
          }
          if (runners.first) {
            runners = { ...runners, second: true, first: false };
          }
          runners = { ...runners, first: true };
          return { ...prev, runners, score };
        });
        toast.warning('안타 허용!');
      }
    } else {
      setLastResult('놓쳤다! 😰');
      // Fly ball or line drive not caught = extra base hit
      setGameState(prev => {
        let { runners, score, isTop } = prev;
        const runsScored = (runners.third ? 1 : 0) + (runners.second ? 1 : 0);
        if (runsScored > 0) {
          score = isTop 
            ? { ...score, away: score.away + runsScored }
            : { ...score, home: score.home + runsScored };
        }
        runners = { 
          first: false, 
          second: runners.first || false, 
          third: ball.type === 'line' 
        };
        return { ...prev, runners, score };
      });
      toast.error('2루타 허용!');
    }
  }, []);

  // Manual hit function - spawns a ball when user clicks
  const handleHit = useCallback(() => {
    if (!isPlaying || gameState.isGameOver || isModalOpen || balls.length > 0) return;
    spawnBall();
    setLastResult(null);
  }, [isPlaying, gameState.isGameOver, isModalOpen, balls.length, spawnBall]);

  // Game loop - only updates ball positions and checks catches/misses (no auto spawn)
  useEffect(() => {
    if (!isPlaying || gameState.isGameOver) return;

    const gameLoop = () => {
      // Update ball positions
      setBalls(prev => prev.map(ball => {
        const dx = ball.targetX - ball.x;
        const dy = ball.targetY - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 2) {
          // Ball reached target
          return ball;
        }

        return {
          ...ball,
          x: ball.x + (dx / distance) * ball.speed,
          y: ball.y + (dy / distance) * ball.speed,
        };
      }));

      // Check for catches and misses
      balls.forEach(ball => {
        const dx = ball.x - glovePosition.x;
        const dy = ball.y - glovePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Check if ball is caught (within catch radius)
        if (distance < 10) {
          handleCatch(ball);
        }
        // Check if ball is missed (reached target without being caught)
        else if (Math.abs(ball.x - ball.targetX) < 2 && Math.abs(ball.y - ball.targetY) < 2) {
          handleMiss(ball);
        }
      });

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    animationRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, gameState.isGameOver, balls, glovePosition, handleCatch, handleMiss]);

  // Mouse/touch controls
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || !isPlaying) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setGlovePosition({ x: Math.max(5, Math.min(95, x)), y: Math.max(30, Math.min(90, y)) });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!gameAreaRef.current || !isPlaying) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    setGlovePosition({ x: Math.max(5, Math.min(95, x)), y: Math.max(30, Math.min(90, y)) });
  };

  const startGame = () => {
    setIsPlaying(true);
    setCatchCount(0);
    setMissCount(0);
    lastBallTime.current = 0;
    toast.success('게임 시작! 글러브를 움직여 공을 잡으세요!');
  };

  const resetGame = () => {
    setGameState(initialGameState);
    setIsPlaying(false);
    setBalls([]);
    setLastResult(null);
    setCatchCount(0);
    setMissCount(0);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    toast.success('게임을 다시 시작합니다!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Button>
          <h1 className="text-2xl font-bold text-foreground">🧤 수비 게임</h1>
          <Button variant="outline" onClick={resetGame} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            다시 시작
          </Button>
        </div>

        {/* Score Board */}
        <ScoreBoard {...gameState} />

        {/* Stats */}
        <div className="mt-4 flex justify-center gap-8 text-sm">
          <div className="text-center">
            <span className="text-muted-foreground">캐치</span>
            <div className="text-2xl font-bold text-success">{catchCount}</div>
          </div>
          <div className="text-center">
            <span className="text-muted-foreground">미스</span>
            <div className="text-2xl font-bold text-destructive">{missCount}</div>
          </div>
        </div>

        {/* Game Area */}
        <Card className="mt-6 overflow-hidden">
          <CardContent className="p-0">
            <div 
              ref={gameAreaRef}
              className="relative bg-gradient-to-b from-field-green to-field-green-light h-80 cursor-none select-none touch-none"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* Field markings */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-dirt-light rounded-full" /> {/* Pitcher mound */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-dirt-light transform rotate-45" /> {/* Home plate */}
              
              {/* Bases */}
              <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-baseball-white rotate-45" /> {/* 1st */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-4 h-4 bg-baseball-white rotate-45" /> {/* 2nd */}
              <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-baseball-white rotate-45" /> {/* 3rd */}

              {/* Balls */}
              {balls.map(ball => (
                <div
                  key={ball.id}
                  className="absolute pointer-events-none"
                  style={{ 
                    left: `${ball.x}%`, 
                    top: `${ball.y}%`,
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                    fontSize: ball.type === 'fly' ? '2.5rem' : '2rem',
                    transition: 'font-size 0.3s ease',
                  }}
                >
                  ⚾
                </div>
              ))}

              {/* Glove */}
              {isPlaying && (
                <div
                  className="absolute text-4xl transition-all duration-50 pointer-events-none"
                  style={{ 
                    left: `${glovePosition.x}%`, 
                    top: `${glovePosition.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  🧤
                </div>
              )}

              {/* Result Display */}
              {lastResult && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card/95 backdrop-blur px-6 py-4 rounded-xl shadow-2xl animate-fade-in z-10">
                  <p className="text-xl font-bold text-foreground text-center">{lastResult}</p>
                  {currentSituation && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 w-full gap-2"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <HelpCircle className="w-4 h-4" />
                      이게 뭐예요?
                    </Button>
                  )}
                </div>
              )}

              {/* Start Screen */}
              {!isPlaying && !gameState.isGameOver && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">수비 게임</h2>
                    <p className="text-muted-foreground mb-6">
                      마우스나 터치로 글러브를 움직여<br />날아오는 공을 잡으세요!
                    </p>
                    <Button onClick={startGame} size="lg">
                      게임 시작
                    </Button>
                  </div>
                </div>
              )}

              {/* Game Over */}
              {gameState.isGameOver && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">경기 종료!</h2>
                    <p className="text-xl text-muted-foreground mb-2">
                      최종 점수: 원정 {gameState.score.away} - {gameState.score.home} 홈
                    </p>
                    <p className="text-muted-foreground mb-6">
                      캐치: {catchCount} | 미스: {missCount}
                    </p>
                    <Button onClick={resetGame} size="lg">
                      다시 하기
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Hit Button & Controls Info */}
            <div className="bg-card p-4 border-t border-border text-center space-y-3">
              {isPlaying && !gameState.isGameOver && (
                <Button 
                  onClick={handleHit} 
                  size="lg" 
                  disabled={isModalOpen || balls.length > 0}
                  className="gap-2 text-lg px-8"
                >
                  ⚾ 타격하기
                </Button>
              )}
              <p className="text-sm text-muted-foreground">
                💡 마우스나 터치로 글러브(🧤)를 움직여 공(⚾)을 잡으세요!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Situations Quick Access */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground mr-2">규칙 보기:</span>
          {['flyout_catch', 'groundball', 'forceout', 'tagout', 'tagup', 'error', 'stolen_base'].map(id => {
            const situation = getSituation(id);
            if (!situation) return null;
            return (
              <Button
                key={id}
                variant="outline"
                size="sm"
                onClick={() => showSituation(id)}
                className="gap-1"
              >
                <HelpCircle className="w-3 h-3" />
                {situation.name}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Rule Explanation Modal */}
      <RuleExplanationModal 
        situation={currentSituation} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default FieldingGame;
