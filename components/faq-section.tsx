"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useTranslations } from "next-intl"

export function FAQSection() {
  const t = useTranslations('FAQSection')
  const faqs = [
    {
      question: t('faqs.1.question'),
      answer: t('faqs.1.answer'),
    },
    {
      question: t('faqs.2.question'),
      answer: t('faqs.2.answer'),
    },
    {
      question: t('faqs.3.question'),
      answer: t('faqs.3.answer'),
    },
    {
      question: t('faqs.4.question'),
      answer: t('faqs.4.answer'),
    },
    {
      question: t('faqs.5.question'),
      answer: t('faqs.5.answer'),
    },
    {
      question: t('faqs.6.question'),
      answer: t('faqs.6.answer'),
    },
    {
      question: t('faqs.7.question'),
      answer: t('faqs.7.answer'),
    },
    {
      question: t('faqs.8.question'),
      answer: t('faqs.8.answer'),
    },
  ]

  return (
    <section className="py-20 bg-gray-50" data-nohover>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg bg-white px-6 data-[state=open]:border-purple-500/50 data-[state=open]:shadow-md"
            >
              <AccordionTrigger className="text-left text-gray-900 py-6" data-nohover>
                <span className="flex gap-3">
                  <span className="text-purple-500 font-semibold flex-shrink-0">{index + 1}</span>
                  <span className="font-semibold">{faq.question}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6 pl-8">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
