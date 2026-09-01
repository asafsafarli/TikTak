import { useEffect, useMemo, useState, type ComponentProps } from 'react'
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

const PAGE_SIZE = 7

export function CampaignsList() {
  const { data: campaigns, isLoading, isError } = useCampaigns()
  const { debouncedSearch } = useSearch()

  const [formCampaign, setFormCampaign] = useState<Campaign | undefined>(undefined)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [deleteCampaign, setDeleteCampaign] = useState<Campaign | null>(null)
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () =>
      (campaigns ?? []).filter((campaign) =>
        campaign.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase()),
      ),
    [campaigns, debouncedSearch],
  )

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))

  // Axtarış dəyişəndə və ya səhifə sayı azalanda cari səhifəni sərhəd içində saxla.
  useEffect(() => {
    setPage((current) => Math.min(current, pageCount))
  }, [pageCount])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch])

  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  // Səhifə dəyişəndə box hündürlüyü sabit qalsın deyə son səhifəni boş sətirlərlə doldururuq.
  const fillerRows = pageCount > 1 ? PAGE_SIZE - pageItems.length : 0

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
        <h1 className="text-[18px] font-normal leading-[100%] tracking-normal capitalize text-[#2B3043]">
          Kampaniyalar
        </h1>
        <Button
          onClick={openCreateDialog}
          className="h-[40px] w-[89px] rounded-[10px] p-0 text-[16px] font-bold leading-[100%] text-white hover:opacity-90"
          style={{ backgroundColor: '#92D871' }}
        >
          Əlavə et
        </Button>
      </div>

      {isLoading && <p className="text-sm text-neutral-500">Yüklənir...</p>}
      {isError && <p className="text-sm text-red-600">Kampaniyalar yüklənə bilmədi.</p>}

      {!isLoading && !isError && filtered.length === 0 && (
        <p className="text-sm text-neutral-500">Heç bir kampaniya tapılmadı.</p>
      )}

      {!isLoading && !isError && filtered.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow className="border-none bg-[#F7F7FA] hover:bg-[#F7F7FA]">
                <TableHead className="rounded-l-lg px-4 py-4 text-[16px] font-normal leading-[100%] text-neutral-500">
                  No
                </TableHead>
                <TableHead className="px-4 py-4 text-[16px] font-normal leading-[100%] text-neutral-500">
                  Tarix
                </TableHead>
                <TableHead className="px-4 py-4 text-[16px] font-normal leading-[100%] text-neutral-500">
                  Açıqlama
                </TableHead>
                <TableHead className="px-4 py-4 text-[16px] font-normal leading-[100%] text-neutral-500">
                  Başlıq
                </TableHead>
                <TableHead className="rounded-r-lg px-4 py-4" aria-label="Əməliyyat" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageItems.map((campaign) => (
                <TableRow key={campaign.id} className="border-neutral-100">
                  <TableCell className="px-4 py-5 text-[16px] font-light leading-[100%] text-[#2B3043]">
                    #{campaign.id}
                  </TableCell>
                  <TableCell className="px-4 py-5 text-[16px] font-light leading-[100%] text-[#2B3043]">
                    {formatDate(campaign.created_at)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate px-4 py-5 text-[16px] font-light leading-[100%] text-[#2B3043]">
                    {campaign.description}
                  </TableCell>
                  <TableCell className="px-4 py-5 text-[16px] font-light leading-[100%] text-[#2B3043]">
                    {campaign.title}
                  </TableCell>
                  <TableCell className="px-4 py-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => openEditDialog(campaign)}
                      className="mr-3 text-[16px] font-light leading-[100%] text-[#2B3043] hover:text-neutral-900"
                    >
                      düzəlt
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteCampaign(campaign)}
                      className="text-[16px] font-light leading-[100%] text-[#2B3043] hover:text-red-600"
                    >
                      sil
                    </button>
                  </TableCell>
                </TableRow>
              ))}
              {Array.from({ length: fillerRows }).map((_, index) => (
                <TableRow
                  key={`filler-${index}`}
                  className="border-transparent hover:bg-transparent"
                >
                  <TableCell
                    colSpan={5}
                    aria-hidden
                    className="px-4 py-5 text-[16px] leading-[100%]"
                  >
                    &nbsp;
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {pageCount > 1 && (
            <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
          )}
        </>
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

interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
}

function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  const pages = getPageRange(page, pageCount)

  return (
    <nav className="flex items-center justify-end gap-1 pt-1" aria-label="Səhifələmə">
      <PaginationButton
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        aria-label="Əvvəlki səhifə"
      >
        ‹
      </PaginationButton>

      {pages.map((item, index) =>
        item === 'ellipsis' ? (
          <span key={`gap-${index}`} className="px-1 text-sm text-neutral-400">
            …
          </span>
        ) : (
          <PaginationButton
            key={item}
            active={item === page}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? 'page' : undefined}
          >
            {item}
          </PaginationButton>
        ),
      )}

      <PaginationButton
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        aria-label="Növbəti səhifə"
      >
        ›
      </PaginationButton>
    </nav>
  )
}

function PaginationButton({
  active = false,
  className,
  ...props
}: ComponentProps<'button'> & { active?: boolean }) {
  return (
    <button
      type="button"
      className={`flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-sm font-light transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
        active
          ? 'font-normal text-white'
          : 'text-[#2B3043] hover:bg-neutral-100'
      } ${className ?? ''}`}
      style={active ? { backgroundColor: '#92D871' } : undefined}
      {...props}
    />
  )
}

function getPageRange(page: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1)
  }

  const range: (number | 'ellipsis')[] = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(pageCount - 1, page + 1)

  if (start > 2) range.push('ellipsis')
  for (let current = start; current <= end; current += 1) range.push(current)
  if (end < pageCount - 1) range.push('ellipsis')

  range.push(pageCount)
  return range
}
