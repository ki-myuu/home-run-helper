// 야구 용어 및 규칙 설명 데이터

export interface BaseballTerm {
  id: string;
  term: string;
  category: 'batting' | 'fielding' | 'pitching' | 'game' | 'stats';
  shortDescription: string;
  fullDescription: string;
  example?: string;
  relatedTerms?: string[];
  funFact?: string;
}

export interface GameSituation {
  id: string;
  name: string;
  description: string;
  detailedExplanation: string;
  whenItHappens: string;
  funFact?: string;
}

// 타격 관련 상황
export const battingSituations: GameSituation[] = [
  {
    id: 'single',
    name: '안타 (1루타)',
    description: '타자가 공을 치고 1루까지 안전하게 도달하는 것',
    detailedExplanation: '안타는 타자가 투수의 공을 배트로 쳐서 페어 지역에 떨어뜨리고, 수비수가 아웃시키기 전에 1루에 도달하는 것입니다. 야구에서 가장 기본적인 공격 성공입니다.',
    whenItHappens: '공이 내야수 사이를 통과하거나, 외야에 떨어졌을 때',
    funFact: '한 시즌 최다 안타 기록은 이치로 스즈키의 262개(2004년)입니다.'
  },
  {
    id: 'double',
    name: '2루타',
    description: '타자가 공을 치고 2루까지 진루하는 것',
    detailedExplanation: '타자가 친 공이 외야 깊숙이 날아가거나 외야 펜스에 맞아 튕겨 나와, 타자가 2루까지 도달할 수 있는 안타입니다.',
    whenItHappens: '공이 외야 깊숙이 떨어지거나 펜스에 맞을 때',
    funFact: '2루타는 주자를 홈으로 보내는 데 매우 효과적입니다.'
  },
  {
    id: 'triple',
    name: '3루타',
    description: '타자가 공을 치고 3루까지 진루하는 것',
    detailedExplanation: '타자가 친 공이 외야 깊숙이 또는 구석에 떨어져, 타자가 3루까지 도달하는 안타입니다. 가장 드문 안타 종류 중 하나입니다.',
    whenItHappens: '공이 외야 구석이나 펜스 사이에 빠질 때, 빠른 주자일 때',
    funFact: '3루타는 안타 중 가장 드물며, 빠른 주력이 필수입니다.'
  },
  {
    id: 'homerun',
    name: '홈런',
    description: '타자가 공을 담장 밖으로 쳐서 모든 베이스를 돌아 득점하는 것',
    detailedExplanation: '타자가 친 공이 페어 지역의 외야 펜스를 넘어가면 홈런입니다. 타자와 베이스에 있는 모든 주자가 홈으로 들어와 득점합니다.',
    whenItHappens: '공이 외야 펜스를 넘어갈 때',
    funFact: '만루홈런(그랜드슬램)은 한 번에 4점을 득점할 수 있습니다!'
  },
  {
    id: 'grandslam',
    name: '만루홈런 (그랜드슬램)',
    description: '1, 2, 3루에 모두 주자가 있을 때 치는 홈런',
    detailedExplanation: '베이스가 가득 찬 상태(만루)에서 홈런을 치면 타자 포함 4명이 모두 홈을 밟아 4점을 한꺼번에 득점합니다. 야구에서 가장 극적인 순간 중 하나입니다.',
    whenItHappens: '만루 상황에서 홈런을 칠 때',
    funFact: '끝내기 만루홈런은 야구 역사상 가장 극적인 장면으로 손꼽힙니다.'
  },
  {
    id: 'strike',
    name: '스트라이크',
    description: '타자가 헛스윙하거나 스트라이크 존을 통과한 공',
    detailedExplanation: '스트라이크는 세 가지 경우에 선언됩니다: 1) 타자가 스윙했지만 맞추지 못했을 때, 2) 공이 스트라이크 존을 통과했을 때, 3) 파울볼을 쳤을 때(단, 2스트라이크 후 파울은 제외).',
    whenItHappens: '헛스윙, 스트라이크 존 통과, 파울(2S 전)',
    funFact: '스트라이크 존은 타자의 체격에 따라 달라집니다.'
  },
  {
    id: 'ball',
    name: '볼',
    description: '스트라이크 존을 벗어난 투구',
    detailedExplanation: '투수가 던진 공이 스트라이크 존을 벗어났고, 타자가 스윙하지 않았을 때 볼이 선언됩니다. 4볼이 되면 타자는 1루로 걸어갑니다(볼넷).',
    whenItHappens: '공이 스트라이크 존 밖으로 지나가고 타자가 스윙하지 않았을 때',
  },
  {
    id: 'walk',
    name: '볼넷 (사구)',
    description: '4개의 볼로 타자가 1루로 진출하는 것',
    detailedExplanation: '한 타석에서 볼이 4개가 되면 타자는 자동으로 1루로 진루합니다. 이를 "걸어나간다"고도 표현합니다.',
    whenItHappens: '볼 카운트가 4가 되었을 때',
    funFact: '출루율에는 볼넷도 포함됩니다. 볼/스트라이크를 구분하는 선구안 능력은 타자의 중요한 능력!'
  },
  {
    id: 'strikeout',
    name: '삼진',
    description: '3개의 스트라이크로 타자가 아웃되는 것',
    detailedExplanation: '스트라이크가 3개가 되면 타자는 아웃됩니다. 헛스윙 삼진과 루킹 삼진(지켜보기만 한 삼진)이 있습니다.',
    whenItHappens: '스트라이크 카운트가 3이 되었을 때',
    funFact: '포수가 세 번째 스트라이크 공을 잡기 전에 땅에 먼저 닿으면 "낫아웃"으로 타자가 1루로 뛸 수 있습니다!'
  },
  {
    id: 'foul',
    name: '파울',
    description: '타자가 친 공이 파울 라인 밖으로 나간 것',
    detailedExplanation: '1루 또는 3루 라인 밖으로 나간 타구는 파울입니다. 파울은 스트라이크로 카운트되지만, 2스트라이크 후 파울은 스트라이크로 세지 않습니다.',
    whenItHappens: '타구가 1루 또는 3루 파울 라인 밖에 떨어질 때',
    funFact: '파울 플라이가 잡히면 아웃! 파울이라고 안심할 수 없습니다.'
  },
  {
    id: 'threebuntout',
    name: '쓰리번트 아웃',
    description: '2스트라이크 후 번트한 공이 파울이 되면 삼진 아웃',
    detailedExplanation: '일반적으로 파울은 2스트라이크 후에도 스트라이크로 세지 않지만, 번트는 예외입니다. 2스트라이크 상황에서 번트가 파울이 되면 세 번째 스트라이크로 간주되어 자동 삼진 아웃됩니다.',
    whenItHappens: '2스트라이크에서 번트 시도가 파울이 될 때',
    funFact: '희생번트를 시도하다 쓰리번트 아웃이 되면 매우 뼈아픕니다.'
  },
  {
    id: 'hitbypitch',
    name: '몸에 맞는 공 (사(死)구)',
    description: '투수가 던진 공이 타자의 몸에 맞는 것',
    detailedExplanation: '투수의 공이 타자 몸에 맞으면 타자는 자동으로 1루로 진루합니다. 단, 타자가 스트라이크 존 안의 공에 맞거나 피하려 하지 않으면 인정되지 않을 수 있습니다.',
    whenItHappens: '투구가 타자의 몸(유니폼 포함)에 맞을 때',
    funFact: '출루를 위해 일부러 맞으려고 하면 심판이 인정하지 않습니다!'
  },
  {
    id: 'intentionalwalk',
    name: '고의사구 (고의 볼넷)',
    description: '투수가 의도적으로 4볼을 던져 타자를 1루로 보내는 것',
    detailedExplanation: '강타자를 상대하기 어렵거나 전략적으로 유리할 때, 감독이 투수에게 고의로 볼넷을 주도록 지시합니다. 현재는 투구 없이 심판에게 신호만 보내면 됩니다. 현재 룰을 "자동 고의사구"라고 명명합니다.',
    whenItHappens: '강타자를 피하거나 병살 상황(ex: 1사 2루와 3루에서 고의사구)을 만들 때',
    funFact: '2017년부터 MLB에서는 투구 없이 신호만으로 고의사구가 가능합니다.',
    relatedTerms: ['병살타 (더블플레이)']
  },
  {
    id: 'infieldfly',
    name: '인필드 플라이',
    description: '특정 상황에서 내야 뜬공이 잡히지 않아도 자동 아웃',
    detailedExplanation: '주자가 1, 2루 또는 만루이고 아웃 카운트가 0 또는 1아웃일 때, 내야에 뜬공이 오르면 심판이 인필드 플라이를 선언합니다. 이 경우 공이 잡히든 안 잡히든 타자는 자동 아웃입니다.',
    whenItHappens: '0-1아웃, 1·2루 또는 만루에서 내야 뜬공',
    funFact: '수비수가 일부러 공을 떨어뜨려 병살을 노리는 것을 방지하는 규칙입니다.'
  },
  {
    id: 'sacrifice',
    name: '희생타',
    description: '자신은 아웃되지만 주자를 진루시키는 타격',
    detailedExplanation: '희생타는 공을 쳐서 아웃됐지만 그 사이 주자가 다음 베이스로 가는 타격을 칭합니다.',
    whenItHappens: '주자를 진루시키거나 득점시키기 위해',
    funFact: '희생타는 타수에 포함되지 않아 타율에 영향을 주지 않습니다. 주자로 다음 베이스로 보내는 팀플레이를 했는데 타율이 낮아지면 억울하잖아요?'
  },
  {
    id: 'groundout',
    name: '땅볼 아웃',
    description: '땅볼을 친 후 1루에서 아웃되는 것',
    detailedExplanation: '타자가 친 공이 땅에 튀어 내야수가 잡아 1루로 송구하고 타자가 1루에 도착하기 전에 공이 먼저 도착하면 아웃입니다.',
    whenItHappens: '타자가 땅에 닿는 공을 쳤을 때',
  },
  {
    id: 'flyout',
    name: '뜬공 아웃 (플라이 아웃)',
    description: '친 공이 땅에 닿기 전에 수비수가 잡아 아웃',
    detailedExplanation: '타자가 친 공이 땅에 떨어지기 전에 수비수의 글러브에 들어가면 바로 아웃입니다.',
    whenItHappens: '내야 또는 외야 뜬공을 수비수가 직접 잡을 때',
  },
  {
    id: 'doubleplay',
    name: '병살타 (더블플레이)',
    description: '한 번의 타격으로 2명이 아웃되는 것',
    detailedExplanation: '주자가 있는 상황에서 땅볼을 치면, 수비수가 빠르게 처리해 주자와 타자 모두를 아웃시키는 것입니다. 6-4-3 병살(유격수→2루수→1루수)이 가장 흔합니다.',
    whenItHappens: '주자가 있을 때 땅볼을 치고 수비가 빠르게 처리할 때',
    funFact: '투수 입장에서 병살은 한 번에 이닝을 끝낼 수 있는 최고의 선물!'
  },
  {
    id: 'tripleplay',
    name: '삼중살 (트리플플레이)',
    description: '한 번의 타격으로 3명이 아웃되는 것',
    detailedExplanation: '한 번의 플레이에서 3명의 주자(타자 포함)가 모두 아웃되는 매우 드문 상황입니다. 야구에서 가장 희귀한 플레이 중 하나입니다.',
    whenItHappens: '주자가 2명 이상일 때 특수한 상황에서, 예를 들어 무사 1/2루에서 공이 잘 맞은 줄 알고 1/2루 주자가 뛰었지만 3루수 라인드라이브(당황해서 귀루 못함)>2루 포스아웃>1루 포스아웃 이 되면 삼중살이 성립합니다.',
    funFact: 'MLB 역사상 삼중살은 약 700번밖에 발생하지 않았습니다!',
    relatedTerms: ['삼중상']
  },
];

// 수비 관련 상황
export const fieldingSituations: GameSituation[] = [
  {
    id: 'flyout_catch',
    name: '플라이볼 캐치',
    description: '뜬공(타자가 친 다음 땅에 닿은 적이 없는 공)을 잡아 타자를 아웃시키는 것',
    detailedExplanation: '타자가 친 공이 땅에 떨어지기 전에 수비수가 잡으면 타자는 바로 아웃됩니다. 외야수든 내야수든 상관없습니다.',
    whenItHappens: '뜬공이 글러브에 들어갈 때',
  },
  {
    id: 'groundball',
    name: '땅볼 처리',
    description: '땅볼(타자가 친 다음 땅에 닿은 적인 있는 공)을 잡아 1루로 송구하여 타자를 아웃시키는 것',
    detailedExplanation: '내야수가 땅볼을 잡아 1루수에게 던지고, 타자가 1루에 도착하기 전에 1루수가 공을 잡고 베이스를 밟으면 아웃입니다.',
    whenItHappens: '내야 땅볼을 잡고 1루에 송구할 때',
    funFact: '타자가 상당히 느리고 외야수의 송구 능력이 굉장히 좋으면 간혹 외야수가 타자를 땅볼 아웃 시키기도 합니다.'
  },
  {
    id: 'forceout',
    name: '포스 아웃',
    description: '주자가 반드시 진루해야 할 때 베이스를 먼저 밟아 아웃시키는 것',
    detailedExplanation: '뒤에서 주자가 오고 있어 앞 주자가 반드시 다음 베이스로 가야 하는 상황에서, 수비수가 공을 가지고 베이스를 밟으면 아웃입니다. 주자를 태그할 필요가 없습니다.',
    whenItHappens: '주자가 반드시 진루해야 하는 상황(포스 상황)',
    funFact: '병살이 가능한 것은 포스 아웃 규칙 덕분입니다. 예를 들어 1사 1루에 주자가 있고 공을 치면 1루 주자는 2루에 가야하기 때문에 2루에서 포스 아웃 상황이 나오죠.'
  },
  {
    id: 'tagout',
    name: '태그 아웃',
    description: '공을 가진 상태로 주자의 몸을 터치하여 아웃시키는 것',
    detailedExplanation: '포스 상황이 아닐 때는 수비수가 공을 가진 글러브나 손으로 직접 주자를 터치해야 아웃이 됩니다.',
    whenItHappens: '주자가 베이스를 떠나 있고, 포스 상황이 아닐 때',
    funFact: '주자와 수비수의 박진감 넘치는 태그 플레이는 야구의 하이라이트!'
  },
  {
    id: 'tagup',
    name: '태그업',
    description: '플라이볼이 잡힌 후 베이스를 밟고 다음 베이스로 진루하는 것',
    detailedExplanation: '플라이볼이 잡히면 주자는 원래 베이스에 있어야 하는는 의무가 있으나, 공이 잡힌 순간 원래 베이스를 밟고 있다가 다음 베이스로 뛸 수 있습니다. 이것이 태그업입니다.',
    whenItHappens: '플라이볼이 잡혔을 때',
    funFact: '태그업을 제때 하면 아웃 상황에서도 득점이 가능합니다!'
  },
  {
    id: 'pickoff',
    name: '견제구',
    description: '투수가 베이스의 주자를 아웃시키려고 던지는 공',
    detailedExplanation: '투수가 홈 대신 베이스로 공을 던져 주자를 아웃시키거나 진루를 막으려는 플레이입니다. 주자가 베이스에서 멀리 나와 있으면 태그 아웃될 수 있습니다.',
    whenItHappens: '주자가 베이스에서 리드(이탈)할 때',
  },
  {
    id: 'pickoff_out',
    name: '견제사',
    description: '견제구로 주자가 아웃되는 것',
    detailedExplanation: '투수나 포수의 견제구에 주자가 베이스로 돌아가지 못하고 태그 아웃되는 것입니다.',
    whenItHappens: '주자가 리드를 많이 했을 때 견제구가 성공할 때',
    funFact: '투수의 예리한 견제 능력은 주자를 묶어두는 데 매우 중요합니다.'
  },
  {
    id: 'stolen_base',
    name: '도루',
    description: '투수가 홈으로 던지는 동안 주자가 다음 베이스로 달려가는 것',
    detailedExplanation: '주자가 투수의 투구 동작을 보고 빠르게 다음 베이스로 달려가 안전하게 도착하면 도루 성공입니다.',
    whenItHappens: '빠른 주자가 다음 베이스를 노릴 때',
    funFact: '역대 최다 도루왕은 리키 헨더슨(1,406도루)입니다.'
  },
  {
    id: 'caught_stealing',
    name: '도루 실패 (도루 저지)',
    description: '도루를 시도했지만 태그 아웃되는 것',
    detailedExplanation: '주자가 도루를 시도했지만, 포수가 빠르게 베이스로 송구하여 주자가 도착하기 전에 태그 아웃되는 것입니다.',
    whenItHappens: '포수의 송구가 도루 시도 주자보다 빠를 때',
    funFact: '포수의 송구 능력(팝타임)이 도루 저지의 핵심입니다.'
  },
  {
    id: 'base_return',
    name: '귀루',
    description: '주자가 원래 있던 베이스로 돌아가는 것',
    detailedExplanation: '주자가 다음 베이스로 가려다가 다시 원래 있던 베이스(루)로 복"귀"하는 것입니다.',
    whenItHappens: '타구가 잘 맞은 줄 알고 다시 원래 베이스로 복귀할 때',
  },
  {
    id: 'error',
    name: '실책 (에러)',
    description: '수비수가 처리해야 할 공을 놓치거나 잘못 던지는 것',
    detailedExplanation: '정상적이라면 아웃을 시킬 수 있는 상황에서 수비수가 실수하여 타자나 주자가 안전하게 진루하는 것입니다.',
    whenItHappens: '수비수가 공을 놓치거나, 송구가 빗나갈 때',
    funFact: '에러로 인한 득점은 투수의 자책점에 포함되지 않습니다.'
  },
  {
    id: 'wildpitch',
    name: '폭투 (와일드피치)',
    description: '투수가 포수가 잡기 어렵게 던져 주자가 진루하는 것',
    detailedExplanation: '투수의 투구가 너무 빗나가거나 바닥에 튀어 포수가 잡지 못하고, 그 사이에 주자가 다음 베이스로 진루하는 것입니다.',
    whenItHappens: '투수의 공이 크게 빗나갈 때',
    funFact: '폭투는 투수의 기록에 남지만, 패스트볼(포수 실수)은 포수 기록입니다.'
  },
  {
    id: 'passedball',
    name: '포일',
    description: '포수가 잡을 수 있는 공을 놓쳐 주자가 진루하는 것',
    detailedExplanation: '투수가 적절히 던졌지만 포수가 공을 놓치거나 뒤로 빠뜨려 주자가 진루하는 것입니다.',
    whenItHappens: '포수가 공을 놓칠 때',
  },
  {
    id: 'balk',
    name: '보크',
    description: '투수가 부정 동작을 하여 주자에게 1루씩 진루가 허용되는 것',
    detailedExplanation: '투수가 투구 동작 중 멈추거나, 세트 포지션에서 움직이지 않고 던지거나, 기타 부정 동작을 하면 보크가 선언됩니다. 모든 주자는 1루씩 전진합니다.',
    whenItHappens: '투수가 투구 규칙을 위반할 때',
    funFact: '보크 규칙은 13가지나 있어서 가장 복잡한 규칙 중 하나입니다!'
  },
  {
    id: 'runnerpass',
    name: '주자 추월 아웃',
    description: '뒤따르는 주자가 앞 주자를 추월하면 아웃',
    detailedExplanation: '베이스를 돌 때 뒤에 있던 주자가 앞 주자를 지나치면 뒤 주자는 즉시 아웃됩니다. 드물지만 간혹 발생하는 상황입니다.',
    whenItHappens: '주자가 앞 주자보다 먼저 베이스에 도달하려 할 때',
    funFact: '주로 혼란스러운 타구 상황에서 발생합니다.'
  },
  {
    id: 'appeal',
    name: '어필 플레이',
    description: '수비 측이 주자의 규칙 위반을 어필하여 아웃을 주장하는 것',
    detailedExplanation: '주자가 베이스를 밟지 않고 지나갔거나, 태그업을 제대로 하지 않았을 때 수비 측이 해당 베이스에 공을 가져가 어필하면 아웃이 선언됩니다.',
    whenItHappens: '주자가 베이스 터치를 놓쳤을 때',
    funFact: '심판이 먼저 콜하지 않고, 수비가 어필해야만 아웃이 됩니다.'
  },
];

// 야구 용어 사전
export const baseballTerms: BaseballTerm[] = [
  // 타격 용어
  {
    id: 'batting_average',
    term: '타율',
    category: 'batting',
    shortDescription: '안타 수를 타수로 나눈 비율',
    fullDescription: '타자의 타격 능력을 나타내는 가장 기본적인 지표입니다. 타율 = 안타 수 ÷ 타수. 3할(0.300) 이상이면 좋은 타자로 평가됩니다.',
    example: '100타수 30안타 = 타율 0.300 (3할)',
    relatedTerms: ['출루율', '장타율']
  },
  {
    id: 'obp',
    term: '출루율',
    category: 'batting',
    shortDescription: '타자가 베이스에 나가는 비율',
    fullDescription: '안타, 볼넷, 몸에 맞는 공 등 모든 방법으로 출루하는 비율입니다. 출루율 = (안타+볼넷+사구) ÷ (타수+볼넷+사구+희생플라이)',
    example: '출루율 0.400은 10번 타석에서 4번 출루',
    relatedTerms: ['타율', 'OPS']
  },
  {
    id: 'slg',
    term: '장타율',
    category: 'batting',
    shortDescription: '타수당 평균 루타 수',
    fullDescription: '타자의 장타 능력을 나타냅니다. 장타율 = 총루타 ÷ 타수. 1루타=1, 2루타=2, 3루타=3, 홈런=4로 계산합니다.',
    example: '홈런만 10개 친 40타수: 장타율 = 40÷40 = 1.000',
    relatedTerms: ['타율', 'OPS']
  },
  {
    id: 'ops',
    term: 'OPS',
    category: 'stats',
    shortDescription: '출루율 + 장타율',
    fullDescription: '타자의 종합적인 공격력을 나타내는 지표입니다. OPS = 출루율 + 장타율. 0.900 이상이면 최상위 타자입니다.',
    example: '출루율 0.400 + 장타율 0.500 = OPS 0.900',
    relatedTerms: ['출루율', '장타율']
  },
  {
    id: 'rbi',
    term: '타점',
    category: 'batting',
    shortDescription: '타자의 플레이로 득점한 점수',
    fullDescription: '타자의 타격이나 행동으로 인해 팀이 득점한 횟수입니다. 적시타, 희생플라이, 볼넷 밀어내기 등이 포함됩니다.',
    example: '만루홈런 = 4타점',
    relatedTerms: ['득점', '적시타']
  },
  {
    id: 'cleanup',
    term: '클린업',
    category: 'batting',
    shortDescription: '타순 3, 4, 5번을 말하는 것',
    fullDescription: '팀에서 가장 타격이 좋은 선수들이 배치되는 3, 4, 5번 타순을 클린업이라고 합니다. 주자를 "깨끗이 쓸어" 홈으로 보낸다는 의미입니다.',
    relatedTerms: ['리드오프', '타순']
  },
  {
    id: 'leadoff',
    term: '리드오프',
    category: 'batting',
    shortDescription: '1번 타자',
    fullDescription: '타순의 가장 앞에 서는 1번 타자입니다. 보통 출루율이 높고 발이 빠른 선수가 맡습니다.',
    relatedTerms: ['클린업', '타순']
  },
  {
    id: 'dh',
    term: '지명타자 (DH)',
    category: 'batting',
    shortDescription: '투수 대신 타격만 하는 선수',
    fullDescription: '투수 대신 타순에 들어가 타격만 전담하는 선수입니다. 수비는 하지 않습니다.',
    relatedTerms: ['타순', '투수']
  },
  {
    id: 'clutch_hit',
    term: '적시타',
    category: 'batting',
    shortDescription: '주자를 홈으로 불러들이는 안타',
    fullDescription: '베이스에 있는 주자를 홈으로 불러들여 득점시키는 안타입니다. 중요한 순간의 적시타는 게임의 흐름을 바꿉니다.',
    relatedTerms: ['타점', '결승타']
  },
  {
    id: 'walkoff',
    term: '끝내기',
    category: 'batting',
    shortDescription: '마지막 공격에서 결승점을 내는 것',
    fullDescription: '마지막 공격(9회말 또는 연장)에서 역전하거나 동점에서 승리를 결정짓는 플레이입니다.',
    example: '9회말 끝내기 홈런으로 역전승',
    relatedTerms: ['결승타', '역전']
  },
  {
    id: 'cycle_hit',
    term: '사이클링 히트',
    category: 'batting',
    shortDescription: '한 경기에서 1루타, 2루타, 3루타, 홈런을 모두 치는 것',
    fullDescription: '한 경기에서 1루타, 2루타, 3루타, 홈런을 각각 한 번 이상 치는 것입니다. 매우 드문 기록입니다.',
    funFact: '순서대로 치면 "내추럴 사이클"이라고 부릅니다.'
  },
  
  // 수비 용어
  {
    id: 'position_p',
    term: '투수 (P)',
    category: 'fielding',
    shortDescription: '마운드에서 공을 던지는 선수',
    fullDescription: '경기의 핵심 선수로, 타자에게 공을 던집니다. 등번호 1번 포지션입니다.',
  },
  {
    id: 'position_c',
    term: '포수 (C)',
    category: 'fielding',
    shortDescription: '투수의 공을 받는 선수',
    fullDescription: '홈플레이트 뒤에서 투수의 공을 받고, 수비를 지휘하는 선수입니다. 등번호 2번 포지션입니다.',
  },
  {
    id: 'position_1b',
    term: '1루수 (1B)',
    category: 'fielding',
    shortDescription: '1루 베이스를 담당하는 수비수',
    fullDescription: '1루 베이스 근처를 담당하며, 주로 다른 내야수들의 송구를 받아 아웃을 잡습니다.',
  },
  {
    id: 'position_2b',
    term: '2루수 (2B)',
    category: 'fielding',
    shortDescription: '1루와 2루 사이를 담당하는 수비수',
    fullDescription: '1루와 2루 사이 수비를 담당하며, 병살 플레이의 핵심입니다.',
  },
  {
    id: 'position_ss',
    term: '유격수 (SS)',
    category: 'fielding',
    shortDescription: '2루와 3루 사이를 담당하는 수비수',
    fullDescription: '내야의 중심 수비수로, 가장 넓은 범위를 커버합니다. 수비의 꽃이라고 불립니다.',
  },
  {
    id: 'position_3b',
    term: '3루수 (3B)',
    category: 'fielding',
    shortDescription: '3루 베이스를 담당하는 수비수',
    fullDescription: '3루 베이스 근처를 담당합니다. 강한 타구가 많이 오는 "핫코너"입니다.',
  },
  {
    id: 'position_lf',
    term: '좌익수 (LF)',
    category: 'fielding',
    shortDescription: '외야 왼쪽을 담당하는 수비수',
    fullDescription: '외야의 왼쪽(3루 방향)을 담당하는 외야수입니다.',
  },
  {
    id: 'position_cf',
    term: '중견수 (CF)',
    category: 'fielding',
    shortDescription: '외야 중앙을 담당하는 수비수',
    fullDescription: '외야의 중앙을 담당하며, 가장 넓은 수비 범위가 필요합니다. 외야의 리더입니다.',
  },
  {
    id: 'position_rf',
    term: '우익수 (RF)',
    category: 'fielding',
    shortDescription: '외야 오른쪽을 담당하는 수비수',
    fullDescription: '외야의 오른쪽(1루 방향)을 담당합니다. 강한 송구 능력이 중요합니다.',
  },
  {
    id: 'golden_glove',
    term: '골든글러브',
    category: 'fielding',
    shortDescription: '각 포지션 최고의 수비수에게 주는 상',
    fullDescription: '한 시즌 동안 각 포지션에서 가장 뛰어난 수비를 보인 선수에게 수여되는 상입니다.',
  },
  {
    id: 'double_play',
    term: '더블플레이 (병살)',
    category: 'fielding',
    shortDescription: '한 번의 플레이로 2명을 아웃시키는 것',
    fullDescription: '수비 측이 연속적인 동작으로 2명의 주자를 아웃시키는 것입니다. 6-4-3(유격수→2루수→1루수)가 가장 일반적입니다.',
    relatedTerms: ['트리플플레이', '포스아웃']
  },
  {
    id: 'triple_play',
    term: '트리플플레이 (삼중살)',
    category: 'fielding',
    shortDescription: '한 번의 플레이로 3명을 아웃시키는 것',
    fullDescription: '한 번의 연속적인 플레이로 3명의 주자를 모두 아웃시키는 것입니다. 매우 드문 플레이입니다.',
    relatedTerms: ['더블플레이']
  },
  
  // 투수 용어
  {
    id: 'era',
    term: 'ERA (평균자책점)',
    category: 'pitching',
    shortDescription: '9이닝당 투수가 책임지는 평균 실점',
    fullDescription: 'Earned Run Average. 투수가 9이닝을 던졌을 때 평균적으로 허용하는 자책점입니다. ERA = (자책점 × 9) ÷ 투구이닝',
    example: 'ERA 3.00 = 9이닝당 평균 3점 실점',
    relatedTerms: ['자책점', 'WHIP']
  },
  {
    id: 'whip',
    term: 'WHIP',
    category: 'pitching',
    shortDescription: '이닝당 허용한 출루자 수',
    fullDescription: 'Walks + Hits per Innings Pitched. 이닝당 볼넷과 안타로 허용한 주자 수입니다. WHIP = (볼넷 + 피안타) ÷ 이닝',
    example: 'WHIP 1.00 = 이닝당 평균 1명 출루 허용',
    relatedTerms: ['ERA']
  },
  {
    id: 'win',
    term: '승리',
    category: 'pitching',
    shortDescription: '투수가 "승리"기록으로 인정되는 것',
    fullDescription: '해당 투수가 등판하고 있을 때 리드 중이고 게임 종료 시까지 단 한 번도 리드가 깨지지 않을 시 그 투수의 승리로 기록됩니다.'
  },
  {
    id: 'save',
    term: '세이브',
    category: 'pitching',
    shortDescription: '마무리 투수가 리드를 지켜 승리에 기여하는 것',
    fullDescription: '3점 이내의 리드 상황에서 경기를 마무리하거나, 리드를 뒤집을 만큼의 주자를 베이스에 두고 마무리하면 세이브가 기록됩니다.',
    relatedTerms: ['홀드', '블론세이브']
  },
  {
    id: 'hold',
    term: '홀드',
    category: 'pitching',
    shortDescription: '중간계투가 리드를 지키면 기록되는 것',
    fullDescription: '리드 상황에서 등판해 리드를 유지한 채 다음 투수에게 넘기면 홀드가 기록됩니다.(단, 이때 홀드 조건이 성립되더라도 기록원이 보았을 때 투구 내용이 미흡하다면 홀드로 인정되지 않습니다.)',
    relatedTerms: ['세이브', '중계투수']
  },
  {
    id: 'blown_save',
    term: '블론세이브',
    category: 'pitching',
    shortDescription: '세이브 상황에서 리드를 지키지 못한 것',
    fullDescription: '세이브 상황에 등판했지만 동점 또는 역전을 허용하면 블론세이브가 기록됩니다.',
    relatedTerms: ['세이브']
  },
  {
    id: 'complete_game',
    term: '완투',
    category: 'pitching',
    shortDescription: '선발 투수가 경기를 혼자 끝내는 것',
    fullDescription: '선발 투수가 교체 없이 경기를 처음부터 끝까지 혼자 던지는 것입니다. 완봉과의 차이는 점수를 내줘도 끝까지 던질 시 완(전)투(구)로 취급됩니다. ',
    relatedTerms: ['완봉', '선발투수']
  },
  {
    id: 'shutout',
    term: '완봉',
    category: 'pitching',
    shortDescription: '선발 투수가 무실점으로 완투하는 것',
    fullDescription: '선발 투수가 상대팀에게 단 1점도 허용하지 않고 경기를 완투하는 것입니다.',
    relatedTerms: ['완투', '노히트노런']
  },
  {
    id: 'nohitter',
    term: '노히트노런',
    category: 'pitching',
    shortDescription: '한 경기에서 안타를 하나도 맞지 않는 것',
    fullDescription: '투수(들)가 9이닝 동안 상대팀에게 안타나 점수를 하나도 허용하지 않는 것입니다. 볼넷이나 에러로 출루는 가능합니다.',
    relatedTerms: ['퍼펙트게임', '완봉']
  },
  {
    id: 'perfectgame',
    term: '퍼펙트게임',
    category: 'pitching',
    shortDescription: '단 한 명의 타자도 출루시키지 않는 경기',
    fullDescription: '27명의 타자를 모두 아웃시켜 실책을 포함하여 단 한 명도 출루시키지 않는 것입니다. 야구에서 가장 어려운 기록입니다.',
    funFact: 'MLB 역사상 퍼펙트게임은 23번밖에 없습니다!',
    relatedTerms: ['노히트노런']
  },
  {
    id: 'fastball',
    term: '직구 (패스트볼)',
    category: 'pitching',
    shortDescription: '가장 빠르고 기본적인 투구',
    fullDescription: '투수의 가장 기본 구종으로, 가장 빠른 속도로 던집니다. 포심 패스트볼과 투심 패스트볼이 있습니다.',
    relatedTerms: ['변화구']
  },
  {
    id: 'curveball',
    term: '커브',
    category: 'pitching',
    shortDescription: '크게 휘어지는 변화구',
    fullDescription: '위에서 아래로 크게 떨어지는 변화구입니다. 직구 등을 예상하던던 타자의 타이밍을 빼앗는 데 효과적입니다.',
    relatedTerms: ['슬라이더', '변화구']
  },
  {
    id: 'slider',
    term: '슬라이더',
    category: 'pitching',
    shortDescription: '옆으로 휘어지는 변화구',
    fullDescription: '직구와 비슷한 속도로 던져지다가 마지막에 옆으로 빠지는 변화구입니다.',
    relatedTerms: ['커브', '변화구']
  },
  {
    id: 'changeup',
    term: '체인지업',
    category: 'pitching',
    shortDescription: '직구처럼 던지지만 느린 변화구',
    fullDescription: '직구와 같은 동작으로 던지지만 속도가 훨씬 느려 타자의 타이밍을 빼앗습니다.',
    relatedTerms: ['직구', '변화구']
  },
  {
    id: 'starter',
    term: '선발투수',
    category: 'pitching',
    shortDescription: '경기를 시작하는 투수',
    fullDescription: '경기 처음부터 마운드에 오르는 투수입니다. 보통 5~7이닝을 던지는 것을 목표로 합니다. 선발 투수는 5이닝 이상을 던져야지 "승리" 기록을 얻을 수 있습니다.',
    relatedTerms: ['중계투수', '마무리투수', '승리']
  },
  {
    id: 'reliever',
    term: '중계투수 (불펜)',
    category: 'pitching',
    shortDescription: '선발 투수 다음에 등판하는 투수들',
    fullDescription: '선발 투수가 강판된 후 마무리 투수 전까지 등판하는 투수들입니다.',
    relatedTerms: ['선발투수', '마무리투수']
  },
  {
    id: 'closer',
    term: '마무리투수 (클로저)',
    category: 'pitching',
    shortDescription: '경기 마지막을 책임지는 투수',
    fullDescription: '주로 9회에 등판해 경기를 마무리하는 투수입니다. 팀 최고의 불펜 투수가 맡습니다.',
    relatedTerms: ['세이브', '선발투수']
  },
  
  // 경기 용어
  {
    id: 'inning',
    term: '이닝',
    category: 'game',
    shortDescription: '공격과 수비가 한 번씩 교대하는 단위',
    fullDescription: '원정팀이 공격하는 "초"와 홈팀이 공격하는 "말"로 구성됩니다. 정규 경기는 9이닝입니다.',
    example: '1회초 = 1이닝 초반, 원정팀 공격',
    relatedTerms: ['초', '말']
  },
  {
    id: 'top_bottom',
    term: '초 / 말',
    category: 'game',
    shortDescription: '이닝의 전반(초)과 후반(말)',
    fullDescription: '초는 원정팀이 공격하는 이닝의 초반부, 말은 홈팀이 공격하는 이닝의 후반부입니다.',
    relatedTerms: ['이닝']
  },
  {
    id: 'extra_innings',
    term: '연장전',
    category: 'game',
    shortDescription: '9회까지 동점일 때 추가로 진행되는 이닝',
    fullDescription: '9회가 끝났을 때 동점이면 승부가 날 때까지 추가 이닝을 진행합니다. KBO에서는 최대 11회까지 진행합니다.',
    relatedTerms: ['이닝']
  },
  {
    id: 'strike_zone',
    term: '스트라이크 존',
    category: 'game',
    shortDescription: '스트라이크가 선언되는 구역',
    fullDescription: '홈플레이트 위쪽, 타자의 무릎과 가슴 사이 높이의 공간입니다. 이 구역을 통과하면 스트라이크입니다.',
    relatedTerms: ['스트라이크', '볼']
  },
  {
    id: 'count',
    term: '볼 카운트',
    category: 'game',
    shortDescription: '현재 볼과 스트라이크 수',
    fullDescription: '한 타석에서 누적된 볼과 스트라이크 수입니다. 볼-스트라이크 순서로 표시합니다.',
    example: '2-1 카운트 = 볼 2개, 스트라이크 1개',
    relatedTerms: ['풀카운트']
  },
  {
    id: 'fullcount',
    term: '풀카운트',
    category: 'game',
    shortDescription: '3볼 2스트라이크 상황',
    fullDescription: '볼 3개, 스트라이크 2개인 상황입니다. 타자가 다음 공을 지켜볼 시 볼넷 또는 삼진이 결정되는 긴장되는 순간입니다.',
    relatedTerms: ['볼 카운트']
  },
  {
    id: 'at_bat',
    term: '타석 / 타수',
    category: 'game',
    shortDescription: '타석은 타격 기회, 타수는 타율 계산용 타석',
    fullDescription: '타석은 타자가 타격하러 들어간 모든 기회입니다. 타수는 볼넷, 사구, 희생타 등을 제외한 타자가 공을 직접 친 횟수입니다.',
    relatedTerms: ['타율'],
    funFact: '실책은 타수에는 포함되여 타자의 타율이 낮아집니다. 정상적인 수비였으면 },
  
  // 경기 용어
  {
    id: 'inning',
    term: '이닝',
    category: 'game',
    shortDescription: '공격과 수비가 한 번씩 교대하는 단위',
    fullDescription: '원정팀이 공격하는 "초"와 홈팀이 공격하는 "말"로 구성됩니다. 정규 경기는 9이닝입니다.',
    example: '1회초 = 1이닝 초반, 원정팀 공격',
    relatedTerms: ['초', '말']
  },
  {
    id: 'top_bottom',
    term: '초 / 말',
    category: 'game',
    shortDescription: '이닝의 전반(초)과 후반(말)',
    fullDescription: '초는 원정팀이 공격하는 이닝의 초반부, 말은 홈팀이 공격하는 이닝의 후반부입니다.',
    relatedTerms: ['이닝']
  },
  {
    id: 'extra_innings',
    term: '연장전',
    category: 'game',
    shortDescription: '9회까지 동점일 때 추가로 진행되는 이닝',
    fullDescription: '9회가 끝났을 때 동점이면 승부가 날 때까지 추가 이닝을 진행합니다. KBO에서는 최대 11회까지 진행합니다.',
    relatedTerms: ['이닝']
  },
  {
    id: 'strike_zone',
    term: '스트라이크 존',
    category: 'game',
    shortDescription: '스트라이크가 선언되는 구역',
    fullDescription: '홈플레이트 위쪽, 타자의 무릎과 가슴 사이 높이의 공간입니다. 이 구역을 통과하면 스트라이크입니다.',
    relatedTerms: ['스트라이크', '볼']
  },
  {
    id: 'count',
    term: '볼 카운트',
    category: 'game',
    shortDescription: '현재 볼과 스트라이크 수',
    fullDescription: '한 타석에서 누적된 볼과 스트라이크 수입니다. 볼-스트라이크 순서로 표시합니다.',
    example: '2-1 카운트 = 볼 2개, 스트라이크 1개',
    relatedTerms: ['풀카운트']
  },
  {
    id: 'fullcount',
    term: '풀카운트',
    category: 'game',
    shortDescription: '3볼 2스트라이크 상황',
    fullDescription: '볼 3개, 스트라이크 2개인 상황입니다. 타자가 다음 공을 지켜볼 시 볼넷 또는 삼진이 결정되는 긴장되는 순간입니다.',
    relatedTerms: ['볼 카운트']
  },
  {
    id: 'at_bat',
    term: '타석 / 타수',
    category: 'game',
    shortDescription: '타석은 타격 기회, 타수는 타율 계산용 타석',
    fullDescription: '타석은 타자가 타격하러 들어간 모든 기회입니다. 타수는 볼넷, 사구, 희생타 등을 제외한 타자가 공을 직접 친 횟수입니다.',
    relatedTerms: ['타율'],
    funFact: '실책은 타수에는 포함되여 타자의 타율이 낮아집니다. 정상적인 수비였으면 아웃인데, 출루 한 것으로 기록되면 안되잖아요?'
  },
  {
    id: 'run',
    term: '득점',
    category: 'game',
    shortDescription: '주자가 홈플레이트를 밟아 점수를 얻는 것',
    fullDescription: '주자가 1루, 2루, 3루를 거쳐 홈플레이트를 안전하게 밟으면 1점이 기록됩니다.',
    relatedTerms: ['타점']
  },
  {
    id: 'cold_game',
    term: '콜드게임',
    category: 'game',
    shortDescription: '큰 점수차로 경기가 조기 종료되는 것',
    fullDescription: '5회 이후 10점 이상 또는 7회 이후 7점 이상 차이가 나면 경기가 조기 종료될 수 있습니다.',
    relatedTerms: ['서스펜디드 게임']
  },
  {
    id: 'suspended_game',
    term: '서스펜디드 게임',
    category: 'game',
    shortDescription: '악천후 등으로 경기가 중단되어 나중에 이어하는 것',
    fullDescription: '비, 정전 등의 이유로 경기가 중단되었을 때, 나중에 중단된 시점부터 이어서 경기하는 것입니다.',
    relatedTerms: ['콜드게임']
  },
  {
    id: 'fair_foul',
    term: '페어 / 파울',
    category: 'game',
    shortDescription: '타구가 떨어지는 영역 구분',
    fullDescription: '1루선과 3루선 안쪽(페어 지역)에 떨어지면 페어, 밖에 떨어지면 파울입니다.',
    relatedTerms: ['파울']
  },
  {
    id: 'bases_loaded',
    term: '만루',
    category: 'game',
    shortDescription: '1, 2, 3루에 모두 주자가 있는 상황',
    fullDescription: '모든 베이스에 주자가 있어 다음 타자가 홈런을 치면 4점이 들어오는 상황입니다.',
    relatedTerms: ['그랜드슬램']
  },
  {
    id: 'batting_order',
    term: '타순',
    category: 'game',
    shortDescription: '타자들이 타격하는 순서',
    fullDescription: '경기 전에 정해지는 9명의 타격 순서입니다. 경기 중 임의로 바꿀 수 없습니다.',
    relatedTerms: ['클린업', '리드오프']
  },
];

// 카테고리별 그룹핑 함수
export const getTermsByCategory = (category: BaseballTerm['category']): BaseballTerm[] => {
  return baseballTerms.filter(term => term.category === category);
};

// 검색 함수
export const searchTerms = (query: string): BaseballTerm[] => {
  const lowerQuery = query.toLowerCase();
  return baseballTerms.filter(term => 
    term.term.toLowerCase().includes(lowerQuery) ||
    term.shortDescription.toLowerCase().includes(lowerQuery) ||
    term.fullDescription.toLowerCase().includes(lowerQuery)
  );
};

// 상황 검색 함수
export const getSituationById = (id: string): GameSituation | undefined => {
  return [...battingSituations, ...fieldingSituations].find(s => s.id === id);
};

// 용어 검색 함수
export const getTermById = (id: string): BaseballTerm | undefined => {
  return baseballTerms.find(t => t.id === id);
};
