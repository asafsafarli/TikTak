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
            <TableRow className="border-none bg-[#F7F7FA] hover:bg-[#F7F7FA]">
              <TableHead className="rounded-l-lg px-4 py-3 text-xs font-medium text-neutral-500">
                No
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500">
                Tarix
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500">
                Açıqlama
              </TableHead>
              <TableHead className="px-4 py-3 text-xs font-medium text-neutral-500">
                Başlıq
              </TableHead>
              <TableHead className="rounded-r-lg px-4 py-3 text-right text-xs font-medium text-neutral-500">
                Əməliyyat
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((campaign) => (
              <TableRow key={campaign.id} className="border-neutral-100">
                <TableCell className="px-4 py-4 text-sm text-neutral-700">
                  #{campaign.id}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm text-neutral-700">
                  {formatDate(campaign.created_at)}
                </TableCell>
                <TableCell className="max-w-xs truncate px-4 py-4 text-sm text-neutral-700">
                  {campaign.description}
                </TableCell>
                <TableCell className="px-4 py-4 text-sm font-medium text-neutral-900">
                  {campaign.title}
                </TableCell>
                <TableCell className="px-4 py-4 text-right whitespace-nowrap">
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
