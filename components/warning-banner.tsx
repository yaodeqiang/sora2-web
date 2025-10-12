import { AlertCircle, X } from "lucide-react"

export function WarningBanner() {
  return (
    <div className="bg-yellow-50 border-y border-yellow-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
            <p className="text-sm text-yellow-800">
              <span className="font-semibold">Sora 2</span> currently does not support uploads of images containing
              photorealistic people. Please use images without real human faces for best results.
            </p>
          </div>
          <button className="text-yellow-600 hover:text-yellow-700">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
