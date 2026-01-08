import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  baseballTerms, 
  getTermsByCategory, 
  searchTerms,
  BaseballTerm 
} from '@/data/baseballData';
import { ArrowLeft, Search, BookOpen, Lightbulb } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { AdBanner } from '@/components/ads/AdBanner';

const categoryLabels: Record<BaseballTerm['category'], string> = {
  batting: '타격',
  fielding: '수비',
  pitching: '투수',
  game: '경기',
  stats: '기록',
};

const categoryEmojis: Record<BaseballTerm['category'], string> = {
  batting: '🏏',
  fielding: '🧤',
  pitching: '⚾',
  game: '📋',
  stats: '📊',
};

const Dictionary = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<BaseballTerm | null>(null);
  const [activeCategory, setActiveCategory] = useState<BaseballTerm['category'] | 'all'>('all');

  const filteredTerms = useMemo(() => {
    let terms: BaseballTerm[];
    
    if (searchQuery.trim()) {
      terms = searchTerms(searchQuery);
    } else if (activeCategory === 'all') {
      terms = baseballTerms;
    } else {
      terms = getTermsByCategory(activeCategory);
    }
    
    return terms;
  }, [searchQuery, activeCategory]);

  const groupedTerms = useMemo(() => {
    if (searchQuery.trim() || activeCategory !== 'all') {
      return { [activeCategory === 'all' ? 'search' : activeCategory]: filteredTerms };
    }
    
    const groups: Partial<Record<BaseballTerm['category'], BaseballTerm[]>> = {};
    filteredTerms.forEach(term => {
      if (!groups[term.category]) {
        groups[term.category] = [];
      }
      groups[term.category]!.push(term);
    });
    return groups;
  }, [filteredTerms, searchQuery, activeCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            홈으로
          </Button>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            야구 용어 사전
          </h1>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="용어 검색 (예: 홈런, 삼진, ERA...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-lg h-12"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ad Banner */}
        <div className="mb-6">
          <AdBanner slot="3333333333" format="horizontal" className="mx-auto" />
        </div>

        {/* Category Tabs */}
        <Tabs value={activeCategory} onValueChange={(v) => setActiveCategory(v as typeof activeCategory)} className="mb-6">
          <TabsList className="grid grid-cols-6 h-auto">
            <TabsTrigger value="all" className="text-sm py-3">
              전체
            </TabsTrigger>
            {(Object.keys(categoryLabels) as BaseballTerm['category'][]).map(cat => (
              <TabsTrigger key={cat} value={cat} className="text-sm py-3">
                <span className="hidden sm:inline">{categoryEmojis[cat]} </span>
                {categoryLabels[cat]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Results Count */}
        <p className="text-sm text-muted-foreground mb-4">
          {searchQuery ? `"${searchQuery}" 검색 결과: ` : ''}
          총 {filteredTerms.length}개 용어
        </p>

        {/* Terms List */}
        {filteredTerms.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                검색 결과가 없습니다. 다른 키워드로 검색해보세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTerms).map(([category, terms]) => (
              <div key={category}>
                {activeCategory === 'all' && !searchQuery && (
                  <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    {categoryEmojis[category as BaseballTerm['category']]}
                    {categoryLabels[category as BaseballTerm['category']]} 용어
                  </h2>
                )}
                <div className="grid gap-3 sm:grid-cols-2">
                  {terms.map(term => (
                    <Card 
                      key={term.id}
                      className="cursor-pointer transition-all hover:shadow-md hover:border-primary/30"
                      onClick={() => setSelectedTerm(term)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground">{term.term}</h3>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {term.shortDescription}
                            </p>
                          </div>
                          <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground shrink-0">
                            {categoryLabels[term.category]}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Category Links */}
        <div className="mt-12 text-center">
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">카테고리 바로가기</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(categoryLabels) as BaseballTerm['category'][]).map(cat => (
              <Button
                key={cat}
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
              >
                {categoryEmojis[cat]} {categoryLabels[cat]} ({getTermsByCategory(cat).length})
              </Button>
            ))}
          </div>
        </div>

        {/* Ad Banner at bottom */}
        <div className="mt-8">
          <AdBanner slot="4444444444" format="horizontal" className="mx-auto" />
        </div>
      </div>

      {/* Term Detail Modal */}
      <Dialog open={!!selectedTerm} onOpenChange={() => setSelectedTerm(null)}>
        <DialogContent className="max-w-lg">
          {selectedTerm && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                  {categoryEmojis[selectedTerm.category]}
                  {selectedTerm.term}
                </DialogTitle>
                <DialogDescription className="text-base pt-2">
                  {selectedTerm.shortDescription}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">자세한 설명</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedTerm.fullDescription}
                  </p>
                </div>

                {selectedTerm.example && (
                  <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                    <h4 className="font-semibold text-foreground mb-2">예시</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTerm.example}
                    </p>
                  </div>
                )}

                {selectedTerm.funFact && (
                  <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-accent" />
                      재미있는 사실
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedTerm.funFact}
                    </p>
                  </div>
                )}

                {selectedTerm.relatedTerms && selectedTerm.relatedTerms.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">관련 용어</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTerm.relatedTerms.map(related => {
                        const relatedTerm = baseballTerms.find(t => t.term === related);
                        return (
                          <Button
                            key={related}
                            variant="outline"
                            size="sm"
                            onClick={() => relatedTerm && setSelectedTerm(relatedTerm)}
                            disabled={!relatedTerm}
                          >
                            {related}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                  {categoryEmojis[selectedTerm.category]} {categoryLabels[selectedTerm.category]}
                </span>
                <Button onClick={() => setSelectedTerm(null)} variant="default">
                  닫기
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dictionary;
