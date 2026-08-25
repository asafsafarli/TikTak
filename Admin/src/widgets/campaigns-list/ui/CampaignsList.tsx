import { useState } from 'react'
import type { Campaign } from '@/entities/campaign'
import { useCampaigns } from '@/entities/campaign'
import { CampaignFormDialog } from '@/features/campaigns/upsert'
import { DeleteCampaignDialog } from '@/features/campaigns/delete'
import { useSearch } from '@/shared/lib/search-context'
import { formatDate } from '@/shared/lib/format-date'
import { Button } from '@/shared/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'

export function CampaignsList() {
  const { data: campaigns, isLoading, isError } = useCampaigns()
  const { debouncedSearch } = useSearch()

  const [formCampaign, setFormCampaign] = useState<Campaign | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null)

  const filtered = (campaigns ?? []).filter((campaign) =>
    campaign.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase()),
  )

  function openCreateDialog() {
    setFormCampaign(undefined)
    setIsFormOpen(true)
  }

  function openEditDialog(campaign: Campaign) {
    setFormCampaign(campaign)
    setIsFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-neutral-900">Kampaniyalar</h1>
        <Button onClick={openCreateDialog} style={{ backgroundColor: '#92D871' }}>
          Əlavə et
        </Button>
      </div>

      {isLoading && <p className="text-sm text-neutral-500">Yüklənir...</p>}
      {isError && <p className="text-sm text-red-600">Kampaniyalar yüklənə bilmədi.</p>}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="text-sm text-neutral-500">Heç bir kampaniya tapılmadı.</p>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Tarix</TableHead>
              <TableHead>Açıqlama</TableHead>
              <TableHead>Başlıq</TableHead>
              <TableHead className="text-right">Əməliyyat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>#{campaign.id}</TableCell>
                <TableCell>{formatDate(campaign.created_at)}</TableCell>
                <TableCell className="max-w-xs truncate">{campaign.description}</TableCell>
                <TableCell>{campaign.title}</TableCell>
                <TableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => openEditDialog(campaign)}
                    className="mr-3 text-sm font-medium text-neutral-600 hover:text-neutral-900"
                  >
                    düzəlt
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteCampaign(campaign)}
                    className="text-sm font-medium text-red-600 hover:text-red-700"
                  >
                    sil
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <CampaignFormDialog open={isFormOpen} onOpenChange={setIsFormOpen} campaign={formCampaign} />
      <DeleteCampaignDialog
        open={deleteCampaign !== null}
        onOpenChange={(open) => !open && setDeleteCampaign(null)}
        campaign={deleteCampaign}
      />
    </div>
  )
}
