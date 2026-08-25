import { useEffect, useState, type FormEvent } from 'react'
import type { Campaign } from '@/entities/campaign'
import { useCreateCampaign, useUpdateCampaign } from '@/entities/campaign'
import { ApiError } from '@/shared/api/client'
import { uploadFile } from '@/shared/api/upload'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { Textarea } from '@/shared/ui/textarea'

interface CampaignFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign?: Campaign
}

export function CampaignFormDialog({ open, onOpenChange, campaign }: CampaignFormDialogProps) {
  const isEditMode = campaign !== undefined
  const createCampaign = useCreateCampaign()
  const updateCampaign = useUpdateCampaign()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setTitle(campaign?.title ?? '')
      setDescription(campaign?.description ?? '')
      setImgUrl(campaign?.img_url ?? '')
      setError(null)
    }
  }, [open, campaign])

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)
    try {
      const res = await uploadFile(file)
      setImgUrl(res.data.url)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Şəkil yüklənə bilmədi')
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)

    const input = { title, description, img_url: imgUrl || undefined }

    try {
      if (isEditMode) {
        await updateCampaign.mutateAsync({ id: campaign.id, input })
      } else {
        await createCampaign.mutateAsync(input)
      }
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Əməliyyat uğursuz oldu')
    }
  }

  const isSubmitting = createCampaign.isPending || updateCampaign.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Kampaniyanı düzəlt' : 'Yeni kampaniya'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="campaign-title">Başlıq</Label>
            <Input
              id="campaign-title"
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="campaign-description">Açıqlama</Label>
            <Textarea
              id="campaign-description"
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="campaign-image">Şəkil</Label>
            <Input id="campaign-image" type="file" accept="image/*" onChange={handleFileChange} />
            {isUploading && <p className="text-sm text-neutral-500">Yüklənir...</p>}
            {imgUrl && !isUploading && (
              <img src={imgUrl} alt="" className="h-24 w-24 rounded-md object-cover" />
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting || isUploading}>
              {isSubmitting ? 'Yadda saxlanılır...' : 'Yadda saxla'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
