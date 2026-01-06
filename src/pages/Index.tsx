import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Baseball field pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-4 border-primary rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-0 h-0 
            border-l-[150px] border-l-transparent
            border-r-[150px] border-r-transparent
            border-b-[200px] border-b-primary" />
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Logo and Title */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary rounded-full mb-6 shadow-lg">
              <span className="text-4xl">⚾</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4">
              야구 첫걸음
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              재미있는 미니게임으로 야구 규칙을 쉽게 배워보세요!
            </p>
          </div>

          {/* Game Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
            {/* Batting Game Card */}
            <Card 
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-primary/30 overflow-hidden"
              onClick={() => navigate('/batting')}
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-8">
                  <div className="text-6xl mb-4 group-hover:animate-swing inline-block">🏏</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">타격 게임</h2>
                  <p className="text-muted-foreground mb-4">
                    투수의 공을 타이밍에 맞춰 쳐보세요!<br />
                    안타, 홈런, 삼진 등 다양한 상황을 경험해요.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">스윙</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">번트</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">홈런</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">쓰리번트</span>
                  </div>
                </div>
                <div className="bg-card p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">클릭하여 시작</span>
                  <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                    시작하기 →
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Fielding Game Card */}
            <Card 
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 border-transparent hover:border-accent/30 overflow-hidden"
              onClick={() => navigate('/fielding')}
            >
              <CardContent className="p-0">
                <div className="bg-gradient-to-br from-accent/20 to-accent/5 p-8">
                  <div className="text-6xl mb-4 group-hover:animate-catch inline-block">🧤</div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">수비 게임</h2>
                  <p className="text-muted-foreground mb-4">
                    날아오는 공을 잡고 송구해보세요!<br />
                    태그아웃, 병살, 도루 저지 등을 배워요.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">캐치</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">송구</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">병살</span>
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">도루저지</span>
                  </div>
                </div>
                <div className="bg-card p-4 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">클릭하여 시작</span>
                  <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                    시작하기 →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Dictionary Button */}
          <div className="text-center animate-slide-up">
            <Card 
              className="inline-block cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-secondary"
              onClick={() => navigate('/dictionary')}
            >
              <CardContent className="p-6 flex items-center gap-4">
                <div className="text-4xl">📖</div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-foreground">야구 용어 사전</h3>
                  <p className="text-sm text-muted-foreground">
                    모든 야구 용어와 규칙을 한눈에!
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  바로가기 →
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-card py-16 border-t border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-10">
            야구 첫걸음이 특별한 이유
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">게임으로 배우기</h3>
              <p className="text-sm text-muted-foreground">
                지루한 설명 대신 직접 플레이하며 규칙을 익혀요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❓</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">상황별 규칙 설명</h3>
              <p className="text-sm text-muted-foreground">
                게임 중 발생하는 모든 상황에 대해 자세히 설명해드려요
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">완벽한 용어 사전</h3>
              <p className="text-sm text-muted-foreground">
                야구의 모든 용어를 쉽고 친절하게 정리했어요
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>⚾ 야구 첫걸음 - 야구를 처음 시작하는 모든 분들을 위해</p>
      </footer>
    </div>
  );
};

export default Index;
