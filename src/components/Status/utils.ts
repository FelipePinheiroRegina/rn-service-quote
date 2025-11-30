import { STATUS } from '@/types/status'

export function defineBg(variant: STATUS) {
  switch (variant) {
    case STATUS.APPROVED:
      return 'approvedBg'
    case STATUS.SENT:
      return 'sentBg'
    case STATUS.DRAFT:
      return 'draftBg'
    case STATUS.REFUSED:
      return 'refusedBg'
  }
}

export function definePoint(variant: STATUS) {
  switch (variant) {
    case STATUS.APPROVED:
      return 'pointApproved'
    case STATUS.SENT:
      return 'pointSent'
    case STATUS.DRAFT:
      return 'pointDraft'
    case STATUS.REFUSED:
      return 'pointRefused'
  }
}

export function defineColorText(variant: STATUS) {
  switch (variant) {
    case STATUS.APPROVED:
      return 'success_dark'
    case STATUS.SENT:
      return 'info_dark'
    case STATUS.DRAFT:
      return 'gray_500'
    case STATUS.REFUSED:
      return 'danger_dark'
  }
}

export function defineText(variant: STATUS) {
  switch (variant) {
    case STATUS.APPROVED:
      return 'Approved'
    case STATUS.SENT:
      return 'Sent'
    case STATUS.DRAFT:
      return 'Draft'
    case STATUS.REFUSED:
      return 'Refused'
  }
}
