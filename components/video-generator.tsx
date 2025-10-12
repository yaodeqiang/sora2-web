"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Wand2 } from "lucide-react"
import { useTranslations } from "next-intl"

export function VideoGenerator() {
  const [prompt, setPrompt] = useState("")
  const [activeTab, setActiveTab] = useState("text-to-video")
  const t = useTranslations('VideoGenerator')

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger
                value="text-to-video"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {t('tabs.textToVideo')}
              </TabsTrigger>
              <TabsTrigger
                value="image-to-video"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                {t('tabs.imageToVideo')}
              </TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 bg-white">
                {t('history')}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Section */}
            <div className="space-y-4">
              <TabsContent value="text-to-video" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">{t('prompt.label')}</label>
                    <Textarea
                      placeholder={t('prompt.placeholder')}
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[200px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    size="lg"
                  >
                    <Wand2 className="w-5 h-5 mr-2" />
                    {t('generate')}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="image-to-video" className="mt-0">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">{t('upload.label')}</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-purple-500 transition-colors cursor-pointer bg-white">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 text-sm">{t('upload.help')}</p>
                      <p className="text-gray-400 text-xs mt-1">{t('upload.hint')}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">{t('promptOptional.label')}</label>
                    <Textarea
                      placeholder={t('promptOptional.placeholder')}
                      className="min-h-[100px] bg-white border-gray-300 text-gray-900 placeholder:text-gray-400 resize-none"
                    />
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    size="lg"
                  >
                    <Wand2 className="w-5 h-5 mr-2" />
                    {t('generate')}
                  </Button>
                </div>
              </TabsContent>
            </div>

            {/* Preview Section */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">{t('preview.label')}</label>
                <div className="aspect-video bg-white border border-gray-300 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wand2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm">{t('preview.empty')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}
