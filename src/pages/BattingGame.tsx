import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScoreBoard } from '@/components/game/ScoreBoard';
import { RuleExplanationModal } from '@/components/game/RuleExplanationModal';
import { battingSituations, GameSituation } from '@/data/baseballData';
import { ArrowLeft, HelpCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

type PitchType = 'fastball' | 'curve' | 'slider' | 'changeup';
type SwingTiming = 'early' | 'perfect' | 'late' | 'miss';

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

const BattingGame = () => {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isPitching, setIsPitching] = useState(false);
  const [pitchType, setPitchType] = useState<PitchType | null>(null);
  const [pitchLocation, setPitchLocation] = useState<'strike' | 'ball' | null>(null);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [currentSituation, setCurrentSituation] = useState<GameSituation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [canSwing, setCanSwing] = useState(false);
  const [isBunting, setIsBunting] = useState(false);

  const getSituation = (id: string): GameSituation | undefined => {
    return battingSituations.find(s => s.id === id);
  };

  const showSituation = (id: string) => {
    const situation = getSituation(id);
    if (situation) {
      setCurrentSituation(situation);
      setIsModalOpen(true);
    }
  };

  const resetCount = useCallback(() => {
    setGameState(prev => ({ ...prev, balls: 0, strikes: 0 }));
  }, []);

  const advanceRunners = useCallback((bases: number, scoring: boolean = true) => {
    setGameState(prev => {
      let { runners, score, isTop } = prev;
      let runsScored = 0;

      for (let i = 0; i < bases; i++) {
        if (runners.third && scoring) {
          runsScored++;
          runners = { ...runners, third: false };
        }
        if (runners.second) {
          runners = { ...runners, third: true, second: false };
        }
        if (runners.first) {
          runners = { ...runners, second: true, first: false };
        }
      }

      if (runsScored > 0) {
        score = isTop 
          ? { ...score, away: score.away + runsScored }
          : { ...score, home: score.home + runsScored };
      }

      return { ...prev, runners, score };
    });
  }, []);

  const addOut = useCallback(() => {
    setGameState(prev => {
      const newOuts = prev.outs + 1;
      if (newOuts >= 3) {
        // Side retired
        const newIsTop = !prev.isTop;
        const newInning = newIsTop ? prev.inning : prev.inning + 1;
        
        if (newInning > 3) {
          return { ...prev, isGameOver: true, outs: 3 };
        }
        
        return {
          ...prev,
          outs: 0,
          balls: 0,
          strikes: 0,
          isTop: newIsTop,
          inning: newIsTop ? prev.inning : newInning,
          runners: { first: false, second: false, third: false },
        };
      }
      return { ...prev, outs: newOuts, balls: 0, strikes: 0 };
    });
  }, []);

  const handleStrikeout = useCallback(() => {
    setLastResult('삼진 아웃! ⚡');
    showSituation('strikeout');
    addOut();
    toast.error('삼진 아웃!');
  }, [addOut]);

  const handleWalk = useCallback(() => {
    setLastResult('볼넷! 🚶');
    showSituation('walk');
    
    setGameState(prev => {
      let { runners, score, isTop } = prev;
      
      // Push runners if bases are loaded
      if (runners.first && runners.second && runners.third) {
        const runsScored = 1;
        score = isTop 
          ? { ...score, away: score.away + runsScored }
          : { ...score, home: score.home + runsScored };
      } else {
        if (runners.second && runners.first) {
          runners = { ...runners, third: true };
        }
        if (runners.first) {
          runners = { ...runners, second: true };
        }
        runners = { ...runners, first: true };
      }
      
      return { ...prev, runners, score, balls: 0, strikes: 0 };
    });
    
    toast.success('볼넷으로 출루!');
  }, []);

  const determineHitResult = useCallback((timing: SwingTiming, isBunt: boolean): string => {
    const random = Math.random();
    
    if (isBunt) {
      // Bunt logic
      if (gameState.strikes === 2) {
        if (random < 0.4) {
          // Foul bunt with 2 strikes = three bunt out
          return 'threebuntout';
        }
      }
      if (random < 0.5) {
        return 'sacrifice'; // Successful sacrifice
      } else if (random < 0.7) {
        return 'groundout';
      } else {
        return 'foul';
      }
    }
    
    if (timing === 'perfect') {
      if (random < 0.1) return 'homerun';
      if (random < 0.2) return 'triple';
      if (random < 0.4) return 'double';
      if (random < 0.7) return 'single';
      if (random < 0.85) return 'flyout';
      return 'groundout';
    } else if (timing === 'early' || timing === 'late') {
      if (random < 0.1) return 'double';
      if (random < 0.25) return 'single';
      if (random < 0.45) return 'foul';
      if (random < 0.65) return 'flyout';
      if (random < 0.85) return 'groundout';
      return 'strike';
    }
    
    return 'strike';
  }, [gameState.strikes]);

  const processHitResult = useCallback((result: string) => {
    switch (result) {
      case 'homerun':
        const isGrandSlam = gameState.runners.first && gameState.runners.second && gameState.runners.third;
        if (isGrandSlam) {
          setLastResult('🎆 만루홈런!!! 🎆');
          showSituation('grandslam');
          toast.success('만루홈런! 4점!!!');
        } else {
          setLastResult('🎆 홈런!!! 🎆');
          showSituation('homerun');
          toast.success('홈런!');
        }
        setGameState(prev => {
          const runsScored = 1 + 
            (prev.runners.first ? 1 : 0) + 
            (prev.runners.second ? 1 : 0) + 
            (prev.runners.third ? 1 : 0);
          const score = prev.isTop
            ? { ...prev.score, away: prev.score.away + runsScored }
            : { ...prev.score, home: prev.score.home + runsScored };
          return { 
            ...prev, 
            score, 
            runners: { first: false, second: false, third: false },
            balls: 0,
            strikes: 0
          };
        });
        break;

      case 'triple':
        setLastResult('3루타! 🏃💨');
        showSituation('triple');
        advanceRunners(3);
        setGameState(prev => ({ ...prev, runners: { ...prev.runners, third: true }, balls: 0, strikes: 0 }));
        toast.success('3루타!');
        break;

      case 'double':
        setLastResult('2루타! 🏃');
        showSituation('double');
        advanceRunners(2);
        setGameState(prev => ({ ...prev, runners: { ...prev.runners, second: true }, balls: 0, strikes: 0 }));
        toast.success('2루타!');
        break;

      case 'single':
        setLastResult('안타! 👏');
        showSituation('single');
        advanceRunners(1);
        setGameState(prev => ({ ...prev, runners: { ...prev.runners, first: true }, balls: 0, strikes: 0 }));
        toast.success('안타!');
        break;

      case 'sacrifice':
        if (gameState.outs < 2 && (gameState.runners.first || gameState.runners.second || gameState.runners.third)) {
          setLastResult('희생번트 성공! 🙌');
          showSituation('sacrifice');
          advanceRunners(1, true);
          addOut();
          toast.info('희생번트 성공!');
        } else {
          setLastResult('땅볼 아웃!');
          showSituation('groundout');
          addOut();
          toast.error('아웃!');
        }
        break;

      case 'threebuntout':
        setLastResult('쓰리번트 아웃! 😱');
        showSituation('threebuntout');
        addOut();
        toast.error('쓰리번트 아웃!');
        break;

      case 'flyout':
        setLastResult('플라이 아웃!');
        showSituation('flyout');
        addOut();
        toast.error('플라이 아웃!');
        break;

      case 'groundout':
        // Check for double play
        if (gameState.outs < 2 && gameState.runners.first) {
          const dpChance = Math.random();
          if (dpChance < 0.4) {
            setLastResult('병살타! 💀💀');
            showSituation('doubleplay');
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
                  balls: 0,
                  strikes: 0,
                  isTop: newIsTop,
                  inning: newIsTop ? prev.inning : newInning,
                  runners: { first: false, second: false, third: false },
                };
              }
              return { 
                ...prev, 
                outs: newOuts, 
                runners: { ...prev.runners, first: false },
                balls: 0,
                strikes: 0
              };
            });
            toast.error('병살타!');
            return;
          }
        }
        setLastResult('땅볼 아웃!');
        showSituation('groundout');
        addOut();
        toast.error('땅볼 아웃!');
        break;

      case 'foul':
        if (gameState.strikes < 2) {
          setLastResult('파울!');
          showSituation('foul');
          setGameState(prev => ({ ...prev, strikes: prev.strikes + 1 }));
          toast.info('파울! 스트라이크 추가');
        } else {
          setLastResult('파울! (2S 유지)');
          toast.info('파울! 2스트라이크 유지');
        }
        break;

      case 'strike':
        setGameState(prev => {
          const newStrikes = prev.strikes + 1;
          if (newStrikes >= 3) {
            return prev; // Will be handled by strikeout
          }
          return { ...prev, strikes: newStrikes };
        });
        if (gameState.strikes + 1 >= 3) {
          handleStrikeout();
        } else {
          setLastResult('헛스윙! 스트라이크!');
          showSituation('strike');
          toast.warning('스트라이크!');
        }
        break;
    }
  }, [gameState, advanceRunners, addOut, handleStrikeout]);

  const startPitch = useCallback(() => {
    if (isPitching || gameState.isGameOver) return;
    
    setIsPitching(true);
    setLastResult(null);
    setIsBunting(false);
    
    // Random pitch type
    const pitchTypes: PitchType[] = ['fastball', 'curve', 'slider', 'changeup'];
    const selectedPitch = pitchTypes[Math.floor(Math.random() * pitchTypes.length)];
    setPitchType(selectedPitch);
    
    // Random location (70% strike, 30% ball)
    const isStrike = Math.random() < 0.7;
    setPitchLocation(isStrike ? 'strike' : 'ball');
    
    // Slower pitch speeds for better visibility (was 400-700, now 800-1400)
    const pitchSpeed = selectedPitch === 'fastball' ? 800 : 
                       selectedPitch === 'changeup' ? 1400 : 1100;
    
    // Allow swing after the ball travels a bit
    setTimeout(() => {
      setCanSwing(true);
    }, pitchSpeed * 0.4);
    
    // Auto-resolve if no swing after timeout - give more time to react
    setTimeout(() => {
      setCanSwing(false);
      setIsPitching(false);
      
      // If didn't swing
      if (isStrike) {
        setGameState(prev => {
          const newStrikes = prev.strikes + 1;
          if (newStrikes >= 3) {
            return prev;
          }
          return { ...prev, strikes: newStrikes };
        });
        if (gameState.strikes + 1 >= 3) {
          setLastResult('루킹 삼진! 👀');
          showSituation('strikeout');
          addOut();
          toast.error('루킹 삼진!');
        } else {
          setLastResult('스트라이크! (지켜봄)');
          showSituation('strike');
          toast.warning('스트라이크!');
        }
      } else {
        setGameState(prev => {
          const newBalls = prev.balls + 1;
          if (newBalls >= 4) {
            return prev;
          }
          return { ...prev, balls: newBalls };
        });
        if (gameState.balls + 1 >= 4) {
          handleWalk();
        } else {
          setLastResult('볼!');
          showSituation('ball');
          toast.info('볼!');
        }
      }
      
      setPitchType(null);
      setPitchLocation(null);
    }, pitchSpeed + 400);
  }, [isPitching, gameState, addOut, handleStrikeout, handleWalk]);

  const handleSwing = useCallback((bunt: boolean = false) => {
    if (!canSwing || !isPitching) return;
    
    setCanSwing(false);
    setIsPitching(false);
    setIsBunting(bunt);
    
    // Determine timing based on when they swung
    const timing: SwingTiming = Math.random() < 0.3 ? 'perfect' : 
                                Math.random() < 0.6 ? 'early' : 'late';
    
    // If it's a ball and they swing
    if (pitchLocation === 'ball') {
      const badSwing = Math.random() < 0.7; // 70% chance to miss a ball
      if (badSwing) {
        if (bunt) {
          // Bunt at ball = likely foul or miss
          const result = Math.random() < 0.6 ? 'foul' : 'strike';
          processHitResult(result);
        } else {
          processHitResult('strike');
        }
        setPitchType(null);
        setPitchLocation(null);
        return;
      }
    }
    
    const result = determineHitResult(timing, bunt);
    processHitResult(result);
    
    setPitchType(null);
    setPitchLocation(null);
  }, [canSwing, isPitching, pitchLocation, determineHitResult, processHitResult]);

  const resetGame = () => {
    setGameState(initialGameState);
    setLastResult(null);
    setCurrentSituation(null);
    setPitchType(null);
    setPitchLocation(null);
    toast.success('게임을 다시 시작합니다!');
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block keyboard controls when modal is open
      if (isModalOpen) return;
      
      if (e.code === 'Space' && !isPitching && !gameState.isGameOver) {
        e.preventDefault();
        startPitch();
      } else if (e.code === 'Space' && canSwing) {
        e.preventDefault();
        handleSwing(false);
      } else if (e.code === 'KeyB' && canSwing) {
        e.preventDefault();
        handleSwing(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPitching, canSwing, gameState.isGameOver, isModalOpen, startPitch, handleSwing]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Button>
          <h1 className="text-2xl font-bold text-foreground">⚾ 타격 게임</h1>
          <Button variant="outline" onClick={resetGame} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            다시 시작
          </Button>
        </div>

        {/* Score Board */}
        <ScoreBoard {...gameState} />

        {/* Game Area */}
        <Card className="mt-6 overflow-hidden">
          <CardContent className="p-0">
            {/* Baseball Field View */}
            <div className="relative bg-gradient-to-b from-field-green to-field-green-light h-80 flex items-center justify-center overflow-hidden">
              {/* Strike Zone */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-32 h-40 border-2 border-dashed border-baseball-white/50 rounded-sm" />
              
              {/* Pitcher */}
              <div className="absolute top-16 left-1/2 -translate-x-1/2 text-5xl">
                {isPitching ? '🤾' : '🧍'}
              </div>

              {/* Ball Animation */}
              {isPitching && (
                <div 
                  className={`absolute text-5xl z-10 ${pitchLocation === 'strike' ? 'animate-pitch-strike' : 'animate-pitch-ball'}`}
                  style={{ 
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
                  }}
                >
                  ⚾
                </div>
              )}

              {/* Batter */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-5xl transform -scale-x-100">
                {canSwing ? '🏏' : '🧍'}
              </div>

              {/* Result Display */}
              {lastResult && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card/95 backdrop-blur px-6 py-4 rounded-xl shadow-2xl animate-fade-in">
                  <p className="text-2xl font-bold text-foreground text-center">{lastResult}</p>
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

              {/* Game Over */}
              {gameState.isGameOver && (
                <div className="absolute inset-0 bg-background/90 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-4">경기 종료!</h2>
                    <p className="text-xl text-muted-foreground mb-6">
                      최종 점수: 원정 {gameState.score.away} - {gameState.score.home} 홈
                    </p>
                    <Button onClick={resetGame} size="lg">
                      다시 하기
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="bg-card p-6 border-t border-border">
              <div className="flex flex-col items-center gap-4">
                {!isPitching && !gameState.isGameOver && (
                  <Button 
                    onClick={startPitch} 
                    size="lg" 
                    className="w-full max-w-xs text-lg"
                  >
                    투구 받기 (스페이스바)
                  </Button>
                )}

                {canSwing && (
                  <div className="flex gap-4 animate-fade-in">
                    <Button 
                      onClick={() => handleSwing(false)} 
                      size="lg" 
                      className="text-lg bg-accent hover:bg-accent/90"
                    >
                      스윙! (스페이스바)
                    </Button>
                    <Button 
                      onClick={() => handleSwing(true)} 
                      size="lg" 
                      variant="outline"
                      className="text-lg"
                    >
                      번트 (B키)
                    </Button>
                  </div>
                )}

                {isPitching && !canSwing && (
                  <p className="text-muted-foreground animate-pulse">투구 중...</p>
                )}

                <p className="text-sm text-muted-foreground text-center">
                  💡 스페이스바로 투구를 받고, 타이밍에 맞춰 스윙하세요!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Situations Quick Access */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <span className="text-sm text-muted-foreground mr-2">규칙 보기:</span>
          {['strike', 'ball', 'single', 'homerun', 'threebuntout', 'doubleplay'].map(id => {
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

export default BattingGame;
