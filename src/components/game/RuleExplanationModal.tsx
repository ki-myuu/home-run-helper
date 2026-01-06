import { GameSituation } from '@/data/baseballData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { HelpCircle, Lightbulb } from 'lucide-react';

interface RuleExplanationModalProps {
  situation: GameSituation | null;
  isOpen: boolean;
  onClose: () => void;
}

export const RuleExplanationModal = ({ situation, isOpen, onClose }: RuleExplanationModalProps) => {
  if (!situation) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <HelpCircle className="w-6 h-6 text-primary" />
            {situation.name}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {situation.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-2">자세한 설명</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {situation.detailedExplanation}
            </p>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
            <h4 className="font-semibold text-foreground mb-2">언제 발생하나요?</h4>
            <p className="text-sm text-muted-foreground">
              {situation.whenItHappens}
            </p>
          </div>

          {situation.funFact && (
            <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                재미있는 사실
              </h4>
              <p className="text-sm text-muted-foreground">
                {situation.funFact}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="default">
            이해했어요!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
