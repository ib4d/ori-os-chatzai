export type EntityStatus = 'active' | 'paused' | 'draft' | 'archived'

export interface BaseEntity {
    id: string
    organizationId: string
    createdAt: Date
    updatedAt: Date
}
