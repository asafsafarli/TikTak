import { useState } from 'react'
import type { Campaign } from '@/entities/campaign'
import { useRemoveCampaign } from '@/entities/campaign'
import { ApiError } from '@/shared/api/client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/ui/alert-dialog'

interface DeleteCampaignDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  campaign: Campaign | null
}

export function DeleteCampaignDialog({ open, onOpenChange, campaign }: DeleteCampaignDialogProps) {
  const removeCampaign = useRemoveCampaign()
  const [error, setError] = useState<string | null>(null)

  async function handleConfirm() {
    if (!campaign) return
    setError(null)
    try {
      await removeCampaign.mutateAsync(campaign.id)
      onOpenChange(false)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Silinmə uğursuz oldu')
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kampaniyanı silmək istəyirsiniz?</AlertDialogTitle>
          <AlertDialogDescription>
            "{campaign?.title}" kampaniyası həmişəlik silinəcək. Bu əməliyyat geri qaytarıla
            bilməz.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <AlertDialogFooter>
          <AlertDialogCancel>Ləğv et</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={removeCampaign.isPending}>
            {removeCampaign.isPending ? 'Silinir...' : 'Sil'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
