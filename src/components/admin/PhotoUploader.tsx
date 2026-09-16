import { useState, useRef } from 'react'
import {
  UploadCloud,
  X,
  Star,
  ArrowLeft,
  ArrowRight,
  Image as ImageIcon,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { apiFetch, resolveImageUrl } from '@/lib/api'
import { cn } from '@/lib/utils'

interface PhotoUploaderProps {
  photos: string[]
  primaryPhoto?: string
  onChange: (photos: string[], primaryPhoto: string) => void
}

const MAX_SIZE_MB = 8
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function PhotoUploader({ photos, primaryPhoto, onChange }: PhotoUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const effectivePrimary = primaryPhoto || photos[0] || ''

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return

    setErrorMessage(null)
    const validFiles: File[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      if (!ALLOWED_TYPES.includes(file.type)) {
        setErrorMessage(`"${file.name}" is not supported. Please upload JPG, PNG, or WEBP images.`)
        return
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setErrorMessage(`"${file.name}" exceeds the ${MAX_SIZE_MB}MB size limit.`)
        return
      }
      validFiles.push(file)
    }

    if (validFiles.length === 0) return

    setIsUploading(true)
    const newUrls: string[] = []

    try {
      // Upload files sequentially or in batch
      for (const file of validFiles) {
        const formData = new FormData()
        formData.append('file', file)

        const res = await apiFetch<{ url: string }>('/upload/vehicle-photo', {
          method: 'POST',
          body: formData,
        })
        if (res.url) {
          newUrls.push(res.url)
        }
      }

      const updatedPhotos = [...photos, ...newUrls]
      const updatedPrimary = effectivePrimary || updatedPhotos[0] || ''
      onChange(updatedPhotos, updatedPrimary)
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to upload one or more photos.')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  function handleRemove(index: number) {
    const targetUrl = photos[index]
    const updated = photos.filter((_, i) => i !== index)
    let newPrimary = effectivePrimary
    if (targetUrl === effectivePrimary) {
      newPrimary = updated[0] || ''
    }
    onChange(updated, newPrimary)
  }

  function handleSetPrimary(url: string) {
    // Put primary image first or mark it
    const filtered = photos.filter((p) => p !== url)
    const updated = [url, ...filtered]
    onChange(updated, url)
  }

  function handleMove(index: number, direction: 'left' | 'right') {
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= photos.length) return

    const updated = [...photos]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    onChange(updated, effectivePrimary)
  }

  return (
    <div className="space-y-4">
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-all duration-200',
          isDragging
            ? 'border-amber-500 bg-amber-500/10'
            : 'border-white/20 bg-black/40 hover:border-white/40 hover:bg-black/60',
          isUploading && 'pointer-events-none opacity-60',
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 animate-spin text-amber-500" />
              <p className="text-sm font-semibold text-paper">Uploading vehicle photography...</p>
              <p className="text-xs text-paper/60">Saving high-resolution images to dealership storage</p>
            </>
          ) : (
            <>
              <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center text-amber-500">
                <UploadCloud className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-paper">
                <span className="font-bold text-amber-400">Click to upload</span> or drag and drop photos
              </p>
              <p className="text-xs text-paper/50">
                JPG, PNG, or WEBP up to {MAX_SIZE_MB}MB each. Front, rear, interior, dashboard, engine angles.
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3 bg-red-950/60 border border-red-800/80 text-red-200 text-xs rounded">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Photo Gallery Grid */}
      {photos.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-paper/70">
              Uploaded Photography ({photos.length} photos)
            </span>
            <span className="text-[11px] text-amber-400 font-medium">
              ★ Star icon denotes website cover image
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {photos.map((photoUrl, index) => {
              const isPrimary = photoUrl === effectivePrimary || (index === 0 && !effectivePrimary)
              const displaySrc = resolveImageUrl(photoUrl)

              return (
                <div
                  key={`${photoUrl}-${index}`}
                  className={cn(
                    'group relative rounded-md overflow-hidden border bg-neutral-900 aspect-4/3 transition-all',
                    isPrimary ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-white/10',
                  )}
                >
                  <img
                    src={displaySrc}
                    alt={`Vehicle upload ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Primary Badge */}
                  {isPrimary && (
                    <div className="absolute top-1.5 left-1.5 bg-amber-500 text-ink text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <Star className="h-3 w-3 fill-ink" />
                      <span>Cover</span>
                    </div>
                  )}

                  {/* Hover Control Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <div className="flex justify-between items-center">
                      {!isPrimary ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleSetPrimary(photoUrl)
                          }}
                          title="Set as Main Cover Photo"
                          className="text-[10px] bg-white/20 hover:bg-amber-500 hover:text-ink text-paper px-2 py-1 rounded transition-colors flex items-center gap-1 font-bold"
                        >
                          <Star className="h-3 w-3" /> Set Cover
                        </button>
                      ) : (
                        <span />
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(index)
                        }}
                        title="Remove photo"
                        className="h-6 w-6 rounded bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Reorder Buttons */}
                    <div className="flex items-center justify-between text-white/80">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMove(index, 'left')
                        }}
                        className="h-6 w-6 rounded bg-white/20 hover:bg-white/40 disabled:opacity-20 flex items-center justify-center"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                      </button>
                      <span className="text-[10px] text-paper/60 font-mono">#{index + 1}</span>
                      <button
                        type="button"
                        disabled={index === photos.length - 1}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleMove(index, 'right')
                        }}
                        className="h-6 w-6 rounded bg-white/20 hover:bg-white/40 disabled:opacity-20 flex items-center justify-center"
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
