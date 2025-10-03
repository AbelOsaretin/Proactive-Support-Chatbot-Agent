import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mockUnansweredQuestions, mockDraftArticles } from "@/lib/mock-data";
import { CopyButton } from "@/components/copy-button";

export default function KnowledgeGapPage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Left Column: Unanswered Questions */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Unanswered Questions & Themes</CardTitle>
            <CardDescription>
              User questions that the AI could not answer, grouped by theme.
            </CardDescription>
          </CardHeader>
        </Card>
        <div className="space-y-4">
          {mockUnansweredQuestions.map((q) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle className="text-base">{q.theme}</CardTitle>
                <CardDescription>
                  Identified on {new Date(q.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic">
                  "{q.originalQuestion}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Column: Draft Articles */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Draft Articles for Review</CardTitle>
            <CardDescription>
              AI-generated articles to fill identified knowledge gaps.
            </CardDescription>
          </CardHeader>
        </Card>
        <Accordion type="single" collapsible className="w-full space-y-4">
          {mockDraftArticles.map((article) => (
            <Card key={article.id}>
              <AccordionItem value={article.id} className="border-b-0">
                <AccordionTrigger className="p-6 text-base hover:no-underline">
                  {article.title}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <Separator className="mb-4" />
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground space-y-2">
                    {article.content.split('\n\n').map((paragraph, index) => {
                       if (paragraph.startsWith('### ')) {
                         return <h3 key={index} className="font-bold text-foreground">{paragraph.substring(4)}</h3>
                       }
                       if (paragraph.startsWith('*This is an AI-generated draft.*')) {
                         return <p key={index} className="text-xs italic">{paragraph}</p>
                       }
                        return <p key={index}>{paragraph}</p>
                    })}
                  </div>
                  <div className="mt-4">
                    <CopyButton textToCopy={article.content} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Card>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
